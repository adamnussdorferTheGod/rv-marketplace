import { useState } from 'react';
import HeroBanner from './HeroBanner/HeroBanner';
import HandPickedSection from './HandPickedSection/HandPickedSection';
import DealerShowcase from './DealerShowcase/DealerShowcase';
import WhereYouLeftOff from './WhereYouLeftOff/WhereYouLeftOff';
import FeaturedListings from './FeaturedListings/FeaturedListings';
import SellingSection from './SellingSection/SellingSection';
import OwnershipCards from './OwnershipCards/OwnershipCards';
import StayInTheKnow from './StayInTheKnow/StayInTheKnow';
import AiQuestionBanner from './AiQuestionBanner/AiQuestionBanner';
import PopularSearches from './PopularSearches/PopularSearches';
import DisclaimerModal from './DisclaimerModal/DisclaimerModal';
import { AiModeProvider } from '@components/sections/AiMode/AiModeContext';
import AiModePanel from '@components/sections/AiMode/AiModePanel/AiModePanel';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const dismissDisclaimer = () => {
    setShowDisclaimer(false);
  };

  return (
    <AiModeProvider>
      <div className={styles.homePage}>
        <HeroBanner />
        <div className={styles.content}>
          <HandPickedSection />
        </div>
        <DealerShowcase />
        <div className={styles.content}>
          <WhereYouLeftOff />
          <AiQuestionBanner />
          <SellingSection />
          <FeaturedListings />
          <StayInTheKnow />
          <OwnershipCards />
          <PopularSearches />
        </div>
      </div>
      <AiModePanel />
      {showDisclaimer && <DisclaimerModal onClose={dismissDisclaimer} />}
    </AiModeProvider>
  );
}
