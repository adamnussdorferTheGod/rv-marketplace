import Icon from '@components/ui/Icon/Icon';
import { useAiMode } from '../AiModeContext';
import styles from './AiModeHeader.module.css';

interface AiModeHeaderProps {
  listingTitle?: string;
  listingPrice?: string;
  isMobile?: boolean;
}

export default function AiModeHeader({
  listingTitle,
  listingPrice,
  isMobile,
}: AiModeHeaderProps) {
  const { closePanel } = useAiMode();

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Icon name="sparkles" size={20} className={styles.sparkles} />
        <span className={styles.title}>AI Mode</span>
      </div>
      {isMobile && listingTitle && (
        <div className={styles.listingInfo}>
          <span className={styles.listingTitle}>{listingTitle}</span>
          {listingPrice && (
            <span className={styles.listingPrice}>{listingPrice}</span>
          )}
        </div>
      )}
      <button
        type="button"
        className={styles.closeButton}
        onClick={closePanel}
        aria-label="Close AI Mode"
      >
        <Icon name="x_close" size={20} />
      </button>
    </div>
  );
}
