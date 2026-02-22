# Architecture

**Analysis Date:** 2026-02-21

## Pattern Overview

**Overall:** Single-Page Application (SPA) with component-based architecture

**Key Characteristics:**
- React 19 frontend built with Vite
- Type-safe development with TypeScript
- CSS Modules for scoped styling
- Shared component library in separate directory
- Client-side state management via React hooks
- No backend API layer currently implemented

## Layers

**Presentation Layer:**
- Purpose: Render UI and handle user interactions
- Location: `app/src/`, `components/`
- Contains: React components, page layouts, and styling
- Depends on: React, CSS modules
- Used by: Browser DOM renderer

**Component Layer:**
- Purpose: Reusable UI components shared across pages
- Location: `components/`
- Contains: Stateful and stateless component implementations with CSS Modules
- Depends on: React hooks (useState), standard library
- Used by: Page components in `app/src/`

**Styling Layer:**
- Purpose: Define visual appearance with design system variables
- Location: `components/*.module.css`, `app/src/*.css`
- Contains: CSS Modules for component scoping, global styles
- Depends on: CSS custom properties (CSS variables)
- Used by: React components via className bindings

## Data Flow

**Component State Flow:**

1. User interaction (click, expand/collapse)
2. Event handler in component (e.g., `setHistoryOpen`)
3. State update via `useState` hook
4. Component re-render with new state
5. UI reflects new state

**Example - Price History Expansion:**

1. User clicks price history toggle button in `PriceDistributionChart`
2. `onClick` handler calls `setHistoryOpen(prev => !prev)`
3. Component re-renders with `historyOpen` state toggled
4. `{historyOpen && <div>...history content...</div>}` conditionally renders

**Property Flow:**

1. Parent component (`App.tsx`) passes props to `PriceDistributionChart`
2. Props include: `listPrice`, `dealRating`, `rangeMin`, `rangeMax`, `explanation`, `priceHistory`
3. Component destructures and validates via TypeScript interfaces
4. Props flow into calculations and render logic

**State Management:**
- Client-side state only: `useState` hook for UI state (expandable sections)
- No global state management library (Redux, Zustand, Context)
- Props drilling for parent-to-child communication
- No server state synchronization

## Key Abstractions

**PriceDistributionChart Component:**
- Purpose: Display vehicle pricing analysis with gauge visualization
- Examples: `components/PriceDistributionChart.tsx`
- Pattern: Functional component with TypeScript interface props
- Responsibilities:
  - Calculate gauge segment proportions based on price range
  - Render color-coded pricing zones (great/good/fair/high)
  - Display price marker position on gauge
  - Manage price history expansion state
  - Format currency values

**Icon Components:**
- Purpose: Reusable SVG icon abstractions
- Examples: `InfoIcon`, `ChartIcon`, `ChevronIcon`, `TagIcon` in `PriceDistributionChart.tsx`
- Pattern: Functional components returning JSX
- Usage: Embedded within `PriceDistributionChart` for visual affordances

**Style Mapping Objects:**
- Purpose: Dynamic CSS class selection based on data
- Examples: `RATING_LABELS`, `RATING_STYLES`, `MARKER_STYLES` in `PriceDistributionChart.tsx`
- Pattern: Record types mapping string keys to CSS class names or display text
- Benefit: Centralized style/label management, type-safe lookups

## Entry Points

**Browser Entry Point:**
- Location: `app/index.html`
- Triggers: Browser loads page
- Responsibilities: Define HTML structure, load React root

**React Root:**
- Location: `app/src/main.tsx`
- Triggers: `<script type="module" src="/src/main.tsx"></script>` in index.html
- Responsibilities: Create React DOM root, render App component in StrictMode

**Application Root:**
- Location: `app/src/App.tsx`
- Triggers: React root mounts
- Responsibilities: Instantiate PriceDistributionChart with props, set page layout

## Error Handling

**Strategy:** No error boundary or error handling implemented

**Patterns:**
- TypeScript strict mode prevents null/undefined errors at compile time
- No try-catch blocks
- No error boundaries for runtime failures
- No fallback UI for missing data

## Cross-Cutting Concerns

**Logging:** No logging framework implemented

**Validation:**
- TypeScript interface-based at compile time
- `Record<string, string>` type safety for label/style mappings
- No runtime validation (no Zod, Joi, or similar)

**Authentication:** Not applicable (no backend)

**Styling:**
- CSS Modules prevent class name collisions
- CSS custom properties for design tokens
- Responsive design via flexbox and absolute positioning
