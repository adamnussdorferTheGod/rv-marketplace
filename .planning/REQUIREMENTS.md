# Requirements: RV Marketplace — v6.0 Tow Vehicle Match

**Defined:** 2026-02-27
**Core Value:** A pixel-accurate marketplace experience implementing Figma designs with TIDE 2.0 and dynamic client-side filtering

## v6.0 Requirements

Requirements for Tow Vehicle Match milestone. Each maps to roadmap phases.

### Vehicle Data & Algorithm

- [x] **VDAT-01**: TypeScript interfaces define tow vehicle shape (year, make, model, trim, engine, cab, bed, maxTow, maxTongue, payload, gcwr, curbWeight, wheelbase, hitchClass, hasTowPackage)
- [ ] **VDAT-02**: Static JSON vehicle database contains ~50 popular truck/SUV configurations with full tow specs (Ford F-150, Ram 1500, Chevy Silverado, Toyota Tundra, etc.)
- [ ] **VDAT-03**: YMMT cascading data supports year → make → model → trim → engine → cab → bed filtering
- [ ] **VDAT-04**: Mock VIN decoder maps sample VINs to vehicle configurations from the database
- [x] **VDAT-05**: RV listing data is augmented with GVWR, tongue weight, and hitch type fields (populated for sample listings)
- [ ] **VDAT-06**: Tow compatibility algorithm evaluates 6 checks (tow weight, tongue weight, payload, GCWR, hitch class, wheelbase ratio) and returns per-check status + overall verdict
- [ ] **VDAT-07**: Algorithm uses conservative defaults when RV specs are missing (tongue weight estimated at 10-15% of GVWR)
- [ ] **VDAT-08**: Overall verdict is "good" (all green), "marginal" (any yellow, none red), or "not_recommended" (any red)

### Vehicle Setup

- [ ] **VSTP-01**: User can select tow vehicle via cascading Year/Make/Model/Trim/Engine/Cab/Bed dropdowns where each selection filters the next
- [ ] **VSTP-02**: After selecting a full configuration, vehicle tow specs display below the form (max towing, payload, tongue weight, GCWR, hitch class, wheelbase)
- [ ] **VSTP-03**: User can enter a VIN and see decoded vehicle with auto-populated specs
- [ ] **VSTP-04**: User can save selected vehicle to profile (persists in app state across page navigations)
- [ ] **VSTP-05**: "My Tow Vehicle" setup is accessible from a VDP prompt, SRP filter prompt, and a dedicated profile entry point
- [ ] **VSTP-06**: Tow package and weight distribution hitch checkboxes appear on the setup form

### VDP Tow Match

- [ ] **VDPM-01**: When user has a saved vehicle and views a towable listing, a tow match badge appears near the price showing green/yellow/red verdict
- [ ] **VDPM-02**: Badge text reads "Good Match", "Marginal Match", or "Not Recommended" with "for your [Year Make Model]"
- [ ] **VDPM-03**: Clicking the badge expands a detailed breakdown panel showing all 6 compatibility checks with RV value, vehicle value, and status
- [ ] **VDPM-04**: A capacity bar shows percentage of tow capacity used, color-coded green (<75%), yellow (75-90%), red (>90%)
- [ ] **VDPM-05**: An itemized payload breakdown shows tongue weight, passengers, accessories, and remaining payload with the math visible
- [ ] **VDPM-06**: Contextual recommendations appear below the breakdown (WDH recommended, brake controller, tire pressure)
- [ ] **VDPM-07**: A disclaimer appears at the bottom of every tow match view noting manufacturer ratings and advising scale verification
- [ ] **VDPM-08**: When user has no saved vehicle, a prompt appears: "What's your tow vehicle? Add it to see if this RV is a match" with CTA to setup

### SRP Integration

- [ ] **SRPI-01**: "Fits My Vehicle" filter appears in the SRP filter sidebar when user has a saved vehicle
- [ ] **SRPI-02**: Filter shows active vehicle name, key specs, and "Change vehicle" link
- [ ] **SRPI-03**: Filter has match level options: "All matches" (good + marginal) and "Good matches only" (10% margin)
- [ ] **SRPI-04**: When filter is active, listings exceeding vehicle capacity are excluded from results
- [ ] **SRPI-05**: Each SRP listing card shows a mini tow badge with verdict and capacity percentage when the filter is active
- [ ] **SRPI-06**: When user has no vehicle and tries to enable the filter, a prompt appears to add their tow vehicle
- [ ] **SRPI-07**: Non-towable RV types (motorhomes) are unaffected by the tow filter

