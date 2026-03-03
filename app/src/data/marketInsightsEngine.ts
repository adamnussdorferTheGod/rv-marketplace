import type { ListingData } from './types';
import type { SRPListing, RVType } from './srpTypes';
import type {
  MarketInsightsResult,
  MarketInsightsOk,
  MarketInsightsInsufficient,
  DaysOnMarketData,
  SupplyData,
  SeasonalData,
  SeasonalRating,
  PriceDropData,
} from './marketInsightsTypes';
import {
  MIN_SAMPLE,
  YEAR_TOLERANCE,
  SEASONAL_MULTIPLIERS,
} from './marketInsightsTypes';

// ─── Internal helpers (not exported) ─────────────────────────────────

/**
 * Extract RV type from listing specs and normalize to RVType union.
 * Duplicates parseRvType logic from sampleSrpListings.ts to avoid import coupling.
 */
function resolveRvType(listing: ListingData): RVType {
  const spec = listing.specs.find(
    (s) => s.label.toLowerCase() === 'rv type'
  );
  const v = (spec?.value ?? '').toLowerCase();

  if (v.includes('toy hauler')) return 'toy-hauler';
  if (v.includes('pop-up') || v.includes('folding')) return 'pop-up';
  if (v.includes('fifth wheel')) return 'fifth-wheel';
  if (v.includes('fish house')) return 'fish-house';
  if (v.includes('truck camper')) return 'truck-camper';
  if (v.includes('park model')) return 'park-model';
  if (v.includes('class a')) return 'class-a';
  if (v.includes('class b')) return 'class-b';
  if (v.includes('class c')) return 'class-c';
  return 'travel-trailer';
}

/**
 * Extract year from listing. Uses listing.year if available,
 * otherwise parses first 4-digit number from title.
 */
function resolveYear(listing: ListingData): number {
  if (listing.year) return listing.year;
  const match = listing.title.match(/\b(19|20)\d{2}\b/);
  return match ? parseInt(match[0], 10) : new Date().getFullYear();
}

/**
 * Filter pool by exact RV type match AND year within YEAR_TOLERANCE.
 * Never mutates pool.
 */
function findComparables(
  rvType: RVType,
  year: number,
  pool: SRPListing[]
): SRPListing[] {
  return pool.filter(
    (comp) =>
      comp.rvType === rvType &&
      Math.abs(year - comp.year) <= YEAR_TOLERANCE
  );
}

/**
 * Compute days-on-market statistics from comparables.
 * relativeTo: listing < avg-5 = 'faster', > avg+5 = 'slower', else 'average'.
 */
function computeDaysOnMarket(
  listingDays: number,
  comparables: SRPListing[]
): DaysOnMarketData {
  const days = comparables.map((c) => c.daysOnSite);
  const sorted = [...days].sort((a, b) => a - b);

  const sum = days.reduce((acc, d) => acc + d, 0);
  const averageDays = Math.round(sum / days.length);

  const mid = Math.floor(sorted.length / 2);
  const medianDays =
    sorted.length % 2 === 0
      ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
      : sorted[mid];

  const rangeLow = sorted[0];
  const rangeHigh = sorted[sorted.length - 1];

  let relativeTo: 'faster' | 'slower' | 'average';
  if (listingDays < averageDays - 5) {
    relativeTo = 'faster';
  } else if (listingDays > averageDays + 5) {
    relativeTo = 'slower';
  } else {
    relativeTo = 'average';
  }

  return {
    listingDays,
    averageDays,
    medianDays,
    rangeLow,
    rangeHigh,
    relativeTo,
  };
}

/**
 * Compute supply data from comparables.
 * Trend heuristic: avgDaysOnSite < 25 = 'rising' (fresh inventory),
 * > 50 = 'falling' (stale inventory), else 'stable'.
 */
function computeSupply(comparables: SRPListing[]): SupplyData {
  const totalListings = comparables.length;
  const sum = comparables.reduce((acc, c) => acc + c.daysOnSite, 0);
  const avgDaysOnSite = Math.round(sum / comparables.length);

  let trend: SupplyData['trend'];
  if (avgDaysOnSite < 25) {
    trend = 'rising';
  } else if (avgDaysOnSite > 50) {
    trend = 'falling';
  } else {
    trend = 'stable';
  }

  return { totalListings, trend, avgDaysOnSite };
}

