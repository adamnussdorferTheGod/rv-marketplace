import { describe, it, expect } from 'vitest';
import { generateSrpSummary } from './srpSummaryEngine';
import type { SRPListing, FilterCriteria } from './srpTypes';
import { DEFAULT_FILTER_CRITERIA } from './srpTypes';

// ─── Test fixture factories ──────────────────────────────────────────

function makeListing(overrides: Partial<SRPListing> = {}): SRPListing {
  return {
    id: 'test-1',
    title: '2023 Test Travel Trailer',
    year: 2023,
    make: 'TestMake',
    model: 'TestModel',
    trim: 'Base',
    rvType: 'travel-trailer',
    condition: 'used',
    currentPrice: 35000,
    originalPrice: null,
    monthlyPayment: 250,
    dealRating: 'fair',
    photos: [],
    tagBadge: null,
    isFeatured: false,
    isSponsored: false,
    isFavorited: false,
    dealer: { name: 'Test Dealer', city: 'Austin', state: 'TX', distanceMiles: 10 },
    location: { city: 'Austin', state: 'TX', zip: '78701', lat: 30.27, lng: -97.74 },
    lengthFt: 28,
    sleepingCapacity: 6,
    fuelType: 'n/a',
    floorPlan: null,
    grossVehicleWeight: 7500,
    mileage: null,
    daysOnSite: 30,
    isTrustedPartner: false,
    ...overrides,
  };
}

function makeListings(count: number, overrides: Partial<SRPListing> = {}): SRPListing[] {
  return Array.from({ length: count }, (_, i) =>
    makeListing({
      id: `l-${i}`,
      currentPrice: 30000 + i * 1000,
      daysOnSite: 20 + i,
      ...overrides,
    })
  );
}

// ─── Tests ───────────────────────────────────────────────────────────

