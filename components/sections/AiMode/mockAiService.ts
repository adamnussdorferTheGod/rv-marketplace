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

type SrpCategory =
  | 'price'
  | 'specs'
  | 'comparison'
  | 'ownership'
  | 'towing'
  | 'fitcheck'
  | 'beginner'
  | 'camping'
  | 'fulltiming'
  | 'general';

const SRP_KEYWORD_MAP: Record<string, SrpCategory> = {
  // Price / budget
  price: 'price', cost: 'price', budget: 'price', afford: 'price', expensive: 'price',
  cheap: 'price', money: 'price', financing: 'price', loan: 'price', payment: 'price',
  negotiate: 'price', worth: 'price', deal: 'price', save: 'price', value: 'price',
  'how much': 'price', spend: 'price', invest: 'price', dollar: 'price',

  // Specs / features
  spec: 'specs', feature: 'specs', length: 'specs', weight: 'specs', sleep: 'specs',
  bed: 'specs', bathroom: 'specs', kitchen: 'specs', slide: 'specs', tank: 'specs',
  capacity: 'specs', appliance: 'specs', solar: 'specs', generator: 'specs',
  inverter: 'specs', 'floor plan': 'specs', floorplan: 'specs', layout: 'specs',
  bunk: 'specs', queen: 'specs', king: 'specs', shower: 'specs', toilet: 'specs',
  fridge: 'specs', oven: 'specs', microwave: 'specs', washer: 'specs', dryer: 'specs',

  // Comparisons
  compare: 'comparison', versus: 'comparison', vs: 'comparison', better: 'comparison',
  alternative: 'comparison', similar: 'comparison', difference: 'comparison',
  brand: 'comparison', 'class a': 'comparison', 'class b': 'comparison', 'class c': 'comparison',
  'fifth wheel': 'comparison', 'travel trailer': 'comparison', 'toy hauler': 'comparison',
  motorhome: 'comparison', camper: 'comparison', van: 'comparison',

  // Ownership
  maintain: 'ownership', maintenance: 'ownership', insurance: 'ownership',
  warranty: 'ownership', repair: 'ownership', resale: 'ownership',
  depreciation: 'ownership', store: 'ownership', storage: 'ownership',
  winter: 'ownership', winterize: 'ownership', inspect: 'ownership', inspection: 'ownership',
  problem: 'ownership', issue: 'ownership', fix: 'ownership', break: 'ownership',
  leak: 'ownership', roof: 'ownership', tire: 'ownership', battery: 'ownership',
  propane: 'ownership', sewer: 'ownership', dump: 'ownership', 'water heater': 'ownership',

  // Towing
  tow: 'towing', hitch: 'towing', truck: 'towing', pull: 'towing', haul: 'towing',
  tongue: 'towing', sway: 'towing', brake: 'towing', 'weight distribution': 'towing',
  gvwr: 'towing', payload: 'towing', 'tow rating': 'towing', 'f-150': 'towing',
  'f150': 'towing', 'ram 1500': 'towing', silverado: 'towing', tacoma: 'towing',
  '4runner': 'towing', suv: 'towing', 'half ton': 'towing', 'half-ton': 'towing',
  diesel: 'towing', mpg: 'towing', 'fuel economy': 'towing', gas: 'towing',

  // Fitcheck / recommendation
  fit: 'fitcheck', family: 'fitcheck', 'off-road': 'fitcheck', offroad: 'fitcheck',
  dog: 'fitcheck', pet: 'fitcheck', cat: 'fitcheck', kid: 'fitcheck', child: 'fitcheck',
  children: 'fitcheck', couple: 'fitcheck', retire: 'fitcheck', senior: 'fitcheck',
  solo: 'fitcheck', single: 'fitcheck', recommend: 'fitcheck', suggestion: 'fitcheck',
  suggest: 'fitcheck', looking: 'fitcheck', need: 'fitcheck', suitable: 'fitcheck',
  right: 'fitcheck', good: 'fitcheck', best: 'fitcheck',

  // Beginner
  beginner: 'beginner', 'first time': 'beginner', 'first rv': 'beginner', starter: 'beginner',
  newbie: 'beginner', learn: 'beginner', start: 'beginner', tip: 'beginner', advice: 'beginner',
  mistake: 'beginner', 'should i': 'beginner', how: 'beginner', guide: 'beginner',

  // Camping / travel
  camp: 'camping', campground: 'camping', park: 'camping', destination: 'camping',
  boondock: 'camping', 'dry camp': 'camping', hookup: 'camping', 'rv park': 'camping',
  'national park': 'camping', 'state park': 'camping', trip: 'camping', travel: 'camping',
  'road trip': 'camping', route: 'camping', drive: 'camping', adventure: 'camping',
  explore: 'camping', vacation: 'camping', getaway: 'camping', beach: 'camping',
  mountain: 'camping', desert: 'camping', forest: 'camping',

  // Full-timing
  'full-time': 'fulltiming', 'full time': 'fulltiming', fulltime: 'fulltiming',
  'live in': 'fulltiming', nomad: 'fulltiming', 'digital nomad': 'fulltiming',
  remote: 'fulltiming', 'work from': 'fulltiming', wifi: 'fulltiming',
  internet: 'fulltiming', starlink: 'fulltiming', mail: 'fulltiming',
  domicile: 'fulltiming', address: 'fulltiming',
};

