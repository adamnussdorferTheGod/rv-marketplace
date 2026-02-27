import type { SRPListing } from '../../../../app/src/data/srpTypes';
import styles from './FeaturedCard.module.css';

interface FeaturedCardProps {
  listing: SRPListing;
}

export default function FeaturedCard({ listing }: FeaturedCardProps) {
  const location =
    listing.dealer.city && listing.dealer.state
      ? `${listing.dealer.city}, ${listing.dealer.state}`
      : '';

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
      </div>

      {/* ── Content Section ── */}
      <div className={styles.content}>
        <h3 className={styles.title}>{listing.title}</h3>
        <span className={styles.price}>
          ${listing.currentPrice.toLocaleString()}
        </span>
        {location && (
          <span className={styles.location}>{location}</span>
        )}
      </div>
    </article>
  );
}
