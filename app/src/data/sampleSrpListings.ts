import type { ListingImage, ListingData } from './types.ts';
import type { SRPListing, RVType, FuelType } from './srpTypes.ts';
import { allListings } from './scrapedListings.ts';

function sortPhotosExteriorFirst(images: ListingImage[]): ListingImage[] {
  if (images.length <= 1) return images;
  const hero = images[0];
  const rest = images.slice(1);
  const ext = rest.filter(img => img.alt.toLowerCase().includes('exterior'));
  const other = rest.filter(img => !img.alt.toLowerCase().includes('exterior'));
  return [hero, ...ext, ...other];
}

// ─── Internal data tables ────────────────────────────────────────────

interface ModelDef {
  make: string;
  model: string;
  trims: string[];
}

export const rvTypeModels: Record<RVType, ModelDef[]> = {
  'travel-trailer': [
    { make: 'Forest River', model: 'Rockwood', trims: ['2613RLS', '2104S', '2612WS', '1940LT'] },
    { make: 'Keystone', model: 'Passport', trims: ['229RK', '2521RL', '282QB'] },
    { make: 'Jayco', model: 'Jay Feather', trims: ['22RB', '24RL', '27BHB'] },
    { make: 'Coachmen', model: 'Catalina', trims: ['261BHS', '283RKS', '243RBS'] },
    { make: 'Grand Design', model: 'Imagine', trims: ['2500RL', '2910BH', '3250BH'] },
    { make: 'Airstream', model: 'Flying Cloud', trims: ['25RB', '27FB', '30FB'] },
  ],
  'fifth-wheel': [
    { make: 'Keystone', model: 'Montana', trims: ['3901RK', '3761FL', '3855BR'] },
    { make: 'Grand Design', model: 'Reflection', trims: ['337RLS', '303RLS', '367BHS'] },
    { make: 'Heartland', model: 'Bighorn', trims: ['3375SS', '3960BS'] },
    { make: 'Forest River', model: 'Cardinal', trims: ['390FBX', '370FLX'] },
  ],
  'class-a': [
    { make: 'Thor Motor Coach', model: 'Palazzo', trims: ['33.5', '37.4'] },
    { make: 'Newmar', model: 'Bay Star', trims: ['3014', '3226'] },
    { make: 'Tiffin', model: 'Allegro Bus', trims: ['37AP', '40IP'] },
    { make: 'Fleetwood', model: 'Discovery LXE', trims: ['40M', '44B'] },
  ],
  'class-c': [
    { make: 'Thor Motor Coach', model: 'Four Winds', trims: ['28A', '31E', '25M'] },
    { make: 'Jayco', model: 'Redhawk', trims: ['26XD', '31F'] },
    { make: 'Winnebago', model: 'View', trims: ['24V', '24D'] },
    { make: 'Coachmen', model: 'Leprechaun', trims: ['260DS', '319MB'] },
  ],
  'class-b': [
    { make: 'Winnebago', model: 'Revel', trims: ['44E'] },
    { make: 'Airstream', model: 'Interstate', trims: ['24GL', '24GT'] },
    { make: 'Thor Motor Coach', model: 'Tranquility', trims: ['19L', '19P'] },
  ],
  'toy-hauler': [
    { make: 'Forest River', model: 'XLR Nitro', trims: ['321', '351', '407'] },
    { make: 'Keystone', model: 'Fuzion', trims: ['373', '430'] },
    { make: 'Grand Design', model: 'Momentum', trims: ['351MS', '399TH'] },
    { make: 'Heartland', model: 'Torque', trims: ['T322', 'T371'] },
  ],
  'pop-up': [
    { make: 'Forest River', model: 'Flagstaff', trims: ['MAC 228D', 'SE 228BHSE'] },
    { make: 'Coachmen', model: 'Clipper', trims: ['107LS', '1285SST'] },
    { make: 'Jayco', model: 'Jay Sport', trims: ['8SD', '10SD', '12UD'] },
  ],
};

interface LocationDef {
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
}

const locations: LocationDef[] = [
  { city: 'Tampa', state: 'FL', zip: '33607', lat: 27.9506, lng: -82.4572 },
  { city: 'Orlando', state: 'FL', zip: '32801', lat: 28.5383, lng: -81.3792 },
  { city: 'Seffner', state: 'FL', zip: '33584', lat: 27.9839, lng: -82.2812 },
  { city: 'Houston', state: 'TX', zip: '77024', lat: 29.7604, lng: -95.3698 },
  { city: 'Dallas', state: 'TX', zip: '75201', lat: 32.7942, lng: -96.8005 },
  { city: 'Denver', state: 'CO', zip: '80202', lat: 39.7392, lng: -104.9903 },
  { city: 'Phoenix', state: 'AZ', zip: '85001', lat: 33.4484, lng: -112.074 },
  { city: 'Tucson', state: 'AZ', zip: '85701', lat: 32.2226, lng: -110.9747 },
  { city: 'Portland', state: 'OR', zip: '97201', lat: 45.5152, lng: -122.6784 },
  { city: 'Seattle', state: 'WA', zip: '98101', lat: 47.6062, lng: -122.3321 },
  { city: 'Nashville', state: 'TN', zip: '37201', lat: 36.1627, lng: -86.7816 },
  { city: 'Charlotte', state: 'NC', zip: '28202', lat: 35.2271, lng: -80.8431 },
  { city: 'Boise', state: 'ID', zip: '83702', lat: 43.615, lng: -116.2023 },
  { city: 'Salt Lake City', state: 'UT', zip: '84101', lat: 40.7608, lng: -111.891 },
  { city: 'Albuquerque', state: 'NM', zip: '87101', lat: 35.0844, lng: -106.6504 },
  { city: 'Atlanta', state: 'GA', zip: '30301', lat: 33.749, lng: -84.388 },
  { city: 'Sacramento', state: 'CA', zip: '95814', lat: 38.5816, lng: -121.4944 },
  { city: 'Las Vegas', state: 'NV', zip: '89101', lat: 36.1699, lng: -115.1398 },
];

