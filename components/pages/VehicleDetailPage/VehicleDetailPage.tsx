import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
import { sunseekerListing, listingsBySlug } from '../../../app/src/data/scrapedListings';
import { generateNarrations } from '../../../app/src/data/generateNarrations';
import { generateVideoWalkthrough } from '../../../app/src/data/generateVideoWalkthrough';
import styles from './VehicleDetailPage.module.css';

function useCurrentListing() {
  const { id } = useParams<{ id: string }>();
  const slug = id && listingsBySlug[id] ? id : 'sunseeker-1950le';
  const listing = (id && listingsBySlug[id]) || sunseekerListing;
  return { listing, slug };
}

function VehicleDetailPageContent() {
  const { isOpen } = useAiMode();
  const { state: videoState, closeLightbox } = useVideoWalkthrough();
  const { currentPage } = useNavigation();
  const { listing, slug } = useCurrentListing();
  const videoData = useMemo(() => generateVideoWalkthrough(listing, slug), [listing, slug]);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(listing.currentPrice);

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
              <NavigationBar resultPosition={listing.resultPosition} totalResults={listing.totalResults} />
            </div>
            <div className={`${styles.sectionSpacing} ${styles.gallerySection}`}>
              <PhotoGallery
                images={listing.images}
                totalPhotoCount={listing.totalPhotoCount}
                tagText={listing.tagText}
                listingTitle={listing.title}
                videoWalkthrough={videoData}
              />
            </div>
            <div className={`${styles.sectionSpacing} ${styles.titleSectionWrapper}`}>
              <TitleSection title={listing.title} stockNumber={listing.stockNumber} location={listing.location} dealerWebsiteUrl={listing.dealer.websiteUrl} />
            </div>
          </div>

          {/* Two-column area */}
          <TwoColumnLayout
            left={
              <>
                <PricePayment
                  currentPrice={listing.currentPrice}
                  originalPrice={listing.originalPrice}
                  monthlyPayment={listing.monthlyPayment}
                  dealRating={listing.dealRating}
                />
                <FitCheck />
                <VehicleHistoryReport
                  vhrAvailable={listing.vhrAvailable}
                />
                <Divider />
                <FeaturesAndSpecs specs={listing.specs} />
                <TowVehicleSetupPrompt
                  rvSpecs={{
                    gvwr: listing.gvwr,
                    tongueWeight: listing.tongueWeight,
                    hitchType: listing.hitchType,
                  }}
                  rvName={listing.title.replace(/^\d{4}\s+/, '')}
                  rvImageUrl={listing.images[0]?.url}
                />
                <Divider />
                <Description description={listing.description} />
                <Divider />
                <PriceAnalysis
                  currentPrice={listing.currentPrice}
                  dealRating={listing.dealRating}
                  priceAnalysis={listing.priceAnalysis}
                  listingTitle={listing.title}
                />
                <Divider />
                <TotalCostCalculator
                  currentPrice={listing.currentPrice}
                  location={listing.location}
                  gvwr={listing.gvwr}
                  rvType="travel-trailer"
                />
                <Divider />
                <LifestyleContext />
                <Divider />
                <DealKitCard />
                <Divider />
                <Reviews reviews={listing.reviews} modelName={`${listing.make} ${listing.model} ${listing.trim}`} />
                <Divider />
                <AboutDealership dealer={listing.dealer} />
                <Divider />
                <WillingToNegotiate isNegotiable={listing.isNegotiable} />
                <Divider />
                <Resources />
                <Divider />
                <ReportListing />
                <Disclaimer />
              </>
            }
            right={
              <>
                <DealerContactCard dealer={listing.dealer} engagement={listing.engagement} />
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
          <SimilarListings listings={listing.similarListings} />
          <Divider />
          <RelatedCategories categories={listing.categories} />
          <InsuranceAccessories />
          <AdSenseSection />
        </main>
        <div className={styles.bottomLeaderboard}>
          <AdSlot width={728} height={90} />
        </div>
      </div>
      <AiModePanel
        listingTitle={listing.title}
        listingPrice={formattedPrice}
      />
      <DealKitOverlay />
      {videoState.isLightboxOpen && <VideoPlayerShell onClose={closeLightbox} />}
    </>
  );
}

function VehicleDetailPageWrapper() {
  const { listing, slug } = useCurrentListing();

  return (
    <NavigationProvider>
      <VdpVariantProvider>
        <AiModeProvider listing={listing}>
          <NarrationProvider narrations={generateNarrations(listing)}>
            <DealKitProvider>
              <VideoWalkthroughProvider data={generateVideoWalkthrough(listing, slug)}>
                <VehicleDetailPageContent />
              </VideoWalkthroughProvider>
            </DealKitProvider>
          </NarrationProvider>
        </AiModeProvider>
      </VdpVariantProvider>
    </NavigationProvider>
  );
}

export default function VehicleDetailPage() {
  return <VehicleDetailPageWrapper />;
}
