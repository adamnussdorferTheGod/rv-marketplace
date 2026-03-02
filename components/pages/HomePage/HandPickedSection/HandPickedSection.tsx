import { useState, useMemo } from 'react';
import { handPickedListings, type HomepageListingData } from '../../../../app/src/data/homepageData';
import Icon from '../../../ui/Icon/Icon';
import HomepageListingCard from '../HomepageListingCard/HomepageListingCard';
import styles from './HandPickedSection.module.css';

type FilterKey = 'Recommended' | 'Nearest' | 'Price drop' | 'Dealer' | 'Private seller' | 'Sleeps 6+' | 'Under $30K' | 'New' | 'Used';

const FILTER_CHIPS: FilterKey[] = [
  'Recommended',
  'Nearest',
  'Price drop',
  'Dealer',
  'Private seller',
  'Sleeps 6+',
  'Under $30K',
  'New',
  'Used',
];

const PAGE_SIZE = 5;

function seededShuffle(arr: HomepageListingData[], seed: number): HomepageListingData[] {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function applyFilter(listings: HomepageListingData[], filter: FilterKey): HomepageListingData[] {
  const seed = hashString(filter);
  switch (filter) {
    case 'Recommended':
      return listings;
    case 'Used':
      return seededShuffle(listings.filter((l) => l.condition === 'used'), seed);
    case 'New':
      return seededShuffle(listings.filter((l) => l.condition === 'new'), seed);
    case 'Nearest':
      return [...listings].sort((a, b) => {
        const distA = a.dealer.distanceMiles ?? Infinity;
        const distB = b.dealer.distanceMiles ?? Infinity;
        return distA - distB;
      });
    case 'Price drop':
      return seededShuffle(listings.filter((l) => l.dealRating === 'great' || l.dealRating === 'good'), seed);
    case 'Dealer':
      return seededShuffle(listings, seed);
    case 'Private seller':
      return seededShuffle(listings, seed + 1);
    case 'Sleeps 6+':
      return seededShuffle(listings, seed + 2);
    case 'Under $30K':
      return seededShuffle(listings.filter((l) => l.currentPrice < 30000), seed);
  }
}

export default function HandPickedSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('Recommended');
  const [pageIndex, setPageIndex] = useState(0);

  const filteredListings = useMemo(
    () => applyFilter(handPickedListings, activeFilter),
    [activeFilter],
  );

  const totalPages = Math.ceil(filteredListings.length / PAGE_SIZE);
  const safePageIndex = Math.min(pageIndex, totalPages - 1);
  const start = safePageIndex * PAGE_SIZE;
  const pageListings = filteredListings.slice(start, start + PAGE_SIZE);

  function handleFilterChange(chip: FilterKey) {
    setActiveFilter(chip);
    setPageIndex(0);
  }

  return (
    <section className={styles.section}>
      <div className={styles.chipRow}>
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`${styles.chip} ${activeFilter === chip ? styles.chipActive : ''}`}
            onClick={() => handleFilterChange(chip)}
          >
            {chip}
          </button>
        ))}
        {totalPages > 1 && (
          <div className={styles.navArrows}>
            <button
              type="button"
              className={styles.navArrow}
              onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
              disabled={safePageIndex === 0}
              aria-label="Previous page"
            >
              <Icon name="chevron_left" size={24} />
            </button>
            <button
              type="button"
              className={styles.navArrow}
              onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
              disabled={safePageIndex === totalPages - 1}
              aria-label="Next page"
            >
              <Icon name="chevron_right" size={24} />
            </button>
          </div>
        )}
      </div>

      {pageListings.length > 0 ? (
        <div className={styles.grid}>
          {pageListings.map((listing) => (
            <HomepageListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>No listings match this filter</p>
      )}
    </section>
  );
}