interface DealerDef {
  name: string;
  cities: string[];
  isTrustedPartner: boolean;
}

const dealers: DealerDef[] = [
  { name: 'ExploreRV', cities: ['Tampa'], isTrustedPartner: true },
  { name: 'Lazydays RV', cities: ['Seffner', 'Tampa'], isTrustedPartner: true },
  { name: 'General RV Center', cities: ['Orlando', 'Nashville', 'Salt Lake City'], isTrustedPartner: true },
  { name: 'Camping World', cities: ['Houston', 'Dallas', 'Denver', 'Phoenix', 'Atlanta', 'Las Vegas'], isTrustedPartner: true },
  { name: 'Blue Compass RV', cities: ['Charlotte', 'Nashville', 'Atlanta', 'Tucson'], isTrustedPartner: false },
  { name: 'Roy Robinson RV', cities: ['Seattle'], isTrustedPartner: false },
  { name: 'Motor Home Specialist', cities: ['Houston', 'Dallas'], isTrustedPartner: true },
  { name: 'Fun Town RV', cities: ['Dallas', 'Houston'], isTrustedPartner: false },
  { name: 'La Mesa RV', cities: ['Phoenix', 'Tucson', 'Sacramento'], isTrustedPartner: true },
  { name: 'Bill Plemmons RV', cities: ['Charlotte'], isTrustedPartner: false },
  { name: 'Windish RV', cities: ['Denver'], isTrustedPartner: false },
  { name: "Bish's RV", cities: ['Boise', 'Salt Lake City', 'Portland'], isTrustedPartner: true },
];

// ─── Photo pool ──────────────────────────────────────────────────────

const localPhotos = [
  '/images/listing-rv-1.png',
  '/images/listing-rv-2.png',
  '/images/listing-rv-3.png',
  '/images/listing-rv-4.png',
  '/images/listings/rv-03.png',
  '/images/listings/rv-04.png',
  '/images/listings/rv-05.png',
  '/images/listings/rv-06.png',
  '/images/listings/rv-07.png',
  '/images/listings/rv-08.png',
];

function buildPhotos(index: number, title: string, count: number): ListingImage[] {
  const photos: ListingImage[] = [];
  for (let i = 0; i < count; i++) {
    const photo = localPhotos[(index * 3 + i) % localPhotos.length];
    photos.push({
      url: photo,
      alt: `${title} photo ${i + 1}`,
    });
  }
  return photos;
}

// ─── Tow weight helpers ─────────────────────────────────────────────

// Motorhome types are self-propelled and not towable -- omit tow fields
const MOTORHOME_TYPES: ReadonlySet<RVType> = new Set(['class-a', 'class-b', 'class-c']);

/**
 * Compute tongue weight as a percentage of GVWR based on RV type.
 * Uses the midpoint of realistic percentage ranges.
 */
function computeTongueWeight(gvwr: number, rvType: RVType, index: number): number {
  // Use index to add deterministic variation within the realistic range
  const variation = ((index * 7) % 5) / 100; // 0-0.04 variation
  switch (rvType) {
    case 'fifth-wheel':
      return Math.round(gvwr * (0.18 + variation)); // 18-22% typical for fifth wheels
    case 'toy-hauler':
      // Heavier toy haulers are often fifth-wheel style
      return Math.round(gvwr * (0.14 + variation)); // 14-18% for toy haulers
    case 'pop-up':
      return Math.round(gvwr * (0.11 + variation)); // 11-15% for pop-ups
    case 'travel-trailer':
    default:
      return Math.round(gvwr * (0.11 + variation)); // 11-15% for travel trailers
  }
}

/**
 * Determine hitch type based on RV type and GVWR.
 */
function determineHitchType(rvType: RVType, gvwr: number): 'bumper-pull' | 'fifth-wheel' | 'gooseneck' {
  switch (rvType) {
    case 'fifth-wheel':
      return 'fifth-wheel';
    case 'toy-hauler':
      // Heavier toy haulers (>12000 lbs) are typically fifth-wheel
      return gvwr > 12000 ? 'fifth-wheel' : 'bumper-pull';
    case 'travel-trailer':
    case 'pop-up':
    default:
      return 'bumper-pull';
  }
}

// ─── Deterministic helpers ───────────────────────────────────────────

function findDealerForCity(city: string): DealerDef {
  const match = dealers.find((d) => d.cities.includes(city));
  return match ?? dealers[0];
}

function estimateMonthly(price: number): number {
  // rough 20-year RV loan estimate at ~7% APR
  return Math.round(price * 0.0078);
}

// ─── Listing definitions ─────────────────────────────────────────────

interface ListingDef {
  rvType: RVType;
  modelIndex: number;
  trimIndex: number;
  year: number;
  condition: 'new' | 'used';
  price: number;
  originalPrice: number | null;
  dealRating: 'great' | 'good' | 'fair' | 'high' | null;
  tagBadge: string | null;
  isFeatured: boolean;
  isSponsored: boolean;
  locationIndex: number;
  lengthFt: number;
  sleepingCapacity: number;
  fuelType: FuelType;
  floorPlan: string | null;
  gvw: number | null;
  mileage: number | null;
  daysOnSite: number;
  photoCount: number;
}

