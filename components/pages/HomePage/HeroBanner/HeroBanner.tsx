import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import Button from '@components/ui/Button/Button';
import Icon from '@components/ui/Icon/Icon';
import SearchDropdown from './SearchDropdown';
import SearchSuggestions from './SearchSuggestions';
import { useSearchSuggestions } from './useSearchSuggestions';
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

const HEADING_WORDS = ['Shop', 'the', 'largest', 'RV', 'marketplace'];

const PHRASE_INTERVAL = 3500; // ms between phrase swaps

/* ── hooks ── */

/** Cycles through phrases on a timer. Returns current index. */
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const showPlaceholder = !searchQuery && !isDropdownOpen;
  const phraseIndex = usePhraseCycle(PLACEHOLDER_PHRASES.length, PHRASE_INTERVAL, showPlaceholder);
  const reducedMotion = usePrefersReducedMotion();
  const animateEntrance = !reducedMotion;

  const { suggestions, isLoadingAI, activeIndex, setActiveIndex } =
    useSearchSuggestions(searchQuery);

  const hasSuggestions = searchQuery.trim().length > 0;

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  /* Lock body scroll when dropdown is open */
  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isDropdownOpen]);

  /* Close on click outside */
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const inCard = searchContainerRef.current?.contains(target);
      const inDropdown = dropdownRef.current?.contains(target);
      if (!inCard && !inDropdown) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isDropdownOpen, closeDropdown]);

  /* Close on Escape key */
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDropdown();
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isDropdownOpen, closeDropdown]);

  const handleSearch = () => {
    closeDropdown();
    navigate('/search');
  };

  const handleSuggestionSelect = useCallback(
    (item: { navigateTo: string }) => {
      closeDropdown();
      navigate(item.navigateTo);
    },
    [closeDropdown, navigate],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen || !hasSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') handleSearch();
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(activeIndex < suggestions.length - 1 ? activeIndex + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(activeIndex > 0 ? activeIndex - 1 : suggestions.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSuggestionSelect(suggestions[activeIndex]);
        } else {
          handleSearch();
        }
        break;
    }
  };

  const handleSearchFocus = () => {
    setIsDropdownOpen(true);
  };

  const searchBarClass = isDropdownOpen
    ? `${styles.searchBar} ${styles.searchBarOpen}`
    : styles.searchBar;

  const searchCardClass = isDropdownOpen
    ? `${styles.searchCard} ${styles.searchCardOpen}`
    : styles.searchCard;

  return (
    <section
      className={styles.hero}
      ref={heroRef}
    >
      {/* ── Background layer ── */}
      <div className={styles.heroImageWrap}>
        <div className={styles.heroBackground} />
        <div className={styles.heroOverlay} />
      </div>

      {/* ── Heading with per-word stagger reveal ── */}
      <div className={styles.heroContent}>
        <h1 className={styles.heading}>
          {HEADING_WORDS.map((word, i) => (
            <motion.span
              key={word}
              style={{ display: 'inline-block' }}
              initial={animateEntrance ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.45, ease: 'easeOut' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* ── Lightbox backdrop when search is expanded ── */}
      {isDropdownOpen && (
        <div className={styles.searchBackdrop} onClick={closeDropdown} />
      )}

      {/* ── Search card (CSS handles translateY + float + breathing shadow) ── */}
      <div className={searchCardClass} ref={searchContainerRef}>
        <div className={styles.segmentedWrap}>
          <SegmentedButtons
            options={SEGMENT_OPTIONS}
            selected={segment}
            onChange={setSegment}
            animated
          />
        </div>

        {/* Inner wrapper — motion handles entrance fade only */}
        <motion.div
          className={styles.cardInner}
          initial={animateEntrance ? { opacity: 0, filter: 'blur(6px)' } : false}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        >
          <div className={styles.searchRow}>
            <div className={searchBarClass}>
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
                  delay: 1,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Icon name="ai_search" size={24} />
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
                  aria-controls={hasSuggestions ? 'search-suggestions' : undefined}
                  aria-activedescendant={
                    hasSuggestions && activeIndex >= 0
                      ? `suggestion-${activeIndex}`
                      : undefined
                  }
                />

                {/* Phrase crossfade placeholder */}
                <AnimatePresence mode="wait">
                  {showPlaceholder && (
                    <motion.span
                      key={phraseIndex}
                      className={styles.placeholderText}
                      aria-hidden="true"
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {PLACEHOLDER_PHRASES[phraseIndex]}
                      <span className={styles.cursor} />
                    </motion.span>
                  )}
                </AnimatePresence>
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
            </div>

            <Button variant="primary" size="lg" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </motion.div>

      </div>

      {/* Dropdown rendered outside card to avoid transform scroll issues */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className={styles.dropdownWrap}
          style={{
            position: 'fixed',
            top: searchContainerRef.current
              ? searchContainerRef.current.getBoundingClientRect().bottom + 'px'
              : '50%',
            left: searchContainerRef.current
              ? searchContainerRef.current.getBoundingClientRect().left + 'px'
              : undefined,
            width: searchContainerRef.current
              ? searchContainerRef.current.getBoundingClientRect().width + 'px'
              : undefined,
          }}
        >
          {hasSuggestions ? (
            <SearchSuggestions
              suggestions={suggestions}
              query={searchQuery}
              activeIndex={activeIndex}
              isLoadingAI={isLoadingAI}
              onSelect={handleSuggestionSelect}
              onClose={closeDropdown}
            />
          ) : (
            <SearchDropdown onClose={closeDropdown} />
          )}
        </div>
      )}

      <DealerSpotlight />
    </section>
  );
}
