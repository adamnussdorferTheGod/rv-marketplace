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
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=600&h=400&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1533558701576-23c65e0272fb?w=600&h=400&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=900&h=600&fit=crop&q=80',
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
