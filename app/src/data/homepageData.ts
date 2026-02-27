import { sampleSrpListings } from './sampleSrpListings';
import type { SRPListing, RVType } from './srpTypes';
import type { ListingImage } from './types';

// ─── Homepage card type (subset of SRPListing) ─────────────────────────

export interface HomepageListingData {
  id: string;
  title: string;
  condition: 'new' | 'used';
  currentPrice: number;
  monthlyPayment: number;
  photo: ListingImage;
  dealer: {
    name: string;
    city: string;
    state: string;
    distanceMiles: number | null;
  };
  rvType: RVType;
  dealRating: SRPListing['dealRating'];
  tag: string | null;
}

function toHomepageCard(listing: SRPListing): HomepageListingData {
  return {
    id: listing.id,
    title: listing.title,
    condition: listing.condition,
    currentPrice: listing.currentPrice,
    monthlyPayment: listing.monthlyPayment,
    photo: listing.photos[0],
    dealer: {
      name: listing.dealer.name,
      city: listing.dealer.city,
      state: listing.dealer.state,
      distanceMiles: listing.dealer.distanceMiles,
    },
    rvType: listing.rvType,
    dealRating: listing.dealRating,
    tag: listing.tagBadge,
  };
}

// ─── Curated listing subsets ────────────────────────────────────────────

/** First 15 listings — enough for a full carousel scroll */
export const handPickedListings: HomepageListingData[] = sampleSrpListings
  .slice(0, 15)
  .map(toHomepageCard);

/** Featured listings, fallback to first 10 if fewer than 10 featured */
const featured = sampleSrpListings.filter((l) => l.isFeatured);
export const featuredListings: HomepageListingData[] = (
  featured.length >= 10 ? featured : sampleSrpListings.slice(0, 10)
).map(toHomepageCard);

/** Dealer showcase: Camping World has the most listings (6 cities) */
const SHOWCASE_DEALER_NAME = 'Camping World';
export const dealerShowcaseListings: HomepageListingData[] = sampleSrpListings
  .filter((l) => l.dealer.name === SHOWCASE_DEALER_NAME)
  .slice(0, 8)
  .map(toHomepageCard);

export const showcaseDealer = {
  name: 'Roy Robinson RV Center',
  tagline: 'Your adventure starts here. Over 200 locations nationwide.',
  phone: '(888) 626-7576',
  logoUrl: '/images/roy-robinson-rv-logo.png',
};

// ─── Ownership Cards ────────────────────────────────────────────────────

export interface OwnershipCard {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  image: string;
}

export const ownershipCards: OwnershipCard[] = [
  {
    id: 'accessories',
    title: 'RV accessories',
    description:
      'Shop hitches and covers to fishing gear and much more.',
    ctaText: 'Shop accessories',
    image: '/images/ownership-accessories.png',
  },
  {
    id: 'insurance',
    title: 'Insurance services',
    description:
      'Hit the road with confidence knowing your RV is covered.',
    ctaText: 'Explore options',
    image: '/images/ownership-insurance.png',
  },
  {
    id: 'closing',
    title: 'Closing services',
    description:
      'Get help finalizing all documentations for RV ownership.',
    ctaText: 'Learn more',
    image: '/images/ownership-closing.png',
  },
  {
    id: 'reviews',
    title: 'Owner reviews',
    description:
      'Stay up to date on what it means to be an RV owner.',
    ctaText: 'Read more',
    image: '/images/ownership-reviews.png',
  },
];

// ─── Selling section panels ────────────────────────────────────────────

export type SellingPanelId = 'consignment' | 'sell-privately' | 'cash-offers';

export interface SellingPanel {
  id: SellingPanelId;
  tabLabel: string;
  title: string;
  description: string;
  ctaText: string;
  image: string;
}

