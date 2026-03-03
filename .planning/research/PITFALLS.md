# Domain Pitfalls: AI-Powered SRP Summary + Research Assistant (v10.0)

**Domain:** Marketplace AI search summaries and conversational assistants on a Search Results Page
**Researched:** 2026-03-03
**Confidence:** HIGH for UX and accessibility patterns (verified against multiple authoritative sources, existing codebase analysis, and established design system patterns); MEDIUM for mock AI behavior specifics (based on industry patterns and codebase-specific constraints)

---

## Critical Pitfalls

Mistakes that cause rewrites, major UX regressions, or feature removal.

### Pitfall 1: Over-Engineering Mock AI — Template System Becomes a Poor LLM Simulator

**What goes wrong:**
The SRP summary narrative and assistant responses are template-generated (no real LLM). Developers try to make the mock system feel "smart" by adding increasingly complex template logic: NLP-like intent parsing, context-window simulation, multi-turn memory, entity extraction, sentiment detection. The template engine grows into a fragile pseudo-LLM with 50+ branching paths. Responses become unpredictable, hard to test, and produce uncanny valley output — sophisticated enough to set expectations of intelligence, but not sophisticated enough to meet them. Users probe edge cases and the illusion shatters immediately.

**Why it happens:**
The existing VDP `mockAiService.ts` already shows this trajectory: keyword-based classification across 10+ categories, multiple response variants per category, random selection. When adapted for SRP context (where queries reference filtered results, price ranges, and market conditions), the temptation is to thread listing data into every template branch. Each "just one more case" adds complexity without proportional value.

**Consequences:**
- Mock service becomes the largest, most bug-prone file in the codebase
- Responses feel "almost right" which is worse than obviously canned — users expect follow-up capability that does not exist
- Testing surface area explodes; every filter combination x query category x data state = thousands of paths
- When real LLM integration eventually happens, the entire mock system is thrown away

**Prevention:**
1. Cap the mock response system at 3-5 response categories for the SRP assistant (market overview, type comparison, buying advice, specific listing questions, general). No more.
2. Use simple template string interpolation with real data (listing count, median price, top makes) rather than simulated reasoning. The data IS the intelligence.
3. Make responses explicitly feel curated rather than generated: "Based on your search for {rvType}, here's what we found..." not "I analyzed your results and believe..."
4. The mock service should be under 200 lines. If it exceeds that, scope is creeping.
5. Establish a `MockApiService` interface that mirrors the eventual real API shape, so the mock is swapped out, not refactored.

**Detection (warning signs):**
- `mockAiService.ts` or equivalent exceeds 300 lines
- More than 3 nested conditionals in response generation
- Developers spending time on "making the AI smarter" rather than on the UI/UX
- Response quality varies wildly between searches — some great, some nonsensical
- Unit tests needed for mock response logic (a mock that needs its own tests is over-engineered)

**Phase to address:** Mock API layer phase -- define the mock service interface and complexity ceiling before building any responses.

---

### Pitfall 2: SRP Summary Card Causes Layout Shift and Pushes Listings Below the Fold

**What goes wrong:**
The SRP Summary Card is inserted between the header/breadcrumbs and the listing grid. On initial render, it is absent (data loading or computing). Once the summary data resolves, the card mounts into the DOM, pushing the entire listing grid down by 200-400px. This causes Cumulative Layout Shift (CLS) -- listings the user was about to click jump downward. On mobile, the effect is worse: the collapsed summary still takes 80-120px, and the 2x2 stat grid pushes the first listing card below the fold entirely.

**Why it happens:**
The existing SRP layout (`SearchResultsPage.tsx`) has a tight vertical flow: leaderboard ad -> breadcrumbs/title -> featured listings -> listing grid. There is no reserved space for a summary card. Adding a new component between header and grid without reserving its height causes reflow. The summary card also has expand/collapse states that change its height dynamically, causing secondary layout shifts when users interact.

**Consequences:**
- Users accidentally click the wrong listing card when content shifts under their cursor
- CLS score degrades (target is < 0.1; a 300px shift on a 1080p viewport is ~0.28)
- On mobile, the first listing card is pushed to second scroll position, reducing engagement
- Expand/collapse animation of the detail panel causes additional shifts to the grid below

