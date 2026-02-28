import type { InsuranceEstimate as InsuranceEstimateType } from './insuranceEstimates';
import styles from './InsuranceEstimate.module.css';

interface InsuranceEstimateProps {
  estimate: InsuranceEstimateType;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

export default function InsuranceEstimate({ estimate }: InsuranceEstimateProps) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Insurance Estimate</h3>
      <div className={styles.lineItem}>
        <span>Low estimate</span>
        <span>${formatCurrency(estimate.lowAnnual)}/yr</span>
      </div>
      <div className={styles.lineItem}>
        <span>Mid estimate</span>
        <span>${formatCurrency(estimate.midAnnual)}/yr</span>
      </div>
      <div className={styles.lineItem}>
        <span>High estimate</span>
        <span>${formatCurrency(estimate.highAnnual)}/yr</span>
      </div>
      <p className={styles.coverageNote}>Typical coverage: {estimate.coverageType}</p>
      <p className={styles.disclaimer}>
        Estimates only — actual premiums vary by coverage, deductible, driving history, and storage. Get a real quote from an RV insurer like Progressive, Good Sam, or Roamly.
      </p>
    </div>
  );
}
