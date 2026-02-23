import type { ListingImage } from '../../../app/src/data/types';
import Icon from '@components/ui/Icon/Icon';
import styles from './PhotoGallery.module.css';

interface PhotoGalleryProps {
  images: ListingImage[];
  totalPhotoCount: number;
  tagText: string;
}

export default function PhotoGallery({ images, totalPhotoCount, tagText }: PhotoGalleryProps) {
  const heroImage = images[0];
  const thumbnails = images.slice(1, 5);

  return (
    <div className={styles.gallery}>
      <div className={styles.heroWrapper}>
        <img src={heroImage.url} alt={heroImage.alt} className={styles.heroImage} />
        {/* ATF-06: Tags badge overlay */}
        <div className={styles.tagsBadge}>
          <span className={styles.tagText}>{tagText}</span>
        </div>
        {/* Mobile overlay: share + favorite buttons */}
        <div className={styles.mobileActions}>
          <button type="button" className={styles.actionButton} aria-label="Share">
            <Icon name="share" size={20} />
          </button>
          <button type="button" className={styles.actionButton} aria-label="Favorite">
            <Icon name="favorite" size={20} />
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
          {thumbnails.map((img, i) => (
            <img key={i} src={img.url} alt={img.alt} className={styles.thumbnail} />
          ))}
        </div>
        {/* ATF-05: "See all photos" overlay button */}
        <button className={styles.seeAllButton}>
          <Icon name="open_in_full" size={16} />
          See all {totalPhotoCount} photos
        </button>
      </div>
    </div>
  );
}
