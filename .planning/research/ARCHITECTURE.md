# Architecture Research

**Domain:** Client-side market insights engine — VDP integration for RV marketplace SPA
**Researched:** 2026-03-02
**Confidence:** HIGH (based on direct codebase analysis, not speculation)

---

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│               VehicleDetailPage.tsx (orchestrator)               │
│  useCurrentListing() → listing: ListingData                      │
│  useMemo: generateMarketInsights(listing) → MarketInsightsData   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   app/src/data/marketInsights.ts  (pure engine, no React)        │
│   ───────────────────────────────────────────────────           │
│   Input:  ListingData + SRPListing[] (internal import)           │
│   Output: MarketInsightsData (typed, all 4 metrics)              │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│           TwoColumnLayout — left column (main content)           │
│  ...                                                             │
│  <PriceAnalysis />                                               │
│  <Divider />                                                     │
│  <MarketInsightsSection insights={marketInsights} />   ← NEW     │
│  │  ┌────────────────┐ ┌───────────────┐                        │
│  │  │ DaysOnMarket   │ │ SupplyDemand  │                        │
│  │  │ Card           │ │ Card          │                        │
│  │  │ useState(open) │ │ useState(open)│                        │
│  │  └────────────────┘ └───────────────┘                        │
│  │  ┌────────────────┐ ┌───────────────┐                        │
│  │  │ SeasonalTiming │ │ PriceDropAlert│                        │
│  │  │ Card           │ │ Card          │                        │
│  │  │ useState(open) │ │ useState(open)│                        │
│  │  └────────────────┘ └───────────────┘                        │
│  <Divider />                                                     │
│  <PaymentCalculator />                                           │
│  ...                                                             │
└──────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `generateMarketInsights()` | Pure computation — derives all 4 insight metrics from listing + comparables dataset | `app/src/data/marketInsights.ts` — mirrors `generateDealKit()` pattern exactly |
| `marketInsightsTypes.ts` | TypeScript types for `MarketInsightsData` and all 4 sub-types | `app/src/data/marketInsightsTypes.ts` — follows `dealKitTypes.ts` pattern |
| `MarketInsightsSection` | Container section — receives pre-computed `MarketInsightsData` prop, renders heading + 2x2 card grid | `components/sections/MarketInsights/MarketInsightsSection.tsx` |
| `DaysOnMarketCard` | Headline insight ("typically sells in N days") + expandable detail with comparables list | Sub-component within `MarketInsights/` section folder |
| `SupplyDemandCard` | Headline count + trend direction + regional context | Sub-component within `MarketInsights/` section folder |
| `SeasonalTimingCard` | Current-month price position on seasonal index + best-month callout | Sub-component within `MarketInsights/` section folder |
| `PriceDropAlertCard` | Drop amount, drop %, date; or "No drops" state if history is flat | Sub-component within `MarketInsights/` section folder |

---

## Recommended Project Structure

```
app/src/data/
├── marketInsightsTypes.ts         # TypeScript types (MarketInsightsData + sub-types)
└── marketInsights.ts              # Pure engine — all computation, no React

components/sections/
└── MarketInsights/
    ├── MarketInsightsSection.tsx        # Container section, receives MarketInsightsData prop
    ├── MarketInsightsSection.module.css
    ├── DaysOnMarketCard/
    │   ├── DaysOnMarketCard.tsx
    │   └── DaysOnMarketCard.module.css
    ├── SupplyDemandCard/
    │   ├── SupplyDemandCard.tsx
    │   └── SupplyDemandCard.module.css
    ├── SeasonalTimingCard/
    │   ├── SeasonalTimingCard.tsx
    │   └── SeasonalTimingCard.module.css
    └── PriceDropAlertCard/
        ├── PriceDropAlertCard.tsx
        └── PriceDropAlertCard.module.css
```

### Structure Rationale

- **`app/src/data/marketInsights.ts`:** Follows the existing pattern of `generateDealKit.ts`, `generateNarrations.ts`, `generateVideoWalkthrough.ts` — all pure functions that accept a `ListingData` and return a typed data object. Keeps computation separate from rendering, unit-testable without React.
- **`app/src/data/marketInsightsTypes.ts`:** Follows `dealKitTypes.ts` — types in their own file, imported by both the engine and the section components.
- **`components/sections/MarketInsights/`:** Every VDP section lives in `components/sections/`. Sub-components as named folders mirrors how `DealKit` organizes `DealKitCard/`, `DealKitNav/`, `DealKitOverlay/`.
- **No context provider:** Market insights are static, pre-computed data passed as a prop. No async, no overlay, no cross-component coordination — a provider would be over-engineering. Pass `MarketInsightsData` as a prop, same as `PriceAnalysis` receives `PriceAnalysisData`.

