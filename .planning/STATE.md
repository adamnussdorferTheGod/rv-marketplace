# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-26)

**Core value:** A pixel-accurate marketplace experience implementing Figma designs with TIDE 2.0 and dynamic client-side filtering
**Current focus:** Phase 25 Listing Cards

## Current Position

Phase: 25 of 29 (Listing Cards)
Plan: 1 of 2 complete
Status: Executing
Last activity: 2026-02-26 -- Phase 25 Plan 01 complete (SRPListingCard)

Progress: [████████████████████] 38/39 plans (97%)

## Performance Metrics

**Velocity (v1.0):**
- Total plans completed: 17
- Average duration: 4.4min
- Total execution time: 1.25 hours

**v2.0:**
- Total plans completed: 6
- Estimated plans remaining: 9 (Phases 12-14)

**v3.0:**
- Total plans completed: 9
- Estimated plans remaining: 0 (all phases complete)

**v4.0:**
- Total plans estimated: 12 (across 6 phases)
- Completed: 2
- Phase 24 Plan 01: 5min (2 tasks, 2 files)
- Phase 24 Plan 02: 2min (2 tasks, 2 files)

**v5.0:**
- Total plans estimated: 9 (across 5 phases)
- Completed: 7
- Phase 19 Plan 01: 3min (2 tasks, 18 files)
- Phase 20 Plan 01: 2min (2 tasks, 5 files)
- Phase 20 Plan 02: 3min (2 tasks, 5 files)
- Phase 21 Plan 01: 2min (2 tasks, 8 files)
- Phase 21 Plan 02: 2min (2 tasks, 5 files)
- Phase 22 Plan 01: 2min (2 tasks, 4 files)
- Phase 22 Plan 02: 2min (2 tasks, 4 files)
- Phase 25 Plan 01: 2min (1 task, 2 files)

## Accumulated Context

### Decisions

- [v1.0]: CSS Modules + design tokens pattern works well
- [v1.0]: Three-layer CSS cascade: tokens.css -> theme-rv.css -> global.css
- [v2.0]: Single timeline source drives all visual state (no parallel timers)
- [v3.0]: LifestyleContext section is self-contained (imports own data, no props from VDP)
- [v3.0]: RouteCard uses CSS-only mini map with pseudo-element route line
- [v4.0]: Client-side filter engine with ~80 sample listings (no backend)
- [v4.0]: Figma SRP reference: frame 1:3997 (1762x9280px), 330px sidebar + 1272px content, 3-col card grid
- [v4.0]: SRP depends on Phase 19 routing -- /search route must exist before SRP can replace placeholder
- [v5.0]: react-router-dom with / (homepage), /search (SRP), /listing/:id (VDP)
- [v4.0]: SRPListing is standalone interface (not extending ListingData -- too heavy for SRP cards)
- [v4.0]: Builder pattern with lookup tables generates sample data from compact definitions
- [v4.0]: Native history API (replaceState) for URL sync instead of react-router dependency
- [v4.0]: Pure filter/sort functions in data layer, React hook as thin state wrapper
- [v5.0]: Reuse existing components: Header, Footer, CrossPromotionsBar, ListingCard, etc.
- [v5.0]: BrowserRouter (traditional) over createBrowserRouter for simplicity
- [v5.0]: Layout route pattern with AppLayout rendering shared chrome via Outlet
- [v5.0]: VdpVariantContext default value allows Header to render safely on non-VDP pages
- [v5.0]: CSS-only rotating placeholder with staggered animation-delay (no JS timers)
- [v5.0]: Full-width hero outside .content container pattern
- [v5.0]: DealerSpotlight hidden on mobile to preserve hero real estate
- [v5.0]: Click-outside dismiss via mousedown listener + contains() check on container ref
- [v5.0]: Seamless dropdown connection by flattening parent bottom corners when dropdown open
- [v5.0]: Data-driven dropdown sections from typed static arrays in separate heroData.ts
- [v5.0]: HomepageListingData picks minimal fields from SRPListing (single photo, not full array)
- [v5.0]: Camping World selected as showcase dealer (most city coverage in sample data)
- [v5.0]: ListingCarousel uses position:relative wrapper with absolute arrow buttons
- [v5.0]: DealerShowcase rendered outside .content wrapper as full-width sibling for gray background
- [v5.0]: FeaturedListings grid cards override card width via --homepage-card-width CSS custom property
- [v5.0]: Split .content into two blocks around DealerShowcase for correct section ordering
- [Phase 22]: Used Icon registry icons with circular tinted background as illustration placeholders for ownership cards
- [Phase 22]: Data-driven tab panels: sellingPanels array drives both SegmentedButtons options and panel content
- [Phase 22]: Unsplash stock photos for selling panel images matching dealerShowcase pattern
- [Phase 25]: Used shield_check icon from registry for trusted partner badge (not inline SVG)
- [Phase 25]: Carousel dots are visual-only (no navigation) per plan -- Phase 27 adds interaction
- [Phase 25]: Heart toggle uses inline SVG (same pattern as HomepageListingCard) for consistent fill/stroke control

### Pending Todos

None yet.

### Blockers/Concerns

None -- Phase 21 complete

## Session Continuity

Last session: 2026-02-26
Stopped at: Completed 25-01-PLAN.md (SRPListingCard)
Resume file: None
