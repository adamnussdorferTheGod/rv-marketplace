# Feature Landscape: AI-Powered SRP Summary + Research Assistant

**Domain:** AI-powered search summary and conversational shopping assistant for marketplace SRP
**Researched:** 2026-03-03
**Confidence:** MEDIUM-HIGH (competitor analysis from CarGurus Discover, Amazon Rufus, Autotrader AI Mode, Cars.com Carson, Zillow AI, Google Shopping; UX patterns from NN/g and Shape of AI; automotive consumer research from Cars.com and CarGurus 2025 surveys)

## Context

This research maps the feature landscape for v10.0 AI-Powered SRP Summary -- adding an AI summary card and conversational research assistant to the existing Search Results Page. The project is **frontend-only**: all data is computed algorithmically from ~80 sample listings already in the codebase. No real LLM calls. The goal is to show what AI-enhanced marketplace search looks like as a product concept, using mock/templated AI responses grounded in real listing data.

### Competitive Landscape Analyzed

| Platform | AI Feature | How It Works | Key Insight |
|----------|-----------|--------------|-------------|
| **CarGurus Discover** | Conversational search + comparison on SRP | Natural language queries surface listings; side-by-side comparisons; persistent session URLs; filters derived from conversation | Traffic tripled QoQ; leads grew 3.3x. Conversational search beats filter funnels for early-stage shoppers. |
| **Amazon Rufus** | Chat overlay on SRP with contextual prompt chips | Appears below search bar; dynamic question suggestions based on current search context; "Help Me Decide" feature; response types include text + product cards | 250M users in 2025; 60% higher purchase completion for Rufus users; $10B incremental sales. Prompt chips are the primary engagement driver. |
| **Autotrader Shopping Assistant** | AI on SRP + VDP with mode switching | Plain-language answers; instant comparisons; filter pre-filling from conversation; seamless toggle between AI Mode and traditional SRP | 6x more likely to send a lead when engaged. AI-to-filter handoff is a critical UX innovation. |
| **Cars.com Carson** | Multilingual conversational search | Converts natural language to filter results; 15% of searches use it; shoppers save 3x more vehicles | 30% higher SRP-to-VDP conversion. Natural language removes filter intimidation for non-expert shoppers. |
| **Zillow** | Natural language search + ChatGPT integration | Search by commute time, affordability, schools; first real estate ChatGPT plugin; co-shopper messaging | Natural language search works especially well for subjective criteria that don't map to traditional filters. |
| **Google Shopping AI** | AI Overview summaries above search results | Narrative summaries of product landscape; comparison tables; appears in ~40% of product searches | AI summaries compress multiple buyer journey stages into a single interface. Users expect synthesis, not just listing. |
| **RV Trader** | AI-enhanced photos + AI-generated listing descriptions | No buyer-facing AI summary or assistant on SRP. Dealer-side AI listing tools only. | **Clear gap** -- RV shoppers have zero AI assistance during the search/comparison phase. |

**Key finding:** AI-powered search assistants are becoming table stakes on automotive and major marketplace platforms (CarGurus, Autotrader, Cars.com all shipped in 2025). The RV vertical has zero buyer-facing AI features. The pattern that works: a passive summary layer (stats + narrative) on the SRP combined with an active assistant (conversational interface) for deeper research.

---

## Table Stakes (Users Expect These)

Features that automotive marketplace shoppers increasingly expect when they see an "AI-powered" interface. Missing these makes the product feel like a gimmick rather than a tool.

