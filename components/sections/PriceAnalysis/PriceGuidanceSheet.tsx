import Icon from '@components/ui/Icon/Icon';
import styles from './PriceGuidanceSheet.module.css';

interface PriceGuidanceSheetProps {
  dealRating: 'great' | 'good' | 'fair' | 'high';
  listingTitle: string;
  onClose: () => void;
}

const dealLabels: Record<string, string> = {
  great: 'Well below market price',
  good: 'Below market price',
  fair: 'Near market price',
  high: 'Above market price',
};

const factors = [
  'Year',
  'Make, model, floor plan',
  'Mileage',
  'State',
  'Past 2 year historical listing prices',
];

export default function PriceGuidanceSheet({ dealRating, listingTitle, onClose }: PriceGuidanceSheetProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* Handle bar — mobile only */}
        <div className={styles.handle}>
          <div className={styles.handleBar} />
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerSpacer} />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <Icon name="x_close" size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Deal rating card */}
          <div className={styles.ratingCard}>
            <div className={`${styles.dealBadge} ${styles[`deal_${dealRating}`]}`}>
              <span className={styles.dealBadgeIcon}>
                <Icon name="arrow_downward" size={16} />
              </span>
              <span className={styles.dealBadgeLabel}>{dealLabels[dealRating]}</span>
            </div>

            <p className={styles.cardText}>
              This RV's listed price is significantly lower than similar RVs advertised on our site.
            </p>
            <p className={styles.cardText}>
              The rating compares the seller's asking price to historical listing prices for similar RVs in the same geographical area from the past two years.
            </p>
            <p className={styles.cardText}>
              Condition, upgrades, and unique features aren't factored in, so be sure to review the listing details, photos, and seller notes to decide if it's right for you.
            </p>
          </div>

          {/* Factors section */}
          <div className={styles.factorsSection}>
            <p className={styles.factorsIntro}>
              Our analysis compares this RV with similar {listingTitle}s, factoring in a variety of variables including:
            </p>
            <ul className={styles.factorsList}>
              {factors.map((factor) => (
                <li key={factor} className={styles.factorItem}>
                  <span className={styles.factorCheck}>
                    <Icon name="check" size={20} />
                  </span>
                  <span className={styles.factorLabel}>{factor}</span>
                </li>
              ))}
            </ul>
            <p className={styles.disclaimer}>
              RV Trader's price analysis is designed to give you a starting point for your research. We recommend contacting the seller directly to learn more about the RV's condition, features, history, and any upgrades that may influence its price. When possible, schedule an in-person walkthrough or inspection to ensure it meets your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
