import Icon from '../../../ui/Icon/Icon';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
  rvType?: string;
}

export default function Breadcrumbs({ rvType }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <a href="/" className={styles.link}>Home</a>
      <Icon name="chevron_right" size={20} className={styles.separator} />
      {rvType ? (
        <>
          <a href="/search" className={styles.link}>Browse RVs</a>
          <Icon name="chevron_right" size={20} className={styles.separator} />
          <span className={styles.current}>{rvType}</span>
        </>
      ) : (
        <span className={styles.current}>Browse RVs</span>
      )}
    </nav>
  );
}