---

## Architectural Patterns

### Pattern 1: Generate-Then-Render (established codebase pattern)

**What:** A pure function in `app/src/data/` computes a typed data object from `ListingData`. `VehicleDetailPage` calls it via `useMemo`, passes the result as a prop to the section component.

**When to use:** Any time section content is derived from static listing data with no user interaction driving the computation. The section renders data; it does not compute data.

**Trade-offs:** Components stay dumb and testable. Engine is decoupled from React lifecycle. VehicleDetailPage accumulates one more `useMemo` call — acceptable at current scale.

**Example (follows existing `generateDealKit` integration exactly):**

```typescript
// VehicleDetailPage.tsx — add alongside existing useMemo calls
const marketInsights = useMemo(
  () => generateMarketInsights(listing),
  [listing]
);

// In JSX left column — follows existing PriceAnalysis prop pattern
<MarketInsightsSection insights={marketInsights} />
```

```typescript
// app/src/data/marketInsights.ts — pure function, no React imports
import type { ListingData } from './types';
import type { MarketInsightsData } from './marketInsightsTypes';
import { sampleSrpListings } from './sampleSrpListings';

export function generateMarketInsights(
  listing: ListingData,
): MarketInsightsData {
  const rvType = extractRvType(listing);
  const peers = sampleSrpListings.filter(l => l.rvType === rvType);

  return {
    daysOnMarket: computeDaysOnMarket(listing, peers),
    supplyDemand: computeSupplyDemand(listing, peers),
    seasonalTiming: computeSeasonalTiming(listing, peers),
    priceDropAlert: computePriceDropAlert(listing),
  };
}
```

The engine imports `sampleSrpListings` directly at module level so `VehicleDetailPage` does not need to pass the full comparables array as a second argument. Keeps the call site clean.

### Pattern 2: Inline Expand State Per Card (no shared overlay context)

**What:** Each insight card owns its own `isExpanded` boolean via `useState`. Tapping a card toggles its own in-place detail panel.

**When to use:** When disclosure panels are visually contained within the card (not a full-screen overlay). DealKit uses Context + Overlay because it takes over the viewport and needs cross-component coordination. Insight cards expand inline — simpler local state is correct here.

**Trade-offs:** Each card is independent. No coordination logic. Two cards can be expanded simultaneously — acceptable, arguably useful for comparison.

**Example:**

