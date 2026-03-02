import type { ListingData } from './types.ts';

/**
 * Scraped listing data from RV Trader.
 * Photos saved to app/public/images/listings/{folder}/
 */

// ─── Listing 1: Sunseeker 1950LE ────────────────────────────────────────────

const IMG_SUNSEEKER = '/images/listings/sunseeker-1950le';

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

  // Photos
  images: [
    { url: `${IMG_SUNSEEKER}/hero.png`, alt: '2026 Forest River Sunseeker 1950LE exterior front three-quarter view with awning extended' },
    { url: `${IMG_SUNSEEKER}/6934d41107d51a99bb0a31c4.webp`, alt: '2026 Forest River Sunseeker 1950LE exterior driver side profile' },
    { url: `${IMG_SUNSEEKER}/6934d411cadc3d8805029a86.webp`, alt: '2026 Forest River Sunseeker 1950LE exterior rear passenger side' },
    { url: `${IMG_SUNSEEKER}/6934d4124bd08237730e8663.webp`, alt: '2026 Forest River Sunseeker 1950LE exterior rear view with power awning' },
    { url: `${IMG_SUNSEEKER}/6934d412d1b438573c046b01.webp`, alt: '2026 Forest River Sunseeker 1950LE exterior pass-through basement storage compartment' },
    { url: `${IMG_SUNSEEKER}/6934d413dbe5535d290d9b43.webp`, alt: '2026 Forest River Sunseeker 1950LE solar charge controller panel' },
    { url: `${IMG_SUNSEEKER}/6934d414d8e1dc0d7d0761f9.webp`, alt: '2026 Forest River Sunseeker 1950LE interior kitchen and dinette overview' },
    { url: `${IMG_SUNSEEKER}/6934d414f59ad145810fa882.webp`, alt: '2026 Forest River Sunseeker 1950LE kitchen detail with marble-look countertops' },
    { url: `${IMG_SUNSEEKER}/6934d41509342c816b09348f.webp`, alt: '2026 Forest River Sunseeker 1950LE U-shaped dinette seating area' },
  ],
  tagText: 'New arrival',
  totalPhotoCount: 9,

  // Pricing
  currentPrice: 76995,
  originalPrice: 79995,
  monthlyPayment: 601,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'Compact, budget-friendly Class C on the Ford E-450 chassis. At under 24 feet, the Sunseeker 1950LE is one of the easiest motorhomes to drive and park while still offering a full kitchen, U-shaped dinette, and overcab sleeping area. Standard solar panel, pass-through storage, and power awning round out a solid package.\n\nThe interior features light wood cabinetry with marble-look countertops and modern matte black fixtures. A strong entry point for first-time motorhome buyers or couples looking for a nimble, self-contained rig.',

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

  // Tow compatibility (demo: uses travel-trailer specs for realistic tow match results)
  gvwr: 7300,
  tongueWeight: 780,
  hitchType: 'bumper-pull' as const,

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
  resultPosition: 1,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-ss-001',
      title: '2025 Jayco Jay Flight SLX 380DQS',
      year: 2025,
      make: 'Jayco',
      model: 'Jay Flight SLX',
      price: 43995,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-ss-002',
      title: '2025 Thor Four Winds 24F',
      year: 2025,
      make: 'Thor Motor Coach',
      model: 'Four Winds',
      price: 89995,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/6999a50208bcb853f505df99.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-ss-003',
      title: '2026 Coachmen Freelander 21RS',
      year: 2026,
      make: 'Coachmen',
      model: 'Freelander',
      price: 82500,
      imageUrl: '/images/listings/flying-cloud-23fbq/698abd158e138a4ac9028bb4.webp',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-ss-004',
      title: '2025 Forest River Sunseeker 2500TS',
      year: 2025,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 92995,
      imageUrl: '/images/listings/bambi-sport-16/697303f40530c2f60700dcb3.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-ss-005',
      title: '2023 Winnebago Outlook 25J',
      year: 2023,
      make: 'Winnebago',
      model: 'Outlook',
      price: 79900,
      imageUrl: '/images/listings/dutch-star-4020/6998e5d2ad9697405b0a6fa2.webp',
      dealer: 'Bish\'s RV',
      location: 'Meridian, ID',
    },
    {
      id: 'sim-ss-006',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 74995,
      imageUrl: '/images/listings/sprinter-2500-awd/69a20be82c6950a39a017612.webp',
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
        id: 'rev-ss-001',
        title: 'Perfect starter motorhome',
        modelYear: '2025 Forest River Sunseeker 1950LE',
        rating: 4.5,
        body: 'We downsized from a 32-foot Class C to the Sunseeker LE and couldn\'t be happier. It\'s so much easier to drive and park — my wife is comfortable behind the wheel now, which was a dealbreaker with our old rig. The kitchen is surprisingly functional and the dinette is comfortable for two. The solar panel is a nice touch for boondocking weekends.',
        author: 'Mike Hernandez',
        photoCount: 3,
      },
      {
        id: 'rev-ss-002',
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

// ─── Listing 2: Jay Flight SLX 380DQS ──────────────────────────────────────

const IMG_JAYFLIGHT = '/images/listings/jay-flight-slx-380dqs';

export const jayFlightListing: ListingData = {
  // Vehicle identity
  title: '2025 Jayco Jay Flight SLX 380DQS',
  year: 2025,
  make: 'Jayco',
  model: 'Jay Flight SLX',
  trim: '380DQS',

  // Location and stock
  stockNumber: 'JF25380DQS',
  location: 'Roseville, CA',

  // Photos
  images: [
    { url: `${IMG_JAYFLIGHT}/69736dbdf100879bc90354d4.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS exterior front three-quarter view at dealership' },
    { url: `${IMG_JAYFLIGHT}/6999a50208bcb853f505df99.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS interior bedroom with queen bed and overhead cabinets' },
    { url: `${IMG_JAYFLIGHT}/6999a502194d09dc8900200d.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS interior solar controller panel' },
    { url: `${IMG_JAYFLIGHT}/6999a5025601a9402c01d227.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS interior living room with fireplace' },
    { url: `${IMG_JAYFLIGHT}/6999a5026c5abce24104b61a.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS kitchen with island and stainless appliances' },
    { url: `${IMG_JAYFLIGHT}/6999a5029b729e309f036b63.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS master bedroom with queen bed and wardrobe' },
    { url: `${IMG_JAYFLIGHT}/6999a502dd3b3e6ed4048eb7.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS bunkhouse room with double-over-double bunks' },
    { url: `${IMG_JAYFLIGHT}/6999a502e5c602d135043378.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS bathroom with walk-in shower' },
    { url: `${IMG_JAYFLIGHT}/6999a502eb2299d7aa03f62e.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS dinette and entertainment center' },
    { url: `${IMG_JAYFLIGHT}/6999a502ecef999d15051634.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS exterior pass-through storage' },
    { url: `${IMG_JAYFLIGHT}/6999a502ee50698efe0373c5.webp`, alt: '2025 Jayco Jay Flight SLX 380DQS interior stove and oven range with glass cooktop' },
  ],
  tagText: 'Price drop',
  totalPhotoCount: 11,

  // Pricing
  currentPrice: 43995,
  originalPrice: 49995,
  monthlyPayment: 366,
  dealRating: 'great',

  // AI Summary
  aiSummary: 'The Jay Flight SLX 380DQS is a spacious bunkhouse travel trailer designed for large families. With three slide-outs, a dedicated bunkhouse, and sleeping capacity for up to 10, this is one of the most room-friendly floorplans Jayco offers in the SLX line.\n\nAt 42 feet, it requires a capable tow vehicle but rewards you with a full residential-style kitchen, separate master bedroom, and a living room with fireplace. The $6,000 price reduction makes this an exceptional value for a brand-new triple-slide bunkhouse.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Travel Trailer' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '42 ft.' },
    { icon: 'weight', label: 'GVWR', value: '10,995 lbs.' },
    { icon: 'slide_out', label: 'Slide outs', value: '3' },
    { icon: 'bed', label: 'Sleeping capacity', value: '10' },
  ],
  vin: '1UJBJ0FT5S1JF0234',
  daysOnSite: 14,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 40000,
    rangeMax: 55000,
    averagePrice: 47500,
    explanation: 'Based on similar 2024-2025 Jayco Jay Flight SLX bunkhouse models within 250 miles, this listing is priced well below the market average after the recent price reduction.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/14/26', change: 'Listed', price: 49995 },
      { date: '02/22/26', change: 'Price reduced', price: 43995 },
    ],
  },

  // Description
  description: 'Brand new 2025 Jayco Jay Flight SLX 380DQS — the ultimate family bunkhouse travel trailer. This triple-slide floorplan opens up to create a massive interior with separate living zones for the whole family. The front master bedroom features a queen bed with wardrobes on both sides and a privacy door. The rear bunkhouse has double-over-double bunks plus a half bath, giving the kids their own space. The main living area boasts an electric fireplace, theater seating, and a residential-size kitchen with a center island, 12V refrigerator, three-burner range with oven, and microwave. Jayco\'s Magnum Truss Roof System and fully integrated A-frame provide lasting durability. Features include a power tongue jack, power stabilizer jacks, exterior speakers, LED awning lights, and an outdoor kitchen with mini fridge and griddle.',

  // Loan Calculator
  loanMonthlyPayment: 366,

  // Dealer
  dealer: {
    name: 'Camping World',
    location: 'Roseville, CA',
    address: '1039 Orlando Ave, Roseville, CA 95661',
    phone: '(916) 555-0247',
    callCode: '4187',
    hours: 'Mon-Sat 9AM-6PM, Sun 10AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Camping World Roseville is your one-stop RV shop in the greater Sacramento area. As part of the nation\'s largest RV dealership network, we offer hundreds of new and pre-owned units from top brands like Jayco, Keystone, Heartland, and Thor. Our service center, parts department, and Good Sam financing make ownership easy from day one.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 12,
  },

  // Navigation context
  resultPosition: 2,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-jf-001',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-jf-002',
      title: '2025 Keystone Cougar 290RLS',
      year: 2025,
      make: 'Keystone',
      model: 'Cougar',
      price: 52900,
      imageUrl: '/images/listings/flying-cloud-23fbq/698abd158e138a4ac9028bb4.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-jf-003',
      title: '2025 Grand Design Imagine 3250BH',
      year: 2025,
      make: 'Grand Design',
      model: 'Imagine',
      price: 48500,
      imageUrl: '/images/listings/bambi-sport-16/697303f40530c2f60700dcb3.webp',
      dealer: 'General RV Center',
      location: 'Elk Grove, CA',
    },
    {
      id: 'sim-jf-004',
      title: '2024 Jayco Jay Flight 340BHS',
      year: 2024,
      make: 'Jayco',
      model: 'Jay Flight',
      price: 38900,
      imageUrl: '/images/listings/dutch-star-4020/6998e5d2ad9697405b0a6fa2.webp',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-jf-005',
      title: '2025 Coachmen Catalina Legacy 343BHTS',
      year: 2025,
      make: 'Coachmen',
      model: 'Catalina Legacy',
      price: 41995,
      imageUrl: '/images/listings/sprinter-2500-awd/69a20be82c6950a39a017612.webp',
      dealer: 'Bish\'s RV',
      location: 'Meridian, ID',
    },
    {
      id: 'sim-jf-006',
      title: '2025 Jayco Jay Flight SLX 340BHOK',
      year: 2025,
      make: 'Jayco',
      model: 'Jay Flight SLX',
      price: 39995,
      imageUrl: '/images/listings/plateau-xltw/693b60ea9d69b3e59201c085.webp',
      dealer: 'Camping World',
      location: 'Sacramento, CA',
    },
  ],

  // Related categories
  categories: [
    'Travel trailers',
    'Jayco RVs',
    'RVs under $50K',
    'RVs in California',
    'Jayco Jay Flight',
    'Bunkhouse travel trailers',
    'New travel trailers',
    'Large travel trailers',
  ],

  // Reviews
  reviews: {
    overallRating: 4.4,
    totalReviews: 214,
    distribution: [128, 54, 20, 8, 4],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.5 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 3.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-jf-001',
        title: 'Room for the whole crew',
        modelYear: '2024 Jayco Jay Flight SLX 380DQS',
        rating: 5,
        body: 'We have four kids and this trailer is a game changer. The bunkhouse in the back gives them their own space with a half bath so they don\'t have to walk through the whole trailer at night. The triple slides make the living area feel like a small apartment. Kitchen island is great for meal prep. Only downside is you need a serious truck to pull it — our half-ton wasn\'t cutting it.',
        author: 'Dave Kowalski',
        photoCount: 5,
      },
      {
        id: 'rev-jf-002',
        title: 'Best value bunkhouse on the market',
        modelYear: '2025 Jayco Jay Flight SLX 380DQS',
        rating: 4.5,
        body: 'Looked at Grand Design and Keystone alternatives in this size range and the Jay Flight SLX offered the most features for the money. The Magnum Truss roof gives us confidence in build quality. Electric fireplace is a nice touch on cool evenings. We full-time in ours for six months of the year and it holds up well.',
        author: 'Rachel Torres',
        photoCount: 8,
      },
    ],
  },

  // Engagement
  viewerCount: 22,
  engagement: {
    isNewlyListed: false,
    listedDate: '14 days ago',
    viewCount: 412,
    saveCount: 67,
  },

  // Tow compatibility
  gvwr: 10995,
  tongueWeight: 1100,
  hitchType: 'bumper-pull',
};

// ─── Listing 3: Dutch Star 4020 ────────────────────────────────────────────

const IMG_DUTCHSTAR = '/images/listings/dutch-star-4020';

export const dutchStarListing: ListingData = {
  // Vehicle identity
  title: '2025 Newmar Dutch Star 4020',
  year: 2025,
  make: 'Newmar',
  model: 'Dutch Star',
  trim: '4020',

  // Location and stock
  stockNumber: 'NM25DS4020',
  location: 'Alvarado, TX',

  // Photos
  images: [
    { url: `${IMG_DUTCHSTAR}/6998e5d2ad9697405b0a6fa2.webp`, alt: '2025 Newmar Dutch Star 4020 exterior front three-quarter view showing full-paint body' },
    { url: `${IMG_DUTCHSTAR}/6998e5d3f0f83af613088bf2.webp`, alt: '2025 Newmar Dutch Star 4020 exterior driver side profile with quad slides extended' },
    { url: `${IMG_DUTCHSTAR}/6998e5d5e1a1aa0d230cd424.webp`, alt: '2025 Newmar Dutch Star 4020 exterior rear view with luggage compartments' },
    { url: `${IMG_DUTCHSTAR}/6998e5d9243dc1b6d30568d2.webp`, alt: '2025 Newmar Dutch Star 4020 cockpit with digital dash and leather captain chairs' },
    { url: `${IMG_DUTCHSTAR}/6998e604403e015bef057192.webp`, alt: '2025 Newmar Dutch Star 4020 interior living room with leather sofa and ceiling fan' },
    { url: `${IMG_DUTCHSTAR}/6998e60a6baa3029a7048a02.webp`, alt: '2025 Newmar Dutch Star 4020 kitchen with granite countertops and residential appliances' },
    { url: `${IMG_DUTCHSTAR}/6998e61047c91c6c730edf22.webp`, alt: '2025 Newmar Dutch Star 4020 dinette with inlaid tile floor and built-in storage' },
    { url: `${IMG_DUTCHSTAR}/6998e613d59a5c6ca40c2952.webp`, alt: '2025 Newmar Dutch Star 4020 master bedroom with king bed and overhead storage' },
    { url: `${IMG_DUTCHSTAR}/6998e62f48543fb4e8027cb2.webp`, alt: '2025 Newmar Dutch Star 4020 master bathroom with porcelain tile shower' },
    { url: `${IMG_DUTCHSTAR}/6998e635f9f98c2d650289c2.webp`, alt: '2025 Newmar Dutch Star 4020 washer-dryer closet and linen storage' },
    { url: `${IMG_DUTCHSTAR}/6998e63a77526f54b00aaa64.webp`, alt: '2025 Newmar Dutch Star 4020 basement storage with full-wall slide-out tray' },
    { url: `${IMG_DUTCHSTAR}/6998e66172c038d7800f9252.webp`, alt: '2025 Newmar Dutch Star 4020 engine bay Cummins diesel powertrain' },
    { url: `${IMG_DUTCHSTAR}/6998e6979de59a684c0d56e2.webp`, alt: '2025 Newmar Dutch Star 4020 Freightliner chassis tag-axle detail' },
  ],
  tagText: 'Premium',
  totalPhotoCount: 13,

  // Pricing
  currentPrice: 609105,
  originalPrice: 649995,
  monthlyPayment: 5076,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Newmar Dutch Star 4020 is a premium Class A diesel pusher built on the Freightliner XCR chassis with a Cummins L9 450HP engine. At 41 feet with four slides, it delivers a true residential living experience on the road with a king-size bed, granite countertops, full-size residential refrigerator, and in-unit washer/dryer.\n\nNewmar\'s fit and finish is widely regarded as among the best in the industry, with hand-laid tile floors, solid hardwood cabinetry, and Comfort Drive steering. The $40K price reduction off MSRP makes this a compelling buy for serious full-timers.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class A Diesel' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '41 ft.' },
    { icon: 'weight', label: 'GVWR', value: '36,200 lbs.' },
    { icon: 'slide_out', label: 'Slide outs', value: '4' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
  ],
  vin: '4UZACJDT3SCNS0345',
  daysOnSite: 21,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 580000,
    rangeMax: 700000,
    averagePrice: 635000,
    explanation: 'Based on similar 2024-2025 Newmar Dutch Star models nationwide, this listing is priced below the market average with a significant dealer discount off MSRP.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/07/26', change: 'Listed', price: 649995 },
      { date: '02/18/26', change: 'Price reduced', price: 609105 },
    ],
  },

  // Description
  description: 'New 2025 Newmar Dutch Star 4020 — Newmar\'s flagship luxury diesel pusher. Built on the Freightliner XCR chassis with a Cummins L9 450HP engine, Allison 3000MH six-speed transmission, and Comfort Drive steering for effortless handling. This quad-slide floorplan features a king-size Comfort Sleep mattress in the master suite, a spacious master bath with porcelain tile shower and solid surface vanity, and a full-size Whirlpool residential refrigerator in the kitchen. Standard appointments include granite countertops, inlaid ceramic tile floors, solid hardwood cabinetry, Bose sound system, Samsung smart TVs throughout, and an in-unit Splendide washer/dryer combo. The 4020 also features an Aqua-Hot 600D hydronic heating system, 12.5kW Onan diesel generator, 800W solar, dual 15,000 BTU A/C units, and hydraulic leveling jacks. Full-body paint in the Venetian Sunset scheme.',

  // Loan Calculator
  loanMonthlyPayment: 5076,

  // Dealer
  dealer: {
    name: 'Motor Home Specialist',
    location: 'Alvarado, TX',
    address: '4738 I-35E North, Alvarado, TX 76009',
    phone: '(817) 555-0321',
    callCode: '5523',
    hours: 'Mon-Sat 8AM-6PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Motor Home Specialist is the #1 volume-selling motorhome dealer in the world. Located just south of the Dallas/Fort Worth metroplex, we stock over 800 new and pre-owned motorhomes from every major manufacturer including Newmar, Tiffin, Entegra, Thor, and Winnebago. Our no-haggle pricing and nationwide delivery make buying a luxury coach simple.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 15,
  },

  // Navigation context
  resultPosition: 3,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-ds-001',
      title: '2025 Tiffin Allegro Bus 45OPP',
      year: 2025,
      make: 'Tiffin',
      model: 'Allegro Bus',
      price: 595000,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Motor Home Specialist',
      location: 'Alvarado, TX',
    },
    {
      id: 'sim-ds-002',
      title: '2025 Entegra Coach Aspire 44R',
      year: 2025,
      make: 'Entegra Coach',
      model: 'Aspire',
      price: 625000,
      imageUrl: '/images/listings/plateau-xltw/693b60ea9d69b3e59201c085.webp',
      dealer: 'La Mesa RV',
      location: 'Tucson, AZ',
    },
    {
      id: 'sim-ds-003',
      title: '2024 Newmar Dutch Star 4369',
      year: 2024,
      make: 'Newmar',
      model: 'Dutch Star',
      price: 569000,
      imageUrl: '/images/listings/sprinter-2500-awd/69a20be82c6950a39a017612.webp',
      dealer: 'North Trail RV Center',
      location: 'Fort Myers, FL',
    },
    {
      id: 'sim-ds-004',
      title: '2025 Newmar London Aire 4551',
      year: 2025,
      make: 'Newmar',
      model: 'London Aire',
      price: 789000,
      imageUrl: '/images/listings/flying-cloud-23fbq/698abd158e138a4ac9028bb4.webp',
      dealer: 'Motor Home Specialist',
      location: 'Alvarado, TX',
    },
    {
      id: 'sim-ds-005',
      title: '2025 Winnebago Forza 38W',
      year: 2025,
      make: 'Winnebago',
      model: 'Forza',
      price: 345000,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp',
      dealer: 'General RV Center',
      location: 'Draper, UT',
    },
    {
      id: 'sim-ds-006',
      title: '2024 Tiffin Phaeton 40IH',
      year: 2024,
      make: 'Tiffin',
      model: 'Phaeton',
      price: 419900,
      imageUrl: '/images/listings/bambi-sport-16/697303f40530c2f60700dcb3.webp',
      dealer: 'Camping World',
      location: 'Katy, TX',
    },
  ],

  // Related categories
  categories: [
    'Class A diesel motorhomes',
    'Newmar RVs',
    'Luxury motorhomes',
    'RVs in Texas',
    'Newmar Dutch Star',
    'New Class A diesel',
    'Full-timer motorhomes',
    'Diesel pushers over $500K',
  ],

  // Reviews
  reviews: {
    overallRating: 4.7,
    totalReviews: 156,
    distribution: [112, 30, 10, 3, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 5 },
    ],
    reviews: [
      {
        id: 'rev-ds-001',
        title: 'The finest coach we\'ve ever owned',
        modelYear: '2024 Newmar Dutch Star 4020',
        rating: 5,
        body: 'This is our fifth motorhome and by far the best. We\'ve owned Tiffin, Monaco, and Winnebago coaches and the Newmar build quality is in a different league. The Comfort Drive steering is incredible — my wife can drive this 41-footer with one finger. The Aqua-Hot system keeps us warm and gives us unlimited hot water. The only thing I\'d change is adding a second bathroom for guests.',
        author: 'Jim & Carol Whitfield',
        photoCount: 12,
      },
      {
        id: 'rev-ds-002',
        title: 'Full-timing in luxury',
        modelYear: '2023 Newmar Dutch Star 4310',
        rating: 4.5,
        body: 'We sold our house two years ago and hit the road full-time in our Dutch Star. Everything about this coach says quality — the hand-laid tile, the soft-close drawers, the solid wood cabinets. The washer/dryer is a must-have for full-timers. Newmar\'s customer service has been exceptional too. Only ding is the cost of maintenance on a diesel pusher, but you get what you pay for.',
        author: 'Patricia Nguyen',
        photoCount: 6,
      },
    ],
  },

  // Engagement
  viewerCount: 8,
  engagement: {
    isNewlyListed: false,
    listedDate: '21 days ago',
    viewCount: 934,
    saveCount: 112,
  },
};

// ─── Listing 4: Sprinter 2500 AWD ──────────────────────────────────────────

const IMG_SPRINTER = '/images/listings/sprinter-2500-awd';

