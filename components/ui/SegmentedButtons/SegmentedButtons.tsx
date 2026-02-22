import styles from './SegmentedButtons.module.css';

interface SegmentedButtonsProps<T extends string> {
  options: { value: T; label: string }[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function SegmentedButtons<T extends string>({
  options,
  selected,
  onChange,
  className,
}: SegmentedButtonsProps<T>) {
  return (
    <div
      className={`${styles.track}${className ? ` ${className}` : ''}`}
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          className={`${styles.segment}${option.value === selected ? ` ${styles.selected}` : ''}`}
          onClick={() => onChange(option.value)}
          aria-pressed={option.value === selected}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
