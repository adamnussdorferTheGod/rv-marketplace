import { useState, useEffect, useCallback } from 'react';
import { useSrpFilters } from '@app/src/hooks/useSrpFilters.ts';
import { RV_TYPE_LABELS } from '@app/src/data/srpTypes.ts';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import SortControls from './SortControls/SortControls';
import ListingGrid from './ListingGrid/ListingGrid';
import Pagination from './Pagination/Pagination';
import DealerAdCard from './DealerAdCard/DealerAdCard';
import AdSlot from '@components/ui/AdSlot/AdSlot';
import PopularSearches from './PopularSearches/PopularSearches';
import SrpDisclaimer from './SrpDisclaimer/SrpDisclaimer';
import styles from './SearchResultsPage.module.css';

const SUBTITLE_TEXT =
  'Browse thousands of new and used RVs for sale from trusted dealers and private sellers across the country. ' +
  'Compare prices, features, and floor plans to find the perfect recreational vehicle for your next adventure. ' +
  'Whether you\'re looking for a compact camper van or a luxurious Class A motorhome, filter by type, make, price, and more to narrow your search.';

const RESULTS_PER_PAGE = 30;

export default function SearchResultsPage() {
  const {
    filters,
    sort,
    results,
    totalCount,
    activeFilters,
    setFilter,
    toggleArrayFilter,
    removeFilter,
    clearAll,
    setSort,
  } = useSrpFilters();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFullSubtitle, setShowFullSubtitle] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  // Pagination calculations
  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  // Sponsored/featured listings for interleaved showcase
  const sponsoredListings = results
    .filter((l) => l.isSponsored || l.isFeatured)
    .slice(0, 5);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Derive active RV type label for breadcrumbs and title
  const activeRvTypeLabel =
    filters.rvTypes.length === 1
      ? RV_TYPE_LABELS[filters.rvTypes[0]]
      : undefined;

  const titleText = activeRvTypeLabel
    ? `New and used ${activeRvTypeLabel} RVs for sale`
    : 'New and used RVs for sale';

  return (
    <div className={styles.searchResultsPage}>
      <div className={styles.leaderboardAd}>
        <AdSlot width={728} height={90} label="Leaderboard Ad" />
      </div>
      <div className={styles.content}>
        <div className={styles.twoColumn}>
          {/* Left: Filter sidebar (330px desktop, overlay mobile) */}
          <div className={styles.sidebarColumn}>
            <FilterSidebar
              filters={filters}
              totalCount={totalCount}
              activeFilters={activeFilters}
              setFilter={setFilter}
              toggleArrayFilter={toggleArrayFilter}
              removeFilter={removeFilter}
              clearAll={clearAll}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            <div className={styles.sidebarAd}>
              <DealerAdCard
                dealerName="Roy Robinson RV"
                dealerPhoto="https://images.unsplash.com/photo-1562613532-9740b8b5c823?w=400&h=250&fit=crop"
                description="Your trusted RV dealer since 1969. Browse our selection of new and pre-owned motorhomes, travel trailers, and fifth wheels."
                ctaLabel="View Inventory"
                ctaHref="/search?makes=forest-river"
              />
            </div>
          </div>

          {/* Right: Content area */}
          <div className={styles.mainColumn}>
            <Breadcrumbs rvType={activeRvTypeLabel} />

            <h1 className={styles.title}>{titleText}</h1>

            <p
              className={`${styles.subtitle}${!showFullSubtitle ? ` ${styles.subtitleCollapsed}` : ''}`}
            >
              {SUBTITLE_TEXT}
            </p>
            <button
              type="button"
              className={styles.showMore}
              onClick={() => setShowFullSubtitle(!showFullSubtitle)}
            >
              {showFullSubtitle ? 'Show less' : 'Show more'}
            </button>

            <SortControls sort={sort} onSortChange={setSort} />

            <ListingGrid
              listings={paginatedResults}
              sponsoredListings={sponsoredListings}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={results.length}
              resultsPerPage={RESULTS_PER_PAGE}
              onPageChange={handlePageChange}
            />

            <SrpDisclaimer />
          </div>
        </div>

        <PopularSearches />
      </div>

      {/* Mobile filter button */}
      <button
        type="button"
        className={styles.mobileFilterBtn}
        onClick={() => setSidebarOpen(true)}
      >
        Filter{activeFilters.length > 0 ? ` (${activeFilters.length})` : ''}
      </button>
    </div>
  );
}