export const sprinterListing: ListingData = {
  // Vehicle identity
  title: '2025 Mercedes-Benz Sprinter 2500 AWD',
  year: 2025,
  make: 'Mercedes-Benz',
  model: 'Sprinter',
  trim: '2500 AWD',

  // Location and stock
  stockNumber: 'MB25SPR2500',
  location: 'San Diego, CA',

  // Photos
  images: [
    { url: `${IMG_SPRINTER}/69a20be82c6950a39a017612.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD exterior side profile with pop-top raised' },
    { url: `${IMG_SPRINTER}/69a20bb93c14d7d65a0043a2.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD interior dinette lounge with fold-out table' },
    { url: `${IMG_SPRINTER}/69a20bce9f7892ab660fed52.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD exterior rear with open doors showing interior layout' },
    { url: `${IMG_SPRINTER}/69a20c12f23f8550f808efc2.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD interior galley kitchen with butcher block counter' },
    { url: `${IMG_SPRINTER}/69a20c2c0bae5d7136020cd2.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD rear sleeping area with platform bed' },
    { url: `${IMG_SPRINTER}/69a20c3bc170ef6156090407.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD wet bath with cassette toilet' },
    { url: `${IMG_SPRINTER}/69a20c4ebd17bdde6a079482.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD driver cockpit with MBUX infotainment' },
    { url: `${IMG_SPRINTER}/69a20c654c06872f6102d722.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD pop-top sleeping loft detail' },
    { url: `${IMG_SPRINTER}/69a20c6c54ed4fadc6064ba2.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD underbody lithium battery bank' },
    { url: `${IMG_SPRINTER}/69a20c772c936cc80e017292.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD exterior rear with kayak and bike rack' },
    { url: `${IMG_SPRINTER}/69a20cd87284e06d4a038a12.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD rear storage garage area' },
    { url: `${IMG_SPRINTER}/69a20cdf77596740300deb62.webp`, alt: '2025 Mercedes-Benz Sprinter 2500 AWD roof-mounted solar panel array' },
  ],
  tagText: 'Custom build',
  totalPhotoCount: 12,

  // Pricing
  currentPrice: 175000,
  originalPrice: 185000,
  monthlyPayment: 1458,
  dealRating: 'fair',

  // AI Summary
  aiSummary: 'A professionally built custom camper van on the Mercedes-Benz Sprinter 2500 AWD 144" wheelbase. At 20 feet, it fits in a standard parking spot and handles like an SUV while offering a complete off-grid living setup with 400W solar, 600Ah lithium batteries, and a pop-top sleeping loft.\n\nThe AWD drivetrain and compact footprint make this an ideal adventure van for accessing remote trailheads, ski resorts, and BLM land. The custom build includes a full wet bath, galley kitchen, and enough battery capacity for extended boondocking stays.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class B' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '20 ft.' },
    { icon: 'weight', label: 'GVWR', value: '9,050 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '2' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: 'W1Y4ECVY4SP500456',
  daysOnSite: 30,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 155000,
    rangeMax: 210000,
    averagePrice: 182000,
    explanation: 'Based on similar 2024-2025 custom Sprinter camper vans in the Southwest, this listing is priced slightly below the market average for a professional build with AWD and a pop-top.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '01/29/26', change: 'Listed', price: 185000 },
      { date: '02/15/26', change: 'Price reduced', price: 175000 },
    ],
  },

  // Description
  description: 'Professionally built 2025 Mercedes-Benz Sprinter 2500 AWD 144" wheelbase camper van with pop-top. This custom build features a complete off-grid electrical system with 400W roof-mounted solar panels, 600Ah lithium iron phosphate battery bank, 3000W pure sine wave inverter, and a 30A shore power hookup. The interior includes a galley kitchen with two-burner induction cooktop, 12V compressor refrigerator, butcher block countertops, and deep stainless sink. The rear platform bed lifts on gas struts to reveal a massive storage garage underneath. The pop-top adds a second sleeping area with a comfortable foam mattress for guests. A full wet bath with cassette toilet, shower, and sink keeps you self-contained. The Mercedes MBUX infotainment system, heated seats, and AWD drivetrain come standard. This van is adventure-ready right off the lot.',

  // Loan Calculator
  loanMonthlyPayment: 1458,

  // Dealer
  dealer: {
    name: 'SoCal Custom Vans',
    location: 'San Diego, CA',
    address: '2845 Sports Arena Blvd, San Diego, CA 92110',
    phone: '(619) 555-0299',
    callCode: '7891',
    hours: 'Mon-Fri 9AM-5PM, Sat 10AM-4PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'SoCal Custom Vans is a boutique van conversion shop specializing in Mercedes-Benz Sprinter and Ford Transit builds. Every van is hand-crafted in our San Diego workshop using premium materials, professional-grade electrical systems, and purpose-built cabinetry. We focus on adventure-ready builds with serious off-grid capability.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 4,
  },

  // Navigation context
  resultPosition: 4,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-sp-001',
      title: '2025 Pleasure-Way Plateau XLTW',
      year: 2025,
      make: 'Pleasure-Way',
      model: 'Plateau',
      price: 199900,
      imageUrl: '/images/listings/plateau-xltw/693b60ea9d69b3e59201c085.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
    {
      id: 'sim-sp-002',
      title: '2025 Winnebago Revel 44E',
      year: 2025,
      make: 'Winnebago',
      model: 'Revel',
      price: 215000,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'La Mesa RV',
      location: 'San Diego, CA',
    },
    {
      id: 'sim-sp-003',
      title: '2024 Thor Sanctuary 19L',
      year: 2024,
      make: 'Thor Motor Coach',
      model: 'Sanctuary',
      price: 145000,
      imageUrl: '/images/listings/bambi-sport-16/697303f40530c2f60700dcb3.webp',
      dealer: 'Camping World',
      location: 'El Cajon, CA',
    },
    {
      id: 'sim-sp-004',
      title: '2025 Storyteller Overland Mode LT',
      year: 2025,
      make: 'Storyteller Overland',
      model: 'Mode LT',
      price: 198000,
      imageUrl: '/images/listings/dutch-star-4020/6998e5d2ad9697405b0a6fa2.webp',
      dealer: 'Private seller',
      location: 'Bend, OR',
    },
    {
      id: 'sim-sp-005',
      title: '2024 Mercedes-Benz Sprinter Custom AWD',
      year: 2024,
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      price: 159000,
      imageUrl: '/images/listings/flying-cloud-23fbq/698abd158e138a4ac9028bb4.webp',
      dealer: 'Van Life Customs',
      location: 'Los Angeles, CA',
    },
    {
      id: 'sim-sp-006',
      title: '2025 Coachmen Nova 20C',
      year: 2025,
      make: 'Coachmen',
      model: 'Nova',
      price: 168500,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp',
      dealer: 'General RV Center',
      location: 'Draper, UT',
    },
  ],

  // Related categories
  categories: [
    'Class B camper vans',
    'Mercedes-Benz RVs',
    'Custom van conversions',
    'RVs in California',
    'Sprinter camper vans',
    'AWD camper vans',
    'Off-grid RVs',
    'Adventure vans',
  ],

  // Reviews
  reviews: {
    overallRating: 4.6,
    totalReviews: 42,
    distribution: [28, 10, 3, 1, 0],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-sp-001',
        title: 'The ultimate adventure vehicle',
        modelYear: '2024 Mercedes-Benz Sprinter 2500 AWD',
        rating: 5,
        body: 'We sold our truck and travel trailer and switched to this Sprinter van. Best decision we\'ve ever made. We can park anywhere, drive forest roads our trailer could never handle, and the AWD has gotten us through snow in the Sierras without chains. The electrical system is rock solid — we\'ve gone five days off-grid with no issues. The pop-top is genius for headroom and extra sleeping space.',
        author: 'Chris & Jen Atwood',
        photoCount: 14,
      },
      {
        id: 'rev-sp-002',
        title: 'Small space, big freedom',
        modelYear: '2025 Mercedes-Benz Sprinter 2500 AWD',
        rating: 4.5,
        body: 'Coming from a 28-foot Class C, the adjustment to van life was real. But once you embrace the minimalism, the freedom is incredible. We fit in any parking spot, get 18 mpg, and can stealth camp almost anywhere. The wet bath works fine once you figure out the routine. Build quality on this particular conversion is excellent — everything is solid after 10,000 miles.',
        author: 'Sarah Mackenzie',
        photoCount: 7,
      },
    ],
  },

  // Engagement
  viewerCount: 18,
  engagement: {
    isNewlyListed: false,
    listedDate: '30 days ago',
    viewCount: 756,
    saveCount: 89,
  },
};

// ─── Listing 5: Plateau XLTW ───────────────────────────────────────────────

const IMG_PLATEAU = '/images/listings/plateau-xltw';

export const plateauListing: ListingData = {
  // Vehicle identity
  title: '2025 Pleasure-Way Plateau XLTW',
  year: 2025,
  make: 'Pleasure-Way',
  model: 'Plateau',
  trim: 'XLTW',

  // Location and stock
  stockNumber: 'PW25PLXLTW',
  location: 'Portland, OR',

  // Photos
  images: [
    { url: `${IMG_PLATEAU}/693b60ea9d69b3e59201c085.webp`, alt: '2025 Pleasure-Way Plateau XLTW exterior front three-quarter view in silver' },
    { url: `${IMG_PLATEAU}/693b5fd9eca0889733040852.webp`, alt: '2025 Pleasure-Way Plateau XLTW interior galley kitchen with countertop and control panel' },
    { url: `${IMG_PLATEAU}/693b5fdd3229ed24b5036192.webp`, alt: '2025 Pleasure-Way Plateau XLTW interior kitchen counter and sink close-up' },
    { url: `${IMG_PLATEAU}/693b5ff5be8d96079b030792.webp`, alt: '2025 Pleasure-Way Plateau XLTW interior forward view showing captain chairs swiveled' },
    { url: `${IMG_PLATEAU}/693b6013a0b707309605c2d4.webp`, alt: '2025 Pleasure-Way Plateau XLTW galley kitchen with solid surface countertops' },
    { url: `${IMG_PLATEAU}/693b602638a2301ccc093b12.webp`, alt: '2025 Pleasure-Way Plateau XLTW rear power sofa in lounge configuration' },
    { url: `${IMG_PLATEAU}/693b602aaa2cd5b7e404c662.webp`, alt: '2025 Pleasure-Way Plateau XLTW rear power sofa converted to sleeping position' },
    { url: `${IMG_PLATEAU}/693b60340cf56021f905cec2.webp`, alt: '2025 Pleasure-Way Plateau XLTW wet bath with toilet and shower' },
    { url: `${IMG_PLATEAU}/693b603c43e9cdedc60c60a3.webp`, alt: '2025 Pleasure-Way Plateau XLTW overhead cabinetry and LED lighting detail' },
    { url: `${IMG_PLATEAU}/693b605d6d52a4babb09d282.webp`, alt: '2025 Pleasure-Way Plateau XLTW entertainment center with smart TV' },
    { url: `${IMG_PLATEAU}/693b607d187243e0d3080f42.webp`, alt: '2025 Pleasure-Way Plateau XLTW interior driver cockpit and steering wheel' },
    { url: `${IMG_PLATEAU}/693b608a84ab899307023832.webp`, alt: '2025 Pleasure-Way Plateau XLTW underbody lithium battery and electrical system' },
    { url: `${IMG_PLATEAU}/693b60f88e3505ddea060f94.webp`, alt: '2025 Pleasure-Way Plateau XLTW roof-mounted solar panels and A/C unit' },
    { url: `${IMG_PLATEAU}/693b616600316a08d2074512.webp`, alt: '2025 Pleasure-Way Plateau XLTW exterior front grille at dealership' },
    { url: `${IMG_PLATEAU}/693b6176ff765a1b540ff102.webp`, alt: '2025 Pleasure-Way Plateau XLTW cockpit dash with Mercedes MBUX system' },
    { url: `${IMG_PLATEAU}/693b617c8fe721b16d0f9183.webp`, alt: '2025 Pleasure-Way Plateau XLTW exterior Pleasure-Way badge detail' },
  ],
  tagText: 'Luxury',
  totalPhotoCount: 16,

  // Pricing
  currentPrice: 199900,
  originalPrice: 214900,
  monthlyPayment: 1666,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Pleasure-Way Plateau XLTW is one of the most refined Class B motorhomes on the market. Built on the Mercedes-Benz Sprinter 3500 chassis, it features Pleasure-Way\'s signature power rear sofa that converts from lounge seating to a king-size bed at the touch of a button, plus their proprietary lithium battery system with 600Ah of capacity.\n\nCanadian-built with meticulous attention to detail, the XLTW includes a full wet bath, solid surface countertops, induction cooktop, and a 12V compressor refrigerator. The $15K price reduction makes this a strong buy in the premium Class B segment.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class B' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '22 ft.' },
    { icon: 'weight', label: 'GVWR', value: '9,050 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '2' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: 'WDAPF4CC5SP600567',
  daysOnSite: 18,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 185000,
    rangeMax: 225000,
    averagePrice: 205000,
    explanation: 'Based on similar 2024-2025 Pleasure-Way Plateau models nationwide, this listing is priced below the market average with the current dealer discount.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/10/26', change: 'Listed', price: 214900 },
      { date: '02/24/26', change: 'Price reduced', price: 199900 },
    ],
  },

  // Description
  description: 'New 2025 Pleasure-Way Plateau XLTW on the Mercedes-Benz Sprinter 3500 chassis. The XLTW (Extra Long Twin Wide) is Pleasure-Way\'s flagship Class B, featuring their patented power sofa system that transforms from a comfortable lounge to a king-size sleeping surface at the touch of a button. The interior showcases Corian solid surface countertops, soft-close European cabinetry, and residential-quality finishes throughout. The galley features a two-burner induction cooktop, 12V compressor refrigerator with separate freezer, convection microwave, and a deep stainless sink. The enclosed wet bath includes a porcelain toilet, shower, and vanity. Pleasure-Way\'s proprietary lithium power system includes 600Ah of battery capacity, a 2000W pure sine inverter, and 320W of solar. The XLTW also features an Espar diesel furnace, Truma Combi water heater, power awning, and the full Mercedes MBUX safety and entertainment suite. Built in Pleasure-Way\'s Saskatoon, Canada factory with a 2-year bumper-to-bumper warranty.',

  // Loan Calculator
  loanMonthlyPayment: 1666,

  // Dealer
  dealer: {
    name: 'La Mesa RV',
    location: 'Portland, OR',
    address: '9025 SE 82nd Ave, Portland, OR 97266',
    phone: '(503) 555-0188',
    callCode: '6234',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'La Mesa RV is a family-owned dealership with locations across the western United States. Our Portland location specializes in Class B and Class C motorhomes, with a particular focus on the Mercedes-Benz Sprinter platform. We carry Pleasure-Way, Winnebago, Thor, and Coachmen, and our expert staff can help you find the right van for your adventure style.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 10,
  },

  // Navigation context
  resultPosition: 5,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-pl-001',
      title: '2025 Mercedes-Benz Sprinter 2500 AWD',
      year: 2025,
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      price: 175000,
      imageUrl: '/images/listings/sprinter-2500-awd/69a20be82c6950a39a017612.webp',
      dealer: 'SoCal Custom Vans',
      location: 'San Diego, CA',
    },
    {
      id: 'sim-pl-002',
      title: '2025 Winnebago Boldt 70BL',
      year: 2025,
      make: 'Winnebago',
      model: 'Boldt',
      price: 209000,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
    {
      id: 'sim-pl-003',
      title: '2024 Pleasure-Way Plateau TS',
      year: 2024,
      make: 'Pleasure-Way',
      model: 'Plateau',
      price: 179500,
      imageUrl: '/images/listings/dutch-star-4020/6998e5d2ad9697405b0a6fa2.webp',
      dealer: 'General RV Center',
      location: 'Tacoma, WA',
    },
    {
      id: 'sim-pl-004',
      title: '2025 Airstream Interstate 24GL',
      year: 2025,
      make: 'Airstream',
      model: 'Interstate',
      price: 238000,
      imageUrl: '/images/listings/flying-cloud-23fbq/698abd158e138a4ac9028bb4.webp',
      dealer: 'Airstream of Portland',
      location: 'Tigard, OR',
    },
    {
      id: 'sim-pl-005',
      title: '2025 Thor Tranquility 19L',
      year: 2025,
      make: 'Thor Motor Coach',
      model: 'Tranquility',
      price: 159900,
      imageUrl: '/images/listings/bambi-sport-16/697303f40530c2f60700dcb3.webp',
      dealer: 'Camping World',
      location: 'Fife, WA',
    },
    {
      id: 'sim-pl-006',
      title: '2025 Pleasure-Way Plateau FL',
      year: 2025,
      make: 'Pleasure-Way',
      model: 'Plateau',
      price: 189000,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp',
      dealer: 'La Mesa RV',
      location: 'Sacramento, CA',
    },
  ],

  // Related categories
  categories: [
    'Class B camper vans',
    'Pleasure-Way RVs',
    'Luxury Class B',
    'RVs in Oregon',
    'Pleasure-Way Plateau',
    'Sprinter camper vans',
    'New Class B',
    'RVs under $200K',
  ],

  // Reviews
  reviews: {
    overallRating: 4.8,
    totalReviews: 63,
    distribution: [48, 11, 3, 1, 0],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 5 },
    ],
    reviews: [
      {
        id: 'rev-pl-001',
        title: 'Canadian craftsmanship at its finest',
        modelYear: '2024 Pleasure-Way Plateau XLTW',
        rating: 5,
        body: 'The build quality on the Plateau is genuinely a cut above every other Class B we looked at, and we test-drove eight of them. The power sofa mechanism is smooth and gives you a real king-size bed — not the compromised sleeping surfaces you find in most vans. The Corian countertops, soft-close everything, and attention to detail remind you this is hand-built in Canada. The lithium system has been bulletproof through 8 months of part-time use.',
        author: 'Robert & Linda Chang',
        photoCount: 9,
      },
      {
        id: 'rev-pl-002',
        title: 'Worth every penny',
        modelYear: '2025 Pleasure-Way Plateau XLTW',
        rating: 4.5,
        body: 'We upgraded from a Winnebago Travato and the difference in quality is night and day. The Pleasure-Way just feels more solid and thoughtfully designed. The wet bath is actually usable — good water pressure and the space is well laid out. Only minor gripe is the rear garage storage is a bit limited compared to some competitors, but the under-bed storage makes up for it.',
        author: 'Amy Richardson',
        photoCount: 4,
      },
    ],
  },

  // Engagement
  viewerCount: 11,
  engagement: {
    isNewlyListed: false,
    listedDate: '18 days ago',
    viewCount: 523,
    saveCount: 74,
  },
};

// ─── Listing 6: Flying Cloud 23FB Queen ─────────────────────────────────────

const IMG_FLYINGCLOUD = '/images/listings/flying-cloud-23fbq';

export const flyingCloudListing: ListingData = {
  // Vehicle identity
  title: '2025 Airstream Flying Cloud 23FB Queen',
  year: 2025,
  make: 'Airstream',
  model: 'Flying Cloud',
  trim: '23FB Queen',

  // Location and stock
  stockNumber: 'AS25FC23FBQ',
  location: 'Sacramento, CA',

  // Photos
  images: [
    { url: `${IMG_FLYINGCLOUD}/698abd158e138a4ac9028bb4.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen exterior front three-quarter view with iconic aluminum body' },
    { url: `${IMG_FLYINGCLOUD}/698abd158e138a4ac9028bb5.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen exterior driver side showing rivet pattern and windows' },
    { url: `${IMG_FLYINGCLOUD}/698abd158e138a4ac9028bb6.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen exterior rear with taillights and bumper' },
    { url: `${IMG_FLYINGCLOUD}/698abd158e138a4ac9028bb7.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen interior living area with panoramic windows' },
    { url: `${IMG_FLYINGCLOUD}/698abd158e138a4ac9028bb8.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen galley kitchen with stainless appliances' },
    { url: `${IMG_FLYINGCLOUD}/698abd158e138a4ac9028bb9.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen dinette with ultraleather cushions' },
    { url: `${IMG_FLYINGCLOUD}/698abd158e138a4ac9028bbb.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen rear queen bedroom with memory foam mattress' },
    { url: `${IMG_FLYINGCLOUD}/698abd158e138a4ac9028bbd.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen bathroom with shower and porcelain toilet' },
    { url: `${IMG_FLYINGCLOUD}/698abd158e138a4ac9028bbe.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen interior bathroom with toilet and cabinetry' },
    { url: `${IMG_FLYINGCLOUD}/698abd168e138a4ac9028bc2.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen overhead storage and birch wood cabinetry' },
    { url: `${IMG_FLYINGCLOUD}/698abd168e138a4ac9028bc5.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen interior dinette booth with leather cushions' },
    { url: `${IMG_FLYINGCLOUD}/698abd168e138a4ac9028bcb.webp`, alt: '2025 Airstream Flying Cloud 23FB Queen interior hallway looking toward rear' },
  ],
  tagText: 'Price drop',
  totalPhotoCount: 12,

  // Pricing
  currentPrice: 72500,
  originalPrice: 79900,
  monthlyPayment: 604,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Airstream Flying Cloud 23FB Queen is a timeless travel trailer that pairs Airstream\'s iconic riveted aluminum body with a modern, well-appointed interior. At 23 feet, it\'s one of the most towable floorplans in the Flying Cloud lineup, manageable with a half-ton truck while still offering a rear queen bedroom, full bath, and residential kitchen.\n\nThis lightly used 2025 model is in like-new condition with all the modern amenities: Smart Control technology, panoramic windows, and birch wood cabinetry. The $7,400 price reduction off the original sticker makes this a compelling value for one of the most iconic brands in RVing.',

  // Vehicle History
  vhrAvailable: true,
  vhrHighlights: [
    'No accidents or damage reported',
    'One owner, purchased new in June 2025',
    'All factory recalls completed',
    'Regular service records on file',
  ],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Travel Trailer' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '23 ft.' },
    { icon: 'weight', label: 'GVWR', value: '6,500 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: '1STCFYF29SJ600678',
  daysOnSite: 12,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 68000,
    rangeMax: 85000,
    averagePrice: 76500,
    explanation: 'Based on similar 2024-2025 Airstream Flying Cloud 23FB models within 300 miles, this like-new used listing is priced below the market average and well under the cost of buying new.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/16/26', change: 'Listed', price: 79900 },
      { date: '02/24/26', change: 'Price reduced', price: 72500 },
    ],
  },

  // Description
  description: 'Like-new 2025 Airstream Flying Cloud 23FB Queen — used for only four trips and fewer than 2,000 tow miles. This iconic travel trailer features a rear queen bedroom with a premium memory foam mattress, a full dry bath with shower, and a galley kitchen with a three-burner range, convection microwave, 8 cu. ft. refrigerator, and solid surface countertops. The front dinette converts to an additional sleeping area. Airstream Smart Control technology lets you monitor and control systems from your phone. The interior showcases light birch wood cabinetry, panoramic windows, and ultraleather upholstery in the Glacier decor package. Standard features include a power awning with LED lights, power tongue jack, solar pre-wire, stabilizer jacks, and pass-through basement storage. Airstream\'s all-aluminum construction ensures decades of durability with minimal maintenance. Selling because we upgraded to a larger floorplan.',

  // Loan Calculator
  loanMonthlyPayment: 604,

  // Dealer
  dealer: {
    name: 'Sacramento RV Center',
    location: 'Sacramento, CA',
    address: '1680 El Camino Ave, Sacramento, CA 95815',
    phone: '(916) 555-0334',
    callCode: '8876',
    hours: 'Mon-Sat 9AM-6PM, Sun 11AM-4PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Sacramento RV Center has been serving the capital region for over 25 years. We specialize in pre-owned travel trailers and motorhomes, with a focus on quality inspections and transparent pricing. Every unit on our lot goes through a rigorous 120-point inspection before listing. We carry a wide selection of brands including Airstream, Grand Design, Winnebago, and Jayco.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 6,
  },

  // Navigation context
  resultPosition: 6,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-fc-001',
      title: '2025 Airstream Bambi Sport 16',
      year: 2025,
      make: 'Airstream',
      model: 'Bambi Sport',
      price: 52900,
      imageUrl: '/images/listings/bambi-sport-16/697303f40530c2f60700dcb3.webp',
      dealer: 'NorCal Airstream',
      location: 'Fairfield, CA',
    },
    {
      id: 'sim-fc-002',
      title: '2025 Airstream Caravel 22FB',
      year: 2025,
      make: 'Airstream',
      model: 'Caravel',
      price: 79500,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Sacramento RV Center',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-fc-003',
      title: '2024 Airstream Flying Cloud 25FB',
      year: 2024,
      make: 'Airstream',
      model: 'Flying Cloud',
      price: 82000,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-fc-004',
      title: '2023 Airstream Flying Cloud 23CB',
      year: 2023,
      make: 'Airstream',
      model: 'Flying Cloud',
      price: 65000,
      imageUrl: '/images/listings/plateau-xltw/693b60ea9d69b3e59201c085.webp',
      dealer: 'Private seller',
      location: 'Reno, NV',
    },
    {
      id: 'sim-fc-005',
      title: '2025 Grand Design Reflection 150 226RK',
      year: 2025,
      make: 'Grand Design',
      model: 'Reflection',
      price: 45900,
      imageUrl: '/images/listings/dutch-star-4020/6998e5d2ad9697405b0a6fa2.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-fc-006',
      title: '2024 Airstream International 25FB',
      year: 2024,
      make: 'Airstream',
      model: 'International',
      price: 98500,
      imageUrl: '/images/listings/sprinter-2500-awd/69a20be82c6950a39a017612.webp',
      dealer: 'NorCal Airstream',
      location: 'Fairfield, CA',
    },
  ],

  // Related categories
  categories: [
    'Travel trailers',
    'Airstream RVs',
    'Airstream Flying Cloud',
    'RVs in California',
    'Used travel trailers',
    'Lightweight travel trailers',
    'RVs under $80K',
    'Iconic RV brands',
  ],

  // Reviews
  reviews: {
    overallRating: 4.6,
    totalReviews: 312,
    distribution: [198, 78, 24, 8, 4],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5 },
      { icon: 'tag', label: 'Cost of ownership', score: 4 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-fc-001',
        title: 'The last trailer you\'ll ever buy',
        modelYear: '2024 Airstream Flying Cloud 23FB',
        rating: 5,
        body: 'We\'re on our third Airstream in 20 years. We traded in our 2016 Flying Cloud for this 2024 model and the improvements are significant — the Smart Control app, the new interior design, and the build quality are all better. The 23FB is the sweet spot for us: big enough for a real queen bed and dry bath, small enough to tow with our F-150. Airstreams hold their value like nothing else in the RV world.',
        author: 'Tom & Mary Sullivan',
        photoCount: 6,
      },
      {
        id: 'rev-fc-002',
        title: 'Beautiful but not perfect',
        modelYear: '2025 Airstream Flying Cloud 23FB',
        rating: 4,
        body: 'The Flying Cloud is gorgeous inside and out — the birch wood, the panoramic windows, the iconic exterior. It\'s a head-turner at every campground. That said, storage is limited compared to conventional travel trailers in this size range, and the price premium over brands like Grand Design or Jayco is substantial. But if resale value and build quality are your priorities, Airstream is hard to beat.',
        author: 'Jennifer Park',
        photoCount: 3,
      },
    ],
  },

  // Engagement
  viewerCount: 19,
  engagement: {
    isNewlyListed: false,
    listedDate: '12 days ago',
    viewCount: 645,
    saveCount: 98,
  },

  // Tow compatibility
  gvwr: 6500,
  tongueWeight: 650,
  hitchType: 'bumper-pull',
};

// ─── Listing 7: Bambi Sport 16 ─────────────────────────────────────────────

const IMG_BAMBI = '/images/listings/bambi-sport-16';

export const bambiListing: ListingData = {
  // Vehicle identity
  title: '2025 Airstream Bambi Sport 16',
  year: 2025,
  make: 'Airstream',
  model: 'Bambi Sport',
  trim: '16',

  // Location and stock
  stockNumber: 'AS25BS16',
  location: 'Fairfield, CA',

  // Photos
  images: [
    { url: `${IMG_BAMBI}/697303f40530c2f60700dcb3.webp`, alt: '2025 Airstream Bambi Sport 16 exterior front three-quarter view with polished aluminum shell' },
    { url: `${IMG_BAMBI}/698eb4f988971505be30b44d.webp`, alt: '2025 Airstream Bambi Sport 16 exterior driver side profile showing compact length' },
    { url: `${IMG_BAMBI}/698eb4f988971505be30b44e.webp`, alt: '2025 Airstream Bambi Sport 16 interior living area with convertible dinette' },
    { url: `${IMG_BAMBI}/698eb4f988971505be30b450.webp`, alt: '2025 Airstream Bambi Sport 16 galley kitchen with two-burner cooktop and sink' },
    { url: `${IMG_BAMBI}/698eb4f988971505be30b455.webp`, alt: '2025 Airstream Bambi Sport 16 rear wet bath with shower and cassette toilet' },
    { url: `${IMG_BAMBI}/698eb4fa88971505be30b458.webp`, alt: '2025 Airstream Bambi Sport 16 overhead storage cabinets and panoramic window' },
    { url: `${IMG_BAMBI}/698eb4fa88971505be30b459.webp`, alt: '2025 Airstream Bambi Sport 16 interior looking forward with TV and dinette' },
  ],
  tagText: 'New arrival',
  totalPhotoCount: 7,

  // Pricing
  currentPrice: 52900,
  originalPrice: 56900,
  monthlyPayment: 441,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Airstream Bambi Sport 16 is the lightest and most compact travel trailer in Airstream\'s lineup, weighing under 3,500 lbs and stretching just 16 feet in length. It can be towed by many midsize SUVs and crossovers, opening up the Airstream experience to owners who don\'t have a full-size truck.\n\nDespite its compact size, the Bambi Sport includes a wet bath, two-burner cooktop, refrigerator, and a convertible dinette that sleeps two. The iconic aluminum body provides exceptional durability and resale value in a package that fits in your driveway.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Travel Trailer' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '16 ft.' },
    { icon: 'weight', label: 'GVWR', value: '3,500 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '2' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: '1STCFYF29SJ700789',
  daysOnSite: 5,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 48000,
    rangeMax: 60000,
    averagePrice: 54000,
    explanation: 'Based on similar 2024-2025 Airstream Bambi and Bambi Sport models within 300 miles, this listing is priced at the market average for a new unit.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/23/26', change: 'Listed', price: 56900 },
      { date: '02/27/26', change: 'Price reduced', price: 52900 },
    ],
  },

  // Description
  description: 'Brand new 2025 Airstream Bambi Sport 16 — the most accessible way to own an Airstream. At just 16 feet and under 3,500 lbs GVWR, the Bambi Sport can be towed by popular midsize SUVs like the Toyota 4Runner, Jeep Grand Cherokee, and Ford Bronco. The interior features a convertible dinette that transforms into a comfortable sleeping area for two, a compact galley kitchen with a two-burner propane cooktop, 3 cu. ft. refrigerator, and stainless sink. The rear wet bath includes a shower, cassette toilet, and vanity mirror. Standard features include a power awning, power tongue jack, stabilizer jacks, panoramic windows, and Airstream\'s Smart Control system for remote monitoring. The all-aluminum riveted monocoque construction provides exceptional strength-to-weight ratio and the industry\'s best resale value. Perfect for weekend warriors, solo travelers, and couples who want the Airstream experience without needing a heavy-duty truck.',

  // Loan Calculator
  loanMonthlyPayment: 441,

  // Dealer
  dealer: {
    name: 'NorCal Airstream',
    location: 'Fairfield, CA',
    address: '4200 Auto Plaza Ct, Fairfield, CA 94534',
    phone: '(707) 555-0156',
    callCode: '9102',
    hours: 'Mon-Sat 9AM-6PM, Sun 11AM-4PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'NorCal Airstream is Northern California\'s authorized Airstream dealer. We carry the full Airstream lineup including the Basecamp, Bambi, Caravel, Flying Cloud, International, and Classic travel trailers, plus the Interstate and Atlas touring coaches. Our factory-trained technicians provide expert service, and our team of Airstream specialists can help you find the perfect model for your lifestyle.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 7,
  },

  // Navigation context
  resultPosition: 7,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-bs-001',
      title: '2025 Airstream Flying Cloud 23FB Queen',
      year: 2025,
      make: 'Airstream',
      model: 'Flying Cloud',
      price: 72500,
      imageUrl: '/images/listings/flying-cloud-23fbq/698abd158e138a4ac9028bb4.webp',
      dealer: 'Sacramento RV Center',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-bs-002',
      title: '2025 Airstream Basecamp 16X',
      year: 2025,
      make: 'Airstream',
      model: 'Basecamp',
      price: 47900,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'NorCal Airstream',
      location: 'Fairfield, CA',
    },
    {
      id: 'sim-bs-003',
      title: '2024 Airstream Bambi 16RB',
      year: 2024,
      make: 'Airstream',
      model: 'Bambi',
      price: 55000,
      imageUrl: '/images/listings/plateau-xltw/693b60ea9d69b3e59201c085.webp',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-bs-004',
      title: '2025 Happier Camper HC1',
      year: 2025,
      make: 'Happier Camper',
      model: 'HC1',
      price: 38500,
      imageUrl: '/images/listings/sprinter-2500-awd/69a20be82c6950a39a017612.webp',
      dealer: 'Private seller',
      location: 'San Francisco, CA',
    },
    {
      id: 'sim-bs-005',
      title: '2025 nuCamp TAB 320',
      year: 2025,
      make: 'nuCamp',
      model: 'TAB',
      price: 32500,
      imageUrl: '/images/listings/dutch-star-4020/6998e5d2ad9697405b0a6fa2.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-bs-006',
      title: '2025 Airstream Caravel 16RB',
      year: 2025,
      make: 'Airstream',
      model: 'Caravel',
      price: 62900,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp',
      dealer: 'NorCal Airstream',
      location: 'Fairfield, CA',
    },
  ],

  // Related categories
  categories: [
    'Travel trailers',
    'Airstream RVs',
    'Airstream Bambi',
    'RVs in California',
    'Lightweight travel trailers',
    'Small travel trailers',
    'New travel trailers',
    'RVs under $60K',
  ],

  // Reviews
  reviews: {
    overallRating: 4.5,
    totalReviews: 89,
    distribution: [54, 24, 8, 2, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5 },
      { icon: 'tag', label: 'Cost of ownership', score: 4 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 3.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4 },
    ],
    reviews: [
      {
        id: 'rev-bs-001',
        title: 'Tows like a dream behind our 4Runner',
        modelYear: '2024 Airstream Bambi Sport 16',
        rating: 5,
        body: 'We wanted an Airstream but didn\'t want to buy a truck just to tow it. The Bambi Sport 16 solved that problem — our 2024 Toyota 4Runner tows it effortlessly, even through mountain passes. Setting up camp takes 15 minutes. The wet bath is tiny but functional, and having a real toilet and shower on board beats any tent camping setup. For two people, the space is perfect.',
        author: 'Derek & Alison Cho',
        photoCount: 8,
      },
      {
        id: 'rev-bs-002',
        title: 'Tiny but mighty',
        modelYear: '2025 Airstream Bambi Sport 16',
        rating: 4,
        body: 'The Bambi Sport is exactly what it promises: a genuine Airstream experience in the smallest possible package. The build quality is outstanding and the iconic design gets compliments everywhere we go. Just know what you\'re getting into — this is a small space. We use it for two-night weekend trips and it\'s perfect for that. I wouldn\'t want to live in it for a week, but that\'s not what it\'s designed for.',
        author: 'Samantha Brooks',
        photoCount: 2,
      },
    ],
  },

  // Engagement
  viewerCount: 16,
  engagement: {
    isNewlyListed: true,
    listedDate: '5 days ago',
    viewCount: 234,
    saveCount: 42,
  },

  // Tow compatibility
  gvwr: 3500,
  tongueWeight: 350,
  hitchType: 'bumper-pull',
};
// ============================================================
// Batch 2: Listings 8–14
// FRAGMENT — no imports, no exports
// ============================================================

// ──────────────────────────────────────────────
// Listing 8: 2025 Forest River RiverStone 420RE
// ──────────────────────────────────────────────

const IMG_riverstone = '/images/listings/riverstone-420re';

const riverstoneListing: ListingData = {
  // Vehicle identity
  title: '2025 Forest River RiverStone 420RE',
  year: 2025,
  make: 'Forest River',
  model: 'RiverStone',
  trim: '420RE',

  // Location and stock
  stockNumber: 'FR25RS420RE',
  location: 'Roseville, CA',

  // Photos
  images: [
    { url: `${IMG_riverstone}/698d18a8d74e572dc1072002.webp`, alt: '2025 Forest River RiverStone 420RE exterior front three-quarter view in dealership lot' },
    { url: `${IMG_riverstone}/698d269803e6df0ca60a9af3.webp`, alt: '2025 Forest River RiverStone 420RE exterior driver side with slides extended' },
    { url: `${IMG_riverstone}/698d26980be583822e033de3.webp`, alt: '2025 Forest River RiverStone 420RE interior living room with theater seating and fireplace' },
    { url: `${IMG_riverstone}/698d26982c4adadf70010966.webp`, alt: '2025 Forest River RiverStone 420RE kitchen island with residential appliances' },
    { url: `${IMG_riverstone}/698d26985b357b14b801ec82.webp`, alt: '2025 Forest River RiverStone 420RE master bedroom with king bed and washer dryer prep' },
    { url: `${IMG_riverstone}/698d26988dc7170a46075621.webp`, alt: '2025 Forest River RiverStone 420RE rear entertainment area with bar seating' },
    { url: `${IMG_riverstone}/698d2698ad745cf65d087aa3.webp`, alt: '2025 Forest River RiverStone 420RE bathroom with large glass shower and dual vanity' },
    { url: `${IMG_riverstone}/698d2698d46e5e06c40e016b.webp`, alt: '2025 Forest River RiverStone 420RE exterior rear cap detail with LED lighting' },
    { url: `${IMG_riverstone}/698d2698fdd82392a10146d3.webp`, alt: '2025 Forest River RiverStone 420RE basement storage with pass-through compartments' },
  ],
  tagText: 'Luxury',
  totalPhotoCount: 9,

  // Pricing
  currentPrice: 169990,
  originalPrice: 189995,
  monthlyPayment: 1417,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The RiverStone 420RE is Forest River\'s flagship luxury fifth wheel, designed for full-time living or extended travel with five slides, a rear entertainment lounge, and residential-grade finishes throughout. At 44 feet, this floorplan delivers a massive open living area with a kitchen island, fireplace, and theater seating.\n\nThis 2025 model is priced $20,000 below MSRP at a Camping World location in Roseville. With a king bed, washer/dryer prep, and dual-ducted A/C, it rivals many sticks-and-bricks homes in comfort and amenities.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Fifth Wheel' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '44 ft.' },
    { icon: 'weight', label: 'GVWR', value: '18,000 lbs.' },
    { icon: 'slide', label: 'Slides', value: '5' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
  ],
  vin: '4X4FRSF29SF800890',
  daysOnSite: 25,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 155000,
    rangeMax: 195000,
    averagePrice: 175000,
    explanation: 'Based on similar 2024-2025 Forest River RiverStone fifth wheels within 400 miles, this listing is priced below average with a significant discount off MSRP.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '01/28/26', change: 'Listed', price: 189995 },
      { date: '02/10/26', change: 'Price reduced', price: 179990 },
      { date: '02/20/26', change: 'Price reduced', price: 169990 },
    ],
  },

  // Description
  description: 'Introducing the 2025 Forest River RiverStone 420RE — the pinnacle of luxury fifth wheel living. This stunning 44-foot floorplan features five slides that open up an enormous living space rivaling many apartments. The rear entertainment lounge includes theater seating, a bar area with stools, and a 50-inch TV with surround sound prep. The gourmet kitchen boasts a center island with sink, residential refrigerator, three-burner cooktop, convection microwave, and solid surface countertops with undermount sinks. The master suite features a king-size bed, dual wardrobes, and a washer/dryer prep closet. The spa-inspired bathroom includes a 48-inch residential glass shower, dual vanity, and porcelain toilet. Standard features include hydraulic auto-leveling, a MORryde suspension system, dual 15K BTU A/C units, a 50-amp service, and a 320-watt solar panel system.',

  // Loan Calculator
  loanMonthlyPayment: 1417,

  // Dealer
  dealer: {
    name: 'Camping World',
    location: 'Roseville, CA',
    address: '1039 Orlando Ave, Roseville, CA 95661',
    phone: '(916) 555-0247',
    callCode: '4187',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-6PM',
    logoUrl: '/images/camping-world-logo.png',
    bio: 'Camping World of Roseville is part of the nation\'s largest network of RV dealerships, offering a massive selection of new and used RVs from top manufacturers. Our Roseville location features a fully equipped service center, a well-stocked accessories store, and a finance team ready to help you hit the road.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 12,
  },

  // Navigation context
  resultPosition: 8,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-rs-001',
      title: '2024 Keystone Montana 3855BR',
      year: 2024,
      make: 'Keystone',
      model: 'Montana',
      price: 142995,
      imageUrl: '/images/listings/riverstone-420re/698d18a8d74e572dc1072002.webp',
      dealer: 'La Mesa RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-rs-002',
      title: '2025 Grand Design Solitude 390RK',
      year: 2025,
      make: 'Grand Design',
      model: 'Solitude',
      price: 159900,
      imageUrl: '/images/listings/heritage-glen-378fl/69a22b552734418f3106f5c2.webp',
      dealer: 'General RV Center',
      location: 'West Sacramento, CA',
    },
    {
      id: 'sim-rs-003',
      title: '2024 Keystone Fuzion 430',
      year: 2024,
      make: 'Keystone',
      model: 'Fuzion',
      price: 89995,
      imageUrl: '/images/listings/fuzion-430/697cad5f2cc60b5bfa06af9f.webp',
      dealer: 'Camping World',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-rs-004',
      title: '2025 Forest River Heritage Glen 378FL',
      year: 2025,
      make: 'Forest River',
      model: 'Heritage Glen',
      price: 54995,
      imageUrl: '/images/listings/heritage-glen-378fl/69a22b552734418f3106f5c2.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-rs-005',
      title: '2025 Jayco North Point 390RKDS',
      year: 2025,
      make: 'Jayco',
      model: 'North Point',
      price: 149995,
      imageUrl: '/images/listings/sunseeker-3010dsf/69736bd11e40d0bc5b02239c.webp',
      dealer: 'Bish\'s RV',
      location: 'Meridian, ID',
    },
    {
      id: 'sim-rs-006',
      title: '2024 Forest River RiverStone 39RKFB',
      year: 2024,
      make: 'Forest River',
      model: 'RiverStone',
      price: 175000,
      imageUrl: '/images/listings/scope-18m/693a7ad1920b271659158af6.webp',
      dealer: 'Camping World',
      location: 'Fresno, CA',
    },
  ],

  // Related categories
  categories: [
    'Fifth wheel RVs',
    'Forest River RVs',
    'Luxury fifth wheels',
    'RVs in California',
    'Forest River RiverStone',
    'New fifth wheels',
    'RVs with 5 slides',
  ],

  // Reviews
  reviews: {
    overallRating: 4.5,
    totalReviews: 62,
    distribution: [38, 16, 5, 2, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.5 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 5 },
    ],
    reviews: [
      {
        id: 'rev-rs-001',
        title: 'Full-time living at its finest',
        modelYear: '2024 Forest River RiverStone 420RE',
        rating: 5,
        body: 'We sold our house and moved into the RiverStone 420RE full time. After six months on the road, we have zero regrets. The rear entertainment area is our favorite spot — it\'s like having a separate den. The kitchen island makes meal prep a breeze and the king bed is genuinely comfortable. Build quality is a step above most fifth wheels in this class.',
        author: 'Tom & Linda Garrison',
        photoCount: 8,
      },
      {
        id: 'rev-rs-002',
        title: 'Impressive but needs a serious truck',
        modelYear: '2025 Forest River RiverStone 420RE',
        rating: 4,
        body: 'Everything about this fifth wheel screams luxury — the finishes, the space, the amenities. My only caution is that at 18,000 lbs GVWR, you need a one-ton dually to tow it safely. I upgraded from a 3/4-ton and the difference is night and day. If you have the right truck, this is an incredible value compared to comparable DRV or Luxe models.',
        author: 'Derek Callahan',
        photoCount: 4,
      },
    ],
  },

  // Engagement
  viewerCount: 8,
  engagement: {
    isNewlyListed: false,
    listedDate: '25 days ago',
    viewCount: 412,
    saveCount: 67,
  },

  // Tow compatibility
  gvwr: 18000,
  tongueWeight: 2700,
  hitchType: 'fifth-wheel',
};

