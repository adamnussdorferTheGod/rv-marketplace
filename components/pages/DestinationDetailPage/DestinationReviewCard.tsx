import Icon from '@components/ui/Icon/Icon';
import type { DestinationReview } from '../../../app/src/data/lifestyleTypes';
import styles from './DestinationReviewCard.module.css';

interface DestinationReviewCardProps {
  review: DestinationReview;
}

function StarRating({ rating, size = 20 }: { rating: number; size?: number }) {
  const filledCount = Math.round(rating);
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filledCount ? styles.starFilled : styles.starEmpty}>
          <Icon name={i < filledCount ? 'star_filled' : 'star_outline'} size={size} />
        </span>
      ))}
    </div>
  );
}

export default function DestinationReviewCard({ review }: DestinationReviewCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{review.title}</h3>
        <p className={styles.vehicle}>{review.vehicleInfo}</p>
        <div className={styles.ratingRow}>
          <span className={styles.ratingNum}>{review.rating}</span>
          <StarRating rating={review.rating} />
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.text}>{review.body}</p>
        <p className={styles.author}>{review.author}</p>
      </div>

      <div className={styles.footer}>
        <a href="#" className={styles.reviewLink}>View this review</a>
      </div>
    </div>
  );
}
