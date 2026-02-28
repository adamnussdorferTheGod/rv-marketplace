import type { TowVehicle, HitchClass } from './towTypes.ts';

// ─── Static tow vehicle database ────────────────────────────────────
//
// 55 truck/SUV configurations with realistic tow specs sourced from
// manufacturer tow guides. Covers half-ton, heavy-duty, mid-size
// trucks and full-size SUVs from 2022-2024.

export const TOW_VEHICLE_DATABASE: TowVehicle[] = [
  // ─── Ford F-150 (2022-2024) ─────────────────────────────────────
  {
    year: 2024, make: 'Ford', model: 'F-150', trim: 'XLT',
    engine: '2.7L EcoBoost V6', cab: 'SuperCrew', bed: '5.5 ft',
    maxTow: 8200, maxTongue: 820, payload: 1840, gcwr: 15000,
    curbWeight: 4525, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'F-150', trim: 'XLT',
    engine: '3.5L EcoBoost V6', cab: 'SuperCrew', bed: '5.5 ft',
    maxTow: 13200, maxTongue: 1320, payload: 1940, gcwr: 20000,
    curbWeight: 4665, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'F-150', trim: 'XLT',
    engine: '5.0L V8', cab: 'SuperCrew', bed: '5.5 ft',
    maxTow: 11500, maxTongue: 1150, payload: 1810, gcwr: 17800,
    curbWeight: 4580, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'F-150', trim: 'XLT',
    engine: '3.5L EcoBoost V6', cab: 'SuperCab', bed: '6.5 ft',
    maxTow: 13500, maxTongue: 1350, payload: 2010, gcwr: 20000,
    curbWeight: 4540, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'F-150', trim: 'Lariat',
    engine: '3.5L EcoBoost V6', cab: 'SuperCrew', bed: '5.5 ft',
    maxTow: 13000, maxTongue: 1300, payload: 1790, gcwr: 19500,
    curbWeight: 4810, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'F-150', trim: 'Lariat',
    engine: '5.0L V8', cab: 'SuperCrew', bed: '6.5 ft',
    maxTow: 11100, maxTongue: 1110, payload: 1690, gcwr: 17500,
    curbWeight: 4770, wheelbase: 157, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'F-150', trim: 'King Ranch',
    engine: '3.5L EcoBoost V6', cab: 'SuperCrew', bed: '5.5 ft',
    maxTow: 12700, maxTongue: 1270, payload: 1610, gcwr: 19200,
    curbWeight: 4980, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2023, make: 'Ford', model: 'F-150', trim: 'XLT',
    engine: '2.7L EcoBoost V6', cab: 'SuperCrew', bed: '5.5 ft',
    maxTow: 8200, maxTongue: 820, payload: 1830, gcwr: 15000,
    curbWeight: 4510, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2022, make: 'Ford', model: 'F-150', trim: 'XLT',
    engine: '3.5L EcoBoost V6', cab: 'SuperCrew', bed: '5.5 ft',
    maxTow: 13100, maxTongue: 1310, payload: 1920, gcwr: 19900,
    curbWeight: 4650, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },

  // ─── Ram 1500 (2022-2024) ───────────────────────────────────────
  {
    year: 2024, make: 'Ram', model: '1500', trim: 'Big Horn',
    engine: '3.6L V6', cab: 'Quad Cab', bed: '6\'4"',
    maxTow: 7730, maxTongue: 773, payload: 1680, gcwr: 14010,
    curbWeight: 4798, wheelbase: 140, hitchClass: 'III' as HitchClass, hasTowPackage: false,
  },
  {
    year: 2024, make: 'Ram', model: '1500', trim: 'Big Horn',
    engine: '5.7L HEMI V8', cab: 'Crew Cab', bed: '5\'7"',
    maxTow: 11610, maxTongue: 1161, payload: 1830, gcwr: 17900,
    curbWeight: 5010, wheelbase: 144, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ram', model: '1500', trim: 'Big Horn',
    engine: '5.7L HEMI V8', cab: 'Crew Cab', bed: '6\'4"',
    maxTow: 12150, maxTongue: 1215, payload: 1910, gcwr: 18400,
    curbWeight: 5060, wheelbase: 153, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ram', model: '1500', trim: 'Laramie',
    engine: '5.7L HEMI V8', cab: 'Crew Cab', bed: '5\'7"',
    maxTow: 11320, maxTongue: 1132, payload: 1680, gcwr: 17500,
    curbWeight: 5180, wheelbase: 144, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ram', model: '1500', trim: 'Laramie',
    engine: '5.7L HEMI V8', cab: 'Crew Cab', bed: '6\'4"',
    maxTow: 12750, maxTongue: 1275, payload: 1830, gcwr: 18800,
    curbWeight: 5240, wheelbase: 153, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ram', model: '1500', trim: 'Limited',
    engine: '5.7L HEMI V8', cab: 'Crew Cab', bed: '5\'7"',
    maxTow: 11100, maxTongue: 1110, payload: 1530, gcwr: 17200,
    curbWeight: 5380, wheelbase: 144, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2023, make: 'Ram', model: '1500', trim: 'Big Horn',
    engine: '5.7L HEMI V8', cab: 'Crew Cab', bed: '5\'7"',
    maxTow: 11560, maxTongue: 1156, payload: 1810, gcwr: 17800,
    curbWeight: 4990, wheelbase: 144, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2022, make: 'Ram', model: '1500', trim: 'Laramie',
    engine: '5.7L HEMI V8', cab: 'Crew Cab', bed: '5\'7"',
    maxTow: 11250, maxTongue: 1125, payload: 1660, gcwr: 17400,
    curbWeight: 5160, wheelbase: 144, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },

  // ─── Chevy Silverado 1500 (2022-2024) ───────────────────────────
  {
    year: 2024, make: 'Chevrolet', model: 'Silverado 1500', trim: 'LT',
    engine: '2.7L Turbo', cab: 'Double Cab', bed: 'Standard',
    maxTow: 9500, maxTongue: 950, payload: 1940, gcwr: 16000,
    curbWeight: 4420, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Chevrolet', model: 'Silverado 1500', trim: 'LT',
    engine: '5.3L V8', cab: 'Crew Cab', bed: 'Short',
    maxTow: 11300, maxTongue: 1130, payload: 1920, gcwr: 17500,
    curbWeight: 4700, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Chevrolet', model: 'Silverado 1500', trim: 'LTZ',
    engine: '5.3L V8', cab: 'Crew Cab', bed: 'Short',
    maxTow: 11000, maxTongue: 1100, payload: 1780, gcwr: 17200,
    curbWeight: 4860, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Chevrolet', model: 'Silverado 1500', trim: 'LTZ',
    engine: '6.2L V8', cab: 'Crew Cab', bed: 'Short',
    maxTow: 13300, maxTongue: 1330, payload: 1800, gcwr: 19500,
    curbWeight: 4920, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Chevrolet', model: 'Silverado 1500', trim: 'High Country',
    engine: '6.2L V8', cab: 'Crew Cab', bed: 'Short',
    maxTow: 13000, maxTongue: 1300, payload: 1640, gcwr: 19300,
    curbWeight: 5110, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2023, make: 'Chevrolet', model: 'Silverado 1500', trim: 'LT',
    engine: '5.3L V8', cab: 'Crew Cab', bed: 'Short',
    maxTow: 11200, maxTongue: 1120, payload: 1900, gcwr: 17400,
    curbWeight: 4680, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2022, make: 'Chevrolet', model: 'Silverado 1500', trim: 'LT',
    engine: '5.3L V8', cab: 'Double Cab', bed: 'Standard',
    maxTow: 11100, maxTongue: 1110, payload: 1940, gcwr: 17300,
    curbWeight: 4620, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },

  // ─── GMC Sierra 1500 (2023-2024) ────────────────────────────────
  {
    year: 2024, make: 'GMC', model: 'Sierra 1500', trim: 'SLE',
    engine: '2.7L Turbo', cab: 'Crew Cab', bed: 'Short',
    maxTow: 9500, maxTongue: 950, payload: 1920, gcwr: 16000,
    curbWeight: 4490, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'GMC', model: 'Sierra 1500', trim: 'SLT',
    engine: '5.3L V8', cab: 'Crew Cab', bed: 'Short',
    maxTow: 11100, maxTongue: 1110, payload: 1810, gcwr: 17300,
    curbWeight: 4830, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'GMC', model: 'Sierra 1500', trim: 'Denali',
    engine: '6.2L V8', cab: 'Crew Cab', bed: 'Short',
    maxTow: 13200, maxTongue: 1320, payload: 1680, gcwr: 19400,
    curbWeight: 5080, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2023, make: 'GMC', model: 'Sierra 1500', trim: 'SLE',
    engine: '5.3L V8', cab: 'Crew Cab', bed: 'Short',
    maxTow: 11000, maxTongue: 1100, payload: 1870, gcwr: 17200,
    curbWeight: 4760, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2023, make: 'GMC', model: 'Sierra 1500', trim: 'Denali',
    engine: '6.2L V8', cab: 'Crew Cab', bed: 'Short',
    maxTow: 13100, maxTongue: 1310, payload: 1650, gcwr: 19300,
    curbWeight: 5060, wheelbase: 147, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },

  // ─── Toyota Tundra (2022-2024) ──────────────────────────────────
  {
    year: 2024, make: 'Toyota', model: 'Tundra', trim: 'SR5',
    engine: '3.5L Twin-Turbo V6', cab: 'CrewMax', bed: '6.5 ft',
    maxTow: 11450, maxTongue: 1145, payload: 1805, gcwr: 18100,
    curbWeight: 5195, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Toyota', model: 'Tundra', trim: 'SR5',
    engine: '3.5L Twin-Turbo V6', cab: 'CrewMax', bed: '5.5 ft',
    maxTow: 10890, maxTongue: 1089, payload: 1735, gcwr: 17600,
    curbWeight: 5265, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Toyota', model: 'Tundra', trim: 'Limited',
    engine: '3.5L Twin-Turbo V6', cab: 'CrewMax', bed: '5.5 ft',
    maxTow: 10890, maxTongue: 1089, payload: 1625, gcwr: 17500,
    curbWeight: 5375, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Toyota', model: 'Tundra', trim: 'Limited',
    engine: 'i-FORCE MAX Hybrid', cab: 'CrewMax', bed: '5.5 ft',
    maxTow: 11170, maxTongue: 1117, payload: 1530, gcwr: 17800,
    curbWeight: 5570, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Toyota', model: 'Tundra', trim: 'TRD Pro',
    engine: 'i-FORCE MAX Hybrid', cab: 'CrewMax', bed: '5.5 ft',
    maxTow: 10890, maxTongue: 1089, payload: 1395, gcwr: 17500,
    curbWeight: 5705, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2023, make: 'Toyota', model: 'Tundra', trim: 'SR5',
    engine: '3.5L Twin-Turbo V6', cab: 'CrewMax', bed: '5.5 ft',
    maxTow: 10890, maxTongue: 1089, payload: 1730, gcwr: 17600,
    curbWeight: 5270, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2022, make: 'Toyota', model: 'Tundra', trim: 'SR5',
    engine: '3.5L Twin-Turbo V6', cab: 'CrewMax', bed: '5.5 ft',
    maxTow: 12000, maxTongue: 1200, payload: 1810, gcwr: 18300,
    curbWeight: 5210, wheelbase: 145, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },

  // ─── Ford F-250 (2023-2024) ─────────────────────────────────────
  {
    year: 2024, make: 'Ford', model: 'F-250', trim: 'XLT',
    engine: '7.3L V8', cab: 'Crew Cab', bed: '6.75 ft',
    maxTow: 15000, maxTongue: 1875, payload: 3570, gcwr: 23000,
    curbWeight: 6587, wheelbase: 160, hitchClass: 'IV' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'F-250', trim: 'XLT',
    engine: '6.7L PowerStroke Diesel', cab: 'Crew Cab', bed: '6.75 ft',
    maxTow: 18500, maxTongue: 2312, payload: 3100, gcwr: 27200,
    curbWeight: 7170, wheelbase: 160, hitchClass: 'IV' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'F-250', trim: 'Lariat',
    engine: '7.3L V8', cab: 'Crew Cab', bed: '6.75 ft',
    maxTow: 15000, maxTongue: 1875, payload: 3340, gcwr: 23000,
    curbWeight: 6810, wheelbase: 160, hitchClass: 'IV' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'F-250', trim: 'Lariat',
    engine: '6.7L PowerStroke Diesel', cab: 'Crew Cab', bed: '6.75 ft',
    maxTow: 20000, maxTongue: 2500, payload: 2870, gcwr: 29200,
    curbWeight: 7380, wheelbase: 160, hitchClass: 'V' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2023, make: 'Ford', model: 'F-250', trim: 'Lariat',
    engine: '6.7L PowerStroke Diesel', cab: 'Crew Cab', bed: '6.75 ft',
    maxTow: 19800, maxTongue: 2475, payload: 2850, gcwr: 29000,
    curbWeight: 7360, wheelbase: 160, hitchClass: 'V' as HitchClass, hasTowPackage: true,
  },

  // ─── Ram 2500 (2023-2024) ───────────────────────────────────────
  {
    year: 2024, make: 'Ram', model: '2500', trim: 'Big Horn',
    engine: '6.4L HEMI V8', cab: 'Crew Cab', bed: '6\'4"',
    maxTow: 14490, maxTongue: 1811, payload: 3080, gcwr: 22500,
    curbWeight: 6465, wheelbase: 149, hitchClass: 'IV' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ram', model: '2500', trim: 'Big Horn',
    engine: '6.7L Cummins Diesel', cab: 'Crew Cab', bed: '6\'4"',
    maxTow: 17540, maxTongue: 2192, payload: 2670, gcwr: 26500,
    curbWeight: 7030, wheelbase: 149, hitchClass: 'IV' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ram', model: '2500', trim: 'Laramie',
    engine: '6.4L HEMI V8', cab: 'Crew Cab', bed: '6\'4"',
    maxTow: 14200, maxTongue: 1775, payload: 2870, gcwr: 22200,
    curbWeight: 6680, wheelbase: 149, hitchClass: 'IV' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ram', model: '2500', trim: 'Laramie',
    engine: '6.7L Cummins Diesel', cab: 'Crew Cab', bed: '6\'4"',
    maxTow: 20000, maxTongue: 2500, payload: 2480, gcwr: 29200,
    curbWeight: 7220, wheelbase: 149, hitchClass: 'V' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2023, make: 'Ram', model: '2500', trim: 'Laramie',
    engine: '6.7L Cummins Diesel', cab: 'Crew Cab', bed: '6\'4"',
    maxTow: 19680, maxTongue: 2460, payload: 2450, gcwr: 28900,
    curbWeight: 7200, wheelbase: 149, hitchClass: 'V' as HitchClass, hasTowPackage: true,
  },

  // ─── Chevy Silverado 2500HD (2023-2024) ─────────────────────────
  {
    year: 2024, make: 'Chevrolet', model: 'Silverado 2500HD', trim: 'LT',
    engine: '6.6L V8', cab: 'Crew Cab', bed: 'Standard',
    maxTow: 14500, maxTongue: 1812, payload: 3720, gcwr: 23500,
    curbWeight: 6332, wheelbase: 159, hitchClass: 'IV' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Chevrolet', model: 'Silverado 2500HD', trim: 'LT',
    engine: '6.6L Duramax Diesel', cab: 'Crew Cab', bed: 'Standard',
    maxTow: 18500, maxTongue: 2312, payload: 3160, gcwr: 28300,
    curbWeight: 6940, wheelbase: 159, hitchClass: 'IV' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Chevrolet', model: 'Silverado 2500HD', trim: 'LTZ',
    engine: '6.6L Duramax Diesel', cab: 'Crew Cab', bed: 'Standard',
    maxTow: 18100, maxTongue: 2262, payload: 2940, gcwr: 28000,
    curbWeight: 7160, wheelbase: 159, hitchClass: 'V' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2023, make: 'Chevrolet', model: 'Silverado 2500HD', trim: 'LT',
    engine: '6.6L Duramax Diesel', cab: 'Crew Cab', bed: 'Standard',
    maxTow: 18400, maxTongue: 2300, payload: 3140, gcwr: 28200,
    curbWeight: 6920, wheelbase: 159, hitchClass: 'IV' as HitchClass, hasTowPackage: true,
  },

  // ─── Toyota Tacoma (2024) ───────────────────────────────────────
  {
    year: 2024, make: 'Toyota', model: 'Tacoma', trim: 'SR5',
    engine: '2.4L Turbo', cab: 'Double Cab', bed: '5 ft',
    maxTow: 6500, maxTongue: 650, payload: 1355, gcwr: 11230,
    curbWeight: 4480, wheelbase: 132, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Toyota', model: 'Tacoma', trim: 'TRD Sport',
    engine: '2.4L Turbo', cab: 'Double Cab', bed: '5 ft',
    maxTow: 6500, maxTongue: 650, payload: 1280, gcwr: 11230,
    curbWeight: 4555, wheelbase: 132, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },

  // ─── Jeep Gladiator (2024) ──────────────────────────────────────
  {
    year: 2024, make: 'Jeep', model: 'Gladiator', trim: 'Sport',
    engine: '3.6L V6', cab: 'Crew Cab', bed: '5 ft',
    maxTow: 7650, maxTongue: 765, payload: 1235, gcwr: 12350,
    curbWeight: 4650, wheelbase: 137, hitchClass: 'III' as HitchClass, hasTowPackage: false,
  },
  {
    year: 2024, make: 'Jeep', model: 'Gladiator', trim: 'Rubicon',
    engine: '3.6L V6', cab: 'Crew Cab', bed: '5 ft',
    maxTow: 7700, maxTongue: 770, payload: 1105, gcwr: 12500,
    curbWeight: 4850, wheelbase: 137, hitchClass: 'III' as HitchClass, hasTowPackage: false,
  },

  // ─── Ford Expedition (2024) ─────────────────────────────────────
  {
    year: 2024, make: 'Ford', model: 'Expedition', trim: 'XLT',
    engine: '3.5L EcoBoost V6', cab: 'SUV', bed: 'N/A',
    maxTow: 9300, maxTongue: 930, payload: 1480, gcwr: 15500,
    curbWeight: 5605, wheelbase: 122, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Ford', model: 'Expedition', trim: 'Limited',
    engine: '3.5L EcoBoost V6', cab: 'SUV', bed: 'N/A',
    maxTow: 9300, maxTongue: 930, payload: 1350, gcwr: 15500,
    curbWeight: 5750, wheelbase: 122, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },

  // ─── Chevy Tahoe (2024) ─────────────────────────────────────────
  {
    year: 2024, make: 'Chevrolet', model: 'Tahoe', trim: 'LT',
    engine: '5.3L V8', cab: 'SUV', bed: 'N/A',
    maxTow: 8400, maxTongue: 840, payload: 1558, gcwr: 15000,
    curbWeight: 5607, wheelbase: 120, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },
  {
    year: 2024, make: 'Chevrolet', model: 'Tahoe', trim: 'Z71',
    engine: '5.3L V8', cab: 'SUV', bed: 'N/A',
    maxTow: 8200, maxTongue: 820, payload: 1470, gcwr: 14800,
    curbWeight: 5695, wheelbase: 120, hitchClass: 'III' as HitchClass, hasTowPackage: true,
  },

  // ─── Toyota 4Runner (2024) ──────────────────────────────────────
  {
    year: 2024, make: 'Toyota', model: '4Runner', trim: 'SR5',
    engine: '2.4L Turbo', cab: 'SUV', bed: 'N/A',
    maxTow: 6000, maxTongue: 600, payload: 1435, gcwr: 12500,
    curbWeight: 4540, wheelbase: 110, hitchClass: 'III' as HitchClass, hasTowPackage: false,
  },
  {
    year: 2024, make: 'Toyota', model: '4Runner', trim: 'TRD Off-Road',
    engine: '2.4L Turbo', cab: 'SUV', bed: 'N/A',
    maxTow: 5000, maxTongue: 500, payload: 1340, gcwr: 12000,
    curbWeight: 4635, wheelbase: 110, hitchClass: 'III' as HitchClass, hasTowPackage: false,
  },
];

