# Requirements: RV Marketplace v10.0 — AI-Powered SRP Summary

**Defined:** 2026-03-03
**Core Value:** Give buyers instant, data-grounded market intelligence on every search — stats, narrative, and conversational research — so they can make informed decisions without leaving the SRP.

## v1 Requirements

Requirements for v10.0 milestone. Each maps to roadmap phases.

### Summary Data Layer

- [x] **SUMM-01**: SRP summary engine computes headline stats (listing count, median price, price trend, avg DOM) from filtered listing array
- [x] **SUMM-02**: Engine computes price distribution histogram bins from filtered results
- [x] **SUMM-03**: Engine computes deal quality breakdown (great/good/fair/above market counts) from filtered results
- [x] **SUMM-04**: Engine assigns confidence tier (full/medium/low/insufficient) based on result count thresholds (50/10/3)
- [x] **SUMM-05**: Engine generates AI narrative (2-3 sentences) via template interpolation grounded in computed stats
- [x] **SUMM-06**: Narrative adapts tone based on search context type (broad/filtered/narrow/price-focused/low-results)

### Summary Card UI

- [x] **CARD-01**: User sees a headline stat bar with 3-4 key metrics (listing count, median price, trend, avg DOM) above the SRP results
- [x] **CARD-02**: User sees an AI-generated narrative paragraph below the stat bar summarizing the current search
- [ ] **CARD-03**: User can expand a detail panel below the narrative to see charts and deeper analysis
- [ ] **CARD-04**: Detail panel shows a price distribution histogram for the current search results
- [ ] **CARD-05**: Detail panel shows a deal quality breakdown (great/good/fair/above market distribution)
- [ ] **CARD-06**: Detail panel shows a 6-month price trend chart (simulated time-series data)
- [x] **CARD-07**: Summary card renders with confidence-gated content — full card at 50+ results, reduced at 10-49, stat bar only at 3-9, hidden at <3
- [x] **CARD-08**: Every data claim shows a grounding indicator (e.g., "Based on 24 listings matching your search")
- [x] **CARD-09**: Card shows "Updated {date}" timestamp below narrative

### Assistant Data Layer

- [x] **ASST-01**: Mock assistant service accepts a query + search context and returns typed responses (text/comparison/listing/action)
- [x] **ASST-02**: Assistant responses interpolate real search data (result count, price range, top makes, median) — responses change when filters change
- [x] **ASST-03**: Mock service classifies queries into categories (market-overview, price-analysis, type-comparison, deal-quality, recommendation) via keyword matching
- [x] **ASST-04**: Mock service enforces guardrails — no purchase recommendations, no price predictions, no dealer commentary; out-of-scope queries get graceful redirect

### Assistant UI

- [ ] **CHAT-01**: User sees a chat input bar with placeholder text ("Ask about these results...") below the summary card
- [x] **CHAT-02**: User sees 3-5 contextual prompt chip suggestions below the input (adapt to search context)
- [ ] **CHAT-03**: User can type a question and receive a text response grounded in search data
- [ ] **CHAT-04**: Assistant can return comparison table responses for "Compare X vs Y" queries (side-by-side data)
- [ ] **CHAT-05**: Assistant can return embedded mini listing cards in responses when referencing specific listings
- [ ] **CHAT-06**: Assistant can return action responses with "Apply filter" / "Sort by" buttons that modify the actual SRP
- [ ] **CHAT-07**: Conversation maintains context within the current session (user can scroll back through messages)
- [x] **CHAT-08**: Prompt chips evolve after each turn based on conversation context

### Assistant Layout

- [ ] **LAYT-01**: On desktop, clicking the chat input or a chip opens an overlay side panel for the conversation (listings remain visible)
- [ ] **LAYT-02**: On mobile, a FAB (floating action button) triggers a bottom sheet for the conversation
- [ ] **LAYT-03**: Side panel shows full conversation thread with input at the bottom
- [ ] **LAYT-04**: Bottom sheet is draggable (half-screen default, swipe to full, swipe down to dismiss)

### Responsive Behavior

- [x] **RESP-01**: Desktop (1024px+): full-width summary card between search bar and first listing row, stat bar + narrative visible by default
- [x] **RESP-02**: Tablet (768-1023px): stat bar wraps to 2x2 grid, narrative visible, detail panel collapsed
- [x] **RESP-03**: Mobile (<768px): collapsed single-line ("247 listings - Median $62,400 - Prices down 4%"), tap to expand
- [x] **RESP-04**: User can dismiss the summary card; preference persists in sessionStorage (returns on next visit)
- [x] **RESP-05**: Dismissed state shows subtle "View market insights" link; resets on new session
- [ ] **RESP-06**: Assistant responses render with typewriter effect (character-by-character reveal)

### Accessibility

- [x] **A11Y-01**: Summary card has `role="region"` with `aria-label="Market insights for your search"`
- [x] **A11Y-02**: Expand/collapse uses `aria-expanded` and `aria-controls`
- [x] **A11Y-03**: All stats have sr-only context labels ("Median asking price: $62,400" not just "$62,400")
- [ ] **A11Y-04**: Charts have text summary via sr-only or accessible data table fallback
- [x] **A11Y-05**: Trend arrows use direction + color (not color alone) for accessibility
- [ ] **A11Y-06**: All interactive elements are keyboard-accessible (tab navigation)
- [ ] **A11Y-07**: Chat conversation thread has `role="log"` with ARIA live region for new messages
- [ ] **A11Y-08**: Respects `prefers-reduced-motion` for typewriter and expand animations

