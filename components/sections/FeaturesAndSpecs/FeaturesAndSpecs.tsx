import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import type { SpecItem } from '../../../app/src/data/types';
import styles from './FeaturesAndSpecs.module.css';

interface FeaturesAndSpecsProps {
  specs: SpecItem[];
}

export default function FeaturesAndSpecs({ specs }: FeaturesAndSpecsProps) {
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
      <Button variant="tertiary" size="lg">
        See all vehicle specs
      </Button>
    </div>
  );
}
