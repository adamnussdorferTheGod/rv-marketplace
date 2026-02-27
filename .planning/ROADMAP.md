# Roadmap: RV Marketplace

## Milestones

- [x] **v1.0 MVP** - Phases 1-9 (shipped 2026-02-22)
- [ ] **v2.0 AI Video Walkthrough** - Phases 10-14 (in progress)
- [ ] **v3.0 Lifestyle Context** - Phases 15-18 (in progress)
- [ ] **v4.0 Search Results Page** - Phases 24-29 (planned)
- [ ] **v5.0 Homepage** - Phases 19-23 (planned)

## Phases

<details>
<summary>v1.0 MVP (Phases 1-9) - SHIPPED 2026-02-22</summary>

- [x] **Phase 1: Foundation** - Design tokens, TypeScript data contracts, sample data, and icon system
- [x] **Phase 2: Shared UI Primitives** - Reusable primitive components used across multiple VDP sections
- [x] **Phase 3: Page Layout** - Page chrome (header, footer, cross-promotions) and two-column layout skeleton
- [x] **Phase 4: Above-the-Fold Sections** - Navigation, title, photo gallery, and price display
- [x] **Phase 5: Left Column Upper Content** - AI summary through description (7 sections, highest engagement content)
- [x] **Phase 6: Left Column Lower Content** - Loan calculator through disclaimer (5 sections, supporting content)
- [x] **Phase 7: Sidebar** - Dealer contact card, popularity stats, and sidebar ad slots
- [x] **Phase 8: Full-Width Bottom Sections** - Similar listings, related categories, insurance/accessories, and ad slots
- [x] **Phase 9: Integration and Polish** - Token compliance audit, PriceDistributionChart integration, and full-page assembly verification

### Phase 1: Foundation
**Goal**: Every component can reference design tokens and typed data from day one
**Plans**: 2/2 complete

Plans:
- [x] 01-01: Design tokens CSS (TIDE 2.0 + RV Trader), Montserrat font loading, global resets
- [x] 01-02: TypeScript data interfaces, sample listing data, shared Icon component

### Phase 2: Shared UI Primitives
**Goal**: Reusable UI primitives available so section components never duplicate common patterns
**Plans**: 2/2 complete

Plans:
- [x] 02-01: Stateless primitives: Divider, AdSlot, and ActionChip components
- [x] 02-02: Interactive primitives: ExpandableText and SegmentedButtons components

### Phase 3: Page Layout
**Goal**: Complete page chrome and two-column layout skeleton
**Plans**: 2/2 complete

Plans:
- [x] 03-01: Icons, CrossPromotionsBar, Header, and TwoColumnLayout components
- [x] 03-02: Footer component, VehicleDetailPage orchestrator, and App.tsx wiring

### Phase 4: Above-the-Fold Sections
**Goal**: Navigation, title, and photo gallery render with full visual fidelity
**Plans**: 2/2 complete

Plans:
- [x] 04-01: NavigationBar and TitleSection components
- [x] 04-02: PhotoGallery component with hero image, thumbnail grid, and overlay elements

### Phase 5: Left Column Upper Content
**Goal**: Primary content sections from price through description
**Plans**: 2/2 complete

Plans:
- [x] 05-01: PricePayment, AISummary, VehicleHistoryReport, WillingToNegotiate sections
- [x] 05-02: FeaturesAndSpecs, PriceAnalysis, Description sections

### Phase 6: Left Column Lower Content
**Goal**: Remaining left column sections from loan calculator through disclaimer
**Plans**: 2/2 complete

Plans:
- [x] 06-01: LoanCalculator, Resources, ReportListing, Disclaimer sections
- [x] 06-02: AboutDealership section + VehicleDetailPage wiring

### Phase 7: Sidebar
**Goal**: Dealer contact card, popularity stats, and ad placements
**Plans**: 1/1 complete

Plans:
- [x] 07-01: DealerContactCard, PopularityStats components + sidebar wiring

### Phase 8: Full-Width Bottom Sections
**Goal**: Below-the-fold discovery, cross-sell, and ad content
**Plans**: 2/2 complete

Plans:
- [x] 08-01: SimilarListings carousel with ListingCard and RelatedCategories chip grid
- [x] 08-02: InsuranceAccessories, AdSenseSection, and VehicleDetailPage wiring

### Phase 9: Integration and Polish
**Goal**: Complete VDP at 1790px matching reference layout
**Plans**: 1/1 complete

Plans:
- [x] 09-01: CSS token compliance, PriceDistributionChart integration, and full-page verification

</details>

<details>
<summary>v2.0 AI Video Walkthrough (Phases 10-14)</summary>

