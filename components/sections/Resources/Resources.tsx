import Icon from '@components/ui/Icon/Icon';
import styles from './Resources.module.css';

export default function Resources() {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Resources</h2>
      <div className={styles.insuranceCard}>
        <Icon name="shield" size={24} />
        <div>
          <p className={styles.cardTitle}>Foremost Insurance</p>
          <p className={styles.cardDescription}>
            Get an RV insurance quote from Foremost, a Farmers Insurance company. Protect your investment with specialized RV coverage.
          </p>
          <a href="#" className={styles.cardLink}>Get a quote</a>
        </div>
      </div>
    </div>
  );
}
