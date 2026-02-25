# Roadmap: RV Marketplace VDP

## Milestones

- [x] **v1.0 MVP** - Phases 1-9 (shipped 2026-02-22)
- [ ] **v2.0 AI Video Walkthrough** - Phases 10-14 (in progress)

## Phases

<details>
<summary>v1.0 MVP (Phases 1-9) - SHIPPED 2026-02-22</summary>

- [x] **Phase 1: Foundation** - Design tokens, TypeScript data contracts, sample data, and icon system
- [x] **Phase 2: Shared UI Primitives** - Reusable primitive components used across multiple VDP sections
- [x] **Phase 3: Page Layout** - Page chrome (header, footer, cross-promotions) and two-column layout skeleton
- [x] **Phase 4: Above-the-Fold Sections** - Navigation, title, photo gallery, and price display
- [x] **Phase 5: Left Column Upper Content** - AI summary through description (7 sections, highest engagement content)
- [x] **Phase 6: Left Column Lower Content** - Loan calculator through disclaimer (5 sections, supporting content)
- [x] **Phase 7: Sidebar** - Dealer contact card, popularity stats, and sidebar ad slots
- [x] **Phase 8: Full-Width Bottom Sections** - Similar listings, related categories, insurance/accessories, and ad slots
- [x] **Phase 9: Integration and Polish** - Token compliance audit, PriceDistributionChart integration, and full-page assembly verification

### Phase 1: Foundation
**Goal**: Every component can reference design tokens and typed data from day one
**Plans**: 2/2 complete

Plans:
- [x] 01-01: Design tokens CSS (TIDE 2.0 + RV Trader), Montserrat font loading, global resets
- [x] 01-02: TypeScript data interfaces, sample listing data, shared Icon component

### Phase 2: Shared UI Primitives
**Goal**: Reusable UI primitives available so section components never duplicate common patterns
**Plans**: 2/2 complete

Plans:
- [x] 02-01: Stateless primitives: Divider, AdSlot, and ActionChip components
- [x] 02-02: Interactive primitives: ExpandableText and SegmentedButtons components

### Phase 3: Page Layout
**Goal**: Complete page chrome and two-column layout skeleton
**Plans**: 2/2 complete

Plans:
- [x] 03-01: Icons, CrossPromotionsBar, Header, and TwoColumnLayout components
- [x] 03-02: Footer component, VehicleDetailPage orchestrator, and App.tsx wiring

### Phase 4: Above-the-Fold Sections
**Goal**: Navigation, title, and photo gallery render with full visual fidelity
**Plans**: 2/2 complete

Plans:
- [x] 04-01: NavigationBar and TitleSection components
- [x] 04-02: PhotoGallery component with hero image, thumbnail grid, and overlay elements

### Phase 5: Left Column Upper Content
**Goal**: Primary content sections from price through description
**Plans**: 2/2 complete

Plans:
- [x] 05-01: PricePayment, AISummary, VehicleHistoryReport, WillingToNegotiate sections
- [x] 05-02: FeaturesAndSpecs, PriceAnalysis, Description sections

### Phase 6: Left Column Lower Content
**Goal**: Remaining left column sections from loan calculator through disclaimer
**Plans**: 2/2 complete

Plans:
- [x] 06-01: LoanCalculator, Resources, ReportListing, Disclaimer sections
- [x] 06-02: AboutDealership section + VehicleDetailPage wiring

### Phase 7: Sidebar
**Goal**: Dealer contact card, popularity stats, and ad placements
**Plans**: 1/1 complete

Plans:
- [x] 07-01: DealerContactCard, PopularityStats components + sidebar wiring

### Phase 8: Full-Width Bottom Sections
**Goal**: Below-the-fold discovery, cross-sell, and ad content
**Plans**: 2/2 complete

Plans:
- [x] 08-01: SimilarListings carousel with ListingCard and RelatedCategories chip grid
- [x] 08-02: InsuranceAccessories, AdSenseSection, and VehicleDetailPage wiring

### Phase 9: Integration and Polish
**Goal**: Complete VDP at 1790px matching reference layout
**Plans**: 1/1 complete

Plans:
- [x] 09-01: CSS token compliance, PriceDistributionChart integration, and full-page verification

</details>

## v2.0 AI Video Walkthrough

**Milestone Goal:** Auto-generate narrated video tours from existing listing photos -- the video equivalent of Smart Photo Narration, delivering guided walkthrough experiences from static assets using CSS composition, Ken Burns motion, text overlays, and synchronized audio narration.

