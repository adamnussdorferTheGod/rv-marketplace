# VDP — VDP 4

> Source: [Marketplace UI Refresh — VDP](https://www.figma.com/design/PjidGuCWzCcgsrHJvxLLFW/Marketplace-UI-Refresh?node-id=32-6780)
> Frame: `32:6780` · 1790 × 7699px

---

## Page Structure (top to bottom)

### 1. Cross-promotions Bar — `32:6781`
- Instance of **Cross-promotions** component
- 1790 × 40px, y=0
- Realm tabs: RVs · Motorcycles · ATVs · Trucks · Boats · Planes · Snowmobiles · Jet Skis

### 2. Header — `32:6782`
- 1789 × 72px, y=40
- Logo (158×40) + nav links (Shop · Sell · RV values · Cash offers · Research) + Account button

### 3. Ad — Leaderboard — `32:6793`
- 1790 × 122px, y=112
- Centered 728×90 **General** ad instance (`32:6794`)

### 4. Main Content Area — `32:6795`
- 1120 × 6786px, y=234
- Centered on page (x=335), narrower than full width
- Contains all VDP content sections

---

## Main Content Detail

### 4a. Navigation Bar — `32:6796`
- 1120 × 20px, y=32 (within content area)
- **Left**: "< Search results" back link (`58:7183`, 120×20)
- **Right**: "Result 8 of 8,223" + Previous / Next navigation (`32:6799`, 281×20)
- Breadcrumb instance hidden (`32:6797`)

### 4b. Title Section — `32:6807`
- 1120 × 74px, y=84

**Title row** — `32:6808` (1120×46)
- Vehicle title: "2024 Airstream Flying Cloud 25RB" (1028×46)
- Action icons (`32:6810`, 88×40): Share + Favorite (two **Icon only** instances)

**Subtitle row** — `32:6813` (455×20)
- Stock/location text (185×20)
- Divider
- "Dealer's website" link with open_in_new icon (141×20)

### 4c. Photo Gallery — `32:6822`
- 1120 × 456px, y=190

**Main image** — `32:6823` (557×456, left)

**Thumbnail grid** — `32:6824` (555×456, right)
- 2×2 grid of thumbnails:
  - Top row: 2 images (273.5×224 each, 8px gap)
  - Bottom row: 2 images (273.5×224 each, 8px gap)

**"See all 28 photos"** button — `32:6831` (182×36, overlaid bottom-right at y=404)
- Open-in-full icon + text

**Tags badge** — `32:6841` (139×28, overlaid top-left at y=16)

### 4d. Two-Column Layout — `32:6842`
- 1120 × 3722px, y=678
- **Left column**: Main content (`32:6843`, 633px wide)
- **Right column**: Sidebar (`32:6962`, 455px wide)
- Gap: 32px

---

### Left Column (`32:6843`) — 633px wide

#### Price + Payment — `59:7275`
- 633 × 66px, y=0
- Price: "$96,000" with strikethrough "$98,000" (`32:6845`)
- Divider + "Est. monthly payment" text
- **Price guidance** badge instance (`59:7324`, 107×28)

#### AI Summary — `53:7159`
- 633 × 215px, y=0 (within `32:6865`)
- Header: "AI summary" + "NEW" badge (`53:7166`, 56×22)
- Long-form AI-generated description text (585×177)
- Text button for AI search prompt

#### Vehicle History + Negotiation — `32:6866`
- 633 × 359px, y=247
- **VHR** instance (`32:6867`, 633×224) — Vehicle History Report card
- **Willing to negotiate** instance (`32:6868`, 633×119)

#### Features and Specs — `32:6869`
- Instance of **Features and specs/Section** component
- 633 × 341px, y=638

#### Price Analysis — `57:7169`
- 633 × 452px, y=1011
- "Price" heading (54×28)
- Price comparison text: "The list price of $84,000 for this 2019 Airstream Flying Cloud is low..."
- "Learn more" link
- Visual price bar with "Avg. list price" label
  - Deal card: "List price $84,000" with positioning indicator
  - Scale: Low / Fair / High / Overpriced labels
- Price history graph area (`57:7170`)

#### Description — `32:6871`
- 633 × 188px, y=1495
- "Description" heading (633×28)
- Expandable description text with "Read more" + chevron

#### Divider — `59:7272`

#### Loan Calculator — `59:7191`
- 633 × 457px, y=1763
- "Loan calculator" heading
- Subtitle: "Determine the monthly cost of financing your RV purchase..."
- **Payment display** (`59:7195`, 633×84): "$241/mo" + "Est. payment*"
- **Contact prompt** (`59:7198`, 633×87): "Questions about payment options?" + dealer contact link + CTA button
- Financing disclaimer text

#### Factory Specs — `32:6878` [HIDDEN]
- 633 × 492px (hidden in this variant)
- "Factory specs" heading + spec grid

#### Divider — `32:6906`

#### About the Dealership — `32:6907`
- 633 × 789px, y=2300
- "About the dealership" heading

**Dealer info** — `32:6910` (633×271)
- Dealer logo (88×74) + dealer name + location + phone + hours
- **Top 50 Badge** instance (`32:6929`, 633×119)

**Dealer bio** — `32:6930` (633×152)
- Long-form dealer description with "Read more" expand link

**CTA button** — `32:6935` (218×55) — "View dealer inventory" or similar

**Dealer website links** — `32:6936` (633×171) — instance

#### Divider — `32:6949`

#### Resources — `32:6950`
- 633 × 204px, y=3169
- "Resources" heading
- **Foremost** insurance instance (`32:6954`, 633×160)
- Geico instance hidden

#### Divider — `32:6955`

#### Report Listing — `32:6956`
- 633 × 24px, y=3551
- Flag icon + "Report listing" text

#### Disclaimer — `32:6959`
- 633 × 115px, y=3607
- RV Trader disclaimer text
- AI-enhanced photos disclaimer text

---

### Right Column / Sidebar (`32:6962`) — 455px wide

#### Dealer Contact Card — `32:6963`
- 455 × 463px, y=0

**Lead form** — `32:6967` (455×411)
- **Segmented buttons** (`32:6969`, 391×44) — Email / Call / Chat toggle
- **Message input** (`32:6971`, 391×91) — Multi-line text area
- **Submit CTA** (`32:6973`, 391×55) — Primary text button
- **Contact info section** (`32:6975`, 391×109):
  - Dealer name, address, phone, hours

**Popularity stats** — `32:7377` (455×20)
- "X people viewing" or similar engagement indicator

#### Ad — 300×250 — `32:7384`
- Instance of **General** ad component
- 300 × 250px, y=495

#### Additional Sidebar Content — `32:7385`
- 455 × 2945px, y=777
- **300×600** ad slot (`32:7386`)
- **300×250** ad slot (`32:7387`)

---

### Full-width Sections (below two-column layout)

#### Divider — `32:7389`

#### Similar Listings Carousel — `32:7390`
- 1120 × 485px, y=4480
- **Listing carousel** instance (`32:7391`, 1120×453)

#### Divider — `32:7392`

#### Related Categories — `32:7395`
- 1120 × 164px, y=5045
- "Related categories" heading (1120×28)
- Tag grid (`32:7397`, 1120×88) — 7 **Action** chip instances in 2 rows

#### Insurance / Accessories — `32:7405`
- 1120 × 617px, y=5241
- Two side-by-side cards (544px each):
  - **RV accessories** instance (`32:7407`, 544×497)
  - **RV insurance** instance (`32:7408`, 544×497)
- Insurance disclaimer text (784×40)

#### AdSense — `32:7413`
- 1120 × 864px, y=5890
- Two **Ad Sense** instances (1120×424 each, 16px gap)

### 5. Footer — `32:11529`
- 1790 × 679px, y=7020

**Navigation** — `32:11530` (1662×382, y=32)
- 4 navigation columns (`32:11544`, 1662×334)

**Divider** — `32:11601`

**Affiliates** — `32:11602` (1104×45, y=424) [HIDDEN]
- 4 affiliate logo instances

**SEO Footer Copy** — `32:11607` (1662×121, y=446)
- Heading: "Find RVs for sale on RV Trader"
- Long-form SEO paragraph

**Copyright / Legal** — `32:11610` (1662×48, y=599)
- Copyright links row + scroll-to-top icon button

---

## Section Y-positions (quick reference)

| Section | Y position | Height |
|---------|-----------|--------|
| Cross-promotions | 0 | 40 |
| Header | 40 | 72 |
| Ad (728×90) | 112 | 122 |
| Main content area | 234 | 6786 |
| ↳ Navigation bar | +32 | 20 |
| ↳ Title section | +84 | 74 |
| ↳ Photo gallery | +190 | 456 |
| ↳ Two-column layout | +678 | 3722 |
|   ↳ Left: Price | ++0 | 66 |
|   ↳ Left: AI Summary | ++0 | 215 |
|   ↳ Left: VHR + Negotiate | ++247 | 359 |
|   ↳ Left: Features & Specs | ++638 | 341 |
|   ↳ Left: Price Analysis | ++1011 | 452 |
|   ↳ Left: Description | ++1495 | 188 |
|   ↳ Left: Loan Calculator | ++1763 | 457 |
|   ↳ Left: About Dealership | ++2300 | 789 |
|   ↳ Left: Resources | ++3169 | 204 |
|   ↳ Right: Dealer Card | ++0 | 463 |
|   ↳ Right: Ad 300×250 | ++495 | 250 |
|   ↳ Right: Ads (300×600 + 300×250) | ++777 | 2945 |
| ↳ Similar Listings | +4480 | 485 |
| ↳ Related Categories | +5045 | 164 |
| ↳ Insurance / Accessories | +5241 | 617 |
| ↳ AdSense | +5890 | 864 |
| Footer | 7020 | 679 |

---

## Components Used

| Component | Node ID | Location |
|-----------|---------|----------|
| Cross-promotions | `32:6781` | Top bar |
| Header | `32:6782` | Below cross-promotions |
| General (Ad 728×90) | `32:6794` | Leaderboard ad |
| Breadcrumb | `32:6797` | Navigation bar (hidden) |
| Icon only (Share + Favorite) | `32:6811`, `32:6812` | Title actions |
| Tags | `32:6841` | Photo gallery overlay |
| Price guidance | `59:7324` | Price section badge |
| Informational (AI Summary) | `53:7159` | AI summary card |
| VHR | `32:6867` | Vehicle History Report |
| Willing to negotiate | `32:6868` | Negotiation indicator |
| Features and specs/Section | `32:6869` | Specs section |
| Divider | multiple | Section separators |
| Segmented buttons | `32:6969` | Lead form tabs |
| Multi-line input | `32:6971` | Lead form message |
| Text buttons (CTAs) | `32:6973`, `32:6935` | Submit, dealer inventory |
| Popularity stats | `32:7377` | Below dealer card |
| Top 50 Badge | `32:6929` | Dealership section |
| Dealer website links | `32:6936` | Dealership section |
| Foremost (insurance) | `32:6954` | Resources section |
| Listing carousel | `32:7391` | Similar listings |
| Action (chips) | `32:7398`–`32:7404` | Related categories |
| RV accessories | `32:7407` | Insurance section |
| RV insurance | `32:7408` | Insurance section |
| Ad Sense | `32:7414`, `32:7415` | Bottom ad blocks |
| General (Ad 300×250) | `32:7384`, `32:7387` | Sidebar ads |
| General (Ad 300×600) | `32:7386` | Sidebar ad |
| Footer | `32:11529` | Page bottom |

---

## Layout Summary

```
┌──────────────────────────────────────────────────┐
│ Cross-promotions (1790 × 40)                     │
├──────────────────────────────────────────────────┤
│ Header (1789 × 72)                               │
├──────────────────────────────────────────────────┤
│ Ad — 728×90 Centered (1790 × 122)                │
├──────────────────────────────────────────────────┤
│         ┌─── 1120px centered ───┐                │
│         │ < Search results    8 of 8,223 < > │   │
│         │                                    │   │
│         │ 2024 Airstream Flying Cloud 25RB ♡↗│   │
│         │ Stock # · Dealer's website         │   │
│         │                                    │   │
│         │ ┌──── Main ────┐┌─ Thumbs 2×2 ──┐│   │
│         │ │              ││ ┌────┐ ┌────┐  ││   │
│         │ │  Hero Photo  ││ │    │ │    │  ││   │
│         │ │  (557×456)   ││ └────┘ └────┘  ││   │
│         │ │              ││ ┌────┐ ┌────┐  ││   │
│         │ │              ││ │    │ │    │  ││   │
│         │ └──────────────┘│ └────┘ └────┘  ││   │
│         │                 └────────────────┘│   │
│         ├───────────────┬────────────────────┤   │
│         │ Left (633px)  │ Right (455px)      │   │
│         │               │                    │   │
│         │ $96,000       │ ┌────────────────┐ │   │
│         │ AI Summary    │ │ Dealer Contact │ │   │
│         │ VHR           │ │ Email/Call/Chat│ │   │
│         │ Negotiate     │ │ Message input  │ │   │
│         │ Features      │ │ Submit CTA     │ │   │
│         │ Price Analysis│ │ Phone · Hours  │ │   │
│         │ Description   │ └────────────────┘ │   │
│         │ Loan Calc     │                    │   │
│         │ About Dealer  │ [300×250 Ad]       │   │
│         │ Resources     │ [300×600 Ad]       │   │
│         │ Report        │ [300×250 Ad]       │   │
│         │ Disclaimer    │                    │   │
│         ├───────────────┴────────────────────┤   │
│         │ Similar Listings Carousel          │   │
│         │ Related Categories (chips)         │   │
│         │ Insurance / Accessories (2 cards)  │   │
│         │ AdSense (2 blocks)                 │   │
│         └────────────────────────────────────┘   │
├──────────────────────────────────────────────────┤
│ Footer (1790 × 679)                              │
└──────────────────────────────────────────────────┘
```
