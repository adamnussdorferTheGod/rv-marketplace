// RV compatibility logic and location resolution
// Pure functions with no UI dependencies

import type { RvFitStatus, UserLocation } from './lifestyleTypes';

/**
 * Compute RV fit status from campground max length vs listing length.
 *
 * - 'fits': campground max length >= RV length
 * - 'tight': campground max length >= RV length - 2 (within 2ft)
 * - 'wont-fit': campground max length < RV length - 2
 */
export function computeRvFit(campgroundMaxLength: number, rvLength: number): RvFitStatus {
  if (campgroundMaxLength >= rvLength) {
    return 'fits';
  }
  if (campgroundMaxLength >= rvLength - 2) {
    return 'tight';
  }
  return 'wont-fit';
}

// Hardcoded zip-to-city lookup (simulates known-zip-code resolution)
const ZIP_LOOKUP: Record<string, UserLocation> = {
  '98101': {
    zipCode: '98101',
    city: 'Seattle',
    state: 'Washington',
    stateAbbrev: 'WA',
  },
};

/**
 * Resolve a zip code to a UserLocation.
 * Returns a fallback for unrecognized zips.
 */
export function resolveLocation(zipCode: string): UserLocation {
  return ZIP_LOOKUP[zipCode] ?? {
    zipCode,
    city: 'Unknown',
    state: 'Unknown',
    stateAbbrev: '??',
  };
}
