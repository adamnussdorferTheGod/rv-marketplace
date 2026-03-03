import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateMarketInsights } from './marketInsightsEngine.ts';
import type { ListingData } from './types.ts';
import type { SRPListing } from './srpTypes.ts';
import type { MarketInsightsOk, MarketInsightsInsufficient } from './marketInsightsTypes.ts';

// ─── Test fixture factories ──────────────────────────────────────────

function makeListing(overrides: Partial<ListingData> = {}): ListingData {
  return {
    title: '2022 Test RV',
    year: 2022,
    make: 'TestMake',
    model: 'TestModel',
    trim: '',
    stockNumber: 'STK-001',
    location: 'Austin, TX',
    images: [],
    tagText: '',
    totalPhotoCount: 0,
    currentPrice: 50000,
    originalPrice: 50000,
    monthlyPayment: 400,
    dealRating: 'fair',
    aiSummary: '',
    vhrAvailable: true,
    vhrHighlights: [],
    isNegotiable: true,
    specs: [{ icon: 'rv', label: 'RV type', value: 'Travel Trailer' }],
    vin: '1234567890',
    daysOnSite: 30,
    priceAnalysis: {
      rangeMin: 40000,
      rangeMax: 60000,
      averagePrice: 48000,
      explanation: '',
      learnMoreUrl: '',
      priceHistory: [],
    },
    description: '',
    loanMonthlyPayment: 400,
    dealer: {
      name: 'Test Dealer',
      location: 'Austin, TX',
      address: '123 Main St',
      phone: '555-1234',
      callCode: '',
      hours: '9-5',
      logoUrl: '',
      bio: '',
      websiteUrl: '',
      isTop50: false,
      yearsOnRvTrader: 5,
    },
    resultPosition: 1,
    totalResults: 10,
    similarListings: [],
    categories: [],
    reviews: {
      overallRating: 4.0,
      totalReviews: 10,
      distribution: [1, 1, 2, 3, 3],
      categories: [],
      reviews: [],
    },
    viewerCount: 5,
    engagement: {
      isNewlyListed: false,
      listedDate: '01/01/26',
      viewCount: 100,
      saveCount: 10,
    },
    ...overrides,
  };
}

