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
