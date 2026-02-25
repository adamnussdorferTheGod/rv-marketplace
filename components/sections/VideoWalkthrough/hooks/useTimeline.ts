import { useRef, useEffect, type RefObject } from 'react';

interface UseTimelineOptions {
  isPlaying: boolean;
  segments: { durationMs: number }[];
  currentSegmentIndex: number;
  onTick: (elapsedMs: number) => void;
  onSegmentAdvance: (segmentIndex: number, actIndex: number) => void;
  onEnd: () => void;
  getActIndex: (segmentIndex: number) => number;
  seekOffsetRef?: RefObject<number>;
}

/**
 * requestAnimationFrame-based timeline driver for the Ken Burns composition engine.
 *
 * All timing state AND callback references are stored in useRef so the rAF loop
 * never needs to be torn down and restarted on re-renders. The effect only
 * fires when isPlaying changes (play/pause/stop).
 *
 * Key behaviors:
 * - Delta capping: if delta > 100ms, treat as 0 (handles tab-switch drift)
 * - Tick throttling: onTick called at most every 100ms (not every 16ms frame)
 * - Self-terminating: loop stops when last segment completes
 */
export function useTimeline({
  isPlaying,
  segments,
  currentSegmentIndex,
  onTick,
  onSegmentAdvance,
  onEnd,
  getActIndex,
  seekOffsetRef,
}: UseTimelineOptions): void {
  const rafIdRef = useRef<number>(0);
  const previousTimeRef = useRef<number | null>(null);
  const segmentElapsedRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

  // Store latest values in refs so the rAF callback always reads current values
  // without needing to be recreated (which would restart the loop and waste frames)
  const segmentsRef = useRef(segments);
  const indexRef = useRef(currentSegmentIndex);
  const onTickRef = useRef(onTick);
  const onSegmentAdvanceRef = useRef(onSegmentAdvance);
  const onEndRef = useRef(onEnd);
  const getActIndexRef = useRef(getActIndex);

  // Sync refs on every render — cheap assignments, no effect overhead
  segmentsRef.current = segments;
  indexRef.current = currentSegmentIndex;
  onTickRef.current = onTick;
  onSegmentAdvanceRef.current = onSegmentAdvance;
  onEndRef.current = onEnd;
  getActIndexRef.current = getActIndex;

  // Single rAF loop — only starts/stops when isPlaying changes
  useEffect(() => {
    if (!isPlaying) return;

    previousTimeRef.current = null;
    lastTickRef.current = 0;

    function frame(timestamp: number) {
      if (previousTimeRef.current === null) {
        previousTimeRef.current = timestamp;
      }

      const delta = timestamp - previousTimeRef.current;
      previousTimeRef.current = timestamp;

      // Cap delta time: if > 100ms, treat as 0 (handles tab switch drift)
      if (delta <= 100) {
        segmentElapsedRef.current += delta;
      }

      const idx = indexRef.current;
      const currentDuration = segmentsRef.current[idx]?.durationMs ?? 0;

      if (segmentElapsedRef.current >= currentDuration) {
        // Segment complete — advance or end
        const nextIndex = idx + 1;
        if (nextIndex >= segmentsRef.current.length) {
          onEndRef.current();
          return; // Self-terminating
        }
        segmentElapsedRef.current = 0;
        lastTickRef.current = 0;
        onSegmentAdvanceRef.current(
          nextIndex,
          getActIndexRef.current(nextIndex),
        );
      } else {
        // Throttle onTick dispatches: only call if >= 100ms since last tick
        if (segmentElapsedRef.current - lastTickRef.current >= 100) {
          lastTickRef.current = segmentElapsedRef.current;
          onTickRef.current(segmentElapsedRef.current);
        }
      }

      rafIdRef.current = requestAnimationFrame(frame);
    }

    rafIdRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [isPlaying]);

  // Reset segment elapsed when segment changes (from advancement or seek)
  useEffect(() => {
    const offset = seekOffsetRef?.current ?? 0;
    segmentElapsedRef.current = offset;
    lastTickRef.current = offset;
    if (seekOffsetRef && seekOffsetRef.current !== 0) {
      (seekOffsetRef as { current: number }).current = 0;
    }
  }, [currentSegmentIndex, seekOffsetRef]);
}
