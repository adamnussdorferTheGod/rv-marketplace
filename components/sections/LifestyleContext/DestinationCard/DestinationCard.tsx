import { useState } from 'react';
import type { Destination } from '../../../../app/src/data/lifestyleTypes';
import styles from './DestinationCard.module.css';

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
}

function formatDriveTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.round((minutes / 60) * 10) / 10;
  return `${hours} hr`;
}

export default function DestinationCard({ destination, onClick }: DestinationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={styles.cardWrap}>
      <div
        className={styles.card}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(); }}
      >
        <img
          className={styles.photo}
          src={destination.photoUrl}
          alt={destination.name}
          loading="lazy"
        />

        {/* Heart / favorite toggle */}
        <button
          className={styles.heartButton}
          onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? '#E53935' : 'rgba(0,0,0,0.5)'} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Frosted glass info overlay */}
        <div className={styles.infoOverlay}>
          <p className={styles.name}>{destination.name}</p>
          <div className={styles.locationRow}>
            <svg className={styles.pinIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className={styles.locationText}>
              {formatDriveTime(destination.driveTimeMinutes)} &bull; {destination.distanceMiles}mi
            </span>
          </div>
          <p className={styles.price}>{destination.priceRange}</p>
        </div>
      </div>
    </div>
  );
}
