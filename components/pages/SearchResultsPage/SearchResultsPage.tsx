import { useState } from 'react';
import { useSrpFilters } from '@app/src/hooks/useSrpFilters.ts';
import { RV_TYPE_LABELS } from '@app/src/data/srpTypes.ts';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import SortControls from './SortControls/SortControls';
import styles from './SearchResultsPage.module.css';

const SUBTITLE_TEXT =
  'Browse thousands of new and used RVs for sale from trusted dealers and private sellers across the country. ' +
  'Compare prices, features, and floor plans to find the perfect recreational vehicle for your next adventure. ' +
  'Whether you\'re looking for a compact camper van or a luxurious Class A motorhome, filter by type, make, price, and more to narrow your search.';

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

            {/* Listing grid placeholder -- populated by Plan 02 */}
            <div className={styles.listingGridPlaceholder} />
          </div>
        </div>
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