**Prevention:**
1. Reserve a fixed minimum height for the summary card slot in the DOM from initial render, even before data loads. Use a skeleton/placeholder that matches the collapsed card height.
2. The collapsed summary card height must be deterministic: define it as a CSS custom property (e.g., `--srp-summary-height: 120px`) and reserve that space in the layout.
3. When the detail panel expands, push content down with a smooth CSS transition (`max-height` + `transition`) rather than an instant reflow. This converts a jarring shift into an intentional animation.
4. On mobile, the collapsed state should be a single-line summary (< 48px) that does not meaningfully affect first-listing visibility.
5. Test by measuring CLS with Chrome DevTools Performance panel before and after adding the summary card.

**Detection (warning signs):**
- No skeleton/placeholder visible during summary data computation
- The summary card component uses `display: none` then switches to `display: block` (creates layout shift)
- No `min-height` or reserved space in the `.mainColumn` CSS for the summary slot
- Mobile viewport shows summary card + stat grid before any listing card
- Users report "jumping" when interacting with the summary card expand/collapse

**Phase to address:** SRP Summary Card layout phase -- skeleton and height reservation must be in the first commit, not retrofitted after the card content is built.

---

### Pitfall 3: Chat Assistant Panel Disrupts Existing SRP Two-Column Layout

**What goes wrong:**
The PROJECT.md spec says "Side panel assistant (desktop) -- Chat opens in right panel, listings shift left." The current SRP layout is a 331px sidebar + flexible main column within a 1762px container. When a ~400px chat panel opens on the right, the main column must shrink from ~1400px to ~1000px. This breaks the 3-column listing card grid (each card is ~403px), forcing a reflow to 2 columns. Cards resize, images rescale, and the entire grid re-renders. The layout shift is jarring, performance degrades from the mass re-render, and the experience feels like two features fighting for space.

**Why it happens:**
The existing `AiModePanel` on the VDP uses a right-side slide-in panel that works because the VDP has a simpler layout (single content column + sidebar). The SRP's 3-column card grid is sensitive to width changes. Naively copying the VDP panel pattern to SRP causes grid column collapse.

**Consequences:**
- 3-column grid drops to 2 columns, causing a visual "collapse" effect
- All listing card images resize, triggering expensive re-renders
- Users lose their scroll position as content height changes
- On tablets (768-1024px), there is no room for both the filter sidebar AND the chat panel
- The filter sidebar and chat panel compete for attention and screen real estate

**Prevention:**
1. Use an overlay panel (not layout-shifting panel) on the SRP. The chat panel should float over the listing grid with a semi-transparent backdrop, not push it aside. This avoids grid reflow entirely.
2. If the spec requires layout shift, ensure the grid uses CSS `auto-fill` with `minmax()` so column count adjusts gracefully, and test the 2-column fallback as a first-class layout, not a degraded state.
3. On tablet, the chat panel must be a full-screen bottom sheet or modal -- there is no room for three columns of UI (filter sidebar + listings + chat panel).
4. On mobile, the existing `AiModePanel` pattern (bottom sheet with backdrop) works correctly and should be reused directly.
5. Measure performance: opening the chat panel should not cause the listing grid to re-render. Use `React.memo` on `ListingGrid` and verify with React DevTools Profiler.

**Detection (warning signs):**
- Opening the chat panel causes visible listing card resizing
- React DevTools shows `ListingGrid` and all `ListingCard` children re-rendering when the panel opens
- On a 1366px laptop screen, the chat panel + filter sidebar + listings do not fit
- No explicit handling for the tablet breakpoint (992px) with chat panel open
- The chat panel uses `position: relative` and takes space in the flex flow

**Phase to address:** Assistant Panel layout phase -- determine overlay vs. shift strategy and test on 1366px viewport BEFORE building any panel content.

---

### Pitfall 4: Confidence States Not Propagated Through the Full UI Stack

