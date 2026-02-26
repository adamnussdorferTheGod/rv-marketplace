import { Link } from 'react-router-dom';
import { listingPath } from '../../../../app/src/routes';
import type { HomepageListingData } from '../../../../app/src/data/homepageData';
import styles from './HomepageListingCard.module.css';

interface HomepageListingCardProps {
  listing: HomepageListingData;
}

export default function HomepageListingCard({ listing }: HomepageListingCardProps) {
  const location = listing.dealer.distanceMiles
    ? `${listing.dealer.city}, ${listing.dealer.state} \u00b7 ${listing.dealer.distanceMiles} mi`
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
        <span className={styles.conditionBadge}>
          {listing.condition === 'new' ? 'New' : 'Used'}
        </span>
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>{listing.title}</h3>
        <span className={styles.location}>{location}</span>
        <span className={styles.price}>${listing.currentPrice.toLocaleString()}</span>
        {listing.monthlyPayment > 0 && (
          <span className={styles.monthly}>${listing.monthlyPayment.toLocaleString()}/mo est.</span>
        )}
      </div>
    </Link>
  );
}
