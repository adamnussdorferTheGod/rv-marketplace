import { useState, useEffect, useRef } from 'react';
import type { SrpSummaryData } from '@app/src/data/srpSummaryTypes';
import StatBar from './StatBar';
import styles from './SrpSummaryCard.module.css';

interface SrpSummaryCardProps {
  data: SrpSummaryData;
  onDismiss?: () => void;
}

export default function SrpSummaryCard({ data }: SrpSummaryCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const prevKeyRef = useRef(
    `${data.resultCount}-${data.headlineStats.medianPrice}`
  );

  // Skeleton flash when data changes (filter change triggers new data)
  useEffect(() => {
    const newKey = `${data.resultCount}-${data.headlineStats.medianPrice}`;
    if (newKey !== prevKeyRef.current) {
      prevKeyRef.current = newKey;
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [data.resultCount, data.headlineStats.medianPrice]);

  // Confidence gating: hide card when insufficient data
  if (data.confidence === 'insufficient') {
    return null;
  }

  // Skeleton state
  if (isLoading) {
    return (
      <div className={styles.card} aria-busy="true" aria-label="Loading market insights">
        <div className={styles.skeletonBar}>
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
        </div>
      </div>
    );
  }

  return (
    <section
      role="region"
      aria-label="Market insights for your search"
      className={styles.card}
    >
      <StatBar
        stats={data.headlineStats}
        groundingLabel={data.narrative.groundingLabel}
      />

      {/* Narrative placeholder -- AiNarrative will be added in Plan 02 */}
      {data.confidence === 'full' && (
        <div className={styles.narrativePlaceholder} />
      )}
      {data.confidence === 'medium' && (
        <div className={styles.narrativePlaceholder} />
      )}
      {/* data.confidence === 'low' renders stat bar only, no narrative */}
    </section>
  );
}
