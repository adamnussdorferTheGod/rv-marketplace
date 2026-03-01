import type { ListingData } from './types';
import type {
  DealKitData,
  DealScore,
  ChecklistItem,
  QuestionCard,
  NegotiationPoint,
  RedFlagCard,
} from './dealKitTypes';

function fmt(n: number): string {
  return `$${n.toLocaleString()}`;
}

function shortName(listing: ListingData): string {
  return `${listing.make} ${listing.model}`.trim() || listing.title;
}

function findSpec(listing: ListingData, label: string): string | undefined {
  return listing.specs.find(
    (s) => s.label.toLowerCase() === label.toLowerCase()
  )?.value;
}

// Detect if the listing is a motorhome (vs towable)
function isMotorhome(listing: ListingData): boolean {
  const keywords = ['motorhome', 'class a', 'class b', 'class c', 'sprinter', 'transit', 'express', 'van', 'coach', 'motorcoach'];
  const text = `${listing.title} ${listing.make} ${listing.model} ${listing.description}`.toLowerCase();
  return keywords.some((k) => text.includes(k));
}

// Count price drops from price history
function getPriceDrops(listing: ListingData): { count: number; totalDrop: number } {
  const drops = listing.priceAnalysis.priceHistory.filter(
    (h) => h.change.toLowerCase().includes('reduc') || h.change.toLowerCase().includes('drop')
  );
  if (drops.length === 0) return { count: 0, totalDrop: 0 };
  const originalPrice = listing.priceAnalysis.priceHistory[0]?.price ?? listing.currentPrice;
  const totalDrop = originalPrice - listing.currentPrice;
  return { count: drops.length, totalDrop: Math.max(0, totalDrop) };
}

// --- Deal Score ---
function generateDealScore(listing: ListingData): DealKitData['dealScore'] {
  const name = shortName(listing);
  const scoreMap: Record<ListingData['dealRating'], { min: number; max: number; label: DealScore }> = {
    great: { min: 78, max: 88, label: 'great' },
    good: { min: 62, max: 76, label: 'good' },
    fair: { min: 45, max: 58, label: 'fair' },
    high: { min: 25, max: 40, label: 'poor' },
  };
  const range = scoreMap[listing.dealRating];
  const score = range.min + Math.floor((range.max - range.min) * 0.6);

  const avg = listing.priceAnalysis.averagePrice;
  const diff = avg - listing.currentPrice;
  const { count: dropCount, totalDrop } = getPriceDrops(listing);

  let summary: string;
  if (diff > 0) {
    summary = `This ${name} is priced ${fmt(diff)} below the market average for comparable models. ${dropCount > 0 ? `Combined with ${dropCount} price reduction${dropCount > 1 ? 's' : ''} totaling ${fmt(totalDrop)}, this` : 'This'} is ${listing.dealRating === 'great' ? 'an excellent deal worth acting on quickly' : 'a solid deal worth pursuing'}.`;
  } else {
    summary = `This ${name} is priced ${fmt(Math.abs(diff))} above the market average. ${dropCount > 0 ? `There have been ${dropCount} price reduction${dropCount > 1 ? 's' : ''}, but ` : ''}consider negotiating to bring the price closer to market value.`;
  }

  const comparison = [
    { label: 'Listing price', value: fmt(listing.currentPrice) },
    { label: 'Market average', value: fmt(avg) },
    { label: diff >= 0 ? 'Below market' : 'Above market', value: fmt(Math.abs(diff)) },
    { label: 'Days on site', value: String(listing.daysOnSite) },
  ];

  if (dropCount > 0) {
    comparison.push({ label: 'Price drops', value: `${dropCount} (${fmt(totalDrop)})` });
  }

  comparison.push({ label: 'Condition', value: listing.year >= new Date().getFullYear() ? 'New' : 'Used' });

  return { score, label: range.label, summary, marketComparison: comparison };
}

