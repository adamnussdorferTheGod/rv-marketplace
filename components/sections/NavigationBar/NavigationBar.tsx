import { Link } from 'react-router-dom';
import Icon from '@components/ui/Icon/Icon';
import { ROUTES } from '../../../app/src/routes';
import styles from './NavigationBar.module.css';

interface NavigationBarProps {
  resultPosition: number;
  totalResults: number;
  prevSlug?: string;
  nextSlug?: string;
}

export default function NavigationBar({ resultPosition, totalResults, prevSlug, nextSlug }: NavigationBarProps) {
  return (
    <nav className={styles.navigationBar}>
      <Link to={ROUTES.SEARCH} className={styles.backLink}>
        <Icon name="chevron_left" size={20} />
        Search results
      </Link>
      <div className={styles.pagination}>
        <span className={styles.resultText}>
          Result {resultPosition.toLocaleString()} of {totalResults.toLocaleString()}
        </span>
        {prevSlug ? (
          <Link to={`/listing/${prevSlug}`} className={styles.navLink}>
            <Icon name="chevron_left" size={20} />
            Previous
          </Link>
        ) : (
          <span className={`${styles.navLink} ${styles.navLinkDisabled}`}>
            <Icon name="chevron_left" size={20} />
            Previous
          </span>
        )}
        {nextSlug ? (
          <Link to={`/listing/${nextSlug}`} className={styles.navLink}>
            Next
            <Icon name="chevron_right" size={20} />
          </Link>
        ) : (
          <span className={`${styles.navLink} ${styles.navLinkDisabled}`}>
            Next
            <Icon name="chevron_right" size={20} />
          </span>
        )}
      </div>
    </nav>
  );
}
