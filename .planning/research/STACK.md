# Technology Stack: AI-Powered SRP Summary + Research Assistant

**Project:** RV Marketplace v10.0
**Researched:** 2026-03-03
**Scope:** Stack additions for AI summary card, conversational assistant, charts, mock API layer
**Confidence:** HIGH

---

## Context

This is a **subsequent milestone** (v10.0) on an existing production SPA. The stack is validated. The question is: what do we need for AI narrative generation, chart visualization, chat UI, mock API services, and streaming response simulation?

**Short answer: zero new npm dependencies.** Every capability maps to existing patterns in the codebase. The project already has custom SVG charts, a full chat UI, mock AI services, animation, and testing. The v10.0 features are compositions of these existing capabilities applied to the SRP context.

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

**Confidence: HIGH** -- All running in production at https://rv-marketplace.vercel.app

---

## Recommended Stack Additions

**None.** Zero new dependencies for v10.0.

The following sections explain how each v10.0 capability maps to existing tooling and established codebase patterns, and why the alternatives were rejected.

---

## Domain 1: Charts & Visualization

### Recommendation: Custom SVG Components

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Custom SVG + React | n/a | Price histogram, trend line, deal quality donut | Established pattern in codebase; zero bundle cost |

**Confidence:** HIGH -- verified by direct codebase inspection

**Existing custom SVG chart precedents in this codebase:**

1. **`components/sections/PaymentCalculator/DonutChart.tsx`** -- Custom SVG donut chart using `<svg>`, `<circle>` elements with `strokeDasharray` for arc segments, CSS transitions for animation. Pure React component, no library.

2. **`components/PriceDistributionChart.tsx`** (`PriceGauge` export) -- Custom price gauge with segmented color bar, positioned dot indicator, and range labels. Uses `IntersectionObserver` for entrance animation. CSS Modules for all styling.

Both follow the same pattern: compute visual positions from data props, render SVG elements, animate with CSS transitions. This is the exact pattern needed for v10.0 charts.

**New chart components to build:**

| Component | SVG Elements | Input | Complexity |
|-----------|-------------|-------|------------|
| `PriceHistogram` | `<rect>` bars | Price bucket array with counts | ~80 lines |
| `TrendChart` | `<polyline>` + `<linearGradient>` area fill | Monthly median prices (12 points) | ~60 lines |
| `DealBreakdown` | `<circle>` arcs (DonutChart pattern) | Deal rating counts | ~70 lines (adapt DonutChart) |

**Binning logic** for histograms goes in a pure function in `app/src/data/srpSummaryEngine.ts`, not in the chart component. The component receives pre-computed `{ label: string; count: number; highlighted: boolean }[]` and renders it.

### Why NOT External Chart Libraries