**What goes wrong:**
The spec defines four confidence levels: full (50+ results), medium (10-49), low (< 10), insufficient (0-2). The mock API returns a confidence level, but it is only used to gate the headline stat bar. The AI narrative text, the detail panel charts, the prompt chip suggestions, and the assistant responses all render at full confidence regardless. A user searches for "Fish House under $20K within 50 miles" and gets 2 results. The stat bar correctly shows "Limited data." But the narrative reads "Fish houses in this price range typically sell within 30 days" (template text derived from 2 listings), the price histogram shows 2 bars (meaningless), and the assistant responds with confident market analysis. The confidence system is surface-level decoration, not structural.

**Why it happens:**
Confidence is treated as a display flag on one component rather than a data contract that flows through the entire feature tree. The summary card, detail panel, and assistant are built by different phases/developers, each consuming the raw listing data directly rather than the confidence-gated API response.

**Consequences:**
- Users see contradictory signals: "Limited data" badge next to a confident paragraph of analysis
- Charts with 2-3 data points look broken, not "low confidence"
- Assistant gives authoritative answers about a market segment it has no data for
- The feature appears unfinished or buggy rather than gracefully degraded

**Prevention:**
1. Define confidence as a top-level property of the API response shape that ALL downstream components consume. Every component in the feature tree receives `confidenceLevel` and renders accordingly.
2. At `low` confidence: suppress the narrative entirely, replace with "We don't have enough data to summarize this search." Suppress the detail panel. Reduce prompt chips to generic questions only.
3. At `insufficient` confidence: show only the result count and a message encouraging the user to broaden their search. No narrative, no charts, no assistant context.
4. Build confidence rendering as a wrapper component (`ConfidenceGate`) that children use, not as per-component conditional logic.
5. Test with edge-case searches: single result, zero results, 5 results of mixed types, 80 results of one type.

**Detection (warning signs):**
- Components consume `listings` directly instead of the confidence-gated API response
- Narrative template renders regardless of listing count
- No visual difference between a 2-result search and a 50-result search in the summary card
- Detail panel charts render with < 5 data points
- Assistant responds to market questions when the search returned 1 listing

**Phase to address:** Mock API layer phase -- the response schema must include `confidenceLevel` as a required field, and a `ConfidenceGate` component should be built before any feature-specific UI.

---

### Pitfall 5: Assistant Responses Not Grounded in Current Search Results

**What goes wrong:**
The user searches for "Class A Motorhomes, $80K-$150K, Used." The assistant responds with generic RV buying advice (copied from the existing `SRP_RESPONSES` in `mockAiService.ts`) that mentions travel trailers, new units, and price ranges outside the active filters. The response is topically relevant to "RVs" but not grounded in the specific search context. This makes the assistant feel like a generic FAQ bot, not a contextual research tool.

**Why it happens:**
The existing SRP mock responses in `mockAiService.ts` are category-based templates written for a generic "RV shopping" context. They were designed for the VDP assistant where listing-specific data was available. On the SRP, the assistant needs to reference the active filter state, the filtered result set, and the aggregate statistics -- but the mock response templates do not interpolate any of this data.

**Consequences:**
- Users quickly realize the assistant is not actually analyzing their search results
- The "research assistant" positioning falls flat -- it is an FAQ page with a chat skin
- Users stop engaging after 1-2 generic responses
- The feature fails to demonstrate the value proposition of AI-grounded search analysis

**Prevention:**
1. Every SRP assistant response template MUST interpolate at least 2 data points from the current search context: result count, price range, top makes, dominant RV type, median price, etc.
2. Build a `SearchContext` object that the mock service receives alongside the user message: `{ totalResults, filters, priceRange, topMakes, medianPrice, avgDaysOnMarket }`.
3. Template responses should read like: "Among the {totalResults} {rvType} listings in your search, prices range from {priceMin} to {priceMax}, with a median of {medianPrice}. The most common makes are {topMakes}."
4. The prompt chips should be contextual too: if the user is searching Class A motorhomes, show "Compare diesel vs gas Class A" not generic "What RV should I buy?"
5. Reuse the `srpFilterEngine.ts` aggregate functions to compute the context object from the current filtered results.

**Detection (warning signs):**
- Assistant response text does not change when the user changes filters
- Response mentions RV types not present in the current search results
- Prompt chip text is identical regardless of search context
- The `sendMessage` function does not receive the current filter state or results
- Response templates contain no `{variable}` interpolation from search context

