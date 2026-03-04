import type { AssistantCategory, SearchContext } from './srpAssistantService';
import type { FilterCriteria, SRPListing, RVType } from './srpTypes';
import { RV_TYPE_LABELS } from './srpTypes';
import type { TowVehicle } from './towTypes';
import { isTowableType } from './towCompatibility';

// ─── Chip categories ────────────────────────────────────────────────

export type ChipCategory =
  | 'tow-compatibility'
  | 'floor-plan'
  | 'price-validation'
  | 'model-comparison'
  | 'condition-inspection'
  | 'lifestyle-fit'
  | 'depreciation-value'
  | 'regional-seasonal';

// ─── Engine input ───────────────────────────────────────────────────

export interface ChipEngineInput {
  search: SearchContext;
  filters: FilterCriteria;
  towVehicle: TowVehicle | null;
  listings: SRPListing[];
}

// ─── Chip history (replaces old 3-state ChipContext) ────────────────

export interface ChipHistory {
  turns: ChipCategory[];
  turnCount: number;
}

export const INITIAL_CHIP_HISTORY: ChipHistory = {
  turns: [],
  turnCount: 0,
};

// ─── Template definition ────────────────────────────────────────────

interface ChipTemplate {
  id: string;
  category: ChipCategory;
  text: string;
  score: (input: ChipEngineInput) => number;
}

// ─── Interpolation map builder ──────────────────────────────────────

interface InterpolationMap {
  [key: string]: string | undefined;
}

function buildInterpolationMap(input: ChipEngineInput): InterpolationMap {
  const { search, filters, towVehicle, listings } = input;

  // ── Make analysis ──
  const topMake = search.topMakes[0] ?? undefined;
  const secondMake = search.topMakes[1] ?? undefined;
  const filteredMake = filters.makes.length === 1 ? filters.makes[0] : undefined;
  // "make" resolves to filtered make first, then top make
  const make = filteredMake ?? topMake;

  // ── Model analysis ──
  // Top 3 models by frequency (from actual listings, not filters)
  const modelCounts = new Map<string, number>();
  for (const l of listings) {
    modelCounts.set(l.model, (modelCounts.get(l.model) ?? 0) + 1);
  }
  const topModels = [...modelCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([m]) => m);
  const topModel = topModels[0] ?? undefined;
  const secondModel = topModels[1] ?? undefined;
  const filteredModel = filters.models.length === 1 ? filters.models[0] : undefined;
  // "model" resolves to filtered model first, then top model
  const model = filteredModel ?? topModel;

  // ── Make + model combos ──
  // "makeModel" = "Jayco Jay Flight", or just make if no model context
  const makeModel = make && model ? `${make} ${model}` : make;
  // Distinct make+model combos in results for comparison
  const makeModelSet = new Set<string>();
  for (const l of listings) {
    makeModelSet.add(`${l.make} ${l.model}`);
    if (makeModelSet.size >= 3) break;
  }
  const makeModelPairs = [...makeModelSet];

  // ── RV type ──
  // Filtered RV type label (e.g. "Travel Trailer") or dominant type from listings
  let rvType = search.activeRvType ?? undefined;
  if (!rvType && filters.rvTypes.length === 1) {
    rvType = RV_TYPE_LABELS[filters.rvTypes[0]];
  }
  // If still no type, derive from dominant type in results
  if (!rvType && listings.length > 0) {
    const typeCounts = new Map<RVType, number>();
    for (const l of listings) {
      typeCounts.set(l.rvType, (typeCounts.get(l.rvType) ?? 0) + 1);
    }
    const sorted = [...typeCounts.entries()].sort((a, b) => b[1] - a[1]);
    // Only use dominant type if it's >60% of results (clear majority)
    if (sorted[0] && sorted[0][1] / listings.length > 0.6) {
      rvType = RV_TYPE_LABELS[sorted[0][0]];
    }
  }
  // Short RV type for tight chip text (e.g. "Travel Trailer" instead of "Travel Trailer")
  // Strip " Motorhome" / " Camper" suffixes for brevity
  const rvTypeShort = rvType
    ?.replace(' Motorhome', '')
    .replace(' Camper', '') ?? undefined;

  // ── Year analysis ──
  let minYear = Infinity;
  let maxYear = -Infinity;
  for (const l of listings) {
    if (l.year < minYear) minYear = l.year;
    if (l.year > maxYear) maxYear = l.year;
  }
  const yearSpread = maxYear !== -Infinity && minYear !== Infinity
    ? maxYear - minYear
    : 0;

  // ── Location ──
  const state = listings[0]?.location?.state ?? undefined;

  // ── Tow vehicle ──
  const towName = towVehicle
    ? `${towVehicle.year} ${towVehicle.make} ${towVehicle.model}`
    : undefined;

  // ── Sleeping capacity ──
  const capacities = listings.map(l => l.sleepingCapacity).filter(c => c > 0);
  const maxSleep = capacities.length > 0 ? Math.max(...capacities) : undefined;

  // ── Price ──
  const medianFormatted = '$' + search.medianPrice.toLocaleString('en-US');
  const priceMinFmt = '$' + search.priceRange.min.toLocaleString('en-US');

  // ── Multi-type ──
  const rvTypeA = filters.rvTypes.length >= 2 ? RV_TYPE_LABELS[filters.rvTypes[0]] : undefined;
  const rvTypeB = filters.rvTypes.length >= 2 ? RV_TYPE_LABELS[filters.rvTypes[1]] : undefined;
  const rvTypeAShort = rvTypeA?.replace(' Motorhome', '').replace(' Camper', '') ?? undefined;
  const rvTypeBShort = rvTypeB?.replace(' Motorhome', '').replace(' Camper', '') ?? undefined;

  // ── Price filters ──
  const priceMaxFilter = filters.priceMax !== null
    ? '$' + filters.priceMax.toLocaleString('en-US')
    : undefined;

  return {
    towVehicle: towName,
    topMake,
    secondMake,
    filteredMake,
    make,
    topModel,
    secondModel,
    filteredModel,
    model,
    makeModel,
    makeModelA: makeModelPairs[0],
    makeModelB: makeModelPairs[1],
    rvType,
    rvTypeShort,
    minYear: minYear !== Infinity ? String(minYear) : undefined,
    maxYear: maxYear !== -Infinity ? String(maxYear) : undefined,
    yearSpread: yearSpread > 0 ? String(yearSpread) : undefined,
    state,
    maxSleep: maxSleep !== undefined ? String(maxSleep) : undefined,
    medianPrice: medianFormatted,
    priceMin: priceMinFmt,
    resultCount: String(search.resultCount),
    greatDeals: String(search.dealBreakdown.great),
    rvTypeAShort,
    rvTypeBShort,
    priceMaxFilter,
  };
}