| Library | Version | Bundle Size | Why Rejected |
|---------|---------|-------------|-------------|
| recharts | 3.7.0 | ~50KB gzipped | Lodash dependency (tree-shaking issues per [GitHub #3752](https://github.com/recharts/recharts/issues/3752)); React 19 requires `react-is` override ([GitHub #4558](https://github.com/recharts/recharts/issues/4558)); overkill for 3 charts |
| @visx/* | 3.x | ~25KB per module | D3 submodules pulled in; steep learning curve ("not plug and play"); designed for complex dashboards, not 3 simple charts |
| Chart.js | 4.x | ~65KB gzipped | Canvas-based rendering (not SVG); doesn't match the DOM-based patterns in this codebase; requires react-chartjs-2 wrapper |
| D3.js | 7.x | ~200KB full | Massive for 3 charts; the scale/axis calculations needed are ~20 lines of math each |

**Decision rationale:** This project needs exactly 3 chart types, all simple geometric shapes. The codebase already has 2 working custom SVG charts. Adding a charting library would be the first and only "data visualization dependency" -- unjustifiable for the scope.

---

## Domain 2: Chat UI Components

### Recommendation: Adapt Existing AiMode Components

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React + CSS Modules | existing | Chat input, message bubbles, prompt chips, panel | Proven pattern from VDP AiMode; 80% reusable |

**Confidence:** HIGH -- verified by direct inspection of `components/sections/AiMode/`

**Existing chat components in this codebase:**

| File | What It Does | Reusable for SRP? |
|------|-------------|-------------------|
| `AiModeContext.tsx` | React Context: messages array, loading state, auth gating, panel open/close, `sendMessage()` async handler | Adapt -- same shape but takes `SRPListing[]` + `FilterCriteria` instead of single `ListingData` |
| `ChatInput.tsx` | Textarea with Enter-to-send, floating label, send button, disabled state | Reuse directly -- only change placeholder text |
| `MessageBubble.tsx` | User/assistant message rendering with rich text support | Adapt -- add new message content types (comparison, listing card, action) |
| `ConversationThread.tsx` | Scrollable message list with auto-scroll on new messages | Reuse directly |
| `SuggestedPrompts.tsx` | Clickable prompt chip row | Reuse directly -- swap content to SRP-contextual prompts |
| `LoadingIndicator.tsx` | Three-dot typing indicator | Reuse directly |
| `AiModePanel.tsx` | Side panel with backdrop, Escape handler, mobile scroll lock | Adapt -- SRP panel pushes content left vs. VDP overlay |
| `renderRichText.tsx` | Markdown-subset renderer (bold, tables, lists) | Reuse directly |

**What needs to be NEW (not adaptable):**

| Component | Why New |
|-----------|---------|
| `SrpAssistantContext.tsx` | Different data shape: filtered listings + filters, not single listing. Different prompt generation. Different response classification |
| `AssistantPanel.tsx` (desktop) | SRP side panel pushes SRP card grid narrower; VDP AiMode overlays without affecting layout |
| `AssistantSheet.tsx` (mobile) | Bottom sheet with FAB trigger; VDP AiMode uses full-page panel |
| `AssistantMessage.tsx` | Extended message types: comparison tables, embedded listing cards, action buttons (not just rich text) |

### Why NOT External Chat UI Libraries

| Library | Why Rejected |
|---------|-------------|
| Stream Chat SDK | Requires WebSocket backend; brings its own component styling system; massive bundle for a mock feature |
| @chatscope/chat-ui-kit-react | Forces its own CSS classes, conflicts with CSS Modules pattern; would be the only external UI component in the entire project |
| react-chatbot-kit | Opinionated bot-specific patterns; limited customization for marketplace context |
| Vercel AI SDK | Designed for real SSE streams from LLM APIs; requires server-side integration; overkill for template-based responses |

**Decision rationale:** The codebase already has a complete, working chat UI (AiMode) that follows the project's CSS Modules pattern. Adding an external chat library would introduce a styling conflict and a dependency for something that's 80% built.

---

## Domain 3: Mock API / Service Layer

### Recommendation: In-App Service Functions with Simulated Delay

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Async TypeScript functions | n/a | Mock `/api/v1/srp-summary` and `/api/v1/srp-assistant` | Matches existing `mockAiService.ts` and `generate*.ts` patterns |

**Confidence:** HIGH -- verified by direct inspection of existing mock patterns

**Existing mock service patterns in this codebase:**

1. **`components/sections/AiMode/mockAiService.ts`** -- `generateAiResponse()` returns `Promise<string>` with simulated delay (`800 + Math.random() * 700ms`). Uses keyword-based classification to select pre-written template responses. No HTTP, no fetch, no Service Worker.

2. **`app/src/data/generateDealKit.ts`**, `generateNarrations.ts`, `generateVideoWalkthrough.ts` -- All follow the "generate-then-render" pattern: pure function computes data from inputs, component renders the result. Synchronous computation, no network simulation.

**Recommended service architecture:**

```
app/src/data/
  srpSummaryTypes.ts           -- Type definitions (SrpSummaryData, HistogramBucket, etc.)
  srpSummaryEngine.ts          -- Pure sync: (listings, filters) => SrpSummaryData
  srpNarrativeTemplates.ts     -- Pure sync: (SrpSummaryData) => narrative string
  srpAssistantService.ts       -- Async with delay: (query, context) => Promise<AssistantResponse>
```

**`srpSummaryEngine.ts`** is synchronous -- it runs on every filter change, computing stats from the ~80 in-memory listings. No delay needed because the data is local. Follows the `financingCalculations.ts` and `marketInsightsEngine.ts` pattern.

**`srpAssistantService.ts`** is async with simulated delay -- it mirrors `mockAiService.ts` exactly: keyword classification, template response selection, 800-1500ms delay. Returns a discriminated union:

```typescript
type AssistantResponse =
  | { type: 'text'; content: string }
  | { type: 'comparison'; listings: SRPListing[]; narrative: string }
  | { type: 'listing-card'; listing: SRPListing; commentary: string }
  | { type: 'action'; label: string; filterUpdate: Partial<FilterCriteria> };
```

### Why NOT MSW (Mock Service Worker)

MSW 2.12.10 is the industry standard for API mocking. It intercepts real `fetch()` calls via Service Worker registration. However:

- This project has **zero `fetch()` calls** for data loading. Everything is TypeScript imports.
- MSW requires Service Worker registration (`npx msw init`), handler definition files, and `setupWorker()` bootstrap -- real infrastructure for a project that explicitly scopes out real APIs.
- Adding MSW would create a `fetch()`-based data loading pattern that contradicts the established direct-import pattern. Future developers would see two competing data access patterns.
- MSW is valuable when building toward a real API. PROJECT.md lists "Real API integration" under "Out of Scope."

**Decision:** Keep the existing `mockAiService.ts` pattern. If the project ever adds real API integration, the service functions can internally swap to `fetch()` without changing the component interface.

---

## Domain 4: AI Narrative Generation

### Recommendation: Template-Based String Interpolation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| TypeScript template literal functions | n/a | Generate natural-language summaries from computed data | Type-safe, no runtime parser, matches existing pattern |

**Confidence:** HIGH -- verified by inspecting existing narrative generation

**Existing template patterns in this codebase:**

1. **`mockAiService.ts`** (1012 lines) -- Contains ~50 pre-written response templates using TypeScript template literals with data interpolation (`${listing.year}`, `${formatPrice(listing.currentPrice)}`, etc.).

2. **`app/src/data/generateNarrations.ts`** -- Generates photo narration scripts from listing data using template functions.

**Recommended approach for SRP narratives:**

```typescript
// app/src/data/srpNarrativeTemplates.ts

type ConfidenceLevel = 'full' | 'medium' | 'low' | 'insufficient';

interface NarrativeContext {
  listingCount: number;
  medianPrice: number;
  priceTrend: 'rising' | 'falling' | 'stable';
  avgDom: number;
  topMakes: string[];
  dealBreakdown: { great: number; good: number; fair: number; high: number };
  filterSummary: string;  // e.g., "Travel Trailers under $50K in Florida"
  confidence: ConfidenceLevel;
}

const TEMPLATES: Record<ConfidenceLevel, (ctx: NarrativeContext) => string> = {
  full: (ctx) => `We analyzed ${ctx.listingCount} ${ctx.filterSummary}. The median asking price is ${formatPrice(ctx.medianPrice)}, ${ctx.priceTrend === 'falling' ? 'trending down' : ctx.priceTrend === 'rising' ? 'trending up' : 'holding steady'} over the past 90 days. Listings sell in an average of ${ctx.avgDom} days. ${ctx.dealBreakdown.great + ctx.dealBreakdown.good} of these are priced at or below market value.`,
  // ... medium, low, insufficient variants
};
```

**Confidence gating:** The narrative template used depends on the data quality:
- **full** (50+ listings): Rich narrative with all stats
- **medium** (10-49): Narrative with caveats ("Based on a limited sample...")
- **low** (3-9): Only counts and median, no trends
- **insufficient** (<3): "Not enough data to provide market analysis"

These thresholds align with the existing `marketInsightsEngine.ts` pattern which uses `MIN_SAMPLE = 3`.

### Why NOT a Template Engine (Handlebars, Mustache, LiquidJS)

- Template engines add a runtime parser for syntax that TypeScript template literals already handle natively
- TypeScript template literals are **type-checked at compile time** -- Handlebars `{{variable}}` expressions are stringly-typed and fail silently at runtime
- The project needs ~10-15 template functions, not hundreds of templates loaded from files
- This is deterministic string generation from computed data, not LLM prompt construction requiring a templating DSL

---

## Domain 5: Streaming Response Simulation

### Recommendation: Custom `useTypewriter` Hook

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `requestAnimationFrame` + React state | browser API | Character-by-character reveal for assistant responses | Zero dependencies, smooth 60fps, ~25 lines |

**Confidence:** HIGH -- standard browser API, well-documented pattern

**Implementation:**

```typescript
// hooks/useTypewriter.ts
function useTypewriter(text: string, speed = 5): string {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    if (!text) return;

    let lastTime = 0;
    let rafId: number;

    function tick(time: number) {
      if (time - lastTime >= speed) {
        lastTime = time;
        indexRef.current++;
        setDisplayed(text.slice(0, indexRef.current));
      }
      if (indexRef.current < text.length) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [text, speed]);

  return displayed;
}
```

- 5ms/character = ~200 chars/second -- readable and snappy, matching the ChatGPT-style streaming feel
- `requestAnimationFrame` ensures smooth 60fps rendering without blocking the main thread
- The `motion` library (already installed) handles entrance animations for message containers (fade/slide), but text streaming is better as a lightweight dedicated hook

### Why NOT Streaming Libraries

| Library | Why Rejected |
|---------|-------------|
| Vercel AI SDK (`ai` package) | Designed for real SSE streams from LLM APIs; requires server-side route; massive overkill |
| react-aiwriter | 53 GitHub stars, thin wrapper around requestAnimationFrame -- just write the 25-line hook |
| TypeIt | Full typewriter library with cursor blinking, deletion effects -- overkill for chat streaming |

---

## Domain 6: Responsive Panel Architecture

### Recommendation: CSS Modules + Existing Breakpoint Tokens

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| CSS Modules + `tokens.css` breakpoints | existing | Desktop side panel, tablet stat grid, mobile bottom sheet | Matches all existing responsive patterns |

**Confidence:** HIGH -- verified by inspecting existing responsive patterns

**Existing responsive precedents:**

- `tokens.css` breakpoints: 768px (sm), 992px (md), 1232px (lg), 1920px (xl)
- `AiModePanel.module.css` -- desktop side panel + mobile full-width overlay
- `FilterSidebar.module.css` -- collapsible desktop sidebar
- `MobileFilterBar.module.css` -- bottom sheet / drawer pattern

**Responsive behavior for v10.0:**

| Viewport | Summary Card | Assistant Panel |
|----------|-------------|----------------|
| Desktop (1232px+) | Full card with stat bar + expandable detail panel | Right side panel, SRP content shifts left |
| Tablet (768-1231px) | 2x2 stat grid, collapsed detail panel | Right side panel, SRP content shifts left |
| Mobile (<768px) | Single-line collapsed stat bar, tap to expand | FAB trigger, bottom sheet slides up |

No responsive utility library needed. CSS Modules `@media` queries with the existing breakpoint tokens handle all three layouts.

---

## Computation Pipeline

```
SRP filter change (existing srpFilterEngine.ts)
  |
  v
Filtered SRPListing[] (existing)
  |
  v
srpSummaryEngine.ts (NEW) -- synchronous pure function
  |
  +--> StatBar data: { listingCount, medianPrice, priceTrend, avgDom }
  +--> Histogram buckets: { label, count, highlighted }[]
  +--> Trend data: { month, medianPrice }[]
  +--> Deal breakdown: { great, good, fair, high }
  +--> Confidence level: 'full' | 'medium' | 'low' | 'insufficient'
  |
  v
srpNarrativeTemplates.ts (NEW) -- synchronous template selection
  |
  v
SrpSummaryCard renders stat bar + charts + narrative

User sends chat message
  |
  v
srpAssistantService.ts (NEW) -- async with simulated delay
  |
  v
AssistantMessage renders response with typewriter effect
```

**Performance:** ~80 listings, simple aggregation. `srpSummaryEngine.ts` computation is O(n) and completes in <1ms. No Web Workers, debouncing, or caching beyond `useMemo` needed. The 500ms render budget is trivially met.

---

## File Structure (New Files)

```
app/src/data/
  srpSummaryTypes.ts            # Type definitions
  srpSummaryEngine.ts           # Pure computation: listings + filters => SrpSummaryData
  srpSummaryEngine.test.ts      # Vitest unit tests
  srpNarrativeTemplates.ts      # Template functions: data => narrative strings
  srpAssistantService.ts        # Mock async service with keyword classification

app/src/hooks/
  useTypewriter.ts              # Character-by-character text reveal hook

components/sections/
  SrpSummary/
    SrpSummaryCard.tsx          # Main container
    SrpSummaryCard.module.css
    StatBar.tsx                 # Headline stats row
    StatBar.module.css
    PriceHistogram.tsx          # SVG histogram
    TrendChart.tsx              # SVG trend line
    DealBreakdown.tsx           # SVG donut (adapted from DonutChart)
    DetailPanel.tsx             # Expandable detail area
    DetailPanel.module.css

  SrpAssistant/
    SrpAssistantContext.tsx     # Chat state provider
    AssistantInput.tsx          # Chat input + prompt chips
    AssistantInput.module.css
    AssistantPanel.tsx          # Desktop side panel
    AssistantPanel.module.css
    AssistantSheet.tsx          # Mobile bottom sheet
    AssistantSheet.module.css
    AssistantMessage.tsx        # Rich message renderer
    AssistantMessage.module.css
```

---

## What NOT to Add

| Dependency | Reason to Avoid |
|------------|-----------------|
| Any charting library (recharts, visx, Chart.js) | 3 simple charts do not justify a dependency; custom SVG matches existing patterns (DonutChart, PriceGauge) |
| MSW / json-server / Mirage | No HTTP data layer exists; adding one contradicts the direct-import architecture |
| AI/LLM SDK (Vercel AI, LangChain, OpenAI SDK) | No real LLM integration; narrative is deterministic template-based string generation |
| Chat UI kit (Stream, Chatscope) | Would be the only external UI component; conflicts with CSS Modules; AiMode components are 80% reusable |
| D3.js or D3 submodules | Scale/axis math for 3 charts is ~20 lines each; D3 is designed for complex interactive visualizations |
| Markdown parser (remark, marked, react-markdown) | AiMode already has `renderRichText.tsx` handling bold, tables, and lists |
| State management library (Zustand, Jotai, Recoil) | Summary data is derived from filter state via `useMemo`; chat state fits React Context (same pattern as AiModeContext) |
| Prompt engineering library | This is not an LLM application; narratives are templates, not prompts |
| Date library (date-fns, dayjs) | Month names and trend calculations are simple `new Date()` operations |

---

## Alternatives Considered Summary

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Charts | Custom SVG | recharts 3.7.0 | ~50KB gzipped, React 19 peer dep issues, overkill for 3 charts |
| Charts | Custom SVG | @visx/* | D3 submodules, steep learning curve, not plug-and-play |
| Charts | Custom SVG | Chart.js 4.x | Canvas-based, doesn't match SVG/DOM patterns |
| Mock API | Service functions | MSW 2.12.10 | No fetch() calls exist; Service Worker overhead for static data app |
| Mock API | Service functions | json-server | Requires running process; pure SPA |
| Chat UI | Adapt AiMode components | Stream Chat SDK | WebSocket backend, own styling, heavy bundle |
| Chat UI | Adapt AiMode components | @chatscope/chat-ui-kit | Own CSS system, conflicts with CSS Modules |
| Narrative | Template literals | Handlebars/Mustache | Runtime parser for something TS does natively with type safety |
| Streaming | useTypewriter hook | Vercel AI SDK | SSE/LLM integration layer -- overkill for mock data |
| Streaming | useTypewriter hook | react-aiwriter | 53 stars, thin wrapper; just write the hook |
| State | React Context + useMemo | Zustand/Jotai | Summary is derived data, chat state is local; Context is sufficient |
| Animation | motion (installed) | react-spring | Already have motion; no reason to add another animation lib |

---

## Installation

```bash
# No new dependencies required.
# The existing stack handles everything:
#   - React 19 for components and state
#   - CSS Modules for styling
#   - motion for animations
#   - vitest for testing
#   - TypeScript for type safety
#   - Existing AiMode components for chat UI patterns
#   - Existing DonutChart/PriceGauge for SVG chart patterns
#   - Existing mockAiService.ts for mock service patterns
```

---

## Testing Approach

Use vitest (already installed at 4.0.18) for the computation layer:

```bash
cd /Users/adam/rv-marketplace/app && npx vitest run src/data/srpSummaryEngine.test.ts
```

**What to test with vitest:**
- `srpSummaryEngine.ts` -- histogram bucketing, trend computation, deal breakdown, confidence thresholds
- `srpNarrativeTemplates.ts` -- template selection by confidence level, string interpolation correctness
- `srpAssistantService.ts` -- keyword classification, response type selection

**What to test manually:**
- Chart components (visual correctness, responsive behavior)
- Chat UI (interaction flow, panel open/close, mobile sheet)
- Typewriter effect (timing, readability)

---

## Sources

**Codebase (HIGH confidence):**
- `components/sections/PaymentCalculator/DonutChart.tsx` -- Custom SVG donut chart pattern
- `components/PriceDistributionChart.tsx` -- Custom SVG gauge/bar chart pattern
- `components/sections/AiMode/` (10 files) -- Complete chat UI: context, input, messages, panel, prompts
- `components/sections/AiMode/mockAiService.ts` -- Mock service with keyword classification + template responses
- `app/src/data/marketInsightsEngine.ts` -- Market computation engine pattern (comparables, median, scoring)
- `app/src/data/srpFilterEngine.ts` -- Filter engine that produces the listings array fed to summary engine
- `app/src/data/srpTypes.ts` -- SRPListing type with all fields needed for aggregation
- `app/src/data/marketInsightsTypes.ts` -- Existing confidence thresholds and seasonal multiplier tables

**Web research (MEDIUM confidence):**
- [recharts npm -- v3.7.0](https://www.npmjs.com/package/recharts) -- Version and peer dependency verification
- [recharts React 19 issues](https://github.com/recharts/recharts/issues/4558) -- Peer dependency concerns with react-is
- [recharts bundle size](https://github.com/recharts/recharts/issues/3697) -- ~50KB gzipped, lodash dependency
- [MSW docs -- v2.12.10](https://mswjs.io/docs/) -- Service Worker-based API mocking
- [Build React charts without a library](https://dev.to/edbentley/build-your-react-charts-without-a-library-35o8) -- Custom SVG implementation patterns
- [Custom charts in React](https://kyleshevlin.com/make-your-own-charts-in-react-without-a-charting-library/) -- Pure React + SVG approach
- [Streaming text in AI UIs](https://upstash.com/blog/smooth-streaming) -- 5ms/char typewriter speed recommendation
- [motion docs](https://motion.dev/docs/react) -- v12.x React 19 compatibility confirmed

---

*Stack research for: RV Marketplace v10.0 AI-Powered SRP Summary + Research Assistant*
*Researched: 2026-03-03*