**Phase to address:** Mock API layer and assistant response phase -- build the `SearchContext` data contract before writing any response templates.

---

## Moderate Pitfalls

### Pitfall 6: Chat Panel Accessibility Gaps -- Focus Trap, Screen Reader, and Keyboard Navigation

**What goes wrong:**
The chat panel opens but focus remains on the listing grid. Screen reader users do not know the panel opened. Keyboard users cannot tab into the panel without traversing the entire page. When the panel closes, focus is not returned to the trigger element. Messages in the conversation thread are not announced to screen readers. The chat input has no visible label. The typing indicator is visual-only with no ARIA live region announcement.

**Why it happens:**
Accessibility is deferred to "polish" rather than built into the component contract. The existing `AiModePanel` has some accessibility attributes (`role="dialog"`, `aria-label`, `aria-hidden`) but is missing focus management, live region announcements, and keyboard trap handling. When adapted for the SRP context, the same gaps carry forward.

**Prevention:**
1. On open: move focus to the chat panel (first focusable element, typically the input). Use `aria-live="polite"` region to announce "Research assistant opened."
2. On close: return focus to the trigger button (the FAB or summary card CTA that opened it).
3. Chat input must have a visible `<label>` element (not just `placeholder` or `aria-label` alone).
4. Conversation thread should use `role="log"` with implicit `aria-live="polite"` so new messages are announced.
5. Typing indicator must have a visually hidden text announcement: "Assistant is typing."
6. Escape key should close the panel (already implemented in `AiModePanel`).
7. Panel should NOT trap focus on desktop (user may need to interact with listings while panel is open). On mobile bottom sheet, focus trap IS appropriate since the sheet covers the page.

**Detection (warning signs):**
- No `focus()` call when the panel opens
- No `onClose` callback that restores focus to the trigger
- Chat input uses `placeholder` as its only label
- Conversation thread has no `role="log"` attribute
- Typing indicator is a CSS animation with no ARIA announcement
- Desktop panel traps focus (preventing interaction with listings)

**Phase to address:** Assistant Panel component phase -- accessibility attributes and focus management must be in the component skeleton, not added during polish.

---

### Pitfall 7: Summary Stat Bar Shows Misleading Aggregate Numbers for Mixed-Type Searches

**What goes wrong:**
The user searches "RVs under $100K" with no type filter. Results include travel trailers at $25K, Class C motorhomes at $80K, and fifth wheels at $60K. The stat bar shows "Median price: $52,000" and "Avg days on market: 34." These aggregates mix fundamentally different market segments. A median that averages across travel trailers and Class A motorhomes is meaningless -- it does not represent any actual market segment. The stat bar looks authoritative but communicates noise.

**Why it happens:**
The stat computation function receives the filtered results array and computes aggregates across ALL results regardless of type diversity. This works well for homogeneous searches (e.g., "Used Travel Trailers in Florida") but produces misleading numbers for broad, multi-type searches.

**Prevention:**
1. When results span 3+ RV types with no single type > 60% of results, switch the stat bar to a "mixed results" mode that shows per-type breakdowns instead of a single aggregate.
2. Alternatively, show the median price for the dominant type only, with a note: "Median price for travel trailers (42 of 67 results)."
3. The AI narrative should acknowledge mixed results: "Your search returned a mix of {types}. Travel trailers dominate at {count}, with prices ranging from..."
4. Detail panel price histogram should use per-type coloring or separate distributions when multiple types are present.
5. The confidence level should degrade one tier for mixed-type searches (full -> medium) to signal reduced reliability.

**Detection (warning signs):**
- Stat bar shows a single median price for a search spanning 4+ RV types
- No conditional logic checking type diversity before computing aggregates
- Price histogram shows a bimodal distribution (two humps) but is rendered as a single series
- Narrative text uses "listings like these" for a search mixing $20K trailers and $200K motorhomes

**Phase to address:** Summary stat computation phase -- type diversity check must be built into the computation engine, not the card UI.

---

### Pitfall 8: Detail Panel Charts Render Poorly With Small Datasets

