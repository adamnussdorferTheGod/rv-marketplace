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

// Cache parsed result so useSyncExternalStore gets a stable reference
const EMPTY: RecentSearch[] = [];
let cachedRaw: string | null = null;
let cachedParsed: RecentSearch[] = EMPTY;

function getSnapshot(): RecentSearch[] {
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
