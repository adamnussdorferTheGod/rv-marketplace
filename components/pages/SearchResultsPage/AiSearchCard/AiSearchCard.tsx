import { useState, useRef } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useAiMode } from '@components/sections/AiMode/AiModeContext';
import styles from './AiSearchCard.module.css';

export default function AiSearchCard() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { openPanel, sendMessage } = useAiMode();

  const handleSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;

    openPanel('default');
    // Small delay so panel opens before message sends
    setTimeout(() => sendMessage(text), 50);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCardClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Have a question?</h3>
        <div className={styles.betaBadge}>
          <Icon name="sparkles" size={14} className={styles.betaIcon} />
          <span className={styles.betaLabel}>Beta</span>
        </div>
      </div>

      <p className={styles.description}>
        Get instant answers with AI powered search of RVs
      </p>

      {/* Search input row */}
      <div className={styles.searchRow} onClick={handleCardClick}>
        <div className={styles.inputWrap}>
          <Icon name="ai_search" size={24} className={styles.aiIcon} />
          {!inputValue && (
            <div className={styles.customPlaceholder}>
              <span className={styles.placeholderTry}>Try</span>
              <span className={styles.placeholderHint}>
                What's a good RV for a couple with pets?
              </span>
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Ask an AI question about RVs"
          />
        </div>
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={!inputValue.trim()}
          aria-label="Search"
        >
          <Icon name="search" size={24} />
        </button>
      </div>
    </div>
  );
}
