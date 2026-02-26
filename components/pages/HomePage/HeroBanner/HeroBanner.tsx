import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import Button from '@components/ui/Button/Button';
import Icon from '@components/ui/Icon/Icon';
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

export default function HeroBanner() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState<HeroSegment>('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSearch = () => {
    navigate('/search');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heading}>Shop the largest RV marketplace</h1>

        <div className={styles.segmentedWrap}>
          <SegmentedButtons
            options={SEGMENT_OPTIONS}
            selected={segment}
            onChange={setSegment}
          />
        </div>

        <div className={styles.searchBar}>
          <span className={styles.sparkleIcon}>
            <Icon name="sparkles" size={22} />
          </span>

          <div className={styles.inputArea}>
            <input
              type="text"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search RVs"
            />
            {!searchQuery && (
              <span className={styles.placeholderText} aria-hidden="true">
                {PLACEHOLDER_PHRASES.map((phrase, i) => (
                  <span
                    key={phrase}
                    className={styles.placeholderPhrase}
                    style={{ animationDelay: `${i * 3.5}s` }}
                  >
                    {phrase}
                  </span>
                ))}
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

          <Button
            variant="primary"
            size="lg"
            leadingIcon="search"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>

      <DealerSpotlight />
    </section>
  );
}
