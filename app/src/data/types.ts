export interface ListingImage {
  url: string;
  alt: string;
}

export interface SpecItem {
  icon: string;    // Icon name for the Icon component
  label: string;   // e.g. "Length", "Sleeps", "Slides"
  value: string;   // e.g. "25 ft", "4", "1"
}

export interface PriceHistoryEntry {
  date: string;    // e.g. "02/10/26"
  change: string;  // e.g. "Listed", "Price reduced"
  price: number;
}

export interface DealerInfo {
  name: string;
  location: string;
  address: string;
  phone: string;
  callCode: string;
  hours: string;
  logoUrl: string;
  bio: string;
  websiteUrl: string;
  isTop50: boolean;
  yearsOnRvTrader: number;
}

// Photo Narration types
export type PhotoClassification =
  | 'exterior_front'
  | 'exterior_side_driver'
  | 'exterior_side_passenger'
  | 'exterior_rear'
  | 'interior_living'
  | 'interior_kitchen'
  | 'interior_bedroom'
  | 'interior_bathroom'
  | 'interior_detail'
  | 'campsite_setup'
  | 'lifestyle'
  | 'other';

export interface NarrationData {
  area_label: string;
  description: string;
  notable_features?: string[];
  worth_checking?: string[];
  comparison_note?: string | null;
}

export interface PhotoNarration {
  photo_id: string;
  photo_url: string;
  sort_order: number;
  classification: PhotoClassification;
  narration: NarrationData;
}

export interface GapAnalysis {
  coverage_score: number;
  missing_categories: string[];
  recommendation: string;
}

export interface ListingNarrations {
  listing_id: string;
  narration_version: string;
  photos: PhotoNarration[];
  gap_analysis: GapAnalysis;
}

export interface ReviewCategoryRating {
  icon: string;
  label: string;
  score: number;
}

export interface Review {
  id: string;
  title: string;
  modelYear: string;
  rating: number;
  body: string;
  author: string;
  photoCount: number;
}

export interface ReviewsData {
  overallRating: number;
  totalReviews: number;
  distribution: number[];
  categories: ReviewCategoryRating[];
  reviews: Review[];
}

export interface ListingEngagement {
  isNewlyListed: boolean;
  listedDate: string;
  viewCount: number;
  saveCount: number;
}

export interface SimilarListing {
  id: string;
  title: string;
  year: number;
  make: string;
  model: string;
  price: number;
  imageUrl: string;
  dealer: string;
  location: string;
  mileage?: string;
}

export interface PriceAnalysisData {
  rangeMin: number;
  rangeMax: number;
  averagePrice: number;
  explanation: string;
  learnMoreUrl: string;
  priceHistory: PriceHistoryEntry[];
}

export interface ListingData {
  // Vehicle identity
  title: string;
  year: number;
  make: string;
  model: string;
  trim: string;

  // Location and stock
  stockNumber: string;
  location: string;

  // Photos
  images: ListingImage[];
  tagText: string;
  totalPhotoCount: number;

  // Pricing
  currentPrice: number;
  originalPrice: number;
  monthlyPayment: number;
  dealRating: 'great' | 'good' | 'fair' | 'high';

  // AI Summary
  aiSummary: string;

  // Vehicle History
  vhrAvailable: boolean;
  vhrHighlights: string[];

  // Negotiation
  isNegotiable: boolean;

  // Features and Specs
  specs: SpecItem[];
  vin: string;
  daysOnSite: number;

  // Price Analysis
  priceAnalysis: PriceAnalysisData;

  // Description
  description: string;

  // Loan Calculator
  loanMonthlyPayment: number;

  // Dealer
  dealer: DealerInfo;

  // Navigation context
  resultPosition: number;
  totalResults: number;

  // Similar listings
  similarListings: SimilarListing[];

  // Related categories
  categories: string[];

  // Reviews
  reviews: ReviewsData;

  // Engagement
  viewerCount: number;
  engagement: ListingEngagement;

  // Tow compatibility
  gvwr?: number;                                        // Gross Vehicle Weight Rating in lbs
  tongueWeight?: number;                                // Tongue/pin weight in lbs
  hitchType?: 'bumper-pull' | 'fifth-wheel' | 'gooseneck';
}
