import type {
  SRPListing,
  FilterCriteria,
  SortOption,
  ActiveFilter,
  RVType,
  FuelType,
} from './srpTypes.ts';
import { RV_TYPE_LABELS, DEFAULT_FILTER_CRITERIA } from './srpTypes.ts';

// ─── Zip code coordinate lookup ─────────────────────────────────────

export const ZIP_COORDS: Record<string, { lat: number; lng: number }> = {
  '33607': { lat: 27.9506, lng: -82.4572 },   // Tampa, FL
  '32801': { lat: 28.5383, lng: -81.3792 },   // Orlando, FL
  '33584': { lat: 27.9839, lng: -82.2812 },   // Seffner, FL
  '77024': { lat: 29.7604, lng: -95.3698 },   // Houston, TX
  '75201': { lat: 32.7942, lng: -96.8005 },   // Dallas, TX
  '80202': { lat: 39.7392, lng: -104.9903 },  // Denver, CO
  '85001': { lat: 33.4484, lng: -112.074 },   // Phoenix, AZ
  '85701': { lat: 32.2226, lng: -110.9747 },  // Tucson, AZ
  '97201': { lat: 45.5152, lng: -122.6784 },  // Portland, OR
  '98101': { lat: 47.6062, lng: -122.3321 },  // Seattle, WA
  '37201': { lat: 36.1627, lng: -86.7816 },   // Nashville, TN
  '28202': { lat: 35.2271, lng: -80.8431 },   // Charlotte, NC
  '83702': { lat: 43.615, lng: -116.2023 },   // Boise, ID
  '84101': { lat: 40.7608, lng: -111.891 },   // Salt Lake City, UT
  '87101': { lat: 35.0844, lng: -106.6504 },  // Albuquerque, NM
  '30301': { lat: 33.749, lng: -84.388 },     // Atlanta, GA
  '95814': { lat: 38.5816, lng: -121.4944 },  // Sacramento, CA
  '89101': { lat: 36.1699, lng: -115.1398 },  // Las Vegas, NV
};

// ─── Internal helpers ───────────────────────────────────────────────

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatPriceShort(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return m % 1 === 0 ? `$${m}M` : `$${m.toFixed(1)}M`;
  }
  const k = price / 1000;
  return k % 1 === 0 ? `$${k}K` : `$${k.toFixed(1)}K`;
}

// ─── Filter engine ──────────────────────────────────────────────────

export function filterListings(
  listings: SRPListing[],
  criteria: FilterCriteria,
): SRPListing[] {
  // Resolve zip coordinates for distance filtering
  const zipCoords = criteria.zipCode ? ZIP_COORDS[criteria.zipCode] : undefined;

  return listings.filter((listing) => {
    // keyword: case-insensitive match against title, make, model, trim, dealer.name
    if (criteria.keyword) {
      const kw = criteria.keyword.toLowerCase();
      const searchable = [
        listing.title,
        listing.make,
        listing.model,
        listing.trim,
        listing.dealer.name,
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(kw)) return false;
    }

    // rvTypes: listing.rvType must be in the array
    if (criteria.rvTypes.length > 0) {
      if (!criteria.rvTypes.includes(listing.rvType)) return false;
    }

    // makes: case-insensitive compare
    if (criteria.makes.length > 0) {
      const makesLower = criteria.makes.map((m) => m.toLowerCase());
      if (!makesLower.includes(listing.make.toLowerCase())) return false;
    }

    // models: case-insensitive compare
    if (criteria.models.length > 0) {
      const modelsLower = criteria.models.map((m) => m.toLowerCase());
      if (!modelsLower.includes(listing.model.toLowerCase())) return false;
    }

    // priceMin
    if (criteria.priceMin !== null && listing.currentPrice < criteria.priceMin) {
      return false;
    }

    // priceMax
    if (criteria.priceMax !== null && listing.currentPrice > criteria.priceMax) {
      return false;
    }

    // yearMin
    if (criteria.yearMin !== null && listing.year < criteria.yearMin) {
      return false;
    }

    // yearMax
    if (criteria.yearMax !== null && listing.year > criteria.yearMax) {
      return false;
    }

    // condition
    if (criteria.condition !== 'all' && listing.condition !== criteria.condition) {
      return false;
    }

    // zipCode + radiusMiles: distance filtering
    if (criteria.zipCode && zipCoords) {
      const dist = haversineDistance(
        zipCoords.lat,
        zipCoords.lng,
        listing.location.lat,
        listing.location.lng,
      );
      if (dist > criteria.radiusMiles) return false;
    }

    // lengthMin
    if (criteria.lengthMin !== null && listing.lengthFt < criteria.lengthMin) {
      return false;
    }

    // lengthMax
    if (criteria.lengthMax !== null && listing.lengthFt > criteria.lengthMax) {
      return false;
    }

    // floorPlans: listing.floorPlan must be in the array (null excluded)
    if (criteria.floorPlans.length > 0) {
      if (listing.floorPlan === null) return false;
      if (!criteria.floorPlans.includes(listing.floorPlan)) return false;
    }

    // sleepingCapacity: listing must have at least this many
    if (
      criteria.sleepingCapacity !== null &&
      listing.sleepingCapacity < criteria.sleepingCapacity
    ) {
      return false;
    }

    // fuelTypes
    if (criteria.fuelTypes.length > 0) {
      if (!criteria.fuelTypes.includes(listing.fuelType)) return false;
    }

    // grossVehicleWeightMax
    if (criteria.grossVehicleWeightMax !== null) {
      if (
        listing.grossVehicleWeight !== null &&
        listing.grossVehicleWeight > criteria.grossVehicleWeightMax
      ) {
        return false;
      }
    }

    return true;
  });
}

