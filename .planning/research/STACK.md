# Stack Research

**Domain:** Client-side algorithmic market insights for RV marketplace VDP
**Researched:** 2026-03-02
**Confidence:** HIGH

---

## Context

This is a **subsequent milestone** (v9.0) on an existing production SPA. The stack is already decided and validated. The question is: what computation patterns and data structures does the v9.0 feature set require, and do any new dependencies actually help?

**Short answer: no new dependencies.** All four insight cards — deal quality scoring, days-on-market, supply/demand, and price drop alerts — are pure algorithmic computations over the existing ~80-listing dataset. The established `app/src/data/` module pattern handles this cleanly.

---

## Existing Stack (Validated, Unchanged)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI + state |
| TypeScript | 5.9.3 | Type safety |
| Vite | 7.3.1 | Build + dev server |
| CSS Modules | native | Scoped component styling |
| React Router DOM | 7.13.1 | Client-side routing |
| Motion (Framer Motion) | 12.34.3 | Animation (already installed) |
| Vitest | 4.0.18 | Unit testing (already configured) |

**Confidence: HIGH** — All running in production at https://rv-marketplace.vercel.app

---

## Recommended Stack Additions

**None.** Zero new dependencies for v9.0.

The entire market insights feature set is achievable with existing tooling. Adding a library would introduce bundle overhead, version management, and learning cost without solving a real gap.

---

## How Each Feature Maps to Existing Capabilities

### 1. Computation Engine: Pure TypeScript Functions

**Pattern source:** `app/src/data/financingCalculations.ts`, `app/src/data/stateTaxCalculations.ts`, `app/src/data/tradeInEstimator.ts`

All existing calculation modules follow the same shape: pure TypeScript functions that take inputs and return typed result objects. No classes, no side effects, no async. This is the correct pattern for v9.0.

```typescript
// New file: app/src/data/marketInsights.ts
// Mirrors the established calculation module pattern exactly.

export interface DealScoreResult {
  score: 'great' | 'good' | 'fair' | 'high';
  percentBelowMarket: number;     // e.g. 12 means 12% below avg
  marketAvgPrice: number;
  comparableCount: number;
}

export interface DaysOnMarketResult {
  avgDaysForType: number;         // median DOM for this RV type
  listingDays: number;            // this listing's daysOnSite
  pctFasterThanAvg: number | null; // null if slower
  comparableCount: number;
}

export interface SupplyDemandResult {
  similarCount: number;           // listings matching same type + region
  monthOverMonthChange: number;   // synthesized from dataset spread
  demandLevel: 'high' | 'moderate' | 'low';
}

export interface SeasonalInsightResult {
  currentMonth: number;
  recommendedMonth: number;       // month with lowest typical price
  estimatedSavingsPct: number;    // e.g. 8 means ~8% cheaper in Oct
  priceIndex: number[];           // 12-element array, 100 = baseline
}

export interface PriceDropResult {
  hasDrop: boolean;
  dropAmount: number | null;      // absolute $ drop
  dropPercent: number | null;     // % drop
  dropDate: string | null;        // e.g. "March 1st"
  originalPrice: number | null;
}
```

**Why pure functions:** They are trivially testable with Vitest (already configured). They are cacheable with `useMemo`. They can be called server-side if SSR is ever added. They compose without side effects.

**Confidence: HIGH** — Direct mirror of established `financingCalculations.ts` pattern in the same codebase.

---

### 2. Caching: useMemo

**Pattern source:** `components/sections/TotalCostCalculator/TotalCostCalculator.tsx` line 53 — `const computed = useMemo(() => { ... }, [selectedState, ...])`

Market insights computations run once per VDP page load against the full ~80-listing dataset. They are deterministic given a listing ID and the dataset. `useMemo` with `[listing.id, allListings]` as dependencies is the correct cache boundary — zero recomputation unless the listing changes (navigation) or the dataset changes (never, it is static).

```typescript
// In VehicleDetailPage or a dedicated hook:
const marketInsights = useMemo(() => computeMarketInsights(listing, srpListings), [listing.id]);
```

