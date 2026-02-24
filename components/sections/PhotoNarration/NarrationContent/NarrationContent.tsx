import type { NarrationData } from '../../../../app/src/data/types';
import Icon from '@components/ui/Icon/Icon';
import styles from './NarrationContent.module.css';

interface NarrationContentProps {
  narration: NarrationData;
  variant?: 'full' | 'compact';
  className?: string;
}

export default function NarrationContent({
  narration,
  variant = 'full',
  className,
}: NarrationContentProps) {
  if (variant === 'compact') {
    return (
      <div className={`${styles.compact} ${className || ''}`.trim()}>
        <span className={styles.compactLabel}>{narration.area_label}</span>
        <span className={styles.compactDescription}>{narration.description}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.content} ${className || ''}`.trim()}>
      {/* Area Label */}
      <h3 className={styles.areaLabel}>{narration.area_label}</h3>

      {/* Description */}
      <p className={styles.description}>{narration.description}</p>

      {/* Notable Features */}
      {narration.notable_features && narration.notable_features.length > 0 && (
        <div className={`${styles.calloutSection} ${styles.featureSection}`}>
          <ul className={styles.calloutList}>
            {narration.notable_features.map((feature, i) => (
              <li key={i} className={styles.calloutItem}>
                <Icon name="check_filled" size={20} className={styles.featureIcon} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Worth Checking */}
      {narration.worth_checking && narration.worth_checking.length > 0 && (
        <div className={`${styles.calloutSection} ${styles.warningSection}`}>
          <ul className={styles.calloutList}>
            {narration.worth_checking.map((item, i) => (
              <li key={i} className={styles.calloutItem}>
                <Icon name="flag_filled" size={20} className={styles.warningIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comparison Note */}
      {narration.comparison_note && (
        <blockquote className={styles.comparisonNote}>
          {narration.comparison_note}
        </blockquote>
      )}

      {/* Disclaimer */}
      <p className={styles.disclaimer}>
        AI-generated narration. Details may be inaccurate — verify with seller.
      </p>
    </div>
  );
}
