import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import { useDealKit } from '../DealKitContext';
import styles from './DealKitHeader.module.css';

interface DealKitHeaderProps {
  onDownloadPdf: () => void;
}

export default function DealKitHeader({ onDownloadPdf }: DealKitHeaderProps) {
  const { closeDealKit, data } = useDealKit();

  return (
    <header className={styles.header}>
      <button className={styles.backBtn} onClick={closeDealKit}>
        <Icon name="arrow_back" size={20} />
        <span>Back to Listing</span>
      </button>
      <div className={styles.titleGroup}>
        <Icon name="sparkles" size={20} />
        <h1 className={styles.title}>Walk-In Deal Kit</h1>
      </div>
      <div className={styles.actions}>
        {data && (
          <span className={styles.date}>Generated {data.generatedAt}</span>
        )}
        <Button
          variant="secondary"
          size="sm"
          leadingIcon="download"
          onClick={onDownloadPdf}
        >
          Download PDF
        </Button>
      </div>
    </header>
  );
}
