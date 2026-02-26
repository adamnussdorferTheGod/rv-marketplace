import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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

function useTypewriter(phrases: string[], active: boolean) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) return;

    const phrase = phrases[phraseIndex];

    if (!deleting && charIndex < phrase.length) {
      // Typing forward
      const id = setTimeout(() => setCharIndex((c) => c + 1), 70);
      return () => clearTimeout(id);
    }

    if (!deleting && charIndex === phrase.length) {
      // Pause at full text, then start deleting
      const id = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(id);
    }

    if (deleting && charIndex > 0) {
      // Deleting
      const id = setTimeout(() => setCharIndex((c) => c - 1), 35);
      return () => clearTimeout(id);
    }

    if (deleting && charIndex === 0) {
      // Move to next phrase
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }
  }, [phrases, phraseIndex, charIndex, deleting, active]);

  // Reset when deactivated
  useEffect(() => {
    if (!active) {
      setCharIndex(0);
      setDeleting(false);
    }
  }, [active]);

  return phrases[phraseIndex].slice(0, charIndex);
}

export default function HeroBanner() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState<HeroSegment>('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const showPlaceholder = !searchQuery && !isDropdownOpen;
  const typedText = useTypewriter(PLACEHOLDER_PHRASES, showPlaceholder);

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

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heading}>Shop the largest RV marketplace</h1>
      </div>

      <div className={styles.searchCard} ref={searchContainerRef}>
        <div className={styles.segmentedWrap}>
          <SegmentedButtons
            options={SEGMENT_OPTIONS}
            selected={segment}
            onChange={setSegment}
          />
        </div>

        <div className={styles.searchRow}>
          <div className={searchBarClass}>
            <span className={styles.sparkleIcon}>
              <Icon name="ai_search" size={22} />
            </span>

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
                <span className={styles.placeholderText} aria-hidden="true">
                  {typedText}
                  <span className={styles.cursor} />
                </span>
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
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        {isDropdownOpen && (
          <div className={styles.dropdownWrap}>
            <SearchDropdown onClose={closeDropdown} />
          </div>
        )}
      </div>

      <DealerSpotlight />
    </section>
  );
}
