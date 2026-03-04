import Icon from '@components/ui/Icon/Icon';
import type { SRPListing } from '../../../../app/src/data/srpTypes';
import { renderRichText } from '../renderRichText';
import { useStreamingText } from '../hooks/useStreamingText';
import ChatListingCard from '../ChatListingCard/ChatListingCard';
import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isLatest?: boolean;
  listings?: SRPListing[];
}

export default function MessageBubble({
  role,
  content,
  isLatest = false,
  listings,
}: MessageBubbleProps) {
  const isStreaming = role === 'assistant' && isLatest;
  const displayedText = useStreamingText(content, isStreaming);

  if (role === 'user') {
    return (
      <div className={styles.userRow}>
        <div className={styles.userBubble}>{content}</div>
      </div>
    );
  }

  return (
    <div className={styles.assistantRow}>
      <div className={styles.sparkleIcon}>
        <Icon name="sparkles" size={16} />
      </div>
      <div className={styles.assistantBubble}>
        {renderRichText(displayedText)}
        {listings && listings.length > 0 && (
          <div className={styles.listingCards}>
            {listings.map((listing) => (
              <ChatListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