## Future Requirements

Deferred to future milestone. Tracked but not in current roadmap.

### Enhancement

- **ENH-01**: Multi-turn context tracking across page reloads (requires persistence layer)
- **ENH-02**: Personalized returning user delta ("14 new listings since your last visit")
- **ENH-03**: Regional comparison module (local vs neighboring states)
- **ENH-04**: Seasonal timing guide (12-month seasonality chart)
- **ENH-05**: Inventory trend sparkline (3-6mo levels)
- **ENH-06**: VDP-level assistant integration ("Is this a good price?" on listing detail page)
- **ENH-07**: Voice input for assistant queries
- **ENH-08**: A/B test framework (control vs stat-only vs full AI)

### Integration

- **INTG-01**: Real LLM integration for narrative generation (replace templates with Claude API)
- **INTG-02**: Real LLM integration for assistant responses
- **INTG-03**: SSI registration data integration for trend accuracy
- **INTG-04**: Analytics event tracking (srp_summary_viewed, srp_assistant_query, etc.)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Purchase recommendations ("you should buy this") | Creates liability; anti-feature per research |
| Price predictions ("prices will drop") | Speculative; erodes trust; no marketplace ships this |
| Negotiation coaching | Adversarial to dealers; legal exposure |
| Real LLM API calls | Scope explosion; mock approach achieves UX demo goal |
| Dealer-specific commentary | Legal liability; even competitors avoid this |
| User authentication / history | Frontend-only demo; no persistence layer |
| AI-surfaced "recommended" listing row | Decided to keep summary as stats/narrative only |
| Entry-point-adaptive narrative | Same experience regardless of Google vs homepage arrival |
| Server-side rendering of summary | SPA-only constraint |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SUMM-01 | Phase 56 | Complete |
| SUMM-02 | Phase 56 | Complete |
| SUMM-03 | Phase 56 | Complete |
| SUMM-04 | Phase 56 | Complete |
| SUMM-05 | Phase 56 | Complete |
| SUMM-06 | Phase 56 | Complete |
| CARD-01 | Phase 57 | Complete |
| CARD-02 | Phase 57 | Complete |
| CARD-03 | Phase 60 | Pending |
| CARD-04 | Phase 60 | Pending |
| CARD-05 | Phase 60 | Pending |
| CARD-06 | Phase 60 | Pending |
| CARD-07 | Phase 57 | Complete |
| CARD-08 | Phase 57 | Complete |
| CARD-09 | Phase 57 | Complete |
| ASST-01 | Phase 58 | Complete |
| ASST-02 | Phase 58 | Complete |
| ASST-03 | Phase 58 | Complete |
| ASST-04 | Phase 58 | Complete |
| CHAT-01 | Phase 58 | Pending |
| CHAT-02 | Phase 58 | Complete |
| CHAT-03 | Phase 59 | Pending |
| CHAT-04 | Phase 59 | Pending |
| CHAT-05 | Phase 59 | Pending |
| CHAT-06 | Phase 59 | Pending |
| CHAT-07 | Phase 59 | Pending |
| CHAT-08 | Phase 58 | Complete |
| LAYT-01 | Phase 59 | Pending |
| LAYT-02 | Phase 59 | Pending |
| LAYT-03 | Phase 59 | Pending |
| LAYT-04 | Phase 59 | Pending |
| RESP-01 | Phase 57 | Complete |
| RESP-02 | Phase 57 | Complete |
| RESP-03 | Phase 57 | Complete |
| RESP-04 | Phase 57 | Complete |
| RESP-05 | Phase 57 | Complete |
| RESP-06 | Phase 59 | Pending |
| A11Y-01 | Phase 57 | Complete |
| A11Y-02 | Phase 57 | Complete |
| A11Y-03 | Phase 57 | Complete |
| A11Y-04 | Phase 60 | Pending |
| A11Y-05 | Phase 57 | Complete |
| A11Y-06 | Phase 59 | Pending |
| A11Y-07 | Phase 59 | Pending |
| A11Y-08 | Phase 59 | Pending |

**Coverage:**
- v1 requirements: 45 total (7 categories)
- Mapped to phases: 45
- Unmapped: 0

**Phase distribution:**
- Phase 56: 6 requirements (SUMM-01 through SUMM-06)
- Phase 57: 14 requirements (CARD-01, CARD-02, CARD-07, CARD-08, CARD-09, RESP-01 through RESP-05, A11Y-01, A11Y-02, A11Y-03, A11Y-05)
- Phase 58: 7 requirements (ASST-01 through ASST-04, CHAT-01, CHAT-02, CHAT-08)
- Phase 59: 13 requirements (CHAT-03 through CHAT-07, LAYT-01 through LAYT-04, RESP-06, A11Y-06, A11Y-07, A11Y-08)
- Phase 60: 5 requirements (CARD-03 through CARD-06, A11Y-04)

---
*Requirements defined: 2026-03-03*
*Last updated: 2026-03-03 after roadmap creation -- all 45 requirements mapped to phases*