// Helper: user explicitly filtered by make?
function hasExplicitMakeFilter(input: ChipEngineInput): boolean {
  return input.filters.makes.length > 0;
}

// Helper: does this input have a clear make context?
// True when user filtered by make OR listings have a dominant make.
function hasMakeContext(input: ChipEngineInput): boolean {
  return input.filters.makes.length > 0 || input.search.topMakes.length > 0;
}

// Helper: damping factor for make-specificity.
// Full score when user explicitly filtered by make, reduced when make is
// just incidentally the most common in unfiltered results.
function makeSpecificityMultiplier(input: ChipEngineInput): number {
  return hasExplicitMakeFilter(input) ? 1.0 : 0.45;
}

// Helper: does this input have multiple distinct models?
function hasMultipleModels(input: ChipEngineInput): boolean {
  const models = new Set(input.listings.map(l => l.model));
  return models.size >= 2;
}

// Helper: does this input have an RV type context?
function hasRvTypeContext(input: ChipEngineInput): boolean {
  if (input.search.activeRvType) return true;
  if (input.filters.rvTypes.length === 1) return true;
  // Dominant type > 60%
  if (input.listings.length === 0) return false;
  const typeCounts = new Map<string, number>();
  for (const l of input.listings) {
    typeCounts.set(l.rvType, (typeCounts.get(l.rvType) ?? 0) + 1);
  }
  const top = [...typeCounts.values()].sort((a, b) => b - a)[0] ?? 0;
  return top / input.listings.length > 0.6;
}

// Helper: multiple RV types selected?
function hasMultipleRvTypes(input: ChipEngineInput): boolean {
  return input.filters.rvTypes.length >= 2;
}

// Helper: is this a motorhome search?
const MOTORHOME_TYPES: RVType[] = ['class-a', 'class-b', 'class-c'];
function isMotorhomeSearch(input: ChipEngineInput): boolean {
  if (input.filters.rvTypes.some(t => MOTORHOME_TYPES.includes(t))) return true;
  if (input.listings.length === 0) return false;
  const count = input.listings.filter(l => MOTORHOME_TYPES.includes(l.rvType as RVType)).length;
  return count / input.listings.length > 0.6;
}

// Helper: specific niche type?
const NICHE_TYPES: RVType[] = ['pop-up', 'truck-camper', 'park-model', 'fish-house'];
function getNicheType(input: ChipEngineInput): RVType | null {
  if (input.filters.rvTypes.length === 1 && NICHE_TYPES.includes(input.filters.rvTypes[0])) {
    return input.filters.rvTypes[0];
  }
  return null;
}

// Helper: fifth-wheel dominant?
function isFifthWheelSearch(input: ChipEngineInput): boolean {
  if (input.filters.rvTypes.includes('fifth-wheel') && input.filters.rvTypes.length <= 2) return true;
  if (input.listings.length === 0) return false;
  return input.listings.filter(l => l.rvType === 'fifth-wheel').length / input.listings.length > 0.5;
}

// Helper: toy-hauler dominant?
function isToyHaulerSearch(input: ChipEngineInput): boolean {
  if (input.filters.rvTypes.includes('toy-hauler') && input.filters.rvTypes.length <= 2) return true;
  if (input.listings.length === 0) return false;
  return input.listings.filter(l => l.rvType === 'toy-hauler').length / input.listings.length > 0.5;
}

// Helper: has active price range filter?
function hasPriceFilter(input: ChipEngineInput): boolean {
  return input.filters.priceMin !== null || input.filters.priceMax !== null;
}

// Helper: low results?
function isLowResults(input: ChipEngineInput): boolean {
  return input.search.resultCount > 0 && input.search.resultCount <= 5;
}

// Helper: condition filters
function isNewOnly(input: ChipEngineInput): boolean {
  return input.filters.condition === 'new';
}
function isUsedOnly(input: ChipEngineInput): boolean {
  return input.filters.condition === 'used';
}

// Helper: totally broad search (no meaningful explicit filters)?
// Only checks what the USER chose, not what the listings happen to contain.
function isBroadSearch(input: ChipEngineInput): boolean {
  return input.filters.makes.length === 0
    && input.filters.models.length === 0
    && input.filters.rvTypes.length === 0;
}

// ─── Text interpolation ────────────────────────────────────────────

function interpolate(text: string, map: InterpolationMap): string | null {
  const result = text.replace(/\{(\w+)\}/g, (match, key: string) => {
    return map[key] ?? match;
  });
  if (/\{(\w+)\}/.test(result)) return null;
  return result.length > 40 ? result.slice(0, 38) + '…' : result;
}

// ─── Category affinity map ──────────────────────────────────────────

