import { useState, useMemo, useCallback, useEffect } from 'react';
import type {
  SRPListing,
  FilterCriteria,
  SortOption,
  ActiveFilter,
  RVType,
  FuelType,
} from '../data/srpTypes.ts';
import { DEFAULT_FILTER_CRITERIA } from '../data/srpTypes.ts';
import {
  filterListings,
  sortListings,
  buildActiveFilters,
  ZIP_COORDS,
} from '../data/srpFilterEngine.ts';
import { sampleSrpListings } from '../data/sampleSrpListings.ts';

// ─── URL parsing / serialization helpers ────────────────────────────

function parseFiltersFromURL(): FilterCriteria {
  const params = new URLSearchParams(window.location.search);

  const parseCommaSeparated = (key: string): string[] => {
    const val = params.get(key);
    if (!val) return [];
    return val.split(',').filter(Boolean);
  };

  const parseNumber = (key: string): number | null => {
    const val = params.get(key);
    if (val === null || val === '') return null;
    const n = Number(val);
    return isNaN(n) ? null : n;
  };

  const conditionParam = params.get('condition');
  const condition: 'new' | 'used' | 'all' =
    conditionParam === 'new' || conditionParam === 'used'
      ? conditionParam
      : 'all';

  const sortParam = params.get('sort');
  // Sort is handled separately, not part of FilterCriteria

  return {
    keyword: params.get('keyword') ?? DEFAULT_FILTER_CRITERIA.keyword,
    rvTypes: parseCommaSeparated('rvTypes') as RVType[],
    makes: parseCommaSeparated('makes'),
    models: parseCommaSeparated('models'),
    priceMin: parseNumber('priceMin'),
    priceMax: parseNumber('priceMax'),
    yearMin: parseNumber('yearMin'),
    yearMax: parseNumber('yearMax'),
    condition,
    zipCode: params.get('zip') ?? DEFAULT_FILTER_CRITERIA.zipCode,
    radiusMiles: parseNumber('radius') ?? DEFAULT_FILTER_CRITERIA.radiusMiles,
    lengthMin: parseNumber('lengthMin'),
    lengthMax: parseNumber('lengthMax'),
    floorPlans: parseCommaSeparated('floorPlans'),
    sleepingCapacity: parseNumber('sleepingCapacity'),
    fuelTypes: parseCommaSeparated('fuelTypes') as FuelType[],
    grossVehicleWeightMax: parseNumber('gvwMax'),
  };
}

function parseSortFromURL(): SortOption {
  const params = new URLSearchParams(window.location.search);
  const sort = params.get('sort');
  const validSorts: SortOption[] = [
    'relevance',
    'price-low',
    'price-high',
    'newest',
    'distance',
  ];
  return validSorts.includes(sort as SortOption)
    ? (sort as SortOption)
    : 'relevance';
}