export const sellingPanels: SellingPanel[] = [
  {
    id: 'consignment',
    tabLabel: 'Consignment',
    title: 'Let pros handle the sale',
    description:
      'Partner with a trusted dealership to sell your RV on consignment. They handle the marketing, showings, and paperwork while you sit back and wait for the best offer.',
    ctaText: 'Learn more',
    image: '/images/listings/rv-05.png',
  },
  {
    id: 'sell-privately',
    tabLabel: 'Sell privately',
    title: 'Get the best price',
    description:
      'Explore top RV models, exclusive offers, and thousands of listings – all in one app!',
    ctaText: 'Learn more',
    image: '/images/sell-privately.png',
  },
  {
    id: 'cash-offers',
    tabLabel: 'Sell to a dealer',
    title: 'Sell to a dealer',
    description:
      'Get an instant cash offer for your RV and close in as little as a few days. No haggling, no waiting, no hassle -- just a fair price and a quick sale.',
    ctaText: 'Get your offer',
    image: '/images/listings/rv-07.png',
  },
];

// ─── Stay in the Know (Articles) ─────────────────────────────────────

export type ArticleCategoryId =
  | 'owner-reviews'
  | 'news'
  | 'lifestyle'
  | 'whats-trending';

export interface ArticleCategory {
  id: ArticleCategoryId;
  label: string;
}

export const articleCategories: ArticleCategory[] = [
  { id: 'owner-reviews', label: 'Owner reviews' },
  { id: 'news', label: 'News' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'whats-trending', label: "What's trending" },
];

export interface Article {
  id: string;
  category: ArticleCategoryId;
  categoryLabel: string;
  title: string;
  description?: string;
  image?: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: 'art-1',
    category: 'owner-reviews',
    categoryLabel: 'Owner reviews',
    title: '5 Top RV Rental Platforms for Road Trips',
    description:
      'Elevate your RV experience with a rooftop deck. These five innovative platforms can change the way you enjoy the great outdoors.',
    image:
      '/images/listings/rv-05.png',
    featured: true,
  },
  {
    id: 'art-2',
    category: 'owner-reviews',
    categoryLabel: 'Owner review',
    title: 'Understanding Insurance: What You Need to Know to Avoid Scams',
  },
  {
    id: 'art-3',
    category: 'owner-reviews',
    categoryLabel: 'Owner review',
    title: 'The Best RV Parks in the Pacific Northwest for 2026',
  },
  {
    id: 'art-4',
    category: 'owner-reviews',
    categoryLabel: 'Owner review',
    title: 'How to Winterize Your RV: A Complete Step-by-Step Guide',
  },
];

// ─── Popular Searches (SEO section) ─────────────────────────────────

export type PopularSearchTab =
  | 'makes'
  | 'models'
  | 'types'
  | 'states';

export interface PopularSearchCategory {
  id: PopularSearchTab;
  label: string;
}

export interface PopularSearchItem {
  name: string;
  count: string;
  label: string;
}

export const popularSearchCategories: PopularSearchCategory[] = [
  { id: 'makes', label: 'Top RV makes' },
  { id: 'models', label: 'Top RV models' },
  { id: 'types', label: 'Top RV types' },
  { id: 'states', label: 'Top RV states' },
];

