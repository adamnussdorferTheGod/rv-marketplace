import Icon from '@components/ui/Icon/Icon';
import { renderRichText } from '../renderRichText';
import { useStreamingText } from '../hooks/useStreamingText';
import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isLatest?: boolean;
}

export default function MessageBubble({
  role,
  content,
  isLatest = false,
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
      </div>
    </div>
  );
}
