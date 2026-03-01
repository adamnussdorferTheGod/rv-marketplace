import type { ListingImage } from './types.ts';

// ─── String literal unions ───────────────────────────────────────────

export type RVType =
  | 'class-a'
  | 'class-b'
  | 'class-c'
  | 'travel-trailer'
  | 'fifth-wheel'
  | 'toy-hauler'
  | 'pop-up'
  | 'truck-camper'
  | 'park-model'
  | 'fish-house';

export type FuelType = 'gas' | 'diesel' | 'electric' | 'n/a';

export type SortOption = 'relevance' | 'price-low' | 'price-high' | 'newest' | 'distance';

// ─── Supporting interfaces ───────────────────────────────────────────

export interface SRPDealerInfo {
  name: string;
  city: string;
  state: string;
  distanceMiles: number | null;
}

export interface SRPLocation {
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
}

// ─── Main SRP listing interface ──────────────────────────────────────

export interface SRPListing {
  id: string;
  slug?: string;
  title: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  rvType: RVType;
  condition: 'new' | 'used';
  currentPrice: number;
  originalPrice: number | null;
  monthlyPayment: number;
  dealRating: 'great' | 'good' | 'fair' | 'high' | null;
  photos: ListingImage[];
  tagBadge: string | null;
  isFeatured: boolean;
  isSponsored: boolean;
  isFavorited: boolean;
  dealer: SRPDealerInfo;
  location: SRPLocation;
  lengthFt: number;
  sleepingCapacity: number;
  fuelType: FuelType;
  floorPlan: string | null;
  grossVehicleWeight: number | null;
  // Tow compatibility (GVWR is the standard term; grossVehicleWeight kept for backward compat)
  gvwr?: number;
  tongueWeight?: number;
  hitchType?: 'bumper-pull' | 'fifth-wheel' | 'gooseneck';
  mileage: number | null;
  daysOnSite: number;
  isTrustedPartner: boolean;
}

// ─── Filter state ────────────────────────────────────────────────────

export interface FilterCriteria {
  keyword: string;
  rvTypes: RVType[];
  makes: string[];
  models: string[];
  priceMin: number | null;
  priceMax: number | null;
  yearMin: number | null;
  yearMax: number | null;
  condition: 'new' | 'used' | 'all';
  zipCode: string;
  radiusMiles: number;
  lengthMin: number | null;
  lengthMax: number | null;
  floorPlans: string[];
  sleepingCapacity: number | null;
  fuelTypes: FuelType[];
  grossVehicleWeightMax: number | null;
}

export interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

// ─── Constants ───────────────────────────────────────────────────────

export const DEFAULT_FILTER_CRITERIA: FilterCriteria = {
  keyword: '',
  rvTypes: [],
  makes: [],
  models: [],
  priceMin: null,
  priceMax: null,
  yearMin: null,
  yearMax: null,
  condition: 'all',
  zipCode: '',
  radiusMiles: 50,
  lengthMin: null,
  lengthMax: null,
  floorPlans: [],
  sleepingCapacity: null,
  fuelTypes: [],
  grossVehicleWeightMax: null,
};

export const RV_TYPE_LABELS: Record<RVType, string> = {
  'class-a': 'Class A Motorhome',
  'class-b': 'Class B Motorhome',
  'class-c': 'Class C Motorhome',
  'travel-trailer': 'Travel Trailer',
  'fifth-wheel': 'Fifth Wheel',
  'toy-hauler': 'Toy Hauler',
  'pop-up': 'Pop-Up Camper',
  'truck-camper': 'Truck Camper',
  'park-model': 'Park Model',
  'fish-house': 'Fish House',
};

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'distance', label: 'Distance: Nearest' },
];
