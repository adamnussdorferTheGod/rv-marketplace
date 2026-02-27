import type { FilterCriteria, ActiveFilter, RVType } from '@app/src/data/srpTypes.ts';
import Icon from '@components/ui/Icon/Icon';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import CollapsibleSection from './CollapsibleSection';
import RVTypeFilter from './RVTypeFilter';
import MakeModelFilter from './MakeModelFilter';
import PriceFilter from './PriceFilter';
import AdditionalFilters from './AdditionalFilters';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  filters: FilterCriteria;
  totalCount: number;
  activeFilters: ActiveFilter[];
  setFilter: <K extends keyof FilterCriteria>(
    key: K,
    value: FilterCriteria[K],
  ) => void;
  toggleArrayFilter: <K extends keyof FilterCriteria>(
    key: K,
    value: string,
  ) => void;
  removeFilter: (activeFilter: ActiveFilter) => void;
  clearAll: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const RADIUS_OPTIONS = [25, 50, 100, 150, 200] as const;

const CONDITION_OPTIONS: { value: 'all' | 'new' | 'used'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
];

export default function FilterSidebar({
  filters,
  totalCount,
  activeFilters,
  setFilter,
  toggleArrayFilter,
  removeFilter,
  clearAll,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const sidebarClassName = `${styles.sidebar}${isOpen ? ` ${styles.open}` : ''}`;

  return (
    <aside className={sidebarClassName}>
      {/* Mobile overlay header */}
      <div className={styles.mobileHeader}>
        <span className={styles.mobileTitle}>Filters</span>
        <button
          className={styles.mobileClose}
          onClick={onClose}
          type="button"
          aria-label="Close filters"
        >
          <Icon name="x_close" size={24} />
        </button>
      </div>

      <div className={styles.sidebarContent}>
        {/* 1. Result count header */}
        <div className={styles.header}>
          <span className={styles.resultCount}>
            {totalCount.toLocaleString()} results
          </span>
          {activeFilters.length > 0 && (
            <button
              className={styles.clearAll}
              onClick={clearAll}
              type="button"
            >
              Clear all
            </button>
          )}
        </div>

        {/* 2. Active filter chips */}
        {activeFilters.length > 0 && (
          <div className={styles.chips}>
            {activeFilters.map((af) => (
              <span key={`${af.key}-${af.value}`} className={styles.chip}>
                {af.label}
                <button
                  className={styles.chipRemove}
                  onClick={() => removeFilter(af)}
                  type="button"
                  aria-label={`Remove ${af.label} filter`}
                >
                  <Icon name="x_close" size={20} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className={styles.divider} />

        {/* 3. AI Search */}
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>
              <Icon name="search" size={24} />
            </span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Family-friendly RVs for 4"
              value={filters.keyword}
              onChange={(e) => setFilter('keyword', e.target.value)}
            />
          </div>
          <button className={styles.searchButton} type="button">
            Search
          </button>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* 4. Location filter */}
        <CollapsibleSection title="Location">
          <div className={styles.locationFields}>
            <div className={styles.fieldGroup}>
              <input
                className={styles.fieldInput}
                type="text"
                placeholder="ZIP code"
                value={filters.zipCode}
                onChange={(e) => setFilter('zipCode', e.target.value)}
                maxLength={5}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className={styles.fieldGroup}>
              <select
                className={styles.fieldSelect}
                value={filters.radiusMiles}
                onChange={(e) =>
                  setFilter('radiusMiles', Number(e.target.value))
                }
              >
                {RADIUS_OPTIONS.map((miles) => (
                  <option key={miles} value={miles}>
                    {miles} miles
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CollapsibleSection>

        {/* 5. Condition toggle */}
        <CollapsibleSection title="New or used">
          <SegmentedButtons
            options={CONDITION_OPTIONS}
            selected={filters.condition}
            onChange={(value) => setFilter('condition', value)}
            className={styles.conditionToggle}
          />
        </CollapsibleSection>

        {/* 6. RV Type filter */}
        <RVTypeFilter
          selectedTypes={filters.rvTypes}
          onToggle={(type: RVType) => toggleArrayFilter('rvTypes', type)}
        />

        {/* 7. Make & Model filter */}
        <MakeModelFilter
          selectedMakes={filters.makes}
          selectedModels={filters.models}
          onToggleMake={(make: string) => toggleArrayFilter('makes', make)}
          onToggleModel={(model: string) => toggleArrayFilter('models', model)}
        />

        {/* 8. Price filter */}
        <PriceFilter
          priceMin={filters.priceMin}
          priceMax={filters.priceMax}
          onSetFilter={setFilter}
        />

        {/* 9+. Additional filters: Length, Year, Bunkhouse, Fuel, Sleeping, Floor Plan, GVW */}
        <AdditionalFilters
          filters={filters}
          setFilter={setFilter}
          toggleArrayFilter={toggleArrayFilter}
        />
      </div>

      {/* Mobile overlay footer */}
      <div className={styles.mobileFooter}>
        <button
          className={styles.showResultsBtn}
          onClick={onClose}
          type="button"
        >
          Show {totalCount.toLocaleString()} results
        </button>
      </div>
    </aside>
  );
}
