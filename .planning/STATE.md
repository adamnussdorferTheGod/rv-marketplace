# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-24)

**Core value:** Auto-generated narrated video tours from existing listing photos, transforming static galleries into guided cinematic experiences
**Current focus:** Phase 11 — Ken Burns Engine and Composition Canvas

## Current Position

Phase: 11 of 14 (Ken Burns Engine and Composition Canvas)
Plan: 1 of 2 in current phase
Status: Executing
Last activity: 2026-02-25 — Completed 11-01 (Ken Burns engine foundation)

Progress: [=========================>-----] 80% (v2.0: 4/15 plans complete)

## Performance Metrics

**Velocity (v1.0):**
- Total plans completed: 17
- Average duration: 4.4min
- Total execution time: 1.25 hours

**v2.0:**
- Total plans completed: 4
- Estimated plans: 15 (across 5 phases)

## Accumulated Context

### Decisions

- [v1.0]: 9 phases, 44 requirements, all complete
- [v1.0]: CSS Modules + design tokens pattern works well
- [v1.0]: Three-layer CSS cascade: tokens.css -> theme-rv.css -> global.css
- [v2.0]: Frontend-only video components (actual rendering is backend)
- [v2.0]: Simulated video content with sample MP4/poster/MP3
- [v2.0]: Single timeline source drives all visual state (no parallel timers)
- [v2.0]: Only current photo gets GPU promotion (will-change: transform)
- [v2.0]: VideoSource interface includes HLS stub for future compatibility
- [10-01]: TextOverlay uses 7-variant discriminated union on type field for extensibility
- [10-01]: AudioTimingSegment extracted as separate named interface for clarity and reuse
- [10-01]: Sample data (65s, 10 segments) imports sampleListing URLs directly to stay DRY
- [10-02]: useReducer over useState for predictable state machine transitions
- [10-02]: Guarded transitions return unchanged state for invalid actions (no-op safety)
- [10-02]: CLOSE_LIGHTBOX resets to initialState for clean re-open cycles
- [10-02]: isMuted defaults to true respecting browser autoplay policies
- [10-03]: VideoThumbnail replaces hero image entirely when video data exists (not overlay)
- [10-03]: Play icon uses CSS border-width triangle trick for zero-dependency rendering
- [10-03]: VideoPlayerShell is minimal placeholder shell, replaced by Ken Burns in Phase 11
- [10-03]: useVideoWalkthrough always called in PhotoGallery, provider wraps at VDP level
- [11-01]: Named callbacks (loaded, tick, advanceSegment, end) over raw dispatch — matches DealKit/Narration pattern
- [11-01]: Delta capping at 100ms prevents tab-switch drift in rAF timeline
- [11-01]: Tick throttling at 100ms intervals balances overlay timing vs re-render frequency
- [11-01]: will-change: transform via inline style only on active layer — prevents permanent GPU allocation
- [11-01]: Linear animation-timing for documentary feel; forwards fill-mode holds final frame
- [11-01]: Subtle scale values (1.0-1.15 zoom, 1.1 base + 3% translate for pan)

### Pending Todos

None yet.

### Blockers/Concerns

- Ken Burns GPU memory on mobile Safari needs validation during Phase 11
- Crossfade overlay fade-in approach needs Safari 17+ testing during Phase 11
- Audio cleanup pattern (pause + removeAttribute src + load) critical in Phase 12

## Session Continuity

Last session: 2026-02-25
Stopped at: Completed 11-01-PLAN.md
Resume file: None
