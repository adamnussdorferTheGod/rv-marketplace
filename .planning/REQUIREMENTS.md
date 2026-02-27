# Requirements: RV Marketplace

**Defined:** 2026-02-25
**Core Value:** A pixel-accurate marketplace experience implementing Figma designs with dynamic client-side filtering.

**Figma references:**
- SRP: frame 1:3997 (1762x9280px) -- "SRP -- Desktop 3"
- Homepage: frame 1:9679 (1789x6316px) -- "Homepage -- Desktop 1"
- Expanded search: frame 1:10901 (1789x1566px) -- "Homepage Search -- Desktop 2"

## v4.0 Requirements -- Search Results Page

### Data Layer

- [x] **DATA-05**: TypeScript interfaces for SRP listing data (extends existing ListingData with SRP-specific fields: photo array, tag badges, featured flag, sponsored flag)
- [x] **DATA-06**: ~80 sample RV listings with realistic variety across types (Class A/B/C, travel trailer, fifth wheel, toy hauler, pop-up), makes, price ranges ($15K-$500K), years (2015-2026), and locations
- [x] **DATA-07**: Client-side filter engine filters listings by type, make/model, price range, year range, condition (new/used), location/radius, length, floor plan, sleeping capacity, fuel type, and keyword search
- [x] **DATA-08**: Client-side sort engine sorts results by default relevance, price low-to-high, price high-to-low, newest, and distance
- [x] **DATA-09**: Filter state syncs to URL query parameters so filtered views are shareable/bookmarkable
- [x] **DATA-10**: Active filters display as removable chips with individual clear and "Clear all" reset

### Filter Sidebar

- [x] **FILT-01**: Filter sidebar (330px) displays result count header with "Clear all" link
- [x] **FILT-02**: Active filter chips appear at top of sidebar with x remove buttons
- [x] **FILT-03**: Keyword search input with magnifying glass icon and placeholder text
- [x] **FILT-04**: Location filter with ZIP code input, radius dropdown (25/50/100/150/200 mi), and "Search within" label
- [x] **FILT-05**: New/Used/All segmented toggle control
- [x] **FILT-06**: RV Type filter with checkbox list and thumbnail images for each type (Class A, B, C, Fifth Wheel, etc.)
- [x] **FILT-07**: Make & Model hierarchical multi-select with search input, expandable make to model tree, and "See all options" link
- [x] **FILT-08**: Price filter with Cash/Finance tab toggle, min/max inputs (down payment + monthly for finance), term slider, and "Estimated buying power" callout
- [x] **FILT-09**: Collapsible filter groups for Length, Year, Bunkhouse floor plan, Fuel type, Sleeping capacity, Floor plan, and Gross vehicle weight
- [x] **FILT-10**: Mobile: filter sidebar converts to a full-screen overlay triggered by a filter button

### Listing Cards

- [x] **CARD-01**: Standard listing card displays photo with carousel dots, tag badge (e.g., "Price reduced"), favorite heart toggle, condition/program label, title, price with strikethrough original, and "More info" CTA button
- [x] **CARD-02**: Dealer info section below divider shows dealer name, city/state with distance, and "Trusted partner" badge when applicable
- [x] **CARD-03**: Featured listing card (compact 242px variant) displays in horizontal carousel with photo, title, price, and dealer location
- [x] **CARD-04**: Sponsored "Native Summit Showcase" section displays branded dealer header with description and featured card carousel
- [x] **CARD-05**: PAA (People Also Asked) card variant displays as inline content within the grid
- [x] **CARD-06**: Dealer ad card in sidebar displays dealer photo, description, and CTA button

### Page Layout

- [x] **LAYO-01**: Two-column layout with 330px filter sidebar and 1272px content area, 64px side margins
- [x] **LAYO-02**: Content area header shows breadcrumbs (Home > Browse RVs > [Type]), page title "New and used [Type] RVs for sale", and descriptive subtitle with "Show more" toggle
- [x] **LAYO-03**: Sort controls row with "Sort by: Default" dropdown and "Save search" heart button, aligned right
- [ ] **LAYO-04**: Listing cards render in 3-column grid (~403px each) with 32px gaps
- [ ] **LAYO-05**: Featured/sponsored carousels and mid-page ad slots intersperse between listing card rows
- [ ] **LAYO-06**: Pagination component with numbered pages, prev/next arrows, ellipsis for large ranges, and "X-Y of Z results" count

### Page Chrome

- [ ] **CHRO-01**: Reuses existing Header and Cross-promotions bar from VDP
- [ ] **CHRO-02**: SEO "Popular searches" footer section with categorized link grid
- [ ] **CHRO-03**: App download CTA banner with phone mockup, QR code, and App Store/Google Play badges
- [ ] **CHRO-04**: Reuses existing Footer from VDP
- [ ] **CHRO-05**: Disclaimer text at bottom of results for AI-enhanced photos and third-party data accuracy

### Responsive

