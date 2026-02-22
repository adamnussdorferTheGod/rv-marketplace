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
  hours: string;
  logoUrl: string;
  bio: string;
  websiteUrl: string;
  isTop50: boolean;
  yearsOnRvTrader: number;
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

  // Engagement
  viewerCount: number;
}
