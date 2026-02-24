import { useEffect, useCallback } from 'react';
import type { ListingImage } from '../../../../app/src/data/types';
import Icon from '@components/ui/Icon/Icon';
import { useNarration } from '@components/sections/PhotoNarration/NarrationContext';
import NarrationToggle from '@components/sections/PhotoNarration/NarrationToggle/NarrationToggle';
import NarrationPanel from '@components/sections/PhotoNarration/NarrationPanel/NarrationPanel';
import NarrationSheet from '@components/sections/PhotoNarration/NarrationSheet/NarrationSheet';
import PhotoGapCard from '@components/sections/PhotoNarration/PhotoGapCard/PhotoGapCard';
import styles from './GalleryLightbox.module.css';

interface GalleryLightboxProps {
  images: ListingImage[];
  listingTitle: string;
  startIndex?: number;
  onClose: () => void;
}

export default function GalleryLightbox({
  images,
  listingTitle,
  startIndex = 0,
  onClose,
}: GalleryLightboxProps) {
  const { isEnabled, currentPhotoIndex, setCurrentPhoto } = useNarration();

  // Total slides includes gap card when narration is enabled
  const totalSlides = isEnabled ? images.length + 1 : images.length;
  const isGapCard = isEnabled && currentPhotoIndex === images.length;

  // Set initial photo on mount
  useEffect(() => {
    setCurrentPhoto(startIndex);
  }, [startIndex, setCurrentPhoto]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const goNext = useCallback(() => {
    setCurrentPhoto(currentPhotoIndex < totalSlides - 1 ? currentPhotoIndex + 1 : currentPhotoIndex);
  }, [currentPhotoIndex, totalSlides, setCurrentPhoto]);

  const goPrev = useCallback(() => {
    setCurrentPhoto(currentPhotoIndex > 0 ? currentPhotoIndex - 1 : 0);
  }, [currentPhotoIndex, setCurrentPhoto]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  return (
    <div className={styles.overlay}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.headerButton} onClick={onClose} aria-label="Close gallery">
          <Icon name="arrow_back" size={20} />
        </button>
        <div className={styles.headerCenter}>
          <span className={styles.photoCount}>
            {isGapCard ? 'Coverage Report' : `Photo ${currentPhotoIndex + 1} of ${images.length}`}
          </span>
          <span className={styles.listingTitle}>{listingTitle}</span>
        </div>
        <div className={styles.headerRight}>
          <NarrationToggle />
          <button className={styles.headerButton} onClick={onClose} aria-label="Close">
            <Icon name="x_close" size={20} />
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className={`${styles.body} ${isEnabled ? styles.bodyWithPanel : ''}`}>
        {/* Photo area */}
        <div className={styles.photoArea}>
          {isGapCard ? (
            <div className={styles.gapCardWrapper}>
              <PhotoGapCard />
            </div>
          ) : (
            <img
              src={images[currentPhotoIndex]?.url}
              alt={images[currentPhotoIndex]?.alt}
              className={styles.mainPhoto}
            />
          )}

          {/* Nav arrows */}
          {currentPhotoIndex > 0 && (
            <button className={`${styles.navButton} ${styles.navPrev}`} onClick={goPrev} aria-label="Previous photo">
              <Icon name="chevron_left" size={24} />
            </button>
          )}
          {currentPhotoIndex < totalSlides - 1 && (
            <button className={`${styles.navButton} ${styles.navNext}`} onClick={goNext} aria-label="Next photo">
              <Icon name="chevron_right" size={24} />
            </button>
          )}
        </div>

        {/* Desktop narration panel */}
        {isEnabled && <NarrationPanel />}
      </div>

      {/* Thumbnail strip */}
      <div className={styles.thumbnailStrip}>
        {images.map((img, i) => (
          <button
            key={i}
            className={`${styles.thumbButton} ${i === currentPhotoIndex ? styles.thumbActive : ''}`}
            onClick={() => setCurrentPhoto(i)}
            aria-label={`View photo ${i + 1}`}
          >
            <img src={img.url} alt={img.alt} className={styles.thumbImage} />
          </button>
        ))}
        {isEnabled && (
          <button
            className={`${styles.thumbButton} ${styles.thumbGap} ${currentPhotoIndex === images.length ? styles.thumbActive : ''}`}
            onClick={() => setCurrentPhoto(images.length)}
            aria-label="View coverage report"
          >
            <Icon name="camera" size={16} />
          </button>
        )}
      </div>

      {/* Mobile narration sheet */}
      {isEnabled && !isGapCard && <NarrationSheet />}
    </div>
  );
}
