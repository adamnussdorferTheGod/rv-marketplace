# Roadmap: RV Marketplace VDP

## Overview

Build a pixel-accurate Vehicle Detail Page for RV Trader by layering from design tokens through shared primitives, page skeleton, and section-by-section implementation. The page renders a 2024 Airstream Flying Cloud 25RB listing across ~25 section components within a 1790px desktop layout using TIDE 2.0 / RV Trader theme tokens and CSS Modules. Phases follow strict dependency order: tokens and data contracts first, shared primitives second, page chrome and layout third, then sections by engagement priority (above-the-fold, left column upper, left column lower, sidebar, full-width bottom), ending with a full-page integration pass.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Design tokens, TypeScript data contracts, sample data, and icon system (completed 2026-02-22)
- [x] **Phase 2: Shared UI Primitives** - Reusable primitive components used across multiple VDP sections (completed 2026-02-22)
- [x] **Phase 3: Page Layout** - Page chrome (header, footer, cross-promotions) and two-column layout skeleton (completed 2026-02-22)
- [x] **Phase 4: Above-the-Fold Sections** - Navigation, title, photo gallery, and price display (completed 2026-02-22)
- [x] **Phase 5: Left Column Upper Content** - AI summary through description (7 sections, highest engagement content) (completed 2026-02-22)
- [x] **Phase 6: Left Column Lower Content** - Loan calculator through disclaimer (5 sections, supporting content) (completed 2026-02-22)
- [x] **Phase 7: Sidebar** - Dealer contact card, popularity stats, and sidebar ad slots (completed 2026-02-22)
- [x] **Phase 8: Full-Width Bottom Sections** - Similar listings, related categories, insurance/accessories, and ad slots (completed 2026-02-22)
- [ ] **Phase 9: Integration and Polish** - Token compliance audit, PriceDistributionChart integration, and full-page assembly verification

## Phase Details

