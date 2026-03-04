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

    </div>
  );
}