// ──────────────────────────────────────────────
// Listing 9: 2026 Forest River Sunseeker 3010DSF
// ──────────────────────────────────────────────

const IMG_sunseeker3010 = '/images/listings/sunseeker-3010dsf';

const sunseeker3010Listing: ListingData = {
  // Vehicle identity
  title: '2026 Forest River Sunseeker 3010DSF',
  year: 2026,
  make: 'Forest River',
  model: 'Sunseeker',
  trim: '3010DSF',

  // Location and stock
  stockNumber: 'FR26SS3010D',
  location: 'Sacramento, CA',

  // Photos
  images: [
    { url: `${IMG_sunseeker3010}/69736bd11e40d0bc5b02239c.webp`, alt: '2026 Forest River Sunseeker 3010DSF exterior front three-quarter view' },
    { url: `${IMG_sunseeker3010}/697ca3b92feddd495e7a4297.webp`, alt: '2026 Forest River Sunseeker 3010DSF interior kitchen with marble countertop and sink' },
    { url: `${IMG_sunseeker3010}/698dc5c7fbf78e02570bd1dc.webp`, alt: '2026 Forest River Sunseeker 3010DSF interior living area with slide-out dinette' },
    { url: `${IMG_sunseeker3010}/6991bb2587d4831d9e32e037.webp`, alt: '2026 Forest River Sunseeker 3010DSF kitchen with stainless appliances and island' },
    { url: `${IMG_sunseeker3010}/6991bb2587d4831d9e32e038.webp`, alt: '2026 Forest River Sunseeker 3010DSF master bedroom with queen bed' },
    { url: `${IMG_sunseeker3010}/6991bb2687d4831d9e32e039.webp`, alt: '2026 Forest River Sunseeker 3010DSF overhead bunk area' },
    { url: `${IMG_sunseeker3010}/69945d9701cfa17aed3d0e20.webp`, alt: '2026 Forest River Sunseeker 3010DSF bathroom with shower and vanity' },
    { url: `${IMG_sunseeker3010}/699d9871c4f2fc77b15d89e6.webp`, alt: '2026 Forest River Sunseeker 3010DSF cockpit with Ford dash and backup camera' },
    { url: `${IMG_sunseeker3010}/699eea653cfc8225f913dc7e.webp`, alt: '2026 Forest River Sunseeker 3010DSF exterior rear with power awning extended' },
    { url: `${IMG_sunseeker3010}/699eea653cfc8225f913dc7f.webp`, alt: '2026 Forest River Sunseeker 3010DSF exterior pass-through basement storage compartment' },
  ],
  tagText: 'New arrival',
  totalPhotoCount: 10,

  // Pricing
  currentPrice: 109995,
  originalPrice: 119995,
  monthlyPayment: 917,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Sunseeker 3010DSF is a mid-size Class C on the Ford E-450 chassis that balances living space with driveability. The "DSF" floorplan features a slide-out dinette, a private rear bedroom with queen bed, and the trademark overcab bunk — sleeping up to six people comfortably.\n\nThis 2026 model is $10,000 off MSRP at Fun Town RV in Sacramento. Standard features include a power awning, backup camera, and solid surface kitchen countertops. It\'s an excellent option for families who want more room than a van but don\'t want to jump to a 35-foot rig.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class C' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '32 ft.' },
    { icon: 'weight', label: 'GVWR', value: '14,500 lbs.' },
    { icon: 'slide', label: 'Slides', value: '1' },
    { icon: 'bed', label: 'Sleeping capacity', value: '6' },
  ],
  vin: '4X4TSMD26RF900901',
  daysOnSite: 10,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 99000,
    rangeMax: 125000,
    averagePrice: 112000,
    explanation: 'Based on similar 2025-2026 Forest River Sunseeker Class C motorhomes within 300 miles, this listing is priced slightly below the market average.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/18/26', change: 'Listed', price: 119995 },
      { date: '02/24/26', change: 'Price reduced', price: 109995 },
    ],
  },

  // Description
  description: 'Brand new 2026 Forest River Sunseeker 3010DSF on the proven Ford E-450 chassis with the 7.3L V8 gas engine. This spacious Class C motorhome features a slide-out booth dinette that dramatically opens up the living area, a full galley kitchen with solid surface countertops, three-burner range with oven, microwave, and double-door refrigerator. The private rear bedroom includes a queen bed with wardrobes on both sides and a privacy curtain. The overcab bunk sleeps two and doubles as an entertainment area. The bathroom features a radius shower, vanity with medicine cabinet, and foot-flush toilet. Standard equipment includes a power patio awning, exterior entertainment center, backup camera with monitor, 4,000W Onan generator, and pass-through basement storage.',

  // Loan Calculator
  loanMonthlyPayment: 917,

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
  resultPosition: 9,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-ss30-001',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-ss30-002',
      title: '2025 Thor Freedom Traveler A24',
      year: 2025,
      make: 'Thor',
      model: 'Freedom Traveler',
      price: 109995,
      imageUrl: '/images/listings/freedom-traveler-a24/69736845f8b770ad1d001275 (1).webp',
      dealer: 'Camping World',
      location: 'La Mirada, CA',
    },
    {
      id: 'sim-ss30-003',
      title: '2025 Thor Four Winds 28A',
      year: 2025,
      make: 'Thor',
      model: 'Four Winds',
      price: 115000,
      imageUrl: '/images/listings/scope-18m/693a7ad1920b271659158af6.webp',
      dealer: 'General RV Center',
      location: 'West Sacramento, CA',
    },
    {
      id: 'sim-ss30-004',
      title: '2025 Coachmen Leprechaun 311FS',
      year: 2025,
      make: 'Coachmen',
      model: 'Leprechaun',
      price: 119995,
      imageUrl: '/images/listings/hideout-sport-175bh/697379bff04761f33b06e7f6.webp',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-ss30-005',
      title: '2024 Jayco Redhawk 29XK',
      year: 2024,
      make: 'Jayco',
      model: 'Redhawk',
      price: 105000,
      imageUrl: '/images/listings/fuzion-430/697cad5f2cc60b5bfa06af9f.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-ss30-006',
      title: '2026 Winnebago View 24D',
      year: 2026,
      make: 'Winnebago',
      model: 'View',
      price: 139900,
      imageUrl: '/images/listings/riverstone-420re/698d18a8d74e572dc1072002.webp',
      dealer: 'Bish\'s RV',
      location: 'Meridian, ID',
    },
  ],

  // Related categories
  categories: [
    'Class C motorhomes',
    'Forest River RVs',
    'RVs under $120K',
    'RVs in California',
    'Forest River Sunseeker',
    'New Class C',
    'Family motorhomes',
  ],

  // Reviews
  reviews: {
    overallRating: 4.3,
    totalReviews: 114,
    distribution: [62, 34, 10, 5, 3],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4 },
      { icon: 'tag', label: 'Cost of ownership', score: 4 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-ss30-001',
        title: 'Family road trip champion',
        modelYear: '2025 Forest River Sunseeker 3010DSF',
        rating: 4.5,
        body: 'We took this rig from Sacramento to Yellowstone and back with two kids. The slide-out dinette makes a huge difference — with the slide in it\'s cramped, but extended you have a real living room. Kids loved the overcab bunk and the rear bedroom gave us actual privacy. Ford 7.3L handled mountain passes without breaking a sweat.',
        author: 'Jason & Amy Patel',
        photoCount: 5,
      },
      {
        id: 'rev-ss30-002',
        title: 'Solid value but watch the height',
        modelYear: '2024 Forest River Sunseeker 3010DSF',
        rating: 4,
        body: 'This is our second Sunseeker and Forest River keeps improving the line. The solid surface counters and updated fixtures are a nice touch. One thing to be aware of — at 32 feet with the overcab, you\'re about 11\'6" tall. Plan your routes around low bridges and some campground canopies won\'t clear. Otherwise, a fantastic mid-range Class C.',
        author: 'David Kowalski',
        photoCount: 2,
      },
    ],
  },

  // Engagement
  viewerCount: 18,
  engagement: {
    isNewlyListed: true,
    listedDate: '10 days ago',
    viewCount: 298,
    saveCount: 52,
  },
};

// ──────────────────────────────────────────────
// Listing 10: 2024 Keystone Fuzion 430
// ──────────────────────────────────────────────

const IMG_fuzion = '/images/listings/fuzion-430';

const fuzionListing: ListingData = {
  // Vehicle identity
  title: '2024 Keystone Fuzion 430',
  year: 2024,
  make: 'Keystone',
  model: 'Fuzion',
  trim: '430',

  // Location and stock
  stockNumber: 'KS24FZ430',
  location: 'Sacramento, CA',

  // Photos
  images: [
    { url: `${IMG_fuzion}/697cad5f2cc60b5bfa06af9f.webp`, alt: '2024 Keystone Fuzion 430 exterior front three-quarter view on dealer lot' },
    { url: `${IMG_fuzion}/697cad7a25ba4c726908d203.webp`, alt: '2024 Keystone Fuzion 430 interior kitchen with stainless refrigerator and theater seating' },
    { url: `${IMG_fuzion}/697cad7a349a5db8e003e104.webp`, alt: '2024 Keystone Fuzion 430 exterior rear ramp door open revealing garage area' },
    { url: `${IMG_fuzion}/697cad7a7ca9d47519084d1b.webp`, alt: '2024 Keystone Fuzion 430 interior living room with opposing slides' },
    { url: `${IMG_fuzion}/697cad7a9b33bc824c09a912.webp`, alt: '2024 Keystone Fuzion 430 kitchen with large center island and pantry' },
    { url: `${IMG_fuzion}/697cad7ae0c28869e600a278.webp`, alt: '2024 Keystone Fuzion 430 loft area above garage with bonus sleeping' },
    { url: `${IMG_fuzion}/697cad7ae1cf901ed505e15e.webp`, alt: '2024 Keystone Fuzion 430 master bedroom with king bed and storage' },
    { url: `${IMG_fuzion}/697cad7ae743daa60d0c9a1a.webp`, alt: '2024 Keystone Fuzion 430 bathroom with walk-in shower' },
    { url: `${IMG_fuzion}/697cad7af69d7064260e5cc6.webp`, alt: '2024 Keystone Fuzion 430 garage area with tie-downs and fuel station' },
    { url: `${IMG_fuzion}/69970e2df0dca431835d5e8e.webp`, alt: '2024 Keystone Fuzion 430 interior master bedroom with king bed and wardrobe' },
  ],
  tagText: 'Price drop',
  totalPhotoCount: 10,

  // Pricing
  currentPrice: 89995,
  originalPrice: 109995,
  monthlyPayment: 750,
  dealRating: 'great',

  // AI Summary
  aiSummary: 'The Keystone Fuzion 430 is a massive toy hauler fifth wheel that combines a 13-foot garage with a luxury living space. With three slides, a loft above the garage, and a separate master suite, it sleeps up to eight and hauls ATVs, motorcycles, or side-by-sides with ease.\n\nThis 2024 model is priced $20,000 below its original sticker — a significant discount for a unit that\'s barely been used. The garage features a party patio ramp door, built-in fuel station, and tie-down system. It\'s the ultimate basecamp for adventure families.',

  // Vehicle History
  vhrAvailable: true,
  vhrHighlights: [
    'No accidents reported',
    'One previous owner',
    'Regular service records available',
  ],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Fifth Wheel Toy Hauler' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '44 ft.' },
    { icon: 'weight', label: 'GVWR', value: '20,000 lbs.' },
    { icon: 'slide', label: 'Slides', value: '3' },
    { icon: 'bed', label: 'Sleeping capacity', value: '8' },
  ],
  vin: '4YDF43020RF101012',
  daysOnSite: 35,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 82000,
    rangeMax: 115000,
    averagePrice: 97000,
    explanation: 'Based on similar 2023-2024 Keystone Fuzion toy hauler fifth wheels within 500 miles, this listing is priced well below average — one of the better deals in the market.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '01/20/26', change: 'Listed', price: 109995 },
      { date: '02/05/26', change: 'Price reduced', price: 99995 },
      { date: '02/18/26', change: 'Price reduced', price: 89995 },
    ],
  },

  // Description
  description: 'Lightly used 2024 Keystone Fuzion 430 fifth wheel toy hauler — the ultimate adventure basecamp. This triple-slide floorplan features a 13-foot garage with a spring-assisted ramp door that doubles as a patio deck, D-ring tie-downs, a built-in fuel station, and a 30-gallon fresh water tank dedicated to the garage area. The main living space opens up dramatically with opposing slides, revealing a spacious kitchen with a center island, residential refrigerator, and pantry. The loft above the garage provides bonus sleeping or storage space. The master suite features a king bed, dual nightstands, and a walk-in closet. The bathroom includes a large radius shower, dual sinks, and linen storage. Equipped with a 5,500W Onan generator, dual 15K BTU A/C units, hydraulic auto-leveling, and a 50-amp electrical system.',

  // Loan Calculator
  loanMonthlyPayment: 750,

  // Dealer
  dealer: {
    name: 'Camping World',
    location: 'Sacramento, CA',
    address: '3000 Longview Dr, Sacramento, CA 95821',
    phone: '(916) 555-0355',
    callCode: '3891',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-6PM',
    logoUrl: '/images/camping-world-logo.png',
    bio: 'Camping World of Sacramento is your one-stop shop for RVs, parts, accessories, and service. We carry hundreds of new and pre-owned units from brands like Keystone, Forest River, Thor, and Winnebago. Our experienced sales staff and finance department make buying your next RV easy and affordable.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 15,
  },

  // Navigation context
  resultPosition: 10,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-fz-001',
      title: '2025 Forest River RiverStone 420RE',
      year: 2025,
      make: 'Forest River',
      model: 'RiverStone',
      price: 169990,
      imageUrl: '/images/listings/riverstone-420re/698d18a8d74e572dc1072002.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-fz-002',
      title: '2025 Grand Design Momentum 399TH',
      year: 2025,
      make: 'Grand Design',
      model: 'Momentum',
      price: 115000,
      imageUrl: '/images/listings/heritage-glen-378fl/69a22b552734418f3106f5c2.webp',
      dealer: 'General RV Center',
      location: 'West Sacramento, CA',
    },
    {
      id: 'sim-fz-003',
      title: '2024 Heartland Cyclone 4007',
      year: 2024,
      make: 'Heartland',
      model: 'Cyclone',
      price: 92500,
      imageUrl: '/images/listings/scope-18m/693a7ad1920b271659158af6.webp',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-fz-004',
      title: '2023 Keystone Fuzion 427',
      year: 2023,
      make: 'Keystone',
      model: 'Fuzion',
      price: 79900,
      imageUrl: '/images/listings/sunseeker-3010dsf/69736bd11e40d0bc5b02239c.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-fz-005',
      title: '2025 Forest River XLR Nitro 407',
      year: 2025,
      make: 'Forest River',
      model: 'XLR Nitro',
      price: 99995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Camping World',
      location: 'Fresno, CA',
    },
    {
      id: 'sim-fz-006',
      title: '2025 Keystone Hideout Sport 175BH',
      year: 2025,
      make: 'Keystone',
      model: 'Hideout Sport',
      price: 19995,
      imageUrl: '/images/listings/hideout-sport-175bh/697379bff04761f33b06e7f6.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
  ],

  // Related categories
  categories: [
    'Toy hauler fifth wheels',
    'Keystone RVs',
    'RVs under $100K',
    'RVs in California',
    'Keystone Fuzion',
    'Used toy haulers',
    'Fifth wheels with garage',
  ],

  // Reviews
  reviews: {
    overallRating: 4.4,
    totalReviews: 78,
    distribution: [45, 22, 7, 3, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.5 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 3.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-fz-001',
        title: 'The ultimate tailgating and adventure rig',
        modelYear: '2024 Keystone Fuzion 430',
        rating: 5,
        body: 'We haul two Can-Am side-by-sides in the garage and still have room for gear. The ramp door patio is a game-changer at rally events — we set up chairs and a TV and it\'s like having a private deck. The loft is perfect for the kids and the main living area feels like a condo. Only downside is finding campsites that can handle 44 feet.',
        author: 'Brian Nowak',
        photoCount: 6,
      },
      {
        id: 'rev-fz-002',
        title: 'Great layout, heavy rig',
        modelYear: '2023 Keystone Fuzion 430',
        rating: 4,
        body: 'The floorplan is brilliant — Keystone really thought about how people use a toy hauler. The separate bedroom, loft, and garage living space means everyone has their own zone. Build quality is solid for the price point. Just be prepared: at 20,000 lbs GVWR, you need a serious truck and fuel economy will suffer. Budget accordingly.',
        author: 'Michelle Torres',
        photoCount: 3,
      },
    ],
  },

  // Engagement
  viewerCount: 6,
  engagement: {
    isNewlyListed: false,
    listedDate: '35 days ago',
    viewCount: 523,
    saveCount: 89,
  },

  // Tow compatibility
  gvwr: 20000,
  tongueWeight: 3400,
  hitchType: 'fifth-wheel',
};

// ──────────────────────────────────────────────
// Listing 11: 2025 Forest River Heritage Glen 378FL
// ──────────────────────────────────────────────

const IMG_heritageGlen = '/images/listings/heritage-glen-378fl';

const heritageGlenListing: ListingData = {
  // Vehicle identity
  title: '2025 Forest River Heritage Glen 378FL',
  year: 2025,
  make: 'Forest River',
  model: 'Heritage Glen',
  trim: '378FL',

  // Location and stock
  stockNumber: 'FR25HG378FL',
  location: 'Sacramento, CA',

  // Photos
  images: [
    { url: `${IMG_heritageGlen}/69a22b552734418f3106f5c2.webp`, alt: '2025 Forest River Heritage Glen 378FL exterior front three-quarter view' },
    { url: `${IMG_heritageGlen}/69a22b582d32fd088d0eb6f2.webp`, alt: '2025 Forest River Heritage Glen 378FL exterior driver side with four slides visible' },
    { url: `${IMG_heritageGlen}/69a22b73cbb1604ff5051412.webp`, alt: '2025 Forest River Heritage Glen 378FL front living room with theater seating' },
    { url: `${IMG_heritageGlen}/69a22b7641bbb510480476f2.webp`, alt: '2025 Forest River Heritage Glen 378FL kitchen with farmhouse sink and island' },
    { url: `${IMG_heritageGlen}/69a22b76fe4be5e1c90f3762.webp`, alt: '2025 Forest River Heritage Glen 378FL dining area with free-standing table and chairs' },
    { url: `${IMG_heritageGlen}/69a22b9faa4ec5b87b0e27d2.webp`, alt: '2025 Forest River Heritage Glen 378FL master bedroom with queen bed' },
    { url: `${IMG_heritageGlen}/69a22ba0abb617b64f033b22.webp`, alt: '2025 Forest River Heritage Glen 378FL bathroom with tub-shower combo' },
    { url: `${IMG_heritageGlen}/69a22bbd3b29cbf46f018372.webp`, alt: '2025 Forest River Heritage Glen 378FL second bathroom with vanity' },
    { url: `${IMG_heritageGlen}/69a22bc9cdd70bb23300e5c2.webp`, alt: '2025 Forest River Heritage Glen 378FL exterior awning with LED lights at dusk' },
    { url: `${IMG_heritageGlen}/69a22bd48fef2b81e607ea92.webp`, alt: '2025 Forest River Heritage Glen 378FL exterior rear cap and ladder detail' },
    { url: `${IMG_heritageGlen}/69a22bd866bf7293ce0fdc42.webp`, alt: '2025 Forest River Heritage Glen 378FL underbelly storage and utility hookups' },
    { url: `${IMG_heritageGlen}/69a22bd9dc413524840a97e2.webp`, alt: '2025 Forest River Heritage Glen 378FL interior panoramic view with slides extended' },
  ],
  tagText: 'New arrival',
  totalPhotoCount: 12,

  // Pricing
  currentPrice: 54995,
  originalPrice: 64995,
  monthlyPayment: 458,
  dealRating: 'great',

  // AI Summary
  aiSummary: 'The Heritage Glen 378FL is a front-living fifth wheel that puts the entertainment space up front and the bedroom in the rear — a popular layout for couples who prioritize living space over sleeping arrangements. With four slides, this 42-foot unit opens up into a surprisingly spacious interior with theater seating, a free-standing dining table, and a full residential kitchen.\n\nAt $54,995 this is an exceptional value for a new fifth wheel of this size. Forest River\'s Heritage Glen line is known for delivering a good balance of features and affordability, and the 378FL is one of the most popular floorplans in the series.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Fifth Wheel' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '42 ft.' },
    { icon: 'weight', label: 'GVWR', value: '13,745 lbs.' },
    { icon: 'slide', label: 'Slides', value: '4' },
    { icon: 'bed', label: 'Sleeping capacity', value: '6' },
  ],
  vin: '4X4FHGE25SF111123',
  daysOnSite: 15,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 48000,
    rangeMax: 68000,
    averagePrice: 58000,
    explanation: 'Based on similar 2024-2025 Forest River Heritage Glen fifth wheels within 400 miles, this listing is priced below average with a $10,000 discount off MSRP.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/10/26', change: 'Listed', price: 64995 },
      { date: '02/20/26', change: 'Price reduced', price: 54995 },
    ],
  },

  // Description
  description: 'New 2025 Forest River Heritage Glen 378FL front-living fifth wheel with four slides. This spacious floorplan features a front living area with dual opposing slides that open up a massive entertainment space with theater seating, a fireplace, and a large picture window. The mid-coach kitchen includes a center island with farmhouse sink, residential refrigerator, three-burner cooktop, oven, and convection microwave. A free-standing dining table with four chairs provides a residential dining experience. The rear master bedroom offers a queen bed with under-bed storage, dual wardrobes, and a dedicated entrance to the bathroom. The split bathroom design features a tub-shower combo, linen closet, and a separate half bath accessible from the living area. Standard features include hydraulic auto-leveling, a 200W solar panel, dual A/C units, power awning with LED lights, and seamless PVC roofing.',

  // Loan Calculator
  loanMonthlyPayment: 458,

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
  resultPosition: 11,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-hg-001',
      title: '2025 Forest River RiverStone 420RE',
      year: 2025,
      make: 'Forest River',
      model: 'RiverStone',
      price: 169990,
      imageUrl: '/images/listings/riverstone-420re/698d18a8d74e572dc1072002.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-hg-002',
      title: '2024 Keystone Fuzion 430',
      year: 2024,
      make: 'Keystone',
      model: 'Fuzion',
      price: 89995,
      imageUrl: '/images/listings/fuzion-430/697cad5f2cc60b5bfa06af9f.webp',
      dealer: 'Camping World',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-hg-003',
      title: '2025 Keystone Cougar 364BHL',
      year: 2025,
      make: 'Keystone',
      model: 'Cougar',
      price: 49995,
      imageUrl: '/images/listings/scope-18m/693a7ad1920b271659158af6.webp',
      dealer: 'General RV Center',
      location: 'Elk Grove, CA',
    },
    {
      id: 'sim-hg-004',
      title: '2025 Grand Design Reflection 370FLS',
      year: 2025,
      make: 'Grand Design',
      model: 'Reflection',
      price: 62500,
      imageUrl: '/images/listings/sunseeker-3010dsf/69736bd11e40d0bc5b02239c.webp',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-hg-005',
      title: '2024 Forest River Cedar Creek 371FL',
      year: 2024,
      make: 'Forest River',
      model: 'Cedar Creek',
      price: 72000,
      imageUrl: '/images/listings/freedom-traveler-a24/69736845f8b770ad1d001275 (1).webp',
      dealer: 'Camping World',
      location: 'Fresno, CA',
    },
    {
      id: 'sim-hg-006',
      title: '2025 Keystone Hideout Sport 175BH',
      year: 2025,
      make: 'Keystone',
      model: 'Hideout Sport',
      price: 19995,
      imageUrl: '/images/listings/hideout-sport-175bh/697379bff04761f33b06e7f6.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
  ],

  // Related categories
  categories: [
    'Fifth wheel RVs',
    'Forest River RVs',
    'RVs under $60K',
    'RVs in California',
    'Forest River Heritage Glen',
    'New fifth wheels',
    'Front living fifth wheels',
  ],

  // Reviews
  reviews: {
    overallRating: 4.1,
    totalReviews: 95,
    distribution: [50, 28, 10, 5, 2],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4 },
    ],
    reviews: [
      {
        id: 'rev-hg-001',
        title: 'Amazing value for a four-slide fifth wheel',
        modelYear: '2024 Forest River Heritage Glen 378FL',
        rating: 4.5,
        body: 'We compared this to the Grand Design Reflection and Keystone Cougar, and the Heritage Glen gave us the most bang for the buck. The front living room is massive when the slides are out — we hosted eight people for game night without anyone feeling cramped. The free-standing table is a nice touch over the typical fixed dinette. Kitchen is well-equipped for a rig at this price point.',
        author: 'Carol & Jim Brewer',
        photoCount: 4,
      },
      {
        id: 'rev-hg-002',
        title: 'Good bones, minor fit and finish issues',
        modelYear: '2025 Forest River Heritage Glen 378FL',
        rating: 3.5,
        body: 'The floorplan and features are hard to beat at under $55K. That said, we did have a few fit and finish items on our PDI — a cabinet door that wouldn\'t close properly, a small water leak at the kitchen faucet, and some trim pieces that needed re-gluing. The dealer fixed everything under warranty. Once sorted out, it\'s been a solid fifth wheel for seasonal camping.',
        author: 'Steve Becker',
        photoCount: 1,
      },
    ],
  },

  // Engagement
  viewerCount: 12,
  engagement: {
    isNewlyListed: true,
    listedDate: '15 days ago',
    viewCount: 345,
    saveCount: 61,
  },

  // Tow compatibility
  gvwr: 13745,
  tongueWeight: 1850,
  hitchType: 'fifth-wheel',
};

// ──────────────────────────────────────────────
// Listing 12: 2025 Thor Scope 18M
// ──────────────────────────────────────────────

const IMG_scope = '/images/listings/scope-18m';

