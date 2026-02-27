/**
 * Client-side natural language search parser for the RV marketplace.
 * Pure functions — no React, no side effects, no external deps.
 *
 * Parses queries like "class c under $50k for family of 4" into
 * structured filter criteria that map directly to SRP URL params.
 */

import type { SuggestionItem } from './searchIndex';
import { KNOWN_MAKES, KNOWN_MODELS } from './searchIndex';

// ── Types ──

export interface NLFilters {
  rvTypes?: string[];
  makes?: string[];
  models?: string[];
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  condition?: 'new' | 'used';
  sleepingCapacity?: number;
  fuelTypes?: string[];
  gvwMax?: number;
  lengthMin?: number;
  lengthMax?: number;
  floorPlans?: string[];
}

export interface NLParseResult {
  filters: NLFilters;
  sort?: string;
  explanation: string;
  confidence: number; // 0-1
}

// ── RV Type Aliases ──

const RV_TYPE_ALIASES: Record<string, string> = {
  'travel trailer': 'travel-trailer',
  'travel trailers': 'travel-trailer',
  'tt': 'travel-trailer',
  'fifth wheel': 'fifth-wheel',
  'fifth wheels': 'fifth-wheel',
  '5th wheel': 'fifth-wheel',
  '5th wheels': 'fifth-wheel',
  'fiver': 'fifth-wheel',
  'class a': 'class-a',
  'class a motorhome': 'class-a',
  'class a motorhomes': 'class-a',
  'motorhome': 'class-a',
  'motorhomes': 'class-a',
  'class b': 'class-b',
  'class b van': 'class-b',
  'class b vans': 'class-b',
  'campervan': 'class-b',
  'camper van': 'class-b',
  'campervans': 'class-b',
  'sprinter': 'class-b',
  'van life': 'class-b',
  'class c': 'class-c',
  'class c motorhome': 'class-c',
  'class c motorhomes': 'class-c',
  'toy hauler': 'toy-hauler',
  'toy haulers': 'toy-hauler',
  'toyhauler': 'toy-hauler',
  'pop up': 'pop-up',
  'pop-up': 'pop-up',
  'popup': 'pop-up',
  'pop up camper': 'pop-up',
  'tent trailer': 'pop-up',
  'folding trailer': 'pop-up',
};

// Sorted longest-first so multi-word aliases match before substrings
const RV_TYPE_ALIAS_ENTRIES = Object.entries(RV_TYPE_ALIASES).sort(
  (a, b) => b[0].length - a[0].length,
);

// Human-readable labels for RV type slugs
const RV_TYPE_LABELS: Record<string, string> = {
  'travel-trailer': 'Travel Trailers',
  'fifth-wheel': 'Fifth Wheels',
  'class-a': 'Class A Motorhomes',
  'class-b': 'Class B Campervans',
  'class-c': 'Class C Motorhomes',
  'toy-hauler': 'Toy Haulers',
  'pop-up': 'Pop-Up Campers',
};

// Floor plan pattern → filter value
const FLOOR_PLAN_PATTERNS: [RegExp, string][] = [
  [/\bbunk\s*house\b/i, 'Bunkhouse'],
  [/\bdouble\s*bunk\b/i, 'Double bunk'],
  [/\btriple\s*bunk\b/i, 'Triple bunk'],
  [/\bquad\s*bunk\b/i, 'Quad bunk'],
  [/\brear\s*(?:living|lounge)\b/i, 'Rear living'],
  [/\bfront\s*(?:living|lounge)\b/i, 'Front living'],
  [/\brear\s*kitchen\b/i, 'Rear kitchen'],
  [/\bfront\s*kitchen\b/i, 'Front kitchen'],
  [/\bmid[\s-]*bunk\b/i, 'Mid-bunk'],
  [/\btoy\s*hauler\s*garage\b/i, 'Toy hauler garage'],
  [/\bopen\s*concept\b/i, 'Open concept'],
];

