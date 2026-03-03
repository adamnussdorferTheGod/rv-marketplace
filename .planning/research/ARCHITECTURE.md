# Architecture Patterns

**Domain:** AI-powered SRP summary card + conversational research assistant for RV marketplace SPA
**Researched:** 2026-03-03
**Confidence:** HIGH (based on direct codebase analysis of existing patterns, component hierarchy, and data flow)

---

## Recommended Architecture

### System Overview

```
SearchResultsPage.tsx (orchestrator)
  |
  useSrpFilters() --> { filters, results, totalCount, sort, ... }
  |
  useMemo: generateSrpSummary(results, filters) --> SrpSummaryData
  |
  +-- <AiModeProvider>  (already wraps SRP -- reuse for assistant context)
  |     |
  |     +-- <SrpSummaryCard summary={summaryData} />
  |     |     |
  |     |     +-- <StatBar stats={summaryData.stats} confidence={...} />
  |     |     +-- <AiNarrative text={summaryData.narrative} confidence={...} />
  |     |     +-- <SummaryDetailPanel>  (expand/collapse)
  |     |     |     +-- <PriceDistributionChart data={...} />
  |     |     |     +-- <DealQualityBreakdown data={...} />
  |     |     |     +-- <TrendIndicators data={...} />
  |     |     +-- <AiAssistantInput onSend={...} chips={...} />
  |     |
  |     +-- <FilterSidebar ... />
  |     +-- <ListingGrid ... />
  |     +-- <AiAssistantPanel />  (replaces current AiModePanel on SRP)
  |           |
  |           +-- <AssistantHeader />
  |           +-- <ConversationThread />
  |           |     +-- <AssistantMessage type="text|comparison|listing|action" />
  |           +-- <ChatInput />
```

### Layout Integration on SRP

The current SRP layout is a two-column structure: 331px sidebar + flex-1 main column, wrapped in a 1762px max-width container. The AI summary card slots into the main column between the header row and the FeaturedListings carousel.

```
DESKTOP (>= 992px)
+-----------------------------------------------------------------------+
|                         Leaderboard Ad                                 |
+-----------------------------------------------------------------------+
| content (max-width: 1762px, padding 32px 64px)                        |
| +----------+--------------------------------------------------------+ |
| | Sidebar  | Main Column                                            | |
| | 331px    | +----------------------------------------------------+ | |
| |          | | Header: Title + Sort Controls                       | | |
| | Filters  | +----------------------------------------------------+ | |
| |          | | >>> SrpSummaryCard (NEW) <<<                        | | |
| |          | | StatBar | AI Narrative | Expand Detail Panel        | | |
| |          | | AiAssistantInput with prompt chips                  | | |
| |          | +----------------------------------------------------+ | |
| |          | | Featured Listings carousel                          | | |
| |          | +----------------------------------------------------+ | |
| |          | | Listing Grid (3-col, paginated)                     | | |
| | SellOnRV | |                                                    | | |
| |          | |                                                    | | |
| | Ad 300x  | +----------------------------------------------------+ | |
| | 600      | | Pagination                                         | | |
| +----------+--------------------------------------------------------+ |
+-----------------------------------------------------------------------+

WHEN ASSISTANT PANEL IS OPEN (desktop):
+-----------------------------------------------------------------------+
| content                                           | AiAssistantPanel  |
| +----------+------------------------------------+ | 420-520px fixed   |
| | Sidebar  | Main Column (compressed)           | | right panel       |
| | 331px    | Summary + Grid (reflowed)           | | z-index: 1000     |
| +----------+------------------------------------+ |                   |
+-----------------------------------------------------------------------+

TABLET (768-991px):
+-----------------------------------------------------------------------+
| Main Column (single column, no sidebar)                                |
| +------------------------------------------------------------------+  |
| | Mobile Filter Bar                                                 |  |
| +------------------------------------------------------------------+  |
| | SrpSummaryCard (collapsed to single-line stat strip)              |  |
| | Tap to expand --> 2x2 stat grid + narrative                       |  |
| +------------------------------------------------------------------+  |
| | Listing Grid (2-col)                                              |  |
+-----------------------------------------------------------------------+

MOBILE (<768px):
+-----------------------------------------------------------------------+
| Mobile Filter Bar                                                      |
| +------------------------------------------------------------------+  |
| | SrpSummaryCard (single-line: "82 listings | $45K median")         |  |
| | Tap to expand full card                                           |  |
| +------------------------------------------------------------------+  |
| | Listing Grid (1-col)                                              |  |
| +------------------------------------------------------------------+  |
| FAB button (bottom-right) --> AiAssistantPanel as bottom sheet       |
+-----------------------------------------------------------------------+
```

