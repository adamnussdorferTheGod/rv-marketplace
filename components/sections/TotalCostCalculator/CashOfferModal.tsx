import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import Icon from '@components/ui/Icon/Icon';
import styles from './CashOfferModal.module.css';

interface CashOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OfferOption = 'sell' | 'trade-in' | 'not-sure';

export default function CashOfferModal({ isOpen, onClose }: CashOfferModalProps) {
  const [option, setOption] = useState<OfferOption>('sell');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setOption('sell');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setZip('');
    }
  }, [isOpen]);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  const handleNext = () => {
    onClose();
  };

  const options: { key: OfferOption; label: string }[] = [
    { key: 'sell', label: 'Sell to dealer' },
    { key: 'trade-in', label: 'Trade-In' },
    { key: 'not-sure', label: 'Not Sure' },
  ];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Get a cash offer for your RV"
          >
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <Icon name="x_close" size={24} />
            </button>

            <h2 className={styles.heading}>Ready to sell your vehicle?</h2>
            <p className={styles.subheading}>
              Please provide additional vehicle details to receive quick, free and no obligation quotes from dealers.
            </p>

            {/* Basic Information — expanded */}
            <div className={styles.accordion}>
              <button type="button" className={styles.accordionHeader} aria-expanded="true">
                <span className={styles.accordionTitle}>
                  <span className={styles.accordionIcon}>
                    <Icon name="arrow_forward" size={16} />
                  </span>
                  Basic Information
                </span>
                <span className={`${styles.chevron} ${styles.chevronOpen}`}>&#x25B2;</span>
              </button>

              <div className={styles.accordionBody}>
                <p className={styles.optionLabel}>
                  Dealers can buy your RV or you can trade it in, which option most interests you?
                </p>

                <div className={styles.optionGrid}>
                  {options.map(({ key, label }) => (
                    <div
                      key={key}
                      className={`${styles.optionCard} ${option === key ? styles.selected : ''}`}
                      onClick={() => setOption(key)}
                      role="radio"
                      aria-checked={option === key}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOption(key); }}
                    >
                      <span className={styles.radio} />
                      {label}
                    </div>
                  ))}
                </div>

                <div className={styles.fieldGrid}>
                  <div className={styles.fieldWrap}>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label className={styles.fieldLabel}>First Name *</label>
                  </div>
                  <div className={styles.fieldWrap}>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label className={styles.fieldLabel}>Last Name *</label>
                  </div>
                  <div className={styles.fieldWrap}>
                    <input
                      className={styles.fieldInput}
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className={styles.fieldLabel}>Email *</label>
                  </div>
                  <div className={styles.fieldWrap}>
                    <input
                      className={styles.fieldInput}
                      type="tel"
                      placeholder="(XXX) XXX-XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label className={styles.fieldLabel}>Phone Number *</label>
                  </div>
                  <div className={`${styles.fieldWrap} ${styles.fieldWrapFull}`}>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      placeholder="ZIP"
                      maxLength={5}
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                    <label className={styles.fieldLabel}>ZIP *</label>
                  </div>
                </div>

                <button type="button" className={styles.nextBtn} onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>

            {/* Condition and History — collapsed/disabled */}
            <div className={styles.accordion}>
              <div className={`${styles.accordionHeader} ${styles.disabled}`}>
                <span className={styles.accordionTitle}>
                  <span className={styles.accordionIcon}>
                    <Icon name="arrow_forward" size={16} />
                  </span>
                  Condition and History
                </span>
                <span className={styles.chevron}>&#x25B2;</span>
              </div>
            </div>

            {/* Upload Photos — collapsed/disabled */}
            <div className={styles.accordion}>
              <div className={`${styles.accordionHeader} ${styles.disabled}`}>
                <span className={styles.accordionTitle}>
                  <span className={styles.accordionIcon}>
                    <Icon name="arrow_forward" size={16} />
                  </span>
                  Upload Photos
                </span>
                <span className={styles.chevron}>&#x25B2;</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
