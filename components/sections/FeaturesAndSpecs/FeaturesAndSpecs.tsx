import Icon from '@components/ui/Icon/Icon';
import type { SpecItem } from '../../../app/src/data/types';
import styles from './FeaturesAndSpecs.module.css';

interface FeaturesAndSpecsProps {
  specs: SpecItem[];
  vin: string;
  stockNumber: string;
  daysOnSite: number;
}

export default function FeaturesAndSpecs({ specs, vin, stockNumber, daysOnSite }: FeaturesAndSpecsProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Features and specs</h2>
      <div className={styles.grid}>
        {specs.map((spec) => (
          <div key={spec.label} className={styles.card}>
            <span className={styles.cardIcon}>
              <Icon name={spec.icon} size={20} />
            </span>
            <span className={styles.cardValue}>{spec.value}</span>
            <span className={styles.cardLabel}>{spec.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.additionalInfo}>
        <span>VIN: {vin}</span>
        <span className={styles.infoDot}>&middot;</span>
        <span>Stock #{stockNumber}</span>
        <span className={styles.infoDot}>&middot;</span>
        <span>{daysOnSite} days on site</span>
      </div>
    </div>
  );
}
