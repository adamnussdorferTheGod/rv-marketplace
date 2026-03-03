# Project Research Summary

**Project:** RV Marketplace v10.0 — AI-Powered SRP Summary + Research Assistant
**Domain:** Marketplace AI search intelligence and conversational shopping assistant
**Researched:** 2026-03-03
**Confidence:** HIGH

## Executive Summary

RV Marketplace v10.0 adds two layered AI features to the existing Search Results Page: a passive summary card (headline stats + AI narrative + expandable detail panel with charts) and an active conversational assistant (chat input, prompt chips, typed message responses). Research confirms this pattern — a passive summary layer plus an active assistant layer — is the exact architecture shipped by every major automotive marketplace in 2025 (CarGurus Discover, Autotrader AI Mode, Cars.com Carson). The RV vertical has zero buyer-facing AI features, making this a clear differentiation opportunity. The critical finding is that the entire v10.0 scope can be delivered using zero new npm dependencies: every capability maps to existing codebase patterns (custom SVG charts, AiMode chat UI, mockAiService templates, CSS Modules responsive layout).

The recommended approach is a strict generate-then-render architecture: a pure `srpSummaryEngine.ts` function computes typed summary data from the filtered `SRPListing[]` array, downstream components receive pre-computed props, and the assistant uses a keyword-classified mock service with real data interpolation. Confidence gating — four tiers from "full" (50+ listings) to "insufficient" (<3) — must be threaded as a top-level data contract through every component in the feature tree, not treated as a display flag on a single component. The data itself is the "intelligence": template strings interpolating real listing stats (counts, median prices, top makes, deal breakdowns) produce accurate and trustworthy responses without LLM infrastructure.

The primary risks are implementation-level, not architectural. Layout shift from inserting the summary card, the chat panel disrupting the 3-column listing grid, and confidence state failing to propagate to all child components are the three highest-impact pitfalls — each requiring specific prevention strategies baked into the first commits of their respective phases. A secondary risk is scope creep into real LLM integration: the existing codebase already has `claudeService.ts` for the VDP, making it tempting to hook it up for the SRP. This must be a hard boundary enforced at code review.

---

## Key Findings

### Recommended Stack

The existing stack handles all v10.0 capabilities. No new dependencies are needed or recommended.

**Core technologies:**
- **React 19 + TypeScript 5.9** — component tree and type safety for all new components; the established pattern
- **CSS Modules + `tokens.css`** — all styling; scoped, zero runtime cost, consistent with every existing component
- **Custom SVG components** — price histogram, trend chart, deal quality donut; two working codebase precedents exist (`DonutChart.tsx`, `PriceDistributionChart.tsx`)
- **AiMode components (adapted)** — `ChatInput`, `ConversationThread`, `SuggestedPrompts`, `MessageBubble`, `AiModePanel` are 80%+ reusable for the SRP assistant
- **Template literal functions** — narrative generation; type-safe, compile-time checked, matches existing `mockAiService.ts` and `generateNarrations.ts` patterns
- **`requestAnimationFrame` hook (`useTypewriter`)** — character-by-character text reveal for assistant responses; 25 lines, zero dependencies
- **Vitest (already installed at 4.0.18)** — unit testing for the pure computation layer (`srpSummaryEngine.ts`)

**External libraries explicitly rejected:** recharts (React 19 peer dep issues, ~50KB gzipped), MSW (no fetch() calls exist — contradicts direct-import architecture), Vercel AI SDK (no real LLM), Stream Chat / Chatscope (conflicts with CSS Modules), D3.js (overkill for 3 simple SVG charts).

See `.planning/research/STACK.md` for full rationale and alternatives analysis.

### Expected Features

Buyer-facing AI search summaries are becoming table stakes on automotive and major marketplace platforms. The RV vertical has no comparable features today.

