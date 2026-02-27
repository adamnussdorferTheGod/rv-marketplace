import { useState, useMemo } from 'react';
import { handPickedListings, type HomepageListingData } from '../../../../app/src/data/homepageData';
import Icon from '../../../ui/Icon/Icon';
import HomepageListingCard from '../HomepageListingCard/HomepageListingCard';
import styles from './HandPickedSection.module.css';

type FilterKey = 'Recommended' | 'Used' | 'Nearest' | 'Price drop' | 'Dealer' | 'Private seller' | 'New';

const FILTER_CHIPS: FilterKey[] = [
  'Recommended',
  'Used',
  'Nearest',
  'Price drop',
  'Dealer',
  'Private seller',
  'New',
];

const PAGE_SIZE = 5;

function applyFilter(listings: HomepageListingData[], filter: FilterKey): HomepageListingData[] {
  switch (filter) {
    case 'Recommended':
      return listings;
    case 'Used':
      return listings.filter((l) => l.condition === 'used');
    case 'New':
      return listings.filter((l) => l.condition === 'new');
    case 'Nearest':
      return [...listings].sort((a, b) => {
        const distA = a.dealer.distanceMiles ?? Infinity;
        const distB = b.dealer.distanceMiles ?? Infinity;
        return distA - distB;
      });
    case 'Price drop':
      return listings.filter((l) => l.dealRating === 'great' || l.dealRating === 'good');
    case 'Dealer':
      return listings;
    case 'Private seller':
      return listings;
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
