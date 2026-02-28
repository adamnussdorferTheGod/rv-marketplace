// ─── State tip engine ───────────────────────────────────────────────
// Pure function returning contextual tips based on state tax/fee data.
// Tips help users understand advantages, gotchas, and money-saving
// opportunities for their selected registration state.

import type { StateTaxFees } from '../../../app/src/data/stateTaxTypes';

export type TipType = 'info' | 'savings' | 'warning';

export interface StateTip {
  type: TipType;
  title: string;
  body: string;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

function formatPercent(rate: number): string {
  return (rate * 100).toFixed(1) + '%';
}

export function getStateTips(state: StateTaxFees, listingPrice: number): StateTip[] {
  const tips: StateTip[] = [];

  // No-tax states
  if (state.noTaxState) {
    tips.push({
      type: 'savings',
      title: 'No State Sales Tax',
      body: state.noTaxNote ?? 'This state has no state sales tax on RV purchases',
    });
  }

  // Tax cap states
  if (state.taxCap != null) {
    const uncappedTax = (state.stateSalesTaxRate + state.avgLocalTaxRate) * listingPrice;
    const savings = Math.round(uncappedTax - state.taxCap);
    if (savings > 0) {
      tips.push({
        type: 'savings',
        title: 'Tax Cap Savings',
        body: `Sales tax in ${state.stateName} is capped at $${formatCurrency(state.taxCap)}. On a $${formatCurrency(listingPrice)} RV, this saves you $${formatCurrency(savings)}`,
      });
    }
  }

  // RV-specific rules
  if (state.rvSpecificNote != null) {
    tips.push({
      type: 'info',
      title: 'RV-Specific Tax Rule',
      body: state.rvSpecificNote,
    });
  }

  // Trade-in credit
  if (state.tradeInCredit) {
    tips.push({
      type: 'info',
      title: 'Trade-In Tax Credit',
      body: 'Trade in your current RV to reduce the taxable amount -- you only pay tax on the difference',
    });
  } else {
    let body = `${state.stateName} does not offer a trade-in tax credit. Sales tax applies to the full purchase price regardless of trade-in value`;
    if (state.tradeInCreditNote) {
      body += '. ' + state.tradeInCreditNote;
    }
    tips.push({
      type: 'warning',
      title: 'No Trade-In Tax Credit',
      body,
    });
  }

  // Doc fee cap
  if (state.docFeeCap != null) {
    let body = `${state.stateName} caps dealer documentation fees at $${formatCurrency(state.docFeeCap)}`;
    if (state.docFeeCapNote) {
      body += '. ' + state.docFeeCapNote;
    }
    tips.push({
      type: 'info',
      title: 'Doc Fee Cap',
      body,
    });
  }

  // High combined rate
  const combinedRate = state.stateSalesTaxRate + state.avgLocalTaxRate;
  if (combinedRate >= 0.09) {
    tips.push({
      type: 'warning',
      title: 'High Combined Tax Rate',
      body: `The combined state and local tax rate in ${state.stateName} averages ${formatPercent(combinedRate)}. Consider this when comparing total costs across states`,
    });
  }

  return tips;
}