**Must have (table stakes — users expect these):**
- Headline stat bar (listing count, median price, avg DOM, price trend) — users anchor on numbers before reading narrative; every competitor leads with quantitative summary
- AI narrative summary of current search results — Google AI Overviews and every automotive competitor have set this expectation
- Confidence-gated rendering (4 tiers: full/medium/low/insufficient) — users distrust AI that speaks confidently from thin data; 65% of consumers want guardrails
- Data grounding indicators ("Based on 24 listings") — attribution builds trust; mandatory on every data-derived claim
- Contextual prompt chip suggestions — Amazon Rufus data shows chips outperform empty text inputs as the primary engagement driver
- Chat input bar — minimum viable interaction point for an assistant
- Text response messages from assistant — baseline response type; grounded in real search data
- Responsive collapse behavior — three distinct states: desktop (full card), tablet (2x2 grid), mobile (single-line strip)

**Should have (competitive differentiators):**
- Expandable detail panel with price distribution histogram and deal quality breakdown — 44% of automotive shoppers want AI to compare vehicles (CarGurus 2025)
- Comparison table response type in assistant — addresses the #1 stated AI use case for automotive shoppers
- Listing card response type embedded in chat — more actionable than plain text; users can click through to VDP directly
- Action response type with deep-link filter buttons — bridges conversational discovery to traditional filter browsing
- Desktop side panel assistant (overlay, preserves search context while chatting)
- Mobile bottom sheet assistant (FAB trigger, swipeable up)
- Dynamic chip suggestions that evolve with conversation context
- Trend chart in detail panel (6-month simulated price movement)

**Anti-features (explicitly do not build):**
- Purchase recommendations ("you should buy this one") — creates liability; 73% of consumers want AI to inform, not decide
- Price predictions ("this will drop next month") — speculative claims erode trust; no marketplace ships this
- Negotiation coaching — adversarial to dealers (platform customers); legal exposure
- Real LLM integration in v10.0 — scope explosion; mock approach achieves the UX demonstration goal
- Personalization / user history — requires auth and storage, both out of scope
- Voice input — significant complexity; no automotive marketplace ships voice-first on web

See `.planning/research/FEATURES.md` for competitive landscape analysis and consumer research data.

### Architecture Approach

The architecture is a two-layer feature grafted onto the existing `SearchResultsPage`: a passive summary layer (`SrpSummaryCard`) inserted between the header and the featured listings carousel, and an active assistant layer (`AiAssistantPanel` / `AssistantSheet`) that extends the existing `AiModeProvider`. All computation follows the established generate-then-render pattern: `generateSrpSummary(results, filters)` runs synchronously via `useMemo` in `SearchResultsPage`, producing a typed `SrpSummaryData` object that flows down as props. The assistant mock service receives a pre-computed `SearchContext` object and returns discriminated union responses (`text | comparison | listing | action`). The existing `AiModeProvider` is extended (not replaced) with an optional `searchContext` prop.

**Major components:**
1. `srpSummaryEngine.ts` — pure function: `(SRPListing[], FilterCriteria) => SrpSummaryData`; O(n) computation, <1ms for 80 listings; computes stats, histogram bins, deal breakdowns, confidence tier, and narrative
2. `SrpSummaryCard` — passive display: `StatBar` + `AiNarrative` + `SummaryDetailPanel` (expandable); receives typed props; no state except expand/collapse
3. `mockSrpAssistantService.ts` — async mock: 5-category keyword classification, template responses interpolating real search context data, 500-1500ms simulated delay; hard import boundary from `claudeService.ts`
4. `AssistantMessage` — polymorphic renderer: `text | comparison | listing | action` discriminated union; each type has a dedicated sub-component
5. `AiAssistantPanel` / `AssistantSheet` — desktop overlay panel and mobile bottom sheet; extend existing `AiModePanel` pattern

**Key patterns to follow:** Generate-Then-Render (4+ codebase precedents), Confidence-Gated Rendering via a `ConfidenceGate` wrapper component, CSS Modules + design tokens for all styling, React Context extension (not a new context) for chat state.

See `.planning/research/ARCHITECTURE.md` for component boundary specifications, full data type definitions, build order, and anti-patterns to avoid.

### Critical Pitfalls

1. **Confidence state not propagated through the full UI stack** — `confidenceLevel` must be a required field in the API response schema and consumed by every component in the feature tree. Build a `ConfidenceGate` wrapper before writing any feature-specific UI. A 3-result search must suppress narrative, suppress charts, AND reduce prompt chips — not just show a badge on the stat bar. Address in the mock API layer phase.

