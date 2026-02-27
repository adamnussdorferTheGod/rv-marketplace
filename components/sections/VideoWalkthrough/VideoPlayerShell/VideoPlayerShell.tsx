import { useEffect, useMemo, useRef, useCallback } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useVideoWalkthrough } from '../VideoWalkthroughContext';
import CompositionCanvas from '../CompositionCanvas/CompositionCanvas';
import VideoControls from '../VideoControls/VideoControls';
import TranscriptPanel from '../TranscriptPanel/TranscriptPanel';
import VideoAuthGate from '../VideoAuthGate/VideoAuthGate';
import { useAudioSync } from '../hooks/useAudioSync';
import styles from './VideoPlayerShell.module.css';

const GATE_THRESHOLD_MS = 30_000;

interface VideoPlayerShellProps {
  onClose: () => void;
}

export default function VideoPlayerShell({ onClose }: VideoPlayerShellProps) {
  const { state, data, loaded, play, gate, ungate } = useVideoWalkthrough();
  const hasGatedRef = useRef(false);

  // Compute global elapsed time (same logic as VideoControls)
  const flatDurations = useMemo(() => {
    if (!data) return [];
    return data.acts.flatMap((act) => act.segments.map((s) => s.durationMs));
  }, [data]);

  const globalElapsedMs = useMemo(() => {
    let elapsed = 0;
    for (let i = 0; i < state.currentSegmentIndex; i++) {
      elapsed += flatDurations[i] ?? 0;
    }
    return elapsed + state.elapsedMs;
  }, [state.currentSegmentIndex, state.elapsedMs, flatDurations]);

  // Trigger gate at 30 seconds (once)
  useEffect(() => {
    if (
      !hasGatedRef.current &&
      state.status === 'playing' &&
      globalElapsedMs >= GATE_THRESHOLD_MS
    ) {
      hasGatedRef.current = true;
      gate();
    }
  }, [globalElapsedMs, state.status, gate]);

  const handleAuthenticate = useCallback(() => {
    ungate();
    // Small delay so the ungate state settles before playing
    requestAnimationFrame(() => play());
  }, [ungate, play]);

  // Sync audio to timeline (no-op when audioUrl is undefined)
  useAudioSync();

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
      img.onerror = () => loaded();
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
      <div className={styles.lightboxLayout}>
        <div className={styles.videoColumn}>
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
              <>
                <CompositionCanvas />
                {state.isGated ? (
                  <VideoAuthGate onAuthenticate={handleAuthenticate} />
                ) : (
                  (state.status === 'paused' || state.status === 'ended') && (
                    <button
                      className={styles.playOverlay}
                      onClick={play}
                      aria-label="Play video"
                    >
                      <div className={styles.playCircle}>
                        <Icon name={state.status === 'ended' ? 'replay' : 'play_arrow'} size={40} />
                      </div>
                    </button>
                  )
                )}
              </>
            )}
          </div>
          <VideoControls />
        </div>
        <TranscriptPanel />
      </div>
    </div>
  );
}
