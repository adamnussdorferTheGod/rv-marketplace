import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { SrpSummaryData } from '@app/src/data/srpSummaryTypes';
import type { SRPListing, FilterCriteria } from '@app/src/data/srpTypes';
import type { TowVehicle } from '@app/src/data/towTypes';
import { buildSearchContext, classifyQuery } from '@app/src/data/srpAssistantService';
import { generateSrpChips, advanceChipHistory, mapAssistantCategoryToChipCategory, INITIAL_CHIP_HISTORY } from '@app/src/data/srpAssistantChips';
import type { ChipHistory, ChipEngineInput } from '@app/src/data/srpAssistantChips';
import { useIsMobile } from '@app/src/hooks/useIsMobile';
import { useAiMode } from '@components/sections/AiMode/AiModeContext';
import Icon from '../../ui/Icon/Icon';
import styles from './SrpSummaryCard.module.css';

// ── Inline decorative elements ─────────────────────────────────────

function TrendArrow({ direction }: { direction: 'up' | 'down' }) {
  return (
    <span className={`${styles.trendArrow} ${direction === 'down' ? styles.trendArrowDown : styles.trendArrowUp}`}>
      <Icon name={direction === 'down' ? 'arrow_downward' : 'arrow_upward'} size={14} />
    </span>
  );
}