// ─── YMMT Cascading Lookup Functions ────────────────────────────────

/** Returns sorted unique model years available in the database */
/** Returns all makes across all years */
export function getAvailableMakes(): string[] {
  const makes = new Set(TOW_VEHICLE_DATABASE.map((v) => v.make));
  return [...makes].sort();
}

/** Returns models available for a given make (across all years) */
export function getAvailableModels(make: string): string[] {
  const models = new Set(
    TOW_VEHICLE_DATABASE
      .filter((v) => v.make === make)
      .map((v) => v.model),
  );
  return [...models].sort();
}

/** Returns trims available for a given make and model (across all years) */
export function getAvailableTrims(make: string, model: string): string[] {
  const trims = new Set(
    TOW_VEHICLE_DATABASE
      .filter((v) => v.make === make && v.model === model)
      .map((v) => v.trim),
  );
  return [...trims].sort();
}

/** Returns trim summary with tow capacity range for a given make, model (uses latest year data) */
export function getTrimSummaries(make: string, model: string): { trim: string; maxTow: number; engineCount: number }[] {
  // Use latest year entries for each trim
  const trimMap = new Map<string, { maxTow: number; engines: Set<string> }>();
  const latestYear = Math.max(
    ...TOW_VEHICLE_DATABASE.filter((v) => v.make === make && v.model === model).map((v) => v.year),
  );
  for (const v of TOW_VEHICLE_DATABASE) {
    if (v.make !== make || v.model !== model || v.year !== latestYear) continue;
    const entry = trimMap.get(v.trim);
    if (entry) {
      if (v.maxTow > entry.maxTow) entry.maxTow = v.maxTow;
      entry.engines.add(v.engine);
    } else {
      trimMap.set(v.trim, { maxTow: v.maxTow, engines: new Set([v.engine]) });
    }
  }
  return [...trimMap.entries()]
    .map(([trim, data]) => ({ trim, maxTow: data.maxTow, engineCount: data.engines.size }))
    .sort((a, b) => a.maxTow - b.maxTow);
}

