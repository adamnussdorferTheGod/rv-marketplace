import type { SRPListing, FilterCriteria, RVType } from './srpTypes';
import type {
  SrpSummaryData,
  ConfidenceLevel,
  HeadlineStats,
  PriceBin,
  DealBreakdown,
  NarrativeData,
  SearchContextType,
} from './srpSummaryTypes';
import {
  CATEGORY_BASELINES,
  OPENING_TEMPLATES,
  BODY_TEMPLATES,
} from './srpSummaryTypes';

// ---- Internal helpers ----

function computeMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[mid];
}

function computeAverage(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return Math.round(sum / values.length);
}

// ---- Headline stats (SUMM-01) ----

function getDominantRvType(listings: SRPListing[]): RVType | null {
  if (listings.length === 0) return null;

  const counts = new Map<RVType, number>();
  for (const l of listings) {
    counts.set(l.rvType, (counts.get(l.rvType) ?? 0) + 1);
  }

  let maxType: RVType | null = null;
  let maxCount = 0;
  for (const [type, count] of counts) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  }

  // Only use dominant type if it represents >40% of listings
  return maxCount / listings.length > 0.4 ? maxType : null;
}

function computePriceTrend(
  listings: SRPListing[],
  rvType: RVType | null
): { trendPercent: number; referenceWindow: string } {
  if (listings.length === 0) {
    return { trendPercent: 0, referenceWindow: 'vs 6-month average' };
  }

  // Primary signal: actual price reductions in filtered set
  const reduced = listings.filter((l) => l.originalPrice !== null);
  const reductionRate = reduced.length / listings.length;

  let dataSignal = 0;
  if (reduced.length > 0) {
    const avgReductionPct =
      reduced.reduce((acc, l) => {
        const pct = ((l.originalPrice! - l.currentPrice) / l.originalPrice!) * 100;
        return acc + pct;
      }, 0) / reduced.length;
    dataSignal = avgReductionPct * reductionRate;
  }

  // Secondary signal: per-category baseline
  const baseline =
    rvType !== null ? CATEGORY_BASELINES[rvType].baselineTrend : -1.0;

  // Blend
  let trend: number;
  if (dataSignal > 0) {
    // Data says prices reduced (negative direction), weight data 70% + baseline 30%
    trend = -(dataSignal * 0.7) + baseline * 0.3;
  } else {
    // No reductions, use muted baseline
    trend = baseline * 0.5;
  }

  // Clamp to -5% to +3%
  trend = Math.max(-5, Math.min(3, trend));

  // Round to 1 decimal place
  trend = Math.round(trend * 10) / 10;

  return { trendPercent: trend, referenceWindow: 'vs 6-month average' };
}

function computeHeadlineStats(listings: SRPListing[]): HeadlineStats {
  const dominantRvType = getDominantRvType(listings);

  return {
    listingCount: listings.length,
    medianPrice: computeMedian(listings.map((l) => l.currentPrice)),
    priceTrend: computePriceTrend(listings, dominantRvType),
    avgDaysOnMarket: computeAverage(listings.map((l) => l.daysOnSite)),
  };
}

// ---- Histogram (SUMM-02) ----

function computeHistogramBins(listings: SRPListing[]): PriceBin[] {
  if (listings.length === 0) return [];

  const prices = listings.map((l) => l.currentPrice).sort((a, b) => a - b);
  const minPrice = prices[0];
  const maxPrice = prices[prices.length - 1];

  // Adaptive bin count: sqrt(n) capped at 8
  const binCount = Math.min(Math.ceil(Math.sqrt(listings.length)), 8);

  // If all same price, return single bin
  if (minPrice === maxPrice) {
    const label = formatPriceK(minPrice);
    return [{ min: minPrice, max: maxPrice, count: listings.length, label }];
  }

  // Raw bin width, rounded to nearest $5K
  const rawWidth = (maxPrice - minPrice) / binCount;
  const binWidth = Math.max(5000, Math.ceil(rawWidth / 5000) * 5000);

  // Floor bin start to nearest $5K
  const binStart = Math.floor(minPrice / 5000) * 5000;

  // Build bins, stopping when we've covered all prices
  const bins: PriceBin[] = [];
  let assigned = 0;

  for (let i = 0; i < binCount; i++) {
    const bMin = binStart + i * binWidth;
    const isLast = i === binCount - 1;

    if (isLast) {
      // Last bin captures all remaining listings
      const count = prices.length - assigned;
      const label = `${formatPriceK(bMin)}+`;
      bins.push({ min: bMin, max: maxPrice, count, label });
      assigned += count;
    } else {
      const bMax = binStart + (i + 1) * binWidth;
      const count = prices.filter((p) => p >= bMin && p < bMax).length;
      const label = `${formatPriceK(bMin)}-${formatPriceK(bMax)}`;
      bins.push({ min: bMin, max: bMax, count, label });
      assigned += count;
    }
  }

  // Merge trailing empty bins into the last non-empty bin
  while (bins.length > 1 && bins[bins.length - 1].count === 0) {
    bins.pop();
  }
  // Update last bin label to "+" format
  if (bins.length > 1) {
    const last = bins[bins.length - 1];
    last.label = `${formatPriceK(last.min)}+`;
    last.max = maxPrice;
  }

  return bins;
}

function formatPriceK(price: number): string {
  const k = Math.round(price / 1000);
  return `$${k}K`;
}

