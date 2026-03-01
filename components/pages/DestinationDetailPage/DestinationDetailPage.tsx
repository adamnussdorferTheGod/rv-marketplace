import { useState } from 'react';
import type { Destination } from '../../../app/src/data/lifestyleTypes';
import Button from '@components/ui/Button/Button';
import DestinationHeader from './DestinationHeader';
import DestinationGallery from './DestinationGallery';
import DestinationTabs from './DestinationTabs';
import DestinationAbout from './DestinationAbout';
import DestinationStats from './DestinationStats';
import DestinationHighlights from './DestinationHighlights';
import DestinationReviewCard from './DestinationReviewCard';
import DestinationRating from './DestinationRating';
import DestinationMap from './DestinationMap';
import ContentGate from './ContentGate';
import AdSlot from '@components/ui/AdSlot/AdSlot';
import styles from './DestinationDetailPage.module.css';

const INITIAL_REVIEWS = 2;

interface DestinationDetailPageProps {
  destination: Destination;
}

export default function DestinationDetailPage({ destination }: DestinationDetailPageProps) {
  const [visibleReviews, setVisibleReviews] = useState(INITIAL_REVIEWS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const photos = destination.photos?.length ? destination.photos : [destination.photoUrl];
  const highlights = destination.highlights ?? [];
  const reviews = destination.reviews ?? [];
  const breakdown = destination.ratingBreakdown ?? { 5: 40, 4: 30, 3: 15, 2: 10, 1: 5 };
  const hasMoreReviews = visibleReviews < reviews.length;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <DestinationHeader name={destination.name} />
        <DestinationGallery photos={photos} name={destination.name} />
        <DestinationTabs />

        {isAuthenticated ? (
          <div className={styles.twoColumn}>
            <div className={styles.leftCol}>
              <div id="dest-overview">
                <DestinationAbout description={destination.description} />
              </div>
              <DestinationStats destination={destination} />
              {highlights.length > 0 && (
                <div id="dest-highlights">
                  <DestinationHighlights highlights={highlights} />
                </div>
              )}
              {reviews.length > 0 && breakdown && (
                <div id="dest-reviews">
                  <DestinationRating
                    rating={destination.rating}
                    reviewCount={destination.reviewCount}
                    breakdown={breakdown}
                  />
                  <div className={styles.reviewList}>
                    {reviews.slice(0, visibleReviews).map(review => (
                      <DestinationReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                  {hasMoreReviews && (
                    <Button
                      variant="secondary"
                      size="lg"
                      className={styles.loadMore}
                      onClick={() => setVisibleReviews(v => v + INITIAL_REVIEWS)}
                    >
                      Load more reviews
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div className={styles.rightCol}>
              <DestinationMap name={destination.name} region={destination.region} lat={destination.lat} lng={destination.lng} />
              <div className={styles.sidebarAd}>
                <AdSlot width={300} height={250} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div id="dest-overview">
              <DestinationAbout description={destination.description} />
            </div>
            <ContentGate gated onAuthenticate={() => setIsAuthenticated(true)}>
              <div className={styles.twoColumn}>
                <div className={styles.leftCol}>
                  <DestinationStats destination={destination} />
                  {highlights.length > 0 && (
                    <DestinationHighlights highlights={highlights} />
                  )}
                </div>
                <div className={styles.rightCol}>
                  <DestinationMap name={destination.name} region={destination.region} lat={destination.lat} lng={destination.lng} />
                </div>
              </div>
            </ContentGate>
          </>
        )}
      </div>
    </div>
  );
}