/** Returns engines available for a given make, model, and trim (across all years) */
export function getAvailableEngines(
  make: string, model: string, trim: string,
): string[] {
  const engines = new Set(
    TOW_VEHICLE_DATABASE
      .filter((v) => v.make === make && v.model === model && v.trim === trim)
      .map((v) => v.engine),
  );
  return [...engines].sort();
}

/** Returns engine summaries with max tow for a given make, model, trim (uses latest year data) */
export function getEngineSummaries(
  make: string, model: string, trim: string,
): { engine: string; maxTow: number }[] {
  const latestYear = Math.max(
    ...TOW_VEHICLE_DATABASE.filter((v) => v.make === make && v.model === model && v.trim === trim).map((v) => v.year),
  );
  const map = new Map<string, number>();
  for (const v of TOW_VEHICLE_DATABASE) {
    if (v.make !== make || v.model !== model || v.trim !== trim || v.year !== latestYear) continue;
    const cur = map.get(v.engine) ?? 0;
    if (v.maxTow > cur) map.set(v.engine, v.maxTow);
  }
  return [...map.entries()]
    .map(([engine, maxTow]) => ({ engine, maxTow }))
    .sort((a, b) => b.maxTow - a.maxTow);
}

/** Returns cab options available for a given make, model, trim, and engine (across all years) */
export function getAvailableCabs(
  make: string, model: string, trim: string, engine: string,
): string[] {
  const cabs = new Set(
    TOW_VEHICLE_DATABASE
      .filter(
        (v) => v.make === make && v.model === model
          && v.trim === trim && v.engine === engine,
      )
      .map((v) => v.cab),
  );
  return [...cabs].sort();
}

