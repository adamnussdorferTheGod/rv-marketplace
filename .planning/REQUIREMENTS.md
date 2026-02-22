# Requirements: RV Marketplace VDP

**Defined:** 2026-02-21
**Core Value:** A pixel-accurate VDP that faithfully implements the Figma reference design using TIDE 2.0 / RV Trader theme

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Design token CSS files establish all TIDE 2.0 + RV Trader theme custom properties (colors, typography, spacing, borders, shadows)
- [x] **FOUND-02**: Global CSS resets and Montserrat font loaded across all components
- [x] **FOUND-03**: TypeScript data interfaces define the complete listing data shape (vehicle, dealer, pricing, specs, photos)
- [x] **FOUND-04**: Static sample data file provides hardcoded Airstream Flying Cloud 25RB listing data
- [x] **FOUND-05**: Shared Icon component renders inline SVG icons used across VDP sections

### Shared UI Primitives

- [x] **PRIM-01**: Divider component renders horizontal rule with design system border tokens
- [x] **PRIM-02**: AdSlot component renders placeholder boxes at specified dimensions (728x90, 300x250, 300x600) with "Ad" label
- [x] **PRIM-03**: ExpandableText component truncates text with "Read more" toggle and chevron animation
- [x] **PRIM-04**: SegmentedButtons component renders togglable button group with active state styling (Email/Call/Chat)
- [x] **PRIM-05**: Action chip component renders pill-shaped category tags

### Page Layout

- [x] **LAYOUT-01**: CrossPromotionsBar renders full-width 1790x40px bar with realm tabs (RVs active)
- [x] **LAYOUT-02**: Header renders logo (158x40), nav links (Shop, Sell, RV values, Cash offers, Research), and account button at 1789x72px
- [x] **LAYOUT-03**: Footer renders 4 nav columns, SEO copy ("Find RVs for sale on RV Trader"), copyright row, and scroll-to-top button at 1790x679px
- [x] **LAYOUT-04**: VehicleDetailPage orchestrator composes all sections within 1120px centered content area
- [x] **LAYOUT-05**: TwoColumnLayout renders 633px left column + 455px right column with 32px gap using CSS Grid

### Above-the-Fold Sections

- [x] **ATF-01**: NavigationBar renders "< Search results" back link and "Result 8 of 8,223" with Previous/Next at 1120x20px
- [x] **ATF-02**: TitleSection renders "2024 Airstream Flying Cloud 25RB" heading with share and favorite icon buttons at 1120x74px
- [x] **ATF-03**: TitleSection subtitle shows stock/location text, divider, and "Dealer's website" link with icon
- [x] **ATF-04**: PhotoGallery renders hero image (557x456px) alongside 2x2 thumbnail grid (555x456px) with 8px gaps
- [x] **ATF-05**: PhotoGallery shows "See all 28 photos" overlay button (182x36px) at bottom-right
- [x] **ATF-06**: PhotoGallery shows tags badge (139x28px) overlaid at top-left

### Left Column Content

- [x] **LEFT-01**: PricePayment section renders "$96,000" with strikethrough "$98,000", divider, "Est. monthly payment" text, and price guidance badge (107x28px)
- [x] **LEFT-02**: AISummary card renders "AI summary" heading with "NEW" badge (56x22px), long-form AI text, and AI search prompt button
- [x] **LEFT-03**: VehicleHistoryReport card renders VHR component instance at 633x224px
- [x] **LEFT-04**: WillingToNegotiate indicator renders at 633x119px
- [x] **LEFT-05**: FeaturesAndSpecs section renders spec grid with key-value pairs and icons at 633x341px
- [x] **LEFT-06**: PriceAnalysis section renders price heading, comparison text, "Learn more" link, visual price bar with deal card, Low/Fair/High/Overpriced labels, and price history graph area at 633x452px
- [x] **LEFT-07**: Description section renders heading, expandable description text with "Read more" chevron toggle at 633x188px
- [x] **LEFT-08**: LoanCalculator section renders heading, subtitle, payment display "$241/mo", contact prompt with CTA button, and financing disclaimer at 633x457px
- [ ] **LEFT-09**: AboutDealership section renders dealer logo, name, location, phone, hours, Top 50 badge, dealer bio with "Read more", "View dealer inventory" CTA, and dealer website links at 633x789px
- [x] **LEFT-10**: Resources section renders "Resources" heading with Foremost insurance card at 633x204px
- [x] **LEFT-11**: ReportListing renders flag icon + "Report listing" text at 633x24px
- [x] **LEFT-12**: Disclaimer renders RV Trader and AI-enhanced photos disclaimer text at 633x115px

### Sidebar (Right Column)

