import styles from './Disclaimer.module.css';

export default function Disclaimer() {
  return (
    <div className={styles.section}>
      <p className={styles.text}>
        RV Trader is not responsible for the accuracy of information provided by the seller. Listings are provided by independent dealers and private sellers. RV Trader does not guarantee the condition, title, or other specifics of any listed vehicle.
      </p>
      <p className={styles.text}>
        Some photos may be digitally enhanced using AI technology. Contact dealer to confirm actual vehicle appearance and features.
      </p>
    </div>
  );
}
