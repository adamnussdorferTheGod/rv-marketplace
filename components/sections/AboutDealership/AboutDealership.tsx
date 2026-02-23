import Icon from '@components/ui/Icon/Icon';
import ExpandableText from '@components/ui/ExpandableText/ExpandableText';
import Divider from '@components/ui/Divider/Divider';
import type { DealerInfo } from '../../../app/src/data/types';
import styles from './AboutDealership.module.css';

interface AboutDealershipProps {
  dealer: DealerInfo;
}

export default function AboutDealership({ dealer }: AboutDealershipProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>About the dealership</h2>

      {/* Dealer info: logo + details */}
      <div className={styles.dealerInfo}>
        <img
          src={dealer.logoUrl}
          alt={dealer.name}
          className={styles.dealerLogo}
        />
        <div className={styles.dealerDetails}>
          <div className={styles.dealerMeta}>
            {dealer.isTop50 && (
              <div className={styles.trustedPartner}>
                <Icon name="award_star" size={20} />
                <span className={styles.trustedText}>
                  {dealer.yearsOnRvTrader} year trusted partner
                </span>
              </div>
            )}
            <h3 className={styles.dealerName}>{dealer.name}</h3>
            <p className={styles.dealerAddress}>{dealer.address}</p>
          </div>
          <div className={styles.dealerLinks}>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(dealer.address)}`} className={styles.dealerLink} target="_blank" rel="noopener noreferrer">
              Directions to the dealership <Icon name="open_in_new" size={20} />
            </a>
            <a href={dealer.websiteUrl} className={styles.dealerLink} target="_blank" rel="noopener noreferrer">
              Visit dealer&apos;s website <Icon name="open_in_new" size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Top 50 Badge */}
      {dealer.isTop50 && (
        <div className={styles.top50Badge}>
          <Icon name="trophy" size={24} />
          <div className={styles.top50Content}>
            <p className={styles.top50Title}>2023 RV Business Top 50 Dealer</p>
            <p className={styles.top50Description}>
              Recognized for outstanding customer service, operational innovation, charitable outreach and general excellence in overall business practices.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-placeholder"
            alt="RV Business Top 50 Dealer Awards"
            className={styles.top50Logo}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {/* Dealer bio */}
      <ExpandableText text={dealer.bio} maxLines={3} chevronDirection="right" className={styles.bio} />

      {/* CTA Button — outlined style */}
      <a href={`tel:${dealer.phone.replace(/[^+\d]/g, '')}`} className={styles.ctaButton}>
        Contact the dealer
      </a>

      <Divider />

      {/* Dealer website links card */}
      <div className={styles.websiteLinksCard}>
        <span className={styles.adBadge}>Ad</span>
        <div className={styles.websiteLinksContent}>
          <p className={styles.websiteLinksHeading}>
            More from {dealer.name}
          </p>
          <a href={dealer.websiteUrl} className={styles.websiteCardLink}>Click to get financed!</a>
          <a href={dealer.websiteUrl} className={styles.websiteCardLink}>Click to value trade!</a>
          <a href={dealer.websiteUrl} className={styles.websiteCardLink}>Get serviced here!</a>
        </div>
      </div>
    </div>
  );
}
