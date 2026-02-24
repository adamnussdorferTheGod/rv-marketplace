import { useRef, useCallback } from 'react';
import { useNarration } from '../NarrationContext';
import NarrationContent from '../NarrationContent/NarrationContent';
import styles from './NarrationSheet.module.css';

export default function NarrationSheet() {
  const { isEnabled, mobileSheetExpanded, setMobileSheetExpanded, getCurrentNarration } = useNarration();
  const narration = getCurrentNarration();
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY < -40) {
      setMobileSheetExpanded(true);
    } else if (deltaY > 40) {
      setMobileSheetExpanded(false);
    }
  }, [setMobileSheetExpanded]);

  if (!isEnabled || !narration) return null;

  return (
    <div
      className={`${styles.sheet} ${mobileSheetExpanded ? styles.expanded : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.handle}>
        <div className={styles.handleBar} />
      </div>
      <div className={styles.preview} onClick={() => setMobileSheetExpanded(!mobileSheetExpanded)}>
        <span className={styles.previewLabel}>{narration.area_label}</span>
        <span className={styles.previewDesc}>{narration.description}</span>
      </div>
      {mobileSheetExpanded && (
        <div className={styles.scrollArea}>
          <NarrationContent narration={narration} variant="full" />
        </div>
      )}
    </div>
  );
}