2. **Layout shift when summary card first renders** — reserve fixed minimum height for the summary card slot from initial render using a skeleton component. The collapsed card height must be a CSS custom property. Detail panel expand/collapse must use CSS `max-height` transition, not instant reflow. Target CLS < 0.1 (measurable with Chrome DevTools Performance panel). Address in the summary card layout phase — skeleton must be in the first commit, not retrofitted.

3. **Chat panel disrupts the 3-column listing grid** — use an overlay pattern (position: fixed, backdrop) not a layout-shifting side panel. A 400px side panel collapsing a 1400px main column forces the listing grid from 3 columns to 2, causing expensive re-renders and scroll position loss. If the spec requires layout shift, ensure the grid uses CSS `auto-fill minmax()`. Address before building any panel content.

4. **Assistant responses not grounded in current search context** — every response template must interpolate at least 2 data points from `SearchContext` (result count, price range, top makes, median price). Build the `SearchContext` data contract before writing any response templates. Detection: if the response text does not change when filters switch from "Travel Trailers" to "Class A Motorhomes," the mock service is failing.

5. **Scope creep into real LLM integration** — the SRP mock service must not import from `claudeService.ts`. Hard boundary enforced at code review. Recovery cost is HIGH if real API is allowed to proceed. Add a comment at the top of the mock service: "This is a MOCK service. Real LLM integration is out of scope for v10.0."

**Additional moderate pitfalls:** Accessibility gaps in chat panel (focus management, `role="log"`, ARIA live regions); misleading aggregates on mixed-type searches (need type diversity check before computing single median); charts rendering poorly with small datasets (minimum-n thresholds per chart type: histogram >= 15, trend >= 20, deal breakdown >= 10); mock service growing beyond 200 lines (cap at 5 response categories); dead-end prompt chips with no follow-up path (require follow-up chip mapping before building chip component).

See `.planning/research/PITFALLS.md` for the complete 14-item "Looks Done But Isn't" checklist and recovery cost table.

---

## Implications for Roadmap

Based on combined research, the architecture's generate-then-render dependency chain and the pitfall phase warnings suggest a 6-phase build order.

### Phase 1: Data Layer + Types

**Rationale:** Everything downstream depends on the `SrpSummaryData` shape being correct and testable. Pure TypeScript with no React — fastest feedback loop and clearest test surface. The statistical pitfalls (misleading mixed-type aggregates, misleading aggregates from small n) must be addressed here because they cannot be patched in card UI without refactoring the engine API. This is the exact approach used for `marketInsightsEngine.ts` in v9.0.

**Delivers:** `srpSummaryTypes.ts` (all types including `ConfidenceLevel`, `PriceBin`, `DealBreakdown`, `AssistantMessageData` discriminated union); `srpSummaryEngine.ts` (pure `generateSrpSummary()` function with type diversity check, minimum-n confidence gating, histogram binning, deal breakdown); `srpNarrativeTemplates.ts` (4-tier template functions); `srpSummaryEngine.test.ts` (Vitest unit tests covering histogram bucketing, confidence thresholds, mixed-type searches)

**Addresses:** T1 (stat data), T2 (narrative pipeline), T7 (confidence gating), T8 (data grounding), assistant message type contract

**Avoids:** Pitfall 4 (confidence not in response schema — required field from day one), Pitfall 7 (misleading mixed-type aggregates — type diversity check in engine)

**Research flag:** Standard pattern. Generate-then-render is well-established with 4+ codebase precedents. Skip research phase.

---

### Phase 2: Summary Card — Stat Bar + Narrative

**Rationale:** The visible face of the feature; minimum viable product for the passive layer. Once the data layer exists, this phase makes it visible. Must include layout reservation (skeleton placeholder) in the first commit to prevent CLS from being retrofitted later. The subtitle text audit and Featured Listings placement decision must happen before this phase to prevent Pitfall 13 (summary card competing with existing SRP content).

**Delivers:** `SrpSummaryCard` with `StatBar`, `AiNarrative`, `ConfidenceBadge`, `ConfidenceGate` wrapper; all 3 responsive states built together (not retrofitted); skeleton placeholder reserving card height before data resolves; `SrpSummaryCard` inserted in `SearchResultsPage.tsx` between header and FeaturedListings

