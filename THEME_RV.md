# RV Trader Theme

> Marketplace-specific color tokens for RV Trader, applied on top of the TIDE 2.0 global design system.
> Source: [Homepage Refresh](https://www.figma.com/design/2LNzb2u8ua7X8ZH4sQOWb1/%F0%9F%8C%A0-Homepage-Refresh) · [Marketplace UI Refresh](https://www.figma.com/design/PjidGuCWzCcgsrHJvxLLFW/Marketplace-UI-Refresh) · [Design System TIDE 2.0](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0)

---

## Primary

| Token                | Hex / Value   | Usage                                        |
|----------------------|---------------|----------------------------------------------|
| `Primary`            | `#006836`     | Brand green — main CTAs, search button, "Sell my RV" CTA |
| `Primary Dark`       | `#3E6146`     | Hover/active state of primary green           |
| `On Primary`         | `#FFFFFF`     | Text/icons on primary-colored backgrounds     |
| `Brand Accent`       | `#FACA33`     | Yellow accent — badges, decorative highlights |

## Secondary

| Token                | Hex / Value   | Usage                                        |
|----------------------|---------------|----------------------------------------------|
| `Secondary`          | `#252526`     | Dark buttons, active filter pill bg, "More info" button text |
| `On Secondary`       | `#FFFFFF`     | Text/icons on secondary-colored backgrounds  |

## Surface

| Token                         | Hex / Value                   | Usage                                        |
|-------------------------------|-------------------------------|----------------------------------------------|
| `Surface`                     | `#FFFFFF`                     | Default background — cards, modals, header, inputs |
| `Surface Variant`             | `#F2F2F2`                     | Alternate bg — segmented button track, filter/sort pills, chips |
| `Surface Low`                 | `#FFFFFF`                     | Card backgrounds (same as Surface)           |
| `Surface Accent`              | `#E0EDE7`                     | Light green tinted surface — cross-promotions bar |
| `Surface Floating`            | `rgba(255, 255, 255, 0.9)`   | Frosted glass — listing card tag badges      |
| `Surface Placeholder`         | `#F8F8F8`                     | Ad placeholder background                    |
| `On Surface`                  | `#252526`                     | Primary text — titles, labels, prices, nav links |
| `On Surface Variant`          | `#6E7072`                     | Secondary/muted text — subtitles, placeholders, inactive tabs, strikethrough prices |
| `On Surface Brand`            | `#006836`                     | Green-colored text — trust badges, brand links |
| `On Surface Inverse`          | `#FFFFFF`                     | Text on dark backgrounds — active filter count |
| `On Surface Inverse Variant`  | `rgba(255, 255, 255, 0.75)`  | Muted text on dark backgrounds               |

## Border

| Token              | Hex / Value              | Usage                                        |
|--------------------|--------------------------|----------------------------------------------|
| `Border`           | `#939598`                | Default borders — form inputs, checkboxes, ad slots |
| `Border Low`       | `#E4E4E5`                | Subtle borders — card outlines, filter card, dividers, spec cards, listing cards |
| `Border High`      | `#252526`                | High-contrast borders — active filter chips, selected segmented button |
| `Border Input`     | `#D5D5D5`                | Search/form input border — AI search bar     |
| `Border Floating`  | `rgba(0, 0, 0, 0.1)`    | Photo overlay borders — listing card photo area |
| `Border Tag Red`   | `#D8202E`                | Left accent on listing tag badges ("Price reduced") |

## Shadows

| Token              | CSS Value                                       | Usage                                        |
|--------------------|-------------------------------------------------|----------------------------------------------|
| `Shadow Bottom`    | `0px 2px 8px 2px rgba(0, 0, 0, 0.07)`          | Cards, header, promo cards, homepage search box |
| `Shadow Top`       | `0px -2px 8px 2px rgba(0, 0, 0, 0.07)`         | Bottom sheets (XS-SM features & specs modal) |
| `Shadow Elevated`  | `8px -11px 44px 0px rgba(0, 0, 0, 0.09)`       | Decorative shadow                            |
| `Shadow Segment`   | `0px 2px 8px 0px rgba(0, 0, 0, 0.09)`          | Selected segmented button pill                |

## Overlays

| Token              | Value                      | Usage                                        |
|--------------------|----------------------------|----------------------------------------------|
| `Overlay Light`    | `rgba(0, 0, 0, 0.4)`      | Image scrim (light)                          |
| `Overlay Medium`   | `rgba(0, 0, 0, 0.46)`     | Image scrim (medium)                         |
| `Overlay Heavy`    | `rgba(0, 0, 0, 0.55)`     | Image scrim (heavy)                          |
| `Overlay Warm`     | `rgba(49, 46, 33, 0.5)`   | Hero nav pill overlay                        |

## Scrollbar

| Token              | Value                      | Usage                                        |
|--------------------|----------------------------|----------------------------------------------|
| `Scrollbar Thumb`  | `rgba(63, 67, 80, 0.24)`  | Filter sidebar scrollbar thumb               |
| `Scrollbar Track`  | `rgba(217, 217, 217, 0.2)`| Filter sidebar scrollbar track               |

## Gradients

| Token                    | Description                                                      | Usage                         |
|--------------------------|------------------------------------------------------------------|-------------------------------|
| `Buying Power Gradient`  | Overlapping radial gradients: gold `rgba(242,178,3)` 15% opacity, mint `rgba(152,207,182)` 42% opacity, green `rgba(0,104,54)` 36% opacity | Estimated Buying Power card bg |

## Disabled State

| Token     | Value          | Usage                              |
|-----------|----------------|------------------------------------|
| Disabled  | `opacity: 0.32`| Applied to disabled controls       |

---

## CSS Custom Properties

```css
:root {
  /* Primary */
  --rv-primary: #006836;
  --rv-primary-dark: #3E6146;
  --rv-on-primary: #FFFFFF;
  --rv-brand-accent: #FACA33;

  /* Secondary */
  --rv-secondary: #252526;
  --rv-on-secondary: #FFFFFF;

  /* Surface */
  --rv-surface: #FFFFFF;
  --rv-surface-variant: #F2F2F2;
  --rv-surface-low: #FFFFFF;
  --rv-surface-accent: #E0EDE7;
  --rv-surface-floating: rgba(255, 255, 255, 0.9);
  --rv-surface-placeholder: #F8F8F8;
  --rv-on-surface: #252526;
  --rv-on-surface-variant: #6E7072;
  --rv-on-surface-brand: #006836;
  --rv-on-surface-inverse: #FFFFFF;
  --rv-on-surface-inverse-variant: rgba(255, 255, 255, 0.75);

  /* Border */
  --rv-border: #939598;
  --rv-border-low: #E4E4E5;
  --rv-border-high: #252526;
  --rv-border-input: #D5D5D5;
  --rv-border-floating: rgba(0, 0, 0, 0.1);
  --rv-border-tag-red: #D8202E;

  /* Shadows */
  --rv-shadow-bottom: 0px 2px 8px 2px rgba(0, 0, 0, 0.07);
  --rv-shadow-top: 0px -2px 8px 2px rgba(0, 0, 0, 0.07);
  --rv-shadow-segment: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);

  /* Overlays */
  --rv-overlay-light: rgba(0, 0, 0, 0.4);
  --rv-overlay-medium: rgba(0, 0, 0, 0.46);
  --rv-overlay-heavy: rgba(0, 0, 0, 0.55);
  --rv-overlay-warm: rgba(49, 46, 33, 0.5);

  /* Scrollbar */
  --rv-scrollbar-thumb: rgba(63, 67, 80, 0.24);
  --rv-scrollbar-track: rgba(217, 217, 217, 0.2);
}
```

---

## Color Usage by Component

Quick reference mapping tokens to where they appear in the component library.

| Token | Components |
|-------|------------|
| `--rv-primary` (#006836) | Search button, "Sell my RV" CTA, trust badge text, newsletter CTA |
| `--rv-primary-dark` (#3E6146) | Button hover states |
| `--rv-secondary` (#252526) | Active filter pill bg, "More info" text, nav links, filter titles |
| `--rv-surface` (white) | Card bg, modal bg, header bg, input bg, account pill bg |
| `--rv-surface-variant` (#F2F2F2) | Segmented button track, filter/sort pill bg, filter chip bg |
| `--rv-surface-accent` (#E0EDE7) | Cross-promotions bar, featured icon accent bg |
| `--rv-surface-floating` | Listing card tag badge bg |
| `--rv-on-surface` (#252526) | All primary text, prices, titles |
| `--rv-on-surface-variant` (#6E7072) | Placeholders, subtitles, inactive tabs, muted labels |
| `--rv-on-surface-brand` (#006836) | Trust badge text, brand links |
| `--rv-border-low` (#E4E4E5) | Card outlines, filter card, spec cards, listing cards, divider bottom borders |
| `--rv-border` (#939598) | Form inputs, checkboxes, ad slots |
| `--rv-border-high` (#252526) | Active filter chips, selected segmented button |
| `--rv-border-input` (#D5D5D5) | AI search input border |
| `--rv-border-tag-red` (#D8202E) | "Price reduced" tag left border |
| `--rv-shadow-bottom` | Header, homepage search box, promo cards, listing tag badges |
| `--rv-shadow-segment` | Selected segmented button option |
