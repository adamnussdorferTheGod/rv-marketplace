import { useMemo, useRef, useCallback, type MouseEvent } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useVideoWalkthrough } from '../VideoWalkthroughContext';
import { formatDuration } from '../../../../app/src/data/videoWalkthroughTypes';
import styles from './VideoControls.module.css';

export default function VideoControls() {
  const {
    state,
    data,
    play,
    pause,
    seekToMs,
    toggleMute,
    setVolume,
  } = useVideoWalkthrough();

  const seekBarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Flatten segment durations for total + elapsed computation
  const flatDurations = useMemo(() => {
    if (!data) return [];
    return data.acts.flatMap((act) => act.segments.map((s) => s.durationMs));
  }, [data]);

  const totalDurationMs = useMemo(
    () => flatDurations.reduce((sum, d) => sum + d, 0),
    [flatDurations],
  );

  // Global elapsed = sum of completed segments + current segment elapsed
  const globalElapsedMs = useMemo(() => {
    let elapsed = 0;
    for (let i = 0; i < state.currentSegmentIndex; i++) {
      elapsed += flatDurations[i] ?? 0;
    }
    return elapsed + state.elapsedMs;
  }, [state.currentSegmentIndex, state.elapsedMs, flatDurations]);

  const progress = totalDurationMs > 0 ? globalElapsedMs / totalDurationMs : 0;

  // Seek from mouse position on the seek bar
  const seekFromEvent = useCallback(
    (clientX: number) => {
      const bar = seekBarRef.current;
      if (!bar || totalDurationMs === 0) return;
      const rect = bar.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      seekToMs(fraction * totalDurationMs);
    },
    [seekToMs, totalDurationMs],
  );

  const handleSeekMouseDown = useCallback(
    (e: MouseEvent) => {
      isDraggingRef.current = true;
      seekFromEvent(e.clientX);

      const onMove = (ev: globalThis.MouseEvent) => {
        if (isDraggingRef.current) seekFromEvent(ev.clientX);
      };
      const onUp = () => {
        isDraggingRef.current = false;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [seekFromEvent],
  );

  // Play/pause/replay icon logic
  const isEnded = state.status === 'ended';
  const isPlaying = state.status === 'playing';
  const playIcon = isEnded ? 'replay' : isPlaying ? 'pause' : 'play_arrow';
  const playLabel = isEnded ? 'Replay' : isPlaying ? 'Pause' : 'Play';

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return (
    <div className={styles.controls}>
      {/* Play/Pause/Replay */}
      <button
        className={styles.playPauseBtn}
        onClick={handlePlayPause}
        aria-label={playLabel}
      >
        <Icon name={playIcon} size={22} />
      </button>

      {/* Time display */}
      <span className={styles.time}>
        {formatDuration(globalElapsedMs)} / {formatDuration(totalDurationMs)}
      </span>

      {/* Seek bar */}
      <div
        className={styles.seekBar}
        ref={seekBarRef}
        onMouseDown={handleSeekMouseDown}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={totalDurationMs}
        aria-valuenow={globalElapsedMs}
      >
        <div className={styles.seekTrack}>
          <div
            className={styles.seekProgress}
            style={{ width: `${progress * 100}%` }}
          >
            <div className={styles.seekThumb} />
          </div>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        className={styles.muteBtn}
        onClick={toggleMute}
        aria-label={state.isMuted ? 'Unmute' : 'Mute'}
      >
        <Icon name={state.isMuted ? 'volume_off' : 'volume_up'} size={20} />
      </button>

      {/* Volume slider */}
      <input
        type="range"
        className={styles.volumeSlider}
        min={0}
        max={1}
        step={0.05}
        value={state.isMuted ? 0 : state.volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        aria-label="Volume"
      />
    </div>
  );
}
