# RV Marketplace VDP

## What This Is

A Vehicle Detail Page (VDP) for the RV Trader marketplace, built as a React + TypeScript SPA. The page displays comprehensive vehicle listing information — photos, pricing, dealer contact, specs, AI summary, loan calculator, and related listings — following the TIDE 2.0 design system with RV Trader theme tokens.

## Core Value

A pixel-accurate VDP that faithfully implements the Figma reference design using the TIDE 2.0 design system and RV Trader theme, rendering all sections with hardcoded sample data.

## Requirements

### Validated

- ✓ React 19 + TypeScript + Vite app scaffolded — existing
- ✓ PriceDistributionChart component built — existing
- ✓ CSS Modules pattern established — existing
- ✓ `@components` path alias configured — existing

### Active

- [ ] Full VDP page with all sections from reference/vdp.md
- [ ] TIDE 2.0 design system tokens (colors, typography, spacing, borders, shadows)
- [ ] RV Trader theme applied (primary green #006836, surface/border tokens)
- [ ] Cross-promotions bar with realm tabs
- [ ] Header with logo, nav links, account button
- [ ] Leaderboard ad slot (728x90)
- [ ] Navigation bar (back link, result pagination)
- [ ] Title section (vehicle name, share/favorite icons, subtitle)
- [ ] Photo gallery (hero image + 2x2 thumbnail grid, "See all photos" overlay)
- [ ] Price + payment section with strikethrough and price guidance badge
- [ ] AI summary card
- [ ] Vehicle History Report card
- [ ] Willing to negotiate indicator
- [ ] Features and specs section
- [ ] Price analysis with distribution chart (existing component)
- [ ] Description with "Read more" expand
- [ ] Loan calculator section
- [ ] About the dealership section (info, bio, badge, CTA)
- [ ] Resources section
- [ ] Report listing link
- [ ] Disclaimer text
- [ ] Dealer contact card sidebar (email/call/chat tabs, message input, submit CTA)
- [ ] Sidebar ad slots (300x250, 300x600)
- [ ] Similar listings carousel
- [ ] Related categories (chip tags)
- [ ] Insurance/accessories cards
- [ ] AdSense slots
- [ ] Footer with nav columns, SEO copy, copyright
- [ ] Static sample data (2024 Airstream Flying Cloud 25RB)
- [ ] Responsive two-column layout (633px left + 455px right within 1120px content area)

### Out of Scope

- Real API integration — static mockup only
- Mobile/responsive breakpoints — desktop layout first
- Server-side rendering — SPA only
- User authentication — no login flows
- Search results page — VDP only
- Dynamic routing — single page

## Context

- Design system: TIDE 2.0 (Trader Interactive) documented in DESIGN_SYSTEM.md
- Theme: RV Trader specific tokens documented in THEME_RV.md
- Components: RV-specific component specs in COMPONENTS_RV.md
- Reference: Figma VDP spec extracted to reference/vdp.md (frame 32:6780, 1790x7699px)
- Existing code: React 19 + Vite 7 + TypeScript 5.9, PriceDistributionChart already built
- Font: Montserrat (all weights 400-700)
- Page width: 1790px full, 1120px content area centered

## Constraints

- **Tech stack**: React 19 + TypeScript + Vite + CSS Modules — already established
- **Design fidelity**: Must match TIDE 2.0 / RV Trader theme tokens exactly
- **Data**: Hardcoded sample data matching the Airstream Flying Cloud 25RB reference
- **No new dependencies**: Use only React + existing tooling (no UI library, no Tailwind)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| CSS Modules for styling | Already established pattern in codebase | — Pending |
| Static sample data | Focus on design fidelity before data integration | — Pending |
| Full VDP in single milestone | All sections needed for complete page | — Pending |
| Desktop-first | Reference design is 1790px desktop layout | — Pending |

---
*Last updated: 2026-02-21 after initialization*
