import { describe, it, expect } from 'vitest';
import {
  calculateSalesTax,
  calculateRegistrationFee,
  calculateDmvFees,
} from './stateTaxCalculations.ts';
import type { StateTaxFees, SalesTaxInput, DmvFeeInput } from './stateTaxTypes.ts';
import { STATE_TAX_DATABASE, getStateTaxFees, STATE_LIST } from './stateTaxDatabase.ts';

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

// ====================================================================
// Integration tests: real state data
// ====================================================================

describe('integration: real state data', () => {
  // ── Database completeness ───────────────────────────────────────

  it('contains all 51 entries (50 states + DC)', () => {
    expect(Object.keys(STATE_TAX_DATABASE).length).toBe(51);
  });

  it('every entry has a non-empty stateName and stateCode', () => {
    for (const entry of Object.values(STATE_TAX_DATABASE)) {
      expect(entry.stateName.length).toBeGreaterThan(0);
      expect(entry.stateCode.length).toBeGreaterThan(0);
    }
  });

  it('every stateCode is exactly 2 uppercase letters', () => {
    for (const entry of Object.values(STATE_TAX_DATABASE)) {
      expect(entry.stateCode).toMatch(/^[A-Z]{2}$/);
    }
  });

  it('every entry has stateSalesTaxRate >= 0', () => {
    for (const entry of Object.values(STATE_TAX_DATABASE)) {
      expect(entry.stateSalesTaxRate).toBeGreaterThanOrEqual(0);
    }
  });

  // ── Tax cap verification with real data ─────────────────────────

  it('SC real data: $100K RV -> totalTax capped at $300', () => {
    const sc = STATE_TAX_DATABASE['SC'];
    const result = calculateSalesTax(sc, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBeLessThanOrEqual(300);
    expect(result.totalTax).toBe(300);
  });

  it('NC real data: $100K RV -> totalTax capped at $2,000', () => {
    const nc = STATE_TAX_DATABASE['NC'];
    const result = calculateSalesTax(nc, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBeLessThanOrEqual(2000);
    expect(result.totalTax).toBe(2000);
  });

  it('NC real data: $50K RV -> totalTax = $1,500 (3% under cap)', () => {
    const nc = STATE_TAX_DATABASE['NC'];
    const result = calculateSalesTax(nc, { listingPrice: 50_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(1500);
  });

  // ── No-tax state verification with real data ────────────────────

  it.each(['AK', 'DE', 'MT', 'NH', 'OR'])('%s real data: $100K RV -> totalTax = $0', (code) => {
    const state = STATE_TAX_DATABASE[code];
    const result = calculateSalesTax(state, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(0);
  });

  it('AK notes mention local tax', () => {
    const ak = STATE_TAX_DATABASE['AK'];
    const result = calculateSalesTax(ak, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.notes.some((n) => n.toLowerCase().includes('local tax'))).toBe(true);
  });

  it('DE notes mention 4.25% or document fee', () => {
    const de = STATE_TAX_DATABASE['DE'];
    const result = calculateSalesTax(de, { listingPrice: 100_000, tradeInValue: 0 });
    expect(
      result.notes.some((n) => n.includes('4.25%') || n.toLowerCase().includes('doc')),
    ).toBe(true);
  });

  it('OR notes mention 0.5% or use tax', () => {
    const or = STATE_TAX_DATABASE['OR'];
    const result = calculateSalesTax(or, { listingPrice: 100_000, tradeInValue: 0 });
    expect(
      result.notes.some((n) => n.includes('0.5%') || n.toLowerCase().includes('use tax')),
    ).toBe(true);
  });

  // ── RV-specific verification with real data ─────────────────────

  it('MD real data: rvAge=8 -> totalTax = $0', () => {
    const md = STATE_TAX_DATABASE['MD'];
    const result = calculateSalesTax(md, { listingPrice: 100_000, tradeInValue: 0, rvAge: 8 });
    expect(result.totalTax).toBe(0);
  });

  it('MD real data: rvAge=5 -> totalTax > $0', () => {
    const md = STATE_TAX_DATABASE['MD'];
    const result = calculateSalesTax(md, { listingPrice: 100_000, tradeInValue: 0, rvAge: 5 });
    expect(result.totalTax).toBeGreaterThan(0);
  });

  it('CT real data: $40K RV -> effective rate ~6.35%', () => {
    const ct = STATE_TAX_DATABASE['CT'];
    const result = calculateSalesTax(ct, { listingPrice: 40_000, tradeInValue: 0 });
    expect(result.effectiveRate).toBeCloseTo(0.0635, 4);
  });

  it('CT real data: $60K RV -> effective rate ~7.75%', () => {
    const ct = STATE_TAX_DATABASE['CT'];
    const result = calculateSalesTax(ct, { listingPrice: 60_000, tradeInValue: 0 });
    expect(result.effectiveRate).toBeCloseTo(0.0775, 4);
  });

  it('GA real data: $100K RV -> totalTax = $6,600 (6.6% TAVT)', () => {
    const ga = STATE_TAX_DATABASE['GA'];
    const result = calculateSalesTax(ga, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(6600);
  });

  it('OK real data: $100K RV -> totalTax = $3,270 ($20 + 3.25%)', () => {
    const ok = STATE_TAX_DATABASE['OK'];
    const result = calculateSalesTax(ok, { listingPrice: 100_000, tradeInValue: 0 });
    expect(result.totalTax).toBe(3270);
  });

  it('FL real data: $100K RV -> county surtax only on first $5K', () => {
    const fl = STATE_TAX_DATABASE['FL'];
    const result = calculateSalesTax(fl, { listingPrice: 100_000, tradeInValue: 0 });
    // State: 100000 * 0.06 = 6000
    // Local surtax: min(100000, 5000) * avgLocalRate
    const expectedLocal = Math.round(5000 * fl.avgLocalTaxRate * 100) / 100;
    expect(result.stateTax).toBe(6000);
    expect(result.localTax).toBe(expectedLocal);
    expect(result.totalTax).toBe(6000 + expectedLocal);
  });

  // ── Trade-in credit verification with real data ─────────────────

  it('TX real data: $100K with $20K trade-in -> taxableAmount = $80K', () => {
    const tx = STATE_TAX_DATABASE['TX'];
    const result = calculateSalesTax(tx, { listingPrice: 100_000, tradeInValue: 20_000 });
    expect(result.taxableAmount).toBe(80_000);
  });

  it('CA real data: $100K with $20K trade-in -> taxableAmount = $100K (no credit)', () => {
    const ca = STATE_TAX_DATABASE['CA'];
    const result = calculateSalesTax(ca, { listingPrice: 100_000, tradeInValue: 20_000 });
    expect(result.taxableAmount).toBe(100_000);
  });

  it('MI real data: $100K with $15K trade-in -> taxableAmount = $89K (credit capped at $11K)', () => {
    const mi = STATE_TAX_DATABASE['MI'];
    const result = calculateSalesTax(mi, { listingPrice: 100_000, tradeInValue: 15_000 });
    expect(result.taxableAmount).toBe(89_000);
  });

  // ── DMV fee verification with real data ─────────────────────────

  it('TX real data (flat): DMV fees sum correctly and > $0', () => {
    const tx = STATE_TAX_DATABASE['TX'];
    const result = calculateDmvFees(tx, { listingPrice: 100_000 });
    expect(result.totalDmvFees).toBeGreaterThan(0);
    const expectedTotal =
      result.titleFee +
      result.registrationFee +
      result.plateFee +
      result.emissionsInspectionFee +
      result.otherFees.reduce((sum, f) => sum + f.amount, 0);
    expect(result.totalDmvFees).toBe(expectedTotal);
  });

  it('FL real data (weight): DMV fees sum correctly with GVWR', () => {
    const fl = STATE_TAX_DATABASE['FL'];
    const result = calculateDmvFees(fl, { listingPrice: 100_000, gvwr: 8000 });
    expect(result.totalDmvFees).toBeGreaterThan(0);
    const expectedTotal =
      result.titleFee +
      result.registrationFee +
      result.plateFee +
      result.emissionsInspectionFee +
      result.otherFees.reduce((sum, f) => sum + f.amount, 0);
    expect(result.totalDmvFees).toBe(expectedTotal);
  });

  it('VA real data (value): DMV fees sum correctly for $100K RV', () => {
    const va = STATE_TAX_DATABASE['VA'];
    const result = calculateDmvFees(va, { listingPrice: 100_000 });
    expect(result.totalDmvFees).toBeGreaterThan(0);
    // Registration should be based on value rate
    expect(result.registrationFee).toBe(Math.round(100_000 * va.registrationValueRate! * 100) / 100);
    const expectedTotal =
      result.titleFee +
      result.registrationFee +
      result.plateFee +
      result.emissionsInspectionFee +
      result.otherFees.reduce((sum, f) => sum + f.amount, 0);
    expect(result.totalDmvFees).toBe(expectedTotal);
  });

  // ── Lookup helper ───────────────────────────────────────────────

  it('getStateTaxFees("TX") returns Texas entry', () => {
    const tx = getStateTaxFees('TX');
    expect(tx).toBeDefined();
    expect(tx!.stateName).toBe('Texas');
  });

  it('getStateTaxFees("tx") returns Texas entry (case insensitive)', () => {
    const tx = getStateTaxFees('tx');
    expect(tx).toBeDefined();
    expect(tx!.stateName).toBe('Texas');
  });

  it('getStateTaxFees("XX") returns undefined', () => {
    expect(getStateTaxFees('XX')).toBeUndefined();
  });

  it('STATE_LIST has 51 entries sorted alphabetically by name', () => {
    expect(STATE_LIST.length).toBe(51);
    // Verify sorted: each name should be <= the next
    for (let i = 1; i < STATE_LIST.length; i++) {
      expect(STATE_LIST[i - 1].name.localeCompare(STATE_LIST[i].name)).toBeLessThanOrEqual(0);
    }
    // First should be Alabama, last Wyoming
    expect(STATE_LIST[0].name).toBe('Alabama');
    expect(STATE_LIST[STATE_LIST.length - 1].name).toBe('Wyoming');
  });
});
