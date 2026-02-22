import Icon from '@components/ui/Icon/Icon';
import styles from './ReportListing.module.css';

export default function ReportListing() {
  return (
    <div className={styles.section}>
      <Icon name="flag" size={16} />
      <a href="#" className={styles.link}>Report listing</a>
    </div>
  );
}