**Addresses:** T1, T2, T3 (responsive), T7, T8

**Avoids:** Pitfall 2 (layout shift — skeleton from first commit), Pitfall 11 (tablet breakpoint — design 2x2 grid state first), Pitfall 13 (competing with existing subtitle text — audit SRP content stack and replace, do not add alongside)

**Research flag:** Standard pattern. Skip research phase.

---

### Phase 3: Mock Assistant Service + Chat Input

**Rationale:** The data-to-language pipeline is the core value proposition of the active layer. Build the mock service before any assistant UI — it defines the response discriminated union that drives all downstream rendering. Establishing the `SearchContext` contract and the 5-category / 200-line ceiling here prevents over-engineering and scope creep in later phases. The follow-up chip mapping must be designed in this phase (before building the chip component).

**Delivers:** `mockSrpAssistantService.ts` (5 categories, all templates interpolating real search data, 200-line ceiling); `SearchContext` data contract; follow-up chip mapping (initial → follow-up → terminal states); `AiAssistantInput` with contextual prompt chips embedded in summary card; `AiModeProvider` extended with optional `searchContext` prop

**Addresses:** T4 (prompt chips), T5 (chat input), T6 (text responses), D7 (conversation history), D8 (dynamic chips)

**Avoids:** Pitfall 1 (over-engineered mock — 5-category cap, 200-line ceiling), Pitfall 5 (responses not grounded — `SearchContext` required in every template), Pitfall 9 (scope creep to real LLM — hard import boundary from `claudeService.ts`), Pitfall 10 (dead-end chips — follow-up mapping designed before chip component built)

**Research flag:** Standard pattern. Mirrors existing `mockAiService.ts` pattern. Skip research phase.

---

### Phase 4: Assistant Panel + Rich Message Types

**Rationale:** The full conversational experience. Depends on the mock service (Phase 3) for response data and the existing `AiModePanel` for layout patterns. The overlay-vs-layout-shift decision for the desktop panel must be resolved and implemented here. Accessibility attributes (focus management, `role="log"`, ARIA live regions) must be in the component skeleton, not added during polish.

**Delivers:** `AiAssistantPanel` (desktop overlay, not layout-shifting); `AssistantSheet` (mobile bottom sheet, FAB trigger, swipeable); `AssistantMessage` polymorphic renderer with all 4 types (`text`, `comparison`, `listing`, `action`); `useTypewriter` hook (25 lines, `requestAnimationFrame`); `ConversationThread` with `role="log"`; focus management on panel open/close

**Addresses:** D2 (comparison tables), D3 (listing cards), D4 (action responses), D5 (desktop panel), D6 (mobile bottom sheet)

**Avoids:** Pitfall 3 (panel breaks grid — overlay pattern, not layout shift; test on 1366px laptop viewport before building panel content), Pitfall 6 (accessibility — focus management and ARIA in component skeleton), Pitfall 12 (typing indicator timing — 600-1000ms fixed delay, no character-by-character streaming)

**Research flag:** Moderate complexity. The overlay-vs-layout-shift decision has performance and UX implications. Validate the exact panel behavior spec and test on 1366px viewport before starting implementation.

---

### Phase 5: Detail Panel + Charts

**Rationale:** Enhancement layer behind an expand interaction; lower urgency than the passive summary and active assistant. The feature is shippable after Phase 4. Building charts last ensures minimum-n thresholds are informed by usage observed in Phases 2-4. Custom SVG follows the `DonutChart` and `PriceDistributionChart` precedents — no new dependencies.

**Delivers:** `SummaryDetailPanel` with CSS `max-height` expand/collapse animation; `PriceDistributionChart` (SVG histogram, adaptive bin count `Math.min(Math.ceil(Math.sqrt(n)), 8)`); `DealQualityBreakdown` (SVG donut adapted from existing `DonutChart`); `TrendChart` (SVG line with simulated 6-month time-series data); all charts with minimum-n fallback to data tables

**Addresses:** D1 (detail panel + histogram), D9 (trend chart)

**Avoids:** Pitfall 8 (charts with small datasets — minimum-n thresholds: histogram >= 15, trend >= 20, deal breakdown >= 10; below threshold render data table, not empty bins)

