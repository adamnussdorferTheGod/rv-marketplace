import { useEffect } from 'react';
import type { Destination } from '../../../app/src/data/lifestyleTypes';
import { computeRvFit } from '../../../app/src/data/rvCompatibility';
import styles from './DestinationDetail.module.css';

interface DestinationDetailProps {
  destination: Destination;
  rvLengthFt: number;
  onClose: () => void;
}

const BADGE_CONFIG = {
  fits: { label: 'Fits', className: 'badgeFits' },
  tight: { label: 'Tight Fit', className: 'badgeTight' },
  'wont-fit': { label: "Won't Fit", className: 'badgeWontFit' },
} as const;

function formatDriveTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.round((minutes / 60) * 10) / 10;
  return `${hours} hr`;
}

export default function DestinationDetail({ destination, rvLengthFt, onClose }: DestinationDetailProps) {
  const fitStatus = computeRvFit(destination.maxRvLengthFt, rvLengthFt);
  const badge = BADGE_CONFIG[fitStatus];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop (visible on mobile only via CSS) */}
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.overlay} role="dialog" aria-label={destination.name}>
        {/* Mobile drag handle */}
        <div className={styles.dragHandle} />

        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close detail"
          type="button"
        >
          &times;
        </button>

        {/* Photo with badge */}
        <div className={styles.photoWrapper}>
          <img
            className={styles.photo}
            src={destination.photoUrl}
            alt={destination.name}
          />
          <span className={`${styles.badge} ${styles[badge.className]}`}>
            {badge.label}
          </span>
        </div>

        {/* Content */}
        <div className={styles.detailContent}>
          <h3 className={styles.detailName}>{destination.name}</h3>
          <p className={styles.detailRegion}>{destination.region}</p>

          {/* Stats grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Drive Time</span>
              <span className={styles.statValue}>{formatDriveTime(destination.driveTimeMinutes)}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Distance</span>
              <span className={styles.statValue}>{destination.distanceMiles} mi</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Hookups</span>
              <span className={styles.statValue}>{destination.hookupType}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Season</span>
              <span className={styles.statValue}>{destination.season}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Rating</span>
              <span className={styles.statValue}>
                <span className={styles.star}>&#9733;</span> {destination.rating} ({destination.reviewCount})
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Price</span>
              <span className={styles.statValue}>{destination.priceRange}</span>
            </div>
          </div>

          {/* Description */}
          <p className={styles.description}>{destination.description}</p>

          {/* Amenities */}
          <div className={styles.amenities}>
            {destination.amenities.map(amenity => (
              <span key={amenity} className={styles.amenityPill}>
                {amenity}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            className={styles.ctaButton}
            href={destination.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Availability
          </a>
        </div>
      </div>
    </>
  );
}
