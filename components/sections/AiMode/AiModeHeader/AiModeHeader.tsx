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
  const { closePanel, panelMode } = useAiMode();
  const isFitcheck = panelMode === 'fitcheck';
  const isPlan = panelMode === 'plan';
  const isSrpAssistant = panelMode === 'srp-assistant';

  const title = isPlan ? 'Plan with AI' : isSrpAssistant ? 'Search Assistant' : isFitcheck ? 'Fitcheck' : 'Ask a question';
  const showSparkles = true;
  const useLargeStyle = isFitcheck || panelMode === 'default' || isSrpAssistant;

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {showSparkles && <Icon name="sparkles" size={20} className={styles.sparkles} />}
        <span className={useLargeStyle ? styles.titleLarge : styles.title}>
          {title}
        </span>
      </div>
      {!isFitcheck && !isPlan && isMobile && listingTitle && (
        <div className={styles.listingInfo}>
          <span className={styles.listingTitle}>{listingTitle}</span>
          {listingPrice && (
            <span className={styles.listingPrice}>{listingPrice}</span>
          )}
        </div>
      )}
      <button
        type="button"
        className={useLargeStyle ? styles.closeButtonLarge : styles.closeButton}
        onClick={closePanel}
        aria-label={`Close ${title}`}
      >
        <Icon name="x_close" size={24} />
      </button>
    </div>
  );
}