**Research flag:** Standard pattern. Custom SVG charts follow existing codebase precedents. Skip research phase. Define the simulated trend time-series data shape during phase planning.

---

### Phase 6: Responsive Polish + QA

**Rationale:** Deliberate refinement pass after all components work at desktop width. The 14-item "Looks Done But Isn't" checklist from PITFALLS.md requires dedicated time and cannot be completed incidentally. CLS measurement, accessibility audit, and mock service size verification are not polish — they are correctness requirements.

**Delivers:** Full responsive behavior verified across all new components at all 3 breakpoints; CLS < 0.1 measured and confirmed; accessibility audit complete (focus management, ARIA, keyboard navigation); mock service verified under 200 lines; confidence propagation verified on edge-case searches (0, 1, 3, 5, 10, 50 results); context grounding verified (response changes when filters change)

**Addresses:** T3 (responsive collapse), Pitfall 11 (tablet breakpoint — design this state first, then desktop, then mobile)

**Research flag:** Standard QA phase. No research needed.

---

### Phase Ordering Rationale

- **Data before UI:** The generate-then-render pattern is non-negotiable. Components receive typed props, not raw listings. Getting the data shape correct in Phase 1 prevents cascading refactors across all downstream components.
- **Passive before active:** The summary card (Phase 2) delivers visible value with no interaction required and validates the data layer integration before the assistant complexity is added.
- **Service before panel:** The mock service (Phase 3) defines the response discriminated union that `AssistantMessage` renders. Building the panel before the service inverts the dependency.
- **Charts deferred:** Charts (Phase 5) are behind an expand interaction and have the smallest impact on core UX. The feature is shippable after Phase 4 if timeline pressure arises.
- **Polish separate:** The QA checklist (Phase 6) is extensive enough to deserve its own phase. Responsive refinement, CLS measurement, and accessibility are not incidental finishing touches.

### Research Flags

Phases needing attention before or during planning:
- **Phase 4 (Assistant Panel):** Validate the overlay-vs-layout-shift decision before writing code. Test candidate panel implementation on a 1366px laptop viewport. Determine whether the spec requires listings to be visible alongside the chat.
- **Phase 5 (Charts):** Define the simulated 6-month trend time-series data shape during phase planning — specifically how `daysOnMarket` or listing dates map to monthly aggregates in the mock data.
- **Phase 2 (Summary Card):** Audit the full SRP content stack and decide Featured Listings placement before implementation. This decision affects Phase 2 scope.

Phases with standard patterns (can skip research phase):
- **Phase 1 (Data Layer):** Generate-then-render is established with 4+ codebase precedents. `srpFilterEngine.ts` and `srpTypes.ts` already provide the input types.
- **Phase 2 (Summary Card):** CSS Modules + responsive breakpoints follow established patterns from `AiModePanel`, `FilterSidebar`, `MobileFilterBar`.
- **Phase 3 (Mock Service):** Direct extension of `mockAiService.ts` pattern (1012 lines of precedent already in the codebase).
- **Phase 6 (QA):** Checklist-driven verification. No research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified against production codebase. Every recommended approach has a working precedent. Zero new dependencies is well-justified with specific library-by-library rejection rationale. |
| Features | MEDIUM-HIGH | Competitor analysis from press releases and product pages (MEDIUM); consumer data from CarGurus/Cars.com 2025 industry surveys (MEDIUM); UX patterns from NN/g and Shape of AI (HIGH). Feature priority ordering is well-grounded in both data and competitive analysis. |
| Architecture | HIGH | Based on direct codebase analysis of existing patterns: generate-then-render, AiModeContext, SRP layout, AiModePanel, existing breakpoint tokens. Component boundaries follow established precedents with 0 speculation. |
| Pitfalls | HIGH (UX/accessibility) / MEDIUM (mock AI specifics) | CLS, accessibility, layout shift pitfalls verified against authoritative sources (web.dev, WCAG, IBM Carbon). Mock AI behavior pitfalls based on codebase analysis and industry pattern observation. |

**Overall confidence:** HIGH

### Gaps to Address

