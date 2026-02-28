import { useState, useMemo } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { getStateTaxFees, STATE_LIST } from '../../../app/src/data/stateTaxDatabase';
import { calculateSalesTax, calculateDmvFees } from '../../../app/src/data/stateTaxCalculations';
import { getDealerFeeDefaults } from './dealerFeeDefaults';
import styles from './TotalCostCalculator.module.css';

interface TotalCostCalculatorProps {
  currentPrice: number;
  location: string;
  gvwr?: number;
  rvType?: string;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

function extractStateCode(location: string): string {
  const parts = location.split(', ');
  const last = parts[parts.length - 1]?.trim();
  return last && last.length === 2 ? last.toUpperCase() : 'FL';
}

export default function TotalCostCalculator({
  currentPrice,
  location,
  gvwr,
  rvType,
}: TotalCostCalculatorProps) {
  const defaultState = extractStateCode(location);
  const [selectedState, setSelectedState] = useState(defaultState);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const { totalTaxAndFees, outTheDoorTotal, monthlyPayment } = useMemo(() => {
    const stateData = getStateTaxFees(selectedState);

    if (!stateData) {
      return { totalTaxAndFees: 0, outTheDoorTotal: currentPrice, monthlyPayment: Math.round(currentPrice / 180) };
    }

    const taxResult = calculateSalesTax(stateData, { listingPrice: currentPrice, tradeInValue: 0 });
    const dmvResult = calculateDmvFees(stateData, { listingPrice: currentPrice, gvwr });
    const dealerFees = getDealerFeeDefaults(rvType ?? 'travel-trailer', stateData.docFeeCap);

    const fees = taxResult.totalTax + dmvResult.totalDmvFees + dealerFees.totalDealerFees;
    const total = currentPrice + fees;
    const monthly = Math.round(total / 180);

    return { totalTaxAndFees: fees, outTheDoorTotal: total, monthlyPayment: monthly };
  }, [selectedState, currentPrice, gvwr, rvType]);

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Estimated total cost</h2>

      {/* State selector row */}
      <div className={styles.stateRow}>
        <label className={styles.stateLabel}>Based on registering in</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className={styles.stateSelect}
        >
          {STATE_LIST.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Summary bar */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Listing price</span>
          <span className={styles.summaryValue}>${formatCurrency(currentPrice)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Est. tax & fees</span>
          <span className={styles.summaryValue}>+${formatCurrency(totalTaxAndFees)}</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Out-the-door total</span>
          <span className={styles.totalValue}>${formatCurrency(outTheDoorTotal)}</span>
        </div>
        <p className={styles.monthlyTeaser}>Est. ${formatCurrency(monthlyPayment)}/mo</p>
      </div>

      {/* Breakdown toggle -- expanded content rendered in Plan 48-02 */}
      <button
        className={styles.breakdownToggle}
        onClick={() => setBreakdownOpen(!breakdownOpen)}
      >
        <span>See full breakdown</span>
        <Icon name="expand_more" size={20} className={breakdownOpen ? styles.iconRotated : ''} />
      </button>

      {/* Breakdown slot -- Plan 48-02 will add CostBreakdown here */}
      {breakdownOpen && (
        <div className={styles.breakdownPlaceholder}>
          {/* Will be replaced by CostBreakdown in 48-02 */}
        </div>
      )}
    </div>
  );
}
