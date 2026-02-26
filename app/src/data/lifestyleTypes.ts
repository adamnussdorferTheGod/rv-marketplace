// Lifestyle Context type definitions
// Follows videoWalkthroughTypes.ts conventions: string literal unions, interface composition, no enums

// RV compatibility fit status
export type RvFitStatus = 'fits' | 'tight' | 'wont-fit';

// Route suitability for a given RV
export type RouteSuitability = 'easy' | 'moderate' | 'challenging';

// User location resolved from zip code
export interface UserLocation {
  zipCode: string;
  city: string;
  state: string;
  stateAbbrev: string;
}

// RV specs derived from the listing
export interface RvSpecs {
  lengthFt: number;
  gvwrLbs: number;
  hookupAmp: number; // 30 or 50
}

// Destination (campground)
export interface Destination {
  id: string;
  name: string;
  region: string;
  photoUrl: string;
  driveTimeMinutes: number;
  distanceMiles: number;
  hookupType: string; // e.g. "Full Hookup", "Water/Electric", "Dry Camping"
  rating: number;
  reviewCount: number;
  season: string;
  priceRange: string;
  maxRvLengthFt: number;
  categories: string[]; // e.g. ["National Park", "Pet Friendly"]
  description: string;
  amenities: string[];
  reservationUrl: string;
}

// A stop along a route
export interface RouteStop {
  name: string;
  type: string; // e.g. "campground", "scenic point", "town", "ferry"
}

// Route (road trip)
export interface Route {
  id: string;
  name: string;
  distanceMiles: number;
  durationDays: number;
  stops: RouteStop[];
  bestSeason: string;
  campgroundCount: number;
  suitability: RouteSuitability;
  suitabilityNote: string;
  photoUrl: string;
  description: string;
}

// Top-level lifestyle data response shape
export interface LifestyleData {
  location: UserLocation;
  rvSpecs: RvSpecs;
  destinations: Destination[];
  routes: Route[];
}
