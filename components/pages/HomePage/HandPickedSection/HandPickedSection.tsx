import { useState, useMemo } from 'react';
import { handPickedListings, type HomepageListingData } from '../../../../app/src/data/homepageData';
import ActionChip from '../../../ui/ActionChip/ActionChip';
import HomepageListingCard from '../HomepageListingCard/HomepageListingCard';
import ListingCarousel from '../ListingCarousel/ListingCarousel';
import styles from './HandPickedSection.module.css';

type FilterKey = 'Recommended' | 'Used' | 'New' | 'Nearest' | 'Deals' | 'Travel trailers' | 'Class A';

const FILTER_CHIPS: FilterKey[] = [
  'Recommended',
  'Used',
  'New',
  'Nearest',
  'Deals',
  'Travel trailers',
  'Class A',
];

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
    case 'Deals':
      return listings.filter((l) => l.dealRating === 'great' || l.dealRating === 'good');
    case 'Travel trailers':
      return listings.filter((l) => l.rvType === 'travel-trailer');
    case 'Class A':
      return listings.filter((l) => l.rvType === 'class-a');
  }
}

export default function HandPickedSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('Recommended');

  const filteredListings = useMemo(
    () => applyFilter(handPickedListings, activeFilter),
    [activeFilter],
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>RVs hand-picked for you</h2>

      <div className={styles.chipRow}>
        {FILTER_CHIPS.map((chip) => (
          <ActionChip
            key={chip}
            label={chip}
            onClick={() => setActiveFilter(chip)}
            className={activeFilter === chip ? styles.activeChip : undefined}
          />
        ))}
      </div>

      {filteredListings.length > 0 ? (
        <ListingCarousel>
          {filteredListings.map((listing) => (
            <HomepageListingCard key={listing.id} listing={listing} />
          ))}
        </ListingCarousel>
      ) : (
        <p className={styles.emptyMessage}>No listings match this filter</p>
      )}
    </section>
  );
}
