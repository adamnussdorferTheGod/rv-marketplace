import { useState } from 'react';
import { useCoShopping } from '../CoShoppingContext';
import { MOCK_USER_SARAH } from '../../../../app/src/data/sampleCoShopping';
import SharedListCard from '../SharedListCard/SharedListCard';
import SavedRVsAuthGate from '../SavedRVsAuthGate/SavedRVsAuthGate';
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

const FREE_SAVE_LIMIT = 3;

export default function SharedListPanel({ className }: SharedListPanelProps) {
  const { activeList, lists, addMember } = useCoShopping();
  const [showInviteToast, setShowInviteToast] = useState(false);

  const handleInvite = () => {
    // Demo: add Sarah as a member to show the shared state
    if (activeList && activeList.members.length < 2) {
      addMember(activeList.id, MOCK_USER_SARAH);
    }
    setShowInviteToast(true);
    setTimeout(() => setShowInviteToast(false), 2500);
  };

  // No lists at all
  if (lists.length === 0) {
    return (
      <div className={`${styles.panel} ${className ?? ''}`}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Icon name="playlist_add" size={48} />
          </div>
          <p>No saved RVs yet</p>
          <p>Heart an RV to start saving, then invite someone to co-shop!</p>
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
          <p>No list selected</p>
          <p>Select a list to see your saved RVs.</p>
        </div>
      </div>
    );
  }

  const members = activeList.members;
  const isShared = members.length >= 2;

  // Sort listings by addedAt descending (most recent first)
  const sortedListings = [...activeList.listings].sort(
    (a, b) =>
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
  );

  // ─── Empty state: no listings saved ────────────────────────────────
  if (sortedListings.length === 0) {
    return (
      <div className={`${styles.panel} ${className ?? ''}`}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <p className={styles.emptyTitle}>Start saving RVs you love</p>
          <p className={styles.emptyDescription}>
            Tap the heart on any listing to add it here. Build your shortlist and share it with a co-shopper.
          </p>
        </div>
      </div>
    );
  }

  // ─── Solo state: 1 member with listings ────────────────────────────
  if (!isShared) {
    return (
      <div className={`${styles.panel} ${className ?? ''}`}>
        {/* Invite CTA card */}
        <button type="button" className={styles.inviteCta} onClick={handleInvite}>
          <Icon name="person_add" size={24} />
          <div className={styles.inviteCtaText}>
            <span className={styles.inviteCtaTitle}>Invite a co-shopper</span>
            <span className={styles.inviteCtaDescription}>Share this list to compare, react, and decide together.</span>
          </div>
        </button>

        {showInviteToast && (
          <div className={styles.inviteToast}>
            Sarah has been added! (Demo)
          </div>
        )}

        {/* Compact cards for solo mode */}
        <div className={styles.cardList}>
          {sortedListings.slice(0, FREE_SAVE_LIMIT).map((sl) => (
            <SharedListCard
              key={sl.listingId}
              listId={activeList.id}
              listingId={sl.listingId}
              addedBy={sl.addedBy}
              addedAt={sl.addedAt}
              compact
            />
          ))}
        </div>

        {/* Auth gate with blurred overflow cards */}
        {sortedListings.length >= FREE_SAVE_LIMIT && (
          <SavedRVsAuthGate>
            {sortedListings.slice(FREE_SAVE_LIMIT).map((sl) => (
              <SharedListCard
                key={sl.listingId}
                listId={activeList.id}
                listingId={sl.listingId}
                addedBy={sl.addedBy}
                addedAt={sl.addedAt}
                compact
              />
            ))}
          </SavedRVsAuthGate>
        )}
      </div>
    );
  }

  // ─── Shared state: 2+ members ──────────────────────────────────────
  return (
    <div className={`${styles.panel} ${className ?? ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.membersRow}>
          <div className={styles.memberAvatars}>
            {members.map((member) => (
              <div
                key={member.id}
                className={styles.memberAvatar}
                style={member.avatarUrl ? undefined : { backgroundColor: member.avatarColor }}
                title={member.displayName}
              >
                {member.avatarUrl ? (
                  <img src={member.avatarUrl} alt={member.displayName} className={styles.avatarImg} />
                ) : (
                  member.avatarInitials
                )}
              </div>
            ))}
          </div>
          <span className={styles.memberCount}>
            {members.length} member{members.length !== 1 ? 's' : ''}
          </span>
          <button
            className={styles.inviteButton}
            onClick={handleInvite}
            title="Invite member"
          >
            <Icon name="person_add" size={20} />
            Invite
          </button>
        </div>

        {showInviteToast && (
          <div className={styles.inviteToast}>
            Invite link copied! (Coming soon)
          </div>
        )}

        <span className={styles.lastUpdated}>
          Updated {relativeTime(activeList.updatedAt)}
        </span>
      </div>

      {/* Full cards with reactions and comments */}
      <div className={styles.cardList}>
        {sortedListings.slice(0, FREE_SAVE_LIMIT).map((sl) => (
          <SharedListCard
            key={sl.listingId}
            listId={activeList.id}
            listingId={sl.listingId}
            addedBy={sl.addedBy}
            addedAt={sl.addedAt}
          />
        ))}
      </div>

      {/* Auth gate with blurred overflow cards */}
      {sortedListings.length >= FREE_SAVE_LIMIT && (
        <SavedRVsAuthGate>
          {sortedListings.slice(FREE_SAVE_LIMIT).map((sl) => (
            <SharedListCard
              key={sl.listingId}
              listId={activeList.id}
              listingId={sl.listingId}
              addedBy={sl.addedBy}
              addedAt={sl.addedAt}
            />
          ))}
        </SavedRVsAuthGate>
      )}
    </div>
  );
}
