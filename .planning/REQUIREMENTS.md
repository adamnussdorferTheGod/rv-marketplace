# Requirements: RV Marketplace -- v9.0 Market Insights

**Defined:** 2026-03-02
**Core Value:** A pixel-accurate marketplace experience implementing Figma designs with TIDE 2.0 and dynamic client-side filtering

## v1 Requirements

Requirements for v9.0 Market Insights milestone. Each maps to roadmap phases.

### Data Layer

- [x] **DATA-01**: Pricing engine computes market metrics from existing ~80 sample listings by matching comparables (same RV type, similar year range, similar condition)
- [x] **DATA-02**: Listings include `daysOnSite` and price drop history fields to power insight cards
- [x] **DATA-03**: Engine returns `null`/insufficient-data state when fewer than 3 comparables exist for a listing's type

### Days on Market

- [ ] **DOM-01**: User sees how many days the current listing has been on market
- [ ] **DOM-02**: User sees the average days on market for comparable RVs of the same type (e.g., "Travel trailers like this typically sell within 32 days")
- [ ] **DOM-03**: Card contextualizes the listing's DOM vs. category average ("This one has been listed 18 days -- faster than average")

### Supply & Demand

- [ ] **SUPP-01**: User sees how many comparable listings of the same type are currently available
- [ ] **SUPP-02**: Card shows a simulated supply trend direction vs. prior month (more/fewer/stable)
- [ ] **SUPP-03**: Card frames supply level as buyer advice ("Supply is high -- more negotiating room")

### Seasonal Timing

- [ ] **SEAS-01**: User sees whether the current month is a good or bad time to buy this RV type
- [ ] **SEAS-02**: Card shows estimated savings percentage vs. peak season pricing
- [ ] **SEAS-03**: Seasonal multipliers are hardcoded per RV type based on industry patterns

### Price Drop Alert

- [ ] **DROP-01**: User sees a prominent alert when a listing has had a recent price reduction
- [ ] **DROP-02**: Alert shows dollar amount dropped, percentage, and date of reduction
- [ ] **DROP-03**: Listings without price drops do not show a Price Drop Alert card

### Methodology Panels

- [ ] **METH-01**: User can expand any insight card to see how the metric was calculated
- [ ] **METH-02**: Expanded panel shows comparable count, value range, and data freshness
- [ ] **METH-03**: Panel includes disclaimer ("Based on sample marketplace data")

### Section UX

- [ ] **UX-01**: All cards appear in a "Market Insights" section on the VDP left column
- [ ] **UX-02**: Cards default to collapsed (headline insight only) to minimize VDP scroll impact
- [ ] **UX-03**: Insufficient data shows a "Limited market data" state rather than hiding the card
- [ ] **UX-04**: Cards use TIDE 2.0 design tokens and CSS Modules for styling

## v2 Requirements

Deferred to future milestone. Tracked but not in current roadmap.

### Deal Quality

- **DEAL-01**: Color-coded deal quality badge (Great/Good/Fair/Above Market) near VDP price area
- **DEAL-02**: Market value reference anchor displayed alongside badge ("Market avg: $X")

### SRP Integration

- **SRP-01**: Deal quality badges visible on SRP listing cards
- **SRP-02**: Price drop indicators visible on SRP listing cards

### Advanced Insights

- **ADV-01**: Price trend indicator (rising/falling/stable) per RV type
- **ADV-02**: Price history timeline showing per-listing price changes over time
- **ADV-03**: Combined market summary card synthesizing deal score + supply + seasonal into narrative

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real API data integration (SSI, NADA) | Frontend-only demo -- all data from static dataset |
| RV Market Pulse standalone page | Being built in a separate project |
| Price trend graphs / charts | Being built in a separate project |
| SRP-level deal badges | VDP-only for v9.0; SRP integration deferred |
| Saved price drop alerts / notifications | Requires auth + backend (frontend-only constraint) |
| Regional heat map of supply | Requires mapping SDK (no new dependencies constraint) |
| Per-listing negotiation recommendations | Crosses from information into advice; liability concerns |
| Real-time inventory updates | SPA with static JSON -- no real-time data layer |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 52 | Complete |
| DATA-02 | Phase 52 | Complete |
| DATA-03 | Phase 52 | Complete |
| DOM-01 | Phase 54 | Pending |
| DOM-02 | Phase 54 | Pending |
| DOM-03 | Phase 54 | Pending |
| SUPP-01 | Phase 54 | Pending |
| SUPP-02 | Phase 54 | Pending |
| SUPP-03 | Phase 54 | Pending |
| SEAS-01 | Phase 54 | Pending |
| SEAS-02 | Phase 54 | Pending |
| SEAS-03 | Phase 54 | Pending |
| DROP-01 | Phase 54 | Pending |
| DROP-02 | Phase 54 | Pending |
| DROP-03 | Phase 54 | Pending |
| METH-01 | Phase 55 | Pending |
| METH-02 | Phase 55 | Pending |
| METH-03 | Phase 55 | Pending |
| UX-01 | Phase 53 | Pending |
| UX-02 | Phase 53 | Pending |
| UX-03 | Phase 53 | Pending |
| UX-04 | Phase 53 | Pending |

**Coverage:**
- v1 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0

---
*Requirements defined: 2026-03-02*
*Last updated: 2026-03-02 after roadmap creation*