// ── NL Detection ──

/** Signal words/patterns that indicate natural language intent */
const NL_SIGNALS =
  /\b(under|below|above|over|less\s+than|more\s+than|up\s+to|at\s+least|starting|budget|affordable|cheap|inexpensive|expensive|luxury|premium|sleep(?:s|ing)?|family|couple|solo|for\s+\d|near\s+\w|lightweight|heavy|small|large|compact|spacious|short|long|best|good|great|top|diesel|electric|bunk\s*house|rear\s+living|front\s+(?:living|kitchen)|open\s+concept|full[\s-]?time|weekend|boondock|off[\s-]?grid|tow(?:able|ing)?|pre[\s-]?owned|newest|cheapest|most\s+(?:affordable|expensive)|price\s+drop|rv\s+for|camper\s+for|trailer\s+for)\b|\$\d|20[12]\d\b.*(?:or\s+newer|and\s+newer|\+)/i;

/**
 * Detect whether a query is natural language vs. a simple make/model/type lookup.
 */
export function isNaturalLanguageQuery(query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 3) return false;

  // Check for NL signal words
  if (NL_SIGNALS.test(trimmed)) return true;

  // Check for dollar amounts anywhere
  if (/\$[\d,]+/.test(trimmed)) return true;

  // 4+ tokens that aren't a known make+model combo → likely NL
  const tokens = trimmed.split(/\s+/);
  if (tokens.length >= 4) {
    // Unless it's something like "thor motor coach palazzo" (make + model)
    const isMakeModel =
      KNOWN_MAKES.some((m) => trimmed.startsWith(m)) &&
      KNOWN_MODELS.some((m) => trimmed.endsWith(m));
    if (!isMakeModel) return true;
  }

  return false;
}

// ── Price Normalization ──

/** Convert "50k" → 50000, "1.5m" → 1500000, plain numbers pass through */
function normalizePrice(raw: string): number {
  const cleaned = raw.replace(/[,$\s]/g, '');
  const kMatch = cleaned.match(/^([\d.]+)[kK]$/);
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000);
  const mMatch = cleaned.match(/^([\d.]+)[mM]$/);
  if (mMatch) return Math.round(parseFloat(mMatch[1]) * 1_000_000);
  return parseInt(cleaned, 10);
}

// ── Core Parser ──

/**
 * Parse a natural language query into structured filters.
 * Returns null if nothing meaningful could be extracted.
 */