function serializeFiltersToURL(
  filters: FilterCriteria,
  sort: SortOption,
): string {
  const params = new URLSearchParams();

  // Only include non-default values
  if (filters.keyword) {
    params.set('keyword', filters.keyword);
  }
  if (filters.rvTypes.length > 0) {
    params.set('rvTypes', filters.rvTypes.join(','));
  }
  if (filters.makes.length > 0) {
    params.set('makes', filters.makes.join(','));
  }
  if (filters.models.length > 0) {
    params.set('models', filters.models.join(','));
  }
  if (filters.priceMin !== null) {
    params.set('priceMin', String(filters.priceMin));
  }
  if (filters.priceMax !== null) {
    params.set('priceMax', String(filters.priceMax));
  }
  if (filters.yearMin !== null) {
    params.set('yearMin', String(filters.yearMin));
  }
  if (filters.yearMax !== null) {
    params.set('yearMax', String(filters.yearMax));
  }
  if (filters.condition !== 'all') {
    params.set('condition', filters.condition);
  }
  if (filters.zipCode) {
    params.set('zip', filters.zipCode);
  }
  if (filters.radiusMiles !== DEFAULT_FILTER_CRITERIA.radiusMiles) {
    params.set('radius', String(filters.radiusMiles));
  }
  if (filters.lengthMin !== null) {
    params.set('lengthMin', String(filters.lengthMin));
  }
  if (filters.lengthMax !== null) {
    params.set('lengthMax', String(filters.lengthMax));
  }
  if (filters.floorPlans.length > 0) {
    params.set('floorPlans', filters.floorPlans.join(','));
  }
  if (filters.sleepingCapacity !== null) {
    params.set('sleepingCapacity', String(filters.sleepingCapacity));
  }
  if (filters.fuelTypes.length > 0) {
    params.set('fuelTypes', filters.fuelTypes.join(','));
  }
  if (filters.grossVehicleWeightMax !== null) {
    params.set('gvwMax', String(filters.grossVehicleWeightMax));
  }
  if (sort !== 'relevance') {
    params.set('sort', sort);
  }

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

// ─── Hook ───────────────────────────────────────────────────────────

export function useSrpFilters(listings?: SRPListing[]): {
  // State
  filters: FilterCriteria;
  sort: SortOption;
  results: SRPListing[];
  totalCount: number;
  activeFilters: ActiveFilter[];

  // Actions
  setFilter: <K extends keyof FilterCriteria>(
    key: K,
    value: FilterCriteria[K],
  ) => void;
  toggleArrayFilter: <K extends keyof FilterCriteria>(
    key: K,
    value: string,
  ) => void;
  removeFilter: (activeFilter: ActiveFilter) => void;
  clearAll: () => void;
  setSort: (sort: SortOption) => void;
} {
  // Initialize state from URL params
  const [filters, setFilters] = useState<FilterCriteria>(parseFiltersFromURL);
  const [sort, setSortState] = useState<SortOption>(parseSortFromURL);

  // Sync state -> URL on change
  useEffect(() => {
    const queryString = serializeFiltersToURL(filters, sort);
    const newURL = window.location.pathname + queryString + window.location.hash;
    window.history.replaceState(null, '', newURL);
  }, [filters, sort]);

  // Compute filtered + sorted results
  const results = useMemo(() => {
    const filtered = filterListings(listings ?? sampleSrpListings, filters);
    const userCoords = filters.zipCode
      ? ZIP_COORDS[filters.zipCode]
      : undefined;
    return sortListings(filtered, sort, userCoords?.lat, userCoords?.lng);
  }, [listings, filters, sort]);

  // Compute active filter chips
  const activeFilters = useMemo(
    () => buildActiveFilters(filters),
    [filters],
  );

  // setFilter: generic setter for one key
  const setFilter = useCallback(
    <K extends keyof FilterCriteria>(key: K, value: FilterCriteria[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  // toggleArrayFilter: toggle a value in/out of an array filter
  const toggleArrayFilter = useCallback(
    <K extends keyof FilterCriteria>(key: K, value: string) => {
      setFilters((prev) => {
        const arr = prev[key] as string[];
        const next = arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value];
        return { ...prev, [key]: next };
      });
    },
    [],
  );

  // removeFilter: reset a specific filter from its ActiveFilter chip
  const removeFilter = useCallback((activeFilter: ActiveFilter) => {
    const { key, value } = activeFilter;

    setFilters((prev) => {
      switch (key) {
        // Array filters: remove just the one value
        case 'rvTypes':
          return {
            ...prev,
            rvTypes: prev.rvTypes.filter((v) => v !== value),
          };
        case 'makes':
          return {
            ...prev,
            makes: prev.makes.filter((v) => v !== value),
          };
        case 'models':
          return {
            ...prev,
            models: prev.models.filter((v) => v !== value),
          };
        case 'floorPlans':
          return {
            ...prev,
            floorPlans: prev.floorPlans.filter((v) => v !== value),
          };
        case 'fuelTypes':
          return {
            ...prev,
            fuelTypes: prev.fuelTypes.filter(
              (v) => v !== value,
            ) as FuelType[],
          };

        // Compound filters: clear both min and max
        case 'price':
          return { ...prev, priceMin: null, priceMax: null };
        case 'year':
          return { ...prev, yearMin: null, yearMax: null };
        case 'length':
          return { ...prev, lengthMin: null, lengthMax: null };

        // Single-value filters: reset to default
        case 'condition':
          return { ...prev, condition: 'all' };
        case 'sleepingCapacity':
          return { ...prev, sleepingCapacity: null };
        case 'grossVehicleWeightMax':
          return { ...prev, grossVehicleWeightMax: null };
        case 'keyword':
          return { ...prev, keyword: '' };
        case 'zipCode':
          return {
            ...prev,
            zipCode: '',
            radiusMiles: DEFAULT_FILTER_CRITERIA.radiusMiles,
          };

        default:
          return prev;
      }
    });
  }, []);

  // clearAll: reset everything to defaults
  const clearAll = useCallback(() => {
    setFilters({ ...DEFAULT_FILTER_CRITERIA });
    setSortState('relevance');
  }, []);

  // setSort: update sort option
  const setSort = useCallback((newSort: SortOption) => {
    setSortState(newSort);
  }, []);

  return {
    filters,
    sort,
    results,
    totalCount: results.length,
    activeFilters,
    setFilter,
    toggleArrayFilter,
    removeFilter,
    clearAll,
    setSort,
  };
}
