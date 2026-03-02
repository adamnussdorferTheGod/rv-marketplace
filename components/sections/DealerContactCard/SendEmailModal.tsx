import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import Icon from '@components/ui/Icon/Icon';
import styles from './SendEmailModal.module.css';

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleTitle: string;
}

export default function SendEmailModal({ isOpen, onClose, vehicleTitle }: SendEmailModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [tradeIn, setTradeIn] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Pre-fill comments when modal opens
  useEffect(() => {
    if (isOpen) {
      setComments(vehicleTitle ? `Is this ${vehicleTitle} still for sale?` : '');
      setShowToast(false);
    }
  }, [isOpen, vehicleTitle]);

  const handleSubmit = () => {
    onClose();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

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

  return createPortal(
    <>
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
            >
              {/* Header */}
              <div className={styles.header}>
                <h2 className={styles.title}>You're almost there!</h2>
                <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
                  <Icon name="x_close" size={24} />
                </button>
              </div>

              {/* Form */}
              <div className={styles.form}>
                {/* First name / Last name */}
                <div className={styles.fieldRow}>
                  <div className={styles.fieldWrap}>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label className={styles.fieldLabel}>First name *</label>
                  </div>
                  <div className={styles.fieldWrap}>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label className={styles.fieldLabel}>Last name *</label>
                  </div>
                </div>

                {/* Zip code / Phone */}
                <div className={styles.fieldRow}>
                  <div className={styles.fieldWrap}>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      placeholder="Zip code"
                      maxLength={5}
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                    <label className={styles.fieldLabel}>Zip code *</label>
                  </div>
                  <div className={styles.fieldWrap}>
                    <input
                      className={styles.fieldInput}
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label className={styles.fieldLabel}>Phone</label>
                  </div>
                </div>

                {/* Email */}
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

                {/* Comments */}
                <div className={styles.fieldWrap}>
                  <textarea
                    className={styles.textareaInput}
                    placeholder="Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                  <label className={styles.fieldLabel}>Comments</label>
                </div>

                {/* Checkboxes */}
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={priceAlerts}
                      onChange={(e) => setPriceAlerts(e.target.checked)}
                    />
                    I would like to get price alerts, exclusive offers, and other helpful information.
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={tradeIn}
                      onChange={(e) => setTradeIn(e.target.checked)}
                    />
                    I have an RV I'd like to trade-in or sell
                  </label>
                </div>

                {/* Submit */}
                <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
                  Send email
                </button>

                {/* Legal */}
                <p className={styles.legalText}>
                  By using this site, you agree to our <a href="#">Terms of Use</a> & our <a href="#">Privacy Policy</a>.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowToast(false)}
          >
            <p className={styles.toastHeading}>Email sent!</p>
            <p className={styles.toastDescription}>The dealer will get back to you shortly.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}
