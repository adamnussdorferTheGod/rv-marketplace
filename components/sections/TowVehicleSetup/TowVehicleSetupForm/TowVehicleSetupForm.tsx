import { useState, useCallback } from 'react';
import type { TowVehicle } from '../../../../app/src/data/towTypes';
import { useTowVehicle } from '../TowVehicleContext';
import YMMTSelector from '../YMMTSelector/YMMTSelector';
import VINEntry from '../VINEntry/VINEntry';
import SpecDisplayPanel from '../SpecDisplayPanel/SpecDisplayPanel';
import Button from '../../../ui/Button/Button';
import styles from './TowVehicleSetupForm.module.css';

type ActiveTab = 'ymmt' | 'vin';

export default function TowVehicleSetupForm() {
  const {
    saveVehicle,
    hasTowPackage,
    hasWDH,
    setHasTowPackage,
    setHasWDH,
  } = useTowVehicle();

  const [activeTab, setActiveTab] = useState<ActiveTab>('ymmt');
  const [selectedVehicle, setSelectedVehicle] = useState<TowVehicle | null>(null);

  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    setSelectedVehicle(null);
  }, []);

  const handleVehicleSelected = useCallback((vehicle: TowVehicle) => {
    setSelectedVehicle(vehicle);
  }, []);

  const handleSave = useCallback(() => {
    if (selectedVehicle) {
      saveVehicle(selectedVehicle);
    }
  }, [selectedVehicle, saveVehicle]);

  return (
    <div className={styles.form}>
      {/* Tab toggle */}
      <div className={styles.tabBar}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'ymmt' ? styles.tabActive : ''}`}
          onClick={() => handleTabChange('ymmt')}
        >
          Select Vehicle
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'vin' ? styles.tabActive : ''}`}
          onClick={() => handleTabChange('vin')}
        >
          Enter VIN
        </button>
      </div>

      {/* Tab content */}
      <div className={styles.tabContent}>
        {activeTab === 'ymmt' ? (
          <YMMTSelector onVehicleSelected={handleVehicleSelected} />
        ) : (
          <VINEntry onVehicleSelected={handleVehicleSelected} />
        )}
      </div>

      {/* Spec display */}
      <SpecDisplayPanel vehicle={selectedVehicle} />

      {/* Checkboxes */}
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={hasTowPackage}
            onChange={(e) => setHasTowPackage(e.target.checked)}
          />
          <span className={styles.checkboxCustom} aria-hidden="true">
            {hasTowPackage && (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path
                  d="M1 5L4.5 8.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span className={styles.checkboxText}>My vehicle has a tow package</span>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={hasWDH}
            onChange={(e) => setHasWDH(e.target.checked)}
          />
          <span className={styles.checkboxCustom} aria-hidden="true">
            {hasWDH && (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path
                  d="M1 5L4.5 8.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span className={styles.checkboxText}>I have a weight distribution hitch (WDH)</span>
        </label>
      </div>

      {/* Save button */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleSave}
        disabled={!selectedVehicle}
        className={styles.saveButton}
      >
        Save My Vehicle
      </Button>
    </div>
  );
}
