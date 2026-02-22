# Technology Stack

**Analysis Date:** 2026-02-21

## Languages

**Primary:**
- TypeScript 5.9.3 - All source code and components (`/Users/adam/rv-marketplace/app/src`, `/Users/adam/rv-marketplace/components`)
- CSS/CSS Modules - Styling with module scoping (`/Users/adam/rv-marketplace/components/PriceDistributionChart.module.css`)

**Secondary:**
- JavaScript - Build tooling and configuration files

## Runtime

**Environment:**
- Node.js v24.13.1 (verified installation)

**Package Manager:**
- npm - Lockfile present at `/Users/adam/rv-marketplace/app/package-lock.json` (lockfileVersion 3)

## Frameworks

**Core:**
- React 19.2.0 - UI library
- React DOM 19.2.0 - React DOM rendering

**Build/Dev:**
- Vite 7.3.1 - Build tool and dev server
  - Config: `/Users/adam/rv-marketplace/app/vite.config.ts`
  - Includes @vitejs/plugin-react 5.1.1 for Fast Refresh with Babel

**Linting/Code Quality:**
- ESLint 9.39.1 - JavaScript/TypeScript linter
  - Config: `/Users/adam/rv-marketplace/app/eslint.config.js` (flat config)
  - @eslint/js 9.39.1 - Core ESLint rules
  - typescript-eslint 8.48.0 - TypeScript support
  - eslint-plugin-react-hooks 7.0.1 - React hooks rules
  - eslint-plugin-react-refresh 0.4.24 - React refresh validation

## Key Dependencies

**Runtime:**
- react 19.2.0 - Core React framework
- react-dom 19.2.0 - React DOM bindings

**Development/Build:**
- TypeScript 5.9.3 - Language and type checking
- Vite 7.3.1 - Fast build tooling and dev server
- @vitejs/plugin-react 5.1.1 - React integration for Vite
- ESLint ecosystem (9.39.1+) - Code quality enforcement
- globals 16.5.0 - ESLint globals helper

**Type Definitions:**
- @types/react 19.2.7
- @types/react-dom 19.2.3
- @types/node 24.10.1

## Configuration

**TypeScript:**
- Root config: `/Users/adam/rv-marketplace/app/tsconfig.json`
- App config: `/Users/adam/rv-marketplace/app/tsconfig.app.json`
  - Target: ES2022
  - Module: ESNext
  - JSX: react-jsx
  - Strict mode enabled
  - Includes: `src` and `../components`
- Node config: `/Users/adam/rv-marketplace/app/tsconfig.node.json`

**Build:**
- Vite config: `/Users/adam/rv-marketplace/app/vite.config.ts`
  - Path alias: `@components` → `../components`
  - React plugin enabled

**ESLint:**
- Config: `/Users/adam/rv-marketplace/app/eslint.config.js`
  - Extends: js.recommended, tseslint.recommended, react-hooks.recommended, react-refresh.vite
  - Files: `**/*.{ts,tsx}`
  - Language: ECMAScript 2020
  - Globals: browser

**Environment:**
- No .env file present - No environment-specific configuration detected
- Static configuration only

## Platform Requirements

**Development:**
- Node.js 24.13.1 (verified)
- npm (with package-lock.json support)
- TypeScript compiler (installed via devDependency)

**Production:**
- Static hosting capable (Vite SPA output)
- Build output: `dist/` directory
- Entry point: `index.html` at `/Users/adam/rv-marketplace/app/index.html`

## Build & Runtime Scripts

**Available npm scripts** (from `/Users/adam/rv-marketplace/app/package.json`):
```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript check + Vite build
npm run lint     # Run ESLint
npm run preview  # Preview built output
```

---

*Stack analysis: 2026-02-21*
