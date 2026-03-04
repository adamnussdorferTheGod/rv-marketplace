import type { NarrativeData } from '@app/src/data/srpSummaryTypes';
import styles from './SrpSummaryCard.module.css';

interface AiNarrativeProps {
  narrative: NarrativeData;
  generatedAt: string;
  shortened?: boolean;
}

export default function AiNarrative({ narrative, generatedAt, shortened }: AiNarrativeProps) {
  return (
    <div className={styles.narrativeSection}>
      <p className={styles.narrativeHeadline}>{narrative.headline}</p>
      {!shortened && (
        <p className={styles.narrativeBody}>{narrative.body}</p>
      )}
      <div className={styles.timestamp}>Updated {generatedAt}</div>
    </div>
  );
}