---

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `SearchResultsPage` | Orchestrator. Calls `generateSrpSummary()`, passes data down. Owns page-level state. | `useSrpFilters`, `SrpSummaryCard`, `AiAssistantPanel`, `ListingGrid` |
| `SrpSummaryCard` | Renders stat bar, AI narrative, and expandable detail panel. Passive display only. | Receives `SrpSummaryData` as props. Calls `openPanel()` from `useAiMode` when user clicks "Ask about these results" |
| `StatBar` | 4-stat horizontal strip: listing count, median price, price trend arrow, avg DOM. | Pure presentational. Receives `StatBarData` props |
| `AiNarrative` | Renders AI-generated summary paragraph with confidence badge. | Pure presentational. Receives `narrative: string` and `confidence: ConfidenceLevel` |
| `SummaryDetailPanel` | Expandable section with charts: price distribution histogram, deal quality pie/bar, trend line. | Receives `SrpSummaryData.details`. Pure presentational with internal `useState(expanded)` |
| `PriceDistributionChart` | SVG histogram of listing prices with current search median marked. | Receives `bins: PriceBin[]`. Pure presentational |
| `DealQualityBreakdown` | Visual breakdown of deal ratings (great/good/fair/high) in current results. | Receives `breakdown: DealBreakdown`. Pure presentational |
| `AiAssistantInput` | Chat input bar embedded in summary card. Prompt chip suggestions above input. | Calls `sendMessage()` / `openPanel()` from `useAiMode` context |
| `AiAssistantPanel` | Side panel (desktop) / bottom sheet (mobile) for full conversation. Reuses existing AiModePanel pattern. | Consumes `useAiMode` context. Contains `ConversationThread`, `ChatInput` |
| `AssistantMessage` | Polymorphic message bubble supporting text, comparison table, listing card embed, and action responses. | Receives `AssistantMessageData` with `type` discriminant |
| `ConfidenceBadge` | Small badge showing data confidence (Full/Medium/Low/Insufficient). | Receives `confidence: ConfidenceLevel`. Pure presentational |
| `generateSrpSummary` | Pure data function. Computes all summary stats from filtered listings. No React dependency. | Called by `SearchResultsPage` via `useMemo`. Consumes `SRPListing[]` + `FilterCriteria` |
| `generateSrpNarrative` | Pure function. Template-based narrative generation from summary stats. | Called by `generateSrpSummary`. No external dependencies |
| `mockSrpAssistantService` | Mock API service for assistant responses. Keyword-matching + template responses grounded in listing data. | Called by `SrpAiModeProvider` (or extended `AiModeProvider`). Receives conversation history + current search context |

---

### Data Flow

```
User changes filters/sort on SRP
       |
       v
useSrpFilters() recomputes
  filters: FilterCriteria
  results: SRPListing[]  (filtered + sorted)
  totalCount: number
       |
       v
SearchResultsPage.tsx
  const summaryData = useMemo(
    () => generateSrpSummary(results, filters),
    [results, filters]
  );
       |
       v
<SrpSummaryCard summary={summaryData} />
  - StatBar reads summaryData.stats
  - AiNarrative reads summaryData.narrative
  - SummaryDetailPanel reads summaryData.details
  - AiAssistantInput is connected to AiModeContext

User types question in AiAssistantInput
       |
       v
useAiMode().openPanel() + useAiMode().sendMessage(text)
       |
       v
AiModeProvider.sendMessage() handler
  - Passes { question, searchContext: { filters, results, summaryData } }
  - to mockSrpAssistantService (or Claude if API key available)
       |
       v
Mock service generates response grounded in actual listing data
  - Template-based for common questions
  - Keyword classification (price, type, comparison, etc.)
  - Returns structured response: { type, content, listings?, comparison? }
       |
       v
AiAssistantPanel renders AssistantMessage with appropriate type
```

