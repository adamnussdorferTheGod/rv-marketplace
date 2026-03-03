# Feature Research: Market Insights for RV Marketplace VDP

**Domain:** Buyer-facing marketplace pricing intelligence (deal badges, market summary cards, supply/demand, seasonal timing, price drop alerts)
**Researched:** 2026-03-02
**Confidence:** MEDIUM-HIGH (competitor analysis via web search and official sources; RV-specific data from RV Trader and industry reports; automotive marketplace patterns from CarGurus, KBB/Autotrader well-documented)

## Context

This research maps the feature landscape for v9.0 Market Insights — adding pricing intelligence cards to the existing VDP. The project is a **frontend-only** demo: all data is computed algorithmically from ~80 sample listings already in the codebase. No real APIs. The goal is to show what table-stakes vs. differentiating features look like in this domain, so implementation phases are scoped correctly.

### Competitive Landscape Analyzed

| Platform | Pricing Intelligence Approach | Key Insight |
|----------|-------------------------------|-------------|
| **CarGurus** | Deal rating badge (Great/Good/Fair/High/Overpriced) vs. Instant Market Value (IMV). Daily algorithmic calculation from millions of listings. | 80% of CarGurus shoppers won't buy without transparent pricing data. Deal rating is the single strongest predictor of buyer interest. |
| **KBB / Autotrader** | "Good Price" / "Great Price" badge comparing listing to Fair Market Range. Range and FPP updated weekly, adjusted for 100+ regional markets. | Buyers filter search results by Good/Great Price. FMR displayed on both SRP and VDP. |
| **Edmunds** | True Market Value (TMV) with Fair, Below Market, Above Market ratings. Less prominent badge, more emphasis on transaction data. | TMV is well-regarded for accuracy; less emotionally engaging than CarGurus color-coding. |
| **Carvana** | No deal badge — fixed "no-haggle" pricing. Offers "Value Tracker" for owners estimating their vehicle's current market value. | Trust through transparency + no-haggle, not through comparative ratings. Different approach for inventory-owner models. |
| **Zillow** (real estate parallel) | "Price cut" badge with dollar amount + %; "Days on Zillow" displayed prominently; market heat indicators. | 26% of listings had price cuts in 2024 — badge normalizes the signal and communicates urgency. |
| **RV Trader** | Dealer-only pricing tools (Price to Market Index, Scarcity Index). **No buyer-facing deal badges or market insight cards exist yet.** NADA/J.D. Power values available as a lookup, not surfaced inline on VDPs. | Gap in the market — RV buyers have no equivalent to CarGurus deal ratings when shopping on RVTrader.com. |

**Key finding:** Buyer-facing pricing intelligence is table stakes on automotive platforms but has not reached the RV marketplace. Building these features on an RV VDP is differentiated *within the RV vertical* even though it mirrors established automotive patterns.

---

## Table Stakes (Users Expect These)

These features are standard on CarGurus, KBB, and Autotrader. Any buyer who has shopped for a car in the last 5 years expects them. Missing these makes the market insights section feel incomplete.

