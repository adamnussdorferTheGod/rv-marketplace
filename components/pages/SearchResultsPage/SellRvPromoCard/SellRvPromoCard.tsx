import styles from './SellRvPromoCard.module.css';

export default function SellRvPromoCard() {
  return (
    <div className={styles.card}>
      <div className={styles.textContent}>
        <h3 className={styles.headline}>Get real offers, real fast</h3>
        <div className={styles.copy}>
          <p className={styles.subheadline}>
            Earn thousands of dollars more when you sell on RV Trader.
          </p>
          <p className={styles.body}>
            Get access to the largest buyer marketplace and list in under 5
            minutes with our dedicated support team.
          </p>
        </div>
        <a href="/sell" className={styles.cta}>
          Sell online today
        </a>
      </div>

      <div className={styles.imageArea}>
        <div className={`${styles.offerTag} ${styles.offerTagTopLeft}`}>
          <span className={`${styles.offerIcon} ${styles.offerIconLg}`}>$</span>
          <div className={styles.offerText}>
            <span className={styles.offerLabel}>Offer</span>
            <span className={styles.offerPrice}>$51,500</span>
          </div>
        </div>

        <div className={`${styles.offerTag} ${styles.offerTagRight}`}>
          <span className={styles.offerIcon}>$</span>
          <div className={styles.offerText}>
            <span className={styles.offerLabel}>Offer</span>
            <span className={styles.offerPrice}>$58,500</span>
          </div>
        </div>

        <div className={`${styles.offerTag} ${styles.offerTagBottom}`}>
          <span className={styles.offerIcon}>$</span>
          <div className={styles.offerText}>
            <span className={styles.offerLabel}>Offer</span>
            <span className={styles.offerPrice}>$68,500</span>
          </div>
        </div>

        <img
          src="/images/sell-rv-fifth-wheel.png"
          alt="Fifth wheel RV"
          className={styles.rvImage}
        />
      </div>
    </div>
  );
}
