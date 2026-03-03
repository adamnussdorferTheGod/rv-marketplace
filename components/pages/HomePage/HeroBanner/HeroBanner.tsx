import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import Button from '@components/ui/Button/Button';
import Select from '@components/ui/Select/Select';
import Icon from '@components/ui/Icon/Icon';
import SearchDropdown from './SearchDropdown';
import SearchSuggestions from './SearchSuggestions';
import { useSearchSuggestions } from './useSearchSuggestions';
import { buildSearchURL } from './nlParser';
import { RV_TYPES, SELL_CATALOG, makeLabelFromSlug } from './heroData';
import DealerSpotlight from './DealerSpotlight';
import styles from './HeroBanner.module.css';

type HeroSegment = 'shop' | 'sell';

const SEGMENT_OPTIONS: { value: HeroSegment; label: string }[] = [
  { value: 'shop', label: 'Shop RVs' },
  { value: 'sell', label: 'Sell my RV' },
];

const HERO_IMAGES = [
  { src: '/images/hero-rv-4.jpg', position: '70% 60%' },
  { src: '/images/hero-rv-2.jpg', position: '50% 80%' },
  { src: '/images/hero-rv-3.jpg', position: '65% 72%' },
  { src: '/images/hero-rv.png', position: '10% 75%' },
  { src: '/images/hero-rv-5.jpg', position: '50% 40%' },
];

const HERO_ROTATE_MS = 8000;

const PLACEHOLDER_PHRASES = [
  'Try: Family-friendly RVs for 4',
  'Try: Class A under $80,000',
  'Try: Travel trailers near me',
];

const RV_COUNT_BASE = 234191;
const RV_COUNT_TICK_MS = 4200; // new listing every ~4.2s

const PHRASE_INTERVAL = 3500; // ms between phrase swaps

/* ── hooks ── */

/** Animated counter that smoothly rolls through digits. */
function AnimatedCount({ target }: { target: number }) {
  const motionVal = useMotionValue(target - 200);
  const spring = useSpring(motionVal, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  const [text, setText] = useState(target.toLocaleString());

  useEffect(() => {
    motionVal.set(target);
  }, [target, motionVal]);

  useEffect(() => {
    return display.on('change', (v) => setText(v));
  }, [display]);

  return <>{text}</>;
}

/** Fake-dynamic RV count that ticks up over time. */
function useRvCount(base: number, tickMs: number) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 80) + 20);
    }, tickMs);
    return () => clearInterval(id);
  }, [tickMs]);
  return count;
}

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

function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

/* ── component ── */

