import type {
  StateTaxFees,
  SalesTaxInput,
  SalesTaxResult,
  DmvFeeInput,
  DmvFeeResult,
} from './stateTaxTypes.ts';

// ─── Sales tax calculation ─────────────────────────────────────────

export function calculateSalesTax(
  _state: StateTaxFees,
  _input: SalesTaxInput,
): SalesTaxResult {
  throw new Error('not implemented');
}

// ─── Registration fee calculation ──────────────────────────────────

export function calculateRegistrationFee(
  _state: StateTaxFees,
  _gvwr?: number,
  _listingPrice?: number,
): number {
  throw new Error('not implemented');
}

// ─── DMV fees calculation ──────────────────────────────────────────

export function calculateDmvFees(
  _state: StateTaxFees,
  _input: DmvFeeInput,
): DmvFeeResult {
  throw new Error('not implemented');
}
