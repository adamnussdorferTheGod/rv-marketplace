import Icon from '@components/ui/Icon/Icon';
import ExpandableText from '@components/ui/ExpandableText/ExpandableText';
import type { DealerInfo } from '../../../app/src/data/types';
import styles from './AboutDealership.module.css';

interface AboutDealershipProps {
  dealer: DealerInfo;
}

export default function AboutDealership({ dealer }: AboutDealershipProps) {
  return (
    <div className={styles.section}>
      {/* Sub-section 1: Heading */}
      <h2 className={styles.heading}>About the dealership</h2>

      {/* Sub-section 2: Dealer Info Block */}
      <div className={styles.dealerInfo}>
        <img
          src={dealer.logoUrl}
          alt={dealer.name}
          className={styles.dealerLogo}
        />
        <div className={styles.contactDetails}>
          <h3 className={styles.dealerName}>{dealer.name}</h3>
          <div className={styles.contactRow}>
            <Icon name="location_pin" size={16} />
            <span>{dealer.location}</span>
          </div>
          <div className={styles.contactRow}>
            <Icon name="call" size={16} />
            <span>{dealer.phone}</span>
          </div>
          <div className={styles.contactRow}>
            <Icon name="clock" size={16} />
            <span>{dealer.hours}</span>
          </div>
        </div>
      </div>

      {/* Sub-section 3: Top 50 Badge (conditional) */}
      {dealer.isTop50 && (
        <div className={styles.trustedBadge}>
          <Icon name="award_star" size={20} />
          <span className={styles.badgeText}>
            {dealer.yearsOnRvTrader} year trusted partner
          </span>
        </div>
      )}

      {/* Sub-section 4: Dealer Bio */}
      <ExpandableText text={dealer.bio} maxLines={3} className={styles.bio} />

      {/* Sub-section 5: CTA Button */}
      <button className={styles.ctaButton}>View dealer inventory</button>

      {/* Sub-section 6: Dealer Website Link */}
      <div className={styles.websiteLinks}>
        <a
          href={dealer.websiteUrl}
          className={styles.websiteLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit dealer website <Icon name="open_in_new" size={14} />
        </a>
      </div>
    </div>
  );
}
