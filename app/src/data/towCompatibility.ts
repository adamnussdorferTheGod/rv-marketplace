import type {
  HitchClass,
  TowVehicle,
  TowCheckStatus,
  TowCheckResult,
  TowCompatibilityResult,
  TowVerdict,
} from './towTypes.ts';

// ─── RV listing input interface ────────────────────────────────────

export interface TowableRVSpecs {
  gvwr: number;
  tongueWeight?: number;
  hitchType?: 'bumper-pull' | 'fifth-wheel' | 'gooseneck';
  lengthFt?: number;
}

// ─── Constants ─────────────────────────────────────────────────────

const DEFAULT_TONGUE_WEIGHT_PERCENT = 0.12;
const DEFAULT_PASSENGER_WEIGHT = 340;
const DEFAULT_ACCESSORY_WEIGHT = 50;

const HITCH_CLASS_CAPACITY: Record<HitchClass, number> = {
  I: 2000,
  II: 3500,
  III: 8000,
  IV: 12000,
  V: 18000,
};

const HITCH_CLASS_RANK: Record<HitchClass, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
};

// ─── Helpers ───────────────────────────────────────────────────────

function determineRequiredHitchClass(gvwr: number): HitchClass {
  if (gvwr <= 2000) return 'I';
  if (gvwr <= 3500) return 'II';
  if (gvwr <= 8000) return 'III';
  if (gvwr <= 12000) return 'IV';
  return 'V';
}

