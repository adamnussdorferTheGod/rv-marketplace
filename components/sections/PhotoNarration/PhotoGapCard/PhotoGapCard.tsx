import Icon from '@components/ui/Icon/Icon';
import { useNarration } from '../NarrationContext';
import styles from './PhotoGapCard.module.css';

export default function PhotoGapCard() {
  const { gapAnalysis } = useNarration();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Icon name="camera" size={24} className={styles.cameraIcon} />
        <h3 className={styles.heading}>Photo Coverage Report</h3>
      </div>

      <div className={styles.score}>
        <span className={styles.scoreValue}>{gapAnalysis.coverage_score}%</span>
        <span className={styles.scoreLabel}>coverage score</span>
      </div>

      <div className={styles.missing}>
        <h4 className={styles.missingHeading}>Missing photo categories:</h4>
        <ul className={styles.missingList}>
          {gapAnalysis.missing_categories.map((cat, i) => (
            <li key={i} className={styles.missingItem}>{cat}</li>
          ))}
        </ul>
      </div>

      <div className={styles.tip}>
        <Icon name="lightbulb" size={16} className={styles.tipIcon} />
        <span>Ask the seller for photos of these areas before scheduling a visit.</span>
      </div>

      <button className={styles.cta}>
        Ask Seller About Missing Photos &rarr;
      </button>
    </div>
  );
}
