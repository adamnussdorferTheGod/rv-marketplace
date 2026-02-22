# TIDE 2.0 Design System

> Trader Interactive: Marketplace Design System
> Source: [Figma - Design System TIDE 2.0](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=17-87&m=dev)

---

## Colors

> Source: [Global Colors](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=15263-60&t=b6tQKGhYWglEbuD1-4)

### Tonal Palette

Token naming convention: single-letter prefix per color family + step number (e.g. `R200`, `B100`).

#### Transparent

| Step | Value                       |
|------|-----------------------------|
| 100  | `rgba(255, 255, 255, 0.9)`  |
| 200  | `rgba(255, 255, 255, 0.75)` |
| 300  | `rgba(0, 0, 0, 0.1)`        |
| 400  | `rgba(0, 0, 0, 0.5)`        |

#### Gray (10-step scale)

| Step | Hex       |
|------|-----------|
| 100  | `#FFFFFF` |
| 200  | `#F2F2F2` |
| 300  | `#E4E4E5` |
| 400  | `#C9CACB` |
| 500  | `#AEAFB2` |
| 600  | `#939598` |
| 700  | `#6E7072` |
| 800  | `#494A4C` |
| 900  | `#252526` |
| 1000 | `#000000` |

#### Red (R)

| Step | Hex       |
|------|-----------|
| 100  | `#FBE9EA` |
| 200  | `#D8202E` |
| 300  | `#82131C` |

#### Orange (O)

| Step | Hex       |
|------|-----------|
| 100  | `#FFF2EA` |
| 200  | `#FA8131` |
| 300  | `#964D1D` |

#### Yellow (Y)

| Step | Hex       |
|------|-----------|
| 100  | `#FEF2CC` |
| 200  | `#FACA33` |
| 300  | `#90731D` |

#### Lime (L)

| Step | Hex       |
|------|-----------|
| 100  | `#F7FAE9` |
| 200  | `#ACC821` |
| 300  | `#677814` |

#### Green (G)

| Step | Hex       |
|------|-----------|
| 100  | `#E7F6ED` |
| 200  | `#11A94E` |
| 300  | `#0A652F` |

#### Teal (T)

| Step | Hex       |
|------|-----------|
| 100  | `#E6F7F8` |
| 200  | `#21B1B2` |
| 300  | `#036C6C` |

#### Blue (B)

| Step | Hex       |
|------|-----------|
| 100  | `#EBF1FD` |
| 200  | `#3870E9` |
| 300  | `#22438C` |

#### Purple (P)

| Step | Hex       |
|------|-----------|
| 100  | `#F1F0F8` |
| 200  | `#756CB7` |
| 300  | `#46416E` |

#### Salmon (S)

| Step | Hex       |
|------|-----------|
| 100  | `#FDF1F0` |
| 200  | `#EE706B` |
| 300  | `#8F4340` |

### Global Color Roles

Each color maps to 4 semantic roles: **Primary** (main), **Surface** (background), **Border**, and **On Surface** (text on surface).

| Color    | Primary (200) | Surface (100) | Border (200)  | On Surface (300) |
|----------|---------------|---------------|---------------|------------------|
| Red      | `#D8202E`     | `#FBE9EA`     | `#D8202E`     | `#82131C`        |
| Orange   | `#FA8131`     | `#FFF2EA`     | `#FA8131`     | `#964D1D`        |
| Yellow   | `#FACA33`     | `#FEF2CC`     | `#FACA33`     | `#90731D`        |
| Lime     | `#ACC821`     | `#F7FAE9`     | `#ACC821`     | `#677814`        |
| Green    | `#11A94E`     | `#E7F6ED`     | `#11A94E`     | `#0A652F`        |
| Teal     | `#21B1B2`     | `#E6F7F8`     | `#21B1B2`     | `#036C6C`        |
| Blue     | `#3870E9`     | `#EBF1FD`     | `#3870E9`     | `#22438C`        |
| Purple   | `#756CB7`     | `#F1F0F8`     | `#756CB7`     | `#46416E`        |
| Salmon   | `#EE706B`     | `#FDF1F0`     | `#EE706B`     | `#8F4340`        |

