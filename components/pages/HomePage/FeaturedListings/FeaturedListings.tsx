import { useState } from 'react';
import { featuredListings } from '../../../../app/src/data/homepageData';
import HomepageListingCard from '../HomepageListingCard/HomepageListingCard';
import Icon from '../../../ui/Icon/Icon';
import styles from './FeaturedListings.module.css';

const PAGE_SIZE = 10;
const totalPages = Math.ceil(featuredListings.length / PAGE_SIZE);

export default function FeaturedListings() {
  const [pageIndex, setPageIndex] = useState(0);

  const start = pageIndex * PAGE_SIZE;
  const pageListings = featuredListings.slice(start, start + PAGE_SIZE);
  const showArrows = totalPages > 1;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured listings</h2>
        {showArrows && (
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
              disabled={pageIndex === 0}
              aria-label="Previous page"
            >
              <Icon name="chevron_left" size={20} />
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
              disabled={pageIndex === totalPages - 1}
              aria-label="Next page"
            >
              <Icon name="chevron_right" size={20} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {pageListings.map((listing) => (
          <HomepageListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
