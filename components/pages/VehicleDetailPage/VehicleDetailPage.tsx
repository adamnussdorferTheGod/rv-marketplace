import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useRecentlyViewed } from '../../../app/src/hooks/useRecentlyViewed';
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
import PaymentCalculator from '@components/sections/PaymentCalculator/PaymentCalculator';
import AboutDealership from '@components/sections/AboutDealership/AboutDealership';
import Resources from '@components/sections/Resources/Resources';
import ReportListing from '@components/sections/ReportListing/ReportListing';
import Disclaimer from '@components/sections/Disclaimer/Disclaimer';
import DealerContactCard from '@components/sections/DealerContactCard/DealerContactCard';
import SimilarListings from '@components/sections/SimilarListings/SimilarListings';
import RelatedCategories from '@components/sections/RelatedCategories/RelatedCategories';
import InsuranceAccessories from '@components/sections/InsuranceAccessories/InsuranceAccessories';
import TowVehicleSetupPrompt from '@components/sections/TowVehicleSetup/TowVehicleSetupPrompt/TowVehicleSetupPrompt';
import { useTowVehicle } from '@components/sections/TowVehicleSetup/TowVehicleContext';
import AdSenseSection from '@components/sections/AdSenseSection/AdSenseSection';
import { AiModeProvider, useAiMode } from '@components/sections/AiMode/AiModeContext';
import { PrequalProvider } from '@components/sections/DealerContactCard/PrequalContext';
import AiModePanel from '@components/sections/AiMode/AiModePanel/AiModePanel';
import TotalCostPanel, { computeTotalCost } from '@components/sections/PricePayment/TotalCostPanel';
import { NarrationProvider } from '@components/sections/PhotoNarration/NarrationContext';
import { DealKitProvider } from '@components/sections/DealKit/DealKitContext';
import DealKitCard from '@components/sections/DealKit/DealKitCard/DealKitCard';
import DealKitOverlay from '@components/sections/DealKit/DealKitOverlay/DealKitOverlay';
import { VideoWalkthroughProvider, useVideoWalkthrough } from '@components/sections/VideoWalkthrough/VideoWalkthroughContext';
import VideoPlayerShell from '@components/sections/VideoWalkthrough/VideoPlayerShell/VideoPlayerShell';
import { VdpVariantProvider } from './VdpVariantContext';
import { NavigationProvider, useNavigation } from '../NavigationContext';
import DestinationDetailPage from '../DestinationDetailPage/DestinationDetailPage';
import { sunseekerListing, listingsBySlug, allListings } from '../../../app/src/data/scrapedListings';
import { generateNarrations } from '../../../app/src/data/generateNarrations';
import { generateVideoWalkthrough } from '../../../app/src/data/generateVideoWalkthrough';
import { generateDealKit } from '../../../app/src/data/generateDealKit';
// import VdpSectionNav from '@components/sections/VdpSectionNav/VdpSectionNav';
import styles from './VehicleDetailPage.module.css';

function useCurrentListing() {
  const { id } = useParams<{ id: string }>();
  const slug = id && listingsBySlug[id] ? id : 'sunseeker-1950le';
  const listing = (id && listingsBySlug[id]) || sunseekerListing;
  const idx = allListings.findIndex(l => l.slug === slug);
  const prevSlug = idx > 0 ? allListings[idx - 1].slug : undefined;
  const nextSlug = idx < allListings.length - 1 ? allListings[idx + 1].slug : undefined;
  return { listing, slug, prevSlug, nextSlug };
}

function VehicleDetailPageContent() {
  const { isOpen } = useAiMode();
  const { state: videoState, closeLightbox } = useVideoWalkthrough();
  const { currentPage } = useNavigation();
  const { savedVehicle } = useTowVehicle();
  const { listing, slug, prevSlug, nextSlug } = useCurrentListing();
  const [totalCostPanelOpen, setTotalCostPanelOpen] = useState(false);
  const openTotalCostPanel = useCallback(() => setTotalCostPanelOpen(true), []);
  const closeTotalCostPanel = useCallback(() => setTotalCostPanelOpen(false), []);
  const videoData = useMemo(() => generateVideoWalkthrough(listing, slug), [listing, slug]);
  const rvSpecs = useMemo(() => ({
    gvwr: listing.gvwr,
    tongueWeight: listing.tongueWeight,
    hitchType: listing.hitchType,
  }), [listing.gvwr, listing.tongueWeight, listing.hitchType]);
  const { saveViewed } = useRecentlyViewed();

  // Track this listing as recently viewed
  useEffect(() => {
    saveViewed({
      slug,
      title: listing.title,
      imageUrl: listing.images[0]?.url ?? '',
    });
  }, [slug, listing.title, listing.images, saveViewed]);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(listing.currentPrice);

  const stateCode = useMemo(() => {
    const parts = listing.location.split(',');
    const st = parts[parts.length - 1]?.trim();
    return st && st.length === 2 ? st.toUpperCase() : 'CA';
  }, [listing.location]);

  const estimatedTotal = useMemo(
    () => computeTotalCost(listing.currentPrice, stateCode),
    [listing.currentPrice, stateCode],
  );

  const formattedTotal = '$' + Math.round(estimatedTotal.total).toLocaleString('en-US');

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
              <NavigationBar resultPosition={listing.resultPosition} totalResults={listing.totalResults} prevSlug={prevSlug} nextSlug={nextSlug} />
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

          {/* <VdpSectionNav /> */}

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
                <div id="features">
                <FeaturesAndSpecs specs={listing.specs} />
                {listing.gvwr && (
                  <TowVehicleSetupPrompt
                    key={savedVehicle ? `${savedVehicle.make}-${savedVehicle.model}-${savedVehicle.trim}` : 'setup'}
                    rvSpecs={rvSpecs}
                    rvName={listing.title.replace(/^\d{4}\s+/, '')}
                    rvImageUrl={listing.images[0]?.url}
                  />
                )}
                </div>
                <Divider />
                <div id="description">
                <Description description={listing.description} />
                </div>
                <Divider />
                <div id="price">
                <PriceAnalysis
                  currentPrice={listing.currentPrice}
                  dealRating={listing.dealRating}
                  priceAnalysis={listing.priceAnalysis}
                  listingTitle={listing.title}
                  estimatedTotal={formattedTotal}
                  onTotalCostClick={openTotalCostPanel}
                />
                </div>
                <Divider />
                <div id="payment">
                <PaymentCalculator currentPrice={listing.currentPrice} />
                </div>
                <Divider />
                <div id="inspiration">
                <LifestyleContext />
                </div>
                <Divider />
                <DealKitCard />
                <Divider />
                <div id="reviews">
                <Reviews reviews={listing.reviews} modelName={`${listing.make} ${listing.model} ${listing.trim}`} />
                </div>
                <Divider />
                <div id="seller">
                <AboutDealership dealer={listing.dealer} />
                </div>
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
                <DealerContactCard
                  dealer={listing.dealer}
                  engagement={listing.engagement}
                  listing={{
                    title: listing.title,
                    images: listing.images,
                    condition: listing.specs.find(s => s.label === 'Condition')?.value ?? 'Used',
                  }}
                />
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
      <TotalCostPanel
        isOpen={totalCostPanelOpen}
        onClose={closeTotalCostPanel}
        currentPrice={listing.currentPrice}
        location={listing.location}
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
            <DealKitProvider data={generateDealKit(listing)}>
              <VideoWalkthroughProvider data={generateVideoWalkthrough(listing, slug)}>
                <PrequalProvider>
                  <VehicleDetailPageContent />
                </PrequalProvider>
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
