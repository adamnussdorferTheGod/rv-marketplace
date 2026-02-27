import AdSlot from './AdSlot';
import styles from './InlineAdCard.module.css';

interface InlineAdCardProps {
  className?: string;
}

export default function InlineAdCard({ className }: InlineAdCardProps) {
  return (
    <div className={`${styles.card} ${className || ''}`.trim()}>
      <span className={styles.label}>Advertisement &bull; Page continues below</span>
      <div className={styles.adContainer}>
        <AdSlot width={300} height={250} label="Ad: 300x250" />
      </div>
    </div>
  );
}
