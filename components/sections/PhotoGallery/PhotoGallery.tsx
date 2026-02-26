import { useState } from 'react';
import type { ListingImage } from '../../../app/src/data/types';
import type { VideoWalkthroughData } from '../../../app/src/data/videoWalkthroughTypes';
import Icon from '@components/ui/Icon/Icon';
import VideoThumbnail from './VideoThumbnail/VideoThumbnail';
import GalleryLightbox from './GalleryLightbox/GalleryLightbox';
import styles from './PhotoGallery.module.css';

interface PhotoGalleryProps {
  images: ListingImage[];
  totalPhotoCount: number;
  tagText: string;
  listingTitle: string;
  videoWalkthrough?: VideoWalkthroughData;
}

export default function PhotoGallery({ images, totalPhotoCount, tagText, listingTitle, videoWalkthrough }: PhotoGalleryProps) {
  const heroImage = images[0];
  const thumbnailsBefore = videoWalkthrough ? images.slice(1, 3) : images.slice(1, 5);
  const thumbnailsAfter = videoWalkthrough ? images.slice(3, 4) : [];
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);
  // Video slide position in unified gallery slides array
  const videoSlideIndex = 3;

  const openLightbox = (startIndex = 0) => {
    setLightboxStartIndex(startIndex);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.heroWrapper}>
          <img
            src={heroImage.url}
            alt={heroImage.alt}
            className={styles.heroImage}
            onClick={() => openLightbox(0)}
            style={{ cursor: 'pointer' }}
          />
          {/* ATF-06: Tags badge overlay */}
          <div className={styles.tagsBadge}>
            <span className={styles.tagText}>{tagText}</span>
          </div>
          {/* Mobile overlay: share + favorite buttons */}
          <div className={styles.mobileActions}>
            <button type="button" className={styles.actionButton} aria-label="Share">
              <Icon name="share" size={20} />
            </button>
            <button type="button" className={styles.actionButton} onClick={() => setIsFavorite(!isFavorite)} aria-label={isFavorite ? 'Remove from favorites' : 'Favorite'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? '#E53935' : 'rgba(0,0,0,0.5)'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
          {/* Mobile: pagination dots */}
          <div className={styles.paginationDots}>
            {images.slice(0, 5).map((_, i) => (
              <span key={i} className={`${styles.dot} ${i === 0 ? styles.dotActive : ''}`} />
            ))}
          </div>
          {/* Mobile: photo counter */}
          <div className={styles.photoCounter}>
            1 / {totalPhotoCount}
          </div>
        </div>
        <div className={styles.thumbnailWrapper}>
          <div className={styles.thumbnailGrid}>
            {thumbnailsBefore.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt}
                className={styles.thumbnail}
                onClick={() => openLightbox(i + 1)}
                style={{ cursor: 'pointer' }}
              />
            ))}
            {videoWalkthrough && (
              <VideoThumbnail
                posterUrl={videoWalkthrough.source.posterUrl}
                duration={videoWalkthrough.totalDurationMs}
                onPlay={() => openLightbox(videoSlideIndex)}
              />
            )}
            {thumbnailsAfter.map((img, i) => (
              <img
                key={`after-${i}`}
                src={img.url}
                alt={img.alt}
                className={styles.thumbnail}
                onClick={() => openLightbox(thumbnailsBefore.length + 1 + i + 1)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          {/* ATF-05: "See all photos" overlay button */}
          <button className={styles.seeAllButton} onClick={() => openLightbox(0)}>
            <Icon name="open_in_full" size={16} />
            See all {totalPhotoCount} photos
          </button>
        </div>
      </div>
      {/* Gallery lightbox */}
      {isLightboxOpen && (
        <GalleryLightbox
          images={images}
          listingTitle={listingTitle}
          startIndex={lightboxStartIndex}
          onClose={() => setIsLightboxOpen(false)}
          videoWalkthrough={videoWalkthrough}
        />
      )}
    </>
  );
}