// ─── Sort engine ────────────────────────────────────────────────────

export function sortListings(
  listings: SRPListing[],
  sort: SortOption,
  userLat?: number,
  userLng?: number,
): SRPListing[] {
  const sorted = [...listings];

  switch (sort) {
    case 'relevance':
      sorted.sort((a, b) => {
        // Sponsored first
        if (a.isSponsored !== b.isSponsored) return a.isSponsored ? -1 : 1;
        // Then featured
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        // Then by daysOnSite ascending (newer listings first)
        return a.daysOnSite - b.daysOnSite;
      });
      break;

    case 'price-low':
      sorted.sort((a, b) => a.currentPrice - b.currentPrice);
      break;

    case 'price-high':
      sorted.sort((a, b) => b.currentPrice - a.currentPrice);
      break;

    case 'newest':
      sorted.sort((a, b) => {
        // Year descending
        if (a.year !== b.year) return b.year - a.year;
        // Then daysOnSite ascending
        return a.daysOnSite - b.daysOnSite;
      });
      break;

    case 'distance':
      if (userLat !== undefined && userLng !== undefined) {
        sorted.sort((a, b) => {
          const distA = haversineDistance(
            userLat,
            userLng,
            a.location.lat,
            a.location.lng,
          );
          const distB = haversineDistance(
            userLat,
            userLng,
            b.location.lat,
            b.location.lng,
          );
          return distA - distB;
        });
      } else {
        // Fall back to relevance sort
        sorted.sort((a, b) => {
          if (a.isSponsored !== b.isSponsored) return a.isSponsored ? -1 : 1;
          if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
          return a.daysOnSite - b.daysOnSite;
        });
      }
      break;
  }

  return sorted;
}

// ─── Active filter chips ────────────────────────────────────────────

export function buildActiveFilters(criteria: FilterCriteria): ActiveFilter[] {
  const chips: ActiveFilter[] = [];

  // keyword
  if (criteria.keyword) {
    chips.push({
      key: 'keyword',
      label: `"${criteria.keyword}"`,
      value: criteria.keyword,
    });
  }

  // rvTypes: one chip per type
  for (const rvType of criteria.rvTypes) {
    chips.push({
      key: 'rvTypes',
      label: RV_TYPE_LABELS[rvType as RVType] ?? rvType,
      value: rvType,
    });
  }

  // makes: one chip per make
  for (const make of criteria.makes) {
    chips.push({
      key: 'makes',
      label: make,
      value: make,
    });
  }

  // models: one chip per model
  for (const model of criteria.models) {
    chips.push({
      key: 'models',
      label: model,
      value: model,
    });
  }

  // price: combined chip
  if (criteria.priceMin !== null || criteria.priceMax !== null) {
    let label: string;
    if (criteria.priceMin !== null && criteria.priceMax !== null) {
      label = `${formatPriceShort(criteria.priceMin)} - ${formatPriceShort(criteria.priceMax)}`;
    } else if (criteria.priceMin !== null) {
      label = `${formatPriceShort(criteria.priceMin)}+`;
    } else {
      label = `Under ${formatPriceShort(criteria.priceMax!)}`;
    }
    chips.push({
      key: 'price',
      label,
      value: `${criteria.priceMin ?? ''}-${criteria.priceMax ?? ''}`,
    });
  }

  // year: combined chip
  if (criteria.yearMin !== null || criteria.yearMax !== null) {
    let label: string;
    if (criteria.yearMin !== null && criteria.yearMax !== null) {
      label = `${criteria.yearMin} - ${criteria.yearMax}`;
    } else if (criteria.yearMin !== null) {
      label = `${criteria.yearMin}+`;
    } else {
      label = `Before ${criteria.yearMax!}`;
    }
    chips.push({
      key: 'year',
      label,
      value: `${criteria.yearMin ?? ''}-${criteria.yearMax ?? ''}`,
    });
  }

  // condition: only 'new' or 'used' (not 'all')
  if (criteria.condition !== 'all') {
    chips.push({
      key: 'condition',
      label: criteria.condition === 'new' ? 'New' : 'Used',
      value: criteria.condition,
    });
  }

  // length: combined chip
  if (criteria.lengthMin !== null || criteria.lengthMax !== null) {
    let label: string;
    if (criteria.lengthMin !== null && criteria.lengthMax !== null) {
      label = `${criteria.lengthMin}ft - ${criteria.lengthMax}ft`;
    } else if (criteria.lengthMin !== null) {
      label = `${criteria.lengthMin}ft+`;
    } else {
      label = `Under ${criteria.lengthMax!}ft`;
    }
    chips.push({
      key: 'length',
      label,
      value: `${criteria.lengthMin ?? ''}-${criteria.lengthMax ?? ''}`,
    });
  }

  // floorPlans: one chip per plan
  for (const plan of criteria.floorPlans) {
    chips.push({
      key: 'floorPlans',
      label: plan,
      value: plan,
    });
  }

  // sleepingCapacity
  if (criteria.sleepingCapacity !== null) {
    chips.push({
      key: 'sleepingCapacity',
      label: `Sleeps ${criteria.sleepingCapacity}+`,
      value: String(criteria.sleepingCapacity),
    });
  }

  // fuelTypes: one chip per type
  for (const fuel of criteria.fuelTypes) {
    chips.push({
      key: 'fuelTypes',
      label: fuel.charAt(0).toUpperCase() + fuel.slice(1),
      value: fuel,
    });
  }

  // grossVehicleWeightMax
  if (criteria.grossVehicleWeightMax !== null) {
    chips.push({
      key: 'grossVehicleWeightMax',
      label: `Under ${criteria.grossVehicleWeightMax.toLocaleString()} lbs`,
      value: String(criteria.grossVehicleWeightMax),
    });
  }

  // zipCode + radius
  if (criteria.zipCode) {
    chips.push({
      key: 'zipCode',
      label: `Within ${criteria.radiusMiles}mi of ${criteria.zipCode}`,
      value: criteria.zipCode,
    });
  }

  return chips;
}

