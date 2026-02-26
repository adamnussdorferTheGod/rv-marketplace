import Icon from '@components/ui/Icon/Icon';
import type { DestinationReview } from '../../../app/src/data/lifestyleTypes';
import styles from './DestinationReviewCard.module.css';

interface DestinationReviewCardProps {
  review: DestinationReview;
}

export default function DestinationReviewCard({ review }: DestinationReviewCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{review.title}</h3>
        <p className={styles.vehicle}>{review.vehicleInfo}</p>
        <div className={styles.ratingRow}>
          <span className={styles.ratingNum}>{review.rating}</span>
          <div className={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <Icon
                key={i}
                name={i < Math.round(review.rating) ? 'star_filled' : 'star_outline'}
                size={20}
                className={i < Math.round(review.rating) ? styles.starFilled : styles.starEmpty}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.text}>{review.body}</p>
        <span className={styles.author}>{review.author}</span>
      </div>
      <div className={styles.footer}>
        <span className={styles.viewLink}>View this review</span>
      </div>
    </div>
  );
}
