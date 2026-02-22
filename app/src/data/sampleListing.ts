import type { ListingData } from './types.ts';

export const sampleListing: ListingData = {
  // Vehicle identity
  title: '2024 Airstream Flying Cloud 25RB',
  year: 2024,
  make: 'Airstream',
  model: 'Flying Cloud',
  trim: '25RB',

  // Location and stock
  stockNumber: 'AS24FC25RB',
  location: 'Tampa, FL',

  // Photos
  images: [
    { url: 'https://via.placeholder.com/557x456/E0EDE7/252526?text=Photo+1', alt: '2024 Airstream Flying Cloud 25RB exterior front view' },
    { url: 'https://via.placeholder.com/274x224/E0EDE7/252526?text=Photo+2', alt: '2024 Airstream Flying Cloud 25RB exterior rear view' },
    { url: 'https://via.placeholder.com/274x224/E0EDE7/252526?text=Photo+3', alt: '2024 Airstream Flying Cloud 25RB interior living area' },
    { url: 'https://via.placeholder.com/274x224/E0EDE7/252526?text=Photo+4', alt: '2024 Airstream Flying Cloud 25RB kitchen' },
    { url: 'https://via.placeholder.com/274x224/E0EDE7/252526?text=Photo+5', alt: '2024 Airstream Flying Cloud 25RB bedroom' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+6', alt: '2024 Airstream Flying Cloud 25RB bathroom' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+7', alt: '2024 Airstream Flying Cloud 25RB dinette' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+8', alt: '2024 Airstream Flying Cloud 25RB exterior side view' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+9', alt: '2024 Airstream Flying Cloud 25RB hitch and tongue' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+10', alt: '2024 Airstream Flying Cloud 25RB awning extended' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+11', alt: '2024 Airstream Flying Cloud 25RB interior panoramic' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+12', alt: '2024 Airstream Flying Cloud 25RB galley kitchen detail' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+13', alt: '2024 Airstream Flying Cloud 25RB rear bath' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+14', alt: '2024 Airstream Flying Cloud 25RB bedroom overhead storage' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+15', alt: '2024 Airstream Flying Cloud 25RB exterior rear quarter' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+16', alt: '2024 Airstream Flying Cloud 25RB panoramic windows' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+17', alt: '2024 Airstream Flying Cloud 25RB air conditioning unit' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+18', alt: '2024 Airstream Flying Cloud 25RB underbelly storage' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+19', alt: '2024 Airstream Flying Cloud 25RB convertible dinette bed' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+20', alt: '2024 Airstream Flying Cloud 25RB control panel' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+21', alt: '2024 Airstream Flying Cloud 25RB refrigerator' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+22', alt: '2024 Airstream Flying Cloud 25RB bathroom vanity' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+23', alt: '2024 Airstream Flying Cloud 25RB shower' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+24', alt: '2024 Airstream Flying Cloud 25RB exterior entry door' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+25', alt: '2024 Airstream Flying Cloud 25RB wheel and tire' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+26', alt: '2024 Airstream Flying Cloud 25RB exterior lighting' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+27', alt: '2024 Airstream Flying Cloud 25RB stabilizer jacks' },
    { url: 'https://via.placeholder.com/800x600/E0EDE7/252526?text=Photo+28', alt: '2024 Airstream Flying Cloud 25RB VIN plate' },
  ],
  tagText: 'Price reduced',
  totalPhotoCount: 28,

  // Pricing
  currentPrice: 96000,
  originalPrice: 98000,
  monthlyPayment: 631,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The 2024 Airstream Flying Cloud 25RB features the popular rear bath floor plan with a spacious walk-through bathroom and a comfortable queen bed. Built with Airstream\'s signature aluminum construction and panoramic windows, this unit offers a bright, open living space with a fully equipped galley kitchen and convertible dinette. With a single slide-out expanding the main living area, this Flying Cloud delivers a premium travel experience at a competitive price point.',

  // Vehicle History
  vhrAvailable: true,

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'Type', value: 'Travel Trailer' },
    { icon: 'ruler', label: 'Length', value: '25 ft' },
    { icon: 'bed', label: 'Sleeps', value: '4' },
    { icon: 'slide_out', label: 'Slides', value: '1' },
    { icon: 'weight', label: 'Weight', value: '5,600 lbs' },
    { icon: 'water', label: 'Fresh Water', value: '39 gal' },
    { icon: 'fuel', label: 'Fuel', value: 'N/A' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
  ],
  vin: '1STHKBM24RJ123456',
  daysOnSite: 45,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 89000,
    rangeMax: 102000,
    averagePrice: 95500,
    explanation: 'Based on similar 2023-2024 Airstream Flying Cloud models within 200 miles, this listing is priced below the market average.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '01/07/26', change: 'Listed', price: 98000 },
      { date: '02/01/26', change: 'Price reduced', price: 96000 },
    ],
  },

  // Description
  description: 'This 2024 Airstream Flying Cloud 25RB is in excellent condition with low usage and has been meticulously maintained by its original owner. The rear bath floor plan offers a private, full-width bathroom with a separate shower, porcelain toilet, and ample vanity space. The interior features Airstream\'s signature panoramic windows flooding the space with natural light, a fully equipped galley kitchen with stainless steel appliances, and a convertible dinette that seats four comfortably. With aluminum construction throughout, this trailer is built to last and is ready for your next adventure.',

  // Loan Calculator
  loanMonthlyPayment: 241,

  // Dealer
  dealer: {
    name: 'ExploreRV',
    location: 'Tampa, FL',
    address: '4200 N Dale Mabry Hwy, Tampa, FL 33607',
    phone: '(813) 555-0142',
    hours: 'Mon-Sat 9AM-6PM, Sun 11AM-4PM',
    logoUrl: 'https://via.placeholder.com/120x60/E0EDE7/252526?text=ExploreRV',
    bio: 'ExploreRV has been serving the Tampa Bay area for over 12 years, specializing in premium travel trailers and motorhomes. As a Top 50 RV Trader dealer, we pride ourselves on transparent pricing and a no-pressure shopping experience. Our certified technicians perform a comprehensive multi-point inspection on every pre-owned unit before it hits our lot. Visit our 5-acre facility to browse over 200 units in stock.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 12,
  },

  // Navigation context
  resultPosition: 8,
  totalResults: 8223,

  // Similar listings
  similarListings: [
    {
      id: 'sim-001',
      title: '2023 Airstream Flying Cloud 25FB',
      year: 2023,
      make: 'Airstream',
      model: 'Flying Cloud',
      price: 89900,
      imageUrl: 'https://via.placeholder.com/300x200/E0EDE7/252526?text=Similar+1',
      dealer: 'Suncoast Airstream',
      location: 'Clearwater, FL',
    },
    {
      id: 'sim-002',
      title: '2024 Airstream International 25IB',
      year: 2024,
      make: 'Airstream',
      model: 'International',
      price: 112000,
      imageUrl: 'https://via.placeholder.com/300x200/E0EDE7/252526?text=Similar+2',
      dealer: 'Colonial Airstream',
      location: 'Lakewood, NJ',
    },
    {
      id: 'sim-003',
      title: '2022 Airstream Flying Cloud 23CB',
      year: 2022,
      make: 'Airstream',
      model: 'Flying Cloud',
      price: 74500,
      imageUrl: 'https://via.placeholder.com/300x200/E0EDE7/252526?text=Similar+3',
      dealer: 'ExploreRV',
      location: 'Tampa, FL',
      mileage: '12,400 mi',
    },
    {
      id: 'sim-004',
      title: '2024 Grand Design Imagine 2500RL',
      year: 2024,
      make: 'Grand Design',
      model: 'Imagine',
      price: 42995,
      imageUrl: 'https://via.placeholder.com/300x200/E0EDE7/252526?text=Similar+4',
      dealer: 'General RV Center',
      location: 'Orlando, FL',
    },
    {
      id: 'sim-005',
      title: '2023 Winnebago Micro Minnie 2225RL',
      year: 2023,
      make: 'Winnebago',
      model: 'Micro Minnie',
      price: 34900,
      imageUrl: 'https://via.placeholder.com/300x200/E0EDE7/252526?text=Similar+5',
      dealer: 'Lazydays RV',
      location: 'Seffner, FL',
    },
    {
      id: 'sim-006',
      title: '2024 Airstream Bambi 22FB',
      year: 2024,
      make: 'Airstream',
      model: 'Bambi',
      price: 68400,
      imageUrl: 'https://via.placeholder.com/300x200/E0EDE7/252526?text=Similar+6',
      dealer: 'Suncoast Airstream',
      location: 'Clearwater, FL',
    },
  ],

  // Related categories
  categories: [
    'Travel trailers',
    'Airstream RVs',
    'RVs under $100K',
    'RVs in Florida',
    'Airstream Flying Cloud',
    'Used travel trailers',
    'Lightweight trailers',
  ],

  // Engagement
  viewerCount: 23,
};
