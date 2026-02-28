import type {
  StateTaxFees,
  SalesTaxInput,
  SalesTaxResult,
  DmvFeeInput,
  DmvFeeResult,
} from './stateTaxTypes.ts';

// ─── Helpers ───────────────────────────────────────────────────────

/** Round to nearest cent. */
function cents(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Compute effective tax rate (4 decimal places). */
function effectiveRate(tax: number, taxable: number): number {
  return taxable > 0 ? cents(tax / taxable * 10000) / 10000 : 0;
}

/** Build a zero-tax result (used by no-tax states and exemptions). */
function zeroTaxResult(taxableAmount: number, notes: string[]): SalesTaxResult {
  return { stateTax: 0, localTax: 0, totalTax: 0, taxableAmount, effectiveRate: 0, notes };
}

/** Build a result where state tax is the only component (no local). */
function stateOnlyResult(
  totalTax: number,
  taxableAmount: number,
  rate: number | null,
  notes: string[],
): SalesTaxResult {
  return {
    stateTax: totalTax,
    localTax: 0,
    totalTax,
    taxableAmount,
    effectiveRate: rate ?? effectiveRate(totalTax, taxableAmount),
    notes,
  };
}

// ─── Trade-in credit ───────────────────────────────────────────────

function computeTaxableAmount(state: StateTaxFees, input: SalesTaxInput, notes: string[]): number {
  if (state.tradeInCredit && input.tradeInValue > 0) {
    let credit = input.tradeInValue;
    if (state.tradeInCreditCap != null) {
      credit = Math.min(credit, state.tradeInCreditCap);
      if (input.tradeInValue > state.tradeInCreditCap) {
        notes.push(`Trade-in credit capped at $${state.tradeInCreditCap.toLocaleString()}`);
      }
    }
    return Math.max(0, input.listingPrice - credit);
  }

  if (!state.tradeInCredit && input.tradeInValue > 0) {
    notes.push(state.tradeInCreditNote ?? `${state.stateName} does not allow trade-in credit`);
  }
  return input.listingPrice;
}

// ─── RV-specific tax handlers ──────────────────────────────────────

function handleMdAgeExempt(
  state: StateTaxFees,
  input: SalesTaxInput,
  taxableAmount: number,
  notes: string[],
): SalesTaxResult {
  if (input.rvAge != null && input.rvAge > 7) {
    notes.push('No tax on RVs over 7 years old in Maryland');
    return zeroTaxResult(taxableAmount, notes);
  }
  return computeDefaultTax(state, taxableAmount, notes);
}

function handleCtTiered(
  input: SalesTaxInput,
  taxableAmount: number,
  notes: string[],
): SalesTaxResult {
  const price = input.rvValue ?? input.listingPrice;
  const rate = price > 50_000 ? 0.0775 : 0.0635;
  const totalTax = cents(taxableAmount * rate);
  notes.push(
    price > 50_000
      ? 'Connecticut luxury tax rate of 7.75% applies to vehicles over $50,000'
      : 'Connecticut standard rate of 6.35%',
  );
  return stateOnlyResult(totalTax, taxableAmount, rate, notes);
}

function handleGaTavt(taxableAmount: number, notes: string[]): SalesTaxResult {
  const totalTax = cents(taxableAmount * 0.066);
  notes.push('Georgia TAVT (Title Ad Valorem Tax) of 6.6% replaces sales tax');
  return stateOnlyResult(totalTax, taxableAmount, 0.066, notes);
}

function handleOkExcise(taxableAmount: number, notes: string[]): SalesTaxResult {
  const totalTax = cents(20 + taxableAmount * 0.0325);
  notes.push('Oklahoma excise tax: $20 + 3.25% of purchase price');
  return stateOnlyResult(totalTax, taxableAmount, null, notes);
}

function handleFlSurtax(
  state: StateTaxFees,
  taxableAmount: number,
  notes: string[],
): SalesTaxResult {
  const stateTax = cents(taxableAmount * state.stateSalesTaxRate);
  const surtaxableAmount = Math.min(taxableAmount, 5000);
  const localTax = cents(surtaxableAmount * state.avgLocalTaxRate);
  const totalTax = cents(stateTax + localTax);
  notes.push('Florida county surtax applies only to the first $5,000 of the purchase price');
  return {
    stateTax,
    localTax,
    totalTax,
    taxableAmount,
    effectiveRate: effectiveRate(totalTax, taxableAmount),
    notes,
  };
}

// ─── Default tax computation ───────────────────────────────────────

function computeDefaultTax(
  state: StateTaxFees,
  taxableAmount: number,
  notes: string[],
): SalesTaxResult {
  const stateTax = cents(taxableAmount * state.stateSalesTaxRate);
  const localTax = cents(taxableAmount * state.avgLocalTaxRate);
  const totalTax = cents(stateTax + localTax);
  return {
    stateTax,
    localTax,
    totalTax,
    taxableAmount,
    effectiveRate: effectiveRate(totalTax, taxableAmount),
    notes,
  };
}

// ─── Sales tax calculation ─────────────────────────────────────────

export function calculateSalesTax(
  state: StateTaxFees,
  input: SalesTaxInput,
): SalesTaxResult {
  const notes: string[] = [];
  const taxableAmount = computeTaxableAmount(state, input, notes);

  // No-tax states
  if (state.noTaxState) {
    if (state.noTaxNote) notes.push(state.noTaxNote);
    return zeroTaxResult(taxableAmount, notes);
  }

  // Tax-capped states (SC, NC)
  if (state.taxCap != null) {
    const rate = state.taxCapRate ?? (state.stateSalesTaxRate + state.avgLocalTaxRate);
    const rawTax = cents(taxableAmount * rate);
    const cappedTax = Math.min(rawTax, state.taxCap);
    if (rawTax > state.taxCap) {
      notes.push(state.taxCapNote ?? `Tax capped at $${state.taxCap.toLocaleString()}`);
    }
    return stateOnlyResult(cappedTax, taxableAmount, null, notes);
  }

  // RV-specific overrides
  if (state.rvSpecificNote) {
    switch (state.rvSpecificNote) {
      case 'MD_AGE_EXEMPT': return handleMdAgeExempt(state, input, taxableAmount, notes);
      case 'CT_TIERED':     return handleCtTiered(input, taxableAmount, notes);
      case 'GA_TAVT':       return handleGaTavt(taxableAmount, notes);
      case 'OK_EXCISE':     return handleOkExcise(taxableAmount, notes);
      case 'FL_SURTAX':     return handleFlSurtax(state, taxableAmount, notes);
      default:              break;
    }
  }

  // Default: state + local tax
  return computeDefaultTax(state, taxableAmount, notes);
}

// ─── Registration fee calculation ──────────────────────────────────

export function calculateRegistrationFee(
  state: StateTaxFees,
  gvwr?: number,
  listingPrice?: number,
): number {
  switch (state.registrationModel) {
    case 'flat':
      return state.registrationFeeFlat ?? 0;

    case 'weight': {
      if (gvwr == null || state.registrationWeightTable == null) return 0;
      const tier = state.registrationWeightTable.find(
        (t) => gvwr >= t.minWeight && gvwr <= t.maxWeight,
      );
      return tier?.fee ?? 0;
    }

    case 'value':
      if (listingPrice == null || state.registrationValueRate == null) return 0;
      return cents(listingPrice * state.registrationValueRate);

    case 'complex':
      return state.registrationFeeFlat ?? 0;

    default:
      return 0;
  }
}

// ─── DMV fees calculation ──────────────────────────────────────────

export function calculateDmvFees(
  state: StateTaxFees,
  input: DmvFeeInput,
): DmvFeeResult {
  const notes: string[] = [];
  const registrationFee = calculateRegistrationFee(state, input.gvwr, input.listingPrice);

  if (state.registrationModel === 'weight' && input.gvwr == null) {
    notes.push('GVWR not provided; weight-based registration fee could not be calculated');
  }
  if (state.registrationModel === 'complex' && state.registrationNote) {
    notes.push(state.registrationNote);
  }

  const emissionsInspectionFee = state.emissionsInspectionFee ?? 0;
  const otherFeesTotal = state.otherFees.reduce((sum, f) => sum + f.amount, 0);

  const totalDmvFees =
    state.titleFee + registrationFee + state.plateFee + emissionsInspectionFee + otherFeesTotal;

  return {
    titleFee: state.titleFee,
    registrationFee,
    plateFee: state.plateFee,
    emissionsInspectionFee,
    otherFees: state.otherFees,
    totalDmvFees,
    notes,
  };
}
