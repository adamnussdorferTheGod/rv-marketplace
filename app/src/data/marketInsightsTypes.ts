import type { RVType } from './srpTypes';

// ---- Constants ----

/** Minimum comparable count before returning insufficient data */
export const MIN_SAMPLE = 3;

/** Year range for comparable matching (+/- 3 model years) */
export const YEAR_TOLERANCE = 3;

// ---- String literal unions ----

export type ComparisonScope = 'exact-type' | 'broadened';

export type SupplyTrend = 'rising' | 'falling' | 'stable';

export type SeasonalRating = 'great' | 'good' | 'fair' | 'poor';

// ---- Sub-insight data types ----

export interface DaysOnMarketData {
  listingDays: number;
  averageDays: number;
  medianDays: number;
  rangeLow: number;
  rangeHigh: number;
  relativeTo: 'faster' | 'slower' | 'average';
}

export interface SupplyData {
  totalListings: number;
  trend: SupplyTrend;
  avgDaysOnSite: number;
}

export interface SeasonalData {
  currentMonth: number;
  multiplier: number;
  rating: SeasonalRating;
  savingsVsPeak: number;
  peakMonth: number;
}

export interface PriceDropData {
  hasRecentDrop: boolean;
  dropAmount: number;
  dropPercent: number;
  dropDate: string;
  originalPrice: number;
  currentPrice: number;
  marketDropRate: number;
}

// ---- Result discriminated union ----

export interface MarketInsightsOk {
  status: 'ok';
  comparableCount: number;
  comparisonScope: ComparisonScope;
  daysOnMarket: DaysOnMarketData;
  supply: SupplyData;
  seasonal: SeasonalData;
  priceDrop: PriceDropData | null;
}

export interface MarketInsightsInsufficient {
  status: 'insufficient';
  comparableCount: number;
  minimumRequired: number;
  rvType: string;
}

export type MarketInsightsResult = MarketInsightsOk | MarketInsightsInsufficient;

// ---- Seasonal multipliers ----

/**
 * Monthly demand multipliers for each RV type (Jan=0 through Dec=11).
 * Values range from 0.65 to 1.30. Towables peak spring/summer,
 * motorhomes peak slightly earlier, fish-house has inverted winter peak.
 */
export const SEASONAL_MULTIPLIERS: Record<RVType, number[]> = Object.freeze({
  'travel-trailer': [0.75, 0.80, 0.95, 1.10, 1.20, 1.25, 1.20, 1.15, 1.00, 0.85, 0.75, 0.70],
  'fifth-wheel':    [0.70, 0.75, 0.90, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75, 0.70],
  'class-a':        [0.75, 0.80, 0.90, 1.10, 1.15, 1.20, 1.20, 1.15, 1.05, 0.90, 0.80, 0.75],
  'class-b':        [0.80, 0.85, 0.95, 1.10, 1.15, 1.20, 1.15, 1.10, 1.00, 0.90, 0.80, 0.75],
  'class-c':        [0.75, 0.80, 0.90, 1.10, 1.15, 1.20, 1.20, 1.15, 1.05, 0.90, 0.80, 0.75],
  'toy-hauler':     [0.70, 0.75, 0.90, 1.05, 1.15, 1.25, 1.30, 1.25, 1.10, 0.85, 0.70, 0.65],
  'pop-up':         [0.65, 0.70, 0.90, 1.10, 1.25, 1.30, 1.25, 1.15, 0.95, 0.80, 0.70, 0.65],
  'truck-camper':   [0.70, 0.75, 0.85, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75, 0.70],
  'park-model':     [0.80, 0.85, 0.90, 1.05, 1.10, 1.15, 1.15, 1.10, 1.05, 0.95, 0.85, 0.80],
  'fish-house':     [1.20, 1.15, 1.00, 0.85, 0.75, 0.70, 0.70, 0.75, 0.90, 1.05, 1.15, 1.25],
}) as Record<RVType, number[]>;
