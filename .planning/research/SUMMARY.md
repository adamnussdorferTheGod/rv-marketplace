# Project Research Summary

**Project:** RV Marketplace v9.0 — Market Insights
**Domain:** Client-side algorithmic pricing intelligence for RV Vehicle Detail Page
**Researched:** 2026-03-02
**Confidence:** HIGH

## Executive Summary

v9.0 adds buyer-facing market intelligence cards to the existing VDP — deal scoring, days-on-market context, supply/demand framing, seasonal timing advice, and price drop alerts. This is table-stakes UX in the automotive space (CarGurus, KBB, Edmunds all offer it) but is completely absent from RV marketplaces today. RV Trader has no buyer-facing deal badges or market insight cards. Building this pattern on an RV VDP is both well-understood (copy the automotive playbook) and meaningfully differentiated (no RV competitor has done it yet).

The recommended approach is zero new dependencies. All four insight cards are pure algorithmic computations over the existing ~80-listing dataset, following patterns already established in this codebase: a pure TypeScript engine in `app/src/data/`, a typed result object passed as a prop, and card components that only render. This is the exact shape of `generateDealKit.ts`, `generateNarrations.ts`, and `generateVideoWalkthrough.ts`. The engine is the only new file that carries meaningful risk — it must bridge `ListingData` and `SRPListing` types, handle sparse subcategories gracefully, and compute statistically defensible metrics from a small dataset.

The primary risk is trust erosion from overconfident UI. Presenting point estimates ("32 days") derived from 4 comparables, displaying supply counts as if they reflect real market inventory, or applying national seasonal models to Florida listings — all of these will make the feature look unreliable to any buyer who cross-checks. The mitigation is clear: minimum-sample guards in the engine (suppress cards below n=8), range copy instead of point estimates, comparison scope disclosure in the engine return type, and a methodology panel that shows actual comparables rather than marketing language. These guards must be built into the engine API from day one — they cannot be polished on afterwards without refactoring.

---

## Key Findings

### Recommended Stack

No new dependencies. The entire v9.0 feature set is achievable with the existing installed stack: React 19.2.0, TypeScript 5.9.3, CSS Modules, and Motion 12.34.3 (already installed). The computation engine mirrors `financingCalculations.ts` and `tradeInEstimator.ts` — pure TypeScript functions that take inputs and return typed objects. Caching via `useMemo` with `[listing]` dependency is the correct pattern and is already used for `generateDealKit()` in `VehicleDetailPage.tsx`. Card expand/collapse uses local `useState` per card, matching the `TotalCostCalculator` breakdown pattern. Vitest 4.0.18 is already configured and should cover the engine with unit tests following the `stateTaxCalculations.test.ts` pattern.

The one exception is seasonal insights: the ~80-listing dataset is a price snapshot, not a time series, so seasonal coefficients must be a hardcoded lookup table (`SEASONAL_INDEX[rvType][month]`) based on known RV market patterns. This is appropriate for the demo and should be clearly labeled in UI copy.

**Core technologies:**
- TypeScript 5.9.3 (pure functions) — computation engine with no React dependencies; trivially unit-testable
- React 19.2.0 `useMemo` — computation caching; established VDP pattern via `generateDealKit`
- React 19.2.0 `useState` — per-card expand/collapse; no shared context needed
- Motion 12.34.3 `AnimatePresence` — `height: auto` expand animation; already installed, handles auto-height correctly
- Vitest 4.0.18 — unit tests for `marketInsights.ts`; test pattern established in `stateTaxCalculations.test.ts`

### Expected Features

Buyer-facing pricing intelligence is table stakes on automotive platforms. The full MVP set (P1) can be built from the existing dataset with no schema changes to `ListingData` — `priceHistory`, `daysOnSite`, `currentPrice`, `rvType`, `year`, `condition`, and `location.state` are already present.

**Must have (table stakes):**
- Deal Quality Badge + Market Value Reference (T1/T2) — primary buyer signal; meaningless without showing the comparable median that backs it; comparable count must be visible
- Price Drop Alert (T3) — high-conversion signal; drop data already in `priceAnalysis.priceHistory`
- Days on Market display (T5) — buyers expect this; `daysOnSite` field already exists
- Comparable Count (T4) — anchors the deal badge with a concrete data point
- Progressive Disclosure / Expand (T6) — headline + tap-to-expand methodology; required to avoid information overload
- Methodology Transparency Panel (D5) — must show actual comparables list with year/type/price/DOM, sample count, and match criteria; not marketing copy

**Should have (competitive, v9.0 scope):**
- Avg Days on Market Card (D1) — category-level context alongside per-listing DOM; medium effort; no RV marketplace offers this
- Supply & Demand Card (D2) — count + trend framing as buyer advice; leverages comparable computation already done
- Seasonal Timing Card (D3) — standalone (uses only `Date()` + hardcoded coefficients); no RV marketplace offers inline seasonal advice

