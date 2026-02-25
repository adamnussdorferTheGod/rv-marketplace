import Icon from '@components/ui/Icon/Icon';
import { useDealKit, LOADING_STEPS } from '../DealKitContext';
import styles from './DealKitLoading.module.css';

export default function DealKitLoading() {
  const { loadingStep } = useDealKit();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrap}>
          <Icon name="sparkles" size={40} />
        </div>
        <h2 className={styles.heading}>Building your Deal Kit</h2>
        <div className={styles.steps}>
          {LOADING_STEPS.map((label, i) => (
            <div
              key={label}
              className={`${styles.step} ${i < loadingStep ? styles.done : ''} ${i === loadingStep ? styles.active : ''}`}
            >
              <div className={styles.stepDot}>
                {i < loadingStep ? (
                  <Icon name="check_filled" size={16} />
                ) : (
                  <span className={styles.dot} />
                )}
              </div>
              <span className={styles.stepLabel}>{label}</span>
            </div>
          ))}
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{
              width: `${(loadingStep / LOADING_STEPS.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
