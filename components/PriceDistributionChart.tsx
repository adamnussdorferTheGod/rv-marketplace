import { useState, useEffect, useCallback, useRef } from 'react';
import PriceAlertSheet from './sections/PriceAlert/PriceAlertSheet';
import PriceAlertToast from './sections/PriceAlert/PriceAlertToast';
import styles from './PriceDistributionChart.module.css';

interface PriceHistoryEntry {
  date: string;
  change: string;
  price: number;
}

interface PriceDistributionChartProps {
  listPrice: number;
  dealRating: 'great' | 'good' | 'fair' | 'high';
  rangeMin: number;
  rangeMax: number;
  averagePrice: number;
  priceHistory: PriceHistoryEntry[];
  listingTitle: string;
  estimatedTotal?: string;
  onTotalCostClick?: () => void;
}

const DEAL_COLORS: Record<string, string> = {
  great: '#61c487',
  good: '#61c487',
  fair: '#d1de56',
  high: '#fa8131',
};

function formatPrice(value: number): string {
  return '$' + value.toLocaleString('en-US');
}

function formatPriceShort(value: number): string {
  const k = Math.round(value / 1000);
  return '$' + k + 'k';
}

function TrendingDownIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7L8.5 13.5L12.5 9.5L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17H22V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 7H21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
    </svg>
  );
}

function TrackPriceBanner({ listingTitle, formattedPrice }: { listingTitle: string; formattedPrice: string }) {
  const [tracking, setTracking] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToggle = () => {
    if (!tracking) {
      setSheetOpen(true);
    }
    setTracking((prev) => !prev);
  };

  const handleClose = () => {
    setSheetOpen(false);
    setTracking(false);
  };

  const handleCreate = (email: string, shareWithSeller: boolean) => {
    console.log('Price alert created:', { email, shareWithSeller, listingTitle });
    setSheetOpen(false);
    setShowToast(true);
  };

  const dismissToast = useCallback(() => {
    setShowToast(false);
  }, []);

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(dismissToast, 5000);
    return () => clearTimeout(timer);
  }, [showToast, dismissToast]);

  return (
    <>
      <div className={styles.trackPrice}>
        <div className={styles.trackIconWrapper}>
          <TrendingDownIcon />
        </div>
        <div className={styles.trackContent}>
          <span className={styles.trackTitle}>Track the price</span>
          <span className={styles.trackDescription}>
            Get notified the moment this listing&apos;s price drops
          </span>
        </div>
        <button
          className={`${styles.toggle} ${tracking ? styles.toggleOn : ''}`}
          onClick={handleToggle}
          role="switch"
          aria-checked={tracking}
          aria-label="Track the price"
        >
          <span className={styles.toggleThumb}>
            <span className={styles.toggleCheck}><CheckIcon /></span>
          </span>
        </button>
      </div>

      {sheetOpen && (
        <PriceAlertSheet
          listingTitle={listingTitle}
          formattedPrice={formattedPrice}
          onClose={handleClose}
          onCreate={handleCreate}
        />
      )}

      {showToast && <PriceAlertToast onDismiss={dismissToast} />}
    </>
  );
}

export default function PriceDistributionChart({
  listPrice,
  dealRating,
  rangeMin,
  rangeMax,
  averagePrice,
  priceHistory,
  listingTitle,
  estimatedTotal,
  onTotalCostClick,
}: PriceDistributionChartProps) {
  const [historyOpen, setHistoryOpen] = useState(true);
  const [gaugeVisible, setGaugeVisible] = useState(false);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const dealColor = DEAL_COLORS[dealRating] || DEAL_COLORS.good;

  useEffect(() => {
    const el = gaugeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGaugeVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Three equal visual sections: Low | Average | Above average
  // rangeMin..rangeMax defines "Average" zone
  const rangeSpan = rangeMax - rangeMin;
  const scaleMin = rangeMin - rangeSpan;
  const scaleMax = rangeMax + rangeSpan;
  const totalSpan = scaleMax - scaleMin;

  // Deal card position (clamped to keep card visible)
  const rawCardPos = ((listPrice - scaleMin) / totalSpan) * 100;
  const cardPos = Math.min(88, Math.max(12, rawCardPos));

  // Average price line position
  const avgPos = ((averagePrice - scaleMin) / totalSpan) * 100;

  // Hide avg line when it overlaps the deal card
  const showAvgLine = Math.abs(cardPos - avgPos) > 12;

  const formattedPrice = formatPrice(listPrice);

  return (
    <div className={styles.container}>
      {/* ── Gauge Visualization ── */}
      <div ref={gaugeRef} className={`${styles.gaugeArea} ${gaugeVisible ? styles.gaugeVisible : ''}`}>
        {showAvgLine && (
          <div className={styles.avgLabelRow}>
            <span className={styles.avgLabel} style={{ left: `${avgPos}%` }}>
              Avg. list price
            </span>
          </div>
        )}

        <div className={styles.barArea}>
          <div
            className={styles.dealCardPositioner}
            style={{ left: `${cardPos}%` }}
          >
            <div className={styles.dealCard} style={{ borderColor: dealColor }}>
              <span className={styles.dealCardLabel}>List price</span>
              <span className={styles.dealCardPrice}>{formatPrice(listPrice)}</span>
            </div>
            <div
              className={styles.dealCardPointer}
              style={{ borderTopColor: dealColor }}
            />
          </div>

          {showAvgLine && (
            <div className={styles.avgLine} style={{ left: `${avgPos}%` }} />
          )}
          <div className={styles.gradientBar} />
        </div>

        <div className={styles.sectionLabels}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionLabelTitle}>Low</span>
            <span className={styles.sectionLabelRange}>
              Below {formatPriceShort(rangeMin)}
            </span>
          </div>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionLabelTitle}>Average</span>
            <span className={styles.sectionLabelRange}>
              {formatPriceShort(rangeMin)}-{formatPriceShort(rangeMax)}
            </span>
          </div>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionLabelTitle}>Above average</span>
            <span className={styles.sectionLabelRange}>
              Above {formatPriceShort(rangeMax)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Price History ── */}
      <div className={styles.historySection}>
        <button
          className={styles.historyToggle}
          onClick={() => setHistoryOpen((prev) => !prev)}
          aria-expanded={historyOpen}
        >
          <div className={styles.historyTitleRow}>
            <span className={styles.historyIcon}>
              <ChartIcon />
            </span>
            <span className={styles.historyTitle}>Price history</span>
          </div>
          <ChevronIcon open={historyOpen} />
        </button>

        {historyOpen && (
          <div className={styles.historyContent}>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Change</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {priceHistory.map((entry, i) => (
                  <tr key={i}>
                    <td>{entry.date}</td>
                    <td>
                      <div className={styles.changeCell}>
                        <span className={styles.changeIcon}>
                          <TagIcon />
                        </span>
                        {entry.change}
                      </div>
                    </td>
                    <td>{formatPrice(entry.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.disclaimer}>
              Total price amount is based on price change information provided by the seller.
            </p>
          </div>
        )}
      </div>

      {/* ── Estimated Total Cost ── */}
      {onTotalCostClick && estimatedTotal && (
        <button
          type="button"
          className={styles.totalCostLink}
          onClick={onTotalCostClick}
        >
          Estimated total cost: {estimatedTotal}
        </button>
      )}

      {/* ── Track the Price ── */}
      <TrackPriceBanner listingTitle={listingTitle} formattedPrice={formattedPrice} />
    </div>
  );
}
