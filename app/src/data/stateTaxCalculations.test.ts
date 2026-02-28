import { describe, it, expect } from 'vitest';
import {
  calculateSalesTax,
  calculateRegistrationFee,
  calculateDmvFees,
} from './stateTaxCalculations.ts';
import type { StateTaxFees, SalesTaxInput, DmvFeeInput } from './stateTaxTypes.ts';

// ─── Test fixture factory ──────────────────────────────────────────

function makeState(overrides: Partial<StateTaxFees> = {}): StateTaxFees {
  return {
    stateCode: 'XX',
    stateName: 'Test State',
    stateSalesTaxRate: 0.05,
    avgLocalTaxRate: 0.02,
    maxCombinedRate: 0.07,
    taxCap: null,
    taxCapNote: null,
    taxCapRate: null,
    rvSpecificRate: null,
    rvSpecificNote: null,
    noTaxState: false,
    noTaxNote: null,
    tradeInCredit: true,
    tradeInCreditNote: null,
    tradeInCreditCap: null,
    titleFee: 15,
    titleNote: null,
    registrationModel: 'flat',
    registrationFeeFlat: 50,
    registrationWeightTable: null,
    registrationValueRate: null,
    registrationNote: null,
    plateFee: 5,
    emissionsInspectionFee: null,
    otherFees: [],
    docFeeCap: null,
    docFeeCapNote: null,
    buyerTips: [],
    ...overrides,
  };
}

// ─── Texas fixture ─────────────────────────────────────────────────

const TX = makeState({
  stateCode: 'TX',
  stateName: 'Texas',
  stateSalesTaxRate: 0.0625,
  avgLocalTaxRate: 0.02,
  maxCombinedRate: 0.0825,
  tradeInCredit: true,
});

// ─── South Carolina (tax cap $300) ─────────────────────────────────

const SC = makeState({
  stateCode: 'SC',
  stateName: 'South Carolina',
  stateSalesTaxRate: 0.06,
  avgLocalTaxRate: 0.0,
  maxCombinedRate: 0.09,
  taxCap: 300,
  taxCapNote: 'Sales tax capped at $300 for vehicles',
  taxCapRate: null,
  tradeInCredit: true,
});

// ─── North Carolina (tax cap $2000, special 3% rate) ───────────────

const NC = makeState({
  stateCode: 'NC',
  stateName: 'North Carolina',
  stateSalesTaxRate: 0.0475,
  avgLocalTaxRate: 0.0225,
  maxCombinedRate: 0.075,
  taxCap: 2000,
  taxCapNote: 'Highway use tax capped at $2,000',
  taxCapRate: 0.03,
  tradeInCredit: true,
});

// ─── No-tax states ─────────────────────────────────────────────────

const MT = makeState({
  stateCode: 'MT',
  stateName: 'Montana',
  stateSalesTaxRate: 0,
  avgLocalTaxRate: 0,
  maxCombinedRate: 0,
  noTaxState: true,
  noTaxNote: 'Montana has no sales tax',
  tradeInCredit: false,
});

const AK = makeState({
  stateCode: 'AK',
  stateName: 'Alaska',
  stateSalesTaxRate: 0,
  avgLocalTaxRate: 0.018,
  maxCombinedRate: 0.075,
  noTaxState: true,
  noTaxNote: 'Alaska has no state sales tax, but local tax may apply',
  tradeInCredit: false,
});

const DE = makeState({
  stateCode: 'DE',
  stateName: 'Delaware',
  stateSalesTaxRate: 0,
  avgLocalTaxRate: 0,
  maxCombinedRate: 0,
  noTaxState: true,
  noTaxNote: 'Delaware has no sales tax but charges a 4.25% document fee on vehicle purchases',
  tradeInCredit: false,
});

const NH = makeState({
  stateCode: 'NH',
  stateName: 'New Hampshire',
  stateSalesTaxRate: 0,
  avgLocalTaxRate: 0,
  maxCombinedRate: 0,
  noTaxState: true,
  noTaxNote: 'New Hampshire has no sales tax; permit fees may apply',
  tradeInCredit: false,
});

const OR = makeState({
  stateCode: 'OR',
  stateName: 'Oregon',
  stateSalesTaxRate: 0,
  avgLocalTaxRate: 0,
  maxCombinedRate: 0,
  noTaxState: true,
  noTaxNote: 'Oregon has no sales tax; 0.5% use tax applies to vehicles purchased out of state',
  tradeInCredit: false,
});