| # | Feature | Why Expected | Complexity | Notes |
|---|---------|--------------|------------|-------|
| T1 | **Headline stat bar** (listing count, median price, avg DOM, price trend) | Every marketplace shows aggregate stats. Google AI Overviews, CarGurus, and Zillow all lead with quantitative summary. Users anchor on numbers before reading narrative. | Low | Existing `marketInsightsEngine` already computes most of these. Surface as 3-4 stat pills above the narrative. |
| T2 | **AI narrative summary** of current search results | Google AI Overviews set the expectation that search results come with a synthesized summary. Amazon Rufus, Cars.com Carson, and CarGurus Discover all generate contextual narratives. | Medium | Template-based generation from listing data (not real LLM). E.g., "24 Class C motorhomes near Denver, CO. Prices range from $42K to $189K with a median of $78K. Most are 2019-2023 models. 6 are priced below market." |
| T3 | **Responsive collapse behavior** | Mobile accounts for majority of marketplace traffic. Amazon Rufus, Autotrader, and CarGurus all adapt their AI features for mobile-first. | Medium | Desktop: full card above grid. Tablet: 2x2 stat grid, collapsed narrative. Mobile: single-line stat ticker, tap to expand. |
| T4 | **Contextual prompt chip suggestions** | Amazon Rufus, CarGurus Discover, and Autotrader AI Mode all use prompt chips as the primary engagement mechanism. NN/g research confirms chips outperform empty text inputs for AI discovery. | Medium | 3-5 pill-shaped suggestions below the assistant input. Dynamic based on current search context. E.g., for "Class A" search: "Best Class A under $100K?", "Class A vs Class C?", "Which have the best fuel economy?" |
| T5 | **Chat input bar** for the research assistant | Every competitor has a text input for conversational queries. This is the minimum viable interaction point for an assistant. | Low | Single-line input with send button. Placeholder text hints at capability. Located below the summary card or as a persistent footer bar. |
| T6 | **Text response messages** from the assistant | The baseline response type: plain text answers grounded in the search data. All competitors support this. | Low | Markdown-rendered text bubbles with the assistant's response. Must feel instant (mock data, no loading spinner beyond a brief typing indicator). |
| T7 | **Confidence-gated rendering** | Shape of AI patterns emphasize that AI interfaces must signal data quality. Google AI Overviews show "limited information" states. Users distrust AI that speaks confidently from thin data. | Medium | 4 tiers: Full (50+ results), Medium (10-49), Low (3-9), Insufficient (<3). Card content scales: fewer stats, hedging language, "limited data" badges at lower tiers. |
| T8 | **Data grounding indicators** | Consumer research shows shoppers want guardrails (65% want safeguards per Grocery Dive study). "Based on X listings" attribution builds trust. | Low | Every stat and narrative claim cites its data source: "Based on 24 listings matching your search" or "Comparing 67 similar Class C models within 200 miles." |

---

## Differentiators (Competitive Advantage)

Features that go beyond what users expect. These are what make the product feel thoughtfully designed rather than checkbox-complete. Not all competitors have shipped these.

| # | Feature | Value Proposition | Complexity | Notes |
|---|---------|-------------------|------------|-------|
| D1 | **Expandable detail panel** with price distribution histogram and deal quality breakdown | CarGurus shows deal distribution but not on SRP summary. Google Shopping shows price range comparisons. Putting a price histogram directly on the SRP summary gives instant market orientation. | High | Chart showing price distribution curve with the user's active filters highlighted. Deal quality breakdown (X great deals, Y good, Z fair, W above market). Requires chart rendering (CSS-only or lightweight canvas). |
| D2 | **Comparison table response type** | CarGurus Discover and Autotrader both support side-by-side comparison. Consumer surveys show 44% want AI to compare vehicles. But inline comparison tables within an assistant response are rare -- most force you to a separate compare page. | High | Assistant responds with a structured table when user asks "Compare X vs Y" or "What's the difference between..." Columns: model, price, year, length, sleeps, deal rating. Max 3-4 vehicles. |
| D3 | **Listing card response type** | Amazon Rufus embeds product cards inline in chat responses. This is more actionable than plain text -- users can click through to VDP directly from an assistant answer. | Medium | When assistant mentions specific listings (e.g., "The best deal is this 2021 Winnebago..."), render it as a mini listing card with photo, price, and link. Uses existing `SRPListingCard` component in compact form. |
| D4 | **Action response type** with deep-link buttons | Autotrader's AI Mode pre-fills filters from conversation. This bridges the gap between conversational discovery and traditional filter-based browsing. | Medium | Assistant response includes action buttons like "Show only Great Deals", "Filter to under $80K", "Sort by newest". Clicking applies the filter/sort to the actual SRP -- the assistant manipulates the page state. |
| D5 | **Side panel assistant (desktop)** | Autotrader and CarGurus both use a side panel approach rather than a modal overlay. This preserves the search context -- users can see listings while chatting. | High | Right-side panel (300-400px wide) pushes or overlays the listing grid. Listings remain visible and scrollable. Panel has full conversation history, input, and chip suggestions. |
| D6 | **Bottom sheet assistant (mobile)** | Standard mobile pattern for secondary interfaces (Google Maps, Zillow, Apple Maps). Keeps the primary content visible above while providing a conversational surface. | Medium | FAB (floating action button) trigger in bottom-right. Sheet slides up to ~60% height. Draggable to full screen. Conversation with chips and input. Dismiss by swiping down. |
| D7 | **Persistent conversation with scroll-back** | CarGurus Discover offers persistent session URLs. Amazon Rufus maintains conversation context. Users expect to be able to scroll back through their research conversation. | Low | Store conversation in React state. Full message history with alternating user/assistant messages. Scroll to latest on new message. No persistence across page reloads needed for v1. |
| D8 | **Dynamic chip suggestions that evolve** | NN/g research shows chips should be contextual, not static. Amazon Rufus changes suggestions based on what you're currently viewing. The best implementations adapt after each turn of conversation. | Medium | Initial chips based on search context. After user asks about price, next chips shift to deal quality or financing. After comparison, chips suggest "Show me more like X" or "What about newer models?" |
| D9 | **Trend chart in detail panel** | Showing how prices or inventory have changed over time. Zillow prominently displays market trends. CarGurus shows price history. Novel on an RV SRP. | High | Simulated 6-month trend line showing median price movement for the current search criteria. Uses mock time-series data. Seasonal insight overlay (e.g., "Prices typically drop 15% in December for this type"). |