---

## Patterns to Follow

### Pattern 1: Generate-Then-Render (Established Pattern)

**What:** Separate pure data computation from React rendering. A `generate*` function produces a typed data object; components receive it as props and render it.

**When:** Always, for any new data computation. This is the established codebase pattern.

**Why this matters here:** `generateSrpSummary` follows the exact same pattern as `generateDealKit`, `generateMarketInsights`, `generateNarrations`, and `generateVideoWalkthrough`. The codebase has 4+ examples of this pattern already.

**Example:**
```typescript
// app/src/data/srpSummaryEngine.ts  (pure data, no React)

import type { SRPListing, FilterCriteria } from './srpTypes';

export interface SrpSummaryStats {
  listingCount: number;
  medianPrice: number;
  priceChange: { direction: 'up' | 'down' | 'flat'; percent: number };
  avgDaysOnMarket: number;
}

export type ConfidenceLevel = 'full' | 'medium' | 'low' | 'insufficient';

export interface DealBreakdown {
  great: number;
  good: number;
  fair: number;
  high: number;
}

export interface PriceBin {
  rangeLabel: string;
  min: number;
  max: number;
  count: number;
}

export interface SrpSummaryData {
  stats: SrpSummaryStats;
  confidence: ConfidenceLevel;
  narrative: string;
  details: {
    priceDistribution: PriceBin[];
    dealBreakdown: DealBreakdown;
    topMakes: Array<{ make: string; count: number; avgPrice: number }>;
    rvTypeBreakdown: Array<{ type: string; count: number }>;
  };
  searchContext: {
    filters: FilterCriteria;
    searchTitle: string;
  };
}

export function generateSrpSummary(
  listings: SRPListing[],
  filters: FilterCriteria,
): SrpSummaryData {
  // Pure computation - no side effects, no React
  // ...
}
```

**In SearchResultsPage.tsx:**
```typescript
const summaryData = useMemo(
  () => generateSrpSummary(towFilteredResults, filters),
  [towFilteredResults, filters],
);
```

### Pattern 2: Context Provider for Chat State (Established Pattern)

**What:** React Context wrapping the page component provides chat state (messages, loading, prompts) to all child components. Already used by `AiModeProvider` on SRP.

**When:** For all AI assistant state management.

**Why reuse vs. new:** The SRP already wraps its content in `<AiModeProvider>`. The existing context has `sendMessage`, `openPanel`, `closePanel`, `messages`, `isLoading`, `suggestedPrompts`. Extend this rather than creating a parallel context.

**Extension approach:**
```typescript
// Extend AiModeProvider to accept search context
interface AiModeProviderProps {
  listing?: ListingData;       // existing (VDP)
  searchContext?: {             // new (SRP)
    filters: FilterCriteria;
    results: SRPListing[];
    summary: SrpSummaryData;
  };
  children: ReactNode;
}
```

The mock service (`mockAiService.ts` / new `mockSrpAssistantService.ts`) already uses keyword classification to route questions. Extend the same pattern with SRP-specific categories (market overview, price analysis, type comparison, recommendation).

### Pattern 3: Confidence-Gated Rendering

**What:** Components render different levels of detail based on data availability, rather than showing empty states or hiding entirely.

**When:** Summary card content varies by result count.

**Thresholds (from PROJECT.md):**
```typescript
function computeConfidence(listingCount: number): ConfidenceLevel {
  if (listingCount >= 50) return 'full';       // All stats + narrative + charts
  if (listingCount >= 10) return 'medium';     // Stats + simplified narrative
  if (listingCount >= 3)  return 'low';        // Basic stats only, no narrative
  return 'insufficient';                        // "Not enough data" message
}
```

**Rendering tiers:**
| Confidence | Stat Bar | Narrative | Detail Panel | Assistant |
|------------|----------|-----------|--------------|-----------|
| `full` (50+) | All 4 stats | Full paragraph | Charts + breakdown | Full prompts |
| `medium` (10-49) | All 4 stats | Shortened 1-2 sentences | Simplified | Reduced prompts |
| `low` (3-9) | Count + median only | "Limited data" disclaimer | Hidden | Basic only |
| `insufficient` (<3) | Count only | Hidden | Hidden | Generic prompts |

