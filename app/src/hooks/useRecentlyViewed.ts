import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'rv-recently-viewed';
const MAX_ENTRIES = 10;

export interface RecentlyViewedListing {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  timestamp: number;
}

const EMPTY: RecentlyViewedListing[] = [];
let listeners: Array<() => void> = [];
let cachedRaw: string | null = null;
let cachedParsed: RecentlyViewedListing[] = EMPTY;

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): RecentlyViewedListing[] {
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

export function useRecentlyViewed() {
  const viewed = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const saveViewed = useCallback((entry: Omit<RecentlyViewedListing, 'id' | 'timestamp'>) => {
    const current = getSnapshot();
    const filtered = current.filter((v) => v.slug !== entry.slug);
    const newEntry: RecentlyViewedListing = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    const updated = [newEntry, ...filtered].slice(0, MAX_ENTRIES);
    const json = JSON.stringify(updated);
    cachedRaw = json;
    cachedParsed = updated;
    sessionStorage.setItem(STORAGE_KEY, json);
    emitChange();
  }, []);

  return { viewed, saveViewed };
}
