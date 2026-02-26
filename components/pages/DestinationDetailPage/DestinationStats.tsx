import Icon from '@components/ui/Icon/Icon';
import type { Destination } from '../../../app/src/data/lifestyleTypes';
import styles from './DestinationStats.module.css';

interface DestinationStatsProps {
  destination: Destination;
}

function formatDriveTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
}

const STATS = [
  { key: 'price', icon: 'dollar_sign', label: 'Price' },
  { key: 'distance', icon: 'location_pin', label: 'Distance' },
  { key: 'driveTime', icon: 'clock', label: 'Drive time' },
  { key: 'season', icon: 'calendar', label: 'Season' },
] as const;

export default function DestinationStats({ destination }: DestinationStatsProps) {
  const values: Record<string, string> = {
    price: destination.priceRange,
    distance: `${destination.distanceMiles} miles`,
    driveTime: formatDriveTime(destination.driveTimeMinutes),
    season: destination.season,
  };

  return (
    <div className={styles.stats}>
      {STATS.map((stat, i) => (
        <div key={stat.key} className={styles.row}>
          <div className={styles.iconWrap}>
            <Icon name={stat.icon} size={24} />
          </div>
          <div className={styles.content}>
            <span className={styles.label}>{stat.label}</span>
            <span className={styles.value}>{values[stat.key]}</span>
          </div>
          {i < STATS.length - 1 && <div className={styles.divider} />}
        </div>
      ))}
    </div>
  );
}