**Defer (v9.x after core validation):**
- Price Trend Indicator (D4) — directional arrow by type/condition; add after core cards validated
- Price History Timeline (D7) — timeline UI; T3 already delivers 80% of the value with less work
- Combined Market Summary Card (D6) — NLG synthesis of T1+D2+D3; highest complexity, requires all three predecessors working correctly

**Out of scope (v10+):**
- SRP deal badges — extends VDP badge pattern to listing cards; significant SRP design work; validate VDP concept first
- Saved price alerts — requires auth + backend infrastructure; PROJECT.md: no auth, no persistence

### Architecture Approach

The established generate-then-render pattern applies directly. A pure engine function `generateMarketInsights(listing: ListingData): MarketInsightsData` lives in `app/src/data/`, imports `sampleSrpListings` at module level for peer comparisons, and returns a fully-typed result object. `VehicleDetailPage` calls it via `useMemo` and passes `insights={marketInsights}` to `<MarketInsightsSection />`, which distributes typed sub-objects to four card components. Each card owns its own `isExpanded` state. No Context provider is needed — this is static data flowing one direction, not an async overlay system like DealKit.

The insertion point in the VDP is between `PriceAnalysis` and `PaymentCalculator`, with an `id="market-insights"` anchor matching the existing `id="price"` and `id="payment"` pattern.

**Major components:**
1. `app/src/data/marketInsightsTypes.ts` — TypeScript types for `MarketInsightsData` and all four sub-insight types; must include `comparisonScope: 'local' | 'regional' | 'national' | 'type-only'` field for transparency
2. `app/src/data/marketInsights.ts` — pure engine: `generateMarketInsights()` with `findComparables()`, all four sub-computation functions, `MIN_SAMPLE` constant guard, and DOM outlier exclusion; imports `sampleSrpListings` internally
3. `components/sections/MarketInsights/MarketInsightsSection.tsx` — container section; receives `MarketInsightsData` prop; renders section heading and 2x2 card grid; all cards collapsed by default
4. Four card sub-components (`PriceDropAlertCard`, `DaysOnMarketCard`, `SupplyDemandCard`, `SeasonalTimingCard`) — each self-contained with local `useState(isExpanded)`

### Critical Pitfalls

1. **Small sample collapse** — With ~80 listings across 10+ RV types, rare subcategories (Fish House, Pop-Up Camper, Class B Van) produce 3-5 comparables. An engine with no minimum-n guard displays "Great Deal — 8% below market" backed by 3 data points. Prevention: define `MIN_SAMPLE = 8` as a named constant; suppress the card (return null) below threshold; build this guard into the engine API contract on day one.

2. **Point estimates conveying false precision** — "Typically sells in 32 days" from a dataset with a 14-67 day spread is misleading. Buyers who cross-check feel deceived. Prevention: always show ranges ("typically 18–45 days"), round to nearest 5, use softening language ("typically," "around," "in our dataset").

3. **Methodology panel as trust facade** — A panel that says "We compare similar listings" without showing actual comparables, sample count, or match criteria provides the appearance of transparency without the substance. Sophisticated buyers notice and resent it. Prevention: panel must display the actual comparable listings used (year, type, price, DOM), the sample count ("Based on 12 listings"), and the match criteria ("same RV type, ±3 years").

4. **VDP information overload** — Four new cards of 80-120px each (collapsed) risk pushing the Contact Dealer CTA below the fold on a 1080p display. Prevention: all four cards collapsed by default; auto-expand only the single highest-priority card (price drop if present, otherwise deal score); verify dealer CTA scroll-depth constraint before finalizing layout.

5. **Seasonal direction wrong for warm-weather states** — The national RV seasonal model (buy in Oct-Feb, avoid spring) inverts for Florida, Arizona, and coastal Texas where winter is peak RV season. Prevention: add a regional caveat to the seasonal card copy for FL/AZ/TX listings; suppress directional urgency language for these states.

---

## Implications for Roadmap

The architecture's generate-then-render dependency chain suggests a 4-phase build order: engine first, container wiring second, individual cards third (simplest to most complex), progressive disclosure last.

### Phase 1: Computation Engine + Types

**Rationale:** Every card depends on the engine. Statistical pitfalls (small sample, false precision, silent category broadening, DOM outlier inflation) must be addressed here — they cannot be patched later in card UI without refactoring the engine API. The engine bridges two different data types (`ListingData` vs. `SRPListing`) and must produce statistically defensible output for both dense and sparse subcategories. Build and unit-test the engine before any React work starts.

