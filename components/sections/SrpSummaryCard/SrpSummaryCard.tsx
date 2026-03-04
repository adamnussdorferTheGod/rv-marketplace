import { useState, useEffect, useRef } from 'react';
import type { SrpSummaryData } from '@app/src/data/srpSummaryTypes';
import { useIsMobile } from '@app/src/hooks/useIsMobile';
import Icon from '../../ui/Icon/Icon';
import StatBar from './StatBar';
import AiNarrative from './AiNarrative';
import OverflowMenu from './OverflowMenu';
import styles from './SrpSummaryCard.module.css';

interface SrpSummaryCardProps {
  data: SrpSummaryData;
  onDismiss?: () => void;
}

export default function SrpSummaryCard({ data, onDismiss }: SrpSummaryCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const isMobile = useIsMobile(767);
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

  const confidence = data.confidence;
  const { headlineStats } = data;
  const trendDirection = headlineStats.priceTrend.trendPercent < 0 ? 'down' : 'up';
  const trendAbs = Math.abs(headlineStats.priceTrend.trendPercent).toFixed(1);
  const medianFormatted = '$' + headlineStats.medianPrice.toLocaleString('en-US');

  // Build collapsed summary text
  const collapsedText = `${headlineStats.listingCount} listings \u00B7 Median ${medianFormatted} \u00B7 Prices ${trendDirection} ${trendAbs}%`;

  const renderFullContent = () => (
    <>
      <div className={styles.cardHeader}>
        <StatBar
          stats={headlineStats}
          groundingLabel={data.narrative.groundingLabel}
        />
        {onDismiss && <OverflowMenu onDismiss={onDismiss} />}
      </div>

      {confidence === 'full' && (
        <AiNarrative narrative={data.narrative} generatedAt={data.generatedAt} />
      )}
      {confidence === 'medium' && (
        <AiNarrative narrative={data.narrative} generatedAt={data.generatedAt} shortened />
      )}
    </>
  );

  // Mobile: collapsed single-line or expanded full content
  if (isMobile) {
    return (
      <section
        role="region"
        aria-label="Market insights for your search"
        className={styles.card}
      >
        {!mobileExpanded ? (
          <button
            type="button"
            className={styles.collapsedLine}
            aria-expanded={false}
            aria-controls="srp-summary-expanded"
            onClick={() => setMobileExpanded(true)}
          >
            <span className={styles.summaryText}>{collapsedText}</span>
            <Icon name="expand_more" size={20} />
          </button>
        ) : (
          <div>
            <div className={styles.expandHeader}>
              <button
                type="button"
                className={styles.collapseBtn}
                aria-expanded={true}
                aria-controls="srp-summary-expanded"
                onClick={() => setMobileExpanded(false)}
              >
                <Icon name="expand_less" size={20} />
                <span>Collapse</span>
              </button>
            </div>
            <div id="srp-summary-expanded">
              {renderFullContent()}
            </div>
          </div>
        )}
      </section>
    );
  }

  // Desktop / Tablet: full content always visible
  return (
    <section
      role="region"
      aria-label="Market insights for your search"
      className={styles.card}
    >
      {renderFullContent()}
    </section>
  );
}
