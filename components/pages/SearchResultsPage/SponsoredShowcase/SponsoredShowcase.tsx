import type { SRPListing } from '../../../../app/src/data/srpTypes';
import FeaturedCard from '../FeaturedCard/FeaturedCard';
import styles from './SponsoredShowcase.module.css';

interface SponsoredShowcaseProps {
  listings: SRPListing[];
  dealerName: string;
  dealerDescription: string;
  title?: string;
}

export default function SponsoredShowcase({
  listings,
  dealerName,
  dealerDescription,
  title = 'Native Summit Showcase',
}: SponsoredShowcaseProps) {
  return (
    <section className={styles.showcase}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.sponsoredLabel}>Sponsored</span>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.dealerName}>{dealerName}</span>
        <p className={styles.description}>{dealerDescription}</p>
      </div>

      {/* ── Card Row ── */}
      <div className={styles.cardRow}>
        {listings.map((listing) => (
          <FeaturedCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
