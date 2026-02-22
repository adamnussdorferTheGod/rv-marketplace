import Icon from '@components/ui/Icon/Icon';
import styles from './AISummary.module.css';

interface AISummaryProps {
  aiSummary: string;
}

export default function AISummary({ aiSummary }: AISummaryProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.heading}>AI summary</h2>
        <span className={styles.newBadge}>NEW</span>
      </div>
      <p className={styles.body}>{aiSummary}</p>
      <button type="button" className={styles.searchPrompt}>
        <Icon name="sparkle" size={16} />
        <span>Ask about this RV</span>
      </button>
    </div>
  );
}
