# Requirements: RV Marketplace — v8.0 Total Cost Calculator

**Defined:** 2026-02-28
**Core Value:** A pixel-accurate marketplace experience implementing Figma designs with TIDE 2.0 and dynamic client-side filtering

## v8.0 Requirements

Requirements for Total Cost Calculator milestone. Replaces the existing LoanCalculator VDP section with a comprehensive, real-time purchase cost estimator.

### Calculator Core

- [x] **CALC-01**: TotalCostCalculator section replaces existing LoanCalculator on VDP in the same position
- [x] **CALC-02**: Calculator shows summary view: listing price + est. tax & fees = out-the-door total with est. monthly payment
- [x] **CALC-03**: State selector dropdown defaults to listing location state, recalculates all values on change
- [x] **CALC-04**: "Based on registering in [State]" attribution shown beneath totals
- [x] **CALC-05**: All calculated values update in real-time as any input changes (no submit button)
- [x] **CALC-06**: Expandable full breakdown with itemized sections: Purchase Price, Taxes, DMV Fees, Dealer Fees, Financing, Insurance, Grand Total

### State Tax Data

- [x] **TAX-01**: Static JSON database with tax rates, fees, and rules for all 50 states + DC
- [x] **TAX-02**: State sales tax rate + average local tax rate per state with combined calculation on taxable amount
- [x] **TAX-03**: Tax cap states handled correctly (SC capped at $300 total, NC 3% capped at $2,000)
- [x] **TAX-04**: No-tax states display $0 with state-specific explanatory notes (AK local tax possible, DE 4.25% doc fee, MT $0, NH permit fees, OR 0.5% use tax)
- [x] **TAX-05**: RV-specific tax rules applied where applicable (MD no tax on RVs >7 years, CT tiered 6.35%/<$50K and 7.75%/>$50K, GA 6.6% one-time TAVT, OK $20+3.25%, FL county surtax on first $5K only)
- [x] **TAX-06**: Trade-in tax credit correctly reduces taxable amount in ~42 states, full price taxed in CA, DC, HI, KY, VA

### DMV & Dealer Fees

- [x] **FEE-01**: Per-state DMV fees displayed: title fee, registration fee, plate/tab fee from static data
- [x] **FEE-02**: Registration fee calculation supports flat, weight-based (using GVWR), and value-based models per state
- [x] **FEE-03**: Dealer fee defaults by RV type (travel trailer, fifth wheel, Class A/B/C, pop-up, truck camper) with state doc fee caps enforced
- [x] **FEE-04**: Dealer fees editable per line item with inline edit interaction (click to edit, blur/enter to commit)

### Trade-In

- [x] **TRAD-01**: Trade-in toggle (Yes/No) that expands/collapses trade-in input section
- [x] **TRAD-02**: YMMT selector (Year/Make/Model/Condition) with automated value range estimate (low/mid/high)
- [x] **TRAD-03**: User can override estimated trade-in value with manual dollar input
- [x] **TRAD-04**: Trade-in tax credit savings displayed prominently in credit states with dollar amount saved
- [x] **TRAD-05**: Warning callout shown in non-credit states (CA, DC, HI, KY, VA) explaining tax is on full price

### Financing

- [x] **FIN-01**: Down payment input with slider and text field ($0 to listing price)
- [x] **FIN-02**: Loan term selector including RV-specific long terms (36, 48, 60, 72, 84, 120, 144, 180 months)
- [x] **FIN-03**: Credit tier selector (Excellent 5.99% / Good 7.49% / Fair 9.99% / Below Fair 12.49%) as friendly APR input
- [x] **FIN-04**: APR text input for manual override when user knows their rate
- [x] **FIN-05**: Amount financed defaults to out-the-door price minus down payment (tax + fees included in loan)
- [x] **FIN-06**: Displays monthly payment, total interest paid, and total cost of loan

### Insurance

- [x] **INS-01**: Insurance estimate section showing annual premium range (low/mid/high) by RV type and value
- [x] **INS-02**: Coverage type note and educational disclaimer ("Get a real quote from an RV insurer")

### State Intelligence

- [x] **TIP-01**: State-specific tip callouts surface tax caps, no-tax advantages, trade-in credit rules, and RV-specific exemptions
- [x] **TIP-02**: Three callout types with distinct styling: info (neutral blue), savings (green), warning (amber)

### Mobile & Polish