// ---- Deal breakdown (SUMM-03) ----

function computeDealBreakdown(listings: SRPListing[]): DealBreakdown {
  let great = 0;
  let good = 0;
  let fair = 0;

  for (const l of listings) {
    if (l.dealRating === 'great') great++;
    else if (l.dealRating === 'good') good++;
    else if (l.dealRating === 'fair') fair++;
    // 'high' and null excluded silently
  }

  return {
    great,
    good,
    fair,
    totalRated: great + good + fair,
    totalListings: listings.length,
  };
}

// ---- Confidence (SUMM-04) ----

function computeConfidence(count: number): ConfidenceLevel {
  if (count >= 50) return 'full';
  if (count >= 10) return 'medium';
  if (count >= 3) return 'low';
  return 'insufficient';
}

// ---- Narrative (SUMM-05, SUMM-06) ----

function countActiveFilters(filters: FilterCriteria): number {
  let count = 0;
  if (filters.keyword !== '') count++;
  if (filters.rvTypes.length > 0) count++;
  if (filters.makes.length > 0) count++;
  if (filters.models.length > 0) count++;
  if (filters.priceMin !== null) count++;
  if (filters.priceMax !== null) count++;
  if (filters.yearMin !== null) count++;
  if (filters.yearMax !== null) count++;
  if (filters.condition !== 'all') count++;
  if (filters.lengthMin !== null) count++;
  if (filters.lengthMax !== null) count++;
  if (filters.floorPlans.length > 0) count++;
  if (filters.sleepingCapacity !== null) count++;
  if (filters.fuelTypes.length > 0) count++;
  if (filters.grossVehicleWeightMax !== null) count++;
  return count;
}

function determineSearchContext(
  resultCount: number,
  filters: FilterCriteria
): SearchContextType {
  if (resultCount < 10) return 'low-results';

  const hasPriceFilter = filters.priceMin !== null || filters.priceMax !== null;
  if (hasPriceFilter && resultCount < 50) return 'price-focused';

  if (countActiveFilters(filters) === 0) return 'broad';

  if (resultCount < 20) return 'narrow';

  return 'filtered';
}

function formatPrice(price: number): string {
  return '$' + price.toLocaleString('en-US');
}

function interpolate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

function generateNarrative(
  stats: HeadlineStats,
  deal: DealBreakdown,
  confidence: ConfidenceLevel,
  context: SearchContextType,
  filters: FilterCriteria
): NarrativeData {
  // Determine type label
  const typeLabel =
    filters.rvTypes.length === 1
      ? formatTypeLabel(filters.rvTypes[0])
      : filters.rvTypes.length > 1
        ? 'RVs'
        : 'RVs';

  const vars: Record<string, string> = {
    count: String(stats.listingCount),
    typeLabel,
    medianPrice: formatPrice(stats.medianPrice),
    avgDom: String(stats.avgDaysOnMarket),
    dealPercent:
      deal.totalRated > 0
        ? String(Math.round(((deal.great + deal.good) / deal.totalRated) * 100))
        : '0',
    greatCount: String(deal.great),
    trendPercent: String(Math.abs(stats.priceTrend.trendPercent)),
  };

  // Pick headline from opening templates (first template for determinism)
  const openingTemplates = OPENING_TEMPLATES[context];
  const headline = interpolate(openingTemplates[0], vars);

  // Determine body condition
  let condition: string;
  const hasDeals =
    deal.totalRated > 0 &&
    (deal.great + deal.good) / deal.totalRated >= 0.3;
  const hasPriceDrop =
    Math.abs(stats.priceTrend.trendPercent) >= 1.0 &&
    stats.priceTrend.trendPercent < 0;

  if (hasDeals) {
    condition = 'has-deals';
  } else if (hasPriceDrop) {
    condition = 'price-dropping';
  } else {
    condition = 'general';
  }

  const bodyTemplates = BODY_TEMPLATES[condition];
  const body = interpolate(bodyTemplates[0], vars);

  return {
    headline,
    body,
    searchContext: context,
    groundingLabel: `Based on ${stats.listingCount} listings matching your search`,
  };
}

function formatTypeLabel(rvType: RVType): string {
  const labels: Record<RVType, string> = {
    'class-a': 'Class A Motorhomes',
    'class-b': 'Class B Motorhomes',
    'class-c': 'Class C Motorhomes',
    'travel-trailer': 'Travel Trailers',
    'fifth-wheel': 'Fifth Wheels',
    'toy-hauler': 'Toy Haulers',
    'pop-up': 'Pop-Up Campers',
    'truck-camper': 'Truck Campers',
    'park-model': 'Park Models',
    'fish-house': 'Fish Houses',
  };
  return labels[rvType];
}

// ---- Main export ----

export function generateSrpSummary(
  listings: SRPListing[],
  filters: FilterCriteria
): SrpSummaryData {
  const confidence = computeConfidence(listings.length);
  const headlineStats = computeHeadlineStats(listings);
  const priceDistribution = computeHistogramBins(listings);
  const dealBreakdown = computeDealBreakdown(listings);
  const searchContext = determineSearchContext(listings.length, filters);
  const narrative = generateNarrative(
    headlineStats, dealBreakdown, confidence, searchContext, filters
  );

  return {
    confidence,
    resultCount: listings.length,
    headlineStats,
    priceDistribution,
    dealBreakdown,
    narrative,
    generatedAt: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}