// --- Offer Range ---
function generateOfferRange(listing: ListingData): DealKitData['offerRange'] {
  const price = listing.currentPrice;
  const name = shortName(listing);
  const { count: dropCount, totalDrop } = getPriceDrops(listing);

  const openingPct = listing.dealRating === 'high' ? 0.88 : 0.93;
  const targetPct = listing.dealRating === 'high' ? 0.92 : 0.96;
  const walkAwayPct = listing.dealRating === 'high' ? 0.96 : 0.99;

  const opening = Math.round(price * openingPct / 100) * 100;
  const target = Math.round(price * targetPct / 100) * 100;
  const walkAway = Math.round(price * walkAwayPct / 100) * 100;

  let rationale = '';
  if (dropCount > 0) {
    rationale += `The ${fmt(totalDrop)} price drop${dropCount > 1 ? 's' : ''} signal${dropCount === 1 ? 's' : ''} the dealer is motivated. `;
  }
  if (listing.daysOnSite > 30) {
    rationale += `${listing.daysOnSite} days on-site adds leverage. `;
  }
  rationale += `Open at ${fmt(opening)}, aim for ${fmt(target)}, and don't go above ${fmt(walkAway)}.`;

  return {
    opening: {
      label: 'Opening Offer',
      amount: opening,
      description: 'Aggressive but defensible — anchors low for negotiation room.',
    },
    target: {
      label: 'Target Price',
      amount: target,
      description: `Fair deal for both sides. ${listing.dealRating === 'great' || listing.dealRating === 'good' ? 'Already below market average.' : 'Brings the price closer to market value.'}`,
    },
    walkAway: {
      label: 'Walk-Away Price',
      amount: walkAway,
      description: `Maximum you should pay. Above this, you're overpaying relative to market.`,
    },
    listPrice: price,
    rationale,
  };
}