**What goes wrong:**
The spec calls for a price distribution histogram, trend chart, and deal quality breakdown in the expandable detail panel. With ~80 total listings and typical filter combinations producing 10-30 results, these charts have very few data points. A histogram with 8 data points across 5 bins shows mostly empty bins. A "trend chart" with 15 listings plotted by days-on-site shows a scatter of dots with no visible trend. The charts look broken rather than informative.

**Why it happens:**
Chart components are designed assuming a dataset large enough to produce smooth distributions. With small n, statistical visualizations break down: histograms have insufficient bin density, trend lines have huge confidence intervals, and pie charts show 100% for a single category.

**Prevention:**
1. Define minimum data thresholds for each chart type: histogram needs n >= 15, trend chart needs n >= 20, deal quality breakdown needs n >= 10.
2. Below threshold, replace the chart with a data table or simple text summary: "8 listings found -- not enough for a distribution view. Here's a list..."
3. Histogram bin count should be `Math.min(Math.ceil(Math.sqrt(n)), 8)` -- adaptive to data size.
4. Trend charts with < 20 points should suppress the trend line and show only the data points with a note: "Showing individual listings. More data needed for trend analysis."
5. Build charts with CSS/SVG (no charting library) to keep bundle size in check -- the project has a no-new-dependencies constraint.

**Detection (warning signs):**
- Histogram renders with most bins empty (3+ of 5 bins showing zero height)
- Trend chart shows a line through 5 data points -- any "trend" is meaningless
- Deal quality pie chart shows 100% "Fair" because all 4 results in a narrow filter are rated the same
- Charts render identically for 5-result and 50-result searches

**Phase to address:** Detail panel charts phase -- define minimum-n thresholds in the chart component contract before building any visualization.

---

### Pitfall 9: Scope Creep Into Real AI Integration During Mock Implementation

**What goes wrong:**
While building the mock API layer, a developer notices the project already has a `claudeService.ts` with real Claude API integration for the VDP assistant. The temptation is irresistible: "Let's just hook up the real API for the SRP too -- we already have the pattern." This derails the milestone scope. Real API integration requires prompt engineering, token management, rate limiting, error handling for network failures, API key management, streaming response UI, and cost monitoring. A 2-day mock service task becomes a 2-week integration effort.

**Why it happens:**
The `AiModeContext.tsx` already has a branching pattern: `if (isClaudeAvailable()) { try claude, fallback to mock }`. Extending this to the SRP feels like a small change. But the SRP context is fundamentally different from the VDP context: the prompt needs to include filter state, result aggregates, and potentially listing summaries for 30+ results, which exceeds typical context window budgets.

**Consequences:**
- Milestone timeline blows out 2-3x
- Real API responses are inconsistent, requiring prompt iteration
- Cost surprises from API calls during development/testing
- The "mock" path atrophies because everyone tests against the real API
- When the API key expires or rate limits hit, the feature appears broken

**Prevention:**
1. The v10.0 milestone mock API service must NOT import or reference `claudeService.ts`. Hard boundary.
2. The mock service interface should mirror a future real API shape, but the implementation is template strings only.
3. Add a comment at the top of the mock service: `// This is a MOCK service. Real LLM integration is out of scope for v10.0.`
4. If the Claude integration path is desired for a future milestone, document it as a v11.0 requirement, not a v10.0 stretch goal.
5. Review PRs for any imports from `claudeService` in new SRP-related files.

**Detection (warning signs):**
- New files importing from `claudeService.ts`
- Environment variable setup for API keys in SRP-related code
- `async` fetch calls to external endpoints in the mock service
- Discussion of "prompt engineering" during the mock service phase
- Token counting or context window management appearing in SRP code

**Phase to address:** Mock API layer phase -- establish the hard boundary in the phase plan and code review checklist.

---

### Pitfall 10: Prompt Chips Become a Dead End -- No Progressive Engagement Path

**What goes wrong:**
The spec includes contextual prompt chip suggestions like "Compare prices" or "What should I look for?" The user clicks a chip, gets a template response, and... the experience ends. No follow-up chips appear, no natural next question is surfaced, the conversation feels like a single-shot FAQ lookup. The user closes the panel and never returns.

