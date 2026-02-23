import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import { useAiMode } from '../AiModeContext';
import styles from './AuthGateInline.module.css';

export default function AuthGateInline() {
  const { authenticate } = useAiMode();

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <Icon name="lock" size={24} />
      </div>
      <h3 className={styles.heading}>Sign in to keep exploring</h3>
      <p className={styles.body}>
        Create a free account or sign in to continue your AI-powered conversation
        about this listing.
      </p>
      <div className={styles.actions}>
        <Button variant="primary" size="sm" onClick={authenticate}>
          Sign in
        </Button>
        <Button variant="secondary" size="sm" onClick={authenticate}>
          Create account
        </Button>
      </div>
    </div>
  );
}
