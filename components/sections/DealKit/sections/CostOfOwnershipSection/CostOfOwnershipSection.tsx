import type { CostOfOwnershipData } from '../../../../../app/src/data/dealKitTypes';
import styles from './CostOfOwnershipSection.module.css';

interface CostOfOwnershipSectionProps {
  data: CostOfOwnershipData;
}

export default function CostOfOwnershipSection({
  data,
}: CostOfOwnershipSectionProps) {
  return (
    <section id="cost" className={styles.section}>
      <h2 className={styles.heading}>Cost of Ownership</h2>
      <div className={styles.card}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Expense</span>
            <span>Annual Estimate</span>
          </div>
          {data.items.map((item) => (
            <div key={item.label} className={styles.tableRow}>
              <div className={styles.rowLeft}>
                <span className={styles.rowLabel}>{item.label}</span>
                {item.note && (
                  <span className={styles.rowNote}>{item.note}</span>
                )}
              </div>
              <span className={styles.rowCost}>{item.annualCost}</span>
            </div>
          ))}
          <div className={`${styles.tableRow} ${styles.totalRow}`}>
            <span className={styles.rowLabel}>Total estimated annual</span>
            <span className={styles.rowCost}>{data.totalAnnual}</span>
          </div>
        </div>
        <div className={styles.depreciation}>
          <h3 className={styles.depTitle}>Depreciation Outlook</h3>
          <p className={styles.depText}>{data.depreciationNote}</p>
        </div>
      </div>
    </section>
  );
}
