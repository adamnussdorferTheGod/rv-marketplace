import { useState } from 'react';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import Icon from '@components/ui/Icon/Icon';
import type { DealerInfo, ListingEngagement, ListingImage } from '../../../app/src/data/types';
import PrequalificationModal from './PrequalificationModal';
import SendEmailModal from './SendEmailModal';
import { usePrequal } from './PrequalContext';
import styles from './DealerContactCard.module.css';

const tabOptions: { value: 'contact' | 'financing'; label: string }[] = [
  { value: 'contact', label: 'Contact seller' },
  { value: 'financing', label: 'Get financing' },
];

interface DealerContactCardProps {
  dealer: DealerInfo;
  engagement: ListingEngagement;
  listing?: {
    title: string;
    images: ListingImage[];
    condition: string;
  };
}

export default function DealerContactCard({ dealer, engagement, listing }: DealerContactCardProps) {
  const [activeTab, setActiveTab] = useState<'contact' | 'financing'>('contact');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const { isOpen: showPrequalModal, open: openPrequalModal, close: closePrequalModal } = usePrequal();
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.leadForm}>
          <SegmentedButtons
            options={tabOptions}
            selected={activeTab}
            onChange={setActiveTab}
          />

          <div className={styles.tabContent}>
            {activeTab === 'contact' ? (
              <>
                <textarea
                  className={styles.messageInput}
                  placeholder="Comments"
                  rows={4}
                />
                <button className={styles.submitButton} onClick={() => setShowEmailModal(true)}>Send email</button>
              </>
            ) : (
              <div className={styles.financingForm}>
                <div className={styles.nameRow}>
                  <input
                    className={styles.formInput}
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                  <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
                <input
                  className={styles.formInput}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  className={styles.nextButton}
                  onClick={openPrequalModal}
                >
                  Next
                </button>
              </div>
            )}
          </div>
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

      <PrequalificationModal
        isOpen={showPrequalModal}
        onClose={closePrequalModal}
        firstName={firstName}
        lastName={lastName}
        email={email}
        vehicleTitle={listing?.title ?? ''}
        vehicleImage={listing?.images[0]}
        vehicleCondition={listing?.condition ?? 'Used'}
        dealerName={dealer.name}
      />

      <SendEmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        vehicleTitle={listing?.title ?? ''}
      />
    </div>
  );
}
