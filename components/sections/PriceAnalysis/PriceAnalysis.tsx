import type { PriceAnalysisData } from '../../../app/src/data/types';
import PriceDistributionChart from '../../PriceDistributionChart';
import styles from './PriceAnalysis.module.css';

interface PriceAnalysisProps {
  currentPrice: number;
  dealRating: 'great' | 'good' | 'fair' | 'high';
  priceAnalysis: PriceAnalysisData;
  listingTitle: string;
}

export default function PriceAnalysis({ currentPrice, dealRating, priceAnalysis, listingTitle }: PriceAnalysisProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Price</h2>
      <p className={styles.explanation}>{priceAnalysis.explanation}</p>
      <a href={priceAnalysis.learnMoreUrl} className={styles.learnMore}>Learn more</a>

      <div className={styles.chartContainer}>
        <PriceDistributionChart
          listPrice={currentPrice}
          dealRating={dealRating}
          rangeMin={priceAnalysis.rangeMin}
          rangeMax={priceAnalysis.rangeMax}
          averagePrice={priceAnalysis.averagePrice}
          priceHistory={priceAnalysis.priceHistory}
          listingTitle={listingTitle}
        />
      </div>
    </div>
  );
}