const CATEGORY_AFFINITY: Partial<Record<ChipCategory, Partial<Record<ChipCategory, number>>>> = {
  'price-validation': { 'depreciation-value': 0.30, 'model-comparison': 0.20 },
  'model-comparison': { 'price-validation': 0.20, 'floor-plan': 0.15 },
  'tow-compatibility': { 'lifestyle-fit': 0.20, 'floor-plan': 0.10 },
  'floor-plan': { 'lifestyle-fit': 0.25, 'model-comparison': 0.15 },
  'condition-inspection': { 'depreciation-value': 0.25, 'price-validation': 0.15 },
  'lifestyle-fit': { 'floor-plan': 0.20, 'regional-seasonal': 0.15 },
  'depreciation-value': { 'price-validation': 0.20, 'condition-inspection': 0.15 },
  'regional-seasonal': { 'price-validation': 0.15, 'lifestyle-fit': 0.10 },
};

// ─── AssistantCategory → ChipCategory mapping ──────────────────────

export function mapAssistantCategoryToChipCategory(cat: AssistantCategory): ChipCategory {
  switch (cat) {
    case 'market-overview': return 'regional-seasonal';
    case 'price-analysis': return 'price-validation';
    case 'type-comparison': return 'model-comparison';
    case 'deal-quality': return 'price-validation';
    case 'recommendation': return 'lifestyle-fit';
    case 'reliability': return 'condition-inspection';
    case 'towing': return 'tow-compatibility';
    case 'floor-plan': return 'floor-plan';
    case 'lifestyle': return 'lifestyle-fit';
    case 'depreciation': return 'depreciation-value';
    case 'inspection': return 'condition-inspection';
    default: return 'regional-seasonal';
  }
}

// ─── Template library ───────────────────────────────────────────────

