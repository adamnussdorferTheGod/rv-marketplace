import styles from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
  rvType?: string;
}

export default function Breadcrumbs({ rvType }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <a href="/" className={styles.link}>Home</a>
      <span className={styles.separator} aria-hidden="true">&gt;</span>
      {rvType ? (
        <>
          <a href="/search" className={styles.link}>Browse RVs</a>
          <span className={styles.separator} aria-hidden="true">&gt;</span>
          <span className={styles.active}>{rvType}</span>
        </>
      ) : (
        <span className={styles.active}>Browse RVs</span>
      )}
    </nav>
  );
}
