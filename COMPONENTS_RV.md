# RV Trader UI Components

> Source: [Homepage Refresh](https://www.figma.com/design/2LNzb2u8ua7X8ZH4sQOWb1/%F0%9F%8C%A0-Homepage-Refresh?node-id=28408-26179&t=epjcDjfe9dOEOGul-4)

---

## Icons

### Overview

- **Format:** SVG (monochrome, single-color)
- **Icon color:** `#252526` (On Surface)
- **Font:** Montserrat (used for section headers/labels alongside icons)
- **Total icons:** ~183 (134 global + 49 brand-specific vehicle types)

### Size Variants

| Context         | Sizes          | Default |
|-----------------|----------------|---------|
| Global icons    | `20px`, `24px` | `24px`  |
| Vehicle icons   | `24px`, `32px` | `24px`  |

### Featured Icon Component

A wrapper that places an icon inside a rounded container with a tinted background.

| Property         | Value                  |
|------------------|------------------------|
| Container size   | 40x40px                |
| Inner icon       | 24x24px                |
| Padding          | 8px                    |
| Border radius    | 8px                    |
| BG: Accent       | `#E0EDE7` (mint green) |
| BG: Neutral      | `#F2F2F2` (light gray) |

```html
<!-- Featured Icon - Accent variant -->
<div style="
  width: 40px; height: 40px;
  padding: 8px;
  border-radius: 8px;
  background: var(--rv-surface-accent, #E0EDE7);
  display: flex; align-items: center; justify-content: center;
">
  <svg width="24" height="24"><!-- icon SVG --></svg>
</div>
```

### Global Icons (134)

#### Navigation & Actions

| Icon | Name | Sizes |
|------|------|-------|
| <- | `arrow_back` | 20, 24 |
| -> | `arrow_forward` | 20, 24 |
| ^ | `arrow_upward` | 20, 24 |
| > | `arrow_right` | 20, 24 |
| < | `chevron_left` | 20, 24 |
| > | `chevron_right` | 20, 24 |
| v | `expand_more` | 20, 24 |
| ^ | `expand_less` | 20, 24 |
| X | `close` | 20, 24 |
| + | `add` | 20, 24 |
| - | `remove` | 20, 24 |
| x | `clear` | 20, 24 |
| ... | `more_horiz` | 20, 24 |
| = | `menu` | 20, 24 |
| Q | `search` | 20, 24 |

#### Communication

| Icon | Name | Sizes |
|------|------|-------|
| tel | `call` | 20, 24 |
| @ | `mail` | 20, 24 |
| msg | `sms` | 20, 24 |
| chat | `forum` | 20, 24 |
| cam | `videocam` | 20, 24 |
| mic | `headset_mic` | 20, 24 |
| sig | `call_quality` | 20, 24 |

#### User & Account

| Icon | Name | Sizes |
|------|------|-------|
| usr | `person` | 20, 24 |
| srch | `person_search` | 20, 24 |
| asgn | `assignment_ind` | 20, 24 |

#### Favorites & Rating

| Icon | Name | Sizes |
|------|------|-------|
| heart | `favorite` | 20, 24 |
| heart+ | `favorite-filled` | 20, 24 |
| bkmk | `bookmark` | 20, 24 |
| star | `star` | 20, 24 |
| star+ | `star_filled` | 20, 24 |
| star/2 | `star_half` | 20, 24 |
| like | `thumb_up` | 20, 24 |

#### Sharing & Media

| Icon | Name | Sizes |
|------|------|-------|
| ios | `ios_share` | 20, 24 |
| shr | `share` | 20, 24 |
| play | `play_arrow` | 20, 24 |
| img | `image` | 20, 24 |
| gif | `animated_images` | 20, 24 |
| cam | `photo_camera` | 20, 24 |
| 3d | `view_in_ar` | 20, 24 |
| 360 | `3d_rotation` | 20, 24 |
| full | `expand_content` | 20, 24 |
| ext | `open_in_new` | 20, 24 |

#### Status & Feedback

| Icon | Name | Sizes |
|------|------|-------|
| err | `error` | 20, 24 |
| ? | `help` | 20, 24 |
| i | `info` | 20, 24 |
| i+ | `information` | 20, 24 |
| warn | `warning` | 20, 24 |
| ! | `priority_high` | 20, 24 |
| ok | `check` | 20, 24 |
| vrf | `verified` | 20, 24 |

#### Commerce & Finance

| Icon | Name | Sizes |
|------|------|-------|
| cart | `shopping_cart` | 20, 24 |
| tag | `sell` | 20, 24 |
| $ | `attach_money` | 20, 24 |
| bag | `money_bag` | 20, 24 |
| bnk | `account_balance` | 20, 24 |
| qt | `request_quote` | 20, 24 |
| deal | `handshake` | 20, 24 |
| bid | `gavel` | 20, 24 |

#### Documents & Data

| Icon | Name | Sizes |
|------|------|-------|
| doc | `assignment` | 20, 24 |
| doc2 | `draft` | 20, 24 |
| ctr | `contract` | 20, 24 |
| pol | `policy` | 20, 24 |
| sum | `summarize` | 20, 24 |
| cal | `calendar_month` | 20, 24 |

#### Editing & Formatting

| Icon | Name | Sizes |
|------|------|-------|
| edit | `edit` | 20, 24 |
| del | `delete` | 20, 24 |
| B | `format_bold` | 20, 24 |
| I | `format_italic` | 20, 24 |
| ul | `format_list_bulleted` | 20, 24 |
| txt | `insert_text` | 20, 24 |
| lock | `lock` | 20, 24 |

#### Layout & Design

| Icon | Name | Sizes |
|------|------|-------|
| lay | `layout` | 20, 24 |
| grid | `grid_3x3` | 20, 24 |
| pal | `palette` | 20, 24 |
| rad | `rounded_corner` | 20, 24 |
| spc | `align_space_even` | 20, 24 |
| dash | `dashboard_customize` | 20, 24 |
| tbl | `table_eye` | 20, 24 |

#### Vehicle & Spec Attributes

| Icon | Name | Sizes |
|------|------|-------|
| bolt | `bolt` | 20, 24 |
| gas | `gas` | 20, 24 |
| odo | `odometer` | 20, 24 |
| eng | `engine` | 20, 24 |
| gear | `gears` | 20, 24 |
| road | `road` | 20, 24 |
| W | `width` | 20, 24 |
| H | `height` | 20, 24 |
| wt | `weight` | 20, 24 |
| rlr | `ruler` | 20, 24 |
| seat | `seating` | 20, 24 |
| bed | `bed` | 20, 24 |
| bunk | `bunkhouse` | 20, 24 |
| slp | `sleeps` | 20, 24 |
| pwr | `power` | 20, 24 |
| off | `power_off` | 20, 24 |
| jack | `leveling_jacks` | 20, 24 |
| snow | `snowflake` | 20, 24 |
| h2o | `water` | 20, 24 |
| umb | `umbrella` | 20, 24 |
| ship | `local_shipping` | 20, 24 |
| rent | `car_rental` | 20, 24 |

#### Misc & Utility

| Icon | Name | Sizes |
|------|------|-------|
| sort | `swap_vert` | 20, 24 |
| swp | `swap_horiz` | 20, 24 |
| move | `move` | 20, 24 |
| cyc | `arrow cycle` | 20, 24 |
| rnw | `autorenew` | 20, 24 |
| tune | `tune` | 20, 24 |
| set | `settings` | 20, 24 |
| wrn | `wrench` | 20, 24 |
| rwn | `reset_wrench` | 20, 24 |
| hdy | `handyman` | 20, 24 |
| eng2 | `engineering` | 20, 24 |
| shld | `shield_check` | 20, 24 |
| down | `trending_down` | 20, 24 |
| flag | `flag` | 20, 24 |
| crsh | `crash` | 20, 24 |
| ai | `AI description` | 20, 24 |
| dmnd | `diamond` | 20, 24 |
| awd | `award_star` | 20, 24 |
| trph | `trophy` | 20, 24 |
| prem | `workspace_premium` | 20, 24 |
| schl | `school` | 20, 24 |
| bell | `notifications` | 20, 24 |
| eye | `visibility` | 20, 24 |
| sens | `sensors` | 20, 24 |
| bld | `domain` | 20, 24 |
| wh | `warehouse` | 20, 24 |
| pin | `pin` | 20, 24 |
| loc | `globe_location_pin` | 20, 24 |
| srch2 | `feature_search` | 20, 24 |
| vol0 | `volume_off` | 20, 24 |
| vol1 | `volume_on` | 20, 24 |
| sail | `sailing` | 20, 24 |
| boat | `directions_boat` | 20, 24 |
| clk | `acute` | 20, 24 |

### Brand-Specific Vehicle Type Icons (49)

#### RV Trader (12 icons)

| Name | Sizes |
|------|-------|
| `travel_trailer` | 24, 32 |
| `class_a` | 24, 32 |
| `class_c` | 24, 32 |
| `fifth_wheel` | 24, 32 |
| `toy_hauler` | 24, 32 |
| `class_b` | 24, 32 |
| `pop_up_camper` | 24, 32 |
| `park_model` | 24, 32 |
| `truck_camper` | 24, 32 |
| `fish_house` | 24, 32 |
| `teardrop_trailer` | 24, 32 |
| `destination_trailer` | 24, 32 |

#### ATV Trader (7 icons)

| Name | Sizes |
|------|-------|
| `dune_buggy` | 24, 32 |
| `golf_cart` | 24, 32 |
| `side_by_side` | 24, 32 |
| `trailer` | 24, 32 |
| `atv` | 24, 32 |
| `go_kart` | 24, 32 |
| `sand_rail` | 24, 32 |

#### Boatmart (3 icons)

| Name | Sizes |
|------|-------|
| `boat` | 24, 32 |
| `pwc` | 24, 32 |
| `trailer` | 24, 32 |

#### Commercial Truck Trader (11 icons)

| Name | Sizes |
|------|-------|
| `box_truck` | 24, 32 |
| `dump_truck` | 24, 32 |
| `service_truck` | 24, 32 |
| `garbage_truck` | 24, 32 |
| `flatbed_truck` | 24, 32 |
| `bucket_truck` | 24, 32 |
| `wrecker_truck` | 24, 32 |
| `roll_off_truck` | 24, 32 |
| `reefer_truck` | 24, 32 |
| `crane_truck` | 24, 32 |
| `plow_truck` | 24, 32 |

#### Snowmobile Trader (2 icons)

| Name | Sizes |
|------|-------|
| `snowmobile` | 24, 32 |
| `trailer` | 24, 32 |

#### Cycle Trader (2 icons)

| Name | Sizes |
|------|-------|
| `motorcycle` | 24, 32 |
| `trailer` | 24, 32 |

#### Equipment Trader (10 icons)

| Name | Sizes |
|------|-------|
| `tractor` | 24, 32 |
| `excavator` | 24, 32 |
| `skid_steer` | 24, 32 |
| `forklift` | 24, 32 |
| `dozer` | 24, 32 |
| `backhoe` | 24, 32 |
| `dump_truck` | 24, 32 |
| `compact_tractor` | 24, 32 |
| `trailer` | 24, 32 |
| `loader` | 24, 32 |

### Usage Notes

1. **Always use the 24px variant as default.** The 20px variant is for compact/dense UI contexts (table cells, tight toolbars). The 32px variant is only for vehicle type icons in prominent display contexts.

2. **Icon color inherits from `--rv-on-surface` (`#252526`).** To change icon color, apply CSS `filter` or use the SVG `fill`/`currentColor` pattern.

3. **Featured Icon** wraps any 24px icon in a 40x40 rounded container. Use the `Accent` background (`#E0EDE7`) for primary feature callouts and `Neutral` (`#F2F2F2`) for secondary.

4. **Vehicle type icons are brand-scoped.** The `trailer` icon appears in multiple brands but is visually distinct per brand (RV trailer vs. boat trailer vs. equipment trailer).

5. **Naming follows Material Symbols conventions** for global icons (e.g. `expand_more`, `chevron_right`, `visibility`). Custom/domain icons use descriptive names (e.g. `sleeps`, `bunkhouse`, `leveling_jacks`).

---

## 3D Vehicle Type Illustrations

> Source: [3D Types](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=16556-196)

### Overview

- **Component name:** `3D Types`
- **Format:** 3D-rendered illustrations (raster PNGs with SVG ground shadows)
- **Aspect ratio:** 2:1 (width ~192px, height ~96px)
- **Total variants:** 12 RV vehicle types

### Props

| Property  | Type     | Default        | Description                  |
|-----------|----------|----------------|------------------------------|
| `type`    | enum     | `Fifth wheel`  | Selects the vehicle type     |
| `shadow`  | boolean  | `true`         | Toggles ground shadow below illustration |

### Vehicle Types

| Type                  | Dimensions     |
|-----------------------|----------------|
| `Fifth wheel`         | 192 x 96px     |
| `Travel trailer`      | 192 x 96px     |
| `Fish house`           | 193 x 96.5px   |
| `Pop-up camper`        | 190 x 95px     |
| `Truck camper`         | 196 x 98px     |
| `Toy hauler`           | 193 x 96.5px   |
| `Class B`              | 193 x 96.5px   |
| `Park model`           | 189 x 94.5px   |
| `Class A`              | 192 x 96px     |
| `Class C`              | 195 x 97.5px   |
| `Teardrop trailer`     | 192 x 96px     |
| `Destination trailer`  | 192 x 96px     |

### Usage Notes

1. **These are illustration assets, not icons.** Used for hero sections, category navigation cards, and vehicle type selectors — not inline with text.
2. **Ground shadow is optional.** Disable `shadow` when placing on colored or textured backgrounds where the shadow ellipse may not blend.
3. **Each illustration is a sprite crop** from a larger 3D-rendered scene. The illustrations are served as raster images (not SVG), so they are not recolorable.
4. **Vehicle types map 1:1 to the RV Trader flat icons** (e.g. `Fifth wheel` 3D illustration corresponds to the `fifth_wheel` icon).

---

## Accordion

> Source: [Accordion](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=230-28910)

### Props

| Property        | Type    | Default   | Description                          |
|-----------------|---------|-----------|--------------------------------------|
| `state`         | enum    | `Closed`  | `Closed`, `Open`, `Disabled`         |
| `topDivider`    | boolean | `false`   | Show divider line above the header   |
| `bottomDivider` | boolean | `true`    | Show divider line below the header   |
| `optional`      | boolean | `false`   | Show "(optional)" label after title  |

### States

| State      | Icon            | Opacity | Behavior                              |
|------------|-----------------|---------|---------------------------------------|
| `Closed`   | `expand_more`   | 100%    | Collapsed, content hidden             |
| `Open`     | `expand_less`   | 100%    | Expanded, content area visible below  |
| `Disabled` | `expand_more`   | 32%     | Non-interactive, visually dimmed      |

### Visual Specs

| Property               | Value                                              |
|------------------------|----------------------------------------------------|
| Item label             | `Label 1 Semibold` — Montserrat SemiBold 16px/22.4px |
| Item label color       | `var(--on-surface)` (`#252526`)                    |
| Optional label         | Montserrat Medium 14px/19.6px, `#6E7072`          |
| Icon size              | 24x24px                                            |
| Gap: label ↔ chevron   | `32px`                                             |
| Gap: label ↔ "(optional)" | `8px`                                           |
| Content gap (open)     | `8px` below header                                 |
| Divider                | 1px solid, full width                              |
| Divider padding        | `8px` top and bottom                               |
| Disabled opacity       | `0.32`                                             |

### Usage Notes

1. **Dividers are optional.** Use `topDivider` and `bottomDivider` to control separator lines when stacking multiple accordions.
2. **Open state provides a content slot** below the header row — content is not part of the component itself.
3. **"(optional)" label** appears inline after the item name in `#6E7072` (On Surface Variant) to indicate non-required fields.

---

## Alerts

> Source: [Alert States](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=16845-482)

### Props

| Property      | Type    | Default          | Description                              |
|---------------|---------|------------------|------------------------------------------|
| `status`      | enum    | `Informational`  | `Informational`, `Success`, `Warning`, `Attention` |
| `description` | boolean | `true`           | Show description text below header       |
| `dismissable` | boolean | `true`           | Show close (X) button on the right       |

### Status Colors

Uses the design system's [Status Colors](#status-colors):

| Status          | Surface (bg)  | Primary (icon/border) | On Surface (text)  |
|-----------------|---------------|-----------------------|--------------------|
| `Informational` | `#EBF1FD`     | `#3870E9` (Blue)      | `#22438C`          |
| `Success`       | `#E7F6ED`     | `#11A94E` (Green)     | `#0A652F`          |
| `Warning`       | `#FEF2CC`     | `#FACA33` (Yellow)    | `#90731D`          |
| `Attention`     | `#FBE9EA`     | `#D8202E` (Red)       | `#82131C`          |

### Configurations

| Configuration                      | Width   | Height | Description        |
|------------------------------------|---------|--------|--------------------|
| Description + dismissable          | ~640px  | 96px   | Full alert         |
| No description + dismissable       | ~434px  | 72px   | Header-only + X    |
| No description + not dismissable   | ~362px  | 60px   | Header-only, no X  |

### Anatomy

```
┌─────────────────────────────────────────────────────────┐
│ ┃  (icon)  Header                                   ✕  │
│ ┃          Description text goes here...                │
└─────────────────────────────────────────────────────────┘
  ↑            ↑        ↑                              ↑
  Left       Status   Title (Label 1 Semibold)     Dismiss
  border     icon     Description (Body 2)          button
  (4px)      (24px)
```

### Visual Specs

| Property              | Value                                                |
|-----------------------|------------------------------------------------------|
| Border radius         | `8px` (`--radius-base`)                              |
| Left accent border    | `4px` wide, status primary color                     |
| Background            | Status surface color                                 |
| Padding               | `16px` all sides                                     |
| Icon                  | 24px circular status icon (status primary color)     |
| Header                | `Label 1 Semibold` — Montserrat SemiBold 16px/22.4px |
| Description           | `Body 2` — Montserrat Regular 14px/19.6px            |
| Dismiss icon          | 24px close (X) icon                                  |
| Gap: icon ↔ text      | `8px`                                                |
| Gap: header ↔ desc    | `4px`                                                |

### Usage Notes

1. **Width is flexible.** The alert stretches to fill its container; the sizes above are from the Figma spec sheet.
2. **Status icons** are filled circles: "i" (info), checkmark (success), triangle-! (warning), circle-! (attention).
3. **Dismiss button** is optional. When hidden, the alert is persistent and must be dismissed programmatically or by navigating away.
4. **Description text** is optional. Without it, the alert is more compact (single-line header only).

---

## Toasts

> Source: [Toasts](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=95-89)

### Overview

Dark-themed notification banners that overlay the UI to confirm actions or surface transient messages.

### Props

| Property      | Type    | Default | Description                              |
|---------------|---------|---------|------------------------------------------|
| `description` | boolean | `true`  | Show description text below heading      |
| `dismissable` | boolean | `true`  | Show circular close (X) button           |
| `hasAction`   | boolean | `false` | Show underlined action link              |

### Configurations

| Configuration         | Height | Layout                                   |
|-----------------------|--------|------------------------------------------|
| With description      | 96px   | Heading + description + optional action  |
| Without description   | 72px   | Single-line heading + optional action    |

### Anatomy

```
┌──────────────────────────────────────────────────────┐
│  Heading here                                  (X)   │
│  Description text goes here...                       │
│  Action                                              │
└──────────────────────────────────────────────────────┘
```

### Visual Specs

| Property                 | Value                                                  |
|--------------------------|--------------------------------------------------------|
| Background               | `var(--secondary)` (`#252526`) — dark                  |
| Text color               | `var(--on-secondary)` (`#FFFFFF`) — white              |
| Max width                | `640px`                                                |
| Border radius            | `8px` (`--radius-base`)                                |
| Padding                  | `16px` all sides                                       |
| Shadow                   | `--shadow-bottom` (`0px 2px 8px 2px rgba(0,0,0,0.07)`)|
| Gap: content ↔ dismiss   | `16px`                                                 |
| Heading                  | `Label 2 Semibold` — Montserrat SemiBold 14px/19.6px  |
| Description              | `Body 2` — Montserrat Regular 14px/19.6px              |
| Action link              | Montserrat Medium 14px/19.6px, white, underlined       |
| Gap: heading ↔ desc      | `4px`                                                  |
| Gap: text block ↔ action | `8px`                                                  |
| Dismiss button           | 40x40px (24px icon + 8px padding), white bg, pill shape (`--radius-full`) |

### Usage Notes

1. **Dark background by default.** Toasts use `--secondary` (`#252526`), not status colors — they are neutral notifications, unlike Alerts which are status-colored.
2. **Action link** is underlined white text. Use for "Undo", "View", or similar quick follow-up actions.
3. **Dismiss button** is a white circular pill containing a 24px close icon. It sits at the top-right when description is present, or vertically centered without description.
4. **Max width is 640px.** Toasts should float above content (typically bottom-center or bottom-left of the viewport).

---

## Trusted Partner Badge

> Source: [Trusted Partner](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=15881-70)

### Overview

Inline badge indicating a dealer's tenure on the marketplace. Displays a star icon followed by a text label in brand green.

### Props

| Property | Type | Default      | Description                  |
|----------|------|--------------|------------------------------|
| `length` | enum | `15+ years`  | `5+ years`, `10+ years`, `15+ years` |

### Variants

| Length       | Label                      | Width   |
|--------------|----------------------------|---------|
| `15+ years`  | "15 year trusted partner"  | ~184px  |
| `10+ years`  | "10 year trusted partner"  | ~186px  |
| `5+ years`   | "5 year trusted partner"   | ~179px  |

### Visual Specs

| Property        | Value                                                  |
|-----------------|--------------------------------------------------------|
| Layout          | Horizontal flex, vertically centered                   |
| Height          | 20px                                                   |
| Gap             | `4px`                                                  |
| Icon            | `award_star`, 20x20px SVG                              |
| Text            | `Label 2` — Montserrat Medium 14px/19.6px              |
| Text color      | `var(--on-surface-brand)` (`#006836`) — brand green    |
| White-space     | `nowrap`                                               |

---

## Tags

> Source: [Tags](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=10973-840)

### Props

| Property      | Type    | Default   | Description                              |
|---------------|---------|-----------|------------------------------------------|
| `type`        | enum    | `Default` | `Default`, `Floating`                    |
| `style`       | enum    | `Neutral` | `Neutral`, `Colored`                     |
| `leadingIcon` | boolean | `false`   | Show 20px icon before label              |

### Variants

| Type + Style              | Background                                 | Text Style | Extra                                       |
|---------------------------|--------------------------------------------|------------|---------------------------------------------|
| **Default + Neutral**     | `var(--surface-variant)` (`#F2F2F2`)       | `Label 3` (Medium 12px/16.8px) | Solid bg, no shadow          |
| **Floating + Neutral**    | `var(--surface-floating)` (`rgba(255,255,255,0.9)`) | `Label 2` (Medium 14px/19.6px) | Drop shadow      |
| **Floating + Colored**    | `var(--surface-floating)` (`rgba(255,255,255,0.9)`) | `Label 2` (Medium 14px/19.6px) | Drop shadow + 2px left border (`#D8202E`) |

### Visual Specs (shared)

| Property              | Value                                              |
|-----------------------|----------------------------------------------------|
| Height                | `28px`                                             |
| Padding               | `4px` vertical, `8px` horizontal                   |
| Border radius         | `4px` (`--radius-sm`)                              |
| Text color            | `var(--on-surface)` (`#252526`)                    |
| Gap (icon ↔ label)    | `4px`                                              |
| Leading icon size     | 20x20px                                            |
| Text overflow         | Ellipsis, `nowrap` (Default type)                  |
| Shadow (Floating)     | `0px 2px 8px 0px rgba(0,0,0,0.07)`                |
| Left border (Colored) | `2px` solid, `--border-heavy`, color `#D8202E`     |

### Usage Notes

1. **Default tags** are for inline metadata (e.g. "New", "Premium") on cards and listings. Uses smaller 12px text and solid gray background.
2. **Floating tags** overlay on images or photos (e.g. "3D Tour", "Video"). Uses semi-transparent white bg with shadow for contrast, and larger 14px text.
3. **Colored variant** adds a 2px left accent border (defaults to red/attention `#D8202E`) to draw extra attention on floating tags.
4. **Leading icon** is optional — use for contextual tags like "3D Tour" (`view_in_ar`) or "Premium" (`diamond`).

---

## Text Buttons

> Source: [Text Buttons](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=103-61)

### Props

| Property       | Type    | Default   | Description                              |
|----------------|---------|-----------|------------------------------------------|
| `type`         | enum    | `Primary` | `Primary`, `Secondary`, `Tertiary`, `Quaternary` |
| `size`         | enum    | `LG`      | `LG`, `SM`                               |
| `state`        | enum    | `Enabled` | `Enabled`, `Hover`, `Disabled`           |
| `disabled`     | boolean | `false`   | Applies 32% opacity                      |
| `leadingIcon`  | boolean | `false`   | Show icon before text                    |
| `trailingIcon` | boolean | `false`   | Show icon after text                     |
| `vehicleName`  | boolean | `false`   | Append vehicle type name to label        |
| `extraText`    | boolean | `false`   | Append extra text segment to label       |

### Size Specs

| Size | Padding (v/h)   | Radius  | Typography                           | Icon Size |
|------|------------------|---------|--------------------------------------|-----------|
| `LG` | `16px` / `32px`  | `8px`   | `Button 1` — SemiBold 16px/22.4px   | 24px      |
| `SM` | `8px` / `16px`   | `4px`   | `Button 2` — SemiBold 14px/19.6px   | 20px      |

### Type Styles — Enabled State

| Type          | Background       | Border                     | Text Color   |
|---------------|------------------|----------------------------|--------------|
| **Primary**   | `#006836` (green)| None                       | `#FFFFFF`    |
| **Secondary** | `#FFFFFF` (white)| `2px` solid `#006836`      | `#006836`    |
| **Tertiary**  | `#FFFFFF` (white)| `1px` solid `#939598`      | `#252526`    |
| **Quaternary**| `#FFFFFF` (white)| None                       | `#252526`    |

### Type Styles — Hover State

| Type          | Background       | Border                     | Text Color   |
|---------------|------------------|----------------------------|--------------|
| **Primary**   | `#FFFFFF` (white)| `2px` solid `#006836`      | `#006836`    |
| **Secondary** | `#006836` (green)| None                       | `#FFFFFF`    |
| **Tertiary**  | `#FFFFFF` (white)| `1px` solid `#252526`      | `#252526`    |
| **Quaternary**| `#F2F2F2` (gray) | None                       | `#252526`    |

### Disabled State

All types retain their Enabled styling but apply `opacity: 0.32`.

### Shared Specs

| Property             | Value                                    |
|----------------------|------------------------------------------|
| Font family          | Montserrat SemiBold                      |
| Gap (icon ↔ text)    | `8px`                                    |
| Gap (text segments)  | `4px`                                    |
| White-space          | `nowrap`                                 |
| Cursor (hover)       | `pointer`                                |

### Usage Notes

1. **Primary and Secondary swap on hover.** Primary becomes outlined, Secondary becomes filled — they are visual inverses of each other.
2. **Tertiary** is the neutral outlined button. Its border darkens from `#939598` to `#252526` on hover.
3. **Quaternary** is the ghost/text button — no border, white background. On hover it gains a subtle `#F2F2F2` fill.
4. **Leading/trailing icons** are optional 24px (LG) or 20px (SM) SVGs with 8px gap from text.
5. **vehicleName and extraText** are composable text slots that append to the main label (e.g. "Search RVs today").

---

## Single Select Card

A selection card used for choosing a single option from a set (e.g. vehicle type selection). Renders as a white card with a subtle shadow.

**Figma node:** `3269:4142`

### Props

| Prop          | Type                       | Default     | Description                      |
|---------------|----------------------------|-------------|----------------------------------|
| `state`       | `"Enabled"` \| `"Hover"`  | `"Enabled"` | Visual state of the card         |
| `description` | `boolean`                  | `true`      | Show description text below heading |
| `iconTop`     | `boolean`                  | `true`      | Show a 20px icon above the heading |

### Visual Specs

| Property         | Value                                              |
|------------------|----------------------------------------------------|
| Width            | `326px`                                            |
| Background       | `var(--colors/surface/surface)` → `white`          |
| Padding          | `16px` (`var(--16px)`)                             |
| Border radius    | `8px` (`var(--8px)`)                               |
| Shadow           | `0px 2px 8px 0px rgba(0,0,0,0.07)` (Shadow/Bottom)|
| Gap (items)      | `4px` (`var(--4px)`)                               |
| Gap (icon ↔ content) | `8px` (`var(--8px)`)                           |

### States

#### Enabled (default)

Standard card with white background, shadow, and no border.

#### Hover

Adds a `1px solid var(--colors/border/border-low)` → `#E4E4E5` border around the card.

### Typography

| Element      | Style                  | Size / Line-height | Color                                              |
|--------------|------------------------|--------------------|-----------------------------------------------------|
| Heading      | Label 1 Semibold       | `16px` / `22.4px`  | `var(--colors/surface/on-surface)` → `#252526`      |
| Description  | Label 2 Medium         | `14px` / `19.6px`  | `var(--colors/surface/on-surface-variant)` → `#6E7072` |

### Optional Icon

When `iconTop` is true, a `20px × 20px` icon renders above the heading (e.g. `ViewInAr` / 3D icon). The icon sits in its own row with `8px` gap to the text content below.

---

## Radio Card

A bordered selection card used for radio-style single selection (e.g. choosing a category or option). Similar to Single Select Card but uses border weight to communicate state rather than shadow/border toggle.

**Figma node:** `3663:25`

### Props

| Prop          | Type                                      | Default     | Description                        |
|---------------|-------------------------------------------|-------------|------------------------------------|
| `state`       | `"Default"` \| `"Hover"` \| `"Selected"` | `"Default"` | Visual state of the card           |
| `description` | `boolean`                                 | `true`      | Show description text below heading |
| `iconTop`     | `boolean`                                 | `false`     | Show a 24px icon above the heading  |

### Visual Specs

| Property         | Value                                         |
|------------------|-----------------------------------------------|
| Width            | `326px`                                       |
| Background       | `var(--colors/surface/surface)` → `white`     |
| Padding          | `16px` (`var(--16px)`)                        |
| Border radius    | `8px` (`var(--8px)`)                          |
| Gap (content)    | `4px` (`var(--4px)`)                          |
| Layout           | Vertical flex column                          |

### States

#### Default

Border: `1px solid var(--colors/border/border-low)` → `#E4E4E5`

#### Hover

Border: `1px solid var(--colors/border/border)` → `#939598`

#### Selected

Border: `2px solid var(--colors/border/border-high)` → `#252526`

### Typography

| Element      | Style                  | Size / Line-height | Color                                              |
|--------------|------------------------|--------------------|-----------------------------------------------------|
| Heading      | Label 1 Semibold       | `16px` / `22.4px`  | `var(--colors/surface/on-surface)` → `#252526`      |
| Description  | Label 2 Medium         | `14px` / `19.6px`  | `var(--colors/surface/on-surface-variant)` → `#6E7072` |

### Optional Icon

When `iconTop` is true, a `24px × 24px` icon renders above the heading. The icon sits in its own row within the vertical layout.

### Single Select vs Radio Card

| Feature       | Single Select Card        | Radio Card                        |
|---------------|---------------------------|-----------------------------------|
| Default border| None (shadow only)        | `1px solid #E4E4E5`              |
| Hover         | Adds `1px #E4E4E5` border | Border darkens to `1px #939598`  |
| Selected      | N/A                       | Border thickens to `2px #252526` |
| Shadow        | Yes (Bottom)              | No                                |
| Icon size     | `20px`                    | `24px`                            |
| `iconTop` default | `true`               | `false`                           |

---

## On Page Carousel Indicators

A header row with optional pagination text and circular prev/next arrow buttons, used above on-page carousels (e.g. "More RVs near you").

**Figma node:** `11371:3812`

### Props

| Prop          | Type                                | Default        | Description                              |
|---------------|-------------------------------------|----------------|------------------------------------------|
| `headerSize`  | `"Headline 1"` \| `"Headline 2"`   | `"Headline 1"` | Controls heading font size               |
| `hasHeader`   | `boolean`                           | `true`         | Show the heading text                    |
| `vehicleName` | `boolean`                           | `true`         | Show vehicle-type text segment (e.g. "RVs") |
| `extraText`   | `boolean`                           | `true`         | Show trailing text segment (e.g. "near you") |
| `pagination`  | `boolean`                           | `true`         | Show page indicator (e.g. "1 / 3")       |

### Layout

```
[ Header text (flex-grow)         32px gap   Pagination   32px gap   [←] 16px [→] ]
```

- Horizontal flex, `align-items: center`
- Gap between header and navigation: `32px` (`var(--32px)`)
- Width: `485px`

### Header Text

Composable text segments separated by `4px` (`var(--4px)`) gap:
- Static label (always shown when `hasHeader`): e.g. "More"
- `vehicleName` slot: e.g. "RVs"
- `extraText` slot: e.g. "near you"

| Header Size | Style            | Font Size / Line-height | Weight |
|-------------|------------------|-------------------------|--------|
| Headline 1  | Headline 1 Bold  | `24px` / `33.6px`       | 700    |
| Headline 2  | Headline 2 Bold  | `20px` / `28px`         | 700    |

Color: `var(--colors/surface/on-surface)` → `#252526`

### Pagination Text

- Style: Body 1 Regular — `16px` / `22.4px`, weight 400
- Color: `var(--colors/surface/on-surface)` → `#252526`
- Format: `"1 / 3"` (current / total)

### Arrow Buttons (Icon Only)

Circular icon-only buttons for prev/next navigation.

| Property       | Value                                              |
|----------------|----------------------------------------------------|
| Background     | `var(--colors/surface/surface)` → `white`          |
| Border         | `1px solid var(--colors/border/border)` → `#939598`|
| Padding        | `8px` (`var(--8px)`)                               |
| Border radius  | `100px` (`var(--100px)`) — fully circular          |
| Icon size      | `24px` (chevron_left / chevron_right)              |
| Gap between    | `16px` (`var(--16px)`)                             |
| Disabled state | `opacity: 0.32` (e.g. left arrow at first page)   |

---

## Checkbox

A checkbox input with label, optional count number, and optional indent for nested lists.

**Figma node:** `106:288` (component) / `8:5` (page)

### Props

| Prop        | Type                                                          | Default       | Description                                  |
|-------------|---------------------------------------------------------------|---------------|----------------------------------------------|
| `state`     | `"Unchecked"` \| `"Checked"` \| `"Multiselect"` \| `"Disabled"` | `"Unchecked"` | Visual and functional state                  |
| `hasNumber` | `boolean`                                                     | `false`       | Show a count suffix, e.g. "(1200)"           |
| `indent`    | `boolean`                                                     | `false`       | Add 24px left spacer for nested hierarchy    |

### Layout

```
[ (indent spacer?) ] [ □ ]  8px  [ Label text ]  [ (1200) ]
```

- Horizontal flex, `align-items: start`
- Gap: `8px` (`var(--8px)`) between checkbox box and label
- Default width: `255px`
- Element: `<button>` (Unchecked, Checked, Disabled) or `<div>` (Multiselect)

### Checkbox Box (`24px × 24px`)

| State        | Background                                         | Border                                               | Icon                         |
|--------------|-----------------------------------------------------|------------------------------------------------------|------------------------------|
| Unchecked    | `var(--colors/surface/surface)` → `white`          | `1px solid var(--colors/border/border)` → `#939598`  | check (hidden, `opacity: 0`) |
| Checked      | `var(--colors/secondary/secondary)` → `#252526`    | None                                                 | check (white, 20px)          |
| Multiselect  | `var(--colors/secondary/secondary)` → `#252526`    | None                                                 | remove / minus (white, 20px) |
| Disabled     | `var(--colors/surface/surface)` → `white`          | `1px solid var(--colors/border/border)` → `#939598`  | check (hidden, `opacity: 0`) |

- Border radius: `4px` (`var(--4)`)
- Padding (filled states): `4px` (`var(--4px)`)

### Disabled State

Entire component renders at `opacity: 0.32`.

### Typography

| Element    | Style              | Size / Line-height | Color                                              |
|------------|--------------------|--------------------|-----------------------------------------------------|
| Label      | Body 1 Regular     | `16px` / `22.4px`  | `var(--colors/surface/on-surface)` → `#252526`      |
| Number     | Body 1 Medium      | `16px` / `22.4px`  | `#6E7072`                                           |

- Label: `white-space: pre-wrap` (supports multi-line wrapping)
- Number: `white-space: nowrap`, format `"(1200)"`

### Indent

When `indent` is true, a `24px`-wide invisible spacer (`opacity: 0`) is inserted before the checkbox box, creating a visual indent for sub-items in a list.

### Usage Guidelines

**Use checkboxes for:**
- Selecting one or more choices from a list
- Lists containing sub-selections
- Standalone "yes/no" toggle (single checkbox)

**Do not use for:**
- Single-choice lists → use **Radio** buttons instead
- Immediate-effect toggles → use **Switch** instead

---

## Selectable (Single & Multi-select)

A pill-shaped chip/toggle used for filtering or category selection. Can be used in single-select or multi-select contexts.

**Figma node:** `3265:1937`

### Props

| Prop               | Type                                              | Default     | Description                                        |
|--------------------|---------------------------------------------------|-------------|----------------------------------------------------|
| `state`            | `"Enabled"` \| `"Hover"` \| `"Selected/Active"`  | `"Enabled"` | Visual state                                       |
| `leadingIcon`      | `boolean`                                         | `false`     | Show a 20px leading icon (e.g. "tune" filter icon) |
| `numericIndicator` | `boolean`                                         | `false`     | Show count suffix like "(4)" — only in Selected    |

### Visual Specs

| Property       | Value                                              |
|----------------|----------------------------------------------------|
| Border radius  | `100px` (`var(--100px)`) — fully rounded pill       |
| Padding        | `8px 16px` (vertical / horizontal)                 |
| Gap            | `8px` (`var(--8px)`) between icon and text          |
| Text style     | Label 2 Medium — `14px` / `19.6px`, weight 500     |
| White-space    | `nowrap`                                            |

### States

| State           | Background                                            | Border                                                | Text Color                                          |
|-----------------|-------------------------------------------------------|-------------------------------------------------------|-----------------------------------------------------|
| Enabled         | `var(--colors/surface/surface-variant)` → `#F2F2F2`  | None                                                  | `var(--colors/surface/on-surface)` → `#252526`      |
| Hover           | `var(--colors/surface/surface-variant)` → `#F2F2F2`  | `1px solid var(--colors/border/border)` → `#939598`   | `var(--colors/surface/on-surface)` → `#252526`      |
| Selected/Active | `var(--colors/secondary/secondary)` → `#252526`      | None                                                  | `var(--colors/secondary/on-secondary)` → `white`    |

### Numeric Indicator

Only visible in the **Selected/Active** state. Renders next to the label text with `4px` gap. Format: `"(4)"`. Color: `white`.

---

## Chip — Input

A dismissible pill chip representing a user's active filter or input selection. Always includes a trailing close (×) icon.

**Figma node:** `3265:1904` (part of Chips page `8:10`)

### Props

| Prop    | Type                          | Default     | Description  |
|---------|-------------------------------|-------------|--------------|
| `state` | `"Enabled"` \| `"Hover"`     | `"Enabled"` | Visual state |

### Visual Specs

| Property       | Value                                                    |
|----------------|----------------------------------------------------------|
| Border radius  | `100px` (`var(--100px)`) — fully rounded pill            |
| Padding        | `8px 16px` (vertical / horizontal)                       |
| Gap            | `8px` (`var(--8px)`) between text and close icon         |
| Background     | `var(--colors/surface/surface-variant)` → `#F2F2F2`     |
| Text style     | Label 2 Medium — `14px` / `19.6px`, weight 500          |
| Text color     | `var(--colors/surface/on-surface)` → `#252526`           |
| Trailing icon  | `close` (×), `20px`                                     |

### States

| State   | Border                                                      |
|---------|-------------------------------------------------------------|
| Enabled | `1px solid var(--colors/border/border-high)` → `#252526`   |
| Hover   | `1px solid var(--colors/border/border)` → `#939598`         |

### Notes

The Input chip always shows a dark border by default (indicating an active selection) and the border lightens on hover. The trailing close icon allows the user to remove/dismiss the chip.

---

## Chip — Action

An interactive pill chip that triggers an action (e.g. search). Includes a leading icon.

**Figma node:** `106:2819` (part of Chips page `8:10`)

### Props

| Prop    | Type                                  | Default     | Description  |
|---------|---------------------------------------|-------------|--------------|
| `state` | `"Enabled"` \| `"Hover/Pressed"`     | `"Enabled"` | Visual state |

### Visual Specs

| Property       | Value                                              |
|----------------|----------------------------------------------------|
| Border radius  | `100px` (`var(--100px)`) — fully rounded pill      |
| Padding        | `8px 16px` (vertical / horizontal)                 |
| Gap            | `8px` (`var(--8px)`) between icon and text         |
| Text style     | Label 2 Medium — `14px` / `19.6px`, weight 500    |
| Text color     | `var(--colors/surface/on-surface)` → `#252526`     |
| Leading icon   | `search`, `20px`                                   |

### States

| State          | Background                                            | Border                                                   |
|----------------|-------------------------------------------------------|----------------------------------------------------------|
| Enabled        | `var(--colors/surface/surface)` → `white`             | `1px solid var(--colors/border/border)` → `#939598`      |
| Hover/Pressed  | `var(--colors/surface/surface-variant)` → `#F2F2F2`  | `1px solid var(--colors/border/border-high)` → `#252526` |

---

### Chips Summary

All three chip types share: pill shape (`100px` radius), `8px 16px` padding, `8px` gap, Label 2 Medium text (`14px`).

| Chip Type   | Default Background | Default Border | Has Icon         | Dismissible |
|-------------|-------------------|----------------|------------------|-------------|
| Selectable  | `#F2F2F2`         | None           | Optional leading | No          |
| Input       | `#F2F2F2`         | `#252526`      | Trailing close   | Yes         |
| Action      | `white`           | `#939598`      | Leading (search) | No          |

---

## Divider

A simple horizontal rule used to separate content sections.

**Figma node:** `96:189` (page `8:7`)

### Visual Specs

| Property         | Value                                          |
|------------------|-------------------------------------------------|
| Line height      | `1px`                                           |
| Vertical padding | `8px` top and bottom (`var(--8px)`)             |
| Total height     | `16px` (1px line + 8px padding each side)       |
| Width            | Stretches to fill container (`flex: 1 0 0`)     |
| Color            | `var(--colors/border/border-low)` → `#E4E4E5`  |

### Usage

No props beyond `className`. The divider is a full-width `1px` horizontal line centered within `8px` vertical padding. It grows to fill its parent container width.

---

## Drop-down (Select)

A select input with floating label, optional prefix/suffix, and supporting text. Follows the same input field pattern as text inputs.

**Figma node:** `96:225`

### Props

| Prop             | Type                                        | Default     | Description                               |
|------------------|---------------------------------------------|-------------|-------------------------------------------|
| `state`          | `"Enabled"` \| `"Active"` \| `"Disabled"`  | `"Enabled"` | Visual/interaction state                  |
| `populated`      | `boolean`                                   | `false`     | Whether a value has been selected          |
| `label`          | `boolean`                                   | `true`      | Show label text                            |
| `required`       | `boolean`                                   | `false`     | Show asterisk (*) after label              |
| `prefix`         | `boolean`                                   | `false`     | Show prefix text (e.g. "$")                |
| `suffix`         | `boolean`                                   | `false`     | Show suffix text (e.g. "lbs")              |
| `supportingText` | `boolean`                                   | `false`     | Show helper text below the input           |

### Visual Specs

| Property       | Value                                          |
|----------------|-------------------------------------------------|
| Width          | `364px`                                         |
| Height         | `58px` (input box, fixed)                       |
| Background     | `var(--colors/surface/surface)` → `white`       |
| Border radius  | `8px` (`var(--8)`)                              |
| Horizontal pad | `16px`                                          |
| Outer gap      | `4px` (`var(--4px)`) between input and supporting text |

### States × Populated

| Combination         | Border                                                    | Vertical Padding | Inner Gap | Icon           |
|---------------------|-----------------------------------------------------------|------------------|-----------|----------------|
| Not populated + Enabled  | `1px solid var(--colors/border/border)` → `#939598`  | `16px`           | `8px`     | expand_more ▼  |
| Not populated + Active   | `2px solid var(--colors/border/border-high)` → `#252526` | `16px`      | `8px`     | expand_less ▲  |
| Not populated + Disabled | `1px solid var(--colors/border/border)` → `#939598`  | `16px`           | `8px`     | expand_more ▼  |
| Populated + Enabled      | `1px solid var(--colors/border/border)` → `#939598`  | `8px`            | `16px`    | expand_more ▼  |
| Populated + Active       | `2px solid var(--colors/border/border-high)` → `#252526` | `8px`       | `16px`    | expand_less ▲  |
| Populated + Disabled     | `1px solid var(--colors/border/border)` → `#939598`  | `8px`            | `16px`    | expand_more ▼  |

### Floating Label Behavior

- **Not populated:** Label displays inline at `16px` as placeholder text (Label 1 Medium)
- **Populated:** Label floats to top at `12px` (Label 3 Medium), user input shows below at `16px`

### Disabled State

Entire component renders at `opacity: 0.32`.

### Typography

| Element          | Style            | Size / Line-height | Color                                              |
|------------------|------------------|--------------------|-----------------------------------------------------|
| Label (placeholder) | Label 1 Medium | `16px` / `22.4px`  | `var(--colors/surface/on-surface-variant)` → `#6E7072` |
| Label (floating)    | Label 3 Medium | `12px` / `16.8px`  | `var(--colors/surface/on-surface-variant)` → `#6E7072` |
| User input       | Body 1 Regular   | `16px` / `22.4px`  | `var(--colors/surface/on-surface)` → `#252526`      |
| Prefix / Suffix  | Body 1 Regular   | `16px` / `22.4px`  | `#6E7072`                                           |
| Supporting text  | Label 3 Medium   | `12px` / `18px`    | `#252526`                                           |
| Required (*)     | Inherits label   | Inherits           | `#6E7072`                                           |

### Icons

- **Enabled / Disabled:** `expand_more` (chevron down), `24px`
- **Active:** `expand_less` (chevron up), `24px`

---

## Text Input — Single Line

A single-line text input field with floating label, optional icons, prefix/suffix, and error states. Shares the same structural pattern as the Drop-down component.

**Figma node:** `96:721`

### Props

| Prop             | Type                                        | Default     | Description                               |
|------------------|---------------------------------------------|-------------|-------------------------------------------|
| `state`          | `"Enabled"` \| `"Active"` \| `"Disabled"`  | `"Enabled"` | Visual/interaction state                  |
| `populated`      | `boolean`                                   | `false`     | Whether user has entered text              |
| `error`          | `boolean`                                   | `false`     | Whether in error/validation state          |
| `label`          | `boolean`                                   | `true`      | Show label text                            |
| `required`       | `boolean`                                   | `false`     | Show asterisk (*) after label              |
| `prefix`         | `boolean`                                   | `false`     | Show prefix text (e.g. "$")                |
| `suffix`         | `boolean`                                   | `false`     | Show suffix text (e.g. "lbs")              |
| `leadingIcon`    | `boolean`                                   | `false`     | Show search icon (20px) on the left        |
| `trailingIcon`   | `boolean`                                   | `false`     | Show close/clear icon (20px) on the right  |
| `supportingText` | `boolean`                                   | `false`     | Show helper text below the input           |

### Visual Specs

| Property       | Value                                          |
|----------------|-------------------------------------------------|
| Width          | `364px`                                         |
| Height         | `58px` (input box, fixed)                       |
| Border radius  | `8px` (`var(--8)`)                              |
| Horizontal pad | `16px`                                          |
| Inner gap      | `8px` (`var(--8px)`)                            |
| Outer gap      | `4px` (`var(--4px)`) between input and helper text |

### Normal States (error=false)

| State    | Background                                    | Border                                                    |
|----------|-----------------------------------------------|-----------------------------------------------------------|
| Enabled  | `var(--colors/surface/surface)` → `white`     | `1px solid var(--colors/border/border)` → `#939598`       |
| Active   | `var(--colors/surface/surface)` → `white`     | `2px solid var(--colors/border/border-high)` → `#252526`  |
| Disabled | `var(--colors/surface/surface)` → `white`     | `1px solid var(--colors/border/border)` → `#939598`       |

Disabled applies `opacity: 0.32` to the entire component.

### Error States (error=true)

| State          | Background                                   | Border                                            |
|----------------|----------------------------------------------|---------------------------------------------------|
| Enabled+Error  | `var(--color/surface)` → `#FBE9EA`           | `1px solid var(--color/border)` → `#D8202E`       |
| Active+Error   | `var(--color/surface)` → `#FBE9EA`           | `2px solid var(--color/border)` → `#D8202E`       |

Error state changes:
- Background tints to light red `#FBE9EA`
- Border turns red `#D8202E`
- Label color turns red `#D8202E`
- Prefix/Suffix color turns `#C13D3D`
- Error message appears below: `error` icon (20px) + text in `#D8202E` (Label 3 Medium, `12px`/`16.8px`)
- `supportingText` is replaced by the error message when `error=true`

### Floating Label Behavior

- **Not populated + Enabled/Disabled:** Label displays inline at `16px` as placeholder (Label 1 Medium)
- **Not populated + Active:** Label floats to `12px` at top, cursor appears in input area
- **Populated:** Label floats to `12px` at top, user input displays at `16px`

### Typography

Same as Drop-down — see [Drop-down Typography](#typography-8) above.

In error state:
| Element          | Color                    |
|------------------|--------------------------|
| Label            | `#D8202E`                |
| Required (*)     | `#C13D3D`                |
| Prefix / Suffix  | `#C13D3D`                |
| Error text       | `#D8202E`                |
| User input       | `#252526` (unchanged)    |

### Icons

- **Leading:** `search`, `20px` — optional
- **Trailing:** `close`, `20px` — optional (typically used for clearing input)

### Active State Cursor

In the Active state, a vertical text cursor (blinking line) appears after the user input or at the start of the input area when empty.

---

## Text Input — Multi-line

A multi-line textarea input with floating label, optional formatting toolbar, and error states. Shares the same visual language as the Single Line input but is taller and supports multi-line content.

**Figma node:** `96:519`

### Props

| Prop             | Type                              | Default     | Description                                |
|------------------|-----------------------------------|-------------|--------------------------------------------|
| `state`          | `"Enabled"` \| `"Active"`        | `"Enabled"` | Visual/interaction state (no Disabled)     |
| `populated`      | `boolean`                         | `false`     | Whether user has entered text               |
| `error`          | `boolean`                         | `false`     | Whether in error/validation state           |
| `label`          | `boolean`                         | `true`      | Show label text                             |
| `required`       | `boolean`                         | `true`      | Show asterisk (*) after label               |
| `formattingBar`  | `boolean`                         | `false`     | Show formatting toolbar at bottom           |
| `supportingText` | `boolean`                         | `false`     | Show helper text below the input            |

### Visual Specs

| Property       | Value                                          |
|----------------|-------------------------------------------------|
| Width          | `364px`                                         |
| Height         | `150px` (fixed)                                 |
| Border radius  | `8px` (`var(--8)`)                              |
| Padding        | `8px 16px` (vertical / horizontal)              |
| Overflow       | `clip`                                          |
| Outer gap      | `4px` (`var(--4px)`) between textarea and helper |

### States

| Combination    | Background                                    | Border                                                    |
|----------------|-----------------------------------------------|-----------------------------------------------------------|
| Enabled        | `var(--colors/surface/surface)` → `white`     | `1px solid var(--colors/border/border)` → `#939598`       |
| Active         | `var(--colors/surface/surface)` → `white`     | `2px solid var(--colors/border/border-high)` → `#252526`  |
| Enabled+Error  | `var(--color/surface)` → `#FBE9EA`            | `1px solid var(--color/border)` → `#D8202E`               |
| Active+Error   | `var(--color/surface)` → `#FBE9EA`            | `2px solid var(--color/border)` → `#D8202E`               |

### Resize Handle

A `14px × 14px` drag handle icon positioned absolutely at the bottom-right corner of the textarea. Present in all states.

### Formatting Bar

When `formattingBar=true`, a toolbar appears at the bottom of the textarea area containing:
- Circular icon-only button: white background, `100px` border-radius, `8px` padding
- "AI description" icon: `22px`

### Differences from Single Line

| Feature          | Single Line        | Multi-line          |
|------------------|--------------------|---------------------|
| Height           | `58px`             | `150px`             |
| Leading icon     | Optional (search)  | None                |
| Trailing icon    | Optional (close)   | None                |
| Prefix / Suffix  | Optional           | None                |
| Disabled state   | Yes                | No                  |
| Formatting bar   | No                 | Optional            |
| Resize handle    | No                 | Yes (14px)          |
| `required` default | `false`          | `true`              |

### Typography & Error States

Same as Single Line — floating label, error colors, and error message pattern are identical.

---

## Indicator

Small notification badges used to signal counts or unread status. Two types: Numeric (with count) and Dot (presence only).

**Figma node:** `264:17883` (page) / `264:17884` (Numeric) / `264:17887` (Dot)

### Indicator — Numeric

A red badge displaying a number, used for notification counts.

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Background     | `var(--color/primary)` → `#D8202E`                          |
| Border radius  | `100px` — fully rounded (circle or pill)                     |
| Text style     | Label 3 Medium — `12px` / `16.8px`, weight 500              |
| Text color     | `var(--colors/surface/on-surface-inverse)` → `white`         |

**Props:**

| Prop      | Type                        | Default    | Description                     |
|-----------|-----------------------------|------------|---------------------------------|
| `numbers` | `"Single"` \| `"Multi"`    | `"Single"` | Single or multi-digit display   |

**Variants:**

| Variant | Size                             | Notes                                  |
|---------|----------------------------------|----------------------------------------|
| Single  | `18px × 18px` (fixed circle)    | Centered single digit (e.g. "8")       |
| Multi   | `18px` height, `8px` h-padding  | Pill shape, auto width (e.g. "24")     |

Multi-digit variant applies `transform: translateX(-50%)` for centering relative to its anchor.

### Indicator — Dot

A small red circle indicating unread/new status, with no text content.

| Property       | Value                                          |
|----------------|-------------------------------------------------|
| Size           | `10px × 10px`                                  |
| Background     | `var(--color/primary)` → `#D8202E`             |
| Border         | `1px solid var(--gray/100)` → `white`           |
| Border radius  | `100px` (circle)                                |

No props beyond `className`. The white border creates separation when overlaid on dark or colored backgrounds.

---

## Default Link

An inline text link with optional leading/trailing icons.

**Figma node:** `10945:1555`

### Props

| Prop           | Type                          | Default     | Description                     |
|----------------|-------------------------------|-------------|---------------------------------|
| `state`        | `"Default"` \| `"Hover"`     | `"Default"` | Visual state                    |
| `leadingIcon`  | `boolean`                     | `false`     | Show 20px icon before text      |
| `trailingIcon` | `boolean`                     | `false`     | Show 20px icon after text       |

### Visual Specs

| Property       | Value                                              |
|----------------|----------------------------------------------------|
| Layout         | Horizontal flex, `items-center`, `justify-center`  |
| Gap            | `4px` (`var(--4px)`)                               |
| Text style     | Link 1 — Montserrat Medium, `16px` / `22.4px`     |
| Text color     | `var(--colors/surface/on-surface)` → `#252526`     |
| Icon size      | `20px`                                             |

### States

| State   | Text Decoration                |
|---------|--------------------------------|
| Default | `underline solid`              |
| Hover   | None (underline removed)       |

---

## Subtle Link

A quieter inline text link that reveals its underline and icons only on hover. The inverse behavior of Default Link.

**Figma node:** `10946:1571`

### Props

| Prop           | Type                          | Default     | Description                              |
|----------------|-------------------------------|-------------|------------------------------------------|
| `state`        | `"Default"` \| `"Hover"`     | `"Default"` | Visual state                             |
| `leadingIcon`  | `boolean`                     | `false`     | Show 20px icon before text (hover only)  |
| `trailingIcon` | `boolean`                     | `false`     | Show 20px icon after text (hover only)   |

### Visual Specs

| Property       | Value                                              |
|----------------|----------------------------------------------------|
| Layout         | Horizontal flex, `items-center`, `justify-center`  |
| Gap            | `4px` (`var(--4px)`) — active on hover only        |
| Text style     | Body 2 — Montserrat Regular, `14px` / `19.6px`    |
| Text color     | `var(--colors/surface/on-surface)` → `#252526`     |
| Icon size      | `20px`                                             |

### States

| State   | Text Decoration    | Icons Visible |
|---------|--------------------|---------------|
| Default | None               | No            |
| Hover   | `underline solid`  | Yes           |

### Default Link vs Subtle Link

| Feature          | Default Link                      | Subtle Link                       |
|------------------|-----------------------------------|-----------------------------------|
| Text style       | Link 1 Medium, `16px`            | Body 2 Regular, `14px`           |
| Default state    | Underlined                        | No underline, no icons            |
| Hover state      | Underline removed                 | Underline appears, icons appear   |
| Icons visibility | Always (when enabled)             | Hover only                        |

---

## Popover

A floating card used for tooltips, contextual info, or supplementary content anchored to a trigger element.

**Figma node:** `4403:523`

### Props

| Prop        | Type       | Default | Description                          |
|-------------|------------|---------|--------------------------------------|
| `hasAction` | `boolean`  | `false` | Show an underlined action link below |

### Visual Specs

| Property       | Value                                                  |
|----------------|--------------------------------------------------------|
| Width          | `256px` (also `max-width`)                             |
| Background     | `var(--colors/surface/surface)` → `white`              |
| Border         | `1px solid var(--colors/border/border-low)` → `#E4E4E5`|
| Border radius  | `8px` (`var(--8px)`)                                   |
| Padding        | `16px` (`var(--16px)`)                                 |
| Gap            | `16px` (`var(--16px)`) between body and action         |
| Shadow         | `0px 2px 8px 0px rgba(0,0,0,0.07)` (Shadow/Bottom)   |

### Typography

| Element  | Style              | Size / Line-height | Color                                          | Decoration       |
|----------|--------------------|--------------------|------------------------------------------------|------------------|
| Body     | Body 2 Regular     | `14px` / `19.6px`  | `var(--colors/surface/on-surface)` → `#252526` | None             |
| Action   | Body 2 Medium      | `14px` / `19.6px`  | `#252526`                                      | `underline solid`|

Body text wraps (`white-space: pre-wrap`) and overflows with `text-overflow: ellipsis`.

---

## Rating

A segmented score bar (1–10) with optional title, rating fraction, and description. Used for dealer/product ratings.

**Figma node:** `6512:12`

### Props

| Prop          | Type                                                           | Default | Description                        |
|---------------|----------------------------------------------------------------|---------|------------------------------------|
| `score`       | `"1"` \| `"2"` \| `"3"` \| … \| `"10"`                       | `"1"`   | Number of filled segments (1–10)   |
| `showTitle`   | `boolean`                                                      | `true`  | Show the title text                |
| `showRating`  | `boolean`                                                      | `true`  | Show the "X/10" fraction text      |
| `description` | `boolean`                                                      | `false` | Show description text below title  |

### Layout

```
[ Title (flex-grow)         16px gap         X/10 (right-aligned) ]
[ Description text (optional, full width)                         ]
[ ◄ Score bar: 10 overlapping segments ►                          ]
```

- Width: `322px`
- Vertical flex column, gap: `8px` (`var(--8px)`)

### Score Bar

A horizontal row of 10 overlapping SVG segments that fill progressively from left to right based on `score`.

| Property       | Value                                          |
|----------------|-------------------------------------------------|
| Height         | `28px`                                          |
| Segment layout | `flex: 1 0 0`, `margin-right: -8px` (overlap)  |
| Right padding  | `8px` on container                              |
| Last segment   | Rotated `180deg` (mirrored cap)                 |

Each segment is a shaped SVG (pointed/chevron rectangles) that changes from unfilled to filled as the score increases. The bar uses a multi-color gradient progression across the 10 segments.

### Typography

| Element     | Style              | Size / Line-height | Color                                              | Alignment |
|-------------|--------------------|--------------------|-----------------------------------------------------|-----------|
| Title       | Label 2 Medium     | `14px` / `19.6px`  | `var(--colors/surface/on-surface)` → `#252526`      | Left      |
| Rating      | Label 3 Medium     | `12px` / `16.8px`  | `var(--colors/surface/on-surface-variant)` → `#6E7072` | Right  |
| Description | Body 2 Regular     | `14px` / `19.6px`  | `#252526`                                           | Left      |

Rating format: `"X/10"` (e.g. "7/10").

---

## Radio Button

A radio input with label and optional count number. Used for single-choice selection from a list.

**Figma node:** `106:1944` (component) / `8:6` (page)

### Props

| Prop        | Type                                      | Default   | Description                          |
|-------------|-------------------------------------------|-----------|--------------------------------------|
| `state`     | `"False"` \| `"True"` \| `"Disabled"`    | `"False"` | Selection and visual state           |
| `hasNumber` | `boolean`                                 | `false`   | Show a count suffix, e.g. "(1200)"   |

### Layout

```
[ ○ ]  8px  [ Label text ]  [ (1200) ]
```

- Element: `<button>`
- Horizontal flex, gap: `8px` (`var(--8px)`), `items-center`

### Radio Circle (`24px × 24px`)

| State    | Border                                                     | Fill                                                | Inner Dot |
|----------|------------------------------------------------------------|-----------------------------------------------------|-----------|
| False    | `1px solid var(--colors/border/border)` → `#939598`        | None                                                | Hidden (`opacity: 0`) |
| True     | `1px solid var(--colors/secondary/secondary)` → `#252526`  | None                                                | `16px` filled circle, `#252526` |
| Disabled | `1px solid var(--colors/border/border)` → `#939598`        | None                                                | Hidden (`opacity: 0`) |

- Border radius: `100px` (circle)
- Padding: `4px` (`var(--4px)`)
- Unselected circle has `opacity: 0.8`
- True state: inner dot is `16px × 16px`, absolutely centered, `border-radius: 100px`, `var(--colors/secondary/secondary)` → `#252526`

### Disabled State

Entire component renders at `opacity: 0.32`.

### Typography

| Element    | Style              | Size / Line-height | Color                                          |
|------------|--------------------|--------------------|------------------------------------------------|
| Label      | Body 1 Regular     | `16px` / `22.4px`  | `var(--colors/surface/on-surface)` → `#252526` |
| Number     | Body 1 Medium      | `16px` / `22.4px`  | `#6E7072`                                      |

### Checkbox vs Radio Button

| Feature        | Checkbox                  | Radio Button                |
|----------------|---------------------------|-----------------------------|
| Shape          | `4px` rounded square      | `100px` circle              |
| Selected fill  | Solid `#252526` + check   | `#252526` border + 16px dot |
| Indeterminate  | Yes (Multiselect/minus)   | No                          |
| Indent option  | Yes                       | No                          |
| Use case       | Multi-select              | Single-select               |

---

## Switch

A toggle switch for binary on/off settings with immediate effect.

**Figma node:** `106:1966`

### Props

| Prop       | Type       | Default | Description                    |
|------------|------------|---------|--------------------------------|
| `on`       | `boolean`  | `false` | Whether the switch is on       |
| `disabled` | `boolean`  | `false` | Whether the switch is disabled |

### Visual Specs

| Property       | Value                                |
|----------------|--------------------------------------|
| Width          | `64px`                               |
| Height         | `32px`                               |
| Border radius  | `100px` (fully rounded pill)         |
| Padding        | `4px` (`var(--4px)`)                 |
| Thumb size     | `24px` (off) / `24px` with icon (on) |

### States

| State          | Track Background                                       | Track Border                                           | Thumb                                                    |
|----------------|--------------------------------------------------------|--------------------------------------------------------|----------------------------------------------------------|
| Off            | `var(--colors/surface/surface)` → `white`              | `1px solid var(--colors/border/border)` → `#939598`    | Grey circle (`24px`), aligned left                       |
| Off + Disabled | `var(--colors/surface/surface-variant)` → `#F2F2F2`   | `1px solid var(--colors/border/border)` → `#939598`    | Grey circle (`24px`), aligned left, `opacity: 0.32`      |
| On             | `var(--colors/secondary/secondary)` → `#252526`        | None                                                   | White circle with check icon + shadow, aligned right     |
| On + Disabled  | `var(--colors/secondary/secondary)` → `#252526`        | None                                                   | White circle with check icon + shadow, `opacity: 0.32`   |

### Thumb Details

- **Off:** Plain grey circle SVG, `24px`, positioned with `padding-left: 4px`
- **On:** White circle (`var(--colors/surface/surface)`), `border-radius: 100px`, contains a `24px` check icon, Shadow/Bottom (`0px 2px 8px rgba(0,0,0,0.07)`), positioned with `padding-right: 4px` and `justify-content: flex-end`

### Disabled State

Entire component renders at `opacity: 0.32`. Element remains `<button>` when off, `<div>` when on.

---

## Tabs

A horizontally scrollable tab bar for category navigation, with optional overflow chevrons.

**Figma node:** `5815:4715`

### Props

| Prop           | Type       | Default | Description                        |
|----------------|------------|---------|------------------------------------|
| `chevronLeft`  | `boolean`  | `false` | Show left scroll chevron           |
| `chevronRight` | `boolean`  | `true`  | Show right scroll chevron          |

### Layout

```
[ (◄ chevron?) ] [ Selected Tab | Tab | Tab | Tab | ... ] [ (chevron ►?) ]
[ ──────────────────── bottom divider ──────────────────── ]
```

- Background: `var(--colors/surface/surface)` → `white`
- Tab items row: horizontal flex, gap: `16px` (`var(--16px)`)
- Full-width bottom divider below tabs
- Tabs overflow horizontally with optional chevron scroll indicators

### Tab Item (PiecesCategory)

Each tab has two states:

| State    | Text Color                                                   | Active Indicator          |
|----------|--------------------------------------------------------------|---------------------------|
| Default  | `var(--colors/surface/on-surface-variant)` → `#6E7072`      | None (hidden)             |
| Selected | `var(--colors/surface/on-surface-brand)` → `#006836`         | Green bar below           |

**Typography:** Label 1 Medium — `16px` / `22.4px`, weight 500

**Active Indicator (Selected):**
- Height: `4px`
- Color: `var(--colors/surface/on-surface-brand)` → `#006836`
- Border radius: `8px` top-left and top-right (rounded top corners only)
- Full width of tab item

**Tab padding:** `16px` top, `8px` horizontal (Selected only)

### Scroll Chevrons

Floating circular icon-only buttons for overflow navigation, matching the On Page Carousel arrow pattern.

| Property       | Value                                              |
|----------------|----------------------------------------------------|
| Button bg      | `var(--colors/surface/surface)` → `white`          |
| Border radius  | `100px` (circular)                                 |
| Padding        | `8px` (`var(--8px)`)                               |
| Icon           | `chevron_left` / `chevron_right`, `24px`           |
| Shadow         | `0px 2px 8px rgba(0,0,0,0.07)` (Shadow/Bottom)    |
| Fade gradient  | `72px` wide, linear from transparent → white       |

Chevrons are absolutely positioned at the left/right edges, vertically centered, with a white gradient fade behind them to mask overflowing tab content.

---

## Segmented Buttons

**Figma node:** `6033:24403`

A pill-shaped toggle control allowing selection of one option from 2 or 3 choices. The selected segment is visually elevated with a white background, border, and shadow against the muted track.

### Variants

| Property       | Values                                           | Default      |
|----------------|--------------------------------------------------|--------------|
| `choice`       | `"Option 1"` · `"Option 2"` · `"Option 3"`      | `"Option 1"` |
| `has3Options`  | `true` · `false`                                 | `true`       |

### Track (Container)

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Background     | `var(--colors/surface/surface-variant)` → `#F2F2F2`         |
| Width          | `373px`                                                      |
| Padding        | `4px` (`var(--4px)`)                                         |
| Gap            | `8px` (`var(--8px)`)                                         |
| Border radius  | `100px` (`var(--100px)`) — full pill                         |
| Layout         | `flex` row, `items-start`                                    |

### Segment (Each Option)

| Property       | Value                                            |
|----------------|--------------------------------------------------|
| Flex           | `1 0 0` (equal width segments)                   |
| Padding        | `8px` (`var(--8px)`)                             |
| Border radius  | `100px` (`var(--100px)`) — pill within pill      |
| Min size       | `min-h-px min-w-px` (unselected only)           |
| Alignment      | `flex`, `items-center`, `justify-center`         |

### Selected State

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Background     | `var(--colors/surface/surface)` → `white`                    |
| Border         | `2px solid var(--colors/surface/on-surface)` → `#252526`     |
| Shadow         | `0px 2px 8px rgba(0,0,0,0.09)`                              |
| Text color     | `var(--colors/surface/on-surface)` → `#252526`               |

### Unselected State

| Property       | Value                                                              |
|----------------|--------------------------------------------------------------------|
| Background     | none (transparent, track color shows through)                      |
| Border         | none                                                               |
| Shadow         | none                                                               |
| Text color     | `var(--colors/surface/on-surface-variant)` → `#6E7072`            |

### Typography

All segments use the same typeface regardless of state:

**Label / Label 2 SemiBold** — Montserrat SemiBold, `14px` / `19.6px` line-height, weight 600, `text-align: right`

### Shadow Note

The selected segment shadow uses `rgba(0,0,0,0.09)` opacity, which is slightly heavier than the standard `Shadow/Bottom` token (`rgba(0,0,0,0.07)`).

---

## Menu

**Figma node:** `3563:7974`

A floating dropdown menu card with up to 4 sections of items, each separated by a Divider. The first section uses the interactive Submenu item sub-component; additional sections use simpler plain-text items.

### Variants

| Property         | Values             | Default |
|------------------|--------------------|---------|
| `secondSection`  | `true` · `false`   | `false` |
| `thirdSection`   | `true` · `false`   | `false` |
| `fourthSection`  | `true` · `false`   | `false` |

### Container

| Property       | Value                                                      |
|----------------|------------------------------------------------------------|
| Background     | `var(--colors/surface/surface)` → `white`                  |
| Width          | `288px`                                                    |
| Padding        | `16px` vertical (`var(--16px)`)                            |
| Gap            | `4px` (`var(--4px)`) between items                         |
| Border radius  | `16px` (`var(--16px)`)                                     |
| Shadow         | `0px 2px 8px rgba(0,0,0,0.07)` (Shadow/Bottom)            |
| Layout         | `flex column`, `items-start`                               |

### Submenu Item (First Section)

Sub-component `PiecesSubmenu` used for the always-visible first section.

| Property         | Value                                                    |
|------------------|----------------------------------------------------------|
| Height           | `52px` (in menu context)                                 |
| Padding          | `16px` horizontal, `8px` vertical                        |
| Gap              | `4px`                                                    |
| Background       | `var(--colors/surface/surface)` → `white`                |

**Props:**

| Prop             | Values                     | Default     |
|------------------|----------------------------|-------------|
| `state`          | `"Default"` · `"Hover"`    | `"Default"` |
| `leadingIcon`    | `true` · `false`           | `false`     |
| `chevronRight`   | `true` · `false`           | `false`     |

**Typography:** Label 1 Medium — Montserrat Medium, `16px` / `22.4px`, weight 500, `var(--colors/surface/on-surface)` → `#252526`

**Optional leading icon:** `24px` (e.g. `view_in_ar`)
**Optional trailing chevron:** `24px` `chevron_right` icon (indicates sub-menu)

### Plain Text Item (Sections 2–4)

Simpler items used in the optional second, third, and fourth sections.

| Property       | Value                                                    |
|----------------|----------------------------------------------------------|
| Height         | `24px`                                                   |
| Padding        | `16px` horizontal                                        |
| Gap            | `16px` between items within each section                 |

**Typography:** Body 1 Regular — Montserrat Regular, `16px` / `22.4px`, weight 400, `#252526`

### Section Dividers

Each additional section is preceded by a Divider (`1px` line with `8px` vertical padding), followed by a `16px` gap column of plain text items.

---

## Blog

**Figma node:** `6522:193`

A responsive blog listing section that adapts across three breakpoint sizes. Displays a mix of featured image cards and compact list cards, with an optional category Tabs bar above.

### Variants

| Property          | Values                         | Default   |
|-------------------|--------------------------------|-----------|
| `size`            | `"LG-XL"` · `"SM-MD"` · `"XS"` | `"LG-XL"` |
| `blogCategories`  | `true` · `false`               | `false`   |
| `hasTag`          | `true` · `false`               | `true`    |

### Layout by Size

| Size    | Width      | Layout                                                         |
|---------|------------|----------------------------------------------------------------|
| LG-XL   | `1281px`   | 3-column row: 2 Featured Cards + 1 column of 3 List Cards     |
| SM-MD   | `1281px`   | 2-column row: 1 Featured Card + 1 column of 3 List Cards      |
| XS      | `454px`    | Single column: 1 Featured Card + 3 List Cards stacked          |

**Column gap:** `32px` (`var(--32px)`)
**Vertical gap (between Tabs and cards):** `16px` (`var(--16px)`)

### Blog Categories (Optional)

When `blogCategories = true`, the existing **Tabs** component is rendered above the cards. At XS size, a scroll chevron appears for overflow navigation.

### Featured Blog Card

A vertical card with a hero image on top and text content below.

| Property         | Value                                                          |
|------------------|----------------------------------------------------------------|
| Background       | `var(--colors/surface/surface)` → `white`                      |
| Border radius    | `16px` (`var(--16px)`)                                         |
| Shadow           | `0px 2px 8px rgba(0,0,0,0.07)` (Shadow/Bottom)                |
| Layout           | `flex column`                                                  |
| Flex             | `1 0 0` (fills available column width)                         |

**Image Area:**

| Property         | Value                                                          |
|------------------|----------------------------------------------------------------|
| Height           | `290px` (min-height `290px`)                                   |
| Padding          | `16px`                                                         |
| Image fit        | `object-cover`                                                 |
| Border radius    | `8px` top-left and top-right only                              |

**Content Area:**

| Property         | LG-XL        | SM-MD        | XS         |
|------------------|--------------|--------------|------------|
| Height           | `188px`      | `164px`      | auto       |
| Padding          | `16px`       | `16px`       | `16px`     |

**Title:** Montserrat SemiBold, `18px` / `25.2px`, `var(--colors/surface/on-surface)` → `#252526`
**Body text:** Body 1 Regular — `16px` / `22.4px`, `#252526`, `overflow: hidden`, `text-overflow: ellipsis`
**Date:** Label 2 Medium — `14px` / `19.6px`, `var(--colors/surface/on-surface-variant)` → `#6E7072`
**Divider** between body and date row

### Article Tag (on Featured Card Image)

Floating overlay tag in the image area's top-left corner.

| Property         | Value                                                          |
|------------------|----------------------------------------------------------------|
| Background       | `var(--colors/surface/surface-floating)` → `rgba(255,255,255,0.9)` |
| Padding          | `4px` vertical, `8px` horizontal                              |
| Border radius    | `4px` (`var(--4px)`)                                           |
| Shadow           | `0px 2px 8px rgba(0,0,0,0.07)`                                |
| Typography       | Label 2 Medium — `14px` / `19.6px`, `#252526`                 |

### List Card

A compact horizontal card with text content and a trailing arrow icon.

| Property         | Value                                                          |
|------------------|----------------------------------------------------------------|
| Background       | `var(--colors/surface/surface)` → `white`                      |
| Border radius    | `8px` (`var(--8px)`)                                           |
| Shadow           | `0px 2px 8px rgba(0,0,0,0.07)` (Shadow/Bottom)                |
| Padding          | `16px` (`var(--16px)`)                                         |
| Gap              | `32px` (`var(--32px)`) between text content and arrow          |
| Alignment        | `items-center`                                                 |
| Height           | `flex: 1 0 0` (LG-XL / SM-MD) · `146px` fixed (XS)           |

**Title:** Montserrat SemiBold, `18px` / `25.2px`, `#252526`, height `48px` (LG-XL / SM-MD)
**Date:** Label 2 Medium — `14px` / `19.6px`, `#6E7072`
**Trailing icon:** `arrow_forward`, `24px`

### Article Tag (on List Card)

Inline tag above the title (solid background, no shadow).

| Property         | Value                                                          |
|------------------|----------------------------------------------------------------|
| Background       | `var(--colors/surface/surface-variant)` → `#F2F2F2`           |
| Padding          | `4px` vertical, `8px` horizontal                              |
| Border radius    | `4px` (`var(--4px)`)                                           |
| Typography       | Label 3 Medium — `12px` / `16.8px`, `#252526`                 |

### Typography Summary

| Style                  | Font                          | Size / Line-height | Weight |
|------------------------|-------------------------------|-------------------|--------|
| Card title             | Montserrat SemiBold           | `18px` / `25.2px` | 600    |
| Card body              | Montserrat Regular            | `16px` / `22.4px` | 400    |
| Date                   | Montserrat Medium             | `14px` / `19.6px` | 500    |
| Featured card tag      | Montserrat Medium             | `14px` / `19.6px` | 500    |
| List card tag          | Montserrat Medium             | `12px` / `16.8px` | 500    |

---

## Testimonial Card

**Figma node:** `8741:684`

A review card displaying a star rating, item subtitle, review body text, and author attribution.

### Container

| Property       | Value                                                      |
|----------------|------------------------------------------------------------|
| Background     | `var(--colors/surface/surface)` → `white`                  |
| Width          | `344px`                                                    |
| Padding        | `16px` (`var(--16px)`)                                     |
| Gap            | `32px` (`var(--32px)`) between content and author sections |
| Border radius  | `8px` (`var(--8)`)                                         |
| Shadow         | `0px 2px 8px rgba(0,0,0,0.07)` (Shadow/Bottom)            |
| Layout         | `flex column`, `items-start`                               |

### Star Rating (Sub-component)

A row of 5 filled star icons followed by a numeric score.

| Property       | Value                                                      |
|----------------|------------------------------------------------------------|
| Stars          | 5 × `16px` SVG icons, using CSS `mask-image` technique    |
| Star row width | `80px`                                                     |
| Star spacing   | `-5px` negative margin (slight overlap)                    |
| Gap            | `4px` between stars row and score text                     |
| Score text     | Body 2 Regular — `14px` / `20px`, `#252526`                |

### Content Section

Gap: `16px` between rating group and review body.

**Rating + Subtitle group (gap `4px`):**
- Star rating row (see above)
- Item subtitle: Subtitle 2 Medium — `14px` / `20px`, `var(--colors/surface/on-surface-variant)` → `#6E7072`

**Review body:**

| Property       | Value                                                      |
|----------------|------------------------------------------------------------|
| Typography     | Body 1 Regular — `16px` / `24px`, `#252526`                |
| Height         | `96px` (fixed, truncated)                                  |
| Overflow       | `hidden`, `text-overflow: ellipsis`                        |
| Full width     | yes                                                        |

### Author Section

Gap: `4px` between name and date.

| Element   | Style                                                               |
|-----------|---------------------------------------------------------------------|
| Name      | Body 2 Bold (SemiBold) — `14px` / `20px`, weight 600, `#252526`    |
| Date      | Subtitle 3 Medium — `12px` / `18px`, weight 500, `#252526`         |

### Typography Summary

| Style            | Font                    | Size / Line-height | Weight |
|------------------|-------------------------|-------------------|--------|
| Score text       | Montserrat Regular      | `14px` / `20px`   | 400    |
| Item subtitle    | Montserrat Medium       | `14px` / `20px`   | 500    |
| Review body      | Montserrat Regular      | `16px` / `24px`   | 400    |
| Author name      | Montserrat SemiBold     | `14px` / `20px`   | 600    |
| Author date      | Montserrat Medium       | `12px` / `18px`   | 500    |

---

## Multi-level Filter

**Figma node:** `318:14088`

An accordion-style faceted filter with a collapsible title row that reveals a bordered panel of nested sub-category items. Each sub-category can itself expand to show checkbox options with an optional search field.

### Outer Component — Multi-level

| Property          | Values                              | Default        |
|-------------------|-------------------------------------|----------------|
| `state`           | `"Open"` · `"Closed"` · `"Disabled"` | `"Open"`      |
| `activeSelected`  | `true` · `false`                    | `false`        |
| `bottomDivider`   | `true` · `false`                    | `true`         |
| `text`            | string                              | `"Multi-level"` |

**Width:** `417px` (Closed / Disabled), `413px` (Open)

#### Title Row

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Gap            | `32px` between label group and chevron                       |
| Typography     | Label 1 SemiBold — `16px` / `22.4px`, weight 600, `#252526` |
| Chevron        | `expand_more` (Closed/Disabled) · `expand_less` (Open), `24px` |

**Active-selected dot:** `10px` circle, background `#E0EDE7`, `1px solid var(--gray/100)` → `white`, fully rounded. Appears next to the title when `activeSelected = true`.

#### State Behavior

| State      | Element  | Notes                                     |
|------------|----------|-------------------------------------------|
| Closed     | `button` | Clickable, shows expand_more chevron       |
| Open       | `div`    | Shows expand_less chevron + content panel  |
| Disabled   | `div`    | `opacity: 0.32` on title row, not clickable |

### Content Panel (Open State)

Revealed when the outer component is in Open state.

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Border         | `1px solid var(--colors/border/border-low)` → `#E4E4E5`     |
| Border radius  | `8px`                                                        |
| Padding        | `16px` vertical                                              |
| Gap            | `16px` between sub-items                                     |
| Background     | none (inherits white from parent)                            |

Contains a list of **MultiLevelInput** sub-items, each in Closed state by default. The last item has `bottomDivider = false`.

### Inner Component — MultiLevelInput

A nested sub-category that can expand to show checkbox filter options.

| Property          | Values                                                     | Default           |
|-------------------|------------------------------------------------------------|--------------------|
| `state`           | `"Closed"` · `"Open Checkbox"` · `"Open Input"` · `"Disabled"` | `"Open Checkbox"` |
| `activeSelected`  | `true` · `false`                                           | `false`            |
| `bottomDivider`   | `true` · `false`                                           | `true`             |
| `hasSearchField`  | `true` · `false`                                           | `true`             |
| `hasShowAll`      | `true` · `false`                                           | `true`             |
| `text`            | string                                                     | `"Input"`          |

**Padding:** `32px` horizontal (`var(--32px)`)

#### Sub-category Title Row

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Typography     | Label 1 Medium — `16px` / `22.4px`, weight 500, `#252526`   |
| Chevron        | `expand_more` (Closed) · `expand_less` (Open), `24px`       |
| Active dot     | Same `10px` green dot as outer component                     |

#### Expanded Dropdown Panel

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Background     | `white`                                                      |
| Border         | `1px solid var(--colors/border/border-low)` → `#E4E4E5`     |
| Border radius  | `8px` (`var(--8px)`)                                         |
| Padding        | `16px` all sides (RV Trader instance) / `8px` vertical (design system) |
| Gap            | `16px` between items                                         |

**Optional search field:** Reuses the Single Line text input (`58px` height, placeholder "Search for an option")

**Checkbox options:** Each row uses the standard Checkbox component layout:
- Checkbox box `24px` + label text + count
- Label: Body 1 Regular — `16px` / `22.4px`, `#252526`
- Count: Label 1 Medium — `16px` / `22.4px`, `#6E7072`

**"View all options" link:** Link 1 Medium — `16px` / `22.4px`, weight 500, `#252526`, `text-decoration: underline`, `24px` height, overflow ellipsis

### RV Trader Instance

**Figma file:** `MBAdyd0UBIRL75bxvgOBF8` — **node:** `22244:23125`

An instance of this component in the RV Trader product file showing the Open state with one sub-category expanded (Open Checkbox). The expanded dropdown panel uses `16px` padding on all sides (vs `8px` vertical only in the design system definition).

---

## Footer

**Figma node:** `262:21651`

A full-width site footer with responsive layout across 5 breakpoints. Contains navigation link sections, seller/dealer CTAs, app store badges, newsletter signup, social icons, optional affiliate logos, and legal/copyright text.

### Variants

| Property         | Values                                    | Default  |
|------------------|-------------------------------------------|----------|
| `size`           | `"XS"` · `"SM"` · `"MD"` · `"LG"` · `"XL"` | `"XS"` |
| `section1`       | `true` · `false`                          | `true`   |
| `section2`       | `true` · `false`                          | `true`   |
| `section3`       | `true` · `false`                          | `false`  |
| `rvtAffiliates`  | `true` · `false`                          | `false`  |

### Container

| Property       | XS–LG                                              | XL                                                   |
|----------------|-----------------------------------------------------|------------------------------------------------------|
| Background     | `var(--colors/surface/surface-variant)` → `#F2F2F2` | same                                                 |
| Width          | `432px` (XS), `768px` (SM), `992px` (MD), `1232px` (LG) | `1920px` (min-w `1920px`)                     |
| Max width      | `767px` (XS)                                        | —                                                    |
| Padding horiz  | `16px` (`var(--16px)`)                              | `64px` (`var(--64px)`)                               |
| Padding top    | `32px`                                              | `32px`                                               |
| Padding bottom | `64px`                                              | `32px`                                               |
| Gap            | `32px` (`var(--32px)`)                              | `32px`                                               |
| Alignment      | `items-start`                                       | `items-center`                                       |
| Layout         | `flex column`                                       | `flex column`                                        |

### Layout by Size

| Size  | Structure                                                                       |
|-------|---------------------------------------------------------------------------------|
| XS    | Single column — all sections stacked vertically                                 |
| SM    | Single column — all sections stacked vertically (wider)                         |
| MD    | Link sections begin to arrange in rows                                          |
| LG    | Horizontal row for link sections + CTAs                                         |
| XL    | Full horizontal row: link sections + CTAs in one row; app/newsletter/social in another |

**XL top row:** `flex row`, `gap: 32px`, each link section is `flex: 1 0 0`
**XL bottom row:** App badges + Newsletter + Social icons in a horizontal row

### Link Sections

**Section 1 — "Explore RV Trader":**
Links: About RV Trader, RV Trader Blog, Site map, Need help?, Email us feedback, Security Center, Community Guidelines

**Section 2 — "Looking for something else?":**
Links: Airplanes for sale, ATVs for sale, Trucks for sale, Motorcycles for sale, Heavy equipment for sale, Jet skis for sale, Snowmobiles for sale, Boats for sale, Caravan Camping Sales (Australia)

**Section 3** — Same header as section 2 with different content (without Australia link)

**Section header:** Montserrat SemiBold, `18px` / `25.2px`, `#252526`
**Section links:** Montserrat Regular, `14px` / `19.6px`, `#252526`, gap `16px` between items

### Private Sellers Section

- **CTA button:** Primary green (`var(--colors/primary/primary)` → `#006836`), `32px` horizontal / `16px` vertical padding, `8px` radius, label "Sell my RV" — Button 1 SemiBold `16px` / `22.4px`, white
- **Link:** "Edit my listing" — Link 2 Medium `14px` / `19.6px`, underlined, `#252526`

### Dealers Section

- **CTA button:** Secondary outlined — white bg, `1px solid var(--colors/border/border)` → `#939598`, `32px` horizontal / `16px` vertical padding, `8px` radius, label "TraderTraxx login" — Button 1 SemiBold `16px` / `22.4px`, `#252526`
- **Links:** "Advertise your inventory" (underlined Medium) + " with us!" (Regular), "Registration data insights" — `14px` / `19.6px`

### Newsletter Sub-component

| Property       | Value                                                      |
|----------------|------------------------------------------------------------|
| Width          | `592px` (default), min `352px`, max `715px`                |
| Gap            | `8px` between title and input row                          |

**Title:** Montserrat SemiBold, `18px` / `28px`, `#252526` — "Subscribe to our newsletter"
**Input:** Single Line text input (`58px` height), placeholder "Enter your email"
**Submit button:** Primary green CTA, `32px` horizontal / `16px` vertical padding, `8px` radius

### Get Our App

**Section header:** Montserrat SemiBold, `18px` / `25.2px`

**App Store badge:** Black background, `4px` radius, `8px` horizontal / `2px` vertical padding
- Apple icon (mask-image SVG, white on black)
- "Download on the" — Open Sans SemiBold `10px`
- "App Store" — Open Sans SemiBold `17px`

**Google Play badge:** Black background, `4px` radius, `39px` height
- Google Play icon (PNG)
- "GET IT ON" — Open Sans SemiBold `9px`
- "Google Play" — mask-image text logo

Badge gap: `16px`

### Social Icons

A wrapping flex row of 6 circular icon-only buttons.

| Property       | Value                                                      |
|----------------|------------------------------------------------------------|
| Layout         | `flex-wrap`, `gap: 16px`                                   |
| Button bg      | `var(--colors/surface/surface)` → `white`                  |
| Button radius  | `100px` (circular)                                         |
| Button padding | `8px`                                                      |
| Icon size      | `24px`                                                     |

### RVT Affiliates (Optional)

Wrapping centered row of 4 affiliate logos using mask-image technique (monochrome `#252526`).
- Gap: `32px` horizontal, `16px` vertical (wrapping)
- Logo heights: `32px`–`45px`

### Copyright / Legal Section

Centered column, gap `16px`.

- **Logo icon:** `24px`, white circular button with brand icon
- **Copyright:** "RVTrader.com © 2024 Trader Interactive / All rights reserved" — Regular `14px` / `19.6px`, centered
- **Legal links (stacked):** Privacy Policy, Terms of Use, Advertiser Agreement — Regular `14px` / `19.6px`, centered
- **reCAPTCHA notice:** Mixed text — Regular + Medium (underlined for "Privacy Policy" and "Terms of Service"), `14px`, centered

### Typography Summary

| Style                | Font                     | Size / Line-height | Weight |
|----------------------|--------------------------|-------------------|--------|
| Section header       | Montserrat SemiBold      | `18px` / `25.2px` | 600    |
| Section links        | Montserrat Regular       | `14px` / `19.6px` | 400    |
| Underlined links     | Montserrat Medium        | `14px` / `19.6px` | 500    |
| Button labels        | Montserrat SemiBold      | `16px` / `22.4px` | 600    |
| Newsletter title     | Montserrat SemiBold      | `18px` / `28px`   | 600    |
| Copyright text       | Montserrat Regular       | `14px` / `19.6px` | 400    |
| App badge primary    | Open Sans SemiBold       | `17px`            | 600    |
| App badge secondary  | Open Sans SemiBold       | `9px`–`10px`      | 600    |

---

## GS SM (Category Card — Small)

**Figma node:** `488:29169`

A small square category selection card displaying an RV type label with a 3D illustration below. Used in "Getting Started" or type-browsing flows.

### Variants

| Property    | Values                    | Default     |
|-------------|---------------------------|-------------|
| `state`     | `"Default"` · `"Hover"`   | `"Default"` |
| `subtitle`  | `true` · `false`          | `false`     |

### Container

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Background     | `var(--colors/surface/surface-variant)` → `#F2F2F2`         |
| Width          | `175px` (default), min `175px`, max `250px`                  |
| Aspect ratio   | `1:1` (square — enforced via invisible spacer)               |
| Border radius  | `8px` (`var(--8px)`)                                         |
| Padding        | `16px` (content overlay)                                     |
| Gap            | `16px` between text group and illustration                   |
| Layout         | `flex column`, `items-start`                                 |

### Hover State

Adds `shadow: 0px 2px 8px rgba(0,0,0,0.07)` (Shadow/Bottom). No other visual changes.

### Text Content

**Title:** Label 2 SemiBold — Montserrat SemiBold, `14px` / `19.6px`, weight 600, `var(--colors/surface/on-surface)` → `#252526`

**Subtitle (optional):** Montserrat Medium, `12px` / `16.8px`, weight 500, `#6E7072` (e.g. "Less than 6,000 lbs")

### Illustration

A 3D rendered RV illustration absolutely positioned over a `2:1` aspect ratio spacer within the lower portion of the card. The illustration is a PNG with transparent background, centered horizontally.

A subtle elliptical shadow SVG sits beneath the illustration for grounding.

---

## Cross-promotions

**Figma file:** `2LNzb2u8ua7X8ZH4sQOWb1` (Homepage Refresh) — **node:** `25517:10710`

A horizontal tab bar for switching between Trader Interactive marketplace realms. Sits on a green accent background and displays 8 category tabs with one active.

### Variants

| Property   | Values                            | Default   |
|------------|-----------------------------------|-----------|
| `size`     | `"LG-XL"` · `"SM-MD"` · `"XS"`  | `"LG-XL"` |
| `realm`    | `"RV"` · `"ATV"` · `"Motorcycle"` · `"Truck"` · `"Snowmobile"` · `"Boat"` · `"PWC"` · `"Plane"` | `"RV"` |

### Container

| Property       | Value                                                          |
|----------------|----------------------------------------------------------------|
| Background     | `var(--colors/surface/surface-accent)` → `#E0EDE7`            |
| Padding        | `64px` horizontal (`var(--64px)`)                              |
| Gap            | `32px` (`var(--32px)`)                                         |
| Layout         | `flex row`, `items-center`, `isolate`                          |
| Height         | `40px`                                                         |

### Tab Items

A row of 8 tabs with `16px` gap between items.

**Tabs:** RVs · Motorcycles · ATVs · Trucks · Boats · Planes · Snowmobiles · Jet Skis

| Property       | Value                                            |
|----------------|--------------------------------------------------|
| Height         | `40px`                                           |
| Padding        | `8px` horizontal                                 |
| Alignment      | `items-center`, `justify-center`                 |

### Active Tab

| Property       | Value                                                          |
|----------------|----------------------------------------------------------------|
| Border bottom  | `2px solid var(--colors/border/border-high)` → `#252526`       |
| Typography     | Label 2 Medium — Montserrat Medium, `14px` / `19.6px`, weight 500 |
| Text color     | `var(--colors/surface/on-surface)` → `#252526`                 |

### Inactive Tabs

| Property       | Value                                                          |
|----------------|----------------------------------------------------------------|
| Border         | none                                                           |
| Typography     | Body 2 Regular — Montserrat Regular, `14px` / `19.6px`, weight 400 |
| Text color     | `var(--colors/surface/on-surface-variant)` → `#6E7072`        |

---

## Header

**Figma file:** `PjidGuCWzCcgsrHJvxLLFW` (Marketplace UI Refresh) — **node:** `15:4789`

The site header bar with logo, navigation links, and account button. Fixed at the top of the page with a bottom shadow.

### Container

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Background     | `white` (`var(--colors/surface/surface)`)                    |
| Height         | `72px`                                                       |
| Padding        | `64px` horizontal, `16px` vertical                           |
| Shadow         | `0px 2px 8px rgba(0,0,0,0.07)` (Shadow/Bottom)              |
| Layout         | `flex column`, `justify-center`, `items-start`               |

### Inner Row

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Gap            | `32px` (`var(--32px)`)                                       |
| Layout         | `flex row`, `items-center`, full width                       |

### Logo

Brand logo as an SVG vector.

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Width          | `158px`                                                      |
| Height         | `40px`                                                       |

### Navigation Links

A horizontal row of top-level nav items. Fills available space (`flex: 1 0 0`) with `overflow: clip`.

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Gap            | `32px` (`var(--32px)`)                                       |
| Layout         | `flex row`, `items-center`                                   |

**Items:** Shop · Sell · RV values · Cash offers · Research (with dropdown chevron)

Each item (`Pieces/Dropdown` sub-component):

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Gap            | `4px` (`var(--4px)`) between label and optional chevron      |
| Typography     | Label 1 SemiBold — Montserrat SemiBold, `16px` / `22.4px`, weight 600 |
| Text color     | `var(--colors/surface/on-surface)` → `#252526`               |

**Dropdown chevron:** `expand_more` icon, `24px`, shown on "Research" item only in this variant.

### Account Button

A pill-shaped button at the right end of the header.

| Property       | Value                                                        |
|----------------|--------------------------------------------------------------|
| Background     | `var(--colors/surface/surface)` → `white`                    |
| Padding        | `8px` (`var(--8px)`)                                         |
| Gap            | `8px` (`var(--8px)`)                                         |
| Border radius  | `100px` (`var(--100px)`) — full pill                         |
| Layout         | `flex row`, `items-center`                                   |

**Props:**

| Prop        | Values                     | Default     |
|-------------|----------------------------|-------------|
| `loggedIn`  | `true` · `false`           | `false`     |
| `state`     | `"Enabled"` · `"Hover"`    | `"Enabled"` |

**Icon:** `person` icon, `24px`
**Label:** "Log in" — Label 2 SemiBold, `14px` / `19.6px`, weight 600, `#252526`

---

## Filter Sidebar

> Source: [Marketplace UI Refresh — Frame 6104](https://www.figma.com/design/PjidGuCWzCcgsrHJvxLLFW/Marketplace-UI-Refresh?node-id=1-4005)

A full-height sidebar that houses search filters, a promotional card, and ad placements for the SRP (Search Results Page). Three vertically-stacked blocks separated by `32px` gap.

### Outer Container

| Property | Value |
|----------|-------|
| Layout   | `flex column` |
| Gap      | `32px` (`var(--32px)`) |
| Width    | `330–331px` |

---

### 1. Filter Card

The main bordered card containing all filter controls.

| Property       | Value |
|----------------|-------|
| Border         | `1px solid var(--colors/border/border-low)` → `#E4E4E5` |
| Border radius  | `8px` (`var(--8px)`) |
| Padding        | `16px` (`var(--16px)`) |
| Gap            | `16px` (`var(--16px)`) |
| Width          | `331px` |
| Layout         | `flex column` |

#### Results Header

A row with the result count on the left and a "Clear all" link on the right.

| Element    | Typography | Color |
|------------|------------|-------|
| "24,500 results" | Title 2 — SemiBold `18px` / `25.2px` | `#252526` |
| "Clear all" | Link 1 — Medium `16px` / `22.4px`, underlined | `#252526` |

#### Active Filter Chips

Wrapping row of pill-shaped chips showing currently active filters, each with a close button.

| Property       | Value |
|----------------|-------|
| Layout         | `flex wrap`, `content-center` |
| Gap            | `16px` |
| Chip bg        | `var(--colors/surface/surface-variant)` → `#F2F2F2` |
| Chip border    | `1px solid var(--colors/border/border-high)` → `#252526` |
| Chip padding   | `8px 16px` |
| Chip radius    | `100px` (pill) |
| Label          | Label 2 Medium — `14px` / `19.6px`, `#252526` |
| Close icon     | `close`, `20px` |

#### Divider

A horizontal 1px line with `8px` vertical padding (`py-8`). Used between all major filter sections.

#### AI Search Section

| Property       | Value |
|----------------|-------|
| Gap            | `16px` between input and button |

**Search Input:**

| Property       | Value |
|----------------|-------|
| Height         | `56px` |
| Border         | `1px solid #D5D5D5` |
| Border radius  | `100px` (pill) |
| Padding        | `4px 32px 4px 16px` |
| Background     | `white` |
| Icon           | AI search icon, `24px` |
| Placeholder    | "Try" (SemiBold 16px #6E7072) + "Family-friendly RVs for 4" (Regular 16px #6E7072) |

**Search Button:**

| Property       | Value |
|----------------|-------|
| Background     | `var(--colors/primary/primary)` → `#006836` |
| Border radius  | `100px` (pill) |
| Padding        | `16px 32px` |
| Label          | "Search" — Button 1 SemiBold `16px` / `22.4px`, white |
| Width          | Full width of container |

#### RV Filter Section

White background container with `8px` gap and `16px` bottom padding. Contains multiple filter groups, each structured as:

**Filter Title Row (all groups):**

| Property | Value |
|----------|-------|
| Label    | Label 1 SemiBold — `16px` / `22.4px`, `#252526` |
| Icon     | `expand_less` (expanded) or `expand_more` (collapsed), `24px` |
| Gap      | `32px` between label and icon |
| Bottom padding | `8px` |

##### Location (Input + Dropdown)

Two side-by-side fields:

| Field | Type | Height | Radius | Border | Placeholder |
|-------|------|--------|--------|--------|-------------|
| ZIP | Text input | `58px` | `8px` | `1px #939598` | "ZIP or city, state" (Medium 16px #6E7072) |
| Search within | Dropdown | `58px` | `8px` | `1px #939598` | Float label "Search within" (Label 3 Medium 12px #6E7072), value "150 mi." (Regular 16px #252526) |

**Gap between fields:** `8px`

##### New or Used (Radio / Segmented)

Uses the **Segmented Buttons** component (3 options: All · New · Used).

##### RV Type (Checkboxes + 3D Illustrations)

Scrollable checkbox list with small vehicle illustrations.

| Property | Value |
|----------|-------|
| Right padding | `32px` (to leave room for scrollbar) |
| Gap | `16px` between items |

Each item row:

| Element | Value |
|---------|-------|
| Checkbox | `24px`, `4px` radius, border `1px #939598`, unchecked = white bg |
| Label | Body 1 Regular — `16px` / `22.4px`, `#252526` |
| Gap (checkbox–label) | `8px` |
| 3D illustration | ~`64×32px`, positioned absolute over a 2:1 aspect-ratio spacer |
| Row height | `40px` |

**Items shown:** Class A · Class B · Class C · Fifth wheel · Fish house · Park model

**Scrollbar** (absolute-positioned right side):

| Property | Value |
|----------|-------|
| Width | `6px` |
| Thumb | `80px` tall, `bg rgba(63,67,80,0.24)`, `3px` radius |
| Track | `bg rgba(217,217,217,0.20)` |

##### Make & Model (Checkboxes, nested)

Includes a search input and hierarchical make/model checkboxes.

**Search input:** Same text-input pattern — `58px`, `8px` radius, `1px #939598` border, placeholder "Search for option" (Medium 16px #6E7072).

**Checkbox hierarchy:**

| Level | Indent | Description |
|-------|--------|-------------|
| Make (level 0) | None | Standard checkbox row |
| Model (level 1) | `24px` invisible spacer before checkbox | Nested under a make |

**Checked state:** Checkbox bg `#252526`, white check icon, `4px` radius.
**Unchecked state:** White bg, `1px #939598` border.

**"See all options" link:** Medium `16px` / `22.4px`, underlined, `#252526`.

##### Price (Input, with finance mode)

**Segmented Buttons:** Cash · Finance (2 options, "Finance" selected in design).

**Input fields (Finance mode):**

| Field | Prefix | Placeholder | Height | Radius |
|-------|--------|-------------|--------|--------|
| Down payment | `$` (Regular 16px #6E7072) | "Down payment" (Medium 16px #6E7072) | `58px` | `8px` |
| Max monthly payment | `$` | "Max monthly payment" | `58px` | `8px` |

**Terms Dropdown:** Same float-label dropdown pattern — label "Terms" (12px), value "60" (16px), `58px` height.

**Estimated Buying Power Card:**

| Property | Value |
|----------|-------|
| Border radius | `8px` |
| Padding | `16px` |
| Gap | `32px` (outer), `16px` / `8px` (inner) |
| Background | Gradient — overlapping radial gradients: gold `rgba(242,178,3)` 15% opacity, mint `rgba(152,207,182)` 42% opacity, green `rgba(0,104,54)` 36% opacity |
| Title | "Estimated buying power" — Label 2 SemiBold `14px` / `20px` + `info` icon `20px` |
| Value | "—" — Headline 1 Bold `24px` / `30px`, black |
| Description | Body 2 Regular `14px` / `20px`, centered, `#252526` |
| Button | "Save search" — white bg, pill (`100px` radius), SemiBold `14px` / `24px`, `#252526` |

##### Collapsed Filter Groups

Remaining filters shown in collapsed (title-only) state. Each row: title + `expand_more` icon + divider.

| Filter | Control Type |
|--------|-------------|
| Length | Dropdown |
| Year | Dropdown |
| Bunkhouse floor plan | Radio |
| Fuel type | Checkboxes |
| Sleeping capacity | Dropdown |
| Floor plan | Radio |
| Gross vehicle weight | Dropdown (no trailing divider) |

---

### 2. Sell on RV Trader Card

A promotional card encouraging sellers.

| Property       | Value |
|----------------|-------|
| Width          | `330px` |
| Background     | `white` |
| Border radius  | `8px` |
| Shadow         | `0px 2px 8px 2px rgba(0,0,0,0.07)` (Shadow/Bottom) |
| Padding        | `16px` |
| Gap            | `16px` |
| Overflow       | `clip` |

| Element | Value |
|---------|-------|
| Hero image | Full-width, `138px` tall, `8px` radius, `object-cover` |
| Title | "Sell on RV Trader" — Title 2 SemiBold `18px` / `25.2px`, black |
| Description | "**Get the best price**" (SemiBold 14px) + " — " + "plus earn thousands more than on trade-in!" (Regular 14px), black |
| CTA button | "Sell my RV" — Primary green `#006836`, pill, `36px` height, padding `8px 16px`, Button 2 SemiBold `14px` / `19.6px`, white text |

---

### 3. Ad Placements

Sticky column of ad slots.

| Property       | Value |
|----------------|-------|
| Position       | `sticky`, `top: 0` |
| Padding top    | `16px` |
| Gap            | `16px` |
| Alignment      | Centered |

| Slot | Size |
|------|------|
| Ad 1 | `300 × 250` |
| Ad 2 | `300 × 600` (labeled "desk_sales_mrec pos=left1") |

Each ad slot: dashed `1px` border `#939598`, `#F8F8F8` background, centered label text (SemiBold 18px #939598).

---

### Typography Summary (Filter Sidebar)

| Style | Spec | Usage |
|-------|------|-------|
| Title 2 | SemiBold `18px` / `25.2px` | Results count, promo card title |
| Headline 1 | Bold `24px` / `30px` | Buying power value |
| Label 1 SemiBold | SemiBold `16px` / `22.4px` | Filter section titles |
| Link 1 | Medium `16px` / `22.4px` | "Clear all", "See all options" (underlined) |
| Label 1 | Medium `16px` / `22.4px` | Input placeholders |
| Button 1 | SemiBold `16px` / `22.4px` | "Search" button |
| Body 1 | Regular `16px` / `24px` | Checkbox labels, dropdown values |
| Label 2 SemiBold | SemiBold `14px` / `20px` | Filter chip labels, buying power title |
| Label 2 | Medium `14px` / `19.6px` | Segmented button labels |
| Body 2 | Regular `14px` / `20px` | Buying power description, promo description |
| Button 2 | SemiBold `14px` / `19.6px` | "Sell my RV" CTA |
| Label 3 | Medium `12px` / `16.8px` | Float-label text in dropdowns |

---

## Listings Card

> Source: [Marketplace UI Refresh — Listings Card](https://www.figma.com/design/PjidGuCWzCcgsrHJvxLLFW/Marketplace-UI-Refresh?node-id=1-4309)

A vertical card for an individual listing on the SRP. Contains a photo carousel area, listing details with pricing, a CTA button, and dealer information with a trust badge.

### Outer Card

| Property       | Value |
|----------------|-------|
| Layout         | `flex column` |
| Border         | `1px solid #E4E4E5` (border-low) |
| Border radius  | `8px` (`var(--8px)`) |
| Overflow       | `clip` |
| Width          | ~`403px` (flexible) |
| Height         | `600px` |

---

### Photo Section

| Property       | Value |
|----------------|-------|
| Height         | `295px` |
| Aspect ratio   | `4:3` (via spacer) |
| Border         | `1px solid rgba(0,0,0,0.1)` (border-floating) |
| Top corners    | `8px` radius |
| Image fit      | `object-cover`, absolute fill |

#### Top Overlay

A row pinned to the top of the photo with horizontal padding and top padding of `16px`. Contains tags on the left and a favorite icon on the right, `16px` gap.

**Tag Badge** (e.g. "Price reduced"):

| Property       | Value |
|----------------|-------|
| Background     | `var(--colors/surface/surface-floating)` → `rgba(255,255,255,0.9)` |
| Left border    | `2px solid #D8202E` (red accent) |
| Padding        | `4px 8px` |
| Border radius  | `4px` |
| Shadow         | Shadow/Bottom — `0px 2px 8px rgba(0,0,0,0.07)` |
| Text           | Label 2 Medium — `14px` / `19.6px`, `#252526` |

**Favorite Icon:**

Stacked grid (`32px`) with two overlapping icons — `favorite-filled` and `favorite` (outline). Only one is visible depending on state.

#### Carousel Indicator

Centered at the bottom of the photo, `16px` from the bottom edge. A row of dots with `8px` gap:

| Dot | Size | State |
|-----|------|-------|
| Current | `8px` | Filled/active |
| 2nd, 3rd | `6px` | Secondary |
| 4th, 5th | `4px` | Tertiary (fading) |

---

### Content Section

| Property       | Value |
|----------------|-------|
| Background     | `white` |
| Padding        | `16px` |
| Gap            | `8px` (between main blocks) |
| Layout         | `flex column`, `items-center` |

#### Listing Info Block

Gap `16px` between the text group and the CTA button.

**Condition & Type Line:**

| Property | Value |
|----------|-------|
| Text     | "Used • Premium Select" |
| Style    | Label 2 Medium — `14px` / `19.6px`, `#6E7072` (on-surface-variant) |

**Title:**

| Property | Value |
|----------|-------|
| Text     | "2019 Forest River Cedar Creek Silverback" |
| Style    | Title 2 SemiBold — `18px` / `25.2px`, `#252526` |
| Overflow | `text-ellipsis`, `overflow-hidden` |
| Gap above | `8px` from condition line |

**Price Row:**

| Element | Style | Color |
|---------|-------|-------|
| Current price | Title 2 SemiBold — `18px` / `25.2px` | `#252526` |
| Original price (strikethrough) | Label 1 Medium — `16px` / `22.4px`, `line-through` | `#6E7072` (on-surface-variant) |
| Gap | `8px` between prices | |

#### "More Info" Button

| Property       | Value |
|----------------|-------|
| Height         | `40px` |
| Border         | `1px solid var(--colors/border/border)` → `#939598` |
| Border radius  | `100px` (pill) |
| Padding        | `16px 32px` |
| Width          | Full width |
| Label          | "More info" — Button 2 SemiBold `14px` / `19.6px`, `var(--colors/secondary/secondary)` → `#252526` |

#### Divider

Full-width horizontal 1px line (`py-8` vertical padding).

#### Dealer Info Block

| Property       | Value |
|----------------|-------|
| Height         | `72px` |
| Gap            | `8px` between dealer details and trust badge |
| Vertical align | `center` |

**Dealer Details** (gap `4px`):

| Element | Style |
|---------|-------|
| Dealer name | Label 2 SemiBold — `14px` / `19.6px`, `#252526` |
| Location | Subtitle 2 / Label 2 Medium — `14px` / `20px`, `#252526` |

Example: "Roy Robinson RV Center" / "Seattle, WA • 0.9 miles away"

**Trust Badge:**

| Property | Value |
|----------|-------|
| Icon | `award_star`, `20px` |
| Gap | `4px` |
| Text | "Trusted partner for over 5 years" — Medium `14px` / `20px`, `#006836` (brand green) |
| Overflow | `text-ellipsis`, `overflow-hidden`, `nowrap` |

---

### Hidden Elements (conditional)

Several elements are present in the structure but `hidden` by default, likely toggled by listing type or variant:

| Element | Description |
|---------|-------------|
| "Premium Select ad by private seller" | Seller type label |
| `info` icon (`20px`) | Info tooltip |
| "Private seller" text | Alternative to dealer name |
| Tagline frame | `bookmark` icon `24px` + tagline text (Label 2 Medium `14px`) |
| Checkbox | `255px` wide, for multi-select/compare mode |

---

### Typography Summary (Listings Card)

| Style | Spec | Usage |
|-------|------|-------|
| Title 2 | SemiBold `18px` / `25.2px` | Listing title, current price |
| Label 1 | Medium `16px` / `22.4px` | Original (strikethrough) price |
| Label 2 SemiBold | SemiBold `14px` / `19.6px` | Dealer name |
| Label 2 / Subtitle 2 | Medium `14px` / `19.6–20px` | Condition line, location, tag badge, trust badge |
| Button 2 | SemiBold `14px` / `19.6px` | "More info" CTA |

---

## Homepage Search

> Source: [Marketplace UI Refresh — Homepage search](https://www.figma.com/design/PjidGuCWzCcgsrHJvxLLFW/Marketplace-UI-Refresh?node-id=1-9698)

A floating search box used on the homepage hero. Includes a "Shop RVs / Sell my RV" segmented toggle that protrudes above the card, an AI-powered search input with inline ZIP location, and a primary Search button.

### Outer Container

| Property       | Value |
|----------------|-------|
| Background     | `white` |
| Border radius  | `16px` |
| Shadow         | Shadow/Bottom — `0px 2px 8px rgba(0,0,0,0.07)` |
| Padding        | `48px` top, `32px` bottom, `32px` left/right |
| Gap            | `32px` |
| Layout         | `flex column` |
| Size           | `762 × 136px` |

### Segmented Toggle

Absolutely positioned, centered horizontally (`left: 50%`, `translateX(-50%)`), `top: -17px` — so it overhangs the top edge of the card.

Uses the **Segmented Buttons** component (2 options).

| Property       | Value |
|----------------|-------|
| Width          | `362px` |
| Position       | `absolute`, centered, `top: -17px` |
| Options        | "Shop RVs" (selected) · "Sell my RV" |

### Search Row

| Property       | Value |
|----------------|-------|
| Layout         | `flex row` |
| Gap            | `16px` |
| Alignment      | `items-start`, `justify-center` |

#### Search Input

A pill-shaped input combining AI search, a vertical divider, and an inline ZIP field — all in one bar.

| Property       | Value |
|----------------|-------|
| Height         | `56px` |
| Background     | `white` |
| Border         | `1px solid #D5D5D5` |
| Border radius  | `100px` (pill) |
| Padding        | `4px 32px 4px 16px` |
| Overflow       | `clip` |
| Flex           | `1` (fills remaining width) |

**Contents (left to right):**

| Element | Spec |
|---------|------|
| AI search icon | `24px` |
| "Try" | Label 1 SemiBold — `16px` / `22.4px`, `#6E7072` |
| Placeholder text | Body 1 Regular — `16px` / `22.4px`, `#6E7072` (e.g. "Family-friendly RVs for 4") |
| Vertical divider | Rotated `90°`, `35px` tall, `16px` wide area |
| `location` icon | `20px` |
| ZIP code | Label 1 Medium — `16px` / `22.4px`, `#6E7072` (e.g. "60660") |

**Gap between elements:** `8px` (general), `4px` between "Try" and placeholder text.

#### Search Button

| Property       | Value |
|----------------|-------|
| Background     | `var(--colors/primary/primary)` → `#006836` |
| Border radius  | `100px` (pill) |
| Padding        | `16px 32px` |
| Flex           | `shrink-0` (doesn't compress) |
| Label          | "Search" — Button 1 SemiBold `16px` / `22.4px`, white |

A hidden duplicate button exists in the structure (likely for a loading/disabled state variant).

### Typography Summary (Homepage Search)

| Style | Spec | Usage |
|-------|------|-------|
| Label 1 SemiBold | SemiBold `16px` / `22.4px` | "Try" prefix |
| Body 1 | Regular `16px` / `22.4px` | Placeholder text |
| Label 1 | Medium `16px` / `22.4px` | ZIP code |
| Button 1 | SemiBold `16px` / `22.4px` | "Search" button |
| Label 2 SemiBold | SemiBold `14px` / `19.6px` | Segmented toggle labels |

---

## Filter SRP

> Source: [Design System TIDE 2.0 — Filter SRP](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=12075-793)

A horizontal toolbar bar for the top of search results, containing a Filter pill, a Sort pill, and a Favorite icon button.

### Props

| Prop    | Values                     | Default     |
|---------|----------------------------|-------------|
| `state` | `"Default"` · `"Active"`   | `"Default"` |

### Outer Container

| Property       | Value |
|----------------|-------|
| Background     | `var(--colors/surface/surface)` → `white` |
| Border bottom  | `1px solid var(--colors/border/border-low)` → `#E4E4E5` |
| Height         | `72px` |
| Padding        | `16px 20px` (`var(--16px)` vertical, `20px` horizontal) |
| Gap            | `8px` |
| Layout         | `flex row`, `items-center` |

### Filter Pill

A pill-shaped selectable button. Appearance changes based on `state`.

#### Default State

| Property       | Value |
|----------------|-------|
| Background     | `var(--colors/surface/surface-variant)` → `#F2F2F2` |
| Border radius  | `100px` (pill) |
| Padding        | `8px 16px` |
| Flex           | `1` (shares space with Sort pill) |
| Icon           | `tune`, `20px`, `#252526` |
| Label          | "Filter" — Label 2 Medium `14px` / `19.6px`, `#252526` |
| Gap            | `8px` (icon to label) |

#### Active State

| Property       | Value |
|----------------|-------|
| Background     | `var(--colors/secondary/secondary)` → `#252526` |
| Border radius  | `100px` (pill) |
| Padding        | `8px 16px` |
| Flex           | `shrink-0` (sized to content) |
| Icon           | `tune`, `20px`, white |
| Label          | "Filter" — Medium `14px` / `19.6px`, white (`on-secondary`) |
| Count          | "(4)" — Medium `14px` / `19.6px`, white (`on-surface-inverse`) |
| Gap            | `8px` (icon to label), `4px` (label to count) |

### Sort Pill

Always the same appearance regardless of `state`.

| Property       | Value |
|----------------|-------|
| Background     | `var(--colors/surface/surface-variant)` → `#F2F2F2` |
| Border radius  | `100px` (pill) |
| Padding        | `8px 16px` |
| Flex           | `1` (fills remaining space) |
| Icon           | `swap_vert`, `20px` |
| Label          | "Sort" — Label 2 Medium `14px` / `19.6px`, `#252526` |
| Gap            | `8px` |

### Favorite Icon Button

| Property       | Value |
|----------------|-------|
| Background     | `var(--colors/surface/surface)` → `white` |
| Padding        | `8px` |
| Border radius  | `100px` (pill) |
| Flex           | `shrink-0` |
| Icon           | `favorite`, `24px` |

---

## Features and Specs

> Source: [Design System TIDE 2.0 — Features and specs](https://www.figma.com/design/9oYSAyY2X9mPaUMiobZOPg/Design-System---TIDE-2.0?node-id=7976-10108)

A modal (MD-XL) or bottom sheet (XS-SM) that displays vehicle specifications as a 2-column grid of icon cards, preceded by VIN/stock info and a factory specs link.

### Props

| Prop   | Values                   | Default  |
|--------|--------------------------|----------|
| `size` | `"MD-XL"` · `"XS-SM"`   | `"XS-SM"` |

### Outer Container

| Property       | MD-XL | XS-SM |
|----------------|-------|-------|
| Width          | `576px` (fixed) | `428px` |
| Border radius  | `16px` all corners | `16px` top only |
| Shadow         | `0px 2px 8px 2px rgba(0,0,0,0.07)` | `0px -2px 8px 2px rgba(0,0,0,0.07)` (upward, bottom-sheet style) |
| Overflow       | `clip` | `clip` |
| Layout         | `flex column` | `flex column` |

### Modal Top Bar

| Property       | Value |
|----------------|-------|
| Height         | `72px` |
| Background     | `white` |
| Border bottom  | `1px solid var(--colors/border/border-low)` → `#E4E4E5` |
| Padding        | `16px 20px` |
| Gap            | `8px` |

| Element | Value |
|---------|-------|
| Title | "Features and specs" — Bold `20px` / `28px`, `#252526` |
| Close button | White bg, `8px` padding, `100px` radius, `close` icon `24px` |

### Content Area

| Property       | MD-XL | XS-SM |
|----------------|-------|-------|
| Padding        | `32px` all sides | `32px 20px` |
| Max height     | `516px` | (none, scrolls full height) |
| Gap            | `16px` | `16px` |
| Background     | `white` | `white` |
| Overflow       | `clip` | `clip` |

#### Description Text

Body 1 Regular `16px` / `24px`, `#252526`:

> For more details about this RV, see the **factory specs**. (Note: factory specs are provided by the manufacturer and may not reflect this RV for sale.)

"factory specs" is **Bold**, underlined (link).

#### VIN / Stock Info

Each line is Body 1 Regular `16px` / `24px`, `#252526`, separated by `8px` gap:

- VIN: 5B4MP67G123353230
- Stock #: CCX3540C
- 19 days on RV Trader

#### Spec Grid

A 2-column grid of **Informational** cards, `16px` gap in both directions.

### Informational Card (sub-component)

Each spec is rendered in a bordered card.

| Property       | Value |
|----------------|-------|
| Background     | `white` |
| Border         | `1px solid var(--colors/border/border-low)` → `#E4E4E5` |
| Border radius  | `8px` |
| Padding        | `16px` |
| Gap (outer)    | `8px` |
| Gap (inner)    | `4px` between icon, value, and label |
| Flex           | `1` (fills half-width of row) |

**Contents (top to bottom):**

| Element | Style |
|---------|-------|
| Icon | `20px` (vehicle-specific icons) |
| Value | SemiBold `16px` / `24px`, `#252526` |
| Label | Medium `14px` / `20px`, `#6E7072` (on-surface-variant) |

### Spec Items (example set)

| Icon | Value | Label |
|------|-------|-------|
| `travel_trailer` | Travel trailer | RV type |
| `diamond` | New | Condition |
| `width` | 25 ft. | Length |
| `weight` | 3,500 lbs. | GVWR |
| `sleeps` | 4 | Sleeping capacity |
| `ac_unit` | 2 | Air conditioners |
| `gas` | Gasoline | Fuel type |
| `palette` | Beige | Interior color |
| `palette` | Metallic silver | Exterior color |
| `odometer` | 3,230 mi. | Mileage |
| `engine` | Mercedes-Benz® 3.0L V6 Turbo Diesel | Engine |
| `bunkhouse` | Bunkhouse | Floor plan |
| `bed` | Dinette conversion, King bed | Sleep options |
| `draft` | 2 | Slide outs |
| `water` | 18 gal. | Water capacity |
| `umbrella` | Awnings included | (no label) |
| `leveling_jacks` | Leveling jacks included | (no label) |
| `power_off` | Self contained | (no label) |

### Typography Summary (Features and Specs)

| Style | Spec | Usage |
|-------|------|-------|
| Bold | `20px` / `28px` | Modal title |
| Body 1 | Regular `16px` / `24px` | Description, VIN/stock lines |
| SemiBold | `16px` / `24px` | Spec card values |
| Medium | `14px` / `20px` | Spec card labels |
