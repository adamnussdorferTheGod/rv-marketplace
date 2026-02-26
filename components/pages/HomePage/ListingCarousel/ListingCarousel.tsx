import { useRef, type ReactNode } from 'react';
import Icon from '../../../ui/Icon/Icon';
import styles from './ListingCarousel.module.css';

interface ListingCarouselProps {
  children: ReactNode;
}

export default function ListingCarousel({ children }: ListingCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(offset: number) {
    trackRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  }

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => scrollBy(-240)}
        aria-label="Scroll left"
      >
        <Icon name="chevron_left" size={20} />
      </button>

      <div ref={trackRef} className={styles.track}>
        {children}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => scrollBy(240)}
        aria-label="Scroll right"
      >
        <Icon name="chevron_right" size={20} />
      </button>
    </div>
  );
}