**Delivers:** `marketInsightsTypes.ts` with all types including `comparisonScope` field; `marketInsights.ts` with `generateMarketInsights()`, `findComparables()` (strict/loose/fallback tiers), all five sub-computation functions (deal score, DOM, supply/demand, seasonal, price drop), `MIN_SAMPLE` guard, outlier exclusion for DOM calculation, and median-not-mean for deal score; `marketInsights.test.ts` with Vitest unit tests including sparse-subcategory (Fish House) and dense-subcategory (Travel Trailer) cases.

**Addresses:** T2 (market value reference engine), T1 (deal score algorithm), T5 (DOM computation), T4 (comparable count), D1 (avg DOM per category), D2 (supply/demand), D3 (seasonal with hardcoded coefficients), T3 (price drop from priceHistory)

**Avoids:** Pitfall 1 (small sample collapse), Pitfall 2 (point estimates — engine returns range data, not just point), Pitfall 3 (silent broadening — `comparisonScope` in return type), Pitfall 10 (DOM outlier inflation)

### Phase 2: Container Section + VDP Wiring

**Rationale:** Validate the end-to-end data flow before building individual cards. This catches engine API shape mismatches early — far cheaper to find at the container prop boundary than deep inside a card component. Establish the section placement and default-collapsed constraint before adding card mass.

**Delivers:** `MarketInsightsSection.tsx` with 2x2 card grid layout (placeholder cards initially); `useMemo` call in `VehicleDetailPage.tsx` with `[listing]` dependency; VDP insertion between `PriceAnalysis` and `PaymentCalculator` with `id="market-insights"` anchor; confirmed dealer CTA scroll-depth constraint respected on 1080p.

**Addresses:** T6 (progressive disclosure section structure), Pitfall 7 (VDP overload — default collapsed, single auto-expanded card)

**Avoids:** Context provider anti-pattern (static data, one-way flow — no provider needed); computation-inside-cards anti-pattern

### Phase 3: Individual Cards (Simplest to Most Complex)

**Rationale:** Build in dependency order: price drop first (reads existing `priceHistory`, no dataset aggregation), DOM card second (mean/median of `daysOnSite` across peers), supply card third (count + state filtering + mock trend), seasonal card last (coefficient table + monthly index, regional edge case logic). Each card can be validated with real listing data in the browser before the next starts.

**Delivers:**
- `PriceDropAlertCard` — drop amount/percent/date in headline; date-aware urgency language (suppressed for drops >30 days old); "No price drops" empty state
- `DaysOnMarketCard` — range format ("18–45 days"), category average vs. listing DOM, comparable count visible in card subtitle
- `SupplyDemandCard` — count with "in our catalog" disclaimer, trend direction framing as buyer advice
- `SeasonalTimingCard` — current-month position on seasonal index, best-month callout, regional caveat for FL/AZ/TX listings

**Addresses:** T3, D1, D2, D3, Pitfall 5 (stale price drops), Pitfall 6 (seasonal direction for warm states), Pitfall 8 (supply count credibility)

### Phase 4: Progressive Disclosure + Methodology Panels

**Rationale:** The methodology panel design depends on the engine API being finalized — the panel must display actual engine output (comparables list, sample count, match criteria, comparison scope), not pre-written copy. Building this last ensures the panel reflects what the engine actually computed. Animation via `AnimatePresence` for `height: auto` is the correct pattern and is already installed.

**Delivers:** `isExpanded` toggle and detail panel on all four cards with `motion/react` `AnimatePresence`; methodology detail panel showing actual comparable listings (year, type, price, DOM), sample count ("Based on X listings"), comparison scope ("matched by: same RV type, ±3 years"), and data disclaimer; `aria-expanded` attribute on all toggle buttons.

**Addresses:** T6, D5, Pitfall 9 (trust facade — real comparables in panel), Pitfall 4 (deal score anchoring — comparable count visible before expanding)

### Phase Ordering Rationale

- Engine before UI because the card display logic is entirely downstream of the typed engine output; changing the engine API after cards are built forces cascading refactors across all four cards simultaneously
- Container wiring before individual cards because it validates the data flow contract end-to-end at low cost, before any card rendering complexity is introduced
- Card build order within Phase 3 follows aggregation complexity: price drop uses only the current listing (no dataset pass), DOM and supply require dataset filtering, seasonal requires both a coefficient table and regional edge case handling
- Progressive disclosure last because the methodology panel must display real engine output — the panel must be built after the engine API is stable and the card content is known; pre-written methodology copy is the trust-facade anti-pattern

### Research Flags

Phases with well-documented patterns (can skip deeper research):
- **Phase 2 (Container + VDP Wiring):** Direct mirror of `generateDealKit` integration already in the codebase. The `useMemo` + prop-passing pattern is established. No research needed.
- **Phase 4 (Progressive Disclosure):** `AnimatePresence` with `height: auto` is documented in Motion v12 official docs. Expand/collapse pattern matches `TotalCostCalculator`. `aria-expanded` is standard. No research needed.