- [ ] **RESP-01**: At 991px breakpoint: 2-column card grid, filter sidebar collapses to overlay
- [ ] **RESP-02**: At 767px breakpoint: single-column card grid, stacked layout
- [ ] **RESP-03**: Featured carousels adapt to fewer visible cards at smaller breakpoints
- [ ] **RESP-04**: Pagination adapts to fewer visible page numbers on mobile

## v5.0 Requirements

### Navigation & Routing

- [x] **NAV-01**: react-router-dom routes: `/` (HomePage), `/search` (SRP placeholder), `/listing/:id` (VDP)
- [x] **NAV-02**: Logo in Header always navigates to `/` (homepage)
- [x] **NAV-03**: Clicking any listing card on homepage navigates to `/listing/:id` (VDP)

### Hero Banner

- [x] **HERO-01**: Hero section displays full-width background image of RV lifestyle with dark overlay and centered "Shop the largest RV marketplace" heading
- [x] **HERO-02**: Search bar with AI sparkle icon, rotating placeholder text ("Try: Family-friendly RVs for 4"), and ZIP code input with location icon
- [x] **HERO-03**: Segmented control above search toggles between "Shop RVs" and "Sell my RV"
- [x] **HERO-04**: Green "Search" button triggers navigation to SRP
- [x] **HERO-05**: Dealer spotlight badge in hero bottom-right shows dealer logo, name ("Uwharrie RV"), and "Shop inventory" link

### Expanded Search Dropdown

- [x] **SRCH-01**: Clicking the search input field opens an expanded dropdown overlay below the hero search
- [x] **SRCH-02**: Dropdown shows "RV types" section with 10 RV type thumbnails in a 5x2 grid (Travel Trailer, Class A, Class B, Class C, Fifth Wheel, Toy Hauler, Pop-up Camper, Truck Camper, Park Model, Fish House) using static image assets
- [x] **SRCH-03**: Dropdown shows "Popular searches" section with search chip links (e.g., "RVs under $35,000", "Min. 4 sleeping capacity", "Under 50,000 miles")
- [x] **SRCH-04**: Dropdown shows "Popular makes" section with make chip links (Forest River, Keystone, Jayco, Grand Design, Coachmen, Thor Motor Coach, Winnebago, Heartland)
- [x] **SRCH-05**: Dropdown shows "Featured from dealers near you" with dealer chip links
- [x] **SRCH-06**: Clicking an RV type thumbnail or search chip navigates to SRP with appropriate filter context

### Listing Carousels

- [x] **CARO-01**: "RVs hand-picked for you" section displays horizontal carousel of 5 listing cards with photo, title, location/distance, and price
- [x] **CARO-02**: Filter chips above carousel allow filtering by category (Recommended, Used, New, Nearest, Deals, Travel trailers, Class A)
- [x] **CARO-03**: Left/right arrow buttons navigate the carousel
- [x] **CARO-04**: Clicking a listing card navigates to VDP (`/listing/:id`)

### Dealer Showcase

- [x] **DEAL-01**: Dealer showcase section displays dealer logo, name ("Roy Robinson RV Center"), tagline, "View inventory" link, and phone number
- [x] **DEAL-02**: Below dealer info, horizontal row of 5 listing cards from that dealer with photo, title, location, and price
- [x] **DEAL-03**: Carousel navigation arrows for dealer inventory row

### Selling Section

- [x] **SELL-01**: "Selling made with you in mind" section with segmented tab control (Consignment / Sell privately / Cash offers)
- [x] **SELL-02**: Each tab shows a large image panel, title, description text, and CTA button ("Learn more")

### Featured Listings

- [x] **FEAT-01**: "Featured listings" section displays 2 rows x 5 columns of listing cards (10 total)
- [x] **FEAT-02**: Section header with title and carousel navigation arrows

### Ownership Cards

- [x] **OWN-01**: "Making RV ownership easy" section with 4 cards in a horizontal row: RV Accessories, Insurance Services, Closing Services, Owner Reviews
- [x] **OWN-02**: Each card has an illustration, title, description text, and "Learn more" CTA button

### Blog / Content Section

- [ ] **BLOG-01**: "Stay in the know" section with tab navigation (Owner reviews, News, Lifestyle, RV consulting)
- [ ] **BLOG-02**: Content area shows featured article image on left (~55%) and 3 article rows on right with category label, title, and arrow icon

### SEO Links

- [ ] **SEO-01**: "Popular searches" section with tab categories and a grid of search links (6 columns x 3 rows per tab)
- [ ] **SEO-02**: Each link shows a search term with result count (e.g., "Forest River RVs for sale (46,098)")

### App & Newsletter

- [ ] **APP-01**: App download section with App Store and Google Play badge links
- [ ] **APP-02**: Newsletter signup section with email input and subscribe button
- [ ] **APP-03**: Social media icon row (Facebook, Instagram, YouTube, Twitter, Pinterest, TikTok)

## Future Requirements

Deferred to subsequent milestones.