**Phase Numbering:**
- Integer phases (10, 11, 12, ...): Planned milestone work
- Decimal phases (10.1, 10.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 10: Foundation and Gallery Entry Point** - Data types, sample walkthrough data, video state machine, and gallery thumbnail integration
- [ ] **Phase 11: Ken Burns Engine and Composition Canvas** - Photo motion presets, crossfade transitions, 5-act narrative structure, player shell, and single-timeline architecture
- [ ] **Phase 12: Text Overlays and Audio Narration** - Timed visual overlays for listing info/specs/features/CTA, synchronized audio narration, and closed captions
- [ ] **Phase 13: Player Controls and Chapter Navigation** - Interactive playback controls, act progress indicator, chapter markers, listing context bar, and CTA buttons
- [ ] **Phase 14: Accessibility and Mobile Experience** - Keyboard shortcuts, ARIA dialog pattern, focus management, touch gestures, and responsive player sizing

## Phase Details

### Phase 10: Foundation and Gallery Entry Point
**Goal**: Users discover the AI Video Tour feature through the gallery and the entire video state machine is established for all downstream phases to consume
**Depends on**: Phase 9 (v1.0 gallery exists)
**Requirements**: VID-01, VID-02, VID-03, VID-04, VID-05, GAL-01, GAL-02, GAL-03, GAL-04, GAL-05, GAL-06, GAL-07
**Success Criteria** (what must be TRUE):
  1. A video thumbnail with play button, "AI Video Tour" label, and duration badge appears as the first item in the photo gallery carousel
  2. Hovering the video thumbnail scales the play button and brightens the image, and clicking it opens a lightbox overlay (even if the overlay is initially empty)
  3. A "Watch AI Video Tour" text link below the photo gallery provides a secondary way to open the video
  4. The VideoWalkthroughContext provider exposes video state (idle/loading/playing/paused/seeking/ended/error) and dispatch actions to any consuming component via useVideoWalkthrough hook
  5. TypeScript types fully define the video walkthrough data shape (segments, acts, motion presets, overlays, audio timing) and a populated sample data file drives the Airstream listing tour
**Plans**: 3 plans

Plans:
- [ ] 10-01-PLAN.md — TypeScript type definitions and sample 5-act walkthrough data
- [ ] 10-02-PLAN.md — VideoWalkthroughContext provider with useReducer state machine and hook
- [ ] 10-03-PLAN.md — VideoThumbnail component, PhotoGallery integration, and lightbox shell

### Phase 11: Ken Burns Engine and Composition Canvas
**Goal**: The video plays a cinematic photo tour with smooth motion and crossfade transitions inside a properly framed lightbox player
**Depends on**: Phase 10
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, PLAY-01, PLAY-02, PLAY-05, PLAY-06
**Success Criteria** (what must be TRUE):
  1. Photos animate with Ken Burns motion (zoom-in, zoom-out, or pan) that alternates direction between consecutive segments, with only the current photo GPU-promoted
  2. Crossfade transitions (500ms) between photo segments produce smooth visual flow with no hard cuts or dark flash artifacts
  3. The video follows a 5-act narrative structure (Hook / Exterior Tour / Interior Tour / Specs & Value / CTA) with logical photo sequencing from exterior to interior
  4. The player opens as a full-screen lightbox overlay (near-black backdrop, 900px max-width container) with close button, Escape to close, and a loading/poster state during buffering
  5. All visual state (current photo, animation, timing) derives from a single timeline source (currentSegmentIndex + elapsed time), not parallel independent timers
**Plans**: TBD

Plans:
- [ ] 11-01: KenBurnsLayer with CSS motion presets and GPU memory management
- [ ] 11-02: Crossfade transitions, 5-act segment sequencing, and single-timeline architecture
- [ ] 11-03: VideoPlayerOverlay shell (lightbox, container, loading state, close behavior)

### Phase 12: Text Overlays and Audio Narration
**Goal**: Users see contextual listing information overlaid on the video and hear synchronized narration that guides them through the tour
**Depends on**: Phase 11
**Requirements**: OVRL-01, OVRL-02, OVRL-03, OVRL-04, OVRL-05, OVRL-06, OVRL-07, OVRL-08, OVRL-09, OVRL-10, AUD-01, AUD-02, AUD-03, AUD-04, AUD-05, AUD-06
**Success Criteria** (what must be TRUE):
  1. Act 1 displays title, price/location, and Deal Score badge overlays; subsequent acts show section labels, spec callouts, notable feature callouts, and a branded CTA overlay in the final act
  2. All text overlays fade in smoothly, remain visible for at least 3 seconds, use text shadow or semi-transparent background bars for legibility, and never exceed 2 lines on screen simultaneously
  3. Audio narration plays synchronized to photo segments with natural pauses between narration segments, driven by the single timeline source
  4. A closed captions toggle in the player controls shows synchronized narration transcript text on screen
  5. Audio elements are properly cleaned up on unmount (pause + removeAttribute src + load) to prevent memory leaks
**Plans**: TBD

Plans:
- [ ] 12-01: TextOverlayLayer with timed overlays for all 5 acts (title, price, deal score, section labels, specs, features, CTA)
- [ ] 12-02: Overlay timing, fade animations, legibility treatment, and max-lines constraint
- [ ] 12-03: Audio synchronization, narration pauses, sample MP3, captions toggle, and audio cleanup

### Phase 13: Player Controls and Chapter Navigation
**Goal**: Users can interactively control playback and navigate directly to any act in the video tour
**Depends on**: Phase 12
**Requirements**: PLAY-03, PLAY-04, PLAY-07, PLAY-08, PLAY-09, CHAP-01, CHAP-02, CHAP-03, CHAP-04
**Success Criteria** (what must be TRUE):
  1. Standard video controls are present: play/pause button, seek/scrub bar, elapsed/total time display, volume slider, mute toggle, and fullscreen button
  2. The video starts muted on open with a visible "Tap to unmute" prompt, respecting browser autoplay policies
  3. An act progress indicator with 5 labeled segments shows the current act, and clicking any segment jumps playback to that act's start time
  4. Chapter markers appear as dots on the seek bar at each act boundary
  5. A listing context bar below the player shows the vehicle title, price, and location, with "Contact Seller" and "Get Deal Kit" CTA buttons
**Plans**: TBD

Plans:
- [ ] 13-01: VideoControls component (play/pause, seek bar, time display, volume, mute, fullscreen, auto-hide)
- [ ] 13-02: Chapter/act progress indicator, act labels, chapter markers on seek bar, and seek-to-act behavior
- [ ] 13-03: Muted autoplay with unmute prompt, listing context bar, and CTA buttons

### Phase 14: Accessibility and Mobile Experience
**Goal**: The video player is fully keyboard-navigable, screen-reader accessible, and optimized for touch interaction on mobile devices
**Depends on**: Phase 13
**Requirements**: A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, A11Y-06, A11Y-07, MOB-01, MOB-02, MOB-03, MOB-04, MOB-05
**Success Criteria** (what must be TRUE):
  1. Keyboard shortcuts work: Space toggles play/pause, Left/Right arrows seek 5 seconds, M toggles mute, F toggles fullscreen, Escape closes the lightbox
  2. The lightbox implements the ARIA dialog pattern with a focus trap (Tab cannot escape to elements behind the overlay) and focus restores to the video thumbnail when the lightbox closes
  3. On mobile, the video plays inline (no iOS fullscreen takeover), tapping the video area toggles play/pause, and swiping down dismisses the lightbox
  4. The player fills the viewport on mobile with responsive sizing and all control targets meet the 44px minimum tap area
**Plans**: TBD

Plans:
- [ ] 14-01: Keyboard shortcuts for playback control
- [ ] 14-02: ARIA dialog pattern, focus trap, and focus restoration
- [ ] 14-03: Mobile inline playback, touch gestures (tap play/pause, swipe dismiss), responsive sizing, and touch-friendly controls

## Progress

**Execution Order:**
Phases execute in numeric order: 10 -> 11 -> 12 -> 13 -> 14

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 2/2 | Complete | 2026-02-22 |
| 2. Shared UI Primitives | v1.0 | 2/2 | Complete | 2026-02-22 |
| 3. Page Layout | v1.0 | 2/2 | Complete | 2026-02-22 |
| 4. Above-the-Fold Sections | v1.0 | 2/2 | Complete | 2026-02-22 |
| 5. Left Column Upper Content | v1.0 | 2/2 | Complete | 2026-02-22 |
| 6. Left Column Lower Content | v1.0 | 2/2 | Complete | 2026-02-22 |
| 7. Sidebar | v1.0 | 1/1 | Complete | 2026-02-22 |
| 8. Full-Width Bottom Sections | v1.0 | 2/2 | Complete | 2026-02-22 |
| 9. Integration and Polish | v1.0 | 1/1 | Complete | 2026-02-22 |
| 10. Foundation and Gallery Entry Point | 1/3 | In Progress|  | - |
| 11. Ken Burns Engine and Composition Canvas | v2.0 | 0/3 | Not started | - |
| 12. Text Overlays and Audio Narration | v2.0 | 0/3 | Not started | - |
| 13. Player Controls and Chapter Navigation | v2.0 | 0/3 | Not started | - |
| 14. Accessibility and Mobile Experience | v2.0 | 0/3 | Not started | - |
