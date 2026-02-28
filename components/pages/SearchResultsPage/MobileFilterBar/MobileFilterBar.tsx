import type { SortOption } from '@app/src/data/srpTypes.ts';
import { SORT_OPTIONS } from '@app/src/data/srpTypes.ts';
import Icon from '@components/ui/Icon/Icon';
import styles from './MobileFilterBar.module.css';

interface MobileFilterBarProps {
  activeFilterCount: number;
  sort: SortOption;
  onFilterClick: () => void;
  onSortClick: () => void;
  savedCount?: number;
  onSavedClick?: () => void;
}

export default function MobileFilterBar({
  activeFilterCount,
  sort,
  onFilterClick,
  onSortClick,
  savedCount = 0,
  onSavedClick,
}: MobileFilterBarProps) {
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? 'Sort';
  const hasFilters = activeFilterCount > 0;

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={`${styles.pill} ${hasFilters ? styles.pillActive : ''}`}
        onClick={onFilterClick}
      >
        <Icon name="tune" size={20} />
        <span>Filter{hasFilters ? ` (${activeFilterCount})` : ''}</span>
      </button>

      <button type="button" className={styles.pill} onClick={onSortClick}>
        <Icon name="swap_vert" size={20} />
        <span>{sortLabel}</span>
      </button>

      {/* Saved RVs pill — only when there are saves */}
      {savedCount > 0 && (
        <button
          type="button"
          className={`${styles.pill} ${styles.savedPill}`}
          onClick={onSavedClick}
          aria-label={`Saved RVs (${savedCount})`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#E53935" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>{savedCount}</span>
        </button>
      )}
    </div>
  );
}
