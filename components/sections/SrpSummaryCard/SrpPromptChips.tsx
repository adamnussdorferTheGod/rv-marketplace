import styles from './SrpSummaryCard.module.css';

interface SrpPromptChipsProps {
  chips: string[];
  onSelect: (chip: string) => void;
  disabled?: boolean;
}

export default function SrpPromptChips({
  chips,
  onSelect,
  disabled = false,
}: SrpPromptChipsProps) {
  return (
    <div className={styles.chipRow}>
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          className={styles.promptChip}
          onClick={() => onSelect(chip)}
          disabled={disabled}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
