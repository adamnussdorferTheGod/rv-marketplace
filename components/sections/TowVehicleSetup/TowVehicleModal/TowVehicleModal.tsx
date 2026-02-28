import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from '@components/ui/Icon/Icon';
import { useTowVehicle } from '../TowVehicleContext';
import { useWizardSteps } from './useWizardSteps';
import type { YMMTLevel } from '../../../../app/src/data/towTypes';
import WizardStepIntro from './WizardStepIntro';
import WizardStepMake from './WizardStepMake';
import WizardStepModel from './WizardStepModel';
import WizardStepTrim from './WizardStepTrim';
import WizardStepEngine from './WizardStepEngine';
import WizardStepCab from './WizardStepCab';
import WizardStepBed from './WizardStepBed';
import WizardStepVIN from './WizardStepVIN';
import WizardStepExtras from './WizardStepExtras';
import WizardStepConfirm from './WizardStepConfirm';
import styles from './TowVehicleModal.module.css';

const SLIDE_OFFSET = 60;

export default function TowVehicleModal() {
  const { isModalOpen, closeSetupModal, savedVehicle } = useTowVehicle();
  const [showToast, setShowToast] = useState(false);
  const prevSavedRef = useRef(savedVehicle);
  const wasModalOpenRef = useRef(isModalOpen);

  const wizard = useWizardSteps();

  // Reset wizard when modal opens
  useEffect(() => {
    if (isModalOpen) {
      wizard.reset();
    }
  }, [isModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Escape key closes modal
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSetupModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeSetupModal]);

  // Toast notification when vehicle is saved while modal was open
  useEffect(() => {
    if (
      wasModalOpenRef.current &&
      prevSavedRef.current === null &&
      savedVehicle !== null
    ) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
    prevSavedRef.current = savedVehicle;
    wasModalOpenRef.current = isModalOpen;
  }, [savedVehicle, isModalOpen]);

  // Track modal open state
  useEffect(() => {
    wasModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  if (!isModalOpen && !showToast) return null;

  const progress = ((wizard.currentStepIndex + 1) / wizard.totalSteps) * 100;
  const isFirstStep = wizard.currentStepIndex === 0;

  function handleSelectOption(level: YMMTLevel) {
    return (value: string) => wizard.selectOption(level, value);
  }

  function renderStep() {
    switch (wizard.currentStep) {
      case 'intro':
        return (
          <WizardStepIntro
            onQuickPick={wizard.quickPick}
            onBrowseByMake={wizard.goToMake}
            onSwitchToVIN={wizard.switchToVIN}
          />
        );
      case 'make':
        return <WizardStepMake selections={wizard.selections} onSelect={handleSelectOption('make')} />;
      case 'model':
        return <WizardStepModel selections={wizard.selections} onSelect={handleSelectOption('model')} />;
      case 'trim':
        return <WizardStepTrim selections={wizard.selections} onSelect={handleSelectOption('trim')} />;
      case 'engine':
        return <WizardStepEngine selections={wizard.selections} onSelect={handleSelectOption('engine')} />;
      case 'cab':
        return <WizardStepCab selections={wizard.selections} onSelect={handleSelectOption('cab')} />;
      case 'bed':
        return <WizardStepBed selections={wizard.selections} onSelect={handleSelectOption('bed')} />;
      case 'vin':
        return (
          <WizardStepVIN
            onVehicleDecoded={wizard.setVinVehicle}
            onContinue={wizard.goNext}
            onSwitchToYMMT={wizard.switchToYMMT}
          />
        );
      case 'extras':
        return <WizardStepExtras onContinue={wizard.goNext} onBack={wizard.goBack} />;
      case 'confirm':
        return wizard.resolvedVehicle ? <WizardStepConfirm vehicle={wizard.resolvedVehicle} onBack={wizard.goBack} /> : null;
      default:
        return null;
    }
  }

  return (
    <>
      {isModalOpen && (
        <div className={styles.wizard}>
          {/* Header with back/close and progress */}
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <button
                type="button"
                className={`${styles.backBtn} ${isFirstStep ? styles.backBtnHidden : ''}`}
                onClick={wizard.goBack}
                aria-label="Go back"
              >
                <Icon name="chevron_left" size={20} />
                Back
              </button>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeSetupModal}
                aria-label="Close"
              >
                <Icon name="x_close" size={24} />
              </button>
            </div>
            <div className={styles.progressWrap}>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {/* Animated step content */}
          <div className={styles.content}>
            <div className={styles.contentInner}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={wizard.currentStep}
                  initial={{ opacity: 0, x: wizard.direction * SLIDE_OFFSET }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: wizard.direction * -SLIDE_OFFSET }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className={styles.toast}>Vehicle saved</div>
      )}
    </>
  );
}
