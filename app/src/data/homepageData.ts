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
  name: SHOWCASE_DEALER_NAME,
  tagline: 'Your adventure starts here. Over 200 locations nationwide.',
  phone: '(888) 626-7576',
  logoUrl: 'https://images.unsplash.com/photo-1535913989690-f90e1c2d4cfa?w=120&h=60&fit=crop&q=80',
};
