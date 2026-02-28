// ─── Insurance estimate engine ──────────────────────────────────────
// Pure function returning educational RV insurance premium ranges.
// These are rough estimates for informational purposes only.

export interface InsuranceEstimate {
  lowAnnual: number;
  midAnnual: number;
  highAnnual: number;
  coverageType: string;
  rvCategory: string;
}

interface RateProfile {
  lowPct: number;
  midPct: number;
  highPct: number;
  minLow: number;
  minMid: number;
  minHigh: number;
  coverageType: string;
  rvCategory: string;
}

const RATE_PROFILES: Record<string, RateProfile> = {
  'travel-trailer': {
    lowPct: 0.01, midPct: 0.015, highPct: 0.02,
    minLow: 500, minMid: 750, minHigh: 1000,
    coverageType: 'Comprehensive (agreed value)',
    rvCategory: 'Travel Trailer',
  },
  'fifth-wheel': {
    lowPct: 0.01, midPct: 0.015, highPct: 0.02,
    minLow: 600, minMid: 900, minHigh: 1200,
    coverageType: 'Comprehensive (agreed value)',
    rvCategory: 'Fifth Wheel',
  },
  'class-a': {
    lowPct: 0.008, midPct: 0.012, highPct: 0.018,
    minLow: 1000, minMid: 1500, minHigh: 2500,
    coverageType: 'Full-timer or comprehensive',
    rvCategory: 'Class A Motorhome',
  },
  'class-b': {
    lowPct: 0.008, midPct: 0.012, highPct: 0.018,
    minLow: 800, minMid: 1200, minHigh: 1800,
    coverageType: 'Comprehensive (agreed value)',
    rvCategory: 'Class B Motorhome',
  },
  'class-c': {
    lowPct: 0.008, midPct: 0.012, highPct: 0.018,
    minLow: 900, minMid: 1400, minHigh: 2200,
    coverageType: 'Comprehensive (agreed value)',
    rvCategory: 'Class C Motorhome',
  },
  'pop-up': {
    lowPct: 0.008, midPct: 0.012, highPct: 0.018,
    minLow: 300, minMid: 500, minHigh: 800,
    coverageType: 'Basic liability + comprehensive',
    rvCategory: 'Pop-Up Camper',
  },
  'truck-camper': {
    lowPct: 0.008, midPct: 0.012, highPct: 0.018,
    minLow: 300, minMid: 500, minHigh: 800,
    coverageType: 'Rider on auto policy or standalone',
    rvCategory: 'Truck Camper',
  },
};

const DEFAULT_PROFILE = RATE_PROFILES['travel-trailer'];

export function getInsuranceEstimate(rvType: string, rvValue: number): InsuranceEstimate {
  const profile = RATE_PROFILES[rvType] ?? DEFAULT_PROFILE;

  return {
    lowAnnual: Math.round(Math.max(rvValue * profile.lowPct, profile.minLow)),
    midAnnual: Math.round(Math.max(rvValue * profile.midPct, profile.minMid)),
    highAnnual: Math.round(Math.max(rvValue * profile.highPct, profile.minHigh)),
    coverageType: profile.coverageType,
    rvCategory: profile.rvCategory,
  };
}
