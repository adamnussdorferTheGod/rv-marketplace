import AdSlot from './AdSlot';
import styles from './InlineAdBreak.module.css';

interface InlineAdBreakProps {
  className?: string;
}

export default function InlineAdBreak({ className }: InlineAdBreakProps) {
  return (
    <div className={`${styles.wrapper} ${className || ''}`.trim()}>
      <span className={styles.label}>Advertisement &bull; Page continues below</span>
      <div className={styles.adContainer}>
        <AdSlot width={300} height={250} label="Ad: 300x250" />
      </div>
    </div>
  );
}
