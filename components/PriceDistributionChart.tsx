import { useState } from 'react';
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
  explanation: string;
  priceHistory: PriceHistoryEntry[];
}

const RATING_LABELS: Record<string, string> = {
  great: 'great deal',
  good: 'good deal',
  fair: 'fair deal',
  high: 'high price',
};

const RATING_STYLES: Record<string, string> = {
  great: styles.ratingGreat,
  good: styles.ratingGood,
  fair: styles.ratingFair,
  high: styles.ratingHigh,
};

const MARKER_STYLES: Record<string, string> = {
  great: styles.markerGreat,
  good: styles.markerGood,
  fair: styles.markerFair,
  high: styles.markerHigh,
};

function formatPrice(value: number): string {
  return '$' + value.toLocaleString('en-US');
}

function InfoIcon() {
  return <span className={styles.infoIcon}>i</span>;
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

export default function PriceDistributionChart({
  listPrice,
  dealRating,
  rangeMin,
  rangeMax,
  explanation,
  priceHistory,
}: PriceDistributionChartProps) {
  const [historyOpen, setHistoryOpen] = useState(true);

  // Calculate gauge proportions
  // Scale extends 15% beyond range on each side for visual context
  const rangeSpan = rangeMax - rangeMin;
  const padding = rangeSpan * 0.3;
  const scaleMin = rangeMin - padding;
  const scaleMax = rangeMax + padding;
  const totalSpan = scaleMax - scaleMin;

  // Segment boundaries as percentages of total scale
  const greatEnd = ((rangeMin - scaleMin) / totalSpan) * 100;    // purple: below rangeMin
  const goodEnd = ((rangeMax - scaleMin) / totalSpan) * 100;     // green: rangeMin to rangeMax
  const fairEnd = goodEnd + (100 - goodEnd) * 0.5;               // orange: half of above-range
  // red: remainder

  const goodWidth = goodEnd - greatEnd;
  const fairWidth = fairEnd - goodEnd;
  const highWidth = 100 - fairEnd;

  // Marker position (clamped to 2%–98% for visual)
  const rawMarkerPos = ((listPrice - scaleMin) / totalSpan) * 100;
  const markerPos = Math.min(98, Math.max(2, rawMarkerPos));

  return (
    <div className={styles.card}>
      {/* ── Deal Verdict ── */}
      <div className={styles.verdictSection}>
        <div className={styles.verdictHeader}>
          <div className={styles.verdictLeft}>
            <h3 className={styles.verdictTitle}>
              This vehicle is a{' '}
              <span className={`${styles.ratingWord} ${RATING_STYLES[dealRating]}`}>
                {RATING_LABELS[dealRating]}
              </span>
            </h3>
            <div className={styles.explanationRow}>
              <span className={styles.explanation}>{explanation}</span>
              <InfoIcon />
            </div>
          </div>
          <div className={styles.priceCallout}>
            <div className={styles.priceCalloutBubble}>{formatPrice(listPrice)}</div>
            <div className={styles.priceCalloutPointer} />
          </div>
        </div>

        {/* ── Gauge Bar ── */}
        <div className={styles.gaugeContainer}>
          <div className={styles.gaugeTrack}>
            <div
              className={`${styles.gaugeSegment} ${styles.segmentGreat}`}
              style={{ width: `${greatEnd}%` }}
            />
            <div
              className={`${styles.gaugeSegment} ${styles.segmentGood}`}
              style={{ width: `${goodWidth}%` }}
            />
            <div
              className={`${styles.gaugeSegment} ${styles.segmentFair}`}
              style={{ width: `${fairWidth}%` }}
            />
            <div
              className={`${styles.gaugeSegment} ${styles.segmentHigh}`}
              style={{ width: `${highWidth}%` }}
            />
            <div
              className={`${styles.gaugeMarker} ${MARKER_STYLES[dealRating]}`}
              style={{ left: `${markerPos}%` }}
            />
          </div>
          <div className={styles.gaugeLabels}>
            <span className={styles.gaugeLabel} style={{ left: `${greatEnd}%` }}>
              {formatPrice(rangeMin)}
            </span>
            <span className={styles.gaugeLabel} style={{ left: `${goodEnd}%` }}>
              {formatPrice(rangeMax)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Price History ── */}
      <div className={styles.divider} />
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
    </div>
  );
}
