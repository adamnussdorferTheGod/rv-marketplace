import {
  LOAN_TERMS,
  CREDIT_TIERS,
  type FinancingSummary,
} from '../../../app/src/data/financingCalculations';
import styles from './FinancingSection.module.css';

interface FinancingSectionProps {
  outTheDoorTotal: number;
  listingPrice: number;
  downPayment: number;
  onDownPaymentChange: (value: number) => void;
  selectedTermMonths: number;
  onTermChange: (months: number) => void;
  selectedTierId: string;
  onTierChange: (tierId: string) => void;
  manualApr: string;
  onManualAprChange: (apr: string) => void;
  isManualApr: boolean;
  onManualAprToggle: (active: boolean) => void;
  financingSummary: FinancingSummary;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

export default function FinancingSection({
  listingPrice,
  downPayment,
  onDownPaymentChange,
  selectedTermMonths,
  onTermChange,
  selectedTierId,
  onTierChange,
  manualApr,
  onManualAprChange,
  isManualApr,
  onManualAprToggle,
  financingSummary,
}: FinancingSectionProps) {
  const downPaymentPercent = listingPrice > 0
    ? Math.round((downPayment / listingPrice) * 100)
    : 0;

  const handleDownPaymentText = (raw: string) => {
    const stripped = raw.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(stripped);
    if (Number.isNaN(parsed)) {
      onDownPaymentChange(0);
    } else {
      onDownPaymentChange(Math.min(Math.max(0, Math.round(parsed)), listingPrice));
    }
  };

  const handleManualAprText = (raw: string) => {
    // Allow digits and a single decimal point
    const cleaned = raw.replace(/[^0-9.]/g, '');
    onManualAprChange(cleaned);
  };

  return (
    <div className={styles.financingSection}>
      {/* Down Payment */}
      <div className={styles.inputGroup}>
        <label className={styles.sectionLabel}>Down payment</label>
        <div className={styles.sliderRow}>
          <input
            type="range"
            className={styles.rangeInput}
            min={0}
            max={listingPrice}
            step={100}
            value={downPayment}
            onChange={(e) => onDownPaymentChange(Number(e.target.value))}
          />
          <div className={styles.downPaymentInputWrap}>
            <span className={styles.dollarPrefix}>$</span>
            <input
              type="text"
              className={styles.downPaymentInput}
              value={formatCurrency(downPayment)}
              onChange={(e) => handleDownPaymentText(e.target.value)}
              onBlur={(e) => handleDownPaymentText(e.target.value)}
            />
          </div>
        </div>
        <p className={styles.downPaymentPercent}>({downPaymentPercent}% of listing price)</p>
      </div>

      {/* Loan Term */}
      <div className={styles.inputGroup}>
        <label className={styles.sectionLabel}>Loan term</label>
        <div className={styles.termPills}>
          {LOAN_TERMS.map((term) => (
            <button
              key={term.months}
              type="button"
              className={`${styles.termPill} ${selectedTermMonths === term.months ? styles.termPillActive : ''}`}
              onClick={() => onTermChange(term.months)}
            >
              {term.label}
            </button>
          ))}
        </div>
      </div>

      {/* Credit Score / APR */}
      <div className={styles.inputGroup}>
        <label className={styles.sectionLabel}>Credit score</label>
        <div className={styles.creditTierList}>
          {CREDIT_TIERS.map((tier) => (
            <button
              key={tier.id}
              type="button"
              className={`${styles.creditTierOption} ${selectedTierId === tier.id && !isManualApr ? styles.creditTierOptionActive : ''} ${isManualApr ? styles.creditTierOptionDimmed : ''}`}
              onClick={() => {
                onTierChange(tier.id);
                if (isManualApr) {
                  onManualAprToggle(false);
                  onManualAprChange('');
                }
              }}
            >
              {tier.label} — {tier.apr}% APR
            </button>
          ))}
        </div>
        <div className={styles.manualAprRow}>
          <button
            type="button"
            className={styles.manualAprToggle}
            onClick={() => {
              if (isManualApr) {
                onManualAprToggle(false);
                onManualAprChange('');
              } else {
                onManualAprToggle(true);
              }
            }}
          >
            {isManualApr ? 'Use credit tier' : 'Know your rate?'}
          </button>
          {isManualApr && (
            <div className={styles.manualAprInputWrap}>
              <input
                type="text"
                className={styles.manualAprInput}
                placeholder="Enter APR %"
                value={manualApr}
                onChange={(e) => handleManualAprText(e.target.value)}
              />
              <span className={styles.aprSuffix}>%</span>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className={styles.resultsDivider} />
      <div className={styles.resultsSection}>
        <h4 className={styles.resultsHeading}>Financing summary</h4>
        <div className={styles.resultRow}>
          <span className={styles.resultLabel}>Amount financed</span>
          <span className={styles.resultValue}>${formatCurrency(financingSummary.amountFinanced)}</span>
        </div>
        <div className={styles.resultRow}>
          <span className={styles.resultLabel}>Monthly payment</span>
          <span className={styles.monthlyPaymentValue}>${formatCurrency(Math.round(financingSummary.monthlyPayment))}</span>
        </div>
        <div className={styles.resultRow}>
          <span className={styles.resultLabel}>Total interest</span>
          <span className={styles.resultValue}>${formatCurrency(Math.round(financingSummary.totalInterest))}</span>
        </div>
        <div className={styles.resultRow}>
          <span className={styles.resultLabel}>Total cost of loan</span>
          <span className={styles.resultValue}>${formatCurrency(Math.round(financingSummary.totalLoanCost))}</span>
        </div>
      </div>
    </div>
  );
}