- **HOME-MOB-01**: Responsive homepage layout for mobile/tablet breakpoints
- **HOME-SRCH-01**: AI-powered search with real NLP suggestions
- **HOME-PERS-01**: Personalized listing recommendations based on user history
- **HOME-GEO-01**: Geolocation-based "near you" content
- **SRP-ADV-01**: Saved searches with notification preferences
- **SRP-ADV-02**: Recently viewed listings sidebar widget
- **SRP-ADV-03**: Comparison feature (select multiple listings to compare)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real search backend (Elasticsearch, Algolia) | Client-side array filtering sufficient for demo |
| Server-side rendering / SSR | SPA-only architecture |
| User authentication / persistent saved searches | UI-only interactions, no backend |
| Map integration for dealer locations | Text-based location display |
| Real-time inventory updates | Static sample dataset |
| A/B testing framework | Single layout variant |
| Dealer dashboard / listing management | Buyer-facing only |
| Advanced search (NLP, AI-powered) | Standard filter/sort only |
| Infinite scroll | Pagination per Figma design |
| Mobile responsive homepage | Desktop-first; mobile is future work |
| Analytics/tracking | No event tracking integration |

## Traceability

### v4.0 SRP

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-05 | Phase 24 | Complete |
| DATA-06 | Phase 24 | Complete |
| DATA-07 | Phase 24 | Complete |
| DATA-08 | Phase 24 | Complete |
| DATA-09 | Phase 24 | Complete |
| DATA-10 | Phase 24 | Complete |
| FILT-01 | Phase 26 | Complete |
| FILT-02 | Phase 26 | Complete |
| FILT-03 | Phase 26 | Complete |
| FILT-04 | Phase 26 | Complete |
| FILT-05 | Phase 26 | Complete |
| FILT-06 | Phase 26 | Complete |
| FILT-07 | Phase 26 | Complete |
| FILT-08 | Phase 26 | Complete |
| FILT-09 | Phase 26 | Complete |
| FILT-10 | Phase 26 | Complete |
| CARD-01 | Phase 25 | Complete |
| CARD-02 | Phase 25 | Complete |
| CARD-03 | Phase 25 | Complete |
| CARD-04 | Phase 25 | Complete |
| CARD-05 | Phase 25 | Complete |
| CARD-06 | Phase 25 | Complete |
| LAYO-01 | Phase 27 | Complete |
| LAYO-02 | Phase 27 | Complete |
| LAYO-03 | Phase 27 | Complete |
| LAYO-04 | Phase 27 | Pending |
| LAYO-05 | Phase 27 | Pending |
| LAYO-06 | Phase 27 | Pending |
| CHRO-01 | Phase 28 | Pending |
| CHRO-02 | Phase 28 | Pending |
| CHRO-03 | Phase 28 | Pending |
| CHRO-04 | Phase 28 | Pending |
| CHRO-05 | Phase 28 | Pending |
| RESP-01 | Phase 29 | Pending |
| RESP-02 | Phase 29 | Pending |
| RESP-03 | Phase 29 | Pending |
| RESP-04 | Phase 29 | Pending |

### v5.0 Homepage

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 19 | Complete |
| NAV-02 | Phase 19 | Complete |
| NAV-03 | Phase 21 | Complete |
| HERO-01 | Phase 20 | Complete |
| HERO-02 | Phase 20 | Complete |
| HERO-03 | Phase 20 | Complete |
| HERO-04 | Phase 20 | Complete |
| HERO-05 | Phase 20 | Complete |
| SRCH-01 | Phase 20 | Complete |
| SRCH-02 | Phase 20 | Complete |
| SRCH-03 | Phase 20 | Complete |
| SRCH-04 | Phase 20 | Complete |
| SRCH-05 | Phase 20 | Complete |
| SRCH-06 | Phase 20 | Complete |
| CARO-01 | Phase 21 | Complete |
| CARO-02 | Phase 21 | Complete |
| CARO-03 | Phase 21 | Complete |
| CARO-04 | Phase 21 | Complete |
| DEAL-01 | Phase 21 | Complete |
| DEAL-02 | Phase 21 | Complete |
| DEAL-03 | Phase 21 | Complete |
| FEAT-01 | Phase 21 | Complete |
| FEAT-02 | Phase 21 | Complete |
| SELL-01 | Phase 22 | Complete |
| SELL-02 | Phase 22 | Complete |
| OWN-01 | Phase 22 | Complete |
| OWN-02 | Phase 22 | Complete |
| BLOG-01 | Phase 23 | Pending |
| BLOG-02 | Phase 23 | Pending |
| SEO-01 | Phase 23 | Pending |
| SEO-02 | Phase 23 | Pending |
| APP-01 | Phase 23 | Pending |
| APP-02 | Phase 23 | Pending |
| APP-03 | Phase 23 | Pending |

**Coverage:**
- v4.0 requirements: 37 total, mapped: 37
- v5.0 requirements: 34 total, mapped: 34
- Total: 71

---
*Requirements defined: 2026-02-25*
*Last updated: 2026-02-25 after v4.0 SRP roadmap created (Phases 24-29)*
