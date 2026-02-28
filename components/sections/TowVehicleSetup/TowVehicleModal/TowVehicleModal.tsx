import { useEffect, useState, useRef } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useTowVehicle } from '../TowVehicleContext';
import TowVehicleSetupForm from '../TowVehicleSetupForm/TowVehicleSetupForm';
import styles from './TowVehicleModal.module.css';

export default function TowVehicleModal() {
  const { isModalOpen, closeSetupModal, savedVehicle } = useTowVehicle();
  const [showToast, setShowToast] = useState(false);
  const prevSavedRef = useRef(savedVehicle);
  const wasModalOpenRef = useRef(isModalOpen);

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

  return (
    <>
      {isModalOpen && (
        <div className={styles.backdrop} onClick={closeSetupModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={closeSetupModal}
              aria-label="Close"
              type="button"
            >
              <Icon name="x_close" size={24} />
            </button>

            <h2 className={styles.heading}>Let's find your perfect match</h2>
            <p className={styles.subtitle}>
              Add your tow vehicle to instantly see which RVs are a match
            </p>

            <TowVehicleSetupForm />
          </div>
        </div>
      )}

      {showToast && (
        <div className={styles.toast}>Vehicle saved</div>
      )}
    </>
  );
}
