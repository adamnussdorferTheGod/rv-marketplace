import type { SRPListing, RVType } from './srpTypes';
import { RV_TYPE_LABELS } from './srpTypes';
import type {
  AssistantMessageData,
  SearchContextType,
  SrpSummaryData,
} from './srpSummaryTypes';

// ---- SearchContext ----

export interface SearchContext {
  resultCount: number;
  medianPrice: number;
  priceRange: { min: number; max: number };
  topMakes: string[];
  priceTrend: number;
  dealBreakdown: { great: number; good: number; fair: number; totalRated: number };
  avgDaysOnMarket: number;
  searchContextType: SearchContextType;
  activeRvType: string | null;
}

// ---- Category types ----

export type AssistantCategory =
  | 'market-overview'
  | 'price-analysis'
  | 'type-comparison'
  | 'deal-quality'
  | 'recommendation'
  | 'reliability'
  | 'towing'
  | 'floor-plan'
  | 'lifestyle'
  | 'depreciation'
  | 'inspection';

type GuardrailCategory =
  | 'purchase-recommendation'
  | 'price-prediction'
  | 'dealer-commentary';

// ---- buildSearchContext ----

export function buildSearchContext(
  summary: SrpSummaryData,
  listings: SRPListing[],
  activeRvType: string | null,
): SearchContext {
  const prices = listings.map((l) => l.currentPrice);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const makeCounts = new Map<string, number>();
  for (const l of listings) {
    makeCounts.set(l.make, (makeCounts.get(l.make) ?? 0) + 1);
  }
  const topMakes = [...makeCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([make]) => make);

  return {
    resultCount: summary.resultCount,
    medianPrice: summary.headlineStats.medianPrice,
    priceRange: { min: minPrice, max: maxPrice },
    topMakes,
    priceTrend: summary.headlineStats.priceTrend.trendPercent,
    dealBreakdown: {
      great: summary.dealBreakdown.great,
      good: summary.dealBreakdown.good,
      fair: summary.dealBreakdown.fair,
      totalRated: summary.dealBreakdown.totalRated,
    },
    avgDaysOnMarket: summary.headlineStats.avgDaysOnMarket,
    searchContextType: summary.narrative.searchContext,
    activeRvType,
  };
}

// ---- Guardrails ----

const GUARDRAIL_PHRASES: Record<GuardrailCategory, string[]> = {
  'purchase-recommendation': [
    'should i buy',
    'should i get',
    'should i purchase',
    'buy this one',
    'which one should',
    'recommend me',
  ],
  'price-prediction': [
    'will prices',
    'prices going',
    'price prediction',
    'prices go up',
    'prices go down',
    'prices drop',
    'prices increase',
    'when to buy',
  ],
  'dealer-commentary': [
    'dealer reputation',
    'dealer reviews',
    'is this dealer',
    'trust this dealer',
    'dealer reliable',
    'dealer honest',
  ],
};

const GUARDRAIL_RESPONSES: Record<GuardrailCategory, string> = {
  'purchase-recommendation':
    "I'm best at helping with market data and comparisons. I can show you how listings compare to similar ones, break down pricing trends, or highlight the best deals in your search — try asking about any of those!",
  'price-prediction':
    "I don't predict future prices, but I can show you current pricing trends, how listings in your search compare to the market average, and which deals stand out right now.",
  'dealer-commentary':
    'I focus on listing data and market analysis rather than dealer-specific feedback. I can help you compare prices, understand deal quality, or explore what\'s available in your search.',
};

function checkGuardrails(query: string): string | null {
  const lower = query.toLowerCase();
  for (const [category, phrases] of Object.entries(GUARDRAIL_PHRASES)) {
    for (const phrase of phrases) {
      if (lower.includes(phrase)) {
        return GUARDRAIL_RESPONSES[category as GuardrailCategory];
      }
    }
  }
  return null;
}

// ---- Query classifier ----

const CATEGORY_KEYWORDS: Record<AssistantCategory, string[]> = {
  'market-overview': [
    'market', 'overview', 'summary', 'how many', "what's available",
    'inventory', 'supply', 'demand', 'listings available',
  ],
  'price-analysis': [
    'price', 'cost', 'expensive', 'cheap', 'afford', 'median',
    'average price', 'price range', 'pricing', 'fair for',
    'great deals', 'cheapest', 'best value',
  ],
  'type-comparison': [
    'compare', 'versus', 'vs', 'difference',
    'class a', 'class b', 'class c', 'travel trailer',
    'fifth wheel', 'toy hauler', 'top brands', 'most popular',
  ],
  'deal-quality': [
    'deal', 'deals', 'bargain', 'underpriced', 'below market',
  ],
  recommendation: [
    'recommend', 'suggest', 'favorite',
    'what should', 'best pick',
  ],
  reliability: [
    'reliable', 'reliability', 'dependable', 'issues', 'problems',
    'known issues', 'common issues', 'break down', 'quality',
    'last long', 'durable', 'trustworthy', 'build quality',
  ],
  towing: [
    'tow', 'towing', 'hitch', 'tongue weight', 'weight',
    'heavy', 'gvwr', 'payload', 'can my', 'pull',
  ],
  'floor-plan': [
    'floor plan', 'floorplan', 'layout', 'sleeps', 'bunkhouse',
    'bedroom', 'bathroom', 'kitchen', 'slide out', 'slideout',
    'living space', 'storage',
  ],
  lifestyle: [
    'family', 'families', 'full-time', 'full time', 'beginner',
    'first-time', 'first time', 'couple', 'solo', 'weekend',
    'boondocking', 'off-grid', 'campground', 'good for',
  ],
  depreciation: [
    'depreciation', 'hold value', 'resale', 'holds value',
    'new vs used', 'new versus used', 'lose value',
    'best year', 'savings',
  ],
  inspection: [
    'inspection', 'checklist', 'check for', 'look for',
    'red flag', 'high-mileage', 'high mileage', 'older',
    'used tips', 'what to check', 'unsold', 'sitting',
  ],
};

