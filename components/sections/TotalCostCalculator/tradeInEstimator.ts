// ─── Trade-in value estimator ────────────────────────────────────────
//
// Simplified trade-in value estimation based on year, make, and condition.
// Not KBB — uses depreciation curve and make/condition multipliers.

export interface TradeInEstimate {
  low: number;
  mid: number;
  high: number;
}

export interface TradeInSelection {
  year: number | null;
  make: string | null;
  model: string | null;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | null;
}

// ─── Selector data ──────────────────────────────────────────────────

export const TRADE_IN_YEARS: number[] = Array.from({ length: 30 }, (_, i) => 2026 - i);

export const TRADE_IN_MAKES: string[] = [
  'Airstream',
  'Coachmen',
  'Dutchmen',
  'Forest River',
  'Grand Design',
  'Heartland',
  'Jayco',
  'Keystone',
  'Newmar',
  'Thor',
  'Tiffin',
  'Winnebago',
  'Other',
];

export const TRADE_IN_CONDITIONS = ['excellent', 'good', 'fair', 'poor'] as const;

// ─── Multiplier tables ──────────────────────────────────────────────

const MAKE_MULTIPLIER: Record<string, number> = {
  'Airstream': 1.3,
  'Coachmen': 0.95,
  'Dutchmen': 0.95,
  'Forest River': 1.0,
  'Grand Design': 1.1,
  'Heartland': 0.95,
  'Jayco': 1.05,
  'Keystone': 0.95,
  'Newmar': 1.25,
  'Thor': 1.0,
  'Tiffin': 1.2,
  'Winnebago': 1.15,
};

const CONDITION_MULTIPLIER: Record<string, number> = {
  excellent: 1.15,
  good: 1.0,
  fair: 0.80,
  poor: 0.60,
};

// ─── Estimator ──────────────────────────────────────────────────────

/**
 * Estimate trade-in value from year/make/condition selection.
 * Returns null if year is not selected.
 */
export function estimateTradeInValue(selection: TradeInSelection): TradeInEstimate | null {
  if (selection.year == null) return null;

  const age = 2026 - selection.year;
  const baseValue = Math.max(1500, 35000 * Math.pow(0.88, age));

  const makeMultiplier = selection.make ? (MAKE_MULTIPLIER[selection.make] ?? 1.0) : 1.0;
  const conditionMultiplier = selection.condition ? (CONDITION_MULTIPLIER[selection.condition] ?? 1.0) : 1.0;

  const adjustedValue = baseValue * makeMultiplier * conditionMultiplier;

  return {
    low: Math.round(adjustedValue * 0.85),
    mid: Math.round(adjustedValue),
    high: Math.round(adjustedValue * 1.15),
  };
}
