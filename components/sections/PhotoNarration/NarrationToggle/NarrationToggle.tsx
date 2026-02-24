import Icon from '@components/ui/Icon/Icon';
import { useNarration } from '../NarrationContext';
import styles from './NarrationToggle.module.css';

interface NarrationToggleProps {
  className?: string;
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
    </svg>
  );
}

export default function NarrationToggle({ className }: NarrationToggleProps) {
  const { isEnabled, toggleNarration } = useNarration();

  return (
    <div className={`${styles.wrapper} ${className || ''}`.trim()}>
      <Icon name="sparkles" size={14} className={styles.icon} />
      <span className={styles.label}>Smart Narration</span>
      <button
        className={`${styles.toggle} ${isEnabled ? styles.toggleOn : ''}`}
        onClick={toggleNarration}
        role="switch"
        aria-checked={isEnabled}
        aria-label="Smart Narration"
      >
        <span className={styles.toggleThumb}>
          <span className={styles.toggleCheck}><CheckIcon /></span>
        </span>
      </button>
    </div>
  );
}
