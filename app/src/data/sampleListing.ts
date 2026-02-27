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
    { url: 'https://images.unsplash.com/photo-1619317190381-643a6b28d6e6?w=1600&h=1200&fit=crop&q=80', alt: '2024 Airstream Flying Cloud 25RB exterior front view' },
    { url: 'https://images.unsplash.com/photo-1589870505717-e9e60cec4b5c?w=1600&h=1200&fit=crop&q=80', alt: '2024 Airstream Flying Cloud 25RB exterior rear view' },
    { url: '/assets/photos/kitchen.jpg', alt: '2024 Airstream Flying Cloud 25RB interior kitchen' },
    { url: 'https://images.unsplash.com/photo-1721495781960-c9dc7bf1174a?w=1600&h=1200&fit=crop&q=80', alt: '2024 Airstream Flying Cloud 25RB kitchen' },
    { url: '/assets/photos/bedroom.jpg', alt: '2024 Airstream Flying Cloud 25RB bedroom' },
    { url: 'https://images.unsplash.com/photo-1660800111201-d0ff7c21382d?w=1600&h=1200&fit=crop&q=80', alt: '2024 Airstream Flying Cloud 25RB at campsite' },
    { url: 'https://images.unsplash.com/photo-1697169982091-1aecf11fbfbf?w=1600&h=1200&fit=crop&q=80', alt: '2024 Airstream Flying Cloud 25RB rear quarter view' },
    { url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1600&h=1200&fit=crop&q=80', alt: '2024 Airstream Flying Cloud 25RB lifestyle' },
    { url: '/assets/photos/dinette.jpg', alt: '2024 Airstream Flying Cloud 25RB interior dinette' },
    { url: '/assets/photos/exterior-campsite.jpg', alt: '2024 Airstream Flying Cloud 25RB exterior campsite aerial' },
    { url: '/assets/photos/interior-overview.jpg', alt: '2024 Airstream Flying Cloud 25RB interior overview' },
  ],
  tagText: 'Price reduced',
  totalPhotoCount: 28,

  // Pricing
  currentPrice: 88000,
  originalPrice: 98000,
  monthlyPayment: 631,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Airstream Flying Cloud is a premium travel trailer known for its iconic aluminum build, thoughtful layouts, and strong resale value. It is designed for buyers who want a refined, reliable RV that works well for both weekend trips and longer travel.\n\nThis listing features a 25-foot Flying Cloud with a front bedroom layout, offering a dedicated sleeping area, a full bathroom, and a spacious kitchen and dining setup. Despite its size, it can be easier to tow than many comparable trailers thanks to its aerodynamic aluminum shell and lower overall weight.',

  // Vehicle History
  vhrAvailable: true,
  vhrHighlights: [
    'No accidents reported',
    '1 owner',
    'Clean title',
  ],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Travel trailer' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '25 ft.' },
    { icon: 'weight', label: 'GVWR', value: '3,500 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
    { icon: 'snowflake', label: 'Air conditioners', value: '2' },
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
    callCode: '1021',
    hours: 'Mon-Sat 9AM-6PM, Sun 11AM-4PM',
    logoUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=120&h=60&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1589870505717-e9e60cec4b5c?w=400&h=280&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1706049778849-02fca14ac23c?w=400&h=280&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1660800111201-d0ff7c21382d?w=400&h=280&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1484184086951-001dc63028c5?w=400&h=280&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1697169982091-1aecf11fbfbf?w=400&h=280&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1619317190381-643a6b28d6e6?w=400&h=280&fit=crop',
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

  // Reviews
  reviews: {
    overallRating: 4.5,
    totalReviews: 132,
    distribution: [85, 35, 10, 5, 5],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5 },
      { icon: 'tag', label: 'Cost of ownership', score: 4 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4 },
      { icon: 'bed', label: 'Comfort & liveability', score: 5 },
    ],
    reviews: [
      {
        id: 'rev-001',
        title: 'Great RV for family and fun!',
        modelYear: '2025 Airstream Flying Cloud 25RB',
        rating: 4.7,
        body: 'We purchased our Flying Cloud last spring and have already taken it on four trips across the Southeast. The build quality is outstanding — everything feels solid and well-crafted. The rear bath layout gives you real privacy, and the kitchen has more counter space than you\'d expect. Our only minor gripe is the storage under the bed could be more accessible.',
        author: 'Dave Reynolds',
        photoCount: 5,
      },
      {
        id: 'rev-002',
        title: 'Comfortable and spacious',
        modelYear: '2025 Airstream Flying Cloud 25RB',
        rating: 4.7,
        body: 'After years of tent camping, we upgraded to the Flying Cloud and haven\'t looked back. The panoramic windows make the interior feel much larger than it is, and the dinette converts to a surprisingly comfortable sleeping area for the kids. Towing with our F-150 has been smooth — the aerodynamic shape really does make a difference on fuel economy.',
        author: 'Janice Smith',
        photoCount: 5,
      },
    ],
  },

  // Engagement
  viewerCount: 23,
  engagement: {
    isNewlyListed: true,
    listedDate: 'Today',
    viewCount: 332,
    saveCount: 64,
  },
};
