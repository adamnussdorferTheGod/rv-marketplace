import type { DealKitData } from './dealKitTypes';

export const sampleDealKit: DealKitData = {
  vehicleTitle: '2024 Airstream Flying Cloud 25RB',
  vehicleImage: 'https://images.unsplash.com/photo-1619317190381-643a6b28d6e6?w=800&h=600&fit=crop&q=80',
  listPrice: 88000,
  generatedAt: new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),

  dealScore: {
    score: 74,
    label: 'good',
    summary:
      'This Airstream is priced $7,500 below the market average for comparable 2023–2024 Flying Cloud models. Combined with the price reduction and clean history, this is a solid deal worth pursuing.',
    marketComparison: [
      { label: 'Listing price', value: '$88,000' },
      { label: 'Market average', value: '$95,500' },
      { label: 'Below market', value: '$7,500' },
      { label: 'Days on site', value: '45' },
      { label: 'Price drops', value: '1 ($10,000)' },
      { label: 'Condition', value: 'New' },
    ],
  },

  offerRange: {
    opening: {
      label: 'Opening Offer',
      amount: 82000,
      description: 'Aggressive but defensible — anchors low for negotiation room.',
    },
    target: {
      label: 'Target Price',
      amount: 85000,
      description: 'Fair deal for both sides. Already below market average.',
    },
    walkAway: {
      label: 'Walk-Away Price',
      amount: 87500,
      description:
        "Maximum you should pay. Above this, you're overpaying relative to market.",
    },
    listPrice: 88000,
    rationale:
      "The $10K price drop signals the dealer is motivated. 45 days on-site adds leverage. Open at $82K, aim for $85K, and don't go above $87.5K.",
  },

  inspectionChecklist: [
    // Exterior
    {
      id: 'ext-1',
      label: 'Aluminum skin condition',
      detail: 'Check for dents, oxidation, or delamination along the iconic aluminum shell.',
      category: 'exterior',
      isModelSpecific: true,
    },
    {
      id: 'ext-2',
      label: 'Roof seams and sealant',
      detail: 'Inspect all roof seams and edges for cracking or missing sealant.',
      category: 'exterior',
      isModelSpecific: false,
    },
    {
      id: 'ext-3',
      label: 'Undercarriage and frame',
      detail: 'Look for rust, damage, or signs of impact on the frame and underbelly.',
      category: 'exterior',
      isModelSpecific: false,
    },
    {
      id: 'ext-4',
      label: 'Window seals and gaskets',
      detail: 'Check for gaps, cracks, or moisture around all panoramic windows.',
      category: 'exterior',
      isModelSpecific: true,
    },
    {
      id: 'ext-5',
      label: 'Entry door alignment',
      detail: 'Open and close the main door — it should seal flush without sticking.',
      category: 'exterior',
      isModelSpecific: false,
    },
    // Interior
    {
      id: 'int-1',
      label: 'Water damage signs',
      detail: 'Check ceilings, walls, and under dinette for soft spots, stains, or musty smell.',
      category: 'interior',
      isModelSpecific: false,
    },
    {
      id: 'int-2',
      label: 'Cabinet and drawer operation',
      detail: 'Open every cabinet and drawer — all hardware should operate smoothly.',
      category: 'interior',
      isModelSpecific: false,
    },
    {
      id: 'int-3',
      label: 'Flooring condition',
      detail: 'Walk the entire floor checking for soft spots, especially near the bathroom.',
      category: 'interior',
      isModelSpecific: false,
    },
    {
      id: 'int-4',
      label: 'Rear bath plumbing',
      detail: 'Run the shower, flush the toilet, check under the vanity for leaks.',
      category: 'interior',
      isModelSpecific: true,
    },
    // Mechanical
    {
      id: 'mech-1',
      label: 'Tire condition and age',
      detail: 'Check tread depth and DOT date code — tires older than 5 years should be replaced.',
      category: 'mechanical',
      isModelSpecific: false,
    },
    {
      id: 'mech-2',
      label: 'Brake system',
      detail: 'Verify electric brakes engage properly. Check brake controller compatibility.',
      category: 'mechanical',
      isModelSpecific: false,
    },
    {
      id: 'mech-3',
      label: 'Hitch and coupler',
      detail: 'Inspect the coupler, safety chains, and breakaway switch.',
      category: 'mechanical',
      isModelSpecific: false,
    },
    // Systems
    {
      id: 'sys-1',
      label: 'AC units (both)',
      detail: 'Run both AC units on high for 10+ minutes. This model has two — verify both cool.',
      category: 'systems',
      isModelSpecific: true,
    },
    {
      id: 'sys-2',
      label: 'LP gas system',
      detail: 'Check propane lines, regulator, and test all gas appliances (stove, furnace, water heater).',
      category: 'systems',
      isModelSpecific: false,
    },
    {
      id: 'sys-3',
      label: 'Electrical — shore and battery',
      detail: 'Test 30-amp shore power hookup, verify all 12V and 120V outlets.',
      category: 'systems',
      isModelSpecific: false,
    },
    {
      id: 'sys-4',
      label: 'Water system',
      detail: 'Fill fresh tank, run all faucets, check water heater, verify pump operation.',
      category: 'systems',
      isModelSpecific: false,
    },
    // Documents
    {
      id: 'doc-1',
      label: 'Title and registration',
      detail: 'Verify clean title matches VIN. Confirm no liens.',
      category: 'documents',
      isModelSpecific: false,
    },
    {
      id: 'doc-2',
      label: 'Warranty status',
      detail: 'Airstream offers a 3-year structural warranty and 2-year limited. Verify transfer eligibility.',
      category: 'documents',
      isModelSpecific: true,
    },
    {
      id: 'doc-3',
      label: 'Service records',
      detail: 'Request maintenance history. Look for regular roof resealing and bearing repacks.',
      category: 'documents',
      isModelSpecific: false,
    },
  ],

  questions: [
    {
      id: 'q-1',
      question: 'Why was the price reduced by $10,000?',
      rationale:
        "A $10K drop is significant. Understanding the reason (slow sales, model year pressure, defect) tells you how motivated they are and whether there's room to negotiate further.",
    },
    {
      id: 'q-2',
      question: 'Has this unit ever been used as a demo or loaner?',
      rationale:
        "Listed as 'new' but 45 days on the lot. If it was used for shows or demos, that's additional wear that justifies a lower price.",
    },
    {
      id: 'q-3',
      question: 'Is the Airstream factory warranty fully transferable?',
      rationale:
        'Airstream warranties are a major selling point. Confirm the 3-year structural and 2-year limited warranty will transfer to you at purchase.',
    },
    {
      id: 'q-4',
      question: 'Can I see service or PDI records?',
      rationale:
        'A pre-delivery inspection (PDI) report shows what was checked and repaired before listing. Gaps here may indicate corners were cut.',
    },
    {
      id: 'q-5',
      question: 'What is your best out-the-door price including all fees?',
      rationale:
        'Dealer fees (prep, documentation, delivery) can add $1,500–3,000. Getting the OTD price prevents surprises and gives you a real number to compare.',
    },
    {
      id: 'q-6',
      question: 'Do you offer any additional incentives for financing through you?',
      rationale:
        'Dealers often earn kickbacks on financing. They may lower the price if you finance through them — just be ready to compare APR with your own pre-approval.',
    },
  ],

  negotiationPoints: [
    {
      id: 'np-1',
      point: '"I see this has been listed for 45 days and already had a $10K price drop. What flexibility do you have on price?"',
      context:
        'Time on lot is your strongest leverage. Dealers pay floor plan interest daily on unsold inventory.',
    },
    {
      id: 'np-2',
      point: '"I\'m pre-approved for financing but could go through you if the numbers work. What does that look like?"',
      context:
        'Offering to finance through the dealer gives them profit opportunity, which they may trade for a lower sale price.',
    },
    {
      id: 'np-3',
      point: '"Comparable Flying Clouds are selling for $89–95K in this area. I\'d like to be closer to $85K all-in."',
      context:
        'Anchoring to market data makes your offer feel researched, not arbitrary. It respects the dealer while setting firm expectations.',
    },
    {
      id: 'np-4',
      point: '"If you can include the hitch install and first-year storage, I\'m ready to close today."',
      context:
        'Trading add-ons for commitment shows you\'re serious. Hitch install ($500–1,200) and storage ($1,200–2,400/yr) are high-value, low-cost concessions for dealers.',
    },
    {
      id: 'np-5',
      point: '"I want to love this unit, but I have an appointment to see another Flying Cloud in Clearwater this afternoon."',
      context:
        'Creating urgency without being aggressive. The Clearwater Airstream dealer (Suncoast) actually has comparable inventory — this is credible.',
    },
  ],

  costOfOwnership: {
    items: [
      { label: 'Insurance', annualCost: '$1,200–1,800', note: 'Full-timer policies cost more' },
      { label: 'Storage', annualCost: '$1,200–2,400', note: 'Covered storage in FL' },
      { label: 'Maintenance', annualCost: '$800–1,500', note: 'Roof reseal, bearings, brakes' },
      { label: 'Registration & taxes', annualCost: '$400–600' },
      { label: 'Propane', annualCost: '$300–500' },
      { label: 'Campground fees', annualCost: '$2,000–6,000', note: 'Varies widely by usage' },
    ],
    depreciationNote:
      'Airstreams hold value better than most RVs. Expect 8–12% depreciation in year one, then 4–6% annually. A $88K Airstream will likely be worth $72–78K in 3 years.',
    totalAnnual: '$5,900–12,800',
  },

  redFlags: [
    {
      id: 'rf-1',
      title: 'No red flags found',
      detail: 'Clean title, single owner, no accidents reported, and the dealer is a Top 50 RV Trader dealer with 12 years on the platform.',
      level: 'green',
    },
    {
      id: 'rf-2',
      title: '45 days on site — unusual for this model',
      detail:
        'Flying Clouds typically sell within 30 days. Extended time on lot could indicate pricing issue or hidden concern. Ask why.',
      level: 'yellow',
    },
    {
      id: 'rf-3',
      title: 'Listed as "new" — verify carefully',
      detail:
        'Confirm zero usage. Some dealers list demo units or show models as "new." Check for any signs of prior use during your inspection.',
      level: 'yellow',
    },
  ],
};
