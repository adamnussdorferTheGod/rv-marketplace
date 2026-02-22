# Testing Patterns

**Analysis Date:** 2026-02-21

## Test Framework

**Runner:**
- Not configured - no testing framework installed
- No test framework dependencies in `app/package.json`

**Assertion Library:**
- None installed

**Run Commands:**
- No test commands defined in package.json
- Only `dev`, `build`, `lint`, and `preview` scripts available

## Test File Organization

**Location:**
- No test files detected in codebase
- No `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` files present

**Naming:**
- Not applicable - no tests implemented

**Structure:**
- Not applicable - no tests implemented

## Test Structure

**Suite Organization:**
- Not applicable - testing framework not configured

**Patterns:**
- Not applicable - testing framework not configured

## Mocking

**Framework:**
- Not used - no testing framework present

**Patterns:**
- Not applicable

**What to Mock:**
- Not applicable

**What NOT to Mock:**
- Not applicable

## Fixtures and Factories

**Test Data:**
- Not used - no test framework

**Location:**
- Not applicable

## Coverage

**Requirements:**
- No coverage requirements configured
- No coverage tools installed

**View Coverage:**
- Not available - no test runner configured

## Test Types

**Unit Tests:**
- Not implemented

**Integration Tests:**
- Not implemented

**E2E Tests:**
- Not implemented
- No Cypress, Playwright, or other E2E framework installed

## Recommendations for Adding Tests

**Framework Selection:**
- Recommended: Vitest (lightweight, Vite-native, TypeScript-first)
- Alternative: Jest (more mature ecosystem, larger bundle)

**Setup Steps:**
1. Install testing framework: `npm install -D vitest @vitest/ui`
2. Install React testing utilities: `npm install -D @testing-library/react @testing-library/dom`
3. Create `vitest.config.ts` in `app/` directory
4. Add test configuration to `tsconfig.app.json` with `"types": ["vitest/globals"]`
5. Add test script to `package.json`: `"test": "vitest"`

**Test File Placement:**
- Co-locate tests with components: `PriceDistributionChart.test.tsx` next to `PriceDistributionChart.tsx`
- Place utility tests alongside utilities

**Testing Priority Areas:**
- `components/PriceDistributionChart.tsx` - Main component with complex calculation logic
  - Test gauge position calculations: rangeMin, rangeMax, marker positioning
  - Test state management: historyOpen toggle
  - Test formatting: price display with proper localization
  - Test conditional rendering: history section visibility

- `app/src/App.tsx` - Props passing to child component
  - Test component renders with expected props
  - Test component integration

**Common Patterns to Implement:**

```typescript
// Component rendering test
describe('PriceDistributionChart', () => {
  it('renders with provided props', () => {
    const props = {
      listPrice: 18998,
      dealRating: 'fair',
      rangeMin: 15297,
      rangeMax: 17590,
      explanation: 'Test explanation',
      priceHistory: [{ date: '02/10/26', change: 'Listed', price: 18998 }],
    };
    // render component and assert
  });
});
```

```typescript
// State management test
describe('History toggle', () => {
  it('toggles history section visibility', () => {
    // render component
    // click toggle button
    // assert visibility changes
  });
});
```

```typescript
// Utility function test (once isolated)
describe('formatPrice', () => {
  it('formats number as currency string', () => {
    expect(formatPrice(18998)).toBe('$18,998');
  });
});
```

---

*Testing analysis: 2026-02-21*
