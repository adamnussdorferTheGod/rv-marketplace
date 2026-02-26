import { useState } from 'react';
import DestinationLightbox from './DestinationLightbox';
import styles from './DestinationGallery.module.css';

interface DestinationGalleryProps {
  photos: string[];
  name: string;
}

export default function DestinationGallery({ photos, name }: DestinationGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const mainPhoto = photos[0];
  const sidePhoto1 = photos[1];
  const sidePhoto2 = photos[2];

  return (
    <>
      <div className={styles.gallery}>
        <button className={styles.photoButton} type="button" onClick={() => setLightboxIndex(0)}>
          <img src={mainPhoto} alt={name} className={styles.image} />
        </button>
        {sidePhoto1 && (
          <button className={styles.photoButton} type="button" onClick={() => setLightboxIndex(1)}>
            <img src={sidePhoto1} alt={`${name} photo 2`} className={styles.image} />
          </button>
        )}
        {sidePhoto2 && (
          <button className={styles.photoButton} type="button" onClick={() => setLightboxIndex(2)}>
            <img src={sidePhoto2} alt={`${name} photo 3`} className={styles.image} />
            <span className={styles.seeAll}>
              See all {photos.length} photos
            </span>
          </button>
        )}
      </div>

      {lightboxIndex !== null && (
        <DestinationLightbox
          photos={photos}
          name={name}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
