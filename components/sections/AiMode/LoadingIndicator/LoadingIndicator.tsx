import Icon from '@components/ui/Icon/Icon';
import styles from './LoadingIndicator.module.css';

export default function LoadingIndicator() {
  return (
    <div className={styles.row}>
      <div className={styles.sparkleIcon}>
        <Icon name="sparkles" size={16} />
      </div>
      <div className={styles.bubble}>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </div>
  );
}
