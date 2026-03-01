import type { ListingData } from './types.ts';

/**
 * Scraped listing data from RV Trader.
 * Photos saved to app/public/images/listings/{folder}/
 */

const IMG = '/images/listings/sunseeker-1950le';

export const sunseekerListing: ListingData = {
  // Vehicle identity
  title: '2026 Forest River Sunseeker 1950LE',
  year: 2026,
  make: 'Forest River',
  model: 'Sunseeker',
  trim: '1950LE',

  // Location and stock
  stockNumber: 'FR26SS1950LE',
  location: 'Sacramento, CA',

  // Photos — scraped from RV Trader listing #5038670446
  images: [
    { url: `${IMG}/hero.png`, alt: '2026 Forest River Sunseeker 1950LE exterior front with awning' },
    { url: `${IMG}/6934d41107d51a99bb0a31c4.webp`, alt: '2026 Forest River Sunseeker 1950LE exterior driver side' },
    { url: `${IMG}/6934d411cadc3d8805029a86.webp`, alt: '2026 Forest River Sunseeker 1950LE exterior rear passenger' },
    { url: `${IMG}/6934d4124bd08237730e8663.webp`, alt: '2026 Forest River Sunseeker 1950LE exterior rear with awning' },
    { url: `${IMG}/6934d412d1b438573c046b01.webp`, alt: '2026 Forest River Sunseeker 1950LE pass-through storage' },
    { url: `${IMG}/6934d413dbe5535d290d9b43.webp`, alt: '2026 Forest River Sunseeker 1950LE solar charge controller' },
    { url: `${IMG}/6934d414d8e1dc0d7d0761f9.webp`, alt: '2026 Forest River Sunseeker 1950LE interior kitchen and dinette' },
    { url: `${IMG}/6934d414f59ad145810fa882.webp`, alt: '2026 Forest River Sunseeker 1950LE kitchen detail with marble counters' },
    { url: `${IMG}/6934d41509342c816b09348f.webp`, alt: '2026 Forest River Sunseeker 1950LE U-shaped dinette' },
  ],
  tagText: 'New arrival',
  totalPhotoCount: 9,

  // Pricing
  currentPrice: 76995,
  originalPrice: 79995,
  monthlyPayment: 601,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Forest River Sunseeker LE is a compact, budget-friendly Class C motorhome on the Ford E-450 chassis. The 1950LE is one of the smallest floorplans in the lineup at under 24 feet, making it easy to drive and park while still offering a full kitchen, U-shaped dinette, and overcab sleeping area.\n\nThis 2026 model comes standard with a solar panel and charge controller, pass-through basement storage, and a power awning. The interior features light wood cabinetry with marble-look countertops and modern fixtures. A solid entry point for first-time motorhome buyers or couples looking for a nimble, self-contained rig.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class C' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '24 ft.' },
    { icon: 'weight', label: 'GVWR', value: '12,500 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: '4X4TSMD20RF500123',
  daysOnSite: 8,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 72000,
    rangeMax: 85000,
    averagePrice: 78500,
    explanation: 'Based on similar 2025-2026 Forest River Sunseeker LE models within 300 miles, this listing is priced near the market average.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/20/26', change: 'Listed', price: 79995 },
      { date: '02/25/26', change: 'Price reduced', price: 76995 },
    ],
  },

  // Description
  description: 'Brand new 2026 Forest River Sunseeker 1950LE on the Ford E-450 chassis with the 7.3L V8 gas engine. This compact Class C is perfect for couples or small families looking for an easy-to-drive motorhome that doesn\'t sacrifice the essentials. The 1950LE floorplan features a spacious U-shaped dinette that converts to a sleeping area, a full galley kitchen with marble-look solid surface countertops, stainless steel sink with matte black fixtures, microwave, and two-burner cooktop. The overcab bunk provides additional sleeping space. Standard features include a 100W solar panel with charge controller, power patio awning, pass-through basement storage, backup camera, and LED interior lighting throughout. Light wood grain cabinetry and geometric pattern window valances give the interior a modern, residential feel.',

  // Loan Calculator
  loanMonthlyPayment: 601,

  // Dealer
  dealer: {
    name: 'Fun Town RV',
    location: 'Sacramento, CA',
    address: '3000 Fulton Ave, Sacramento, CA 95821',
    phone: '(916) 555-0188',
    callCode: '3042',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Fun Town RV is one of the nation\'s largest RV dealers with locations across the country. Our Sacramento location features over 500 units on display, a full-service center, and a dedicated finance team to help you find the right payment plan. We carry all major brands including Forest River, Thor, Keystone, and Grand Design.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 8,
  },

  // Navigation context
  resultPosition: 3,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-001',
      title: '2025 Thor Four Winds 24F',
      year: 2025,
      make: 'Thor Motor Coach',
      model: 'Four Winds',
      price: 89995,
      imageUrl: '/images/listings/rv-03.png',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-002',
      title: '2026 Coachmen Freelander 21RS',
      year: 2026,
      make: 'Coachmen',
      model: 'Freelander',
      price: 82500,
      imageUrl: '/images/listings/rv-05.png',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-003',
      title: '2024 Jayco Redhawk 24B',
      year: 2024,
      make: 'Jayco',
      model: 'Redhawk',
      price: 95000,
      imageUrl: '/images/listings/rv-04.png',
      dealer: 'General RV Center',
      location: 'Elk Grove, CA',
    },
    {
      id: 'sim-004',
      title: '2025 Forest River Sunseeker 2500TS',
      year: 2025,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 92995,
      imageUrl: '/images/listings/rv-06.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-005',
      title: '2023 Winnebago Outlook 25J',
      year: 2023,
      make: 'Winnebago',
      model: 'Outlook',
      price: 79900,
      imageUrl: '/images/listings/rv-07.png',
      dealer: 'Bish\'s RV',
      location: 'Meridian, ID',
    },
    {
      id: 'sim-006',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 74995,
      imageUrl: '/images/listings/rv-08.png',
      dealer: 'Camping World',
      location: 'Fresno, CA',
    },
  ],

  // Related categories
  categories: [
    'Class C motorhomes',
    'Forest River RVs',
    'RVs under $80K',
    'RVs in California',
    'Forest River Sunseeker',
    'New Class C',
    'Compact motorhomes',
  ],

  // Reviews
  reviews: {
    overallRating: 4.2,
    totalReviews: 87,
    distribution: [48, 25, 8, 4, 2],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 3.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4 },
    ],
    reviews: [
      {
        id: 'rev-001',
        title: 'Perfect starter motorhome',
        modelYear: '2025 Forest River Sunseeker 1950LE',
        rating: 4.5,
        body: 'We downsized from a 32-foot Class C to the Sunseeker LE and couldn\'t be happier. It\'s so much easier to drive and park — my wife is comfortable behind the wheel now, which was a dealbreaker with our old rig. The kitchen is surprisingly functional and the dinette is comfortable for two. The solar panel is a nice touch for boondocking weekends.',
        author: 'Mike Hernandez',
        photoCount: 3,
      },
      {
        id: 'rev-002',
        title: 'Great value for the money',
        modelYear: '2024 Forest River Sunseeker 1950LE',
        rating: 4.0,
        body: 'For the price point, this is hard to beat. Build quality is solid, the Ford chassis is proven, and it has everything you need without the stuff you don\'t. My only complaint is the bathroom is tight — it\'s a wet bath, so expect to get everything wet when you shower. But for a sub-24-foot Class C, that\'s the tradeoff.',
        author: 'Karen Liu',
        photoCount: 2,
      },
    ],
  },

  // Engagement
  viewerCount: 14,
  engagement: {
    isNewlyListed: true,
    listedDate: '8 days ago',
    viewCount: 187,
    saveCount: 31,
  },
};
