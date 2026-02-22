# Codebase Concerns

**Analysis Date:** 2026-02-21

## Test Coverage Gaps

**No automated tests:**
- What's not tested: Zero test files in the project repository (excluding node_modules)
- Files: `app/src/App.tsx`, `components/PriceDistributionChart.tsx`
- Risk: Component behavior cannot be validated automatically; regressions undetected; refactoring risk high
- Priority: High

**No integration tests:**
- What's not tested: Component props interface, state management (price history toggle), gauge calculations
- Files: `components/PriceDistributionChart.tsx`
- Risk: Breaking changes to props API go undetected; numerical calculations for gauge segments untested
- Priority: High

**No unit tests for utility functions:**
- What's not tested: `formatPrice()` function edge cases; decimal handling; negative numbers; large numbers
- Files: `components/PriceDistributionChart.tsx` line 40-41
- Risk: Price formatting bugs in edge cases (e.g., $0, very large prices, null/undefined handling)
- Priority: Medium

## Fragile Areas

**Array index as React key:**
- Files: `components/PriceDistributionChart.tsx` line 192
- Issue: Using array index (`key={i}`) in `priceHistory.map()` violates React best practices
- Why fragile: If price history is reordered, filtered, or modified, React will incorrectly reuse DOM nodes/component state
- Safe modification: Use unique identifiers (e.g., `key={entry.date + entry.price}` or add an `id` field to `PriceHistoryEntry`)
- Test coverage: No tests to catch this mutation issue

**Unsafe DOM root access:**
- Files: `app/src/main.tsx` line 6
- Issue: `document.getElementById('root')!` uses non-null assertion without validation
- Why fragile: If `index.html` is modified and `root` element removed, app crashes with no error handling
- Safe modification: Add explicit error handling and fallback rendering
- Current code:
  ```typescript
  createRoot(document.getElementById('root')!).render(...)
  ```
- Recommended:
  ```typescript
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');
  createRoot(rootElement).render(...)
  ```

**Hardcoded test data in App component:**
- Files: `app/src/App.tsx` lines 7-15
- Issue: Component accepts props but renders with hardcoded example data
- Why fragile: Can't test with different price ranges; deal rating not dynamically determined
- Safe modification: Accept props from parent or query parameters; test with various rating scenarios

**Gauge calculation vulnerability to edge cases:**
- Files: `components/PriceDistributionChart.tsx` lines 83-103
- Issue: Padding calculation assumes `rangeMax > rangeMin` without validation
- Why fragile: If `rangeMin >= rangeMax`, calculation produces invalid percentages (negative or >100%)
- Risk: CSS layout breaks with negative/invalid width values
- Safe modification: Add validation: `if (rangeMax <= rangeMin) throw new Error("Invalid range")`

## Missing Critical Features

**No error boundary:**
- What's missing: Error boundary component to catch render errors
- Blocks: Any runtime error in `PriceDistributionChart` crashes entire app
- Files: `app/src/App.tsx`, `app/src/main.tsx`
- Priority: High

**No loading/error states:**
- What's missing: Component has no `loading` or `error` prop variants
- Blocks: Can't handle API failures or async price data
- Files: `components/PriceDistributionChart.tsx`
- Priority: Medium

**No accessibility features:**
- What's missing: ARIA labels for price gauges; tooltip on info icon not functional; form labels missing
- Files: `components/PriceDistributionChart.tsx` lines 119, 169
- Issue: Info icon (line 119) appears interactive but has no click handler
- Risk: Screen reader users cannot understand gauge semantics; non-keyboard navigable
- Priority: High

**Info icon not interactive:**
- What's missing: Tooltip/modal explanation when info icon clicked
- Files: `components/PriceDistributionChart.tsx` line 119
- Issue: Icon styled with `cursor: help` but no hover state or click handler defined
- Risk: User expectation mismatch; appears clickable but does nothing

## Performance Bottlenecks

**SVG icons recreated on every render:**
- Problem: `ChartIcon()`, `ChevronIcon()`, `TagIcon()` are function components redefined inline
- Files: `components/PriceDistributionChart.tsx` lines 48-70
- Cause: No memoization; SVG elements recreated at every render cycle
- Improvement path: Move to separate files or memoize with `React.memo()`; convert to constants if props-less

**No component memoization:**
- Problem: `PriceDistributionChart` re-renders on every parent update even if props unchanged
- Files: `components/PriceDistributionChart.tsx`
- Improvement path: Wrap with `React.memo()` and implement `useMemo()` for expensive calculations

**Gauge segment percentage recalculation on every render:**
- Problem: Lines 85-99 recalculate gauge segments even with unchanged props
- Files: `components/PriceDistributionChart.tsx`
- Improvement path: Move calculations to `useMemo()` with dependency array `[listPrice, rangeMin, rangeMax]`

## Tech Debt

**Manual style lookup objects instead of constants:**
- Issue: Three separate lookup objects (`RATING_LABELS`, `RATING_STYLES`, `MARKER_STYLES`)
- Files: `components/PriceDistributionChart.tsx` lines 19-38
- Maintenance burden: Adding new rating requires updating 3 places; no type safety linking labels to styles
- Fix approach: Create a single `RATINGS` constant with typed structure:
  ```typescript
  const RATINGS = {
    great: { label: 'great deal', ratingStyle: styles.ratingGreat, markerStyle: styles.markerGreat },
    good: { label: 'good deal', ratingStyle: styles.ratingGood, markerStyle: styles.markerGood },
    // ...
  } as const;
  ```

