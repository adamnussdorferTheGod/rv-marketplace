import { useEffect, useCallback } from 'react';
import type { SortOption } from '@app/src/data/srpTypes.ts';
import { SORT_OPTIONS } from '@app/src/data/srpTypes.ts';
import Icon from '@components/ui/Icon/Icon';
import styles from './SortBottomSheet.module.css';

interface SortBottomSheetProps {
  isOpen: boolean;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClose: () => void;
}

export default function SortBottomSheet({
  isOpen,
  sort,
  onSortChange,
  onClose,
}: SortBottomSheetProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (value: SortOption) => {
      onSortChange(value);
      onClose();
    },
    [onSortChange, onClose],
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>Sort by</span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close sort"
          >
            <Icon name="x_close" size={24} />
          </button>
        </div>

        <ul className={styles.options}>
          {SORT_OPTIONS.map((opt) => {
            const isActive = opt.value === sort;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span>{opt.label}</span>
                  {isActive && (
                    <Icon name="check" size={20} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
