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
  { label: 'Pop-up', slug: 'pop-up', imageUrl: '/images/rv-types/pop-up-camper.png' },
  { label: 'Truck\u00A0Camper', slug: 'truck-camper', imageUrl: '/images/rv-types/truck-camper.png' },
  { label: 'Park Model', slug: 'park-model', imageUrl: '/images/rv-types/park-model.png' },
  { label: 'Fish House', slug: 'fish-house', imageUrl: '/images/rv-types/fish-house.png' },
];

export const POPULAR_SEARCHES: PopularSearch[] = [
  { label: 'RVs under $35,000', query: 'priceMax=35000' },
  { label: 'Min. 4 sleeping capacity', query: 'sleepingCapacity=4' },
  { label: 'Used RVs', query: 'condition=used' },
  { label: 'Recent price drops', query: 'sort=price-low' },
  { label: 'RVs under 5,000 lbs', query: 'gvwMax=5000' },
  { label: 'RVs under $75,000', query: 'priceMax=75000' },
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

/**
 * Sell-form catalog: RV Type slug → Make slug → Model names
 * Drives the cascading dropdowns in the "Sell my RV" hero form.
 */
export const SELL_CATALOG: Record<string, Record<string, string[]>> = {
  'travel-trailer': {
    'forest-river': ['Cherokee', 'Flagstaff', 'Rockwood', 'Salem', 'Wildwood', 'Vibe', 'R-Pod', 'Surveyor', 'No Boundaries'],
    'keystone': ['Cougar', 'Passport', 'Springdale', 'Bullet', 'Hideout'],
    'jayco': ['Jay Feather', 'Jay Flight', 'White Hawk', 'Eagle HT'],
    'grand-design': ['Imagine', 'Transcend', 'Imagine XLS'],
    'coachmen': ['Catalina', 'Apex', 'Freedom Express', 'Spirit'],
    'heartland': ['Mallard', 'North Trail', 'Pioneer', 'Trail Runner', 'Sundance'],
    'winnebago': ['Minnie', 'Micro Minnie', 'Hike', 'Voyage', 'Access'],
  },
  'class-a': {
    'thor-motor-coach': ['Ace', 'Aria', 'Hurricane', 'Venetian', 'Magnitude', 'Palazzo'],
    'winnebago': ['Adventurer', 'Forza', 'Vista', 'Intent', 'Journey'],
    'coachmen': ['Mirada', 'Pursuit', 'Sportscoach', 'Encore'],
    'forest-river': ['Berkshire', 'Georgetown', 'FR3'],
    'jayco': ['Precept', 'Alante'],
  },
  'class-b': {
    'winnebago': ['Ekko', 'Solis', 'Revel', 'Travato'],
    'thor-motor-coach': ['Sanctuary', 'Twist', 'Rangeline', 'Tranquility'],
    'coachmen': ['Beyond', 'Nova', 'Cross Trail'],
    'jayco': ['Terrain', 'Swift'],
    'forest-river': ['Sunseeker TS'],
  },
  'class-c': {
    'thor-motor-coach': ['Chateau', 'Four Winds', 'Compass', 'Gemini', 'Outlaw'],
    'winnebago': ['View', 'Navion', 'Porto', 'Vita', 'Minnie Winnie'],
    'jayco': ['Melbourne', 'Redhawk', 'Seneca'],
    'coachmen': ['Freelander', 'Leprechaun', 'Cross Trail'],
    'forest-river': ['Sunseeker', 'Forester', 'Solera'],
  },
  'fifth-wheel': {
    'keystone': ['Montana', 'Cougar', 'Arcadia', 'Fuzion', 'Alpine', 'Sprinter'],
    'grand-design': ['Reflection', 'Solitude', 'Momentum'],
    'forest-river': ['Rockwood', 'Cardinal', 'Sandpiper', 'Sierra', 'Wildcat'],
    'jayco': ['Eagle', 'North Point', 'Pinnacle'],
    'heartland': ['Big Country', 'Bighorn', 'Elkridge', 'Cyclone'],
  },
  'toy-hauler': {
    'keystone': ['Fuzion', 'Raptor', 'Impact'],
    'grand-design': ['Momentum'],
    'forest-river': ['XLR', 'Shockwave', 'Vengeance'],
    'heartland': ['Cyclone', 'Road Warrior', 'Torque'],
    'jayco': ['Octane', 'Seismic'],
  },
  'pop-up-camper': {
    'forest-river': ['Flagstaff', 'Rockwood'],
    'coachmen': ['Clipper'],
    'jayco': ['Jay Sport', 'Jay Series'],
  },
  'truck-camper': {
    'lance': ['Lance 650', 'Lance 825', 'Lance 850', 'Lance 960', 'Lance 1062', 'Lance 1172'],
    'palomino': ['Backpack', 'HS-750', 'HS-2902'],
    'northwood': ['Arctic Fox 811', 'Arctic Fox 990', 'Arctic Fox 1150', 'Wolf Creek 840', 'Wolf Creek 890'],
    'nucamp': ['Cirrus 620', 'Cirrus 720', 'Cirrus 820', 'Cirrus 920'],
  },
  'park-model': {
    'forest-river': ['Quailridge', 'Wildwood DLX'],
    'champion': ['Athens Park 264', 'Athens Park 305'],
    'woodland-park': ['Timber Ridge', 'Grand Cedar'],
    'kal': ['KAL K-22', 'KAL K-28'],
  },
  'fish-house': {
    'ice-castle': ['American Eagle', 'Walleye', 'Lake of the Woods'],
    'glacier': ['Ice House A168', 'Ice House A176'],
    'forest-river': ['Salem Ice Cabin'],
    'yetti': ['Grand Escape', 'Traxx', 'Shell'],
  },
};

/** Derive a label from a make slug (e.g. "forest-river" → "Forest River") */
export function makeLabelFromSlug(slug: string): string {
  // Check POPULAR_MAKES first for canonical labels
  const found = POPULAR_MAKES.find((m) => m.slug === slug);
  if (found) return found.label;
  // Fallback: title-case the slug
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export const FEATURED_DEALERS: FeaturedDealer[] = [
  { name: 'General RV Center', slug: 'general-rv-center', color: '#006836' },
  { name: 'Camping World', slug: 'camping-world', color: '#D8202E' },
  { name: 'Lazydays RV', slug: 'lazydays-rv', color: '#3870E9' },
];
