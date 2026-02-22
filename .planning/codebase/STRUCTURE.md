# Codebase Structure

**Analysis Date:** 2026-02-21

## Directory Layout

```
rv-marketplace/
├── app/                           # Main Vite application
│   ├── src/                       # Application source code
│   │   ├── main.tsx               # React root entry point
│   │   ├── App.tsx                # Main app component
│   │   ├── App.css                # App-level styles
│   │   ├── index.css              # Global styles
│   │   └── assets/                # Static assets (icons, images)
│   ├── public/                    # Public static files
│   │   └── vite.svg               # Vite logo
│   ├── index.html                 # HTML entry point
│   ├── package.json               # NPM dependencies
│   ├── tsconfig.json              # TypeScript root config
│   ├── tsconfig.app.json          # TypeScript app config
│   ├── tsconfig.node.json         # TypeScript Node config
│   ├── vite.config.ts             # Vite build configuration
│   ├── eslint.config.js           # ESLint configuration
│   └── node_modules/              # Dependencies (gitignored)
├── components/                    # Shared component library
│   ├── PriceDistributionChart.tsx # Main pricing chart component
│   └── PriceDistributionChart.module.css # Component styles
├── reference/                     # Reference materials
├── .planning/                     # GSD planning artifacts
│   └── codebase/                  # This directory
├── .claude/                       # Claude configuration
├── COMPONENTS_RV.md               # Component documentation
├── DESIGN_SYSTEM.md               # Design system specification
├── THEME_RV.md                    # Theme/color definitions
└── preview.html                   # HTML preview
```

## Directory Purposes

**app/**
- Purpose: Main Vite application and build artifacts
- Contains: TypeScript source, HTML entry point, configuration, dependencies
- Key files: `src/main.tsx`, `src/App.tsx`, `index.html`, `package.json`

**app/src/**
- Purpose: React application source code
- Contains: Page/app components, styles, and assets
- Key files: `main.tsx` (root), `App.tsx` (app component)

**components/**
- Purpose: Shared, reusable React components
- Contains: Component implementations with CSS Modules
- Key files: `PriceDistributionChart.tsx` and its styles

**reference/**
- Purpose: Reference materials and documentation
- Contains: Design specs, brand guidelines, component catalogs

**.planning/codebase/**
- Purpose: GSD mapper output - architecture and conventions documentation
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, etc.

## Key File Locations

**Entry Points:**
- `app/index.html`: HTML document root - loads Vite script
- `app/src/main.tsx`: React app initialization - creates DOM root and renders App
- `app/src/App.tsx`: Top-level React component - renders PriceDistributionChart

**Configuration:**
- `app/package.json`: NPM dependencies (React, Vite, TypeScript, ESLint)
- `app/vite.config.ts`: Vite build config with `@components` alias
- `app/tsconfig.app.json`: TypeScript compiler settings (ES2022, React JSX, strict mode)
- `app/eslint.config.js`: ESLint rules (recommended + React hooks + refresh)

**Core Logic:**
- `components/PriceDistributionChart.tsx`: Pricing gauge visualization and price history
- `components/PriceDistributionChart.module.css`: Component styling

**Styling:**
- `app/src/index.css`: Global styles (font family, colors, reset)
- `app/src/App.css`: App layout styles
- `components/PriceDistributionChart.module.css`: Scoped component styles

## Naming Conventions

**Files:**
- Components: PascalCase for `.tsx` files (e.g., `PriceDistributionChart.tsx`)
- Styles: Matching component name + `.module.css` for CSS Modules
- Styles: Component name + `.css` for global/app styles
- Config: Lowercase with dots or dashes (e.g., `vite.config.ts`, `tsconfig.app.json`)

**Directories:**
- Feature/component directories: camelCase (e.g., `components`)
- Project directories: lowercase or abbreviated (e.g., `app`, `src`, `public`)

**TypeScript/React Conventions:**
- Components: Named exports as PascalCase functions
- Interfaces: PascalCase suffixed with `Props` (e.g., `PriceDistributionChartProps`)
- Constants: UPPER_SNAKE_CASE (e.g., `RATING_LABELS`, `RATING_STYLES`)
- Functions: camelCase (e.g., `formatPrice`)
- React Hooks: camelCase prefixed with `use` (e.g., `useState`)

## Where to Add New Code

**New Feature:**
- Primary code: `components/` (if reusable UI) or `app/src/` (if page-specific)
- Styles: Co-located `.module.css` file in same directory
- Tests: Not currently implemented

**New Component/Module:**
- Implementation: `components/FileName.tsx` for reusable components
- Styling: `components/FileName.module.css` with matching name
- Import in consuming component: `import Component from '@components/FileName'`

**Utilities:**
- Shared helpers: Create in `app/src/utils/` or within component file if single-use
- Example: `formatPrice()` utility currently inline in `PriceDistributionChart.tsx`

**Styling:**
- Global styles: `app/src/index.css` for CSS resets and design tokens
- Component styles: Always use CSS Modules (`.module.css`) for encapsulation
- Design variables: CSS custom properties (e.g., `--rv-surface`, `--color-green-200`)

## Special Directories

**app/node_modules/**
- Purpose: NPM package dependencies
- Generated: Yes (created by npm install)
- Committed: No (listed in .gitignore)

**app/public/**
- Purpose: Static assets served directly by web server
- Contains: Images, favicons, and other static files
- Generated: No
- Committed: Yes

**.planning/codebase/**
- Purpose: GSD mapper documentation output
- Generated: Yes (by /gsd:map-codebase command)
- Committed: Yes (version controlled)

**reference/**
- Purpose: Design specs and reference materials
- Contains: DESIGN_SYSTEM.md, THEME_RV.md, COMPONENTS_RV.md
- Generated: No (manually created)
- Committed: Yes