```typescript
// DaysOnMarketCard.tsx
export default function DaysOnMarketCard({ data }: { data: DaysOnMarketInsight }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.card}>
      <button
        className={styles.header}
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
      >
        <span className={styles.headline}>{data.headlineSentence}</span>
        <Icon name={expanded ? 'chevron_up' : 'chevron_down'} size={16} />
      </button>
      {expanded && (
        <div className={styles.detail}>
          <p className={styles.methodology}>{data.methodology}</p>
          <ul className={styles.comparables}>
            {data.comparables.map(c => (
              <li key={c.id}>{c.title} — {c.daysOnSite} days</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### Pattern 3: Deterministic Computation from Dataset Statistics

**What:** All metrics derived algorithmically from the real ~80 `SRPListing` dataset. No hardcoded display numbers. Computations read actual field values (`currentPrice`, `daysOnSite`, `rvType`, `location.state`) and derive statistical summaries.

**When to use:** Every insight metric — this is the entire v9.0 value proposition.

**Trade-offs:** Metrics vary by listing (they reflect actual dataset composition, which is correct behavior). With ~80 listings, statistical confidence is limited — the engine should express this in copy ("Based on 12 similar listings in your region") rather than hiding it.

**Key computations per metric:**

```
Days on Market:
  peers = srpListings.filter(rvType matches listing's RV type)
  avgDays = mean(peers.map(p => p.daysOnSite))
  comparables = peers.slice(0, 5) for detail panel
  → headline: "Travel trailers like this typically sell within [N] days"

Supply & Demand:
  state = extract state code from listing.location ("Sacramento, CA" → "CA")
  typeInState = srpListings.filter(rvType matches AND location.state matches)
  supplyCount = typeInState.length
  trendPct = deterministic mock from listing slug hash (stable, avoids hydration issues)
  → headline: "[N] similar [RV type] units in [State] right now"

Seasonal Timing:
  currentMonth = "March" (hardcoded to today's date: 2026-03-02, or derived from Date())
  SEASONAL_INDEX: Record<RVType, Record<Month, number>> — hardcoded coefficients
    (RV market knowledge: spring +8–12%, fall/winter −5–8% vs. spring for towables;
     motorhomes slightly flatter curve)
  priceDelta = coefficient for current month vs. peak-spring (May)
  bestMonth = month with lowest coefficient for this RV type
  → headline: "Prices for this type are typically [N]% lower in [month] vs. spring"

Price Drop Alert:
  drops = listing.priceAnalysis.priceHistory.filter(entry includes 'reduc' or 'drop')
  if drops.length > 0:
    listedPrice = priceHistory[0].price
    dropAmount = listedPrice - listing.currentPrice
    dropPct = (dropAmount / listedPrice) * 100
    dropDate = most recent 'Price reduced' entry date
    → headline: "This listing dropped $[N] ([N]%) on [date]"
  else:
    daysListed = listing.daysOnSite
    → headline: "No price drops — listed at [price] for [N] days"
```

---

## Data Flow

### Request Flow

```
Route /listing/:id
    ↓
VehicleDetailPage — useCurrentListing() hook
    ↓
listing = listingsBySlug[id] | sunseekerListing    (ListingData from scrapedListings.ts)
    ↓
useMemo: generateMarketInsights(listing)
  — engine imports sampleSrpListings internally for peer comparisons
    ↓ synchronous, <1ms for 80 listings
MarketInsightsData {
  daysOnMarket:   DaysOnMarketInsight
  supplyDemand:   SupplyDemandInsight
  seasonalTiming: SeasonalTimingInsight
  priceDropAlert: PriceDropAlertInsight
}
    ↓
<MarketInsightsSection insights={marketInsights} />
    ↓
props flow to 4 card components
    ↓
User taps a card header → local useState(isExpanded) toggles within that card
```

### State Management

No global state required. All market insights state is:

1. **Computed once** via `useMemo` in `VehicleDetailPage` (recomputes when `listing` changes on route navigation)
2. **Rendered as props** to `MarketInsightsSection`, which distributes typed sub-objects to each card
3. **Expand/collapse** as local `useState` within each card — four independent booleans, not coordinated

```
VehicleDetailPage
    ↓ insights: MarketInsightsData prop
MarketInsightsSection
    ↓ data: DaysOnMarketInsight   → DaysOnMarketCard   — useState(isExpanded)
    ↓ data: SupplyDemandInsight   → SupplyDemandCard   — useState(isExpanded)
    ↓ data: SeasonalTimingInsight → SeasonalTimingCard — useState(isExpanded)
    ↓ data: PriceDropAlertInsight → PriceDropAlertCard — useState(isExpanded)
```

### Key Data Flows

1. **Engine receives ListingData, peers are SRPListing.** These are different types (`ListingData` from `types.ts` vs. `SRPListing` from `srpTypes.ts`). Bridge them in the engine with a local helper:

```typescript
function extractRvType(listing: ListingData): RVType | null {
  const rvTypeSpec = listing.specs.find(s =>
    s.label.toLowerCase() === 'rv type'
  )?.value.toLowerCase();
  // Map "class c" → 'class-c', "travel trailer" → 'travel-trailer', etc.
  return RV_TYPE_MAP[rvTypeSpec ?? ''] ?? null;
}
```

2. **Price drop data lives in existing `priceHistory`.** The `PriceDropAlertInsight` does not require any new data fields. `listing.priceAnalysis.priceHistory` already has `{ date, change, price }` entries, and `listing.daysOnSite` provides the listing age. No changes to `ListingData` or `scrapedListings.ts`.

3. **Seasonal coefficients are static knowledge, not computed from dataset.** The ~80 SRP listings are a price snapshot, not a time series. Hardcode a `SEASONAL_INDEX` table in `marketInsights.ts` based on RV industry pricing patterns. The engine selects the right row by `rvType` and the right column by current month.

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| ~80 listings (current) | All computation synchronous in-memory — `useMemo` prevents recomputation on re-render. No optimization needed. |
| ~500 listings | Still fine client-side. Consider memoizing `peersByRvType` as a module-level precomputed map to avoid re-filtering on every listing visit. |
| ~5000+ listings | Pre-aggregate peers by RV type at module load time (group-by on import). Statistical operations remain fast. No Web Worker needed unless P99 latency exceeds 50ms. |

### Scaling Priorities

1. **First constraint:** Data shape mismatch between `ListingData` and `SRPListing` — bridge cleanly in the engine at authoring time with a stable `extractRvType()` helper. If the bridge is fragile, insights silently return null/undefined.
2. **Second constraint:** Seasonal coefficient table is hardcoded — if a real price-by-date corpus becomes available, replace with computed coefficients from `priceHistory` records. The type contracts stay the same; only the coefficient source changes.

---

## Anti-Patterns

### Anti-Pattern 1: Computation Inside Card Components

**What people do:** Write `const avgDays = peers.filter(...).reduce(...) / peers.length` inside `DaysOnMarketCard.tsx`.

**Why it's wrong:** Mixes computation with rendering. Every card render triggers a full dataset pass. Breaks the established codebase pattern (every other section receives pre-computed props). Makes the engine un-testable without rendering. Cards need to know about `allListings`, which is a wrong-direction dependency.

**Do this instead:** All computation in `app/src/data/marketInsights.ts`. Components receive typed data objects and only render. This is the pattern for `generateDealKit`, `generateNarrations`, and `generateVideoWalkthrough` — follow it exactly.

### Anti-Pattern 2: Creating a Context Provider for Market Insights

**What people do:** Create `MarketInsightsProvider` by analogy with `DealKitProvider` or `AiModeProvider`.

**Why it's wrong:** DealKit and AiMode use Context because they have async loading sequences, overlay state, and cross-component coordination (card triggers overlay, overlay has its own navigation). Market insights have none of this — they are static data that flows one direction (engine → section → cards). Context adds indirection for zero benefit.

**Do this instead:** Pass `MarketInsightsData` as a prop to `MarketInsightsSection`. It's a data prop, not a shared imperative API.

### Anti-Pattern 3: Adding Computed Fields to `ListingData`

**What people do:** Add `marketInsights: MarketInsightsData` to `types.ts` and pre-populate it in every listing in `scrapedListings.ts`.

**Why it's wrong:** Blurs source data vs. derived metrics. Requires hand-authoring analytics for every listing. Prevents the engine from being regenerated when the dataset changes. `ListingData` is already 40+ fields.

**Do this instead:** Keep `ListingData` as raw listing facts. Derive `MarketInsightsData` at render time via `generateMarketInsights()`. This is how every other derived section works in this codebase.

### Anti-Pattern 4: Attempting Statistical Seasonality from the Dataset

**What people do:** Try to compute seasonal pricing trends from `priceHistory` entries across the 80 listings, then discover the data doesn't span a full year.

**Why it's wrong:** The static dataset is a snapshot of one point in time. There is no temporal distribution to compute seasonal coefficients from. The result would be noise.

**Do this instead:** Hardcode a `SEASONAL_INDEX` by RV type and month in `marketInsights.ts`. Present it as market knowledge ("Based on historical RV market pricing patterns") — which is accurate. The methodology disclosure copy should be transparent that this is industry-pattern data, not dataset-derived.

---

## Integration Points

### VDP Insertion Point

Current VDP left-column sequence (relevant excerpt):

```
<PriceAnalysis ... />
<Divider />
<PaymentCalculator ... />
<Divider />
<LifestyleContext />
```

Recommended insertion after `PriceAnalysis`:

```tsx
<PriceAnalysis ... />
<Divider />
<div id="market-insights">
  <MarketInsightsSection insights={marketInsights} />
</div>
<Divider />
<PaymentCalculator ... />
```

Rationale: User has just seen price context (`PriceAnalysis`). Market insights extend that context ("here's what the broader market looks like for this type"). Then payment calculator follows naturally ("now let's figure out your payment"). The `id="market-insights"` anchor mirrors the existing `id="price"`, `id="payment"` pattern for future section nav.

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `marketInsights.ts` ↔ `sampleSrpListings.ts` | Module-level import of `sampleSrpListings` array | Engine uses `SRPListing[]` for peer comparisons; `ListingData` for the current listing |
| `marketInsights.ts` ↔ `VehicleDetailPage` | `generateMarketInsights(listing)` call inside `useMemo` | No second argument needed — engine imports peers internally |
| `VehicleDetailPage` ↔ `MarketInsightsSection` | `insights: MarketInsightsData` prop | Single typed prop |
| `MarketInsightsSection` ↔ individual cards | Each card receives its typed sub-object (e.g., `data: DaysOnMarketInsight`) | Cards are self-contained, no shared state |
| `marketInsights.ts` ↔ `types.ts` / `srpTypes.ts` | Import `ListingData`, `SRPListing`, `RVType` | Bridge via local `extractRvType()` helper |

### TypeScript Type Shape

```typescript
// app/src/data/marketInsightsTypes.ts

export interface DaysOnMarketInsight {
  avgDays: number;
  rvTypeLabel: string;        // "Travel trailers"
  headlineSentence: string;   // "Travel trailers like this typically sell within 32 days"
  methodology: string;        // for detail panel
  comparables: Array<{ id: string; title: string; daysOnSite: number; price: number }>;
  peerCount: number;
}

export interface SupplyDemandInsight {
  count: number;
  rvTypeLabel: string;
  stateCode: string;
  stateName: string;
  trendPct: number;           // positive = more inventory than "last month" (mock)
  trendDirection: 'up' | 'down' | 'flat';
  headlineSentence: string;
  methodology: string;
}

export interface SeasonalTimingInsight {
  currentMonth: string;       // "March"
  currentMonthIndex: number;  // 1–12
  priceDeltaPct: number;      // vs. peak-spring (negative = cheaper now)
  bestMonth: string;          // month with lowest prices for this type
  rvTypeLabel: string;
  headlineSentence: string;
  methodology: string;
  monthlyIndex: Array<{ month: string; relativePrice: number }>;  // for chart if desired
}

export interface PriceDropAlertInsight {
  hasDrop: boolean;
  dropAmount: number;         // 0 if no drop
  dropPct: number;            // 0 if no drop
  dropDate: string | null;    // null if no drop
  currentPrice: number;
  originalListPrice: number;
  daysListed: number;
  headlineSentence: string;
}

export interface MarketInsightsData {
  daysOnMarket: DaysOnMarketInsight;
  supplyDemand: SupplyDemandInsight;
  seasonalTiming: SeasonalTimingInsight;
  priceDropAlert: PriceDropAlertInsight;
}
```

---

## Suggested Build Order

Dependencies flow cleanly: types → engine → container section → individual cards → VDP wiring → expand detail panels.

**Phase 1 — Engine (pure TypeScript, no React):**
1. `app/src/data/marketInsightsTypes.ts` — defines all types above
2. `app/src/data/marketInsights.ts` — `generateMarketInsights()` with all four sub-functions

These can be authored and validated without touching any React component. The engine is the riskiest part (data bridging, edge cases) and should be solid before UI work begins.

**Phase 2 — Container Section:**
3. `MarketInsightsSection.tsx` — receives `MarketInsightsData`, renders section heading and card grid layout with placeholder card divs
4. Wire into `VehicleDetailPage.tsx` with `useMemo` call and JSX insertion between `PriceAnalysis` and `PaymentCalculator`

Validate end-to-end data flow before building individual cards. Ensures engine output shape matches what the section expects.

**Phase 3 — Cards, simplest to most complex:**
5. `PriceDropAlertCard` — simplest: reads `priceHistory` from existing data, no dataset aggregation needed
6. `DaysOnMarketCard` — average of `daysOnSite` across peers
7. `SupplyDemandCard` — count filtering by state + type, mock trend
8. `SeasonalTimingCard` — most complex due to coefficient table + monthly index visualization

**Phase 4 — Progressive Disclosure:**
9. Add `isExpanded` toggle and detail panel to each card (methodology text + comparables list)

Each card gets its expand state independently. Do not coordinate them — there is no need.

---

## Sources

- Direct codebase analysis: `/Users/adam/rv-marketplace/app/src/data/generateDealKit.ts` — established generate-then-render pattern (HIGH confidence)
- Direct codebase analysis: `/Users/adam/rv-marketplace/app/src/data/srpFilterEngine.ts` — client-side computation from SRPListing array (HIGH confidence)
- Direct codebase analysis: `/Users/adam/rv-marketplace/components/pages/VehicleDetailPage/VehicleDetailPage.tsx` — useMemo integration pattern (HIGH confidence)
- Direct codebase analysis: `/Users/adam/rv-marketplace/app/src/data/types.ts` + `srpTypes.ts` — data shapes for engine input/output design (HIGH confidence)
- Direct codebase analysis: `/Users/adam/rv-marketplace/app/src/data/scrapedListings.ts` — `priceHistory` structure, available `daysOnSite` field confirms no new data fields needed (HIGH confidence)
- Direct codebase analysis: `/Users/adam/rv-marketplace/components/sections/DealKit/DealKitContext.tsx` — establishes when Context is and isn't warranted; market insights lack async/overlay/coordination requirements (HIGH confidence)
- Direct codebase analysis: `/Users/adam/rv-marketplace/components/sections/PriceAnalysis/PriceAnalysis.tsx` — confirms prop-passing pattern for analytics sections without Context (HIGH confidence)

---
*Architecture research for: RV Marketplace v9.0 Market Insights — client-side engine and VDP integration*
*Researched: 2026-03-02*
