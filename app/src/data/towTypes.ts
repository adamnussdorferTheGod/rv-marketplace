// ─── Hitch classes ──────────────────────────────────────────────────

export type HitchClass = 'I' | 'II' | 'III' | 'IV' | 'V';

// ─── Tow vehicle ────────────────────────────────────────────────────

export interface TowVehicle {
  year: number;           // Model year
  make: string;           // e.g. "Ford"
  model: string;          // e.g. "F-150"
  trim: string;           // e.g. "XLT"
  engine: string;         // e.g. "3.5L EcoBoost V6"
  cab: string;            // e.g. "SuperCrew"
  bed: string;            // e.g. "5.5 ft"
  maxTow: number;         // Max tow capacity in lbs
  maxTongue: number;      // Max tongue weight in lbs
  payload: number;        // Payload capacity in lbs
  gcwr: number;           // Gross Combined Weight Rating in lbs
  curbWeight: number;     // Vehicle curb weight in lbs
  wheelbase: number;      // Wheelbase in inches
  hitchClass: HitchClass;
  hasTowPackage: boolean;
}

// ─── Compatibility check types ──────────────────────────────────────

export type TowCheckStatus = 'green' | 'yellow' | 'red';

export interface TowCheckResult {
  status: TowCheckStatus;
  label: string;          // e.g. "Tow Weight"
  rvValue: number;        // The RV's spec value
  vehicleValue: number;   // The tow vehicle's rated value
  percentUsed: number;    // 0-100+
  note: string;           // Brief explanation
}

export type TowVerdict = 'good' | 'marginal' | 'not_recommended';

export interface TowCompatibilityResult {
  verdict: TowVerdict;
  checks: {
    towWeight: TowCheckResult;
    tongueWeight: TowCheckResult;
    payload: TowCheckResult;
    gcwr: TowCheckResult;
    hitchClass: TowCheckResult;
    wheelbaseRatio: TowCheckResult;
  };
  overallPercentUsed: number;   // Tow capacity % used
  recommendations: string[];    // Contextual recommendation strings
}

// ─── VIN decode ─────────────────────────────────────────────────────

export interface VINDecodeResult {
  vin: string;
  vehicle: TowVehicle | null;
  error: string | null;
}

// ─── YMMT selection levels ──────────────────────────────────────────

export type YMMTLevel = 'year' | 'make' | 'model' | 'trim' | 'engine' | 'cab' | 'bed';
