import { useState, useCallback, useRef, useEffect } from 'react';
import type { FilterCriteria, ActiveFilter, RVType, SRPListing } from '@app/src/data/srpTypes.ts';
import Icon from '@components/ui/Icon/Icon';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import { useSearchSuggestions } from '@components/pages/HomePage/HeroBanner/useSearchSuggestions';
import type { SuggestionItem } from '@components/pages/HomePage/HeroBanner/searchIndex';
import { isNaturalLanguageQuery, parseNLQuery } from '@components/pages/HomePage/HeroBanner/nlParser';
import CollapsibleSection from './CollapsibleSection';
import RVTypeFilter from './RVTypeFilter';
import MakeModelFilter from './MakeModelFilter';
import PriceFilter from './PriceFilter';
import AdditionalFilters from './AdditionalFilters';
import SrpTowFilter from './SrpTowFilter';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  filters: FilterCriteria;
  totalCount: number;
  activeFilters: ActiveFilter[];
  allListings: SRPListing[];
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
  allListings,
  setFilter,
  toggleArrayFilter,
  removeFilter,
  clearAll,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const [searchText, setSearchText] = useState(filters.keyword);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const sidebarClassName = `${styles.sidebar}${isOpen ? ` ${styles.open}` : ''}`;

  const { suggestions, isLoadingAI, activeIndex, setActiveIndex } =
    useSearchSuggestions(searchText);

  const hasSuggestions = searchText.trim().length > 0 && (suggestions.length > 0 || isLoadingAI);

  /** Parse a suggestion's navigateTo URL and apply its filters */
  const applySuggestionFilters = useCallback(
    (item: SuggestionItem) => {
      const url = item.navigateTo;
      const qIdx = url.indexOf('?');
      if (qIdx === -1) return;

      const params = new URLSearchParams(url.slice(qIdx + 1));

      if (params.has('rvTypes')) setFilter('rvTypes', params.get('rvTypes')!.split(',') as RVType[]);
      if (params.has('makes')) setFilter('makes', params.get('makes')!.split(','));
      if (params.has('models')) setFilter('models', params.get('models')!.split(','));
      if (params.has('priceMin')) setFilter('priceMin', Number(params.get('priceMin')));
      if (params.has('priceMax')) setFilter('priceMax', Number(params.get('priceMax')));
      if (params.has('yearMin')) setFilter('yearMin', Number(params.get('yearMin')));
      if (params.has('yearMax')) setFilter('yearMax', Number(params.get('yearMax')));
      if (params.has('condition')) setFilter('condition', params.get('condition') as 'new' | 'used');
      if (params.has('sleepingCapacity')) setFilter('sleepingCapacity', Number(params.get('sleepingCapacity')));
      if (params.has('fuelTypes')) setFilter('fuelTypes', params.get('fuelTypes')!.split(',') as FilterCriteria['fuelTypes']);
      if (params.has('gvwMax')) setFilter('grossVehicleWeightMax', Number(params.get('gvwMax')));
      if (params.has('lengthMin')) setFilter('lengthMin', Number(params.get('lengthMin')));
      if (params.has('lengthMax')) setFilter('lengthMax', Number(params.get('lengthMax')));
      if (params.has('floorPlans')) setFilter('floorPlans', params.get('floorPlans')!.split(','));
      if (params.has('keyword')) setFilter('keyword', params.get('keyword')!);

      setSearchText('');
      setShowSuggestions(false);
    },
    [setFilter],
  );

  const handleNLSearch = useCallback(() => {
    const text = searchText.trim();
    if (!text) return;

    setShowSuggestions(false);

    if (isNaturalLanguageQuery(text)) {
      const result = parseNLQuery(text);
      if (result) {
        const { filters: nlFilters } = result;
        if (nlFilters.rvTypes?.length) setFilter('rvTypes', nlFilters.rvTypes as RVType[]);
        if (nlFilters.makes?.length) setFilter('makes', nlFilters.makes);
        if (nlFilters.models?.length) setFilter('models', nlFilters.models);
        if (nlFilters.priceMin != null) setFilter('priceMin', nlFilters.priceMin);
        if (nlFilters.priceMax != null) setFilter('priceMax', nlFilters.priceMax);
        if (nlFilters.yearMin != null) setFilter('yearMin', nlFilters.yearMin);
        if (nlFilters.yearMax != null) setFilter('yearMax', nlFilters.yearMax);
        if (nlFilters.condition) setFilter('condition', nlFilters.condition);
        if (nlFilters.sleepingCapacity != null) setFilter('sleepingCapacity', nlFilters.sleepingCapacity);
        if (nlFilters.fuelTypes?.length) setFilter('fuelTypes', nlFilters.fuelTypes as FilterCriteria['fuelTypes']);
        if (nlFilters.gvwMax != null) setFilter('grossVehicleWeightMax', nlFilters.gvwMax);
        if (nlFilters.lengthMin != null) setFilter('lengthMin', nlFilters.lengthMin);
        if (nlFilters.lengthMax != null) setFilter('lengthMax', nlFilters.lengthMax);
        if (nlFilters.floorPlans?.length) setFilter('floorPlans', nlFilters.floorPlans);
        setFilter('keyword', '');
        setSearchText('');
        return;
      }
    }

    setFilter('keyword', text);
  }, [searchText, setFilter]);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions || !hasSuggestions || suggestions.length === 0) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleNLSearch();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(activeIndex < suggestions.length - 1 ? activeIndex + 1 : 0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(activeIndex > 0 ? activeIndex - 1 : suggestions.length - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < suggestions.length) {
            applySuggestionFilters(suggestions[activeIndex]);
          } else {
            handleNLSearch();
          }
          break;
        case 'Escape':
          setShowSuggestions(false);
          break;
      }
    },
    [handleNLSearch, showSuggestions, hasSuggestions, suggestions, activeIndex, setActiveIndex, applySuggestionFilters],
  );

  /* Close suggestions on click outside */
  useEffect(() => {
    if (!showSuggestions) return;
    const handleClick = (e: MouseEvent) => {
      if (searchSectionRef.current && !searchSectionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSuggestions]);

  return (
    <aside className={sidebarClassName}>
      {/* Mobile overlay header */}
      <div className={styles.mobileHeader}>
        <button
          className={styles.mobileBack}
          onClick={onClose}
          type="button"
          aria-label="Back"
        >
          <Icon name="chevron_left" size={24} />
        </button>
        <span className={styles.mobileTitle}>Filters</span>
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

        {/* 3. AI Search with suggestions */}
        <div className={styles.searchSection} ref={searchSectionRef}>
          <div className={`${styles.searchPanel} ${showSuggestions && searchText.trim().length > 0 ? styles.searchPanelExpanded : ''}`}>
            <div className={styles.searchContainer}>
              <span className={styles.searchIcon}>
                <Icon name="ai_search" size={24} />
              </span>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Family-friendly RVs for 4"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleSearchKeyDown}
                aria-expanded={showSuggestions && hasSuggestions}
                aria-controls={hasSuggestions ? 'srp-search-suggestions' : undefined}
                aria-activedescendant={
                  hasSuggestions && activeIndex >= 0
                    ? `srp-suggestion-${activeIndex}`
                    : undefined
                }
              />
            </div>

            {/* Suggestion dropdown */}
            {showSuggestions && searchText.trim().length > 0 && (
              <div className={styles.suggestionsDropdown} id="srp-search-suggestions" role="listbox">
                {suggestions.length === 0 && !isLoadingAI && (
                  <div className={styles.suggestionLoading}>
                    <span>No suggestions found</span>
                  </div>
                )}
                {suggestions.map((item, i) => (
                  <button
                    key={`${item.category}-${item.label}`}
                    id={`srp-suggestion-${i}`}
                    type="button"
                    role="option"
                    aria-selected={i === activeIndex}
                    className={`${styles.suggestionRow} ${i === activeIndex ? styles.suggestionRowActive : ''}`}
                    onClick={() => applySuggestionFilters(item)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <span className={styles.suggestionIcon}>
                      <Icon name={item.category === 'nl_search' ? 'ai_search' : 'search'} size={16} />
                    </span>
                    <span className={styles.suggestionLabel}>{item.label}</span>
                    {item.count && (
                      <span className={styles.suggestionCount}>{item.count}</span>
                    )}
                  </button>
                ))}
                {isLoadingAI && (
                  <div className={styles.suggestionLoading}>
                    <Icon name="ai_search" size={16} />
                    <span>Finding suggestions...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className={styles.searchButton}
            type="button"
            onClick={handleNLSearch}
          >
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
          listings={allListings}
          onSetFilter={setFilter}
        />

        {/* 9+. Additional filters: Length, Year, Bunkhouse, Fuel, Sleeping, Floor Plan, GVW */}
        <AdditionalFilters
          filters={filters}
          setFilter={setFilter}
          toggleArrayFilter={toggleArrayFilter}
        />

        {/* 10. Tow Match filter */}
        <CollapsibleSection title="Tow Match">
          <SrpTowFilter />
        </CollapsibleSection>
      </div>

      {/* Mobile overlay footer */}
      <div className={styles.mobileFooter}>
        <button
          className={styles.saveSearchBtn}
          type="button"
          aria-label="Save search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Save search
        </button>
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