// --- Inspection Checklist ---
function generateChecklist(listing: ListingData): ChecklistItem[] {
  const name = shortName(listing);
  const motorhome = isMotorhome(listing);
  const items: ChecklistItem[] = [];

  // Exterior — universal
  items.push(
    { id: 'ext-1', label: 'Roof seams and sealant', detail: 'Inspect all roof seams and edges for cracking or missing sealant.', category: 'exterior', isModelSpecific: false },
    { id: 'ext-2', label: 'Body panel condition', detail: `Check the ${name} exterior for dents, cracks, delamination, or signs of repair.`, category: 'exterior', isModelSpecific: true },
    { id: 'ext-3', label: 'Undercarriage and frame', detail: 'Look for rust, damage, or signs of impact on the frame and underbelly.', category: 'exterior', isModelSpecific: false },
    { id: 'ext-4', label: 'Window seals and gaskets', detail: 'Check for gaps, cracks, or moisture around all windows.', category: 'exterior', isModelSpecific: false },
    { id: 'ext-5', label: 'Entry door alignment', detail: 'Open and close the main door — it should seal flush without sticking.', category: 'exterior', isModelSpecific: false },
  );

  // Interior — universal
  items.push(
    { id: 'int-1', label: 'Water damage signs', detail: 'Check ceilings, walls, and under dinette for soft spots, stains, or musty smell.', category: 'interior', isModelSpecific: false },
    { id: 'int-2', label: 'Cabinet and drawer operation', detail: 'Open every cabinet and drawer — all hardware should operate smoothly.', category: 'interior', isModelSpecific: false },
    { id: 'int-3', label: 'Flooring condition', detail: 'Walk the entire floor checking for soft spots, especially near the bathroom.', category: 'interior', isModelSpecific: false },
    { id: 'int-4', label: 'Plumbing check', detail: 'Run the shower, flush the toilet, check under sinks for leaks.', category: 'interior', isModelSpecific: false },
  );

  // Mechanical — type-specific
  if (motorhome) {
    items.push(
      { id: 'mech-1', label: 'Engine and transmission', detail: `Start the ${name} and listen for unusual noises. Check fluid levels and look for leaks.`, category: 'mechanical', isModelSpecific: true },
      { id: 'mech-2', label: 'Test drive', detail: 'Drive at highway speeds. Check braking, steering, and transmission shifts.', category: 'mechanical', isModelSpecific: true },
      { id: 'mech-3', label: 'Generator operation', detail: 'Run the generator under load for 15+ minutes. Check hours and service history.', category: 'mechanical', isModelSpecific: true },
    );
  } else {
    items.push(
      { id: 'mech-1', label: 'Tire condition and age', detail: 'Check tread depth and DOT date code — tires older than 5 years should be replaced.', category: 'mechanical', isModelSpecific: false },
      { id: 'mech-2', label: 'Brake system', detail: 'Verify electric brakes engage properly. Check brake controller compatibility.', category: 'mechanical', isModelSpecific: false },
      { id: 'mech-3', label: 'Hitch and coupler', detail: 'Inspect the coupler, safety chains, and breakaway switch.', category: 'mechanical', isModelSpecific: false },
    );
  }

  // Systems — universal
  items.push(
    { id: 'sys-1', label: 'AC unit(s)', detail: 'Run AC on high for 10+ minutes. Verify all units cool properly.', category: 'systems', isModelSpecific: false },
    { id: 'sys-2', label: 'LP gas system', detail: 'Check propane lines, regulator, and test all gas appliances (stove, furnace, water heater).', category: 'systems', isModelSpecific: false },
    { id: 'sys-3', label: 'Electrical — shore and battery', detail: `Test shore power hookup, verify all 12V and 120V outlets.`, category: 'systems', isModelSpecific: false },
    { id: 'sys-4', label: 'Water system', detail: 'Fill fresh tank, run all faucets, check water heater, verify pump operation.', category: 'systems', isModelSpecific: false },
  );

  // Slides if applicable
  const slides = findSpec(listing, 'Slides');
  if (slides && slides !== '0' && slides !== 'N/A') {
    items.push(
      { id: 'sys-5', label: `Slide-out operation (${slides})`, detail: 'Extend and retract all slides. Check seals, alignment, and motor operation.', category: 'systems', isModelSpecific: true },
    );
  }

  // Documents — universal
  items.push(
    { id: 'doc-1', label: 'Title and registration', detail: 'Verify clean title matches VIN. Confirm no liens.', category: 'documents', isModelSpecific: false },
    { id: 'doc-2', label: 'Warranty status', detail: `Check if ${listing.make} warranty is still active and transferable to a new owner.`, category: 'documents', isModelSpecific: true },
    { id: 'doc-3', label: 'Service records', detail: 'Request maintenance history. Look for regular roof resealing and scheduled service.', category: 'documents', isModelSpecific: false },
  );

  return items;
}

// --- Questions ---
function generateQuestions(listing: ListingData): QuestionCard[] {
  const { count: dropCount, totalDrop } = getPriceDrops(listing);
  const questions: QuestionCard[] = [];

  if (dropCount > 0) {
    questions.push({
      id: 'q-1',
      question: `Why was the price reduced by ${fmt(totalDrop)}?`,
      rationale: `A ${fmt(totalDrop)} drop is significant. Understanding the reason (slow sales, model year pressure, defect) tells you how motivated they are and whether there's room to negotiate further.`,
    });
  }

  if (listing.daysOnSite > 20) {
    questions.push({
      id: 'q-2',
      question: `This has been listed for ${listing.daysOnSite} days — is there something I should know?`,
      rationale: `Extended time on the lot could indicate a pricing issue, hidden concern, or simply low traffic. The answer gives you negotiation leverage either way.`,
    });
  }

  questions.push(
    {
      id: 'q-3',
      question: `Is the ${listing.make} warranty fully transferable?`,
      rationale: `Manufacturer warranties are a major selling point. Confirm coverage details and whether the warranty transfers to you at purchase.`,
    },
    {
      id: 'q-4',
      question: 'Can I see service or PDI records?',
      rationale: 'A pre-delivery inspection (PDI) report shows what was checked and repaired before listing. Gaps here may indicate corners were cut.',
    },
    {
      id: 'q-5',
      question: 'What is your best out-the-door price including all fees?',
      rationale: 'Dealer fees (prep, documentation, delivery) can add $1,500–3,000. Getting the OTD price prevents surprises and gives you a real number to compare.',
    },
    {
      id: 'q-6',
      question: 'Do you offer any additional incentives for financing through you?',
      rationale: 'Dealers often earn kickbacks on financing. They may lower the price if you finance through them — just be ready to compare APR with your own pre-approval.',
    },
  );

  return questions;
}