### Status Colors

| Status      | Primary     | Surface     | Border      |
|-------------|-------------|-------------|-------------|
| Information | `#3870E9`   | `#EBF1FD`   | `#3870E9`   |
| Success     | `#11A94E`   | `#E7F6ED`   | `#11A94E`   |
| Warning     | `#FACA33`   | `#FEF2CC`   | `#FACA33`   |
| Attention   | `#D8202E`   | `#FBE9EA`   | `#D8202E`   |

### Neutral Tokens

| Token        | Hex       |
|--------------|-----------|
| `$white`     | `#FFFFFF` |
| `$gray-100`  | `#E1E1E1` |
| `$gray-500`  | `#717171` |
| `$gray-900`  | `#1F1F1F` |

### CSS Custom Properties

```css
:root {
  /* Transparent */
  --color-transparent-100: rgba(255, 255, 255, 0.9);
  --color-transparent-200: rgba(255, 255, 255, 0.75);
  --color-transparent-300: rgba(0, 0, 0, 0.1);
  --color-transparent-400: rgba(0, 0, 0, 0.5);

  /* Gray */
  --color-gray-100: #FFFFFF;
  --color-gray-200: #F2F2F2;
  --color-gray-300: #E4E4E5;
  --color-gray-400: #C9CACB;
  --color-gray-500: #AEAFB2;
  --color-gray-600: #939598;
  --color-gray-700: #6E7072;
  --color-gray-800: #494A4C;
  --color-gray-900: #252526;
  --color-gray-1000: #000000;

  /* Red */
  --color-red-100: #FBE9EA;
  --color-red-200: #D8202E;
  --color-red-300: #82131C;

  /* Orange */
  --color-orange-100: #FFF2EA;
  --color-orange-200: #FA8131;
  --color-orange-300: #964D1D;

  /* Yellow */
  --color-yellow-100: #FEF2CC;
  --color-yellow-200: #FACA33;
  --color-yellow-300: #90731D;

  /* Lime */
  --color-lime-100: #F7FAE9;
  --color-lime-200: #ACC821;
  --color-lime-300: #677814;

  /* Green */
  --color-green-100: #E7F6ED;
  --color-green-200: #11A94E;
  --color-green-300: #0A652F;

  /* Teal */
  --color-teal-100: #E6F7F8;
  --color-teal-200: #21B1B2;
  --color-teal-300: #036C6C;

  /* Blue */
  --color-blue-100: #EBF1FD;
  --color-blue-200: #3870E9;
  --color-blue-300: #22438C;

  /* Purple */
  --color-purple-100: #F1F0F8;
  --color-purple-200: #756CB7;
  --color-purple-300: #46416E;

  /* Salmon */
  --color-salmon-100: #FDF1F0;
  --color-salmon-200: #EE706B;
  --color-salmon-300: #8F4340;

  /* Neutral */
  --color-white: #FFFFFF;
  --color-neutral-100: #E1E1E1;
  --color-neutral-500: #717171;
  --color-neutral-900: #1F1F1F;

  /* Status */
  --color-info-primary: var(--color-blue-200);
  --color-info-surface: var(--color-blue-100);
  --color-info-border: var(--color-blue-200);
  --color-success-primary: var(--color-green-200);
  --color-success-surface: var(--color-green-100);
  --color-success-border: var(--color-green-200);
  --color-warning-primary: var(--color-yellow-200);
  --color-warning-surface: var(--color-yellow-100);
  --color-warning-border: var(--color-yellow-200);
  --color-attention-primary: var(--color-red-200);
  --color-attention-surface: var(--color-red-100);
  --color-attention-border: var(--color-red-200);
}
```

---

## Typography

**Font Family:** Montserrat
**Line Height Rule:** 140% of font size

### Font Weights

| Weight     | Value |
|------------|-------|
| Regular    | 400   |
| Medium     | 500   |
| SemiBold   | 600   |
| Bold       | 700   |

### Type Scale

