import { useRef, useEffect } from 'react';
import { useVideoWalkthrough } from '../VideoWalkthroughContext';

/**
 * Syncs a hidden Audio element to the video walkthrough timeline.
 * Safe no-op when audioUrl is undefined — no Audio element created.
 */
export function useAudioSync(): void {
  const { state, data } = useVideoWalkthrough();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = data?.audio.audioUrl;

  // Create / destroy Audio element when audioUrl changes
  useEffect(() => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
    };
  }, [audioUrl]);

  // Play / pause sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.status === 'playing') {
      audio.play().catch(() => {/* autoplay blocked — ignore */});
    } else {
      audio.pause();
    }
  }, [state.status]);

  // Volume + mute sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = state.volume;
    audio.muted = state.isMuted;
  }, [state.volume, state.isMuted]);

  // Seek sync — compute global time and set currentTime
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !data || state.status !== 'seeking') return;

    let globalMs = 0;
    for (let i = 0; i < state.currentSegmentIndex; i++) {
      const seg = data.acts.flatMap((a) => a.segments)[i];
      if (seg) globalMs += seg.durationMs;
    }
    globalMs += state.elapsedMs;
    audio.currentTime = globalMs / 1000;
  }, [state.status, state.currentSegmentIndex, state.elapsedMs, data]);
}