// --- Negotiation Points ---
function generateNegotiationPoints(listing: ListingData): NegotiationPoint[] {
  const { count: dropCount, totalDrop } = getPriceDrops(listing);
  const target = Math.round(listing.currentPrice * (listing.dealRating === 'high' ? 0.92 : 0.96) / 100) * 100;
  const name = shortName(listing);
  const points: NegotiationPoint[] = [];

  if (listing.daysOnSite > 20 || dropCount > 0) {
    const parts: string[] = [];
    if (listing.daysOnSite > 20) parts.push(`listed for ${listing.daysOnSite} days`);
    if (dropCount > 0) parts.push(`already had a ${fmt(totalDrop)} price drop`);
    points.push({
      id: 'np-1',
      point: `"I see this has been ${parts.join(' and ')}. What flexibility do you have on price?"`,
      context: 'Time on lot is your strongest leverage. Dealers pay floor plan interest daily on unsold inventory.',
    });
  }

  points.push(
    {
      id: 'np-2',
      point: `"I'm pre-approved for financing but could go through you if the numbers work. What does that look like?"`,
      context: 'Offering to finance through the dealer gives them profit opportunity, which they may trade for a lower sale price.',
    },
    {
      id: 'np-3',
      point: `"Comparable ${name}s are selling for ${fmt(listing.priceAnalysis.rangeMin)}–${fmt(listing.priceAnalysis.rangeMax)} in this area. I'd like to be closer to ${fmt(target)} all-in."`,
      context: 'Anchoring to market data makes your offer feel researched, not arbitrary. It respects the dealer while setting firm expectations.',
    },
    {
      id: 'np-4',
      point: `"If you can include the ${isMotorhome(listing) ? 'first service and extended warranty' : 'hitch install and first-year storage'}, I'm ready to close today."`,
      context: `Trading add-ons for commitment shows you're serious. These are high-value, low-cost concessions for dealers.`,
    },
    {
      id: 'np-5',
      point: `"I want to love this unit, but I have another ${name} to look at this afternoon."`,
      context: 'Creating urgency without being aggressive. Even if loosely true, it signals you have options and aren\'t desperate.',
    },
  );

  return points;
}

// --- Cost of Ownership ---
function generateCostOfOwnership(listing: ListingData): DealKitData['costOfOwnership'] {
  const price = listing.currentPrice;
  const age = new Date().getFullYear() - listing.year;
  const name = shortName(listing);
  const motorhome = isMotorhome(listing);

  // Scale insurance and maintenance with price
  const insuranceLow = Math.round(price * 0.012 / 100) * 100;
  const insuranceHigh = Math.round(price * 0.022 / 100) * 100;
  const maintenanceLow = motorhome ? 1200 : 800;
  const maintenanceHigh = motorhome ? 2500 : 1500;
  const storageLow = motorhome ? 1800 : 1200;
  const storageHigh = motorhome ? 3600 : 2400;

  const items = [
    { label: 'Insurance', annualCost: `${fmt(insuranceLow)}–${fmt(insuranceHigh)}`, note: 'Full-timer policies cost more' },
    { label: 'Storage', annualCost: `${fmt(storageLow)}–${fmt(storageHigh)}`, note: `Covered storage in ${listing.location.split(',').pop()?.trim() || 'your area'}` },
    { label: 'Maintenance', annualCost: `${fmt(maintenanceLow)}–${fmt(maintenanceHigh)}`, note: motorhome ? 'Engine service, roof, tires, brakes' : 'Roof reseal, bearings, brakes' },
    { label: 'Registration & taxes', annualCost: '$400–800' },
  ];

  if (motorhome) {
    items.push({ label: 'Fuel', annualCost: '$2,000–5,000', note: 'Varies widely by usage and MPG' });
  } else {
    items.push({ label: 'Propane', annualCost: '$300–500' });
  }

  items.push({ label: 'Campground fees', annualCost: '$2,000–6,000', note: 'Varies widely by usage' });

  const totalLow = insuranceLow + storageLow + maintenanceLow + 400 + (motorhome ? 2000 : 300) + 2000;
  const totalHigh = insuranceHigh + storageHigh + maintenanceHigh + 800 + (motorhome ? 5000 : 500) + 6000;

  // Depreciation
  const depRate1 = age === 0 ? '15–20%' : '8–12%';
  const depRateOngoing = '4–6%';
  const value3yr = Math.round(price * (age === 0 ? 0.7 : 0.8) / 1000) * 1000;
  const value3hrHigh = Math.round(price * (age === 0 ? 0.78 : 0.88) / 1000) * 1000;

  return {
    items,
    depreciationNote: `Expect ${depRate1} depreciation in year one, then ${depRateOngoing} annually. A ${fmt(price)} ${name} will likely be worth ${fmt(value3yr)}–${fmt(value3hrHigh)} in 3 years.`,
    totalAnnual: `${fmt(totalLow)}–${fmt(totalHigh)}`,
  };
}

