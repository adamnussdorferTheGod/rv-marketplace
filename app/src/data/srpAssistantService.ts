import type { SRPListing } from './srpTypes';
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
  | 'recommendation';

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

  // Compute top 3 makes by frequency
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
    'average price', 'price range', 'pricing',
  ],
  'type-comparison': [
    'compare', 'versus', 'vs', 'difference', 'better',
    'class a', 'class b', 'class c', 'travel trailer',
    'fifth wheel', 'toy hauler', 'type',
  ],
  'deal-quality': [
    'deal', 'deals', 'bargain', 'value', 'great deal', 'good deal',
    'best deal', 'underpriced', 'below market',
  ],
  recommendation: [
    'recommend', 'suggest', 'best', 'popular', 'top', 'favorite',
    'which', 'what should',
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

// ---- Response templates ----

const RESPONSE_TEMPLATES: Record<AssistantCategory, string[]> = {
  'market-overview': [
    'There are currently {resultCount} listings matching your search, with a median asking price of {medianPrice}. {trendSentence} Listings average {avgDom} days on market. {dealSentence}',
    'Your search includes {resultCount} {rvTypeLabel} with prices centered around {medianPrice}. {trendSentence} {dealSentence} The most common makes are {topMakesText}.',
  ],
  'price-analysis': [
    'Prices range from {priceMin} to {priceMax}, with a median of {medianPrice}. {trendSentence} {dealSentence}',
    'The median asking price is {medianPrice} across {resultCount} listings. {trendSentence} The range spans {priceMin} to {priceMax}. {dealSentence}',
  ],
  'type-comparison': [
    'Among the {resultCount} listings in your search, the most popular makes are {topMakesText}. {priceSentence} {dealSentence}',
    'Your search covers {resultCount} {rvTypeLabel}. The top makes by volume are {topMakesText}, with a median price of {medianPrice}. {dealSentence}',
  ],
  'deal-quality': [
    '{dealSummary} Out of {totalRated} rated listings, {greatCount} are priced well below market and {goodCount} are below market. {priceSentence}',
    '{dealSummary} {greatCount} listings stand out as great deals, with {goodCount} more priced below market. The median asking price is {medianPrice}. {trendSentence}',
  ],
  recommendation: [
    "Based on your current search of {resultCount} listings, here's what stands out: {dealSentence} The median asking price is {medianPrice}, with listings averaging {avgDom} days on market. {trendSentence}",
    "Across {resultCount} {rvTypeLabel}, the median price is {medianPrice}. {dealSentence} {trendSentence} The most popular makes here are {topMakesText}.",
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

function buildTemplateVars(context: SearchContext): Record<string, string> {
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
    totalRated: String(dealBreakdown.totalRated),
    dealSummary,
    priceSentence: `The median price is ${formatPrice(context.medianPrice)}.`,
    rvTypeLabel: context.activeRvType ?? 'RVs',
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

// ---- Main service ----

export async function mockSrpAssistantService(
  query: string,
  context: SearchContext,
): Promise<AssistantMessageData> {
  // 1. Check guardrails first
  const guardrailResponse = checkGuardrails(query);
  if (guardrailResponse) {
    const delay = 500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return { type: 'text', content: guardrailResponse };
  }

  // 2. Classify query
  const category = classifyQuery(query);

  // 3. Build template vars
  const vars = buildTemplateVars(context);

  // 4. Get first template (deterministic)
  const template = RESPONSE_TEMPLATES[category][0];

  // 5. Interpolate
  const content = interpolate(template, vars);

  // 6. Simulate async delay
  const delay = 500 + Math.random() * 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // 7. Return typed response
  return { type: 'text', content };
}
