import Icon from '@components/ui/Icon/Icon';
import { useDealKit, LOADING_STEPS } from '../DealKitContext';
import styles from './DealKitLoading.module.css';

export default function DealKitLoading() {
  const { loadingStep, data } = useDealKit();

  // Use vehicleImage from data if available, fall back to sampleListing image
  const imageUrl = data?.vehicleImage ?? 'https://images.unsplash.com/photo-1619317190381-643a6b28d6e6?w=400&h=400&fit=crop&q=80';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrap}>
          <img src={imageUrl} alt="" className={styles.vehicleThumb} />
          <div className={styles.sparkleBadge}>
            <Icon name="sparkles" size={16} />
          </div>
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