function classifySrpMessage(message: string): SrpCategory {
  const lower = message.toLowerCase();
  const scores: Record<SrpCategory, number> = {
    price: 0, specs: 0, comparison: 0, ownership: 0, towing: 0,
    fitcheck: 0, beginner: 0, camping: 0, fulltiming: 0, general: 0,
  };

  for (const [keyword, category] of Object.entries(SRP_KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
      scores[category]++;
    }
  }

  const best = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a));
  return best[1] > 0 ? (best[0] as SrpCategory) : 'general';
}

const SRP_RESPONSES: Record<SrpCategory, string[]> = {
  price: [
    `Here's what to expect at different RV price points in 2025-2026:

| Budget | What You Get |
|--------|-------------|
| **$10K-$25K** | Older used travel trailers (2012-2018), pop-up campers, basic Class B vans |
| **$25K-$50K** | Solid used travel trailers (2019-2023), entry-level new trailers, used Class C |
| **$50K-$80K** | Quality used fifth wheels, mid-range new trailers (Airstream Basecamp), used Class B vans |
| **$80K-$150K** | New mid-range motorhomes, premium travel trailers, lightly-used Class B/C |
| **$150K+** | New Class A/C, luxury fifth wheels, new Airstream, premium diesel pushers |

**Pro tip:** The sweet spot for value is **2-3 year old used units**. Pandemic-era buyers are selling, and you can find lightly-used RVs at 30-40% below MSRP. Always budget an extra **$2,000-$5,000** for a pre-purchase inspection and any immediate repairs.`,

    `Great question about RV pricing! Here's a realistic breakdown of **total cost of ownership** that most buyers don't think about:

**Purchase price** is just the start. Budget for:
- **Insurance:** $500-$2,000/year depending on type and coverage
- **Registration/taxes:** Varies by state, but can be 3-8% of purchase price
- **Campground fees:** $25-$75/night (full hookups), $500-$1,200/month for long-term
- **Maintenance:** $1,000-$3,000/year for routine upkeep
- **Storage:** $100-$400/month if you can't keep it at home
- **Fuel:** Class A gets 6-10 mpg, Class C gets 10-16 mpg, towing drops your truck by 30-50%

**Financing tips:**
- RV loans typically run 5-7% APR for good credit (720+)
- Terms can go up to 20 years on new units over $50K
- Don't stretch payments just to afford more RV — the depreciation curve is steep in years 1-3

What's your target budget? I can recommend specific models.`,

    `The RV market right now is actually in a **buyer-friendly window**. Here's why:

**Why prices are good in 2025-2026:**
- Pandemic-era buyers oversaturated the market — many are selling after 2-3 trips
- Dealer inventory is high, which means more room to negotiate
- Interest rates have stabilized, making financing more predictable

**Negotiation tips:**
- **New RVs:** Expect 15-25% off MSRP at most dealers. Start at 30% off and work from there
- **Used from dealer:** Typically 5-15% room to negotiate
- **Private party:** Check NADA values first — many sellers overprice based on emotion
- **End of season** (Sept-Nov) gets the best deals as dealers clear inventory
- Always get a **pre-purchase inspection** ($300-$600) — it gives you leverage and protects your investment

Want me to help you figure out a realistic budget for what you're looking for?`,
  ],

  specs: [
    `Here's a quick guide to the specs that actually matter when comparing RVs:

**Weight specs (critical for towing):**
- **Dry weight:** The RV empty — but you'll never travel empty
- **GVWR:** Max loaded weight — stay under this or you risk safety and warranty issues
- **Tongue weight:** How much presses down on your hitch (usually 10-15% of total)
- **Cargo capacity:** GVWR minus dry weight — this is your gear, water, and people

**Living specs:**
- **Sleeping capacity:** Manufacturers inflate this. A "sleeps 8" usually comfortably sleeps 4-5
- **Fresh water tank:** 30-50 gallons is standard. Bigger = more boondocking time
- **Gray/black tanks:** 30-40 gallons each. Bigger means fewer dump station trips
- **Slide-outs:** Add 2-4 feet of interior width but add weight, cost, and potential leak points

**Don't overlook:**
- **Ceiling height:** 6'3" vs 6'8" makes a huge difference in how spacious it feels
- **Holding tank heaters:** Essential if you camp in cold weather
- **LP tank size:** Two 30-lb tanks is standard. Bigger = longer between refills

What specific features are you prioritizing?`,

    `Great question! The **floor plan** is the single most important spec — it determines how livable the RV actually is. Here's how to evaluate them:

**Rear bath vs mid bath:**
- **Rear bath** — most popular, gives the bathroom its own space. Best for couples
- **Mid bath** — bathroom between bedroom and living area. Better sound separation

**Bunkhouse floor plans:**
- Dedicated bunk room (usually rear) with 2-4 bunks
- Great for families, but the bunks eat into storage space
- Look for bunks with privacy curtains — kids love them

**Murphy bed / convertible layouts:**
- Queen bed folds up to reveal a sofa during the day
- Best for shorter RVs where space is premium
- Check the mechanism — some are easier than others

**Key measurements to check:**
- Walk-around bed vs wall-to-wall (can you get dressed without climbing over someone?)
- Shower size — anything under 30"x30" feels cramped
- Fridge size — residential vs RV fridge changes your meal planning completely
- Counter space — at least 3 feet of usable prep area for real cooking

**Solar & electrical:**
- **200W solar** is minimum for weekend boondocking
- **400W+ with lithium batteries** for extended off-grid
- **30 amp vs 50 amp** service — 50 amp lets you run AC and microwave simultaneously

Would you like recommendations for a specific floor plan layout?`,
  ],

  comparison: [
    `Here's a practical breakdown of the major RV types:

**Class A Motorhome** — The full-size bus
- Length: 25-45 ft | Budget: $80K-$300K+ | MPG: 6-10
- ✅ Most living space, residential features, powerful engine
- ❌ Hard to drive/park, expensive to maintain, poor fuel economy
- Best for: Long trips, full-timers, people who don't want to tow

**Class B Camper Van** — The adventure van
- Length: 17-22 ft | Budget: $60K-$200K | MPG: 18-25
- ✅ Easy to drive daily, fits in parking spots, great fuel economy
- ❌ Very limited space, tiny bathroom (if any), expensive for size
- Best for: Couples, weekend warriors, stealth camping

**Class C Motorhome** — The sweet spot
- Length: 22-35 ft | Budget: $60K-$180K | MPG: 10-16
- ✅ Good living space, overhead bunk, easier to drive than Class A
- ❌ Cab-over area can leak, engine maintenance costs
- Best for: Families, extended travel, first-time motorhome buyers

**Travel Trailer** — The versatile towable
- Length: 12-35 ft | Budget: $15K-$80K
- ✅ Unhitch and use your truck around town, huge variety of layouts
- ❌ Need a tow vehicle, backing up takes practice, sway in wind
- Best for: Most people — widest range of options and price points

**Fifth Wheel** — The premium towable
- Length: 28-42 ft | Budget: $30K-$120K
- ✅ Most stable towing, raised bedroom = split-level living, spacious
- ❌ Need a heavy-duty truck with bed hitch, hard to store
- Best for: Full-timers, families who want max space while towing

Which type interests you? I can get more specific.`,

    `Let me compare the most popular brands people ask about:

**Airstream** — The iconic one
- Price: $$$ | Build: Aluminum riveted shell | Resale: Best in class
- Known for durability and holding value. A 10-year-old Airstream often sells for more than a 5-year-old competitor. But you pay a premium upfront.

**Grand Design** — The quality challenger
- Price: $$ | Build: Laminated fiberglass | Resale: Strong
- Best bang-for-buck in the mid-range. Their Imagine and Reflection lines consistently rank in customer satisfaction surveys.

**Winnebago** — The trusted name
- Price: $$-$$$ | Build: Varies by line | Resale: Good
- Strong across motorhomes and towables. Their Class B vans (Solis, Revel) are among the best. Towable quality varies by line.

**Thor / Jayco / Coachmen** (Thor Industries family)
- Price: $-$$ | Build: Varies widely | Resale: Average
- Huge variety and the most affordable options, but quality control varies. Research specific models, not just the brand.

**Forest River** (Berkshire Hathaway)
- Price: $-$$ | Build: Varies widely | Resale: Average
- Dozens of sub-brands (Rockwood, Flagstaff, Salem). Some excellent, some mediocre. Again, model-specific research matters.

**My general advice:** Buy the specific *unit* not just the brand. A well-maintained 2019 Jayco can be better than a neglected 2022 Grand Design. Always get a pre-purchase inspection.`,
  ],

  ownership: [
    `Here's an honest look at what **RV ownership really costs** beyond the sticker price:

**Year 1 costs (beyond purchase):**
- **Insurance:** $800-$2,000/year (full coverage on a $50K trailer)
- **Registration:** Varies — some states charge 3-6% of value
- **Accessories you didn't plan for:** $1,500-$3,000 (hitch, weight distribution, brake controller, sewer hose, water filter, leveling blocks, surge protector)

**Annual recurring:**
- **Maintenance:** $1,000-$3,000/year
  - Roof inspection and resealing: $200-$500
  - Bearing repack: $100-$200
  - Brake inspection: $150-$300
  - Appliance servicing: $200-$400
  - Winterization: $100-$200 (or DIY for $30)
- **Storage:** $100-$400/month if you can't park at home
- **Campground fees:** $25-$75/night (or $400-$1,200/month long-term)

**The hidden costs nobody mentions:**
- Your truck's tires wear faster when towing — budget $1,200-$2,000 every 40K miles
- Propane refills: $30-$60 every few weeks of use
- RV-specific tools and parts you'll accumulate
- The inevitable "might as well upgrade this while I'm at it" projects

**Resale reality:**
- Most RVs depreciate 15-25% in year one, then 5-10%/year after
- Airstream, Oliver, and Lance hold value best
- Motorhomes depreciate faster than towables (engine wear)

Is there a specific cost area you'd like me to break down further?`,

    `Great question about maintenance! Here's a seasonal checklist that'll keep your RV running well:

**Before each trip:**
- Check tire pressure (including spare) — #1 cause of RV breakdowns
- Test all lights (brake, turn, running)
- Check battery water levels (lead-acid) or charge level (lithium)
- Inspect hitch components and safety chains
- Run slides in/out, check seals

**Spring de-winterization:**
- Flush antifreeze from water system (run until clear)
- Sanitize fresh water tank (1/4 cup bleach per 15 gallons, run through system)
- Check all seals — roof, windows, slides, doors
- Test AC units before you need them
- Inspect undercarriage for rodent damage

**Fall winterization:**
- Blow out water lines with compressed air OR add RV antifreeze
- Remove batteries and store on a trickle charger
- Cover tires or use tire covers (UV damage is real)
- Leave fridge door propped open
- Put mouse deterrent under and around the unit

**Common problems to watch for:**
- **Roof leaks** — check every 6 months, reseal every 3-5 years
- **Slide seal deterioration** — replace every 3-5 years
- **Water heater anode rod** — check annually, replace when 50% depleted
- **Converter/charger issues** — if your batteries keep dying, the converter may be failing

Want specific advice for a particular RV type?`,
  ],

  towing: [
    `Here's a practical guide to matching your vehicle with the right RV:

**What your vehicle can tow:**

| Vehicle | Typical Tow Rating | RV Match |
|---------|-------------------|----------|
| **Midsize SUV** (4Runner, Grand Cherokee) | 5,000-7,200 lbs | Small travel trailers under 5,000 lbs GVWR |
| **Half-ton truck** (F-150, Ram 1500, Silverado) | 8,000-13,000 lbs | Most travel trailers, some small fifth wheels |
| **3/4-ton truck** (F-250, Ram 2500) | 14,000-20,000 lbs | Large travel trailers, most fifth wheels |
| **1-ton truck** (F-350, Ram 3500) | 20,000-35,000 lbs | Any towable RV, large fifth wheels |
| **Midsize truck** (Tacoma, Colorado) | 3,500-7,700 lbs | Pop-ups, small lightweight trailers only |

**Critical rules:**
1. **Never exceed 80%** of your vehicle's max tow rating for safe, comfortable towing
2. **Payload matters as much as tow rating** — tongue weight + passengers + gear in truck
3. **Wheelbase affects stability** — longer is better for towing
4. **Transmission cooler** is a must for regular towing

**Must-have towing gear:**
- Weight distribution hitch ($400-$800) — required for most trailers over 3,500 lbs
- Brake controller ($100-$300) — mandatory for trailers with electric brakes
- Extended towing mirrors ($100-$300) — required if trailer is wider than your truck

What vehicle do you have? I can recommend specific RV sizes that work.`,

    `Let me break down the **towing experience** so you know what to expect:

**Fuel economy while towing:**
- Half-ton gas truck: Expect **8-12 mpg** (down from 18-22 empty)
- 3/4-ton diesel: Expect **10-14 mpg** (down from 16-22 empty)
- Midsize SUV: Expect **10-14 mpg** (down from 20-26 empty)

**Rule of thumb:** Towing cuts your fuel economy by **40-50%**. On a 500-mile trip towing a 6,000-lb trailer, budget an extra $100-$150 in fuel.

**Driving tips for beginners:**
- **Speed:** Stay at 60-65 mph max. Faster = more sway and worse fuel economy
- **Following distance:** Triple your normal distance — stopping takes much longer
- **Turns:** Swing wide. Your trailer cuts corners tighter than your truck
- **Backing up:** Hand on the bottom of the steering wheel. Move hand the direction you want the trailer to go. Go slow
- **Grades:** Downshift on descents. Never rely on brakes alone for long downhills
- **Wind:** Crosswinds are the biggest challenge. Slow down when it's gusty

**Common beginner mistakes:**
- Not checking tire pressure before every trip (RV tires need higher PSI than you'd think)
- Overloading the trailer past GVWR (weigh your rig loaded at a CAT scale — $15)
- Not using a weight distribution hitch ("it was fine without it" until it's not)
- Forgetting to plug in the 7-pin connector (no trailer brakes = terrifying)

Practice in an empty parking lot before your first trip. Seriously. An hour of practice saves a lot of stress.`,
  ],

  fitcheck: [
    `I'd love to help match you with the right RV! Here are my top recommendations by lifestyle:

**For couples (no kids):**
- **Airstream Basecamp 20X** ($45K-$55K new) — compact, stylish, towable by most SUVs
- **Winnebago Solis 59PX** ($90K-$110K new) — Class B van, drive it daily, park anywhere
- **Grand Design Imagine XLS 22MLE** ($30K-$40K new) — great couples floor plan, lightweight

**For families with kids:**
- **Grand Design Imagine 2970RL** ($40K-$55K) — bunkhouse, outdoor kitchen, room to spread out
- **Jayco Jay Flight 264BH** ($25K-$35K) — affordable bunkhouse, great starter trailer
- **Thor Four Winds 28A** ($80K-$110K) — Class C, overhead bunk for kids, easy to drive

**For pets:**
- Look for: hard-surface flooring, rear entry, good ventilation
- **Airstream Basecamp** — vinyl floors, easy clean, compact
- **nuCamp TAB 400** ($40K-$50K) — small but smartly designed, pet-friendly layout
- Any trailer with **residential vinyl plank flooring** (most 2022+ models)

**For retirees:**
- **Airstream Flying Cloud 25FB** ($80K-$100K) — premium, holds value, great community
- **Winnebago View 24D** ($130K-$160K) — Class C on Mercedes chassis, easy to drive
- **Grand Design Solitude 310GK** ($65K-$85K) — luxury fifth wheel for extended travel

**For solo adventurers:**
- **Winnebago Revel 44E** ($170K-$200K) — 4x4 Class B, go-anywhere capability
- **Taxa Mantis** ($40K-$50K) — rugged, lightweight, off-grid ready
- **Ford Transit custom build** ($50K-$80K) — DIY van life, totally personalized

What's your situation? I can narrow it down.`,

    `For couples with pets, here's what I'd recommend based on different priorities:

**If easy driving matters most → Class B Van**
- **Winnebago Solis 59PX** — drives like a large van, pets love the open floor plan
- **Thor Sequence 20L** — affordable, easy to park, vinyl flooring
- Budget: $80K-$130K new, $55K-$90K used (2021-2023)

**If space matters most → Travel Trailer**
- **Airstream Basecamp 20X** — compact but clever layout, pet-friendly
- **Grand Design Imagine XLS 22MLE** — more space, great couples layout
- **Lance 1985** — 4-season capable, high-quality build
- Budget: $25K-$60K new, $18K-$45K used

**If off-grid matters most → Rugged builds**
- **Taxa Mantis** — built for boondocking, huge windows, pets love it
- **Winnebago Revel 44E** — 4x4 van, go anywhere
- **Black Series HQ19** — Australian off-road design, surprisingly livable
- Budget: $40K-$200K depending on motorized vs towable

**Pet-specific features to look for:**
- ✅ Vinyl or laminate flooring (no carpet!)
- ✅ Screen door for ventilation without escape
- ✅ 12V fan or roof vent for when you're away from hookups
- ✅ Under-bed storage for crates
- ✅ Exterior storage for muddy gear and leashes
- ❌ Avoid: white interiors, carpet, small single entry doors

Would you like me to focus on a specific price range or type?`,
  ],

  beginner: [
    `Welcome to the RV world! Here's an honest beginner's guide:

**Step 1: Figure out what you actually need**
- How many people will regularly travel? (Don't size for rare occasions)
- Weekend trips or extended travel?
- Do you already have a tow vehicle, or are you open to motorhomes?
- What's your realistic total budget (RV + gear + first year of camping)?

**Step 2: Rent before you buy**
Sites like **Outdoorsy** and **RVshare** let you rent different types. I strongly recommend renting a Class C *and* a travel trailer before buying either. They're completely different experiences.

**Step 3: Common first-timer mistakes to avoid**
1. **Buying too big** — larger isn't better. Bigger = harder to drive, fewer campground options, more expensive
2. **Skipping the inspection** — a $400 inspection can save you $10,000+ in hidden issues
3. **Forgetting the accessories budget** — plan $2,000-$4,000 for hitch, brake controller, sewer hose, water filter, leveling blocks, surge protector, and other essentials
4. **Not practicing towing** — spend an afternoon in an empty parking lot before your first trip
5. **Over-planning the first trip** — go somewhere close (2-3 hours away) for a weekend. Figure out your rig before doing a cross-country trip

**Step 4: Best first RVs**
- **Used Grand Design Imagine** ($25K-$40K) — reliable, great layout options
- **Jayco Jay Flight** ($18K-$30K used) — affordable, tons available, well-supported
- **Winnebago Micro Minnie** ($22K-$35K) — lightweight, towable by most vehicles

**Step 5: Where to camp first**
Start at a **full-hookup campground** with pull-through sites. KOAs are great for beginners — they're consistent, have good facilities, and the staff helps you get set up. Graduate to state parks and boondocking after you've got the basics down.

What questions do you have? I'm happy to go deeper on any of these.`,

    `Here are the **top questions every first-time RV buyer should ask** — whether at a dealer or buying private:

**Inspection checklist:**
- [ ] Walk the roof — any soft spots, cracks, or lifted seams?
- [ ] Run all appliances — fridge on LP and electric, water heater, AC, furnace
- [ ] Fill the fresh tank and check for leaks under the RV
- [ ] Operate every slide-out — listen for grinding, check seals
- [ ] Check every window seal inside and out
- [ ] Test all 12V lights and 120V outlets
- [ ] Look under the RV — frame rust, leaf springs, axle condition
- [ ] Check tires for age (DOT code) — replace if older than 5 years regardless of tread
- [ ] Pull the fridge out from the wall — check for discoloration (fire risk)

**Questions to ask the dealer:**
- What's the **out-the-door price** including prep, delivery, and fees?
- What does the **warranty cover** and for how long?
- Can I see the **pre-delivery inspection (PDI) checklist**?
- What's included — sewer hose, power cord, propane?
- Do you offer a **post-sale walkthrough** to show me how everything works?

**Questions to ask a private seller:**
- Why are you selling?
- Has it ever had **water damage** or been in an accident?
- When was the roof last resealed?
- Has it been **winterized** properly each year?
- Can I see **maintenance records**?
- Are you the original owner?

**Red flags to walk away from:**
- Musty smell (water damage / mold)
- Soft spots in the floor (structural water damage)
- Seller won't let you inspect or is rushed
- "Sold as-is" on a unit that's only 2-3 years old
- Unusually low price with vague explanations

Want advice on a specific unit you're looking at?`,
  ],

  camping: [
    `Here's a guide to the best camping experiences by type:

**Full-hookup campgrounds (best for beginners)**
- **KOA** — consistent quality nationwide, great amenities, $40-$80/night
- **Thousand Trails** — membership model, $500-$5,000/year for unlimited stays
- **Good Sam parks** — discounts with membership, wide network
- **Casino RV parks** — often cheap ($10-$25/night) and have great facilities

**State & National Parks (best scenery)**
- Book **6 months ahead** for popular parks (Yellowstone, Zion, Acadia)
- Sites are $20-$45/night, often no hookups or water/electric only
- **Recreation.gov** for federal parks, state park websites vary
- Smaller, lesser-known parks are easier to book and often just as beautiful

**Boondocking / Dry Camping (best for adventurers)**
- **BLM land** — free, usually 14-day limit, mostly in the western US
- **National Forest roads** — free dispersed camping, scenic spots
- **Harvest Hosts** ($99/year) — camp at wineries, farms, breweries
- **Boondockers Welcome** ($50/year) — camp in members' driveways
- Apps: **iOverlander**, **FreeRoam**, **Campendium** for finding spots

**Long-term / Snowbird spots:**
- **Arizona:** Quartzsite BLM (free for 14 days), Mesa RV resorts ($800-$1,500/month)
- **Florida:** Fort Myers, Kissimmee area ($800-$1,400/month)
- **Texas:** Rio Grande Valley ($500-$900/month)
- **California:** Borrego Springs, Joshua Tree area (BLM = free)

**Essential camping apps:**
- **Campendium** — reviews and pricing for all types
- **iOverlander** — boondocking spots and dump stations
- **AllStays** — comprehensive campground database
- **Google Maps offline** — download areas before you lose signal

Where are you thinking about heading?`,

    `Let me plan out some **great first RV trips** based on what people love:

**Best "starter" trips (2-3 hours from home):**
- Pick a campground within 150 miles of home
- Stay 2-3 nights at a **full-hookup, pull-through site**
- Focus on learning your rig — setting up, leveling, hookups, systems
- Don't worry about sightseeing — the camping IS the trip

**Classic road trips that work great in an RV:**

🏔️ **Pacific Coast Highway** (CA)
- 2-3 weeks ideal | Best: May-October
- Key stops: Big Sur, Morro Bay, Mendocino
- Tip: Book state parks early — they fill up 6 months out

🌲 **Blue Ridge Parkway** (VA-NC)
- 1-2 weeks | Best: May-June or October (fall colors)
- Key stops: Shenandoah NP, Asheville, Great Smoky Mountains
- Tip: Elevation changes mean cool nights even in summer

🏜️ **Utah Mighty Five** (UT)
- 2-3 weeks | Best: April-May or September-October
- Key stops: Zion, Bryce Canyon, Capitol Reef, Arches, Canyonlands
- Tip: Summer is brutally hot. Spring and fall are perfect

🌊 **Florida Gulf Coast** (FL)
- 1-2 weeks | Best: November-April
- Key stops: Everglades, Sanibel Island, St. Pete, Destin
- Tip: Mosquitoes are intense in summer — go in winter

🦅 **Northern Michigan** (MI)
- 1-2 weeks | Best: June-September
- Key stops: Sleeping Bear Dunes, Mackinac Island, Pictured Rocks
- Tip: Underrated gem — less crowded than western parks

What kind of landscape or experience appeals to you?`,
  ],

  fulltiming: [
    `Full-timing is an incredible lifestyle but takes real planning. Here's what you need to know:

**Best RVs for full-time living:**

| Type | Best For | Budget |
|------|----------|--------|
| **Fifth wheel** | Couples/families who want max space | $50K-$120K |
| **Class A diesel** | Couples who want luxury + towing a car | $100K-$300K |
| **Class C** | Solo/couples who want mobility | $70K-$150K |
| **Class B van** | Minimalists, digital nomads | $80K-$200K |

**Monthly budget reality check:**
- Campground fees: $500-$1,500/month (varies hugely by location and season)
- Fuel: $300-$800/month (depends on how often you move)
- Insurance: $100-$250/month
- Groceries: Same as a house, really
- Internet: $100-$200/month (Starlink + cell plan)
- Maintenance reserve: $200-$400/month (things break more when you live in them)
- **Total: $1,500-$3,500/month** for a comfortable full-time lifestyle

**The logistics nobody talks about:**
- **Mail:** Use a mail scanning service (Traveling Mailbox, St. Brendan's Isle) — $15-$25/month
- **Domicile state:** South Dakota, Texas, or Florida — no state income tax + easy RV registration
- **Healthcare:** Consider a telehealth subscription + travel health insurance
- **Internet:** Starlink ($120/month) is a game-changer. Backup with mobile hotspots
- **Laundry:** Most RV parks have coin laundry. Some full-timers install Splendide combo units

**Full-timing mistakes to avoid:**
1. Selling your house before trying it for 3-6 months
2. Buying new instead of a well-maintained used unit (depreciation hits hard)
3. Not budgeting for repairs — things break more when you live in them full-time
4. Underestimating the social aspect — join Escapees RV Club or Fulltime Families

Want to dig deeper into any of these areas?`,

    `Here's a practical guide to **working remotely from an RV:**

**Internet setup (this is the #1 concern):**
- **Starlink RV** ($120/month) — works almost everywhere, 50-200 Mbps
- **Cell signal booster** (weBoost, $400-$600) — amplifies weak cell signal
- **Two carriers** minimum — T-Mobile + Verizon cover different areas
- **Speed test before you commit** to a campground — ask in Campendium reviews
- **Backup plan:** Most small towns have libraries and coffee shops with wifi

**Best locations for remote work + RV:**
- Stay in one spot for 2-4 weeks minimum — constant moving kills productivity
- **Thousand Trails parks** — unlimited stays, good wifi at many locations
- **City outskirts** — better cell signal than deep wilderness
- **Co-working spaces** — more common than you'd think, even in small towns ($100-$200/month)

**Work setup tips:**
- **Monitor:** Portable 15" USB-C monitor ($200-$300) is a game-changer
- **Desk:** Many fifth wheels and Class As have desk space. For trailers, use the dinette
- **Noise:** RV parks can be noisy. Invest in good noise-cancelling headphones
- **Power:** 30-amp service can run your laptop, monitor, and AC simultaneously. No problem
- **Standing desk:** Look for a cabinet-height counter for alternating sit/stand

**Tax implications:**
- Your **domicile state** determines state tax liability
- South Dakota, Texas, Florida = no state income tax
- Track your location by day — some states have complex nexus rules
- Consult an RV-specific tax professional (they exist!)

What's your work situation — employed or freelance?`,
  ],

  general: [
    `I'd be happy to help with your RV search! I can assist with:

- **Finding the right type** — Class A, B, C, travel trailer, fifth wheel, toy hauler
- **Budget guidance** — realistic pricing at every level
- **Towing questions** — matching your vehicle to the right RV
- **Feature comparisons** — side-by-side analysis of models and brands
- **Buying tips** — inspection checklists, negotiation strategies, dealer vs private
- **Camping & travel** — destinations, campgrounds, trip planning
- **Full-time living** — costs, logistics, internet, mail, domicile

The more details you share — budget, how many people, what kind of camping, your tow vehicle — the better I can narrow things down.

What's on your mind?`,

    `That's a great question! Here's what I'd tell anyone starting their RV journey:

**The 3 most important decisions:**
1. **Motorized vs towable?** — Motorhomes are convenient but expensive. Towables give you a separate vehicle at camp. Most first-timers do best with a travel trailer
2. **Size matters** — bigger isn't better. The most common regret is buying too large. Start with what you need, not what looks impressive on the lot
3. **New vs used** — a 2-3 year old used RV at 30-40% off MSRP is the smart money move. Let someone else take the depreciation hit

**The RV market in 2025-2026:**
- Inventory is high → prices are competitive
- Pandemic-era buyers are selling after 2-3 trips → great used deals
- Interest rates have stabilized around 6-8% for RV loans
- Best time to buy: **September-November** (end of season clearance)

**What I always recommend:**
1. **Rent first** — try 2-3 different types before buying ($150-$350/night on Outdoorsy)
2. **Join a forum** — iRV2 and specific brand forums have incredible knowledge
3. **Budget for extras** — plan $3,000-$5,000 beyond the RV price for gear and accessories
4. **Get an inspection** — $300-$600 for a professional mobile RV inspection (NRVIA certified)

What specifically are you looking for? I can give more targeted advice.`,

    `Here are some things most RV shoppers wish they knew before buying:

**What dealers won't tell you:**
- The **MSRP is inflated** — expect 15-25% off on new units. Some brands inflate even more
- **"Camping ready"** doesn't mean ready — you'll still need hoses, cords, blocks, and accessories
- **Extended warranties** are highly profitable for dealers — research whether you actually need one
- **PDI (Pre-Delivery Inspection)** should catch issues — ask to see the checklist and be present

**What experienced RVers always do:**
- Check **tire dates** (DOT code on sidewall) — replace at 5 years regardless of tread
- Buy a **surge protector** ($80-$300) before plugging into any campground power — it protects your electrical system from bad pedestals
- Keep a **maintenance log** — helps with resale and warranty claims
- Join **Escapees RV Club** ($40/year) — the knowledge base and community are worth 100x the cost

**The stuff nobody thinks about:**
- Where will you **store** it between trips? Measure your driveway or find a storage lot
- Can you handle the **height**? Know your rig's height for bridges, gas stations, and drive-throughs
- **Propane runs out** at the worst time — carry a spare 20-lb tank or learn where to refill
- Your **water hose matters** — drink-safe white hoses only ($20-$30)

What questions do you have? I'm here to help you make a confident decision.`,
  ],
};

function getSrpResponse(message: string): string {
  const category = classifySrpMessage(message);
  const responses = SRP_RESPONSES[category];
  return responses[Math.floor(Math.random() * responses.length)];
}

export function generateAiResponse(
  listing: ListingData | undefined,
  message: string,
  _history: ConversationMessage[],
): Promise<string> {
  const delay = 800 + Math.random() * 700;

  if (!listing) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getSrpResponse(message)), delay);
    });
  }

  const category = classifyMessage(message);
  const response = getResponse(category, listing);

  return new Promise((resolve) => {
    setTimeout(() => resolve(response), delay);
  });
}
