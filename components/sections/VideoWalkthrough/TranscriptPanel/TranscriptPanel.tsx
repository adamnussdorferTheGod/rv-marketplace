import { useRef, useEffect, useMemo } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useVideoWalkthrough } from '../VideoWalkthroughContext';
import { formatDuration } from '../../../../app/src/data/videoWalkthroughTypes';
import styles from './TranscriptPanel.module.css';

export default function TranscriptPanel() {
  const { state, data } = useVideoWalkthrough();
  const activeRef = useRef<HTMLDivElement>(null);

  const segments = data?.audio.segments ?? [];

  // Map flat segment index to audio segment index for active highlight
  const flatSegmentIds = useMemo(() => {
    if (!data) return [];
    return data.acts.flatMap((act) => act.segments.map((s) => s.id));
  }, [data]);

  const activeSegmentId = flatSegmentIds[state.currentSegmentIndex] ?? null;

  // Auto-scroll to active segment
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeSegmentId]);

  if (segments.length === 0) return null;

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
          const isActive = seg.segmentId === activeSegmentId;
          return (
            <div
              key={seg.segmentId}
              ref={isActive ? activeRef : undefined}
              className={`${styles.segment} ${isActive ? styles.segmentActive : ''}`}
            >
              <span className={styles.timestamp}>
                {formatDuration(seg.startMs)}
              </span>
              <span className={styles.transcriptText}>{seg.transcript}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
