import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { SEARCH_INDEX, type SuggestionItem, type SuggestionCategory } from './searchIndex';
import {
  isNaturalLanguageQuery,
  parseNLQuery,
  generateNLSuggestions,
  type NLParseResult,
} from './nlParser';

export interface AISuggestion {
  label: string;
  navigateTo: string;
  explanation?: string;
}

export interface UseSearchSuggestionsReturn {
  suggestions: SuggestionItem[];
  isLoadingAI: boolean;
  isNaturalLanguage: boolean;
  nlParseResult: NLParseResult | null;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}

// ── Scoring ──

const CATEGORY_WEIGHT: Partial<Record<SuggestionCategory, number>> = {
  make: 1.2,
  make_model: 1.1,
  model: 1.0,
  rv_type: 1.0,
  popular_search: 0.9,
};

const MAX_PER_CATEGORY = 4;
const MAX_TOTAL = 10;

function scoreItem(queryTokens: string[], item: SuggestionItem): number {
  // NL results are not scored via token matching
  if (item.category === 'nl_search') return 0;

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

  return (score / queryTokens.length) * (CATEGORY_WEIGHT[item.category] ?? 1.0);
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

const AI_SYSTEM_PROMPT = `You are a search suggestion engine for an RV marketplace. Given the user's search query, return 3-5 relevant search suggestions.

Return ONLY a JSON array. Each element: { "label": string, "navigateTo": string, "explanation": string }

- "label": A concise search suggestion (e.g., "Travel Trailers under $30,000")
- "navigateTo": URL path with query params using EXACT param names below
- "explanation": Brief text explaining WHY this matches (e.g., "Great for families, sleeps 4+")

EXACT URL parameter names (use these precisely):
- rvTypes: comma-separated: class-a,class-b,class-c,travel-trailer,fifth-wheel,toy-hauler,pop-up
- makes: comma-separated slugified make names (e.g., forest-river,winnebago)
- models: comma-separated slugified model names
- priceMin / priceMax: numbers (no commas, no $)
- yearMin / yearMax: 4-digit years
- condition: new | used
- sleepingCapacity: minimum number of people it sleeps
- fuelTypes: comma-separated: gas,diesel,electric
- gvwMax: max gross vehicle weight in lbs
- lengthMin / lengthMax: in feet
- floorPlans: comma-separated: Bunkhouse,Rear living,Front living,Rear kitchen,Mid-bunk,Open concept
- sort: relevance | price-low | price-high | newest | distance
- keyword: free text search

Example URL: "/search?rvTypes=travel-trailer&priceMax=50000&sort=price-low"

Lifestyle query mapping:
- "full time living" → large Class A or Fifth Wheels, longer lengths
- "weekend camping" → travel trailers, pop-ups, affordable
- "family vacation" → sleepingCapacity=4+, bunkhouse floor plans
- "boondocking/off-grid" → Class B, diesel, lightweight
- "first time rv" → travel trailers, pop-ups, lower price, shorter length
- "luxury" → Class A diesel pushers, high price, premium makes

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
        max_tokens: 400,
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
      category: 'nl_search' as const,
      searchTerms: [],
      navigateTo: s.navigateTo.startsWith('/') ? s.navigateTo : `/search?${s.navigateTo}`,
      subtitle: s.explanation,
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

  // Client-side token results (synchronous)
  const clientResults = useMemo(() => filterAndRank(query), [query]);

  // NL detection + parsing (synchronous, instant)
  const isNL = useMemo(() => isNaturalLanguageQuery(query), [query]);
  const nlParseResult = useMemo(() => {
    if (!isNL) return null;
    return parseNLQuery(query);
  }, [query, isNL]);
  const nlResults = useMemo(() => {
    if (!nlParseResult) return [];
    return generateNLSuggestions(nlParseResult);
  }, [nlParseResult]);

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
    if (trimmed.length < 3) return;

    // For NL queries: always fire AI (regardless of client result count)
    // For non-NL queries: only fire when client results are sparse
    if (!isNL && clientResults.length >= 3) return;

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
  }, [query, clientResults.length, isNL]);

  // Merge: NL results → client results → AI results (deduplicated)
  const suggestions = useMemo(() => {
    const combined = [...nlResults, ...clientResults];

    if (aiResults.length === 0) return combined.slice(0, MAX_TOTAL);

    const labels = new Set(combined.map((r) => r.label.toLowerCase()));
    const deduped = aiResults.filter((r) => !labels.has(r.label.toLowerCase()));
    return [...combined, ...deduped].slice(0, MAX_TOTAL);
  }, [nlResults, clientResults, aiResults]);

  const stableSetActiveIndex = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  return {
    suggestions,
    isLoadingAI,
    isNaturalLanguage: isNL,
    nlParseResult,
    activeIndex,
    setActiveIndex: stableSetActiveIndex,
  };
}
