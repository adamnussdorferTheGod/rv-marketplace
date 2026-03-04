import type { RVType } from './srpTypes';

// ---- Constants ----

/** Per-category baseline trends and average days on market */
export const CATEGORY_BASELINES: Record<RVType, { baselineTrend: number; avgDom: number }> = {
  'travel-trailer': { baselineTrend: -1.5, avgDom: 38 },
  'fifth-wheel': { baselineTrend: -2.0, avgDom: 45 },
  'class-a': { baselineTrend: -0.5, avgDom: 52 },
  'class-b': { baselineTrend: -1.0, avgDom: 48 },
  'class-c': { baselineTrend: -1.2, avgDom: 44 },
  'toy-hauler': { baselineTrend: -1.8, avgDom: 40 },
  'pop-up': { baselineTrend: -2.5, avgDom: 32 },
  'truck-camper': { baselineTrend: -1.0, avgDom: 35 },
  'park-model': { baselineTrend: +0.5, avgDom: 60 },
  'fish-house': { baselineTrend: -3.0, avgDom: 55 },
};

// ---- String literal unions ----

export type ConfidenceLevel = 'full' | 'medium' | 'low' | 'insufficient';

export type SearchContextType = 'broad' | 'filtered' | 'narrow' | 'price-focused' | 'low-results';

// ---- Sub-data interfaces ----

export interface HeadlineStats {
  listingCount: number;
  medianPrice: number;
  priceTrend: { trendPercent: number; referenceWindow: string };
  avgDaysOnMarket: number;
}

export interface PriceBin {
  min: number;
  max: number;
  count: number;
  label: string;
}

export interface DealBreakdown {
  great: number;      // "Well below market price"
  good: number;       // "Below market price"
  fair: number;       // "Around market price"
  totalRated: number;
  totalListings: number;
}

export interface NarrativeData {
  headline: string;           // Opening sentence (varies by SearchContextType)
  body: string;               // Supporting detail + actionable context (1-2 sentences)
  searchContext: SearchContextType;
  groundingLabel: string;     // e.g., "Based on 24 listings matching your search"
}

// ---- Top-level result ----

export interface SrpSummaryData {
  confidence: ConfidenceLevel;
  resultCount: number;
  headlineStats: HeadlineStats;
  priceDistribution: PriceBin[];
  dealBreakdown: DealBreakdown;
  narrative: NarrativeData;
  generatedAt: string;        // Formatted date string
}

// ---- Assistant message types (Phase 58+) ----

export interface AssistantTextMessage {
  type: 'text';
  content: string;
  recommendedListings?: import('./srpTypes').SRPListing[];
}

export interface AssistantComparisonMessage {
  type: 'comparison';
  items: Array<{ label: string; values: Record<string, string> }>;
}

export interface AssistantListingMessage {
  type: 'listing';
  listingIds: string[];
  context: string;
}

export interface AssistantActionMessage {
  type: 'action';
  text: string;
  actions: Array<{ label: string; filterKey: string; filterValue: string }>;
}

export type AssistantMessageData =
  | AssistantTextMessage
  | AssistantComparisonMessage
  | AssistantListingMessage
  | AssistantActionMessage;

// ---- Narrative templates ----

/**
 * Opening sentence templates keyed by SearchContextType.
 * Placeholders: {count}, {typeLabel}, {medianPrice}
 */
export const OPENING_TEMPLATES: Record<SearchContextType, string[]> = {
  broad: [
    'We found {count} RVs across the marketplace.',
    'There are {count} RVs available right now.',
  ],
  filtered: [
    'Your search returned {count} matching {typeLabel}.',
    '{count} {typeLabel} match your criteria.',
  ],
  narrow: [
    'We found {count} results for this specific search.',
  ],
  'price-focused': [
    '{count} {typeLabel} fall within your price range.',
  ],
  'low-results': [
    'We found {count} listings matching your search.',
  ],
};

/**
 * Body sentence templates for supporting detail + actionable context.
 * Keyed by condition: 'has-deals', 'price-dropping', 'general'.
 * Placeholders: {medianPrice}, {dealPercent}, {greatCount}, {trendPercent}, {avgDom}
 */
export const BODY_TEMPLATES: Record<string, string[]> = {
  'has-deals': [
    'The median asking price is {medianPrice}, and {dealPercent}% of rated listings are priced below market value.',
    'At a median of {medianPrice}, this market has solid options — {greatCount} listings are well below market price.',
  ],
  'price-dropping': [
    'Prices are trending down {trendPercent}% vs the 6-month average, with a median asking price of {medianPrice}.',
    'The median asking price sits at {medianPrice}, down {trendPercent}% from recent averages.',
  ],
  general: [
    'The median asking price is {medianPrice}, with listings averaging {avgDom} days on the market.',
    'Prices center around {medianPrice}, and the typical listing has been available for {avgDom} days.',
  ],
};
