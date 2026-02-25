# Requirements: AI Video Walkthrough (v2.0)

**Defined:** 2026-02-24
**Core Value:** Auto-generated narrated video tours from existing listing photos, transforming static galleries into guided cinematic experiences that help buyers research RVs in the format they prefer

## v2.0 Requirements

Requirements for the AI Video Walkthrough milestone. Each maps to roadmap phases.

### Foundation

- [x] **VID-01**: TypeScript interfaces define the complete video walkthrough data shape (segments, acts, motion presets, text overlays, audio timing)
- [x] **VID-02**: Sample video walkthrough data file provides a fully populated 5-act tour for the Airstream Flying Cloud 25RB listing with 8-12 photo segments
- [x] **VID-03**: VideoWalkthroughContext provider manages all video playback state via useReducer state machine (idle/loading/playing/paused/seeking/ended/error)
- [x] **VID-04**: useVideoWalkthrough hook exposes video state and dispatch actions to any consuming component
- [x] **VID-05**: Video source interface supports both MP4 and HLS fields from day one, even though only MP4 is used in v2.0

### Gallery Integration

- [x] **GAL-01**: Video thumbnail appears as the first item in the photo gallery carousel with a play button overlay (64px white circle, centered)
- [x] **GAL-02**: Video thumbnail displays duration badge (bottom-right corner, "1:12" format) showing total video length
- [x] **GAL-03**: Video thumbnail displays "AI Video Tour" label (top-left corner) with sparkle icon prefix
- [x] **GAL-04**: Video thumbnail uses the best exterior photo as the poster/background image
- [x] **GAL-05**: Clicking the video thumbnail opens the video in a lightbox player overlay
- [x] **GAL-06**: "Watch AI Video Tour" text link appears below the photo gallery as a secondary entry point
- [x] **GAL-07**: Video thumbnail hover state scales play button (1.0→1.1) with slight brightness increase

### Video Composition Engine

- [x] **COMP-01**: Ken Burns motion applies to each photo segment with slow zoom-in, zoom-out, or horizontal pan (alternating directions between consecutive photos)
- [ ] **COMP-02**: Crossfade transitions (500ms) between photo segments with no hard cuts
- [x] **COMP-03**: Only the currently-visible photo has GPU-promoted CSS transform animation; all other photos have no will-change or running animation
- [ ] **COMP-04**: Video follows 5-act narrative structure: Hook (0-8s) → Exterior Tour (8-25s) → Interior Tour (25-55s) → Specs & Value (55-65s) → CTA (65-75s)
- [x] **COMP-05**: Exterior wide shots use zoom-out motion; interior detail shots use zoom-in motion
- [ ] **COMP-06**: Photo sequencing follows logical tour order: exterior front/side → kitchen → living → bedroom → bathroom → utility
- [x] **COMP-07**: All visual state (current photo, animation, overlays) derives from a single timeline source (currentSegmentIndex + elapsed time), not parallel timers

### Text Overlays

- [ ] **OVRL-01**: Listing title text overlay appears in Act 1 (top-left, large white text with drop shadow)
- [ ] **OVRL-02**: Price and location text overlay appears in Act 1 below the title
- [ ] **OVRL-03**: Deal Score badge overlay appears in Act 1 (top-right, colored pill per deal score)
- [ ] **OVRL-04**: Section labels appear at each act transition (fade-in/fade-out, uppercase)
- [ ] **OVRL-05**: Spec callouts appear during relevant segments (bottom-left, semi-transparent background bar)
- [ ] **OVRL-06**: Notable feature callouts appear during interior sections (green checkmark + white text on dark bar)
- [ ] **OVRL-07**: CTA overlay with RV Trader branding appears in final act
- [ ] **OVRL-08**: Text overlays fade in (200ms) and remain visible for at least 3 seconds
- [ ] **OVRL-09**: Maximum 2 lines of text overlay on screen at any time
- [ ] **OVRL-10**: All text overlays use text shadow or semi-transparent background bar for legibility over photos

### Video Player

