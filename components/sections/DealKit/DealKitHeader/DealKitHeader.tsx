import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import { useDealKit } from '../DealKitContext';
import styles from './DealKitHeader.module.css';

interface DealKitHeaderProps {
  onDownloadPdf: () => void;
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function DealKitHeader({ onDownloadPdf }: DealKitHeaderProps) {
  const { closeDealKit, data } = useDealKit();

  return (
    <header className={styles.header}>
      <button className={styles.backBtn} onClick={closeDealKit}>
        <Icon name="arrow_back" size={20} />
        <span>Back to Listing</span>
      </button>
      {data && (
        <div className={styles.titleGroup}>
          <img
            src={data.vehicleImage}
            alt={data.vehicleTitle}
            className={styles.vehicleThumb}
          />
          <div className={styles.vehicleInfo}>
            <span className={styles.vehicleName}>{data.vehicleTitle}</span>
            <span className={styles.vehiclePrice}>{formatPrice(data.listPrice)}</span>
          </div>
        </div>
      )}
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
