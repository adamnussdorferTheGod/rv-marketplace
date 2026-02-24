import Icon from '@components/ui/Icon/Icon';
import { useAiMode } from '../AiModeContext';
import { useVdpVariant } from '@components/pages/VehicleDetailPage/VdpVariantContext';
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
  const { variant } = useVdpVariant();
  const isFitcheck = variant === 'option-2';

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {!isFitcheck && <Icon name="sparkles" size={20} className={styles.sparkles} />}
        <span className={isFitcheck ? styles.titleLarge : styles.title}>
          {isFitcheck ? 'Fitcheck' : 'AI Mode'}
        </span>
      </div>
      {!isFitcheck && isMobile && listingTitle && (
        <div className={styles.listingInfo}>
          <span className={styles.listingTitle}>{listingTitle}</span>
          {listingPrice && (
            <span className={styles.listingPrice}>{listingPrice}</span>
          )}
        </div>
      )}
      <button
        type="button"
        className={isFitcheck ? styles.closeButtonLarge : styles.closeButton}
        onClick={closePanel}
        aria-label={isFitcheck ? 'Close Fitcheck' : 'Close AI Mode'}
      >
        <Icon name="x_close" size={24} />
      </button>
    </div>
  );
}
