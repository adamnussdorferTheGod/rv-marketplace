import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/src/routes';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Page not found</h1>
        <Link to={ROUTES.HOME} className={styles.link}>
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