// ─── Near-miss (relaxed filter) engine ─────────────────────────────

export interface NearMissResult {
  listings: SRPListing[];
  relaxedFilters: string[];
}

/**
 * Progressively relaxes filters until at least one listing matches.
 * Never drops `rvTypes` — that represents core user intent.
 * Returns up to `maxResults` listings sorted by relevance.
 */
export function findNearMissListings(
  allListings: SRPListing[],
  originalCriteria: FilterCriteria,
  maxResults = 6,
): NearMissResult {
  const relaxedFilters: string[] = [];

  // Build a mutable copy of criteria we'll progressively loosen
  let criteria: FilterCriteria = { ...originalCriteria };

  const tiers: Array<{
    labels: string[];
    relax: (c: FilterCriteria) => FilterCriteria;
  }> = [
    // Tier 1: Drop floor plans, sleeping capacity, GVWR
    {
      labels: ['floor plans', 'sleeping capacity', 'weight'],
      relax: (c) => ({
        ...c,
        floorPlans: [],
        sleepingCapacity: null,
        grossVehicleWeightMax: null,
      }),
    },
    // Tier 2: Drop length, fuel types
    {
      labels: ['length', 'fuel type'],
      relax: (c) => ({
        ...c,
        lengthMin: null,
        lengthMax: null,
        fuelTypes: [],
      }),
    },
    // Tier 3: Drop models
    {
      labels: ['model'],
      relax: (c) => ({ ...c, models: [] }),
    },
    // Tier 4: Widen price by ±25%
    {
      labels: ['price range'],
      relax: (c) => ({
        ...c,
        priceMin: c.priceMin !== null ? Math.round(c.priceMin * 0.75) : null,
        priceMax: c.priceMax !== null ? Math.round(c.priceMax * 1.25) : null,
      }),
    },
    // Tier 5: Widen year by ±3
    {
      labels: ['year range'],
      relax: (c) => ({
        ...c,
        yearMin: c.yearMin !== null ? c.yearMin - 3 : null,
        yearMax: c.yearMax !== null ? c.yearMax + 3 : null,
      }),
    },
    // Tier 6: Reset condition to 'all'
    {
      labels: ['condition'],
      relax: (c) => ({ ...c, condition: 'all' }),
    },
    // Tier 7: Drop makes
    {
      labels: ['make'],
      relax: (c) => ({ ...c, makes: [] }),
    },
    // Tier 8: Double radius
    {
      labels: ['search radius'],
      relax: (c) => ({ ...c, radiusMiles: c.radiusMiles * 2 }),
    },
    // Tier 9: Drop keyword
    {
      labels: ['keyword'],
      relax: (c) => ({ ...c, keyword: '' }),
    },
  ];

  for (const tier of tiers) {
    const relaxed = tier.relax(criteria);
    // Only count this tier if it actually changed something
    if (JSON.stringify(relaxed) === JSON.stringify(criteria)) continue;

    criteria = relaxed;
    relaxedFilters.push(...tier.labels);

    const results = filterListings(allListings, criteria);
    if (results.length > 0) {
      const sorted = sortListings(results, 'relevance');
      return { listings: sorted.slice(0, maxResults), relaxedFilters };
    }
  }

  // Nothing found even after all relaxations
  return { listings: [], relaxedFilters };
}
