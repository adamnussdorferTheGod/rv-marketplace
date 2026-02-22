# External Integrations

**Analysis Date:** 2026-02-21

## APIs & External Services

**Not detected** - No external API integrations found in codebase.

This is a client-side React application with no API calls, SDKs, or external service integrations. All data is passed as props to components.

## Data Storage

**Databases:**
- Not detected - No database connections or ORM usage

**File Storage:**
- Local filesystem only - No cloud storage integration

**Caching:**
- Browser runtime cache only - No external caching service

## Authentication & Identity

**Auth Provider:**
- None - Not implemented

This is a static component showcase application with no user authentication.

## Monitoring & Observability

**Error Tracking:**
- None - Not implemented

**Logs:**
- Browser console only - No external logging service

## CI/CD & Deployment

**Hosting:**
- Not configured - Ready for static hosting

**CI Pipeline:**
- None configured - Manual build only

## Environment Configuration

**Required env vars:**
- None - Application has no environment dependencies

**Configuration approach:**
- Static TypeScript configuration only
- No runtime configuration or secrets

## Data Flow & Component Communication

**Data Passing:**
- Props-based only
- Example from `/Users/adam/rv-marketplace/app/src/App.tsx`:
  ```typescript
  <PriceDistributionChart
    listPrice={18998}
    dealRating="fair"
    rangeMin={15297}
    rangeMax={17590}
    explanation="This vehicle is above the current average market range."
    priceHistory={[
      { date: '02/10/26', change: 'Listed', price: 18998 },
    ]}
  />
  ```

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Component Interfaces

**PriceDistributionChart** (at `/Users/adam/rv-marketplace/components/PriceDistributionChart.tsx`):
- Accepts: `listPrice`, `dealRating`, `rangeMin`, `rangeMax`, `explanation`, `priceHistory`
- No external calls or side effects beyond React state management

## Third-Party CDNs or Resources

**Static Assets:**
- Vite assets only - No external CDN dependencies
- SVG icons - Inline in component code

---

*Integration audit: 2026-02-21*
