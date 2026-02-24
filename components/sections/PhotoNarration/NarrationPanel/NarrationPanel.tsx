import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useNarration } from '../NarrationContext';
import NarrationContent from '../NarrationContent/NarrationContent';
import styles from './NarrationPanel.module.css';

export default function NarrationPanel() {
  const { getCurrentNarration, isEnabled } = useNarration();
  const narration = getCurrentNarration();
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isEnabled || !narration) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <aside className={styles.panel}>
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
    </aside>
  );
}
