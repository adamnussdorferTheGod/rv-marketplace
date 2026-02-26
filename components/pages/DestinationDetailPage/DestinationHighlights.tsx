import type { DestinationHighlight } from '../../../app/src/data/lifestyleTypes';
import styles from './DestinationHighlights.module.css';

const ICON_MAP: Record<string, string> = {
  beach: 'beach_access',
  hiking: 'hiking',
  fishing: 'phishing',
  swimming: 'pool',
  binoculars: 'visibility',
  kayak: 'kayaking',
};

interface DestinationHighlightsProps {
  highlights: DestinationHighlight[];
}

export default function DestinationHighlights({ highlights }: DestinationHighlightsProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Highlights</h2>
      <div className={styles.grid}>
        {highlights.map(h => (
          <div key={h.label} className={styles.card}>
            <div className={styles.iconWrap}>
              <span className={`material-symbols-rounded ${styles.materialIcon}`}>
                {ICON_MAP[h.icon] ?? h.icon}
              </span>
            </div>
            <span className={styles.label}>{h.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