export function classifyQuery(query: string): AssistantCategory {
  const lower = query.toLowerCase();
  const scores: Record<AssistantCategory, number> = {
    'market-overview': 0,
    'price-analysis': 0,
    'type-comparison': 0,
    'deal-quality': 0,
    recommendation: 0,
    reliability: 0,
    towing: 0,
    'floor-plan': 0,
    lifestyle: 0,
    depreciation: 0,
    inspection: 0,
  };

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        scores[category as AssistantCategory]++;
      }
    }
  }

  const best = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a));
  return best[1] > 0 ? (best[0] as AssistantCategory) : 'market-overview';
}

// ---- Extract make/model from query ----

function extractMakeFromQuery(query: string, context: SearchContext): string {
  const lower = query.toLowerCase();
  for (const make of context.topMakes) {
    if (lower.includes(make.toLowerCase())) return make;
  }
  return context.topMakes[0] ?? 'this brand';
}

// ---- Response templates ----

const RESPONSE_TEMPLATES: Record<AssistantCategory, string[]> = {
  'market-overview': [
    'There are currently **{resultCount} listings** matching your search, with a median asking price of **{medianPrice}**. {trendSentence} Listings average **{avgDom} days** on market.\n\n{dealSentence}',
    'Your search includes {resultCount} {rvTypeLabel} with prices centered around {medianPrice}. {trendSentence} {dealSentence} The most common makes are {topMakesText}.',
  ],
  'price-analysis': [
    '**Price Snapshot**\n\n| Metric | Value |\n| --- | --- |\n| Median Price | {medianPrice} |\n| Range | {priceMin} – {priceMax} |\n| Avg Days on Market | {avgDom} days |\n\n{trendSentence} {dealSentence}',
    'The median asking price is {medianPrice} across {resultCount} listings. {trendSentence} The range spans {priceMin} to {priceMax}. {dealSentence}',
  ],
  'type-comparison': [
    'Among the **{resultCount} listings** in your search, the most popular makes are **{topMakesText}**.\n\n| Metric | Value |\n| --- | --- |\n| Listings | {resultCount} |\n| Median Price | {medianPrice} |\n| Price Range | {priceMin} – {priceMax} |\n\n{dealSentence}',
    'Your search covers {resultCount} {rvTypeLabel}. The top makes by volume are {topMakesText}, with a median price of {medianPrice}. {dealSentence}',
  ],
  'deal-quality': [
    '{dealSummary}\n\n**Price Breakdown**\n- **{greatCount}** well below market price\n- **{goodCount}** below market price\n- **{fairCount}** around market price\n\nOut of **{totalRated}** rated listings, the median asking price is {medianPrice}.',
    '{dealSummary} {greatCount} listings are well below market price, with {goodCount} more priced below market. The median asking price is {medianPrice}. {trendSentence}',
  ],
  recommendation: [
    "Based on your current search of **{resultCount} listings**, here's what stands out:\n\n- Median asking price: **{medianPrice}**\n- Avg days on market: **{avgDom} days**\n- {dealSentence}\n\n{trendSentence}",
    "Across {resultCount} {rvTypeLabel}, the median price is {medianPrice}. {dealSentence} {trendSentence} The most popular makes here are {topMakesText}.",
  ],

  // ── Topic-specific templates ──────────────────────────────────────

  reliability: [
    "**{make} Reliability Overview**\n\n{make} generally earns solid marks from owners. Here's what the community reports:\n\n- **Build quality**: {make} units are known for {reliabilityTrait}. Like most RV brands, the first model year of a new floor plan can have more fit-and-finish issues.\n- **Common areas to watch**: Seals around windows and slides, water heater anodes, and roof sealant maintenance — these apply to most RV brands, not just {make}.\n- **Longevity**: Well-maintained units from {make} routinely last 15–20+ years. Regular roof and seal maintenance is the #1 factor.\n\nIn your current search, there are **{resultCount} {make} listings** with a median price of **{medianPrice}**.",
    "Owners of **{make}** RVs generally rate them well for build quality and long-term value. A few things to keep in mind:\n\n- Newer models (2020+) tend to have improved construction quality\n- Maintenance history matters more than brand reputation alone\n- Roof and seal maintenance is the most critical upkeep for any RV\n\n{make} has **{resultCount} listings** in your search, priced from {priceMin} to {priceMax}. {dealSentence}",
  ],
  towing: [
    "**Towing Considerations**\n\n{towingContent}\n\n**General towing tips:**\n- Always check the GVWR (Gross Vehicle Weight Rating) against your vehicle's tow capacity\n- Tongue weight should be 10–15% of the trailer's total weight\n- Factor in passengers, gear, and water weight — these add up fast\n- Trailer brakes are essential for anything over 3,500 lbs\n\nIn your search, {rvTypeLabel} range from {priceMin} to {priceMax} with a median of {medianPrice}.",
    "**Weight & Towing Quick Reference**\n\n{towingContent}\n\n| What to check | Why it matters |\n| --- | --- |\n| GVWR | Must be under your tow vehicle's max capacity |\n| Tongue weight | Should be 10–15% of trailer weight |\n| Hitch type | Must match your receiver class |\n| Cargo capacity | Don't forget water, gear, passengers |\n\nThere are **{resultCount}** matching listings in your search right now.",
  ],
  'floor-plan': [
    "**Floor Plan Insights for {make}**\n\nAcross the {resultCount} listings in your search, here's what's available:\n\n- **Sleeping capacity** varies widely — from couples-only layouts to bunkhouse models sleeping 8+\n- **Most popular layouts** tend to feature rear living areas with front bedrooms\n- **Bunkhouse models** are great for families and typically add 2–4 extra sleeping spots\n- **Slide-outs** add significant living space but increase weight and maintenance needs\n\nPrices range from {priceMin} to {priceMax} depending on size and layout. {dealSentence}",
    "**Floor Plan Guide**\n\n{rvTypeLabel} come in a wide range of layouts. Here's what to consider:\n\n| Layout Type | Best For |\n| --- | --- |\n| Rear living | Entertaining, larger groups |\n| Front bedroom | Privacy, couples |\n| Bunkhouse | Families with kids |\n| Murphy bed | Flexible space, smaller units |\n\nThere are **{resultCount}** listings in your search with a median price of **{medianPrice}**. Floor plan complexity and slide-out count tend to drive price differences.",
  ],
  lifestyle: [
    "**Lifestyle Fit: {rvTypeLabel}**\n\nWhether a particular RV suits your lifestyle depends on how you plan to use it:\n\n- **Weekend camping**: Most {rvTypeLabel} in this search work great. Focus on ease of setup and towing.\n- **Family trips**: Look for bunkhouse models or units with flexible sleeping. Storage capacity matters with kids.\n- **Full-time living**: Prioritize build quality, insulation, holding tank capacity, and residential-style features.\n- **First-timers**: Start with something easy to tow and set up. Shorter units under 30 ft are much more maneuverable.\n\nYour search has **{resultCount}** options ranging from {priceMin} to {priceMax}. {dealSentence}",
    "Great question! Here's how to think about fit:\n\n**For families**: Bunkhouse models and anything sleeping 6+ are ideal. Look for outdoor kitchens for campground cooking.\n\n**For beginners**: Smaller, lighter units are easier to tow and park. Don't oversize your first RV — you can always upgrade later.\n\n**For full-timers**: Invest in better build quality and 4-season capability. Holding tank capacity and solar-readiness matter a lot.\n\nIn your current search of **{resultCount} {rvTypeLabel}**, the median price is **{medianPrice}** and listings average **{avgDom} days** on market.",
  ],
  depreciation: [
    "**Depreciation & Value: {make}**\n\n{depreciationContent}\n\n**General RV depreciation patterns:**\n- New RVs typically lose 15–25% in the first year\n- Years 2–5 see another 10–15% decline total\n- After 7–10 years, values tend to stabilize\n- Well-maintained units with popular floor plans hold value best\n\n**Buying used can save significantly** — a 3–5 year old model often represents the best balance of value and remaining lifespan.\n\nIn your search, the median price is **{medianPrice}** with {resultCount} listings available. {dealSentence}",
    "**New vs Used Savings**\n\nBuying used is one of the best ways to save on an RV. Here's the typical pattern:\n\n| Age | Typical Value Retained |\n| --- | --- |\n| 1 year | 75–85% |\n| 3 years | 60–70% |\n| 5 years | 50–60% |\n| 10 years | 35–45% |\n\n{make} models tend to {valueRetention}. The sweet spot for value is usually the **3–5 year old** range — past the steepest depreciation but still with plenty of life left.\n\nYour search shows a median of **{medianPrice}** across **{resultCount}** listings. {trendSentence}",
  ],
  inspection: [
    "**Used RV Inspection Checklist**\n\nBefore buying any used RV, check these critical areas:\n\n**Exterior:**\n- Roof condition — look for cracks, bubbles, or soft spots\n- Window and door seals — reseal if cracked or dried out\n- Undercarriage — check for rust, especially on the frame\n- Tires — check age (replace if 5+ years old regardless of tread)\n\n**Interior:**\n- Water damage — check ceilings, floors near slides, and under windows\n- Appliances — test every system: fridge, A/C, heater, water heater\n- Plumbing — run water and check for leaks under sinks\n- Electrical — test all outlets, lights, and the converter/inverter\n\n**Mechanical:**\n- Slide-outs — extend and retract each one fully\n- Leveling jacks — cycle through all positions\n- Brakes and bearings — critical for safe towing\n\nIn your search, there are **{resultCount}** listings with a median price of **{medianPrice}**. {dealSentence}",
    "**What to Watch For in Used {rvTypeLabel}**\n\nSome listings sit on the market longer for a reason. Common issues to investigate:\n\n- **Water damage** is the #1 hidden problem — always check ceiling panels, floor near slides, and around windows\n- **Roof age** — rubber roofs last ~12 years, but only with regular maintenance. A roof replacement costs $3,000–$8,000\n- **Slide-out seals** — worn seals cause leaks and are expensive to repair\n- **Holding tank condition** — ask about tank flushes and gate valve condition\n\n**Pro tip**: Have an independent RV inspector check any unit over $20,000. The $300–$500 fee can save you thousands.\n\nYour search has **{resultCount}** options at a median of **{medianPrice}**.",
  ],
};

