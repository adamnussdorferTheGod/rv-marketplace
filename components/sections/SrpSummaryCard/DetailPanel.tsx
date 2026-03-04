import type { PriceBin, DealBreakdown, HeadlineStats } from '@app/src/data/srpSummaryTypes';
import Icon from '../../ui/Icon/Icon';
import styles from './DetailPanel.module.css';

interface DetailPanelProps {
  priceDistribution: PriceBin[];
  dealBreakdown: DealBreakdown;
  headlineStats: HeadlineStats;
}

export default function DetailPanel({ priceDistribution, dealBreakdown, headlineStats }: DetailPanelProps) {
  const maxCount = Math.max(...priceDistribution.map(b => b.count), 1);
  const { great, good, fair, totalRated } = dealBreakdown;
  const belowMarket = great + good;
  const belowPct = totalRated > 0 ? Math.round((belowMarket / totalRated) * 100) : 0;
  const trendPct = headlineStats.priceTrend.trendPercent;
  const trendDir = trendPct < 0 ? 'down' : trendPct > 0 ? 'up' : 'flat';

  return (
    <div className={styles.panel}>
      {/* Price Distribution */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Price Distribution</h4>
        <div className={styles.histogram}>
          {priceDistribution.map((bin) => (
            <div key={bin.label} className={styles.histogramRow}>
              <span className={styles.binLabel}>{bin.label}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${(bin.count / maxCount) * 100}%` }}
                />
              </div>
              <span className={styles.binCount}>{bin.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deal Quality */}
      {totalRated > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Deal Quality</h4>
          <div className={styles.dealBar}>
            {great > 0 && (
              <div
                className={`${styles.dealSegment} ${styles.dealGreat}`}
                style={{ flex: great }}
                title={`${great} great deals`}
              />
            )}
            {good > 0 && (
              <div
                className={`${styles.dealSegment} ${styles.dealGood}`}
                style={{ flex: good }}
                title={`${good} good deals`}
              />
            )}
            {fair > 0 && (
              <div
                className={`${styles.dealSegment} ${styles.dealFair}`}
                style={{ flex: fair }}
                title={`${fair} fair deals`}
              />
            )}
          </div>
          <div className={styles.dealLegend}>
            {great > 0 && (
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotGreat}`} />
                Great ({great})
              </span>
            )}
            {good > 0 && (
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotGood}`} />
                Good ({good})
              </span>
            )}
            {fair > 0 && (
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotFair}`} />
                Fair ({fair})
              </span>
            )}
          </div>
          <p className={styles.dealSummaryText}>
            {belowPct}% of rated listings are priced below market value
          </p>
        </div>
      )}

      {/* Price Trend */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Price Trend</h4>
        <div className={styles.trendRow}>
          <div className={`${styles.trendIndicator} ${trendDir === 'down' ? styles.trendDown : trendDir === 'up' ? styles.trendUp : styles.trendFlat}`}>
            {trendDir !== 'flat' && (
              <Icon name={trendDir === 'down' ? 'arrow_downward' : 'arrow_upward'} size={20} />
            )}
            <span className={styles.trendValue}>
              {trendDir === 'flat' ? 'Flat' : `${Math.abs(trendPct).toFixed(1)}%`}
            </span>
          </div>
          <span className={styles.trendLabel}>
            {trendDir === 'down' && 'Prices are trending down vs the 6-month average'}
            {trendDir === 'up' && 'Prices are trending up vs the 6-month average'}
            {trendDir === 'flat' && 'Prices are stable vs the 6-month average'}
          </span>
        </div>
      </div>
    </div>
  );
}