| Token              | Weight   | Size   | Line Height | Usage            |
|--------------------|----------|--------|-------------|------------------|
| `Display 1`        | Bold     | 32px   | 44.8px      | Page heroes      |
| `Headline 1`       | Bold     | 24px   | 33.6px      | Section headers  |
| `Headline 2`       | Bold     | 20px   | 28px        | Sub-headers      |
| `Headline 3`       | Bold     | 16px   | 22.4px      | Card headers     |
| `Title 1`          | SemiBold | 20px   | 28px        | Titles           |
| `Title 2`          | SemiBold | 18px   | 25.2px      | Subtitles        |
| `Body 1`           | Regular  | 16px   | 22.4px      | Primary body     |
| `Body 2`           | Regular  | 14px   | 19.6px      | Secondary body   |
| `Label 1`          | Medium   | 16px   | 22.4px      | Form labels      |
| `Label 1 Semibold` | SemiBold | 16px   | 22.4px      | Emphasized labels|
| `Label 2`          | Medium   | 14px   | 19.6px      | Small labels     |
| `Label 2 Semibold` | SemiBold | 14px   | 19.6px      | Emphasized small |
| `Label 3`          | Medium   | 12px   | 16.8px      | Captions         |
| `Link 1`           | Medium   | 16px   | 22.4px      | Primary links    |
| `Link 2`           | Medium   | 14px   | 19.6px      | Secondary links  |
| `Link 3`           | Medium   | 12px   | 16.8px      | Small links      |
| `Button 1`         | SemiBold | 16px   | 22.4px      | Primary buttons  |
| `Button 2`         | SemiBold | 14px   | 19.6px      | Small buttons    |

### Size Availability

`12px` | `14px` | `16px` | `18px` | `20px` | `24px` | `32px`

### CSS Custom Properties

```css
:root {
  --font-family: 'Montserrat', sans-serif;

  /* Display */
  --font-display-1: 700 32px/44.8px var(--font-family);

  /* Headline */
  --font-headline-1: 700 24px/33.6px var(--font-family);
  --font-headline-2: 700 20px/28px var(--font-family);
  --font-headline-3: 700 16px/22.4px var(--font-family);

  /* Title */
  --font-title-1: 600 20px/28px var(--font-family);
  --font-title-2: 600 18px/25.2px var(--font-family);

  /* Body */
  --font-body-1: 400 16px/22.4px var(--font-family);
  --font-body-2: 400 14px/19.6px var(--font-family);

  /* Label */
  --font-label-1: 500 16px/22.4px var(--font-family);
  --font-label-1-semibold: 600 16px/22.4px var(--font-family);
  --font-label-2: 500 14px/19.6px var(--font-family);
  --font-label-2-semibold: 600 14px/19.6px var(--font-family);
  --font-label-3: 500 12px/16.8px var(--font-family);

  /* Link */
  --font-link-1: 500 16px/22.4px var(--font-family);
  --font-link-2: 500 14px/19.6px var(--font-family);
  --font-link-3: 500 12px/16.8px var(--font-family);

  /* Button */
  --font-button-1: 600 16px/22.4px var(--font-family);
  --font-button-2: 600 14px/19.6px var(--font-family);
}
```

---

## Borders

> Source: [Borders](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=744-2)

### Border Width

| Token   | Value | Rem       | Usage                                  |
|---------|-------|-----------|----------------------------------------|
| `Light` | `1px` | `0.0625rem` | Default borders, dividers, separators |
| `Heavy` | `2px` | `0.125rem`  | Emphasized borders, active states     |

### Border Radius

> The border radius of a nested, rounded object should be smaller than that of its parent.

| Token            | Value   | Usage                              |
|------------------|---------|------------------------------------|
| `--radius-sm`    | `4px`   | Small elements, tags, badges       |
| `--radius-base`  | `8px`   | Cards, inputs, containers          |
| `--radius-lg`    | `16px`  | Large cards, modals, panels        |
| `--radius-full`  | `100px` | Pills, fully-rounded buttons/chips |

### Border Colors (from Tonal Palette)

| Token              | Value     | Usage                    |
|--------------------|-----------|--------------------------|
| `$gray-300`        | `#E4E4E5` | Subtle/low borders       |
| `$gray-400`        | `#C9CACB` | Default borders          |
| `$gray-600`        | `#939598` | Medium borders           |
| `$gray-900`        | `#252526` | High-contrast borders    |