- [ ] **UX-01**: Responsive layout — inputs stack single-column on mobile, breakdown sections as collapsible accordions
- [ ] **UX-02**: Numeric values animate on recalculation with odometer-style counter roll
- [x] **UX-03**: Legal disclaimer at bottom: "Cost estimates are calculated using publicly available state tax rates..."

## Future Requirements

Deferred to future milestone. Tracked but not in current roadmap.

### Save & Share

- **SAVE-01**: Save full estimate to user account (auth required)
- **SAVE-02**: Saved estimates update automatically when listing price changes, with notification
- **SAVE-03**: Share estimate as link or image card for co-shopping
- **SAVE-04**: Print-friendly / PDF version of full breakdown

### Enhanced Location

- **ELOC-01**: Zip code-level local tax rates via Avalara or TaxJar API
- **ELOC-02**: "What if I register in [State]?" -- quick 2-3 state side-by-side comparison
- **ELOC-03**: Multi-state purchase advisory (buy in listing state, register in home state)

### Revenue Integrations

- **REVN-01**: "Get pre-qualified" CTA with financing partner integration
- **REVN-02**: "Get an actual quote" CTA with insurance partner (Progressive, Good Sam, Roamly)
- **REVN-03**: Dealer-specific fee data ingestion from RV Trader dealer portal

### Additional Line Items

- **ADDL-01**: Transport/delivery cost estimate for out-of-state purchases (per-mile rate x distance)
- **ADDL-02**: GAP insurance estimate as optional line item
- **ADDL-03**: Extended warranty cost range as optional line item
- **ADDL-04**: Annual cost projection (registration renewal, insurance, maintenance by year)

### Advanced

- **ADVN-01**: Side-by-side total cost comparison of 2 listings
- **ADVN-02**: Cost calculator data feeds into Walk-In Deal Kit PDF
- **ADVN-03**: Mobile sticky summary bar at bottom of VDP with tap-to-expand

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real API calls for tax data | Frontend-only constraint -- static JSON database |
| Zip code-level tax granularity | State averages sufficient for v8.0, Avalara/TaxJar deferred |
| Real financing pre-qualification | No lending partner integration -- credit tier defaults only |
| Real insurance quotes | Educational estimate only -- no insurer API |
| Dealer-specific fee data | Industry averages only -- dealer portal integration deferred |
| Backend persistence | All state in React -- no saved estimates server-side |
| Real user location detection | No geolocation API -- listing state as default |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CALC-01 | Phase 48 | Complete |
| CALC-02 | Phase 48 | Complete |
| CALC-03 | Phase 48 | Complete |
| CALC-04 | Phase 48 | Complete |
| CALC-05 | Phase 48 | Complete |
| CALC-06 | Phase 48 | Complete |
| TAX-01 | Phase 47 | Complete |
| TAX-02 | Phase 47 | Complete |
| TAX-03 | Phase 47 | Complete |
| TAX-04 | Phase 47 | Complete |
| TAX-05 | Phase 47 | Complete |
| TAX-06 | Phase 47 | Complete |
| FEE-01 | Phase 47 | Complete |
| FEE-02 | Phase 47 | Complete |
| FEE-03 | Phase 48 | Complete |
| FEE-04 | Phase 49 | Complete |
| TRAD-01 | Phase 49 | Complete |
| TRAD-02 | Phase 49 | Complete |
| TRAD-03 | Phase 49 | Complete |
| TRAD-04 | Phase 49 | Complete |
| TRAD-05 | Phase 49 | Complete |
| FIN-01 | Phase 50 | Complete |
| FIN-02 | Phase 50 | Complete |
| FIN-03 | Phase 50 | Complete |
| FIN-04 | Phase 50 | Complete |
| FIN-05 | Phase 50 | Complete |
| FIN-06 | Phase 50 | Complete |
| INS-01 | Phase 51 | Complete |
| INS-02 | Phase 51 | Complete |
| TIP-01 | Phase 51 | Complete |
| TIP-02 | Phase 51 | Complete |
| UX-01 | Phase 51 | Pending |
| UX-02 | Phase 51 | Pending |
| UX-03 | Phase 48 | Complete |

**Coverage:**
- v8.0 requirements: 34 total
- Mapped to phases: 34
- Unmapped: 0

---
*Requirements defined: 2026-02-28*
*Last updated: 2026-02-28 after roadmap creation*
