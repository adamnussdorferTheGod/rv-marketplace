# RV Marketplace

## What This Is

An RV Trader marketplace frontend built as a React + TypeScript SPA. Includes a Search Results Page (SRP) for browsing, filtering, and sorting RV listings, and a Vehicle Detail Page (VDP) with comprehensive listing information — photos, pricing, dealer contact, specs, AI summary, loan calculator, and related listings — following the TIDE 2.0 design system with RV Trader theme tokens.

## Core Value

A pixel-accurate marketplace experience that faithfully implements the Figma reference designs using the TIDE 2.0 design system and RV Trader theme, with dynamic client-side filtering that makes the demo feel like a real product.

## Current Milestone: v8.0 Total Cost Calculator

**Goal:** Give buyers a realistic, all-in purchase price for any RV listing — not just the sticker price, but the actual out-the-door cost including state-specific sales tax, DMV fees, dealer fees, trade-in credit, financing costs, and insurance estimates. Location-aware, fully customizable, with collapsed summary + expandable full breakdown on the VDP.

**Target features:**
- Collapsed cost summary bar on every VDP: listing price + est. tax & fees = out-the-door total
- Expanded full breakdown: Purchase Price, Taxes, DMV Fees, Dealer Fees, Financing, Insurance
- State selector with automatic tax/fee recalculation for all 50 states + DC
- State-specific intelligence: tax caps (SC, NC), no-tax states, RV-specific rules (MD, CT, GA, OK)
- Trade-in section: YMMT selector, condition-based value estimate, trade-in tax credit display
- Trade-in credit correctly applied/withheld per state (~42 allow, 5 don't)
- Editable dealer fees with doc fee cap enforcement where applicable
- Financing calculator: down payment, loan term (36–180 mo), APR/credit tier, monthly payment
- Amount financed includes tax and fees in the loan (real-world default)
- Insurance estimate section with annual premium range by RV type and value
- State-specific tip callouts (tax caps, no-tax advantages, trade-in credit savings)
- Mobile: sticky summary bar at bottom of VDP with tap-to-expand bottom sheet
- Save Estimate to user account (auth required) with price-change notifications
- Share estimate as link/image card, print-friendly PDF version
- All calculations client-side from curated per-state tax/fee database (static JSON)
- Mock data layer — no real API calls (consistent with frontend-only constraint)

## Requirements

### Validated

- ✓ Full VDP page with all sections — v1.0
- ✓ TIDE 2.0 design system tokens — v1.0
- ✓ RV Trader theme applied — v1.0
- ✓ Photo gallery with hero + thumbnail grid — v1.0
- ✓ CSS Modules pattern established — v1.0
- ✓ React 19 + TypeScript + Vite stack — v1.0
- ✓ All 44 v1 requirements shipped — v1.0
- ✓ Video walkthrough with Ken Burns motion — v2.0
- ✓ Lightbox video player with controls — v2.0
- ✓ AI voiceover narration — v2.0
- ✓ Text overlays and 5-act structure — v2.0
- ✓ "RVs hand-picked for you" listing carousel with filter chips — v5.0 Phase 21
- ✓ Dealer showcase section with branding and inventory carousel — v5.0 Phase 21
- ✓ "Featured listings" 2-row listing grid — v5.0 Phase 21
- ✓ Listing cards → VDP routing via listingPath() — v5.0 Phase 21
- ✓ SRP data types and ~80 sample listings — v4.0 Phase 24
- ✓ Client-side filter/sort engine with URL sync — v4.0 Phase 24
- ✓ Full SRP with filter sidebar, card grid, pagination, responsive — v4.0 Phases 24-29

### Active

- [ ] Cost summary bar (collapsed) on every VDP showing out-the-door total
- [ ] Expanded full breakdown with itemized sections
- [ ] State selector with full recalculation for all 50 states + DC
- [ ] State-specific tax calculations including caps, no-tax states, RV-specific rules
- [ ] Trade-in section with YMMT selector, value estimate, tax credit display
- [ ] Editable dealer fees with state doc fee caps
- [ ] Financing calculator with credit tier selector and long RV loan terms
- [ ] Insurance estimate by RV type and value
- [ ] State-specific tip callouts
- [ ] Mobile sticky bar + bottom sheet breakdown
- [ ] Save/share/print estimate functionality
- [ ] Per-state tax and fee database (static JSON, all 50 states + DC)

### Out of Scope

- Real API integration — client-side mock data only (vehicle data is static JSON)
- Server-side rendering — SPA only
- Backend search — client-side data only
- User authentication — UI-only interactions (no real persistence)
- Real-time inventory updates — static sample dataset
- Mobile responsive homepage — desktop-first (1789px)
- AI-powered search suggestions — placeholder text only
- Dealer dashboard or listing management — buyer-facing only
- Real DataOne/NHTSA API integration — mock vehicle database with static data
- Tow match email alerts — P2, deferred
- Side-by-side tow comparison — P2, deferred
- Tow vehicle recommendation engine — P2, deferred
- Route integration with tow data — P2, depends on Lifestyle Context completion
- Dealer tow match dashboard — P2, deferred
- VIN camera scanner — P2, mobile enhancement
- Truck camper payload-only variant — simplified for v6.0, may add later
- Blind vote mode — P2, hide reactions until all vote
- Ranking/drag-to-reorder mode — P2
- AI-generated shared preference summary — P2
- Agent/advisor list access — P2, privacy concerns
- List activity in search ranking — P2, feedback loop risk
- Archived/completed lists with "We bought one!" — P2
- Real-time chat between co-shoppers — high complexity, not core
- Real backend/authentication — frontend-only constraint
- Zip code–level local tax rates (Avalara/TaxJar) — v8.0 uses state averages, defer API integration
- Pre-qualification soft pull / financing partner integration — P2 monetization layer
- Insurance quote integration (Progressive, Good Sam, Roamly) — P2 affiliate play
- Dealer-specific fee data ingestion — P2, build pipeline but don't block v8.0
- Transport/delivery cost estimate — P2, requires distance calculation
- Side-by-side cost comparison of 2 listings — P2
- GAP insurance / extended warranty line items — P2
- Annual cost projection (renewal, insurance, maintenance by year) — P2

## Context

- Design system: TIDE 2.0 (Trader Interactive) documented in DESIGN_SYSTEM.md
- Theme: RV Trader specific tokens documented in THEME_RV.md
- Components: RV-specific component specs in COMPONENTS_RV.md
- Reference: Figma SRP spec (frame 1:3997, 1762x9280px) — "SRP — Desktop 3"
- Reference: Figma VDP spec extracted to reference/vdp.md (frame 32:6780, 1790x7699px)
- Existing code: React 19 + Vite 7 + TypeScript 5.9, full VDP with video walkthrough
- Font: Montserrat (all weights 400-700)
- SRP layout: 1762px full, 330px filter sidebar + 1272px content area, 64px side margins
- VDP page width: 1790px full, 1120px content area centered
- Breakpoints: 768px (sm), 992px (md), 1232px (lg), 1920px (xl) — defined in tokens.css
- SRP card grid: 3 columns at ~403px each with 32px gaps
- Featured carousel: 5 cards at ~242px each

## Constraints

- **Tech stack**: React 19 + TypeScript + Vite + CSS Modules — already established
- **Design fidelity**: Must match TIDE 2.0 / RV Trader theme tokens exactly
- **Data**: ~80 sample RV listings with realistic variety; VDP still uses Airstream Flying Cloud 25RB reference
- **No new dependencies**: Use only React + existing tooling (no UI library, no Tailwind, no mapping SDK)
- **Frontend only**: All data is mocked — no real APIs, no backend services
- **Render budget**: Section must render within 500ms (all data pre-cached/static)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| CSS Modules for styling | Already established pattern in codebase | ✓ Good |
| Static sample data | Focus on design fidelity before data integration | ✓ Good |
| Full VDP in single milestone | All sections needed for complete page | ✓ Good |
| Desktop-first | Reference design is 1790px desktop layout | ✓ Good |
| Frontend-only video components | Build player/thumbnail/overlay UI; actual video generation is backend concern | ✓ Good |
| Simulated video content | Use sample MP4/poster images to demonstrate the full UI flow | ✓ Good |
| Mock lifestyle data | Static JSON matching spec API shape for Airstream/Seattle — real APIs are future work | — Pending |
| Tab-based content modules | 6 tabs (Destinations, Routes, Storage, Service, Seasonal, Community) with horizontal scroll | — Pending |
| CSS placeholder maps | No mapping SDK dependency — use styled divs or static images for route previews | — Pending |
| Client-side filter engine | ~80 sample listings filtered in-memory — no backend search service | ✓ Good |
| Sample data generator | Realistic RV listings with variety across types, makes, prices, locations | ✓ Good |
| React Router for multi-page | Client-side routing: / (homepage), /search (SRP), /listing/:id (VDP) | — Pending |
| Static RV type assets | Download/create 10 RV type thumbnail images for search dropdown | — Pending |
| Reuse existing components | Header, Footer, CrossPromotionsBar, ListingCard, Button, Icon, ActionChip, SegmentedButtons, AdSlot, Divider | — Pending |
| Homepage card + carousel pattern | HomepageListingCard (240px fixed) + ListingCarousel (scroll-snap + arrows) reused across 3 sections | ✓ Good |
| Full-width section breakout | DealerShowcase rendered outside .content as sibling, self-centering for gray background | ✓ Good |
| CSS custom property card width override | FeaturedListings grid uses --homepage-card-width: 100% to fill grid cells | ✓ Good |

| Mock vehicle data layer | Real APIs are out of scope — static JSON vehicle database with ~50 popular truck/SUV configs | — Pending |
| Frontend-only tow calculations | All compatibility math runs client-side from static vehicle + listing data | — Pending |
| Tow match as VDP section | Badge near price + expandable panel, not a separate page | — Pending |
| SRP filter integration | "Fits My Vehicle" filter uses existing client-side filter engine pattern | — Pending |
| Co-shopping mock data layer | No real backend — shared lists, reactions, comments stored in React context/state | — Pending |
| WebSocket simulation | Mock real-time events with setTimeout/state updates — no actual WebSocket server | — Pending |
| Registration gate as UI-only | Invite flow shows registration requirement but no real auth | — Pending |
| Static state tax/fee database | Curated JSON for all 50 states + DC — no real-time tax API (Avalara/TaxJar deferred to P2) | — Pending |
| Client-side cost calculations | All tax, fee, financing, insurance math runs in-browser from static data | — Pending |
| State-average local tax rates | V1 uses state averages, not zip code–level granularity | — Pending |
| Trade-in value estimation | Simplified model based on RV type, age, condition — not trying to be KBB | — Pending |

---
*Last updated: 2026-02-27 after milestone v8.0 Total Cost Calculator initialization*
