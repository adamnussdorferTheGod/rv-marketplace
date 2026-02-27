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
  icon: string;
}

export const ownershipCards: OwnershipCard[] = [
  {
    id: 'accessories',
    title: 'RV Accessories',
    description:
      'Shop parts, upgrades, and gear to customize your RV for any adventure.',
    ctaText: 'Learn more',
    icon: 'wrench',
  },
  {
    id: 'insurance',
    title: 'Insurance Services',
    description:
      'Protect your investment with coverage tailored to RV owners.',
    ctaText: 'Learn more',
    icon: 'shield',
  },
  {
    id: 'closing',
    title: 'Closing Services',
    description:
      'Streamline your purchase with title, registration, and delivery support.',
    ctaText: 'Learn more',
    icon: 'document',
  },
  {
    id: 'reviews',
    title: 'Owner Reviews',
    description:
      'See what real RV owners say about their rigs before you buy.',
    ctaText: 'Learn more',
    icon: 'star_filled',
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
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop&q=80',
  },
  {
    id: 'cash-offers',
    tabLabel: 'Cash offers',
    title: 'Sell fast, stress free',
    description:
      'Get an instant cash offer for your RV and close in as little as a few days. No haggling, no waiting, no hassle -- just a fair price and a quick sale.',
    ctaText: 'Get your offer',
    image: 'https://images.unsplash.com/photo-1554672408-730436b60dde?w=600&h=400&fit=crop&q=80',
  },
];
