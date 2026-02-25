import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './PriceAlertSheet.module.css';

interface PriceAlertSheetProps {
  listingTitle: string;
  formattedPrice: string;
  onClose: () => void;
  onCreate: (email: string, shareWithSeller: boolean) => void;
}

export default function PriceAlertSheet({
  listingTitle,
  formattedPrice,
  onClose,
  onCreate,
}: PriceAlertSheetProps) {
  const [email, setEmail] = useState('');
  const [shareWithSeller, setShareWithSeller] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onCreate(email, shareWithSeller);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* Handle bar — mobile only */}
        <div className={styles.handle}>
          <div className={styles.handleBar} />
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Track the price</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="x_close" size={20} />
          </button>
        </div>

        {/* Body */}
        <form className={styles.body} onSubmit={handleSubmit}>
          <p className={styles.listingInfo}>
            {listingTitle} &bull; {formattedPrice}
          </p>

          <div className={styles.inputWrap}>
            <input
              type="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <label className={styles.checkbox}>
            <span className={`${styles.checkboxBox} ${shareWithSeller ? styles.checkboxChecked : ''}`}>
              {shareWithSeller && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={shareWithSeller}
              onChange={(e) => setShareWithSeller(e.target.checked)}
            />
            <span className={styles.checkboxLabel}>
              Send my email to the seller and let them know I'm interested
            </span>
          </label>

          <button type="submit" className={styles.cta} disabled={!email.trim()}>
            Create price alert
          </button>
        </form>
      </div>
    </div>
  );
}
