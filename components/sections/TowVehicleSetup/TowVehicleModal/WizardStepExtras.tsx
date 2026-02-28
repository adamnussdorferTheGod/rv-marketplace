import { useTowVehicle } from '../TowVehicleContext';
import styles from './TowVehicleModal.module.css';

interface WizardStepExtrasProps {
  onContinue: () => void;
}

export default function WizardStepExtras({ onContinue }: WizardStepExtrasProps) {
  const { hasTowPackage, hasWDH, setHasTowPackage, setHasWDH } = useTowVehicle();

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>Any extras?</h2>
      <p className={styles.stepSubtextCenter}>
        These affect your tow capacity calculations
      </p>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <span className={`${styles.checkbox} ${hasTowPackage ? styles.checkboxChecked : ''}`}>
            {hasTowPackage && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.5 3.5L5.5 10L2.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={hasTowPackage}
            onChange={e => setHasTowPackage(e.target.checked)}
          />
          <span className={styles.checkboxText}>My vehicle has a tow package</span>
        </label>

        <label className={styles.checkboxLabel}>
          <span className={`${styles.checkbox} ${hasWDH ? styles.checkboxChecked : ''}`}>
            {hasWDH && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.5 3.5L5.5 10L2.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={hasWDH}
            onChange={e => setHasWDH(e.target.checked)}
          />
          <span className={styles.checkboxText}>I have a weight distribution hitch (WDH)</span>
        </label>
      </div>

      <button type="button" className={styles.continueBtn} onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}
