import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import { useDealKit } from '../DealKitContext';
import styles from './DealKitCard.module.css';

export default function DealKitCard() {
  const { openDealKit } = useDealKit();

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <Icon name="sparkles" size={32} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.heading}>Walk-In Deal Kit</h3>
        <p className={styles.subtext}>
          Get a personalized briefing with deal score, offer range, inspection
          checklist, and negotiation talking points — powered by AI.
        </p>
      </div>
      <Button
        variant="primary"
        size="lg"
        leadingIcon="sparkles"
        className={styles.cta}
        onClick={openDealKit}
      >
        Get Your Deal Kit — Free
      </Button>
    </div>
  );
}
