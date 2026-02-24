import type { ListingData } from '../../../app/src/data/types';
import type { ConversationMessage } from './types';

type Category = 'price' | 'specs' | 'comparison' | 'ownership' | 'towing' | 'fitcheck' | 'general';

const KEYWORD_MAP: Record<string, Category> = {
  price: 'price',
  cost: 'price',
  worth: 'price',
  value: 'price',
  deal: 'price',
  expensive: 'price',
  cheap: 'price',
  afford: 'price',
  negotiate: 'price',
  offer: 'price',
  financing: 'price',
  payment: 'price',
  loan: 'price',

  spec: 'specs',
  feature: 'specs',
  length: 'specs',
  weight: 'specs',
  sleep: 'specs',
  bed: 'specs',
  bathroom: 'specs',
  kitchen: 'specs',
  slide: 'specs',
  tank: 'specs',
  capacity: 'specs',
  appliance: 'specs',
  air: 'specs',
  condition: 'specs',

  compare: 'comparison',
  versus: 'comparison',
  vs: 'comparison',
  better: 'comparison',
  alternative: 'comparison',
  similar: 'comparison',
  difference: 'comparison',
  competitor: 'comparison',

  maintain: 'ownership',
  maintenance: 'ownership',
  insurance: 'ownership',
  warranty: 'ownership',
  repair: 'ownership',
  resale: 'ownership',
  depreciation: 'ownership',
  own: 'ownership',
  store: 'ownership',
  storage: 'ownership',
  winter: 'ownership',

  tow: 'towing',
  hitch: 'towing',
  truck: 'towing',
  vehicle: 'towing',
  pull: 'towing',
  haul: 'towing',
  tongue: 'towing',
  sway: 'towing',
  brake: 'towing',

  fit: 'fitcheck',
  family: 'fitcheck',
  'off-road': 'fitcheck',
  offroad: 'fitcheck',
  dog: 'fitcheck',
  pet: 'fitcheck',
  kid: 'fitcheck',
  child: 'fitcheck',
  children: 'fitcheck',
  camping: 'fitcheck',
  boondock: 'fitcheck',
  'full-time': 'fitcheck',
  fulltim: 'fitcheck',
  couple: 'fitcheck',
  retire: 'fitcheck',
  weekend: 'fitcheck',
  'road trip': 'fitcheck',
  looking: 'fitcheck',
  dream: 'fitcheck',
  need: 'fitcheck',
  suitable: 'fitcheck',
  right: 'fitcheck',
  good: 'fitcheck',
  work: 'fitcheck',
};

function classifyMessage(message: string): Category {
  const lower = message.toLowerCase();
  const scores: Record<Category, number> = {
    price: 0,
    specs: 0,
    comparison: 0,
    ownership: 0,
    towing: 0,
    fitcheck: 0,
    general: 0,
  };

  for (const [keyword, category] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
      scores[category]++;
    }
  }

  const best = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a));
  return best[1] > 0 ? (best[0] as Category) : 'general';
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

