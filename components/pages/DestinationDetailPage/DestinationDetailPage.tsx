import { useState } from 'react';
import type { Destination } from '../../../app/src/data/lifestyleTypes';
import CrossPromotionsBar from '@components/layout/CrossPromotionsBar/CrossPromotionsBar';
import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer/Footer';
import DestinationHeader from './DestinationHeader';
import DestinationGallery from './DestinationGallery';
import DestinationTabs from './DestinationTabs';
import DestinationAbout from './DestinationAbout';
import DestinationStats from './DestinationStats';
import DestinationHighlights from './DestinationHighlights';
import DestinationReviewCard from './DestinationReviewCard';
import DestinationRating from './DestinationRating';
import DestinationMap from './DestinationMap';
import styles from './DestinationDetailPage.module.css';

interface DestinationDetailPageProps {
  destination: Destination;
}

export default function DestinationDetailPage({ destination }: DestinationDetailPageProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  const photos = destination.photos?.length ? destination.photos : [destination.photoUrl];
  const highlights = destination.highlights ?? [];
  const reviews = destination.reviews ?? [];
  const breakdown = destination.ratingBreakdown ?? { 5: 40, 4: 30, 3: 15, 2: 10, 1: 5 };

  return (
    <div className={styles.page}>
      <CrossPromotionsBar />
      <Header />
      <main className={styles.content}>
        <DestinationHeader name={destination.name} />
        <DestinationGallery photos={photos} name={destination.name} />
        <DestinationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className={styles.twoColumn}>
          <div className={styles.leftCol}>
            {activeTab === 'Overview' && (
              <>
                <DestinationAbout description={destination.description} />
                <div className={styles.divider} />
                <DestinationStats destination={destination} />
                <div className={styles.divider} />
                {highlights.length > 0 && (
                  <>
                    <DestinationHighlights highlights={highlights} />
                    <div className={styles.divider} />
                  </>
                )}
                {reviews.length > 0 && breakdown && (
                  <>
                    <DestinationRating
                      rating={destination.rating}
                      reviewCount={destination.reviewCount}
                      breakdown={breakdown}
                    />
                    <div className={styles.reviewList}>
                      {reviews.map(review => (
                        <DestinationReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
            {activeTab !== 'Overview' && (
              <div className={styles.placeholder}>
                <p className={styles.placeholderText}>
                  {activeTab} content coming soon
                </p>
              </div>
            )}
          </div>
          <div className={styles.rightCol}>
            <DestinationMap name={destination.name} region={destination.region} lat={destination.lat} lng={destination.lng} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
