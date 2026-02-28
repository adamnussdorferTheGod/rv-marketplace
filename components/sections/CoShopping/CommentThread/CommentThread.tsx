import { useState } from 'react';
import { useCoShopping } from '../CoShoppingContext';
import Icon from '../../../ui/Icon/Icon';
import styles from './CommentThread.module.css';

interface CommentThreadProps {
  listId: string;
  listingId: string;
  collapsed?: boolean;
  hideHeader?: boolean;
  maxVisible?: number;
}

/** Compute a human-friendly relative time string. */
function relativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CommentThread({
  listId,
  listingId,
  collapsed: initialCollapsed = false,
  hideHeader = false,
  maxVisible,
}: CommentThreadProps) {
  const {
    addComment,
    getCommentsForListing,
    currentUserId,
    activeList,
  } = useCoShopping();

  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [inputValue, setInputValue] = useState('');
  const [showAll, setShowAll] = useState(false);

  const allComments = getCommentsForListing(listId, listingId)
    .slice()
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

  const commentCount = allComments.length;
  const members = activeList?.members ?? [];
  const currentMember = members.find((m) => m.id === currentUserId);

  const shouldLimit =
    maxVisible !== undefined && !showAll && commentCount > maxVisible;
  const visibleComments = shouldLimit
    ? allComments.slice(-maxVisible!)
    : allComments;

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    addComment(listId, listingId, text);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`${styles.commentThread} ${isCollapsed ? styles.collapsed : ''}`}
    >
      {!hideHeader && (
        <button
          type="button"
          className={styles.header}
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-expanded={!isCollapsed}
        >
          <span className={styles.headerIcon}>
            <Icon name="sms" size={18} />
          </span>
          <span className={styles.commentCount}>
            {commentCount} comment{commentCount !== 1 ? 's' : ''}
          </span>
        </button>
      )}

      {!isCollapsed && (
        <>
          <div className={styles.commentList}>
            {shouldLimit && (
              <button
                type="button"
                className={styles.showAll}
                onClick={() => setShowAll(true)}
              >
                Show all {commentCount} comments
              </button>
            )}

            {visibleComments.map((comment) => {
              const author = members.find((m) => m.id === comment.authorId);
              return (
                <div key={comment.id} className={styles.comment}>
                  <div
                    className={styles.commentAvatar}
                    style={author?.avatarUrl ? undefined : {
                      backgroundColor: author?.avatarColor ?? '#939598',
                    }}
                  >
                    {author?.avatarUrl ? (
                      <img src={author.avatarUrl} alt={author.displayName} className={styles.avatarImg} />
                    ) : (
                      author?.avatarInitials ?? '?'
                    )}
                  </div>
                  <div className={styles.commentContent}>
                    <div className={styles.commentMeta}>
                      <span className={styles.commentAuthor}>
                        {author?.displayName ?? 'Unknown'}
                      </span>
                      <span className={styles.commentTime}>
                        {relativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.inputRow}>
            {currentMember && (
              <div
                className={styles.inputAvatar}
                style={currentMember.avatarUrl ? undefined : { backgroundColor: currentMember.avatarColor }}
              >
                {currentMember.avatarUrl ? (
                  <img src={currentMember.avatarUrl} alt={currentMember.displayName} className={styles.avatarImg} />
                ) : (
                  currentMember.avatarInitials
                )}
              </div>
            )}
            <input
              type="text"
              className={styles.textInput}
              placeholder="Add a comment..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className={styles.sendButton}
              onClick={handleSend}
              disabled={!inputValue.trim()}
              aria-label="Send comment"
            >
              <Icon name="send" size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