### Reverse Match

- [ ] **RVRM-01**: VDP shows a "What Can Tow This?" section listing minimum tow requirements for the current RV
- [ ] **RVRM-02**: The section displays minimum tow capacity, payload, and hitch class needed (with 10% safety margin)
- [ ] **RVRM-03**: A list of popular compatible vehicles shows verdict and capacity percentage for each

### Education & UX

- [ ] **EDUC-01**: Technical terms (GVWR, tongue weight, payload, GCWR, hitch class, wheelbase ratio, WDH) have hover/tap tooltip definitions in plain language
- [ ] **EDUC-02**: A "What this means" summary paragraph explains the overall verdict in conversational language specific to the user's vehicle and the RV

## Future Requirements

Deferred to future milestone. Tracked but not in current roadmap.

### Vehicle Setup Enhancements

- **VSTP-07**: Manual entry fallback for users who know ratings from door jamb sticker
- **VSTP-08**: Multiple saved vehicles (up to 3) with active vehicle switcher
- **VSTP-09**: VIN camera scanner on mobile for quick input

### VDP Enhancements

- **VDPM-09**: Adjustable passenger and cargo weights in payload breakdown
- **VDPM-10**: Weight distribution hitch toggle adjusts effective capacity calculations

### SRP Enhancements

- **SRPI-08**: "Best match for my vehicle" sort option (lowest capacity usage first)
- **SRPI-09**: Listings missing RV weight specs show "Specs incomplete — verify compatibility" badge

### Platform Features (P2)

- **PLAT-01**: Tow match email alerts for new compatible listings
- **PLAT-02**: Side-by-side tow comparison of two RVs against same vehicle
- **PLAT-03**: Tow vehicle recommendation engine
- **PLAT-04**: Dealer dashboard with tow match analytics
- **PLAT-05**: Truck camper payload-only variant

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real vehicle data API (DataOne, NHTSA) | Frontend-only constraint — mock data with static JSON |
| Real VIN decode service | Mock decoder with sample VINs mapping to database entries |
| User authentication / real persistence | UI-only state — no backend, no login |
| Tow match for AI Mode / FitCheck integration | Separate feature system, add later |
| Route/Lifestyle Context tow integration | Depends on v3.0 completion, add later |
| Mobile-first responsive design | Desktop-first consistent with all milestones |
| Real-time calculation updates | Static data, no server-side computation |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| VDAT-01 | Phase 30 | Complete |
| VDAT-02 | Phase 30 | Pending |
| VDAT-03 | Phase 30 | Pending |
| VDAT-04 | Phase 30 | Pending |
| VDAT-05 | Phase 30 | Complete |
| VDAT-06 | Phase 30 | Pending |
| VDAT-07 | Phase 30 | Pending |
| VDAT-08 | Phase 30 | Pending |
| VSTP-01 | Phase 31 | Pending |
| VSTP-02 | Phase 31 | Pending |
| VSTP-03 | Phase 31 | Pending |
| VSTP-04 | Phase 31 | Pending |
| VSTP-05 | Phase 31 | Pending |
| VSTP-06 | Phase 31 | Pending |
| VDPM-01 | Phase 32 | Pending |
| VDPM-02 | Phase 32 | Pending |
| VDPM-03 | Phase 32 | Pending |
| VDPM-04 | Phase 32 | Pending |
| VDPM-05 | Phase 32 | Pending |
| VDPM-06 | Phase 32 | Pending |
| VDPM-07 | Phase 32 | Pending |
| VDPM-08 | Phase 33 | Pending |
| SRPI-01 | Phase 34 | Pending |
| SRPI-02 | Phase 34 | Pending |
| SRPI-03 | Phase 34 | Pending |
| SRPI-04 | Phase 34 | Pending |
| SRPI-05 | Phase 34 | Pending |
| SRPI-06 | Phase 34 | Pending |
| SRPI-07 | Phase 34 | Pending |
| RVRM-01 | Phase 35 | Pending |
| RVRM-02 | Phase 35 | Pending |
| RVRM-03 | Phase 35 | Pending |
| EDUC-01 | Phase 33 | Pending |
| EDUC-02 | Phase 33 | Pending |

**Coverage:**
- v6.0 requirements: 34 total
- Mapped to phases: 34
- Unmapped: 0

---
*Requirements defined: 2026-02-27*
*Last updated: 2026-02-27 after roadmap creation*
