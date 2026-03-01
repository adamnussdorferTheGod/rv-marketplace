import type { ListingData, ListingNarrations, PhotoNarration, PhotoClassification, NarrationData } from './types';

/**
 * Attempt to classify a photo from its alt text.
 * Falls back to positional heuristic if alt text is generic.
 */
function classifyPhoto(alt: string, index: number, total: number): PhotoClassification {
  const a = alt.toLowerCase();

  // Keyword matching on alt text
  if (/front|grille|headlight|nose|cab\b/.test(a)) return 'exterior_front';
  if (/rear|tail|back|bumper|hitch/.test(a)) return 'exterior_rear';
  if (/driver.?side|left.?side/.test(a)) return 'exterior_side_driver';
  if (/passenger|right.?side/.test(a)) return 'exterior_side_passenger';
  if (/kitchen|galley|stove|oven|fridge|refrigerator|microwave|sink/.test(a)) return 'interior_kitchen';
  if (/bed|bedroom|mattress|bunk|sleep/.test(a)) return 'interior_bedroom';
  if (/bath|shower|toilet|vanity|lavatory/.test(a)) return 'interior_bathroom';
  if (/living|dinette|sofa|couch|lounge|booth|table|tv\b/.test(a)) return 'interior_living';
  if (/cockpit|dash|steering|driver.?seat|cab.?interior/.test(a)) return 'interior_detail';
  if (/camp|setup|site|outdoor|awning/.test(a)) return 'campsite_setup';
  if (/lifestyle|scenic|road|adventure|sunset|lake/.test(a)) return 'lifestyle';
  if (/interior|inside/.test(a)) return 'interior_living';
  if (/exterior|outside/.test(a)) return 'exterior_front';

  // Positional fallback: first ~30% exterior, next ~50% interior, rest lifestyle/campsite
  const pct = index / total;
  if (pct < 0.15) return 'exterior_front';
  if (pct < 0.3) return 'exterior_side_driver';
  if (pct < 0.45) return 'interior_living';
  if (pct < 0.55) return 'interior_kitchen';
  if (pct < 0.65) return 'interior_bedroom';
  if (pct < 0.75) return 'interior_bathroom';
  if (pct < 0.85) return 'interior_detail';
  if (pct < 0.92) return 'campsite_setup';
  return 'lifestyle';
}

function findSpec(listing: ListingData, label: string): string | undefined {
  return listing.specs.find(
    (s) => s.label.toLowerCase() === label.toLowerCase()
  )?.value;
}

function shortName(listing: ListingData): string {
  return `${listing.make} ${listing.model}`.trim() || listing.title;
}

interface NarrationTemplate {
  area_label: string;
  description: (name: string, listing: ListingData) => string;
  notable_features: (listing: ListingData) => string[];
  worth_checking: string[];
  comparison_note: ((listing: ListingData) => string) | null;
}

