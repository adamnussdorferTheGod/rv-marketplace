import styles from './ActionChip.module.css';

interface ActionChipProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function ActionChip({ label, onClick, className }: ActionChipProps) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${className || ''}`.trim()}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
