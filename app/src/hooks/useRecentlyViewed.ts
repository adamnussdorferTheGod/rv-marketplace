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

const SEED_VIEWED: RecentlyViewedListing[] = [
  { id: 'seed-v1', slug: 'flying-cloud-23fbq', title: '2025 Airstream Flying Cloud 23FB Queen', imageUrl: '/images/listings/flying-cloud-23fbq/698abd158e138a4ac9028bb4.webp', timestamp: Date.now() - 1800_000 },
  { id: 'seed-v2', slug: 'dutch-star-4020', title: '2025 Newmar Dutch Star 4020', imageUrl: '/images/listings/dutch-star-4020/6998e5d2ad9697405b0a6fa2.webp', timestamp: Date.now() - 3600_000 },
  { id: 'seed-v3', slug: 'sprinter-2500-awd', title: '2025 Mercedes-Benz Sprinter 2500 AWD', imageUrl: '/images/listings/sprinter-2500-awd/69a20be82c6950a39a017612.webp', timestamp: Date.now() - 5400_000 },
  { id: 'seed-v4', slug: 'sunseeker-1950le', title: '2026 Forest River Sunseeker 1950LE', imageUrl: '/images/listings/sunseeker-1950le/hero.png', timestamp: Date.now() - 7200_000 },
  { id: 'seed-v5', slug: 'jay-flight-slx-380dqs', title: '2025 Jayco Jay Flight SLX 380DQS', imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp', timestamp: Date.now() - 9000_000 },
];

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

// Reset to seed data on every page load; user activity during the session updates the list
let seeded = false;
function ensureSeeded() {
  if (seeded) return;
  seeded = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_VIEWED));
    cachedRaw = null;
  } catch { /* ignore */ }
}

function getSnapshot(): RecentlyViewedListing[] {
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
