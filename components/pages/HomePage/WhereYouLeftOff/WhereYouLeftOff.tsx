import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecentSearches } from '../../../../app/src/hooks/useRecentSearches';
import { useRecentlyViewed } from '../../../../app/src/hooks/useRecentlyViewed';
import Icon from '../../../ui/Icon/Icon';
import styles from './WhereYouLeftOff.module.css';

const SEARCHES_PER_PAGE = 5;
const VIEWED_PER_PAGE = 5;

export default function WhereYouLeftOff() {
  const { searches } = useRecentSearches();
  const { viewed } = useRecentlyViewed();

  if (searches.length === 0 && viewed.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.mainHeading}>Here's where you left off</h2>

      {searches.length > 0 && (
        <SearchesSection searches={searches} />
      )}

      {viewed.length > 0 && (
        <ViewedSection viewed={viewed} />
      )}
    </div>
  );
}

/* ─── Recent searches carousel ───────────────────────────────────── */

function SearchesSection({ searches }: { searches: ReturnType<typeof useRecentSearches>['searches'] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(searches.length / SEARCHES_PER_PAGE);
  const pageItems = useMemo(
    () => searches.slice(page * SEARCHES_PER_PAGE, (page + 1) * SEARCHES_PER_PAGE),
    [searches, page],
  );

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Your recent searches</h3>
        {totalPages > 1 && (
          <div className={styles.headerRight}>
            <span className={styles.pageIndicator}>{page + 1} / {totalPages}</span>
            <div className={styles.navArrows}>
              <button
                type="button"
                className={styles.navArrow}
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Previous searches"
              >
                <Icon name="chevron_left" size={24} />
              </button>
              <button
                type="button"
                className={styles.navArrow}
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next searches"
              >
                <Icon name="chevron_right" size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.carousel}>
        {pageItems.map((search) => (
          <Link key={search.id} to={search.url} className={styles.searchCard}>
            <div className={styles.searchCardContent}>
              <div className={styles.searchCardTitleRow}>
                <Icon name="search" size={24} className={styles.searchIcon} />
                <span className={styles.searchCardTitle}>{search.title}</span>
              </div>
              <div className={styles.searchCardDetails}>
                <span className={styles.searchCardZip}>
                  Near {search.zipCode || '90210'}
                </span>
                <span className={styles.searchCardResults}>
                  {search.resultCount != null ? `${search.resultCount} results` : 'View results'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Recently viewed carousel ───────────────────────────────────── */

function ViewedSection({ viewed }: { viewed: ReturnType<typeof useRecentlyViewed>['viewed'] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(viewed.length / VIEWED_PER_PAGE);
  const pageItems = useMemo(
    () => viewed.slice(page * VIEWED_PER_PAGE, (page + 1) * VIEWED_PER_PAGE),
    [viewed, page],
  );

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>You were eyeing these</h3>
        {totalPages > 1 && (
          <div className={styles.headerRight}>
            <span className={styles.pageIndicator}>{page + 1} / {totalPages}</span>
            <div className={styles.navArrows}>
              <button
                type="button"
                className={styles.navArrow}
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Previous listings"
              >
                <Icon name="chevron_left" size={24} />
              </button>
              <button
                type="button"
                className={styles.navArrow}
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next listings"
              >
                <Icon name="chevron_right" size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.carousel}>
        {pageItems.map((listing) => (
          <Link key={listing.id} to={`/listing/${listing.slug}`} className={styles.viewedCard}>
            <img
              className={styles.viewedThumb}
              src={listing.imageUrl}
              alt={listing.title}
              loading="lazy"
            />
            <div className={styles.viewedInfo}>
              <span className={styles.viewedTitle}>{listing.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
