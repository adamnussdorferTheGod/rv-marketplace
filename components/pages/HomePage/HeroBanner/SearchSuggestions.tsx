import { useRef, useEffect, useMemo } from 'react';
import Icon from '@components/ui/Icon/Icon';
import type { SuggestionItem, SuggestionCategory } from './searchIndex';
import styles from './SearchSuggestions.module.css';

interface SearchSuggestionsProps {
  suggestions: SuggestionItem[];
  query: string;
  activeIndex: number;
  isLoadingAI: boolean;
  onSelect: (item: SuggestionItem) => void;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<SuggestionCategory, string> = {
  make: 'Makes',
  make_model: 'Makes & Models',
  model: 'Models',
  rv_type: 'RV Types',
  popular_search: 'Suggestions',
};

const CATEGORY_ORDER: SuggestionCategory[] = [
  'make',
  'make_model',
  'model',
  'rv_type',
  'popular_search',
];

function highlightMatch(label: string, query: string) {
  if (!query.trim()) return label;

  const lowerLabel = label.toLowerCase();
  const lowerQuery = query.trim().toLowerCase();
  const idx = lowerLabel.indexOf(lowerQuery);

  if (idx === -1) return label;

  const before = label.slice(0, idx);
  const match = label.slice(idx, idx + lowerQuery.length);
  const after = label.slice(idx + lowerQuery.length);

  return (
    <>
      {before}
      <mark className={styles.highlight}>{match}</mark>
      {after}
    </>
  );
}

export default function SearchSuggestions({
  suggestions,
  query,
  activeIndex,
  isLoadingAI,
  onSelect,
  onClose,
}: SearchSuggestionsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const active = listRef.current.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  // Group suggestions by category, preserving order
  const grouped = useMemo(() => {
    const groups: { category: SuggestionCategory; items: { item: SuggestionItem; flatIndex: number }[] }[] = [];
    const catMap = new Map<SuggestionCategory, { item: SuggestionItem; flatIndex: number }[]>();

    suggestions.forEach((item, i) => {
      let arr = catMap.get(item.category);
      if (!arr) {
        arr = [];
        catMap.set(item.category, arr);
      }
      arr.push({ item, flatIndex: i });
    });

    for (const cat of CATEGORY_ORDER) {
      const items = catMap.get(cat);
      if (items && items.length > 0) {
        groups.push({ category: cat, items });
      }
    }

    return groups;
  }, [suggestions]);

  if (suggestions.length === 0 && !isLoadingAI) {
    return (
      <div className={styles.container}>
        <button
          type="button"
          className={styles.mobileClose}
          onClick={onClose}
          aria-label="Close suggestions"
        >
          <Icon name="x_close" size={18} />
        </button>
        <div className={styles.empty}>
          No suggestions found. Try a make, model, or RV type.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} ref={listRef} role="listbox" id="search-suggestions">
      <button
        type="button"
        className={styles.mobileClose}
        onClick={onClose}
        aria-label="Close suggestions"
      >
        <Icon name="x_close" size={18} />
      </button>

      {grouped.map((group) => (
        <div key={group.category} className={styles.group}>
          <div className={styles.categoryHeader}>{CATEGORY_LABELS[group.category]}</div>
          {group.items.map(({ item, flatIndex }) => {
            const isActive = flatIndex === activeIndex;
            return (
              <button
                key={`${item.category}-${item.label}`}
                type="button"
                role="option"
                aria-selected={isActive}
                data-active={isActive}
                className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
                onClick={() => onSelect(item)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <span className={styles.rowIcon}>
                  <Icon name="search" size={18} />
                </span>
                <span className={styles.rowLabel}>
                  {highlightMatch(item.label, query)}
                </span>
                {item.count && (
                  <span className={styles.rowCount}>
                    {item.count} {item.category === 'make' || item.category === 'make_model' ? 'RVs' : 'for sale'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}

      {isLoadingAI && (
        <div className={styles.aiLoading}>
          <Icon name="ai_search" size={18} />
          <span>Finding more suggestions...</span>
        </div>
      )}
    </div>
  );
}
