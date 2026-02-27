import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import Button from '@components/ui/Button/Button';
import Icon from '@components/ui/Icon/Icon';
import SearchDropdown from './SearchDropdown';
import DealerSpotlight from './DealerSpotlight';
import styles from './HeroBanner.module.css';

type HeroSegment = 'shop' | 'sell';

const SEGMENT_OPTIONS: { value: HeroSegment; label: string }[] = [
  { value: 'shop', label: 'Shop RVs' },
  { value: 'sell', label: 'Sell my RV' },
];

const PLACEHOLDER_PHRASES = [
  'Try: Family-friendly RVs for 4',
  'Try: Class A under $80,000',
  'Try: Travel trailers near me',
];

/* ── animation constants ── */

const containerVariants = {
  hidden: {
    opacity: 0,
    y: '50%',
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: '50%',
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const childFadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const segmentedGroupVariants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      delay: 0.3,
      ease: 'easeOut',
    },
  },
};

/* ── hooks ── */

function useTypewriter(phrases: string[], active: boolean) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) return;

    const phrase = phrases[phraseIndex];

    if (!deleting && charIndex < phrase.length) {
      const id = setTimeout(() => setCharIndex((c) => c + 1), 70);
      return () => clearTimeout(id);
    }

    if (!deleting && charIndex === phrase.length) {
      const id = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(id);
    }

    if (deleting && charIndex > 0) {
      const id = setTimeout(() => setCharIndex((c) => c - 1), 35);
      return () => clearTimeout(id);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }
  }, [phrases, phraseIndex, charIndex, deleting, active]);

  useEffect(() => {
    if (!active) {
      setCharIndex(0);
      setDeleting(false);
    }
  }, [active]);

  return phrases[phraseIndex].slice(0, charIndex);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/* ── component ── */

export default function HeroBanner() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState<HeroSegment>('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const showPlaceholder = !searchQuery && !isDropdownOpen;
  const typedText = useTypewriter(PLACEHOLDER_PHRASES, showPlaceholder);
  const reducedMotion = usePrefersReducedMotion();

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  /* Close on click outside */
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isDropdownOpen, closeDropdown]);

  /* Close on Escape key */
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen, closeDropdown]);

  const handleSearch = () => {
    closeDropdown();
    navigate('/search');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchFocus = () => {
    setIsDropdownOpen(true);
  };

  const searchBarClass = isDropdownOpen
    ? `${styles.searchBar} ${styles.searchBarOpen}`
    : styles.searchBar;

  /* If user prefers reduced motion, skip entrance animations */
  const animateEntrance = !reducedMotion;

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heading}>Shop the largest RV marketplace</h1>
      </div>

      <motion.div
        className={styles.searchCard}
        ref={searchContainerRef}
        variants={animateEntrance ? containerVariants : undefined}
        initial={animateEntrance ? 'hidden' : false}
        animate={animateEntrance ? 'visible' : undefined}
      >
        {/* Breathing shadow — loops infinitely */}
        <motion.div
          className={styles.breathingShadow}
          animate={
            animateEntrance
              ? {
                  boxShadow: [
                    '0px 2px 8px 2px rgba(0,0,0,0.07)',
                    '0px 8px 24px 4px rgba(0,0,0,0.12)',
                    '0px 2px 8px 2px rgba(0,0,0,0.07)',
                  ],
                }
              : undefined
          }
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />

        {/* Segmented buttons — expand from center */}
        <motion.div
          className={styles.segmentedWrap}
          variants={animateEntrance ? segmentedGroupVariants : undefined}
        >
          <SegmentedButtons
            options={SEGMENT_OPTIONS}
            selected={segment}
            onChange={setSegment}
          />
        </motion.div>

        <div className={styles.searchRow}>
          {/* Search input — fade in */}
          <motion.div
            className={searchBarClass}
            variants={animateEntrance ? childFadeVariants : undefined}
            whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.2 }}
          >
            {/* AI icon — subtle glow pulse */}
            <motion.span
              className={styles.sparkleIcon}
              animate={
                animateEntrance
                  ? {
                      filter: [
                        'drop-shadow(0 0 0px rgba(0,104,54,0))',
                        'drop-shadow(0 0 6px rgba(0,104,54,0.4))',
                        'drop-shadow(0 0 0px rgba(0,104,54,0))',
                      ],
                    }
                  : undefined
              }
              transition={{
                duration: 2,
                delay: 0.8,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Icon name="ai_search" size={22} />
            </motion.span>

            <div className={styles.inputArea}>
              <input
                type="text"
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleSearchFocus}
                aria-label="Search RVs"
                aria-expanded={isDropdownOpen}
              />
              {showPlaceholder && (
                <motion.span
                  className={styles.placeholderText}
                  aria-hidden="true"
                  initial={animateEntrance ? { opacity: 0, y: -20, filter: 'blur(5px)' } : false}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.8, duration: 0.4, ease: 'easeOut' }}
                >
                  {typedText}
                  <span className={styles.cursor} />
                </motion.span>
              )}
            </div>

            <span className={styles.divider} />

            <div className={styles.locationGroup}>
              <Icon name="location_pin" size={18} />
              <input
                type="text"
                className={styles.zipInput}
                placeholder="ZIP code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="ZIP code"
                maxLength={5}
              />
            </div>
          </motion.div>

          {/* Search button — fade in */}
          <motion.div
            variants={animateEntrance ? childFadeVariants : undefined}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px rgba(0, 104, 54, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleSearch}
            >
              Search
            </Button>
          </motion.div>
        </div>

        {isDropdownOpen && (
          <div className={styles.dropdownWrap}>
            <SearchDropdown onClose={closeDropdown} />
          </div>
        )}
      </motion.div>

      <DealerSpotlight />
    </section>
  );
}
