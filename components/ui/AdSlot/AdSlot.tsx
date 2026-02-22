import styles from './AdSlot.module.css';

interface AdSlotProps {
  width: number;
  height: number;
  label?: string;
  className?: string;
}

export default function AdSlot({ width, height, label, className }: AdSlotProps) {
  const displayLabel = label || `${width}x${height}`;
  const ariaLabel = label || `Ad placeholder ${width}x${height}`;

  return (
    <div
      className={`${styles.slot} ${className || ''}`.trim()}
      style={{ width, height }}
      role="img"
      aria-label={ariaLabel}
    >
      <span className={styles.label}>{displayLabel}</span>
    </div>
  );
}
