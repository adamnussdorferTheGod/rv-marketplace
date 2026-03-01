import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'rv-recent-searches';
const MAX_ENTRIES = 10;

export interface RecentSearch {
  id: string;
  title: string;
  zipCode: string;
  resultCount: number;
  url: string;
  timestamp: number;
}

const SEED_SEARCHES: RecentSearch[] = [
  { id: 'seed-s1', title: 'Class C Motorhomes', zipCode: '90210', resultCount: 47, url: '/search?type=class-c', timestamp: Date.now() - 3600_000 },
  { id: 'seed-s2', title: 'Travel Trailers Under $30k', zipCode: '90210', resultCount: 128, url: '/search?type=travel-trailer&maxPrice=30000', timestamp: Date.now() - 7200_000 },
  { id: 'seed-s3', title: 'Airstream', zipCode: '90210', resultCount: 12, url: '/search?q=Airstream', timestamp: Date.now() - 10800_000 },
];

// Notify React when storage changes within the same tab
let listeners: Array<() => void> = [];
function emitChange() {
  for (const listener of listeners) listener();
}
function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

// Reset to seed data on every page load; user activity during the session updates the list
let seeded = false;
function ensureSeeded() {
  if (seeded) return;
  seeded = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SEARCHES));
    cachedRaw = null; // invalidate cache so getSnapshot re-reads
  } catch { /* ignore */ }
}

// Cache parsed result so useSyncExternalStore gets a stable reference
const EMPTY: RecentSearch[] = [];
let cachedRaw: string | null = null;
let cachedParsed: RecentSearch[] = EMPTY;

function getSnapshot(): RecentSearch[] {
  ensureSeeded();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedParsed;
    cachedRaw = raw;
    cachedParsed = raw ? JSON.parse(raw) : EMPTY;
    return cachedParsed;
  } catch {
    return EMPTY;
  }
}

function saveToStorage(entries: RecentSearch[]) {
  const json = JSON.stringify(entries);
  cachedRaw = json;
  cachedParsed = entries;
  sessionStorage.setItem(STORAGE_KEY, json);
  emitChange();
}

export function useRecentSearches() {
  const searches = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const saveSearch = useCallback((entry: Omit<RecentSearch, 'id' | 'timestamp'>) => {
    const current = getSnapshot();

    // Deduplicate by URL
    const filtered = current.filter((s) => s.url !== entry.url);

    const newEntry: RecentSearch = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    // Add to front, cap at MAX_ENTRIES
    const updated = [newEntry, ...filtered].slice(0, MAX_ENTRIES);
    saveToStorage(updated);
  }, []);

  return { searches, saveSearch };
}
