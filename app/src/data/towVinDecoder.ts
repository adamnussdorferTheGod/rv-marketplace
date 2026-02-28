import type { TowVehicle, VINDecodeResult } from './towTypes.ts';
import { getVehicle } from './towVehicleDatabase.ts';

// ─── VIN character validation ───────────────────────────────────────
//
// Per FMVSS 115 / ISO 3779, VINs use A-Z 0-9 excluding I, O, Q.

const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/;

// ─── Sample VIN-to-vehicle mappings ─────────────────────────────────
//
// Maps 10 realistic-format VINs to vehicles in the static database.
// VINs follow the 17-character standard (check digit at position 9
// is not validated — this is a mock decoder).

const SAMPLE_VINS: Record<string, TowVehicle> = {};

// Helper to safely populate VIN map from the database
function registerVin(
  vin: string,
  year: number, make: string, model: string, trim: string,
  engine: string, cab: string, bed: string,
): void {
  const vehicle = getVehicle(year, make, model, trim, engine, cab, bed);
  if (vehicle) {
    SAMPLE_VINS[vin] = vehicle;
  }
}

// 2024 Ford F-150 XLT 3.5L EcoBoost SuperCrew 5.5ft
registerVin('1FTFW1E87NFA12345',
  2024, 'Ford', 'F-150', 'XLT', '3.5L EcoBoost V6', 'SuperCrew', '5.5 ft');

// 2024 Ram 1500 Laramie 5.7L HEMI Crew Cab 5'7"
registerVin('1C6SRFJT0PN123456',
  2024, 'Ram', '1500', 'Laramie', '5.7L HEMI V8', 'Crew Cab', '5\'7"');

// 2024 Chevy Silverado 1500 LTZ 5.3L V8 Crew Cab Short
registerVin('3GCUYDED8PG234567',
  2024, 'Chevrolet', 'Silverado 1500', 'LTZ', '5.3L V8', 'Crew Cab', 'Short');

// 2024 Toyota Tundra SR5 3.5L Twin-Turbo CrewMax 5.5ft
registerVin('5TFRA5DB0PX345678',
  2024, 'Toyota', 'Tundra', 'SR5', '3.5L Twin-Turbo V6', 'CrewMax', '5.5 ft');

// 2023 Ford F-250 Lariat 6.7L PowerStroke Crew Cab
registerVin('1FT8W2BT5PED56789',
  2023, 'Ford', 'F-250', 'Lariat', '6.7L PowerStroke Diesel', 'Crew Cab', '6.75 ft');

// 2023 Ram 2500 Laramie 6.7L Cummins Crew Cab
registerVin('3C6UR5NL2PG678901',
  2023, 'Ram', '2500', 'Laramie', '6.7L Cummins Diesel', 'Crew Cab', '6\'4"');

// 2024 GMC Sierra 1500 Denali 6.2L V8 Crew Cab
registerVin('3GTU9FED3PG789012',
  2024, 'GMC', 'Sierra 1500', 'Denali', '6.2L V8', 'Crew Cab', 'Short');

// 2024 Chevy Tahoe Z71 5.3L V8
registerVin('1GNSKBKD0PR890123',
  2024, 'Chevrolet', 'Tahoe', 'Z71', '5.3L V8', 'SUV', 'N/A');

// 2024 Toyota Tacoma SR5 2.4L Turbo Double Cab
registerVin('5TFCZ5AN3PX901234',
  2024, 'Toyota', 'Tacoma', 'SR5', '2.4L Turbo', 'Double Cab', '5 ft');

// 2024 Jeep Gladiator Rubicon 3.6L V6
registerVin('1C6JJTBG0PL012345',
  2024, 'Jeep', 'Gladiator', 'Rubicon', '3.6L V6', 'Crew Cab', '5 ft');

// ─── VIN decode function ────────────────────────────────────────────

/**
 * Decodes a VIN string and returns the matching tow vehicle from the
 * database, or an error if the VIN is invalid or not found.
 *
 * This is a mock decoder that matches against a set of sample VINs.
 * In production this would call the NHTSA vPIC API or a paid service
 * like DataOne.
 */
export function decodeVin(vin: string): VINDecodeResult {
  // Normalize: trim whitespace, uppercase
  const normalized = vin.trim().toUpperCase();

  // Validate length
  if (normalized.length !== 17) {
    return { vin: normalized, vehicle: null, error: 'VIN must be 17 characters' };
  }

  // Validate characters (no I, O, Q per VIN standard)
  if (!VIN_PATTERN.test(normalized)) {
    return {
      vin: normalized,
      vehicle: null,
      error: 'VIN contains invalid characters. VINs use A-Z and 0-9 (excluding I, O, Q).',
    };
  }

  // Look up in sample VIN map
  const vehicle = SAMPLE_VINS[normalized] ?? null;

  if (vehicle) {
    return { vin: normalized, vehicle, error: null };
  }

  return {
    vin: normalized,
    vehicle: null,
    error: 'Vehicle not found in database. Try manual selection.',
  };
}