export function parseNLQuery(query: string): NLParseResult | null {
  const q = query.trim();
  const lower = q.toLowerCase();
  const filters: NLFilters = {};
  let sort: string | undefined;
  let matchCount = 0;

  // ── Price ──

  // Range: "$30k to $60k", "30000 - 60000"
  const rangeMatch = lower.match(
    /\$?([\d,.]+[kKmM]?)\s*(?:to|-|–|—)\s*\$?([\d,.]+[kKmM]?)/,
  );
  if (rangeMatch) {
    const lo = normalizePrice(rangeMatch[1]);
    const hi = normalizePrice(rangeMatch[2]);
    if (!isNaN(lo) && !isNaN(hi) && lo < hi) {
      filters.priceMin = lo;
      filters.priceMax = hi;
      matchCount++;
    }
  }

  // Ceiling: "under $50k", "below 30000", "max 40k", "up to 60000"
  if (filters.priceMax == null) {
    const ceilMatch = lower.match(
      /(?:under|below|less\s+than|max|up\s+to|budget\s+of|within)\s*\$?([\d,.]+[kKmM]?)/,
    );
    if (ceilMatch) {
      const val = normalizePrice(ceilMatch[1]);
      if (!isNaN(val) && val > 0) {
        filters.priceMax = val;
        matchCount++;
      }
    }
  }

  // Floor: "over $100k", "above 50000", "starting at 30k"
  if (filters.priceMin == null) {
    const floorMatch = lower.match(
      /(?:over|above|more\s+than|min|at\s+least|starting\s+(?:at|from))\s*\$?([\d,.]+[kKmM]?)/,
    );
    if (floorMatch) {
      const val = normalizePrice(floorMatch[1]);
      if (!isNaN(val) && val > 0) {
        filters.priceMin = val;
        matchCount++;
      }
    }
  }

  // ── Sleeping capacity ──

  // "sleeps 6", "sleeping capacity 4"
  const sleepMatch = lower.match(
    /(?:sleep(?:s|ing)?(?:\s+capacity)?)\s+(\d+)/,
  );
  if (sleepMatch) {
    filters.sleepingCapacity = parseInt(sleepMatch[1], 10);
    matchCount++;
  }

  // "for 4 people", "for 6 adults"
  if (filters.sleepingCapacity == null) {
    const forPeopleMatch = lower.match(
      /(?:for|fits?|holds?|accommodates?)\s+(\d+)\s*(?:people|person|adults?|guests?)?/,
    );
    if (forPeopleMatch) {
      filters.sleepingCapacity = parseInt(forPeopleMatch[1], 10);
      matchCount++;
    }
  }

  // "family of 4"
  if (filters.sleepingCapacity == null) {
    const familyOfMatch = lower.match(/family\s+of\s+(\d+)/);
    if (familyOfMatch) {
      filters.sleepingCapacity = parseInt(familyOfMatch[1], 10);
      matchCount++;
    }
  }

  // Heuristic: "family" without a number → 4
  if (filters.sleepingCapacity == null && /\bfamily\b/i.test(lower)) {
    filters.sleepingCapacity = 4;
    matchCount++;
  }

  // "couple" → 2
  if (filters.sleepingCapacity == null && /\bcouple\b/i.test(lower)) {
    filters.sleepingCapacity = 2;
    matchCount++;
  }

  // ── RV Types ──

  const matchedTypes = new Set<string>();
  for (const [alias, slug] of RV_TYPE_ALIAS_ENTRIES) {
    // Word-boundary match for the alias
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`\\b${escaped}\\b`, 'i').test(lower)) {
      matchedTypes.add(slug);
    }
  }
  // Also check generic "rv" / "rvs" / "camper" — don't add a type, just note it's RV-related
  if (matchedTypes.size > 0) {
    filters.rvTypes = [...matchedTypes];
    matchCount++;
  }

  // ── Makes ──

  const matchedMakes: string[] = [];
  for (const make of KNOWN_MAKES) {
    if (new RegExp(`\\b${make.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(lower)) {
      matchedMakes.push(make);
    }
  }
  if (matchedMakes.length > 0) {
    filters.makes = matchedMakes;
    matchCount++;
  }

  // ── Models ──

  const matchedModels: string[] = [];
  for (const model of KNOWN_MODELS) {
    if (new RegExp(`\\b${model.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(lower)) {
      matchedModels.push(model);
    }
  }
  if (matchedModels.length > 0) {
    filters.models = matchedModels;
    matchCount++;
  }

  // ── Condition ──

  if (/\b(?:used|pre[\s-]?owned)\b/i.test(lower)) {
    filters.condition = 'used';
    matchCount++;
  } else if (
    /\bbrand[\s-]?new\b/i.test(lower) ||
    (/\bnew\b/i.test(lower) && !/\bnew\s+(?:york|jersey|mexico|hampshire|orleans|england)\b/i.test(lower))
  ) {
    // "new" but not "new york" etc.
    filters.condition = 'new';
    matchCount++;
  }

  // ── Year ──

  // "2024 or newer", "2020+"
  const yearNewerMatch = lower.match(/(20[12]\d)\s*(?:or\s+newer|and\s+newer|\+|and\s+up)/);
  if (yearNewerMatch) {
    filters.yearMin = parseInt(yearNewerMatch[1], 10);
    matchCount++;
  }

  // "newer than 2020", "after 2019", "from 2022"
  if (filters.yearMin == null) {
    const afterMatch = lower.match(/(?:newer\s+than|after|since|from)\s+(20[12]\d)/);
    if (afterMatch) {
      filters.yearMin = parseInt(afterMatch[1], 10);
      matchCount++;
    }
  }

  // "before 2020", "older than 2022", "pre 2024"
  const beforeMatch = lower.match(/(?:before|older\s+than|pre)\s+(20[12]\d)/);
  if (beforeMatch) {
    filters.yearMax = parseInt(beforeMatch[1], 10);
    matchCount++;
  }

  // Standalone year (e.g., "2024 class c") — treat as exact year
  if (filters.yearMin == null && filters.yearMax == null) {
    const yearOnly = lower.match(/\b(202[0-9]|201[5-9])\b/);
    if (yearOnly && matchCount > 0) {
      // Only interpret as year filter if there's other context
      filters.yearMin = parseInt(yearOnly[1], 10);
      filters.yearMax = parseInt(yearOnly[1], 10);
      matchCount++;
    }
  }

  // ── Fuel type ──

  const fuelTypes: string[] = [];
  if (/\bdiesel\b/i.test(lower)) fuelTypes.push('diesel');
  if (/\bgas(?:oline)?\b/i.test(lower) && !/\bgas\s+(?:station|price)/i.test(lower)) fuelTypes.push('gas');
  if (/\belectric\b/i.test(lower)) fuelTypes.push('electric');
  if (fuelTypes.length > 0) {
    filters.fuelTypes = fuelTypes;
    matchCount++;
  }

  // ── Weight ──

  const weightMatch = lower.match(
    /(?:under|less\s+than|max|below)\s*([\d,.]+)\s*(?:lbs?|pounds?|gvwr)/i,
  );
  if (weightMatch) {
    const val = parseInt(weightMatch[1].replace(/,/g, ''), 10);
    if (!isNaN(val) && val > 0) {
      filters.gvwMax = val;
      matchCount++;
    }
  }

  // Towable heuristic: "towable by SUV" → lightweight
  if (filters.gvwMax == null && /\btow(?:able)?\s*(?:by|with)?\s*(?:suv|car|truck|half[\s-]?ton)/i.test(lower)) {
    filters.gvwMax = 8000; // typical half-ton towing capacity
    matchCount++;
  }

  // ── Length ──

  const lengthMaxMatch = lower.match(
    /(?:under|less\s+than|max|below|shorter\s+than)\s*(\d+)\s*(?:ft|feet|foot|')/i,
  );
  if (lengthMaxMatch) {
    filters.lengthMax = parseInt(lengthMaxMatch[1], 10);
    matchCount++;
  }

  const lengthMinMatch = lower.match(
    /(?:over|more\s+than|min|at\s+least|longer\s+than)\s*(\d+)\s*(?:ft|feet|foot|')/i,
  );
  if (lengthMinMatch) {
    filters.lengthMin = parseInt(lengthMinMatch[1], 10);
    matchCount++;
  }

  // ── Floor plans ──

  const matchedFloorPlans: string[] = [];
  for (const [pattern, value] of FLOOR_PLAN_PATTERNS) {
    if (pattern.test(lower)) {
      matchedFloorPlans.push(value);
    }
  }
  if (matchedFloorPlans.length > 0) {
    filters.floorPlans = matchedFloorPlans;
    matchCount++;
  }

  // ── Sort hints ──

  if (/\b(?:cheapest|lowest\s+price|budget|most\s+affordable)\b/i.test(lower)) {
    sort = 'price-low';
  } else if (/\b(?:most\s+expensive|highest\s+price|luxury|premium)\b/i.test(lower)) {
    sort = 'price-high';
  } else if (/\b(?:newest|latest|most\s+recent)\b/i.test(lower)) {
    sort = 'newest';
  }

  // ── Result ──

  if (matchCount === 0) return null;

  const confidence = Math.min(matchCount / 5, 1);
  const explanation = buildExplanation(filters, sort);

  return { filters, sort, explanation, confidence };
}

// ── Explanation Builder ──

function buildExplanation(filters: NLFilters, sort?: string): string {
  const parts: string[] = [];

  if (filters.condition) {
    parts.push(filters.condition === 'new' ? 'New' : 'Used');
  }

  if (filters.makes?.length) {
    parts.push(filters.makes.map(capitalize).join(', '));
  }

  if (filters.rvTypes?.length) {
    parts.push(
      filters.rvTypes
        .map((t) => RV_TYPE_LABELS[t] || t)
        .join(', '),
    );
  }

  if (filters.models?.length) {
    parts.push(filters.models.map(capitalize).join(', '));
  }

  if (filters.priceMin != null && filters.priceMax != null) {
    parts.push(`${formatPrice(filters.priceMin)}–${formatPrice(filters.priceMax)}`);
  } else if (filters.priceMax != null) {
    parts.push(`Under ${formatPrice(filters.priceMax)}`);
  } else if (filters.priceMin != null) {
    parts.push(`Over ${formatPrice(filters.priceMin)}`);
  }

  if (filters.yearMin != null && filters.yearMax != null && filters.yearMin === filters.yearMax) {
    parts.push(`${filters.yearMin}`);
  } else if (filters.yearMin != null) {
    parts.push(`${filters.yearMin}+`);
  } else if (filters.yearMax != null) {
    parts.push(`Pre-${filters.yearMax}`);
  }

  if (filters.sleepingCapacity != null) {
    parts.push(`Sleeps ${filters.sleepingCapacity}+`);
  }

  if (filters.fuelTypes?.length) {
    parts.push(filters.fuelTypes.map(capitalize).join(', '));
  }

  if (filters.lengthMax != null) {
    parts.push(`Under ${filters.lengthMax} ft`);
  } else if (filters.lengthMin != null) {
    parts.push(`Over ${filters.lengthMin} ft`);
  }

  if (filters.gvwMax != null) {
    parts.push(`Under ${filters.gvwMax.toLocaleString()} lbs`);
  }

  if (filters.floorPlans?.length) {
    parts.push(filters.floorPlans.join(', '));
  }

  if (sort === 'price-low') parts.push('Lowest price first');
  if (sort === 'price-high') parts.push('Highest price first');
  if (sort === 'newest') parts.push('Newest first');

  return parts.join(' · ') || 'Search RVs';
}

function formatPrice(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}K`;
  return `$${n.toLocaleString()}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── URL Builder ──

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Build a URL search string from parsed NL filters.
 * Uses exact SRP param names from useSrpFilters.
 */
export function buildSearchURL(filters: NLFilters, sort?: string): string {
  const params = new URLSearchParams();

  if (filters.rvTypes?.length) params.set('rvTypes', filters.rvTypes.join(','));
  if (filters.makes?.length) params.set('makes', filters.makes.map(slugify).join(','));
  if (filters.models?.length) params.set('models', filters.models.map(slugify).join(','));
  if (filters.priceMin != null) params.set('priceMin', String(filters.priceMin));
  if (filters.priceMax != null) params.set('priceMax', String(filters.priceMax));
  if (filters.yearMin != null) params.set('yearMin', String(filters.yearMin));
  if (filters.yearMax != null) params.set('yearMax', String(filters.yearMax));
  if (filters.condition) params.set('condition', filters.condition);
  if (filters.sleepingCapacity != null) params.set('sleepingCapacity', String(filters.sleepingCapacity));
  if (filters.fuelTypes?.length) params.set('fuelTypes', filters.fuelTypes.join(','));
  if (filters.gvwMax != null) params.set('gvwMax', String(filters.gvwMax));
  if (filters.lengthMin != null) params.set('lengthMin', String(filters.lengthMin));
  if (filters.lengthMax != null) params.set('lengthMax', String(filters.lengthMax));
  if (filters.floorPlans?.length) params.set('floorPlans', filters.floorPlans.join(','));
  if (sort && sort !== 'relevance') params.set('sort', sort);

  const str = params.toString();
  return str ? `?${str}` : '';
}

// ── Suggestion Generator ──

/**
 * Generate 1-3 SuggestionItem variants from an NL parse result.
 */
export function generateNLSuggestions(result: NLParseResult): SuggestionItem[] {
  const items: SuggestionItem[] = [];

  // 1. Primary: exact match with all parsed filters
  items.push({
    label: result.explanation,
    category: 'nl_search',
    searchTerms: [],
    navigateTo: `/search${buildSearchURL(result.filters, result.sort)}`,
    subtitle: summarizeFilters(result.filters, result.sort),
  });

  // 2. With a useful sort (if price-related filters and no explicit sort)
  if (!result.sort && (result.filters.priceMax != null || result.filters.priceMin != null)) {
    const sortedExplanation = buildExplanation(result.filters, 'price-low');
    items.push({
      label: sortedExplanation,
      category: 'nl_search',
      searchTerms: [],
      navigateTo: `/search${buildSearchURL(result.filters, 'price-low')}`,
      subtitle: 'Sorted by lowest price',
    });
  }

  // 3. Relaxed variant — drop least important filter if 3+ filters present
  const filterKeys = Object.keys(result.filters).filter(
    (k) => result.filters[k as keyof NLFilters] != null,
  );
  if (filterKeys.length >= 3) {
    const relaxed = relaxFilters(result.filters);
    if (relaxed) {
      const relaxedExplanation = buildExplanation(relaxed.filters, result.sort);
      items.push({
        label: relaxedExplanation,
        category: 'nl_search',
        searchTerms: [],
        navigateTo: `/search${buildSearchURL(relaxed.filters, result.sort)}`,
        subtitle: `More results · without ${relaxed.dropped} filter`,
      });
    }
  }

  return items;
}

/** Filter priority for relaxation (lowest priority dropped first) */
const FILTER_PRIORITY: (keyof NLFilters)[] = [
  'floorPlans',
  'fuelTypes',
  'gvwMax',
  'lengthMin',
  'lengthMax',
  'yearMin',
  'yearMax',
  'condition',
  'models',
  'priceMin',
  'priceMax',
  'sleepingCapacity',
  'makes',
  'rvTypes',
];

const FILTER_LABELS: Record<string, string> = {
  rvTypes: 'type',
  makes: 'make',
  models: 'model',
  priceMin: 'min price',
  priceMax: 'max price',
  yearMin: 'min year',
  yearMax: 'max year',
  condition: 'condition',
  sleepingCapacity: 'sleeping capacity',
  fuelTypes: 'fuel type',
  gvwMax: 'weight',
  lengthMin: 'min length',
  lengthMax: 'max length',
  floorPlans: 'floor plan',
};

function relaxFilters(
  filters: NLFilters,
): { filters: NLFilters; dropped: string } | null {
  const relaxed = { ...filters };

  for (const key of FILTER_PRIORITY) {
    const val = relaxed[key];
    if (val != null && (!Array.isArray(val) || val.length > 0)) {
      (relaxed as Record<string, unknown>)[key] = undefined;
      return { filters: relaxed, dropped: FILTER_LABELS[key] || key };
    }
  }

  return null;
}

function summarizeFilters(filters: NLFilters, sort?: string): string {
  const count = Object.values(filters).filter(
    (v) => v != null && (!Array.isArray(v) || v.length > 0),
  ).length;
  const parts = [`${count} filter${count !== 1 ? 's' : ''} applied`];
  if (sort) parts.push(`sorted by ${sort.replace('-', ' ')}`);
  return parts.join(' · ');
}
