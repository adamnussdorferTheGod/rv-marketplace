import Icon from '@components/ui/Icon/Icon';
import { useAiMode } from '@components/sections/AiMode/AiModeContext';
import styles from './AISummary.module.css';

interface AISummaryProps {
  aiSummary: string;
}

export default function AISummary({ aiSummary }: AISummaryProps) {
  const { openPanel } = useAiMode();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.heading}>AI summary</h2>
        <span className={styles.newBadge}>NEW</span>
      </div>
      <div className={styles.bodyWrap}>
        <div className={styles.body}>
          {aiSummary.split('\n\n').map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.fade} />
      </div>
      <button type="button" className={styles.searchPrompt} onClick={openPanel}>
        <Icon name="sparkles" size={24} />
        <span>Dive deeper in AI-Mode</span>
      </button>
    </div>
  );
}
