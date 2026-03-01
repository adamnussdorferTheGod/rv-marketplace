import { popularSearches } from '@app/src/data/homepageData';
import { rvTypeModels } from '@app/src/data/sampleSrpListings';
import { POPULAR_SEARCHES } from './heroData';

export type SuggestionCategory =
  | 'make'
  | 'make_model'
  | 'model'
  | 'rv_type'
  | 'popular_search'
  | 'nl_search';

export interface SuggestionItem {
  label: string;
  category: SuggestionCategory;
  searchTerms: string[];
  navigateTo: string;
  count?: string;
  subtitle?: string;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/\s+/).filter(Boolean);
}

// Map type display names → URL slugs
const TYPE_SLUG_MAP: Record<string, string> = {
  'Travel Trailers': 'travel-trailer',
  'Fifth Wheels': 'fifth-wheel',
  'Class A Motorhomes': 'class-a',
  'Class C Motorhomes': 'class-c',
  'Class B Campervans': 'class-b',
  'Toy Haulers': 'toy-hauler',
  'Pop-Up Campers': 'pop-up',
  'Truck Campers': 'truck-camper',
  'Hybrid Trailers': 'hybrid-trailer',
  'Park Models': 'park-model',
  'Sport Utility': 'sport-utility',
  'Teardrop Trailers': 'teardrop-trailer',
};

function buildIndex(): SuggestionItem[] {
  const items: SuggestionItem[] = [];

  // ── Makes (with listing counts) ──
  for (const make of popularSearches.makes) {
    items.push({
      label: make.name,
      category: 'make',
      searchTerms: tokenize(make.name),
      navigateTo: `/search?makes=${slugify(make.name)}`,
      count: make.count,
    });
  }

  // ── Make + Model combos (from rvTypeModels, with listing counts) ──
  const makeModelCounts: Record<string, string> = {
    'Forest River|Rockwood': '4,812',
    'Keystone|Passport': '3,241',
    'Jayco|Jay Feather': '2,876',
    'Coachmen|Catalina': '3,419',
    'Grand Design|Imagine': '2,734',
    'Airstream|Flying Cloud': '1,987',
    'Keystone|Montana': '4,156',
    'Grand Design|Reflection': '2,891',
    'Heartland|Bighorn': '1,823',
    'Forest River|Cardinal': '1,456',
    'Thor Motor Coach|Palazzo': '1,234',
    'Newmar|Bay Star': '987',
    'Tiffin|Allegro Bus': '1,102',
    'Fleetwood|Discovery LXE': '876',
    'Thor Motor Coach|Four Winds': '2,567',
    'Jayco|Redhawk': '1,834',
    'Winnebago|View': '1,423',
    'Coachmen|Leprechaun': '1,678',
    'Winnebago|Revel': '1,312',
    'Airstream|Interstate': '923',
    'Thor Motor Coach|Tranquility': '756',
    'Forest River|XLR Nitro': '1,567',
    'Keystone|Fuzion': '1,234',
    'Grand Design|Momentum': '1,678',
    'Heartland|Torque': '1,089',
    'Forest River|Flagstaff': '3,214',
    'Coachmen|Clipper': '1,456',
    'Jayco|Jay Sport': '1,123',
  };

  const seen = new Set<string>();
  for (const models of Object.values(rvTypeModels)) {
    for (const def of models) {
      const key = `${def.make}|${def.model}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({
        label: `${def.make} ${def.model}`,
        category: 'make_model',
        searchTerms: tokenize(`${def.make} ${def.model}`),
        navigateTo: `/search?makes=${slugify(def.make)}&models=${slugify(def.model)}`,
        count: makeModelCounts[key],
      });
    }
  }

  // ── Standalone models (with listing counts) ──
  for (const model of popularSearches.models) {
    items.push({
      label: model.name,
      category: 'model',
      searchTerms: tokenize(model.name),
      navigateTo: `/search?models=${slugify(model.name)}`,
      count: model.count,
    });
  }

  // ── RV Types (with listing counts) ──
  for (const type of popularSearches.types) {
    items.push({
      label: type.name,
      category: 'rv_type',
      searchTerms: tokenize(type.name),
      navigateTo: `/search?rvTypes=${TYPE_SLUG_MAP[type.name] || slugify(type.name)}`,
      count: type.count,
    });
  }

  // ── Popular searches ──
  for (const search of POPULAR_SEARCHES) {
    items.push({
      label: search.label,
      category: 'popular_search',
      searchTerms: tokenize(search.label),
      navigateTo: `/search?${search.query}`,
    });
  }

  return items;
}

export const SEARCH_INDEX: SuggestionItem[] = buildIndex();

/** Lowercase make names for NL parser entity detection */
export const KNOWN_MAKES: string[] = popularSearches.makes.map((m) =>
  m.name.toLowerCase(),
);

/** Lowercase model names for NL parser entity detection */
export const KNOWN_MODELS: string[] = popularSearches.models.map((m) =>
  m.name.toLowerCase(),
);
