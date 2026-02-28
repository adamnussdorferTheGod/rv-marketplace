import TwoColumnLayout from '@components/layout/TwoColumnLayout/TwoColumnLayout';
import AdSlot from '@components/ui/AdSlot/AdSlot';
import NavigationBar from '@components/sections/NavigationBar/NavigationBar';
import TitleSection from '@components/sections/TitleSection/TitleSection';
import PhotoGallery from '@components/sections/PhotoGallery/PhotoGallery';
import PricePayment from '@components/sections/PricePayment/PricePayment';
import FitCheck from '@components/sections/FitCheck/FitCheck';
import VehicleHistoryReport from '@components/sections/VehicleHistoryReport/VehicleHistoryReport';
import WillingToNegotiate from '@components/sections/WillingToNegotiate/WillingToNegotiate';
import FeaturesAndSpecs from '@components/sections/FeaturesAndSpecs/FeaturesAndSpecs';
import LifestyleContext from '@components/sections/LifestyleContext/LifestyleContext';
import PriceAnalysis from '@components/sections/PriceAnalysis/PriceAnalysis';
import Description from '@components/sections/Description/Description';
import Reviews from '@components/sections/Reviews/Reviews';
import Divider from '@components/ui/Divider/Divider';
import TotalCostCalculator from '@components/sections/TotalCostCalculator/TotalCostCalculator';
import AboutDealership from '@components/sections/AboutDealership/AboutDealership';
import Resources from '@components/sections/Resources/Resources';
import ReportListing from '@components/sections/ReportListing/ReportListing';
import Disclaimer from '@components/sections/Disclaimer/Disclaimer';
import DealerContactCard from '@components/sections/DealerContactCard/DealerContactCard';
import SimilarListings from '@components/sections/SimilarListings/SimilarListings';
import RelatedCategories from '@components/sections/RelatedCategories/RelatedCategories';
import InsuranceAccessories from '@components/sections/InsuranceAccessories/InsuranceAccessories';
import TowVehicleSetupPrompt from '@components/sections/TowVehicleSetup/TowVehicleSetupPrompt/TowVehicleSetupPrompt';
import AdSenseSection from '@components/sections/AdSenseSection/AdSenseSection';
import { AiModeProvider, useAiMode } from '@components/sections/AiMode/AiModeContext';
import AiModePanel from '@components/sections/AiMode/AiModePanel/AiModePanel';
import { NarrationProvider } from '@components/sections/PhotoNarration/NarrationContext';
import { DealKitProvider } from '@components/sections/DealKit/DealKitContext';
import DealKitCard from '@components/sections/DealKit/DealKitCard/DealKitCard';
import DealKitOverlay from '@components/sections/DealKit/DealKitOverlay/DealKitOverlay';
import { VideoWalkthroughProvider, useVideoWalkthrough } from '@components/sections/VideoWalkthrough/VideoWalkthroughContext';
import VideoPlayerShell from '@components/sections/VideoWalkthrough/VideoPlayerShell/VideoPlayerShell';
import { VdpVariantProvider } from './VdpVariantContext';
import { NavigationProvider, useNavigation } from '../NavigationContext';
import DestinationDetailPage from '../DestinationDetailPage/DestinationDetailPage';
import { sampleListing } from '../../../app/src/data/sampleListing';
import { sampleNarrations } from '../../../app/src/data/sampleNarrations';
import { sampleVideoWalkthrough } from '../../../app/src/data/sampleVideoWalkthrough';
import styles from './VehicleDetailPage.module.css';

function VehicleDetailPageContent() {
  const { isOpen } = useAiMode();
  const { state: videoState, closeLightbox } = useVideoWalkthrough();
  const { currentPage } = useNavigation();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(sampleListing.currentPrice);

  if (currentPage.type === 'destination-detail') {
    return <DestinationDetailPage destination={currentPage.destination} />;
  }

  return (
    <>
      <div className={`${styles.page} ${isOpen ? styles.pageShifted : ''}`}>
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
                videoWalkthrough={sampleVideoWalkthrough}
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
                <FitCheck />
                <VehicleHistoryReport
                  vhrAvailable={sampleListing.vhrAvailable}
                />
                <Divider />
                <FeaturesAndSpecs specs={sampleListing.specs} />
                <TowVehicleSetupPrompt
                  rvSpecs={{
                    gvwr: sampleListing.gvwr,
                    tongueWeight: sampleListing.tongueWeight,
                    hitchType: sampleListing.hitchType,
                  }}
                />
                <Divider />
                <Description description={sampleListing.description} />
                <Divider />
                <PriceAnalysis
                  currentPrice={sampleListing.currentPrice}
                  dealRating={sampleListing.dealRating}
                  priceAnalysis={sampleListing.priceAnalysis}
                  listingTitle={sampleListing.title}
                />
                <Divider />
                <TotalCostCalculator
                  currentPrice={sampleListing.currentPrice}
                  location={sampleListing.location}
                  gvwr={sampleListing.gvwr}
                  rvType="travel-trailer"
                />
                <Divider />
                <LifestyleContext />
                <Divider />
                <DealKitCard />
                <Divider />
                <Reviews reviews={sampleListing.reviews} modelName={`${sampleListing.make} ${sampleListing.model} ${sampleListing.trim}`} />
                <Divider />
                <AboutDealership dealer={sampleListing.dealer} />
                <Divider />
                <WillingToNegotiate isNegotiable={sampleListing.isNegotiable} />
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
      </div>
      <AiModePanel
        listingTitle={sampleListing.title}
        listingPrice={formattedPrice}
      />
      <DealKitOverlay />
      {videoState.isLightboxOpen && <VideoPlayerShell onClose={closeLightbox} />}
    </>
  );
}

export default function VehicleDetailPage() {
  return (
    <NavigationProvider>
      <VdpVariantProvider>
        <AiModeProvider listing={sampleListing}>
          <NarrationProvider narrations={sampleNarrations}>
            <DealKitProvider>
              <VideoWalkthroughProvider data={sampleVideoWalkthrough}>
                <VehicleDetailPageContent />
              </VideoWalkthroughProvider>
            </DealKitProvider>
          </NarrationProvider>
        </AiModeProvider>
      </VdpVariantProvider>
    </NavigationProvider>
  );
}