- [x] **Phase 10: Foundation and Gallery Entry Point** - Data types, sample walkthrough data, video state machine, and gallery thumbnail integration (completed 2026-02-25)
- [x] **Phase 11: Ken Burns Engine and Composition Canvas** - Photo motion presets, crossfade transitions, 5-act narrative structure, player shell, and single-timeline architecture (completed 2026-02-25)
- [ ] **Phase 12: Text Overlays and Audio Narration** - Timed visual overlays for listing info/specs/features/CTA, synchronized audio narration, and closed captions
- [ ] **Phase 13: Player Controls and Chapter Navigation** - Interactive playback controls, act progress indicator, chapter markers, listing context bar, and CTA buttons
- [ ] **Phase 14: Accessibility and Mobile Experience** - Keyboard shortcuts, ARIA dialog pattern, focus management, touch gestures, and responsive player sizing

### Phase 10: Foundation and Gallery Entry Point
**Goal**: Users discover the AI Video Tour feature through the gallery and the entire video state machine is established for all downstream phases to consume
**Depends on**: Phase 9 (v1.0 gallery exists)
**Requirements**: VID-01, VID-02, VID-03, VID-04, VID-05, GAL-01, GAL-02, GAL-03, GAL-04, GAL-05, GAL-06, GAL-07
**Success Criteria** (what must be TRUE):
  1. A video thumbnail with play button, "AI Video Tour" label, and duration badge appears as the first item in the photo gallery carousel
  2. Hovering the video thumbnail scales the play button and brightens the image, and clicking it opens a lightbox overlay (even if the overlay is initially empty)
  3. A "Watch AI Video Tour" text link below the photo gallery provides a secondary way to open the video
  4. The VideoWalkthroughContext provider exposes video state (idle/loading/playing/paused/seeking/ended/error) and dispatch actions to any consuming component via useVideoWalkthrough hook
  5. TypeScript types fully define the video walkthrough data shape (segments, acts, motion presets, overlays, audio timing) and a populated sample data file drives the Airstream listing tour
**Plans**: 3 plans

Plans:
- [x] 10-01-PLAN.md — TypeScript type definitions and sample 5-act walkthrough data
- [x] 10-02-PLAN.md — VideoWalkthroughContext provider with useReducer state machine and hook
- [x] 10-03-PLAN.md — VideoThumbnail component, PhotoGallery integration, and lightbox shell

### Phase 11: Ken Burns Engine and Composition Canvas
**Goal**: The video plays a cinematic photo tour with smooth motion and crossfade transitions inside a properly framed lightbox player
**Depends on**: Phase 10
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, PLAY-01, PLAY-02, PLAY-05, PLAY-06
**Success Criteria** (what must be TRUE):
  1. Photos animate with Ken Burns motion (zoom-in, zoom-out, or pan) that alternates direction between consecutive segments, with only the current photo GPU-promoted
  2. Crossfade transitions (500ms) between photo segments produce smooth visual flow with no hard cuts or dark flash artifacts
  3. The video follows a 5-act narrative structure (Hook / Exterior Tour / Interior Tour / Specs & Value / CTA) with logical photo sequencing from exterior to interior
  4. The player opens as a full-screen lightbox overlay (near-black backdrop, 900px max-width container) with close button, Escape to close, and a loading/poster state during buffering
  5. All visual state (current photo, animation, timing) derives from a single timeline source (currentSegmentIndex + elapsed time), not parallel independent timers
**Plans**: 3 plans

Plans:
- [x] 11-01-PLAN.md — Context extension, useTimeline hook, and KenBurnsLayer with CSS motion presets
- [x] 11-02-PLAN.md — CompositionCanvas crossfade orchestration and VideoPlayerShell integration with loading state
- [x] 11-03-PLAN.md — Gap closure: fix photo-to-act assignments and motion presets in sample data (COMP-05, COMP-06)

### Phase 12: Text Overlays and Audio Narration
**Goal**: Users see contextual listing information overlaid on the video and hear synchronized narration that guides them through the tour
**Depends on**: Phase 11
**Requirements**: OVRL-01, OVRL-02, OVRL-03, OVRL-04, OVRL-05, OVRL-06, OVRL-07, OVRL-08, OVRL-09, OVRL-10, AUD-01, AUD-02, AUD-03, AUD-04, AUD-05, AUD-06
**Success Criteria** (what must be TRUE):
  1. Act 1 displays title, price/location, and Deal Score badge overlays; subsequent acts show section labels, spec callouts, notable feature callouts, and a branded CTA overlay in the final act
  2. All text overlays fade in smoothly, remain visible for at least 3 seconds, use text shadow or semi-transparent background bars for legibility, and never exceed 2 lines on screen simultaneously
  3. Audio narration plays synchronized to photo segments with natural pauses between narration segments, driven by the single timeline source
  4. A closed captions toggle in the player controls shows synchronized narration transcript text on screen
  5. Audio elements are properly cleaned up on unmount (pause + removeAttribute src + load) to prevent memory leaks
