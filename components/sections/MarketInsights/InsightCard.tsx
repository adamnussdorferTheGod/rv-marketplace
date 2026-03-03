import Icon from '@components/ui/Icon/Icon';
import styles from './MarketInsights.module.css';

interface InsightCardProps {
  icon: string;
  value: string;
  description: string;
  pillLabel: string;
}

export default function InsightCard({ icon, value, description, pillLabel }: InsightCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.iconCircle}>
          <Icon name={icon} size={24} />
        </div>
        <p className={styles.cardValue}>{value}</p>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <span className={styles.pill}>{pillLabel}</span>
    </div>
  );
}