### CSS Custom Properties

```css
:root {
  /* Border Width */
  --border-light: 1px;
  --border-heavy: 2px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-lg: 16px;
  --radius-full: 100px;

  /* Border Colors */
  --border-color-low: #E4E4E5;
  --border-color-default: #C9CACB;
  --border-color-medium: #939598;
  --border-color-high: #252526;
}
```

---

## Shadows

> Source: [Shadow](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=370-4194)

> Shadow used to create elevation for components.

| Token    | X   | Y   | Blur | Spread | Opacity | CSS Value                              |
|----------|-----|-----|------|--------|---------|----------------------------------------|
| `Bottom` | 0   | 2   | 8    | 2      | 7%      | `0px 2px 8px 2px rgba(0, 0, 0, 0.07)` |
| `Top`    | 0   | -2  | 8    | 2      | 7%      | `0px -2px 8px 2px rgba(0, 0, 0, 0.07)`|
| `Text`   | 0   | 0   | 5    | 0      | 60%     | `0px 0px 5px rgba(0, 0, 0, 0.6)`      |

### Usage

- **Bottom** — Default card/component elevation (drop shadow below)
- **Top** — Sticky headers, bottom-anchored elements (drop shadow above)
- **Text** — Text shadow for legibility on images or dark overlays

### CSS Custom Properties

```css
:root {
  --shadow-bottom: 0px 2px 8px 2px rgba(0, 0, 0, 0.07);
  --shadow-top: 0px -2px 8px 2px rgba(0, 0, 0, 0.07);
  --shadow-text: 0px 0px 5px rgba(0, 0, 0, 0.6);
}
```

---

## Spacing

> Source: [Spacing](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=74-13720)

> The following spacing scale includes values for both margins and padding. TI's Design System is based on 1rem or 16px units.

### Spacing Scale

| Token  | Rem      | Pixels |
|--------|----------|--------|
| `4px`  | `0.25rem` | 4px   |
| `8px`  | `0.5rem`  | 8px   |
| `16px` | `1rem`    | 16px  |
| `32px` | `2rem`    | 32px  |
| `64px` | `4rem`    | 64px  |

### CSS Custom Properties

```css
:root {
  --space-4: 4px;   /* 0.25rem */
  --space-8: 8px;   /* 0.5rem  */
  --space-16: 16px; /* 1rem    */
  --space-32: 32px; /* 2rem    */
  --space-64: 64px; /* 4rem    */
}
```

---

## Breakpoints & Grid

> Source: [Responsive + Grid](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=90-14345)

> These breakpoint ranges are standard for every page on web, where possible. Designers need to show what page designs look like and how they behave at each breakpoint range, and take into account the min and max value of each. Page designs and components have the option to change layout at each breakpoint range to better fit the space.

### Breakpoint Tokens

| Token | Device            | Viewport          | Gutters | Margins | Columns |
|-------|-------------------|--------------------|---------|---------|---------|
| `XS`  | Phone             | `<= 767px`        | N/A     | `20px`  | 1       |
| `SM`  | Tablet Portrait   | `768px – 991px`   | `16px`  | `32px`  | 2       |
| `MD`  | Tablet Landscape  | `992px – 1231px`  | `32px`  | `32px`  | 12      |
| `LG`  | Desktop           | `1232px – 1919px` | `32px`  | `64px`  | 12      |
| `XL`  | Desktop (large)   | `>= 1920px`       | `32px`  | `64px`  | 12      |

### Grid Types

| Grid Type       | Required             | Optional        | Behavior                                    |
|-----------------|----------------------|-----------------|---------------------------------------------|
| **Fluid grid**  | XS, SM, MD           | LG              | Margins stay fixed, column sizes grow        |
| **Standard grid** | XL                 | LG              | Column sizes stay fixed, only margins grow   |

### CSS Custom Properties

