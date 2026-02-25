import { useRef, useEffect, useMemo } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useVideoWalkthrough } from '../VideoWalkthroughContext';
import { formatDuration } from '../../../../app/src/data/videoWalkthroughTypes';
import type { AudioWord } from '../../../../app/src/data/videoWalkthroughTypes';
import styles from './TranscriptPanel.module.css';

export default function TranscriptPanel() {
  const { state, data } = useVideoWalkthrough();
  const activeRef = useRef<HTMLDivElement>(null);

  const segments = data?.audio.segments ?? [];

  // Compute global elapsed time from segment index + local elapsed
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

  // Auto-scroll to the most recent visible segment
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [state.currentSegmentIndex]);

  // Don't render until the user has clicked play
  if (!state.hasPlayed || segments.length === 0) return null;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon name="text_snippet" size={18} />
        </span>
        Transcript
      </div>
      <div className={styles.segmentList}>
        {segments.map((seg) => {
          // Progressive reveal: only show segments we've reached
          if (globalElapsedMs < seg.startMs) return null;

          const isActive = globalElapsedMs >= seg.startMs && globalElapsedMs < seg.endMs;
          const isPast = globalElapsedMs >= seg.endMs;

          return (
            <div
              key={seg.segmentId}
              ref={isActive ? activeRef : undefined}
              className={`${styles.segment} ${isActive ? styles.segmentActive : ''}`}
            >
              <span className={styles.timestamp}>
                {formatDuration(seg.startMs)}
              </span>
              <span className={styles.transcriptText}>
                {isActive ? (
                  <KaraokeText
                    words={seg.words}
                    text={seg.transcript}
                    segStartMs={seg.startMs}
                    segEndMs={seg.endMs}
                    currentMs={globalElapsedMs}
                  />
                ) : isPast ? (
                  <span className={styles.wordSpoken}>{seg.transcript}</span>
                ) : (
                  seg.transcript
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Renders transcript text with per-word karaoke highlighting */
function KaraokeText({
  words,
  text,
  segStartMs,
  segEndMs,
  currentMs,
}: {
  words?: AudioWord[];
  text: string;
  segStartMs: number;
  segEndMs: number;
  currentMs: number;
}) {
  // Use real word timestamps when available
  if (words && words.length > 0) {
    return (
      <>
        {words.map((w, i) => {
          let cls = styles.wordUpcoming;
          if (currentMs >= w.endMs) cls = styles.wordSpoken;
          else if (currentMs >= w.startMs) cls = styles.wordActive;

          return (
            <span key={i} className={cls}>
              {w.text}{i < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </>
    );
  }

  // Fallback: even distribution estimate
  const splitWords = text.split(/\s+/);
  const segDuration = segEndMs - segStartMs;
  const timePerWord = segDuration / splitWords.length;
  const timeInSegment = currentMs - segStartMs;
  const activeWordIndex = Math.min(
    Math.floor(timeInSegment / timePerWord),
    splitWords.length - 1,
  );

  return (
    <>
      {splitWords.map((word, i) => {
        let cls = styles.wordUpcoming;
        if (i < activeWordIndex) cls = styles.wordSpoken;
        else if (i === activeWordIndex) cls = styles.wordActive;

        return (
          <span key={i} className={cls}>
            {word}{i < splitWords.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </>
  );
}
