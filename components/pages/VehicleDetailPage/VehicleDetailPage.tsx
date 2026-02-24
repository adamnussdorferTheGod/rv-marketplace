import CrossPromotionsBar from '@components/layout/CrossPromotionsBar/CrossPromotionsBar';
import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer/Footer';
import TwoColumnLayout from '@components/layout/TwoColumnLayout/TwoColumnLayout';
import AdSlot from '@components/ui/AdSlot/AdSlot';
import NavigationBar from '@components/sections/NavigationBar/NavigationBar';
import TitleSection from '@components/sections/TitleSection/TitleSection';
import PhotoGallery from '@components/sections/PhotoGallery/PhotoGallery';
import PricePayment from '@components/sections/PricePayment/PricePayment';
import AISummary from '@components/sections/AISummary/AISummary';
import FitCheck from '@components/sections/FitCheck/FitCheck';
import VehicleHistoryReport from '@components/sections/VehicleHistoryReport/VehicleHistoryReport';
import WillingToNegotiate from '@components/sections/WillingToNegotiate/WillingToNegotiate';
import FeaturesAndSpecs from '@components/sections/FeaturesAndSpecs/FeaturesAndSpecs';
import PriceAnalysis from '@components/sections/PriceAnalysis/PriceAnalysis';
import Description from '@components/sections/Description/Description';
import Divider from '@components/ui/Divider/Divider';
import LoanCalculator from '@components/sections/LoanCalculator/LoanCalculator';
import AboutDealership from '@components/sections/AboutDealership/AboutDealership';
import Resources from '@components/sections/Resources/Resources';
import ReportListing from '@components/sections/ReportListing/ReportListing';
import Disclaimer from '@components/sections/Disclaimer/Disclaimer';
import DealerContactCard from '@components/sections/DealerContactCard/DealerContactCard';
import SimilarListings from '@components/sections/SimilarListings/SimilarListings';
import RelatedCategories from '@components/sections/RelatedCategories/RelatedCategories';
import InsuranceAccessories from '@components/sections/InsuranceAccessories/InsuranceAccessories';
import AdSenseSection from '@components/sections/AdSenseSection/AdSenseSection';
import { AiModeProvider, useAiMode } from '@components/sections/AiMode/AiModeContext';
import AiModePanel from '@components/sections/AiMode/AiModePanel/AiModePanel';
import { NarrationProvider } from '@components/sections/PhotoNarration/NarrationContext';
import { VdpVariantProvider, useVdpVariant } from './VdpVariantContext';
import { sampleListing } from '../../../app/src/data/sampleListing';
import { sampleNarrations } from '../../../app/src/data/sampleNarrations';
import styles from './VehicleDetailPage.module.css';

function VehicleDetailPageContent() {
  const { isOpen } = useAiMode();
  const { variant } = useVdpVariant();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(sampleListing.currentPrice);

  return (
    <>
      <div className={`${styles.page} ${isOpen ? styles.pageShifted : ''}`}>
        <CrossPromotionsBar />
        <Header />
        <div className={styles.leaderboard}>
          <AdSlot width={728} height={90} />
        </div>
        <main className={styles.content}>
          {/* Full-width sections above two-column area — reordered on mobile */}
          <div className={styles.aboveFold}>
            <div className={`${styles.sectionSpacing} ${styles.navSection}`}>
              <NavigationBar resultPosition={sampleListing.resultPosition} totalResults={sampleListing.totalResults} />
            </div>
            <div className={`${styles.sectionSpacing} ${styles.gallerySection}`}>
              <PhotoGallery
                images={sampleListing.images}
                totalPhotoCount={sampleListing.totalPhotoCount}
                tagText={sampleListing.tagText}
                listingTitle={sampleListing.title}
              />
            </div>
            <div className={`${styles.sectionSpacing} ${styles.titleSectionWrapper}`}>
              <TitleSection title={sampleListing.title} stockNumber={sampleListing.stockNumber} location={sampleListing.location} dealerWebsiteUrl={sampleListing.dealer.websiteUrl} />
            </div>
          </div>

          {/* Two-column area */}
          <TwoColumnLayout
            left={
              <>
                <PricePayment
                  currentPrice={sampleListing.currentPrice}
                  originalPrice={sampleListing.originalPrice}
                  monthlyPayment={sampleListing.monthlyPayment}
                  dealRating={sampleListing.dealRating}
                />
                {variant === 'option-1' ? (
                  <AISummary aiSummary={sampleListing.aiSummary} />
                ) : (
                  <FitCheck />
                )}
                <VehicleHistoryReport
                  vhrAvailable={sampleListing.vhrAvailable}
                />
                <FeaturesAndSpecs specs={sampleListing.specs} />
                <Divider />
                <Description description={sampleListing.description} />
                <Divider />
                <PriceAnalysis
                  currentPrice={sampleListing.currentPrice}
                  dealRating={sampleListing.dealRating}
                  priceAnalysis={sampleListing.priceAnalysis}
                />
                <Divider />
                <LoanCalculator
                  currentPrice={sampleListing.currentPrice}
                  dealerName={sampleListing.dealer.name}
                  dealerPhone={sampleListing.dealer.phone}
                />
                <div style={{ marginTop: 'var(--space-32)' }}>
                  <WillingToNegotiate isNegotiable={sampleListing.isNegotiable} />
                </div>
                <Divider />
                <AboutDealership dealer={sampleListing.dealer} />
                <Divider />
                <Resources />
                <Divider />
                <ReportListing />
                <Disclaimer />
              </>
            }
            right={
              <>
                <DealerContactCard dealer={sampleListing.dealer} engagement={sampleListing.engagement} />
                <div className={styles.sidebarAd}>
                  <AdSlot width={300} height={250} />
                </div>
                <div className={styles.sidebarAd}>
                  <AdSlot width={300} height={600} />
                </div>
                <div className={styles.sidebarAd}>
                  <AdSlot width={300} height={250} />
                </div>
              </>
            }
          />

          {/* Full-width sections below two-column area */}
          <Divider />
          <SimilarListings listings={sampleListing.similarListings} />
          <Divider />
          <RelatedCategories categories={sampleListing.categories} />
          <InsuranceAccessories />
          <AdSenseSection />
        </main>
        <div className={styles.bottomLeaderboard}>
          <AdSlot width={728} height={90} />
        </div>
        <Footer />
      </div>
      <AiModePanel
        listingTitle={sampleListing.title}
        listingPrice={formattedPrice}
      />
    </>
  );
}

export default function VehicleDetailPage() {
  return (
    <VdpVariantProvider>
      <AiModeProvider listing={sampleListing}>
        <NarrationProvider narrations={sampleNarrations}>
          <VehicleDetailPageContent />
        </NarrationProvider>
      </AiModeProvider>
    </VdpVariantProvider>
  );
}