// ---- Template variable builder ----

function formatPrice(price: number): string {
  return '$' + price.toLocaleString('en-US');
}

function formatTopMakes(makes: string[]): string {
  if (makes.length === 0) return 'various makes';
  if (makes.length === 1) return makes[0];
  if (makes.length === 2) return `${makes[0]} and ${makes[1]}`;
  return `${makes.slice(0, -1).join(', ')}, and ${makes[makes.length - 1]}`;
}

// ── Make-specific knowledge for dynamic responses ───────────────────

const MAKE_RELIABILITY: Record<string, string> = {
  'Airstream': 'premium aluminum construction and excellent long-term durability',
  'Forest River': 'solid mid-range construction with a wide model variety',
  'Jayco': 'good build quality, particularly their Magnum Truss Roof system',
  'Winnebago': 'strong motorhome heritage and reliable build standards',
  'Thor': 'decent value for money, though some owners report minor fit-and-finish issues in early model years',
  'Coachmen': 'reliable mid-range builds with good customer support',
  'Keystone': 'solid construction in their premium lines like Montana and Cougar',
  'Grand Design': 'above-average build quality and strong customer satisfaction ratings',
  'Heartland': 'good quality in their higher-end fifth wheels and toy haulers',
  'Dutchmen': 'reliable entry-to-mid-range construction with good value',
  'Tiffin': 'excellent build quality and industry-leading customer service',
  'Newmar': 'premium motorhome construction with attention to detail',
  'Entegra': 'luxury-tier build quality with residential features',
  'Fleetwood': 'dependable motorhome builds with decades of heritage',
  'Gulf Stream': 'reliable mid-range construction focused on value',
  'KZ': 'solid fifth wheels and travel trailers with good value',
  'Palomino': 'reliable lightweight trailers and truck campers',
  'Venture': 'decent mid-range quality at competitive prices',
  'CrossRoads': 'good build quality in their fifth wheel lineup',
  'Highland Ridge': 'above-average construction quality with innovative features',
};

