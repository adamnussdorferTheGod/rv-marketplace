import type { SimilarListing } from '../../../app/src/data/types';
import ListingCard from './ListingCard';
import styles from './SimilarListings.module.css';

interface SimilarListingsProps {
  listings: SimilarListing[];
}

export default function SimilarListings({ listings }: SimilarListingsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Similar listings</h2>
      <div className={styles.carouselTrack}>
        {listings.map((listing) => (
          <div key={listing.id} className={styles.cardWrapper}>
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
}
