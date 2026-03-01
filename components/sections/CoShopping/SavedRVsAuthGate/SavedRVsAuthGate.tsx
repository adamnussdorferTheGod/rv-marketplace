import { useState, type ReactNode } from 'react';
import Icon from '../../../ui/Icon/Icon';
import styles from './SavedRVsAuthGate.module.css';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09A6.97 6.97 0 0 1 5.48 12c0-.72.13-1.43.36-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.54z" fill="#FBBC05" />
      <path d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z" fill="#EA4335" />
    </svg>
  );
}

interface SavedRVsAuthGateProps {
  children: ReactNode;
}

export default function SavedRVsAuthGate({ children }: SavedRVsAuthGateProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return <>{children}</>;
  }

  return (
    <>
      <div className={styles.outer}>
        <div className={styles.gatedContent}>
          {children}
        </div>
        <div className={styles.gradient} />
      </div>
      <div className={styles.card}>
        <h3 className={styles.heading}>Create a free account, or log in.</h3>
        <p className={styles.subtext}>
          Save unlimited RVs, invite a co-shopper, and compare your favorites side by side.
        </p>
        <div className={styles.actions}>
          <button className={styles.authButton} onClick={() => setDismissed(true)}>
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
          <button className={styles.authButton} onClick={() => setDismissed(true)}>
            <Icon name="mail" size={20} />
            <span>Continue with email</span>
          </button>
        </div>
        <p className={styles.terms}>
          By continuing, you agree to the{' '}
          <a href="#terms">Terms of Service</a> and{' '}
          <a href="#privacy">Privacy Policy</a>.
        </p>
      </div>
    </>
  );
}
