# SRP — Desktop 3

> Source: [Marketplace UI Refresh — SRP](https://www.figma.com/design/PjidGuCWzCcgsrHJvxLLFW/Marketplace-UI-Refresh?node-id=1-3997)
> Frame: `1:3997` · 1762 × 9280px

---

## Page Structure (top to bottom)

### 1. Cross-promotions Bar — `1:3998`
- Instance of **Cross-promotions** component
- 1762 × 40px, y=0
- Realm tabs: RVs · Motorcycles · ATVs · Trucks · Boats · Planes · Snowmobiles · Jet Skis

### 2. Header — `15:4789`
- 1762 × 72px, y=40
- Logo (158×40) + nav links (Shop · Sell · RV values · Cash offers · Research) + Account button

### 3. Ad — Full-width Leaderboard — `1:4000`
- Instance of **General** (ad component)
- 1762 × 150px, y=112

### 4. Main Content Area — `1:4001`
- 1762 × 7816px, y=262
- Contains all page sections with 64px left/right margins (content width: 1634px)

#### 4a. Two-Column Layout — `1:4004`
- 1634 × 7246px (inside 64px margin wrapper `1:4002`)
- **Left column**: Filter Sidebar (`1:4005`, 330px wide)
- **Right column**: Listings Area (`1:4029`, 1272px wide, 362px from left)
- Gap between columns: 32px

---

### Left Column — Filter Sidebar (`1:4005`)
330 × 7246px

#### Filter Card — `1:4006`
- 331 × 2588px, y=0
- Padded container with all filter controls

**Results Header** — `1:4007` (299×26, y=16)
- "24,500 results" text + "Clear all" link

**Active Filter Chips** — `1:4010` (299×36, y=58)
- Row of chip inputs (e.g. "Class B", "< 150 miles")

**Divider** — `1:4016`

**AI Search / ZIP** — `45:7184` (299×127, y=142)
- AI search input with sparkle icon ("Try: Family-friendly RVs for 4")
- Location text button below

**Divider** — `64:9168`

**RV Filter** — `15:5473` (299×2255, y=317)

| Filter | Node ID | Type | Height | State |
|--------|---------|------|--------|-------|
| Location | `15:5474` | Input+Dropdown | 138px | Expanded |
| New or Used | `15:5476` | Radio / Segmented Buttons | 124px | Expanded |
| RV Type | `15:5486` | Checkboxes + 3D type icons | 400px | Expanded (6 items with scrollbar) |
| Make & Model | `15:5538` | Checkboxes + search input | 577px | Expanded (10 items + "See all options") |
| Price | `15:5562` | Input (Segmented + dropdowns + Estimated Buying Power card) | 600px | Expanded |
| Filter 6 | `15:5585` | Dropdown | 48px | Collapsed |
| Filter 7 | `15:5586` | Dropdown | 48px | Collapsed |
| Filter 8 | `15:5587` | Radio | 48px | Collapsed |
| Filter 9 | `15:5588` | Checkboxes | 48px | Collapsed |
| Filter 10 | `15:5589` | Dropdown | 48px | Collapsed |
| Filter 11 | `15:5590` | Radio | 48px | Collapsed |
| Filter 12 | `15:5603` | Dropdown | 24px | Collapsed |

#### Sell on RV Trader Promo — `1:4018`
- 330 × 315px, y=2620
- Background image (298×138) of businessman on phone
- "Sell on RV Trader" heading + promo copy
- CTA text button (298×36)

#### Ad Placements — `1:4026`
- 330 × 882px, y=2967
- **300×250** ad slot (`1:4027`)
- **300×600** ad slot (`1:4028`)

---

### Right Column — Listings Area (`1:4029`)
1272 × 7246px

#### Results Header — `1:4030`
- 1272 × 90px, y=0
- **Left side** (`1:4031`, 913×90):
  - Breadcrumb (`1:4033`, 235×20)
  - Page title: "New and used Class B RVs for sale" (913×34)
  - Subtitle with "Show more" expand link (546×20)
- **Right side** (`1:4040`, 327×36):
  - Two action text buttons (173×36 + 146×36) — likely "Save search" + "Email alerts"

#### Featured Listing Carousel — `1:4045`
- 1272 × 321px, y=122
- **Carousel indicators** (`1:4046`) — On page carousel indicators instance (1272×40)
- **Carousel row** (`1:4047`, 1272×265) — 5 featured listing cards (241.6px each)
  - Each card: Photo (241.6×160) + title (2 lines) + location + price
  - Sample: "Used 2020 Airstream Flying Cloud 25RB" / "Chicago, IL · 2 miles away" / "$97,000"

#### Divider — `1:4115`
- 1272 × 16px, y=475

#### Listing Card Rows (×9)
Each row is 1272 × 600px, containing 3 listing cards (402.67px each)

| Row | Node ID | Y position |
|-----|---------|-----------|
| Row 1 | `1:4116` | 523 |
| Row 2 | `1:4308` | 1615 |
| Row 3 | `1:4421` | 2247 |
| Row 4 | `1:4494` | 2879 |
| Row 5 | `1:4576` | 3511 |
| Row 6 | `1:4681` | 4425 |
| Row 7 | `1:4975` | 5057 |
| Row 8 | `1:5048` | 5689 |
| Row 9 | `1:5137` | 6321 |

**Each listing card** (402.67 × 600):
- Photo section (402.67×295) — 4:3ish ratio, tags, favorite icon, carousel dots
- Content section (402.67×305):
  - Condition line: "Used · Premium Select" or "New · Premium" etc.
  - Title: "2019 Forest River Cedar Creek Silverback" (2-line max)
  - Price: "$97,000" (with optional strikethrough original price)
  - "More info" CTA button
  - Divider
  - Dealer info: "Roy Robinson RV Center" + "Seattle, WA · 0.9 miles away"
  - Trust badge: "Trusted partner for over 5 years" (with award_star icon)

#### Native Summit Showcase — `1:4226`
- 1272 × 428px, y=1155 (between Row 1 and Row 2)
- Dealer logo (106×74) + dealer name + tagline + "View inventory" / "Call" links
- Carousel indicators + 5 featured listing cards (same format as above)
- Sponsored label: "Sponsored · Atlanta, GA"

#### In-feed Ad — `1:4679`
- 1300 × 250px, y=4143 (between Row 5 and Row 6)
- Contains 728×90 General ad instance

#### Pagination — `1:5209`
- Instance of **Pagination** component
- 1272 × 78px, y=6953

#### Result Count Actions — `1:5210`
- 1272 × 36px, y=7063
- Two **Action** instances (188×36 + 192×36) — likely page count / results per page

#### Disclaimer — `1:5213`
- 794 × 115px, y=7131
- RV Trader disclaimer text
- AI-enhanced photos disclaimer text

---

### 5. SEO Section — `1:12003`
- 1634 × 410px, y=7342 (within main content wrapper)

**"Popular searches"** heading (1634×45)

**Tabbed content** — `1:12006` (1634×296):
- **Tabs** instance (`1:12007`, 1634×65) — category tabs
- 3 rows of link content (`1:12008`, `1:12015`, `1:12022`, each 1634×45)

### 6. Pre-footer Section — `1:10217`
- 1791 × 523px, y=8078

### 7. Footer — `1:10233`
- 1762 × 679px, y=8601

**Navigation** — `1:10234` (1634×382, y=32)
- 4 navigation columns (`1:10248`, 1634×334): Browse by type, resources, dealer/seller, company info

**Divider** — `1:10305`

**Affiliates** — `1:10306` (1104×45, y=424) [HIDDEN]
- 4 affiliate logo instances

**SEO Footer Copy** — `1:10311` (1634×121, y=446)
- Heading: "Find RVs for sale on RV Trader"
- Long-form SEO paragraph

**Copyright / Legal** — `1:10314` (1634×48, y=599)
- Copyright links row + scroll-to-top icon button

---

## Section Y-positions (quick reference)

| Section | Y position | Height |
|---------|-----------|--------|
| Cross-promotions | 0 | 40 |
| Header | 40 | 72 |
| Ad (full-width) | 112 | 150 |
| Main content | 262 | 7816 |
| ↳ Filter Sidebar (left) | +0 | 7246 |
| ↳ Results Header (right) | +0 | 90 |
| ↳ Featured Carousel | +122 | 321 |
| ↳ Listing Row 1 | +523 | 600 |
| ↳ Native Summit Showcase | +1155 | 428 |
| ↳ Listing Row 2 | +1615 | 600 |
| ↳ Listing Row 3 | +2247 | 600 |
| ↳ Listing Row 4 | +2879 | 600 |
| ↳ Listing Row 5 | +3511 | 600 |
| ↳ In-feed Ad (728×90) | +4143 | 250 |
| ↳ Listing Row 6 | +4425 | 600 |
| ↳ Listing Row 7 | +5057 | 600 |
| ↳ Listing Row 8 | +5689 | 600 |
| ↳ Listing Row 9 | +6321 | 600 |
| ↳ Pagination | +6953 | 78 |
| ↳ Result count | +7063 | 36 |
| ↳ Disclaimer | +7131 | 115 |
| SEO (Popular searches) | 7604 | 410 |
| Pre-footer | 8078 | 523 |
| Footer | 8601 | 679 |

---

## Components Used

| Component | Node ID | Location |
|-----------|---------|----------|
| Cross-promotions | `1:3998` | Top bar |
| Header | `15:4789` | Below cross-promotions |
| General (Ad) | `1:4000` | Full-width ad below header |
| SRP search bar | `1:4003` | Hidden — above filter sidebar |
| Filter Sidebar | `1:4005` | Left column |
| AI Search | `45:7184` | Inside filter card |
| Input+Dropdown (Location) | `15:5474` | Filter — Location |
| Segmented Buttons (New/Used) | `15:5484` | Filter — New or Used |
| Checkboxes + 3D types | `15:5486` | Filter — RV Type |
| Checkboxes + Search | `15:5538` | Filter — Make & Model |
| Estimated Buying Power | `15:5575` | Filter — Price section |
| Collapsed filters (×7) | `15:5585`–`15:5603` | Filter — additional filters |
| Breadcrumb | `1:4033` | Results header |
| On page carousel indicators | `1:4046` | Featured carousel |
| Listing Cards | multiple | All listing rows (3 per row) |
| Featured Cards | `1:4047` children | Featured carousel (5 cards) |
| Text Buttons (CTAs) | `1:4041`, `1:4043` | Results header actions |
| Native Summit Showcase | `1:4226` | Between listing rows |
| General (Ad) | `1:4680` | In-feed ad slot |
| General (Ad) | `1:4027`, `1:4028` | Sidebar ads (300×250 + 300×600) |
| Pagination | `1:5209` | Below last listing row |
| Tabs | `1:12007` | SEO popular searches |
| Footer | `1:10233` | Page bottom |

---

## Layout Summary

```
┌──────────────────────────────────────────────────┐
│ Cross-promotions (1762 × 40)                     │
├──────────────────────────────────────────────────┤
│ Header (1762 × 72)                               │
├──────────────────────────────────────────────────┤
│ Ad — Full Width (1762 × 150)                     │
├──────────────────────────────────────────────────┤
│ ┌──────────┬─────────────────────────────────┐   │
│ │ Filters  │ Results Header + Actions        │   │
│ │ (330px)  │ Featured Carousel               │   │
│ │          ├─────────────────────────────────┤   │
│ │ Results  │ Listing Card  │ Card  │ Card    │   │
│ │ Chips    │ (402.67px)    │       │         │   │
│ │ AI Search├───────────────┴───────┴─────────┤   │
│ │ Location │ Native Summit Showcase           │   │
│ │ New/Used ├─────────────────────────────────┤   │
│ │ RV Type  │ Listing rows × 8 more           │   │
│ │ Make     │ (with in-feed ad after row 5)    │   │
│ │ Price    ├─────────────────────────────────┤   │
│ │ +7 more  │ Pagination                      │   │
│ │          │ Result count + Disclaimer        │   │
│ ├──────────┴─────────────────────────────────┤   │
│ │ Sell CTA │                                     │
│ │ Ads      │                                     │
│ └──────────┘                                     │
├──────────────────────────────────────────────────┤
│ SEO — Popular Searches (tabbed)                  │
├──────────────────────────────────────────────────┤
│ Pre-footer (1791 × 523)                          │
├──────────────────────────────────────────────────┤
│ Footer (1762 × 679)                              │
└──────────────────────────────────────────────────┘
```
