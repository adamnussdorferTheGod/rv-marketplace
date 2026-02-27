import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import type { ReviewsData } from '../../../app/src/data/types';
import styles from './Reviews.module.css';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09A6.97 6.97 0 0 1 5.48 12c0-.72.13-1.43.36-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.54z" fill="#FBBC05" />
      <path d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z" fill="#EA4335" />
    </svg>
  );
}

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
  const [showAuthModal, setShowAuthModal] = useState(false);
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
                    <Icon name={category.icon} size={20} />
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
      <Button variant="secondary" size="lg" className={styles.viewAllButton} onClick={() => setShowAuthModal(true)}>
        View all reviews
      </Button>

      {/* Auth modal */}
      {showAuthModal && (
        <div className={styles.backdrop} onClick={() => setShowAuthModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowAuthModal(false)}
              aria-label="Close"
            >
              <Icon name="x_close" size={20} />
            </button>
            <div className={styles.iconWrap}>
              <Icon name="lock" size={32} />
            </div>
            <h2 className={styles.modalHeading}>Create a free account, or log in.</h2>
            <p className={styles.modalSubtext}>
              Sign in to read all reviews, submit your own, and get personalized recommendations.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.authButton} onClick={() => setShowAuthModal(false)}>
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>
              <button className={styles.authButton} onClick={() => setShowAuthModal(false)}>
                <Icon name="mail" size={20} />
                <span>Continue with email</span>
              </button>
            </div>
            <p className={styles.terms}>
              By continuing, you agree to the{' '}
              <a href="#terms">Terms of Service</a> and{' '}
              <a href="#privacy">Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