const MAKE_VALUE_RETENTION: Record<string, string> = {
  'Airstream': 'hold value exceptionally well — often retaining 70%+ after 5 years',
  'Grand Design': 'hold value above average due to strong owner satisfaction and demand',
  'Winnebago': 'retain value well, especially their Class B models',
  'Tiffin': 'hold value very well in the luxury motorhome segment',
  'Newmar': 'retain value well thanks to build quality and brand prestige',
};

const DEFAULT_RELIABILITY = 'competitive build quality within their price range';
const DEFAULT_VALUE = 'follow typical RV depreciation patterns';

function buildTemplateVars(context: SearchContext, query: string): Record<string, string> {
  const { dealBreakdown } = context;
  const belowMarketCount = dealBreakdown.great + dealBreakdown.good;
  const belowMarketPct =
    dealBreakdown.totalRated > 0
      ? Math.round((belowMarketCount / dealBreakdown.totalRated) * 100)
      : 0;

  const trendSentence =
    Math.abs(context.priceTrend) >= 1.0
      ? context.priceTrend < 0
        ? `Prices are trending down ${Math.abs(context.priceTrend)}% vs the 6-month average.`
        : `Prices are trending up ${Math.abs(context.priceTrend)}% vs the 6-month average.`
      : 'Prices are relatively stable compared to the 6-month average.';

  const dealSentence =
    dealBreakdown.totalRated > 0
      ? `${belowMarketPct}% of rated listings are priced below market value.`
      : 'Deal ratings are not yet available for this search.';

  const dealRatio =
    dealBreakdown.totalRated > 0
      ? belowMarketCount / dealBreakdown.totalRated
      : 0;
  const dealSummary =
    dealRatio >= 0.3
      ? 'Good news — there are solid deals in this search.'
      : 'The deals in your search look fair overall.';

  const make = extractMakeFromQuery(query, context);

  // Towing content — adapt based on whether an RV type is known
  const towingContent = context.activeRvType
    ? `Most **${context.activeRvType}** models weigh between 3,000 and 12,000 lbs depending on size and features. Check each listing's GVWR against your tow vehicle's rated capacity.`
    : `RV weights vary enormously by type — from 2,000 lb pop-ups to 40,000+ lb Class A motorhomes. Filter by type to get more specific weight guidance.`;

  // Depreciation content
  const depreciationContent = context.priceTrend < -1
    ? `The current market for ${make} is trending down **${Math.abs(context.priceTrend).toFixed(1)}%**, which means buyers have extra negotiating power right now.`
    : `The ${make} market is relatively stable, so pricing is likely to stay consistent in the near term.`;

  return {
    resultCount: String(context.resultCount),
    medianPrice: formatPrice(context.medianPrice),
    priceMin: formatPrice(context.priceRange.min),
    priceMax: formatPrice(context.priceRange.max),
    topMakesText: formatTopMakes(context.topMakes),
    avgDom: String(context.avgDaysOnMarket),
    trendSentence,
    dealSentence,
    greatCount: String(dealBreakdown.great),
    goodCount: String(dealBreakdown.good),
    fairCount: String(dealBreakdown.fair),
    totalRated: String(dealBreakdown.totalRated),
    dealSummary,
    priceSentence: `The median price is ${formatPrice(context.medianPrice)}.`,
    rvTypeLabel: context.activeRvType ?? 'RVs',
    make,
    reliabilityTrait: MAKE_RELIABILITY[make] ?? DEFAULT_RELIABILITY,
    valueRetention: MAKE_VALUE_RETENTION[make] ?? DEFAULT_VALUE,
    towingContent,
    depreciationContent,
  };
}

