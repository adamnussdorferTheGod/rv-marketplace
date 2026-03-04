import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@components/ui/Icon/Icon';
import { useSearchSuggestions } from '../HomePage/HeroBanner/useSearchSuggestions';
import { buildSearchURL } from '../HomePage/HeroBanner/nlParser';
import {
  RV_TYPES,
  POPULAR_SEARCHES,
  POPULAR_MAKES,
} from '../HomePage/HeroBanner/heroData';
import type { SuggestionItem, SuggestionCategory } from '../HomePage/HeroBanner/searchIndex';
import styles from './MobileSearchPage.module.css';

const CATEGORY_LABELS: Record<SuggestionCategory, string> = {
  nl_search: 'Search Results',
  make: 'Makes',
  make_model: 'Makes & Models',
  model: 'Models',
  rv_type: 'RV Types',
  popular_search: 'Suggestions',
};

const CATEGORY_ORDER: SuggestionCategory[] = [
  'nl_search',
  'make',
  'make_model',
  'model',
  'rv_type',
  'popular_search',
];

function highlightMatch(label: string, query: string) {
  if (!query.trim()) return label;
  const lower = label.toLowerCase();
  const q = query.trim().toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return label;
  return (
    <>
      {label.slice(0, idx)}
      <mark className={styles.highlight}>{label.slice(idx, idx + q.length)}</mark>
      {label.slice(idx + q.length)}
    </>
  );
}

export default function MobileSearchPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  const { suggestions, isLoadingAI, nlParseResult } = useSearchSuggestions(query);

  const hasSuggestions = query.trim().length > 0;

  // Autofocus on mount
  useEffect(() => {
    // Small delay to ensure keyboard opens on iOS
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSearch = useCallback(() => {
    if (nlParseResult) {
      navigate(`/search${buildSearchURL(nlParseResult.filters, nlParseResult.sort)}`);
    } else if (query.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  }, [navigate, nlParseResult, query]);

  const handleSuggestionSelect = useCallback(
    (item: { navigateTo: string }) => {
      navigate(item.navigateTo);
    },
    [navigate],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Group suggestions
  const grouped = useMemo(() => {
    const groups: { category: SuggestionCategory; items: { item: SuggestionItem; idx: number }[] }[] = [];
    const catMap = new Map<SuggestionCategory, { item: SuggestionItem; idx: number }[]>();

    suggestions.forEach((item, i) => {
      let arr = catMap.get(item.category);
      if (!arr) {
        arr = [];
        catMap.set(item.category, arr);
      }
      arr.push({ item, idx: i });
    });

    for (const cat of CATEGORY_ORDER) {
      const items = catMap.get(cat);
      if (items?.length) groups.push({ category: cat, items });
    }
    return groups;
  }, [suggestions]);

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
          aria-label="Go back"
        >
          <Icon name="chevron_left" size={24} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Search input */}
        <div className={styles.searchBar}>
          <span className={styles.sparkleIcon}>
            <Icon name="ai_search" size={24} />
          </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search RVs by make, type, or describe what you need"
            aria-label="Search RVs"
          />
          {query && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              aria-label="Clear search"
            >
              <Icon name="x_close" size={14} />
            </button>
          )}
        </div>

        {/* Show suggestions when typing, browse content when empty */}
        {hasSuggestions ? (
          <div className={styles.suggestions}>
            {grouped.map((group) => (
              <div key={group.category} className={styles.suggestionGroup}>
                <div className={styles.categoryHeader}>
                  {CATEGORY_LABELS[group.category]}
                </div>
                {group.items.map(({ item }) => (
                  <button
                    key={`${item.category}-${item.label}`}
                    type="button"
                    className={styles.suggestionRow}
                    onClick={() => handleSuggestionSelect(item)}
                  >
                    <span className={styles.suggestionIcon}>
                      <Icon
                        name={item.category === 'nl_search' ? 'ai_search' : 'search'}
                        size={18}
                      />
                    </span>
                    <span className={styles.suggestionLabel}>
                      {highlightMatch(item.label, query)}
                    </span>
                    {item.count && (
                      <span className={styles.suggestionCount}>
                        {item.count} {item.category === 'make' || item.category === 'make_model' ? 'RVs' : 'for sale'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
            {isLoadingAI && (
              <div className={styles.aiLoading}>
                <Icon name="ai_search" size={18} />
                <span>Finding more suggestions...</span>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* RV Types — horizontal scroll */}
            <div className={styles.section}>
              <h3 className={styles.sectionHeading}>RV types</h3>
              <div className={styles.typeScroll}>
                {RV_TYPES.map((type) => (
                  <button
                    key={type.slug}
                    type="button"
                    className={styles.typeCard}
                    onClick={() => navigate(`/search?type=${type.slug}`)}
                  >
                    <span className={styles.typeLabel}>{type.label}</span>
                    <img
                      src={type.imageUrl}
                      alt={type.label}
                      className={styles.typeImage}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Ask anything — AI chips */}
            <div className={styles.section}>
              <div className={styles.askSection}>
                <div className={styles.askGlow} />
                <div className={styles.askInner}>
                  <h3 className={styles.askHeading}>
                    Ask anything
                    <Icon name="sparkles" size={20} />
                  </h3>
                  <div className={styles.askChipScroll}>
                    <button type="button" className={styles.askChip} onClick={() => navigate('/search?aiChip=' + encodeURIComponent('Help me choose an RV type'))}>Help me choose an RV type</button>
                    <button type="button" className={styles.askChip} onClick={() => navigate('/search?aiChip=' + encodeURIComponent('Towable or motorhome?'))}>Towable or motorhome?</button>
                    <button type="button" className={styles.askChip} onClick={() => navigate('/search?aiChip=' + encodeURIComponent('What are the best RV brands?'))}>What are the best RV brands?</button>
                    <button type="button" className={styles.askChip} onClick={() => navigate('/search?aiChip=' + encodeURIComponent('First RV — where do I start?'))}>First RV — where do I start?</button>
                    <button type="button" className={styles.askChip} onClick={() => navigate('/search?aiChip=' + encodeURIComponent('What can I get for my budget?'))}>What can I get for my budget?</button>
                    <button type="button" className={styles.askCta} onClick={() => navigate('/search?aiOpen=1')}>
                      <Icon name="sparkles" size={16} />
                      Ask any question
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular searches */}
            <div className={styles.section}>
              <h3 className={styles.sectionHeading}>Popular searches</h3>
              <div className={styles.chipWrap}>
                {POPULAR_SEARCHES.map((search) => (
                  <button
                    key={search.label}
                    type="button"
                    className={styles.chip}
                    onClick={() => navigate(`/search?${search.query}`)}
                  >
                    <Icon name="search" size={18} />
                    {search.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular makes */}
            <div className={styles.section}>
              <h3 className={styles.sectionHeading}>Popular makes</h3>
              <div className={styles.chipWrap}>
                {POPULAR_MAKES.map((make) => (
                  <button
                    key={make.slug}
                    type="button"
                    className={styles.chip}
                    onClick={() => navigate(`/search?make=${make.slug}`)}
                  >
                    <Icon name="search" size={18} />
                    {make.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