function getNarrationTemplate(classification: PhotoClassification): NarrationTemplate {
  const templates: Record<PhotoClassification, NarrationTemplate> = {
    exterior_front: {
      area_label: 'Exterior — Front View',
      description: (name, listing) =>
        `The front profile of this ${listing.year} ${name} shows the build quality and design. ${listing.dealRating === 'great' || listing.dealRating === 'good' ? 'The exterior appears to be in excellent condition.' : 'Take a close look at the overall exterior condition.'}`,
      notable_features: (listing) => [
        'Check body panels for any signs of damage or repair',
        `${listing.year} model year — ${new Date().getFullYear() - listing.year === 0 ? 'brand new' : `${new Date().getFullYear() - listing.year} years old`}`,
        'Front cap and headlight condition visible',
      ],
      worth_checking: [
        'Check front cap sealant for cracking during in-person visit',
        'Inspect headlights and marker lights for clarity',
      ],
      comparison_note: null,
    },
    exterior_side_driver: {
      area_label: 'Exterior — Side View',
      description: (name, listing) => {
        const length = findSpec(listing, 'Length') ?? findSpec(listing, 'Overall Length');
        return `A side view of the ${name} reveals the full profile. ${length ? `At ${length}, this unit ` : 'This unit '}offers a practical footprint for camping and travel.`;
      },
      notable_features: (listing) => {
        const features = ['Body panel alignment and condition visible'];
        const slides = findSpec(listing, 'Slides');
        if (slides && slides !== '0') features.push(`${slides} slide-out${slides === '1' ? '' : 's'} visible from this angle`);
        features.push('Check awning condition and operation');
        return features;
      },
      worth_checking: [
        'Run your hand along seams and seals checking for soft spots',
        'Inspect slide-out seals if equipped',
      ],
      comparison_note: null,
    },
    exterior_side_passenger: {
      area_label: 'Exterior — Passenger Side',
      description: (name) =>
        `The passenger side of the ${name} shows the entry door and additional exterior features. This angle reveals the overall condition of the sidewall and any exterior storage compartments.`,
      notable_features: () => [
        'Entry door and step condition',
        'Exterior storage compartments visible',
        'Sidewall condition and graphics',
      ],
      worth_checking: [
        'Test entry door lock and handle',
        'Check exterior compartment latches',
      ],
      comparison_note: null,
    },
    exterior_rear: {
      area_label: 'Exterior — Rear View',
      description: (name) =>
        `The rear of the ${name} shows the bumper, taillights, and overall rear profile. This view is important for assessing towing components and rear clearance.`,
      notable_features: () => [
        'Rear bumper and taillight condition',
        'Spare tire location visible',
        'Rear ladder or bike rack mounting points',
      ],
      worth_checking: [
        'Inspect rear sealant around windows and bumper mounts',
        'Check for any road debris damage underneath',
      ],
      comparison_note: null,
    },
    interior_living: {
      area_label: 'Interior — Living Area',
      description: (name, listing) => {
        const sleeps = findSpec(listing, 'Sleeps') ?? findSpec(listing, 'Sleeping Capacity');
        return `The main living space of the ${name} ${sleeps ? `comfortably accommodates ${sleeps} and ` : ''}features a well-designed layout that balances comfort with functionality for life on the road.`;
      },
      notable_features: (listing) => {
        const features = ['Overall interior condition and finish quality'];
        const slides = findSpec(listing, 'Slides');
        if (slides && slides !== '0') features.push(`Slide-out${slides === '1' ? '' : 's'} add usable living space when deployed`);
        features.push('Upholstery and soft goods condition');
        features.push('Natural and artificial lighting');
        return features;
      },
      worth_checking: [
        'Check all window latches and blinds',
        'Test any convertible furniture mechanisms',
        'Walk the full length checking for soft spots in flooring',
      ],
      comparison_note: null,
    },
    interior_kitchen: {
      area_label: 'Interior — Kitchen',
      description: (name) =>
        `The kitchen area of the ${name} comes equipped with essential appliances for cooking on the road. The layout maximizes counter space and storage within the available footprint.`,
      notable_features: () => [
        'Appliance condition and brand quality',
        'Counter space and prep area',
        'Cabinet storage above and below countertops',
        'Ventilation and range hood',
      ],
      worth_checking: [
        'Test all burners and oven operation',
        'Run refrigerator on both propane and electric',
        'Check countertop seams and sink drain',
        'Test faucet water pressure and hot water',
      ],
      comparison_note: null,
    },
    interior_bedroom: {
      area_label: 'Interior — Bedroom',
      description: (name, listing) => {
        const sleeps = findSpec(listing, 'Sleeps') ?? findSpec(listing, 'Sleeping Capacity');
        return `The sleeping area of the ${name} ${sleeps ? `is designed to sleep ${sleeps} and ` : ''}provides a comfortable retreat after a day of adventure. Check the mattress quality and surrounding storage.`;
      },
      notable_features: () => [
        'Mattress size and condition',
        'Surrounding storage and closet space',
        'Reading lights and electrical outlets',
        'Privacy curtain or door',
      ],
      worth_checking: [
        'Check mattress condition and any moisture signs',
        'Inspect window seals for proper fit',
        'Test any powered bed adjustment mechanisms',
      ],
      comparison_note: null,
    },
    interior_bathroom: {
      area_label: 'Interior — Bathroom',
      description: (name) =>
        `The bathroom in the ${name} includes the essentials for comfortable travel. Check for any signs of water damage, which is the most common issue area in RVs.`,
      notable_features: () => [
        'Toilet and shower condition',
        'Vanity storage and mirror',
        'Ventilation fan and lighting',
      ],
      worth_checking: [
        'Look carefully for any signs of water damage or mold',
        'Test the toilet flush mechanism',
        'Check shower head and water pressure',
        'Inspect caulking around shower and sink',
      ],
      comparison_note: null,
    },
    interior_detail: {
      area_label: 'Interior — Details',
      description: (name) =>
        `A closer look at the interior details of the ${name} reveals the quality of materials, hardware, and overall craftsmanship that went into this unit.`,
      notable_features: () => [
        'Build quality and material finishes',
        'Hardware and fixture quality',
        'Attention to detail in trim and molding',
      ],
      worth_checking: [
        'Open cabinets and drawers to check alignment',
        'Test all switches and controls',
      ],
      comparison_note: null,
    },
    campsite_setup: {
      area_label: 'Campsite Setup',
      description: (name, listing) => {
        const length = findSpec(listing, 'Length') ?? findSpec(listing, 'Overall Length');
        return `The ${name} shown in a camping environment gives you a realistic sense of its footprint. ${length ? `At ${length}, it ` : 'It '}fits comfortably in standard campsites.`;
      },
      notable_features: (listing) => {
        const features = ['Realistic campsite footprint visible'];
        const length = findSpec(listing, 'Length') ?? findSpec(listing, 'Overall Length');
        if (length) features.push(`${length} length fits standard camping spots`);
        features.push('Awning and outdoor living potential');
        return features;
      },
      worth_checking: [
        'Ask seller about typical setup and teardown time',
        'Confirm leveling system type and operation',
      ],
      comparison_note: null,
    },
    lifestyle: {
      area_label: 'Lifestyle',
      description: (name) =>
        `This image captures the spirit of owning a ${name} — freedom, adventure, and connecting with nature in comfort.`,
      notable_features: () => [
        'Shows the RV in a real-world context',
      ],
      worth_checking: [],
      comparison_note: (listing) =>
        `Listed at $${listing.currentPrice.toLocaleString()}, this ${listing.year} ${shortName(listing)} is rated as a "${listing.dealRating}" deal in the current market.`,
    },
    other: {
      area_label: 'Additional Photo',
      description: (name) =>
        `Another view of the ${name}, providing additional perspective on the unit's condition and features.`,
      notable_features: () => [
        'Additional angle for assessing condition',
      ],
      worth_checking: [],
      comparison_note: null,
    },
  };

  return templates[classification];
}

