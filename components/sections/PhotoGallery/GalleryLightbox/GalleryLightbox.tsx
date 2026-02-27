import { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import type { ListingImage } from '../../../../app/src/data/types';
import type { VideoWalkthroughData } from '../../../../app/src/data/videoWalkthroughTypes';
import Icon from '@components/ui/Icon/Icon';
import { useVideoWalkthrough } from '@components/sections/VideoWalkthrough/VideoWalkthroughContext';
import CompositionCanvas from '@components/sections/VideoWalkthrough/CompositionCanvas/CompositionCanvas';
import VideoControls from '@components/sections/VideoWalkthrough/VideoControls/VideoControls';
import TranscriptPanel from '@components/sections/VideoWalkthrough/TranscriptPanel/TranscriptPanel';
import VideoAuthGate from '@components/sections/VideoWalkthrough/VideoAuthGate/VideoAuthGate';
import { useAudioSync } from '@components/sections/VideoWalkthrough/hooks/useAudioSync';
import { useNarration } from '@components/sections/PhotoNarration/NarrationContext';
import NarrationToggle from '@components/sections/PhotoNarration/NarrationToggle/NarrationToggle';
import NarrationPanel from '@components/sections/PhotoNarration/NarrationPanel/NarrationPanel';
import NarrationSheet from '@components/sections/PhotoNarration/NarrationSheet/NarrationSheet';
import styles from './GalleryLightbox.module.css';

const GATE_THRESHOLD_MS = 30_000;

type Slide =
  | { type: 'photo'; image: ListingImage }
  | { type: 'video' };

/** Position in the unified slides array where the video is inserted (0-indexed) */
const VIDEO_INSERT_INDEX = 3;

interface GalleryLightboxProps {
  images: ListingImage[];
  listingTitle: string;
  startIndex?: number;
  onClose: () => void;
  videoWalkthrough?: VideoWalkthroughData;
}

export default function GalleryLightbox({
  images,
  listingTitle,
  startIndex = 0,
  onClose,
  videoWalkthrough,
}: GalleryLightboxProps) {
  const { isEnabled, setCurrentPhoto } = useNarration();
  const {
    state: videoState,
    data: videoData,
    play: videoPlay,
    startLoading,
    loaded: videoLoaded,
    closeLightbox: resetVideo,
    gate,
    ungate,
  } = useVideoWalkthrough();

  // Always call hooks (safe no-op when audioUrl is undefined / video not playing)
  useAudioSync();

  // ── 30-second content gate ──
  const hasGatedRef = useRef(false);

  const flatDurations = useMemo(() => {
    if (!videoData) return [];
    return videoData.acts.flatMap((act) => act.segments.map((s) => s.durationMs));
  }, [videoData]);

  const globalElapsedMs = useMemo(() => {
    let elapsed = 0;
    for (let i = 0; i < videoState.currentSegmentIndex; i++) {
      elapsed += flatDurations[i] ?? 0;
    }
    return elapsed + videoState.elapsedMs;
  }, [videoState.currentSegmentIndex, videoState.elapsedMs, flatDurations]);

  useEffect(() => {
    if (
      !hasGatedRef.current &&
      videoState.status === 'playing' &&
      globalElapsedMs >= GATE_THRESHOLD_MS
    ) {
      hasGatedRef.current = true;
      gate();
    }
  }, [globalElapsedMs, videoState.status, gate]);

  const handleAuthenticate = useCallback(() => {
    ungate();
    requestAnimationFrame(() => videoPlay());
  }, [ungate, videoPlay]);

  // ── Unified slides array ──
  const slides = useMemo<Slide[]>(() => {
    const photoSlides: Slide[] = images.map((image) => ({ type: 'photo', image }));
    if (videoWalkthrough) {
      photoSlides.splice(VIDEO_INSERT_INDEX, 0, { type: 'video' });
    }
    return photoSlides;
  }, [images, videoWalkthrough]);

  // ── Own navigation state (decoupled from NarrationContext) ──
  const [currentSlideIndex, setCurrentSlideIndex] = useState(startIndex);
  const currentSlide = slides[currentSlideIndex];
  const isVideoSlide = currentSlide?.type === 'video';

  // Convert slide index → photo index (for NarrationContext)
  const photoIndex = useMemo(() => {
    if (!videoWalkthrough) return currentSlideIndex;
    if (currentSlideIndex < VIDEO_INSERT_INDEX) return currentSlideIndex;
    if (currentSlideIndex === VIDEO_INSERT_INDEX) return -1; // video slide
    return currentSlideIndex - 1; // after video insertion, subtract 1
  }, [currentSlideIndex, videoWalkthrough]);

  // Sync narration context with the correct photo index
  useEffect(() => {
    if (photoIndex >= 0) {
      setCurrentPhoto(photoIndex);
    }
  }, [photoIndex, setCurrentPhoto]);

  // ── Video lifecycle: start/stop when entering/leaving video slide ──
  const prevVideoSlideRef = useRef(false);

  useEffect(() => {
    if (isVideoSlide && !prevVideoSlideRef.current && videoData) {
      // Entering video slide → trigger loading
      startLoading();
      const img = new Image();
      img.onload = () => videoLoaded();
      img.onerror = () => videoLoaded();
      img.src = videoData.acts[0].segments[0].photoUrl;
    }
    if (!isVideoSlide && prevVideoSlideRef.current) {
      // Leaving video slide → reset video state
      resetVideo();
    }
    prevVideoSlideRef.current = isVideoSlide;
  }, [isVideoSlide, videoData, startLoading, videoLoaded, resetVideo]);

  // Reset video on gallery unmount
  useEffect(() => {
    return () => resetVideo();
  }, [resetVideo]);

  // ── Body scroll lock ──
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ── Navigation ──
  const goNext = useCallback(() => {
    setCurrentSlideIndex((i) => Math.min(i + 1, slides.length - 1));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentSlideIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  // ── Header label ──
  const headerLabel = isVideoSlide
    ? 'AI Video Tour'
    : `Photo ${photoIndex + 1} of ${images.length}`;

  // ── Determine panel state ──
  const showNarrationPanel = isEnabled && !isVideoSlide;
  const showTranscriptPanel = isVideoSlide;

  return (
    <div className={styles.overlay}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.headerButton} onClick={onClose} aria-label="Close gallery">
          <Icon name="arrow_back" size={20} />
        </button>
        <div className={styles.headerCenter}>
          <span className={styles.photoCount}>{headerLabel}</span>
          <span className={styles.listingTitle}>{listingTitle}</span>
        </div>
        <div className={styles.headerRight}>
          {!isVideoSlide && <NarrationToggle />}
          <button className={styles.headerButton} onClick={onClose} aria-label="Close">
            <Icon name="x_close" size={20} />
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className={`${styles.body} ${showNarrationPanel ? styles.bodyWithPanel : ''}`}>
        {/* Photo / Video area */}
        <div className={styles.photoArea}>
          {isVideoSlide ? (
            <div className={styles.videoContainer}>
              <div className={styles.videoCanvas}>
                {videoState.status === 'playing' || videoState.status === 'paused' || videoState.status === 'seeking' || videoState.status === 'ended' ? (
                  <>
                    <CompositionCanvas />
                    {videoState.isGated ? (
                      <VideoAuthGate onAuthenticate={handleAuthenticate} />
                    ) : (
                      (videoState.status === 'paused' || videoState.status === 'ended') && (
                        <button
                          className={styles.videoPlayOverlay}
                          onClick={videoPlay}
                          aria-label="Play video"
                        >
                          <div className={styles.videoPlayCircle}>
                            <Icon name={videoState.status === 'ended' ? 'replay' : 'play_arrow'} size={40} />
                          </div>
                        </button>
                      )
                    )}
                  </>
                ) : (
                  <div className={styles.videoLoading}>
                    <img
                      src={videoData?.source.posterUrl}
                      alt="Loading video tour"
                      className={styles.videoPoster}
                    />
                    <div className={styles.videoSpinner} />
                  </div>
                )}
              </div>
              <VideoControls />
            </div>
          ) : currentSlide?.type === 'photo' ? (
            <img
              src={currentSlide.image.url}
              alt={currentSlide.image.alt}
              className={styles.mainPhoto}
            />
          ) : null}

          {/* Nav arrows — always visible */}
          {currentSlideIndex > 0 && (
            <button className={`${styles.navButton} ${styles.navPrev}`} onClick={goPrev} aria-label="Previous">
              <Icon name="chevron_left" size={24} />
            </button>
          )}
          {currentSlideIndex < slides.length - 1 && (
            <button className={`${styles.navButton} ${styles.navNext}`} onClick={goNext} aria-label="Next">
              <Icon name="chevron_right" size={24} />
            </button>
          )}
        </div>

        {/* Right panel: narration for photos, transcript for video */}
        {showNarrationPanel && <NarrationPanel />}
        {showTranscriptPanel && <TranscriptPanel />}
      </div>

      {/* Thumbnail strip */}
      <div className={styles.thumbnailStrip}>
        {slides.map((slide, i) => (
          <button
            key={i}
            className={`${styles.thumbButton} ${i === currentSlideIndex ? styles.thumbActive : ''}`}
            onClick={() => setCurrentSlideIndex(i)}
            aria-label={slide.type === 'video' ? 'View AI Video Tour' : `View photo ${i + 1}`}
          >
            {slide.type === 'video' && videoWalkthrough ? (
              <div className={styles.thumbVideoWrapper}>
                <img src={videoWalkthrough.source.posterUrl} alt="AI Video Tour" className={styles.thumbImage} />
                <div className={styles.thumbPlayIcon}>
                  <Icon name="play_arrow" size={14} />
                </div>
              </div>
            ) : slide.type === 'photo' ? (
              <img src={slide.image.url} alt={slide.image.alt} className={styles.thumbImage} />
            ) : null}
          </button>
        ))}
      </div>

      {/* Mobile narration sheet — only for photo slides */}
      {showNarrationPanel && <NarrationSheet />}
    </div>
  );
}