const scopeListing: ListingData = {
  // Vehicle identity
  title: '2025 Thor Scope 18M',
  year: 2025,
  make: 'Thor',
  model: 'Scope',
  trim: '18M',

  // Location and stock
  stockNumber: 'TH25SC18M',
  location: 'Fresno, CA',

  // Photos
  images: [
    { url: `${IMG_scope}/693a7ad1920b271659158af6.webp`, alt: '2025 Thor Scope 18M exterior front three-quarter view showing compact profile' },
    { url: `${IMG_scope}/693a7ad1920b271659158af7.webp`, alt: '2025 Thor Scope 18M exterior driver side with awning extended' },
    { url: `${IMG_scope}/693a7ad1920b271659158af8.webp`, alt: '2025 Thor Scope 18M interior dinette and kitchenette overview' },
    { url: `${IMG_scope}/693a7ad1920b271659158afa.webp`, alt: '2025 Thor Scope 18M kitchen area with two-burner cooktop and sink' },
    { url: `${IMG_scope}/693a7ad1920b271659158afd.webp`, alt: '2025 Thor Scope 18M rear queen bed with privacy curtain' },
    { url: `${IMG_scope}/693a7ad1920b271659158afe.webp`, alt: '2025 Thor Scope 18M wet bath with toilet and shower combination' },
    { url: `${IMG_scope}/693a7ad1920b271659158aff.webp`, alt: '2025 Thor Scope 18M interior living area with dinette and swivel chair' },
    { url: `${IMG_scope}/693a7ad1920b271659158b00.webp`, alt: '2025 Thor Scope 18M tongue and hitch detail with propane tanks' },
    { url: `${IMG_scope}/693a7ad1920b271659158b01.webp`, alt: '2025 Thor Scope 18M interior kitchenette with refrigerator and sink' },
    { url: `${IMG_scope}/693a7ad1920b271659158b03.webp`, alt: '2025 Thor Scope 18M underside and axle detail' },
    { url: `${IMG_scope}/693a7ad1920b271659158b04.webp`, alt: '2025 Thor Scope 18M interior cabinetry and overhead storage' },
    { url: `${IMG_scope}/693a7ad1920b271659158b05.webp`, alt: '2025 Thor Scope 18M dinette converted to sleeping area' },
    { url: `${IMG_scope}/693a7ad1920b271659158b08.webp`, alt: '2025 Thor Scope 18M interior wet bath with toilet and shower' },
    { url: `${IMG_scope}/69736845f8b770ad1d001275.webp`, alt: '2025 Thor Scope 18M roof detail with A/C unit and solar prep' },
  ],
  tagText: 'New arrival',
  totalPhotoCount: 14,

  // Pricing
  currentPrice: 32988,
  originalPrice: 37995,
  monthlyPayment: 275,
  dealRating: 'great',

  // AI Summary
  aiSummary: 'The Thor Scope 18M is one of the lightest fully self-contained travel trailers on the market, making it towable by most mid-size SUVs and half-ton trucks. At just 22 feet, it packs a queen bed, wet bath, dinette, and compact kitchen into a remarkably efficient floorplan.\n\nThis 2025 model is nearly $5,000 off MSRP at Camping World in Fresno. With a GVWR of just 5,500 lbs and a tongue weight of 545 lbs, it\'s an ideal first trailer for couples or solo travelers who want to camp without upgrading their tow vehicle.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Travel Trailer' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '22 ft.' },
    { icon: 'weight', label: 'GVWR', value: '5,500 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: '1TCK0EW29SB211234',
  daysOnSite: 8,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 28000,
    rangeMax: 39000,
    averagePrice: 33500,
    explanation: 'Based on similar 2024-2025 Thor Scope travel trailers within 300 miles, this listing is priced right at the market average with a solid discount off MSRP.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/20/26', change: 'Listed', price: 37995 },
      { date: '02/25/26', change: 'Price reduced', price: 32988 },
    ],
  },

  // Description
  description: 'New 2025 Thor Scope 18M travel trailer — the perfect entry-level camper that doesn\'t compromise on the essentials. This compact 22-foot trailer features a rear queen bed with a privacy curtain, a convertible dinette for additional sleeping, a fully equipped kitchenette with a two-burner cooktop, stainless steel sink, microwave, and compact refrigerator. The wet bath includes a shower, toilet, and vanity. Despite its small footprint, the Scope 18M offers generous overhead cabinet storage, wardrobe space, and exterior pass-through storage. Standard features include a power awning, exterior speakers, stabilizer jacks, LED lighting throughout, and a 13,500 BTU A/C unit. At just 5,500 lbs GVWR, it\'s towable by vehicles like the Toyota 4Runner, Ford Explorer, or Chevy Silverado 1500.',

  // Loan Calculator
  loanMonthlyPayment: 275,

  // Dealer
  dealer: {
    name: 'Camping World',
    location: 'Fresno, CA',
    address: '4455 N Blackstone Ave, Fresno, CA 93726',
    phone: '(559) 555-0198',
    callCode: '5512',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-6PM',
    logoUrl: '/images/camping-world-logo.png',
    bio: 'Camping World of Fresno serves the Central Valley with a huge selection of new and pre-owned RVs. Whether you\'re looking for a compact travel trailer or a luxury fifth wheel, our team can help you find the right fit and the right price. Full-service center and parts department on site.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 10,
  },

  // Navigation context
  resultPosition: 12,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-sc-001',
      title: '2025 Keystone Hideout Sport 175BH',
      year: 2025,
      make: 'Keystone',
      model: 'Hideout Sport',
      price: 19995,
      imageUrl: '/images/listings/hideout-sport-175bh/697379bff04761f33b06e7f6.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-sc-002',
      title: '2025 Forest River R-Pod 192',
      year: 2025,
      make: 'Forest River',
      model: 'R-Pod',
      price: 29995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-sc-003',
      title: '2024 Coachmen Catalina Summit 184BHS',
      year: 2024,
      make: 'Coachmen',
      model: 'Catalina Summit',
      price: 27500,
      imageUrl: '/images/listings/heritage-glen-378fl/69a22b552734418f3106f5c2.webp',
      dealer: 'General RV Center',
      location: 'Elk Grove, CA',
    },
    {
      id: 'sim-sc-004',
      title: '2025 Winnebago Micro Minnie 1808FBS',
      year: 2025,
      make: 'Winnebago',
      model: 'Micro Minnie',
      price: 34900,
      imageUrl: '/images/listings/sunseeker-3010dsf/69736bd11e40d0bc5b02239c.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-sc-005',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/freedom-traveler-a24/69736845f8b770ad1d001275 (1).webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-sc-006',
      title: '2024 Jayco Jay Flight SLX 184BS',
      year: 2024,
      make: 'Jayco',
      model: 'Jay Flight SLX',
      price: 22900,
      imageUrl: '/images/listings/fuzion-430/697cad5f2cc60b5bfa06af9f.webp',
      dealer: 'Bish\'s RV',
      location: 'Meridian, ID',
    },
  ],

  // Related categories
  categories: [
    'Travel trailers',
    'Thor RVs',
    'RVs under $35K',
    'RVs in California',
    'Thor Scope',
    'New travel trailers',
    'Lightweight trailers',
  ],

  // Reviews
  reviews: {
    overallRating: 4.0,
    totalReviews: 43,
    distribution: [20, 14, 5, 3, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4 },
      { icon: 'tag', label: 'Cost of ownership', score: 5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 3.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 3.5 },
    ],
    reviews: [
      {
        id: 'rev-sc-001',
        title: 'Perfect for our 4Runner',
        modelYear: '2024 Thor Scope 18M',
        rating: 4.5,
        body: 'We specifically wanted a trailer our Toyota 4Runner could tow without upgrading trucks. The Scope 18M fits the bill perfectly — loaded and ready to go, we\'re right at 4,800 lbs. The queen bed is comfortable, the kitchen has everything we need for weekend trips, and the wet bath works fine for two people. Storage is limited but we added a roof rack on the trailer for extra gear.',
        author: 'Rebecca Kim',
        photoCount: 3,
      },
      {
        id: 'rev-sc-002',
        title: 'Great starter trailer with compromises',
        modelYear: '2025 Thor Scope 18M',
        rating: 3.5,
        body: 'This is our first RV and the Scope is a great way to get into camping without breaking the bank. The wet bath takes some getting used to — everything gets wet when you shower, so we use a squeegee after each use. The dinette is tight for two adults. But for the price and the fact that our Chevy Colorado tows it easily, we\'re happy with the purchase.',
        author: 'Marcus Young',
        photoCount: 1,
      },
    ],
  },

  // Engagement
  viewerCount: 22,
  engagement: {
    isNewlyListed: true,
    listedDate: '8 days ago',
    viewCount: 215,
    saveCount: 38,
  },

  // Tow compatibility
  gvwr: 5500,
  tongueWeight: 545,
  hitchType: 'bumper-pull',
};

// ──────────────────────────────────────────────
// Listing 13: 2025 Thor Freedom Traveler A24
// ──────────────────────────────────────────────

const IMG_freedomTraveler = '/images/listings/freedom-traveler-a24';

const freedomTravelerListing: ListingData = {
  // Vehicle identity
  title: '2025 Thor Freedom Traveler A24',
  year: 2025,
  make: 'Thor',
  model: 'Freedom Traveler',
  trim: 'A24',

  // Location and stock
  stockNumber: 'TH25FTA24',
  location: 'La Mirada, CA',

  // Photos
  images: [
    { url: `${IMG_freedomTraveler}/69736845f8b770ad1d001275 (1).webp`, alt: '2025 Thor Freedom Traveler A24 exterior front three-quarter view showing compact Class A profile' },
    { url: `${IMG_freedomTraveler}/69872ca8c9c0a12bb6118688.webp`, alt: '2025 Thor Freedom Traveler A24 exterior driver side with slide extended' },
    { url: `${IMG_freedomTraveler}/69872caac9c0a12bb611868d.webp`, alt: '2025 Thor Freedom Traveler A24 interior living area with slide-out sofa' },
    { url: `${IMG_freedomTraveler}/69872cabc9c0a12bb6118690.webp`, alt: '2025 Thor Freedom Traveler A24 kitchen galley with stainless appliances' },
    { url: `${IMG_freedomTraveler}/69872cabc9c0a12bb6118691.webp`, alt: '2025 Thor Freedom Traveler A24 rear bedroom with queen bed' },
    { url: `${IMG_freedomTraveler}/69872cacc9c0a12bb6118692.webp`, alt: '2025 Thor Freedom Traveler A24 bathroom with shower and vanity' },
    { url: `${IMG_freedomTraveler}/69872cadc9c0a12bb6118693.webp`, alt: '2025 Thor Freedom Traveler A24 cockpit with dash and driver area' },
    { url: `${IMG_freedomTraveler}/6996ff476382912a3405b6b8.webp`, alt: '2025 Thor Freedom Traveler A24 interior living area with kitchen counter and sofa' },
    { url: `${IMG_freedomTraveler}/69a2dc25d6cbbc045768fef7.webp`, alt: '2025 Thor Freedom Traveler A24 interior cab area with captain chairs and overhead bunk' },
  ],
  tagText: 'Compact Class A',
  totalPhotoCount: 9,

  // Pricing
  currentPrice: 109995,
  originalPrice: 124995,
  monthlyPayment: 917,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Thor Freedom Traveler A24 is a compact Class A motorhome that delivers the flat-floor living experience of a big coach in a nimble 26-foot package. Built on the Ford E-450 chassis, it features a slide-out sofa, rear queen bedroom, and a full kitchen — everything you need without the intimidation factor of a 35-foot bus.\n\nThis 2025 model is $15,000 off MSRP at Camping World in La Mirada. At 26 feet with one slide, it fits in most campground sites and is manageable for drivers upgrading from a Class C or large SUV. A strong choice for couples who want the Class A experience without the Class A footprint.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class A' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '26 ft.' },
    { icon: 'weight', label: 'GVWR', value: '16,000 lbs.' },
    { icon: 'slide', label: 'Slides', value: '1' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
  ],
  vin: '4UZACSDT5SCFT1345',
  daysOnSite: 20,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 99000,
    rangeMax: 130000,
    averagePrice: 115000,
    explanation: 'Based on similar 2024-2025 compact Class A motorhomes within 400 miles, this listing is priced below average with a significant $15,000 discount off MSRP.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/01/26', change: 'Listed', price: 124995 },
      { date: '02/15/26', change: 'Price reduced', price: 114995 },
      { date: '02/22/26', change: 'Price reduced', price: 109995 },
    ],
  },

  // Description
  description: 'New 2025 Thor Freedom Traveler A24 — a compact Class A motorhome that proves bigger isn\'t always better. Built on the Ford E-450 chassis with the 7.3L V8 gas engine, this 26-foot coach offers a flat-floor living experience with none of the cab-over intrusion found in Class C models. The single slide-out expands the living area to reveal a comfortable sofa and opens up the galley kitchen. The kitchen features solid surface countertops, a three-burner range with oven, microwave, and double-door refrigerator. The rear bedroom includes a queen bed with nightstands and overhead cabinets. The bathroom offers a radius shower, porcelain toilet, and vanity with medicine cabinet. Standard features include a 4,000W Onan generator, power patio awning, backup camera with monitor, exterior entertainment center, and a 100W solar panel with charge controller.',

  // Loan Calculator
  loanMonthlyPayment: 917,

  // Dealer
  dealer: {
    name: 'Camping World',
    location: 'La Mirada, CA',
    address: '14900 Firestone Blvd, La Mirada, CA 90638',
    phone: '(562) 555-0276',
    callCode: '4489',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-6PM',
    logoUrl: '/images/camping-world-logo.png',
    bio: 'Camping World of La Mirada is Southern California\'s premier RV destination, serving the greater Los Angeles area with an extensive inventory of new and pre-owned motorhomes and travel trailers. Our location features a full-service center, parts department, and experienced finance team to get you on the road.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 14,
  },

  // Navigation context
  resultPosition: 13,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-ft-001',
      title: '2026 Forest River Sunseeker 3010DSF',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 109995,
      imageUrl: '/images/listings/sunseeker-3010dsf/69736bd11e40d0bc5b02239c.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-ft-002',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-ft-003',
      title: '2025 Winnebago Vista 27P',
      year: 2025,
      make: 'Winnebago',
      model: 'Vista',
      price: 135000,
      imageUrl: '/images/listings/riverstone-420re/698d18a8d74e572dc1072002.webp',
      dealer: 'La Mesa RV',
      location: 'San Diego, CA',
    },
    {
      id: 'sim-ft-004',
      title: '2024 Thor Axis 24.1',
      year: 2024,
      make: 'Thor',
      model: 'Axis',
      price: 99900,
      imageUrl: '/images/listings/scope-18m/693a7ad1920b271659158af6.webp',
      dealer: 'General RV Center',
      location: 'West Sacramento, CA',
    },
    {
      id: 'sim-ft-005',
      title: '2025 Coachmen Pursuit 27XPS',
      year: 2025,
      make: 'Coachmen',
      model: 'Pursuit',
      price: 119995,
      imageUrl: '/images/listings/heritage-glen-378fl/69a22b552734418f3106f5c2.webp',
      dealer: 'Camping World',
      location: 'Bakersfield, CA',
    },
    {
      id: 'sim-ft-006',
      title: '2025 Thor Scope 18M',
      year: 2025,
      make: 'Thor',
      model: 'Scope',
      price: 32988,
      imageUrl: '/images/listings/scope-18m/693a7ad1920b271659158af6.webp',
      dealer: 'Camping World',
      location: 'Fresno, CA',
    },
  ],

  // Related categories
  categories: [
    'Class A motorhomes',
    'Thor RVs',
    'RVs under $120K',
    'RVs in California',
    'Thor Freedom Traveler',
    'New Class A',
    'Compact motorhomes',
  ],

  // Reviews
  reviews: {
    overallRating: 4.2,
    totalReviews: 36,
    distribution: [18, 11, 4, 2, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4 },
    ],
    reviews: [
      {
        id: 'rev-ft-001',
        title: 'Flat floor living in a small package',
        modelYear: '2024 Thor Freedom Traveler A24',
        rating: 4.5,
        body: 'We traded in our Class C for the Freedom Traveler and the difference is remarkable. No more climbing over the doghouse, no cab-over bunk blocking the view — just a flat, open floor from front to back. At 26 feet it fits everywhere our old Class C went, but the interior feels much bigger. The Ford 7.3L has plenty of power and the ride quality is excellent for a gas Class A.',
        author: 'Patricia & Doug Hensley',
        photoCount: 4,
      },
      {
        id: 'rev-ft-002',
        title: 'Nice coach, fuel economy is rough',
        modelYear: '2025 Thor Freedom Traveler A24',
        rating: 3.5,
        body: 'The Freedom Traveler is a well-built, comfortable Class A at a reasonable price. The layout works great for two people and the slide gives you a real living room. My main complaint is fuel economy — we average about 8-9 mpg, which is steep for a 26-footer. The gas tank is also only 55 gallons, so you\'re stopping for fuel more often than expected. Factor that into your budget.',
        author: 'Alan Rothstein',
        photoCount: 1,
      },
    ],
  },

  // Engagement
  viewerCount: 10,
  engagement: {
    isNewlyListed: false,
    listedDate: '20 days ago',
    viewCount: 378,
    saveCount: 55,
  },
};

// ──────────────────────────────────────────────
// Listing 14: 2025 Keystone Hideout Sport 175BH
// ──────────────────────────────────────────────

const IMG_hideout = '/images/listings/hideout-sport-175bh';

const hideoutListing: ListingData = {
  // Vehicle identity
  title: '2025 Keystone Hideout Sport 175BH',
  year: 2025,
  make: 'Keystone',
  model: 'Hideout Sport',
  trim: '175BH',

  // Location and stock
  stockNumber: 'KS25HS175BH',
  location: 'Sacramento, CA',

  // Photos
  images: [
    { url: `${IMG_hideout}/697379bff04761f33b06e7f6.webp`, alt: '2025 Keystone Hideout Sport 175BH exterior front three-quarter view showing compact travel trailer profile' },
    { url: `${IMG_hideout}/6981f3e2fb770e66dc1cf6bd.webp`, alt: '2025 Keystone Hideout Sport 175BH interior dinette kitchen area with booth seating' },
    { url: `${IMG_hideout}/6981f3e2fb770e66dc1cf6be.webp`, alt: '2025 Keystone Hideout Sport 175BH interior overview with dinette and bunks' },
    { url: `${IMG_hideout}/6981f3e2fb770e66dc1cf6bf.webp`, alt: '2025 Keystone Hideout Sport 175BH rear bunk beds with ladder' },
    { url: `${IMG_hideout}/6981f3e3fb770e66dc1cf6c0.webp`, alt: '2025 Keystone Hideout Sport 175BH kitchen area with range and microwave' },
    { url: `${IMG_hideout}/6981f3e3fb770e66dc1cf6c1.webp`, alt: '2025 Keystone Hideout Sport 175BH front queen bed with overhead cabinets' },
    { url: `${IMG_hideout}/6981f3e6fb770e66dc1cf6c7.webp`, alt: '2025 Keystone Hideout Sport 175BH wet bath with shower and toilet' },
    { url: `${IMG_hideout}/6981f3e7fb770e66dc1cf6ca.webp`, alt: '2025 Keystone Hideout Sport 175BH interior bedroom with mattress and TV mount' },
  ],
  tagText: 'Budget friendly',
  totalPhotoCount: 8,

  // Pricing
  currentPrice: 19995,
  originalPrice: 24995,
  monthlyPayment: 167,
  dealRating: 'great',

  // AI Summary
  aiSummary: 'The Keystone Hideout Sport 175BH is a budget-friendly bunkhouse travel trailer designed for families who want to start camping without a huge investment. At just 22 feet and 4,400 lbs GVWR, it\'s towable by most half-ton trucks and many mid-size SUVs, keeping the total cost of entry remarkably low.\n\nPriced under $20,000 with $5,000 off MSRP, this is one of the most affordable new RVs on the market. The rear bunks sleep the kids while the front queen handles the adults — a proven family layout in a compact, easy-to-tow package.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Travel Trailer' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '22 ft.' },
    { icon: 'weight', label: 'GVWR', value: '4,400 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '5' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: '4YDT17527SB311456',
  daysOnSite: 6,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 17000,
    rangeMax: 26000,
    averagePrice: 21500,
    explanation: 'Based on similar 2024-2025 Keystone Hideout Sport bunkhouse trailers within 300 miles, this listing is priced below the market average with a significant MSRP discount.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/22/26', change: 'Listed', price: 24995 },
      { date: '02/26/26', change: 'Price reduced', price: 19995 },
    ],
  },

  // Description
  description: 'Brand new 2025 Keystone Hideout Sport 175BH bunkhouse travel trailer at an incredible sub-$20K price. This family-friendly floorplan features a front queen bed with a privacy curtain, a convertible booth dinette, and rear double bunks that kids absolutely love. The compact kitchen includes a two-burner cooktop, microwave, sink, and compact refrigerator. The wet bath provides a shower, toilet, and small vanity. Despite the budget-friendly price tag, the Hideout Sport doesn\'t skimp on essentials — you get a 13,500 BTU A/C unit, power awning, exterior speakers, stabilizer jacks, LED lighting, and Keystone\'s signature NXG engineered frame. At 4,400 lbs GVWR, it\'s one of the lightest bunkhouse trailers available, making it towable by a wide range of vehicles.',

  // Loan Calculator
  loanMonthlyPayment: 167,

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
  resultPosition: 14,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-ho-001',
      title: '2025 Thor Scope 18M',
      year: 2025,
      make: 'Thor',
      model: 'Scope',
      price: 32988,
      imageUrl: '/images/listings/scope-18m/693a7ad1920b271659158af6.webp',
      dealer: 'Camping World',
      location: 'Fresno, CA',
    },
    {
      id: 'sim-ho-002',
      title: '2025 Jayco Jay Flight SLX 174BH',
      year: 2025,
      make: 'Jayco',
      model: 'Jay Flight SLX',
      price: 21900,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'General RV Center',
      location: 'Elk Grove, CA',
    },
    {
      id: 'sim-ho-003',
      title: '2024 Coachmen Clipper 17BHS',
      year: 2024,
      make: 'Coachmen',
      model: 'Clipper',
      price: 18500,
      imageUrl: '/images/listings/sunseeker-3010dsf/69736bd11e40d0bc5b02239c.webp',
      dealer: 'La Mesa RV',
      location: 'Davis, CA',
    },
    {
      id: 'sim-ho-004',
      title: '2025 Forest River Salem FSX 178BHSK',
      year: 2025,
      make: 'Forest River',
      model: 'Salem FSX',
      price: 23995,
      imageUrl: '/images/listings/heritage-glen-378fl/69a22b552734418f3106f5c2.webp',
      dealer: 'Camping World',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-ho-005',
      title: '2024 Keystone Fuzion 430',
      year: 2024,
      make: 'Keystone',
      model: 'Fuzion',
      price: 89995,
      imageUrl: '/images/listings/fuzion-430/697cad5f2cc60b5bfa06af9f.webp',
      dealer: 'Camping World',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-ho-006',
      title: '2025 Thor Freedom Traveler A24',
      year: 2025,
      make: 'Thor',
      model: 'Freedom Traveler',
      price: 109995,
      imageUrl: '/images/listings/freedom-traveler-a24/69736845f8b770ad1d001275 (1).webp',
      dealer: 'Camping World',
      location: 'La Mirada, CA',
    },
  ],

  // Related categories
  categories: [
    'Travel trailers',
    'Keystone RVs',
    'RVs under $25K',
    'RVs in California',
    'Keystone Hideout',
    'New travel trailers',
    'Bunkhouse trailers',
  ],

  // Reviews
  reviews: {
    overallRating: 4.0,
    totalReviews: 128,
    distribution: [58, 42, 16, 8, 4],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 3.5 },
      { icon: 'tag', label: 'Cost of ownership', score: 5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4 },
      { icon: 'bed', label: 'Comfort & liveability', score: 3.5 },
    ],
    reviews: [
      {
        id: 'rev-ho-001',
        title: 'Best bang for the buck in RVing',
        modelYear: '2024 Keystone Hideout Sport 175BH',
        rating: 4.5,
        body: 'We bought this as our family\'s first camper and it\'s been perfect for learning the ropes. Our two boys (8 and 10) love the bunk beds, and the queen up front gives my wife and me our own space. At under $20K new, it was cheaper than most used options and comes with a full warranty. We tow it with our Ram 1500 and barely notice it\'s back there. For the price, you simply can\'t do better.',
        author: 'Carlos & Maria Sanchez',
        photoCount: 5,
      },
      {
        id: 'rev-ho-002',
        title: 'You get what you pay for — and that\'s fine',
        modelYear: '2025 Keystone Hideout Sport 175BH',
        rating: 3.5,
        body: 'Let me be honest: the Hideout Sport is a budget trailer and it feels like one. The cabinet hardware is basic, the mattresses need replacing, and the wet bath is tiny. But here\'s the thing — it\'s under $20K, it tows behind our Toyota Tacoma, and it keeps us dry and air-conditioned. We upgraded the mattresses for $300 and added a few organizers, and now it\'s a perfectly functional little camper. Don\'t expect luxury and you won\'t be disappointed.',
        author: 'Jeff Watkins',
        photoCount: 2,
      },
    ],
  },

  // Engagement
  viewerCount: 26,
  engagement: {
    isNewlyListed: true,
    listedDate: '6 days ago',
    viewCount: 189,
    saveCount: 42,
  },

  // Tow compatibility
  gvwr: 4400,
  tongueWeight: 440,
  hitchType: 'bumper-pull',
};
// Batch 3: Listings 15-21
// FRAGMENT — no imports, no exports. Assembled by scrapedListings.ts.

// ─── Listing 15: Tiffin Allegro Open Road 32SA ──────────────────────────────

const IMG_ALLEGRO = '/images/listings/allegro-open-road-32sa';

export const allegroListing: ListingData = {
  // Vehicle identity
  title: '2025 Tiffin Allegro Open Road 32SA',
  year: 2025,
  make: 'Tiffin Motorhomes',
  model: 'Allegro Open Road',
  trim: '32SA',

  // Location and stock
  stockNumber: 'TM25AOR32SA',
  location: 'Portland, OR',

  // Photos
  images: [
    { url: `${IMG_ALLEGRO}/695d6197b5b92c215d071374.webp`, alt: '2025 Tiffin Allegro Open Road 32SA exterior front three-quarter view on dealer lot' },
    { url: `${IMG_ALLEGRO}/695d619c86cb59447201a9c2.webp`, alt: '2025 Tiffin Allegro Open Road 32SA exterior driver side with slideouts retracted' },
    { url: `${IMG_ALLEGRO}/695d619f951307c7340c5562.webp`, alt: '2025 Tiffin Allegro Open Road 32SA exterior rear with tow hitch and ladder' },
    { url: `${IMG_ALLEGRO}/695d61a78cc84c03ac08bcc2.webp`, alt: '2025 Tiffin Allegro Open Road 32SA cockpit with leather captain chairs and dash' },
    { url: `${IMG_ALLEGRO}/695d61aaca7990ede9016382.webp`, alt: '2025 Tiffin Allegro Open Road 32SA living area with sofa and overhead TV' },
    { url: `${IMG_ALLEGRO}/695d61ac5eebebdc24053542.webp`, alt: '2025 Tiffin Allegro Open Road 32SA kitchen with residential fridge and island' },
    { url: `${IMG_ALLEGRO}/695d61b24f80d5402d01cda2.webp`, alt: '2025 Tiffin Allegro Open Road 32SA dinette booth with panoramic window' },
    { url: `${IMG_ALLEGRO}/695d61b418d976bd3100afc3.webp`, alt: '2025 Tiffin Allegro Open Road 32SA rear bedroom with king bed' },
    { url: `${IMG_ALLEGRO}/695d61b8adb6a5baa406ba42.webp`, alt: '2025 Tiffin Allegro Open Road 32SA bedroom wardrobe and storage' },
    { url: `${IMG_ALLEGRO}/695d61bec4d45d781a0e2212.webp`, alt: '2025 Tiffin Allegro Open Road 32SA bathroom with porcelain toilet and glass shower' },
    { url: `${IMG_ALLEGRO}/695d61c11fc35eabb2099c72.webp`, alt: '2025 Tiffin Allegro Open Road 32SA full-body paint detail close-up' },
    { url: `${IMG_ALLEGRO}/695d61c78757c7d3260cc903.webp`, alt: '2025 Tiffin Allegro Open Road 32SA interior living room with leather sofa and cockpit' },
    { url: `${IMG_ALLEGRO}/695d61cdab08ed2fa8078bc2.webp`, alt: '2025 Tiffin Allegro Open Road 32SA interior master bedroom with king bed and wardrobe' },
  ],
  tagText: 'Premium',
  totalPhotoCount: 13,

  // Pricing
  currentPrice: 249995,
  originalPrice: 279995,
  monthlyPayment: 2083,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Tiffin Allegro Open Road is a full-size Class A gas motorhome built on the Ford F-53 chassis with a PowerGlide independent front suspension. The 32SA floorplan features dual opposing slides in the living area, creating a remarkably open interior with a king-size bed in the rear. Tiffin\'s reputation for customer service and build quality makes this a standout in the Class A gas segment, and the Open Road line delivers premium features at a more accessible price point than the diesel pushers.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class A' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '34 ft.' },
    { icon: 'weight', label: 'GVWR', value: '22,000 lbs.' },
    { icon: 'slideout', label: 'Slides', value: '2' },
    { icon: 'bed', label: 'Sleeping capacity', value: '6' },
  ],
  vin: '4UZACSDT7SCFT2456',
  daysOnSite: 28,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 235000,
    rangeMax: 295000,
    averagePrice: 265000,
    explanation: 'Based on similar 2024-2025 Tiffin Allegro Open Road models within 500 miles, this listing is priced below the market average. Tiffin Class A gas models hold value well due to strong brand loyalty.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '01/31/26', change: 'Listed', price: 279995 },
      { date: '02/14/26', change: 'Price reduced', price: 259995 },
      { date: '02/21/26', change: 'Price reduced', price: 249995 },
    ],
  },

  // Description
  description: 'New 2025 Tiffin Allegro Open Road 32SA — a premium Class A gas motorhome built on the Ford F-53 chassis with a 7.3L V8 gas engine. The 32SA floorplan delivers an exceptionally spacious interior thanks to dual opposing slideouts in the main living area. The cockpit features leather captain\'s chairs with six-way power adjustment, a large touchscreen infotainment system, and power sun visors. The living room includes a jackknife sofa and booth dinette, both of which convert for additional sleeping. The full galley kitchen features a residential refrigerator, three-burner cooktop, convection microwave, and solid surface countertops with undermount stainless sink. The rear bedroom has a king-size bed with a pillow-top mattress, nightstands with USB charging, and a wardrobe closet. The bathroom features a porcelain toilet, glass-enclosed shower, and lighted vanity. Standard equipment includes full-body paint, Tiffin\'s PowerGlide chassis, dual 15K BTU A/C units, Onan 5500 generator, power patio awning with LED lights, and a JBL sound system.',

  // Loan Calculator
  loanMonthlyPayment: 2083,

  // Dealer
  dealer: {
    name: 'La Mesa RV',
    location: 'Portland, OR',
    address: '9025 SE 82nd Ave, Portland, OR 97266',
    phone: '(503) 555-0188',
    callCode: '6234',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'La Mesa RV is one of the largest and most respected RV dealers in the western United States, with locations across California, Arizona, and the Pacific Northwest. Our Portland location features an extensive inventory of new and pre-owned Class A, B, and C motorhomes from top brands including Tiffin, Winnebago, and Newmar. Full service center and financing on-site.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 10,
  },

  // Navigation context
  resultPosition: 15,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-allegro-01',
      title: '2024 Tiffin Wayfarer 25XPW',
      year: 2024,
      make: 'Tiffin Motorhomes',
      model: 'Wayfarer',
      price: 169995,
      imageUrl: '/images/listings/wayfarer-25xpw/69854b19be24c14a9c0fe562.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
    {
      id: 'sim-allegro-02',
      title: '2025 Thor Palazzo 33.6',
      year: 2025,
      make: 'Thor Motor Coach',
      model: 'Palazzo',
      price: 275000,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'General RV Center',
      location: 'Salt Lake City, UT',
    },
    {
      id: 'sim-allegro-03',
      title: '2024 Newmar Bay Star 3226',
      year: 2024,
      make: 'Newmar',
      model: 'Bay Star',
      price: 259900,
      imageUrl: '/images/listings/chateau-22e/6973707cb1dc7d351104884d.webp',
      dealer: 'Bish\'s RV',
      location: 'Meridian, ID',
    },
    {
      id: 'sim-allegro-04',
      title: '2025 Jayco Eagle 321RSTS',
      year: 2025,
      make: 'Jayco',
      model: 'Eagle',
      price: 69995,
      imageUrl: '/images/listings/eagle-321rsts/699da1a15433d1da0f00bde7.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-allegro-05',
      title: '2020 Airstream Globetrotter 27FB Twin',
      year: 2020,
      make: 'Airstream',
      model: 'Globetrotter',
      price: 99900,
      imageUrl: '/images/listings/globetrotter-27fb/698cc250190b8f51030adb8b.webp',
      dealer: 'Private Seller',
      location: 'Temecula, CA',
    },
    {
      id: 'sim-allegro-06',
      title: '2025 Tiffin Allegro Open Road 36LA',
      year: 2025,
      make: 'Tiffin Motorhomes',
      model: 'Allegro Open Road',
      price: 289995,
      imageUrl: '/images/listings/transit-250-camper/68b394de89a39221e8665022.webp',
      dealer: 'La Mesa RV',
      location: 'Tucson, AZ',
    },
  ],

  // Related categories
  categories: [
    'Class A motorhomes',
    'Tiffin Motorhomes',
    'RVs under $250K',
    'RVs in Oregon',
    'Tiffin Allegro Open Road',
    'New Class A gas',
    'Full-size motorhomes',
  ],

  // Reviews
  reviews: {
    overallRating: 4.5,
    totalReviews: 142,
    distribution: [82, 38, 14, 5, 3],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.5 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-allegro-01',
        title: 'Tiffin quality lives up to the reputation',
        modelYear: '2024 Tiffin Allegro Open Road 32SA',
        rating: 5,
        body: 'This is our third Tiffin and we keep coming back for the build quality and their customer service. The 32SA has a fantastic layout — the dual slides make the living area feel like a small apartment. The king bed is a game changer after years of queens. The PowerGlide chassis rides smoothly on the highway and the 7.3L Ford has plenty of power for mountain passes.',
        author: 'Robert Chambers',
        photoCount: 5,
      },
      {
        id: 'rev-allegro-02',
        title: 'Excellent coach with minor quibbles',
        modelYear: '2023 Tiffin Allegro Open Road 34PA',
        rating: 4,
        body: 'The Allegro Open Road delivers a lot of value for a gas Class A. The fit and finish is better than the competition at this price point. The only downsides are the fuel economy (6-8 mpg) and the gas engine noise compared to our friend\'s diesel pusher. But at $100K less than a comparable diesel, we\'ll take the tradeoff every time.',
        author: 'Linda Pearson',
        photoCount: 2,
      },
    ],
  },

  // Engagement
  viewerCount: 8,
  engagement: {
    isNewlyListed: false,
    listedDate: '28 days ago',
    viewCount: 412,
    saveCount: 67,
  },
};

// ─── Listing 16: Pacific Coachworks Blazen 275BCRXL ─────────────────────────

const IMG_BLAZEN = '/images/listings/blazen-275bcrxl';