function statusFromPercent(
  percent: number,
  yellowThreshold: number,
  redThreshold: number,
): TowCheckStatus {
  if (percent < yellowThreshold) return 'green';
  if (percent < redThreshold) return 'yellow';
  return 'red';
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

// ─── Main algorithm ────────────────────────────────────────────────

export function calculateTowCompatibility(
  vehicle: TowVehicle,
  rv: TowableRVSpecs,
): TowCompatibilityResult {
  const tongueWeightEstimated = rv.tongueWeight == null;
  const effectiveTongueWeight =
    rv.tongueWeight ?? Math.round(rv.gvwr * DEFAULT_TONGUE_WEIGHT_PERCENT);

  // ── Check 1: Tow Weight ────────────────────────────────────────
  const towWeightPercent = (rv.gvwr / vehicle.maxTow) * 100;
  const towWeight: TowCheckResult = {
    status: statusFromPercent(towWeightPercent, 80, 100),
    label: 'Tow Weight',
    rvValue: rv.gvwr,
    vehicleValue: vehicle.maxTow,
    percentUsed: Math.round(towWeightPercent * 10) / 10,
    note: `${formatNumber(rv.gvwr)} lbs of ${formatNumber(vehicle.maxTow)} lbs capacity (${Math.round(towWeightPercent)}%)`,
  };

  // ── Check 2: Tongue Weight ─────────────────────────────────────
  const tongueWeightPercent =
    (effectiveTongueWeight / vehicle.maxTongue) * 100;
  const estimatedLabel = tongueWeightEstimated ? ' (estimated)' : '';
  const tongueWeightCheck: TowCheckResult = {
    status: statusFromPercent(tongueWeightPercent, 80, 100),
    label: 'Tongue Weight',
    rvValue: effectiveTongueWeight,
    vehicleValue: vehicle.maxTongue,
    percentUsed: Math.round(tongueWeightPercent * 10) / 10,
    note: `${formatNumber(effectiveTongueWeight)} lbs${estimatedLabel} of ${formatNumber(vehicle.maxTongue)} lbs capacity (${Math.round(tongueWeightPercent)}%)`,
  };

  // ── Check 3: Payload ───────────────────────────────────────────
  const totalPayloadUsed =
    effectiveTongueWeight + DEFAULT_PASSENGER_WEIGHT + DEFAULT_ACCESSORY_WEIGHT;
  const payloadPercent = (totalPayloadUsed / vehicle.payload) * 100;
  const payloadRemaining = vehicle.payload - totalPayloadUsed;
  const payload: TowCheckResult = {
    status: statusFromPercent(payloadPercent, 80, 100),
    label: 'Payload',
    rvValue: totalPayloadUsed,
    vehicleValue: vehicle.payload,
    percentUsed: Math.round(payloadPercent * 10) / 10,
    note: `Tongue ${formatNumber(effectiveTongueWeight)} lbs + passengers ${formatNumber(DEFAULT_PASSENGER_WEIGHT)} lbs + accessories ${formatNumber(DEFAULT_ACCESSORY_WEIGHT)} lbs = ${formatNumber(totalPayloadUsed)} lbs (${formatNumber(payloadRemaining)} lbs remaining)`,
  };

  // ── Check 4: GCWR ──────────────────────────────────────────────
  const combinedWeight = vehicle.curbWeight + rv.gvwr;
  const gcwrPercent = (combinedWeight / vehicle.gcwr) * 100;
  const gcwr: TowCheckResult = {
    status: statusFromPercent(gcwrPercent, 90, 100),
    label: 'GCWR',
    rvValue: combinedWeight,
    vehicleValue: vehicle.gcwr,
    percentUsed: Math.round(gcwrPercent * 10) / 10,
    note: `Combined ${formatNumber(combinedWeight)} lbs of ${formatNumber(vehicle.gcwr)} lbs GCWR (${Math.round(gcwrPercent)}%)`,
  };

  // ── Check 5: Hitch Class ──────────────────────────────────────
  let requiredClass = determineRequiredHitchClass(rv.gvwr);
  if (
    rv.hitchType === 'fifth-wheel' ||
    rv.hitchType === 'gooseneck'
  ) {
    if (HITCH_CLASS_RANK[requiredClass] < HITCH_CLASS_RANK['IV']) {
      requiredClass = 'IV';
    }
  }
  const vehicleHitchRank = HITCH_CLASS_RANK[vehicle.hitchClass];
  const requiredHitchRank = HITCH_CLASS_RANK[requiredClass];
  const hitchClassCheck: TowCheckResult = {
    status: vehicleHitchRank >= requiredHitchRank ? 'green' : 'red',
    label: 'Hitch Class',
    rvValue: requiredHitchRank,
    vehicleValue: vehicleHitchRank,
    percentUsed: 0,
    note: `Requires Class ${requiredClass}, vehicle has Class ${vehicle.hitchClass}`,
  };

  // ── Check 6: Wheelbase Ratio ──────────────────────────────────
  let wheelbaseRatio: TowCheckResult;
  if (rv.lengthFt != null) {
    const trailerLengthInches = rv.lengthFt * 12;
    const ratio = (trailerLengthInches / vehicle.wheelbase) * 100;
    wheelbaseRatio = {
      status: statusFromPercent(ratio, 110, 120),
      label: 'Wheelbase Ratio',
      rvValue: trailerLengthInches,
      vehicleValue: vehicle.wheelbase,
      percentUsed: Math.round(ratio * 10) / 10,
      note: `Trailer is ${Math.round(ratio)}% of wheelbase`,
    };
  } else {
    wheelbaseRatio = {
      status: 'green',
      label: 'Wheelbase Ratio',
      rvValue: 0,
      vehicleValue: vehicle.wheelbase,
      percentUsed: 0,
      note: 'RV length not available for wheelbase check',
    };
  }

  // ── Overall verdict ───────────────────────────────────────────
  const allStatuses: TowCheckStatus[] = [
    towWeight.status,
    tongueWeightCheck.status,
    payload.status,
    gcwr.status,
    hitchClassCheck.status,
    wheelbaseRatio.status,
  ];

  let verdict: TowVerdict;
  if (allStatuses.includes('red')) {
    verdict = 'not_recommended';
  } else if (allStatuses.includes('yellow')) {
    verdict = 'marginal';
  } else {
    verdict = 'good';
  }

  // ── Recommendations ───────────────────────────────────────────
  const recommendations: string[] = [];

  if (towWeightPercent > 50) {
    recommendations.push(
      'Weight distribution hitch (WDH) recommended for trailers using over 50% of tow capacity',
    );
  }

  if (rv.gvwr > 5000) {
    recommendations.push(
      'Brake controller required for trailers over 5,000 lbs',
    );
  }

  if (payload.status === 'yellow') {
    recommendations.push(
      'Monitor payload closely -- weigh your loaded vehicle at a scale',
    );
  }

  if (
    wheelbaseRatio.status === 'yellow' ||
    wheelbaseRatio.status === 'red'
  ) {
    recommendations.push(
      'Consider a longer wheelbase configuration for better towing stability',
    );
  }

  if (tongueWeightEstimated) {
    recommendations.push(
      'Verify actual tongue weight at a scale -- manufacturer specs can vary',
    );
  }

  recommendations.push(
    'These ratings are based on manufacturer specifications. Always verify with a certified scale before towing.',
  );

  return {
    verdict,
    checks: {
      towWeight,
      tongueWeight: tongueWeightCheck,
      payload,
      gcwr,
      hitchClass: hitchClassCheck,
      wheelbaseRatio,
    },
    overallPercentUsed: Math.round(towWeightPercent * 10) / 10,
    recommendations,
  };
}

// ─── Convenience helpers ──────────────────────────────────────────

const TOWABLE_TYPES = new Set([
  'travel-trailer',
  'fifth-wheel',
  'toy-hauler',
  'pop-up',
]);

/**
 * Returns true for towable RV types; false for motorhomes (class-a/b/c).
 * Used by the SRP filter to exclude motorhomes from tow matching.
 */
export function isTowableType(rvType: string): boolean {
  return TOWABLE_TYPES.has(rvType);
}

/** Human-readable label for a tow verdict. */
export function getVerdictLabel(verdict: TowVerdict): string {
  switch (verdict) {
    case 'good':
      return 'Good Match';
    case 'marginal':
      return 'Marginal Match';
    case 'not_recommended':
      return 'Not Recommended';
  }
}

/** Hex color for a tow verdict. */
export function getVerdictColor(verdict: TowVerdict): string {
  switch (verdict) {
    case 'good':
      return '#22c55e';
    case 'marginal':
      return '#eab308';
    case 'not_recommended':
      return '#ef4444';
  }
}

/**
 * Minimum tow vehicle requirements for a given RV (with 10% safety margin).
 * Used by the reverse match feature to filter compatible vehicles.
 */
export function getMinimumRequirements(rv: TowableRVSpecs): {
  minTowCapacity: number;
  minPayload: number;
  minHitchClass: HitchClass;
} {
  const tongueWeight =
    rv.tongueWeight ?? Math.round(rv.gvwr * DEFAULT_TONGUE_WEIGHT_PERCENT);

  let minHitchClass = determineRequiredHitchClass(rv.gvwr);
  if (
    rv.hitchType === 'fifth-wheel' ||
    rv.hitchType === 'gooseneck'
  ) {
    if (HITCH_CLASS_RANK[minHitchClass] < HITCH_CLASS_RANK['IV']) {
      minHitchClass = 'IV';
    }
  }

  return {
    minTowCapacity: Math.ceil(rv.gvwr * 1.1),
    minPayload: Math.ceil(
      (tongueWeight + DEFAULT_PASSENGER_WEIGHT + DEFAULT_ACCESSORY_WEIGHT) *
        1.1,
    ),
    minHitchClass,
  };
}
