# Coding Conventions

**Analysis Date:** 2026-02-21

## Naming Patterns

**Files:**
- PascalCase for React components: `PriceDistributionChart.tsx`
- Lowercase for utility/config files: `main.tsx`, `vite.config.ts`
- `.module.css` suffix for scoped CSS modules: `PriceDistributionChart.module.css`
- `tsconfig*.json` pattern for TypeScript configurations

**Functions:**
- camelCase for regular functions: `formatPrice()`, `setHistoryOpen()`
- PascalCase for React functional components: `PriceDistributionChart()`, `ChartIcon()`, `InfoIcon()`
- Handler functions follow `on*` pattern for event handlers: `onClick={() => setHistoryOpen((prev) => !prev)}`

**Variables:**
- camelCase for local variables and constants: `historyOpen`, `rangeMin`, `rangeMax`, `listPrice`
- UPPERCASE_SNAKE_CASE for constant lookup tables and mappings: `RATING_LABELS`, `RATING_STYLES`, `MARKER_STYLES`
- Destructured parameter names preserve their camelCase form: `{ listPrice, dealRating, rangeMin, rangeMax }`

**Types:**
- PascalCase for interface names: `PriceHistoryEntry`, `PriceDistributionChartProps`
- Interfaces used for component props end with `Props` suffix: `PriceDistributionChartProps`
- String literal unions for finite type options: `dealRating: 'great' | 'good' | 'fair' | 'high'`

## Code Style

**Formatting:**
- Enforced by ESLint with flat config system (`eslint.config.js`)
- No explicit Prettier configuration; relies on ESLint defaults
- 2-space indentation (standard for Vite + React setup)
- Semicolons required (TypeScript default)

**Linting:**
- ESLint 9.39.1 with flat config format
- Extends: `js.configs.recommended`, `tseslint.configs.recommended`, `reactHooks.configs.flat.recommended`, `reactRefresh.configs.vite`
- TypeScript ESLint for type-aware linting
- React Hooks ESLint plugin for hook compliance checking
- React Refresh ESLint plugin for fast refresh validation
- ESLint config file: `app/eslint.config.js`

**TypeScript Settings:**
- Target: ES2022 (app), ES2023 (build tools)
- Strict mode enabled: `"strict": true`
- No unused locals: `"noUnusedLocals": true`
- No unused parameters: `"noUnusedParameters": true`
- No fallthrough cases: `"noFallthroughCasesInSwitch": true`
- All warnings treated as errors in build

## Import Organization

**Order:**
1. External library imports: `import { useState } from 'react'`
2. Path alias imports: `import PriceDistributionChart from '@components/PriceDistributionChart'`
3. Relative style imports: `import styles from './PriceDistributionChart.module.css'`
4. CSS imports: `import './App.css'`

**Path Aliases:**
- `@components` → `../components` (configured in `vite.config.ts`)
- Used for cross-directory component imports to avoid relative path chains

## Error Handling

**Patterns:**
- No explicit error handling implemented in components; React ErrorBoundary not used
- Type safety via TypeScript interfaces prevents many runtime errors
- Strict TypeScript compilation flags catch undefined/null issues at compile time
- No try/catch blocks present in current codebase; functional approach to data validation

## Logging

**Framework:** None - uses native `console` object only

**Patterns:**
- No logging visible in component code
- Recommendation: Use console only for development; remove for production

## Comments

**When to Comment:**
- Used for calculation explanations: `// Calculate gauge proportions`, `// Marker position (clamped to 2%–98% for visual)`
- Used for section demarcation: `// ── Deal Verdict ──`, `// ── Gauge Bar ──`, `// ── Price History ──`
- Sparse use; code is generally self-documenting through function names and type annotations

**JSDoc/TSDoc:**
- Not used in current codebase
- Function parameters documented via TypeScript interfaces instead

## Function Design

**Size:**
- Prefer small, single-purpose functions: `formatPrice()` (2 lines), `InfoIcon()` (2 lines)
- Main component function acceptable at ~140 lines due to DOM structure complexity
- Helper/utility functions extracted as separate functions

**Parameters:**
- Use destructured objects for multiple parameters: `{ listPrice, dealRating, rangeMin, rangeMax, explanation, priceHistory }`
- Avoid positional parameters when 3+ arguments needed
- Component props always destructured in function signature

**Return Values:**
- React components return JSX directly
- Utility functions return simple values: `string` from `formatPrice()`, JSX from icon components
- No void returns except event handlers

## Module Design

**Exports:**
- Default exports for main components: `export default function PriceDistributionChart()`
- Default exports for utility functions: `export default App`
- Named exports not used; default exports are the pattern

**Barrel Files:**
- Not implemented; no `index.ts` files for re-exports
- Direct imports from component files: `import PriceDistributionChart from '@components/PriceDistributionChart'`

---

*Convention analysis: 2026-02-21*