export default function HeroBanner() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState<HeroSegment>('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchRowRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  /* ── Sell form state ── */
  const [sellRvType, setSellRvType] = useState('');
  const [sellMake, setSellMake] = useState('');
  const [sellModel, setSellModel] = useState('');

  const rvTypeOptions = useMemo(
    () => RV_TYPES.map((t) => ({ value: t.slug, label: t.label })),
    [],
  );

  // Makes depend on selected RV type
  const makeOptions = useMemo(() => {
    const makeSlugs = sellRvType ? Object.keys(SELL_CATALOG[sellRvType] ?? {}) : [];
    return makeSlugs.map((slug) => ({ value: slug, label: makeLabelFromSlug(slug) }));
  }, [sellRvType]);

  // Models depend on selected RV type + make
  const modelOptions = useMemo(() => {
    const models = (sellRvType && sellMake) ? (SELL_CATALOG[sellRvType]?.[sellMake] ?? []) : [];
    return models.map((m) => ({ value: m.toLowerCase().replace(/\s+/g, '-'), label: m }));
  }, [sellRvType, sellMake]);

  const handleRvTypeChange = (value: string) => {
    setSellRvType(value);
    setSellMake('');  // reset downstream
    setSellModel('');
  };

  const handleMakeChange = (value: string) => {
    setSellMake(value);
    setSellModel(''); // reset model when make changes
  };

  const handleSell = () => {
    const params = new URLSearchParams();
    if (sellRvType) params.set('type', sellRvType);
    if (sellMake) params.set('make', sellMake);
    if (sellModel) params.set('model', sellModel);
    navigate(`/sell${params.toString() ? `?${params}` : ''}`);
  };

  const showPlaceholder = !searchQuery && !isDropdownOpen;
  const phraseIndex = usePhraseCycle(PLACEHOLDER_PHRASES.length, PHRASE_INTERVAL, showPlaceholder);
  const heroImageIndex = usePhraseCycle(HERO_IMAGES.length, HERO_ROTATE_MS, true);
  const rvCount = useRvCount(RV_COUNT_BASE, RV_COUNT_TICK_MS);
  const reducedMotion = usePrefersReducedMotion();
  const animateEntrance = !reducedMotion;
  const isMobile = useIsMobile();

  const { suggestions, isLoadingAI, nlParseResult, activeIndex, setActiveIndex } =
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

    if (nlParseResult) {
      // NL query: navigate with parsed filter params
      let url = `/search${buildSearchURL(nlParseResult.filters, nlParseResult.sort)}`;
      // Append zip code if provided
      if (zipCode.match(/^\d{5}$/)) {
        const sep = url.includes('?') ? '&' : '?';
        url += `${sep}zip=${zipCode}`;
      }
      navigate(url);
    } else if (searchQuery.trim()) {
      // Plain text: navigate with keyword param
      let url = `/search?keyword=${encodeURIComponent(searchQuery.trim())}`;
      if (zipCode.match(/^\d{5}$/)) {
        url += `&zip=${zipCode}`;
      }
      navigate(url);
    } else {
      navigate('/search');
    }
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
    if (isMobile) {
      navigate('/mobile-search');
      return;
    }
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
      {/* ── Background layer — crossfading images ── */}
      <div className={styles.heroImageWrap}>
        <div className={styles.heroBackground}>
          <AnimatePresence initial={false}>
            <motion.img
              key={heroImageIndex}
              src={HERO_IMAGES[heroImageIndex].src}
              alt=""
              className={styles.heroBackgroundImg}
              style={{ objectPosition: HERO_IMAGES[heroImageIndex].position }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>
        <div className={styles.heroOverlay} />
      </div>

      {/* ── Heading with per-word stagger reveal ── */}
      <div className={styles.heroContent}>
        <h1 className={styles.heading}>
          {['Shop', '234,191', 'used', '&', 'new', 'RVs'].map((word, i) => (
            <motion.span
              key={`heading-${i}`}
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
            onChange={(val) => { setSegment(val); closeDropdown(); }}
            animated
          />
        </div>

        {/* Inner wrapper — motion handles entrance fade only */}
        <motion.div
          className={styles.cardInner}
          initial={animateEntrance ? { opacity: 0, filter: 'blur(6px)' } : false}
          animate={{ opacity: 1, filter: 'none' }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {segment === 'shop' ? (
              <motion.div
                key="shop"
                ref={searchRowRef}
                className={styles.searchRow}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
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
                      readOnly={isMobile}
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
              </motion.div>
            ) : (
              <motion.div
                key="sell"
                className={styles.sellForm}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <div className={styles.sellFields}>
                  <Select
                    options={rvTypeOptions}
                    placeholder="RV type"
                    value={sellRvType}
                    onChange={handleRvTypeChange}
                    aria-label="RV type"
                  />
                  <Select
                    options={makeOptions}
                    placeholder="Make"
                    value={sellMake}
                    onChange={handleMakeChange}
                    aria-label="Make"
                  />
                  <Select
                    options={modelOptions}
                    placeholder="Model"
                    value={sellModel}
                    onChange={setSellModel}
                    aria-label="Model"
                  />
                </div>
                <Button variant="primary" size="lg" onClick={handleSell} className={styles.sellTextBtn}>
                  Sell
                </Button>
                <button className={styles.sellIconBtn} onClick={handleSell} aria-label="Sell">
                  <Icon name="search" size={22} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dropdown inside card — follows card position */}
        {isDropdownOpen && (
          <div ref={dropdownRef} className={styles.dropdownWrap}>
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
      </div>

      <DealerSpotlight />
    </section>
  );
}
