import { useRef, useCallback, useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useNarration } from '../NarrationContext';
import NarrationContent from '../NarrationContent/NarrationContent';
import NarrationAuthGate from '../NarrationAuthGate/NarrationAuthGate';
import styles from './NarrationSheet.module.css';

export default function NarrationSheet() {
  const { isEnabled, mobileSheetExpanded, setMobileSheetExpanded, getCurrentNarration, isGated, authenticate } = useNarration();
  const narration = getCurrentNarration();
  const touchStartY = useRef(0);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

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

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage('');
    setTimeout(() => setSent(false), 3000);
  };

  if (!isEnabled || !narration) return null;

  if (isGated) {
    return (
      <div
        className={`${styles.sheet} ${styles.expanded}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.handle}>
          <div className={styles.handleBar} />
        </div>
        <div className={styles.scrollArea}>
          <NarrationAuthGate onAuthenticate={authenticate} />
        </div>
      </div>
    );
  }

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
        <>
          <div className={styles.scrollArea}>
            <NarrationContent narration={narration} variant="full" />
          </div>
          <div className={styles.messageBox}>
            {sent ? (
              <div className={styles.sentConfirmation}>
                <Icon name="check_circle" size={16} className={styles.sentIcon} />
                <span>Message sent to seller</span>
              </div>
            ) : (
              <div className={styles.inputRow}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Have a question for the seller?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  className={styles.sendButton}
                  onClick={handleSend}
                  disabled={!message.trim()}
                  aria-label="Send message"
                >
                  <Icon name="send" size={16} />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
