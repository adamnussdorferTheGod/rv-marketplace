import { useRef, useImperativeHandle, forwardRef, type ReactNode } from 'react';
import Icon from '../../../ui/Icon/Icon';
import styles from './ListingCarousel.module.css';

interface ListingCarouselProps {
  children: ReactNode;
  showArrows?: boolean;
}

export interface ListingCarouselHandle {
  scrollBy: (offset: number) => void;
}

const ListingCarousel = forwardRef<ListingCarouselHandle, ListingCarouselProps>(
  function ListingCarousel({ children, showArrows = true }, ref) {
    const trackRef = useRef<HTMLDivElement>(null);

    function scroll(offset: number) {
      trackRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
    }

    useImperativeHandle(ref, () => ({ scrollBy: scroll }));

    return (
      <div className={`${styles.carousel} ${showArrows ? styles.withArrows : ''}`}>
        {showArrows && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => scroll(-240)}
            aria-label="Scroll left"
          >
            <Icon name="chevron_left" size={20} />
          </button>
        )}

        <div ref={trackRef} className={styles.track}>
          {children}
        </div>

        {showArrows && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => scroll(240)}
            aria-label="Scroll right"
          >
            <Icon name="chevron_right" size={20} />
          </button>
        )}
      </div>
    );
  },
);

export default ListingCarousel;