/** Returns bed options available for a given make, model, trim, engine, and cab (across all years) */
export function getAvailableBeds(
  make: string, model: string, trim: string,
  engine: string, cab: string,
): string[] {
  const beds = new Set(
    TOW_VEHICLE_DATABASE
      .filter(
        (v) => v.make === make && v.model === model
          && v.trim === trim && v.engine === engine && v.cab === cab,
      )
      .map((v) => v.bed),
  );
  return [...beds].sort();
}

/** Returns vehicle match for selection, preferring latest year. Returns null if not found */
export function getVehicle(
  make: string, model: string, trim: string,
  engine: string, cab: string, bed: string,
): TowVehicle | null {
  const matches = TOW_VEHICLE_DATABASE.filter(
    (v) => v.make === make && v.model === model
      && v.trim === trim && v.engine === engine && v.cab === cab && v.bed === bed,
  );
  if (matches.length === 0) return null;
  // Return latest year
  return matches.sort((a, b) => b.year - a.year)[0];
}

// ─── Utility lookups ────────────────────────────────────────────────

/** Returns all vehicle configurations matching a make/model combo */
export function findVehiclesByMakeModel(make: string, model: string): TowVehicle[] {
  return TOW_VEHICLE_DATABASE.filter(
    (v) => v.make === make && v.model === model,
  );
}
