// ─── Registration model ────────────────────────────────────────────

export type RegistrationModel = 'flat' | 'weight' | 'value' | 'complex';

// ─── Weight tier (for weight-based registration) ───────────────────

export interface WeightTier {
  minWeight: number;      // GVWR in lbs
  maxWeight: number;      // GVWR in lbs (Infinity for last tier)
  fee: number;            // Fee in dollars
}

// ─── Fee item (generic named fee) ──────────────────────────────────

export interface FeeItem {
  name: string;           // e.g. "Emissions inspection"
  amount: number;
  note?: string;
}

// ─── State tax & fee data ──────────────────────────────────────────

export interface StateTaxFees {
  stateCode: string;              // "WA"
  stateName: string;              // "Washington"
  stateSalesTaxRate: number;      // 0.065
  avgLocalTaxRate: number;        // 0.024
  maxCombinedRate: number;        // 0.104
  taxCap: number | null;          // null or 300 (SC) or 2000 (NC)
  taxCapNote: string | null;
  taxCapRate: number | null;      // null or 0.03 (NC uses special rate)
  rvSpecificRate: number | null;
  rvSpecificNote: string | null;
  noTaxState: boolean;
  noTaxNote: string | null;       // Explanation for no-tax states
  tradeInCredit: boolean;
  tradeInCreditNote: string | null;
  tradeInCreditCap: number | null; // MI caps at $11,000
  titleFee: number;
  titleNote: string | null;
  registrationModel: RegistrationModel;
  registrationFeeFlat: number | null;
  registrationWeightTable: WeightTier[] | null;
  registrationValueRate: number | null;
  registrationNote: string | null;
  plateFee: number;
  emissionsInspectionFee: number | null;
  otherFees: FeeItem[];
  docFeeCap: number | null;
  docFeeCapNote: string | null;
  buyerTips: string[];
}

// ─── Sales tax input/output ────────────────────────────────────────

export interface SalesTaxInput {
  listingPrice: number;
  tradeInValue: number;
  rvAge?: number;         // Years old, for MD exemption
  rvValue?: number;       // For CT tiered rates
}

export interface SalesTaxResult {
  stateTax: number;
  localTax: number;
  totalTax: number;
  taxableAmount: number;
  effectiveRate: number;
  notes: string[];        // Explanatory notes (caps applied, exemptions, etc.)
}

// ─── DMV fee input/output ──────────────────────────────────────────

export interface DmvFeeInput {
  listingPrice: number;
  gvwr?: number;          // For weight-based registration
}

export interface DmvFeeResult {
  titleFee: number;
  registrationFee: number;
  plateFee: number;
  emissionsInspectionFee: number;
  otherFees: FeeItem[];
  totalDmvFees: number;
  notes: string[];
}
