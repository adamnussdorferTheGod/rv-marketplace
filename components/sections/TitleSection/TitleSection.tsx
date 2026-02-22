import Icon from '@components/ui/Icon/Icon';
import styles from './TitleSection.module.css';

interface TitleSectionProps {
  title: string;
  stockNumber: string;
  location: string;
  dealerWebsiteUrl: string;
}

export default function TitleSection({ title, stockNumber, location, dealerWebsiteUrl }: TitleSectionProps) {
  return (
    <div className={styles.titleSection}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.actions}>
          <button type="button" className={styles.iconButton} aria-label="Share">
            <Icon name="share" size={24} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Favorite">
            <Icon name="favorite" size={24} />
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
