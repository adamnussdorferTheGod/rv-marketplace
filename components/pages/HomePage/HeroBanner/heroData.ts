/* Static data for the search dropdown sections */

export interface RVType {
  label: string;
  slug: string;
  imageUrl: string;
}

export interface PopularSearch {
  label: string;
  query: string;
}

export interface PopularMake {
  label: string;
  slug: string;
}

export interface FeaturedDealer {
  name: string;
  slug: string;
  color: string;
}

export const RV_TYPES: RVType[] = [
  { label: 'Travel Trailer', slug: 'travel-trailer', imageUrl: '/images/rv-types/travel-trailer.png' },
  { label: 'Class A', slug: 'class-a', imageUrl: '/images/rv-types/class-a.png' },
  { label: 'Class B', slug: 'class-b', imageUrl: '/images/rv-types/class-b.png' },
  { label: 'Class C', slug: 'class-c', imageUrl: '/images/rv-types/class-c.png' },
  { label: 'Fifth Wheel', slug: 'fifth-wheel', imageUrl: '/images/rv-types/fifth-wheel.png' },
  { label: 'Toy Hauler', slug: 'toy-hauler', imageUrl: '/images/rv-types/toy-hauler.png' },
  { label: 'Pop-up', slug: 'pop-up-camper', imageUrl: '/images/rv-types/pop-up-camper.png' },
  { label: 'Truck\u00A0Camper', slug: 'truck-camper', imageUrl: '/images/rv-types/truck-camper.png' },
  { label: 'Park Model', slug: 'park-model', imageUrl: '/images/rv-types/park-model.png' },
  { label: 'Fish House', slug: 'fish-house', imageUrl: '/images/rv-types/fish-house.png' },
];

export const POPULAR_SEARCHES: PopularSearch[] = [
  { label: 'RVs under $35,000', query: 'priceMax=35000' },
  { label: 'Min. 4 sleeping capacity', query: 'sleepingMin=4' },
  { label: 'Under 50,000 miles', query: 'milesMax=50000' },
  { label: 'Recent price drops', query: 'sort=price-drop' },
  { label: 'Used', query: 'condition=used' },
  { label: 'RVs under 5,000 lbs', query: 'weightMax=5000' },
];

export const POPULAR_MAKES: PopularMake[] = [
  { label: 'Forest River', slug: 'forest-river' },
  { label: 'Keystone', slug: 'keystone' },
  { label: 'Jayco', slug: 'jayco' },
  { label: 'Grand Design', slug: 'grand-design' },
  { label: 'Coachmen', slug: 'coachmen' },
  { label: 'Thor Motor Coach', slug: 'thor-motor-coach' },
  { label: 'Winnebago', slug: 'winnebago' },
  { label: 'Heartland', slug: 'heartland' },
];

export const FEATURED_DEALERS: FeaturedDealer[] = [
  { name: 'General RV Center', slug: 'general-rv-center', color: '#006836' },
  { name: 'Camping World', slug: 'camping-world', color: '#D8202E' },
  { name: 'Lazydays RV', slug: 'lazydays-rv', color: '#3870E9' },
];
