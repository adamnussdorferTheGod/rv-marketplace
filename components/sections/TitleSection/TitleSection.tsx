import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './TitleSection.module.css';

interface TitleSectionProps {
  title: string;
  stockNumber: string;
  location: string;
  dealerWebsiteUrl: string;
}

export default function TitleSection({ title, stockNumber, location, dealerWebsiteUrl }: TitleSectionProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={styles.titleSection}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.actions}>
          <button type="button" className={styles.iconButton} aria-label="Share">
            <Icon name="share" size={24} />
          </button>
          <button type="button" className={styles.iconButton} onClick={() => setIsFavorite(!isFavorite)} aria-label={isFavorite ? 'Remove from favorites' : 'Favorite'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? '#E53935' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.subtitleRow}>
        <span className={styles.stockLocation}>
          Stock #{stockNumber} &middot; {location}
        </span>
        <span className={styles.subtitleDivider}>|</span>
        <a href={dealerWebsiteUrl} className={styles.dealerLink}>
          Dealer&apos;s website
          <Icon name="open_in_new" size={16} />
        </a>
      </div>
    </div>
  );
}
