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
  { label: 'Travel Trailer', slug: 'travel-trailer', imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=260&h=200&fit=crop' },
  { label: 'Class A', slug: 'class-a', imageUrl: 'https://images.unsplash.com/photo-1543922596-b3f17d2c2ec1?w=260&h=200&fit=crop' },
  { label: 'Class B', slug: 'class-b', imageUrl: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=260&h=200&fit=crop' },
  { label: 'Class C', slug: 'class-c', imageUrl: 'https://images.unsplash.com/photo-1622675272077-341dbb33c569?w=260&h=200&fit=crop' },
  { label: 'Fifth Wheel', slug: 'fifth-wheel', imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=260&h=200&fit=crop' },
  { label: 'Toy Hauler', slug: 'toy-hauler', imageUrl: 'https://images.unsplash.com/photo-1600187867470-ce785fc36547?w=260&h=200&fit=crop' },
  { label: 'Pop-up Camper', slug: 'pop-up-camper', imageUrl: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=260&h=200&fit=crop' },
  { label: 'Truck Camper', slug: 'truck-camper', imageUrl: 'https://images.unsplash.com/photo-1533745848184-3db07256e163?w=260&h=200&fit=crop' },
  { label: 'Park Model', slug: 'park-model', imageUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=260&h=200&fit=crop' },
  { label: 'Fish House', slug: 'fish-house', imageUrl: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=260&h=200&fit=crop' },
];

export const POPULAR_SEARCHES: PopularSearch[] = [
  { label: 'RVs under $35,000', query: 'priceMax=35000' },
  { label: 'Min. 4 sleeping capacity', query: 'sleepingMin=4' },
  { label: 'Under 50,000 miles', query: 'milesMax=50000' },
  { label: 'New RVs near me', query: 'condition=new' },
  { label: 'Diesel pushers', query: 'q=diesel+pusher' },
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
  { name: 'Fun Town RV', slug: 'fun-town-rv', color: '#FA8131' },
];
