import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { SrpSummaryData } from '@app/src/data/srpSummaryTypes';
import type { SRPListing } from '@app/src/data/srpTypes';
import { buildSearchContext, mockSrpAssistantService, classifyQuery } from '@app/src/data/srpAssistantService';
import { generateSrpChips, advanceChipContext, INITIAL_CHIP_CONTEXT } from '@app/src/data/srpAssistantChips';
import type { ChipContext } from '@app/src/data/srpAssistantChips';
import { useIsMobile } from '@app/src/hooks/useIsMobile';
import Icon from '../../ui/Icon/Icon';
import StatBar from './StatBar';
import AiNarrative from './AiNarrative';
import OverflowMenu from './OverflowMenu';
import SrpChatInput from './SrpChatInput';
import SrpPromptChips from './SrpPromptChips';
import styles from './SrpSummaryCard.module.css';

interface SrpSummaryCardProps {
  data: SrpSummaryData;
  listings?: SRPListing[];
  activeRvType?: string;
  onDismiss?: () => void;
}

export default function SrpSummaryCard({ data, listings = [], activeRvType, onDismiss }: SrpSummaryCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [chipContext, setChipContext] = useState<ChipContext>(INITIAL_CHIP_CONTEXT);
  const [isSending, setIsSending] = useState(false);
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
      setChipContext(INITIAL_CHIP_CONTEXT);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [data.resultCount, data.headlineStats.medianPrice]);

  // Build SearchContext and chips
  const searchContext = useMemo(
    () => buildSearchContext(data, listings, activeRvType ?? null),
    [data, listings, activeRvType]
  );

  const currentChips = useMemo(
    () => generateSrpChips(searchContext, chipContext),
    [searchContext, chipContext]
  );

  // Handle send
  const handleSend = useCallback(async (message: string) => {
    setIsSending(true);
    try {
      await mockSrpAssistantService(message, searchContext);
      const category = classifyQuery(message);
      setChipContext(prev => advanceChipContext(prev, category));
    } finally {
      setIsSending(false);
    }
  }, [searchContext]);

  // Handle chip select
  const handleChipSelect = useCallback((chip: string) => {
    handleSend(chip);
  }, [handleSend]);

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

      {(confidence === 'full' || confidence === 'medium') && (
        <div className={styles.chatSection}>
          <SrpChatInput
            onSend={handleSend}
            placeholder="Ask about these results..."
            disabled={isSending}
          />
          <SrpPromptChips
            chips={currentChips}
            onSelect={handleChipSelect}
            disabled={isSending}
          />
        </div>
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
