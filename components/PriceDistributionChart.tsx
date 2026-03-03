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

function formatPrice(value: number): string {
  return '$' + value.toLocaleString('en-US');
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

/** Gauge-only component — renders just the price visualization bar. */
export function PriceGauge({
  listPrice,
  rangeMin,
  rangeMax,
  averagePrice,
}: Pick<PriceDistributionChartProps, 'listPrice' | 'rangeMin' | 'rangeMax' | 'averagePrice'>) {
  const [gaugeVisible, setGaugeVisible] = useState(false);
  const gaugeRef = useRef<HTMLDivElement>(null);

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

  const rangeSpan = rangeMax - rangeMin;
  const scaleMin = rangeMin - rangeSpan;
  const scaleMax = rangeMax + rangeSpan;
  const totalSpan = scaleMax - scaleMin;

  const dotPos = Math.min(97, Math.max(3, ((listPrice - scaleMin) / totalSpan) * 100));
  const avgPos = Math.min(95, Math.max(5, ((averagePrice - scaleMin) / totalSpan) * 100));

  return (
    <div ref={gaugeRef} className={`${styles.gaugeArea} ${gaugeVisible ? styles.gaugeVisible : ''}`}>
      <div className={styles.gaugeTop}>
        <div className={styles.avgGroup}>
          <span className={styles.avgLabel}>Average price</span>
          <span className={styles.avgValue}>{formatPrice(averagePrice)}</span>
          <div className={styles.avgLine} />
        </div>
        <div className={styles.dealPill} style={{ left: `${dotPos}%` }}>
          <span className={styles.dealPillPrice}>{formatPrice(listPrice)}</span>
        </div>
      </div>

      <div className={styles.barRow}>
        <div className={`${styles.barSegment} ${styles.segmentTeal}`} />
        <div className={`${styles.barSegment} ${styles.segmentGreen}`} />
        <div className={`${styles.barSegment} ${styles.segmentLime}`} />
        <div className={styles.barDot} style={{ left: `${dotPos}%` }} />
      </div>

      <div className={styles.rangeLabels}>
        <span className={styles.rangeLabel} style={{ left: '33%' }}>
          {formatPrice(rangeMin)}
        </span>
        <span className={styles.rangeLabel} style={{ left: '66%' }}>
          {formatPrice(rangeMax)}
        </span>
      </div>
    </div>
  );
}

/** Full-width sections: price history, estimated total, track price. */
export function PriceDetails({
  listPrice,
  priceHistory,
  listingTitle,
  estimatedTotal,
  onTotalCostClick,
}: Pick<PriceDistributionChartProps, 'listPrice' | 'priceHistory' | 'listingTitle' | 'estimatedTotal' | 'onTotalCostClick'>) {
  const [historyOpen, setHistoryOpen] = useState(true);
  const formattedPrice = formatPrice(listPrice);

  return (
    <div className={styles.container}>
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

      {onTotalCostClick && estimatedTotal && (
        <button
          type="button"
          className={styles.totalCostLink}
          onClick={onTotalCostClick}
        >
          Estimated total cost: {estimatedTotal}
        </button>
      )}

      <TrackPriceBanner listingTitle={listingTitle} formattedPrice={formattedPrice} />
    </div>
  );
}

/** @deprecated Use PriceGauge + PriceDetails separately instead. */
export default function PriceDistributionChart(props: PriceDistributionChartProps) {
  return (
    <div>
      <PriceGauge
        listPrice={props.listPrice}
        rangeMin={props.rangeMin}
        rangeMax={props.rangeMax}
        averagePrice={props.averagePrice}
      />
      <PriceDetails
        listPrice={props.listPrice}
        priceHistory={props.priceHistory}
        listingTitle={props.listingTitle}
        estimatedTotal={props.estimatedTotal}
        onTotalCostClick={props.onTotalCostClick}
      />
    </div>
  );
}