| # | Feature | Why Expected | Complexity | Notes |
|---|---------|--------------|------------|-------|
| T1 | **Deal Quality Badge** | CarGurus established the color-coded deal badge as the primary pricing signal. KBB/Autotrader has Good/Great Price. 80% of car shoppers now expect this at-a-glance verdict. Without it, buyers do their own math or leave for a platform that does it for them. | LOW | Badge with 5 tiers: Great Deal / Good Deal / Fair Price / High Price / Overpriced. Color-coded (green to red spectrum). Positioned near the listing price. Compare listing price to computed median for comparable listings in dataset. |
| T2 | **Market Value Reference** | The deal badge is meaningless without showing what the market considers fair. KBB shows the Fair Market Range. CarGurus shows IMV. Buyers need an anchor to evaluate the badge. | LOW | Display computed median price for comparable units ("Market avg: $X"). Comparables = same RV type + similar year range + similar condition. Derive from ~80 listing dataset. |
| T3 | **Price Drop Alert** | Zillow pioneered "price cut" badges in real estate and buyers now expect them everywhere. A listing that dropped in price signals motivated seller + urgency + good deal. CarGurus tracks price history per listing. | LOW | Show "Price reduced" badge if listing has a drop field set. Display amount dropped + percentage + date. Example: "Reduced $3,200 (7%) on March 1." This is a simple data field display — the complexity is ensuring listings have this field populated. |
| T4 | **Comparable Count** | CarGurus shows "X similar vehicles" in the buyer's region. This establishes whether the buyer has options (leverage) or is looking at a rare unit (urgency). | LOW | Display count of comparable listings in dataset. Example: "47 similar Class C motorhomes currently listed." Computed from same-type filter on dataset. |
| T5 | **Days on Market** | Automotive platforms display "Listed X days ago." Buyers use this signal to assess urgency and negotiating leverage. A listing at 90+ days is likely overpriced or has issues; a listing at 2 days is fresh. | LOW | Display days since listing was created / date listed. For the demo, use a seeded date offset per listing. Industry data: fast-selling RVs turn in 30-45 days; slow movers hit 120+ days. |
| T6 | **Progressive Disclosure: Headline + Expand** | CarGurus IMV detail panel, Zillow market stats — all lead with a headline insight and hide methodology behind a tap/click. Buyers who want to verify can; buyers who just want the verdict get it immediately. | MEDIUM | Card shows headline insight. "See how we calculated this" expands to reveal methodology, comparable count, price distribution, and data recency disclaimer. Each card has independent expand state. |

---

## Differentiators (Competitive Advantage)

These features go beyond what any existing RV marketplace offers. Within the automotive space, some are emerging; within RV, all of them are novel.

| # | Feature | Value Proposition | Complexity | Notes |
|---|---------|-------------------|------------|-------|
| D1 | **Avg Days on Market Card** | Goes beyond a simple "listed X days ago" per listing. Shows category-level context: "Travel trailers in this price range typically sell in 32 days. This one has been listed for 18 days." Buyer understands both urgency and category velocity. | MEDIUM | Compute per-type average DOM from dataset. Display alongside listing's own DOM. "This listing: 18 days. Typical for this type: 32 days." RV-specific benchmarks: travel trailers sell faster (30-60 days used) vs Class A motorhomes (90-165 days new). |
| D2 | **Supply & Demand Card** | Shows real inventory context: how many comparable units are available, trend direction vs. prior period, and what that means for buyer leverage. No RV marketplace surfaces this to buyers today. CarGurus does this for cars; no RV equivalent exists. | MEDIUM | Compute: (a) count of same-type listings in dataset, (b) mock trend direction (simulated monthly delta). Display: "47 Class C units currently listed — supply is high, which means more negotiating room." Frame as buyer advice, not raw data. |
| D3 | **Seasonal Timing Card** | RV prices have well-documented seasonal patterns: fall/winter 15-25% cheaper than spring/summer peak. No marketplace surfaces this to buyers as explicit advice at the point of decision. | MEDIUM | Encode seasonal multipliers by RV type (stronger seasonality for recreational trailers vs. full-timers). Display: "Prices for travel trailers are typically 15-20% lower in Oct-Feb vs. spring peak. You're shopping in [month]." Static algorithm, no real-time data needed. |
| D4 | **Price Trend Indicator** | Shows whether prices for this RV category are rising, falling, or stable — with a directional arrow and a one-sentence explanation. Buyers want to know: "If I wait, will this be cheaper or more expensive?" | MEDIUM | Encode trend direction per type + condition (new vs used) from actual 2024-2025 RV market data: used RVs aging 54-114 days suggests softening prices; new inventory at 165 days aging = buyer's market. Display trend with rationale. |
| D5 | **Methodology Transparency Panel** | The critical trust layer. CarGurus' deal ratings are controversial precisely because they refuse to explain their algorithm. A marketplace that shows buyers exactly how the score was computed — what comparables were used, how many, date range — builds more durable trust than a black-box badge. | MEDIUM | Expanded panel shows: comparable listings used (count + type filter), price range of comparables (min/median/max), data freshness note, explicit disclaimer that this is a demo using sample data. Honest about what the algorithm is doing. |
| D6 | **Combined Market Summary Card** | Surfaces a synthesized 2-3 sentence market read: "Based on 47 comparable Class C units, this listing is priced 8% below market average. Supply is high in this category, and spring prices tend to run 18% higher than today. Consider acting before March." | HIGH | Combines deal score + supply count + seasonal signal into a short narrative. Requires template-based natural language generation from computed values. The hard part is making the copy feel specific and useful, not generic. |
| D7 | **Price History Timeline** | CarGurus shows per-listing price history for cars (whether asked price changed). Zillow shows price reduction history on real estate. Buyers use this to detect motivated sellers and understand negotiating history. | MEDIUM | Requires price_history array field on listings (array of {date, price} objects). For demo: seed 30-40% of listings with 1-2 price drop events. Display as a simple timeline: "Listed at $89,900 on Jan 15 → $86,700 on Feb 28 (−$3,200)." |