// ─── RV-specific states ────────────────────────────────────────────

const MD = makeState({
  stateCode: 'MD',
  stateName: 'Maryland',
  stateSalesTaxRate: 0.06,
  avgLocalTaxRate: 0,
  maxCombinedRate: 0.06,
  rvSpecificRate: 0.06,
  rvSpecificNote: 'MD_AGE_EXEMPT',
  tradeInCredit: true,
});

const CT = makeState({
  stateCode: 'CT',
  stateName: 'Connecticut',
  stateSalesTaxRate: 0.0635,
  avgLocalTaxRate: 0,
  maxCombinedRate: 0.0775,
  rvSpecificRate: 0.0635,
  rvSpecificNote: 'CT_TIERED',
  tradeInCredit: true,
});

const GA = makeState({
  stateCode: 'GA',
  stateName: 'Georgia',
  stateSalesTaxRate: 0.04,
  avgLocalTaxRate: 0.033,
  maxCombinedRate: 0.09,
  rvSpecificRate: 0.066,
  rvSpecificNote: 'GA_TAVT',
  tradeInCredit: true,
});

const OK = makeState({
  stateCode: 'OK',
  stateName: 'Oklahoma',
  stateSalesTaxRate: 0.045,
  avgLocalTaxRate: 0.045,
  maxCombinedRate: 0.115,
  rvSpecificRate: 0.0325,
  rvSpecificNote: 'OK_EXCISE',
  tradeInCredit: true,
});

const FL = makeState({
  stateCode: 'FL',
  stateName: 'Florida',
  stateSalesTaxRate: 0.06,
  avgLocalTaxRate: 0.01,
  maxCombinedRate: 0.085,
  rvSpecificRate: 0.06,
  rvSpecificNote: 'FL_SURTAX',
  tradeInCredit: true,
});

// ─── Trade-in states ───────────────────────────────────────────────

const CA = makeState({
  stateCode: 'CA',
  stateName: 'California',
  stateSalesTaxRate: 0.0725,
  avgLocalTaxRate: 0.015,
  maxCombinedRate: 0.1025,
  tradeInCredit: false,
  tradeInCreditNote: 'California does not allow trade-in credit',
});

const MI = makeState({
  stateCode: 'MI',
  stateName: 'Michigan',
  stateSalesTaxRate: 0.06,
  avgLocalTaxRate: 0,
  maxCombinedRate: 0.06,
  tradeInCredit: true,
  tradeInCreditCap: 11000,
  tradeInCreditNote: 'Trade-in credit capped at $11,000',
});

// ─── DMV fee fixture states ────────────────────────────────────────

const WEIGHT_STATE = makeState({
  stateCode: 'WS',
  stateName: 'Weight State',
  registrationModel: 'weight',
  registrationFeeFlat: null,
  registrationWeightTable: [
    { minWeight: 0, maxWeight: 5000, fee: 50 },
    { minWeight: 5001, maxWeight: 10000, fee: 100 },
    { minWeight: 10001, maxWeight: Infinity, fee: 200 },
  ],
  titleFee: 20,
  plateFee: 10,
  emissionsInspectionFee: 25,
  otherFees: [{ name: 'Tech surcharge', amount: 5 }],
});

const VALUE_STATE = makeState({
  stateCode: 'VS',
  stateName: 'Value State',
  registrationModel: 'value',
  registrationFeeFlat: null,
  registrationValueRate: 0.01,
  titleFee: 30,
  plateFee: 8,
  emissionsInspectionFee: null,
  otherFees: [],
});

const COMPLEX_STATE = makeState({
  stateCode: 'CS',
  stateName: 'Complex State',
  registrationModel: 'complex',
  registrationFeeFlat: 75,
  registrationNote: 'Base fee; actual fee varies by county, age, and weight',
  titleFee: 25,
  plateFee: 12,
  emissionsInspectionFee: 30,
  otherFees: [
    { name: 'Highway fund', amount: 10 },
    { name: 'Safety inspection', amount: 15 },
  ],
});

// ====================================================================
// calculateSalesTax
// ====================================================================

