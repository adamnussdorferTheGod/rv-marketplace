import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import { useDealKit } from '../DealKitContext';
import styles from './DealKitCard.module.css';

const features = [
  'Questions to ask',
  'Inspection checklist',
  'Offer range',
  'Listing insights',
];

export default function DealKitCard() {
  const { openDealKit } = useDealKit();

  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        <img
          className={styles.cover}
          src="/deal-kit/cover.png"
          alt=""
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>Walk-in Deal Kit</h3>
        <p className={styles.description}>
          Get a personalized briefing with deal score, offer range, inspection
          checklist, and negotiation talking points.
        </p>
        <div className={styles.features}>
          {features.map((f) => (
            <div key={f} className={styles.feature}>
              <Icon name="check" size={20} />
              <span>{f}</span>
            </div>
          ))}
        </div>
        <Button
          variant="tertiary"
          size="sm"
          className={styles.cta}
          onClick={openDealKit}
        >
          Get Walk-in Deal Kit
        </Button>
      </div>
    </div>
  );
}
