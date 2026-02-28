import { Link } from 'react-router-dom';
import type { SRPListing } from '../../../../app/src/data/srpTypes';
import { listingPath } from '../../../../app/src/routes';
import { useCoShopping } from '../../../sections/CoShopping/CoShoppingContext';
import Icon from '../../../ui/Icon/Icon';
import styles from './SRPListingCard.module.css';

interface SRPListingCardProps {
  listing: SRPListing;
}

const TAG_COLORS: Record<string, string> = {
  'Price reduced': 'var(--rv-border-tag-red)',
  'Hot deal': 'var(--rv-border-tag-orange)',
  'New arrival': 'var(--rv-border-tag-blue)',
  'Newly listed': 'var(--rv-border-tag-blue)',
  'History report': 'var(--rv-border-tag-navy)',
};

export default function SRPListingCard({ listing }: SRPListingCardProps) {
  const { isListingOnAnyList, toggleListingOnActiveList } = useCoShopping();
  const isFavorite = isListingOnAnyList(listing.id);

  const maxDots = 5;
  const dotCount = Math.min(listing.photos.length, maxDots);

  const location = listing.dealer.distanceMiles != null
    ? `${listing.dealer.city}, ${listing.dealer.state} \u00b7 ${listing.dealer.distanceMiles} miles away`
    : `${listing.dealer.city}, ${listing.dealer.state}`;

  const showOriginalPrice =
    listing.originalPrice != null && listing.originalPrice !== listing.currentPrice;

  return (
    <Link to={listingPath(listing.id)} className={styles.cardLink}>
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
          <span
            className={styles.tagBadge}
            style={{ borderLeftColor: TAG_COLORS[listing.tagBadge] ?? 'var(--rv-border-tag-red)' }}
          >
            {listing.tagBadge}
          </span>
        )}

        {/* Favorite heart toggle */}
        <button
          type="button"
          className={styles.favoriteBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleListingOnActiveList(listing.id);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <svg
            width="32"
            height="32"
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
        <div className={styles.mainGroup}>
          <div className={styles.textBlock}>
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
          </div>

          <button type="button" className={styles.ctaButton}>
            More info
          </button>
        </div>

        <div className={styles.dividerWrapper}>
          <div className={styles.divider} />
        </div>

        <div className={styles.dealer}>
          <div className={styles.dealerInfo}>
            <span className={styles.dealerName}>{listing.dealer.name}</span>
            <span className={styles.dealerLocation}>{location}</span>
          </div>
          {listing.isTrustedPartner && (
            <div className={styles.trustedBadge}>
              <Icon name="award_star" size={20} className={styles.trustedBadgeIcon} />
              Trusted partner
            </div>
          )}
        </div>
      </div>
    </article>
    </Link>
  );
}
