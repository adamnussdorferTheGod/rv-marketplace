import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import Icon from '@components/ui/Icon/Icon';
import type { ListingImage } from '../../../app/src/data/types';
import styles from './PrequalificationModal.module.css';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
];

interface PrequalificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  lastName: string;
  email: string;
  vehicleTitle: string;
  vehicleImage?: ListingImage;
  vehicleCondition: string;
  dealerName: string;
}

export default function PrequalificationModal({
  isOpen,
  onClose,
  firstName,
  lastName,
  email,
  vehicleTitle,
  vehicleImage,
  vehicleCondition,
  dealerName,
}: PrequalificationModalProps) {
  const [middleInitial, setMiddleInitial] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);
  const [localEmail, setLocalEmail] = useState(email);

  // Sync pre-filled values when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalFirstName(firstName);
      setLocalLastName(lastName);
      setLocalEmail(email);
    }
  }, [isOpen, firstName, lastName, email]);

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

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className={styles.header}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              <Icon name="x_close" size={24} />
            </button>
          </div>

          {/* Body */}
          <div className={styles.body}>
            {/* Main form column */}
            <div className={styles.mainColumn}>
              <p className={styles.prequalLabel}>Prequalification</p>
              <h2 className={styles.formTitle}>Customer Information</h2>
              <p className={styles.formSubtext}>Please fill in the customer information</p>

              <div className={styles.formGrid}>
                {/* Row: First Name | Middle Initial | Last Name */}
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>
                      First Name <span className={styles.fieldRequired}>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={localFirstName}
                      onChange={e => setLocalFirstName(e.target.value)}
                      placeholder="First Name"
                    />
                  </div>
                  <div className={`${styles.field} ${styles.fieldSmall}`}>
                    <label className={styles.fieldLabel}>MI</label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      maxLength={1}
                      value={middleInitial}
                      onChange={e => setMiddleInitial(e.target.value)}
                      placeholder="MI"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>
                      Last Name <span className={styles.fieldRequired}>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={localLastName}
                      onChange={e => setLocalLastName(e.target.value)}
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                {/* Row: Street Address | Apt/Suite */}
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>
                      Street Address <span className={styles.fieldRequired}>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={streetAddress}
                      onChange={e => setStreetAddress(e.target.value)}
                      placeholder="Street Address"
                    />
                  </div>
                  <div className={`${styles.field} ${styles.fieldSmall}`}>
                    <label className={styles.fieldLabel}>Apt/Suite</label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={apt}
                      onChange={e => setApt(e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Row: City | State | ZIP */}
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>
                      City <span className={styles.fieldRequired}>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div className={`${styles.field} ${styles.fieldSmall}`}>
                    <label className={styles.fieldLabel}>
                      State <span className={styles.fieldRequired}>*</span>
                    </label>
                    <select
                      className={styles.fieldInput}
                      value={state}
                      onChange={e => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {US_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className={`${styles.field} ${styles.fieldSmall}`}>
                    <label className={styles.fieldLabel}>
                      ZIP Code <span className={styles.fieldRequired}>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      maxLength={5}
                      value={zip}
                      onChange={e => setZip(e.target.value)}
                      placeholder="ZIP"
                    />
                  </div>
                </div>

                {/* Row: Phone | Email */}
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>
                      Phone <span className={styles.fieldRequired}>*</span>
                    </label>
                    <div className={styles.phoneWrapper}>
                      <span className={styles.phonePrefix}>+1</span>
                      <input
                        className={styles.phoneInput}
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>
                      Email <span className={styles.fieldRequired}>*</span>
                    </label>
                    <input
                      className={styles.fieldInput}
                      type="email"
                      value={localEmail}
                      onChange={e => setLocalEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>

              <p className={styles.legalText}>
                By clicking Continue, you agree to allow the dealership to obtain your credit
                report and share your information with lenders for the purpose of evaluating
                your prequalification for financing.
              </p>

              <div className={styles.continueRow}>
                <button type="button" className={styles.continueBtn}>
                  Continue
                  <Icon name="chevron_right" size={20} />
                </button>
              </div>

              <div className={styles.disclaimerBox}>
                <p className={styles.disclaimerText}>
                  This is not a credit application. Prequalification results are based on a soft
                  credit inquiry and do not guarantee approval or specific terms. Final loan
                  terms are subject to a full credit application, verification of information,
                  and lender approval. The information you provide will be shared with
                  participating lenders and the dealership for the purpose of determining your
                  prequalification status.
                </p>
              </div>
            </div>

            {/* Right sidebar */}
            <div className={styles.sidebar}>
              {/* Step indicator */}
              <div className={styles.stepCard}>
                <p className={styles.stepLabel}>Step 1 of 3</p>
                <p className={styles.stepTitle}>Customer Information</p>
                <div className={styles.stepDots}>
                  <div className={styles.dotActive} />
                  <div className={styles.dotConnector} />
                  <div className={styles.dotInactive} />
                  <div className={styles.dotConnector} />
                  <div className={styles.dotInactive} />
                </div>
                <p className={styles.stepDate}>Started {todayStr}</p>
              </div>

              {/* Vehicle card */}
              <div className={styles.vehicleCard}>
                {vehicleImage && (
                  <img
                    className={styles.vehicleImage}
                    src={vehicleImage.url}
                    alt={vehicleImage.alt}
                  />
                )}
                <div className={styles.vehicleInfo}>
                  <p className={styles.vehicleTitle}>{vehicleTitle}</p>
                  <span className={styles.vehicleBadge}>{vehicleCondition}</span>
                  <p className={styles.vehicleDealer}>{dealerName}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