- [ ] **PLAY-01**: Lightbox opens as full-screen fixed overlay with near-black backdrop (rgba(0,0,0,0.92))
- [ ] **PLAY-02**: Player container has max-width 900px, centered, with border-radius 8px overflow hidden
- [ ] **PLAY-03**: Standard video controls: play/pause button, seek/scrub bar, elapsed/total time display, volume slider, mute toggle, fullscreen button
- [ ] **PLAY-04**: Video starts muted on open with a visible "Tap to unmute" prompt (respects browser autoplay policies)
- [ ] **PLAY-05**: Loading state shows poster image as placeholder with spinner overlay during buffering
- [ ] **PLAY-06**: Close button (X, top-right) returns to VDP; Escape key also closes
- [ ] **PLAY-07**: Listing context bar below the player shows: vehicle title, price, location
- [ ] **PLAY-08**: CTA buttons below the player: "Contact Seller" and "Get Deal Kit"
- [ ] **PLAY-09**: Controls auto-hide after 3 seconds of inactivity; reappear on mouse move or touch

### Chapter Navigation

- [ ] **CHAP-01**: Act progress indicator displays as a segmented bar (5 segments) above or below the video, with the active segment highlighted
- [ ] **CHAP-02**: Clicking an act segment jumps playback to that act's start time
- [ ] **CHAP-03**: Act labels are visible on the progress indicator (Hook, Exterior, Interior, Specs, CTA or similar)
- [ ] **CHAP-04**: Chapter markers appear as dots/ticks on the seek bar at each act boundary

### Keyboard & Accessibility

- [ ] **A11Y-01**: Space bar toggles play/pause
- [ ] **A11Y-02**: Left/right arrow keys seek backward/forward 5 seconds
- [ ] **A11Y-03**: M key toggles mute
- [ ] **A11Y-04**: F key toggles fullscreen
- [ ] **A11Y-05**: Escape key closes the lightbox player
- [ ] **A11Y-06**: Lightbox implements ARIA dialog pattern with focus trap (Tab key cannot escape to elements behind overlay)
- [ ] **A11Y-07**: Focus restores to the video thumbnail when lightbox closes

### Audio & Narration

- [ ] **AUD-01**: Audio track plays synchronized to photo segments via the single timeline source
- [ ] **AUD-02**: Natural pauses (300-500ms) between narration segments
- [ ] **AUD-03**: Sample pre-recorded narration audio file (MP3) included for the Airstream listing
- [ ] **AUD-04**: Closed captions/subtitles toggle available in the player controls
- [ ] **AUD-05**: Caption text displays the narration transcript synchronized to audio timing
- [ ] **AUD-06**: Audio element cleanup on unmount (pause + removeAttribute src + load) prevents memory leaks

### Mobile Experience

- [ ] **MOB-01**: Video element uses playsInline attribute for iOS inline playback (no fullscreen takeover)
- [ ] **MOB-02**: Tap on video area toggles play/pause
- [ ] **MOB-03**: Swipe down gesture dismisses the lightbox player
- [ ] **MOB-04**: Player fills viewport on mobile with responsive sizing
- [ ] **MOB-05**: Touch-friendly control targets (minimum 44px tap areas)

## Future Requirements

Deferred to future milestones. Tracked but not in current roadmap.

### Sharing & Social (v2.1)

- **SHARE-01**: Share overlay with platform buttons (copy link, Facebook, Instagram, TikTok, email)
- **SHARE-02**: Web Share API integration on mobile (native share sheet)
- **SHARE-03**: Post-play share overlay appears after video completes
- **SHARE-04**: Open Graph video tags for rich social previews (requires SSR/edge function)

### Analytics (v2.1)

- **ANLYT-01**: video_tour.play_started event fires on play with listing_id and source
- **ANLYT-02**: video_tour.play_progress events fire at 25%, 50%, 75%, 100% marks
- **ANLYT-03**: video_tour.shared event fires with platform identifier
- **ANLYT-04**: video_tour.cta_clicked event fires with CTA type

### Social Format Variants (v3+)

- **FMT-01**: 9:16 portrait format variant for Instagram Reels / TikTok / YouTube Shorts
- **FMT-02**: 1:1 square format variant for Facebook / Instagram feed
- **FMT-03**: 15-second story format variant

### SEO (v3+)

