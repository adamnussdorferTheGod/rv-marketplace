import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@components/ui/Icon/Icon';
import styles from './AiQuestionBanner.module.css';

export default function AiQuestionBanner() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;
    navigate(`/search?q=${encodeURIComponent(text)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.textCol}>
          <div className={styles.header}>
            <h2 className={styles.title}>Have a question?</h2>
            <div className={styles.betaBadge}>
              <Icon name="sparkles" size={14} className={styles.betaIcon} />
              <span className={styles.betaLabel}>Beta</span>
            </div>
          </div>
          <p className={styles.description}>
            Get instant answers with AI powered search of RVs
          </p>
        </div>

        <div className={styles.searchRow} onClick={() => inputRef.current?.focus()}>
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
    </section>
  );
}
