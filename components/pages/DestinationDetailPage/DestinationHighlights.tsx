import Icon from '@components/ui/Icon/Icon';
import type { DestinationHighlight } from '../../../app/src/data/lifestyleTypes';
import styles from './DestinationHighlights.module.css';

interface DestinationHighlightsProps {
  highlights: DestinationHighlight[];
}

export default function DestinationHighlights({ highlights }: DestinationHighlightsProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Highlights</h2>
      <div className={styles.grid}>
        {highlights.map(h => (
          <div key={h.label} className={styles.item}>
            <div className={styles.iconWrap}>
              <Icon name={h.icon} size={24} />
            </div>
            <span className={styles.label}>{h.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