**Performance bound:** The dataset is ~80 listings. Even naive O(n) passes across all listings finish in <1ms. The PROJECT.md 500ms render budget is trivially met. No memoization library (reselect, jotai, zustand) needed.

**Confidence: HIGH** — `useMemo` is React 19 core, pattern is established in codebase.

---

### 3. Progressive Disclosure: useState + CSS Modules

**Pattern source:** `TotalCostCalculator.tsx` uses `const [breakdownOpen, setBreakdownOpen] = useState(false)` for its expandable breakdown panel.

Each insight card shows a headline metric, and tapping expands to show methodology and comparable listings. This is `useState(false)` + conditional rendering — identical to the TotalCostCalculator breakdown pattern. No accordion library needed.

```typescript
// Each card component:
const [isExpanded, setIsExpanded] = useState(false);
```

**Confidence: HIGH** — Direct mirror of existing TotalCostCalculator expand pattern.

---

### 4. Animation: Motion (Framer Motion v12) — Already Installed

**Already in `app/package.json`:** `"motion": "^12.34.3"`

The expand/collapse animation for insight cards can use `motion/react` — the same package already imported elsewhere in the project. No additional install.

```typescript
import { motion, AnimatePresence } from 'motion/react';

// Card expand animation:
<AnimatePresence>
  {isExpanded && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    />
  )}
</AnimatePresence>
```

**Why not CSS transitions alone:** `height: auto` transitions are not animatable with pure CSS (requires known px values or JS measurement). `motion/react` `AnimatePresence` handles `height: auto` correctly. Since it is already installed, use it.

**Confidence: HIGH** — Verified `motion@12.34.3` is in package.json. `AnimatePresence` with `height: auto` is documented in Framer Motion v12 official docs.

---

### 5. Data Source: Existing SRPListing Dataset

**Pattern source:** `app/src/data/sampleSrpListings.ts` + `app/src/data/scrapedListings.ts` + `app/src/data/srpTypes.ts`

The `SRPListing` type already has every field needed to compute all four insight cards:

| Insight | Required Fields | Available In |
|---------|----------------|--------------|
| Deal quality / price score | `currentPrice`, `originalPrice`, `rvType`, `year`, `condition` | `SRPListing` |
| Days on market avg | `daysOnSite`, `rvType`, `condition` | `SRPListing` |
| Supply/demand | `rvType`, `location.state`, dataset count | `SRPListing` |
| Seasonal pricing | `rvType`, `currentPrice`, `year` + static seasonal multipliers | `SRPListing` + static table |
| Price drop alert | `currentPrice`, `originalPrice` | `SRPListing` (and `ListingData.priceAnalysis.priceHistory`) |

The VDP listing (`ListingData` from `types.ts`) also has `priceAnalysis.priceHistory: PriceHistoryEntry[]` which provides the actual price history array — use this for the Price Drop Alert card since it is richer than `originalPrice` alone.

**Important:** The computation engine takes the full SRP dataset as input to derive market stats, but only requires the target `ListingData` and `SRPListing[]` as parameters. No new data sources needed.

**Confidence: HIGH** — Fields verified directly in `app/src/data/srpTypes.ts` and `app/src/data/types.ts`.

---

### 6. Testing: Vitest — Already Configured

**Already in `app/package.json`:** `"vitest": "^4.0.18"`

The existing `app/src/data/stateTaxCalculations.test.ts` demonstrates the test pattern. Market insight computation functions are pure TS and should have unit tests alongside the module.

```
app/src/data/marketInsights.ts       # computation engine
app/src/data/marketInsights.test.ts  # vitest unit tests
```

