import styles from './InsuranceAccessories.module.css';

export default function InsuranceAccessories() {
  return (
    <section className={styles.section}>
      <div className={styles.cardsRow}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardHeading}>RV accessories</h3>
            <p className={styles.cardDescription}>
              Browse accessories and parts for your RV.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardHeading}>RV insurance</h3>
            <p className={styles.cardDescription}>
              Protect your investment with RV insurance.
            </p>
          </div>
        </div>
      </div>
      <p className={styles.disclaimer}>
        Insurance products are offered through third-party providers. RV Trader
        is not an insurance provider and does not guarantee coverage.
      </p>
    </section>
  );
}
