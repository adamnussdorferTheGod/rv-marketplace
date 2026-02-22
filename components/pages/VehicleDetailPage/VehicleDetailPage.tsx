import CrossPromotionsBar from '@components/layout/CrossPromotionsBar/CrossPromotionsBar';
import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer/Footer';
import TwoColumnLayout from '@components/layout/TwoColumnLayout/TwoColumnLayout';
import AdSlot from '@components/ui/AdSlot/AdSlot';
import NavigationBar from '@components/sections/NavigationBar/NavigationBar';
import TitleSection from '@components/sections/TitleSection/TitleSection';
import PhotoGallery from '@components/sections/PhotoGallery/PhotoGallery';
import { sampleListing } from '../../../app/src/data/sampleListing';
import styles from './VehicleDetailPage.module.css';

export default function VehicleDetailPage() {
  return (
    <div className={styles.page}>
      <CrossPromotionsBar />
      <Header />
      <div className={styles.leaderboard}>
        <AdSlot width={728} height={90} />
      </div>
      <main className={styles.content}>
        {/* Full-width sections above two-column area */}
        <div className={styles.sectionSpacing}>
          <NavigationBar resultPosition={sampleListing.resultPosition} totalResults={sampleListing.totalResults} />
        </div>
        <div className={styles.sectionSpacing}>
          <TitleSection title={sampleListing.title} stockNumber={sampleListing.stockNumber} location={sampleListing.location} dealerWebsiteUrl={sampleListing.dealer.websiteUrl} />
        </div>
        <div className={styles.sectionSpacing}>
          <PhotoGallery
            images={sampleListing.images}
            totalPhotoCount={sampleListing.totalPhotoCount}
            tagText={sampleListing.tagText}
          />
        </div>

        {/* Two-column area */}
        <TwoColumnLayout
          left={
            <>
              <div className={styles.placeholder}>Price + Payment</div>
              <div className={styles.placeholder}>AI Summary</div>
              <div className={styles.placeholder}>Vehicle History Report</div>
              <div className={styles.placeholder}>Willing to Negotiate</div>
              <div className={styles.placeholder}>Features &amp; Specs</div>
              <div className={styles.placeholder}>Price Analysis</div>
              <div className={styles.placeholder}>Description</div>
              <div className={styles.placeholder}>Loan Calculator</div>
              <div className={styles.placeholder}>About Dealership</div>
              <div className={styles.placeholder}>Resources</div>
              <div className={styles.placeholder}>Report Listing</div>
              <div className={styles.placeholder}>Disclaimer</div>
            </>
          }
          right={
            <>
              <div className={styles.placeholder}>Dealer Contact Card</div>
              <div className={styles.placeholder}>Popularity Stats</div>
              <div className={styles.placeholder}>Sidebar Ad (300x250)</div>
              <div className={styles.placeholder}>Sidebar Ad (300x600)</div>
            </>
          }
        />

        {/* Full-width sections below two-column area */}
        <div className={styles.placeholder}>Similar Listings</div>
        <div className={styles.placeholder}>Related Categories</div>
        <div className={styles.placeholder}>Insurance &amp; Accessories</div>
        <div className={styles.placeholder}>AdSense Slots</div>
      </main>
      <div className={styles.bottomLeaderboard}>
        <AdSlot width={728} height={90} />
      </div>
      <Footer />
    </div>
  );
}
