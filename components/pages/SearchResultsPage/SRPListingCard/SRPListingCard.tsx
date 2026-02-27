import { useState } from 'react';
import type { SRPListing } from '../../../../app/src/data/srpTypes';
import Icon from '../../../ui/Icon/Icon';
import styles from './SRPListingCard.module.css';

interface SRPListingCardProps {
  listing: SRPListing;
}

export default function SRPListingCard({ listing }: SRPListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const maxDots = 5;
  const dotCount = Math.min(listing.photos.length, maxDots);

  const location = listing.dealer.distanceMiles != null
    ? `${listing.dealer.city}, ${listing.dealer.state} \u00b7 ${listing.dealer.distanceMiles} miles away`
    : `${listing.dealer.city}, ${listing.dealer.state}`;

  const showOriginalPrice =
    listing.originalPrice != null && listing.originalPrice !== listing.currentPrice;

  return (
    <article className={styles.card}>
      {/* ── Photo Section ── */}
      <div className={styles.photoWrapper}>
        {listing.photos[0] && (
          <img
            src={listing.photos[0].url}
            alt={listing.photos[0].alt}
            className={styles.photo}
            loading="lazy"
          />
        )}

        {/* Carousel dots */}
        {dotCount > 1 && (
          <div className={styles.dots}>
            {Array.from({ length: dotCount }, (_, i) => (
              <span
                key={i}
                className={`${styles.dot}${i === 0 ? ` ${styles.dotActive}` : ''}`}
              />
            ))}
          </div>
        )}

        {/* Tag badge */}
        {listing.tagBadge && (
          <span className={styles.tagBadge}>{listing.tagBadge}</span>
        )}

        {/* Favorite heart toggle */}
        <button
          type="button"
          className={styles.favoriteBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#E53935' : 'rgba(0,0,0,0.5)'}
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* ── Content Section ── */}
      <div className={styles.content}>
        <span className={styles.condition}>{listing.condition}</span>

        <h3 className={styles.title}>{listing.title}</h3>

        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>
            ${listing.currentPrice.toLocaleString()}
          </span>
          {showOriginalPrice && (
            <span className={styles.originalPrice}>
              ${listing.originalPrice!.toLocaleString()}
            </span>
          )}
        </div>

        <span className={styles.monthlyPayment}>
          ${listing.monthlyPayment.toLocaleString()}/mo
        </span>

        <button type="button" className={styles.ctaButton}>
          More info
        </button>
      </div>

      {/* ── Dealer Section ── */}
      <div className={styles.divider} />
      <div className={styles.dealer}>
        <span className={styles.dealerName}>{listing.dealer.name}</span>
        <span className={styles.dealerLocation}>{location}</span>
        {listing.isTrustedPartner && (
          <span className={styles.trustedBadge}>
            <Icon name="shield_check" size={16} className={styles.trustedBadgeIcon} />
            Trusted partner
          </span>
        )}
      </div>
    </article>
  );
}