---

## Anti-Features (Do NOT Build)

| Anti-Feature | Why Requested | Why Problematic | Alternative |
|--------------|---------------|-----------------|-------------|
| **Real API data feed** | Buyers want "real" market data, not algorithmic demo data | Out of scope per PROJECT.md. No real APIs, no backend. Building a real data pipeline is a separate product. | Compute all metrics from the existing ~80 listings dataset. Honest disclaimer in methodology panels: "Based on sample listings data." Authenticity of the demo is in the UX pattern, not the data fidelity. |
| **SRP-level deal badges on listing cards** | CarGurus shows deal badges on SRP cards too — feels like it belongs there | PROJECT.md explicitly defers SRP integration. Adding badges to 80 listing cards at once requires design changes across SRP, adds complexity to the filter engine, and isn't the v9.0 scope. | VDP-only for v9.0. Note as v10 consideration. SRP badge integration can be added after VDP patterns are validated. |
| **Real-time inventory updates** | Supply counts feel stale without real-time data | SPA with static JSON — no real-time data layer exists or is in scope. Pretending otherwise would mislead users. | Show counts with a "last updated" note. For demo purposes, static counts are fine. The UX pattern is what matters. |
| **Per-listing negotiation recommendations** | "We recommend offering $X" feels like direct buying assistance | This crosses from information into advice. Creates liability, requires much more data (dealer inventory age, floor plan costs, margin), and is more of a dealership negotiation tool than a buyer-facing market insight. | Frame insights as market context, not prescriptive negotiation tactics. "Market conditions favor buyers" is different from "offer $5,000 less." |
| **Complex score formula display** | Some users want to see every variable weighted in the algorithm | Showing a weighted formula (e.g., 40% price, 30% DOM, 20% supply, 10% season) invites gaming and creates skepticism. It also overpromises precision from a demo dataset. | Describe the logic in plain language: "We compared this listing to X similar units currently for sale and computed the median price." Transparency about the approach, not the formula. |
| **Saved alerts / email notifications** | "Price drop — get notified" is a common UX pattern | Requires user accounts, email infrastructure, background jobs. PROJECT.md: no auth, no persistence, frontend-only. | Show a "Price drop alert" badge when the listing has already dropped. The alert has already fired; we just show the result. |
| **Regional map of supply** | "Show me where the inventory is on a map" would complete the supply card | Requires a mapping SDK (out of scope per PROJECT.md constraints: no new dependencies). The geographic overlay adds minimal buyer decision value compared to a simple count. | Display "X units in [state/region]" as text in the supply card. Same information, no map complexity. |

---

## Feature Dependencies

