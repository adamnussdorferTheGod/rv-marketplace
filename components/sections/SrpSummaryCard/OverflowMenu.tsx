import { useState, useEffect, useRef } from 'react';
import Icon from '../../ui/Icon/Icon';
import styles from './SrpSummaryCard.module.css';

interface OverflowMenuProps {
  onDismiss: () => void;
}

export default function OverflowMenu({ onDismiss }: OverflowMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <div className={styles.overflowWrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.overflowBtn}
        aria-label="More options"
        onClick={() => setOpen(!open)}
      >
        <Icon name="more_vert" size={20} />
      </button>

      {open && (
        <div className={styles.dropdownMenu}>
          <button
            type="button"
            className={styles.dropdownItem}
            onClick={() => {
              onDismiss();
              setOpen(false);
            }}
          >
            Hide market insights
          </button>
        </div>
      )}
    </div>
  );
}
