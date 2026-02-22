import type { SimilarListing } from '../../../app/src/data/types';
import styles from './ListingCard.module.css';

interface ListingCardProps {
  listing: SimilarListing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.photoSection}>
        <img src={listing.imageUrl} alt={listing.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <span className={styles.condition}>Used</span>
        <h3 className={styles.title}>{listing.title}</h3>
        <span className={styles.price}>${listing.price.toLocaleString()}</span>
        <div className={styles.divider} />
        <div className={styles.dealerInfo}>
          <span className={styles.dealerName}>{listing.dealer}</span>
          <span className={styles.dealerLocation}>{listing.location}</span>
        </div>
      </div>
    </article>
  );
}
