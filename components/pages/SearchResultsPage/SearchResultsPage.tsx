import { useState, useEffect, useCallback } from 'react';
import { useSrpFilters } from '@app/src/hooks/useSrpFilters.ts';
import { useIsMobile } from '@app/src/hooks/useIsMobile';
import { RV_TYPE_LABELS } from '@app/src/data/srpTypes.ts';
import { sampleSrpListings } from '@app/src/data/sampleSrpListings.ts';
import Icon from '../../ui/Icon/Icon';
import ActionChip from '../../ui/ActionChip/ActionChip';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import SortControls from './SortControls/SortControls';
import SortBottomSheet from './SortControls/SortBottomSheet';
import MobileFilterBar from './MobileFilterBar/MobileFilterBar';
import ListingGrid from './ListingGrid/ListingGrid';
import Pagination from './Pagination/Pagination';
import SellOnRvTrader from './FilterSidebar/SellOnRvTrader';
import AdSlot from '@components/ui/AdSlot/AdSlot';
import PopularSearches from './PopularSearches/PopularSearches';
import SrpDisclaimer from './SrpDisclaimer/SrpDisclaimer';
import FeaturedListings from '../HomePage/FeaturedListings/FeaturedListings';
import { AiModeProvider } from '@components/sections/AiMode/AiModeContext';
import AiModePanel from '@components/sections/AiMode/AiModePanel/AiModePanel';
import SharedListPanel from '../../sections/CoShopping/SharedListPanel/SharedListPanel';
import { useCoShopping } from '../../sections/CoShopping/CoShoppingContext';
import styles from './SearchResultsPage.module.css';

const SHORT_SUBTITLE = 'Shopping for RVs? Let us help with your purchase experience.';
const FULL_SUBTITLE =
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
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [sharedListOpen, setSharedListOpen] = useState(false);
  const isMobile = useIsMobile();

  const { activeList } = useCoShopping();

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
    <AiModeProvider>
    <div className={styles.searchResultsPage}>
      <div className={styles.leaderboardAd}>
        <AdSlot width={728} height={90} label="Leaderboard Ad" />
      </div>

      <div className={styles.content}>
        {/* Mobile ad banner */}
        <div className={styles.mobileAdBanner}>
          <AdSlot width={390} height={100} label="Mobile Ad" />
        </div>

        <div className={styles.twoColumn}>
          {/* Left: Filter sidebar (330px desktop, overlay mobile) */}
          <div className={styles.sidebarColumn}>
            <FilterSidebar
              filters={filters}
              totalCount={totalCount}
              activeFilters={activeFilters}
              allListings={sampleSrpListings}
              setFilter={setFilter}
              toggleArrayFilter={toggleArrayFilter}
              removeFilter={removeFilter}
              clearAll={clearAll}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            <div className={styles.sidebarExtra}>
              <SellOnRvTrader />
            </div>

            <div className={styles.sidebarAd}>
              <AdSlot width={300} height={250} label="Ad: 300x250" />
            </div>
            <div className={styles.sidebarAd}>
              <AdSlot width={300} height={600} label="Ad: 300x600" />
            </div>
          </div>

          {/* Right: Content area */}
          <div className={styles.mainColumn}>
            <div className={styles.headerRow}>
              <div className={styles.headerLeft}>
                <Breadcrumbs rvType={activeRvTypeLabel} />
                <h1 className={styles.title}>{titleText}</h1>
                {!showFullSubtitle ? (
                  <div className={styles.subtitleRow}>
                    <span className={styles.subtitle}>{SHORT_SUBTITLE}</span>
                    <button
                      type="button"
                      className={styles.showMore}
                      onClick={() => setShowFullSubtitle(true)}
                    >
                      Show more
                      <Icon name="expand_more" size={20} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className={styles.subtitleFull}>{FULL_SUBTITLE}</p>
                    <button
                      type="button"
                      className={styles.showMore}
                      onClick={() => setShowFullSubtitle(false)}
                    >
                      Show less
                      <Icon name="expand_less" size={20} />
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                className={`${styles.sharedListToggle} ${sharedListOpen ? styles.sharedListToggleActive : ''}`}
                onClick={() => setSharedListOpen(!sharedListOpen)}
              >
                <Icon name="favorite" size={20} />
                Saved RVs
                {activeList && activeList.listings.length > 0 && (
                  <span className={styles.sharedListBadge}>
                    {activeList.listings.length}
                  </span>
                )}
              </button>
              <div className={styles.sortControlsDesktop}>
                <SortControls sort={sort} onSortChange={setSort} />
              </div>
            </div>

            {/* Mobile filter/sort bar */}
            <MobileFilterBar
              activeFilterCount={activeFilters.length}
              sort={sort}
              onFilterClick={() => setSidebarOpen(true)}
              onSortClick={() => setSortSheetOpen(true)}
            />

            <FeaturedListings maxItems={5} titleClassName={styles.featuredTitle} />
            <div className={styles.featuredDivider} />

            <ListingGrid
              listings={paginatedResults}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={results.length}
              resultsPerPage={RESULTS_PER_PAGE}
              onPageChange={handlePageChange}
            />

            {/* Search suggestion chips (mobile only) */}
            {isMobile && (
              <div className={styles.searchSuggestions}>
                <ActionChip label="New travel trailers" />
                <ActionChip label="Used travel trailers" />
              </div>
            )}

            <SrpDisclaimer />
          </div>
        </div>

        <PopularSearches />
      </div>

      {/* Mobile sort bottom sheet */}
      <SortBottomSheet
        isOpen={sortSheetOpen}
        sort={sort}
        onSortChange={setSort}
        onClose={() => setSortSheetOpen(false)}
      />

      {sharedListOpen && (
        <>
          <div className={styles.sharedListBackdrop} onClick={() => setSharedListOpen(false)} />
          <div className={styles.sharedListSidebar}>
            <div className={styles.sharedListSidebarHeader}>
              <span className={styles.sharedListSidebarTitle}>Saved RVs</span>
              <button
                type="button"
                className={styles.sharedListCloseBtn}
                onClick={() => setSharedListOpen(false)}
                aria-label="Close saved RVs"
              >
                <Icon name="x_close" size={20} />
              </button>
            </div>
            <div className={styles.sharedListSidebarBody}>
              <SharedListPanel />
            </div>
          </div>
        </>
      )}

      <AiModePanel />
    </div>
    </AiModeProvider>
  );
}
