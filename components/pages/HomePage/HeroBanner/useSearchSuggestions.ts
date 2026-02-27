import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { SEARCH_INDEX, type SuggestionItem, type SuggestionCategory } from './searchIndex';

export interface AISuggestion {
  label: string;
  navigateTo: string;
}

export interface UseSearchSuggestionsReturn {
  suggestions: SuggestionItem[];
  isLoadingAI: boolean;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}

// ── Scoring ──

const CATEGORY_WEIGHT: Record<SuggestionCategory, number> = {
  make: 1.2,
  make_model: 1.1,
  model: 1.0,
  rv_type: 1.0,
  popular_search: 0.9,
};

const MAX_PER_CATEGORY = 4;
const MAX_TOTAL = 10;

function scoreItem(queryTokens: string[], item: SuggestionItem): number {
  let score = 0;

  for (const qt of queryTokens) {
    let bestTokenScore = 0;

    for (let i = 0; i < item.searchTerms.length; i++) {
      const term = item.searchTerms[i];

      if (term === qt) {
        // Exact match on this token
        const s = i === 0 ? 100 : 90;
        bestTokenScore = Math.max(bestTokenScore, s);
      } else if (term.startsWith(qt)) {
        // Prefix match
        const s = i === 0 ? 80 : 60;
        bestTokenScore = Math.max(bestTokenScore, s);
      } else if (term.includes(qt)) {
        bestTokenScore = Math.max(bestTokenScore, 20);
      }
    }

    if (bestTokenScore === 0) return 0; // every query token must match something
    score += bestTokenScore;
  }

  return (score / queryTokens.length) * CATEGORY_WEIGHT[item.category];
}

function filterAndRank(query: string): SuggestionItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const queryTokens = trimmed.split(/\s+/).filter(Boolean);
  if (queryTokens.length === 0) return [];

  const scored: { item: SuggestionItem; score: number }[] = [];

  for (const item of SEARCH_INDEX) {
    const s = scoreItem(queryTokens, item);
    if (s > 0) scored.push({ item, score: s });
  }

  // Sort: score desc, then A-Z within same score
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.label.localeCompare(b.item.label);
  });

  // Limit per category and total
  const categoryCounts: Partial<Record<SuggestionCategory, number>> = {};
  const results: SuggestionItem[] = [];

  for (const { item } of scored) {
    if (results.length >= MAX_TOTAL) break;
    const cc = categoryCounts[item.category] || 0;
    if (cc >= MAX_PER_CATEGORY) continue;
    categoryCounts[item.category] = cc + 1;
    results.push(item);
  }

  return results;
}

// ── AI Suggestions ──

const AI_SYSTEM_PROMPT = `You are a search suggestion engine for an RV marketplace. Given the user's partial search query, return 3-5 relevant search suggestions.

Return ONLY a JSON array. Each element: { "label": string, "navigateTo": string }

- "label": A concise, user-friendly search suggestion (e.g., "Travel Trailers under $30,000")
- "navigateTo": URL path with query params (e.g., "/search?type=travel-trailer&priceMax=30000")

Available URL parameters:
- type: travel-trailer, class-a, class-b, class-c, fifth-wheel, toy-hauler, pop-up
- make: slugified make name (e.g., forest-river, keystone, winnebago)
- model: slugified model name
- priceMin, priceMax: numbers
- yearMin, yearMax: numbers
- condition: new, used
- sleepingMin: number
- milesMax: number
- weightMax: number (GVWR in lbs)
- sort: price-asc, price-desc, price-drop, year-desc, miles-asc

Return ONLY the JSON array, nothing else.`;

async function fetchAISuggestions(
  query: string,
  signal: AbortSignal,
): Promise<SuggestionItem[]> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: AI_SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `Search query: "${query}"` },
        ],
      }),
      signal,
    });

    if (!res.ok) return [];

    const data = await res.json();
    const text: string = data.content?.[0]?.text || '[]';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    const parsed: AISuggestion[] = JSON.parse(jsonMatch[0]);

    return parsed.map((s) => ({
      label: s.label,
      category: 'popular_search' as const,
      searchTerms: [],
      navigateTo: s.navigateTo.startsWith('/') ? s.navigateTo : `/search?${s.navigateTo}`,
    }));
  } catch {
    return [];
  }
}

// ── Hook ──

export function useSearchSuggestions(query: string): UseSearchSuggestionsReturn {
  const [aiResults, setAiResults] = useState<SuggestionItem[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Client-side results (synchronous, recalculates on every query change)
  const clientResults = useMemo(() => filterAndRank(query), [query]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  // AI fetch with debounce
  useEffect(() => {
    // Clear previous timer + abort
    if (timerRef.current) clearTimeout(timerRef.current);
    if (abortRef.current) abortRef.current.abort();
    setAiResults([]);
    setIsLoadingAI(false);

    const trimmed = query.trim();
    if (trimmed.length < 3 || clientResults.length >= 3) return;

    setIsLoadingAI(true);

    timerRef.current = setTimeout(() => {
      const controller = new AbortController();
      abortRef.current = controller;

      fetchAISuggestions(trimmed, controller.signal).then((results) => {
        if (!controller.signal.aborted) {
          setAiResults(results);
          setIsLoadingAI(false);
        }
      });
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [query, clientResults.length]);

  // Merge client + AI results (deduplicate by label)
  const suggestions = useMemo(() => {
    if (aiResults.length === 0) return clientResults;

    const clientLabels = new Set(clientResults.map((r) => r.label.toLowerCase()));
    const deduped = aiResults.filter((r) => !clientLabels.has(r.label.toLowerCase()));
    return [...clientResults, ...deduped].slice(0, MAX_TOTAL);
  }, [clientResults, aiResults]);

  const stableSetActiveIndex = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  return { suggestions, isLoadingAI, activeIndex, setActiveIndex: stableSetActiveIndex };
}
