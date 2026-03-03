import { useState } from 'react';
import type { PriceAnalysisData } from '../../../app/src/data/types';
import { PriceGauge, PriceDetails } from '../../PriceDistributionChart';
import PriceGuidanceSheet from './PriceGuidanceSheet';
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
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.textCol}>
          <h2 className={styles.heading}>Price</h2>
          <p className={styles.explanation}>{priceAnalysis.explanation}</p>
          <button className={styles.learnMore} onClick={() => setSheetOpen(true)}>
            Learn more
          </button>
        </div>
        <div className={styles.chartCol}>
          <PriceGauge
            listPrice={currentPrice}
            rangeMin={priceAnalysis.rangeMin}
            rangeMax={priceAnalysis.rangeMax}
            averagePrice={priceAnalysis.averagePrice}
          />
        </div>
      </div>
      <PriceDetails
        listPrice={currentPrice}
        priceHistory={priceAnalysis.priceHistory}
        listingTitle={listingTitle}
        estimatedTotal={estimatedTotal}
        onTotalCostClick={onTotalCostClick}
      />

      {sheetOpen && (
        <PriceGuidanceSheet
          dealRating={dealRating}
          listingTitle={listingTitle}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </div>
  );
}