function getResponse(category: Category, listing: ListingData): string {
  const responses: Record<Category, string[]> = {
    price: [
      `The ${listing.year} ${listing.make} ${listing.model} is currently listed at **${formatPrice(listing.currentPrice)}**, reduced from the original asking price of ${formatPrice(listing.originalPrice)}. That's a **${formatPrice(listing.originalPrice - listing.currentPrice)} savings**.

Based on our market analysis, similar ${listing.make} ${listing.model} models in the area range from ${formatPrice(listing.priceAnalysis.rangeMin)} to ${formatPrice(listing.priceAnalysis.rangeMax)}, with an average of ${formatPrice(listing.priceAnalysis.averagePrice)}. This listing is priced **below the market average**, which makes it a competitive deal.

${listing.isNegotiable ? 'The seller has indicated they are **willing to negotiate**, so there may be room to discuss the price further.' : ''} Estimated monthly payments start around ${formatPrice(listing.monthlyPayment)}/mo with financing.`,

      `Great question about pricing! At **${formatPrice(listing.currentPrice)}**, this ${listing.model} ${listing.trim} is positioned well in the current market. Here's why:

- **Listed price:** ${formatPrice(listing.currentPrice)} (down from ${formatPrice(listing.originalPrice)})
- **Market average:** ${formatPrice(listing.priceAnalysis.averagePrice)} for comparable models
- **Price position:** Below average — rated as a "${listing.dealRating}" deal

${listing.isNegotiable ? 'The dealer has also flagged this as negotiable, so it could be worth reaching out to discuss terms.' : ''}`,
    ],
    specs: [
      `Here's a breakdown of the key specs for this ${listing.year} ${listing.make} ${listing.model} ${listing.trim}:

${listing.specs.map((s) => `- **${s.label}:** ${s.value}`).join('\n')}

The ${listing.model} features Airstream's signature aluminum construction, which keeps the overall weight low relative to its size. The interior includes a full kitchen with stainless steel appliances, a convertible dinette, and panoramic windows. The ${listing.trim} floor plan provides a dedicated rear bath with a separate shower.`,

      `The ${listing.model} ${listing.trim} is a well-equipped travel trailer. Some highlights:

| Spec | Value |
|------|-------|
${listing.specs.map((s) => `| ${s.label} | ${s.value} |`).join('\n')}

What makes this model stand out is the combination of a **full rear bathroom** with a separate shower, and a relatively low GVWR that makes it towable by many half-ton trucks. The aluminum construction also means excellent durability and strong resale value.`,
    ],
    comparison: [
      `When comparing the ${listing.year} ${listing.make} ${listing.model} to other travel trailers in this class, there are a few things to consider:

**Vs. Grand Design Imagine 2500RL (~$43K)**
- Significantly less expensive, but uses traditional construction vs. Airstream's aluminum
- Similar floor plan and sleeping capacity
- Airstream typically holds resale value much better

**Vs. Airstream International 25IB (~$112K)**
- The International is Airstream's premium line with upgraded finishes
- Same aluminum construction and build quality
- The Flying Cloud offers similar livability at a lower price point

**Vs. Winnebago Micro Minnie 2225RL (~$35K)**
- Much more budget-friendly but smaller and lighter
- Fewer standard features and different construction
- The Flying Cloud offers a more spacious, premium experience

At **${formatPrice(listing.currentPrice)}**, this Flying Cloud sits in the sweet spot between premium features and reasonable pricing.`,
    ],
    ownership: [
      `Here's what to expect with owning a ${listing.make} ${listing.model}:

**Resale Value**
Airstreams are known for **exceptional resale value** — often retaining 70-80% of their value after 5 years, significantly better than most RV brands.

**Maintenance**
- Annual inspections: $200-400 for seals, roof, and systems check
- Aluminum body means **no risk of wood rot** unlike fiberglass trailers
- AC units, water heater, and appliances should be serviced annually

**Insurance**
Full-timer insurance runs $1,000-2,000/year; occasional-use policies are typically $500-1,000/year depending on your state and usage.

**Storage**
At 25 ft, you'll need a space roughly 28-30 ft long. Covered storage runs $100-300/month depending on your area. ${listing.location} has several RV storage facilities nearby.

**Warranty**
New Airstreams come with a 3-year limited warranty and a 2-year coverage on appliances. Contact ${listing.dealer.name} for specifics on what remains.`,
    ],
    towing: [
      `Towing the ${listing.make} ${listing.model} ${listing.trim} — here's what you need to know:

**Weight Specs**
- **GVWR:** ${listing.specs.find((s) => s.label === 'GVWR')?.value || '3,500 lbs'}
- **Length:** ${listing.specs.find((s) => s.label === 'Length')?.value || '25 ft'}

**Tow Vehicle Requirements**
For a trailer with this GVWR, you'll generally need:
- A **half-ton truck** (F-150, Ram 1500, Silverado 1500) or equivalent SUV
- Minimum tow rating of ~5,000 lbs for a comfortable safety margin
- A **weight-distributing hitch** is highly recommended
- Electric trailer brakes are required

**Airstream Advantage**
The aluminum aerodynamic shell is one of the Flying Cloud's biggest towing advantages. It produces less wind resistance than flat-sided trailers, which translates to better fuel economy and more stable towing, especially in crosswinds.

**Tips**
- Always stay within 80% of your vehicle's maximum tow rating
- Consider a sway control system for added stability
- Practice backing up in an empty parking lot before hitting the road`,
    ],
    fitcheck: [
      `Great question — let's see how this ${listing.year} ${listing.make} ${listing.model} stacks up for what you're looking for.

**What fits**
- **Sleeping capacity:** ${listing.specs.find((s) => s.label === 'Sleeping capacity')?.value || '4-6'} — comfortable for a family of four with room for guests
- **Full rear bathroom** with separate shower — a must for families
- **Kitchen & dinette** — full-size appliances and a convertible dinette for meals on the road
- **Aluminum construction** — lightweight and durable, holds up well on rougher roads

**What to double-check**
- **Ground clearance:** The Flying Cloud is a travel trailer, not purpose-built for off-road. Check clearance at the campgrounds you're targeting — improved gravel roads are fine, but rocky trails may be risky
- **Pet space:** No dedicated pet area, but the dinette/living area gives a dog room to hang out. Consider a crate that fits the ${listing.specs.find((s) => s.label === 'Length')?.value || '25 ft'} floor plan
- **Tow vehicle:** You'll need a half-ton truck (F-150, Ram 1500, etc.) with at least 5,000 lb towing capacity

**What doesn't fit**
- If you need true off-grid boondocking for extended periods, the tank capacities may limit you to 3-4 days between fill-ups
- Not ideal for narrow backcountry roads — at ${listing.specs.find((s) => s.label === 'Length')?.value || '25 ft'}, tight turns can be challenging

**Overall:** This is a solid choice for a family that wants to explore campgrounds and improved roads. For hardcore off-roading, you'd want to look at smaller, purpose-built trailers. But for 90% of family camping? **This fits well.**`,

      `I analyzed the specs and photos for this ${listing.year} ${listing.model} ${listing.trim} against your requirements. Here's the breakdown:

**Fits your needs**
- **Family of four:** ${listing.specs.find((s) => s.label === 'Sleeping capacity')?.value || '4-6'} sleeping capacity with a queen bed and convertible dinette
- **Build quality:** Airstream's aluminum shell is one of the most durable on the market — great for families who want something that lasts
- **Rear bathroom:** Private, full-size bathroom means no campground shower lines with kids
- **Price:** At ${formatPrice(listing.currentPrice)}, it's a "${listing.dealRating}" deal compared to the ${formatPrice(listing.priceAnalysis.averagePrice)} market average

**Worth investigating**
- **Dog-friendliness:** The interior has hard-surface flooring (easy to clean), but measure the living space to make sure your dog has room. The dinette area is roughly 6' x 4'
- **Off-road capability:** Airstreams handle well-maintained forest roads and gravel, but the standard axle isn't built for rock crawling. Ask ${listing.dealer.name} about upgraded suspension options
- **Storage:** Check if the exterior storage compartments fit your family's gear — bikes, camping equipment, dog supplies add up fast

**Potential gaps**
- If "off-roading" means unimproved trails, this trailer is too long and low. Consider the Airstream Basecamp for that use case
- Four people + a large dog in ${listing.specs.find((s) => s.label === 'Length')?.value || '25 ft'} is cozy on rainy days — not a dealbreaker but set expectations

**Bottom line:** For a family that camps at established campgrounds with occasional forest road access, this is an **excellent fit**. The ${listing.model} punches above its weight in durability and resale value. Want me to dig into any of these areas?`,
    ],
    general: [
      `The ${listing.year} ${listing.make} ${listing.model} ${listing.trim} is a **premium travel trailer** listed at ${formatPrice(listing.currentPrice)} in ${listing.location}.

Here are some key highlights:
- **Iconic aluminum construction** — lightweight, durable, and excellent resale
- **${listing.trim} floor plan** with a dedicated rear bathroom
- **${listing.specs.find((s) => s.label === 'Sleeping capacity')?.value || '4'} sleeping capacity** with a convertible dinette
- Price reduced by ${formatPrice(listing.originalPrice - listing.currentPrice)} from ${formatPrice(listing.originalPrice)}
- Rated as a **"${listing.dealRating}" deal** based on market comparisons

${listing.dealer.name} in ${listing.dealer.location} is ${listing.dealer.isTop50 ? 'a **Top 50 RV Trader dealer** and ' : ''}available ${listing.dealer.hours}.

What would you like to know more about? I can dive into pricing, specs, towing requirements, ownership costs, or how this compares to similar models.`,

      `Thanks for your question! This ${listing.year} ${listing.model} is a well-regarded travel trailer in the ${listing.make} lineup. At ${formatPrice(listing.currentPrice)}, it's priced below the ${formatPrice(listing.priceAnalysis.averagePrice)} average for comparable models in the area.

The ${listing.trim} configuration is popular for its:
- Full rear bathroom with separate shower
- Spacious kitchen and living area
- Low towing weight relative to size

Is there something specific you'd like to explore — like pricing details, towing compatibility, or how it compares to other options?`,
    ],
  };

  const options = responses[category];
  return options[Math.floor(Math.random() * options.length)];
}

export function generateAiResponse(
  listing: ListingData,
  message: string,
  _history: ConversationMessage[],
): Promise<string> {
  const category = classifyMessage(message);
  const response = getResponse(category, listing);
  const delay = 800 + Math.random() * 700;

  return new Promise((resolve) => {
    setTimeout(() => resolve(response), delay);
  });
}
