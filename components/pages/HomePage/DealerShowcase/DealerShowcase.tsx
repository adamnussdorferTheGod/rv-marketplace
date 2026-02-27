import { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  dealerShowcaseListings,
  showcaseDealer,
  type HomepageListingData,
} from '../../../../app/src/data/homepageData';
import { listingPath } from '../../../../app/src/routes';
import Icon from '../../../ui/Icon/Icon';
import styles from './DealerShowcase.module.css';

export default function DealerShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  function scroll(direction: number) {
    trackRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' });
  }

  return (
    <section className={styles.showcase}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <img
              src={showcaseDealer.logoUrl}
              alt={`${showcaseDealer.name} logo`}
              className={styles.logo}
            />
          </div>

          <div className={styles.brandInfo}>
            <h2 className={styles.dealerName}>{showcaseDealer.name}</h2>
            <p className={styles.tagline}>{showcaseDealer.tagline}</p>
            <div className={styles.linksRow}>
              <a href="/search" className={styles.viewInventory}>
                View inventory
              </a>
              <span className={styles.phone}>Call {showcaseDealer.phone}</span>
            </div>
          </div>

          <div className={styles.arrowsArea}>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
              >
                <Icon name="chevron_left" size={24} />
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                aria-label="Scroll right"
              >
                <Icon name="chevron_right" size={24} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className={styles.cardsTrack}
          onScroll={updateScrollState}
        >
          {dealerShowcaseListings.slice(0, 5).map((listing) => (
            <FeaturedCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ listing }: { listing: HomepageListingData }) {
  const location = listing.dealer.distanceMiles
    ? `${listing.dealer.city}, ${listing.dealer.state} \u00b7 ${listing.dealer.distanceMiles} miles away`
    : `${listing.dealer.city}, ${listing.dealer.state}`;

  return (
    <Link to={listingPath(listing.id)} className={styles.card}>
      <div className={styles.cardPhoto}>
        <img
          src={listing.photo.url}
          alt={listing.photo.alt}
          className={styles.cardImage}
          loading="lazy"
        />
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitle}>{listing.title}</h3>
          <span className={styles.cardLocation}>{location}</span>
        </div>
        <span className={styles.cardPrice}>
          ${listing.currentPrice.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
