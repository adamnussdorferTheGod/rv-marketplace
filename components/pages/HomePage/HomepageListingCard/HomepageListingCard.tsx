import { Link } from 'react-router-dom';
import { listingPath } from '../../../../app/src/routes';
import type { HomepageListingData } from '../../../../app/src/data/homepageData';
import Icon from '../../../ui/Icon/Icon';
import styles from './HomepageListingCard.module.css';

interface HomepageListingCardProps {
  listing: HomepageListingData;
}

export default function HomepageListingCard({ listing }: HomepageListingCardProps) {
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
        <button
          type="button"
          className={styles.favoriteBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label="Save to favorites"
        >
          <Icon name="favorite" size={32} />
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
