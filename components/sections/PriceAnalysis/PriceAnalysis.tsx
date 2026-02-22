import type { PriceAnalysisData } from '../../../app/src/data/types';
import styles from './PriceAnalysis.module.css';

interface PriceAnalysisProps {
  currentPrice: number;
  dealRating: 'great' | 'good' | 'fair' | 'high';
  priceAnalysis: PriceAnalysisData;
}

function formatPrice(value: number): string {
  return '$' + value.toLocaleString('en-US');
}

const DEAL_POSITION: Record<string, string> = {
  great: '15%',
  good: '35%',
  fair: '60%',
  high: '85%',
};

export default function PriceAnalysis({ currentPrice, dealRating, priceAnalysis }: PriceAnalysisProps) {
  const indicatorLeft = DEAL_POSITION[dealRating] || '50%';

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Price</h2>
      <p className={styles.explanation}>{priceAnalysis.explanation}</p>
      <a href={priceAnalysis.learnMoreUrl} className={styles.learnMore}>Learn more</a>

      {/* Price gauge bar */}
      <div className={styles.gaugeContainer}>
        {/* Average price label above bar */}
        <div className={styles.avgPriceLabel}>
          <span>Avg. list price</span>
          <span className={styles.avgPriceValue}>{formatPrice(priceAnalysis.averagePrice)}</span>
        </div>

        {/* Deal indicator card */}
        <div className={styles.indicatorWrapper} style={{ left: indicatorLeft }}>
          <div className={styles.indicatorCard}>
            <span className={styles.indicatorLabel}>List price</span>
            <span className={styles.indicatorPrice}>{formatPrice(currentPrice)}</span>
          </div>
          <div className={styles.indicatorPointer} />
        </div>

        {/* Gauge track */}
        <div className={styles.gaugeTrack}>
          <div className={`${styles.segment} ${styles.segmentLow}`} />
          <div className={`${styles.segment} ${styles.segmentFair}`} />
          <div className={`${styles.segment} ${styles.segmentHigh}`} />
          <div className={`${styles.segment} ${styles.segmentOverpriced}`} />
        </div>

        {/* Segment labels */}
        <div className={styles.segmentLabels}>
          <span>Low</span>
          <span>Fair</span>
          <span>High</span>
          <span>Overpriced</span>
        </div>
      </div>

      {/* Price history */}
      <div className={styles.priceHistory}>
        <h3 className={styles.historyHeading}>Price history</h3>
        <ul className={styles.historyList}>
          {priceAnalysis.priceHistory.map((entry, index) => (
            <li key={index} className={styles.historyEntry}>
              <span className={styles.historyDate}>{entry.date}</span>
              <span className={styles.historyChange}>{entry.change}</span>
              <span className={styles.historyPrice}>{formatPrice(entry.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
