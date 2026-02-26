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
      <h2 className={styles.heading}>Campground Reviews</h2>

      <div className={styles.summaryGrid}>
        <div className={styles.ratingRow}>
          <div className={styles.ratingBadge}>
            <div className={styles.ratingBadgeScore}>
              <span className={styles.ratingBadgeStar}>
                <Icon name="star_filled" size={23} />
              </span>
              <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
            </div>
          </div>
          <div className={styles.ratingMeta}>
            <p className={styles.ratingLabel}>Overall rating</p>
            <p className={styles.ratingCount}>
              Based on <span className={styles.ratingCountLink}>{reviewCount} reviews</span>
            </p>
          </div>
        </div>

        <div className={styles.distribution}>
          {([5, 4, 3, 2, 1] as const).map(star => (
            <div key={star} className={styles.distributionRow}>
              <span className={styles.distributionLabel}>{star}</span>
              <div className={styles.distributionBar}>
                <div
                  className={styles.distributionFill}
                  style={{ width: `${breakdown[star]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
