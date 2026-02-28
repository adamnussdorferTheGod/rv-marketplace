import styles from './WizardOptionCard.module.css';

interface WizardOptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function WizardOptionCard({ label, selected, onClick }: WizardOptionCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${selected ? styles.cardSelected : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
