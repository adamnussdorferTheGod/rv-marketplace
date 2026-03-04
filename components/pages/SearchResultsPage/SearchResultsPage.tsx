import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSrpFilters } from '@app/src/hooks/useSrpFilters.ts';
import { useIsMobile } from '@app/src/hooks/useIsMobile';
import { useRecentSearches } from '@app/src/hooks/useRecentSearches';
import { RV_TYPE_LABELS } from '@app/src/data/srpTypes.ts';
import type { FilterCriteria } from '@app/src/data/srpTypes.ts';
import { sampleSrpListings } from '@app/src/data/sampleSrpListings.ts';
import { useTowVehicle } from '@components/sections/TowVehicleSetup/TowVehicleContext';
import {
  calculateTowCompatibility,
  isTowableType,
  type TowableRVSpecs,
} from '@app/src/data/towCompatibility.ts';
import type { TowVerdict } from '@app/src/data/towTypes.ts';
import { findNearMissListings } from '@app/src/data/srpFilterEngine.ts';
import { generateSrpSummary } from '@app/src/data/srpSummaryEngine';
import Icon from '../../ui/Icon/Icon';
import SrpSummaryCard from '@components/sections/SrpSummaryCard/SrpSummaryCard';
import ActionChip from '../../ui/ActionChip/ActionChip';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import SortControls from './SortControls/SortControls';
import SortBottomSheet from './SortControls/SortBottomSheet';
import MobileFilterBar from './MobileFilterBar/MobileFilterBar';
import ListingGrid from './ListingGrid/ListingGrid';
import NearMissResults from './NearMissResults/NearMissResults';
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

const NUDGE_CHIPS = [
  'Recommended',
  'Nearest',
  'Price drop',
  'Dealer',
  'Private seller',
  'Sleeps 6+',
  'Under $30K',
  'New',
  'Used',
  'Pet friendly',
  'Towable',
  'Under 30 ft',
  'Bunkhouse',
  'Solar ready',
  'Outdoor kitchen',
] as const;

const SHORT_SUBTITLE = 'Shopping for RVs? Let us help with your purchase experience.';
const FULL_SUBTITLE =
  'Browse thousands of new and used RVs for sale from trusted dealers and private sellers across the country. ' +
  'Compare prices, features, and floor plans to find the perfect recreational vehicle for your next adventure. ' +
  'Whether you\'re looking for a compact camper van or a luxurious Class A motorhome, filter by type, make, price, and more to narrow your search.';

const RESULTS_PER_PAGE = 30;