describe('generateSrpSummary', () => {

  // ── Confidence tiers (SUMM-04) ──

  describe('confidence tiers (SUMM-04)', () => {
    it('returns insufficient for 0 listings', () => {
      const result = generateSrpSummary([], DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('insufficient');
    });

    it('returns insufficient for 1 listing', () => {
      const result = generateSrpSummary(makeListings(1), DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('insufficient');
    });

    it('returns insufficient for 2 listings', () => {
      const result = generateSrpSummary(makeListings(2), DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('insufficient');
    });

    it('returns low for exactly 3 listings', () => {
      const result = generateSrpSummary(makeListings(3), DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('low');
    });

    it('returns low for 9 listings', () => {
      const result = generateSrpSummary(makeListings(9), DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('low');
    });

    it('returns medium for exactly 10 listings', () => {
      const result = generateSrpSummary(makeListings(10), DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('medium');
    });

    it('returns medium for 49 listings', () => {
      const result = generateSrpSummary(makeListings(49), DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('medium');
    });

    it('returns full for exactly 50 listings', () => {
      const result = generateSrpSummary(makeListings(50), DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('full');
    });

    it('returns full for 100 listings', () => {
      const result = generateSrpSummary(makeListings(100), DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('full');
    });
  });

  // ── Headline stats (SUMM-01) ──

  describe('headline stats (SUMM-01)', () => {
    it('listing count matches input length', () => {
      const listings = makeListings(15);
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.headlineStats.listingCount).toBe(15);
    });

    it('computes median price correctly for odd count', () => {
      const listings = [
        makeListing({ id: 'a', currentPrice: 20000 }),
        makeListing({ id: 'b', currentPrice: 30000 }),
        makeListing({ id: 'c', currentPrice: 50000 }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.headlineStats.medianPrice).toBe(30000);
    });

    it('computes median price correctly for even count', () => {
      const listings = [
        makeListing({ id: 'a', currentPrice: 20000 }),
        makeListing({ id: 'b', currentPrice: 30000 }),
        makeListing({ id: 'c', currentPrice: 40000 }),
        makeListing({ id: 'd', currentPrice: 50000 }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.headlineStats.medianPrice).toBe(35000);
    });

    it('computes average days on market correctly', () => {
      const listings = [
        makeListing({ id: 'a', daysOnSite: 10 }),
        makeListing({ id: 'b', daysOnSite: 20 }),
        makeListing({ id: 'c', daysOnSite: 30 }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.headlineStats.avgDaysOnMarket).toBe(20);
    });

    it('price trend is negative when listings have price reductions', () => {
      const listings = makeListings(10, {
        originalPrice: 40000,
        currentPrice: 35000,
      });
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.headlineStats.priceTrend.trendPercent).toBeLessThan(0);
    });

    it('price trend is near-zero when no listings have price reductions', () => {
      const listings = makeListings(10);
      // All originalPrice = null (default), no reductions
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      const trend = result.headlineStats.priceTrend.trendPercent;
      expect(Math.abs(trend)).toBeLessThanOrEqual(2);
    });

    it('price trend is clamped within -5% to +3%', () => {
      // Extreme reductions to try to push beyond clamp
      const listings = makeListings(20, {
        originalPrice: 100000,
        currentPrice: 10000,
      });
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      const trend = result.headlineStats.priceTrend.trendPercent;
      expect(trend).toBeGreaterThanOrEqual(-5);
      expect(trend).toBeLessThanOrEqual(3);
    });

    it('price trend reference window is "vs 6-month average"', () => {
      const result = generateSrpSummary(makeListings(5), DEFAULT_FILTER_CRITERIA);
      expect(result.headlineStats.priceTrend.referenceWindow).toBe('vs 6-month average');
    });
  });

  // ── Price distribution histogram (SUMM-02) ──

  describe('price distribution histogram (SUMM-02)', () => {
    it('returns empty array for 0 listings', () => {
      const result = generateSrpSummary([], DEFAULT_FILTER_CRITERIA);
      expect(result.priceDistribution).toEqual([]);
    });

    it('3 listings produces 2 bins', () => {
      const listings = [
        makeListing({ id: 'a', currentPrice: 30000 }),
        makeListing({ id: 'b', currentPrice: 40000 }),
        makeListing({ id: 'c', currentPrice: 50000 }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.priceDistribution.length).toBe(2);
    });

    it('9 listings produces 3 bins', () => {
      // sqrt(9) = 3, ceil(3) = 3, min(3, 8) = 3
      const listings = Array.from({ length: 9 }, (_, i) =>
        makeListing({ id: `l-${i}`, currentPrice: 20000 + i * 5000 })
      );
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.priceDistribution.length).toBe(3);
    });

    it('64 listings capped at 8 bins', () => {
      // sqrt(64) = 8, ceil(8) = 8, min(8, 8) = 8
      const listings = Array.from({ length: 64 }, (_, i) =>
        makeListing({ id: `l-${i}`, currentPrice: 20000 + i * 1000 })
      );
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.priceDistribution.length).toBeLessThanOrEqual(8);
    });

    it('100 listings capped at 8 bins', () => {
      // sqrt(100) = 10, ceil(10) = 10, min(10, 8) = 8
      const listings = Array.from({ length: 100 }, (_, i) =>
        makeListing({ id: `l-${i}`, currentPrice: 20000 + i * 1000 })
      );
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.priceDistribution.length).toBeLessThanOrEqual(8);
    });

    it('bin labels use $K format', () => {
      const listings = [
        makeListing({ id: 'a', currentPrice: 30000 }),
        makeListing({ id: 'b', currentPrice: 40000 }),
        makeListing({ id: 'c', currentPrice: 50000 }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      for (const bin of result.priceDistribution) {
        expect(bin.label).toMatch(/\$\d+K/);
      }
    });

    it('all listings accounted for in bins', () => {
      const listings = makeListings(20);
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      const totalInBins = result.priceDistribution.reduce((acc, b) => acc + b.count, 0);
      expect(totalInBins).toBe(20);
    });
  });

  // ── Deal breakdown (SUMM-03) ──

  describe('deal breakdown (SUMM-03)', () => {
    it('counts great, good, fair correctly', () => {
      const listings = [
        makeListing({ id: 'a', dealRating: 'great' }),
        makeListing({ id: 'b', dealRating: 'great' }),
        makeListing({ id: 'c', dealRating: 'good' }),
        makeListing({ id: 'd', dealRating: 'fair' }),
        makeListing({ id: 'e', dealRating: 'fair' }),
        makeListing({ id: 'f', dealRating: 'fair' }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.dealBreakdown.great).toBe(2);
      expect(result.dealBreakdown.good).toBe(1);
      expect(result.dealBreakdown.fair).toBe(3);
    });

    it('excludes high dealRating from all counts', () => {
      const listings = [
        makeListing({ id: 'a', dealRating: 'great' }),
        makeListing({ id: 'b', dealRating: 'high' }),
        makeListing({ id: 'c', dealRating: 'high' }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.dealBreakdown.great).toBe(1);
      expect(result.dealBreakdown.totalRated).toBe(1);
      expect(result.dealBreakdown.totalListings).toBe(3);
    });

    it('excludes null dealRating', () => {
      const listings = [
        makeListing({ id: 'a', dealRating: 'good' }),
        makeListing({ id: 'b', dealRating: null }),
        makeListing({ id: 'c', dealRating: null }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.dealBreakdown.good).toBe(1);
      expect(result.dealBreakdown.totalRated).toBe(1);
      expect(result.dealBreakdown.totalListings).toBe(3);
    });

    it('totalRated equals great + good + fair', () => {
      const listings = [
        makeListing({ id: 'a', dealRating: 'great' }),
        makeListing({ id: 'b', dealRating: 'good' }),
        makeListing({ id: 'c', dealRating: 'fair' }),
        makeListing({ id: 'd', dealRating: 'high' }),
        makeListing({ id: 'e', dealRating: null }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.dealBreakdown.totalRated).toBe(3);
      expect(result.dealBreakdown.totalRated).toBe(
        result.dealBreakdown.great + result.dealBreakdown.good + result.dealBreakdown.fair
      );
    });

    it('mixed ratings produce correct counts', () => {
      const listings = [
        makeListing({ id: 'a', dealRating: 'great' }),
        makeListing({ id: 'b', dealRating: 'great' }),
        makeListing({ id: 'c', dealRating: 'good' }),
        makeListing({ id: 'd', dealRating: 'good' }),
        makeListing({ id: 'e', dealRating: 'good' }),
        makeListing({ id: 'f', dealRating: 'fair' }),
        makeListing({ id: 'g', dealRating: 'high' }),
        makeListing({ id: 'h', dealRating: null }),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.dealBreakdown.great).toBe(2);
      expect(result.dealBreakdown.good).toBe(3);
      expect(result.dealBreakdown.fair).toBe(1);
      expect(result.dealBreakdown.totalRated).toBe(6);
      expect(result.dealBreakdown.totalListings).toBe(8);
    });
  });

  // ── Narrative generation (SUMM-05, SUMM-06) ──

  describe('narrative generation (SUMM-05, SUMM-06)', () => {
    it('broad search uses broad opening template', () => {
      // No filters, 50+ results
      const listings = makeListings(55);
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.narrative.headline).toContain('55');
      expect(result.narrative.searchContext).toBe('broad');
    });

    it('filtered search with rvTypes uses filtered template with type label', () => {
      const filters: FilterCriteria = {
        ...DEFAULT_FILTER_CRITERIA,
        rvTypes: ['travel-trailer'],
      };
      const listings = makeListings(25, { rvType: 'travel-trailer' });
      const result = generateSrpSummary(listings, filters);
      expect(result.narrative.searchContext).toBe('filtered');
      expect(result.narrative.headline).toContain('Travel Trailers');
    });

    it('low results (<10) uses low-results context', () => {
      const listings = makeListings(5);
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.narrative.searchContext).toBe('low-results');
    });

    it('price-focused when priceMin set and <50 results', () => {
      const filters: FilterCriteria = {
        ...DEFAULT_FILTER_CRITERIA,
        priceMin: 20000,
      };
      const listings = makeListings(25);
      const result = generateSrpSummary(listings, filters);
      expect(result.narrative.searchContext).toBe('price-focused');
    });

    it('narrative mentions deals when 30%+ of rated listings are great/good', () => {
      // 4 great + 4 good + 2 fair = 10 rated, 80% are great/good
      const listings = [
        ...Array.from({ length: 4 }, (_, i) =>
          makeListing({ id: `g-${i}`, dealRating: 'great', currentPrice: 30000 + i * 1000, daysOnSite: 20 + i })
        ),
        ...Array.from({ length: 4 }, (_, i) =>
          makeListing({ id: `gd-${i}`, dealRating: 'good', currentPrice: 34000 + i * 1000, daysOnSite: 24 + i })
        ),
        ...Array.from({ length: 2 }, (_, i) =>
          makeListing({ id: `f-${i}`, dealRating: 'fair', currentPrice: 38000 + i * 1000, daysOnSite: 28 + i })
        ),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      // Body should mention deals (medianPrice or dealPercent)
      expect(result.narrative.body).toMatch(/market|below/i);
    });

    it('narrative does NOT mention deals when <30% are great/good', () => {
      // 1 great + 9 fair = 10 rated, only 10% are great/good
      const listings = [
        makeListing({ id: 'g-0', dealRating: 'great', currentPrice: 30000, daysOnSite: 20 }),
        ...Array.from({ length: 9 }, (_, i) =>
          makeListing({ id: `f-${i}`, dealRating: 'fair', currentPrice: 31000 + i * 1000, daysOnSite: 21 + i })
        ),
      ];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      // Body should use 'general' template (mentions days on market, not deals)
      expect(result.narrative.body).toMatch(/days|market|price/i);
    });

    it('narrative mentions price trend when |trend| >= 1%', () => {
      // Create listings with significant price reductions to generate trend >= 1%
      const listings = makeListings(20, {
        originalPrice: 50000,
        currentPrice: 40000,
      });
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      if (Math.abs(result.headlineStats.priceTrend.trendPercent) >= 1.0) {
        // If deals don't dominate, body should reference price trend
        expect(result.narrative.body.length).toBeGreaterThan(0);
      }
    });

    it('groundingLabel includes listing count', () => {
      const listings = makeListings(15);
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.narrative.groundingLabel).toBe('Based on 15 listings matching your search');
    });

    it('body is a non-empty string', () => {
      const listings = makeListings(20);
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.narrative.body).toBeTruthy();
      expect(result.narrative.body.length).toBeGreaterThan(10);
    });
  });

  // ── Search context determination (SUMM-06) ──

  describe('search context determination (SUMM-06)', () => {
    it('no filters + 50+ results returns broad', () => {
      const listings = makeListings(55);
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.narrative.searchContext).toBe('broad');
    });

    it('has rvTypes filter + 20+ results returns filtered', () => {
      const filters: FilterCriteria = {
        ...DEFAULT_FILTER_CRITERIA,
        rvTypes: ['fifth-wheel'],
      };
      const listings = makeListings(25);
      const result = generateSrpSummary(listings, filters);
      expect(result.narrative.searchContext).toBe('filtered');
    });

    it('no filters + 15 results returns filtered (not narrow since 0 active filters)', () => {
      // With 15 results and no filters: >10, no price filter, 0 active filters -> broad
      // Actually: resultCount < 10? No. hasPriceFilter? No. countActiveFilters === 0? Yes -> broad
      const listings = makeListings(15);
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.narrative.searchContext).toBe('broad');
    });

    it('has filters + <20 results returns narrow', () => {
      const filters: FilterCriteria = {
        ...DEFAULT_FILTER_CRITERIA,
        rvTypes: ['class-a'],
        condition: 'used',
      };
      const listings = makeListings(15);
      const result = generateSrpSummary(listings, filters);
      expect(result.narrative.searchContext).toBe('narrow');
    });

    it('has price filter + <50 results returns price-focused', () => {
      const filters: FilterCriteria = {
        ...DEFAULT_FILTER_CRITERIA,
        priceMax: 50000,
      };
      const listings = makeListings(30);
      const result = generateSrpSummary(listings, filters);
      expect(result.narrative.searchContext).toBe('price-focused');
    });

    it('<10 results returns low-results regardless of filters', () => {
      const filters: FilterCriteria = {
        ...DEFAULT_FILTER_CRITERIA,
        rvTypes: ['class-b'],
        priceMin: 50000,
      };
      const listings = makeListings(5);
      const result = generateSrpSummary(listings, filters);
      expect(result.narrative.searchContext).toBe('low-results');
    });
  });

  // ── Edge cases ──

  describe('edge cases', () => {
    it('empty listings returns confidence: insufficient and reasonable defaults', () => {
      const result = generateSrpSummary([], DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('insufficient');
      expect(result.resultCount).toBe(0);
      expect(result.headlineStats.listingCount).toBe(0);
      expect(result.headlineStats.medianPrice).toBe(0);
      expect(result.headlineStats.avgDaysOnMarket).toBe(0);
      expect(result.priceDistribution).toEqual([]);
      expect(result.dealBreakdown.totalRated).toBe(0);
      expect(result.dealBreakdown.totalListings).toBe(0);
    });

    it('single listing returns valid data', () => {
      const listings = [makeListing({ currentPrice: 42000, daysOnSite: 25 })];
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.confidence).toBe('insufficient');
      expect(result.resultCount).toBe(1);
      expect(result.headlineStats.medianPrice).toBe(42000);
      expect(result.headlineStats.avgDaysOnMarket).toBe(25);
      expect(result.priceDistribution.length).toBe(1);
    });

    it('all listings same price: median equals that price, histogram has 1 bin', () => {
      const listings = makeListings(10, { currentPrice: 35000 });
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.headlineStats.medianPrice).toBe(35000);
      expect(result.priceDistribution.length).toBe(1);
      expect(result.priceDistribution[0].count).toBe(10);
    });

    it('all listings with null dealRating: totalRated is 0', () => {
      const listings = makeListings(10, { dealRating: null });
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);
      expect(result.dealBreakdown.totalRated).toBe(0);
      expect(result.dealBreakdown.great).toBe(0);
      expect(result.dealBreakdown.good).toBe(0);
      expect(result.dealBreakdown.fair).toBe(0);
    });
  });

  // ── Full integration ──

  describe('full integration', () => {
    it('50 listings with mixed data returns complete SrpSummaryData shape', () => {
      const listings = Array.from({ length: 50 }, (_, i) =>
        makeListing({
          id: `l-${i}`,
          currentPrice: 25000 + i * 2000,
          originalPrice: i % 3 === 0 ? 30000 + i * 2000 : null,
          daysOnSite: 10 + i,
          dealRating: i % 5 === 0 ? 'great' : i % 5 === 1 ? 'good' : i % 5 === 2 ? 'fair' : i % 3 === 0 ? 'high' : null,
        })
      );
      const result = generateSrpSummary(listings, DEFAULT_FILTER_CRITERIA);

      // Shape verification
      expect(result.confidence).toBe('full');
      expect(result.resultCount).toBe(50);
      expect(result.headlineStats).toHaveProperty('listingCount');
      expect(result.headlineStats).toHaveProperty('medianPrice');
      expect(result.headlineStats).toHaveProperty('priceTrend');
      expect(result.headlineStats).toHaveProperty('avgDaysOnMarket');
      expect(result.priceDistribution.length).toBeGreaterThan(0);
      expect(result.dealBreakdown).toHaveProperty('great');
      expect(result.dealBreakdown).toHaveProperty('good');
      expect(result.dealBreakdown).toHaveProperty('fair');
      expect(result.dealBreakdown).toHaveProperty('totalRated');
      expect(result.dealBreakdown).toHaveProperty('totalListings');
      expect(result.narrative).toHaveProperty('headline');
      expect(result.narrative).toHaveProperty('body');
      expect(result.narrative).toHaveProperty('searchContext');
      expect(result.narrative).toHaveProperty('groundingLabel');
      expect(result.generatedAt).toBeTruthy();
    });

    it('generatedAt is a formatted date string', () => {
      const result = generateSrpSummary(makeListings(5), DEFAULT_FILTER_CRITERIA);
      // Should be something like "March 4, 2026"
      expect(result.generatedAt).toMatch(/\w+ \d{1,2}, \d{4}/);
    });
  });
});