export const blazenListing: ListingData = {
  // Vehicle identity
  title: '2025 Pacific Coachworks Blazen 275BCRXL',
  year: 2025,
  make: 'Pacific Coachworks',
  model: 'Blazen',
  trim: '275BCRXL',

  // Location and stock
  stockNumber: 'PC25BZ275',
  location: 'Roseville, CA',

  // Photos
  images: [
    { url: `${IMG_BLAZEN}/69730515e129b6e45000fee3.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL exterior front three-quarter view on dealer lot' },
    { url: `${IMG_BLAZEN}/69857b2b54e565517208b8f6.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL exterior driver side with graphics' },
    { url: `${IMG_BLAZEN}/69857b2c54e565517208b8f7.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL rear ramp door lowered showing garage area' },
    { url: `${IMG_BLAZEN}/69857b2e54e565517208b8fb.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL interior garage with tie-down points' },
    { url: `${IMG_BLAZEN}/69857b2f54e565517208b8fd.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL living area with sofa and kitchen' },
    { url: `${IMG_BLAZEN}/69857b3054e565517208b8fe.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL kitchen galley with stainless appliances' },
    { url: `${IMG_BLAZEN}/69857b3054e565517208b8ff.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL bedroom with queen bed and overhead storage' },
    { url: `${IMG_BLAZEN}/69857b3154e565517208b900.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL bathroom with radius shower' },
    { url: `${IMG_BLAZEN}/69857b3254e565517208b903.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL interior bathroom with frosted glass shower' },
    { url: `${IMG_BLAZEN}/69857b3354e565517208b905.webp`, alt: '2025 Pacific Coachworks Blazen 275BCRXL front pass-through storage compartment' },
  ],
  tagText: 'Toy hauler',
  totalPhotoCount: 10,

  // Pricing
  currentPrice: 54995,
  originalPrice: 64995,
  monthlyPayment: 458,
  dealRating: 'great',

  // AI Summary
  aiSummary: 'The Pacific Coachworks Blazen is a feature-packed toy hauler travel trailer designed for off-road enthusiasts who want to bring their bikes, ATVs, or side-by-sides along for the trip. The 275BCRXL floorplan offers a separate front bedroom, spacious living area, and a 13-foot garage in the rear with a ramp door that doubles as a patio deck. At 33 feet, it balances cargo capacity with livability, making it an excellent choice for families who split their time between the campsite and the trail.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Toy Hauler Travel Trailer' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '33 ft.' },
    { icon: 'weight', label: 'GVWR', value: '10,200 lbs.' },
    { icon: 'slideout', label: 'Slides', value: '1' },
    { icon: 'bed', label: 'Sleeping capacity', value: '6' },
  ],
  vin: '5ZT2PCXB5S4111567',
  daysOnSite: 12,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 52000,
    rangeMax: 68000,
    averagePrice: 59500,
    explanation: 'Based on similar 2024-2025 toy hauler travel trailers within 300 miles, this listing is priced well below the market average. Pacific Coachworks offers strong value compared to larger brands like Heartland or Grand Design.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/16/26', change: 'Listed', price: 64995 },
      { date: '02/24/26', change: 'Price reduced', price: 54995 },
    ],
  },

  // Description
  description: 'New 2025 Pacific Coachworks Blazen 275BCRXL toy hauler travel trailer — the ultimate basecamp for motorsport enthusiasts. The 275BCRXL features a 13-foot rear garage with a heavy-duty ramp door that converts to a patio deck with railing. The garage includes multiple tie-down points, 110V and 12V outlets, and a fuel station for easy refueling. The main living area slides out to reveal a full galley kitchen with stainless steel appliances, solid surface counters, and a farmhouse sink. A large sofa and entertainment center keep everyone comfortable between rides. The private front bedroom features a walk-around queen bed with underbed storage, wardrobe closets, and USB charging at the nightstands. Additional features include a power awning with LED lights, exterior speakers, Bluetooth stereo, solar prep, and a 30-gallon fuel station. Built with a fully welded aluminum frame and Azdel composite walls for superior insulation and durability.',

  // Loan Calculator
  loanMonthlyPayment: 458,

  // Dealer
  dealer: {
    name: 'Camping World',
    location: 'Roseville, CA',
    address: '1039 Orlando Ave, Roseville, CA 95661',
    phone: '(916) 555-0247',
    callCode: '4187',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-6PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Camping World Roseville is Northern California\'s largest RV superstore, featuring hundreds of new and pre-owned RVs from top manufacturers. Our 20-acre facility includes a full-service center, parts store, and accessories showroom. Camping World is America\'s largest retailer of RVs with over 170 locations nationwide.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 15,
  },

  // Navigation context
  resultPosition: 16,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-blazen-01',
      title: '2025 Jayco Eagle 321RSTS',
      year: 2025,
      make: 'Jayco',
      model: 'Eagle',
      price: 69995,
      imageUrl: '/images/listings/eagle-321rsts/699da1a15433d1da0f00bde7.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-blazen-02',
      title: '2024 Thor Chateau 22E',
      year: 2024,
      make: 'Thor',
      model: 'Chateau',
      price: 79999,
      imageUrl: '/images/listings/chateau-22e/6973707cb1dc7d351104884d.webp',
      dealer: 'Camping World',
      location: 'La Mirada, CA',
    },
    {
      id: 'sim-blazen-03',
      title: '2025 Grand Design Momentum 397THS',
      year: 2025,
      make: 'Grand Design',
      model: 'Momentum',
      price: 89995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'General RV Center',
      location: 'Draper, UT',
    },
    {
      id: 'sim-blazen-04',
      title: '2024 Heartland Fuel 322',
      year: 2024,
      make: 'Heartland',
      model: 'Fuel',
      price: 47500,
      imageUrl: '/images/listings/transit-250-camper/68b394de89a39221e8665022.webp',
      dealer: 'Bish\'s RV',
      location: 'Meridian, ID',
    },
    {
      id: 'sim-blazen-05',
      title: '2020 Airstream Globetrotter 27FB Twin',
      year: 2020,
      make: 'Airstream',
      model: 'Globetrotter',
      price: 99900,
      imageUrl: '/images/listings/globetrotter-27fb/698cc250190b8f51030adb8b.webp',
      dealer: 'Private Seller',
      location: 'Temecula, CA',
    },
    {
      id: 'sim-blazen-06',
      title: '2025 Tiffin Allegro Open Road 32SA',
      year: 2025,
      make: 'Tiffin Motorhomes',
      model: 'Allegro Open Road',
      price: 249995,
      imageUrl: '/images/listings/allegro-open-road-32sa/695d6197b5b92c215d071374.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
  ],

  // Related categories
  categories: [
    'Toy hauler travel trailers',
    'Pacific Coachworks RVs',
    'RVs under $60K',
    'RVs in California',
    'Toy haulers with garage',
    'New travel trailers',
    'Bumper-pull toy haulers',
  ],

  // Reviews
  reviews: {
    overallRating: 4.3,
    totalReviews: 36,
    distribution: [18, 12, 4, 1, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4 },
    ],
    reviews: [
      {
        id: 'rev-blazen-01',
        title: 'Best toy hauler for the money',
        modelYear: '2024 Pacific Coachworks Blazen 275BCRXL',
        rating: 4.5,
        body: 'We looked at Heartland, Grand Design, and Keystone toy haulers before settling on the Blazen. Dollar for dollar, Pacific Coachworks gives you more standard features. The garage fits our two dirt bikes with room to spare, and the ramp door patio setup is awesome for hanging out at the track. Build quality is solid — welded aluminum frame and Azdel walls.',
        author: 'Jason Whitfield',
        photoCount: 4,
      },
      {
        id: 'rev-blazen-02',
        title: 'Great layout but watch the weight',
        modelYear: '2024 Pacific Coachworks Blazen 275BCRXL',
        rating: 4,
        body: 'Love the floorplan — the separate bedroom is a must when you\'re camping with kids. The garage swallows our two mountain bikes and all our gear with ease. Just be careful with the cargo capacity — once you load up the fresh water tank and throw in a side-by-side, you\'re close to max GVWR. Plan your payload carefully. Otherwise, outstanding trailer for the price.',
        author: 'Stephanie Reeves',
        photoCount: 1,
      },
    ],
  },

  // Engagement
  viewerCount: 19,
  engagement: {
    isNewlyListed: true,
    listedDate: '12 days ago',
    viewCount: 298,
    saveCount: 52,
  },

  // Tow compatibility
  gvwr: 10200,
  tongueWeight: 1250,
  hitchType: 'bumper-pull',
};

// ─── Listing 17: Jayco Eagle 321RSTS ────────────────────────────────────────

const IMG_EAGLE = '/images/listings/eagle-321rsts';

export const eagleListing: ListingData = {
  // Vehicle identity
  title: '2025 Jayco Eagle 321RSTS',
  year: 2025,
  make: 'Jayco',
  model: 'Eagle',
  trim: '321RSTS',

  // Location and stock
  stockNumber: 'JC25EG321R',
  location: 'Sacramento, CA',

  // Photos
  images: [
    { url: `${IMG_EAGLE}/699da1a15433d1da0f00bde7.webp`, alt: '2025 Jayco Eagle 321RSTS exterior front three-quarter view on dealer lot' },
    { url: `${IMG_EAGLE}/699da1d0195849654d0d9d25.webp`, alt: '2025 Jayco Eagle 321RSTS interior kitchen with white cabinets and gold hardware' },
    { url: `${IMG_EAGLE}/699da1d029ea826c870d0ba7.webp`, alt: '2025 Jayco Eagle 321RSTS interior master bedroom with plaid bedding and wardrobe' },
    { url: `${IMG_EAGLE}/699da1d02b7797156009c72f.webp`, alt: '2025 Jayco Eagle 321RSTS living room with theater seating and fireplace' },
    { url: `${IMG_EAGLE}/699da1d0323d619ed00ed8c7.webp`, alt: '2025 Jayco Eagle 321RSTS kitchen island with farmhouse sink and pendant lights' },
    { url: `${IMG_EAGLE}/699da1d036759cff940a0ac8.webp`, alt: '2025 Jayco Eagle 321RSTS free-standing dinette table and chairs' },
    { url: `${IMG_EAGLE}/699da1d088e22e86000786bc.webp`, alt: '2025 Jayco Eagle 321RSTS rear bedroom with king bed and large windows' },
    { url: `${IMG_EAGLE}/699da1d0e248e25b62025369.webp`, alt: '2025 Jayco Eagle 321RSTS bedroom closet with washer/dryer prep' },
    { url: `${IMG_EAGLE}/699da1d0e90e46a9050bb346.webp`, alt: '2025 Jayco Eagle 321RSTS bathroom with residential shower and skylight' },
    { url: `${IMG_EAGLE}/699da1d0eb9d5efa1907e336.webp`, alt: '2025 Jayco Eagle 321RSTS outdoor kitchen with mini fridge and griddle' },
    { url: `${IMG_EAGLE}/699da1d0ec4e7fb933011fa8.webp`, alt: '2025 Jayco Eagle 321RSTS interior kitchen gas range with range hood' },
  ],
  tagText: 'Popular model',
  totalPhotoCount: 11,

  // Pricing
  currentPrice: 69995,
  originalPrice: 79995,
  monthlyPayment: 583,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Jayco Eagle is a luxury travel trailer that blends residential-style living with thoughtful camping features. The 321RSTS floorplan is one of the most popular in the Eagle lineup, with three slides that create a remarkably spacious interior featuring a rear living room with theater seating and an electric fireplace. Jayco\'s Magnum Truss roof system and Climate Shield insulation package make this a true four-season trailer, and the Eagle\'s fit and finish consistently ranks among the best in the mid-price travel trailer segment.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Travel Trailer' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '37 ft.' },
    { icon: 'weight', label: 'GVWR', value: '10,995 lbs.' },
    { icon: 'slideout', label: 'Slides', value: '3' },
    { icon: 'bed', label: 'Sleeping capacity', value: '6' },
  ],
  vin: '1UJBJ0BN1S1JE1678',
  daysOnSite: 16,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 62000,
    rangeMax: 82000,
    averagePrice: 72000,
    explanation: 'Based on similar 2024-2025 Jayco Eagle models within 300 miles, this listing is priced slightly below the market average. The Eagle line competes directly with Grand Design Reflection and Keystone Cougar, and this unit is well-positioned in that segment.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/12/26', change: 'Listed', price: 79995 },
      { date: '02/22/26', change: 'Price reduced', price: 69995 },
    ],
  },

  // Description
  description: 'New 2025 Jayco Eagle 321RSTS luxury travel trailer — a triple-slide rear living floorplan that delivers residential comfort wherever you camp. The 321RSTS features an impressive rear living room with opposing theater seats, an electric fireplace, and a 50-inch entertainment center. The kitchen boasts a large island with a farmhouse sink, solid surface countertops, pendant lighting, and a residential refrigerator. A free-standing dinette set provides comfortable dining separate from the living area. The private front bedroom has a king-size bed, dual wardrobes, washer/dryer prep, and a dedicated bathroom with a residential-style glass shower. Outside, the outdoor kitchen includes a mini fridge, griddle, and storage — perfect for grilling without heating up the interior. Built with Jayco\'s exclusive Magnum Truss roof system, Stronghold VBL vacuum-bonded lamination, and the Climate Shield insulation package for four-season camping. Also includes solar prep, MORryde StepAbove entry steps, and Jayco\'s industry-leading 2-year limited warranty.',

  // Loan Calculator
  loanMonthlyPayment: 583,

  // Dealer
  dealer: {
    name: 'Fun Town RV',
    location: 'Sacramento, CA',
    address: '3000 Fulton Ave, Sacramento, CA 95821',
    phone: '(916) 555-0188',
    callCode: '3042',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Fun Town RV is one of the nation\'s largest RV dealers with locations across the country. Our Sacramento location features over 500 units on display, a full-service center, and a dedicated finance team to help you find the right payment plan. We carry all major brands including Jayco, Forest River, Thor, Keystone, and Grand Design.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 8,
  },

  // Navigation context
  resultPosition: 17,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-eagle-01',
      title: '2025 Pacific Coachworks Blazen 275BCRXL',
      year: 2025,
      make: 'Pacific Coachworks',
      model: 'Blazen',
      price: 54995,
      imageUrl: '/images/listings/blazen-275bcrxl/69730515e129b6e45000fee3.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-eagle-02',
      title: '2020 Airstream Globetrotter 27FB Twin',
      year: 2020,
      make: 'Airstream',
      model: 'Globetrotter',
      price: 99900,
      imageUrl: '/images/listings/globetrotter-27fb/698cc250190b8f51030adb8b.webp',
      dealer: 'Private Seller',
      location: 'Temecula, CA',
    },
    {
      id: 'sim-eagle-03',
      title: '2025 Grand Design Reflection 315RLTS',
      year: 2025,
      make: 'Grand Design',
      model: 'Reflection',
      price: 72500,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'General RV Center',
      location: 'Draper, UT',
    },
    {
      id: 'sim-eagle-04',
      title: '2025 Keystone Cougar 32RLI',
      year: 2025,
      make: 'Keystone',
      model: 'Cougar',
      price: 64900,
      imageUrl: '/images/listings/chateau-22e/6973707cb1dc7d351104884d.webp',
      dealer: 'Camping World',
      location: 'Fresno, CA',
    },
    {
      id: 'sim-eagle-05',
      title: '2025 Tiffin Allegro Open Road 32SA',
      year: 2025,
      make: 'Tiffin Motorhomes',
      model: 'Allegro Open Road',
      price: 249995,
      imageUrl: '/images/listings/allegro-open-road-32sa/695d6197b5b92c215d071374.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
    {
      id: 'sim-eagle-06',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
  ],

  // Related categories
  categories: [
    'Travel trailers',
    'Jayco RVs',
    'RVs under $70K',
    'RVs in California',
    'Jayco Eagle',
    'New travel trailers',
    'Luxury travel trailers',
  ],

  // Reviews
  reviews: {
    overallRating: 4.4,
    totalReviews: 218,
    distribution: [118, 64, 24, 8, 4],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.5 },
      { icon: 'tag', label: 'Cost of ownership', score: 4 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-eagle-01',
        title: 'Feels like a fifth wheel without the truck',
        modelYear: '2024 Jayco Eagle 321RSTS',
        rating: 5,
        body: 'We chose the Eagle over a fifth wheel because we didn\'t want to give up our truck bed, and we\'re so glad we did. The triple slides create an unbelievable amount of space — our friends can\'t believe it\'s a travel trailer when they walk inside. The rear living room with the fireplace and theater seats is where we spend every evening. Kitchen is top notch with the island layout. Jayco\'s warranty is the cherry on top.',
        author: 'Dennis Nakamura',
        photoCount: 6,
      },
      {
        id: 'rev-eagle-02',
        title: 'Premium quality, tows well with a 3/4 ton',
        modelYear: '2025 Jayco Eagle 321RSTS',
        rating: 4,
        body: 'Towing with a Ram 2500 diesel and it handles the Eagle beautifully. At 37 feet it\'s a big trailer, but the weight distribution hitch and sway control make it manageable. Interior quality is excellent — the solid surface counters, pendant lights, and farmhouse sink give it a residential feel. Only knock is that with three slides out, the trailer is nearly impossible to use if you can\'t extend them (tight campsites). Plan accordingly.',
        author: 'Patricia Okoye',
        photoCount: 3,
      },
    ],
  },

  // Engagement
  viewerCount: 22,
  engagement: {
    isNewlyListed: true,
    listedDate: '16 days ago',
    viewCount: 534,
    saveCount: 89,
  },

  // Tow compatibility
  gvwr: 10995,
  tongueWeight: 1095,
  hitchType: 'bumper-pull',
};

// ─── Listing 18: Tiffin Wayfarer 25XPW ──────────────────────────────────────

const IMG_WAYFARER = '/images/listings/wayfarer-25xpw';

export const wayfarerListing: ListingData = {
  // Vehicle identity
  title: '2024 Tiffin Wayfarer 25XPW',
  year: 2024,
  make: 'Tiffin Motorhomes',
  model: 'Wayfarer',
  trim: '25XPW',

  // Location and stock
  stockNumber: 'TM24WF25XPW',
  location: 'Portland, OR',

  // Photos
  images: [
    { url: `${IMG_WAYFARER}/69854b19be24c14a9c0fe562.webp`, alt: '2024 Tiffin Wayfarer 25XPW exterior front three-quarter view showing Mercedes Sprinter chassis' },
    { url: `${IMG_WAYFARER}/69854b1b68837b015e04e152.webp`, alt: '2024 Tiffin Wayfarer 25XPW exterior driver side with power awning' },
    { url: `${IMG_WAYFARER}/69854b1bef8f487121032bd2.webp`, alt: '2024 Tiffin Wayfarer 25XPW exterior rear showing bike rack and spare tire' },
    { url: `${IMG_WAYFARER}/69854b1cf8164f21b60b87a2.webp`, alt: '2024 Tiffin Wayfarer 25XPW cockpit with Mercedes-Benz dash and leather seats' },
    { url: `${IMG_WAYFARER}/69854b1db4e5f79c3f0df692.webp`, alt: '2024 Tiffin Wayfarer 25XPW interior living area with Murphy bed stowed' },
    { url: `${IMG_WAYFARER}/69854b1df3da9323090a2412.webp`, alt: '2024 Tiffin Wayfarer 25XPW galley kitchen with solid surface counters' },
    { url: `${IMG_WAYFARER}/69854b2068065e7a1e00e882.webp`, alt: '2024 Tiffin Wayfarer 25XPW Murphy bed deployed showing queen mattress' },
    { url: `${IMG_WAYFARER}/69854b20f39e71419a0a8782.webp`, alt: '2024 Tiffin Wayfarer 25XPW wet bath with shower, toilet, and vanity' },
    { url: `${IMG_WAYFARER}/69854b216c9a0b4a500daeb2.webp`, alt: '2024 Tiffin Wayfarer 25XPW rear storage area with expandable flex space' },
    { url: `${IMG_WAYFARER}/69854b22ad21f330bf014862.webp`, alt: '2024 Tiffin Wayfarer 25XPW interior cab and living area with murphy bed stowed' },
    { url: `${IMG_WAYFARER}/69854b23a8f45bee500cb232.webp`, alt: '2024 Tiffin Wayfarer 25XPW roof-mounted solar panel and AC unit' },
    { url: `${IMG_WAYFARER}/69854b245d8a7a9f54038ef2.webp`, alt: '2024 Tiffin Wayfarer 25XPW interior overhead cabinetry and LED lighting' },
    { url: `${IMG_WAYFARER}/69854b26ed42609eed0d4a52.webp`, alt: '2024 Tiffin Wayfarer 25XPW Mercedes-Benz 3.0L turbo diesel engine badge' },
  ],
  tagText: 'Mercedes diesel',
  totalPhotoCount: 13,

  // Pricing
  currentPrice: 169995,
  originalPrice: 189995,
  monthlyPayment: 1417,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Tiffin Wayfarer is a premium Class C motorhome built on the Mercedes-Benz Sprinter 3500 chassis with a 3.0L V6 turbo diesel engine. The 25XPW floorplan features a Murphy bed/sofa combo and a versatile rear flex space, all within a nimble 25-foot package. Tiffin\'s build quality shines through in the Wayfarer with solid surface countertops, soft-close cabinetry, and Mercedes-Benz driving dynamics that make this feel more like a luxury SUV than a motorhome.',

  // Vehicle History
  vhrAvailable: false,
  vhrHighlights: [],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class C' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '25 ft.' },
    { icon: 'weight', label: 'GVWR', value: '11,030 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: 'WDAPF4CC4SP700789',
  daysOnSite: 22,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 160000,
    rangeMax: 199000,
    averagePrice: 179000,
    explanation: 'Based on similar 2023-2024 Tiffin Wayfarer models within 500 miles, this listing is priced below the market average. Mercedes Sprinter-based Class C motorhomes hold value exceptionally well due to the diesel drivetrain and Tiffin brand reputation.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/06/26', change: 'Listed', price: 189995 },
      { date: '02/18/26', change: 'Price reduced', price: 179995 },
      { date: '02/25/26', change: 'Price reduced', price: 169995 },
    ],
  },

  // Description
  description: 'New 2024 Tiffin Wayfarer 25XPW — a premium Class C motorhome on the Mercedes-Benz Sprinter 3500 chassis powered by a 3.0L V6 turbo diesel engine with a 7-speed automatic transmission. The Wayfarer 25XPW features a clever Murphy bed/sofa combination that provides a comfortable living area during the day and a queen bed at night. The rear flex space can be configured as additional sleeping, a workshop, or cargo area. The full galley kitchen includes solid surface countertops, a two-burner induction cooktop, convection microwave, and a 6-cubic-foot refrigerator. The wet bath features a residential-height toilet, vanity with storage, and a powered exhaust fan. Standard equipment includes a 200W solar panel, 3,600W Onan diesel generator, MBUX infotainment system with navigation, lane-keeping assist, adaptive cruise control, and a 15,000 BTU rooftop A/C. Tiffin\'s legendary customer support and the Sprinter platform\'s reliability make this an outstanding choice for couples who value driving experience and build quality.',

  // Loan Calculator
  loanMonthlyPayment: 1417,

  // Dealer
  dealer: {
    name: 'La Mesa RV',
    location: 'Portland, OR',
    address: '9025 SE 82nd Ave, Portland, OR 97266',
    phone: '(503) 555-0188',
    callCode: '6234',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'La Mesa RV is one of the largest and most respected RV dealers in the western United States, with locations across California, Arizona, and the Pacific Northwest. Our Portland location features an extensive inventory of new and pre-owned Class A, B, and C motorhomes from top brands including Tiffin, Winnebago, and Newmar. Full service center and financing on-site.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 10,
  },

  // Navigation context
  resultPosition: 18,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-wayfarer-01',
      title: '2025 Tiffin Allegro Open Road 32SA',
      year: 2025,
      make: 'Tiffin Motorhomes',
      model: 'Allegro Open Road',
      price: 249995,
      imageUrl: '/images/listings/allegro-open-road-32sa/695d6197b5b92c215d071374.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
    {
      id: 'sim-wayfarer-02',
      title: '2018 Ford Transit 250',
      year: 2018,
      make: 'Ford',
      model: 'Transit',
      price: 77500,
      imageUrl: '/images/listings/transit-250-camper/68b394de89a39221e8665022.webp',
      dealer: 'San Diego Custom Vans',
      location: 'San Diego, CA',
    },
    {
      id: 'sim-wayfarer-03',
      title: '2024 Winnebago View 24V',
      year: 2024,
      make: 'Winnebago',
      model: 'View',
      price: 185000,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'General RV Center',
      location: 'Salt Lake City, UT',
    },
    {
      id: 'sim-wayfarer-04',
      title: '2024 Thor Chateau 22E',
      year: 2024,
      make: 'Thor',
      model: 'Chateau',
      price: 79999,
      imageUrl: '/images/listings/chateau-22e/6973707cb1dc7d351104884d.webp',
      dealer: 'Camping World',
      location: 'La Mirada, CA',
    },
    {
      id: 'sim-wayfarer-05',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-wayfarer-06',
      title: '2020 Airstream Globetrotter 27FB Twin',
      year: 2020,
      make: 'Airstream',
      model: 'Globetrotter',
      price: 99900,
      imageUrl: '/images/listings/globetrotter-27fb/698cc250190b8f51030adb8b.webp',
      dealer: 'Private Seller',
      location: 'Temecula, CA',
    },
  ],

  // Related categories
  categories: [
    'Class C motorhomes',
    'Tiffin Motorhomes',
    'RVs under $175K',
    'RVs in Oregon',
    'Tiffin Wayfarer',
    'Mercedes Sprinter RVs',
    'Diesel Class C',
  ],

  // Reviews
  reviews: {
    overallRating: 4.6,
    totalReviews: 94,
    distribution: [56, 26, 8, 3, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-wayfarer-01',
        title: 'The Mercedes platform changes everything',
        modelYear: '2023 Tiffin Wayfarer 25RW',
        rating: 5,
        body: 'After driving Ford-chassis Class C\'s for a decade, the Sprinter platform is a revelation. The turbo diesel has plenty of power, the ride quality is car-like, and the fuel economy is nearly double what we got in our old rig. The Wayfarer is built to Tiffin\'s usual high standard — the cabinets are solid wood, the counters are beautiful, and everything fits together properly. It\'s a lot of money, but you can feel where it went.',
        author: 'William Ashworth',
        photoCount: 4,
      },
      {
        id: 'rev-wayfarer-02',
        title: 'Perfect for two, tight for more',
        modelYear: '2024 Tiffin Wayfarer 25XPW',
        rating: 4,
        body: 'My wife and I absolutely love our Wayfarer for weekend getaways and week-long trips. The Murphy bed is clever and easy to deploy, the kitchen is functional, and the driving experience is outstanding. However, the wet bath takes getting used to, and with only 25 feet of length, there\'s limited storage. We had to learn to pack light. If it\'s just the two of you, it\'s fantastic. For a family, look at something bigger.',
        author: 'Diane Kemp',
        photoCount: 2,
      },
    ],
  },

  // Engagement
  viewerCount: 11,
  engagement: {
    isNewlyListed: false,
    listedDate: '22 days ago',
    viewCount: 367,
    saveCount: 58,
  },
};

// ─── Listing 19: Airstream Globetrotter 27FB Twin ───────────────────────────

const IMG_GLOBETROTTER = '/images/listings/globetrotter-27fb';

export const globetrotterListing: ListingData = {
  // Vehicle identity
  title: '2020 Airstream Globetrotter 27FB Twin',
  year: 2020,
  make: 'Airstream',
  model: 'Globetrotter',
  trim: '27FB Twin',

  // Location and stock
  stockNumber: 'AS20GT27FBT',
  location: 'Temecula, CA',

  // Photos
  images: [
    { url: `${IMG_GLOBETROTTER}/698cc250190b8f51030adb8b.webp`, alt: '2020 Airstream Globetrotter 27FB Twin exterior front three-quarter view showing signature aluminum body' },
    { url: `${IMG_GLOBETROTTER}/698cc2542b27caf1bc056458.webp`, alt: '2020 Airstream Globetrotter 27FB Twin interior dinette kitchen with blue bench seating' },
    { url: `${IMG_GLOBETROTTER}/698cc2546d1a64a14002ee47.webp`, alt: '2020 Airstream Globetrotter 27FB Twin interior kitchen area with TV and blue upholstery' },
    { url: `${IMG_GLOBETROTTER}/698cc25477810351d60ff4a6.webp`, alt: '2020 Airstream Globetrotter 27FB Twin interior living area with European-inspired cabinetry' },
    { url: `${IMG_GLOBETROTTER}/698cc254b884a885310e6a93.webp`, alt: '2020 Airstream Globetrotter 27FB Twin kitchen with Corian counters and panoramic windows' },
    { url: `${IMG_GLOBETROTTER}/698cc254dffbadc6f2035786.webp`, alt: '2020 Airstream Globetrotter 27FB Twin twin bed configuration in rear' },
    { url: `${IMG_GLOBETROTTER}/698cc254ea0194d9b20dcaa3.webp`, alt: '2020 Airstream Globetrotter 27FB Twin bathroom with porcelain toilet and shower' },
    { url: `${IMG_GLOBETROTTER}/698cc2554de6b7c96a0e35d5.webp`, alt: '2020 Airstream Globetrotter 27FB Twin front lounge area with convertible sofa' },
    { url: `${IMG_GLOBETROTTER}/698cc255a00ef542dd06d952.webp`, alt: '2020 Airstream Globetrotter 27FB Twin overhead storage and reading lights' },
    { url: `${IMG_GLOBETROTTER}/698cc25636fa28f0cc0143f2.webp`, alt: '2020 Airstream Globetrotter 27FB Twin interior rear bedroom with twin beds' },
  ],
  tagText: 'Premium Airstream',
  totalPhotoCount: 10,

  // Pricing
  currentPrice: 99900,
  originalPrice: 119900,
  monthlyPayment: 833,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Airstream Globetrotter is a luxury travel trailer that combines Airstream\'s iconic aluminum construction with a European-inspired interior design. The 27FB Twin floorplan features twin beds in the rear — a rare and practical configuration popular with friends or family who prefer separate sleeping. With no slides and a riveted aluminum monocoque shell, the Globetrotter is lighter, more aerodynamic, and more durable than fiberglass competitors, though at a premium price point that reflects Airstream\'s legendary resale value.',

  // Vehicle History
  vhrAvailable: true,
  vhrHighlights: [
    'No reported accidents or damage',
    'Single owner since new',
    'All service records available',
    'Stored indoors when not in use',
  ],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Travel Trailer' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '27 ft.' },
    { icon: 'weight', label: 'GVWR', value: '8,800 lbs.' },
    { icon: 'slideout', label: 'Slides', value: '0' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
  ],
  vin: '1STCFYF27LJ800890',
  daysOnSite: 40,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 85000,
    rangeMax: 125000,
    averagePrice: 105000,
    explanation: 'Based on similar 2019-2021 Airstream Globetrotter models within 500 miles, this listing is priced slightly below the market average. Airstreams are known for exceptional resale value — a 2020 model retaining over 65% of its original MSRP is typical for the brand.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '01/19/26', change: 'Listed', price: 119900 },
      { date: '02/02/26', change: 'Price reduced', price: 109900 },
      { date: '02/16/26', change: 'Price reduced', price: 99900 },
    ],
  },

  // Description
  description: 'Pre-owned 2020 Airstream Globetrotter 27FB Twin in excellent condition — single owner, stored indoors, with full service history. The Globetrotter is Airstream\'s European-inspired luxury travel trailer featuring a clean, contemporary interior design by award-winning German studio, Halo Design. The 27FB Twin floorplan offers twin beds in the rear (which can be converted to a king with a filler cushion), a mid-coach bathroom with separate shower, a full galley with Corian solid surface counters and stainless appliances, and a front convertible dinette/lounge area. The iconic hand-riveted aluminum shell means no delamination, no wood rot, and a trailer that\'s lighter and more aerodynamic than comparably sized fiberglass trailers. Features include a Smart Control system for monitoring tanks and climate, a Bose Bluetooth sound system, power stabilizer jacks, power awning, 300W solar with lithium battery prep, and Airstream\'s signature panoramic windows that flood the interior with natural light. This is a rare twin bed configuration that\'s no longer available in the current Globetrotter lineup.',

  // Loan Calculator
  loanMonthlyPayment: 833,

  // Dealer
  dealer: {
    name: 'Private Seller',
    location: 'Temecula, CA',
    address: 'Temecula, CA',
    phone: '(951) 555-0134',
    callCode: '',
    hours: 'By appointment',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Private individual selling a well-maintained Airstream Globetrotter. All service records available for review. Viewings by appointment in Temecula, CA.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 1,
  },

  // Navigation context
  resultPosition: 19,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-globe-01',
      title: '2025 Jayco Eagle 321RSTS',
      year: 2025,
      make: 'Jayco',
      model: 'Eagle',
      price: 69995,
      imageUrl: '/images/listings/eagle-321rsts/699da1a15433d1da0f00bde7.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-globe-02',
      title: '2025 Pacific Coachworks Blazen 275BCRXL',
      year: 2025,
      make: 'Pacific Coachworks',
      model: 'Blazen',
      price: 54995,
      imageUrl: '/images/listings/blazen-275bcrxl/69730515e129b6e45000fee3.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-globe-03',
      title: '2022 Airstream International 25FB',
      year: 2022,
      make: 'Airstream',
      model: 'International',
      price: 89900,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Airstream of Scottsdale',
      location: 'Scottsdale, AZ',
    },
    {
      id: 'sim-globe-04',
      title: '2021 Airstream Classic 33FB',
      year: 2021,
      make: 'Airstream',
      model: 'Classic',
      price: 145000,
      imageUrl: '/images/listings/allegro-open-road-32sa/695d6197b5b92c215d071374.webp',
      dealer: 'Colonial Airstream',
      location: 'Lakewood, NJ',
    },
    {
      id: 'sim-globe-05',
      title: '2024 Thor Chateau 22E',
      year: 2024,
      make: 'Thor',
      model: 'Chateau',
      price: 79999,
      imageUrl: '/images/listings/chateau-22e/6973707cb1dc7d351104884d.webp',
      dealer: 'Camping World',
      location: 'La Mirada, CA',
    },
    {
      id: 'sim-globe-06',
      title: '2024 Tiffin Wayfarer 25XPW',
      year: 2024,
      make: 'Tiffin Motorhomes',
      model: 'Wayfarer',
      price: 169995,
      imageUrl: '/images/listings/wayfarer-25xpw/69854b19be24c14a9c0fe562.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
  ],

  // Related categories
  categories: [
    'Travel trailers',
    'Airstream RVs',
    'RVs under $100K',
    'RVs in California',
    'Airstream Globetrotter',
    'Used travel trailers',
    'Luxury travel trailers',
  ],

  // Reviews
  reviews: {
    overallRating: 4.7,
    totalReviews: 64,
    distribution: [42, 14, 5, 2, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5 },
      { icon: 'tag', label: 'Cost of ownership', score: 3 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-globe-01',
        title: 'Worth every penny — still looks new after 5 years',
        modelYear: '2019 Airstream Globetrotter 27FB',
        rating: 5,
        body: 'We\'ve owned our Globetrotter for over five years and it still looks showroom-new. No delamination worries, no roof leaks, no structural issues. The aluminum body is bombproof. The European interior design is gorgeous and timeless — other RVs look dated after a few years, but the Globetrotter still turns heads at every campground. Yes, it cost twice what a comparable Grand Design would have, but it\'s also held its value incredibly well.',
        author: 'Margaret Sullivan',
        photoCount: 8,
      },
      {
        id: 'rev-globe-02',
        title: 'Beautiful trailer with a learning curve',
        modelYear: '2020 Airstream Globetrotter 23FB',
        rating: 4,
        body: 'The Globetrotter is a stunning trailer and the build quality is top-tier. However, the no-slide design means the interior is narrower than what most people expect at this price. Storage is limited compared to a slide-out trailer. The Smart Control system can be finicky. And the curved walls make it harder to hang things or install aftermarket accessories. That said, towing it is a dream — the aerodynamic shape means less sway, better fuel economy, and it just feels planted on the highway.',
        author: 'Carlos Mendoza',
        photoCount: 3,
      },
    ],
  },

  // Engagement
  viewerCount: 6,
  engagement: {
    isNewlyListed: false,
    listedDate: '40 days ago',
    viewCount: 589,
    saveCount: 112,
  },

  // Tow compatibility
  gvwr: 8800,
  tongueWeight: 880,
  hitchType: 'bumper-pull',
};

// ─── Listing 20: Ford Transit 250 Camper ────────────────────────────────────

const IMG_TRANSIT = '/images/listings/transit-250-camper';

export const transitListing: ListingData = {
  // Vehicle identity
  title: '2018 Ford Transit 250',
  year: 2018,
  make: 'Ford',
  model: 'Transit',
  trim: '250',

  // Location and stock
  stockNumber: 'FD18TR250',
  location: 'San Diego, CA',

  // Photos
  images: [
    { url: `${IMG_TRANSIT}/68b394de89a39221e8665022.webp`, alt: '2018 Ford Transit 250 custom camper van exterior front three-quarter view' },
    { url: `${IMG_TRANSIT}/68b3a2eb02a6bd278b2d235b.webp`, alt: '2018 Ford Transit 250 camper van exterior driver side showing raised roof' },
    { url: `${IMG_TRANSIT}/68b3a2ec759b2731d076b498.webp`, alt: '2018 Ford Transit 250 camper van rear doors open showing interior layout' },
    { url: `${IMG_TRANSIT}/68b3a2ec75ab403f5075dc29.webp`, alt: '2018 Ford Transit 250 camper van interior bed platform and storage' },
    { url: `${IMG_TRANSIT}/68b3a2ec7c89aa6a8f756f07.webp`, alt: '2018 Ford Transit 250 camper van galley kitchen with sink and burner' },
    { url: `${IMG_TRANSIT}/68b3a2ec8daf09711335ecff.webp`, alt: '2018 Ford Transit 250 camper van interior living area with bench seating' },
    { url: `${IMG_TRANSIT}/68b3a2efab03a34711394d90.webp`, alt: '2018 Ford Transit 250 camper van solar panel array on roof' },
    { url: `${IMG_TRANSIT}/68b3b6c7b3ef3c682843a5ae.webp`, alt: '2018 Ford Transit 250 camper van electrical system and lithium battery bank' },
    { url: `${IMG_TRANSIT}/68b3e3bf33aed1313629f6b2.webp`, alt: '2018 Ford Transit 250 camper van exterior campsite setup with side awning' },
  ],
  tagText: 'Custom van',
  totalPhotoCount: 9,

  // Pricing
  currentPrice: 77500,
  originalPrice: 82000,
  monthlyPayment: 646,
  dealRating: 'fair',

  // AI Summary
  aiSummary: 'This professionally converted Ford Transit 250 is a turnkey camper van ready for adventure. The high-roof Transit provides full standing headroom inside, and the custom build includes a fixed bed platform, galley kitchen, and a robust off-grid electrical system with solar and lithium batteries. While it lacks the amenities of a factory-built Class B, the custom build quality and lower price point make converted vans an increasingly popular choice for adventure-focused buyers who prioritize mobility and stealth camping capability.',

  // Vehicle History
  vhrAvailable: true,
  vhrHighlights: [
    'No reported accidents or damage',
    'Two previous owners',
    'Professional camper conversion in 2021',
    'Regular maintenance at Ford dealer',
  ],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class B' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '20 ft.' },
    { icon: 'weight', label: 'GVWR', value: '9,500 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '2' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: '1FTYR2CM4JKA91901',
  daysOnSite: 45,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 65000,
    rangeMax: 95000,
    averagePrice: 80000,
    explanation: 'Pricing for custom camper van conversions varies widely based on build quality, components, and brand recognition. This listing is priced near the market average for a 2018 Transit with a professional conversion. Factory-built Class B vans from Winnebago or Pleasure-Way with similar features typically cost $120K-$150K new.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '01/14/26', change: 'Listed', price: 82000 },
      { date: '02/08/26', change: 'Price reduced', price: 77500 },
    ],
  },

  // Description
  description: 'Professionally converted 2018 Ford Transit 250 high-roof camper van — a fully self-contained adventure vehicle built by a San Diego-based conversion shop. The build features a fixed queen-size bed platform with ample under-bed storage, a compact galley kitchen with a stainless steel sink, two-burner propane cooktop, and a 12V compressor refrigerator. The off-grid electrical system is built for extended boondocking with a 400W solar panel array, 200Ah lithium iron phosphate battery bank, 2000W pure sine wave inverter, and a 30A shore power hookup for campground stays. The van retains the Ford Transit\'s reliable 3.7L V6 gas engine with 68,000 miles. Interior features include luxury vinyl plank flooring, pine tongue-and-groove ceiling, LED lighting, a MaxxAir fan for ventilation, and a portable toilet setup. The exterior includes a Fiamma F45s awning, aluminum roof rack, and aftermarket running boards. Clean title, no accidents, regularly maintained at the Ford dealer.',

  // Loan Calculator
  loanMonthlyPayment: 646,

  // Dealer
  dealer: {
    name: 'San Diego Custom Vans',
    location: 'San Diego, CA',
    address: 'San Diego, CA',
    phone: '(619) 555-0193',
    callCode: '',
    hours: 'By appointment',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'San Diego Custom Vans specializes in professional Ford Transit and Mercedes Sprinter camper van conversions. Each build is custom-tailored to the owner\'s needs with high-quality components and meticulous craftsmanship. We also sell pre-built conversion vans that are ready to hit the road.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 3,
  },

  // Navigation context
  resultPosition: 20,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-transit-01',
      title: '2024 Tiffin Wayfarer 25XPW',
      year: 2024,
      make: 'Tiffin Motorhomes',
      model: 'Wayfarer',
      price: 169995,
      imageUrl: '/images/listings/wayfarer-25xpw/69854b19be24c14a9c0fe562.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
    {
      id: 'sim-transit-02',
      title: '2020 Airstream Globetrotter 27FB Twin',
      year: 2020,
      make: 'Airstream',
      model: 'Globetrotter',
      price: 99900,
      imageUrl: '/images/listings/globetrotter-27fb/698cc250190b8f51030adb8b.webp',
      dealer: 'Private Seller',
      location: 'Temecula, CA',
    },
    {
      id: 'sim-transit-03',
      title: '2024 Thor Chateau 22E',
      year: 2024,
      make: 'Thor',
      model: 'Chateau',
      price: 79999,
      imageUrl: '/images/listings/chateau-22e/6973707cb1dc7d351104884d.webp',
      dealer: 'Camping World',
      location: 'La Mirada, CA',
    },
    {
      id: 'sim-transit-04',
      title: '2022 Winnebago Solis 59PX',
      year: 2022,
      make: 'Winnebago',
      model: 'Solis',
      price: 115000,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'La Mesa RV',
      location: 'Tucson, AZ',
    },
    {
      id: 'sim-transit-05',
      title: '2025 Tiffin Allegro Open Road 32SA',
      year: 2025,
      make: 'Tiffin Motorhomes',
      model: 'Allegro Open Road',
      price: 249995,
      imageUrl: '/images/listings/allegro-open-road-32sa/695d6197b5b92c215d071374.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
    {
      id: 'sim-transit-06',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
  ],

  // Related categories
  categories: [
    'Class B camper vans',
    'Ford Transit conversions',
    'RVs under $80K',
    'RVs in California',
    'Custom van conversions',
    'Used camper vans',
    'Off-grid RVs',
  ],

  // Reviews
  reviews: {
    overallRating: 4.1,
    totalReviews: 28,
    distribution: [12, 10, 4, 1, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 3.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 3.5 },
    ],
    reviews: [
      {
        id: 'rev-transit-01',
        title: 'Freedom on four wheels',
        modelYear: '2019 Ford Transit 250 Conversion',
        rating: 4.5,
        body: 'After renting Class C motorhomes for years, we went the van life route and couldn\'t be happier. The Transit drives like a big truck — which it is — but you can park it anywhere, fit in a regular parking spot, and stealth camp when you need to. The solar and lithium setup means we can boondock for a week without worrying about power. It\'s not for everyone, but if you value mobility and simplicity over space, a converted Transit is hard to beat.',
        author: 'Tyler Rodriguez',
        photoCount: 6,
      },
      {
        id: 'rev-transit-02',
        title: 'Good build but know the tradeoffs',
        modelYear: '2018 Ford Transit 350 Conversion',
        rating: 3.5,
        body: 'We bought our converted Transit from a local builder and the workmanship is excellent. However, living in 60 square feet is a big adjustment if you\'re coming from a traditional RV. There\'s no bathroom (just a portable), the kitchen is tiny, and temperature control is challenging in extreme weather. The Ford drivetrain is reliable and parts are cheap. Just go in with realistic expectations about what van life actually means day-to-day.',
        author: 'Amanda Chen',
        photoCount: 2,
      },
    ],
  },

  // Engagement
  viewerCount: 4,
  engagement: {
    isNewlyListed: false,
    listedDate: '45 days ago',
    viewCount: 423,
    saveCount: 78,
  },
};

// ─── Listing 21: Thor Chateau 22E ───────────────────────────────────────────

const IMG_CHATEAU = '/images/listings/chateau-22e';

export const chateauListing: ListingData = {
  // Vehicle identity
  title: '2024 Thor Chateau 22E',
  year: 2024,
  make: 'Thor',
  model: 'Chateau',
  trim: '22E',

  // Location and stock
  stockNumber: 'TH24CH22E',
  location: 'La Mirada, CA',

  // Photos
  images: [
    { url: `${IMG_CHATEAU}/6973707cb1dc7d351104884d.webp`, alt: '2024 Thor Chateau 22E exterior front three-quarter view on dealer lot' },
    { url: `${IMG_CHATEAU}/698f1c166b5b592f97696d69.webp`, alt: '2024 Thor Chateau 22E interior kitchen dinette with marble counters and booth seating' },
    { url: `${IMG_CHATEAU}/698f1c176b5b592f97696d6a.webp`, alt: '2024 Thor Chateau 22E interior dinette booth close-up with marble table' },
    { url: `${IMG_CHATEAU}/698f1c176b5b592f97696d6b.webp`, alt: '2024 Thor Chateau 22E cockpit with Ford dash and swivel captain chairs' },
    { url: `${IMG_CHATEAU}/698f1c186b5b592f97696d6c.webp`, alt: '2024 Thor Chateau 22E interior living area and overcab sleeping bunk' },
    { url: `${IMG_CHATEAU}/698f1c186b5b592f97696d6d.webp`, alt: '2024 Thor Chateau 22E kitchen with three-burner stove and microwave' },
    { url: `${IMG_CHATEAU}/698f1c196b5b592f97696d6e.webp`, alt: '2024 Thor Chateau 22E rear corner bed with privacy curtain' },
    { url: `${IMG_CHATEAU}/698f1c196b5b592f97696d6f.webp`, alt: '2024 Thor Chateau 22E bathroom with toilet, vanity, and shower' },
    { url: `${IMG_CHATEAU}/698f1c1d6b5b592f97696d73.webp`, alt: '2024 Thor Chateau 22E interior kitchen with microwave stove and oven' },
  ],
  tagText: 'Low miles',
  totalPhotoCount: 9,

  // Pricing
  currentPrice: 79999,
  originalPrice: 89995,
  monthlyPayment: 667,
  dealRating: 'good',

  // AI Summary
  aiSummary: 'The Thor Chateau is one of the best-selling Class C motorhome lines in North America, and the 22E is the most compact floorplan in the lineup. Built on the Ford E-450 chassis with the 7.3L V8, the 22E packs a full bathroom, kitchen, and sleeping for five into just 24 feet. This low-mileage 2024 model offers a near-new experience at a significant discount from the original sticker price, making it an excellent value for buyers who want the convenience of a factory-built motorhome without the new-unit price tag.',

  // Vehicle History
  vhrAvailable: true,
  vhrHighlights: [
    'No reported accidents or damage',
    'Single owner — purchased from dealer in 2024',
    'Under 5,000 miles on odometer',
    'All factory warranties transferable',
  ],

  // Negotiation
  isNegotiable: true,

  // Features and Specs
  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class C' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '24 ft.' },
    { icon: 'weight', label: 'GVWR', value: '12,500 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '5' },
    { icon: 'snowflake', label: 'Air conditioners', value: '1' },
  ],
  vin: '4UZABRFT3SCCH2012',
  daysOnSite: 18,

  // Price Analysis
  priceAnalysis: {
    rangeMin: 72000,
    rangeMax: 92000,
    averagePrice: 82000,
    explanation: 'Based on similar 2023-2024 Thor Chateau models within 300 miles, this listing is priced slightly below the market average. Low-mileage used Class C motorhomes in the sub-25-foot segment are in high demand, and this unit\'s near-new condition commands a premium.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/10/26', change: 'Listed', price: 89995 },
      { date: '02/20/26', change: 'Price reduced', price: 79999 },
    ],
  },

  // Description
  description: 'Low-mileage 2024 Thor Chateau 22E Class C motorhome with under 5,000 miles — essentially new condition at a used price. Built on the proven Ford E-450 chassis with the 7.3L V8 gas engine and 6-speed automatic transmission. The 22E is Thor\'s most compact Chateau floorplan at just 24 feet, making it easy to drive, park, and maneuver in tight campgrounds. The interior features a rear corner bed, a full dry bath with shower, toilet, and vanity, a functional kitchen with a three-burner range, microwave, and refrigerator, and a spacious overcab sleeping bunk. Dual swivel captain\'s chairs in the cockpit create additional living space when parked. Standard features include a power patio awning, exterior storage compartment, backup camera, stabilizer jacks, and a 4,000W Onan MicroQuiet generator. All original factory warranties transfer to the new owner. The previous owner purchased new and used it for one summer season — a rare opportunity to get into a nearly new Class C at a substantial savings.',

  // Loan Calculator
  loanMonthlyPayment: 667,

  // Dealer
  dealer: {
    name: 'Camping World',
    location: 'La Mirada, CA',
    address: '14900 Firestone Blvd, La Mirada, CA 90638',
    phone: '(562) 555-0276',
    callCode: '4489',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-6PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Camping World La Mirada is Southern California\'s premier RV superstore, conveniently located off the I-5 corridor between Los Angeles and Orange County. We carry hundreds of new and pre-owned RVs from all major manufacturers, with a full-service center, parts department, and financing office on-site. As part of America\'s largest RV retailer, we offer competitive pricing and nationwide warranty support.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 15,
  },

  // Navigation context
  resultPosition: 21,
  totalResults: 4521,

  // Similar listings
  similarListings: [
    {
      id: 'sim-chateau-01',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-chateau-02',
      title: '2024 Tiffin Wayfarer 25XPW',
      year: 2024,
      make: 'Tiffin Motorhomes',
      model: 'Wayfarer',
      price: 169995,
      imageUrl: '/images/listings/wayfarer-25xpw/69854b19be24c14a9c0fe562.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
    {
      id: 'sim-chateau-03',
      title: '2025 Tiffin Allegro Open Road 32SA',
      year: 2025,
      make: 'Tiffin Motorhomes',
      model: 'Allegro Open Road',
      price: 249995,
      imageUrl: '/images/listings/allegro-open-road-32sa/695d6197b5b92c215d071374.webp',
      dealer: 'La Mesa RV',
      location: 'Portland, OR',
    },
    {
      id: 'sim-chateau-04',
      title: '2018 Ford Transit 250',
      year: 2018,
      make: 'Ford',
      model: 'Transit',
      price: 77500,
      imageUrl: '/images/listings/transit-250-camper/68b394de89a39221e8665022.webp',
      dealer: 'San Diego Custom Vans',
      location: 'San Diego, CA',
    },
    {
      id: 'sim-chateau-05',
      title: '2020 Airstream Globetrotter 27FB Twin',
      year: 2020,
      make: 'Airstream',
      model: 'Globetrotter',
      price: 99900,
      imageUrl: '/images/listings/globetrotter-27fb/698cc250190b8f51030adb8b.webp',
      dealer: 'Private Seller',
      location: 'Temecula, CA',
    },
    {
      id: 'sim-chateau-06',
      title: '2025 Coachmen Freelander 21RS',
      year: 2025,
      make: 'Coachmen',
      model: 'Freelander',
      price: 84500,
      imageUrl: '/images/listings/eagle-321rsts/699da1a15433d1da0f00bde7.webp',
      dealer: 'General RV Center',
      location: 'Draper, UT',
    },
  ],

  // Related categories
  categories: [
    'Class C motorhomes',
    'Thor RVs',
    'RVs under $80K',
    'RVs in California',
    'Thor Chateau',
    'Used Class C',
    'Compact motorhomes',
  ],

  // Reviews
  reviews: {
    overallRating: 4.2,
    totalReviews: 312,
    distribution: [156, 98, 36, 14, 8],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4 },
    ],
    reviews: [
      {
        id: 'rev-chateau-01',
        title: 'Best starter Class C on the market',
        modelYear: '2024 Thor Chateau 22E',
        rating: 4.5,
        body: 'The Chateau 22E is the perfect entry-level Class C motorhome. At 24 feet it\'s easy to drive — my wife was comfortable behind the wheel after one parking lot practice session. The Ford 7.3L V8 has tons of power and parts are available everywhere. The full dry bath is a huge win over the wet baths in competing models this size. We use the overcab bunk for our two kids and the rear bed for us. Four people, one small motorhome, zero complaints.',
        author: 'Brian Kowalski',
        photoCount: 3,
      },
      {
        id: 'rev-chateau-02',
        title: 'Solid value but watch the build quality',
        modelYear: '2023 Thor Chateau 22E',
        rating: 4,
        body: 'For the money, the Chateau is tough to beat — it has everything you need and nothing you don\'t. The floorplan is well thought out and the Ford chassis is bulletproof. My main gripe is with some of the interior finishing details — a couple of cabinet doors needed adjusting, and the window valances felt cheap. These are easy fixes, and Thor\'s warranty covered the cabinet issue without hassle. Overall, solid motorhome for the price, just do a thorough PDI at delivery.',
        author: 'Jennifer Holt',
        photoCount: 1,
      },
    ],
  },

  // Engagement
  viewerCount: 16,
  engagement: {
    isNewlyListed: true,
    listedDate: '18 days ago',
    viewCount: 445,
    saveCount: 73,
  },
};
// ─── Batch 4: Listings 22-29 (final fragment) ──────────────────────

import type { ListingData } from './types';

// ─── Listing 22: Express 1500 Camper ────────────────────────────────

const IMG_EXPRESS = '/images/listings/express-1500-camper';

export const expressListing: ListingData = {
  title: '2014 Chevrolet Express 1500',
  year: 2014,
  make: 'Chevrolet',
  model: 'Express',
  trim: '1500',

  stockNumber: 'CH14EX1500',
  location: 'San Diego, CA',

  images: [
    { url: `${IMG_EXPRESS}/61b2da39aa488356005052b2.webp`, alt: '2014 Chevrolet Express 1500 camper van interior kitchenette through open side doors' },
    { url: `${IMG_EXPRESS}/61b2da53fe6f6250140939e0.webp`, alt: '2014 Chevrolet Express 1500 camper van interior rear dinette with orange table' },
    { url: `${IMG_EXPRESS}/61b2da68cd0cf01b0767bd38.webp`, alt: '2014 Chevrolet Express 1500 interior living area with bed platform and storage' },
    { url: `${IMG_EXPRESS}/61b2da6ae7261979cc0974f8.webp`, alt: '2014 Chevrolet Express 1500 interior galley kitchen with sink and countertop' },
    { url: `${IMG_EXPRESS}/61b2da6dc08b685ec628eae5.webp`, alt: '2014 Chevrolet Express 1500 rear cargo area converted to sleeping quarters' },
    { url: `${IMG_EXPRESS}/61b2da7eeee73941ec405d85.webp`, alt: '2014 Chevrolet Express 1500 camper van interior ceiling fan and lighting detail' },
    { url: `${IMG_EXPRESS}/63b3611f869bdd3b12410c66.webp`, alt: '2014 Chevrolet Express 1500 camper van exterior rear showing custom build' },
  ],
  tagText: 'Budget van',
  totalPhotoCount: 7,

  currentPrice: 34800,
  originalPrice: 38500,
  monthlyPayment: 290,
  dealRating: 'fair',

  aiSummary: 'This 2014 Chevrolet Express 1500 is a custom-converted camper van offering an affordable entry point into van life. The compact 19-foot length makes it easy to drive and stealth camp, while the thoughtful conversion includes a bed platform, basic galley kitchen, and sufficient storage for extended trips.\n\nAt just under $35K, it represents a budget-friendly alternative to purpose-built Class B motorhomes that typically start at twice the price. Ideal for solo travelers or couples who prioritize mobility over living space.',

  vhrAvailable: true,
  vhrHighlights: ['No accidents reported', '2 previous owners', 'Regular maintenance records'],

  isNegotiable: true,

  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class B' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '19 ft.' },
    { icon: 'weight', label: 'GVWR', value: '6,900 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '2' },
  ],
  vin: '1GCSGAFX4E1122123',
  daysOnSite: 60,

  priceAnalysis: {
    rangeMin: 28000,
    rangeMax: 45000,
    averagePrice: 36500,
    explanation: 'Based on similar converted Chevrolet Express camper vans within 300 miles, this listing is priced slightly below average. Custom van conversions vary widely in quality and amenities, which accounts for the broad price range.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '12/30/25', change: 'Listed', price: 38500 },
      { date: '01/20/26', change: 'Price reduced', price: 36500 },
      { date: '02/10/26', change: 'Price reduced', price: 34800 },
    ],
  },

  description: 'Custom-converted 2014 Chevrolet Express 1500 camper van ready for adventure. This thoughtfully built conversion features a full-size bed platform with under-bed storage, a compact galley kitchen with sink, countertop prep area, and a 12V refrigerator. The interior includes LED lighting throughout, a ceiling-mounted fan for ventilation, and insulated walls and ceiling for comfortable camping in varying weather conditions. The Express 1500 platform offers reliable V6 power, reasonable fuel economy for a van, and easy maintenance at any Chevrolet dealer. At just 19 feet, this van fits in standard parking spaces and is nimble enough for city driving while still providing everything you need for weekend getaways or extended road trips. Perfect entry into van life without the six-figure price tag of factory-built Class B motorhomes.',

  loanMonthlyPayment: 290,

  dealer: {
    name: 'Timeless Autocare',
    location: 'San Diego, CA',
    address: '4220 Convoy St, San Diego, CA 92111',
    phone: '(619) 555-0134',
    callCode: '2255',
    hours: 'Mon-Fri 9AM-6PM, Sat 10AM-4PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Timeless Autocare specializes in quality pre-owned vehicles and custom van conversions in the San Diego area. We carefully inspect every vehicle we sell and stand behind our inventory with comprehensive warranties. Our conversion team uses quality materials and proven designs to create functional, reliable camper vans.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 4,
  },

  resultPosition: 22,
  totalResults: 4521,

  similarListings: [
    {
      id: 'sim-22-1',
      title: '2020 Ford Transit 250 Camper Van',
      year: 2020,
      make: 'Ford',
      model: 'Transit',
      price: 62500,
      imageUrl: '/images/listings/transit-250-camper/68b394de89a39221e8665022.webp',
      dealer: 'SoCal Vans',
      location: 'Los Angeles, CA',
    },
    {
      id: 'sim-22-2',
      title: '2020 Mercedes-Benz Sprinter 2500 AWD',
      year: 2020,
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      price: 109900,
      imageUrl: '/images/listings/sprinter-2500-awd/69a20be82c6950a39a017612.webp',
      dealer: 'Pacific Coast RV',
      location: 'Oxnard, CA',
    },
    {
      id: 'sim-22-3',
      title: '2025 Pleasure-Way Plateau XLTW',
      year: 2025,
      make: 'Pleasure-Way',
      model: 'Plateau',
      price: 189950,
      imageUrl: '/images/listings/plateau-xltw/693b60ea9d69b3e59201c085.webp',
      dealer: 'La Mesa RV',
      location: 'San Diego, CA',
    },
    {
      id: 'sim-22-4',
      title: '2026 Thor Chateau 22E',
      year: 2026,
      make: 'Thor Motor Coach',
      model: 'Chateau',
      price: 89995,
      imageUrl: '/images/listings/chateau-22e/6973707cb1dc7d351104884d.webp',
      dealer: 'General RV Center',
      location: 'Riverside, CA',
    },
    {
      id: 'sim-22-5',
      title: '2021 Airstream Basecamp 20X',
      year: 2021,
      make: 'Airstream',
      model: 'Basecamp',
      price: 44999,
      imageUrl: '/images/listings/basecamp-20x/6914ef1e3aa862b8be06f25e.webp',
      dealer: 'Riverside RV Sales',
      location: 'Riverside, CA',
    },
    {
      id: 'sim-22-6',
      title: '2019 Tiffin Wayfarer 25QW',
      year: 2019,
      make: 'Tiffin Motorhomes',
      model: 'Wayfarer',
      price: 84995,
      imageUrl: '/images/listings/wayfarer-25qw/69736b7f3ca3bd7ded0364b8.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
  ],

  categories: [
    'Class B motorhomes',
    'Chevrolet RVs',
    'RVs under $40K',
    'Camper vans',
    'Used Class B',
    'RVs in San Diego',
    'Van conversions',
  ],

  reviews: {
    overallRating: 3.8,
    totalReviews: 42,
    distribution: [18, 14, 6, 3, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.0 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.5 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 3.0 },
      { icon: 'bed', label: 'Comfort & liveability', score: 3.0 },
    ],
    reviews: [
      {
        id: 'rev-22-1',
        title: 'Great stealth camper for the price',
        modelYear: '2014 Chevrolet Express 1500',
        rating: 4.0,
        body: 'Bought this as my first van and it\'s been fantastic for weekend trips and the occasional week-long road trip. The Express is dead reliable — parts are cheap and any mechanic can work on it. The conversion is basic but functional. I added a portable solar panel and it\'s been perfect for boondocking in the desert.',
        author: 'Jake Morrison',
        photoCount: 4,
      },
      {
        id: 'rev-22-2',
        title: 'Decent entry-level van camper',
        modelYear: '2013 Chevrolet Express 1500',
        rating: 3.5,
        body: 'For the money, it\'s hard to beat the Express platform for van life. Gas mileage isn\'t great (about 14-16 mpg) but maintenance costs are low and the V6 has plenty of power. The low roof means you can\'t stand up inside, which gets old after a few days. Great for someone testing the waters before committing to a high-roof Sprinter build.',
        author: 'Priya Dasgupta',
        photoCount: 2,
      },
    ],
  },

  viewerCount: 6,
  engagement: {
    isNewlyListed: false,
    listedDate: '60 days ago',
    viewCount: 412,
    saveCount: 28,
  },
};

// ─── Listing 23: Reflection 100 Series 27BH ────────────────────────

const IMG_REFLECTION100 = '/images/listings/reflection-100-27bh';

export const reflection100Listing: ListingData = {
  title: '2026 Grand Design Reflection 100 Series 27BH',
  year: 2026,
  make: 'Grand Design',
  model: 'Reflection 100 Series',
  trim: '27BH',

  stockNumber: 'GD26R10027BH',
  location: 'Barstow, CA',

  images: [
    { url: `${IMG_REFLECTION100}/6916dc950613d642700942c8.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH exterior front three-quarter view' },
    { url: `${IMG_REFLECTION100}/6916dcc2a9ce910cb60b1e59.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH exterior driver side profile' },
    { url: `${IMG_REFLECTION100}/6916dcdab8af55c7550ee0d5.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH interior living room with slide out' },
    { url: `${IMG_REFLECTION100}/6916dcec9260a3a35c083dbf.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH kitchen with island and appliances' },
    { url: `${IMG_REFLECTION100}/6916dd04e5d9b3f80f098a78.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH master bedroom with queen bed' },
    { url: `${IMG_REFLECTION100}/6916dd1bfd977bda2d09a172.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH bunkhouse with double bunks' },
    { url: `${IMG_REFLECTION100}/6916dd4f418abe99800baebc.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH bathroom with shower and vanity' },
    { url: `${IMG_REFLECTION100}/6916ddb4a1b2191c7701e4ea.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH interior dinette booth with gray upholstery' },
    { url: `${IMG_REFLECTION100}/6916ddcf4a1fd777bc0451e7.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH pass-through storage compartment' },
    { url: `${IMG_REFLECTION100}/6916dde935a4fb508407f3a2.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH kitchen detail with farmhouse sink' },
    { url: `${IMG_REFLECTION100}/6916de037eee7154da0b7c9a.webp`, alt: '2026 Grand Design Reflection 100 Series 27BH interior entertainment center with wall-mounted TV' },
  ],
  tagText: 'New arrival',
  totalPhotoCount: 11,

  currentPrice: 54995,
  originalPrice: 64995,
  monthlyPayment: 458,
  dealRating: 'great',

  aiSummary: 'The 2026 Grand Design Reflection 100 Series 27BH is a mid-profile fifth wheel that packs a bunkhouse floorplan into a manageable 32-foot package. Grand Design\'s Reflection 100 Series offers premium construction and features at a more accessible price point than the standard Reflection line.\n\nWith a private master bedroom, dedicated bunkhouse sleeping six, and a spacious slide-out living area, this fifth wheel is ideal for families. The $10,000 discount from MSRP makes this a standout value for a brand-new unit from one of the most respected names in towable RVs.',

  vhrAvailable: false,
  vhrHighlights: [],

  isNegotiable: true,

  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Fifth Wheel' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '32 ft.' },
    { icon: 'weight', label: 'GVWR', value: '10,995 lbs.' },
    { icon: 'slideout', label: 'Slides', value: '1' },
    { icon: 'bed', label: 'Sleeping capacity', value: '6' },
  ],
  vin: '573TE3228S3222234',
  daysOnSite: 9,

  priceAnalysis: {
    rangeMin: 50000,
    rangeMax: 68000,
    averagePrice: 58500,
    explanation: 'Based on similar 2025-2026 Grand Design Reflection 100 Series fifth wheels within 500 miles, this listing is priced well below the market average. The $10K discount from MSRP represents strong value for a new unit.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/19/26', change: 'Listed', price: 64995 },
      { date: '02/22/26', change: 'Price reduced', price: 54995 },
    ],
  },

  description: 'Brand new 2026 Grand Design Reflection 100 Series 27BH fifth wheel featuring a spacious bunkhouse floorplan perfect for family camping. This unit features a single slide-out that opens up the living area with a comfortable sofa and entertainment center. The full kitchen includes a residential-style refrigerator, three-burner range with oven, microwave, and farmhouse-style sink with solid surface countertops. The private master bedroom in the front features a walk-around queen bed with nightstands and overhead storage. The rear bunkhouse provides double-over-double bunks with individual reading lights and privacy curtains. Grand Design\'s signature construction includes a fully enclosed and heated underbelly, seamless TPO roof, and Alumicage framing for a unit built to last. Pass-through storage underneath provides ample room for outdoor gear.',

  loanMonthlyPayment: 458,

  dealer: {
    name: 'Happy Camper RV',
    location: 'Barstow, CA',
    address: '2815 Lenwood Rd, Barstow, CA 92311',
    phone: '(760) 555-0192',
    callCode: '3367',
    hours: 'Mon-Sat 9AM-6PM, Sun 10AM-4PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Happy Camper RV serves the high desert and Inland Empire communities from our convenient location along I-15 in Barstow. We specialize in new and used travel trailers and fifth wheels from top brands including Grand Design, Keystone, and Jayco. Our service center handles everything from warranty work to custom upgrades.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 6,
  },

  resultPosition: 23,
  totalResults: 4521,

  similarListings: [
    {
      id: 'sim-23-1',
      title: '2026 Grand Design Reflection 150 260RD',
      year: 2026,
      make: 'Grand Design',
      model: 'Reflection 150',
      price: 54995,
      imageUrl: '/images/listings/reflection-150-260rd/69731edb6563e003df071755.webp',
      dealer: 'General RV Center',
      location: 'Riverside, CA',
    },
    {
      id: 'sim-23-2',
      title: '2025 Keystone Hideout Sport 175BH',
      year: 2025,
      make: 'Keystone',
      model: 'Hideout Sport',
      price: 19450,
      imageUrl: '/images/listings/hideout-sport-175bh/697379bff04761f33b06e7f6.webp',
      dealer: 'Camping World',
      location: 'Bakersfield, CA',
    },
    {
      id: 'sim-23-3',
      title: '2026 Keystone Fuzion 430',
      year: 2026,
      make: 'Keystone',
      model: 'Fuzion',
      price: 109995,
      imageUrl: '/images/listings/fuzion-430/697cad5f2cc60b5bfa06af9f.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-23-4',
      title: '2025 East to West Riverstone 420RE',
      year: 2025,
      make: 'East to West',
      model: 'Riverstone',
      price: 118995,
      imageUrl: '/images/listings/riverstone-420re/698d18a8d74e572dc1072002.webp',
      dealer: 'General RV Center',
      location: 'Draper, UT',
    },
    {
      id: 'sim-23-5',
      title: '2025 Jayco Jay Flight SLX 380DQS',
      year: 2025,
      make: 'Jayco',
      model: 'Jay Flight SLX',
      price: 35930,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp',
      dealer: 'Roy Robinson RV',
      location: 'Marysville, WA',
    },
    {
      id: 'sim-23-6',
      title: '2025 East to West Heritage Glen 378FL',
      year: 2025,
      make: 'East to West',
      model: 'Heritage Glen',
      price: 53175,
      imageUrl: '/images/listings/heritage-glen-378fl/69a22b552734418f3106f5c2.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
  ],

  categories: [
    'Fifth wheel RVs',
    'Grand Design RVs',
    'Bunkhouse RVs',
    'RVs under $60K',
    'New fifth wheels',
    'Family RVs',
    'Grand Design Reflection',
  ],

  reviews: {
    overallRating: 4.5,
    totalReviews: 134,
    distribution: [78, 38, 12, 4, 2],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.5 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.0 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.0 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 5.0 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-23-1',
        title: 'Best value fifth wheel on the market',
        modelYear: '2025 Grand Design Reflection 100 27BH',
        rating: 5.0,
        body: 'We looked at every mid-profile bunkhouse fifth wheel in this price range and the Reflection 100 was the clear winner. Build quality is noticeably better than Keystone and Jayco at the same price point. The kids love having their own space in the bunks and the master bedroom actually feels like a real room. Grand Design\'s warranty support has been excellent too.',
        author: 'Brian and Stacey Collier',
        photoCount: 6,
      },
      {
        id: 'rev-23-2',
        title: 'Solid construction, great floorplan',
        modelYear: '2024 Grand Design Reflection 100 27BH',
        rating: 4.5,
        body: 'After two seasons of full-timing in our 27BH, I can confirm this is a well-built unit. The enclosed underbelly kept us warm camping in the Rockies in October. The single slide is nice because there\'s less to go wrong. Only thing I\'d change is adding a washer/dryer prep — we ended up doing that ourselves.',
        author: 'Tom Andersen',
        photoCount: 3,
      },
    ],
  },

  viewerCount: 18,
  engagement: {
    isNewlyListed: true,
    listedDate: '9 days ago',
    viewCount: 284,
    saveCount: 47,
  },

  gvwr: 10995,
  tongueWeight: 1340,
  hitchType: 'fifth-wheel',
};

// ─── Listing 24: Airstream Basecamp 20X ─────────────────────────────

const IMG_BASECAMP = '/images/listings/basecamp-20x';

export const basecampListing: ListingData = {
  title: '2021 Airstream Basecamp 20X',
  year: 2021,
  make: 'Airstream',
  model: 'Basecamp',
  trim: '20X',

  stockNumber: 'AS21BC20X',
  location: 'Riverside, CA',

  images: [
    { url: `${IMG_BASECAMP}/6914ef1e3aa862b8be06f25e.webp`, alt: '2021 Airstream Basecamp 20X exterior front three-quarter view showing iconic silver shell' },
    { url: `${IMG_BASECAMP}/6914ef1ec48d8828f90bac7a.webp`, alt: '2021 Airstream Basecamp 20X exterior rear hatch open showing garage area and off-road tires' },
    { url: `${IMG_BASECAMP}/6914ef1f890a8e4f6e0a5126.webp`, alt: '2021 Airstream Basecamp 20X interior living area with convertible dinette' },
    { url: `${IMG_BASECAMP}/6914ef1f9feec30cb103c337.webp`, alt: '2021 Airstream Basecamp 20X compact kitchen with stainless countertops' },
    { url: `${IMG_BASECAMP}/6914ef1fe5deb18957075bda.webp`, alt: '2021 Airstream Basecamp 20X wet bath with skylight and modern fixtures' },
  ],
  tagText: 'Off-grid ready',
  totalPhotoCount: 5,

  currentPrice: 44999,
  originalPrice: 49900,
  monthlyPayment: 375,
  dealRating: 'good',

  aiSummary: 'The 2021 Airstream Basecamp 20X is a rugged, adventure-ready travel trailer designed for off-grid exploration. The X-package adds all-terrain tires, a front-mounted stone guard, and enhanced ground clearance, making it capable on unpaved roads and remote campsites that standard trailers can\'t reach.\n\nAt 20 feet and under 4,500 lbs GVWR, the Basecamp can be towed by most midsize SUVs and trucks. Airstream\'s legendary aluminum construction means this trailer will outlast most competitors, and the used price of $45K represents significant savings over the $55K+ MSRP of a new Basecamp.',

  vhrAvailable: true,
  vhrHighlights: ['No accidents reported', '1 previous owner', 'All Airstream service records on file'],

  isNegotiable: true,

  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Travel Trailer' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '20 ft.' },
    { icon: 'weight', label: 'GVWR', value: '4,500 lbs.' },
    { icon: 'slideout', label: 'Slides', value: '0' },
    { icon: 'bed', label: 'Sleeping capacity', value: '2' },
  ],
  vin: '1STCFYF21MJ333345',
  daysOnSite: 22,

  priceAnalysis: {
    rangeMin: 40000,
    rangeMax: 55000,
    averagePrice: 47500,
    explanation: 'Based on similar 2020-2022 Airstream Basecamp models within 500 miles, this listing is priced slightly below market average. Airstream trailers hold their value exceptionally well, and the X-package commands a premium.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/06/26', change: 'Listed', price: 49900 },
      { date: '02/18/26', change: 'Price reduced', price: 44999 },
    ],
  },

  description: 'Pre-owned 2021 Airstream Basecamp 20X in excellent condition with the desirable X off-road package. This adventure-ready trailer features all-terrain tires, front stone guard, and enhanced suspension for tackling unpaved roads and reaching remote campsites. The Basecamp\'s unique rear hatch opens to create an indoor/outdoor living space and provides easy loading of bikes, kayaks, and other gear. Inside, the convertible dinette transforms into a comfortable sleeping area for two. The compact galley kitchen includes a two-burner cooktop, stainless steel sink, and ample counter space. The wet bath features a skylight and modern fixtures. Airstream\'s riveted aluminum shell construction is built to last generations, and this particular unit has been meticulously maintained by its single previous owner. Standard features include air conditioning, furnace, hot water heater, and USB charging throughout.',

  loanMonthlyPayment: 375,

  dealer: {
    name: 'Riverside RV Sales',
    location: 'Riverside, CA',
    address: '1800 Auto Center Dr, Riverside, CA 92507',
    phone: '(951) 555-0163',
    callCode: '2891',
    hours: 'Mon-Sat 9AM-6PM, Sun by appointment',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Riverside RV Sales is a family-owned dealership serving the Inland Empire for over a decade. We specialize in quality pre-owned travel trailers and fifth wheels from premium brands including Airstream, Grand Design, and Winnebago. Every unit we sell undergoes a thorough multi-point inspection.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 2,
  },

  resultPosition: 24,
  totalResults: 4521,

  similarListings: [
    {
      id: 'sim-24-1',
      title: '2024 Airstream Flying Cloud 23FB',
      year: 2024,
      make: 'Airstream',
      model: 'Flying Cloud',
      price: 87995,
      imageUrl: '/images/listings/flying-cloud-23fbq/698abd158e138a4ac9028bb4.webp',
      dealer: 'Colonial Airstream',
      location: 'Millstone, NJ',
    },
    {
      id: 'sim-24-2',
      title: '2025 Airstream Bambi Sport 16',
      year: 2025,
      make: 'Airstream',
      model: 'Bambi Sport',
      price: 52995,
      imageUrl: '/images/listings/bambi-sport-16/697303f40530c2f60700dcb3.webp',
      dealer: 'Airstream of Scottsdale',
      location: 'Scottsdale, AZ',
    },
    {
      id: 'sim-24-3',
      title: '2023 Airstream Globetrotter 27FB',
      year: 2023,
      make: 'Airstream',
      model: 'Globetrotter',
      price: 134900,
      imageUrl: '/images/listings/globetrotter-27fb/698cc250190b8f51030adb8b.webp',
      dealer: 'Colonial Airstream',
      location: 'Millstone, NJ',
    },
    {
      id: 'sim-24-4',
      title: '2024 nuCamp Scope 18M',
      year: 2024,
      make: 'nuCamp',
      model: 'Scope',
      price: 21999,
      imageUrl: '/images/listings/scope-18m/693a7ad1920b271659158af6.webp',
      dealer: 'Princess Craft RV',
      location: 'Round Rock, TX',
    },
    {
      id: 'sim-24-5',
      title: '2014 Chevrolet Express 1500 Camper',
      year: 2014,
      make: 'Chevrolet',
      model: 'Express',
      price: 34800,
      imageUrl: '/images/listings/express-1500-camper/61b2da39aa488356005052b2.webp',
      dealer: 'Timeless Autocare',
      location: 'San Diego, CA',
    },
    {
      id: 'sim-24-6',
      title: '2024 Forest River Flagstaff SE 206STSE',
      year: 2024,
      make: 'Forest River',
      model: 'Flagstaff SE',
      price: 17000,
      imageUrl: '/images/listings/flagstaff-se-206stse/69737542834d21207d0b1104.webp',
      dealer: 'Camping World',
      location: 'Fresno, CA',
    },
  ],

  categories: [
    'Travel trailers',
    'Airstream RVs',
    'RVs under $50K',
    'Off-road trailers',
    'Used Airstream',
    'Lightweight trailers',
    'Couples RVs',
  ],

  reviews: {
    overallRating: 4.6,
    totalReviews: 198,
    distribution: [112, 56, 20, 7, 3],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5.0 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5.0 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 3.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-24-1',
        title: 'The ultimate adventure trailer',
        modelYear: '2021 Airstream Basecamp 20X',
        rating: 5.0,
        body: 'We\'ve taken our Basecamp 20X on dirt roads in Utah, gravel paths in Colorado, and beachside spots in Baja. The X-package tires and clearance make a real difference on rough terrain. The rear hatch is genius — we load our mountain bikes right into the trailer. Build quality is exceptional and it tows like a dream behind our 4Runner.',
        author: 'Derek Yamamoto',
        photoCount: 8,
      },
      {
        id: 'rev-24-2',
        title: 'Small but mighty',
        modelYear: '2020 Airstream Basecamp 20',
        rating: 4.0,
        body: 'Coming from a 26-foot trailer, the Basecamp took some adjustment. It\'s tight for two people and you won\'t have room for a lot of stuff. But what you get is freedom — we can tow it with our Subaru Outback and go places our old trailer couldn\'t dream of. The Airstream quality is real and I expect this trailer to last us decades.',
        author: 'Melissa Chen',
        photoCount: 3,
      },
    ],
  },

  viewerCount: 11,
  engagement: {
    isNewlyListed: false,
    listedDate: '22 days ago',
    viewCount: 523,
    saveCount: 72,
  },

  gvwr: 4500,
  tongueWeight: 405,
  hitchType: 'bumper-pull',
};

// ─── Listing 25: Fleetwood Tioga 26Q ────────────────────────────────

const IMG_TIOGA = '/images/listings/tioga-26q';

export const tiogaListing: ListingData = {
  title: '2005 Fleetwood Tioga 26Q',
  year: 2005,
  make: 'Fleetwood',
  model: 'Tioga',
  trim: '26Q',

  stockNumber: 'FL05TI26Q',
  location: 'El Cajon, CA',

  images: [
    { url: `${IMG_TIOGA}/6974547df492ec295b09c87e.webp`, alt: '2005 Fleetwood Tioga 26Q exterior front three-quarter view in tan and brown' },
    { url: `${IMG_TIOGA}/697ee0fb69b56a06a03d3695.webp`, alt: '2005 Fleetwood Tioga 26Q exterior driver side profile showing slide out' },
    { url: `${IMG_TIOGA}/697ee0fb69b56a06a03d3696.webp`, alt: '2005 Fleetwood Tioga 26Q interior cab area with swivel captain chairs' },
    { url: `${IMG_TIOGA}/697ee0fb69b56a06a03d3697.webp`, alt: '2005 Fleetwood Tioga 26Q interior kitchen with oak cabinetry' },
    { url: `${IMG_TIOGA}/697ee0fb69b56a06a03d3699.webp`, alt: '2005 Fleetwood Tioga 26Q interior dinette and living area' },
    { url: `${IMG_TIOGA}/697ee0fb69b56a06a03d369a.webp`, alt: '2005 Fleetwood Tioga 26Q rear bedroom with queen bed' },
    { url: `${IMG_TIOGA}/697ee0fb69b56a06a03d369c.webp`, alt: '2005 Fleetwood Tioga 26Q interior full kitchen and living area with cab-over bed' },
  ],
  tagText: 'Budget friendly',
  totalPhotoCount: 7,

  currentPrice: 23699,
  originalPrice: 27500,
  monthlyPayment: 197,
  dealRating: 'good',

  aiSummary: 'The 2005 Fleetwood Tioga 26Q is a classic Class C motorhome on the Ford E-450 chassis with the proven Triton V10 engine. At 27 feet with a single slide-out, it offers a practical floorplan with a rear queen bed, full bathroom, and spacious living area without being unwieldy to drive.\n\nPriced under $24K, this is an excellent option for budget-conscious buyers looking for a fully self-contained motorhome. Fleetwood was known for solid construction, and the Tioga line was one of their most popular Class C offerings. Expect reliable service if properly maintained, though be prepared for typical age-related maintenance on a 20-year-old RV.',

  vhrAvailable: true,
  vhrHighlights: ['No accidents reported', '3 previous owners', 'Engine serviced regularly'],

  isNegotiable: true,

  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class C' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '27 ft.' },
    { icon: 'weight', label: 'GVWR', value: '14,050 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '6' },
  ],
  vin: '4UZABRFT3SCFL4456',
  daysOnSite: 50,

  priceAnalysis: {
    rangeMin: 18000,
    rangeMax: 32000,
    averagePrice: 25000,
    explanation: 'Based on similar 2003-2007 Fleetwood Tioga Class C motorhomes within 500 miles, this listing is priced near the market average. Condition and mileage are the primary factors in this age range, and well-maintained units command a premium.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '01/09/26', change: 'Listed', price: 27500 },
      { date: '01/25/26', change: 'Price reduced', price: 25500 },
      { date: '02/15/26', change: 'Price reduced', price: 23699 },
    ],
  },

  description: 'Well-maintained 2005 Fleetwood Tioga 26Q Class C motorhome on the reliable Ford E-450 chassis with the 6.8L Triton V10 engine. This popular floorplan features a rear queen bed, a single slide-out that expands the living area, a full galley kitchen with three-burner cooktop, oven, microwave, and double-basin sink, plus a separate bathroom with shower. The dinette converts to additional sleeping, and the overcab bunk sleeps two more, giving you sleeping capacity for six. Oak cabinetry throughout gives the interior a warm, residential feel. Dual swivel captain\'s chairs up front create a comfortable driving and lounging environment. This unit has been well cared for with regular maintenance and is ready for your next adventure. A fantastic value for anyone wanting a full-featured Class C motorhome without the new-RV price tag.',

  loanMonthlyPayment: 197,

  dealer: {
    name: 'B&L RV',
    location: 'El Cajon, CA',
    address: '825 El Cajon Blvd, El Cajon, CA 92020',
    phone: '(619) 555-0178',
    callCode: '1198',
    hours: 'Mon-Sat 9AM-5PM, Closed Sunday',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'B&L RV has been serving the San Diego East County community for over 30 years. We specialize in quality pre-owned motorhomes and trailers at honest prices. Every unit undergoes a thorough inspection and reconditioning before it hits our lot. We also offer consignment services and RV storage.',
    websiteUrl: '#',
    isTop50: false,
    yearsOnRvTrader: 7,
  },

  resultPosition: 25,
  totalResults: 4521,

  similarListings: [
    {
      id: 'sim-25-1',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-25-2',
      title: '2026 Thor Chateau 22E',
      year: 2026,
      make: 'Thor Motor Coach',
      model: 'Chateau',
      price: 89995,
      imageUrl: '/images/listings/chateau-22e/6973707cb1dc7d351104884d.webp',
      dealer: 'General RV Center',
      location: 'Riverside, CA',
    },
    {
      id: 'sim-25-3',
      title: '2019 Tiffin Wayfarer 25QW',
      year: 2019,
      make: 'Tiffin Motorhomes',
      model: 'Wayfarer',
      price: 84995,
      imageUrl: '/images/listings/wayfarer-25qw/69736b7f3ca3bd7ded0364b8.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
    {
      id: 'sim-25-4',
      title: '2024 Forest River Flagstaff SE 206STSE',
      year: 2024,
      make: 'Forest River',
      model: 'Flagstaff SE',
      price: 17000,
      imageUrl: '/images/listings/flagstaff-se-206stse/69737542834d21207d0b1104.webp',
      dealer: 'Camping World',
      location: 'Fresno, CA',
    },
    {
      id: 'sim-25-5',
      title: '2014 Chevrolet Express 1500 Camper',
      year: 2014,
      make: 'Chevrolet',
      model: 'Express',
      price: 34800,
      imageUrl: '/images/listings/express-1500-camper/61b2da39aa488356005052b2.webp',
      dealer: 'Timeless Autocare',
      location: 'San Diego, CA',
    },
    {
      id: 'sim-25-6',
      title: '2026 Forest River Sunseeker 3010DSF',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 105995,
      imageUrl: '/images/listings/sunseeker-3010dsf/69736bd11e40d0bc5b02239c.webp',
      dealer: 'Fun Town RV',
      location: 'San Marcos, TX',
    },
  ],

  categories: [
    'Class C motorhomes',
    'Fleetwood RVs',
    'RVs under $25K',
    'Used Class C',
    'Budget motorhomes',
    'RVs in San Diego',
    'Fleetwood Tioga',
  ],

  reviews: {
    overallRating: 4.0,
    totalReviews: 156,
    distribution: [68, 52, 24, 8, 4],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.0 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.0 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4.0 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.0 },
    ],
    reviews: [
      {
        id: 'rev-25-1',
        title: 'Reliable workhorse that just keeps going',
        modelYear: '2005 Fleetwood Tioga 26Q',
        rating: 4.5,
        body: 'We bought our Tioga used in 2018 with 45K miles and have put another 30K on it without any major issues. The Ford V10 drinks gas (about 8-10 mpg) but it\'s bulletproof reliable and parts are everywhere. The floorplan is smart — the rear queen gives you privacy and the slide makes the living area feel spacious. For a 20-year-old rig, it still looks and feels great.',
        author: 'Richard Olsen',
        photoCount: 5,
      },
      {
        id: 'rev-25-2',
        title: 'Best budget Class C out there',
        modelYear: '2004 Fleetwood Tioga 26Q',
        rating: 4.0,
        body: 'If you\'re on a budget and want a real motorhome, not a converted van, the Tioga is hard to beat. Fleetwood built these things solid. The oak interior is a bit dated by today\'s standards but everything works and the layout makes sense. We use ours for family camping trips 8-10 times a year and it\'s been perfect.',
        author: 'Angela Torres',
        photoCount: 2,
      },
    ],
  },

  viewerCount: 4,
  engagement: {
    isNewlyListed: false,
    listedDate: '50 days ago',
    viewCount: 356,
    saveCount: 19,
  },
};

// ─── Listing 26: Grand Design Reflection 150 260RD ──────────────────

const IMG_REFLECTION150 = '/images/listings/reflection-150-260rd';

export const reflection150Listing: ListingData = {
  title: '2026 Grand Design Reflection 150 260RD',
  year: 2026,
  make: 'Grand Design',
  model: 'Reflection 150',
  trim: '260RD',

  stockNumber: 'GD26R150260',
  location: 'Riverside, CA',

  images: [
    { url: `${IMG_REFLECTION150}/69731edb6563e003df071755.webp`, alt: '2026 Grand Design Reflection 150 260RD exterior front three-quarter view' },
    { url: `${IMG_REFLECTION150}/69859260d0aa681bf459b075.webp`, alt: '2026 Grand Design Reflection 150 260RD interior living room with dual slides' },
    { url: `${IMG_REFLECTION150}/69859260d0aa681bf459b07d.webp`, alt: '2026 Grand Design Reflection 150 260RD kitchen with residential appliances' },
    { url: `${IMG_REFLECTION150}/69859260d0aa681bf459b07e.webp`, alt: '2026 Grand Design Reflection 150 260RD master bedroom with king bed' },
    { url: `${IMG_REFLECTION150}/69859260d0aa681bf459b07f.webp`, alt: '2026 Grand Design Reflection 150 260RD bathroom with separate shower and vanity' },
    { url: `${IMG_REFLECTION150}/69859261d0aa681bf459b085.webp`, alt: '2026 Grand Design Reflection 150 260RD interior kitchen island with drawers open' },
  ],
  tagText: 'New arrival',
  totalPhotoCount: 6,

  currentPrice: 54995,
  originalPrice: 64995,
  monthlyPayment: 458,
  dealRating: 'good',

  aiSummary: 'The 2026 Grand Design Reflection 150 260RD is a couples-oriented fifth wheel with a rear den layout that maximizes living space. With two slides and 31 feet of length, it offers a surprisingly open interior with a dedicated living room, full kitchen, private bedroom, and separate bathroom.\n\nGrand Design\'s Reflection 150 series bridges the gap between entry-level and luxury fifth wheels, offering premium construction features like the enclosed underbelly and Alumicage framing at a mid-range price point. The $10K discount off MSRP makes this competitively priced against lesser-quality competitors.',

  vhrAvailable: false,
  vhrHighlights: [],

  isNegotiable: true,

  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Fifth Wheel' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '31 ft.' },
    { icon: 'weight', label: 'GVWR', value: '10,400 lbs.' },
    { icon: 'slideout', label: 'Slides', value: '2' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
  ],
  vin: '573TE3228S3555567',
  daysOnSite: 11,

  priceAnalysis: {
    rangeMin: 52000,
    rangeMax: 67000,
    averagePrice: 59000,
    explanation: 'Based on similar 2025-2026 Grand Design Reflection 150 fifth wheels within 500 miles, this listing is priced below the market average. The rear den floorplan is popular among couples and typically sells quickly at this price point.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/17/26', change: 'Listed', price: 64995 },
      { date: '02/24/26', change: 'Price reduced', price: 54995 },
    ],
  },

  description: 'Brand new 2026 Grand Design Reflection 150 260RD fifth wheel with a unique rear den floorplan designed for couples who want maximum living space. Two opposing slides open up the main living area to create a spacious lounge with theater seating and a large entertainment center. The full kitchen features solid surface countertops, a residential-style refrigerator, three-burner range with oven, and farmhouse sink. The front master bedroom offers a walk-around queen bed with wardrobe closets and nightstand storage. A separate bathroom between the bedroom and living area features a radius shower, porcelain toilet, and full vanity. Grand Design\'s industry-leading construction includes Alumicage framing, fully laminated walls, a seamless TPO roof with 12-year warranty, and an enclosed and heated underbelly for four-season camping. Dual awnings provide generous outdoor shade.',

  loanMonthlyPayment: 458,

  dealer: {
    name: 'General RV Center',
    location: 'Riverside, CA',
    address: '8393 Indiana Ave, Riverside, CA 92504',
    phone: '(951) 555-0244',
    callCode: '4478',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'General RV Center is one of the nation\'s largest RV dealer groups with locations across the country. Our Riverside superstore features hundreds of units on display from all major manufacturers. We offer full-service financing, a complete parts and accessories store, and factory-certified service technicians. As a Top 50 dealer, we have the buying power to offer competitive pricing on new and used units.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 9,
  },

  resultPosition: 26,
  totalResults: 4521,

  similarListings: [
    {
      id: 'sim-26-1',
      title: '2026 Grand Design Reflection 100 Series 27BH',
      year: 2026,
      make: 'Grand Design',
      model: 'Reflection 100 Series',
      price: 54995,
      imageUrl: '/images/listings/reflection-100-27bh/6916dc950613d642700942c8.webp',
      dealer: 'Happy Camper RV',
      location: 'Barstow, CA',
    },
    {
      id: 'sim-26-2',
      title: '2025 East to West Riverstone 420RE',
      year: 2025,
      make: 'East to West',
      model: 'Riverstone',
      price: 118995,
      imageUrl: '/images/listings/riverstone-420re/698d18a8d74e572dc1072002.webp',
      dealer: 'General RV Center',
      location: 'Draper, UT',
    },
    {
      id: 'sim-26-3',
      title: '2025 East to West Heritage Glen 378FL',
      year: 2025,
      make: 'East to West',
      model: 'Heritage Glen',
      price: 53175,
      imageUrl: '/images/listings/heritage-glen-378fl/69a22b552734418f3106f5c2.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-26-4',
      title: '2025 Jayco Eagle 321RSTS',
      year: 2025,
      make: 'Jayco',
      model: 'Eagle',
      price: 62240,
      imageUrl: '/images/listings/eagle-321rsts/699da1a15433d1da0f00bde7.webp',
      dealer: 'General RV Center',
      location: 'Wixom, MI',
    },
    {
      id: 'sim-26-5',
      title: '2026 Keystone Fuzion 430',
      year: 2026,
      make: 'Keystone',
      model: 'Fuzion',
      price: 109995,
      imageUrl: '/images/listings/fuzion-430/697cad5f2cc60b5bfa06af9f.webp',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-26-6',
      title: '2025 Jayco Jay Flight SLX 380DQS',
      year: 2025,
      make: 'Jayco',
      model: 'Jay Flight SLX',
      price: 35930,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp',
      dealer: 'Roy Robinson RV',
      location: 'Marysville, WA',
    },
  ],

  categories: [
    'Fifth wheel RVs',
    'Grand Design RVs',
    'Couples RVs',
    'RVs under $60K',
    'New fifth wheels',
    'RVs in California',
    'Grand Design Reflection',
  ],

  reviews: {
    overallRating: 4.4,
    totalReviews: 112,
    distribution: [58, 34, 14, 4, 2],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.5 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.0 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.0 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-26-1',
        title: 'Perfect couples fifth wheel',
        modelYear: '2025 Grand Design Reflection 150 260RD',
        rating: 5.0,
        body: 'My wife and I downsized from a 40-foot fifth wheel to the 260RD and we couldn\'t be happier. The rear den layout gives us a great living space without the wasted bunkhouse we never used. The dual slides make the interior feel enormous for a 31-foot unit. Grand Design\'s build quality is clearly a step above the competition.',
        author: 'Bill Henderson',
        photoCount: 4,
      },
      {
        id: 'rev-26-2',
        title: 'Great layout, light enough for half-ton',
        modelYear: '2025 Grand Design Reflection 150 260RD',
        rating: 4.0,
        body: 'At 10,400 GVWR, this fifth wheel can technically be towed by a properly equipped half-ton truck, which was a big selling point for us. The 260RD layout is smart — everything is where you expect it and the flow through the unit makes sense. Only knock is the tanks could be bigger for extended dry camping.',
        author: 'Diana Reeves',
        photoCount: 2,
      },
    ],
  },

  viewerCount: 15,
  engagement: {
    isNewlyListed: true,
    listedDate: '11 days ago',
    viewCount: 198,
    saveCount: 34,
  },

  gvwr: 10400,
  tongueWeight: 1260,
  hitchType: 'fifth-wheel',
};

// ─── Listing 27: Coachmen Mirada 29FW ───────────────────────────────

const IMG_MIRADA = '/images/listings/mirada-29fw';

export const miradaListing: ListingData = {
  title: '2026 Coachmen Mirada 29FW',
  year: 2026,
  make: 'Coachmen',
  model: 'Mirada',
  trim: '29FW',

  stockNumber: 'CM26MR29FW',
  location: 'Alvarado, TX',

  images: [
    { url: `${IMG_MIRADA}/6916dc7af8d900ed3d027532.webp`, alt: '2026 Coachmen Mirada 29FW exterior front three-quarter view in silver and burgundy' },
    { url: `${IMG_MIRADA}/6916dcad252a1db0cd059719.webp`, alt: '2026 Coachmen Mirada 29FW exterior driver side profile showing full-body paint' },
    { url: `${IMG_MIRADA}/6916dcc805d255608c0746f3.webp`, alt: '2026 Coachmen Mirada 29FW interior cockpit with digital dash and leather seats' },
    { url: `${IMG_MIRADA}/6916dcdf005aef5a190a33bc.webp`, alt: '2026 Coachmen Mirada 29FW interior living room with slide-out sofa and TV' },
    { url: `${IMG_MIRADA}/6916dcfaad3d96c71a0db6de.webp`, alt: '2026 Coachmen Mirada 29FW kitchen with solid surface counters and residential fridge' },
    { url: `${IMG_MIRADA}/6916dd69cd1fc3258802a3f6.webp`, alt: '2026 Coachmen Mirada 29FW master bedroom with king bed and overhead cabinets' },
    { url: `${IMG_MIRADA}/6916dd7ee053917c7700a545.webp`, alt: '2026 Coachmen Mirada 29FW bathroom with glass-enclosed shower' },
    { url: `${IMG_MIRADA}/6916ddbc59c3c065250a932b.webp`, alt: '2026 Coachmen Mirada 29FW pass-through basement storage fully open' },
    { url: `${IMG_MIRADA}/6916ddcfb4a7a7e2d1080c7b.webp`, alt: '2026 Coachmen Mirada 29FW interior bathroom vanity with sink and blue accent wall' },
    { url: `${IMG_MIRADA}/6916ddf0ad3f1370020282ed.webp`, alt: '2026 Coachmen Mirada 29FW interior bathroom shower with marble surround' },
    { url: `${IMG_MIRADA}/6916de7f55ab12d88e02cf54.webp`, alt: '2026 Coachmen Mirada 29FW interior bedroom with queen bed and overhead cabinets' },
  ],
  tagText: 'New arrival',
  totalPhotoCount: 11,

  currentPrice: 156995,
  originalPrice: 179995,
  monthlyPayment: 1308,
  dealRating: 'good',

  aiSummary: 'The 2026 Coachmen Mirada 29FW is a mid-range Class A gas motorhome that delivers impressive features and livability at a competitive price point. At 31 feet with a single slide, the 29FW is one of the more manageable Class A floorplans, making it a great choice for buyers stepping up from a Class C.\n\nThis unit from Motor Home Specialist comes with a significant $23K discount off MSRP, which is typical of their high-volume pricing model. The Mirada offers full-body paint, a king bed, residential refrigerator, and glass-enclosed shower — features that were once reserved for diesel pushers costing twice as much.',

  vhrAvailable: false,
  vhrHighlights: [],

  isNegotiable: true,

  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class A' },
    { icon: 'condition', label: 'Condition', value: 'New' },
    { icon: 'width', label: 'Length', value: '31 ft.' },
    { icon: 'weight', label: 'GVWR', value: '18,000 lbs.' },
    { icon: 'slideout', label: 'Slides', value: '1' },
    { icon: 'bed', label: 'Sleeping capacity', value: '6' },
  ],
  vin: '4UZACJDT3SCMR6678',
  daysOnSite: 14,

  priceAnalysis: {
    rangeMin: 145000,
    rangeMax: 185000,
    averagePrice: 165000,
    explanation: 'Based on similar 2025-2026 Coachmen Mirada Class A motorhomes within 1000 miles, this listing is priced below the market average. Motor Home Specialist\'s high-volume pricing typically undercuts local dealers by $15-25K.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/14/26', change: 'Listed', price: 179995 },
      { date: '02/20/26', change: 'Price reduced', price: 156995 },
    ],
  },

  description: 'Brand new 2026 Coachmen Mirada 29FW Class A gas motorhome with the Ford F-53 chassis and 7.3L V8 engine. This well-equipped unit features full-body paint in a stunning silver and burgundy combination, giving it a premium appearance typically associated with higher-priced coaches. The single slide-out expands the living area with a comfortable sofa and entertainment center. The full kitchen features solid surface countertops, a residential-style refrigerator, three-burner range with oven, and a convection microwave. The private rear master bedroom offers a king bed with overhead storage and wardrobe closets. A glass-enclosed shower, porcelain toilet, and full vanity round out the separate bathroom. Additional features include a power patio awning with LED lighting, automatic leveling jacks, a backup camera with monitor, pass-through basement storage, and two ducted air conditioners. This is a lot of motorhome for the money.',

  loanMonthlyPayment: 1308,

  dealer: {
    name: 'Motor Home Specialist',
    location: 'Alvarado, TX',
    address: '4738 I-35E North, Alvarado, TX 76009',
    phone: '(817) 555-0321',
    callCode: '5523',
    hours: 'Mon-Sat 8AM-6PM, Sun 11AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Motor Home Specialist is the #1 volume-selling motorhome dealer in the world. Located just south of Dallas-Fort Worth on I-35, our 20-acre facility features hundreds of new and pre-owned motorhomes from every major manufacturer. Our high-volume business model allows us to offer the lowest prices in the nation, and we ship motorhomes to customers across the country. We\'ve been a Top 50 RV Trader dealer for 15 consecutive years.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 15,
  },

  resultPosition: 27,
  totalResults: 4521,

  similarListings: [
    {
      id: 'sim-27-1',
      title: '2025 Newmar Dutch Star 4020',
      year: 2025,
      make: 'Newmar',
      model: 'Dutch Star',
      price: 489995,
      imageUrl: '/images/listings/dutch-star-4020/6998e5d2ad9697405b0a6fa2.webp',
      dealer: 'National Indoor RV',
      location: 'Lewisville, TX',
    },
    {
      id: 'sim-27-2',
      title: '2025 Tiffin Allegro Open Road 32SA',
      year: 2025,
      make: 'Tiffin Motorhomes',
      model: 'Allegro Open Road',
      price: 189995,
      imageUrl: '/images/listings/allegro-open-road-32sa/695d6197b5b92c215d071374.webp',
      dealer: 'La Mesa RV',
      location: 'Fort Myers, FL',
    },
    {
      id: 'sim-27-3',
      title: '2025 Coachmen Freedom Traveler A24',
      year: 2025,
      make: 'Coachmen',
      model: 'Freedom Traveler',
      price: 119995,
      imageUrl: '/images/listings/freedom-traveler-a24/69736845f8b770ad1d001275 (1).webp',
      dealer: 'General RV Center',
      location: 'Wixom, MI',
    },
    {
      id: 'sim-27-4',
      title: '2026 Forest River Sunseeker 3010DSF',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 105995,
      imageUrl: '/images/listings/sunseeker-3010dsf/69736bd11e40d0bc5b02239c.webp',
      dealer: 'Fun Town RV',
      location: 'San Marcos, TX',
    },
    {
      id: 'sim-27-5',
      title: '2026 Thor Chateau 22E',
      year: 2026,
      make: 'Thor Motor Coach',
      model: 'Chateau',
      price: 89995,
      imageUrl: '/images/listings/chateau-22e/6973707cb1dc7d351104884d.webp',
      dealer: 'General RV Center',
      location: 'Riverside, CA',
    },
    {
      id: 'sim-27-6',
      title: '2019 Tiffin Wayfarer 25QW',
      year: 2019,
      make: 'Tiffin Motorhomes',
      model: 'Wayfarer',
      price: 84995,
      imageUrl: '/images/listings/wayfarer-25qw/69736b7f3ca3bd7ded0364b8.webp',
      dealer: 'Camping World',
      location: 'Roseville, CA',
    },
  ],

  categories: [
    'Class A motorhomes',
    'Coachmen RVs',
    'RVs under $175K',
    'New Class A',
    'Gas motorhomes',
    'RVs in Texas',
    'Coachmen Mirada',
  ],

  reviews: {
    overallRating: 4.1,
    totalReviews: 89,
    distribution: [38, 30, 14, 5, 2],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 3.5 },
      { icon: 'tag', label: 'Cost of ownership', score: 4.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 4.0 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.0 },
    ],
    reviews: [
      {
        id: 'rev-27-1',
        title: 'Incredible value for a new Class A',
        modelYear: '2025 Coachmen Mirada 29FW',
        rating: 4.5,
        body: 'We paid $149K for our Mirada 29FW from MHSRV and it\'s amazing how much coach you get for the money. The full-body paint makes it look like a $300K diesel pusher from the outside. The king bed is comfortable, the kitchen is functional, and the Ford 7.3L has plenty of power. First-time Class A owners coming from a truck and trailer will be blown away.',
        author: 'David Kowalski',
        photoCount: 5,
      },
      {
        id: 'rev-27-2',
        title: 'Good coach, needs a few improvements',
        modelYear: '2025 Coachmen Mirada 29FW',
        rating: 3.5,
        body: 'The Mirada delivers a lot of features at a fair price, but there are some cost-cutting measures you\'ll notice. The window blinds feel cheap, a few cabinet doors needed adjustment, and the exterior storage compartment latches could be better. That said, the fundamentals are solid and Coachmen has been responsive to warranty claims. For the price, I\'d buy it again.',
        author: 'Cindy Haworth',
        photoCount: 1,
      },
    ],
  },

  viewerCount: 22,
  engagement: {
    isNewlyListed: true,
    listedDate: '14 days ago',
    viewCount: 487,
    saveCount: 56,
  },
};

// ─── Listing 28: Forest River Flagstaff SE 206STSE ──────────────────

const IMG_FLAGSTAFF = '/images/listings/flagstaff-se-206stse';

export const flagstaffListing: ListingData = {
  title: '2024 Forest River Flagstaff SE 206STSE',
  year: 2024,
  make: 'Forest River',
  model: 'Flagstaff SE',
  trim: '206STSE',

  stockNumber: 'FR24FS206ST',
  location: 'Fresno, CA',

  images: [
    { url: `${IMG_FLAGSTAFF}/69737542834d21207d0b1104.webp`, alt: '2024 Forest River Flagstaff SE 206STSE folding camper exterior set up at campsite' },
    { url: `${IMG_FLAGSTAFF}/699ef06e9a2c6a5549411f5a.webp`, alt: '2024 Forest River Flagstaff SE 206STSE interior showing dinette and galley kitchen' },
    { url: `${IMG_FLAGSTAFF}/699ef06f9a2c6a5549411f5c.webp`, alt: '2024 Forest River Flagstaff SE 206STSE king-size bed end with canvas walls' },
    { url: `${IMG_FLAGSTAFF}/699ef06f9a2c6a5549411f5d.webp`, alt: '2024 Forest River Flagstaff SE 206STSE exterior folded down for towing' },
    { url: `${IMG_FLAGSTAFF}/699ef0719a2c6a5549411f63.webp`, alt: '2024 Forest River Flagstaff SE 206STSE slide-out kitchen detail with stove and counter' },
  ],
  tagText: 'Price drop',
  totalPhotoCount: 5,

  currentPrice: 17000,
  originalPrice: 24995,
  monthlyPayment: 142,
  dealRating: 'great',

  aiSummary: 'The 2024 Forest River Flagstaff SE 206STSE is a folding pop-up camper that offers surprising livability in an extremely towable package. At under 3,500 lbs GVWR, it can be pulled by virtually any SUV, crossover, or minivan, making it accessible to families who don\'t want to buy a heavy-duty tow vehicle.\n\nThis unit has been marked down nearly $8K from its original asking price, representing exceptional value for a nearly-new pop-up with modern amenities. The Flagstaff SE line features hard sides and a power lift system that sets up in minutes, bridging the gap between traditional tent camping and full-featured travel trailers.',

  vhrAvailable: true,
  vhrHighlights: ['No accidents reported', '1 previous owner', 'Used for one camping season'],

  isNegotiable: true,

  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Folding Pop-Up Camper' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '21 ft. (open)' },
    { icon: 'weight', label: 'GVWR', value: '3,491 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '6' },
  ],
  vin: '4X4TCKE25SF777789',
  daysOnSite: 32,

  priceAnalysis: {
    rangeMin: 14000,
    rangeMax: 26000,
    averagePrice: 19500,
    explanation: 'Based on similar 2023-2024 Forest River Flagstaff folding campers within 500 miles, this listing is priced well below market average after multiple price reductions. This represents strong value for a lightly-used, current-model pop-up.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '01/27/26', change: 'Listed', price: 24995 },
      { date: '02/10/26', change: 'Price reduced', price: 21000 },
      { date: '02/22/26', change: 'Price reduced', price: 17000 },
    ],
  },

  description: 'Lightly used 2024 Forest River Flagstaff SE 206STSE folding pop-up camper in excellent condition. This versatile camper features a power lift system for easy setup, two king-size bed ends with comfortable mattresses, a dinette that converts to additional sleeping, and a compact galley kitchen with a two-burner stove, sink, and refrigerator. The slide-out kitchen extension provides additional counter space and storage. At just 21 feet when open and under 3,500 lbs GVWR, this camper can be towed by most family vehicles including SUVs, crossovers, and even some sedans. When folded down for towing, it sits low and aerodynamic, minimizing wind drag and fuel consumption. The hard-side construction with canvas extensions provides better insulation and weather protection than traditional tent pop-ups. Used for only one camping season by the original owner, this unit is in near-new condition at a fraction of new retail price.',

  loanMonthlyPayment: 142,

  dealer: {
    name: 'Camping World',
    location: 'Fresno, CA',
    address: '4455 N Blackstone Ave, Fresno, CA 93726',
    phone: '(559) 555-0198',
    callCode: '5512',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Camping World Fresno is part of the nation\'s largest RV dealer network. Our Fresno location features a massive inventory of new and used RVs from all major brands, a full-service parts and accessories superstore, and a certified service center. We offer competitive financing, extended service plans, and nationwide warranty coverage. As a Good Sam member, you\'ll enjoy exclusive discounts and benefits.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 12,
  },

  resultPosition: 28,
  totalResults: 4521,

  similarListings: [
    {
      id: 'sim-28-1',
      title: '2025 Keystone Hideout Sport 175BH',
      year: 2025,
      make: 'Keystone',
      model: 'Hideout Sport',
      price: 19450,
      imageUrl: '/images/listings/hideout-sport-175bh/697379bff04761f33b06e7f6.webp',
      dealer: 'Camping World',
      location: 'Bakersfield, CA',
    },
    {
      id: 'sim-28-2',
      title: '2024 nuCamp Scope 18M',
      year: 2024,
      make: 'nuCamp',
      model: 'Scope',
      price: 21999,
      imageUrl: '/images/listings/scope-18m/693a7ad1920b271659158af6.webp',
      dealer: 'Princess Craft RV',
      location: 'Round Rock, TX',
    },
    {
      id: 'sim-28-3',
      title: '2021 Airstream Basecamp 20X',
      year: 2021,
      make: 'Airstream',
      model: 'Basecamp',
      price: 44999,
      imageUrl: '/images/listings/basecamp-20x/6914ef1e3aa862b8be06f25e.webp',
      dealer: 'Riverside RV Sales',
      location: 'Riverside, CA',
    },
    {
      id: 'sim-28-4',
      title: '2005 Fleetwood Tioga 26Q',
      year: 2005,
      make: 'Fleetwood',
      model: 'Tioga',
      price: 23699,
      imageUrl: '/images/listings/tioga-26q/6974547df492ec295b09c87e.webp',
      dealer: 'B&L RV',
      location: 'El Cajon, CA',
    },
    {
      id: 'sim-28-5',
      title: '2025 Jayco Jay Flight SLX 380DQS',
      year: 2025,
      make: 'Jayco',
      model: 'Jay Flight SLX',
      price: 35930,
      imageUrl: '/images/listings/jay-flight-slx-380dqs/69736dbdf100879bc90354d4.webp',
      dealer: 'Roy Robinson RV',
      location: 'Marysville, WA',
    },
    {
      id: 'sim-28-6',
      title: '2014 Chevrolet Express 1500 Camper',
      year: 2014,
      make: 'Chevrolet',
      model: 'Express',
      price: 34800,
      imageUrl: '/images/listings/express-1500-camper/61b2da39aa488356005052b2.webp',
      dealer: 'Timeless Autocare',
      location: 'San Diego, CA',
    },
  ],

  categories: [
    'Pop-up campers',
    'Forest River RVs',
    'RVs under $20K',
    'Lightweight trailers',
    'Used pop-up campers',
    'Family RVs',
    'Forest River Flagstaff',
  ],

  reviews: {
    overallRating: 4.3,
    totalReviews: 76,
    distribution: [38, 24, 10, 3, 1],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 4.0 },
      { icon: 'tag', label: 'Cost of ownership', score: 5.0 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5.0 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 3.5 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.0 },
    ],
    reviews: [
      {
        id: 'rev-28-1',
        title: 'Best of both worlds - camping meets comfort',
        modelYear: '2024 Forest River Flagstaff SE 206STSE',
        rating: 4.5,
        body: 'We wanted something our RAV4 could tow and this fit the bill perfectly. The power lift makes setup a breeze — we can go from parked to set up in under 10 minutes. The king bed ends are genuinely comfortable and the kids love sleeping in the dinette conversion. It\'s not a hard-wall trailer but it\'s a massive upgrade from tent camping. Our favorite feature is how low the towing profile is — almost no wind resistance on the highway.',
        author: 'Maria Santos',
        photoCount: 4,
      },
      {
        id: 'rev-28-2',
        title: 'Great starter camper for families',
        modelYear: '2023 Forest River Flagstaff SE 206STSE',
        rating: 4.0,
        body: 'This is our family\'s first RV and it\'s been a great introduction to camping with kids. The canvas sides do let in some outside noise and it can get warm on hot days, but that\'s the nature of pop-ups. The kitchen is functional enough for basic meals, and we love that we can tow it with our Highlander. At this price point, nothing else gives you this much sleeping space.',
        author: 'Kevin Park',
        photoCount: 2,
      },
    ],
  },

  viewerCount: 8,
  engagement: {
    isNewlyListed: false,
    listedDate: '32 days ago',
    viewCount: 645,
    saveCount: 83,
  },

  gvwr: 3491,
  tongueWeight: 349,
  hitchType: 'bumper-pull',
};

// ─── Listing 29: Tiffin Wayfarer 25QW ───────────────────────────────

const IMG_WAYFARER_QW = '/images/listings/wayfarer-25qw';

export const wayfarerQwListing: ListingData = {
  title: '2019 Tiffin Wayfarer 25QW',
  year: 2019,
  make: 'Tiffin Motorhomes',
  model: 'Wayfarer',
  trim: '25QW',

  stockNumber: 'TM19WF25QW',
  location: 'Roseville, CA',

  images: [
    { url: `${IMG_WAYFARER_QW}/69736b7f3ca3bd7ded0364b8.webp`, alt: '2019 Tiffin Wayfarer 25QW exterior front three-quarter view on Mercedes Sprinter chassis' },
    { url: `${IMG_WAYFARER_QW}/699ee9f3c7ddfa4ed54a2894.webp`, alt: '2019 Tiffin Wayfarer 25QW interior cab and cockpit with Mercedes controls' },
    { url: `${IMG_WAYFARER_QW}/699ee9f4c7ddfa4ed54a2895.webp`, alt: '2019 Tiffin Wayfarer 25QW interior living area with leather sofa and hardwood floors' },
    { url: `${IMG_WAYFARER_QW}/699ee9f5c7ddfa4ed54a2897.webp`, alt: '2019 Tiffin Wayfarer 25QW kitchen with solid surface counters and residential appliances' },
    { url: `${IMG_WAYFARER_QW}/699ee9f6c7ddfa4ed54a2898.webp`, alt: '2019 Tiffin Wayfarer 25QW rear bedroom with queen bed and wardrobe storage' },
    { url: `${IMG_WAYFARER_QW}/699ee9f9c7ddfa4ed54a289f.webp`, alt: '2019 Tiffin Wayfarer 25QW bathroom with glass-enclosed shower and vanity' },
    { url: `${IMG_WAYFARER_QW}/699ee9f9c7ddfa4ed54a28a0.webp`, alt: '2019 Tiffin Wayfarer 25QW interior bathroom with shower toilet and vanity' },
  ],
  tagText: 'Mercedes diesel',
  totalPhotoCount: 7,

  currentPrice: 84995,
  originalPrice: 99900,
  monthlyPayment: 708,
  dealRating: 'good',

  aiSummary: 'The 2019 Tiffin Wayfarer 25QW is a premium Class C motorhome built on the Mercedes-Benz Sprinter 3500 diesel chassis. Tiffin is one of the most respected names in the motorhome industry, known for exceptional build quality and customer service, and the Wayfarer brings that reputation to the compact Class C segment.\n\nThe QW floorplan features a rear queen bed, full bathroom, and a well-appointed living area with hardwood floors and leather furnishings. The Mercedes 3.0L V6 turbo diesel delivers excellent fuel economy (15-18 mpg) and long-term reliability. At $85K, this pre-owned Wayfarer represents significant savings over new Sprinter-based Class C coaches that start at $140K+.',

  vhrAvailable: true,
  vhrHighlights: ['No accidents reported', '1 previous owner', 'Mercedes dealer service records', 'All recalls completed'],

  isNegotiable: true,

  specs: [
    { icon: 'rv_type', label: 'RV type', value: 'Class C' },
    { icon: 'condition', label: 'Condition', value: 'Used' },
    { icon: 'width', label: 'Length', value: '25 ft.' },
    { icon: 'weight', label: 'GVWR', value: '11,030 lbs.' },
    { icon: 'bed', label: 'Sleeping capacity', value: '4' },
  ],
  vin: 'WDAPF4CC5KP800890',
  daysOnSite: 26,

  priceAnalysis: {
    rangeMin: 78000,
    rangeMax: 105000,
    averagePrice: 91000,
    explanation: 'Based on similar 2018-2020 Tiffin Wayfarer models within 500 miles, this listing is priced below market average. Low-mileage Sprinter-based Tiffins hold their value well and this unit represents solid value at the current asking price.',
    learnMoreUrl: '#',
    priceHistory: [
      { date: '02/02/26', change: 'Listed', price: 99900 },
      { date: '02/16/26', change: 'Price reduced', price: 89995 },
      { date: '02/24/26', change: 'Price reduced', price: 84995 },
    ],
  },

  description: 'Pre-owned 2019 Tiffin Wayfarer 25QW Class C motorhome on the Mercedes-Benz Sprinter 3500 chassis with the fuel-efficient 3.0L V6 turbo diesel engine. This premium compact motorhome combines Tiffin\'s legendary build quality with the refinement and reliability of the Mercedes platform. The QW floorplan features a private rear queen bedroom, a full bathroom with glass-enclosed shower, and a spacious living area with a leather sofa and swivel cab seats that create a comfortable lounge. The kitchen offers solid surface countertops, a two-burner cooktop, convection microwave, and residential-style refrigerator. Genuine hardwood floors throughout give the interior an upscale, residential feel. The Mercedes chassis provides confident handling, excellent fuel economy (15-18 mpg), and features like lane-keeping assist and collision avoidance. Tiffin\'s renowned customer service and lifetime warranty to the original owner (transferable in some cases) add peace of mind. This single-owner unit has been meticulously maintained with full Mercedes dealer service records.',

  loanMonthlyPayment: 708,

  dealer: {
    name: 'Camping World',
    location: 'Roseville, CA',
    address: '1039 Orlando Ave, Roseville, CA 95661',
    phone: '(916) 555-0247',
    callCode: '4187',
    hours: 'Mon-Sat 9AM-7PM, Sun 10AM-5PM',
    logoUrl: '/images/roy-robinson-rv-logo.png',
    bio: 'Camping World Roseville serves the greater Sacramento area with a wide selection of new and used RVs, a comprehensive parts and accessories store, and a factory-certified service center. As part of the Camping World and Good Sam family, we offer nationwide warranty coverage, competitive financing, and exclusive member benefits. Our knowledgeable sales team can help you find the right RV for your lifestyle and budget.',
    websiteUrl: '#',
    isTop50: true,
    yearsOnRvTrader: 12,
  },

  resultPosition: 29,
  totalResults: 4521,

  similarListings: [
    {
      id: 'sim-29-1',
      title: '2022 Tiffin Wayfarer 25XPW',
      year: 2022,
      make: 'Tiffin Motorhomes',
      model: 'Wayfarer',
      price: 134900,
      imageUrl: '/images/listings/wayfarer-25xpw/69854b19be24c14a9c0fe562.webp',
      dealer: 'La Mesa RV',
      location: 'Sanford, FL',
    },
    {
      id: 'sim-29-2',
      title: '2020 Mercedes-Benz Sprinter 2500 AWD',
      year: 2020,
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      price: 109900,
      imageUrl: '/images/listings/sprinter-2500-awd/69a20be82c6950a39a017612.webp',
      dealer: 'Pacific Coast RV',
      location: 'Oxnard, CA',
    },
    {
      id: 'sim-29-3',
      title: '2025 Pleasure-Way Plateau XLTW',
      year: 2025,
      make: 'Pleasure-Way',
      model: 'Plateau',
      price: 189950,
      imageUrl: '/images/listings/plateau-xltw/693b60ea9d69b3e59201c085.webp',
      dealer: 'La Mesa RV',
      location: 'San Diego, CA',
    },
    {
      id: 'sim-29-4',
      title: '2026 Forest River Sunseeker 1950LE',
      year: 2026,
      make: 'Forest River',
      model: 'Sunseeker',
      price: 76995,
      imageUrl: '/images/listings/sunseeker-1950le/hero.png',
      dealer: 'Fun Town RV',
      location: 'Sacramento, CA',
    },
    {
      id: 'sim-29-5',
      title: '2026 Coachmen Mirada 29FW',
      year: 2026,
      make: 'Coachmen',
      model: 'Mirada',
      price: 156995,
      imageUrl: '/images/listings/mirada-29fw/6916dc7af8d900ed3d027532.webp',
      dealer: 'Motor Home Specialist',
      location: 'Alvarado, TX',
    },
    {
      id: 'sim-29-6',
      title: '2025 Tiffin Allegro Open Road 32SA',
      year: 2025,
      make: 'Tiffin Motorhomes',
      model: 'Allegro Open Road',
      price: 189995,
      imageUrl: '/images/listings/allegro-open-road-32sa/695d6197b5b92c215d071374.webp',
      dealer: 'La Mesa RV',
      location: 'Fort Myers, FL',
    },
  ],

  categories: [
    'Class C motorhomes',
    'Tiffin RVs',
    'Mercedes diesel RVs',
    'RVs under $100K',
    'Used Class C',
    'Sprinter motorhomes',
    'Tiffin Wayfarer',
  ],

  reviews: {
    overallRating: 4.7,
    totalReviews: 224,
    distribution: [142, 56, 18, 6, 2],
    categories: [
      { icon: 'shield_check', label: 'Quality & reliability', score: 5.0 },
      { icon: 'tag', label: 'Cost of ownership', score: 3.5 },
      { icon: 'rv_type', label: 'Driving/Towing', score: 5.0 },
      { icon: 'grid_view', label: 'Floorplan & storage', score: 4.0 },
      { icon: 'bed', label: 'Comfort & liveability', score: 4.5 },
    ],
    reviews: [
      {
        id: 'rev-29-1',
        title: 'The Rolls Royce of small Class C motorhomes',
        modelYear: '2019 Tiffin Wayfarer 25QW',
        rating: 5.0,
        body: 'After owning three different Class C motorhomes from other manufacturers, the Tiffin Wayfarer is in a completely different league. The build quality is immediately apparent — real hardwood floors, solid cabinetry, no rattles on the road. The Mercedes diesel gets us 16-17 mpg consistently and the chassis handles like a large car, not a truck. Tiffin\'s customer service is legendary for a reason — they treated us like family when we had a minor warranty issue.',
        author: 'Robert and Linda Whitfield',
        photoCount: 7,
      },
      {
        id: 'rev-29-2',
        title: 'Premium coach, premium experience',
        modelYear: '2020 Tiffin Wayfarer 25QW',
        rating: 4.5,
        body: 'The Wayfarer is everything we wanted — compact enough to drive daily, luxurious enough to live in comfortably. The Mercedes platform is refined and the Tiffin fitout is top-notch. Our only complaint is that Sprinter parts and service can be expensive when something goes wrong. Budget for Mercedes-level maintenance costs. But the driving experience and fuel economy more than offset it for us.',
        author: 'Christine Nakamura',
        photoCount: 3,
      },
    ],
  },

  viewerCount: 13,
  engagement: {
    isNewlyListed: false,
    listedDate: '26 days ago',
    viewCount: 589,
    saveCount: 64,
  },
};

// ─── Aggregate exports ──────────────────────────────────────────────

export const allListings: { slug: string; data: ListingData }[] = [
  { slug: 'sunseeker-1950le', data: sunseekerListing },
  { slug: 'jay-flight-slx-380dqs', data: jayFlightListing },
  { slug: 'dutch-star-4020', data: dutchStarListing },
  { slug: 'sprinter-2500-awd', data: sprinterListing },
  { slug: 'plateau-xltw', data: plateauListing },
  { slug: 'flying-cloud-23fbq', data: flyingCloudListing },
  { slug: 'bambi-sport-16', data: bambiListing },
  { slug: 'riverstone-420re', data: riverstoneListing },
  { slug: 'sunseeker-3010dsf', data: sunseeker3010Listing },
  { slug: 'fuzion-430', data: fuzionListing },
  { slug: 'heritage-glen-378fl', data: heritageGlenListing },
  { slug: 'scope-18m', data: scopeListing },
  { slug: 'freedom-traveler-a24', data: freedomTravelerListing },
  { slug: 'hideout-sport-175bh', data: hideoutListing },
  { slug: 'allegro-open-road-32sa', data: allegroListing },
  { slug: 'blazen-275bcrxl', data: blazenListing },
  { slug: 'eagle-321rsts', data: eagleListing },
  { slug: 'wayfarer-25xpw', data: wayfarerListing },

  { slug: 'transit-250-camper', data: transitListing },
  { slug: 'chateau-22e', data: chateauListing },
  { slug: 'express-1500-camper', data: expressListing },
  { slug: 'reflection-100-27bh', data: reflection100Listing },
  { slug: 'basecamp-20x', data: basecampListing },
  { slug: 'tioga-26q', data: tiogaListing },
  { slug: 'reflection-150-260rd', data: reflection150Listing },
  { slug: 'mirada-29fw', data: miradaListing },
  { slug: 'flagstaff-se-206stse', data: flagstaffListing },
  { slug: 'wayfarer-25qw', data: wayfarerQwListing },
];

// ─── Image sorting helper ────────────────────────────────────────────
// Puts exterior photos first (after hero at [0]). Used in cloneListing and listingsBySlug.
function sortExteriorFirst(images: ListingData['images']): ListingData['images'] {
  if (images.length <= 1) return images;
  const hero = images[0];
  const rest = images.slice(1);
  const ext = rest.filter(img => img.alt.toLowerCase().includes('exterior'));
  const other = rest.filter(img => !img.alt.toLowerCase().includes('exterior'));
  return [hero, ...ext, ...other];
}

// ─── Duplicate listings (different price + rotated gallery) ──────────

function cloneListing(data: ListingData, priceMultiplier: number, imageRotation: number): ListingData {
  // Pick a unique exterior photo as hero so SRP cards look different for same-model listings.
  // Then sort remaining images: exterior first, interior after.
  const exteriorIndices = data.images
    .map((img, i) => (img.alt.toLowerCase().includes('exterior') ? i : -1))
    .filter(i => i >= 0);

  let reordered: typeof data.images;
  if (exteriorIndices.length > 1) {
    const heroIdx = exteriorIndices[imageRotation % exteriorIndices.length];
    const hero = data.images[heroIdx];
    const rest = data.images.filter((_, i) => i !== heroIdx);
    reordered = sortExteriorFirst([hero, ...rest]);
  } else {
    reordered = sortExteriorFirst([...data.images]);
  }

  const newPrice = Math.round(data.currentPrice * priceMultiplier / 100) * 100;
  const newOriginal = Math.round(data.originalPrice * priceMultiplier / 100) * 100;
  const monthlyEstimate = Math.round(newPrice / 240 * 1.06);

  return {
    ...data,
    images: reordered,
    currentPrice: newPrice,
    originalPrice: newOriginal,
    monthlyPayment: monthlyEstimate,
    loanMonthlyPayment: monthlyEstimate,
    stockNumber: data.stockNumber + '-B',
    daysOnSite: Math.max(1, data.daysOnSite + Math.floor((priceMultiplier - 1) * 50)),
    priceAnalysis: {
      ...data.priceAnalysis,
      priceHistory: [
        { date: '01/15/26', change: 'Listed', price: newOriginal },
        ...(newPrice !== newOriginal
          ? [{ date: '02/10/26', change: 'Price reduced', price: newPrice }]
          : []),
      ],
    },
    engagement: {
      ...data.engagement,
      viewCount: Math.round(data.engagement.viewCount * (0.6 + Math.random() * 0.8)),
      saveCount: Math.round(data.engagement.saveCount * (0.5 + Math.random() * 0.8)),
    },
    viewerCount: Math.floor(Math.random() * 12) + 2,
  };
}

const priceVariants: { suffix: string; multiplier: number; rotation: number }[] = [
  { suffix: '-2', multiplier: 0.92, rotation: 2 },
  { suffix: '-3', multiplier: 1.08, rotation: 4 },
  { suffix: '-4', multiplier: 0.85, rotation: 1 },
  { suffix: '-5', multiplier: 1.15, rotation: 3 },
  { suffix: '-6', multiplier: 0.95, rotation: 5 },
  { suffix: '-7', multiplier: 1.05, rotation: 6 },
  { suffix: '-8', multiplier: 0.88, rotation: 3 },
  { suffix: '-9', multiplier: 1.12, rotation: 5 },
  { suffix: '-10', multiplier: 0.82, rotation: 7 },
  { suffix: '-11', multiplier: 1.18, rotation: 1 },
  { suffix: '-12', multiplier: 0.90, rotation: 6 },
  { suffix: '-13', multiplier: 1.10, rotation: 2 },
];

const duplicatedListings: { slug: string; data: ListingData }[] = allListings.flatMap(
  ({ slug, data }) =>
    priceVariants.map(({ suffix, multiplier, rotation }) => ({
      slug: slug + suffix,
      data: cloneListing(data, multiplier, rotation),
    })),
);

allListings.push(...duplicatedListings);

// ─── Export with exterior-first image sorting baked in ───────────────
// Sort images at export time (not via mutation) so every consumer gets exterior-first order.
export const listingsBySlug: Record<string, ListingData> = Object.fromEntries(
  allListings.map(l => [l.slug, { ...l.data, images: sortExteriorFirst(l.data.images) }])
);