function buildSearchTitle(filters: FilterCriteria): string {
  const parts: string[] = [];

  if (filters.condition !== 'all') {
    parts.push(filters.condition === 'new' ? 'New' : 'Used');
  }

  if (filters.rvTypes.length === 1) {
    parts.push(RV_TYPE_LABELS[filters.rvTypes[0]]);
  } else if (filters.rvTypes.length > 1) {
    parts.push(`${filters.rvTypes.length} RV types`);
  } else {
    parts.push('RVs');
  }

  if (filters.makes.length === 1) {
    parts.push(`by ${filters.makes[0]}`);
  }

  if (filters.priceMax !== null) {
    parts.push(`under $${(filters.priceMax / 1000).toFixed(0)}K`);
  }

  return parts.join(' ') || 'RV Search';
}

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

  const { savedVehicle, towFilterEnabled } = useTowVehicle();

  // Compute tow verdicts for all results
  const towVerdicts = useMemo(() => {
    if (!savedVehicle) return new Map<string, TowVerdict>();
    const map = new Map<string, TowVerdict>();
    for (const listing of results) {
      if (!isTowableType(listing.rvType) || !listing.gvwr) continue;
      const rvSpecs: TowableRVSpecs = {
        gvwr: listing.gvwr,
        tongueWeight: listing.tongueWeight,
        hitchType: listing.hitchType,
      };
      const result = calculateTowCompatibility(savedVehicle, rvSpecs);
      map.set(listing.id, result.verdict);
    }
    return map;
  }, [savedVehicle, results]);

  // Apply tow filter on top of existing results
  const towFilteredResults = useMemo(() => {
    if (!towFilterEnabled || !savedVehicle) return results;
    return results.filter(listing => {
      const verdict = towVerdicts.get(listing.id);
      // Keep non-towable types (motorhomes), and good/marginal matches
      if (!isTowableType(listing.rvType)) return true;
      return verdict === 'good' || verdict === 'marginal';
    });
  }, [results, towFilterEnabled, savedVehicle, towVerdicts]);

  // Near-miss results when no listings match
  const nearMiss = useMemo(() => {
    if (towFilteredResults.length > 0) return null;
    return findNearMissListings(sampleSrpListings, filters);
  }, [towFilteredResults.length, filters]);

  // Tow verdicts for near-miss listings
  const nearMissTowVerdicts = useMemo(() => {
    if (!savedVehicle || !nearMiss?.listings.length) return new Map<string, TowVerdict>();
    const map = new Map<string, TowVerdict>();
    for (const listing of nearMiss.listings) {
      if (!isTowableType(listing.rvType) || !listing.gvwr) continue;
      const rvSpecs: TowableRVSpecs = {
        gvwr: listing.gvwr,
        tongueWeight: listing.tongueWeight,
        hitchType: listing.hitchType,
      };
      const result = calculateTowCompatibility(savedVehicle, rvSpecs);
      map.set(listing.id, result.verdict);
    }
    return map;
  }, [savedVehicle, nearMiss]);

  // Compute SRP summary data from filtered results
  const summaryData = useMemo(
    () => generateSrpSummary(towFilteredResults, filters),
    [towFilteredResults, filters]
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFullSubtitle, setShowFullSubtitle] = useState(false);
  // Capture scroll restore target during init (before effects overwrite sessionStorage)
  const scrollRestoreRef = useRef<number>(0);
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const stored = sessionStorage.getItem('srpState');
      if (!stored) return 1;
      const state = JSON.parse(stored);
      if (state.url === window.location.pathname + window.location.search) {
        scrollRestoreRef.current = state.scrollY || 0;
        return state.page || 1;
      }
    } catch { /* ignore */ }
    return 1;
  });
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [sharedListOpen, setSharedListOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeNudge, setActiveNudge] = useState<string | null>(null);
  const nudgeRowRef = useRef<HTMLDivElement>(null);
  const [compareListingCount, setCompareListingCount] = useState(0);
  const isMobile = useIsMobile();


  const { activeList } = useCoShopping();

  // ─── Save this search to recent searches ─────────────────────────
  const { saveSearch } = useRecentSearches();
  const savedUrlRef = useRef('');

  useEffect(() => {
    const url = `/search${window.location.search}`;
    // Skip if we already saved this exact URL
    if (url === savedUrlRef.current) return;

    savedUrlRef.current = url;
    const title = buildSearchTitle(filters);
    saveSearch({ title, zipCode: filters.zipCode || '90210', resultCount: totalCount, url });
  }, [filters, totalCount, saveSearch]);

  // Reset to page 1 whenever filters or sort change (skip initial mount
  // so we can restore the page from sessionStorage on return from VDP)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setCurrentPage(1);
  }, [filters, sort]);

  // Save SRP state (page + scroll) to sessionStorage for return navigation
  useEffect(() => {
    const save = () => {
      sessionStorage.setItem('srpState', JSON.stringify({
        url: window.location.pathname + window.location.search,
        page: currentPage,
        scrollY: window.scrollY,
      }));
    };
    save();
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          save();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Restore scroll position on mount (returning from VDP)
  useEffect(() => {
    const scrollY = scrollRestoreRef.current;
    if (scrollY > 0) {
      scrollRestoreRef.current = 0;
      // Delay to run after AppLayout's scroll-to-top and AnimatePresence enter
      const timer = setTimeout(() => window.scrollTo(0, scrollY), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Pagination calculations (use tow-filtered results)
  const displayResults = towFilteredResults;
  const totalPages = Math.ceil(displayResults.length / RESULTS_PER_PAGE);
  const paginatedResults = displayResults.slice(
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
              <div className={styles.sortControlsDesktop}>
                <SortControls sort={sort} onSortChange={setSort} />
                {activeList && activeList.listings.length > 0 && (
                  <button
                    type="button"
                    className={`${styles.sharedListToggle} ${sharedListOpen ? styles.sharedListToggleActive : ''}`}
                    onClick={() => setSharedListOpen(!sharedListOpen)}
                  >
                    <Icon name="favorite" size={20} />
                    Saved RVs
                    <span className={styles.sharedListBadge}>
                      {activeList.listings.length}
                    </span>
                  </button>
                )}
                <div className={styles.viewToggle}>
                  <button
                    type="button"
                    className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.viewToggleBtnActive : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <Icon name="grid_view" size={20} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.viewToggleBtn} ${viewMode === 'list' ? styles.viewToggleBtnActive : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <Icon name="list" size={20} />
                  </button>
                </div>
              </div>
            </div>

            <SrpSummaryCard data={summaryData} />

            {/* Mobile filter/sort bar */}
            <MobileFilterBar
              activeFilterCount={activeFilters.length}
              sort={sort}
              onFilterClick={() => setSidebarOpen(true)}
              onSortClick={() => setSortSheetOpen(true)}
              savedCount={activeList?.listings.length ?? 0}
              onSavedClick={() => setSharedListOpen(true)}
            />

            <FeaturedListings maxItems={5} titleClassName={styles.featuredTitle} />
            <div className={styles.featuredDivider} />

            <ListingGrid
              listings={paginatedResults}
              towVerdicts={towVerdicts}
              viewMode={viewMode}
              afterRow4={
                <>
                <h3 className={styles.nudgeHeading}>Looking for something else?</h3>
                <div className={styles.nudgeWrap}>
                  <button
                    type="button"
                    className={styles.nudgeArrow}
                    onClick={() => nudgeRowRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                    aria-label="Scroll left"
                  >
                    <Icon name="chevron_left" size={20} />
                  </button>
                  <div className={styles.nudgeFadeLeft} />
                  <div className={styles.nudgeRow} ref={nudgeRowRef}>
                    {NUDGE_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        className={`${styles.nudgeChip} ${activeNudge === chip ? styles.nudgeChipActive : ''}`}
                        onClick={() => setActiveNudge(activeNudge === chip ? null : chip)}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                  <div className={styles.nudgeFade} />
                  <button
                    type="button"
                    className={styles.nudgeArrow}
                    onClick={() => nudgeRowRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                    aria-label="Scroll right"
                  >
                    <Icon name="chevron_right" size={20} />
                  </button>
                </div>
                </>
              }
            />

            {nearMiss && nearMiss.listings.length > 0 && (
              <NearMissResults
                listings={nearMiss.listings}
                towVerdicts={nearMissTowVerdicts}
              />
            )}

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
          <div
            className={styles.sharedListSidebar}
            style={compareListingCount > 0 ? { width: Math.min(Math.max(compareListingCount * 180 + 40, 480), 960) } : undefined}
          >
            <div className={styles.sharedListSidebarHeader}>
              <span className={styles.sharedListSidebarTitle}>Saved RVs</span>
              <div className={styles.sharedListHeaderActions}>
                <button
                  type="button"
                  className={styles.sharedListInviteBtn}
                  onClick={() => setShowInviteModal(true)}
                  title="Invite a co-shopper"
                >
                  <Icon name="person_add" size={20} />
                  <span>Invite</span>
                </button>
                <button
                  type="button"
                  className={styles.sharedListCloseBtn}
                  onClick={() => setSharedListOpen(false)}
                  aria-label="Close saved RVs"
                >
                  <Icon name="x_close" size={24} />
                </button>
              </div>
            </div>
            <div className={styles.sharedListSidebarBody}>
              <SharedListPanel
                onTabChange={(tab, count) => setCompareListingCount(tab === 'compare' ? count : 0)}
                showInvite={showInviteModal}
                onShowInviteChange={setShowInviteModal}
              />
            </div>
          </div>
        </>
      )}

      <AiModePanel />
    </div>
    </AiModeProvider>
  );
}
