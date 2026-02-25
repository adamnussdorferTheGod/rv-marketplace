import { useMemo, useCallback, useEffect } from 'react';
import type {
  VideoSegment,
  VideoAct,
  ActType,
} from '../../../../app/src/data/videoWalkthroughTypes';
import { useVideoWalkthrough } from '../VideoWalkthroughContext';
import { useTimeline } from '../hooks/useTimeline';
import KenBurnsLayer from '../KenBurnsLayer/KenBurnsLayer';
import styles from './CompositionCanvas.module.css';

/** Flattened segment with act metadata for linear traversal */
interface FlatSegment {
  segment: VideoSegment;
  actIndex: number;
  actType: ActType;
  globalIndex: number;
}

/** Flattens nested acts[].segments[] into a linear array with act metadata */
function flattenSegments(acts: VideoAct[]): FlatSegment[] {
  const flat: FlatSegment[] = [];
  acts.forEach((act, actIndex) => {
    act.segments.forEach((segment) => {
      flat.push({ segment, actIndex, actType: act.type, globalIndex: flat.length });
    });
  });
  return flat;
}

/**
 * Orchestrates two-layer Ken Burns crossfade transitions.
 *
 * Uses an A/B swap pattern: two KenBurnsLayer instances alternate as
 * the "active" layer based on currentIndex % 2. This ensures only 2 images
 * are ever in the DOM, with 500ms opacity crossfade between segments.
 *
 * All data comes from VideoWalkthroughContext — no props needed.
 */
export default function CompositionCanvas() {
  const { state, data, tick, advanceSegment, end } = useVideoWalkthrough();

  const flatSegments = useMemo(
    () => (data ? flattenSegments(data.acts) : []),
    [data],
  );

  const getActIndex = useCallback(
    (segIndex: number) => flatSegments[segIndex]?.actIndex ?? 0,
    [flatSegments],
  );

  // Wire the rAF-driven timeline loop
  useTimeline({
    isPlaying: state.status === 'playing',
    segments: flatSegments.map((f) => f.segment),
    currentSegmentIndex: state.currentSegmentIndex,
    onTick: tick,
    onSegmentAdvance: advanceSegment,
    onEnd: end,
    getActIndex,
  });

  // Preload 2 images ahead of the current segment
  useEffect(() => {
    for (let i = 1; i <= 2; i++) {
      const next = flatSegments[state.currentSegmentIndex + i];
      if (next) {
        const img = new Image();
        img.src = next.segment.photoUrl;
      }
    }
  }, [state.currentSegmentIndex, flatSegments]);

  // A/B crossfade rendering
  const currentIndex = state.currentSegmentIndex;
  const currentSeg = flatSegments[currentIndex];
  const previousSeg = currentIndex > 0 ? flatSegments[currentIndex - 1] : null;
  const isLayerAActive = currentIndex % 2 === 0;
  const isPaused = state.status === 'paused';

  return (
    <div className={styles.canvas}>
      {/* Layer A */}
      {(isLayerAActive ? currentSeg : previousSeg) && (
        <KenBurnsLayer
          key={isLayerAActive ? `a-${currentIndex}` : `a-${currentIndex - 1}`}
          segment={(isLayerAActive ? currentSeg : previousSeg)!.segment}
          isActive={isLayerAActive}
          opacity={isLayerAActive ? 1 : 0}
          isPaused={isPaused}
        />
      )}
      {/* Layer B */}
      {(!isLayerAActive ? currentSeg : previousSeg) && (
        <KenBurnsLayer
          key={!isLayerAActive ? `b-${currentIndex}` : `b-${currentIndex - 1}`}
          segment={(!isLayerAActive ? currentSeg : previousSeg)!.segment}
          isActive={!isLayerAActive}
          opacity={!isLayerAActive ? 1 : 0}
          isPaused={isPaused}
        />
      )}
    </div>
  );
}
