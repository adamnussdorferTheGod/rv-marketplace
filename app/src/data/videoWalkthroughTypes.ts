// Video Walkthrough type definitions
// Follows dealKitTypes.ts conventions: string literal unions, interface composition, no enums

// Motion presets for Ken Burns effect (Phase 11 consumes)
export type MotionPreset = 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right';

// 5-act narrative structure
export type ActType = 'hook' | 'exterior' | 'interior' | 'specs' | 'cta';

// Overlay positioning on the video canvas
export type OverlayPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

// Text overlay discriminated union on `type` field
export type TextOverlay =
  | { type: 'title'; text: string }
  | { type: 'price'; price: string; location: string }
  | { type: 'deal-score'; rating: string; color: string }
  | { type: 'section-label'; label: string }
  | { type: 'spec-callout'; label: string; value: string }
  | { type: 'feature-callout'; feature: string }
  | { type: 'cta'; heading: string; subtext: string };

// Timed overlay instance within a segment
export interface TimedOverlay {
  overlay: TextOverlay;
  position: OverlayPosition;
  startMs: number;
  durationMs: number;
}

// Video source with HLS stub (VID-05)
export interface VideoSource {
  mp4Url: string;
  hlsUrl?: string;
  posterUrl: string;
}

// Word-level timing for karaoke highlighting
export interface AudioWord {
  text: string;
  startMs: number;
  endMs: number;
}

// Audio timing per segment
export interface AudioTimingSegment {
  segmentId: string;
  startMs: number;
  endMs: number;
  transcript: string;
  words?: AudioWord[];
}

// Audio timing container
export interface AudioTiming {
  audioUrl?: string;
  segments: AudioTimingSegment[];
}

// Single photo segment within the video
export interface VideoSegment {
  id: string;
  photoUrl: string;
  photoAlt: string;
  durationMs: number;
  motionPreset: MotionPreset;
  overlays: TimedOverlay[];
}

// An act groups segments into narrative sections
export interface VideoAct {
  type: ActType;
  label: string;
  segments: VideoSegment[];
}

// Top-level walkthrough data
export interface VideoWalkthroughData {
  listingId: string;
  title: string;
  totalDurationMs: number;
  source: VideoSource;
  acts: VideoAct[];
  audio: AudioTiming;
}

// Duration formatting utility
export function formatDuration(totalMs: number): string {
  const totalSeconds = Math.floor(totalMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