- **SEO-01**: VideoObject JSON-LD structured data on VDP pages with video
- **SEO-02**: Video sitemap for Google Search Console submission

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real video rendering pipeline (FFmpeg/Shotstack) | Backend infrastructure concern, not frontend milestone |
| TTS service integration (ElevenLabs/Polly) | Backend service, mocked with sample audio in v2.0 |
| CDN storage & delivery infrastructure | Backend/DevOps concern |
| Background music / licensed audio | Licensing complexity, questionable value over narration alone |
| Dealer customization dashboard | Separate user surface, separate milestone |
| Multilingual narration | Requires full TTS pipeline + translation |
| Interactive 3D/360 tours (Matterport-style) | Requires specialized 3D capture hardware, 10-100x complexity |
| Real-time browser video generation (Canvas/WebGL) | CPU-intensive, unreliable across devices, no competitor does this |
| Picture-in-picture while scrolling VDP | Overengineered for 60-90 second tours |
| Video comments / reactions | Social platform feature, not marketplace listing feature |
| Inline autoplay in search results feed | Bandwidth-heavy, battery-draining, VDP-only experience |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| VID-01 | Phase 10 | Complete |
| VID-02 | Phase 10 | Complete |
| VID-03 | Phase 10 | Complete |
| VID-04 | Phase 10 | Complete |
| VID-05 | Phase 10 | Complete |
| GAL-01 | Phase 10 | Complete |
| GAL-02 | Phase 10 | Complete |
| GAL-03 | Phase 10 | Complete |
| GAL-04 | Phase 10 | Complete |
| GAL-05 | Phase 10 | Complete |
| GAL-06 | Phase 10 | Complete |
| GAL-07 | Phase 10 | Complete |
| COMP-01 | Phase 11 | Complete |
| COMP-02 | Phase 11 | Pending |
| COMP-03 | Phase 11 | Complete |
| COMP-04 | Phase 11 | Pending |
| COMP-05 | Phase 11 | Complete |
| COMP-06 | Phase 11 | Pending |
| COMP-07 | Phase 11 | Complete |
| PLAY-01 | Phase 11 | Pending |
| PLAY-02 | Phase 11 | Pending |
| PLAY-05 | Phase 11 | Pending |
| PLAY-06 | Phase 11 | Pending |
| OVRL-01 | Phase 12 | Pending |
| OVRL-02 | Phase 12 | Pending |
| OVRL-03 | Phase 12 | Pending |
| OVRL-04 | Phase 12 | Pending |
| OVRL-05 | Phase 12 | Pending |
| OVRL-06 | Phase 12 | Pending |
| OVRL-07 | Phase 12 | Pending |
| OVRL-08 | Phase 12 | Pending |
| OVRL-09 | Phase 12 | Pending |
| OVRL-10 | Phase 12 | Pending |
| AUD-01 | Phase 12 | Pending |
| AUD-02 | Phase 12 | Pending |
| AUD-03 | Phase 12 | Pending |
| AUD-04 | Phase 12 | Pending |
| AUD-05 | Phase 12 | Pending |
| AUD-06 | Phase 12 | Pending |
| PLAY-03 | Phase 13 | Pending |
| PLAY-04 | Phase 13 | Pending |
| PLAY-07 | Phase 13 | Pending |
| PLAY-08 | Phase 13 | Pending |
| PLAY-09 | Phase 13 | Pending |
| CHAP-01 | Phase 13 | Pending |
| CHAP-02 | Phase 13 | Pending |
| CHAP-03 | Phase 13 | Pending |
| CHAP-04 | Phase 13 | Pending |
| A11Y-01 | Phase 14 | Pending |
| A11Y-02 | Phase 14 | Pending |
| A11Y-03 | Phase 14 | Pending |
| A11Y-04 | Phase 14 | Pending |
| A11Y-05 | Phase 14 | Pending |
| A11Y-06 | Phase 14 | Pending |
| A11Y-07 | Phase 14 | Pending |
| MOB-01 | Phase 14 | Pending |
| MOB-02 | Phase 14 | Pending |
| MOB-03 | Phase 14 | Pending |
| MOB-04 | Phase 14 | Pending |
| MOB-05 | Phase 14 | Pending |

**Coverage:**
- v2.0 requirements: 60 total
- Mapped to phases: 60
- Unmapped: 0

---
*Requirements defined: 2026-02-24*
*Last updated: 2026-02-24 after roadmap creation for v2.0*
