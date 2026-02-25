import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import { useDealKit } from '../DealKitContext';
import styles from './AuthGateModal.module.css';

export default function AuthGateModal() {
  const { step, authenticate, closeDealKit } = useDealKit();

  if (step !== 'auth-gate') return null;

  return (
    <div className={styles.backdrop} onClick={closeDealKit}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={closeDealKit}
          aria-label="Close"
        >
          <Icon name="x_close" size={20} />
        </button>
        <div className={styles.iconWrap}>
          <Icon name="lock" size={32} />
        </div>
        <h2 className={styles.heading}>Sign in to get your Deal Kit</h2>
        <p className={styles.subtext}>
          Your personalized deal briefing is ready to generate. Sign in or
          create a free account to access it.
        </p>
        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={authenticate}>
            Sign In
          </Button>
          <Button variant="tertiary" size="lg" onClick={authenticate}>
            Create Free Account
          </Button>
        </div>
      </div>
    </div>
  );
}
