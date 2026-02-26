import HeroBanner from './HeroBanner/HeroBanner';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <HeroBanner />
      <div className={styles.content} />
    </div>
  );
}
