import type { PriceAnalysisData } from '../../../app/src/data/types';
import PriceDistributionChart from '../../PriceDistributionChart';
import styles from './PriceAnalysis.module.css';

interface PriceAnalysisProps {
  currentPrice: number;
  dealRating: 'great' | 'good' | 'fair' | 'high';
  priceAnalysis: PriceAnalysisData;
  listingTitle: string;
  estimatedTotal?: string;
  onTotalCostClick?: () => void;
}

export default function PriceAnalysis({ currentPrice, dealRating, priceAnalysis, listingTitle, estimatedTotal, onTotalCostClick }: PriceAnalysisProps) {
  return (
    <div className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.textCol}>
          <h2 className={styles.heading}>Price</h2>
          <p className={styles.explanation}>{priceAnalysis.explanation}</p>
          <a href={priceAnalysis.learnMoreUrl} className={styles.learnMore}>Learn more</a>
        </div>
        <div className={styles.chartCol}>
          <PriceDistributionChart
            listPrice={currentPrice}
            dealRating={dealRating}
            rangeMin={priceAnalysis.rangeMin}
            rangeMax={priceAnalysis.rangeMax}
            averagePrice={priceAnalysis.averagePrice}
            priceHistory={priceAnalysis.priceHistory}
            listingTitle={listingTitle}
            estimatedTotal={estimatedTotal}
            onTotalCostClick={onTotalCostClick}
          />
        </div>
      </div>
    </div>
  );
}
