import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import type { ReviewsData } from '../../../app/src/data/types';
import styles from './Reviews.module.css';

interface ReviewsProps {
  reviews: ReviewsData;
  modelName: string;
}

function StarRating({ rating, size = 20 }: { rating: number; size?: number }) {
  const filledCount = Math.round(rating);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= filledCount ? styles.starFilled : styles.starEmpty}>
        <Icon name={i <= filledCount ? 'star_filled' : 'star_outline'} size={size} />
      </span>
    );
  }
  return <div className={styles.stars}>{stars}</div>;
}

export default function Reviews({ reviews, modelName }: ReviewsProps) {
  const distributionLabels = [5, 4, 3, 2, 1];

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>{modelName} reviews</h2>
        <p className={styles.subtitle}>
          *Reviews are submitted for the manufacturer model and not this specific listing.
        </p>
      </div>

      {/* Summary grid: rating + bars | category ratings */}
      <div className={styles.summaryGrid}>
        {/* Left: overall rating + distribution */}
        <div className={styles.ratingSide}>
          <div className={styles.ratingRow}>
            <div className={styles.ratingBadge}>
              <div className={styles.ratingBadgeScore}>
                <span className={styles.ratingBadgeStar}>
                  <Icon name="star_filled" size={23} />
                </span>
                <span className={styles.ratingNumber}>{reviews.overallRating}</span>
              </div>
            </div>
            <div className={styles.ratingMeta}>
              <p className={styles.ratingLabel}>Overall rating</p>
              <p className={styles.ratingCount}>
                Based on <a href="#reviews" className={styles.ratingCountLink}>{reviews.totalReviews} reviews</a>
              </p>
            </div>
          </div>

          <div className={styles.distribution}>
            {distributionLabels.map((label, i) => (
              <div key={label} className={styles.distributionRow}>
                <span className={styles.distributionLabel}>{label}</span>
                <div className={styles.distributionBar}>
                  <div
                    className={styles.distributionFill}
                    style={{ width: `${reviews.distribution[i]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: category ratings */}
        <div className={styles.categorySide}>
          {reviews.categories.map((category, i) => (
            <div key={category.label}>
              <div className={styles.categoryRow}>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryIcon}>
                    <Icon name={category.icon} size={24} />
                  </span>
                  <span className={styles.categoryLabel}>{category.label}</span>
                </div>
                <span className={styles.categoryScore}>
                  {Number.isInteger(category.score) ? category.score : category.score}/5
                </span>
              </div>
              {i < reviews.categories.length - 1 && (
                <div className={styles.categoryDivider} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className={styles.reviewsList}>
        {reviews.reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <h3 className={styles.reviewTitle}>{review.title}</h3>
              <p className={styles.reviewModel}>{review.modelYear}</p>
              <div className={styles.reviewRating}>
                <span className={styles.reviewRatingNumber}>{review.rating}</span>
                <StarRating rating={review.rating} />
              </div>
            </div>

            <div className={styles.reviewBody}>
              <p className={styles.reviewText}>{review.body}</p>
              <p className={styles.reviewAuthor}>{review.author}</p>
            </div>

            <div className={styles.reviewFooter}>
              <a href="#" className={styles.reviewLink}>View this review</a>
              {review.photoCount > 0 && (
                <div className={styles.reviewPhotos}>
                  <span className={styles.reviewPhotosIcon}>
                    <Icon name="camera" size={24} />
                  </span>
                  <span className={styles.reviewPhotosCount}>({review.photoCount})</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View all button */}
      <Button variant="secondary" size="lg" className={styles.viewAllButton}>
        View all reviews
      </Button>
    </div>
  );
}