**Why it happens:**
Prompt chips are designed as entry points but not as part of a conversation flow. After the first response, the chip tray goes empty (or shows the same generic chips). There is no mapping from "user asked about prices" -> "now suggest: 'How does this compare to last year?' or 'Show me the best deals.'"

**Prevention:**
1. Define a follow-up chip mapping: each response category generates 2-3 relevant next-step chips. This is already partially implemented in `generateFollowUpPrompts` in the existing `AiModeContext` -- extend it for SRP-specific categories.
2. Follow-up chips should become more specific, not more generic: "Compare prices" -> "Compare Class C prices in your area" -> "Show me Class C listings under $80K."
3. Limit the conversation to 3-5 exchanges before showing a terminal state: "Want to dive deeper? Save your search and we'll notify you of price changes." This gives the mock system a graceful exit.
4. The auth gate (already at exchange 2 in the existing system) provides a natural conversation boundary. Use it intentionally as a feature, not just a limitation.
5. Each prompt chip click should visually indicate it was used (dim or remove) to prevent re-asking the same question.

**Detection (warning signs):**
- After the first assistant response, the prompt chip tray is empty
- Follow-up chips are identical to the initial chips
- No defined limit on conversation length (infinite loop of increasingly irrelevant responses)
- The same chips appear regardless of what the user asked about

**Phase to address:** Assistant interaction design phase -- map the prompt chip flow (initial -> follow-up -> terminal) before building the chip component.

---

## Minor Pitfalls

### Pitfall 11: Summary Card Responsive Behavior Not Tested at Tablet Breakpoint

**What goes wrong:**
The spec defines three responsive states: full card on desktop, collapsed single-line on mobile, and 2x2 stat grid on tablet. The desktop and mobile states are straightforward. The tablet breakpoint (992px) requires the stat bar to wrap from a horizontal row into a 2x2 grid. This wrap point is not tested, and the stat labels truncate, icons overlap, or the grid does not align because the card was designed at desktop width and shrunk, not designed responsively from the start.

**Prevention:**
1. Design the tablet 2x2 grid state first -- it is the most constrained and hardest to get right.
2. Use CSS Grid with `grid-template-columns: 1fr 1fr` at the tablet breakpoint, not flexbox wrapping.
3. Test stat label truncation: "Avg. Days on Market" is 19 characters, which truncates at narrow widths. Use abbreviations at tablet: "Avg. DOM."
4. Ensure the expand/collapse toggle remains accessible at all breakpoints -- do not hide it behind a scroll.

**Detection (warning signs):**
- Stat labels overflow their containers at 992px
- The 2x2 grid renders as 1x4 because flexbox wrapping was assumed instead of explicit grid
- The expand/collapse control is cut off or overlaps stat values at tablet width

**Phase to address:** Summary card responsive phase -- implement and test the tablet breakpoint before desktop or mobile.

---

### Pitfall 12: Typing Indicator Feels Wrong for Template Responses

**What goes wrong:**
A typing indicator (three bouncing dots) animates for 800-1500ms before the template response appears. For a real LLM, this would represent processing time. For a template system, the response is available instantly -- the delay is artificial. If the delay is too short (200ms), the response appears before the user's eyes reach the indicator, creating a jarring "flash." If too long (2000ms+), it wastes the user's time and feels patronizing.

**Prevention:**
1. Use a 600-1000ms delay -- long enough to be perceived as processing, short enough not to frustrate.
2. Stagger the response: show the typing indicator immediately, then render the response text with a word-by-word or paragraph-by-paragraph reveal (not character-by-character, which simulates streaming and sets LLM expectations).
3. Keep the delay consistent. Do not vary it randomly to simulate "thinking" -- this trains users to expect variable processing times that will not match real API behavior later.
4. Do NOT add artificial "thinking" messages like "Let me analyze your results..." -- this implies intelligence that does not exist.

**Detection (warning signs):**
- Delay exceeds 1500ms for template responses (user frustration)
- Delay varies wildly between responses (breaks expectations)
- "Thinking" text messages appear before the actual response (simulates intelligence)
- Character-by-character streaming animation (sets streaming LLM expectations)

