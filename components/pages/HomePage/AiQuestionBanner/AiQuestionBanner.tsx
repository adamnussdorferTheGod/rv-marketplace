import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '@components/ui/Icon/Icon';
import { useAiMode } from '@components/sections/AiMode/AiModeContext';
import styles from './AiQuestionBanner.module.css';

const PHRASES = [
  "What's a good RV for a couple with pets?",
  'Best travel trailers under $30,000',
  'Family-friendly Class C motorhomes',
  'Lightweight towable RVs for a half-ton truck',
];

const PHRASE_INTERVAL = 3500;

function usePhraseCycle(count: number, interval: number, active: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [count, interval, active]);

  useEffect(() => {
    if (!active) setIndex(0);
  }, [active]);

  return index;
}

export default function AiQuestionBanner() {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { openPanel, sendMessage } = useAiMode();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showPlaceholder = !inputValue && !isFocused;
  const phraseIndex = usePhraseCycle(PHRASES.length, PHRASE_INTERVAL, showPlaceholder && isVisible);

  const handleSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;
    openPanel('default');
    setTimeout(() => sendMessage(text), 50);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section ref={sectionRef} className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
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

            {showPlaceholder && (
              <div className={styles.placeholderWrap}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phraseIndex}
                    className={styles.customPlaceholder}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <span className={styles.placeholderTry}>Try</span>
                    <span className={styles.placeholderHint}>
                      {PHRASES[phraseIndex]}
                    </span>
                    <span className={styles.cursor} />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
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
