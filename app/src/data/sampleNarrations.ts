import type { ListingNarrations } from './types';
import { sampleListing } from './sampleListing';

export const sampleNarrations: ListingNarrations = {
  listing_id: 'AS24FC25RB',
  narration_version: '1.0',
  photos: sampleListing.images.map((img, i) => {
    const narrations = [
      {
        photo_id: 'photo-01',
        classification: 'exterior_front' as const,
        narration: {
          area_label: 'Exterior — Front View',
          description:
            'The front profile shows the iconic Airstream aluminum shell in excellent condition. The aerodynamic shape reduces drag and improves fuel economy while towing.',
          notable_features: [
            'Aluminum shell shows no dents or oxidation',
            'Front window intact with proper seal',
            'Hitch assembly appears factory-standard',
          ],
          worth_checking: [
            'Check front cap sealant for cracking during in-person visit',
          ],
          comparison_note:
            'Airstream\'s aluminum construction typically holds up better than fiberglass competitors over 10+ years.',
        },
      },
      {
        photo_id: 'photo-02',
        classification: 'exterior_rear' as const,
        narration: {
          area_label: 'Exterior — Rear View',
          description:
            'The rear of the Flying Cloud shows the bumper, taillights, and rear window. The curved aluminum panels are characteristic of the Airstream design.',
          notable_features: [
            'Rear bumper in good condition',
            'Tail lights appear clear and functional',
          ],
          worth_checking: [
            'Inspect rear sealant around window and bumper mounts',
            'Check for any road debris damage underneath',
          ],
          comparison_note: null,
        },
      },
      {
        photo_id: 'photo-03',
        classification: 'interior_living' as const,
        narration: {
          area_label: 'Interior — Living Area',
          description:
            'The main living space features Airstream\'s panoramic windows that flood the cabin with natural light. The convertible dinette seats four comfortably and doubles as a sleeping area.',
          notable_features: [
            'Panoramic windows in excellent condition',
            'Upholstery shows minimal wear',
            'Convertible dinette seats four',
          ],
          worth_checking: [
            'Test all window latches and blinds',
            'Check dinette conversion mechanism',
          ],
          comparison_note:
            'The 25RB layout provides more living space than the 23CB but less than the 28RB.',
        },
      },
      {
        photo_id: 'photo-04',
        classification: 'interior_kitchen' as const,
        narration: {
          area_label: 'Interior — Kitchen',
          description:
            'The galley kitchen comes fully equipped with stainless steel appliances including a 3-burner stove, oven, microwave, and residential-size refrigerator.',
          notable_features: [
            'Stainless steel appliances in good condition',
            'Solid surface countertops',
            'Adequate cabinet storage above and below',
          ],
          worth_checking: [
            'Test all burners and oven operation',
            'Run refrigerator on both propane and electric',
          ],
          comparison_note:
            'Airstream kitchens use higher-end appliances than most competitors at this price point.',
        },
      },
      {
        photo_id: 'photo-05',
        classification: 'interior_bedroom' as const,
        narration: {
          area_label: 'Interior — Bedroom',
          description:
            'The front bedroom features a dedicated queen-size bed with residential mattress. The layout provides walk-around access on both sides.',
          notable_features: [
            'Queen-size bed with residential mattress',
            'Walk-around bed access on both sides',
            'Overhead storage cabinets',
          ],
          worth_checking: [
            'Check mattress condition and any moisture signs',
            'Inspect bedroom windows for proper seal',
          ],
          comparison_note: null,
        },
      },
      {
        photo_id: 'photo-06',
        classification: 'exterior_side_driver' as const,
        narration: {
          area_label: 'Exterior — Driver Side',
          description:
            'The driver-side profile shows the full length of the 25-foot trailer. The awning, entry door, and exterior storage compartments are visible.',
          notable_features: [
            'Power awning appears intact',
            'Entry door and step in good condition',
            'Exterior storage compartments visible',
          ],
          worth_checking: [
            'Extend and retract the power awning to verify operation',
            'Check all exterior compartment latches and seals',
          ],
          comparison_note:
            'At 25 feet, this is a manageable tow for mid-size trucks — shorter than many competing floorplans.',
        },
      },
      {
        photo_id: 'photo-07',
        classification: 'interior_detail' as const,
        narration: {
          area_label: 'Interior — Detail',
          description:
            'Close-up details reveal the quality of Airstream\'s interior craftsmanship, including the cabinetry, hardware, and finish materials.',
          notable_features: [
            'Quality cabinet hardware throughout',
            'Clean interior finish with no visible damage',
          ],
          worth_checking: [
            'Open and close all cabinet doors to check alignment',
          ],
          comparison_note: null,
        },
      },
      {
        photo_id: 'photo-08',
        classification: 'campsite_setup' as const,
        narration: {
          area_label: 'Campsite Setup',
          description:
            'This lifestyle shot shows the Flying Cloud at a campsite, demonstrating its real-world setup. The awning extends to create a shaded outdoor living area.',
          notable_features: [
            'Shows realistic campsite footprint',
            'Awning provides generous shade coverage',
          ],
          worth_checking: [
            'Ask seller about typical setup and teardown time',
          ],
          comparison_note: null,
        },
      },
      {
        photo_id: 'photo-09',
        classification: 'campsite_setup' as const,
        narration: {
          area_label: 'Camping Setup — Full View',
          description:
            'Another campsite angle showing the overall camping setup with outdoor furniture and accessories.',
          notable_features: [
            'Demonstrates versatile camping configurations',
          ],
          worth_checking: [
            'Ask what outdoor accessories are included in the sale',
          ],
          comparison_note: null,
        },
      },
      {
        photo_id: 'photo-10',
        classification: 'exterior_rear' as const,
        narration: {
          area_label: 'Exterior — Rear Quarter',
          description:
            'The rear quarter view shows the trailer\'s profile lines and the relationship between the body and the undercarriage.',
          notable_features: [
            'Clean body lines with no visible damage',
            'Undercarriage appears well-maintained',
          ],
          worth_checking: [
            'Inspect undercarriage for any corrosion or road damage',
            'Check tire condition and age (manufactured date)',
          ],
          comparison_note: null,
        },
      },
      {
        photo_id: 'photo-11',
        classification: 'lifestyle' as const,
        narration: {
          area_label: 'Lifestyle',
          description:
            'This lifestyle image captures the spirit of Airstream ownership — freedom, adventure, and connecting with nature in comfort and style.',
          notable_features: [
            'Iconic Airstream aesthetic',
          ],
          worth_checking: [],
          comparison_note:
            'Airstream trailers tend to retain 60-70% of their value after 5 years — significantly higher than the industry average of 40-50%.',
        },
      },
    ];

    const narration = narrations[i] || narrations[0];
    return {
      photo_id: narration.photo_id,
      photo_url: img.url,
      sort_order: i + 1,
      classification: narration.classification,
      narration: narration.narration,
    };
  }),
  gap_analysis: {
    coverage_score: 72,
    missing_categories: [
      'Bathroom interior',
      'Undercarriage / frame',
      'Roof condition',
      'Electrical panel',
      'Water heater',
      'Tongue / hitch close-up',
    ],
    recommendation:
      'This listing covers exterior and main living areas well but is missing bathroom, mechanical, and infrastructure photos. Ask the seller for photos of these areas before scheduling a visit.',
  },
};
