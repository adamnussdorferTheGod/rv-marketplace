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

// ─── Sales tax calculation ─────────────────────────────────────────

export function calculateSalesTax(
  state: StateTaxFees,
  input: SalesTaxInput,
): SalesTaxResult {
  const notes: string[] = [];

  // ── 1. Determine taxable amount (trade-in credit) ──────────────
  let taxableAmount: number;

  if (state.tradeInCredit && input.tradeInValue > 0) {
    let credit = input.tradeInValue;
    if (state.tradeInCreditCap != null) {
      credit = Math.min(credit, state.tradeInCreditCap);
      if (input.tradeInValue > state.tradeInCreditCap) {
        notes.push(
          `Trade-in credit capped at $${state.tradeInCreditCap.toLocaleString()}`,
        );
      }
    }
    taxableAmount = Math.max(0, input.listingPrice - credit);
  } else {
    taxableAmount = input.listingPrice;
    if (!state.tradeInCredit && input.tradeInValue > 0) {
      notes.push(
        state.tradeInCreditNote ?? `${state.stateName} does not allow trade-in credit`,
      );
    }
  }

  // ── 2. No-tax states ───────────────────────────────────────────
  if (state.noTaxState) {
    if (state.noTaxNote) {
      notes.push(state.noTaxNote);
    }
    return {
      stateTax: 0,
      localTax: 0,
      totalTax: 0,
      taxableAmount,
      effectiveRate: 0,
      notes,
    };
  }

  // ── 3. Tax-capped states (SC, NC) ─────────────────────────────
  if (state.taxCap != null) {
    const rate = state.taxCapRate ?? (state.stateSalesTaxRate + state.avgLocalTaxRate);
    const rawTax = cents(taxableAmount * rate);
    const cappedTax = Math.min(rawTax, state.taxCap);

    if (rawTax > state.taxCap) {
      notes.push(state.taxCapNote ?? `Tax capped at $${state.taxCap.toLocaleString()}`);
    }

    return {
      stateTax: cappedTax,
      localTax: 0,
      totalTax: cappedTax,
      taxableAmount,
      effectiveRate: taxableAmount > 0 ? cents(cappedTax / taxableAmount * 10000) / 10000 : 0,
      notes,
    };
  }

  // ── 4. RV-specific overrides ───────────────────────────────────
  if (state.rvSpecificNote) {
    switch (state.rvSpecificNote) {
      // Maryland: no tax on RVs over 7 years old
      case 'MD_AGE_EXEMPT': {
        if (input.rvAge != null && input.rvAge > 7) {
          notes.push('No tax on RVs over 7 years old in Maryland');
          return {
            stateTax: 0,
            localTax: 0,
            totalTax: 0,
            taxableAmount,
            effectiveRate: 0,
            notes,
          };
        }
        // rvAge <= 7 or not provided: fall through to normal tax
        const stateTax = cents(taxableAmount * state.stateSalesTaxRate);
        const localTax = cents(taxableAmount * state.avgLocalTaxRate);
        const totalTax = cents(stateTax + localTax);
        return {
          stateTax,
          localTax,
          totalTax,
          taxableAmount,
          effectiveRate: taxableAmount > 0 ? cents(totalTax / taxableAmount * 10000) / 10000 : 0,
          notes,
        };
      }

      // Connecticut: tiered rate -- 6.35% under $50K, 7.75% at $50K+
      case 'CT_TIERED': {
        const price = input.rvValue ?? input.listingPrice;
        const rate = price > 50_000 ? 0.0775 : 0.0635;
        const totalTax = cents(taxableAmount * rate);
        notes.push(
          price > 50_000
            ? 'Connecticut luxury tax rate of 7.75% applies to vehicles over $50,000'
            : 'Connecticut standard rate of 6.35%',
        );
        return {
          stateTax: totalTax,
          localTax: 0,
          totalTax,
          taxableAmount,
          effectiveRate: rate,
          notes,
        };
      }

      // Georgia: 6.6% Title Ad Valorem Tax (TAVT), replaces sales tax + local
      case 'GA_TAVT': {
        const totalTax = cents(taxableAmount * 0.066);
        notes.push('Georgia TAVT (Title Ad Valorem Tax) of 6.6% replaces sales tax');
        return {
          stateTax: totalTax,
          localTax: 0,
          totalTax,
          taxableAmount,
          effectiveRate: 0.066,
          notes,
        };
      }

      // Oklahoma: $20 + 3.25% excise tax, no local tax
      case 'OK_EXCISE': {
        const totalTax = cents(20 + taxableAmount * 0.0325);
        notes.push('Oklahoma excise tax: $20 + 3.25% of purchase price');
        return {
          stateTax: totalTax,
          localTax: 0,
          totalTax,
          taxableAmount,
          effectiveRate: taxableAmount > 0 ? cents(totalTax / taxableAmount * 10000) / 10000 : 0,
          notes,
        };
      }

      // Florida: county surtax applies only to first $5,000 of taxable amount
      case 'FL_SURTAX': {
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
          effectiveRate: taxableAmount > 0 ? cents(totalTax / taxableAmount * 10000) / 10000 : 0,
          notes,
        };
      }

      // Unknown RV-specific note: fall through to default
      default:
        break;
    }
  }

  // ── 5. Default: state + local tax ──────────────────────────────
  const stateTax = cents(taxableAmount * state.stateSalesTaxRate);
  const localTax = cents(taxableAmount * state.avgLocalTaxRate);
  const totalTax = cents(stateTax + localTax);

  return {
    stateTax,
    localTax,
    totalTax,
    taxableAmount,
    effectiveRate: taxableAmount > 0 ? cents(totalTax / taxableAmount * 10000) / 10000 : 0,
    notes,
  };
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
      if (gvwr == null || state.registrationWeightTable == null) {
        return 0;
      }
      const tier = state.registrationWeightTable.find(
        (t) => gvwr >= t.minWeight && gvwr <= t.maxWeight,
      );
      return tier?.fee ?? 0;
    }

    case 'value':
      if (listingPrice == null || state.registrationValueRate == null) {
        return 0;
      }
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
    state.titleFee +
    registrationFee +
    state.plateFee +
    emissionsInspectionFee +
    otherFeesTotal;

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
