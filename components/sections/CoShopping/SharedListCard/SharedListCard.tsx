import { useState } from 'react';
import { useCoShopping } from '../CoShoppingContext';
import { sampleSrpListings } from '../../../../app/src/data/sampleSrpListings';
import { RV_TYPE_LABELS } from '../../../../app/src/data/srpTypes';
import ReactionBar from '../ReactionBar/ReactionBar';
import CommentThread from '../CommentThread/CommentThread';
import Icon from '../../../ui/Icon/Icon';
import styles from './SharedListCard.module.css';

interface SharedListCardProps {
  listId: string;
  listingId: string;
  addedBy: string;
  addedAt: string;
  compact?: boolean;
}

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

export default function SharedListCard({
  listId,
  listingId,
  addedBy,
  addedAt,
  compact,
}: SharedListCardProps) {
  const { getCommentsForListing, removeListing } = useCoShopping();
  const [showComments, setShowComments] = useState(false);

  const listing = sampleSrpListings.find((l) => l.id === listingId);

  if (!listing) {
    return (
      <div className={styles.card}>
        <div className={styles.content}>
          <p className={styles.title}>Listing not found</p>
        </div>
      </div>
    );
  }

  const comments = getCommentsForListing(listId, listingId);
  const commentCount = comments.length;
  const photo = listing.photos?.[0];
  const rvTypeLabel = RV_TYPE_LABELS[listing.rvType] ?? listing.rvType;

  const conditionLabel = listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1);
  const subtitle = [conditionLabel, rvTypeLabel].filter(Boolean).join(' \u2022 ');

  return (
    <div className={styles.card}>
      {/* Top row: photo left, content right */}
      <div className={styles.topRow}>
        <div className={styles.photoArea}>
          {photo ? (
            <img
              className={styles.photo}
              src={photo.url}
              alt={photo.alt}
            />
          ) : (
            <div className={styles.photoPlaceholder}>
              <Icon name="directions_car" size={48} />
            </div>
          )}

          {/* Remove button */}
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => removeListing(listId, listingId)}
            aria-label="Remove from list"
          >
            <Icon name="x_close" size={16} />
          </button>
        </div>

        <div className={styles.content}>
          <span className={styles.subtitle}>{subtitle}</span>
          <h3 className={styles.title}>{listing.title}</h3>
          <span className={styles.price}>{formatPrice(listing.currentPrice)}</span>
        </div>
      </div>

      {/* Full mode: divider, reactions, comments */}
      {!compact && (
        <>
          <div className={styles.divider} />

          <div className={styles.reactionSection}>
            <ReactionBar listId={listId} listingId={listingId} />
          </div>

          <button
            type="button"
            className={styles.commentRow}
            onClick={() => setShowComments((prev) => !prev)}
          >
            <Icon name="sms" size={20} />
            <span>{commentCount} comment{commentCount !== 1 ? 's' : ''}</span>
          </button>

          {showComments && (
            <div className={styles.commentSection}>
              <CommentThread listId={listId} listingId={listingId} hideHeader />
            </div>
          )}
        </>
      )}
    </div>
  );
}
