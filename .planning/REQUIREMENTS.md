# Requirements: RV Marketplace — v7.0 Co-Shopping & Shared Lists

**Defined:** 2026-02-27
**Core Value:** A pixel-accurate marketplace experience implementing Figma designs with TIDE 2.0 and dynamic client-side filtering

## v7.0 Requirements

Requirements for Co-Shopping & Shared Lists milestone. Each maps to roadmap phases.

### Data Layer

- [x] **CDAT-01**: TypeScript interfaces define SharedList, ListMember, SharedListing, Reaction, and Comment shapes matching the spec's state model
- [x] **CDAT-02**: CoShoppingContext provider manages shared list state (lists, active list, reactions, comments) with persistence across page navigations
- [x] **CDAT-03**: Sample shared list with pre-populated listings, reactions, and comments for the Airstream Flying Cloud and other sample listings
- [x] **CDAT-04**: Mock co-shopper user (e.g., "Sarah") with display name and avatar for demo purposes

### Shared Lists

- [ ] **LIST-01**: User can create a named shared list from a "My Lists" section
- [ ] **LIST-02**: Shared list header displays list name, member avatars, match count, and last updated timestamp
- [ ] **LIST-03**: List creator can rename the shared list
- [ ] **LIST-04**: List creator can remove members from the list
- [ ] **LIST-05**: Any member can leave a list (reactions and comments preserved, attributed to "[Name] (left)")
- [ ] **LIST-06**: List creator can delete the list with confirmation modal
- [ ] **LIST-07**: Maximum 4 co-shoppers per list enforced with error message
- [ ] **LIST-08**: Maximum 5 shared lists per account enforced with error message
- [ ] **LIST-09**: User can add listings to a shared list with duplicate prevention (pulse highlight on existing)
- [ ] **LIST-10**: User can remove listings from a shared list with confirmation showing who added it and their reaction

### Reactions

- [x] **RXTN-01**: Each co-shopper can react to each listing with Love, Maybe, or Pass via one tap on reaction icons
- [x] **RXTN-02**: Reactions are visible to all co-shoppers with name/avatar beside each reaction icon
- [x] **RXTN-03**: Reactions can be changed at any time by tapping a different icon
- [x] **RXTN-04**: Default state for unreviewed listings is "no reaction" (empty heart outline)
- [x] **RXTN-05**: Love renders as red filled heart, Maybe as amber outline, Pass as gray muted icon

### Match

- [ ] **MTCH-01**: "It's a Match!" indicator appears on listing card when all co-shoppers react Love
- [ ] **MTCH-02**: Match count is displayed in the shared list header
- [ ] **MTCH-03**: Matches tab in the list view filters to show only matched listings
- [ ] **MTCH-04**: If any co-shopper changes away from Love, match is removed with subtle fade animation
- [ ] **MTCH-05**: First match on a list triggers a confetti celebration animation (2s duration)

### Comments

- [x] **CMNT-01**: Each listing on a shared list has its own comment thread
- [x] **CMNT-02**: User can post text comments with author name and timestamp displayed
- [x] **CMNT-03**: Comment count appears on shared list listing cards
- [ ] **CMNT-04**: Comments persist even if the listing is removed from the list

### Shared List View

- [ ] **VIEW-01**: Filter tabs display All, Matches, My Picks, and Partner's Picks with item counts
- [x] **VIEW-02**: Shared list cards show photo, title, price, location, specs, reactions from all co-shoppers, match indicator, comment count, and "added by" attribution
- [ ] **VIEW-03**: Sort by Most Recent available as default
- [ ] **VIEW-04**: "Compare Matches" CTA appears when matches exist

### Compare View

- [x] **CMPV-01**: Side-by-side comparison table shows matched or top-reacted listings (up to 3)
- [x] **CMPV-02**: Comparison includes price, length, weight, sleeps, slides, fresh water capacity
- [ ] **CMPV-03**: Each co-shopper's reaction displayed as a comparison row
- [ ] **CMPV-04**: Match status (Yes/No) displayed as a row
- [ ] **CMPV-05**: Tow Match verdict and capacity percentage shown if user has a saved tow vehicle
- [ ] **CMPV-06**: Comment count and "View Listing" links per column

### VDP Integration

- [ ] **VDPI-01**: When active shared lists exist, VDP save button shows dropdown with "Save to [List Name]" options
- [ ] **VDPI-02**: Dropdown includes private "Save to My Favorites" option alongside shared list options
- [ ] **VDPI-03**: VDP shows co-shopper's reaction if they've already reacted to this listing on a shared list

### SRP Co-Shopping

- [x] **CSRP-01**: Listings already on a shared list show co-shopper reaction badges on SRP cards
- [ ] **CSRP-02**: Badge shows each co-shopper's reaction icon and match indicator
- [ ] **CSRP-03**: "On your list: [List Name]" text appears on recognized listings

### Mobile

