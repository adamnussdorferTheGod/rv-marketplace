import type { SortOption } from '@app/src/data/srpTypes.ts';
import { SORT_OPTIONS } from '@app/src/data/srpTypes.ts';
import Icon from '@components/ui/Icon/Icon';
import styles from './MobileFilterBar.module.css';

interface MobileFilterBarProps {
  activeFilterCount: number;
  sort: SortOption;
  onFilterClick: () => void;
  onSortClick: () => void;
  onFavoriteClick?: () => void;
}

export default function MobileFilterBar({
  activeFilterCount,
  sort,
  onFilterClick,
  onSortClick,
  onFavoriteClick,
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

      <button
        type="button"
        className={styles.heartBtn}
        onClick={onFavoriteClick}
        aria-label="Save search"
      >
        <Icon name="favorite" size={24} />
      </button>
    </div>
  );
}
