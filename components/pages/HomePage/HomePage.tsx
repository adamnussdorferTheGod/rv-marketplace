import HeroBanner from './HeroBanner/HeroBanner';
import HandPickedSection from './HandPickedSection/HandPickedSection';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <HeroBanner />
      <div className={styles.content}>
        <HandPickedSection />
      </div>
    </div>
  );
}
