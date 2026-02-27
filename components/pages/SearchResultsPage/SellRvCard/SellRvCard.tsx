import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './SellRvCard.module.css';

export default function SellRvCard() {
  const [mode, setMode] = useState<'selling' | 'trading'>('selling');

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Earn top dollar for your RV</h3>

      <div className={styles.toggle}>
        <button
          type="button"
          className={`${styles.toggleOption} ${mode === 'selling' ? styles.toggleOptionActive : ''}`}
          onClick={() => setMode('selling')}
        >
          Selling
        </button>
        <button
          type="button"
          className={`${styles.toggleOption} ${mode === 'trading' ? styles.toggleOptionActive : ''}`}
          onClick={() => setMode('trading')}
        >
          Trading in
        </button>
      </div>

      <span className={styles.price}>$25,850</span>

      <div className={styles.fields}>
        <div className={styles.field}>
          <div className={styles.fieldContent}>
            <span className={styles.fieldLabel}>Year *</span>
            <span className={styles.fieldValue}>2017</span>
          </div>
          <Icon name="expand_more" size={24} className={styles.fieldIcon} />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldContent}>
            <span className={styles.fieldLabel}>Category *</span>
            <span className={styles.fieldValue}>Motorhome</span>
          </div>
          <Icon name="expand_more" size={24} className={styles.fieldIcon} />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldContent}>
            <span className={styles.fieldLabel}>Make *</span>
            <span className={styles.fieldValue}>Airstream</span>
          </div>
          <Icon name="expand_more" size={24} className={styles.fieldIcon} />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldContent}>
            <span className={styles.fieldLabel}>Model *</span>
            <span className={styles.fieldValue}>Flying Cloud</span>
          </div>
          <Icon name="expand_more" size={24} className={styles.fieldIcon} />
        </div>
        <button type="button" className={styles.cta}>
          Sell online today
        </button>
      </div>
    </div>
  );
}