**Magic numbers throughout component:**
- Files: `components/PriceDistributionChart.tsx` lines 86, 94, 102, 103
- Issues: `0.3` (padding multiplier), `0.5` (fair range calculation), `2%`, `98%` (marker clamping)
- Impact: Difficult to understand intent; hard to modify scale proportions
- Fix approach: Define named constants at top of component

**Unused/unclear calculation for "great" rating:**
- Files: `components/PriceDistributionChart.tsx` lines 92-93
- Issue: `greatEnd` calculated but naming and usage unclear; "great" is not in deal rating options
- Context: Rating options are `'great' | 'good' | 'fair' | 'high'` (line 12) but `greatEnd` represents below-range (purple segment)
- Impact: Confusing semantics; "great" doesn't mean great deal in rating, but "great deal" label exists
- Fix approach: Rename gauge segment constants to reflect actual meaning (e.g., `belowRangeEnd`, `withinRangeEnd`, `aboveRangeStart`)

**CSS module class names not validated:**
- Files: `components/PriceDistributionChart.module.css`
- Issue: No TypeScript checking that referenced classes exist; typos only caught at runtime
- Improvement path: Use CSS-in-JS with type safety, or generate typed CSS module imports

**No prop validation or defaults:**
- Files: `components/PriceDistributionChart.tsx` lines 73-80
- Issue: Component accepts props but provides no runtime validation
- Risk: Invalid data (negative prices, invalid date strings) renders without warning
- Fix approach: Add Zod validation (dependency already exists in project dependencies) or prop-types

## Security Considerations

**Non-null assertion in root render:**
- Risk: Silent failure if HTML structure changes; no graceful degradation
- Files: `app/src/main.tsx` line 6
- Current mitigation: TypeScript compilation catches missing element type but not missing actual element
- Recommendations: Add runtime check with explicit error message

**No input validation on date strings:**
- Risk: If price history dates come from user input, malformed dates display without validation
- Files: `components/PriceDistributionChart.tsx` line 193 renders `entry.date` directly
- Impact: XSS unlikely (text content) but data integrity poor
- Recommendations: Validate date format on component mount; use Date object instead of string

**Direct inline SVG without sanitization:**
- Risk: If SVG paths become dynamic/user-supplied, XSS vulnerability
- Files: `components/PriceDistributionChart.tsx` lines 50-70
- Current mitigation: Hardcoded SVG paths, safe
- Recommendations: If paths ever become dynamic, use `dangerouslySetInnerHTML` with sanitizer library

## Scaling Limits

**Single component architecture:**
- Current capacity: Renders one chart per page
- Limit: If app scales to multiple price comparisons or dashboard view, no component composition pattern established
- Scaling path: Extract gauge visualization into separate component; create compound component pattern

**Hardcoded color mappings:**
- Current capacity: 4 deal rating types mapped to 4 colors
- Limit: Adding more price tiers or segmented ratings requires modifying component
- Scaling path: Move color configuration to theme/constants; accept rating metadata as prop

## Dependencies at Risk

**No data validation library used:**
- Risk: Component relies on TypeScript interfaces but zero runtime validation
- Files: `components/PriceDistributionChart.tsx` lines 4-17
- Impact: Invalid props accepted silently; bugs surface at render time
- Zod available in `app/package.json` but not used
- Migration plan: Integrate Zod validation at component entry point

**React 19.2.0 with minimal ecosystem support:**
- Risk: React Compiler not enabled (acknowledged in README); limited third-party library compatibility
- Files: `app/package.json` line 13
- Impact: No automatic performance optimizations from compiler
- Recommendation: If performance becomes critical, consider React Compiler adoption or manual optimization

## Known Issues

**Price history toggle default state:**
- Symptom: History always expands on page load (`historyOpen` initialized to `true` line 81)
- Files: `components/PriceDistributionChart.tsx` line 81
- Trigger: Any page load with `PriceDistributionChart`
- Workaround: Initialize to `false` if expanded state not desired by default
- Impact: Unexpected content visibility; takes up screen space on first render

**Marker position clamping logic:**
- Symptom: Marker always stays within 2%-98% of gauge even if price far outside range
- Files: `components/PriceDistributionChart.tsx` lines 101-103
- Trigger: When `listPrice` is very far below `rangeMin` or above `rangeMax`
- Workaround: Ensure input data keeps prices closer to range
- Impact: Visual misrepresentation of extreme prices; hides actual market position

**Missing responsive design:**
- Symptom: Fixed `max-width: 640px` in `App.tsx` line 6
- Files: `app/src/App.tsx` line 6
- Risk: Component may not display well on very small mobile screens (<320px) or very large desktop (>1920px)
- Priority: Medium

## Missing Type Safety

**String literal deal rating type used inconsistently:**
- Files: `components/PriceDistributionChart.tsx` lines 12, 26-30, 33-37
- Issue: Type `'great' | 'good' | 'fair' | 'high'` used but lookup objects must be manually kept in sync
- Risk: Typo in object key goes undetected; missing rating case silently returns `undefined`
- Fix: Use `as const` on RATING objects and enforce type narrowing

**No TypeScript strict mode for noUncheckedSideEffectImports:**
- Files: `app/tsconfig.app.json` line 25 has `noUncheckedSideEffectImports` enabled
- Issue: Vite plugin imports may have side effects undetected
- Impact: If plugin behavior changes unexpectedly, no warning
- Recommendations: Verify plugin side effects explicitly documented

---

*Concerns audit: 2026-02-21*
