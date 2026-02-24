import { useEffect, useCallback } from 'react';
import { useAiMode } from '../AiModeContext';
import AiModeHeader from '../AiModeHeader/AiModeHeader';
import ConversationThread from '../ConversationThread/ConversationThread';
import ChatInput from '../ChatInput/ChatInput';
import styles from './AiModePanel.module.css';

interface AiModePanelProps {
  listingTitle?: string;
  listingPrice?: string;
}

export default function AiModePanel({ listingTitle, listingPrice }: AiModePanelProps) {
  const {
    isOpen,
    closePanel,
    sendMessage,
    exchangeCount,
    isAuthenticated,
  } = useAiMode();

  const inputDisabled = exchangeCount >= 2 && !isAuthenticated;

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closePanel();
      }
    },
    [isOpen, closePanel],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  // Mobile scroll lock
  useEffect(() => {
    if (isOpen) {
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={closePanel}
          aria-hidden="true"
        />
      )}

      <div
        className={`${styles.panel} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-label="AI Mode conversation"
        aria-hidden={!isOpen}
      >
        <AiModeHeader
          listingTitle={listingTitle}
          listingPrice={listingPrice}
        />
        <ConversationThread listingTitle={listingTitle} />
        <ChatInput
          onSend={sendMessage}
          onClose={closePanel}
          disabled={inputDisabled}
        />
      </div>
    </>
  );
}
