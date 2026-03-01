import type { SRPListing } from '../../../../app/src/data/srpTypes';
import type { TowVerdict } from '../../../../app/src/data/towTypes';
import SRPListingCard from '../SRPListingCard/SRPListingCard';
import styles from './NearMissResults.module.css';

interface NearMissResultsProps {
  listings: SRPListing[];
  towVerdicts?: Map<string, TowVerdict>;
}

export default function NearMissResults({
  listings,
  towVerdicts,
}: NearMissResultsProps) {
  if (listings.length === 0) return null;

  return (
    <section className={styles.nearMiss}>
      <h2 className={styles.heading}>Similar RVs you might like</h2>
      <p className={styles.subtitle}>
        We relaxed some of your filters to find these nearby results.
      </p>
      <div className={styles.grid}>
        {listings.map((listing) => (
          <SRPListingCard
            key={listing.id}
            listing={listing}
            towVerdict={towVerdicts?.get(listing.id)}
          />
        ))}
      </div>
    </section>
  );
}
