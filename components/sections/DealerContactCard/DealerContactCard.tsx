import { useState } from 'react';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import Icon from '@components/ui/Icon/Icon';
import type { DealerInfo, ListingEngagement } from '../../../app/src/data/types';
import styles from './DealerContactCard.module.css';

const tabOptions: { value: 'contact' | 'financing'; label: string }[] = [
  { value: 'contact', label: 'Contact seller' },
  { value: 'financing', label: 'Get financing' },
];

interface DealerContactCardProps {
  dealer: DealerInfo;
  engagement: ListingEngagement;
}

export default function DealerContactCard({ dealer, engagement }: DealerContactCardProps) {
  const [activeTab, setActiveTab] = useState<'contact' | 'financing'>('contact');

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.leadForm}>
          <SegmentedButtons
            options={tabOptions}
            selected={activeTab}
            onChange={setActiveTab}
          />
          <textarea
            className={styles.messageInput}
            placeholder="Comments"
            rows={4}
          />
          <button className={styles.submitButton}>Send email</button>
        </div>

        <div className={styles.divider} />

        <div className={styles.callSection}>
          <div className={styles.callInfo}>
            <p className={styles.callPhone}>
              <Icon name="call" size={20} />
              Call {dealer.phone}
            </p>
            <p className={styles.callCode}>
              Call code: {dealer.callCode}
              <Icon name="help_outline" size={16} />
            </p>
          </div>
          <div className={styles.qrCode}>
            <img
              className={styles.qrImage}
              src={`https://api.qrserver.com/v1/create-qr-code/?size=56x56&data=tel:${dealer.phone.replace(/[^0-9]/g, '')}`}
              alt="Scan to call"
              width={56}
              height={56}
            />
            <span className={styles.qrLabel}>Scan to call</span>
          </div>
        </div>
      </div>

      <div className={styles.engagementRow}>
        {engagement.isNewlyListed && (
          <span className={styles.newlyListed}>
            Newly listed · {engagement.listedDate}
          </span>
        )}
        <span className={styles.engagementStat}>
          <strong>{engagement.viewCount}</strong> views
        </span>
        <span className={styles.engagementStat}>
          <strong>{engagement.saveCount}</strong> saves
        </span>
      </div>
    </div>
  );
}
