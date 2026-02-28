/**
 * SVG silhouettes for tow vehicle categories.
 * Used on the match result card and vehicle summary.
 */

type VehicleCategory = 'full-size-truck' | 'heavy-duty-truck' | 'mid-size-truck' | 'full-size-suv' | 'mid-size-suv';

const MODEL_CATEGORIES: Record<string, VehicleCategory> = {
  // Full-size trucks
  'Ford|F-150': 'full-size-truck',
  'Ram|1500': 'full-size-truck',
  'Chevrolet|Silverado 1500': 'full-size-truck',
  'GMC|Sierra 1500': 'full-size-truck',
  'Toyota|Tundra': 'full-size-truck',
  'Nissan|Titan': 'full-size-truck',
  // Heavy-duty trucks
  'Ford|F-250': 'heavy-duty-truck',
  'Ford|F-350': 'heavy-duty-truck',
  'Ram|2500': 'heavy-duty-truck',
  'Ram|3500': 'heavy-duty-truck',
  'Chevrolet|Silverado 2500HD': 'heavy-duty-truck',
  'Chevrolet|Silverado 3500HD': 'heavy-duty-truck',
  'GMC|Sierra 2500HD': 'heavy-duty-truck',
  'GMC|Sierra 3500HD': 'heavy-duty-truck',
  // Mid-size trucks
  'Toyota|Tacoma': 'mid-size-truck',
  'Chevrolet|Colorado': 'mid-size-truck',
  'GMC|Canyon': 'mid-size-truck',
  'Ford|Ranger': 'mid-size-truck',
  'Nissan|Frontier': 'mid-size-truck',
  'Jeep|Gladiator': 'mid-size-truck',
  'Honda|Ridgeline': 'mid-size-truck',
  // Full-size SUVs
  'Ford|Expedition': 'full-size-suv',
  'Chevrolet|Tahoe': 'full-size-suv',
  'Chevrolet|Suburban': 'full-size-suv',
  'GMC|Yukon': 'full-size-suv',
  'Toyota|Sequoia': 'full-size-suv',
  'Nissan|Armada': 'full-size-suv',
  'Jeep|Wagoneer': 'full-size-suv',
  // Mid-size SUVs
  'Toyota|4Runner': 'mid-size-suv',
  'Jeep|Grand Cherokee': 'mid-size-suv',
  'Honda|Pilot': 'mid-size-suv',
};

function getCategory(make: string, model: string): VehicleCategory {
  return MODEL_CATEGORIES[`${make}|${model}`] ?? 'full-size-truck';
}

// ─── SVG Silhouettes ─────────────────────────────────────────────────

function FullSizeTruck({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path
        d="M12 42 L12 28 Q12 24 16 24 L42 24 L42 16 Q42 12 46 12 L88 12 Q92 12 94 16 L100 24 L140 24 Q144 24 146 28 L148 34 L148 42"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Bed line */}
      <line x1="42" y1="24" x2="42" y2="42" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Windshield */}
      <line x1="94" y1="16" x2="100" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Undercarriage */}
      <line x1="12" y1="42" x2="148" y2="42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Front wheel */}
      <circle cx="36" cy="46" r="10" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="36" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Rear wheel */}
      <circle cx="124" cy="46" r="10" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="124" cy="46" r="4" fill={color} opacity="0.3" />
    </svg>
  );
}

function HeavyDutyTruck({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body — taller, boxier cab */}
      <path
        d="M10 42 L10 26 Q10 22 14 22 L40 22 L40 12 Q40 8 44 8 L86 8 Q90 8 92 12 L100 22 L142 22 Q146 22 148 26 L150 34 L150 42"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Bed line */}
      <line x1="40" y1="22" x2="40" y2="42" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Windshield */}
      <line x1="92" y1="12" x2="100" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Undercarriage */}
      <line x1="10" y1="42" x2="150" y2="42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Front wheel — bigger */}
      <circle cx="34" cy="46" r="11" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="34" cy="46" r="5" fill={color} opacity="0.3" />
      {/* Rear dual wheels */}
      <circle cx="120" cy="46" r="11" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="120" cy="46" r="5" fill={color} opacity="0.3" />
      <circle cx="136" cy="46" r="11" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="136" cy="46" r="5" fill={color} opacity="0.3" />
    </svg>
  );
}

function MidSizeTruck({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body — shorter bed, compact */}
      <path
        d="M16 42 L16 30 Q16 26 20 26 L50 26 L50 18 Q50 14 54 14 L90 14 Q94 14 96 18 L102 26 L138 26 Q142 26 143 30 L144 36 L144 42"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Bed line */}
      <line x1="50" y1="26" x2="50" y2="42" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Windshield */}
      <line x1="96" y1="18" x2="102" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Undercarriage */}
      <line x1="16" y1="42" x2="144" y2="42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Front wheel */}
      <circle cx="40" cy="46" r="9" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="40" cy="46" r="3.5" fill={color} opacity="0.3" />
      {/* Rear wheel */}
      <circle cx="122" cy="46" r="9" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="122" cy="46" r="3.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function FullSizeSUV({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body — long roofline, no bed */}
      <path
        d="M14 42 L14 26 Q14 22 18 22 L74 14 Q78 14 80 14 L96 14 Q100 14 102 18 L108 24 L142 24 Q146 24 147 28 L148 36 L148 42"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Roof line */}
      <path d="M18 22 L74 14" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Windshield */}
      <line x1="102" y1="18" x2="108" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Rear window */}
      <line x1="18" y1="22" x2="14" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Undercarriage */}
      <line x1="14" y1="42" x2="148" y2="42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Front wheel */}
      <circle cx="38" cy="46" r="10" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="38" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Rear wheel */}
      <circle cx="126" cy="46" r="10" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="126" cy="46" r="4" fill={color} opacity="0.3" />
    </svg>
  );
}

function MidSizeSUV({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body — shorter, rounder */}
      <path
        d="M18 42 L18 28 Q18 24 22 24 L72 18 Q76 17 80 17 L94 17 Q98 17 100 20 L106 26 L140 26 Q143 26 144 30 L145 36 L145 42"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Windshield */}
      <line x1="100" y1="20" x2="106" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Rear slope */}
      <line x1="22" y1="24" x2="18" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Undercarriage */}
      <line x1="18" y1="42" x2="145" y2="42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Front wheel */}
      <circle cx="40" cy="46" r="9" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="40" cy="46" r="3.5" fill={color} opacity="0.3" />
      {/* Rear wheel */}
      <circle cx="124" cy="46" r="9" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="124" cy="46" r="3.5" fill={color} opacity="0.3" />
    </svg>
  );
}

// ─── Exported Component ──────────────────────────────────────────────

interface VehicleSilhouetteProps {
  make: string;
  model: string;
  color?: string;
  className?: string;
}

export default function VehicleSilhouette({
  make,
  model,
  color = 'currentColor',
  className,
}: VehicleSilhouetteProps) {
  const category = getCategory(make, model);

  return (
    <div className={className} role="img" aria-label={`${make} ${model}`}>
      {category === 'full-size-truck' && <FullSizeTruck color={color} />}
      {category === 'heavy-duty-truck' && <HeavyDutyTruck color={color} />}
      {category === 'mid-size-truck' && <MidSizeTruck color={color} />}
      {category === 'full-size-suv' && <FullSizeSUV color={color} />}
      {category === 'mid-size-suv' && <MidSizeSUV color={color} />}
    </div>
  );
}
