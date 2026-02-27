import styles from './DealerSpotlight.module.css';

export default function DealerSpotlight() {
  return (
    <div className={styles.spotlight}>
      <img src="/images/uwharrie-logo.png" alt="Uwharrie RV" className={styles.logo} />
      <div className={styles.info}>
        <span className={styles.dealerName}>Uwharrie RV</span>
        <a href="/search" className={styles.shopLink}>
          Shop inventory
        </a>
      </div>
    </div>
  );
}
