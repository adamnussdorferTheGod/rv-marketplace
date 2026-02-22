import Icon from '@components/ui/Icon/Icon';
import styles from './VehicleHistoryReport.module.css';

interface VehicleHistoryReportProps {
  vhrAvailable: boolean;
}

export default function VehicleHistoryReport({ vhrAvailable }: VehicleHistoryReportProps) {
  if (!vhrAvailable) {
    return (
      <div className={styles.card}>
        <h3 className={styles.heading}>Vehicle History Report</h3>
        <p className={styles.unavailableText}>No vehicle history report available</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <div className={styles.iconWrapper}>
          <Icon name="check_circle" size={24} />
        </div>
        <h3 className={styles.heading}>Vehicle History Report</h3>
      </div>
      <p className={styles.subtext}>
        A vehicle history report is available for this listing. Review the
        vehicle&apos;s title, accident, and ownership history before you buy.
      </p>
      <a href="#" className={styles.cta}>
        Get Vehicle History Report
      </a>
    </div>
  );
}