const listingDefs: ListingDef[] = [
  // ──────────────── TRAVEL TRAILERS (~20) ────────────────
  // 1
  { rvType: 'travel-trailer', modelIndex: 0, trimIndex: 0, year: 2024, condition: 'new', price: 42000, originalPrice: null, dealRating: 'good', tagBadge: 'Newly listed', isFeatured: true, isSponsored: false, locationIndex: 0, lengthFt: 26, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Rear living', gvw: 7500, mileage: null, daysOnSite: 12, photoCount: 5 },
  // 2
  { rvType: 'travel-trailer', modelIndex: 0, trimIndex: 1, year: 2023, condition: 'used', price: 28500, originalPrice: 32000, dealRating: 'great', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 1, lengthFt: 21, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: null, gvw: 5800, mileage: null, daysOnSite: 30, photoCount: 4 },
  // 3
  { rvType: 'travel-trailer', modelIndex: 0, trimIndex: 2, year: 2022, condition: 'used', price: 35000, originalPrice: null, dealRating: 'fair', tagBadge: 'History report', isFeatured: false, isSponsored: false, locationIndex: 3, lengthFt: 26, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Rear living', gvw: 7600, mileage: null, daysOnSite: 55, photoCount: 4 },
  // 4
  { rvType: 'travel-trailer', modelIndex: 1, trimIndex: 0, year: 2024, condition: 'new', price: 38000, originalPrice: null, dealRating: null, tagBadge: 'New arrival', isFeatured: false, isSponsored: false, locationIndex: 4, lengthFt: 22, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: 'Rear kitchen', gvw: 6200, mileage: null, daysOnSite: 3, photoCount: 5 },
  // 5
  { rvType: 'travel-trailer', modelIndex: 1, trimIndex: 1, year: 2021, condition: 'used', price: 31000, originalPrice: 34500, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 5, lengthFt: 25, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: null, gvw: 7000, mileage: null, daysOnSite: 42, photoCount: 4 },
  // 6
  { rvType: 'travel-trailer', modelIndex: 2, trimIndex: 0, year: 2025, condition: 'new', price: 34000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: true, isSponsored: false, locationIndex: 6, lengthFt: 22, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: null, gvw: 5900, mileage: null, daysOnSite: 8, photoCount: 5 },
  // 7
  { rvType: 'travel-trailer', modelIndex: 2, trimIndex: 1, year: 2020, condition: 'used', price: 25000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 7, lengthFt: 24, sleepingCapacity: 5, fuelType: 'n/a', floorPlan: 'Front bedroom', gvw: 6500, mileage: null, daysOnSite: 60, photoCount: 3 },
  // 8
  { rvType: 'travel-trailer', modelIndex: 2, trimIndex: 2, year: 2023, condition: 'used', price: 33000, originalPrice: 37000, dealRating: 'great', tagBadge: 'Hot deal', isFeatured: false, isSponsored: false, locationIndex: 10, lengthFt: 27, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Bunkhouse', gvw: 7800, mileage: null, daysOnSite: 18, photoCount: 5 },
  // 9
  { rvType: 'travel-trailer', modelIndex: 3, trimIndex: 0, year: 2024, condition: 'new', price: 36000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 11, lengthFt: 25, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Bunkhouse', gvw: 7200, mileage: null, daysOnSite: 15, photoCount: 4 },
  // 10
  { rvType: 'travel-trailer', modelIndex: 3, trimIndex: 1, year: 2019, condition: 'used', price: 22000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 15, lengthFt: 28, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Rear kitchen', gvw: 7400, mileage: null, daysOnSite: 90, photoCount: 3 },
  // 11
  { rvType: 'travel-trailer', modelIndex: 4, trimIndex: 0, year: 2025, condition: 'new', price: 45000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: true, isSponsored: false, locationIndex: 8, lengthFt: 25, sleepingCapacity: 5, fuelType: 'n/a', floorPlan: 'Rear living', gvw: 7000, mileage: null, daysOnSite: 5, photoCount: 6 },
  // 12
  { rvType: 'travel-trailer', modelIndex: 4, trimIndex: 1, year: 2022, condition: 'used', price: 38500, originalPrice: 42000, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 9, lengthFt: 29, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Bunkhouse', gvw: 8200, mileage: null, daysOnSite: 25, photoCount: 5 },
  // 13
  { rvType: 'travel-trailer', modelIndex: 5, trimIndex: 0, year: 2024, condition: 'new', price: 88000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: true, locationIndex: 0, lengthFt: 25, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: 'Front bedroom', gvw: 6500, mileage: null, daysOnSite: 20, photoCount: 6 },
  // 14
  { rvType: 'travel-trailer', modelIndex: 5, trimIndex: 1, year: 2021, condition: 'used', price: 72000, originalPrice: 78000, dealRating: 'good', tagBadge: 'Price reduced', isFeatured: false, isSponsored: false, locationIndex: 16, lengthFt: 27, sleepingCapacity: 5, fuelType: 'n/a', floorPlan: 'Front bedroom', gvw: 7200, mileage: null, daysOnSite: 35, photoCount: 5 },
  // 15
  { rvType: 'travel-trailer', modelIndex: 0, trimIndex: 3, year: 2018, condition: 'used', price: 19500, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 14, lengthFt: 19, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: null, gvw: 4800, mileage: null, daysOnSite: 75, photoCount: 3 },
  // 16
  { rvType: 'travel-trailer', modelIndex: 3, trimIndex: 2, year: 2023, condition: 'used', price: 29000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 12, lengthFt: 24, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: null, gvw: 6800, mileage: null, daysOnSite: 28, photoCount: 4 },
  // 17
  { rvType: 'travel-trailer', modelIndex: 1, trimIndex: 2, year: 2025, condition: 'new', price: 42500, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 13, lengthFt: 28, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Bunkhouse', gvw: 8000, mileage: null, daysOnSite: 10, photoCount: 5 },
  // 18
  { rvType: 'travel-trailer', modelIndex: 4, trimIndex: 2, year: 2020, condition: 'used', price: 40000, originalPrice: 45000, dealRating: 'great', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 17, lengthFt: 32, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Bunkhouse', gvw: 9000, mileage: null, daysOnSite: 50, photoCount: 4 },
  // 19
  { rvType: 'travel-trailer', modelIndex: 5, trimIndex: 2, year: 2023, condition: 'used', price: 95000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 2, lengthFt: 30, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Front bedroom', gvw: 8500, mileage: null, daysOnSite: 22, photoCount: 5 },
  // 20
  { rvType: 'travel-trailer', modelIndex: 2, trimIndex: 0, year: 2016, condition: 'used', price: 17500, originalPrice: null, dealRating: 'high', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 10, lengthFt: 22, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: null, gvw: 5500, mileage: null, daysOnSite: 120, photoCount: 3 },

  // ──────────────── FIFTH WHEELS (~12) ────────────────
  // 21
  { rvType: 'fifth-wheel', modelIndex: 0, trimIndex: 0, year: 2024, condition: 'new', price: 92000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: true, isSponsored: false, locationIndex: 3, lengthFt: 39, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Rear kitchen', gvw: 14500, mileage: null, daysOnSite: 14, photoCount: 6 },
  // 22
  { rvType: 'fifth-wheel', modelIndex: 0, trimIndex: 1, year: 2022, condition: 'used', price: 75000, originalPrice: 82000, dealRating: 'great', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 4, lengthFt: 37, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Front bedroom', gvw: 13800, mileage: null, daysOnSite: 38, photoCount: 5 },
  // 23
  { rvType: 'fifth-wheel', modelIndex: 0, trimIndex: 2, year: 2021, condition: 'used', price: 68000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 5, lengthFt: 38, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Bunkhouse', gvw: 14200, mileage: null, daysOnSite: 60, photoCount: 4 },
  // 24
  { rvType: 'fifth-wheel', modelIndex: 1, trimIndex: 0, year: 2025, condition: 'new', price: 78000, originalPrice: null, dealRating: null, tagBadge: 'New arrival', isFeatured: false, isSponsored: false, locationIndex: 8, lengthFt: 33, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Rear living', gvw: 11500, mileage: null, daysOnSite: 4, photoCount: 5 },
  // 25
  { rvType: 'fifth-wheel', modelIndex: 1, trimIndex: 1, year: 2023, condition: 'used', price: 65000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 12, lengthFt: 30, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: 'Rear living', gvw: 10500, mileage: null, daysOnSite: 30, photoCount: 4 },
  // 26
  { rvType: 'fifth-wheel', modelIndex: 1, trimIndex: 2, year: 2024, condition: 'new', price: 85000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: true, locationIndex: 9, lengthFt: 36, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Bunkhouse', gvw: 13000, mileage: null, daysOnSite: 11, photoCount: 5 },
  // 27
  { rvType: 'fifth-wheel', modelIndex: 2, trimIndex: 0, year: 2023, condition: 'used', price: 72000, originalPrice: 79000, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 10, lengthFt: 33, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: null, gvw: 12000, mileage: null, daysOnSite: 45, photoCount: 4 },
  // 28
  { rvType: 'fifth-wheel', modelIndex: 2, trimIndex: 1, year: 2020, condition: 'used', price: 58000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 13, lengthFt: 39, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Front bedroom', gvw: 14000, mileage: null, daysOnSite: 80, photoCount: 4 },
  // 29
  { rvType: 'fifth-wheel', modelIndex: 3, trimIndex: 0, year: 2025, condition: 'new', price: 105000, originalPrice: null, dealRating: null, tagBadge: 'New arrival', isFeatured: true, isSponsored: false, locationIndex: 1, lengthFt: 39, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Rear living', gvw: 15200, mileage: null, daysOnSite: 2, photoCount: 6 },
  // 30
  { rvType: 'fifth-wheel', modelIndex: 3, trimIndex: 1, year: 2019, condition: 'used', price: 55000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 15, lengthFt: 37, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: null, gvw: 13500, mileage: null, daysOnSite: 95, photoCount: 3 },
  // 31
  { rvType: 'fifth-wheel', modelIndex: 0, trimIndex: 0, year: 2018, condition: 'used', price: 48000, originalPrice: null, dealRating: 'high', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 6, lengthFt: 39, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Rear kitchen', gvw: 14500, mileage: null, daysOnSite: 110, photoCount: 3 },
  // 32
  { rvType: 'fifth-wheel', modelIndex: 1, trimIndex: 0, year: 2022, condition: 'used', price: 62000, originalPrice: 68000, dealRating: 'great', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 14, lengthFt: 33, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Rear living', gvw: 11500, mileage: null, daysOnSite: 33, photoCount: 5 },

  // ──────────────── CLASS A (~10) ────────────────
  // 33
  { rvType: 'class-a', modelIndex: 0, trimIndex: 0, year: 2024, condition: 'new', price: 198000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: true, isSponsored: false, locationIndex: 3, lengthFt: 34, sleepingCapacity: 6, fuelType: 'diesel', floorPlan: 'Front bedroom', gvw: 26000, mileage: null, daysOnSite: 10, photoCount: 6 },
  // 34
  { rvType: 'class-a', modelIndex: 0, trimIndex: 1, year: 2022, condition: 'used', price: 165000, originalPrice: 180000, dealRating: 'great', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 4, lengthFt: 37, sleepingCapacity: 6, fuelType: 'diesel', floorPlan: null, gvw: 28000, mileage: 18500, daysOnSite: 28, photoCount: 5 },
  // 35
  { rvType: 'class-a', modelIndex: 1, trimIndex: 0, year: 2025, condition: 'new', price: 225000, originalPrice: null, dealRating: null, tagBadge: 'New arrival', isFeatured: false, isSponsored: false, locationIndex: 0, lengthFt: 30, sleepingCapacity: 4, fuelType: 'gas', floorPlan: null, gvw: 22000, mileage: null, daysOnSite: 6, photoCount: 6 },
  // 36
  { rvType: 'class-a', modelIndex: 1, trimIndex: 1, year: 2020, condition: 'used', price: 135000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 7, lengthFt: 32, sleepingCapacity: 5, fuelType: 'gas', floorPlan: 'Front bedroom', gvw: 24000, mileage: 32000, daysOnSite: 65, photoCount: 4 },
  // 37
  { rvType: 'class-a', modelIndex: 2, trimIndex: 0, year: 2023, condition: 'used', price: 320000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: true, locationIndex: 11, lengthFt: 37, sleepingCapacity: 4, fuelType: 'diesel', floorPlan: 'Rear living', gvw: 34000, mileage: 12000, daysOnSite: 22, photoCount: 6 },
  // 38
  { rvType: 'class-a', modelIndex: 2, trimIndex: 1, year: 2021, condition: 'used', price: 385000, originalPrice: 410000, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 16, lengthFt: 40, sleepingCapacity: 6, fuelType: 'diesel', floorPlan: null, gvw: 40000, mileage: 8500, daysOnSite: 40, photoCount: 5 },
  // 39
  { rvType: 'class-a', modelIndex: 3, trimIndex: 0, year: 2024, condition: 'new', price: 275000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 17, lengthFt: 40, sleepingCapacity: 6, fuelType: 'diesel', floorPlan: 'Front bedroom', gvw: 36000, mileage: null, daysOnSite: 16, photoCount: 6 },
  // 40
  { rvType: 'class-a', modelIndex: 3, trimIndex: 1, year: 2019, condition: 'used', price: 210000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 2, lengthFt: 44, sleepingCapacity: 6, fuelType: 'diesel', floorPlan: 'Rear living', gvw: 44000, mileage: 28000, daysOnSite: 55, photoCount: 4 },
  // 41
  { rvType: 'class-a', modelIndex: 0, trimIndex: 0, year: 2017, condition: 'used', price: 115000, originalPrice: null, dealRating: 'high', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 10, lengthFt: 34, sleepingCapacity: 6, fuelType: 'diesel', floorPlan: 'Front bedroom', gvw: 26000, mileage: 42000, daysOnSite: 100, photoCount: 3 },
  // 42
  { rvType: 'class-a', modelIndex: 1, trimIndex: 0, year: 2026, condition: 'new', price: 245000, originalPrice: null, dealRating: null, tagBadge: 'New arrival', isFeatured: true, isSponsored: false, locationIndex: 6, lengthFt: 30, sleepingCapacity: 4, fuelType: 'gas', floorPlan: null, gvw: 22000, mileage: null, daysOnSite: 1, photoCount: 6 },

  // ──────────────── CLASS C (~10) ────────────────
  // 43
  { rvType: 'class-c', modelIndex: 0, trimIndex: 0, year: 2024, condition: 'new', price: 118000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 1, lengthFt: 28, sleepingCapacity: 6, fuelType: 'gas', floorPlan: null, gvw: 14500, mileage: null, daysOnSite: 18, photoCount: 5 },
  // 44
  { rvType: 'class-c', modelIndex: 0, trimIndex: 1, year: 2022, condition: 'used', price: 88000, originalPrice: 95000, dealRating: 'great', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 5, lengthFt: 31, sleepingCapacity: 8, fuelType: 'gas', floorPlan: 'Bunkhouse', gvw: 16000, mileage: 15000, daysOnSite: 32, photoCount: 5 },
  // 45
  { rvType: 'class-c', modelIndex: 0, trimIndex: 2, year: 2020, condition: 'used', price: 72000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 8, lengthFt: 25, sleepingCapacity: 5, fuelType: 'gas', floorPlan: null, gvw: 12500, mileage: 22000, daysOnSite: 58, photoCount: 4 },
  // 46
  { rvType: 'class-c', modelIndex: 1, trimIndex: 0, year: 2025, condition: 'new', price: 130000, originalPrice: null, dealRating: null, tagBadge: 'New arrival', isFeatured: false, isSponsored: false, locationIndex: 15, lengthFt: 26, sleepingCapacity: 6, fuelType: 'gas', floorPlan: 'Front bedroom', gvw: 14000, mileage: null, daysOnSite: 5, photoCount: 5 },
  // 47
  { rvType: 'class-c', modelIndex: 1, trimIndex: 1, year: 2021, condition: 'used', price: 95000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 11, lengthFt: 31, sleepingCapacity: 8, fuelType: 'gas', floorPlan: 'Bunkhouse', gvw: 16500, mileage: 19000, daysOnSite: 45, photoCount: 4 },
  // 48
  { rvType: 'class-c', modelIndex: 2, trimIndex: 0, year: 2024, condition: 'new', price: 155000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: true, isSponsored: false, locationIndex: 9, lengthFt: 24, sleepingCapacity: 4, fuelType: 'diesel', floorPlan: null, gvw: 11000, mileage: null, daysOnSite: 9, photoCount: 6 },
  // 49
  { rvType: 'class-c', modelIndex: 2, trimIndex: 1, year: 2019, condition: 'used', price: 98000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 14, lengthFt: 24, sleepingCapacity: 4, fuelType: 'diesel', floorPlan: null, gvw: 11000, mileage: 35000, daysOnSite: 70, photoCount: 4 },
  // 50
  { rvType: 'class-c', modelIndex: 3, trimIndex: 0, year: 2023, condition: 'used', price: 82000, originalPrice: 89000, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 7, lengthFt: 26, sleepingCapacity: 6, fuelType: 'gas', floorPlan: null, gvw: 14000, mileage: 12000, daysOnSite: 25, photoCount: 5 },
  // 51
  { rvType: 'class-c', modelIndex: 3, trimIndex: 1, year: 2018, condition: 'used', price: 65000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 12, lengthFt: 31, sleepingCapacity: 8, fuelType: 'gas', floorPlan: 'Bunkhouse', gvw: 16000, mileage: 38000, daysOnSite: 85, photoCount: 3 },
  // 52
  { rvType: 'class-c', modelIndex: 0, trimIndex: 0, year: 2015, condition: 'used', price: 52000, originalPrice: null, dealRating: 'high', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 3, lengthFt: 28, sleepingCapacity: 6, fuelType: 'gas', floorPlan: null, gvw: 14500, mileage: 55000, daysOnSite: 130, photoCount: 3 },

  // ──────────────── CLASS B (~8) ────────────────
  // 53
  { rvType: 'class-b', modelIndex: 0, trimIndex: 0, year: 2024, condition: 'new', price: 220000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 5, lengthFt: 19, sleepingCapacity: 2, fuelType: 'diesel', floorPlan: null, gvw: 8550, mileage: null, daysOnSite: 12, photoCount: 5 },
  // 54
  { rvType: 'class-b', modelIndex: 0, trimIndex: 0, year: 2022, condition: 'used', price: 185000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 8, lengthFt: 19, sleepingCapacity: 2, fuelType: 'diesel', floorPlan: null, gvw: 8550, mileage: 14000, daysOnSite: 30, photoCount: 4 },
  // 55
  { rvType: 'class-b', modelIndex: 1, trimIndex: 0, year: 2025, condition: 'new', price: 240000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: true, locationIndex: 0, lengthFt: 24, sleepingCapacity: 2, fuelType: 'diesel', floorPlan: null, gvw: 10500, mileage: null, daysOnSite: 3, photoCount: 6 },
  // 56
  { rvType: 'class-b', modelIndex: 1, trimIndex: 1, year: 2021, condition: 'used', price: 175000, originalPrice: 190000, dealRating: 'great', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 16, lengthFt: 24, sleepingCapacity: 2, fuelType: 'diesel', floorPlan: null, gvw: 10500, mileage: 22000, daysOnSite: 35, photoCount: 5 },
  // 57
  { rvType: 'class-b', modelIndex: 2, trimIndex: 0, year: 2024, condition: 'new', price: 168000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 6, lengthFt: 19, sleepingCapacity: 2, fuelType: 'diesel', floorPlan: null, gvw: 9350, mileage: null, daysOnSite: 15, photoCount: 5 },
  // 58
  { rvType: 'class-b', modelIndex: 2, trimIndex: 1, year: 2020, condition: 'used', price: 125000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 17, lengthFt: 19, sleepingCapacity: 2, fuelType: 'diesel', floorPlan: null, gvw: 9350, mileage: 30000, daysOnSite: 55, photoCount: 4 },
  // 59
  { rvType: 'class-b', modelIndex: 0, trimIndex: 0, year: 2023, condition: 'used', price: 198000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 13, lengthFt: 19, sleepingCapacity: 2, fuelType: 'diesel', floorPlan: null, gvw: 8550, mileage: 8000, daysOnSite: 20, photoCount: 5 },
  // 60
  { rvType: 'class-b', modelIndex: 1, trimIndex: 0, year: 2019, condition: 'used', price: 148000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 9, lengthFt: 24, sleepingCapacity: 2, fuelType: 'diesel', floorPlan: null, gvw: 10500, mileage: 38000, daysOnSite: 48, photoCount: 3 },

  // ──────────────── TOY HAULERS (~10) ────────────────
  // 61
  { rvType: 'toy-hauler', modelIndex: 0, trimIndex: 0, year: 2024, condition: 'new', price: 55000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 4, lengthFt: 32, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 10500, mileage: null, daysOnSite: 14, photoCount: 5 },
  // 62
  { rvType: 'toy-hauler', modelIndex: 0, trimIndex: 1, year: 2022, condition: 'used', price: 42000, originalPrice: 48000, dealRating: 'great', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 7, lengthFt: 35, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 12000, mileage: null, daysOnSite: 40, photoCount: 5 },
  // 63
  { rvType: 'toy-hauler', modelIndex: 0, trimIndex: 2, year: 2021, condition: 'used', price: 58000, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 13, lengthFt: 40, sleepingCapacity: 10, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 15000, mileage: null, daysOnSite: 50, photoCount: 4 },
  // 64
  { rvType: 'toy-hauler', modelIndex: 1, trimIndex: 0, year: 2025, condition: 'new', price: 95000, originalPrice: null, dealRating: null, tagBadge: 'New arrival', isFeatured: false, isSponsored: false, locationIndex: 17, lengthFt: 37, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 16000, mileage: null, daysOnSite: 4, photoCount: 6 },
  // 65
  { rvType: 'toy-hauler', modelIndex: 1, trimIndex: 1, year: 2023, condition: 'used', price: 82000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 3, lengthFt: 43, sleepingCapacity: 10, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 18500, mileage: null, daysOnSite: 22, photoCount: 5 },
  // 66
  { rvType: 'toy-hauler', modelIndex: 2, trimIndex: 0, year: 2024, condition: 'new', price: 88000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: true, isSponsored: false, locationIndex: 10, lengthFt: 35, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 14500, mileage: null, daysOnSite: 9, photoCount: 6 },
  // 67
  { rvType: 'toy-hauler', modelIndex: 2, trimIndex: 1, year: 2020, condition: 'used', price: 72000, originalPrice: 78000, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 5, lengthFt: 39, sleepingCapacity: 10, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 17000, mileage: null, daysOnSite: 52, photoCount: 4 },
  // 68
  { rvType: 'toy-hauler', modelIndex: 3, trimIndex: 0, year: 2023, condition: 'used', price: 48000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 14, lengthFt: 32, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 11000, mileage: null, daysOnSite: 35, photoCount: 4 },
  // 69
  { rvType: 'toy-hauler', modelIndex: 3, trimIndex: 1, year: 2019, condition: 'used', price: 38000, originalPrice: null, dealRating: 'high', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 15, lengthFt: 37, sleepingCapacity: 8, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 14000, mileage: null, daysOnSite: 88, photoCount: 3 },
  // 70
  { rvType: 'toy-hauler', modelIndex: 0, trimIndex: 0, year: 2025, condition: 'new', price: 62000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 12, lengthFt: 32, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: 'Toy hauler garage', gvw: 10500, mileage: null, daysOnSite: 7, photoCount: 5 },

  // ──────────────── POP-UPS (~10) ────────────────
  // 71
  { rvType: 'pop-up', modelIndex: 0, trimIndex: 0, year: 2024, condition: 'new', price: 22000, originalPrice: null, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 1, lengthFt: 14, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: null, gvw: 3500, mileage: null, daysOnSite: 20, photoCount: 4 },
  // 72
  { rvType: 'pop-up', modelIndex: 0, trimIndex: 1, year: 2022, condition: 'used', price: 18000, originalPrice: 21000, dealRating: 'great', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 11, lengthFt: 15, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: null, gvw: 3800, mileage: null, daysOnSite: 42, photoCount: 4 },
  // 73
  { rvType: 'pop-up', modelIndex: 1, trimIndex: 0, year: 2025, condition: 'new', price: 16500, originalPrice: null, dealRating: null, tagBadge: 'New arrival', isFeatured: false, isSponsored: false, locationIndex: 6, lengthFt: 10, sleepingCapacity: 3, fuelType: 'n/a', floorPlan: null, gvw: 2200, mileage: null, daysOnSite: 2, photoCount: 4 },
  // 74
  { rvType: 'pop-up', modelIndex: 1, trimIndex: 1, year: 2020, condition: 'used', price: 14500, originalPrice: null, dealRating: 'fair', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 10, lengthFt: 12, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: null, gvw: 2800, mileage: null, daysOnSite: 65, photoCount: 3 },
  // 75
  { rvType: 'pop-up', modelIndex: 2, trimIndex: 0, year: 2024, condition: 'new', price: 15000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 8, lengthFt: 8, sleepingCapacity: 2, fuelType: 'n/a', floorPlan: null, gvw: 1800, mileage: null, daysOnSite: 14, photoCount: 4 },
  // 76
  { rvType: 'pop-up', modelIndex: 2, trimIndex: 1, year: 2019, condition: 'used', price: 15000, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 15, lengthFt: 10, sleepingCapacity: 3, fuelType: 'n/a', floorPlan: null, gvw: 2000, mileage: null, daysOnSite: 80, photoCount: 3 },
  // 77
  { rvType: 'pop-up', modelIndex: 2, trimIndex: 2, year: 2023, condition: 'used', price: 16000, originalPrice: 18500, dealRating: 'good', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 9, lengthFt: 12, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: null, gvw: 2400, mileage: null, daysOnSite: 30, photoCount: 4 },
  // 78
  { rvType: 'pop-up', modelIndex: 0, trimIndex: 0, year: 2017, condition: 'used', price: 13500, originalPrice: null, dealRating: 'high', tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 4, lengthFt: 14, sleepingCapacity: 4, fuelType: 'n/a', floorPlan: null, gvw: 3500, mileage: null, daysOnSite: 95, photoCount: 3 },
  // 79
  { rvType: 'pop-up', modelIndex: 1, trimIndex: 0, year: 2021, condition: 'used', price: 15500, originalPrice: null, dealRating: null, tagBadge: null, isFeatured: false, isSponsored: false, locationIndex: 13, lengthFt: 10, sleepingCapacity: 3, fuelType: 'n/a', floorPlan: null, gvw: 2200, mileage: null, daysOnSite: 48, photoCount: 3 },
  // 80
  { rvType: 'pop-up', modelIndex: 0, trimIndex: 1, year: 2026, condition: 'new', price: 24000, originalPrice: null, dealRating: null, tagBadge: 'New arrival', isFeatured: false, isSponsored: true, locationIndex: 0, lengthFt: 15, sleepingCapacity: 6, fuelType: 'n/a', floorPlan: null, gvw: 3800, mileage: null, daysOnSite: 1, photoCount: 5 },
];

// ─── Builder ─────────────────────────────────────────────────────────

function buildListing(index: number, def: ListingDef): SRPListing {
  const models = rvTypeModels[def.rvType];
  const modelDef = models[def.modelIndex % models.length];
  const trim = modelDef.trims[def.trimIndex % modelDef.trims.length];
  const loc = locations[def.locationIndex % locations.length];
  const dealer = findDealerForCity(loc.city);
  const id = `srp-${String(index + 1).padStart(3, '0')}`;
  const title = `${def.year} ${modelDef.make} ${modelDef.model} ${trim}`;

  // Compute tow compatibility fields for towable types only
  const isTowable = !MOTORHOME_TYPES.has(def.rvType) && def.gvw != null;
  const towFields = isTowable
    ? {
        gvwr: def.gvw!,
        tongueWeight: computeTongueWeight(def.gvw!, def.rvType, index),
        hitchType: determineHitchType(def.rvType, def.gvw!) as 'bumper-pull' | 'fifth-wheel' | 'gooseneck',
      }
    : {};

  return {
    id,
    title,
    year: def.year,
    make: modelDef.make,
    model: modelDef.model,
    trim,
    rvType: def.rvType,
    condition: def.condition,
    currentPrice: def.price,
    originalPrice: def.originalPrice,
    monthlyPayment: estimateMonthly(def.price),
    dealRating: def.dealRating,
    photos: buildPhotos(index, title, def.photoCount),
    tagBadge: def.tagBadge,
    isFeatured: def.isFeatured,
    isSponsored: def.isSponsored,
    isFavorited: false,
    dealer: {
      name: dealer.name,
      city: loc.city,
      state: loc.state,
      distanceMiles: Math.round(Math.random() * 200 + 5),
    },
    location: {
      city: loc.city,
      state: loc.state,
      zip: loc.zip,
      lat: loc.lat,
      lng: loc.lng,
    },
    lengthFt: def.lengthFt,
    sleepingCapacity: def.sleepingCapacity,
    fuelType: def.fuelType,
    floorPlan: def.floorPlan,
    grossVehicleWeight: def.gvw,
    ...towFields,
    mileage: def.mileage,
    daysOnSite: def.daysOnSite,
    isTrustedPartner: dealer.isTrustedPartner,
  };
}

// ─── Scraped listing adapter ─────────────────────────────────────────

function parseRvType(value: string): RVType {
  const v = value.toLowerCase();
  if (v.includes('toy hauler')) return 'toy-hauler';
  if (v.includes('pop-up') || v.includes('folding')) return 'pop-up';
  if (v.includes('fifth wheel')) return 'fifth-wheel';
  if (v.includes('travel trailer')) return 'travel-trailer';
  if (v.includes('class a')) return 'class-a';
  if (v.includes('class b')) return 'class-b';
  if (v.includes('class c')) return 'class-c';
  return 'travel-trailer';
}

function deriveFuelType(rvType: RVType, rvTypeSpec: string): FuelType {
  if (!MOTORHOME_TYPES.has(rvType)) return 'n/a';
  return rvTypeSpec.toLowerCase().includes('diesel') ? 'diesel' : 'gas';
}

function specValue(data: ListingData, label: string): string {
  return data.specs.find(s => s.label === label)?.value ?? '';
}

/** Only allow tag badges that match the design system palette */
const ALLOWED_TAGS = new Set([
  'New arrival', 'Newly listed', 'Price drop', 'Price reduced',
  'Hot deal', 'History report',
]);

function sanitizeTag(tag: string | undefined | null): string | null {
  return tag && ALLOWED_TAGS.has(tag) ? tag : null;
}

/** Hardcoded coordinates for cities appearing in scraped listings */
const cityCoords: Record<string, { lat: number; lng: number; zip: string }> = {
  'Sacramento': { lat: 38.5816, lng: -121.4944, zip: '95814' },
  'Roseville': { lat: 38.7521, lng: -121.2880, zip: '95661' },
  'Alvarado': { lat: 32.3574, lng: -97.0161, zip: '76009' },
  'San Diego': { lat: 32.7157, lng: -117.1611, zip: '92101' },
  'Portland': { lat: 45.5152, lng: -122.6784, zip: '97201' },
  'Fairfield': { lat: 38.2494, lng: -122.0400, zip: '94533' },
  'La Mirada': { lat: 33.9172, lng: -118.0120, zip: '90638' },
  'Temecula': { lat: 33.4936, lng: -117.1484, zip: '92590' },
  'Fresno': { lat: 36.7378, lng: -119.7871, zip: '93721' },
  'Barstow': { lat: 34.8958, lng: -117.0173, zip: '92311' },
  'Riverside': { lat: 33.9533, lng: -117.3962, zip: '92501' },
  'El Cajon': { lat: 32.7948, lng: -116.9625, zip: '92020' },
};

const FEATURED_SLUGS = new Set([
  'sunseeker-1950le',
  'dutch-star-4020',
  'sprinter-2500-awd',
  'flying-cloud-23fbq',
  'riverstone-420re',
  'fuzion-430',
  'freedom-traveler-a24',
  'allegro-open-road-32sa',

  'basecamp-20x',
  'eagle-321rsts',
]);

function toSRPListing(slug: string, data: ListingData): SRPListing {
  const rvTypeSpec = specValue(data, 'RV type');
  const rvType = parseRvType(rvTypeSpec);
  const condition: 'new' | 'used' = specValue(data, 'Condition').toLowerCase() === 'new' ? 'new' : 'used';
  const lengthFt = parseInt(specValue(data, 'Length')) || 0;
  const sleepingCapacity = parseInt(specValue(data, 'Sleeping capacity')) || 2;
  const gvwrRaw = specValue(data, 'GVWR').replace(/[^0-9]/g, '');
  const gvwr = gvwrRaw ? parseInt(gvwrRaw) : null;
  const fuelType = deriveFuelType(rvType, rvTypeSpec);

  const [city = '', state = ''] = data.location.split(', ');
  const coords = cityCoords[city] ?? { lat: 38.5816, lng: -121.4944, zip: '95814' };

  const isTowable = !MOTORHOME_TYPES.has(rvType) && gvwr != null;
  const towFields = isTowable
    ? {
        gvwr: gvwr!,
        tongueWeight: computeTongueWeight(gvwr!, rvType, 0),
        hitchType: determineHitchType(rvType, gvwr!) as 'bumper-pull' | 'fifth-wheel' | 'gooseneck',
      }
    : {};

  return {
    id: slug,
    slug,
    title: data.title,
    year: data.year,
    make: data.make,
    model: data.model,
    trim: data.trim,
    rvType,
    condition,
    currentPrice: data.currentPrice,
    originalPrice: data.originalPrice !== data.currentPrice ? data.originalPrice : null,
    monthlyPayment: data.monthlyPayment ?? estimateMonthly(data.currentPrice),
    dealRating: data.dealRating,
    photos: sortPhotosExteriorFirst(data.images),
    tagBadge: sanitizeTag(data.tagText),
    isFeatured: FEATURED_SLUGS.has(slug),
    isSponsored: false,
    isFavorited: false,
    dealer: {
      name: data.dealer.name,
      city,
      state,
      distanceMiles: null,
    },
    location: {
      city,
      state,
      zip: coords.zip,
      lat: coords.lat,
      lng: coords.lng,
    },
    lengthFt,
    sleepingCapacity,
    fuelType,
    floorPlan: null,
    grossVehicleWeight: gvwr,
    ...towFields,
    mileage: null,
    daysOnSite: data.daysOnSite,
    isTrustedPartner: data.dealer.isTop50,
    description: data.description || undefined,
  };
}

const realListings: SRPListing[] = allListings.map(({ slug, data }) =>
  toSRPListing(slug, data),
);

// ─── Export ──────────────────────────────────────────────────────────

/** Mock listings kept for filter engine variety (not displayed first) */
const mockListings: SRPListing[] = listingDefs.map((def, i) =>
  buildListing(i, def),
);

export const sampleSrpListings: SRPListing[] = realListings;
