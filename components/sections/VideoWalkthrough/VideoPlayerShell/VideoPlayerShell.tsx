import { useEffect } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './VideoPlayerShell.module.css';

interface VideoPlayerShellProps {
  onClose: () => void;
}

export default function VideoPlayerShell({ onClose }: VideoPlayerShellProps) {
  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Escape key handler
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close video player"
      >
        <Icon name="x_close" size={24} />
      </button>
      <div className={styles.container}>
        <div className={styles.placeholder}>
          AI Video Tour
        </div>
      </div>
    </div>
  );
}