### Pattern 4: CSS Modules with Design Tokens (Established Pattern)

**What:** Every component gets a `.module.css` file using TIDE 2.0 design tokens via CSS custom properties.

**When:** Always. No inline styles, no Tailwind, no CSS-in-JS.

**Example file structure:**
```
components/sections/SrpSummary/
  SrpSummaryCard.tsx
  SrpSummaryCard.module.css
  StatBar/
    StatBar.tsx
    StatBar.module.css
  AiNarrative/
    AiNarrative.tsx
    AiNarrative.module.css
  SummaryDetailPanel/
    SummaryDetailPanel.tsx
    SummaryDetailPanel.module.css
    PriceDistributionChart.tsx
    PriceDistributionChart.module.css
    DealQualityBreakdown.tsx
    DealQualityBreakdown.module.css
  AiAssistantInput/
    AiAssistantInput.tsx
    AiAssistantInput.module.css
  ConfidenceBadge/
    ConfidenceBadge.tsx
    ConfidenceBadge.module.css
```

### Pattern 5: Responsive Collapse with Mobile-Specific Rendering

**What:** Summary card has three distinct layouts at the established breakpoints, using CSS media queries plus minimal conditional rendering in JSX.

**When:** For the summary card which has significantly different desktop/tablet/mobile experiences.

**Breakpoints (from tokens.css):**
- `>= 992px`: Full desktop card with horizontal stat bar, narrative paragraph, expand button
- `768px - 991px`: Collapsed card, tap to expand to 2x2 stat grid
- `< 768px`: Single-line strip with key stats, tap to expand

**Implementation approach:**
```css
/* SrpSummaryCard.module.css */

.card {
  background: var(--rv-surface-secondary);
  border: 1px solid var(--rv-border-low);
  border-radius: var(--radius-md);
  padding: var(--space-24);
  margin-bottom: var(--space-24);
}

/* Desktop: full horizontal layout */
.statBar {
  display: flex;
  gap: var(--space-24);
  align-items: center;
}

/* Tablet: 2x2 grid */
@media (max-width: 991px) {
  .statBar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
  }
  .narrative { display: none; }  /* Hidden until expanded */
  .detailPanel { display: none; }
}

/* Mobile: single line */
@media (max-width: 767px) {
  .card { padding: var(--space-12) var(--space-16); }
  .statBar {
    display: flex;
    gap: var(--space-8);
    overflow-x: auto;
    white-space: nowrap;
  }
}
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Separate Context for SRP Assistant

**What:** Creating a new `SrpAssistantProvider` separate from the existing `AiModeProvider`.

**Why bad:** The SRP already wraps content in `<AiModeProvider>`. A separate context would mean duplicating state management, message handling, loading states, and authentication gating. The existing `AiSearchCard` component already uses `useAiMode()` to send messages.

**Instead:** Extend `AiModeProvider` to accept an optional `searchContext` prop. Add a new `PanelMode` value (e.g., `'srp-summary'`) if needed to differentiate VDP vs SRP behavior in the mock service.

### Anti-Pattern 2: Real-Time Summary Computation on Every Keystroke

**What:** Recomputing the full summary on every filter change while the user is still typing in keyword or price range inputs.

**Why bad:** `generateSrpSummary` iterates all listings, computes medians, builds histograms. Running this on every keystroke of a price input creates unnecessary CPU churn.

**Instead:** The existing `useSrpFilters` already debounces URL updates. The summary computation via `useMemo` will naturally batch because React batches state updates. But for the narrative generation (template interpolation), ensure it only runs when the computed stats actually change, not on every filter identity change.

### Anti-Pattern 3: Fetching AI Responses Before Panel Opens

**What:** Pre-fetching assistant responses or generating narrative text before the user has interacted with the summary card.

**Why bad:** The summary card's stats and narrative are computed synchronously from listing data (no API call). Only the conversational assistant needs async mock-API-style responses. Pre-fetching wastes computation and complicates the initial render path.

**Instead:** Summary card renders synchronously from `generateSrpSummary()`. Assistant responses are generated only when the user sends a message.

### Anti-Pattern 4: Embedding Charts as Images or Canvas

**What:** Using `<canvas>` or image-based charts for the price distribution histogram.

**Why bad:** The codebase uses pure SVG/CSS for all visual elements (see PriceHistogramSlider in FilterSidebar, DonutChart in PaymentCalculator). Canvas breaks the CSS-modules-only constraint and adds a dependency.

**Instead:** Pure SVG histogram with CSS custom properties for colors. The existing `PriceHistogramSlider` in the filter sidebar already implements a histogram as pure SVG -- reuse the same bar-rendering approach.

### Anti-Pattern 5: Tightly Coupling Summary Data to Assistant Responses

**What:** Having the assistant mock service directly import and call `generateSrpSummary` internally.

**Why bad:** Creates circular dependencies and makes testing harder. The assistant should receive pre-computed context, not recompute it.

**Instead:** Pass the already-computed `SrpSummaryData` into the assistant service as context:
```typescript
// In AiModeProvider.sendMessage():
const response = await mockSrpAssistantService({
  question: content,
  context: searchContextRef.current,  // { filters, results, summary }
  history: messages,
});
```

---

## File Organization

### New Files to Create

```
app/src/data/
  srpSummaryTypes.ts           -- Type definitions for summary data
  srpSummaryEngine.ts          -- generateSrpSummary() pure function
  srpSummaryEngine.test.ts     -- Unit tests for engine
  srpNarrativeTemplates.ts     -- Template strings for AI narrative generation
  mockSrpAssistantService.ts   -- Mock API for assistant responses

