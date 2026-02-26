# RV Marketplace

## What This Is

An RV Trader marketplace frontend built as a React + TypeScript SPA. Includes a Search Results Page (SRP) for browsing, filtering, and sorting RV listings, and a Vehicle Detail Page (VDP) with comprehensive listing information — photos, pricing, dealer contact, specs, AI summary, loan calculator, and related listings — following the TIDE 2.0 design system with RV Trader theme tokens.

## Core Value

A pixel-accurate marketplace experience that faithfully implements the Figma reference designs using the TIDE 2.0 design system and RV Trader theme, with dynamic client-side filtering that makes the demo feel like a real product.

## Current Milestone: v5.0 Homepage

**Goal:** Build the full homepage as the primary marketplace entry point — hero search, listing carousels, dealer showcase, selling options, ownership resources, blog content, SEO links, and app download — with react-router-dom routing across Homepage → SRP → VDP.

**Target features:**
- react-router-dom routing: / (homepage), /search (SRP), /listing/:id (VDP)
- Hero banner with "Shop the largest RV marketplace" heading and AI-powered search bar
- Expanded search dropdown with 10 RV type thumbnails, popular searches, popular makes
- "RVs hand-picked for you" listing carousel with filter chips and carousel navigation
- Dealer showcase section with dealer branding and inventory carousel
- "Selling made with you in mind" 3-panel tabbed section (consign, private, dealer)
- "Featured listings" 2-row listing grid with carousel navigation
- "Making RV ownership easy" 4 illustrated cards
- "Stay in the know" tabbed blog/content section with featured image and article list
- "Popular searches" SEO link grid with tabbed categories
- App download + newsletter section
- Logo always links to homepage; listing cards link to VDP

**Figma reference:**
- Homepage: frame 1:9679 (1789x6316px) — "Homepage — Desktop 1"
- Expanded search: frame 1:10901 (1789x1566px) — "Homepage Search — Desktop 2"

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

### Active

- [ ] react-router-dom routing with / (homepage), /search (SRP), /listing/:id (VDP)
- [ ] Hero banner with search bar, AI icon, ZIP input, segmented control
- [ ] Expanded search dropdown with RV type grid, popular searches/makes chips
- [ ] "RVs hand-picked for you" listing carousel with filter chips
- [ ] Dealer showcase section with branding and inventory carousel
- [ ] "Selling made with you in mind" 3-panel tabbed section
- [ ] "Featured listings" 2-row listing grid
- [ ] "Making RV ownership easy" 4 illustrated cards
- [ ] "Stay in the know" tabbed blog/content section
- [ ] "Popular searches" SEO link grid
- [ ] App download + newsletter section
- [ ] Logo → homepage, listing cards → VDP routing
- [x] SRP data types and ~80 sample listings — v4.0 Phase 24
- [x] Client-side filter/sort engine with URL sync — v4.0 Phase 24

### Out of Scope

- Real API integration — client-side mock data only
- Server-side rendering — SPA only
- Backend search — client-side data only
- User authentication — UI-only interactions (no persistence)
- Real-time inventory updates — static sample dataset
- Mobile responsive homepage — desktop-first (1789px)
- AI-powered search suggestions — placeholder text only
- SRP page build — separate v4.0 milestone (in progress)
- Dealer dashboard or listing management — buyer-facing only

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

---
*Last updated: 2026-02-26 after Phase 24 (v4.0 complete)*