**Plans**: TBD

Plans:
- [ ] 12-01: TextOverlayLayer with timed overlays for all 5 acts (title, price, deal score, section labels, specs, features, CTA)
- [ ] 12-02: Overlay timing, fade animations, legibility treatment, and max-lines constraint
- [ ] 12-03: Audio synchronization, narration pauses, sample MP3, captions toggle, and audio cleanup

### Phase 13: Player Controls and Chapter Navigation
**Goal**: Users can interactively control playback and navigate directly to any act in the video tour
**Depends on**: Phase 12
**Requirements**: PLAY-03, PLAY-04, PLAY-07, PLAY-08, PLAY-09, CHAP-01, CHAP-02, CHAP-03, CHAP-04
**Success Criteria** (what must be TRUE):
  1. Standard video controls are present: play/pause button, seek/scrub bar, elapsed/total time display, volume slider, mute toggle, and fullscreen button
  2. The video starts muted on open with a visible "Tap to unmute" prompt, respecting browser autoplay policies
  3. An act progress indicator with 5 labeled segments shows the current act, and clicking any segment jumps playback to that act's start time
  4. Chapter markers appear as dots on the seek bar at each act boundary
  5. A listing context bar below the player shows the vehicle title, price, and location, with "Contact Seller" and "Get Deal Kit" CTA buttons
**Plans**: TBD

Plans:
- [ ] 13-01: VideoControls component (play/pause, seek bar, time display, volume, mute, fullscreen, auto-hide)
- [ ] 13-02: Chapter/act progress indicator, act labels, chapter markers on seek bar, and seek-to-act behavior
- [ ] 13-03: Muted autoplay with unmute prompt, listing context bar, and CTA buttons

### Phase 14: Accessibility and Mobile Experience
**Goal**: The video player is fully keyboard-navigable, screen-reader accessible, and optimized for touch interaction on mobile devices
**Depends on**: Phase 13
**Requirements**: A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, A11Y-06, A11Y-07, MOB-01, MOB-02, MOB-03, MOB-04, MOB-05
**Success Criteria** (what must be TRUE):
  1. Keyboard shortcuts work: Space toggles play/pause, Left/Right arrows seek 5 seconds, M toggles mute, F toggles fullscreen, Escape closes the lightbox
  2. The lightbox implements the ARIA dialog pattern with a focus trap (Tab cannot escape to elements behind the overlay) and focus restores to the video thumbnail when the lightbox closes
  3. On mobile, the video plays inline (no iOS fullscreen takeover), tapping the video area toggles play/pause, and swiping down dismisses the lightbox
  4. The player fills the viewport on mobile with responsive sizing and all control targets meet the 44px minimum tap area
**Plans**: TBD

Plans:
- [ ] 14-01: Keyboard shortcuts for playback control
- [ ] 14-02: ARIA dialog pattern, focus trap, and focus restoration
- [ ] 14-03: Mobile inline playback, touch gestures (tap play/pause, swipe dismiss), responsive sizing, and touch-friendly controls

</details>

## v3.0 Lifestyle Context

**Milestone Goal:** Transform the VDP from a vehicle specification page into a lifestyle preview -- surfacing campgrounds and routes personalized to the listing's RV specs and the buyer's location.

**Phase Numbering:**
- Integer phases (15, 16, 17, 18): Planned milestone work
- Decimal phases (15.1, 16.1): Urgent insertions (marked with INSERTED)

- [x] **Phase 15: Data Layer and Section Shell** - TypeScript interfaces, sample PNW/Airstream data, RV compatibility logic, section container with tab navigation
- [x] **Phase 16: Destination Cards** - Campground cards with photos, drive times, ratings, compatibility badges, filter chips, expanded detail view, and desktop scroll layout
- [x] **Phase 17: Route Cards** - Road trip route cards with mini map previews, suitability badges, constraint notes, key stops, and desktop scroll layout
- [ ] **Phase 18: Mobile Polish** - Horizontal card scrolling with swipe gestures and overflowing tab chip scroll on mobile viewports

## Phase Details

### Phase 15: Data Layer and Section Shell
**Goal**: The Lifestyle Context section appears on the VDP with a location-aware header and working tab navigation, backed by typed sample data and RV compatibility logic
**Depends on**: Phase 9 (v1.0 VDP exists with Features & Specs section)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, SECT-01, SECT-02, SECT-03, SECT-04
**Success Criteria** (what must be TRUE):
  1. TypeScript interfaces exist for all lifestyle data (destinations, routes, location, RV specs) and a populated sample dataset provides Seattle/PNW campgrounds and routes for the Airstream Flying Cloud 25RB
  2. RV compatibility logic correctly computes Fits / Tight / Won't Fit from campground max RV length vs listing length (25ft), and this logic is testable independent of any UI
  3. A "Your RV Life from Seattle, WA" section appears on the VDP after Features & Specs, with the city/state derived from a hardcoded zip code
  4. The section container uses `--surface-secondary` background with 16px border-radius and spec-defined padding, and displays Destinations / Routes tab chips with active/inactive styling
  5. Clicking a tab chip switches the visible content area below the tab bar (placeholder content is acceptable at this phase)
