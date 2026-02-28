// ─── Financing Calculator ─────────────────────────────────────────────
// Pure functions and constants for RV loan calculations.

// ─── Loan term options ────────────────────────────────────────────────

export interface LoanTerm {
  months: number;
  label: string;
}

export const LOAN_TERMS: LoanTerm[] = [
  { months: 36, label: '3 yr' },
  { months: 48, label: '4 yr' },
  { months: 60, label: '5 yr' },
  { months: 72, label: '6 yr' },
  { months: 84, label: '7 yr' },
  { months: 120, label: '10 yr' },
  { months: 144, label: '12 yr' },
  { months: 180, label: '15 yr' },
];

// ─── Credit tier options ──────────────────────────────────────────────

export interface CreditTier {
  id: string;
  label: string;
  apr: number;
}

export const CREDIT_TIERS: CreditTier[] = [
  { id: 'excellent', label: 'Excellent', apr: 5.99 },
  { id: 'good', label: 'Good', apr: 7.49 },
  { id: 'fair', label: 'Fair', apr: 9.99 },
  { id: 'below-fair', label: 'Below Fair', apr: 12.49 },
];

// ─── Defaults ─────────────────────────────────────────────────────────

export const DEFAULT_TERM = 180;
export const DEFAULT_CREDIT_TIER = 'good';

// ─── Financing summary result ─────────────────────────────────────────

export interface FinancingSummary {
  amountFinanced: number;
  monthlyPayment: number;
  totalInterest: number;
  totalLoanCost: number;
}

// ─── PMT formula ──────────────────────────────────────────────────────

/**
 * Calculate monthly payment using the standard PMT formula:
 *   M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * where r = monthly rate, n = term in months, P = principal.
 *
 * Edge cases:
 * - annualRate === 0 => simple division (principal / termMonths)
 * - principal <= 0 => 0
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number,
): number {
  if (principal <= 0) return 0;
  if (termMonths <= 0) return 0;
  if (annualRate === 0) {
    return Math.round((principal / termMonths) * 100) / 100;
  }

  const r = annualRate / 100 / 12; // monthly rate
  const n = termMonths;
  const factor = Math.pow(1 + r, n);
  const payment = principal * (r * factor) / (factor - 1);

  return Math.round(payment * 100) / 100;
}

// ─── Financing summary ───────────────────────────────────────────────

export function calculateFinancingSummary(params: {
  outTheDoorTotal: number;
  downPayment: number;
  annualRate: number;
  termMonths: number;
}): FinancingSummary {
  const { outTheDoorTotal, downPayment, annualRate, termMonths } = params;

  const amountFinanced = Math.max(0, outTheDoorTotal - downPayment);
  const monthlyPayment = calculateMonthlyPayment(amountFinanced, annualRate, termMonths);
  const totalLoanCost = Math.round(monthlyPayment * termMonths * 100) / 100;
  const totalInterest = Math.round((totalLoanCost - amountFinanced) * 100) / 100;

  return {
    amountFinanced,
    monthlyPayment,
    totalInterest,
    totalLoanCost,
  };
}