components/sections/SrpSummary/
  SrpSummaryCard.tsx           -- Main summary card component
  SrpSummaryCard.module.css
  StatBar/
    StatBar.tsx
    StatBar.module.css
  AiNarrative/
    AiNarrative.tsx
    AiNarrative.module.css
  SummaryDetailPanel/
    SummaryDetailPanel.tsx
    SummaryDetailPanel.module.css
    PriceDistributionChart.tsx
    PriceDistributionChart.module.css
    DealQualityBreakdown.tsx
    DealQualityBreakdown.module.css
  AiAssistantInput/
    AiAssistantInput.tsx
    AiAssistantInput.module.css
  ConfidenceBadge/
    ConfidenceBadge.tsx
    ConfidenceBadge.module.css

components/sections/SrpAssistant/
  AssistantMessage/
    AssistantMessage.tsx
    AssistantMessage.module.css
    ComparisonTable.tsx
    ComparisonTable.module.css
    ListingEmbed.tsx
    ListingEmbed.module.css
```

### Files to Modify

```
components/pages/SearchResultsPage/SearchResultsPage.tsx
  -- Import SrpSummaryCard, add useMemo for generateSrpSummary
  -- Pass searchContext to AiModeProvider
  -- Insert SrpSummaryCard between headerRow and FeaturedListings

components/pages/SearchResultsPage/SearchResultsPage.module.css
  -- Add responsive styles for summary card placement

components/sections/AiMode/AiModeContext.tsx
  -- Add optional searchContext prop to AiModeProvider
  -- Extend sendMessage to pass search context to mock service

components/sections/AiMode/types.ts
  -- Add 'srp-assistant' to PanelMode union (optional)
  -- Add SearchContext interface

components/sections/AiMode/AiModePanel/AiModePanel.tsx
  -- Enhance to render AssistantMessage types (or create SRP-specific variant)
```

---

## Data Types Specification

```typescript
// app/src/data/srpSummaryTypes.ts

import type { FilterCriteria, SRPListing, RVType } from './srpTypes';

// ---- Confidence ----

export type ConfidenceLevel = 'full' | 'medium' | 'low' | 'insufficient';

// ---- Stat Bar ----

export interface SrpSummaryStats {
  listingCount: number;
  medianPrice: number;
  meanPrice: number;
  priceRange: { min: number; max: number };
  priceTrend: {
    direction: 'up' | 'down' | 'flat';
    percentChange: number;
  };
  avgDaysOnMarket: number;
}

// ---- Detail Panel ----

export interface PriceBin {
  rangeLabel: string;  // e.g. "$20K-$30K"
  min: number;
  max: number;
  count: number;
  percentage: number;
}

export interface DealBreakdown {
  great: number;
  good: number;
  fair: number;
  high: number;
  unrated: number;
}

export interface MakeBreakdown {
  make: string;
  count: number;
  avgPrice: number;
  medianPrice: number;
}

