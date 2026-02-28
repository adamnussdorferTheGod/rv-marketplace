import { useCoShopping } from '../CoShoppingContext';
import SharedListCard from '../SharedListCard/SharedListCard';
import Icon from '../../../ui/Icon/Icon';
import styles from './SharedListPanel.module.css';

interface SharedListPanelProps {
  className?: string;
}

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

export default function SharedListPanel({ className }: SharedListPanelProps) {
  const { activeList, lists } = useCoShopping();

  // No lists at all
  if (lists.length === 0) {
    return (
      <div className={`${styles.panel} ${className ?? ''}`}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Icon name="playlist_add" size={48} />
          </div>
          <p>No shared lists yet</p>
          <p>Create a list and invite someone to start co-shopping!</p>
        </div>
      </div>
    );
  }

  // No active list selected
  if (!activeList) {
    return (
      <div className={`${styles.panel} ${className ?? ''}`}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Icon name="list" size={48} />
          </div>
          <p>No shared list selected</p>
          <p>Select a list to see its listings.</p>
        </div>
      </div>
    );
  }

  const members = activeList.members;

  // Sort listings by addedAt descending (most recent first)
  const sortedListings = [...activeList.listings].sort(
    (a, b) =>
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
  );

  return (
    <div className={`${styles.panel} ${className ?? ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.listName}>{activeList.name}</h2>

        <div className={styles.membersRow}>
          <div className={styles.memberAvatars}>
            {members.map((member) => (
              <div
                key={member.id}
                className={styles.memberAvatar}
                style={{ backgroundColor: member.avatarColor }}
                title={member.displayName}
              >
                {member.avatarInitials}
              </div>
            ))}
          </div>
          <span className={styles.memberCount}>
            {members.length} member{members.length !== 1 ? 's' : ''}
          </span>
        </div>

        <span className={styles.lastUpdated}>
          Updated {relativeTime(activeList.updatedAt)}
        </span>
      </div>

      {/* Card list or empty listings state */}
      {sortedListings.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Icon name="search" size={48} />
          </div>
          <p>No listings added yet.</p>
          <p>Browse RVs and add your favorites!</p>
        </div>
      ) : (
        <div className={styles.cardList}>
          {sortedListings.map((sl) => (
            <SharedListCard
              key={sl.listingId}
              listId={activeList.id}
              listingId={sl.listingId}
              addedBy={sl.addedBy}
              addedAt={sl.addedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
