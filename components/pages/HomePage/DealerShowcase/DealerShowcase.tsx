import { dealerShowcaseListings, showcaseDealer } from '../../../../app/src/data/homepageData';
import HomepageListingCard from '../HomepageListingCard/HomepageListingCard';
import ListingCarousel from '../ListingCarousel/ListingCarousel';
import Icon from '../../../ui/Icon/Icon';
import styles from './DealerShowcase.module.css';

export default function DealerShowcase() {
  return (
    <section className={styles.showcase}>
      <div className={styles.inner}>
        <div className={styles.branding}>
          <div className={styles.brandLeft}>
            <img
              src={showcaseDealer.logoUrl}
              alt={`${showcaseDealer.name} logo`}
              className={styles.logo}
            />
            <div className={styles.brandInfo}>
              <h2 className={styles.dealerName}>{showcaseDealer.name}</h2>
              <p className={styles.tagline}>{showcaseDealer.tagline}</p>
            </div>
          </div>

          <div className={styles.brandLinks}>
            <a href="/search" className={styles.viewInventory}>
              View inventory
            </a>
            <a href={`tel:${showcaseDealer.phone}`} className={styles.phoneLink}>
              <Icon name="call" size={16} />
              <span>{showcaseDealer.phone}</span>
            </a>
          </div>
        </div>

        <ListingCarousel>
          {dealerShowcaseListings.map((listing) => (
            <HomepageListingCard key={listing.id} listing={listing} />
          ))}
        </ListingCarousel>
      </div>
    </section>
  );
}