/** Mini sparkline — trends up or down based on direction */
function MiniChart({ direction, id: instanceId = 'a' }: { direction: 'up' | 'down' | 'flat'; id?: string }) {
  const id = `mcf-${instanceId}`;
  // Down = line goes from top-left to bottom-right (prices dropping — good)
  // Up = line goes from bottom-left to top-right (prices rising)
  // Flat = gentle wave
  const linePath = direction === 'down'
    ? 'M3 5 L10 8 L17 7 L24 13 L31 11 L38 17 L43 19'
    : direction === 'up'
      ? 'M3 19 L10 17 L17 14 L24 10 L31 12 L38 6 L43 4'
      : 'M3 12 L10 10 L17 13 L24 11 L31 13 L38 10 L43 12';
  const fillPath = linePath + ' L43 24 L3 24 Z';

  return (
    <svg className={styles.miniChart} viewBox="0 0 46 24" width="46" height="23" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#905E01" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${id})`} />
      <path
        d={linePath}
        stroke="#D9B434"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Props ───────────────────────────────────────────────────────────

interface SrpSummaryCardProps {
  data: SrpSummaryData;
  listings?: SRPListing[];
  filters?: FilterCriteria;
  towVehicle?: TowVehicle | null;
  activeRvType?: string;
  onDismiss?: () => void;
}

export default function SrpSummaryCard({ data, listings = [], filters, towVehicle, activeRvType, onDismiss }: SrpSummaryCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [chipHistory, setChipHistory] = useState<ChipHistory>(INITIAL_CHIP_HISTORY);
  const { openPanel, sendMessage } = useAiMode();
  const isMobile = useIsMobile(767);
  const prevKeyRef = useRef(
    `${data.resultCount}-${data.headlineStats.medianPrice}`
  );

  // Skeleton flash on data change
  useEffect(() => {
    const newKey = `${data.resultCount}-${data.headlineStats.medianPrice}`;
    if (newKey !== prevKeyRef.current) {
      prevKeyRef.current = newKey;
      setIsLoading(true);
      setChipHistory(INITIAL_CHIP_HISTORY);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [data.resultCount, data.headlineStats.medianPrice]);

  // Build search context + chip input
  const searchContext = useMemo(
    () => buildSearchContext(data, listings, activeRvType ?? null),
    [data, listings, activeRvType]
  );

  const chipEngineInput = useMemo<ChipEngineInput>(() => ({
    search: searchContext,
    filters: filters ?? {
      keyword: '', rvTypes: [], makes: [], models: [],
      priceMin: null, priceMax: null, yearMin: null, yearMax: null,
      condition: 'all', zipCode: '', radiusMiles: 150,
      lengthMin: null, lengthMax: null, floorPlans: [],
      sleepingCapacity: null, fuelTypes: [], grossVehicleWeightMax: null,
    },
    towVehicle: towVehicle ?? null,
    listings,
  }), [searchContext, filters, towVehicle, listings]);

  const currentChips = useMemo(
    () => generateSrpChips(chipEngineInput, chipHistory),
    [chipEngineInput, chipHistory]
  );

  // Handlers
  const handleSend = useCallback((message: string) => {
    openPanel('srp-assistant');
    sendMessage(message);
    const assistantCategory = classifyQuery(message);
    const chipCategory = mapAssistantCategoryToChipCategory(assistantCategory);
    setChipHistory(prev => advanceChipHistory(prev, chipCategory));
  }, [openPanel, sendMessage]);

  const handleChipSelect = useCallback((chip: string) => {
    handleSend(chip);
  }, [handleSend]);

  const handleAskClick = useCallback(() => {
    openPanel('srp-assistant');
  }, [openPanel]);

  // Confidence gating
  if (data.confidence === 'insufficient') {
    return null;
  }

  // Derived values
  const { headlineStats } = data;
  const trendPercent = headlineStats.priceTrend.trendPercent;
  const trendIsDown = trendPercent < 0;
  const trendIsUp = trendPercent > 0;
  const trendIsFlat = !trendIsDown && !trendIsUp;
  const trendWord = trendIsDown ? 'down' : trendIsUp ? 'up' : 'stable';
  const trendAbs = Math.abs(trendPercent).toFixed(1);
  const medianFormatted = '$' + headlineStats.medianPrice.toLocaleString('en-US');
  const arrowDirection = trendIsDown ? 'down' : 'up' as const;
  const chartDirection: 'up' | 'down' | 'flat' = trendIsDown ? 'down' : trendIsUp ? 'up' : 'flat';

  // Skeleton
  if (isLoading) {
    return (
      <div className={styles.wrapper} aria-busy="true" aria-label="Loading market insights">
        <div className={styles.card}>
          <div className={styles.skeletonBar}>
            <div className={`${styles.skeleton} ${styles.skeletonNarrative}`} />
          </div>
          <div className={styles.skeletonBar} style={{ marginTop: 16 }}>
            <div className={`${styles.skeleton} ${styles.skeletonChip}`} />
            <div className={`${styles.skeleton} ${styles.skeletonChip}`} />
            <div className={`${styles.skeleton} ${styles.skeletonChip}`} />
            <div className={`${styles.skeleton} ${styles.skeletonChip}`} />
          </div>
        </div>
      </div>
    );
  }

  // Minimized view — full narrative with inline badges (always on mobile)
  if (minimized || isMobile) {
    return (
      <section
        role="region"
        aria-label="Market insights for your search"
        className={styles.minimizedWrapper}
      >
        <div className={styles.minimizedGlow} aria-hidden="true" />
        <div className={styles.minimizedCard}>
          <div className={styles.minimizedInner}>
            <span className={styles.sparkleIcon}>
              <Icon name="sparkles" size={24} />
            </span>
            <p className={styles.minimizedNarrative}>
              <span>Your search returned</span>
              <strong>{headlineStats.listingCount.toLocaleString('en-US')}</strong>
              <span>listings. The median asking price is</span>
              <strong>{medianFormatted}</strong>
              <span>and the current price trend is {trendWord}</span>
              {!trendIsFlat && (
                <>
                  <TrendArrow direction={arrowDirection} />
                  <strong>{trendAbs}%</strong>
                  <MiniChart direction={chartDirection} id="min-trend" />
                </>
              )}
            </p>
            {!isMobile && (
              <button
                type="button"
                className={styles.expandBtn}
                onClick={() => setMinimized(false)}
                aria-label="Expand market insights"
              >
                <Icon name="expand_more" size={20} />
              </button>
            )}
          </div>
          {isMobile && (
            <div className={styles.chipScroll}>
              {currentChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className={styles.chip}
                  onClick={() => handleChipSelect(chip)}
                >
                  {chip}
                </button>
              ))}
              <button
                type="button"
                className={styles.askButton}
                onClick={handleAskClick}
              >
                <Icon name="sparkles" size={16} />
                <span>Help</span>
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Full expanded view
  return (
    <section
      role="region"
      aria-label="Market insights for your search"
      className={styles.wrapper}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.card}>
        <button
          type="button"
          className={styles.minimizeBtn}
          onClick={() => setMinimized(true)}
          aria-label="Minimize market insights"
        >
          <Icon name="expand_less" size={20} />
        </button>
        <div className={styles.cardInner}>
          <span className={styles.sparkleIcon}>
            <Icon name="sparkles" size={24} />
          </span>
          <div className={styles.content}>
            {/* Inline narrative with embedded data badges */}
            <p className={styles.narrativeText}>
              <span>Your search returned</span>
              <strong>{headlineStats.listingCount.toLocaleString('en-US')}</strong>
              <span>listings.</span>
              {!isMobile && (
                <>
                  <span>The median asking price is</span>
                  {!trendIsFlat && <TrendArrow direction={arrowDirection} />}
                  <strong>{medianFormatted}</strong>
                  <MiniChart direction={chartDirection} id="price" />
                  <span>and the current price trend is {trendWord}</span>
                  {!trendIsFlat && (
                    <>
                      <TrendArrow direction={arrowDirection} />
                      <strong>{trendAbs}%</strong>
                      <MiniChart direction={chartDirection} id="trend" />
                    </>
                  )}
                </>
              )}
            </p>

            {/* Desktop: two chip rows. Mobile: single scrollable row */}
            {isMobile ? (
              <div className={styles.chipScroll}>
                {currentChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={styles.chip}
                    onClick={() => handleChipSelect(chip)}
                  >
                    {chip}
                  </button>
                ))}
                <button
                  type="button"
                  className={styles.askButton}
                  onClick={handleAskClick}
                >
                  <Icon name="sparkles" size={16} />
                  <span>Ask any question</span>
                </button>
              </div>
            ) : (
              <div className={styles.chipRows}>
                <div className={styles.chipRow}>
                  {currentChips.slice(0, Math.ceil(currentChips.length / 2)).map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={styles.chip}
                      onClick={() => handleChipSelect(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <div className={styles.chipRow}>
                  {currentChips.slice(Math.ceil(currentChips.length / 2)).map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={styles.chip}
                      onClick={() => handleChipSelect(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={styles.askButton}
                    onClick={handleAskClick}
                  >
                    <Icon name="sparkles" size={16} />
                    <span>Ask any question</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
