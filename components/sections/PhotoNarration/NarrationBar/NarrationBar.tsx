import Icon from '@components/ui/Icon/Icon';
import { useNarration } from '../NarrationContext';
import styles from './NarrationBar.module.css';

interface NarrationBarProps {
  onOpenLightbox: () => void;
}

export default function NarrationBar({ onOpenLightbox }: NarrationBarProps) {
  const { isEnabled, getCurrentNarration } = useNarration();
  const narration = getCurrentNarration();

  if (!isEnabled || !narration) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <Icon name="sparkle" size={16} className={styles.icon} />
        <span className={styles.label}>{narration.area_label}</span>
        <span className={styles.description}>{narration.description}</span>
      </div>
      <button className={styles.link} onClick={onOpenLightbox}>
        See full narration &rarr;
      </button>
    </div>
  );
}