export const popularSearches: Record<PopularSearchTab, PopularSearchItem[]> = {
  makes: [
    { name: 'Forest River', count: '46,098', label: 'RVs for sale' },
    { name: 'Keystone', count: '28,714', label: 'RVs for sale' },
    { name: 'Coachmen', count: '18,502', label: 'RVs for sale' },
    { name: 'Jayco', count: '16,339', label: 'RVs for sale' },
    { name: 'Heartland', count: '14,217', label: 'RVs for sale' },
    { name: 'Thor Motor Coach', count: '12,845', label: 'RVs for sale' },
    { name: 'Winnebago', count: '9,671', label: 'RVs for sale' },
    { name: 'Grand Design', count: '11,402', label: 'RVs for sale' },
    { name: 'Dutchmen', count: '8,923', label: 'RVs for sale' },
    { name: 'Tiffin', count: '4,187', label: 'RVs for sale' },
    { name: 'Newmar', count: '2,956', label: 'RVs for sale' },
    { name: 'Fleetwood', count: '6,341', label: 'RVs for sale' },
    { name: 'Airstream', count: '3,829', label: 'RVs for sale' },
    { name: 'Entegra Coach', count: '2,104', label: 'RVs for sale' },
    { name: 'Holiday Rambler', count: '3,512', label: 'RVs for sale' },
  ],
  models: [
    { name: 'Flagstaff', count: '8,214', label: 'for sale' },
    { name: 'Montana', count: '6,892', label: 'for sale' },
    { name: 'Catalina', count: '5,731', label: 'for sale' },
    { name: 'Jay Flight', count: '7,103', label: 'for sale' },
    { name: 'Bighorn', count: '3,456', label: 'for sale' },
    { name: 'Chateau', count: '4,289', label: 'for sale' },
    { name: 'Minnie Winnie', count: '2,817', label: 'for sale' },
    { name: 'Reflection', count: '4,612', label: 'for sale' },
    { name: 'Cougar', count: '5,934', label: 'for sale' },
    { name: 'Phaeton', count: '1,423', label: 'for sale' },
    { name: 'Flying Cloud', count: '1,987', label: 'for sale' },
    { name: 'Sprinter', count: '3,241', label: 'for sale' },
    { name: 'Bounder', count: '2,156', label: 'for sale' },
    { name: 'Solitude', count: '3,078', label: 'for sale' },
    { name: 'Imagine', count: '4,521', label: 'for sale' },
  ],
  types: [
    { name: 'Travel Trailers', count: '142,381', label: 'for sale' },
    { name: 'Fifth Wheels', count: '58,912', label: 'for sale' },
    { name: 'Class A Motorhomes', count: '31,204', label: 'for sale' },
    { name: 'Class C Motorhomes', count: '24,567', label: 'for sale' },
    { name: 'Class B Campervans', count: '12,893', label: 'for sale' },
    { name: 'Toy Haulers', count: '27,641', label: 'for sale' },
    { name: 'Pop-Up Campers', count: '8,234', label: 'for sale' },
    { name: 'Truck Campers', count: '6,102', label: 'for sale' },
    { name: 'Hybrid Trailers', count: '3,478', label: 'for sale' },
    { name: 'Park Models', count: '4,891', label: 'for sale' },
    { name: 'Sport Utility', count: '9,345', label: 'for sale' },
    { name: 'Teardrop Trailers', count: '5,672', label: 'for sale' },
  ],
  states: [
    { name: 'Florida', count: '34,521', label: 'RVs for sale' },
    { name: 'Texas', count: '29,187', label: 'RVs for sale' },
    { name: 'California', count: '22,843', label: 'RVs for sale' },
    { name: 'Arizona', count: '15,672', label: 'RVs for sale' },
    { name: 'Michigan', count: '12,934', label: 'RVs for sale' },
    { name: 'Ohio', count: '11,287', label: 'RVs for sale' },
    { name: 'North Carolina', count: '10,456', label: 'RVs for sale' },
    { name: 'Georgia', count: '9,823', label: 'RVs for sale' },
    { name: 'Pennsylvania', count: '8,912', label: 'RVs for sale' },
    { name: 'Indiana', count: '8,341', label: 'RVs for sale' },
    { name: 'Colorado', count: '7,654', label: 'RVs for sale' },
    { name: 'Tennessee', count: '7,102', label: 'RVs for sale' },
    { name: 'Washington', count: '6,234', label: 'RVs for sale' },
    { name: 'Oregon', count: '5,891', label: 'RVs for sale' },
    { name: 'Utah', count: '4,523', label: 'RVs for sale' },
  ],
};
