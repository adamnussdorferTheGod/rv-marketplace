import type { HeadlineStats } from '@app/src/data/srpSummaryTypes';
import Icon from '../../ui/Icon/Icon';
import styles from './SrpSummaryCard.module.css';

interface StatBarProps {
  stats: HeadlineStats;
  groundingLabel: string;
}

export default function StatBar({ stats, groundingLabel }: StatBarProps) {
  const trendPercent = stats.priceTrend.trendPercent;
  const trendAbs = Math.abs(trendPercent).toFixed(1);
  const isDown = trendPercent < 0;
  const isUp = trendPercent > 0;
  const isFlat = trendPercent === 0;

  // Build accessible trend description
  const trendDescription = isFlat
    ? 'Price trend: prices flat vs 6-month average'
    : isDown
      ? `Price trend: prices down ${trendAbs}% ${stats.priceTrend.referenceWindow}`
      : `Price trend: prices up ${trendAbs}% ${stats.priceTrend.referenceWindow}`;

  return (
    <div>
      <div className={styles.statBar}>
        {/* Listing Count */}
        <div className={styles.statItem}>
          <span className={styles.srOnly}>Listings found:</span>
          <span className={styles.statLabel}>Listings</span>
          <span className={styles.statValue}>
            {stats.listingCount.toLocaleString('en-US')}
          </span>
        </div>

        {/* Median Price */}
        <div className={styles.statItem}>
          <span className={styles.srOnly}>Median asking price:</span>
          <span className={styles.statLabel}>Median Price</span>
          <span className={styles.statValue}>
            {'$' + stats.medianPrice.toLocaleString('en-US')}
          </span>
        </div>

        {/* Price Trend */}
        <div className={styles.statItem}>
          <span className={styles.srOnly}>{trendDescription}</span>
          <span className={styles.statLabel}>Price Trend</span>
          <span
            className={`${styles.statValue} ${
              isDown ? styles.trendDown : isUp ? styles.trendUp : styles.trendFlat
            }`}
            aria-hidden="true"
          >
            {isFlat ? (
              'Flat'
            ) : (
              <>
                <Icon
                  name={isDown ? 'arrow_downward' : 'arrow_upward'}
                  size={16}
                />
                {trendAbs}% {isDown ? 'down' : 'up'}
              </>
            )}
          </span>
        </div>

        {/* Avg Days on Market */}
        <div className={styles.statItem}>
          <span className={styles.srOnly}>Average days on market:</span>
          <span className={styles.statLabel}>Avg Days on Market</span>
          <span className={styles.statValue}>
            {stats.avgDaysOnMarket} days
          </span>
        </div>
      </div>

      <div className={styles.groundingLabel}>{groundingLabel}</div>
    </div>
  );
}