/**
 * Compute seasonal data from SEASONAL_MULTIPLIERS for current month and RV type.
 * Rating: multiplier <= 0.80 = 'great', <= 0.95 = 'good', <= 1.10 = 'fair', > 1.10 = 'poor'.
 * savingsVsPeak = (peakMultiplier - currentMultiplier) / peakMultiplier * 100.
 */
function computeSeasonal(rvType: RVType): SeasonalData {
  const currentMonth = new Date().getMonth();
  const multipliers = SEASONAL_MULTIPLIERS[rvType];
  const multiplier = multipliers[currentMonth];

  let rating: SeasonalRating;
  if (multiplier <= 0.80) {
    rating = 'great';
  } else if (multiplier <= 0.95) {
    rating = 'good';
  } else if (multiplier <= 1.10) {
    rating = 'fair';
  } else {
    rating = 'poor';
  }

  const peakMultiplier = Math.max(...multipliers);
  const peakMonth = multipliers.indexOf(peakMultiplier);
  const savingsVsPeak =
    ((peakMultiplier - multiplier) / peakMultiplier) * 100;

  return {
    currentMonth,
    multiplier,
    rating,
    savingsVsPeak,
    peakMonth,
  };
}

/**
 * Compute price drop data from listing's priceHistory and comparable pool.
 * Finds last "Price reduced" entry. marketDropRate = % of comparables with originalPrice !== null.
 */
function computePriceDrop(
  listing: ListingData,
  comparables: SRPListing[]
): PriceDropData {
  const history = listing.priceAnalysis.priceHistory;

  // Find last "Price reduced" entry
  const reductions = history.filter(
    (h) =>
      h.change.toLowerCase().includes('reduc') ||
      h.change.toLowerCase().includes('drop')
  );

  // Compute market drop rate from comparable pool
  const droppedCount = comparables.filter(
    (c) => c.originalPrice !== null
  ).length;
  const marketDropRate =
    comparables.length > 0
      ? Math.round((droppedCount / comparables.length) * 100)
      : 0;

  if (reductions.length > 0) {
    const lastReduction = reductions[reductions.length - 1];
    // Original price is the first entry in history (listed price)
    const originalPrice = history[0]?.price ?? listing.currentPrice;
    const dropAmount = originalPrice - listing.currentPrice;
    const dropPercent =
      originalPrice > 0 ? (dropAmount / originalPrice) * 100 : 0;

    return {
      hasRecentDrop: true,
      dropAmount,
      dropPercent,
      dropDate: lastReduction.date,
      originalPrice,
      currentPrice: listing.currentPrice,
      marketDropRate,
    };
  }

  return {
    hasRecentDrop: false,
    dropAmount: 0,
    dropPercent: 0,
    dropDate: '',
    originalPrice: listing.currentPrice,
    currentPrice: listing.currentPrice,
    marketDropRate,
  };
}

// ─── Main exported function ──────────────────────────────────────────

/**
 * Generate market insight metrics from a listing and a comparable pool.
 * Returns MarketInsightsOk when sufficient comparables exist,
 * MarketInsightsInsufficient otherwise.
 *
 * Follows the generate-then-render pattern established by generateDealKit.ts.
 */
export function generateMarketInsights(
  listing: ListingData,
  pool: SRPListing[]
): MarketInsightsResult {
  const rvType = resolveRvType(listing);
  const year = resolveYear(listing);
  const comparables = findComparables(rvType, year, pool);

  if (comparables.length < MIN_SAMPLE) {
    return {
      status: 'insufficient',
      comparableCount: comparables.length,
      minimumRequired: MIN_SAMPLE,
      rvType,
    } satisfies MarketInsightsInsufficient;
  }

  const daysOnMarket = computeDaysOnMarket(listing.daysOnSite, comparables);
  const supply = computeSupply(comparables);
  const seasonal = computeSeasonal(rvType);
  const priceDrop = computePriceDrop(listing, comparables);

  return {
    status: 'ok',
    comparableCount: comparables.length,
    comparisonScope: 'exact-type',
    daysOnMarket,
    supply,
    seasonal,
    priceDrop,
  } satisfies MarketInsightsOk;
}