function makeComparable(overrides: Partial<SRPListing> = {}): SRPListing {
  return {
    id: 'comp-1',
    title: '2022 Comparable RV',
    year: 2022,
    make: 'CompMake',
    model: 'CompModel',
    trim: '',
    rvType: 'travel-trailer',
    condition: 'used',
    currentPrice: 48000,
    originalPrice: null,
    monthlyPayment: 380,
    dealRating: 'fair',
    photos: [],
    tagBadge: null,
    isFeatured: false,
    isSponsored: false,
    isFavorited: false,
    dealer: {
      name: 'Comp Dealer',
      city: 'Austin',
      state: 'TX',
      distanceMiles: 10,
    },
    location: {
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      lat: 30.27,
      lng: -97.74,
    },
    lengthFt: 28,
    sleepingCapacity: 4,
    fuelType: 'n/a',
    floorPlan: null,
    grossVehicleWeight: null,
    mileage: null,
    daysOnSite: 30,
    isTrustedPartner: false,
    ...overrides,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

describe('generateMarketInsights', () => {
  // Mock Date for seasonal tests to avoid flaky month-dependent results
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns ok for travel-trailer with sufficient comparables', () => {
    const listing = makeListing();
    const pool = [
      makeComparable({ id: 'c1', daysOnSite: 20 }),
      makeComparable({ id: 'c2', daysOnSite: 25 }),
      makeComparable({ id: 'c3', daysOnSite: 30 }),
      makeComparable({ id: 'c4', daysOnSite: 35 }),
      makeComparable({ id: 'c5', daysOnSite: 40 }),
    ];

    const result = generateMarketInsights(listing, pool);
    expect(result.status).toBe('ok');
    expect((result as MarketInsightsOk).comparableCount).toBe(5);
    expect((result as MarketInsightsOk).comparisonScope).toBe('exact-type');
  });

  it('returns insufficient for fish-house with no comparables', () => {
    const listing = makeListing({
      specs: [{ icon: 'rv', label: 'RV type', value: 'Fish House' }],
    });
    // Pool has only travel trailers, no fish house
    const pool = [
      makeComparable({ id: 'c1', rvType: 'travel-trailer' }),
      makeComparable({ id: 'c2', rvType: 'travel-trailer' }),
    ];

    const result = generateMarketInsights(listing, pool);
    expect(result.status).toBe('insufficient');
    expect((result as MarketInsightsInsufficient).comparableCount).toBe(0);
    expect((result as MarketInsightsInsufficient).minimumRequired).toBe(3);
  });

  it('returns insufficient for empty pool', () => {
    const listing = makeListing();
    const result = generateMarketInsights(listing, []);
    expect(result.status).toBe('insufficient');
    expect((result as MarketInsightsInsufficient).comparableCount).toBe(0);
  });

  it('filters comparables by year tolerance', () => {
    const listing = makeListing({ year: 2022 });
    const pool = [
      makeComparable({ id: 'c1', year: 2022, daysOnSite: 20 }),
      makeComparable({ id: 'c2', year: 2023, daysOnSite: 25 }),
      makeComparable({ id: 'c3', year: 2021, daysOnSite: 30 }),
      // These are outside YEAR_TOLERANCE of 3
      makeComparable({ id: 'c4', year: 2010, daysOnSite: 15 }),
      makeComparable({ id: 'c5', year: 2015, daysOnSite: 10 }),
    ];

    const result = generateMarketInsights(listing, pool);
    expect(result.status).toBe('ok');
    // Only 3 comparables within tolerance (2022, 2023, 2021)
    expect((result as MarketInsightsOk).comparableCount).toBe(3);
  });

  it('computes daysOnMarket correctly', () => {
    const listing = makeListing({ daysOnSite: 15 });
    const pool = [
      makeComparable({ id: 'c1', daysOnSite: 10 }),
      makeComparable({ id: 'c2', daysOnSite: 20 }),
      makeComparable({ id: 'c3', daysOnSite: 30 }),
    ];

    const result = generateMarketInsights(listing, pool) as MarketInsightsOk;
    expect(result.status).toBe('ok');
    expect(result.daysOnMarket.averageDays).toBe(20);
    expect(result.daysOnMarket.medianDays).toBe(20);
    expect(result.daysOnMarket.rangeLow).toBe(10);
    expect(result.daysOnMarket.rangeHigh).toBe(30);
    expect(result.daysOnMarket.listingDays).toBe(15);
    // 15 < 20-5 = 15, so borderline — listing days == avg-5, should be 'average'
    // Actually 15 < 20-5 = 15? Not less than, so 'average'
    expect(result.daysOnMarket.relativeTo).toBe('average');
  });

  it('computes supply trend from avgDaysOnSite', () => {
    // Fresh inventory (all daysOnSite < 20) -> trend 'rising'
    const listing = makeListing({ daysOnSite: 10 });
    const freshPool = [
      makeComparable({ id: 'c1', daysOnSite: 10 }),
      makeComparable({ id: 'c2', daysOnSite: 15 }),
      makeComparable({ id: 'c3', daysOnSite: 18 }),
    ];

    const freshResult = generateMarketInsights(listing, freshPool) as MarketInsightsOk;
    expect(freshResult.status).toBe('ok');
    expect(freshResult.supply.trend).toBe('rising');

    // Stale inventory (all daysOnSite > 60) -> trend 'falling'
    const stalePool = [
      makeComparable({ id: 'c1', daysOnSite: 65 }),
      makeComparable({ id: 'c2', daysOnSite: 70 }),
      makeComparable({ id: 'c3', daysOnSite: 80 }),
    ];

    const staleResult = generateMarketInsights(listing, stalePool) as MarketInsightsOk;
    expect(staleResult.status).toBe('ok');
    expect(staleResult.supply.trend).toBe('falling');
  });

  it('detects price drop from priceHistory', () => {
    const listing = makeListing({
      currentPrice: 45000,
      priceAnalysis: {
        rangeMin: 40000,
        rangeMax: 60000,
        averagePrice: 48000,
        explanation: '',
        learnMoreUrl: '',
        priceHistory: [
          { date: '01/01/26', change: 'Listed', price: 50000 },
          { date: '01/15/26', change: 'Price reduced', price: 45000 },
        ],
      },
    });
    const pool = [
      makeComparable({ id: 'c1' }),
      makeComparable({ id: 'c2' }),
      makeComparable({ id: 'c3' }),
    ];

    const result = generateMarketInsights(listing, pool) as MarketInsightsOk;
    expect(result.status).toBe('ok');
    expect(result.priceDrop).not.toBeNull();
    expect(result.priceDrop!.hasRecentDrop).toBe(true);
    expect(result.priceDrop!.dropAmount).toBe(5000);
    expect(result.priceDrop!.dropPercent).toBeCloseTo(10, 0);
    expect(result.priceDrop!.dropDate).toBe('01/15/26');
  });

  it('returns no price drop when priceHistory has no reductions', () => {
    const listing = makeListing({
      priceAnalysis: {
        rangeMin: 40000,
        rangeMax: 60000,
        averagePrice: 48000,
        explanation: '',
        learnMoreUrl: '',
        priceHistory: [
          { date: '01/01/26', change: 'Listed', price: 50000 },
        ],
      },
    });
    const pool = [
      makeComparable({ id: 'c1' }),
      makeComparable({ id: 'c2' }),
      makeComparable({ id: 'c3' }),
    ];

    const result = generateMarketInsights(listing, pool) as MarketInsightsOk;
    expect(result.status).toBe('ok');
    expect(result.priceDrop).not.toBeNull();
    expect(result.priceDrop!.hasRecentDrop).toBe(false);
    expect(result.priceDrop!.dropAmount).toBe(0);
    expect(result.priceDrop!.dropPercent).toBe(0);
  });

  it('computes marketDropRate from comparable pool', () => {
    const listing = makeListing();
    const pool = [
      makeComparable({ id: 'c1', originalPrice: 55000 }),  // has drop
      makeComparable({ id: 'c2', originalPrice: null }),     // no drop
      makeComparable({ id: 'c3', originalPrice: 52000 }),   // has drop
      makeComparable({ id: 'c4', originalPrice: null }),     // no drop
      makeComparable({ id: 'c5', originalPrice: 49000 }),   // has drop
    ];

    const result = generateMarketInsights(listing, pool) as MarketInsightsOk;
    expect(result.status).toBe('ok');
    expect(result.priceDrop).not.toBeNull();
    // 3 of 5 comparables have originalPrice !== null -> 60%
    expect(result.priceDrop!.marketDropRate).toBe(60);
  });

  it('computes seasonal data for current month', () => {
    // Mock to March (month index 2)
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 15)); // March 15, 2026

    const listing = makeListing();
    const pool = [
      makeComparable({ id: 'c1' }),
      makeComparable({ id: 'c2' }),
      makeComparable({ id: 'c3' }),
    ];

    const result = generateMarketInsights(listing, pool) as MarketInsightsOk;
    expect(result.status).toBe('ok');
    // March travel-trailer multiplier is 0.95
    expect(result.seasonal.currentMonth).toBe(2);
    expect(result.seasonal.multiplier).toBe(0.95);
    // 0.95 <= 0.95 -> 'good'
    expect(result.seasonal.rating).toBe('good');
    // Peak for travel-trailer is month 5 (June) with 1.25
    expect(result.seasonal.peakMonth).toBe(5);
    // savingsVsPeak = (1.25 - 0.95) / 1.25 * 100 = 24%
    expect(result.seasonal.savingsVsPeak).toBeCloseTo(24, 0);

    vi.useRealTimers();
  });
});
