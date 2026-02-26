import { useEffect, useCallback, useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './DestinationLightbox.module.css';

interface DestinationLightboxProps {
  photos: string[];
  name: string;
  startIndex?: number;
  onClose: () => void;
}

export default function DestinationLightbox({
  photos,
  name,
  startIndex = 0,
  onClose,
}: DestinationLightboxProps) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const goNext = useCallback(() => {
    setCurrent((i) => Math.min(i + 1, photos.length - 1));
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrent((i) => Math.max(i - 1, 0));
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

  return (
    <div className={styles.overlay}>
      <header className={styles.header}>
        <button className={styles.headerButton} onClick={onClose} aria-label="Close gallery">
          <Icon name="arrow_back" size={20} />
        </button>
        <div className={styles.headerCenter}>
          <span className={styles.photoCount}>Photo {current + 1} of {photos.length}</span>
          <span className={styles.destinationName}>{name}</span>
        </div>
        <button className={styles.headerButton} onClick={onClose} aria-label="Close">
          <Icon name="x_close" size={20} />
        </button>
      </header>

      <div className={styles.body}>
        <img
          src={photos[current]}
          alt={`${name} photo ${current + 1}`}
          className={styles.mainPhoto}
        />
        {current > 0 && (
          <button className={`${styles.navButton} ${styles.navPrev}`} onClick={goPrev} aria-label="Previous">
            <Icon name="chevron_left" size={24} />
          </button>
        )}
        {current < photos.length - 1 && (
          <button className={`${styles.navButton} ${styles.navNext}`} onClick={goNext} aria-label="Next">
            <Icon name="chevron_right" size={24} />
          </button>
        )}
      </div>

      <div className={styles.thumbnailStrip}>
        {photos.map((photo, i) => (
          <button
            key={i}
            className={`${styles.thumbButton} ${i === current ? styles.thumbActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`View photo ${i + 1}`}
          >
            <img src={photo} alt={`${name} thumbnail ${i + 1}`} className={styles.thumbImage} />
          </button>
        ))}
      </div>
    </div>
  );
}
