import { useRef, useEffect, useCallback } from 'react';

interface UseTimelineOptions {
  isPlaying: boolean;
  segments: { durationMs: number }[];
  currentSegmentIndex: number;
  onTick: (elapsedMs: number) => void;
  onSegmentAdvance: (segmentIndex: number, actIndex: number) => void;
  onEnd: () => void;
  getActIndex: (segmentIndex: number) => number;
}

/**
 * requestAnimationFrame-based timeline driver for the Ken Burns composition engine.
 *
 * All timing state is stored in useRef to avoid triggering re-renders at 60fps.
 * Only dispatches to the reducer via callbacks at throttled intervals or on
 * segment boundaries.
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
}: UseTimelineOptions): void {
  const rafIdRef = useRef<number>(0);
  const previousTimeRef = useRef<number | null>(null);
  const segmentElapsedRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

  const tick = useCallback(
    (timestamp: number) => {
      if (previousTimeRef.current === null) {
        // First frame after play start — compute zero delta
        previousTimeRef.current = timestamp;
      }

      const delta = timestamp - previousTimeRef.current;
      previousTimeRef.current = timestamp;

      // Cap delta time: if > 100ms, treat as 0 (handles tab switch drift)
      if (delta <= 100) {
        segmentElapsedRef.current += delta;
      }

      const currentDuration =
        segments[currentSegmentIndex]?.durationMs ?? 0;

      if (segmentElapsedRef.current >= currentDuration) {
        // Segment complete — advance or end
        const nextIndex = currentSegmentIndex + 1;
        if (nextIndex >= segments.length) {
          onEnd();
          return; // Stop the loop — self-terminating
        }
        segmentElapsedRef.current = 0;
        onSegmentAdvance(nextIndex, getActIndex(nextIndex));
      } else {
        // Throttle onTick dispatches: only call if >= 100ms since last tick
        if (
          segmentElapsedRef.current - lastTickRef.current >= 100 ||
          lastTickRef.current === 0
        ) {
          lastTickRef.current = segmentElapsedRef.current;
          onTick(segmentElapsedRef.current);
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    },
    [
      segments,
      currentSegmentIndex,
      onTick,
      onSegmentAdvance,
      onEnd,
      getActIndex,
    ],
  );

  // Start/stop the rAF loop based on isPlaying
  useEffect(() => {
    if (isPlaying) {
      previousTimeRef.current = null; // Reset delta tracking
      lastTickRef.current = 0; // Reset tick throttle
      rafIdRef.current = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [isPlaying, tick]);

  // Reset segment elapsed when segment changes externally (e.g., seek)
  useEffect(() => {
    segmentElapsedRef.current = 0;
    lastTickRef.current = 0;
  }, [currentSegmentIndex]);
}