// ---- Interpolation ----

function interpolate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

// ---- Recommended listing picker ----

const DEAL_RANK: Record<string, number> = { great: 3, good: 2, fair: 1 };

function pickRecommendedListings(
  category: AssistantCategory,
  listings: SRPListing[],
  context: SearchContext,
): SRPListing[] {
  if (listings.length === 0) return [];

  switch (category) {
    case 'deal-quality': {
      const rated = listings.filter(l => l.dealRating);
      rated.sort((a, b) => (DEAL_RANK[b.dealRating!] ?? 0) - (DEAL_RANK[a.dealRating!] ?? 0));
      return rated.slice(0, 3);
    }

    case 'price-analysis': {
      const median = context.medianPrice;
      const sorted = [...listings].sort(
        (a, b) => Math.abs(a.currentPrice - median) - Math.abs(b.currentPrice - median)
      );
      return sorted.slice(0, 3);
    }

    case 'recommendation':
    case 'reliability':
    case 'lifestyle': {
      const picks: SRPListing[] = [];
      const bestDeal = listings.find(l => l.dealRating === 'great')
        ?? listings.find(l => l.dealRating === 'good');
      if (bestDeal) picks.push(bestDeal);
      const topMake = context.topMakes[0];
      if (topMake) {
        const topMakeListing = listings.find(l => l.make === topMake && !picks.includes(l));
        if (topMakeListing) picks.push(topMakeListing);
      }
      const cheapest = [...listings]
        .sort((a, b) => a.currentPrice - b.currentPrice)
        .find(l => !picks.includes(l));
      if (cheapest) picks.push(cheapest);
      return picks.slice(0, 3);
    }

    case 'type-comparison': {
      const seen = new Set<string>();
      const picks: SRPListing[] = [];
      for (const l of listings) {
        const key = `${l.rvType}-${l.make}`;
        if (seen.has(key)) continue;
        seen.add(key);
        picks.push(l);
        if (picks.length >= 3) break;
      }
      return picks;
    }

    case 'depreciation': {
      // Show a range of ages for depreciation context
      const sorted = [...listings].sort((a, b) => a.year - b.year);
      if (sorted.length <= 3) return sorted;
      const oldest = sorted[0];
      const newest = sorted[sorted.length - 1];
      const mid = sorted[Math.floor(sorted.length / 2)];
      return [newest, mid, oldest];
    }

    case 'market-overview':
    default: {
      if (listings.length <= 3) return listings.slice(0, 3);
      const sorted = [...listings].sort((a, b) => a.currentPrice - b.currentPrice);
      const low = sorted[0];
      const high = sorted[sorted.length - 1];
      const midIdx = Math.floor(sorted.length / 2);
      const mid = sorted[midIdx];
      return [low, mid, high];
    }
  }
}

// ---- Direct chip responses ----
// Purpose-built responses for specific chip intents. These bypass the generic
// classifier to actually answer what the user asked.

interface DirectResponse {
  content: string;
  listings: SRPListing[];
}

