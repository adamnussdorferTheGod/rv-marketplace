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
}

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

function relativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function SharedListCard({
  listId,
  listingId,
  addedBy,
  addedAt,
}: SharedListCardProps) {
  const {
    getCommentsForListing,
    getReactionsForListing,
    activeList,
  } = useCoShopping();

  const [showComments, setShowComments] = useState(false);

  // Look up the SRP listing by ID
  const listing = sampleSrpListings.find((l) => l.id === listingId);

  if (!listing) {
    return (
      <div className={styles.card}>
        <div className={styles.content}>
          <p className={styles.title}>Listing not found</p>
          <p className={styles.location}>
            This listing may have been removed.
          </p>
        </div>
      </div>
    );
  }

  const comments = getCommentsForListing(listId, listingId);
  const commentCount = comments.length;
  const reactions = getReactionsForListing(listId, listingId);
  const members = activeList?.members ?? [];

  // Match indicator: all members have reacted "love"
  const isMatch =
    members.length > 0 &&
    members.every((member) => {
      const reaction = reactions.find((r) => r.memberId === member.id);
      return reaction?.type === 'love';
    });

  // Look up who added this listing
  const addedByMember = members.find((m) => m.id === addedBy);
  const addedByName = addedByMember?.displayName ?? 'Unknown';

  // Photo
  const photo = listing.photos?.[0];

  // RV type label
  const rvTypeLabel = RV_TYPE_LABELS[listing.rvType] ?? listing.rvType;

  return (
    <div className={styles.card}>
      {/* Photo area */}
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
        {isMatch && (
          <div className={styles.matchBadge}>
            <Icon name="check_circle" size={16} />
            <span>Match!</span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className={styles.content}>
        <h3 className={styles.title}>{listing.title}</h3>

        <div className={styles.priceRow}>
          <span className={styles.price}>
            {formatPrice(listing.currentPrice)}
          </span>
          {listing.originalPrice != null &&
            listing.originalPrice !== listing.currentPrice && (
              <span className={styles.priceOriginal}>
                {formatPrice(listing.originalPrice)}
              </span>
            )}
        </div>

        <p className={styles.location}>
          {listing.location.city}, {listing.location.state}
        </p>

        <div className={styles.keySpecs}>
          <span>{rvTypeLabel}</span>
          <span className={styles.specDivider}>&middot;</span>
          <span>{listing.lengthFt} ft</span>
          <span className={styles.specDivider}>&middot;</span>
          <span>Sleeps {listing.sleepingCapacity}</span>
        </div>

        <p className={styles.addedBy}>
          Added by {addedByName} &middot; {relativeTime(addedAt)}
        </p>
      </div>

      {/* Reaction section */}
      <div className={styles.reactionSection}>
        <ReactionBar listId={listId} listingId={listingId} />
      </div>

      {/* Comment toggle */}
      <button
        type="button"
        className={styles.commentToggle}
        onClick={() => setShowComments((prev) => !prev)}
      >
        <Icon name="sms" size={18} />
        <span>
          {commentCount} comment{commentCount !== 1 ? 's' : ''}
        </span>
      </button>

      {/* Comment thread */}
      {showComments && (
        <div className={styles.commentSection}>
          <CommentThread listId={listId} listingId={listingId} />
        </div>
      )}
    </div>
  );
}
