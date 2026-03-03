import type { MarketInsightsInsufficient } from '../../../app/src/data/marketInsightsTypes';
import Icon from '@components/ui/Icon/Icon';
import styles from './MarketInsights.module.css';

interface InsufficientDataProps {
  data: MarketInsightsInsufficient;
}

export default function InsufficientData({ data }: InsufficientDataProps) {
  return (
    <div className={styles.insufficient}>
      <div className={styles.insufficientIcon}>
        <Icon name="info" size={28} />
      </div>
      <p className={styles.insufficientHeading}>Limited Market Data</p>
      <p className={styles.insufficientMessage}>
        Only {data.comparableCount} comparable {data.rvType} listing{data.comparableCount !== 1 ? 's' : ''} found
        (minimum {data.minimumRequired} needed for insights).
      </p>
    </div>
  );
}
