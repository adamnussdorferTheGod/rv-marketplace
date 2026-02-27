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
        classification: 'interior_kitchen' as const,
        narration: {
          area_label: 'Interior — Kitchen',
          description:
            'The galley kitchen comes fully equipped with stainless steel appliances including a 3-burner stove, oven, range hood, and residential-size refrigerator. Light wood cabinetry provides storage above and below the countertops.',
          notable_features: [
            'Stainless steel appliances in excellent condition',
            'Solid surface countertops with ample prep space',
            'Light wood cabinetry above and below counter',
            'Range hood with built-in lighting',
          ],
          worth_checking: [
            'Test all burners and oven operation',
            'Run refrigerator on both propane and electric',
            'Check countertop seams and sink drain',
          ],
          comparison_note:
            'Airstream kitchens use higher-end appliances than most competitors at this price point.',
        },
      },
      {
        photo_id: 'photo-04',
        classification: 'interior_kitchen' as const,
        narration: {
          area_label: 'Interior — Galley Detail',
          description:
            'A closer look at the kitchen workspace reveals the quality of materials and practical layout. The countertop space, while compact, is well-organized for meal preparation on the road.',
          notable_features: [
            'Efficient galley layout maximizes counter space',
            'Quality hardware and fixtures throughout',
            'Adequate storage for cooking essentials',
          ],
          worth_checking: [
            'Open all cabinet doors to check alignment and hinges',
            'Test faucet water pressure and hot water response',
          ],
          comparison_note:
            'The 25RB galley offers more counter space than most trailers in this length class.',
        },
      },
      {
        photo_id: 'photo-05',
        classification: 'interior_bedroom' as const,
        narration: {
          area_label: 'Interior — Bedroom',
          description:
            'The front bedroom features a comfortable sleeping area with twin beds and stunning panoramic views through the rear windows. Privacy curtains on both sides let you control the light.',
          notable_features: [
            'Twin beds with quality bedding and accent pillows',
            'Panoramic windows with scenic views',
            'Overhead storage cabinets',
            'Reading lights on both sides',
          ],
          worth_checking: [
            'Check mattress condition and any moisture signs',
            'Inspect window seals for proper fit',
            'Test privacy curtain tracks',
          ],
          comparison_note: null,
        },
      },
      {
        photo_id: 'photo-06',
        classification: 'campsite_setup' as const,
        narration: {
          area_label: 'Campsite Setup',
          description:
            'The Flying Cloud set up at a campsite shows how it looks in a real-world camping environment. The compact 25-foot length fits comfortably in standard campsites.',
          notable_features: [
            'Shows realistic campsite footprint',
            'Compact size fits standard camping spots',
            'Entry side accessible and welcoming',
          ],
          worth_checking: [
            'Ask seller about typical setup and teardown time',
            'Confirm leveling system type and operation',
          ],
          comparison_note:
            'At 25 feet, this is a manageable tow for mid-size trucks — shorter than many competing floorplans.',
        },
      },
      {
        photo_id: 'photo-07',
        classification: 'exterior_rear' as const,
        narration: {
          area_label: 'Exterior — Rear Quarter',
          description:
            'The rear quarter view shows the trailer\'s profile lines and the relationship between the body and the undercarriage. The curved aluminum panels are in excellent condition.',
          notable_features: [
            'Clean body lines with no visible damage',
            'Undercarriage appears well-maintained',
            'Wheel wells and tires visible',
          ],
          worth_checking: [
            'Inspect undercarriage for any corrosion or road damage',
            'Check tire condition and age (manufactured date)',
          ],
          comparison_note: null,
        },
      },
      {
        photo_id: 'photo-08',
        classification: 'lifestyle' as const,
        narration: {
          area_label: 'Lifestyle',
          description:
            'This lifestyle image captures the spirit of Airstream ownership — freedom, adventure, and connecting with nature in comfort and style.',
          notable_features: [
            'Iconic Airstream aesthetic on display',
          ],
          worth_checking: [],
          comparison_note:
            'Airstream trailers tend to retain 60-70% of their value after 5 years — significantly higher than the industry average of 40-50%.',
        },
      },
      {
        photo_id: 'photo-09',
        classification: 'interior_living' as const,
        narration: {
          area_label: 'Interior — Living & Dining',
          description:
            'The main living space features Airstream\'s signature panoramic windows flooding the cabin with natural light. The booth-style dinette seats four comfortably and doubles as a sleeping area, while the sofa provides additional lounging space.',
          notable_features: [
            'Booth dinette seats four and converts to bed',
            'Spacious sofa with decorative pillows',
            'Wall-mounted TV for entertainment',
            'Ceiling vent fan and skylights for ventilation',
          ],
          worth_checking: [
            'Test dinette conversion mechanism',
            'Check all window latches and blinds',
            'Verify TV mount is secure and connections work',
          ],
          comparison_note:
            'The 25RB layout provides more living space than the 23CB but less than the 28RB.',
        },
      },
      {
        photo_id: 'photo-10',
        classification: 'campsite_setup' as const,
        narration: {
          area_label: 'Campsite — Aerial View',
          description:
            'An elevated view of the Flying Cloud set up at a wooded lakeside campsite. The awning is extended, outdoor furniture is arranged, and multiple roof-mounted AC units are visible.',
          notable_features: [
            'Awning provides generous shade coverage',
            'Dual roof-mounted AC units visible',
            'Full campsite setup with outdoor living area',
          ],
          worth_checking: [
            'Extend and retract the power awning to verify operation',
            'Confirm both AC units are functional',
            'Ask what outdoor accessories are included in the sale',
          ],
          comparison_note: null,
        },
      },
      {
        photo_id: 'photo-11',
        classification: 'interior_living' as const,
        narration: {
          area_label: 'Interior — Full Overview',
          description:
            'A wide-angle view from the front captures the full length of the interior. The kitchen galley lines the left side with the L-shaped lounge and dinette on the right, showcasing the open and efficient floor plan.',
          notable_features: [
            'Open floor plan feels spacious for a 25-foot trailer',
            'L-shaped sofa provides ample seating',
            'Skylights and overhead lighting brighten the space',
            'Premium speakers integrated into the ceiling',
          ],
          worth_checking: [
            'Walk the full length checking for soft spots in flooring',
            'Test all overhead lights and ceiling fixtures',
            'Check skylights for any signs of leaking',
          ],
          comparison_note:
            'The panoramic windows and aluminum interior are unique to Airstream — most competitors use fiberglass walls and smaller windows.',
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
