import styles from './PaymentCalculator.module.css';

function GreenCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.prequalCheckIcon}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2667 5.5475L15.7733 4.05583L7.79583 11.8625L4.6475 8.77083L3.125 10.2617L7.83917 14.9758L17.2667 5.5475Z"
        fill="#006836"
      />
    </svg>
  );
}

export default function PrequalBanner() {
  return (
    <div className={styles.prequal}>
      <div className={styles.prequalPig}>
        <img
          src="/images/icons/pig-savings.png"
          alt=""
          width="109"
          height="85"
        />
      </div>
      <div className={styles.prequalContent}>
        <span className={styles.prequalHeading}>
          Find the right personal loan for you
        </span>
        <div className={styles.prequalChecks}>
          <div className={styles.prequalCheck}>
            <GreenCheck />
            <span>Offers in 2 minutes or less</span>
          </div>
          <div className={styles.prequalCheck}>
            <GreenCheck />
            <span>No impact to your credit score</span>
          </div>
        </div>
      </div>
      <button type="button" className={styles.prequalButton}>
        Prequalified
      </button>
    </div>
  );
}