**Confidence: HIGH** — Verified `vitest@4.0.18` in package.json and `stateTaxCalculations.test.ts` test pattern in codebase.

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `d3` / `d3-array` | Statistical utilities (mean, median, quantile) are 3-line TypeScript. Adding D3 for computation without its charting brings ~200KB for no benefit. | Raw `Array.prototype` + simple pure functions |
| `lodash` / `lodash-es` | Utility functions like `groupBy`, `meanBy` are simple TypeScript one-liners. Adding lodash for a handful of array operations violates the "no new dependencies" constraint and adds bundle weight. | Native `Array.prototype.reduce`, `filter`, `map` |
| `recharts` / `chart.js` / `victory` | Charting libraries for the seasonal price trend visualization. CSS + inline SVG path is sufficient for a simple 12-month trend line. PROJECT.md explicitly bans new UI libraries. | Hand-coded inline SVG (12 data points, a simple polyline) or CSS bar chart |
| `date-fns` / `dayjs` | Month/season calculations for seasonal insights are 5-10 lines of arithmetic using `new Date()`. No date library needed. | `new Date().getMonth()` + static monthly multiplier table |
| `jotai` / `zustand` / `recoil` | State management for computed insights. All state is local to the VDP page and derived from static data. `useMemo` handles caching cleanly. | `useState` + `useMemo` (established pattern) |
| `react-spring` | Animation for card expand. `motion/react` is already installed and superior. | `motion/react` `AnimatePresence` |
| Any external pricing API (Carfax, iPacket, Black Book, ALG) | Out of scope per PROJECT.md. All data must be client-side static. | Algorithmic derivation from existing ~80 listing dataset |

---

## Computation Architecture: The `marketInsights.ts` Module

This is the single new file the v9.0 stack requires.

### Similarity Grouping Strategy

To derive market statistics, listings must be grouped by "similar to this one." The grouping criteria, in priority order:

```typescript
// Strict similarity: same rvType, same condition, year within ±3
// Loose similarity: same rvType, any condition, year within ±5
// Fallback: same rvType only

function findComparables(
  target: SRPListing,
  all: SRPListing[],
  maxResults = 15,
): SRPListing[] {
  // Strict match first
  let matches = all.filter(l =>
    l.id !== target.id &&
    l.rvType === target.rvType &&
    l.condition === target.condition &&
    Math.abs(l.year - target.year) <= 3
  );
  if (matches.length >= 3) return matches.slice(0, maxResults);

  // Loosen to all conditions
  matches = all.filter(l =>
    l.id !== target.id &&
    l.rvType === target.rvType &&
    Math.abs(l.year - target.year) <= 5
  );
  if (matches.length >= 3) return matches.slice(0, maxResults);

  // Fallback: type only
  return all.filter(l => l.id !== target.id && l.rvType === target.rvType).slice(0, maxResults);
}
```

### Deal Score Derivation

Median price of comparables is the market reference (median is more robust than mean against outliers in a small dataset):

```typescript
function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function computeDealScore(listing: SRPListing, comparables: SRPListing[]): DealScoreResult {
  const prices = comparables.map(c => c.currentPrice);
  const marketMedian = median(prices);
  const pctVsMarket = ((listing.currentPrice - marketMedian) / marketMedian) * 100;

  const score =
    pctVsMarket <= -10 ? 'great' :
    pctVsMarket <= -3  ? 'good'  :
    pctVsMarket <= 5   ? 'fair'  : 'high';

  return {
    score,
    percentBelowMarket: Math.round(-pctVsMarket),
    marketAvgPrice: Math.round(marketMedian),
    comparableCount: comparables.length,
  };
}
```

**Why median not mean:** A small dataset (~5-15 comparables) with outlier prices (e.g., a $320K Tiffin among $80K Class As) would skew the mean dramatically. Median is the industry-standard for AVM (Automated Valuation Model) pricing against small datasets.

**Why this threshold vs. the existing `dealRating` field:** `SRPListing.dealRating` is pre-computed sample data. The market insights engine re-derives this algorithmically from comparables to show the methodology, not just the badge.

### Days on Market

```typescript
function computeDaysOnMarket(listing: SRPListing, comparables: SRPListing[]): DaysOnMarketResult {
  const domValues = comparables.map(c => c.daysOnSite);
  const avgDom = Math.round(median(domValues));
  const pctFaster = listing.daysOnSite < avgDom
    ? Math.round(((avgDom - listing.daysOnSite) / avgDom) * 100)
    : null;
  return {
    avgDaysForType: avgDom,
    listingDays: listing.daysOnSite,
    pctFasterThanAvg: pctFaster,
    comparableCount: comparables.length,
  };
}
```

