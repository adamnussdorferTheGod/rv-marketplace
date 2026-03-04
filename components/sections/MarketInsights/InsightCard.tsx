import styles from './MarketInsights.module.css';

interface InsightCardProps {
  icon: string;
  value: string;
  description: string;
  pillLabel: string;
}

export default function InsightCard({ value, description, pillLabel }: InsightCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <p className={styles.cardValue}>{value}</p>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <span className={styles.pill}>{pillLabel}</span>
    </div>
  );
}