- [ ] **SIDE-01**: DealerContactCard renders Email/Call/Chat segmented tabs, multi-line message textarea, submit CTA button, and dealer contact info (name, address, phone, hours) at 455x463px
- [ ] **SIDE-02**: PopularityStats renders "X people viewing" engagement indicator at 455x20px
- [ ] **SIDE-03**: Sidebar ad slots render 300x250 and 300x600 ad placeholders

### Full-Width Bottom Sections

- [ ] **FULL-01**: SimilarListings renders horizontal carousel of listing cards at 1120x485px with scroll behavior
- [ ] **FULL-02**: RelatedCategories renders "Related categories" heading with 7 action chip tags in 2 rows at 1120x164px
- [ ] **FULL-03**: InsuranceAccessories renders two side-by-side cards (RV accessories + RV insurance) at 544px each with insurance disclaimer
- [ ] **FULL-04**: AdSense section renders two ad placeholder instances at 1120x424px each with 16px gap
- [ ] **FULL-05**: Leaderboard ad slot renders centered 728x90 ad placeholder at 1790x122px

### Integration

- [ ] **INTG-01**: All components use CSS Modules with design token custom properties (no hardcoded colors)
- [ ] **INTG-02**: PriceAnalysis section wraps existing PriceDistributionChart component with appropriate props
- [ ] **INTG-03**: Page renders complete VDP at 1790px width matching reference layout positions

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Interactivity

- **INT-01**: Full-screen photo gallery lightbox modal with keyboard navigation
- **INT-02**: Interactive loan calculator with adjustable down payment, term, and rate
- **INT-03**: Working dealer contact form submission with validation and success/error states
- **INT-04**: Sticky sidebar behavior for dealer contact card on scroll

### Responsive

- **RESP-01**: Mobile layout (XS breakpoint, <=767px) -- single column
- **RESP-02**: Tablet layout (SM/MD breakpoints) -- adjusted columns
- **RESP-03**: Large desktop layout (XL breakpoint, >=1920px) -- standard grid

### Data Integration

- **DATA-01**: Dynamic listing data from API endpoint
- **DATA-02**: URL-based routing with listing ID parameter
- **DATA-03**: Real ad SDK integration for ad slots

## Out of Scope

| Feature | Reason |
|---------|--------|
| Factory specs section | Hidden in Figma reference (32:6878) |
| Geico insurance card | Hidden in reference, only Foremost visible |
| Affiliate logos in footer | Hidden in reference (32:11602) |
| Mobile/responsive layout | Desktop-first, separate milestone |
| Real ad rendering | Static placeholders preserve layout without ad SDK complexity |
| Server-side rendering | SPA only, no SSR needed for static mockup |
| User authentication | No login flows, out of scope |
| Search results page | VDP page only |
| Dynamic routing | Single static page |
| Form submission backend | No API backend exists |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| PRIM-01 | Phase 2 | Complete |
| PRIM-02 | Phase 2 | Complete |
| PRIM-03 | Phase 2 | Complete |
| PRIM-04 | Phase 2 | Complete |
| PRIM-05 | Phase 2 | Complete |
| LAYOUT-01 | Phase 3 | Complete |
| LAYOUT-02 | Phase 3 | Complete |
| LAYOUT-03 | Phase 3 | Complete |
| LAYOUT-04 | Phase 3 | Complete |
| LAYOUT-05 | Phase 3 | Complete |
| ATF-01 | Phase 4 | Complete |
| ATF-02 | Phase 4 | Complete |
| ATF-03 | Phase 4 | Complete |
| ATF-04 | Phase 4 | Complete |
| ATF-05 | Phase 4 | Complete |
| ATF-06 | Phase 4 | Complete |
| LEFT-01 | Phase 5 | Complete |
| LEFT-02 | Phase 5 | Complete |
| LEFT-03 | Phase 5 | Complete |
| LEFT-04 | Phase 5 | Complete |
| LEFT-05 | Phase 5 | Complete |
| LEFT-06 | Phase 5 | Complete |
| LEFT-07 | Phase 5 | Complete |
| LEFT-08 | Phase 6 | Complete |
| LEFT-09 | Phase 6 | Pending |
| LEFT-10 | Phase 6 | Complete |
| LEFT-11 | Phase 6 | Complete |
| LEFT-12 | Phase 6 | Complete |
| SIDE-01 | Phase 7 | Pending |
| SIDE-02 | Phase 7 | Pending |
| SIDE-03 | Phase 7 | Pending |
| FULL-01 | Phase 8 | Pending |
| FULL-02 | Phase 8 | Pending |
| FULL-03 | Phase 8 | Pending |
| FULL-04 | Phase 8 | Pending |
| FULL-05 | Phase 8 | Pending |
| INTG-01 | Phase 9 | Pending |
| INTG-02 | Phase 9 | Pending |
| INTG-03 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 44 total
- Mapped to phases: 44
- Unmapped: 0

---
*Requirements defined: 2026-02-21*
*Last updated: 2026-02-21 after roadmap creation*