function buildTypeBreakdown(listings: SRPListing[]): string {
  const counts = new Map<RVType, { count: number; minPrice: number; maxPrice: number }>();
  for (const l of listings) {
    const entry = counts.get(l.rvType) ?? { count: 0, minPrice: Infinity, maxPrice: -Infinity };
    entry.count++;
    if (l.currentPrice < entry.minPrice) entry.minPrice = l.currentPrice;
    if (l.currentPrice > entry.maxPrice) entry.maxPrice = l.currentPrice;
    counts.set(l.rvType, entry);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1].count - a[1].count);
  const rows = sorted.map(([type, data]) => {
    const label = RV_TYPE_LABELS[type] ?? type;
    const priceRange = data.minPrice === data.maxPrice
      ? `$${data.minPrice.toLocaleString()}`
      : `$${data.minPrice.toLocaleString()} – $${data.maxPrice.toLocaleString()}`;
    return `| ${label} | ${data.count} | ${priceRange} |`;
  });
  return rows.join('\n');
}

function buildMakeBreakdown(listings: SRPListing[]): string {
  const counts = new Map<string, { count: number; avgPrice: number; totalPrice: number }>();
  for (const l of listings) {
    const entry = counts.get(l.make) ?? { count: 0, avgPrice: 0, totalPrice: 0 };
    entry.count++;
    entry.totalPrice += l.currentPrice;
    counts.set(l.make, entry);
  }
  const sorted = [...counts.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8);
  const rows = sorted.map(([make, data]) => {
    const avg = Math.round(data.totalPrice / data.count);
    return `| ${make} | ${data.count} | $${avg.toLocaleString()} |`;
  });
  return rows.join('\n');
}

function buildPriceTierBreakdown(listings: SRPListing[]): string {
  const tiers = [
    { label: 'Under $25K', min: 0, max: 25000 },
    { label: '$25K – $50K', min: 25000, max: 50000 },
    { label: '$50K – $100K', min: 50000, max: 100000 },
    { label: '$100K – $200K', min: 100000, max: 200000 },
    { label: '$200K+', min: 200000, max: Infinity },
  ];
  const rows: string[] = [];
  for (const tier of tiers) {
    const inTier = listings.filter(l => l.currentPrice >= tier.min && l.currentPrice < tier.max);
    if (inTier.length === 0) continue;
    const types = new Map<string, number>();
    for (const l of inTier) {
      types.set(RV_TYPE_LABELS[l.rvType] ?? l.rvType, (types.get(RV_TYPE_LABELS[l.rvType] ?? l.rvType) ?? 0) + 1);
    }
    const topTypes = [...types.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([t]) => t).join(', ');
    rows.push(`| ${tier.label} | ${inTier.length} | ${topTypes} |`);
  }
  return rows.join('\n');
}

