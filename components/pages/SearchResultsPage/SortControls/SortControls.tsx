import type { SortOption } from '@app/src/data/srpTypes.ts';
import { SORT_OPTIONS } from '@app/src/data/srpTypes.ts';
import Icon from '../../../ui/Icon/Icon';
import styles from './SortControls.module.css';

interface SortControlsProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortControls({ sort, onSortChange }: SortControlsProps) {
  const currentLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? 'Most Relevant';

  return (
    <div className={styles.sortControls}>
      <div className={styles.sortButton}>
        <Icon name="swap_vert" size={20} />
        <span className={styles.sortText}>Sort by: {currentLabel}</span>
        <select
          className={styles.sortSelect}
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Sort listings"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className={styles.saveButton}
        aria-label="Save search"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Save search
      </button>
    </div>
  );
}