```
[T1: Deal Quality Badge]
    └──requires──> [T2: Market Value Reference]  (badge is meaningless without the anchor)
                       └──requires──> Comparable listings computation from dataset

[T3: Price Drop Alert]
    └──requires──> price_history or price_drop fields on listing data
    └──enhances──> [T1: Deal Quality Badge]  (dropped price improves deal score)

[T5: Days on Market]
    └──requires──> date_listed field on listing data
    └──enhances──> [D1: Avg DOM Card]  (listing DOM shown in context of category DOM)

[T4: Comparable Count]
    └──shares computation──> [D2: Supply & Demand Card]  (same count, different framing)

[T6: Progressive Disclosure: Expand Panel]
    └──enhances──> all cards  (methodology panel pattern applies to every card)
    └──requires──> [D5: Methodology Transparency Panel]

[D1: Avg Days on Market Card]
    └──requires──> [T5: Days on Market]  (listing DOM is an input)
    └──requires──> Category DOM benchmarks (encoded constants from RV market data)

[D2: Supply & Demand Card]
    └──requires──> [T4: Comparable Count]  (count is the core data point)
    └──enhances──> seasonal framing with [D3: Seasonal Timing Card]

[D3: Seasonal Timing Card]
    └──requires──> Current month (Date.now())
    └──requires──> Seasonal multiplier table encoded per RV type
    └──standalone──> No listing data dependency

[D4: Price Trend Indicator]
    └──standalone──> Encoded trend direction per RV type/condition (constants)
    └──enhances──> [D3: Seasonal Timing Card]  (related context)

[D6: Combined Market Summary Card]
    └──requires──> [T1: Deal Quality Badge]  (deal score)
    └──requires──> [D2: Supply & Demand Card]  (supply signal)
    └──requires──> [D3: Seasonal Timing Card]  (seasonal signal)
    └──requires──> NLG template engine (template-based copy assembly)

[D5: Methodology Transparency Panel]
    └──enhances──> [T1], [D1], [D2], [D3], [D4]  (expanded view for each card)
    └──standalone architecture──> shared expand/collapse component

[D7: Price History Timeline]
    └──requires──> price_history[] array field on listing data
    └──enhances──> [T3: Price Drop Alert]  (timeline provides more context)
```

### Dependency Notes

- **T2 must precede T1:** The deal badge is a derived signal from a market value reference. Build the computation engine first, then the badge display.
- **T5 and T3 require data schema changes:** Both need fields added to the listing data type (`date_listed`, `price_history[]`). This must happen in Phase 1 before any card UI is built.
- **D1 shares DOM computation with T5:** Listing-level DOM and category-level average DOM come from the same data pass. Compute once, display in two places.
- **D6 is a composition, not a standalone:** The Combined Market Summary Card reads outputs from T1, D2, and D3. It can only be built after those three are working.
- **D5 (methodology panel) is a shared UI pattern:** One accordion/expand component used across all cards. Build as a reusable primitive.
- **D7 (price history timeline) is optional enhancement:** Requires the most data schema work. Can be deferred if time-constrained; T3 (Price Drop Alert) delivers 80% of the value with less work.

---

## MVP Definition

### Launch With (v9.0 Core)

The minimum feature set that delivers credible market intelligence on every VDP.

- [x] **T2: Market Value Reference** — computation engine first; everything derives from this
- [x] **T1: Deal Quality Badge** — the primary buyer-facing signal; most impactful single feature
- [x] **T5: Days on Market display** — simple data field, high visibility, expected by buyers
- [x] **T4: Comparable Count** — anchors the deal badge with a data point
- [x] **T3: Price Drop Alert** — high-conversion signal; drop field simple to add to listing data
- [x] **D1: Avg Days on Market Card** — goes beyond T5; shows category context; medium effort
- [x] **D2: Supply & Demand Card** — leverages comparable count already computed; frames as buyer advice
- [x] **D3: Seasonal Timing Card** — standalone (no listing data), high value for RV buyers
- [x] **T6: Progressive Disclosure** — expand/collapse pattern applied to all cards
- [x] **D5: Methodology Transparency Panel** — builds trust; prevents "black box" critique

