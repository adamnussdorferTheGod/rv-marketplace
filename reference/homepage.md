# Homepage — Desktop 1

> Source: [Marketplace UI Refresh — Homepage](https://www.figma.com/design/PjidGuCWzCcgsrHJvxLLFW/Marketplace-UI-Refresh?node-id=1-9679)
> Frame: `1:9679` · 1789 × 6316px

---

## Page Structure (top to bottom)

### 1. Cross-promotions Bar — `1:9681`
- Instance of **Cross-promotions** component
- 1789 × 40px, y=0
- Realm tabs: RVs · Motorcycles · ATVs · Trucks · Boats · Planes · Snowmobiles · Jet Skis

### 2. Header — `1:9682`
- 1789 × 72px, y=40
- Logo (158×40) + nav links (Shop · Sell · RV values · Cash offers · Research) + Account button

### 3. Main Content — `1:9693`
- 1789 × 5003px, y=112
- Contains all page sections with 64px left/right margins (content width: 1661px)

#### 3a. Hero Section — `1:9694`
- 1661 × 934px, y=32

**Hero Image / Background** — `1:9695` "Group 1533208504"
- 1653 × 454px
- Contains hero background image (rounded rectangle 1653×393) and the **Homepage Search** box (`1:9698`, 762×136) floating over it

**Listing Carousel** — `1:9721`
- 1661 × 448px, y=486
- First row of listing cards below the hero

#### 3b. Native Summit Showcase — `1:9802`
- 1661 × 367px, y=1014
- Header section (1661×79) + content row (1661×272)

#### 3c. Pagination / Category Section — `1:9883`
- 1661 × 660px, y=1429
- "Pagination" heading (504×45)
- **Segmented Buttons** instance (493×44) — likely "Shop RVs / Sell my RV" or category toggle
- Grid of category cards (1661×507) — `1:9886`

#### 3d. Listing Carousel (2-row) — `1:9919`
- 1661 × 715px, y=2137
- Header row (1661×45) + two rows of listing cards (303px each) + "View all" button (118×56)

#### 3e. Listing Carousel (1-row) — `1:10059`
- 1661 × 380px, y=2292
- Header row (1661×45) + one row of listing cards (303px) + "View all" button (118×56)

#### 3f. Ad — Leaderboard — `1:10132`
- 728 × 90px ad slot, y=2900

#### 3g. "Making RV ownership easy" — `1:10133`
- 1661 × 621px, y=3038
- Heading: "Making RV ownership easy" (460×49)
- Feature cards row (1650×532)

#### 3h. Testimonials / Reviews Section — `1:10160`
- 1661 × 636px, y=3707
- Header area (1661×126) + testimonial cards row (1661×478)

#### 3i. SEO + Ad Section — `1:10192`
- 1661 × 410px, y=4391
- SEO content block (1297×410) + 300×250 ad slot

#### 3j. Ad — Leaderboard — `1:10216`
- 728 × 90px ad slot, y=4849

### 4. Pre-footer Section — `17:4752`
- 1791 × 523px, y=5115

### 5. Footer — `17:4768`
- 1789 × 679px, y=5638

**Navigation** — `17:4769` (1661×382, y=32)
- "Looking for something else?" column (195×336) with links
- 4 navigation columns (391px each): Browse by type, resources, dealer/seller, company info

**Divider** — `17:4840`

**Affiliates** — `17:4841` (1104×45, y=424)
- 4 affiliate logo instances

**SEO Footer Copy** — `17:4846` (1661×121, y=446)
- Heading: "Find RVs for sale on RV Trader"
- Long-form SEO paragraph with links to RV types and brands

**Copyright / Legal** — `17:4849` (1661×48, y=599)
- Copyright links row + reCAPTCHA notice + scroll-to-top icon button

---

## Section Y-positions (quick reference)

| Section | Y position | Height |
|---------|-----------|--------|
| Cross-promotions | 0 | 40 |
| Header | 40 | 72 |
| Hero + Search | 112 | 934 |
| Native Summit Showcase | 1126 | 367 |
| Pagination / Categories | 1541 | 660 |
| Listing Carousel (2-row) | 2249 | 715 |
| Listing Carousel (1-row) | 2404 | 380 |
| Ad (728×90) | 3012 | 90 |
| "Making RV ownership easy" | 3150 | 621 |
| Testimonials | 3819 | 636 |
| SEO + Ad | 4503 | 410 |
| Ad (728×90) | 4961 | 90 |
| Pre-footer | 5115 | 523 |
| Footer | 5638 | 679 |

---

## Components Used

| Component | Node ID | Location |
|-----------|---------|----------|
| Cross-promotions | `1:9681` | Top bar |
| Header | `1:9682` | Below cross-promotions |
| Homepage Search | `1:9698` | Floating over hero image |
| Segmented Buttons | `1:9885` | Category section toggle |
| Listing Cards | multiple | Carousels throughout |
| Text Buttons ("View all") | `1:10058`, `1:10131` | Carousel section footers |
| Testimonial Cards | in `1:10164` | Reviews section |
| General (Ad slots) | `1:10132`, `1:10215`, `1:10216` | 728×90 and 300×250 |
| Footer | `17:4768` | Page bottom |
| Affiliates | `17:4842`–`17:4845` | Footer affiliates row |
