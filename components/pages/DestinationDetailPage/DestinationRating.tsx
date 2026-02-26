import Icon from '@components/ui/Icon/Icon';
import styles from './DestinationRating.module.css';

interface DestinationRatingProps {
  rating: number;
  reviewCount: number;
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
}

export default function DestinationRating({ rating, reviewCount, breakdown }: DestinationRatingProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Reviews</h2>
      <div className={styles.overview}>
        <div className={styles.score}>
          <Icon name="star_filled" size={32} className={styles.starIcon} />
          <span className={styles.number}>{rating.toFixed(1)}</span>
        </div>
        <span className={styles.count}>Based on {reviewCount} reviews</span>
      </div>
      <div className={styles.bars}>
        {([5, 4, 3, 2, 1] as const).map(star => (
          <div key={star} className={styles.barRow}>
            <span className={styles.starLabel}>{star}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: `${breakdown[star]}%` }}
              />
            </div>
            <span className={styles.pct}>{breakdown[star]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
