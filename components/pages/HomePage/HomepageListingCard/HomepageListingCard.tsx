import { useState } from 'react';
import { Link } from 'react-router-dom';
import { listingPath } from '../../../../app/src/routes';
import type { HomepageListingData } from '../../../../app/src/data/homepageData';
import styles from './HomepageListingCard.module.css';

interface HomepageListingCardProps {
  listing: HomepageListingData;
}

const TAG_COLORS: Record<string, string> = {
  'Price reduced': 'var(--rv-border-tag-red)',
  'Hot deal': 'var(--rv-border-tag-orange)',
  'New arrival': 'var(--rv-border-tag-blue)',
  'Newly listed': 'var(--rv-border-tag-blue)',
  'History report': 'var(--rv-border-tag-navy)',
};

export default function HomepageListingCard({ listing }: HomepageListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const location = listing.dealer.distanceMiles
    ? `${listing.dealer.city}, ${listing.dealer.state} \u00b7 ${listing.dealer.distanceMiles} miles away`
    : `${listing.dealer.city}, ${listing.dealer.state}`;

  return (
    <Link to={listingPath(listing.id)} className={styles.card}>
      <div className={styles.photoWrapper}>
        <img
          src={listing.photo.url}
          alt={listing.photo.alt}
          className={styles.photo}
          loading="lazy"
        />
        {listing.tag && (
          <span
            className={styles.tagBadge}
            style={{ borderLeftColor: TAG_COLORS[listing.tag] ?? 'var(--rv-border-tag-red)' }}
          >
            {listing.tag}
          </span>
        )}
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? '#E53935' : 'rgba(0,0,0,0.5)'} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className={styles.details}>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>{listing.title}</h3>
          <span className={styles.location}>{location}</span>
        </div>
        <span className={styles.price}>${listing.currentPrice.toLocaleString()}</span>
      </div>
    </Link>
  );
}