```css
:root {
  /* Breakpoints (min-width) */
  --breakpoint-sm: 768px;
  --breakpoint-md: 992px;
  --breakpoint-lg: 1232px;
  --breakpoint-xl: 1920px;

  /* Grid */
  --grid-margin-xs: 20px;
  --grid-margin-sm: 32px;
  --grid-margin-md: 32px;
  --grid-margin-lg: 64px;
  --grid-margin-xl: 64px;

  --grid-gutter-sm: 16px;
  --grid-gutter-md: 32px;
  --grid-gutter-lg: 32px;
  --grid-gutter-xl: 32px;

  --grid-columns-xs: 1;
  --grid-columns-sm: 2;
  --grid-columns-md: 12;
  --grid-columns-lg: 12;
  --grid-columns-xl: 12;
}
```

### Media Queries

```css
/* Phone (XS) — default, no query needed */

/* Tablet Portrait (SM) */
@media (min-width: 768px) { }

/* Tablet Landscape (MD) */
@media (min-width: 992px) { }

/* Desktop (LG) */
@media (min-width: 1232px) { }

/* Desktop Large (XL) */
@media (min-width: 1920px) { }
```

---

## Logos

> Source: [Logos](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=4-3136)

### Logo Colors

| Token          | Hex       | Usage                            |
|----------------|-----------|----------------------------------|
| `On Surface`   | `#252526` | Dark logo on light backgrounds   |
| `On Primary`   | `#FFFFFF` | White logo on dark backgrounds   |
| `Primary`      | `#193778` | Dark navy, logo wordmark color   |
| `Navy`         | `#1D4977` | Brand navy tone                  |
| `Blue`         | `#005F9E` | Brand blue tone                  |
| `Orange`       | `#C7521A` | Brand orange accent (Trader mark)|
| `Steel`        | `#494949` | Dark gray tone                   |

### Trader Interactive (Corporate)

| Variant    | Dimensions       |
|------------|------------------|
| Large      | ~100 x 32 px     |
| Small      | ~63 x 20 px      |
| Icon only  | ~43 x 50 px      |

### Marketplace Brand Logos

9 brands, each with 3 variants (selected via `Realm` property):

**Brands:** RV Trader, Boatmart, Commercial Truck Trader, Equipment Trader, Cycle Trader, Aero Trader, ATV Trader, Snowmobile Trader, PWC Trader

#### Large Wordmarks (height: 32px)

| Brand                    | Width    |
|--------------------------|----------|
| RV Trader                | 169 px   |
| Boatmart                 | 151 px   |
| Commercial Truck Trader  | 185 px   |
| Equipment Trader         | 112 px   |
| Cycle Trader             | 168 px   |
| Aero Trader              | 186 px   |
| ATV Trader               | 192 px   |
| Snowmobile Trader        | 150 px   |
| PWC Trader               | 177 px   |

#### Small Wordmarks (height: 24px)

| Brand                    | Width    |
|--------------------------|----------|
| RV Trader                | 127 px   |
| Boatmart                 | 112 px   |
| Commercial Truck Trader  | 139 px   |
| Equipment Trader         | 84 px    |
| Cycle Trader             | 127 px   |
| Aero Trader              | 139 px   |
| ATV Trader               | 145 px   |
| Snowmobile Trader        | 113 px   |
| PWC Trader               | 133 px   |

#### Logo Marks (icon-only, ~32 x 32px)

All 9 brands have a square icon mark at 32x32px.

### Third-Party Logos

#### Social Media (24 x 24px each)

Google, Twitter, Facebook, Instagram, YouTube, Pinterest, LinkedIn

#### Credit/Debit Cards (24 x 24px each)

Visa, Mastercard, Amex, Discover

#### Payment Methods (20 x 20px each)

Apple Pay, Google Pay, PayPal

#### Trust Badges (24 x 24px)

BBB Seal

### Usage Notes

1. **Brand switching** uses a `Realm` Figma property -- all marketplace logos are component variants, not separate components.
2. **Large logos (32px tall)** are for headers, hero sections, and primary brand placement.
3. **Small logos (24px tall)** are for footers, secondary navigation, and compact contexts.
4. **Logo marks (32x32)** are for favicons, app icons, and avatar-sized brand indicators.
5. **On light backgrounds** use the dark `#252526` or `#000000` logo variant. **On dark backgrounds** use the white `#FFFFFF` variant.
