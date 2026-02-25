import { useEffect } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useVideoWalkthrough } from '../VideoWalkthroughContext';
import CompositionCanvas from '../CompositionCanvas/CompositionCanvas';
import styles from './VideoPlayerShell.module.css';

interface VideoPlayerShellProps {
  onClose: () => void;
}

export default function VideoPlayerShell({ onClose }: VideoPlayerShellProps) {
  const { state, data, loaded } = useVideoWalkthrough();

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

  // First-image preloading: when loading, preload first photo then transition to playing
  useEffect(() => {
    if (state.status === 'loading' && data) {
      const img = new Image();
      img.onload = () => loaded();
      img.onerror = () => loaded(); // Degrade gracefully — show canvas even if first image fails
      img.src = data.acts[0].segments[0].photoUrl;
    }
  }, [state.status, data, loaded]);

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
        {state.status === 'loading' ? (
          <div className={styles.loadingState}>
            <img
              src={data?.source.posterUrl}
              alt="Loading video tour"
              className={styles.poster}
            />
            <div className={styles.spinner} />
          </div>
        ) : (
          <CompositionCanvas />
        )}
      </div>
    </div>
  );
}
