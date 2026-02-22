import { useState } from 'react';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import Icon from '@components/ui/Icon/Icon';
import type { DealerInfo } from '../../../app/src/data/types';
import styles from './DealerContactCard.module.css';

const contactOptions: { value: 'email' | 'call' | 'chat'; label: string }[] = [
  { value: 'email', label: 'Email' },
  { value: 'call', label: 'Call' },
  { value: 'chat', label: 'Chat' },
];

interface DealerContactCardProps {
  dealer: DealerInfo;
}

export default function DealerContactCard({ dealer }: DealerContactCardProps) {
  const [contactMethod, setContactMethod] = useState<'email' | 'call' | 'chat'>('email');

  return (
    <div className={styles.card}>
      <div className={styles.leadForm}>
        <SegmentedButtons
          options={contactOptions}
          selected={contactMethod}
          onChange={setContactMethod}
        />
        <textarea
          className={styles.messageInput}
          placeholder="Message"
          rows={4}
        />
        <button className={styles.submitButton}>Check availability</button>
      </div>
      <div className={styles.contactInfo}>
        <p className={styles.dealerName}>{dealer.name}</p>
        <p className={styles.contactRow}>
          <Icon name="location_pin" size={16} />
          {dealer.address}
        </p>
        <p className={styles.contactRow}>
          <Icon name="call" size={16} />
          {dealer.phone}
        </p>
        <p className={styles.contactRow}>
          <Icon name="clock" size={16} />
          {dealer.hours}
        </p>
      </div>
    </div>
  );
}
