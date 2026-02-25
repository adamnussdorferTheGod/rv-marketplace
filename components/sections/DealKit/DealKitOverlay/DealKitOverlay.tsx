import { useCallback, useRef } from 'react';
import { useDealKit } from '../DealKitContext';
import DealKitHeader from '../DealKitHeader/DealKitHeader';
import DealKitLoading from '../DealKitLoading/DealKitLoading';
import AuthGateModal from '../AuthGateModal/AuthGateModal';
import DealKitContent from '../DealKitContent/DealKitContent';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { generatePdf } from '../generatePdf';
import styles from './DealKitOverlay.module.css';

export default function DealKitOverlay() {
  const { step, isOverlayOpen } = useDealKit();
  const scrollRef = useRef<HTMLDivElement>(null);

  useScrollSpy(scrollRef);

  const handleDownloadPdf = useCallback(() => {
    if (scrollRef.current) {
      generatePdf(scrollRef.current);
    }
  }, []);

  return (
    <>
      <AuthGateModal />
      {isOverlayOpen && (
        <div className={styles.overlay}>
          <DealKitHeader onDownloadPdf={handleDownloadPdf} />
          <div className={styles.body} ref={scrollRef}>
            {step === 'loading' ? (
              <DealKitLoading />
            ) : (
              <DealKitContent />
            )}
          </div>
        </div>
      )}
    </>
  );
}