function tryDirectResponse(
  query: string,
  context: SearchContext,
  listings: SRPListing[],
): DirectResponse | null {
  const lower = query.toLowerCase();

  // ── "Help me choose an RV type" ──
  if (lower.includes('choose an rv type') || lower.includes('choose a type')) {
    const typeRows = buildTypeBreakdown(listings);
    const content =
`**RV Types in Your Search**

| Type | Listings | Price Range |
| --- | --- | --- |
${typeRows}

**Quick guide by lifestyle:**

- **Travel Trailers** — most popular, huge variety, towable by many SUVs and trucks. Great all-around choice.
- **Fifth Wheels** — spacious, stable towing, but require a pickup truck with a bed-mounted hitch.
- **Class A** — largest motorhomes, full residential feel, best for full-time living or long trips.
- **Class B** — camper vans, easiest to drive and park, ideal for couples or solo adventurers.
- **Class C** — mid-size motorhomes, good family option with sleeping over the cab.
- **Toy Haulers** — built-in garage for ATVs, bikes, or gear.

Start by thinking about **how you'll use it** (weekends vs. full-time), **who's coming** (couple vs. family), and **what you'll tow with** (or if you want to drive it).`;

    // Pick one listing from each type for variety
    const seen = new Set<string>();
    const picks: SRPListing[] = [];
    for (const l of listings) {
      if (seen.has(l.rvType)) continue;
      seen.add(l.rvType);
      picks.push(l);
      if (picks.length >= 3) break;
    }
    return { content, listings: picks };
  }

  // ── "Towable or motorhome?" ──
  if (lower.includes('towable or motorhome') || lower.includes('towable vs motor')) {
    const towable = listings.filter(l => ['travel-trailer', 'fifth-wheel', 'toy-hauler', 'pop-up', 'truck-camper'].includes(l.rvType));
    const motorized = listings.filter(l => ['class-a', 'class-b', 'class-c'].includes(l.rvType));
    const towAvg = towable.length > 0 ? Math.round(towable.reduce((s, l) => s + l.currentPrice, 0) / towable.length) : 0;
    const motAvg = motorized.length > 0 ? Math.round(motorized.reduce((s, l) => s + l.currentPrice, 0) / motorized.length) : 0;

    const content =
`**Towable vs. Motorhome — In Your Search**

| | Towable | Motorhome |
| --- | --- | --- |
| Listings | ${towable.length} | ${motorized.length} |
| Avg Price | $${towAvg.toLocaleString()} | $${motAvg.toLocaleString()} |

**Towable (Travel Trailers, Fifth Wheels, etc.)**
- Usually less expensive — your tow vehicle doubles as a daily driver
- Unhitch at camp and drive to town
- More floor plan variety per dollar
- Need a capable tow vehicle (check weight ratings)

**Motorhome (Class A, B, C)**
- All-in-one — just get in and go
- No separate tow vehicle needed (but many tow a car behind)
- Class B vans fit in a normal parking spot
- Higher upfront cost, but only one vehicle to maintain

**Bottom line:** If you already own a truck or SUV, towable gives you more RV for the money. If you want simplicity or plan to travel frequently, a motorhome keeps things easy.`;

    const picks: SRPListing[] = [];
    if (towable.length > 0) picks.push(towable[0]);
    if (motorized.length > 0) picks.push(motorized[0]);
    if (towable.length > 1) picks.push(towable[Math.floor(towable.length / 2)]);
    return { content, listings: picks.slice(0, 3) };
  }

  // ── "What are the best RV brands?" ──
  if (lower.includes('best rv brands') || lower.includes('best brands')) {
    const makeRows = buildMakeBreakdown(listings);
    const content =
`**Top Brands in Your Search**

| Brand | Listings | Avg Price |
| --- | --- | --- |
${makeRows}

**Brand reputation tiers** (general industry consensus):

**Premium** — Airstream, Tiffin, Newmar, Entegra. Higher price, excellent build quality and resale value.

**Upper-mid** — Grand Design, Winnebago, Jayco. Strong owner satisfaction, good quality-to-price ratio.

**Volume** — Forest River, Thor, Keystone, Coachmen. Wide model range, competitive pricing, mixed quality across lines — their premium sub-brands (e.g. Grand Design under Winnebago, Riverstone under Forest River) are notably better.

Brand matters less than the specific **model and model year**. Check owner forums for the exact unit you're considering.`;

    // Show one from top 3 makes
    const picks: SRPListing[] = [];
    const seenMakes = new Set<string>();
    for (const l of listings) {
      if (seenMakes.has(l.make)) continue;
      seenMakes.add(l.make);
      picks.push(l);
      if (picks.length >= 3) break;
    }
    return { content, listings: picks };
  }

  // ── "What's popular right now?" ──
  if (lower.includes('popular right now') || lower.includes("what's popular")) {
    const typeCounts = new Map<string, number>();
    const makeCounts = new Map<string, number>();
    for (const l of listings) {
      typeCounts.set(l.rvType, (typeCounts.get(l.rvType) ?? 0) + 1);
      makeCounts.set(l.make, (makeCounts.get(l.make) ?? 0) + 1);
    }
    const topType = [...typeCounts.entries()].sort((a, b) => b[1] - a[1])[0];
    const topMakes = [...makeCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
    const topTypeLabel = topType ? (RV_TYPE_LABELS[topType[0] as RVType] ?? topType[0]) : 'Travel Trailers';

    const greatDeals = listings.filter(l => l.dealRating === 'great').length;
    const fastMovers = listings.filter(l => l.daysOnSite <= 14).length;

    const content =
`**What's Trending Across ${context.resultCount} Listings**

**Most listed type:** ${topTypeLabel} (${topType?.[1] ?? 0} listings)
**Top brands:** ${topMakes.map(([m, c]) => `${m} (${c})`).join(', ')}
**Median price:** ${formatPrice(context.medianPrice)}

${greatDeals > 0 ? `**${greatDeals} listings** are priced well below market — worth a look.` : ''}
${fastMovers > 0 ? `**${fastMovers} listings** were added in the last 2 weeks — the freshest inventory.` : ''}

${context.priceTrend < -1 ? `Prices are trending **down ${Math.abs(context.priceTrend)}%** vs the 6-month average — buyer leverage is strong right now.` : context.priceTrend > 1 ? `Prices are trending **up ${Math.abs(context.priceTrend)}%** — demand is rising.` : 'Prices are stable compared to recent months.'}`;

    // Show the freshest or best-deal listings
    const sorted = [...listings].sort((a, b) => a.daysOnSite - b.daysOnSite);
    return { content, listings: sorted.slice(0, 3) };
  }

  // ── "What can I get for my budget?" ──
  if (lower.includes('get for my budget') || lower.includes('for my budget')) {
    const tierRows = buildPriceTierBreakdown(listings);
    const content =
`**What's Available by Price**

| Price Range | Listings | Mostly |
| --- | --- | --- |
${tierRows}

**Budget guide:**

- **Under $25K** — Used travel trailers, pop-ups, older Class C motorhomes. Good entry point.
- **$25K–$50K** — Sweet spot for used mid-size travel trailers and fifth wheels. Some newer entry-level units.
- **$50K–$100K** — Newer models, larger floor plans, used Class A and C motorhomes. Good variety.
- **$100K–$200K** — New mid-range to premium units. Used luxury motorhomes.
- **$200K+** — New luxury Class A diesels, high-end fifth wheels, premium brands.

The best **value** is usually a **3–5 year old unit** — past the steepest depreciation but still in great shape.`;

    // Show one from low, mid, high price
    const sorted = [...listings].sort((a, b) => a.currentPrice - b.currentPrice);
    const picks: SRPListing[] = [];
    if (sorted.length >= 3) {
      picks.push(sorted[0], sorted[Math.floor(sorted.length / 2)], sorted[sorted.length - 1]);
    } else {
      picks.push(...sorted.slice(0, 3));
    }
    return { content, listings: picks };
  }

  // ── "First RV — where do I start?" / "Best pick for a first-timer?" ──
  if (lower.includes('first rv') || lower.includes('first-timer') || lower.includes('where do i start') || lower.includes('for beginners')) {
    const entryLevel = [...listings]
      .filter(l => l.currentPrice <= 50000 && l.lengthFt <= 30)
      .sort((a, b) => {
        const aScore = (a.dealRating === 'great' ? 3 : a.dealRating === 'good' ? 2 : 1);
        const bScore = (b.dealRating === 'great' ? 3 : b.dealRating === 'good' ? 2 : 1);
        return bScore - aScore;
      });

    const content =
`**First-Timer's Guide**

If you're new to RVing, here's how to narrow it down:

**1. How will you use it?**
- Weekend campgrounds → Travel Trailer or Pop-Up (easiest, most affordable)
- Road trips → Class C or Class B (drive, park, done)
- Extended travel → Class A or Fifth Wheel (most space and comfort)

**2. Can you tow?**
- Own a truck or SUV? → Towable RVs give you more space per dollar
- No tow vehicle? → Class B van or Class C motorhome — self-contained

**3. How many people?**
- Couple → Class B, small travel trailer (under 25 ft)
- Family → Bunkhouse travel trailer, Class C with bunks
- Solo → Truck camper, small Class B

**4. Start small.** Your first RV doesn't have to be your forever RV. Smaller units (under 28 ft) are easier to tow, park, and back into a campsite. You can always upgrade once you know what you like.

${entryLevel.length > 0 ? `There are **${entryLevel.length} beginner-friendly options** in your search (under $50K, under 30 ft).` : ''}`;

    return { content, listings: entryLevel.slice(0, 3) };
  }

  // ── "What's the market like?" (generic, no filters) ──
  if (lower === "what's the market like?" || lower === 'what is the market like') {
    const { dealBreakdown } = context;
    const belowMarket = dealBreakdown.great + dealBreakdown.good;
    const belowPct = dealBreakdown.totalRated > 0
      ? Math.round((belowMarket / dealBreakdown.totalRated) * 100)
      : 0;

    const typeRows = buildTypeBreakdown(listings);
    const content =
`**Market Overview — ${context.resultCount} Listings**

| Type | Listings | Price Range |
| --- | --- | --- |
${typeRows}

**Key metrics:**
- **Median price:** ${formatPrice(context.medianPrice)}
- **Price range:** ${formatPrice(context.priceRange.min)} – ${formatPrice(context.priceRange.max)}
- **Avg days on market:** ${context.avgDaysOnMarket} days
${belowPct > 0 ? `- **${belowPct}% of rated listings** are priced below market value` : ''}

${context.priceTrend < -1 ? `Prices are trending **down ${Math.abs(context.priceTrend)}%** — it's a buyer's market.` : context.priceTrend > 1 ? `Prices are trending **up ${context.priceTrend}%** — sellers have leverage.` : 'Prices are stable — no strong pressure in either direction.'}`;

    const sorted = [...listings].sort((a, b) => a.currentPrice - b.currentPrice);
    const picks: SRPListing[] = [];
    if (sorted.length >= 3) {
      picks.push(sorted[0], sorted[Math.floor(sorted.length / 2)], sorted[sorted.length - 1]);
    } else {
      picks.push(...sorted.slice(0, 3));
    }
    return { content, listings: picks };
  }

  return null;
}

// ---- Main service ----

export async function mockSrpAssistantService(
  query: string,
  context: SearchContext,
  listings: SRPListing[] = [],
): Promise<AssistantMessageData> {
  // 1. Check guardrails first
  const guardrailResponse = checkGuardrails(query);
  if (guardrailResponse) {
    const delay = 500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return { type: 'text', content: guardrailResponse };
  }

  // 2. Try direct chip responses (purpose-built answers for known intents)
  const direct = tryDirectResponse(query, context, listings);
  if (direct) {
    const delay = 500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return { type: 'text', content: direct.content, recommendedListings: direct.listings };
  }

  // 3. Classify query (generic fallback)
  const category = classifyQuery(query);

  // 4. Build template vars (now also receives query for make extraction)
  const vars = buildTemplateVars(context, query);

  // 5. Get first template (deterministic)
  const template = RESPONSE_TEMPLATES[category][0];

  // 6. Interpolate
  const content = interpolate(template, vars);

  // 7. Pick recommended listings
  const recommendedListings = pickRecommendedListings(category, listings, context);

  // 8. Simulate async delay
  const delay = 500 + Math.random() * 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // 9. Return typed response with recommended listings
  return { type: 'text', content, recommendedListings };
}
