import styles from './DealerSpotlight.module.css';

export default function DealerSpotlight() {
  return (
    <div className={styles.spotlight}>
      <div className={styles.logo} />
      <div className={styles.info}>
        <span className={styles.dealerName}>Uwharrie RV</span>
        <a href="/search" className={styles.shopLink}>
          Shop inventory
        </a>
      </div>
    </div>
  );
}