---

## Anti-Features (Explicitly Do NOT Build)

Features that seem appealing but create liability, trust erosion, or scope explosion. Research shows these are the most common failure modes for marketplace AI assistants.

| # | Anti-Feature | Why Avoid | What to Do Instead |
|---|--------------|-----------|-------------------|
| A1 | **Purchase recommendations** ("You should buy this one") | Creates liability. Even Amazon Rufus carefully avoids direct purchase advice. Consumer surveys show 73% want AI to inform, not decide. Grounding in data is fundamentally different from making recommendations. | Present data objectively: "This listing is priced 12% below the median for similar models" rather than "This is a good buy." Let deal badges speak for themselves. |
| A2 | **Price predictions** ("This will drop to $X next month") | Speculative claims erode trust. No marketplace AI makes forward price predictions on individual listings. Even CarGurus IMV is a present-tense valuation, not a forecast. | Show historical trends and seasonal patterns: "Class C prices typically decrease 10-15% in October-November" rather than "This RV will be cheaper next month." |
| A3 | **Negotiation coaching** ("Offer $X below asking") | Adversarial to dealers (who are the platform's customers). No automotive marketplace AI offers negotiation tactics. Creates legal exposure. | Show market position data: "This listing is priced $4,200 above the median for comparable models" -- let the buyer draw their own conclusions. |
| A4 | **Real LLM integration** for v1 | Scope explosion. Adds API costs, latency management, prompt engineering, content moderation, hallucination prevention. The mock approach achieves the UX demonstration goal. | Template-based response generation: data in, language out. Narrative templates with variable injection from the `marketInsightsEngine` and `srpFilterEngine`. Feels AI-powered without the infrastructure burden. |
| A5 | **Personalization / user history** | Requires authentication, data storage, and privacy considerations -- all out of scope for a frontend-only demo. Amazon Rufus personalizes from purchase history but that's behind auth. | Keep all responses grounded in the current search context. "Based on your current search for Class C motorhomes near Denver" not "Based on your browsing history." |
| A6 | **Voice input** | Nice-to-have but adds significant complexity (speech-to-text, browser permissions, mobile microphone handling). No automotive marketplace ships voice-first AI on their website. | Text input only. Prompt chips reduce typing burden, which addresses the same user need (reducing input friction). |
| A7 | **Multi-turn context tracking beyond 1 session** | Requires backend persistence. CarGurus Discover does this with persistent URLs, but that's server-side. | Maintain conversation in React state for the current session. Reset on page reload. This is sufficient for a demo. |
| A8 | **Autonomous filter manipulation** without user action | AI silently changing filters feels like loss of control. The 65% of consumers who want AI guardrails specifically want to approve changes. | Action response type (D4) presents filter changes as clickable buttons the user explicitly activates. The assistant suggests, the user confirms. |
| A9 | **Dealer-specific commentary** ("This dealer is/isn't reputable") | Legal liability. Even CarGurus, which has dealer review data, does not have their AI assistant comment on specific dealer quality. | Stick to vehicle and market data. Dealer information is displayed on VDP via existing components, not synthesized by the assistant. |

---

## Feature Dependencies

```
T1 (Stat bar) ─────────────────────┐
T2 (AI narrative) ─────────────────┤
T7 (Confidence gating) ────────────┤
T8 (Data grounding) ───────────────┼──► SRP Summary Card (passive layer)
D1 (Detail panel + histogram) ─────┘
D9 (Trend chart) ──────────────────┘

T5 (Chat input) ───────────────────┐
T4 (Prompt chips) ─────────────────┤
T6 (Text responses) ───────────────┼──► AI Assistant (active layer)
D2 (Comparison tables) ────────────┤
D3 (Listing card responses) ───────┤
D4 (Action responses) ─────────────┤
D7 (Conversation history) ─────────┘
D8 (Dynamic chips) ────────────────┘

T3 (Responsive collapse) ──────────┐
D5 (Side panel - desktop) ─────────┼──► Layout / Responsive
D6 (Bottom sheet - mobile) ────────┘

D5 depends on: T5, T4, T6, D7
D6 depends on: T5, T4, T6, D7
D2 depends on: T6 (extends message types)
D3 depends on: T6 (extends message types)
D4 depends on: T6 (extends message types)
D8 depends on: T4 (extends chip behavior)
D1 depends on: T1 (extends stat bar into detail panel)
D9 depends on: D1 (lives inside detail panel)
T7 spans: T1, T2 (controls what renders based on data availability)
T8 spans: T1, T2, T6 (attribution on all data-derived content)
```

### Critical Path

```
1. SRP Summary Card shell (T1 stat bar + T2 narrative + T7 confidence + T8 grounding)
   └── This is the minimum visible feature. Everything else builds on this foundation.

2. Mock API layer (data computation → response templates)
   └── Both the summary card and assistant need a data-to-language pipeline.

3. Chat input + text responses (T5 + T6 + D7)
   └── Minimum viable assistant interaction.

4. Prompt chips (T4)
   └── Primary engagement driver per Amazon Rufus data. Without chips, most users won't engage.

5. Rich response types (D2 comparison + D3 listing cards + D4 actions)
   └── What makes the assistant feel genuinely useful vs. a gimmick.

6. Desktop side panel / Mobile bottom sheet (D5 + D6)
   └── Layout refinement. Can start with inline/overlay, evolve to panel.

7. Detail panel + charts (D1 + D9)
   └── Enhancement layer. Valuable but not blocking core experience.

8. Responsive collapse (T3)
   └── Spans all phases but can be incrementally refined.
```

---

## MVP Recommendation

### Prioritize (Phase 1-2):

1. **SRP Summary Card** (T1 + T2 + T7 + T8) -- The passive AI layer. Shows immediate value with no interaction required. Every competitor leads with a data summary. This is the "first impression" of AI on the page.

2. **Chat input + prompt chips + text responses** (T5 + T4 + T6 + D7) -- The minimum viable active layer. Prompt chips are the engagement bridge (Rufus data shows chips are the primary interaction method, not freeform typing).

3. **Responsive behavior** (T3) -- Without responsive, the feature is invisible to the majority of marketplace traffic. Build responsive into every component from the start, not as a retrofit.

### Prioritize (Phase 3-4):

4. **Rich response types** (D2 + D3 + D4) -- Comparison tables, listing cards, and action buttons make the assistant genuinely useful. Without these, it's just a text chatbot.

5. **Desktop side panel + mobile bottom sheet** (D5 + D6) -- The right layout makes the assistant feel integrated rather than bolted on.

6. **Dynamic chip evolution** (D8) -- Chips that adapt to conversation context increase multi-turn engagement.

### Defer to later enhancement:

7. **Detail panel with charts** (D1 + D9) -- High complexity, lower urgency. The stat bar provides the key data; the histogram and trend chart are enhancement layers.

---

## Consumer Research: What Users Actually Want from AI in Car/RV Shopping

These findings inform priority and framing.

| Insight | Source | Implication |
|---------|--------|-------------|
| 44% want AI to **compare vehicles** | CarGurus 2025 Consumer Insights | Comparison table response type (D2) is not a nice-to-have -- it addresses the #1 stated use case |
| 40% want AI to **find listings** | CarGurus 2025 Consumer Insights | Natural language search that surfaces relevant listings (D3 listing cards) |
| 39% want AI to **summarize reviews** on vehicles | CarGurus 2025 Consumer Insights | Summary narrative (T2) that synthesizes listing data into readable text |
| 36% want AI to **summarize dealer reviews** | CarGurus 2025 Consumer Insights | Out of scope (A9) -- but validates the summary pattern |
| 80% of buyers are **open to using AI** | CarGurus 2025 Consumer Insights | Market readiness is high; the feature won't feel foreign |
| 26% already **use AI** for car shopping | CarGurus 2025 Consumer Insights | Not a novelty -- users have expectations from ChatGPT, Rufus, etc. |
| 65% want at least one **guardrail/safeguard** | Grocery Dive consumer research | Confidence gating (T7), data grounding (T8), and no purchase recommendations (A1) directly address this |
| 73% say AI is a **time-saver** for turning queries into results | Cars.com 2025 Survey | Prompt chips (T4) and action responses (D4) accelerate the filter-to-results pipeline |
| Carson users have **30% higher SRP-to-VDP conversion** | Cars.com 2025 metrics | AI assistant engagement directly correlates with deeper shopping behavior |
| Autotrader assistant users are **6x more likely to send a lead** | Autotrader 2025 metrics | Validates the business case for assistant on SRP |

---

## Sources

### Competitor Features (MEDIUM confidence -- press releases and product announcements)
- [CarGurus AI-Powered Shopping Experience Launch](https://investors.cargurus.com/news-releases/news-release-details/cargurus-launches-ai-powered-car-shopping-experience)
- [CarGurus Discover and Dealership Mode](https://investors.cargurus.com/news-releases/news-release-details/cargurus-expands-big-deal-brand-campaign-introducing-ai-powered)
- [Amazon Rufus $10B Impact](https://fortune.com/2025/11/02/amazon-rufus-ai-shopping-assistant-chatbot-10-billion-sales-monetization/)
- [Amazon Rufus Personalization Features](https://www.aboutamazon.com/news/retail/amazon-rufus-ai-assistant-personalized-shopping-features)
- [Autotrader Auto Intelligence](https://press.autotrader.com/autotrader-powered-auto-intelligence-redefines-personalized-car-buying-experience)
- [Autotrader AI Tools at NADA 2026](https://b2b.autotrader.com/resources/autotrader-ai-tools-nada-2026/)
- [Autotrader "I'm Looking For" AI Categories](https://www.am-online.com/news/autotrader-ai-led-i-m-looking-for-tool-to-simplify-search-for-unsure-buyers)
- [Cars.com Carson AI Engine](https://www.cars.com/articles/meet-carson-cars-coms-new-ai-engine-for-car-shopping-518222/)
- [Zillow AI Natural Language Search](https://investors.zillowgroup.com/investors/news-and-events/news/news-details/2024/Zillows-AI-powered-home-search-gets-smarter-with-new-natural-language-features/default.aspx)
- [Google Shopping AI Features](https://techcrunch.com/2025/11/13/google-expands-ai-shopping-with-conversational-search-agentic-checkout-and-an-ai-that-calls-stores-for-you/)
- [RV Trader AI Listing Tools](https://rvbusiness.com/rv-trader-debuts-ai-fueled-private-marketplace-experience/)

### Consumer Research (MEDIUM confidence -- industry surveys)
- [Cars.com AI Survey 2025](https://investor.cars.com/2025-11-20-Cars-com-Survey-Reveals-AIs-Growing-Influence-on-Car-Shopping-97-of-AI-Users-Say-it-Will-Impact-Purchase-Decisions-and-Almost-Half-Have-Already-Leveraged-the-Tech-for-Car-Shopping)
- [CarGurus 2025 Consumer Insights Report](https://dealers.cargurus.com/blog/2025-cargurus-consumer-insights-report)
- [Consumer AI Guardrails Research](https://www.grocerydive.com/news/artificial-intelligence-grocery-shopping-cpg-retail/760502/)

### UX Patterns (MEDIUM-HIGH confidence -- design authority sources)
- [NN/g: Designing Use-Case Prompt Suggestions](https://www.nngroup.com/articles/designing-use-case-prompt-suggestions/)
- [Shape of AI: Summary Pattern](https://www.shapeof.ai/patterns/summary)
- [Smashing Magazine: Design Patterns for AI Interfaces](https://www.smashingmagazine.com/2025/07/design-patterns-ai-interfaces/)
- [Amazon Rufus Scaling Architecture](https://aws.amazon.com/blogs/machine-learning/how-rufus-scales-conversational-shopping-experiences-to-millions-of-amazon-customers-with-amazon-bedrock/)
- [NN/g: AI Discoverability Mistakes (Amazon)](https://www.nngroup.com/articles/discoverability-ai-amazon/)

### Codebase (HIGH confidence -- direct inspection)
- Existing `marketInsightsEngine.ts` computes deal scores, DOM stats, supply/demand, seasonal data from ~80 sample listings
- Existing `srpFilterEngine.ts` handles client-side filtering with URL sync
- Existing `srpTypes.ts` includes `dealRating: 'great' | 'good' | 'fair' | 'high' | null` on every `SRPListing`