/** Coverage tracking for gap analysis */
const ALL_CATEGORIES: PhotoClassification[] = [
  'exterior_front', 'exterior_rear', 'exterior_side_driver',
  'interior_living', 'interior_kitchen', 'interior_bedroom', 'interior_bathroom',
  'campsite_setup',
];

const CATEGORY_LABELS: Record<string, string> = {
  exterior_front: 'Front exterior',
  exterior_rear: 'Rear exterior',
  exterior_side_driver: 'Side exterior',
  exterior_side_passenger: 'Passenger side exterior',
  interior_living: 'Living area',
  interior_kitchen: 'Kitchen',
  interior_bedroom: 'Bedroom / sleeping area',
  interior_bathroom: 'Bathroom',
  interior_detail: 'Interior details',
  campsite_setup: 'Campsite setup',
  lifestyle: 'Lifestyle / scenic',
};

export function generateNarrations(listing: ListingData): ListingNarrations {
  const name = shortName(listing);
  const total = listing.images.length;
  const coveredCategories = new Set<PhotoClassification>();

  const photos: PhotoNarration[] = listing.images.map((img, i) => {
    const classification = classifyPhoto(img.alt, i, total);
    coveredCategories.add(classification);

    const template = getNarrationTemplate(classification);
    const narration: NarrationData = {
      area_label: template.area_label,
      description: template.description(name, listing),
      notable_features: template.notable_features(listing),
      worth_checking: template.worth_checking,
      comparison_note: template.comparison_note ? template.comparison_note(listing) : null,
    };

    return {
      photo_id: `photo-${String(i + 1).padStart(2, '0')}`,
      photo_url: img.url,
      sort_order: i + 1,
      classification,
      narration,
    };
  });

  // Gap analysis
  const missingCategories = ALL_CATEGORIES
    .filter((c) => !coveredCategories.has(c))
    .map((c) => CATEGORY_LABELS[c] ?? c);

  const coverageScore = Math.round((coveredCategories.size / ALL_CATEGORIES.length) * 100);

  const recommendation = missingCategories.length === 0
    ? 'This listing has excellent photo coverage across all major areas.'
    : `This listing is missing photos of: ${missingCategories.join(', ')}. Ask the seller for photos of these areas before scheduling a visit.`;

  return {
    listing_id: listing.stockNumber,
    narration_version: '1.0',
    photos,
    gap_analysis: {
      coverage_score: coverageScore,
      missing_categories: missingCategories,
      recommendation,
    },
  };
}