**Phase to address:** Assistant message rendering phase -- define the reveal timing constant early and keep it simple.

---

### Pitfall 13: Summary Card and Detail Panel Compete With Existing SRP Features

**What goes wrong:**
The SRP already has a Featured Listings section, nudge chips ("Looking for something else?"), sort controls, and filter sidebar. Adding a summary card with its own stat bar, AI narrative, expand/collapse detail panel, and prompt chips creates visual competition. The user sees two rows of chips (prompt chips + nudge chips), two blocks of introductory content (subtitle text + AI narrative), and the actual listing grid is pushed to the third or fourth screen of content.

**Prevention:**
1. Audit the existing SRP content stack before inserting the summary card. The current order is: leaderboard ad -> breadcrumbs/title/subtitle -> sort controls -> featured listings -> listing grid (with nudge chips after row 4). The summary card should replace the subtitle text, not be added alongside it.
2. Consider removing the "Show more/Show less" subtitle text entirely -- the AI narrative supersedes its purpose.
3. Prompt chips should replace or integrate with the nudge chips, not appear as a separate row. Use the same `ActionChip` component for visual consistency.
4. The Featured Listings section between the header and the main grid already pushes listings down. With the summary card added, evaluate whether Featured Listings should move below the main grid or be removed from pages where the summary card is present.

**Detection (warning signs):**
- The first listing card appears below 800px from the top of the SRP on a 1080p desktop viewport
- Two separate rows of chips are visible (prompt chips AND nudge chips)
- The subtitle "Show more" text AND the AI narrative are both visible
- Users need to scroll past 3+ content blocks before seeing listing cards

**Phase to address:** Summary card integration phase -- map the full SRP content stack and define replacements/removals before adding new content.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Mock API layer | Scope creep into real LLM (Pitfall 9) | Hard import boundary; no `claudeService` references |
| Mock API layer | Over-engineered template system (Pitfall 1) | Cap at 5 categories, 200-line limit |
| Mock API layer | Confidence not in response schema (Pitfall 4) | `confidenceLevel` as required field in response type |
| Summary card layout | Layout shift / CLS (Pitfall 2) | Reserve height with skeleton from first render |
| Summary card layout | Competes with existing content (Pitfall 13) | Audit and replace subtitle text, integrate with nudge chips |
| Summary stat computation | Misleading mixed-type aggregates (Pitfall 7) | Type diversity check before computing single median |
| Detail panel charts | Poor rendering with small n (Pitfall 8) | Minimum-n thresholds per chart type |
| Assistant panel | Layout disruption on SRP (Pitfall 3) | Overlay pattern, not layout-shift pattern |
| Assistant panel | Accessibility gaps (Pitfall 6) | Focus management and ARIA in component skeleton |
| Assistant responses | Not grounded in search context (Pitfall 5) | `SearchContext` object passed to mock service |
| Prompt chips | Dead-end engagement (Pitfall 10) | Follow-up chip mapping with terminal state |
| Responsive behavior | Tablet breakpoint untested (Pitfall 11) | Design tablet state first |
| Message rendering | Typing indicator uncanny valley (Pitfall 12) | 600-1000ms fixed delay, no streaming simulation |

## "Looks Done But Isn't" Checklist

