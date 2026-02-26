import styles from './DestinationGallery.module.css';

interface DestinationGalleryProps {
  photos: string[];
  name: string;
}

export default function DestinationGallery({ photos, name }: DestinationGalleryProps) {
  const mainPhoto = photos[0];
  const sidePhoto1 = photos[1];
  const sidePhoto2 = photos[2];

  return (
    <div className={styles.gallery}>
      <div className={styles.mainPhoto}>
        <img src={mainPhoto} alt={name} className={styles.image} />
      </div>
      {sidePhoto1 && (
        <div className={styles.sideTop}>
          <img src={sidePhoto1} alt={`${name} photo 2`} className={styles.image} />
        </div>
      )}
      {sidePhoto2 && (
        <div className={styles.sideBottom}>
          <img src={sidePhoto2} alt={`${name} photo 3`} className={styles.image} />
          <button className={styles.seeAll} type="button">
            See all {photos.length} photos
          </button>
        </div>
      )}
    </div>
  );
}