### Phase 1: Foundation
**Goal**: Every component can reference design tokens and typed data from day one, eliminating hardcoded values and ad-hoc data shapes
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. CSS custom properties for all TIDE 2.0 primitive tokens (colors, typography scales, spacing, borders, shadows) and RV Trader semantic tokens (--rv-primary #006836, surface/border tokens) are available in any component via var() references
  2. Montserrat font renders at weights 400-700 across the application with correct fallback chain
  3. A TypeScript ListingData interface defines the complete shape for vehicle, dealer, pricing, specs, and photos, and a sample data file exports a fully populated Airstream Flying Cloud 25RB listing matching the reference
  4. An Icon component renders inline SVG icons by name prop, with at least the icons needed for the title section (share, favorite) available
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Design tokens CSS (TIDE 2.0 + RV Trader), Montserrat font loading, global resets
- [x] 01-02-PLAN.md — TypeScript data interfaces, sample listing data, shared Icon component

### Phase 2: Shared UI Primitives
**Goal**: Reusable UI primitives are available so section components never duplicate expand/collapse, ad placeholders, dividers, segmented buttons, or chip tag patterns
**Depends on**: Phase 1
**Requirements**: PRIM-01, PRIM-02, PRIM-03, PRIM-04, PRIM-05
**Success Criteria** (what must be TRUE):
  1. Divider component renders a horizontal rule styled with design system border tokens and is usable between any two sections
  2. AdSlot component renders a labeled placeholder box at any specified dimension (728x90, 300x250, 300x600) without layout collapse
  3. ExpandableText component truncates long text to a configurable line count and reveals full text on "Read more" click with chevron animation
  4. SegmentedButtons component renders a togglable button group (e.g., Email/Call/Chat) with active state styling using design tokens
  5. ActionChip component renders a pill-shaped category tag matching the design system chip spec
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — Stateless primitives: Divider, AdSlot, and ActionChip components
- [x] 02-02-PLAN.md — Interactive primitives: ExpandableText and SegmentedButtons components

### Phase 3: Page Layout
**Goal**: The complete page chrome and two-column layout skeleton are rendered so sections can be dropped into their correct positions
**Depends on**: Phase 2
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05
**Success Criteria** (what must be TRUE):
  1. CrossPromotionsBar renders a full-width 1790x40px bar with realm tabs at the top of the page, with "RVs" shown as the active tab
  2. Header renders the RV Trader logo (158x40), five nav links (Shop, Sell, RV values, Cash offers, Research), and an account button in a 1789x72px bar
  3. Footer renders 4 navigation columns, SEO copy block, copyright row, and scroll-to-top button in a 1790x679px section at page bottom
  4. VehicleDetailPage orchestrator renders a vertically stacked page with placeholder text in each section slot, centered in a 1120px content area within the 1790px page
  5. TwoColumnLayout renders a 633px left / 455px right CSS Grid with 32px gap, and placeholder content in each column shows correct widths
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md — Icons, CrossPromotionsBar, Header, and TwoColumnLayout components
- [ ] 03-02-PLAN.md — Footer component, VehicleDetailPage orchestrator, and App.tsx wiring

### Phase 4: Above-the-Fold Sections
**Goal**: The top of the page -- navigation, title, and photo gallery -- renders with full visual fidelity, giving the page its identity
**Depends on**: Phase 3
**Requirements**: ATF-01, ATF-02, ATF-03, ATF-04, ATF-05, ATF-06
**Success Criteria** (what must be TRUE):
  1. NavigationBar shows a "< Search results" back link on the left and "Result 8 of 8,223" with Previous/Next links on the right
  2. TitleSection shows "2024 Airstream Flying Cloud 25RB" as the heading with share and favorite icon buttons, and a subtitle row with stock/location, divider, and "Dealer's website" link
  3. PhotoGallery renders a hero image (557x456px) next to a 2x2 thumbnail grid (555x456px total) with 8px gaps between thumbnails
  4. PhotoGallery shows a "See all 28 photos" overlay button at bottom-right and a tags badge at top-left of the hero image
**Plans**: 2 plans

Plans:
- [x] 04-01-PLAN.md — NavigationBar and TitleSection components with VehicleDetailPage wiring
- [x] 04-02-PLAN.md — PhotoGallery component with hero image, thumbnail grid, and overlay elements

### Phase 5: Left Column Upper Content
**Goal**: The primary content sections from price through description are rendered in the left column, delivering the core listing information a buyer needs
**Depends on**: Phase 4
**Requirements**: LEFT-01, LEFT-02, LEFT-03, LEFT-04, LEFT-05, LEFT-06, LEFT-07
**Success Criteria** (what must be TRUE):
  1. PricePayment section shows "$96,000" with a strikethrough "$98,000", an estimated monthly payment line, and a price guidance badge
  2. AISummary card shows an "AI summary" heading with a "NEW" badge, AI-generated descriptive text, and an AI search prompt button
  3. VehicleHistoryReport card and WillingToNegotiate indicator each render as styled cards at their specified dimensions
  4. FeaturesAndSpecs section renders a grid of key-value specification pairs with icons
  5. PriceAnalysis section renders price heading, comparison text, visual price bar with deal indicator, Low/Fair/High/Overpriced labels, and a price history graph area
  6. Description section renders listing description text with a "Read more" toggle that expands to show full content
**Plans**: 2 plans

Plans:
- [x] 05-01-PLAN.md — PricePayment, AISummary, VehicleHistoryReport, WillingToNegotiate sections + spec icon registration
- [x] 05-02-PLAN.md — FeaturesAndSpecs, PriceAnalysis, Description sections + VehicleDetailPage wiring

### Phase 6: Left Column Lower Content
**Goal**: The remaining left column sections -- loan calculator through disclaimer -- complete the full listing detail below the fold
**Depends on**: Phase 5
**Requirements**: LEFT-08, LEFT-09, LEFT-10, LEFT-11, LEFT-12
**Success Criteria** (what must be TRUE):
  1. LoanCalculator section renders a "$241/mo" payment display with heading, subtitle, contact prompt CTA button, and financing disclaimer
  2. AboutDealership section renders dealer logo, name, location, phone, hours, Top 50 badge, expandable bio with "Read more", and "View dealer inventory" CTA
  3. Resources section renders a "Resources" heading with a Foremost insurance card
  4. ReportListing shows a flag icon with "Report listing" text, and Disclaimer renders the RV Trader and AI-enhanced photos disclaimer text below it
**Plans**: 2 plans

Plans:
- [x] 06-01-PLAN.md — LoanCalculator, Resources, ReportListing, Disclaimer sections + icon registration
- [ ] 06-02-PLAN.md — AboutDealership section + VehicleDetailPage wiring with Dividers

### Phase 7: Sidebar
**Goal**: The right column renders the dealer contact card (the primary conversion element), popularity indicator, and ad placements
**Depends on**: Phase 3
**Requirements**: SIDE-01, SIDE-02, SIDE-03
**Success Criteria** (what must be TRUE):
  1. DealerContactCard renders Email/Call/Chat segmented tabs (using SegmentedButtons), a multi-line message textarea, a submit CTA button, and dealer contact info (name, address, phone, hours)
  2. PopularityStats renders an "X people viewing" engagement indicator above or near the contact card
  3. Sidebar ad slots render 300x250 and 300x600 ad placeholders using the AdSlot component
**Plans**: 1 plan

Plans:
- [ ] 07-01-PLAN.md — DealerContactCard, PopularityStats components + sidebar wiring with AdSlots

### Phase 8: Full-Width Bottom Sections
**Goal**: The below-the-fold full-width sections complete the page with discovery, cross-sell, and ad content
**Depends on**: Phase 3
**Requirements**: FULL-01, FULL-02, FULL-03, FULL-04, FULL-05
**Success Criteria** (what must be TRUE):
  1. SimilarListings renders a horizontal carousel of listing cards with CSS scroll-snap behavior at 1120px width
  2. RelatedCategories renders a "Related categories" heading with 7 action chip tags arranged in 2 rows
  3. InsuranceAccessories renders two side-by-side cards (RV accessories + RV insurance) at 544px each with an insurance disclaimer
  4. AdSense section renders two ad placeholders at 1120x424px each with 16px gap, and Leaderboard ad slot renders a centered 728x90 placeholder
**Plans**: 2 plans

Plans:
- [x] 08-01-PLAN.md — SimilarListings carousel with ListingCard and RelatedCategories chip grid
- [x] 08-02-PLAN.md — InsuranceAccessories, AdSenseSection, and VehicleDetailPage wiring

### Phase 9: Integration and Polish
**Goal**: The complete VDP page renders at 1790px width matching the reference layout, with consistent token usage and the existing PriceDistributionChart properly integrated
**Depends on**: Phase 5, Phase 6, Phase 7, Phase 8
**Requirements**: INTG-01, INTG-02, INTG-03
**Success Criteria** (what must be TRUE):
  1. Every component uses CSS Modules with design token custom properties -- no hardcoded color hex values exist in any .module.css file outside of token definition files
  2. PriceAnalysis section wraps the existing PriceDistributionChart component with correct props and the chart renders within the price analysis layout
  3. The full VDP page renders at 1790px width with all sections visible and positioned matching the reference layout (1120px content area centered, 633/455 column split, correct vertical section order)
**Plans**: 2 plans

Plans:
- [ ] 09-01-PLAN.md — CSS token compliance cleanup and PriceDistributionChart integration into PriceAnalysis
- [ ] 09-02-PLAN.md — Full build verification, CSS audit, and visual layout checkpoint

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9
Note: Phases 7 and 8 depend only on Phase 3, so they could execute after Phase 3. However, Phases 5-6 are higher engagement priority, so the recommended order is sequential 1-9.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete    | 2026-02-22 |
| 2. Shared UI Primitives | 2/2 | Complete    | 2026-02-22 |
| 3. Page Layout | 0/2 | Complete    | 2026-02-22 |
| 4. Above-the-Fold Sections | 2/2 | Complete    | 2026-02-22 |
| 5. Left Column Upper Content | 2/2 | Complete    | 2026-02-22 |
| 6. Left Column Lower Content | 1/2 | Complete    | 2026-02-22 |
| 7. Sidebar | 0/1 | Complete    | 2026-02-22 |
| 8. Full-Width Bottom Sections | 2/2 | Complete    | 2026-02-22 |
| 9. Integration and Polish | 0/1 | Not started | - |