- [ ] **Confidence propagation:** Does a 3-result search show suppressed narrative AND suppressed charts AND reduced prompt chips?
- [ ] **Layout shift:** Is CLS < 0.1 when the summary card first renders? Measure with Chrome DevTools.
- [ ] **Chat panel on 1366px laptop:** Does opening the assistant panel NOT cause listing cards to resize?
- [ ] **Context grounding:** Does the assistant response change when you switch filters from "Travel Trailers" to "Class A Motorhomes"?
- [ ] **Focus management:** After opening the chat panel with keyboard, is focus on the chat input? After closing, is focus on the trigger button?
- [ ] **Screen reader:** Does a screen reader announce "Research assistant opened" when the panel opens?
- [ ] **Conversation thread:** Does `role="log"` exist on the message container?
- [ ] **Mixed-type search:** Does a search with no type filter show per-type breakdowns instead of a single misleading median?
- [ ] **Chart minimum-n:** Does a histogram with 5 data points show a table instead of mostly-empty bins?
- [ ] **Follow-up chips:** After the first assistant response, do contextual follow-up chips appear (not generic)?
- [ ] **Scope boundary:** Does any new SRP file import from `claudeService.ts`? (Should be NO)
- [ ] **Mobile first listing:** On a 375px viewport, is the first listing card visible within the first 500px of scroll?
- [ ] **Subtitle replacement:** Is the old subtitle text ("Shopping for RVs? Let us help...") removed or replaced by the AI narrative?
- [ ] **Mock service size:** Is the SRP mock service under 200 lines?

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Over-engineered mock AI | MEDIUM | Extract data-interpolation layer; replace branching with simple template + context injection |
| Layout shift from summary card | LOW | Add `min-height` reservation to summary slot; add skeleton component |
| Chat panel breaks grid layout | HIGH | Refactor from layout-shift to overlay pattern; requires CSS restructure of panel |
| Confidence not propagated | MEDIUM | Add `ConfidenceGate` wrapper component; thread `confidenceLevel` through all children |
| Responses not grounded | LOW | Build `SearchContext` object; update templates with interpolation variables |
| Accessibility gaps | MEDIUM | Add focus management hooks, ARIA attributes, and live regions to panel component |
| Mixed-type aggregate misleading | LOW | Add type-diversity check to stat computation; switch to per-type display |
| Charts with small n | LOW | Add `if (n < minThreshold) return <DataTable>` fallback in each chart |
| Scope creep to real AI | HIGH (if allowed to proceed) | Revert Claude integration; re-establish mock service boundary |
| Dead-end prompt chips | LOW | Add follow-up chip mapping to response handler |

## Sources

- [Cumulative Layout Shift (CLS) -- web.dev](https://web.dev/articles/cls) -- HIGH confidence (Google official documentation)
- [How to build an accessible chatbot -- Make Things Accessible](https://www.makethingsaccessible.com/guides/how-to-build-an-accessible-chatbot/) -- MEDIUM confidence (verified against WCAG 2.2 criteria)
- [Web Chat accessibility considerations -- Craig Abbott](https://www.craigabbott.co.uk/blog/web-chat-accessibility-considerations/) -- MEDIUM confidence (accessibility practitioner with detailed WCAG mapping)
- [Confidence Visualization UI Patterns -- Agentic Design](https://agentic-design.ai/patterns/ui-ux-patterns/confidence-visualization-patterns) -- MEDIUM confidence (emerging pattern library)
- [Rethinking UX for conversational shopping -- Medium/Bootcamp](https://medium.com/design-bootcamp/rethinking-ux-for-conversational-shopping-83073ca09db3) -- MEDIUM confidence (design analysis with A/B test references)
- [AI Side Effect: Human Scope Creep -- Product Discovery Group](https://productdiscoverygroup.com/learn/ai-side-effect-human-scope-creep) -- MEDIUM confidence (industry observation)
- [Frontend in the Age of AI: How to Integrate LLM Agents Right into the UI -- Medium](https://medium.com/@ignatovich.dm/frontend-in-the-age-of-ai-how-to-integrate-llm-agents-right-into-the-ui-0514cd7a20fe) -- LOW confidence (single source, WebSearch only)
- [Change of Context vs Change of Content -- WCAG -- 216digital](https://216digital.com/wcag-basics-change-of-context-or-change-of-content/) -- HIGH confidence (direct WCAG criteria reference)
- [Empty states pattern -- Carbon Design System](https://carbondesignsystem.com/patterns/empty-states-pattern/) -- HIGH confidence (IBM official design system)
- Codebase direct analysis: `SearchResultsPage.tsx`, `AiModeContext.tsx`, `AiModePanel.tsx`, `mockAiService.ts`, `srpTypes.ts`, `srpFilterEngine.ts`, `marketInsightsEngine.ts`, `SearchResultsPage.module.css` -- HIGH confidence (primary source)

---
*Pitfalls research for: AI-Powered SRP Summary + Research Assistant (v10.0 Milestone)*
*Researched: 2026-03-03*