### Supply/Demand

```typescript
// Group by rvType + state for supply count
function computeSupplyDemand(listing: SRPListing, all: SRPListing[]): SupplyDemandResult {
  const similar = all.filter(l =>
    l.rvType === listing.rvType &&
    l.location.state === listing.location.state
  );
  // Synthesize month-over-month by comparing new (<14 days) vs older (>45 days) listings
  const newListings = similar.filter(l => l.daysOnSite < 14).length;
  const oldListings = similar.filter(l => l.daysOnSite > 45).length;
  const supplyPressure = oldListings > newListings ? 'high' : oldListings === 0 ? 'low' : 'moderate';
  const syntheticMoM = Math.round(((newListings - oldListings) / Math.max(oldListings, 1)) * 100);

  return {
    similarCount: similar.length,
    monthOverMonthChange: syntheticMoM,
    demandLevel: supplyPressure,
  };
}
```

### Seasonal Insights

Seasonal pricing does not come from the listing dataset — it comes from a static table derived from known RV market seasonality (spring demand spike, fall/winter discounts). This is a hardcoded multiplier table, not computed from 80 listings.

```typescript
// Static seasonal index table per RV type (100 = baseline)
// Source: RV market seasonality knowledge (spring = peak demand, fall = discount season)
const SEASONAL_INDEX: Record<RVType, number[]> = {
  'travel-trailer': [90, 92, 100, 108, 112, 110, 108, 106, 100, 94, 88, 87],
  'class-a':        [92, 93, 99, 105, 108, 107, 106, 105, 100, 95, 90, 89],
  'class-b':        [93, 94, 100, 105, 107, 106, 105, 104, 100, 96, 91, 90],
  'class-c':        [91, 92, 100, 107, 111, 109, 108, 106, 100, 94, 89, 88],
  'fifth-wheel':    [89, 91, 99, 107, 112, 110, 109, 107, 100, 93, 87, 86],
  // ... etc
};
```

**Why hardcoded vs. derived:** 80 listings do not have listing date timestamps (only `daysOnSite` integers). You cannot reconstruct month-of-listing from `daysOnSite` alone. Seasonal data requires historical time-series that the dataset does not provide. A static table based on RV industry seasonality patterns is honest and sufficient for this demo feature.

**Confidence: MEDIUM** — The seasonal index values are based on known RV market patterns (peak spring demand, off-season discounts) but are not sourced from a specific public dataset. Flag as "based on typical RV market seasonality" in the UI copy.

### Price Drop Alert

Use `ListingData.priceAnalysis.priceHistory` (the VDP listing type) rather than `SRPListing.originalPrice`, because `priceHistory` is an array that can surface when the drop occurred.

```typescript
function computePriceDrop(listing: ListingData): PriceDropResult {
  const history = listing.priceAnalysis?.priceHistory;
  if (!history || history.length < 2) {
    // Fallback: use originalPrice
    if (listing.originalPrice && listing.originalPrice > listing.currentPrice) {
      const drop = listing.originalPrice - listing.currentPrice;
      return {
        hasDrop: true,
        dropAmount: drop,
        dropPercent: Math.round((drop / listing.originalPrice) * 100),
        dropDate: null,
        originalPrice: listing.originalPrice,
      };
    }
    return { hasDrop: false, dropAmount: null, dropPercent: null, dropDate: null, originalPrice: null };
  }

  // Find most recent price reduction entry
  const reduction = [...history].reverse().find(e => e.change === 'Price reduced');
  if (!reduction) return { hasDrop: false, dropAmount: null, dropPercent: null, dropDate: null, originalPrice: null };

  const listed = history.find(e => e.change === 'Listed');
  const originalPrice = listed?.price ?? history[0].price;
  const drop = originalPrice - listing.currentPrice;

  return {
    hasDrop: drop > 0,
    dropAmount: drop > 0 ? drop : null,
    dropPercent: drop > 0 ? Math.round((drop / originalPrice) * 100) : null,
    dropDate: reduction.date,
    originalPrice,
  };
}
```

---

## File Structure

