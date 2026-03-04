import { Link } from 'react-router-dom';
import type { SRPListing } from '../../../../app/src/data/srpTypes';
import { listingPath } from '../../../../app/src/routes';
import styles from './ChatListingCard.module.css';

interface ChatListingCardProps {
  listing: SRPListing;
}

const DEAL_DOT: Record<string, { label: string; color: string }> = {
  great: { label: 'Great deal', color: '#036c6c' },
  good:  { label: 'Good deal',  color: '#49a46c' },
  fair:  { label: 'Fair deal',  color: '#acb646' },
};

export default function ChatListingCard({ listing }: ChatListingCardProps) {
  const title = `${listing.year} ${listing.make} ${listing.model}`;
  const price = '$' + listing.currentPrice.toLocaleString('en-US');
  const deal = listing.dealRating ? DEAL_DOT[listing.dealRating] : null;
  const photo = listing.photos[0]?.url;

  return (
    <Link
      to={listingPath(listing.slug ?? listing.id)}
      className={styles.card}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.photo}>
        {photo ? (
          <img src={photo} alt={title} className={styles.img} loading="lazy" />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <div className={styles.meta}>
          <span className={styles.price}>{price}</span>
          {deal && (
            <span className={styles.deal}>
              <span className={styles.dot} style={{ background: deal.color }} />
              {deal.label}
            </span>
          )}
        </div>
      </div>
      <span className={styles.viewLink}>View</span>
    </Link>
  );
}