const CHIP_TEMPLATES: ChipTemplate[] = [
  // ══════════════════════════════════════════════════════════════════
  // ── tow-compatibility ──
  // ══════════════════════════════════════════════════════════════════

  // Make-specific
  {
    id: 'tow-can-my-vehicle',
    category: 'tow-compatibility',
    text: 'Can my {towVehicle} tow this?',
    score: ({ towVehicle, listings }) => {
      if (!towVehicle) return 0;
      return listings.some(l => isTowableType(l.rvType)) ? 90 : 0;
    },
  },
  {
    id: 'tow-make-towable',
    category: 'tow-compatibility',
    text: 'Are {make} models easy to tow?',
    score: (input) => {
      if (input.towVehicle) return 0;
      if (!hasMakeContext(input)) return 0;
      return input.listings.some(l => isTowableType(l.rvType)) ? 60 : 0;
    },
  },
  {
    id: 'tow-model-weight',
    category: 'tow-compatibility',
    text: 'How heavy is the {model}?',
    score: (input) => {
      if (!hasMultipleModels(input)) return 0;
      return input.listings.some(l => isTowableType(l.rvType)) ? 50 : 0;
    },
  },
  {
    id: 'tow-hitch-needs',
    category: 'tow-compatibility',
    text: 'What hitch for a {make}?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      const fifthWheels = input.listings.filter(l => l.rvType === 'fifth-wheel').length;
      return fifthWheels > 0 ? 55 : 20;
    },
  },
  // RV-type tier
  {
    id: 'tow-rvtype-towable',
    category: 'tow-compatibility',
    text: 'Can I tow a {rvTypeShort}?',
    score: (input) => {
      if (input.towVehicle) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.listings.some(l => isTowableType(l.rvType)) ? 55 : 0;
    },
  },
  {
    id: 'tow-rvtype-weight-range',
    category: 'tow-compatibility',
    text: '{rvType} weight range?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.listings.some(l => isTowableType(l.rvType)) ? 45 : 0;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── floor-plan ──
  // ══════════════════════════════════════════════════════════════════

  // Make-specific
  {
    id: 'fp-make-layouts',
    category: 'floor-plan',
    text: 'Best {make} floor plans?',
    score: (input) => hasMakeContext(input) ? 65 : 0,
  },
  {
    id: 'fp-model-layout',
    category: 'floor-plan',
    text: '{model} floor plan options?',
    score: (input) => {
      const modelCount = input.listings.filter(l => l.model === (input.filters.models[0] ?? '')).length;
      return modelCount >= 2 ? 60 : 0;
    },
  },
  {
    id: 'fp-sleeps',
    category: 'floor-plan',
    text: 'Which {make} sleeps the most?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      const caps = input.listings.map(l => l.sleepingCapacity).filter(c => c > 0);
      return new Set(caps).size >= 2 ? 55 : 15;
    },
  },
  {
    id: 'fp-bunkhouse',
    category: 'floor-plan',
    text: 'Any {make} bunkhouse models?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      const bunks = input.listings.filter(l => l.floorPlan?.toLowerCase().includes('bunk'));
      return bunks.length > 0 ? 50 : 10;
    },
  },
  // RV-type tier
  {
    id: 'fp-rvtype-layouts',
    category: 'floor-plan',
    text: 'Best {rvTypeShort} floor plans?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      return hasRvTypeContext(input) ? 55 : 0;
    },
  },
  {
    id: 'fp-rvtype-sleeps',
    category: 'floor-plan',
    text: 'Which {rvTypeShort} sleeps most?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      const caps = input.listings.map(l => l.sleepingCapacity).filter(c => c > 0);
      return new Set(caps).size >= 2 ? 50 : 15;
    },
  },
  {
    id: 'fp-rvtype-bunkhouse',
    category: 'floor-plan',
    text: '{rvTypeShort} bunkhouse options?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.listings.some(l => l.floorPlan?.toLowerCase().includes('bunk')) ? 45 : 0;
    },
  },
  // Generic
  {
    id: 'fp-compare-layouts-generic',
    category: 'floor-plan',
    text: 'Compare floor plan layouts',
    score: ({ listings }) => {
      const plans = new Set(listings.map(l => l.floorPlan).filter(Boolean));
      return plans.size >= 3 ? 30 : 5;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── price-validation ──
  // ══════════════════════════════════════════════════════════════════

  // Make-specific
  {
    id: 'pv-make-fair-price',
    category: 'price-validation',
    text: 'Is {medianPrice} fair for {make}?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return input.search.resultCount >= 3 ? 70 : 25;
    },
  },
  {
    id: 'pv-model-price-range',
    category: 'price-validation',
    text: '{model} price range?',
    score: (input) => {
      if (!hasMultipleModels(input)) return 0;
      return 60;
    },
  },
  {
    id: 'pv-great-deals',
    category: 'price-validation',
    text: '{greatDeals} great {make} deals',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return input.search.dealBreakdown.great > 0 ? 80 : 0;
    },
  },
  {
    id: 'pv-make-best-value',
    category: 'price-validation',
    text: 'Best value {make} model?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return hasMultipleModels(input) ? 65 : 30;
    },
  },
  {
    id: 'pv-cheapest-model',
    category: 'price-validation',
    text: 'Cheapest {make} listed?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return input.search.resultCount >= 5 ? 45 : 15;
    },
  },
  // RV-type tier
  {
    id: 'pv-rvtype-fair-price',
    category: 'price-validation',
    text: '{medianPrice} fair for {rvTypeShort}s?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.search.resultCount >= 3 ? 60 : 20;
    },
  },
  {
    id: 'pv-rvtype-great-deals',
    category: 'price-validation',
    text: '{greatDeals} great {rvTypeShort} deals',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.search.dealBreakdown.great > 0 ? 70 : 0;
    },
  },
  {
    id: 'pv-rvtype-price-range',
    category: 'price-validation',
    text: '{rvTypeShort} price range?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      return hasRvTypeContext(input) ? 50 : 0;
    },
  },
  // Generic
  {
    id: 'pv-great-deals-generic',
    category: 'price-validation',
    text: 'Show me the {greatDeals} great deals',
    score: (input) => {
      if (hasExplicitMakeFilter(input) || hasRvTypeContext(input)) return 0;
      return input.search.dealBreakdown.great > 0 ? 60 : 0;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── model-comparison ──
  // ══════════════════════════════════════════════════════════════════

  // Make-specific
  {
    id: 'mc-compare-models',
    category: 'model-comparison',
    text: '{makeModelA} vs {makeModelB}?',
    score: (input) => {
      const combos = new Set(input.listings.map(l => `${l.make} ${l.model}`));
      return combos.size >= 2 ? 70 : 0;
    },
  },
  {
    id: 'mc-compare-makes',
    category: 'model-comparison',
    text: '{topMake} vs {secondMake}?',
    score: ({ search }) => search.topMakes.length >= 2 ? 55 : 0,
  },
  {
    id: 'mc-which-model-best',
    category: 'model-comparison',
    text: 'Which {make} model is best?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return hasMultipleModels(input) ? 65 : 0;
    },
  },
  {
    id: 'mc-model-vs-competitor',
    category: 'model-comparison',
    text: 'How does the {model} compare?',
    score: (input) => {
      if (!hasMultipleModels(input)) return 0;
      return 50;
    },
  },
  // RV-type tier
  {
    id: 'mc-rvtype-top-brands',
    category: 'model-comparison',
    text: 'Top {rvTypeShort} brands?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.search.topMakes.length >= 2 ? 55 : 20;
    },
  },
  {
    id: 'mc-rvtype-most-popular',
    category: 'model-comparison',
    text: 'Most popular {rvTypeShort}?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      return hasRvTypeContext(input) ? 50 : 0;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── condition-inspection ──
  // ══════════════════════════════════════════════════════════════════

  // Make-specific
  {
    id: 'ci-make-reliability',
    category: 'condition-inspection',
    text: 'Is {make} reliable?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return input.filters.condition !== 'new' ? 70 : 35;
    },
  },
  {
    id: 'ci-model-known-issues',
    category: 'condition-inspection',
    text: '{model} known issues?',
    score: (input) => {
      if (!hasMultipleModels(input) && !input.filters.models.length) return 0;
      return input.filters.condition !== 'new' ? 60 : 25;
    },
  },
  {
    id: 'ci-used-make-checklist',
    category: 'condition-inspection',
    text: 'Used {make} inspection tips?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return input.filters.condition === 'used' ? 65 : 10;
    },
  },
  {
    id: 'ci-high-mileage',
    category: 'condition-inspection',
    text: 'High-mileage {make} — OK?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      if (input.filters.condition === 'new') return 0;
      const highMile = input.listings.filter(l => l.mileage !== null && l.mileage > 50000);
      return highMile.length > 2 ? 55 : 10;
    },
  },
  {
    id: 'ci-long-dom',
    category: 'condition-inspection',
    text: 'Why are some {make}s unsold?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      const longDom = input.listings.filter(l => l.daysOnSite > 90);
      return longDom.length > 3 ? 50 : 0;
    },
  },
  // RV-type tier
  {
    id: 'ci-rvtype-common-issues',
    category: 'condition-inspection',
    text: 'Common {rvTypeShort} issues?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.filters.condition !== 'new' ? 55 : 20;
    },
  },
  {
    id: 'ci-rvtype-inspection',
    category: 'condition-inspection',
    text: 'Used {rvTypeShort} checklist?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.filters.condition === 'used' ? 50 : 10;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── lifestyle-fit ──
  // ══════════════════════════════════════════════════════════════════

  // Make-specific
  {
    id: 'lf-make-for-families',
    category: 'lifestyle-fit',
    text: 'Best {make} for families?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      const familyFriendly = input.listings.filter(l => l.sleepingCapacity >= 6);
      return familyFriendly.length > 2 ? 60 : 20;
    },
  },
  {
    id: 'lf-model-full-time',
    category: 'lifestyle-fit',
    text: 'Is the {model} good full-time?',
    score: (input) => {
      if (!hasMultipleModels(input) && !input.filters.models.length) return 0;
      const large = input.listings.filter(l => l.lengthFt >= 30);
      return large.length > 2 ? 55 : 10;
    },
  },
  {
    id: 'lf-make-first-timer',
    category: 'lifestyle-fit',
    text: 'Is {make} good for beginners?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return 45;
    },
  },
  // RV-type tier
  {
    id: 'lf-rvtype-families',
    category: 'lifestyle-fit',
    text: 'Best {rvTypeShort} for families?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      const familyFriendly = input.listings.filter(l => l.sleepingCapacity >= 6);
      return familyFriendly.length > 2 ? 55 : 20;
    },
  },
  {
    id: 'lf-rvtype-full-time',
    category: 'lifestyle-fit',
    text: '{rvTypeShort}s for full-time living?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      const large = input.listings.filter(l => l.lengthFt >= 30);
      return large.length > 2 ? 50 : 10;
    },
  },
  {
    id: 'lf-rvtype-beginners',
    category: 'lifestyle-fit',
    text: '{rvTypeShort}s good for beginners?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      return hasRvTypeContext(input) ? 45 : 0;
    },
  },
  // Generic
  {
    id: 'lf-first-timer-generic',
    category: 'lifestyle-fit',
    text: 'Best pick for a first-timer?',
    score: (input) => {
      if (hasExplicitMakeFilter(input) || hasRvTypeContext(input)) return 0;
      return 55;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── depreciation-value ──
  // ══════════════════════════════════════════════════════════════════

  // Make-specific
  {
    id: 'dv-make-hold-value',
    category: 'depreciation-value',
    text: 'Does {make} hold its value?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return 60;
    },
  },
  {
    id: 'dv-model-depreciation',
    category: 'depreciation-value',
    text: '{model} depreciation rate?',
    score: (input) => {
      if (!hasMultipleModels(input) && !input.filters.models.length) return 0;
      return 50;
    },
  },
  {
    id: 'dv-new-vs-used-make',
    category: 'depreciation-value',
    text: 'New vs used {make} savings?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      const hasNew = input.listings.some(l => l.condition === 'new');
      const hasUsed = input.listings.some(l => l.condition === 'used');
      return hasNew && hasUsed ? 65 : 10;
    },
  },
  {
    id: 'dv-year-make-value',
    category: 'depreciation-value',
    text: 'Best year for a used {make}?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      const years = new Set(input.listings.map(l => l.year));
      return years.size >= 3 ? 50 : 10;
    },
  },
  // RV-type tier
  {
    id: 'dv-rvtype-hold-value',
    category: 'depreciation-value',
    text: 'Do {rvTypeShort}s hold value?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      return hasRvTypeContext(input) ? 50 : 0;
    },
  },
  {
    id: 'dv-rvtype-new-vs-used',
    category: 'depreciation-value',
    text: 'New vs used {rvTypeShort} savings?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      const hasNew = input.listings.some(l => l.condition === 'new');
      const hasUsed = input.listings.some(l => l.condition === 'used');
      return hasNew && hasUsed ? 55 : 10;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── regional-seasonal ──
  // ══════════════════════════════════════════════════════════════════

  // Make-specific
  {
    id: 'rs-make-market',
    category: 'regional-seasonal',
    text: '{make} market in {state}?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return input.listings[0]?.location?.state ? 55 : 0;
    },
  },
  {
    id: 'rs-market-overview',
    category: 'regional-seasonal',
    text: "What's the {make} market like?",
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return input.search.resultCount >= 5 ? 50 : 30;
    },
  },
  {
    id: 'rs-best-time-buy',
    category: 'regional-seasonal',
    text: 'Best time to buy a {make}?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return 45;
    },
  },
  {
    id: 'rs-seasonal-deals',
    category: 'regional-seasonal',
    text: 'Seasonal {make} deals?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      return Math.abs(input.search.priceTrend) > 3 ? 50 : 20;
    },
  },
  // RV-type tier
  {
    id: 'rs-rvtype-market',
    category: 'regional-seasonal',
    text: '{rvTypeShort} market overview?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.search.resultCount >= 5 ? 50 : 25;
    },
  },
  {
    id: 'rs-rvtype-seasonal',
    category: 'regional-seasonal',
    text: 'Best time to buy {rvTypeShort}s?',
    score: (input) => {
      if (hasExplicitMakeFilter(input)) return 0;
      return hasRvTypeContext(input) ? 45 : 0;
    },
  },
  // Generic
  {
    id: 'rs-market-generic',
    category: 'regional-seasonal',
    text: "What's the market like?",
    score: (input) => {
      if (hasExplicitMakeFilter(input) || hasRvTypeContext(input)) return 0;
      return 55;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── MULTI-TYPE COMPARISON (2+ RV types selected) ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'mt-compare-types',
    category: 'model-comparison',
    text: '{rvTypeAShort} vs {rvTypeBShort}?',
    score: (input) => {
      if (!hasMultipleRvTypes(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 30; // lower when make filter exists
      return 65;
    },
  },
  {
    id: 'mt-which-type-value',
    category: 'depreciation-value',
    text: 'Which type holds value better?',
    score: (input) => {
      if (!hasMultipleRvTypes(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      return 55;
    },
  },
  {
    id: 'mt-type-for-budget',
    category: 'price-validation',
    text: 'Which type fits my budget?',
    score: (input) => {
      if (!hasMultipleRvTypes(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      return 60;
    },
  },
  {
    id: 'mt-towing-comparison',
    category: 'tow-compatibility',
    text: 'Towing: {rvTypeAShort} vs {rvTypeBShort}?',
    score: (input) => {
      if (!hasMultipleRvTypes(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      return input.listings.some(l => isTowableType(l.rvType)) ? 55 : 0;
    },
  },
  {
    id: 'mt-type-lifestyle',
    category: 'lifestyle-fit',
    text: 'Which type suits my lifestyle?',
    score: (input) => {
      if (!hasMultipleRvTypes(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      return 50;
    },
  },
  {
    id: 'mt-deals-across-types',
    category: 'price-validation',
    text: 'Best deals across these types?',
    score: (input) => {
      if (!hasMultipleRvTypes(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      return input.search.dealBreakdown.great > 0 ? 55 : 25;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── MAKE + TYPE COMBINATION ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'mkt-best-make-type',
    category: 'model-comparison',
    text: 'Best {make} {rvTypeShort}?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return hasMultipleModels(input) ? 70 : 45;
    },
  },
  {
    id: 'mkt-make-type-floorplans',
    category: 'floor-plan',
    text: '{make} {rvTypeShort} layouts?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return 60;
    },
  },
  {
    id: 'mkt-make-vs-competitor-type',
    category: 'model-comparison',
    text: '{make} vs other {rvTypeShort}s?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      if (!hasRvTypeContext(input)) return 0;
      return input.search.topMakes.length >= 2 ? 55 : 0;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── MOTORHOME-SPECIFIC ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'mh-fuel-costs',
    category: 'price-validation',
    text: '{rvTypeShort} fuel costs?',
    score: (input) => {
      if (!isMotorhomeSearch(input)) return 0;
      if (hasMakeContext(input)) return 35;
      return hasRvTypeContext(input) ? 55 : 0;
    },
  },
  {
    id: 'mh-chassis-reliability',
    category: 'condition-inspection',
    text: '{rvTypeShort} chassis issues?',
    score: (input) => {
      if (!isMotorhomeSearch(input)) return 0;
      return hasRvTypeContext(input) ? 50 : 0;
    },
  },
  {
    id: 'mh-drivability',
    category: 'lifestyle-fit',
    text: 'Is a {rvTypeShort} easy to drive?',
    score: (input) => {
      if (!isMotorhomeSearch(input)) return 0;
      const types = input.filters.rvTypes;
      const relevant = types.includes('class-a') || types.includes('class-c') || types.length === 0;
      return relevant && hasRvTypeContext(input) ? 50 : 0;
    },
  },
  {
    id: 'mh-campground-fit',
    category: 'lifestyle-fit',
    text: '{rvTypeShort} campground access?',
    score: (input) => {
      if (!isMotorhomeSearch(input)) return 0;
      if (input.filters.rvTypes.includes('class-a')) return 50;
      return hasRvTypeContext(input) ? 35 : 0;
    },
  },
  {
    id: 'mh-gas-vs-diesel',
    category: 'model-comparison',
    text: 'Gas vs diesel {rvTypeShort}s?',
    score: (input) => {
      if (!isMotorhomeSearch(input)) return 0;
      const types = input.filters.rvTypes;
      if (types.includes('class-a') || types.includes('class-c')) {
        const hasGas = input.listings.some(l => l.fuelType === 'gas');
        const hasDiesel = input.listings.some(l => l.fuelType === 'diesel');
        return hasGas && hasDiesel ? 55 : 20;
      }
      return 0;
    },
  },
  {
    id: 'mh-classb-vanlife',
    category: 'lifestyle-fit',
    text: 'Class B van life tips?',
    score: (input) => {
      if (!input.filters.rvTypes.includes('class-b')) return 0;
      return 55;
    },
  },
  {
    id: 'mh-classb-stealth',
    category: 'lifestyle-fit',
    text: 'Stealth camping in a Class B?',
    score: (input) => {
      if (!input.filters.rvTypes.includes('class-b')) return 0;
      return 40;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── FIFTH WHEEL SPECIFIC ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'fw-hitch-types',
    category: 'tow-compatibility',
    text: 'Fifth wheel hitch options?',
    score: (input) => isFifthWheelSearch(input) ? 55 : 0,
  },
  {
    id: 'fw-truck-requirements',
    category: 'tow-compatibility',
    text: 'What truck for a fifth wheel?',
    score: (input) => {
      if (input.towVehicle) return 0;
      return isFifthWheelSearch(input) ? 50 : 0;
    },
  },
  {
    id: 'fw-vs-travel-trailer',
    category: 'model-comparison',
    text: 'Fifth wheel vs travel trailer?',
    score: (input) => {
      if (!isFifthWheelSearch(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      return 45;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── TOY HAULER SPECIFIC ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'th-garage-size',
    category: 'floor-plan',
    text: 'Toy hauler garage dimensions?',
    score: (input) => isToyHaulerSearch(input) ? 55 : 0,
  },
  {
    id: 'th-hauler-vs-trailer',
    category: 'model-comparison',
    text: 'Toy hauler vs travel trailer?',
    score: (input) => {
      if (!isToyHaulerSearch(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      return 45;
    },
  },
  {
    id: 'th-what-fits',
    category: 'lifestyle-fit',
    text: 'What fits in the garage?',
    score: (input) => isToyHaulerSearch(input) ? 50 : 0,
  },

  // ══════════════════════════════════════════════════════════════════
  // ── NICHE TYPE-SPECIFIC ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'nt-popup-setup',
    category: 'lifestyle-fit',
    text: 'Pop-up setup & teardown time?',
    score: (input) => getNicheType(input) === 'pop-up' ? 60 : 0,
  },
  {
    id: 'nt-popup-weather',
    category: 'condition-inspection',
    text: 'Pop-ups in bad weather?',
    score: (input) => getNicheType(input) === 'pop-up' ? 50 : 0,
  },
  {
    id: 'nt-popup-vs-trailer',
    category: 'model-comparison',
    text: 'Pop-up vs small trailer?',
    score: (input) => getNicheType(input) === 'pop-up' ? 45 : 0,
  },
  {
    id: 'nt-truckcamper-fitment',
    category: 'tow-compatibility',
    text: 'Truck bed size compatibility?',
    score: (input) => getNicheType(input) === 'truck-camper' ? 65 : 0,
  },
  {
    id: 'nt-truckcamper-payload',
    category: 'tow-compatibility',
    text: 'Truck payload for campers?',
    score: (input) => getNicheType(input) === 'truck-camper' ? 55 : 0,
  },
  {
    id: 'nt-truckcamper-offgrid',
    category: 'lifestyle-fit',
    text: 'Truck camper off-grid capable?',
    score: (input) => getNicheType(input) === 'truck-camper' ? 45 : 0,
  },
  {
    id: 'nt-parkmodel-regulations',
    category: 'lifestyle-fit',
    text: 'Park model zoning rules?',
    score: (input) => getNicheType(input) === 'park-model' ? 60 : 0,
  },
  {
    id: 'nt-parkmodel-financing',
    category: 'price-validation',
    text: 'Park model financing options?',
    score: (input) => getNicheType(input) === 'park-model' ? 50 : 0,
  },
  {
    id: 'nt-parkmodel-vs-tiny',
    category: 'model-comparison',
    text: 'Park model vs tiny home?',
    score: (input) => getNicheType(input) === 'park-model' ? 45 : 0,
  },
  {
    id: 'nt-fishhouse-seasonal',
    category: 'regional-seasonal',
    text: 'Fish house season & storage?',
    score: (input) => getNicheType(input) === 'fish-house' ? 60 : 0,
  },
  {
    id: 'nt-fishhouse-features',
    category: 'floor-plan',
    text: 'Fish house must-have features?',
    score: (input) => getNicheType(input) === 'fish-house' ? 55 : 0,
  },

  // ══════════════════════════════════════════════════════════════════
  // ── CONDITION-SPECIFIC ──
  // ══════════════════════════════════════════════════════════════════

  // New-only
  {
    id: 'cond-new-warranty',
    category: 'condition-inspection',
    text: 'New {make} warranty coverage?',
    score: (input) => {
      if (!isNewOnly(input)) return 0;
      return hasMakeContext(input) ? 60 : 0;
    },
  },
  {
    id: 'cond-new-negotiate',
    category: 'price-validation',
    text: 'Negotiate a new {make} price?',
    score: (input) => {
      if (!isNewOnly(input)) return 0;
      return hasMakeContext(input) ? 55 : 0;
    },
  },
  {
    id: 'cond-new-rvtype-warranty',
    category: 'condition-inspection',
    text: 'New {rvTypeShort} warranty?',
    score: (input) => {
      if (!isNewOnly(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      return hasRvTypeContext(input) ? 50 : 0;
    },
  },
  {
    id: 'cond-new-msrp',
    category: 'price-validation',
    text: 'How far below MSRP can I go?',
    score: (input) => {
      if (!isNewOnly(input)) return 0;
      return 45;
    },
  },
  // Used-only (beyond existing inspection chips)
  {
    id: 'cond-used-sweetspot',
    category: 'depreciation-value',
    text: 'Sweet spot year for used {make}?',
    score: (input) => {
      if (!isUsedOnly(input)) return 0;
      if (!hasMakeContext(input)) return 0;
      const years = new Set(input.listings.map(l => l.year));
      return years.size >= 3 ? 55 : 20;
    },
  },
  {
    id: 'cond-used-avoid-years',
    category: 'condition-inspection',
    text: '{make} years to avoid?',
    score: (input) => {
      if (!isUsedOnly(input)) return 0;
      return hasMakeContext(input) ? 55 : 0;
    },
  },
  {
    id: 'cond-used-rvtype-guide',
    category: 'condition-inspection',
    text: 'Used {rvTypeShort} buying guide?',
    score: (input) => {
      if (!isUsedOnly(input)) return 0;
      if (hasExplicitMakeFilter(input)) return 0;
      return hasRvTypeContext(input) ? 50 : 0;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── PRICE FILTER CHIPS ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'pf-best-under-max',
    category: 'price-validation',
    text: 'Best picks under {priceMaxFilter}?',
    score: (input) => {
      if (input.filters.priceMax === null) return 0;
      return 65;
    },
  },
  {
    id: 'pf-stretch-budget',
    category: 'price-validation',
    text: 'Worth stretching my budget?',
    score: (input) => {
      if (input.filters.priceMax === null) return 0;
      return 45;
    },
  },
  {
    id: 'pf-best-value-range',
    category: 'depreciation-value',
    text: 'Best value in this price range?',
    score: (input) => {
      if (!hasPriceFilter(input)) return 0;
      return 50;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── LOW RESULTS ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'lr-broaden-search',
    category: 'regional-seasonal',
    text: 'How to find more listings?',
    score: (input) => isLowResults(input) ? 60 : 0,
  },
  {
    id: 'lr-similar-alternatives',
    category: 'model-comparison',
    text: 'Similar alternatives to consider?',
    score: (input) => isLowResults(input) ? 55 : 0,
  },
  {
    id: 'lr-expand-area',
    category: 'regional-seasonal',
    text: 'Expand search radius?',
    score: (input) => isLowResults(input) ? 50 : 0,
  },

  // ══════════════════════════════════════════════════════════════════
  // ── BROAD SEARCH (no filters at all) ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'bs-choose-type',
    category: 'model-comparison',
    text: 'Help me choose an RV type',
    score: (input) => isBroadSearch(input) ? 70 : 0,
  },
  {
    id: 'bs-popular-now',
    category: 'regional-seasonal',
    text: "What's popular right now?",
    score: (input) => isBroadSearch(input) ? 65 : 0,
  },
  {
    id: 'bs-budget-guide',
    category: 'price-validation',
    text: 'What can I get for my budget?',
    score: (input) => isBroadSearch(input) ? 65 : 0,
  },
  {
    id: 'bs-first-rv',
    category: 'lifestyle-fit',
    text: 'First RV — where do I start?',
    score: (input) => isBroadSearch(input) ? 60 : 0,
  },
  {
    id: 'bs-best-brands',
    category: 'model-comparison',
    text: 'What are the best RV brands?',
    score: (input) => isBroadSearch(input) ? 60 : 0,
  },
  {
    id: 'bs-towable-vs-motorhome',
    category: 'model-comparison',
    text: 'Towable or motorhome?',
    score: (input) => isBroadSearch(input) ? 65 : 0,
  },

  // ══════════════════════════════════════════════════════════════════
  // ── YEAR-SPECIFIC ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'yr-best-year-make',
    category: 'depreciation-value',
    text: 'Best model year for {make}?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      const years = new Set(input.listings.map(l => l.year));
      return years.size >= 3 ? 50 : 0;
    },
  },
  {
    id: 'yr-old-vs-new',
    category: 'depreciation-value',
    text: '{minYear} vs {maxYear} {make}?',
    score: (input) => {
      if (!hasMakeContext(input)) return 0;
      const years = input.listings.map(l => l.year);
      if (years.length === 0) return 0;
      const min = Math.min(...years);
      const max = Math.max(...years);
      return max - min >= 5 ? 45 : 0;
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // ── MAKE + MODEL DEEP ──
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'mm-model-trims',
    category: 'model-comparison',
    text: '{model} trim differences?',
    score: (input) => {
      if (!input.filters.models.length) return 0;
      const modelListings = input.listings.filter(l => l.model === input.filters.models[0]);
      const trims = new Set(modelListings.map(l => l.trim).filter(Boolean));
      return trims.size >= 2 ? 60 : 15;
    },
  },
  {
    id: 'mm-model-year-changes',
    category: 'depreciation-value',
    text: '{model} year-over-year changes?',
    score: (input) => {
      if (!input.filters.models.length) return 0;
      const modelListings = input.listings.filter(l => l.model === input.filters.models[0]);
      const years = new Set(modelListings.map(l => l.year));
      return years.size >= 2 ? 55 : 0;
    },
  },
  {
    id: 'mm-model-alternatives',
    category: 'model-comparison',
    text: 'Alternatives to the {model}?',
    score: (input) => {
      if (!input.filters.models.length) return 0;
      return 50;
    },
  },
];

// ─── Fallback chips ─────────────────────────────────────────────────

const FALLBACK_CHIPS = [
  'Help me choose an RV type',
  'Show me the best deals',
  "What's the market like?",
];

// ─── Scoring engine ─────────────────────────────────────────────────

const MINIMUM_SCORE = 10;

export function generateSrpChips(
  input: ChipEngineInput,
  history: ChipHistory,
): string[] {
  const interpolationMap = buildInterpolationMap(input);

  const scored: { text: string; score: number; category: ChipCategory }[] = [];

  for (const template of CHIP_TEMPLATES) {
    let rawScore = template.score(input);
    if (rawScore <= 0) continue;

    // Make-specificity damping: if a chip references {make} but the user
    // didn't explicitly filter by make, reduce its score so discovery/broad
    // chips can compete. Without this, incidental top-make from listings
    // (e.g. Forest River) dominates every unfiltered search.
    if (template.text.includes('{make}') && !hasExplicitMakeFilter(input)) {
      rawScore *= makeSpecificityMultiplier(input);
    }

    // History modifiers
    const lastCategory = history.turns[history.turns.length - 1] ?? null;
    const recentCategories = history.turns.slice(-3);

    if (lastCategory === template.category) {
      rawScore *= 0.10;
    } else if (recentCategories.includes(template.category)) {
      rawScore *= 0.40;
    }

    if (lastCategory) {
      const affinities = CATEGORY_AFFINITY[lastCategory];
      const boost = affinities?.[template.category];
      if (boost) {
        rawScore *= (1 + boost);
      }
    }

    if (!history.turns.includes(template.category)) {
      rawScore *= 1.15;
    }

    if (rawScore < MINIMUM_SCORE) continue;

    const text = interpolate(template.text, interpolationMap);
    if (!text) continue;

    scored.push({ text, score: rawScore, category: template.category });
  }

  scored.sort((a, b) => b.score - a.score);

  const picked: string[] = [];
  const categoryCounts = new Map<ChipCategory, number>();

  for (const item of scored) {
    const count = categoryCounts.get(item.category) ?? 0;
    if (count >= 2) continue;
    picked.push(item.text);
    categoryCounts.set(item.category, count + 1);
    if (picked.length >= 8) break;
  }

  if (picked.length < 4) {
    for (const fb of FALLBACK_CHIPS) {
      if (!picked.includes(fb)) {
        picked.push(fb);
      }
      if (picked.length >= 4) break;
    }
  }

  return picked;
}

// ─── History advancement ────────────────────────────────────────────

export function advanceChipHistory(
  current: ChipHistory,
  category: ChipCategory,
): ChipHistory {
  return {
    turns: [...current.turns, category],
    turnCount: current.turnCount + 1,
  };
}
