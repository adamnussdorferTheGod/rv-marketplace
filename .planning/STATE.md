# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-28)

**Core value:** A pixel-accurate marketplace experience implementing Figma designs with TIDE 2.0 and dynamic client-side filtering
**Current focus:** v8.0 Total Cost Calculator

## Current Position

Phase: 51 - Insurance, State Tips, Responsive Polish
Plan: 2 of 2 complete in current phase
Status: Complete
Last activity: 2026-02-28 — Completed 51-02 (Responsive Polish)

## Performance Metrics

**Velocity (v1.0):**
- Total plans completed: 17
- Average duration: 4.4min
- Total execution time: 1.25 hours

**v6.0:**
- Completed: 6 plans
- 30-01: 2min, 30-02: 3min, 30-03: 2min, 31-01: 1min, 31-02: 2min, 31-03: 3min

**v7.0:**
- Completed: 5 plans
- 36-01: 1min, 36-02: 2min, 45-01: 2min, 45-02: 2min, 46-01: 3min

**v8.0:**
- Total plans estimated: 10 (across 5 phases)
- Completed: 9
- 47-01: 4min, 47-02: 6min, 48-01: 2min, 48-02: 2min, 49-01: 2min, 49-02: 4min, 50-01: 3min, 51-01: 3min, 51-02: 3min

## Accumulated Context

### Decisions

- [v8.0]: Static state tax/fee database -- curated JSON for all 50 states + DC, no real-time tax API
- [v8.0]: Client-side cost calculations -- all math runs in-browser from static data
- [v8.0]: State-average local tax rates -- no zip code granularity in v8.0
- [v8.0]: Trade-in value estimation -- simplified model, not KBB
- [v8.0]: TotalCostCalculator replaces existing LoanCalculator in same VDP position
- [47-01]: RV-specific rules keyed by string identifiers (MD_AGE_EXEMPT, CT_TIERED, etc.) for extensible dispatch
- [47-01]: Tax cap states collapse state+local into single capped amount (localTax=0)
- [47-01]: vitest added for TDD workflow
- [47-02]: State entries ordered alphabetically by code for consistent scanning
- [47-02]: RV-specific dispatch keys in database match calculation engine switch exactly
- [47-02]: SC taxCapRate=0.05 ($300 cap), NC taxCapRate=0.03 ($2,000 cap) per real state law
- [18-01]: Used 767px breakpoint for mobile media queries to match existing LifestyleContext conventions
- [18-01]: Most mobile responsive CSS already existed from prior phases; only LifestyleContext container and RoutesTab scrollbar needed changes
- [48-01]: 180-month simple division for monthly payment teaser (placeholder for Phase 50 financing)
- [48-01]: Extract state code from location prop by splitting on ', ' and taking last 2 chars
- [48-02]: CostBreakdown is a pure display component -- all computation stays in TotalCostCalculator useMemo
- [48-02]: Null-guard rendering: CostBreakdown only renders when taxResult, dmvResult, dealerFees are non-null
- [18-02]: Restored tab bar from pre-regression state (commit b1626a1) rather than reimplementing
- [18-02]: Tab bar uses overflow-x auto with scrollbar-width none for hidden horizontal scroll on mobile
- [49-01]: Click-to-edit interaction with hover dashed underline affordance (no pencil icon)
- [49-01]: dealerFeeOverrides partial state merged with defaults -- only user-edited fees override
- [49-01]: State change resets overrides inline in onChange (no useEffect) to avoid extra render
- [49-02]: Simplified depreciation curve (35000 * 0.88^age) with make/condition multipliers for trade-in estimation
- [49-02]: Yes/No toggle buttons for trade-in activation, tax savings computed by diffing tax with/without trade-in
- [49-02]: Trade-in deduction shown in both summary bar and grand total block for visibility
- [50-01]: Lifted financing state to TotalCostCalculator so monthly teaser always uses real PMT, even when breakdown is closed
- [50-01]: Down payment clamped to [0, listingPrice] range with $100 slider step for practical UX
- [50-01]: Manual APR override clears when user clicks a credit tier, providing intuitive toggle behavior
- [51-01]: Insurance rates as percentage of RV value with per-type minimums for educational estimates
- [51-01]: StateTips uses data-tip-type attribute for variant styling (info/savings/warning)
- [51-01]: Tips rendered after state selector and before summary card for immediate contextual feedback
- [51-02]: Digit strip uses CSS translateY transition for smooth odometer roll between character positions
- [51-02]: matchMedia listener for mobile detection in CostBreakdown, not window resize
- [51-02]: Accordion sections default to collapsed on mobile, always open on desktop

### Pending Todos

None yet.

### Roadmap Evolution

- Phases 47-51 added: v8.0 Total Cost Calculator milestone

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-02-28
Stopped at: Completed 51-02-PLAN.md
Resume file: None