describe('calculateSalesTax', () => {
  // ── Standard state ─────────────────────────────────────────────

  it('calculates correct state + local tax for TX at $100K', () => {
    const result = calculateSalesTax(TX, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.stateTax).toBe(6250);
    expect(result.localTax).toBe(2000);
    expect(result.totalTax).toBe(8250);
    expect(result.taxableAmount).toBe(100_000);
  });

  // ── Tax cap states ─────────────────────────────────────────────

  it('caps SC tax at $300 for $100K RV', () => {
    const result = calculateSalesTax(SC, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(300);
  });

  it('caps NC tax at $2,000 using 3% rate for $100K RV', () => {
    const result = calculateSalesTax(NC, { listingPrice: 100_000, tradeInValue: 0 });
    // 3% of $100K = $3,000, capped at $2,000
    expect(result.totalTax).toBe(2000);
  });

  // ── No-tax states ──────────────────────────────────────────────

  it('returns $0 tax for Montana with appropriate note', () => {
    const result = calculateSalesTax(MT, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(0);
    expect(result.notes.some((n) => n.includes('Montana has no sales tax'))).toBe(true);
  });

  it('returns $0 tax for Alaska with local tax note', () => {
    const result = calculateSalesTax(AK, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(0);
    expect(result.notes.some((n) => n.includes('local tax may apply'))).toBe(true);
  });

  it('returns $0 tax for Delaware with document fee note', () => {
    const result = calculateSalesTax(DE, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(0);
    expect(result.notes.some((n) => n.includes('4.25% document fee'))).toBe(true);
  });

  it('returns $0 tax for New Hampshire with permit fees note', () => {
    const result = calculateSalesTax(NH, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(0);
    expect(result.notes.some((n) => n.includes('permit fees'))).toBe(true);
  });

  it('returns $0 tax for Oregon with use tax note', () => {
    const result = calculateSalesTax(OR, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(0);
    expect(result.notes.some((n) => n.includes('0.5% use tax'))).toBe(true);
  });

  // ── RV-specific: Maryland age exemption ────────────────────────

  it('MD: no tax on RV over 7 years old (rvAge=8)', () => {
    const result = calculateSalesTax(MD, { listingPrice: 100_000, tradeInValue: 0, rvAge: 8 });
    expect(result.totalTax).toBe(0);
    expect(result.notes.some((n) => n.includes('over 7 years old'))).toBe(true);
  });

  it('MD: normal tax on RV 7 years old or newer (rvAge=5)', () => {
    const result = calculateSalesTax(MD, { listingPrice: 100_000, tradeInValue: 0, rvAge: 5 });
    expect(result.totalTax).toBeGreaterThan(0);
  });

  // ── RV-specific: Connecticut tiered rates ──────────────────────

  it('CT: 6.35% rate for $40K RV', () => {
    const result = calculateSalesTax(CT, { listingPrice: 40_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(2540); // 40000 * 0.0635
    expect(result.effectiveRate).toBeCloseTo(0.0635, 4);
  });

  it('CT: 7.75% rate for $60K RV', () => {
    const result = calculateSalesTax(CT, { listingPrice: 60_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(4650); // 60000 * 0.0775
    expect(result.effectiveRate).toBeCloseTo(0.0775, 4);
  });

  // ── RV-specific: Georgia TAVT ──────────────────────────────────

  it('GA: 6.6% TAVT flat rate, no local tax for $100K RV', () => {
    const result = calculateSalesTax(GA, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(6600);
    expect(result.localTax).toBe(0);
  });

  // ── RV-specific: Oklahoma excise tax ───────────────────────────

  it('OK: $20 + 3.25% excise for $100K RV', () => {
    const result = calculateSalesTax(OK, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(3270); // $20 + 100000 * 0.0325
    expect(result.localTax).toBe(0);
  });

  // ── RV-specific: Florida county surtax ─────────────────────────

  it('FL: county surtax applies only to first $5K of taxable amount', () => {
    const result = calculateSalesTax(FL, { listingPrice: 100_000, tradeInValue: 0 });
    // State tax: 100000 * 0.06 = 6000
    // Local surtax: 5000 * 0.01 = 50
    // Total: 6050
    expect(result.stateTax).toBe(6000);
    expect(result.localTax).toBe(50);
    expect(result.totalTax).toBe(6050);
  });

  // ── Trade-in credit ────────────────────────────────────────────

  it('TX: trade-in reduces taxable amount', () => {
    const result = calculateSalesTax(TX, { listingPrice: 100_000, tradeInValue: 20_000 });
    expect(result.taxableAmount).toBe(80_000);
  });

  it('CA: no trade-in credit, full price taxed', () => {
    const result = calculateSalesTax(CA, { listingPrice: 100_000, tradeInValue: 20_000 });
    expect(result.taxableAmount).toBe(100_000);
  });

  it('MI: trade-in credit capped at $11K', () => {
    const result = calculateSalesTax(MI, { listingPrice: 100_000, tradeInValue: 15_000 });
    // Credit capped at $11,000, so taxableAmount = 100000 - 11000 = 89000
    expect(result.taxableAmount).toBe(89_000);
  });
});

// ====================================================================
// calculateRegistrationFee
// ====================================================================

describe('calculateRegistrationFee', () => {
  it('flat model: returns exact flat fee', () => {
    const state = makeState({ registrationModel: 'flat', registrationFeeFlat: 120 });
    expect(calculateRegistrationFee(state)).toBe(120);
  });

  it('weight model: 8000 GVWR returns correct tier fee', () => {
    expect(calculateRegistrationFee(WEIGHT_STATE, 8000)).toBe(100);
  });

  it('weight model: 3000 GVWR returns first tier fee', () => {
    expect(calculateRegistrationFee(WEIGHT_STATE, 3000)).toBe(50);
  });

  it('weight model: 15000 GVWR returns highest tier fee', () => {
    expect(calculateRegistrationFee(WEIGHT_STATE, 15000)).toBe(200);
  });

  it('value model: $100K returns price * rate', () => {
    expect(calculateRegistrationFee(VALUE_STATE, undefined, 100_000)).toBe(1000);
  });

  it('complex model: returns flat base', () => {
    expect(calculateRegistrationFee(COMPLEX_STATE)).toBe(75);
  });

  it('weight model with missing gvwr returns 0', () => {
    expect(calculateRegistrationFee(WEIGHT_STATE)).toBe(0);
  });
});

// ====================================================================
// calculateDmvFees
// ====================================================================

describe('calculateDmvFees', () => {
  it('sums all fee components for flat registration state', () => {
    const state = makeState({
      titleFee: 20,
      registrationModel: 'flat',
      registrationFeeFlat: 100,
      plateFee: 10,
      emissionsInspectionFee: 25,
      otherFees: [{ name: 'Tech fee', amount: 5 }],
    });
    const result = calculateDmvFees(state, { listingPrice: 50_000 });
    expect(result.titleFee).toBe(20);
    expect(result.registrationFee).toBe(100);
    expect(result.plateFee).toBe(10);
    expect(result.emissionsInspectionFee).toBe(25);
    expect(result.totalDmvFees).toBe(20 + 100 + 10 + 25 + 5);
  });

  it('sums all fee components for weight-based state', () => {
    const result = calculateDmvFees(WEIGHT_STATE, { listingPrice: 50_000, gvwr: 8000 });
    // title=20, reg=100 (8000 in 5001-10000 tier), plate=10, emissions=25, other=5
    expect(result.totalDmvFees).toBe(20 + 100 + 10 + 25 + 5);
  });

  it('sums all fee components for value-based state', () => {
    const result = calculateDmvFees(VALUE_STATE, { listingPrice: 100_000 });
    // title=30, reg=1000 (100000*0.01), plate=8, emissions=0, other=none
    expect(result.totalDmvFees).toBe(30 + 1000 + 8);
  });

  it('sums all fee components for complex state', () => {
    const result = calculateDmvFees(COMPLEX_STATE, { listingPrice: 50_000 });
    // title=25, reg=75 (flat base), plate=12, emissions=30, other=10+15
    expect(result.totalDmvFees).toBe(25 + 75 + 12 + 30 + 10 + 15);
  });

  it('handles missing gvwr with weight-based state', () => {
    const result = calculateDmvFees(WEIGHT_STATE, { listingPrice: 50_000 });
    // registration should be 0 since no gvwr
    expect(result.registrationFee).toBe(0);
    expect(result.notes.some((n) => n.includes('GVWR') || n.includes('weight'))).toBe(true);
  });
});
