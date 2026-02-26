import HeroBanner from './HeroBanner/HeroBanner';
import HandPickedSection from './HandPickedSection/HandPickedSection';
import DealerShowcase from './DealerShowcase/DealerShowcase';
import FeaturedListings from './FeaturedListings/FeaturedListings';
import OwnershipCards from './OwnershipCards/OwnershipCards';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <HeroBanner />
      <div className={styles.content}>
        <HandPickedSection />
      </div>
      <DealerShowcase />
      <div className={styles.content}>
        <FeaturedListings />
        <OwnershipCards />
      </div>
    </div>
  );
}
