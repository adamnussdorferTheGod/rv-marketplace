import { motion } from 'motion/react';
import styles from './SegmentedButtons.module.css';

interface SegmentedButtonsProps<T extends string> {
  options: { value: T; label: string }[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
  /** Enable sliding indicator animation between segments */
  animated?: boolean;
}

export default function SegmentedButtons<T extends string>({
  options,
  selected,
  onChange,
  className,
  animated,
}: SegmentedButtonsProps<T>) {
  return (
    <div
      className={`${styles.track}${className ? ` ${className}` : ''}`}
      role="group"
    >
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <button
            key={option.value}
            className={`${styles.segment}${isSelected ? ` ${styles.selected}` : ''}`}
            onClick={() => onChange(option.value)}
            aria-pressed={isSelected}
          >
            {isSelected && animated && (
              <motion.div
                className={styles.indicator}
                layoutId="segment-indicator"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