Phases that benefit from pre-implementation codebase review:
- **Phase 1 (Engine):** Before writing `extractRvType()`, read `types.ts` to confirm the actual spec label strings used in `ListingData.specs[]` (e.g., whether the value is "Class C", "class-c", or "Class C Motorhome") and map them correctly to the `RVType` union. Also run a quick tally of `rvType` distribution in `sampleSrpListings.ts` to confirm which subcategories fall below `MIN_SAMPLE = 8` — this determines which suppressed states need test coverage.
- **Phase 3 (Seasonal Card):** Before building, check which listing states are present in the dataset to determine whether FL/AZ/TX regional inversion logic is actually triggered by any real listing, or whether it can be a documented caveat for future use.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies verified directly in `app/package.json`; zero new dependencies; all computation patterns verified in existing codebase files with direct reads |
| Features | MEDIUM-HIGH | Table stakes derived from automotive competitors (CarGurus, KBB) — well-documented. RV-specific DOM benchmarks from TITAN.AI 2024-2025 report. Seasonal data from multiple industry sources. Data is MEDIUM confidence for specific percentage values. |
| Architecture | HIGH | Based entirely on direct codebase analysis (actual files read): `generateDealKit.ts`, `VehicleDetailPage.tsx`, `types.ts`, `srpTypes.ts`, `scrapedListings.ts`, `DealKitContext.tsx`, `PriceAnalysis.tsx`. No speculation. |
| Pitfalls | HIGH | Statistical pitfalls grounded in peer-reviewed CHI 2024 research and established AVM principles. UX pitfalls grounded in CarGurus methodology analysis and OECD dark patterns publication. Direct codebase analysis confirms data shape availability. |

**Overall confidence:** HIGH

### Gaps to Address

- **Seasonal coefficient values:** The `SEASONAL_INDEX` table is based on RV market knowledge (spring peaks, fall discounts) but values are not sourced from a specific public dataset. The approach is correct; the specific percentages should be labeled "based on typical RV market seasonality patterns" in UI copy. Flag as demo data in methodology panel.
- **`daysOnSite` distribution in dataset:** The actual distribution of `daysOnSite` values in `sampleSrpListings.ts` needs a quick sanity check before finalizing DOM outlier thresholds. If values are heavily clustered, the outlier exclusion logic (exclude <3 days, exclude >180 days) may behave unexpectedly.
- **RV type coverage in dataset:** The minimum-n=8 threshold will suppress cards for some subcategories. A quick count of listings per `rvType` before Phase 1 reveals which suppressed states actually need test coverage and which card states will be most commonly seen in the demo.

---

## Sources

### Primary (HIGH confidence)
- `/Users/adam/rv-marketplace/app/package.json` — verified all installed dependencies and versions
- `/Users/adam/rv-marketplace/app/src/data/types.ts` — `ListingData`, `PriceHistoryEntry` field verification
- `/Users/adam/rv-marketplace/app/src/data/srpTypes.ts` — `SRPListing` field verification (`daysOnSite`, `currentPrice`, `originalPrice`, `dealRating`, `rvType`, `year`, `condition`, `location`)
- `/Users/adam/rv-marketplace/app/src/data/generateDealKit.ts` — generate-then-render pattern template
- `/Users/adam/rv-marketplace/app/src/data/financingCalculations.ts` — pure function computation module pattern
- `/Users/adam/rv-marketplace/components/pages/VehicleDetailPage/VehicleDetailPage.tsx` — `useMemo` integration and prop-passing pattern
- `/Users/adam/rv-marketplace/components/sections/TotalCostCalculator/TotalCostCalculator.tsx` — expand/collapse `useState` pattern
- CHI 2024 (ACM DL) — consumer perceived price fairness and anchoring bias research (peer-reviewed)
- ScienceDirect — ethics, transparency, and consumer trust in AI-enabled pricing (peer-reviewed)
- OECD — dark patterns in online shopping (official publication)

### Secondary (MEDIUM confidence)
- CarGurus IMV one-pager and help docs — deal rating methodology and algorithm
- KBB official b2b docs — Fair Market Range definition and pricing tools
- TITAN.AI RV Inventory Aging Report 2024-2025 — DOM benchmarks by RV category
- RV Trader blog 2024 price trends — RV-specific market data
- Cox Automotive 2024 Car Buyer Journey Study — buyer behavior with pricing transparency signals
- Lazydays seasonal buying patterns — RV seasonal pricing data
- cardog.app CarGurus algorithm analysis — real-world failure modes of deal rating systems

### Tertiary (MEDIUM-LOW confidence)
- Bish's RV sales reports — supply dynamics and inventory conditions
- RVShare blog — seasonal buying timing recommendations
- RecNation / Progressive — seasonal pricing pattern corroboration

---
*Research completed: 2026-03-02*
*Ready for roadmap: yes*
