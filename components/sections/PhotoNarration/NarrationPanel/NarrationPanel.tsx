import { useNarration } from '../NarrationContext';
import NarrationContent from '../NarrationContent/NarrationContent';
import styles from './NarrationPanel.module.css';

export default function NarrationPanel() {
  const { getCurrentNarration, isEnabled } = useNarration();
  const narration = getCurrentNarration();

  if (!isEnabled || !narration) return null;

  return (
    <aside className={styles.panel}>
      <div className={styles.scrollArea}>
        <NarrationContent narration={narration} variant="full" />
      </div>
    </aside>
  );
}