- [ ] **MOBL-01**: Swipe reactions on mobile: right for Love, left for Pass, up for Maybe with tilt animation and colored overlay
- [ ] **MOBL-02**: Full-width card stack layout on mobile shared list view
- [ ] **MOBL-03**: Comment thread opens in bottom sheet on mobile with auto-focused input
- [ ] **MOBL-04**: Sticky header on scroll shows list name, member count, and match count

## Future Requirements

Deferred to future milestone. Tracked but not in current roadmap.

### Invite & Onboarding

- **INVT-01**: Invite co-shoppers via email with branded one-click join link
- **INVT-02**: Invite co-shoppers via SMS with join link
- **INVT-03**: Copy shareable invite link for any channel
- **INVT-04**: Include current saved listings when creating shared list
- **INVT-05**: Co-shopping onboarding tooltip sequence for first-time users

### Engagement

- **ENGM-01**: Nudge co-shopper button with 24hr rate limiting
- **ENGM-02**: "Sarah hasn't seen this yet" indicator on unreviewed listings
- **ENGM-03**: Weekly digest email summarizing list activity
- **ENGM-04**: Price change notifications on shared list items
- **ENGM-05**: Listing sold/removed notifications

### Advanced Features

- **ADVN-01**: Private notes per listing (visible only to author, dotted border, lock icon)
- **ADVN-02**: Photo tagging on listing photos (pin markers with annotation popover)
- **ADVN-03**: Photo comments (attach images to comments)
- **ADVN-04**: Blind vote mode (hide reactions until all members vote)
- **ADVN-05**: Ranking mode (drag-to-reorder listings)
- **ADVN-06**: AI-generated shared preference summary

### Real-Time & Notifications

- **RTNE-01**: WebSocket real-time sync for reactions, comments, and new listings
- **RTNE-02**: Push notifications for match created, comment posted, listing added
- **RTNE-03**: In-app notification center for co-shopping events

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real backend / API server | Frontend-only constraint — all state in React context |
| User authentication / login | UI-only demo — mock users, no real auth |
| Real WebSocket server | Mock real-time with state updates — no server |
| Real push notifications | In-app toasts only — no notification service |
| Email/SMS delivery | Invite flow deferred — mock co-shopper pre-populated |
| Agent/advisor list access | Privacy concerns, defer to future |
| List activity in search ranking | Feedback loop risk, defer to future |
| Real-time chat between co-shoppers | High complexity, not core to co-shopping value |
| Mobile-first responsive design | Desktop-first consistent with all milestones |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CDAT-01 | Phase 36 | Complete |
| CDAT-02 | Phase 36 | Complete |
| CDAT-03 | Phase 36 | Complete |
| CDAT-04 | Phase 36 | Complete |
| LIST-01 | Phase 37 | Pending |
| LIST-02 | Phase 37 | Pending |
| LIST-03 | Phase 37 | Pending |
| LIST-04 | Phase 37 | Pending |
| LIST-05 | Phase 37 | Pending |
| LIST-06 | Phase 37 | Pending |
| LIST-07 | Phase 37 | Pending |
| LIST-08 | Phase 37 | Pending |
| LIST-09 | Phase 37 | Pending |
| LIST-10 | Phase 37 | Pending |
| RXTN-01 | Phase 38 | Complete |
| RXTN-02 | Phase 38 | Complete |
| RXTN-03 | Phase 38 | Complete |
| RXTN-04 | Phase 38 | Complete |
| RXTN-05 | Phase 38 | Complete |
| MTCH-01 | Phase 39 | Pending |
| MTCH-02 | Phase 39 | Pending |
| MTCH-03 | Phase 39 | Pending |
| MTCH-04 | Phase 39 | Pending |
| MTCH-05 | Phase 39 | Pending |
| CMNT-01 | Phase 40 | Complete |
| CMNT-02 | Phase 40 | Complete |
| CMNT-03 | Phase 40 | Complete |
| CMNT-04 | Phase 40 | Pending |
| VIEW-01 | Phase 41 | Pending |
| VIEW-02 | Phase 41 | Complete |
| VIEW-03 | Phase 41 | Pending |
| VIEW-04 | Phase 41 | Pending |
| CMPV-01 | Phase 42 | Complete |
| CMPV-02 | Phase 42 | Complete |
| CMPV-03 | Phase 42 | Pending |
| CMPV-04 | Phase 42 | Pending |
| CMPV-05 | Phase 42 | Pending |
| CMPV-06 | Phase 42 | Pending |
| VDPI-01 | Phase 43 | Pending |
| VDPI-02 | Phase 43 | Pending |
| VDPI-03 | Phase 43 | Pending |
| CSRP-01 | Phase 43 | Complete |
| CSRP-02 | Phase 43 | Pending |
| CSRP-03 | Phase 43 | Pending |
| MOBL-01 | Phase 44 | Pending |
| MOBL-02 | Phase 44 | Pending |
| MOBL-03 | Phase 44 | Pending |
| MOBL-04 | Phase 44 | Pending |

**Coverage:**
- v7.0 requirements: 48 total
- Mapped to phases: 48
- Unmapped: 0

---
*Requirements defined: 2026-02-27*
*Last updated: 2026-02-27 after roadmap creation (traceability populated)*