### Add After Core Validation (v9.x)

- [ ] **D4: Price Trend Indicator** — adds directional context; can share D3's data layer; add after core cards validated
- [ ] **D7: Price History Timeline** — requires price_history[] schema; delivers full price change story; add when data schema is stable
- [ ] **D6: Combined Market Summary Card** — synthesis card; only valuable once T1/D2/D3 are all working correctly

### Future Consideration (v10+)

- [ ] **SRP deal badges** — extend T1 badge pattern to SRP listing cards; significant SRP design work; validated after VDP proves the concept
- [ ] **Saved price drop alerts** — requires auth + backend; P2 per PROJECT.md
- [ ] **Real data integration** — replace algorithmic dataset with live API; separate product milestone

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| T2: Market Value Reference (computation) | HIGH | LOW | **P1** |
| T1: Deal Quality Badge | HIGH | LOW | **P1** |
| T3: Price Drop Alert | HIGH | LOW | **P1** |
| T5: Days on Market | MEDIUM | LOW | **P1** |
| T4: Comparable Count | MEDIUM | LOW | **P1** |
| D3: Seasonal Timing Card | HIGH | LOW | **P1** |
| D1: Avg Days on Market Card | HIGH | MEDIUM | **P1** |
| D2: Supply & Demand Card | HIGH | MEDIUM | **P1** |
| T6: Progressive Disclosure | MEDIUM | MEDIUM | **P1** |
| D5: Methodology Transparency Panel | MEDIUM | LOW | **P1** |
| D4: Price Trend Indicator | MEDIUM | LOW | **P2** |
| D7: Price History Timeline | MEDIUM | MEDIUM | **P2** |
| D6: Combined Market Summary Card | HIGH | HIGH | **P2** |
| SRP deal badges | MEDIUM | HIGH | **P3** |

**Priority key:**
- **P1:** Must have for v9.0 launch — market insights section is not credible without these
- **P2:** Should have — add after core cards are working and data schema is stable
- **P3:** Nice to have — depends on SRP design work or auth/backend

---

## Competitor Feature Matrix

| Feature | CarGurus | KBB/Autotrader | Edmunds | Carvana | RV Trader | **Our v9.0 Approach** |
|---------|----------|----------------|---------|---------|-----------|----------------------|
| Deal quality badge | Yes (5-tier, color) | Yes (Good/Great) | Yes (TMV-based) | No (fixed price) | No | Yes — 5-tier, color-coded |
| Market value anchor | Yes (IMV) | Yes (FMR) | Yes (TMV) | No | NADA lookup only | Yes — computed median from dataset |
| Price drop alert / badge | Yes (price history tracking) | Partial | No | No | No | Yes — badge + date/amount |
| Days on market | Yes (per listing) | Partial | No | No | No | Yes — listing DOM + category avg |
| Supply indicator | Dealer-only | No | No | No | Dealer-only | Yes — count + trend framing |
| Seasonal timing | No | No | No | No | Blog posts only | Yes — inline card on VDP |
| Methodology transparency | Minimal (IMV description) | Minimal | Minimal | N/A | N/A | Yes — expandable detail panel |
| Price trend direction | No (buyer-facing) | No | No | No | No | Yes — encoded per type |
| Combined summary card | No | No | No | No | No | Yes (v9.x) |
| Price history timeline | Yes (per vehicle) | No | No | No | No | Yes (v9.x) |

**Key gap we fill in the RV vertical:** No RV marketplace offers buyer-facing deal ratings or market intelligence cards. This feature set brings automotive-standard transparency to RV buyers, who currently have no equivalent to the CarGurus deal badge when shopping for an RV.

---

## RV-Specific Domain Data

These facts should inform algorithm design in implementation phases.

