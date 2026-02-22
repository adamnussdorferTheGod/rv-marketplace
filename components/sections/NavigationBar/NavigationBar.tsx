import Icon from '@components/ui/Icon/Icon';
import styles from './NavigationBar.module.css';

interface NavigationBarProps {
  resultPosition: number;
  totalResults: number;
}

export default function NavigationBar({ resultPosition, totalResults }: NavigationBarProps) {
  return (
    <nav className={styles.navigationBar}>
      <a href="#" className={styles.backLink}>
        <Icon name="chevron_left" size={20} />
        Search results
      </a>
      <div className={styles.pagination}>
        <span className={styles.resultText}>
          Result {resultPosition.toLocaleString()} of {totalResults.toLocaleString()}
        </span>
        <a href="#" className={styles.navLink}>
          <Icon name="chevron_left" size={20} />
          Previous
        </a>
        <a href="#" className={styles.navLink}>
          Next
          <Icon name="chevron_right" size={20} />
        </a>
      </div>
    </nav>
  );
}
