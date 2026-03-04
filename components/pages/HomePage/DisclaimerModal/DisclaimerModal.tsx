import { useEffect } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './DisclaimerModal.module.css';

interface DisclaimerModalProps {
  onClose: () => void;
}

export default function DisclaimerModal({ onClose }: DisclaimerModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Heads-up</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <Icon name="x_close" size={24} />
          </button>
        </div>
        <div className={styles.body}>
          <p className={styles.message}>
            This is a prototype. Not a live product or committed roadmap feature.
          </p>
          <button className={styles.gotItBtn} onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