// --- Red Flags ---
function generateRedFlags(listing: ListingData): RedFlagCard[] {
  const flags: RedFlagCard[] = [];
  const name = shortName(listing);

  // Check deal rating
  if (listing.dealRating === 'high') {
    flags.push({
      id: 'rf-price',
      title: 'Priced above market average',
      detail: `This ${name} is priced higher than comparable models. Negotiate aggressively or consider other options.`,
      level: 'red',
    });
  }

  // Check VHR
  if (!listing.vhrAvailable) {
    flags.push({
      id: 'rf-vhr',
      title: 'No vehicle history report available',
      detail: 'A missing VHR could mean the seller is hiding accident history or title issues. Request one before proceeding.',
      level: 'yellow',
    });
  }

  // Check days on site
  if (listing.daysOnSite > 60) {
    flags.push({
      id: 'rf-days',
      title: `${listing.daysOnSite} days on site — significantly above average`,
      detail: `Most RVs sell within 45 days. Extended time on lot could indicate a pricing issue, hidden concern, or niche market. Ask why and use this as leverage.`,
      level: 'yellow',
    });
  } else if (listing.daysOnSite > 30) {
    flags.push({
      id: 'rf-days',
      title: `${listing.daysOnSite} days on site — above average`,
      detail: `This is longer than typical for this model. Could indicate pricing pressure or low demand. Worth asking about.`,
      level: 'yellow',
    });
  }

  // New listing with age
  const age = new Date().getFullYear() - listing.year;
  if (age > 10) {
    flags.push({
      id: 'rf-age',
      title: `${listing.year} model — ${age} years old`,
      detail: 'Older RVs may have hidden wear on seals, plumbing, and electrical. Budget for potential repairs and inspect thoroughly.',
      level: 'yellow',
    });
  }

  // If no flags, add green
  if (flags.length === 0) {
    flags.push({
      id: 'rf-clean',
      title: 'No red flags found',
      detail: `Clean listing with ${listing.dealRating === 'great' ? 'excellent' : 'reasonable'} pricing. ${listing.vhrAvailable ? 'Vehicle history report is available.' : ''} ${listing.dealer.isTop50 ? `${listing.dealer.name} is a Top 50 RV Trader dealer.` : ''}`.trim(),
      level: 'green',
    });
  }

  return flags;
}

// --- Main generator ---
export function generateDealKit(listing: ListingData): DealKitData {
  return {
    vehicleTitle: listing.title,
    vehicleImage: listing.images[0]?.url ?? '',
    listPrice: listing.currentPrice,
    generatedAt: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    dealScore: generateDealScore(listing),
    offerRange: generateOfferRange(listing),
    inspectionChecklist: generateChecklist(listing),
    questions: generateQuestions(listing),
    negotiationPoints: generateNegotiationPoints(listing),
    costOfOwnership: generateCostOfOwnership(listing),
    redFlags: generateRedFlags(listing),
  };
}