**Plans**: 2 plans

Plans:
- [x] 15-01-PLAN.md — TypeScript interfaces, sample Seattle/PNW lifestyle data, and RV compatibility logic
- [x] 15-02-PLAN.md — LifestyleContext section container, location header, tab bar, and VDP integration

### Phase 16: Destination Cards
**Goal**: Users can browse campgrounds near their location, see at a glance whether their RV fits, filter by category, and tap into expanded campground details
**Depends on**: Phase 15
**Requirements**: DEST-01, DEST-02, DEST-03, DEST-04, DEST-05, DEST-06, DEST-07, DEST-08
**Success Criteria** (what must be TRUE):
  1. The Destinations tab shows campground cards sorted by drive time (closest first), each displaying name, region, photo, drive time, distance, hookup type, rating with review count, season, and price range
  2. Each destination card displays an RV compatibility badge (Fits / Tight / Won't Fit) with appropriate color coding based on the Airstream's 25ft length
  3. Filter chips above the cards (National Parks, State Parks, RV Resorts, Full Hookups, Pet Friendly) filter the visible cards, and the default view shows 6 cards with a "See all [X] destinations" link
  4. Tapping a destination card opens an expanded detail view with full campground information (bottom sheet overlay on mobile, expanded card on desktop)
  5. Desktop layout renders destination cards in a horizontal scroll row with 260px fixed card width
**Plans**: 2 plans

Plans:
- [x] 16-01-PLAN.md — DestinationCard component with all content fields and RV compatibility badge
- [x] 16-02-PLAN.md — DestinationsTab layout with filter chips, 6-card default, "See all" link, expanded detail view, and desktop horizontal scroll

### Phase 17: Route Cards
**Goal**: Users can browse curated road trips from their location, understand RV-specific constraints for each route, and see a visual route preview
**Depends on**: Phase 15
**Requirements**: ROUT-01, ROUT-02, ROUT-03, ROUT-04, ROUT-05, ROUT-06
**Success Criteria** (what must be TRUE):
  1. The Routes tab shows curated road trip routes from the user's location relevant to this RV type, each displaying route name, total distance, recommended duration (days), key stops, best season, and campground count
  2. Each route card includes a mini map preview rendered as a CSS placeholder (styled div with route line visualization, no mapping SDK)
  3. Each route card displays an RV suitability badge (Easy / Moderate / Challenging) with color coding and a suitability note explaining specific constraints for this RV (tight turns, length limits, steep grades)
  4. Desktop layout renders route cards in a scrollable row with consistent card styling matching destination cards
**Plans**: 2 plans

Plans:
- [x] 17-01-PLAN.md — RouteCard component with all content fields, mini map placeholder, suitability badge, and constraint notes
- [x] 17-02-PLAN.md — RoutesTab layout with horizontal scroll and LifestyleContext wiring

### Phase 18: Mobile Polish
**Goal**: The Lifestyle Context section is fully usable on mobile viewports with native-feeling scroll and swipe interactions
**Depends on**: Phase 16, Phase 17
**Requirements**: SECT-05, SECT-06
**Success Criteria** (what must be TRUE):
  1. Destination and route cards render in horizontally scrollable rows on mobile with native swipe gesture support (no custom scroll logic needed -- CSS overflow-x with snap points)
  2. Tab chips scroll horizontally when they overflow the mobile viewport, allowing access to all tabs without wrapping to a second row
**Plans**: 1 plan

Plans:
- [ ] 18-01-PLAN.md — Mobile horizontal scroll for cards and tab chips with CSS scroll snap

## v5.0 Homepage

**Milestone Goal:** Build the full homepage as the primary marketplace entry point -- hero search, listing carousels, dealer showcase, selling options, ownership resources, blog content, SEO links -- with react-router-dom routing across all pages.

**Figma reference:**
- Homepage: frame 1:9679 (1789x6316px)
- Expanded search: frame 1:10901 (1789x1566px)

**Reused components:** Header, Footer, CrossPromotionsBar, ListingCard, Button, Icon, ActionChip, SegmentedButtons, AdSlot, Divider

- [x] **Phase 19: Routing & Homepage Shell** - react-router-dom setup, route config, HomePage shell, Header logo link, SRP placeholder (completed 2026-02-26)
- [x] **Phase 20: Hero Banner & Search** - Hero image, search bar, segmented control, dealer spotlight, expanded search dropdown with RV type grid (completed 2026-02-26)
- [x] **Phase 21: Listing Carousels & Dealer Showcase** - Hand-picked carousel with filter chips, dealer showcase section, featured listings 2-row grid (completed 2026-02-26)
- [x] **Phase 22: Selling & Ownership Sections** - 3-panel selling section with tabs, 4 illustrated ownership cards (completed 2026-02-26)
- [ ] **Phase 23: Content, SEO & App Sections** - Blog/content section with tabs, popular searches SEO grid, app download + newsletter

### Phase 19: Routing & Homepage Shell
**Goal**: Users can navigate between Homepage, SRP, and VDP via client-side routing, with logo always linking to homepage
**Depends on**: Phase 9 (v1.0 core exists)
**Requirements**: NAV-01, NAV-02
**Success Criteria** (what must be TRUE):
  1. react-router-dom is installed and BrowserRouter wraps the app with routes for `/` (HomePage), `/search` (SRP placeholder), and `/listing/:id` (VDP)
  2. The RV Trader logo in the Header navigates to `/` on click from any page
  3. A minimal HomePage component renders at `/` with CrossPromotionsBar, Header, and Footer (content placeholder between)
  4. The existing VDP renders at `/listing/:id` with all current functionality preserved
  5. A placeholder SRP component renders at `/search` (empty shell for v4.0 to fill in)
**Plans**: 1 plan

Plans:
- [x] 19-01-PLAN.md — Install react-router-dom, create route config, HomePage shell, update Header/App.tsx

### Phase 20: Hero Banner & Search
**Goal**: Users see the marketplace hero banner and can interact with the search bar, which expands to show RV types, popular searches, and popular makes
**Depends on**: Phase 19
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, SRCH-01, SRCH-02, SRCH-03, SRCH-04, SRCH-05, SRCH-06
**Success Criteria** (what must be TRUE):
  1. A full-width hero banner displays an RV lifestyle background image with dark overlay and centered "Shop the largest RV marketplace" heading in white
  2. The search bar shows an AI sparkle icon, rotating placeholder text, ZIP code input, and green "Search" button, with "Shop RVs / Sell my RV" segmented control above
  3. Clicking the search input opens an expanded dropdown with 10 RV type thumbnails (5x2 grid using static image assets), popular search chips, popular make chips, and dealer chips
  4. Clicking outside the dropdown or pressing Escape closes it
  5. A dealer spotlight badge appears in the hero bottom-right with dealer logo, name, and "Shop inventory" link
**Plans**: 2 plans

Plans:
- [ ] 20-01-PLAN.md — HeroBanner component with background image, heading, search bar, segmented control, and dealer spotlight
- [ ] 20-02-PLAN.md — SearchDropdown component with RV type grid, popular searches, popular makes, dealer chips, and open/close behavior

### Phase 21: Listing Carousels & Dealer Showcase
**Goal**: Users can browse recommended listings, dealer inventory, and featured listings in horizontal carousels with filter chips and navigation
**Depends on**: Phase 19, Phase 20
**Requirements**: NAV-03, CARO-01, CARO-02, CARO-03, CARO-04, DEAL-01, DEAL-02, DEAL-03, FEAT-01, FEAT-02
**Success Criteria** (what must be TRUE):
  1. "RVs hand-picked for you" section shows a horizontal row of 5 listing cards with photo, title, location/distance, and price, plus left/right carousel arrows
  2. Filter chips above the carousel (Recommended, Used, New, Nearest, Deals, Travel trailers, Class A) toggle the active chip and filter visible cards
  3. The dealer showcase section shows dealer logo, name, tagline, "View inventory" and phone links, with a horizontal row of 5 dealer listing cards below
  4. "Featured listings" section shows 2 rows x 5 columns of listing cards with carousel navigation
  5. Clicking any listing card navigates to `/listing/:id`
**Plans**: 2 plans

Plans:
- [ ] 21-01-PLAN.md — HomepageListingCard, ListingCarousel with arrows, "RVs hand-picked for you" with filter chips, sample homepage listing data
- [ ] 21-02-PLAN.md — DealerShowcase section with branding and inventory row, FeaturedListings 2-row grid

### Phase 22: Selling & Ownership Sections
**Goal**: Users see selling options and RV ownership resources presented as visually rich cards
**Depends on**: Phase 19
**Requirements**: SELL-01, SELL-02, OWN-01, OWN-02
**Success Criteria** (what must be TRUE):
  1. "Selling made with you in mind" section shows a segmented tab control (Consignment / Sell privately / Cash offers) that switches between 3 panels
  2. Each selling panel has a large image, title, description, and CTA button matching the Figma 3-panel layout
  3. "Making RV ownership easy" section displays 4 cards in a row (Accessories, Insurance, Closing, Reviews) each with an illustration, title, description, and "Learn more" button
  4. Cards use `--surface-secondary` backgrounds with rounded corners matching design tokens
**Plans**: 2 plans

Plans:
- [ ] 22-01-PLAN.md — SellingSection with segmented tabs and 3 image/text panels
- [ ] 22-02-PLAN.md — OwnershipCards section with 4 illustrated cards

### Phase 23: Content, SEO & App Sections
**Goal**: Users can read blog content, explore popular search links, and download the app or subscribe to the newsletter
**Depends on**: Phase 19
**Requirements**: BLOG-01, BLOG-02, SEO-01, SEO-02, APP-01, APP-02, APP-03
**Success Criteria** (what must be TRUE):
  1. "Stay in the know" section has tab navigation (Owner reviews, News, Lifestyle, RV consulting) with a featured article image on left and 3 article title rows on right
  2. "Popular searches" section has tabbed categories with a 6-column x 3-row grid of search links showing term and result count
  3. App download section shows App Store and Google Play badges, newsletter signup with email input, and a row of 6 social media icons
  4. Ad banners (using AdSlot) appear between sections matching Figma placement
**Plans**: 2 plans

Plans:
- [ ] 23-01-PLAN.md — StayInTheKnow blog section with tabs, featured image, and article list
- [ ] 23-02-PLAN.md — PopularSearches SEO grid, AppDownload with badges/newsletter/social icons, ad banner placement

## v4.0 Search Results Page

**Milestone Goal:** Build the full SRP with filter sidebar, listing card grid, featured/sponsored carousels, pagination, and responsive breakpoints -- replacing the placeholder at `/search` with a fully functional search and browse experience powered by ~80 client-side sample listings.

**Figma reference:**
- SRP: frame 1:3997 (1762x9280px) -- "SRP -- Desktop 3"

**Layout:** 1762px full width, 330px filter sidebar + 1272px content area, 64px side margins, 3-column card grid (~403px each, 32px gaps)

**Reused components:** Header, Footer, CrossPromotionsBar, Button, Icon, ActionChip, SegmentedButtons, AdSlot, Divider

**Dependency:** Phase 19 (react-router-dom routing with `/search` route must exist)

- [x] **Phase 24: Data Layer & Filter Engine** - SRP TypeScript types, ~80 sample listings, client-side filter/sort engine, URL query sync, active filter chips (completed 2026-02-26)
- [x] **Phase 25: Listing Cards** - Standard card, featured compact card, sponsored showcase, PAA card, dealer ad card with all visual treatments (completed 2026-02-27)
- [ ] **Phase 26: Filter Sidebar** - All filter groups (keyword, location, condition, type, make/model, price, collapsible extras) with result count header and mobile overlay
- [ ] **Phase 27: SRP Page Assembly** - Two-column layout, breadcrumbs, sort controls, 3-col grid, interleaved carousels/ads, pagination
- [ ] **Phase 28: Page Chrome & Content Sections** - Header/footer reuse, SEO popular searches footer, app CTA banner, disclaimer
- [ ] **Phase 29: Responsive Breakpoints** - 991px and 767px breakpoint adaptations for grid, sidebar, carousels, and pagination

### Phase 24: Data Layer & Filter Engine
**Goal**: The entire SRP data pipeline is established -- typed listing data, realistic sample dataset, and a working filter/sort engine that syncs state to URL parameters
**Depends on**: Phase 19 (routing exists with `/search` route)
**Requirements**: DATA-05, DATA-06, DATA-07, DATA-08, DATA-09, DATA-10
**Success Criteria** (what must be TRUE):
  1. TypeScript interfaces extend existing ListingData with SRP-specific fields (photo array, tag badges, featured flag, sponsored flag) and all ~80 sample listings conform to the type
  2. The filter engine accepts filter criteria (type, make/model, price range, year range, condition, location/radius, length, floor plan, sleeping capacity, fuel type, keyword) and returns a filtered subset of listings
  3. The sort engine reorders results by relevance (default), price low-to-high, price high-to-low, newest, or distance
  4. Navigating to `/search?type=travel-trailer&priceMax=50000` applies those filters on page load, and changing filters updates the URL without full page reload
  5. Active filters render as removable chips, and clicking a chip's remove button clears that single filter; a "Clear all" action resets all filters and the URL
**Plans**: 2 plans

Plans:
- [ ] 24-01-PLAN.md — SRP TypeScript interfaces and ~80 sample listing dataset with realistic variety
- [ ] 24-02-PLAN.md — Pure filter/sort engine, useSrpFilters hook with URL query sync and active filter chips

### Phase 25: Listing Cards
**Goal**: All SRP card variants are built as standalone components ready for placement in the grid and carousels
**Depends on**: Phase 24 (typed listing data exists)
**Requirements**: CARD-01, CARD-02, CARD-03, CARD-04, CARD-05, CARD-06
**Success Criteria** (what must be TRUE):
  1. The standard listing card displays a photo with carousel dots, tag badge (e.g., "Price reduced"), favorite heart toggle, condition label, title, price with optional strikethrough original, and "More info" CTA button
  2. Below a divider, the card shows dealer name, city/state with distance, and "Trusted partner" badge when applicable
  3. The featured/compact card variant (242px width) renders in horizontal carousels with photo, title, price, and dealer location
  4. A sponsored "Native Summit Showcase" section renders a branded dealer header with description and a row of featured card carousels
  5. PAA (People Also Asked) and dealer ad card variants render as inline content within the grid and sidebar respectively
**Plans**: 2 plans

Plans:
- [ ] 25-01-PLAN.md — SRPListingCard with photo carousel dots, tag badge, heart toggle, condition label, price, and dealer info section
- [ ] 25-02-PLAN.md — FeaturedCard compact variant, SponsoredShowcase section, PAACard, and DealerAdCard

### Phase 26: Filter Sidebar
**Goal**: Users can narrow search results using a full filter sidebar with all filter groups from the Figma design
**Depends on**: Phase 24 (filter engine exists), Phase 25 (cards exist for result count context)
**Requirements**: FILT-01, FILT-02, FILT-03, FILT-04, FILT-05, FILT-06, FILT-07, FILT-08, FILT-09, FILT-10
**Success Criteria** (what must be TRUE):
  1. The 330px filter sidebar displays a result count header (e.g., "1,234 results") with a "Clear all" link, and active filter chips with individual remove buttons appear at the top
  2. Keyword search input, location/ZIP with radius dropdown, and New/Used/All segmented toggle are always visible at the top of the sidebar
  3. RV Type filter shows a checkbox list with thumbnail images for each type; Make & Model shows a hierarchical multi-select with search, expandable make-to-model tree, and "See all options" link
  4. Price filter includes Cash/Finance tab toggle, min/max inputs (with down payment + monthly payment for finance mode), term slider, and "Estimated buying power" callout
  5. Additional filters (Length, Year, Bunkhouse, Fuel type, Sleeping capacity, Floor plan, Gross vehicle weight) render as collapsible groups, and on mobile the entire sidebar converts to a full-screen overlay triggered by a filter button
**Plans**: TBD

Plans:
- [ ] 26-01: FilterSidebar shell with result count header, active chips, keyword search, location/radius, and condition toggle
- [ ] 26-02: RV Type checkbox filter with thumbnails, Make & Model hierarchical multi-select with search
- [ ] 26-03: Price filter with Cash/Finance tabs and buying power callout, collapsible filter groups, and mobile overlay trigger

### Phase 27: SRP Page Assembly
**Goal**: The complete SRP page renders at `/search` with filter sidebar, listing grid, interleaved content sections, and pagination -- replacing the placeholder component
**Depends on**: Phase 24, Phase 25, Phase 26
**Requirements**: LAYO-01, LAYO-02, LAYO-03, LAYO-04, LAYO-05, LAYO-06
**Success Criteria** (what must be TRUE):
  1. The page renders a two-column layout with 330px filter sidebar on the left and 1272px content area on the right, with 64px side margins
  2. The content area header shows breadcrumbs (Home > Browse RVs > [Type]), page title "New and used [Type] RVs for sale", and a descriptive subtitle with "Show more" toggle
  3. A sort controls row with "Sort by: Default" dropdown and "Save search" heart button aligns to the right above the listing grid
  4. Listing cards render in a 3-column grid (~403px each, 32px gaps) with featured/sponsored carousels and mid-page ad slots interspersed between card rows
  5. Pagination at the bottom shows numbered pages, prev/next arrows, ellipsis for large ranges, and "X-Y of Z results" count
**Plans**: TBD

Plans:
- [ ] 27-01: SRPLayout two-column container, breadcrumbs, page title with subtitle toggle, sort controls row
- [ ] 27-02: Listing grid with 3-column layout, interleaved featured carousels and ad slots, pagination component, and SearchResultsPage wiring

### Phase 28: Page Chrome & Content Sections
**Goal**: The SRP includes all surrounding chrome -- reused header/footer, SEO links, app CTA banner, and disclaimer -- completing the full-page experience
**Depends on**: Phase 27 (page layout exists)
**Requirements**: CHRO-01, CHRO-02, CHRO-03, CHRO-04, CHRO-05
**Success Criteria** (what must be TRUE):
  1. The SRP reuses the existing Header with CrossPromotionsBar and Footer components from the VDP without duplication
  2. A "Popular searches" SEO footer section displays categorized link grids below the main results area
  3. An app download CTA banner with phone mockup, QR code, and App Store/Google Play badges appears between results and footer
  4. A disclaimer text block at the bottom of the results area notes AI-enhanced photos and third-party data accuracy
**Plans**: TBD

Plans:
- [ ] 28-01: SearchResultsPage chrome wiring (Header, Footer, CrossPromotionsBar), SEO popular searches footer, app CTA banner, and disclaimer text

### Phase 29: Responsive Breakpoints
**Goal**: The SRP adapts gracefully to tablet and mobile viewports using the existing project breakpoints
**Depends on**: Phase 27 (full page layout exists), Phase 26 (sidebar exists for overlay conversion)
**Requirements**: RESP-01, RESP-02, RESP-03, RESP-04
**Success Criteria** (what must be TRUE):
  1. At the 991px breakpoint, the card grid switches to 2 columns and the filter sidebar collapses into a full-screen overlay accessible via a filter button
  2. At the 767px breakpoint, the card grid switches to a single column with a fully stacked layout
  3. Featured carousels adapt to show fewer visible cards at smaller breakpoints (e.g., 3 cards at tablet, 1-2 at mobile)
  4. Pagination adapts to show fewer visible page numbers on mobile (e.g., current +/- 1 with ellipsis)
**Plans**: TBD

Plans:
- [ ] 29-01: 991px breakpoint -- 2-col grid, sidebar overlay with filter button trigger
- [ ] 29-02: 767px breakpoint -- single-column grid, stacked layout, carousel and pagination mobile adaptations

## Progress

**Execution Order:**
- v1.0 (Phases 1-9): Complete
- v2.0 (Phases 10-14): Phases 10-11 complete, 12-14 remaining
- v3.0 (Phases 15-18): Phases 15-17 complete, 18 remaining
- v5.0 (Phases 19-23): 19 -> 20 -> 21 -> 22/23 (Phases 22 and 23 can run in parallel)
- v4.0 (Phases 24-29): 24 -> 25 -> 26 -> 27 -> 28/29 (depends on Phase 19 for routing)

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 2/2 | Complete | 2026-02-22 |
| 2. Shared UI Primitives | v1.0 | 2/2 | Complete | 2026-02-22 |
| 3. Page Layout | v1.0 | 2/2 | Complete | 2026-02-22 |
| 4. Above-the-Fold Sections | v1.0 | 2/2 | Complete | 2026-02-22 |
| 5. Left Column Upper Content | v1.0 | 2/2 | Complete | 2026-02-22 |
| 6. Left Column Lower Content | v1.0 | 2/2 | Complete | 2026-02-22 |
| 7. Sidebar | v1.0 | 1/1 | Complete | 2026-02-22 |
| 8. Full-Width Bottom Sections | v1.0 | 2/2 | Complete | 2026-02-22 |
| 9. Integration and Polish | v1.0 | 1/1 | Complete | 2026-02-22 |
| 10. Foundation and Gallery Entry Point | v2.0 | 3/3 | Complete | 2026-02-25 |
| 11. Ken Burns Engine and Composition Canvas | v2.0 | 3/3 | Complete | 2026-02-25 |
| 12. Text Overlays and Audio Narration | v2.0 | 0/3 | Not started | - |
| 13. Player Controls and Chapter Navigation | v2.0 | 0/3 | Not started | - |
| 14. Accessibility and Mobile Experience | v2.0 | 0/3 | Not started | - |
| 15. Data Layer and Section Shell | v3.0 | 2/2 | Complete | 2026-02-25 |
| 16. Destination Cards | v3.0 | 2/2 | Complete | 2026-02-25 |
| 17. Route Cards | v3.0 | 2/2 | Complete | 2026-02-25 |
| 18. Mobile Polish | v3.0 | 0/1 | Not started | - |
| 19. Routing & Homepage Shell | 1/1 | Complete    | 2026-02-26 | - |
| 20. Hero Banner & Search | 2/2 | Complete    | 2026-02-26 | - |
| 21. Listing Carousels & Dealer Showcase | 2/2 | Complete    | 2026-02-26 | - |
| 22. Selling & Ownership Sections | 2/2 | Complete    | 2026-02-26 | - |
| 23. Content, SEO & App Sections | v5.0 | 0/2 | Not started | - |
| 24. Data Layer & Filter Engine | 2/2 | Complete    | 2026-02-26 | - |
| 25. Listing Cards | 2/2 | Complete   | 2026-02-27 | - |
| 26. Filter Sidebar | v4.0 | 0/3 | Not started | - |
| 27. SRP Page Assembly | v4.0 | 0/2 | Not started | - |
| 28. Page Chrome & Content Sections | v4.0 | 0/1 | Not started | - |
| 29. Responsive Breakpoints | v4.0 | 0/2 | Not started | - |