export interface RvTypeBreakdown {
  rvType: RVType;
  label: string;
  count: number;
  avgPrice: number;
}

// ---- Summary (top-level) ----

export interface SrpSummaryData {
  stats: SrpSummaryStats;
  confidence: ConfidenceLevel;
  narrative: string;
  details: {
    priceDistribution: PriceBin[];
    dealBreakdown: DealBreakdown;
    topMakes: MakeBreakdown[];
    rvTypeBreakdown: RvTypeBreakdown[];
    conditionSplit: { new: number; used: number };
  };
  searchContext: {
    filters: FilterCriteria;
    searchTitle: string;
    timestamp: number;
  };
}

// ---- Assistant Message Types ----

export type AssistantMessageType = 'text' | 'comparison' | 'listing' | 'action';

export interface AssistantTextMessage {
  type: 'text';
  content: string;
  citations?: string[];
}

export interface ComparisonRow {
  label: string;
  values: string[];
}

export interface AssistantComparisonMessage {
  type: 'comparison';
  title: string;
  headers: string[];
  rows: ComparisonRow[];
  summary: string;
}

export interface AssistantListingMessage {
  type: 'listing';
  content: string;
  listings: SRPListing[];
  reason: string;
}

export interface AssistantActionMessage {
  type: 'action';
  content: string;
  actions: Array<{
    label: string;
    filterChange?: Partial<FilterCriteria>;
    url?: string;
  }>;
}

export type AssistantMessageData =
  | AssistantTextMessage
  | AssistantComparisonMessage
  | AssistantListingMessage
  | AssistantActionMessage;

// ---- Search Context for Assistant ----

export interface SrpSearchContext {
  filters: FilterCriteria;
  results: SRPListing[];
  summary: SrpSummaryData;
}
```

---

## Mock API Service Layer

The assistant mock service follows the established pattern from `components/sections/AiMode/mockAiService.ts` -- keyword-based classification with template-based responses grounded in actual listing data.

```typescript
// app/src/data/mockSrpAssistantService.ts

interface AssistantRequest {
  question: string;
  context: SrpSearchContext;
  history: ConversationMessage[];
}

interface AssistantResponse {
  message: AssistantMessageData;
  suggestedFollowups: string[];
}

// Categories specific to SRP context
type SrpCategory =
  | 'market-overview'    // "How's the market?"
  | 'price-analysis'     // "Are these good deals?"
  | 'type-comparison'    // "Class A vs Class C?"
  | 'recommendation'     // "What should I look at?"
  | 'specific-listing'   // "Tell me about the Winnebago"
  | 'filter-help'        // "Show me under $50K"
  | 'general';           // Fallback

export async function generateSrpAssistantResponse(
  request: AssistantRequest,
): Promise<AssistantResponse> {
  // 1. Classify question by keywords
  // 2. Extract relevant data from context
  // 3. Fill response template
  // 4. Return typed AssistantMessageData
  // 5. Add simulated 500-1500ms delay
}
```

### Guardrails (from PROJECT.md)

The mock service must enforce:
- **No purchase recommendations:** "Based on the data, here's what stands out" not "You should buy this"
- **No price predictions:** "Current median is $X" not "Prices will drop next month"
- **Grounded claims only:** Every stat references actual listing data, with counts
- **Confidence disclaimers:** "Based on N listings in your search" prefixed to data-driven responses

---

## Integration Points with Existing SRP

### 1. Insertion Point in SearchResultsPage.tsx

The summary card inserts between the header row and the FeaturedListings carousel. This is the natural "above-the-fold" position for aggregated search insights.

```typescript
// In SearchResultsPage render(), after headerRow, before FeaturedListings:

{/* AI Summary Card -- only show when we have results */}
{summaryData.confidence !== 'insufficient' && (
  <SrpSummaryCard summary={summaryData} />
)}

<FeaturedListings maxItems={5} titleClassName={styles.featuredTitle} />
```

### 2. AiModeProvider Extension

The SRP already wraps its content in `<AiModeProvider>`. Pass search context:

```typescript
<AiModeProvider searchContext={{ filters, results: towFilteredResults, summary: summaryData }}>
  {/* ... existing SRP content ... */}