All new v9.0 files follow established codebase conventions:

```
app/src/data/
  marketInsights.ts           # Computation engine (pure TS functions)
  marketInsights.test.ts      # Vitest unit tests

components/sections/
  MarketInsights/
    MarketInsights.tsx          # Container: calls computation, renders 4 cards
    MarketInsights.module.css
    DealScoreCard/
      DealScoreCard.tsx
      DealScoreCard.module.css
    DaysOnMarketCard/
      DaysOnMarketCard.tsx
      DaysOnMarketCard.module.css
    SupplyDemandCard/
      SupplyDemandCard.tsx
      SupplyDemandCard.module.css
    SeasonalInsightCard/
      SeasonalInsightCard.tsx
      SeasonalInsightCard.module.css
    PriceDropAlert/
      PriceDropAlert.tsx
      PriceDropAlert.module.css
```

This mirrors how `TotalCostCalculator/` is structured: a parent container that owns computation + state, plus focused sub-components for each visual unit.

---

## Installation

```bash
# No new dependencies required.
# Zero changes to app/package.json.
```

---

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| Native Array methods (filter, sort, reduce) | lodash/lodash-es | Lodash adds bundle weight for operations that are 1-3 lines of TypeScript. PROJECT.md prohibits new dependencies. |
| Inline SVG polyline for seasonal chart | recharts / chart.js | Charting libraries are 50-200KB for what is a 12-point trend line. CSS bar chart or inline SVG handles this at zero cost. PROJECT.md prohibits new UI libraries. |
| Static seasonal multiplier table | Derived from listing dataset | 80 listings lack listing date timestamps needed to reconstruct seasonal time-series. Static table is honest and appropriate for demo data. |
| `useMemo` for computation caching | React Query / SWR | React Query/SWR are for async server data. This is synchronous static computation. `useMemo` is the correct tool. |
| Motion (already installed) for card animation | react-spring | Motion is already installed. Using react-spring would add a dependency for zero benefit. |
| `median()` for market price reference | `mean()` | Small dataset (~5-15 comparables). Mean is distorted by outlier prices (e.g., $385K Tiffin Allegro in a Class A dataset). Median is more robust for AVM pricing. |

---

## Version Compatibility

All v9.0 work uses only existing installed versions. No compatibility concerns.

| Package | Current Version | v9.0 Usage | Status |
|---------|----------------|------------|--------|
| react | 19.2.0 | `useState`, `useMemo` | Stable |
| typescript | 5.9.3 | Types, interfaces, pure functions | Stable |
| motion | 12.34.3 | `AnimatePresence` for card expand | Stable |
| vitest | 4.0.18 | Unit tests for marketInsights.ts | Stable |

---

## Sources

- `/Users/adam/rv-marketplace/app/package.json` — Verified all installed dependencies (React 19.2.0, TypeScript 5.9.3, motion 12.34.3, vitest 4.0.18)
- `/Users/adam/rv-marketplace/app/src/data/types.ts` — Verified `ListingData`, `PriceHistoryEntry` field availability
- `/Users/adam/rv-marketplace/app/src/data/srpTypes.ts` — Verified `SRPListing` fields: `daysOnSite`, `currentPrice`, `originalPrice`, `dealRating`, `rvType`, `year`, `condition`, `location`
- `/Users/adam/rv-marketplace/app/src/data/financingCalculations.ts` — Established pure function computation module pattern
- `/Users/adam/rv-marketplace/app/src/data/stateTaxCalculations.ts` — Verified test file pattern (`stateTaxCalculations.test.ts`)
- `/Users/adam/rv-marketplace/app/src/data/tradeInEstimator.ts` — Verified multiplier table pattern for static data
- `/Users/adam/rv-marketplace/components/sections/TotalCostCalculator/TotalCostCalculator.tsx` — Verified `useMemo` caching pattern and expand/collapse `useState` pattern
- `/Users/adam/rv-marketplace/.planning/PROJECT.md` — Confirmed "no new dependencies" constraint, 500ms render budget, VDP-only scope

---

*Stack research for: RV Marketplace v9.0 Market Insights*
*Researched: 2026-03-02*
