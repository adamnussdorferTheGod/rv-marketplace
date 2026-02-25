import styles from './PriceAlertToast.module.css';

interface PriceAlertToastProps {
  onDismiss: () => void;
}

export default function PriceAlertToast({ onDismiss }: PriceAlertToastProps) {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={styles.toast} onClick={onDismiss}>
        <p className={styles.heading}>Price alert created</p>
        <p className={styles.description}>
          Keep an eye on your email inbox for price alerts
        </p>
      </div>
    </div>
  );
}