### Days on Market Benchmarks (2024-2025)
- Used RVs: 54 days (fast market) to 114 days (soft market); target fast = 30-45 days
- New RVs: 120-165 days; 149+ days = overstocked / overpriced signal
- Travel trailers sell faster than Class A/C motorhomes
- Units past 120 days typically require 10-15% price cuts before selling
- Source: TITAN.AI RV Inventory Aging Report 2024-2025

### Seasonal Price Patterns
- Off-season savings: 15-25% below spring peak (typically Oct-Feb)
- Spring peak: March-May sees highest prices and least negotiating room
- October is typically best month to buy — inventory high, demand drops post-summer
- December-January: lowest traffic, most motivated dealers (25% volume drop vs summer)
- Geographic variation: northern states more extreme seasonality; sun-belt states less
- Source: Multiple industry sources (Lazy Days, RecNation, RVShare, Progressive)

### Supply Dynamics (2025)
- Dealer inventory up ~16% YoY (buyer's market conditions)
- Motorhome shipments hit second-lowest on record — reduced new supply
- Travel trailer shipments actually up YoY
- Used RVs increasingly competing with new (April 2025: "Are Used RVs Taking Over?")
- Source: RVIA 2024 Market Report, Bish's RV Sales Reports

---

## Sources

- [CarGurus IMV Help Article](https://cargurus.helpscoutdocs.com/article/10-what-is-imv) — MEDIUM confidence (official CarGurus)
- [CarGurus IMV One-Pager](https://assets.ctfassets.net/0czyc7nlfvzo/4f2pymo70GTJ6EqnoMB7GO/d50c19b3b16a83f71e4b7e35075f46c3/CarGurus-IMV-one-pager.pdf) — MEDIUM confidence (official)
- [How CarGurus Works — CarDog Analysis](https://cardog.app/blog/how-cargurus-works) — MEDIUM confidence (third-party analysis)
- [KBB Definitions of Values](https://b2b.kbb.com/kbb-vehicle-values/definitions-of-our-values/) — HIGH confidence (official KBB)
- [KBB Pricing Tools on Autotrader](https://b2b.autotrader.com/dealer-marketing/vehicle-listings/kbb-pricing-tools/) — HIGH confidence (official)
- [CarGurus 2024 Recap & 2025 Outlook](https://dealers.cargurus.com/drc/cargurus-2024-recap-and-2025-outlook) — MEDIUM confidence (official dealer blog)
- [RV Trader Pricing Tools Product Spotlight](https://rvtradermediakit.com/2022/08/18/product-spotlight-pricing-tools/) — MEDIUM confidence (official RV Trader)
- [RV Inventory Aging Trends 2024-2025 — TITAN.AI](https://www.rapidious.com/post/rv-inventory-aging) — MEDIUM confidence (industry analysis)
- [Seasonal Buying Patterns in the RV Market — Lazy Days](https://www.lazydays.com/research/seasonal-buying-patterns-the-rv-market-what-expect) — MEDIUM confidence (industry source)
- [Best Time to Buy an RV — RVShare](https://rvshare.com/blog/what-is-the-best-time-to-buy-an-rv/) — MEDIUM confidence
- [RV Pricing Trends 2024 — RV Trader Blog](https://www.rvtrader.com/blog/2025/03/11/2024-rv-trader-marketplace-price-trends/) — MEDIUM confidence (official RV Trader)
- [RV Sales 2024 Report — Bish's RV](https://www.bishs.com/blog/rv-sales-report-jan-2025/) — MEDIUM confidence (industry dealer)
- [Car Buyer Satisfaction Survey Q4 2024 — CarEdge](https://caredge.com/guides/car-buyer-satisfaction-survey-q4-2024) — MEDIUM confidence
- [2024 Cox Automotive Car Buyer Journey Study](https://www.coxautoinc.com/wp-content/uploads/2025/01/2024-Car-Buyer-Journey-Study-Research-Summary.pdf) — HIGH confidence (official Cox)

---
*Feature research for: v9.0 Market Insights — RV Marketplace VDP*
*Researched: 2026-03-02*
