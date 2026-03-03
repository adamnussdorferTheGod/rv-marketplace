import type { MarketInsightsResult } from '../../../app/src/data/marketInsightsTypes';
import InsightCard from './InsightCard';
import InsufficientData from './InsufficientData';
import styles from './MarketInsights.module.css';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const RATING_LABELS: Record<string, string> = {
  great: 'Great time to buy',
  good: 'Good time to buy',
  fair: 'Fair timing',
  poor: 'Peak season',
};

interface MarketInsightsProps {
  data: MarketInsightsResult;
}

export default function MarketInsights({ data }: MarketInsightsProps) {
  if (data.status === 'insufficient') {
    return (
      <div className={styles.section}>
        <h2 className={styles.heading}>Market insights</h2>
        <InsufficientData data={data} />
      </div>
    );
  }

  const { supply, seasonal, priceDrop } = data;

  // Card 1 — Days on site
  const daysValue = String(supply.avgDaysOnSite);
  const daysDesc = `Similar listings have ${supply.avgDaysOnSite} avg days on site`;
  const trendSign = supply.trend === 'rising' ? '+' : supply.trend === 'falling' ? '-' : '';
  const daysPill = `${trendSign}${supply.totalListings} listings`;

  // Card 2 — Seasonal timing
  const demandPct = `${Math.round(seasonal.savingsVsPeak)}%`;
  const peakName = MONTH_NAMES[seasonal.peakMonth];
  const seasonDesc = seasonal.savingsVsPeak > 0
    ? `Less demand compared to peak (${peakName})`
    : `At peak demand`;
  const seasonPill = RATING_LABELS[seasonal.rating] ?? 'Fair timing';

  // Card 3 — Price changes
  const priceValue = priceDrop?.hasRecentDrop
    ? `-$${priceDrop.dropAmount.toLocaleString()}`
    : '$0';
  const priceDesc = priceDrop?.hasRecentDrop
    ? `${priceDrop.dropPercent.toFixed(1)}% price drop`
    : 'No recent price changes';
  const pricePill = priceDrop && priceDrop.marketDropRate > 50
    ? 'Above average'
    : priceDrop && priceDrop.marketDropRate > 25
      ? 'Average'
      : 'Below average';

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Market insights</h2>
      <div className={styles.cardGrid}>
        <InsightCard
          icon="arrow_downward"
          value={daysValue}
          description={daysDesc}
          pillLabel={daysPill}
        />
        <InsightCard
          icon="calendar"
          value={demandPct}
          description={seasonDesc}
          pillLabel={seasonPill}
        />
        <InsightCard
          icon="arrow_downward"
          value={priceValue}
          description={priceDesc}
          pillLabel={pricePill}
        />
      </div>
    </div>
  );
}
