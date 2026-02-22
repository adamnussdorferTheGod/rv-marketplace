import styles from './PopularityStats.module.css';

interface PopularityStatsProps {
  viewerCount: number;
}

export default function PopularityStats({ viewerCount }: PopularityStatsProps) {
  return (
    <div className={styles.stats}>
      <span>{viewerCount} people viewing</span>
    </div>
  );
}