</AiModeProvider>
```

### 3. Existing AiSearchCard Replacement

The existing `AiSearchCard` component (in `SearchResultsPage/AiSearchCard/`) appears to be defined but not rendered in the current SRP. The new `AiAssistantInput` embedded in the `SrpSummaryCard` replaces this functionality with search-context-aware prompt chips.

### 4. AiModePanel Reuse

The existing `<AiModePanel />` at the bottom of `SearchResultsPage` renders a slide-in panel. For SRP, enhance it to:
- Show search context in the header ("82 Travel Trailers | $30K-$80K")
- Render `AssistantMessage` components with polymorphic types
- Generate SRP-specific follow-up prompts

---

## Suggested Build Order

Build order follows dependency chains. Each phase produces independently testable, shippable increments.

### Phase 1: Data Layer + Types (Foundation)

**Build:** `srpSummaryTypes.ts`, `srpSummaryEngine.ts`, `srpSummaryEngine.test.ts`, `srpNarrativeTemplates.ts`

**Rationale:** Pure TypeScript, no React. Testable independently. Everything downstream depends on the data shape. Following the generate-then-render pattern means getting the data right first.

**Depends on:** Existing `srpTypes.ts`, `srpFilterEngine.ts` (both exist)

### Phase 2: Summary Card (Core UI)

**Build:** `SrpSummaryCard`, `StatBar`, `AiNarrative`, `ConfidenceBadge`

**Rationale:** The visible face of the feature. Once the data layer exists, the card renders it. Start with desktop layout, add responsive breakpoints after core rendering works.

**Depends on:** Phase 1 (data types and engine)

### Phase 3: Detail Panel + Charts

**Build:** `SummaryDetailPanel`, `PriceDistributionChart`, `DealQualityBreakdown`

**Rationale:** Secondary content behind an expand interaction. Lower priority than the stat bar + narrative. Can ship summary card without the detail panel initially.

**Depends on:** Phase 2 (card structure exists to expand into)

### Phase 4: Assistant Input + Mock Service

**Build:** `AiAssistantInput`, `mockSrpAssistantService.ts`, extend `AiModeProvider` with search context

**Rationale:** The interactive entry point. Needs the mock service to generate responses. Extends the existing AiMode infrastructure.

**Depends on:** Phase 1 (data types for context), existing `AiModeContext`

### Phase 5: Assistant Panel + Message Types

**Build:** `AssistantMessage` (text, comparison, listing, action variants), enhance `AiModePanel` for SRP

**Rationale:** The full conversational experience. Builds on the input and mock service from Phase 4. Most complex UI work.

**Depends on:** Phase 4 (input + service exist)

### Phase 6: Responsive + Polish

**Build:** Responsive breakpoints for all new components, mobile bottom sheet refinements, animation polish, confidence state testing across all breakpoints

**Rationale:** Refinement pass after all components work at desktop width. Follow the desktop-first pattern established by the rest of the codebase.

**Depends on:** Phases 2-5 (all components exist)

---

## Scalability Considerations

| Concern | Current (~80 listings) | At 500 listings | At 5,000 listings |
|---------|------------------------|-----------------|-------------------|
| Summary computation | <1ms, `useMemo` is fine | ~5ms, still fine | Consider web worker or throttle |
| Histogram binning | Trivial | ~2ms | Profile, possibly pre-bin in engine |
| Narrative generation | Template interpolation, instant | Same | Same |
| Assistant response | Mock delay 500-1500ms | Same (mocked) | Same (mocked) |
| Re-render on filter change | Full card re-render | Same | Memoize child components |

The 500ms render budget (from PROJECT.md constraints) is easily met. `generateSrpSummary` doing median/mean/histogram computation over 80 listings is sub-millisecond. Even at 5,000 listings this stays well under budget.

---

## Sources

- Direct codebase analysis of `/Users/adam/rv-marketplace/` (HIGH confidence)
- Existing patterns from `generateDealKit.ts`, `generateMarketInsights.ts`, `AiModeContext.tsx` (HIGH confidence)
- Current SRP layout from `SearchResultsPage.tsx` and `SearchResultsPage.module.css` (HIGH confidence)
- Breakpoints from `tokens.css` and existing responsive patterns (HIGH confidence)
- PROJECT.md specifications for v10.0 feature requirements (HIGH confidence)