- **Featured Listings carousel placement:** PITFALLS.md flags that the carousel between the header and listing grid already pushes results down. Adding the summary card may require moving the carousel below the main grid or making it conditional. This architectural decision affects Phase 2 scope and must be resolved before Phase 2 implementation begins.

- **Overlay vs. layout-shift for desktop panel:** Research strongly recommends the overlay pattern to avoid listing grid reflow, but if product requirements specify listings remaining visible alongside chat in a split layout, a CSS Grid restructure with `auto-fill minmax()` columns is needed. Validate the exact spec before Phase 4.

- **Auth gating for SRP assistant:** The existing `AiModeContext` gates responses at conversation turn 2. Whether the SRP assistant uses the same gate, a different gate, or no gate for v10.0 is unspecified. Confirm during Phase 3 planning.

- **Trend chart time-series data shape:** The detail panel trend chart uses simulated 6-month data. The exact computation (how `daysOnMarket` or listing timestamps map to monthly medians in mock data) needs to be defined during Phase 5 planning. The existing `sampleSrpListings.ts` data is a price snapshot, not a time series.

---

## Sources

### Primary (HIGH confidence — direct codebase analysis)
- `components/sections/AiMode/` (10 files) — Complete chat UI patterns: context, input, messages, panel, prompts, mock service (1012 lines of established precedent)
- `components/sections/PaymentCalculator/DonutChart.tsx` — Custom SVG donut chart pattern (direct precedent for `DealQualityBreakdown`)
- `components/PriceDistributionChart.tsx` — Custom SVG gauge/bar chart pattern (direct precedent for `PriceHistogram`)
- `app/src/data/marketInsightsEngine.ts` — Market computation engine pattern (median, scoring, confidence thresholds, seasonal coefficients)
- `app/src/data/srpFilterEngine.ts` — Filter engine producing the `SRPListing[]` array that feeds `srpSummaryEngine`
- `app/src/data/srpTypes.ts` — `SRPListing` type with `dealRating`, `daysOnMarket`, `make`, `price`, `rvType` fields
- `components/pages/SearchResultsPage/` — Current SRP layout: 331px sidebar + flex main column, 1762px max-width container
- `app/src/styles/tokens.css` — Breakpoints (768px, 992px, 1232px, 1920px) used for all responsive specs

### Secondary (MEDIUM confidence — industry sources)
- [CarGurus 2025 Consumer Insights Report](https://dealers.cargurus.com/blog/2025-cargurus-consumer-insights-report) — 44% want vehicle comparison, 80% open to AI, 26% already using AI for car shopping
- [Autotrader AI Mode press release](https://press.autotrader.com/autotrader-powered-auto-intelligence-redefines-personalized-car-buying-experience) — 6x higher lead rate for AI-assisted shoppers
- [Cars.com Carson AI Engine](https://www.cars.com/articles/meet-carson-cars-coms-new-ai-engine-for-car-shopping-518222/) — 30% higher SRP-to-VDP conversion; 15% of searches use natural language
- [Amazon Rufus $10B impact](https://fortune.com/2025/11/02/amazon-rufus-ai-shopping-assistant-chatbot-10-billion-sales-monetization/) — 250M users; prompt chips are primary engagement mechanism; 60% higher purchase completion
- [NN/g: Designing Use-Case Prompt Suggestions](https://www.nngroup.com/articles/designing-use-case-prompt-suggestions/) — chips outperform empty text inputs for AI discovery
- [Cars.com AI Survey 2025](https://investor.cars.com/2025-11-20-Cars-com-Survey-Reveals-AIs-Growing-Influence-on-Car-Shopping) — 73% say AI is a time-saver; 65% want guardrails

### Tertiary (MEDIUM-LOW confidence — emerging patterns, single sources)
- [web.dev: Cumulative Layout Shift](https://web.dev/articles/cls) — CLS measurement methodology and < 0.1 target (HIGH confidence source)
- [Shape of AI: Summary Pattern](https://www.shapeof.ai/patterns/summary) — confidence-gated rendering pattern
- [Agentic Design: Confidence Visualization Patterns](https://agentic-design.ai/patterns/ui-ux-patterns/confidence-visualization-patterns) — confidence state UX patterns

---
*Research completed: 2026-03-03*
*Ready for roadmap: yes*
