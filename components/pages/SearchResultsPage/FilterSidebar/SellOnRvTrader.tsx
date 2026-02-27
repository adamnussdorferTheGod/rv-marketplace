import styles from './SellOnRvTrader.module.css';

export default function SellOnRvTrader() {
  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=200&fit=crop"
          alt="Sell your RV"
          className={styles.photoImg}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>Sell on RV Trader</h3>
        <p className={styles.description}>
          <strong>Get the best price</strong> — plus earn thousands more than on
          trade-in!
        </p>
      </div>
      <a className={styles.cta} href="/sell">
        Sell my RV
      </a>
    </div>
  );
}
