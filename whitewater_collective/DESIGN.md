# Design System Specification: Kinetic Fluidity

This design system is built to bridge the gap between the raw, unpredictable energy of whitewater rafting and the precision required for high-end expedition planning. It rejects the "templated" look of standard outdoor apps in favor of a high-end editorial experience that feels as immersive as the river itself.

## 1. Overview & Creative North Star
**Creative North Star: "The Kinetic Expedition"**
The design system is rooted in the concept of *Kinetic Fluidity*. We move away from static, boxy grids to embrace a layout that feels like it’s in motion. Through intentional asymmetry, overlapping imagery, and bold, high-contrast typography, we create a digital environment that feels rugged, authoritative, and premium. This isn't just a utility; it is a piece of gear.

## 2. Colors & Surface Philosophy
The palette utilizes deep river blues for depth and safety oranges for high-energy interaction.

*   **The "No-Line" Rule:** To achieve a bespoke, editorial feel, designers are strictly prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit directly against a `surface` background to define its territory.
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of physical layers. Use the surface-container tiers (`lowest` to `highest`) to create "nested" depth. 
    *   Main background: `surface` (#f8f9fa).
    *   Secondary content blocks: `surface-container-low` (#f3f4f5).
    *   Featured cards: `surface-container-lowest` (#ffffff) to create a subtle "lift."
*   **The Glass & Gradient Rule:** To evoke the spray of the river and the sleekness of modern kayaks, use Glassmorphism for floating navigation elements and overlays. Apply `surface` colors at 70% opacity with a 12px-20px backdrop-blur. 
*   **Signature Gradients:** Main CTAs and Hero sections should utilize a subtle "Flow Gradient" transitioning from `primary` (#003461) to `primary_container` (#004b87) at a 135-degree angle to add soul and dimension.

## 3. Typography
The typography strategy pairs a technical, wide-set sans-serif with a versatile, modern grotesque to balance "The Machine" (the gear) and "The Human" (the adventurer).

*   **Display & Headlines (Space Grotesk):** This is our "Rugged" voice. Use `display-lg` and `headline-lg` with tight letter-spacing (-2%) to create impact. These should often be placed with intentional asymmetry—bleeding off the edge of a container or overlapping a photographic element.
*   **Title & Body (Manrope):** This is our "Professional" voice. Manrope provides exceptional readability in outdoor contexts. Use `body-lg` for all instructional content to ensure legibility when the user is on the move.
*   **Labels:** `label-md` and `label-sm` should be set in all-caps with a +5% letter-spacing to mimic the technical specifications found on high-end rafting equipment.

## 4. Elevation & Depth
We eschew traditional "drop shadows" in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-highest` element placed on a `surface` background creates a natural sense of weight and importance without the "fuzzy" look of 2010-era shadows.
*   **Ambient Shadows:** If a floating element (like a FAB or a Modal) requires a shadow, it must be a "Soft Mist" shadow: a 32px blur at 6% opacity using the `on_surface` color tinted with `primary`. This mimics natural, ambient light.
*   **The Ghost Border Fallback:** For high-density data where tonal shifts aren't enough, use a "Ghost Border": the `outline_variant` (#c2c6d1) at 15% opacity. Never use 100% opaque lines.
*   **Tactile Roundedness:** Use the `xl` (1.5rem) corner radius for primary containers and `md` (0.75rem) for smaller interactive components like buttons and chips. This creates a "molded" feel, reminiscent of high-durability polymer gear.

## 5. Components

### Buttons: The Action Gear
*   **Primary:** Background: `secondary` (#ab3600); Text: `on_secondary` (#ffffff). These should feel like "Safety Orange"—impossible to miss. Use the `full` (9999px) roundedness for a sleek, modern look.
*   **Secondary:** Background: `primary_container` (#004b87); Text: `on_primary` (#ffffff). For secondary navigational actions.
*   **Tertiary:** Transparent background with a `secondary` text color. Use only for low-priority actions.

### Cards & Discovery
*   **The "Fluid Card":** Cards must never have borders. Use `surface-container-low` and implement the `xl` corner radius. 
*   **Spacing over Lines:** Forbid the use of divider lines in lists. Use `1.5rem` to `2.5rem` of vertical white space to separate content blocks.

### Inputs & Search
*   **Expedition Inputs:** Use `surface-container-highest` as the fill color with no border. On focus, transition the background to `surface-container-lowest` and add a 2px "Ghost Border" of `primary`.

### Specialized Components
*   **Water Level Indicators:** Use a vertical gauge component utilizing a gradient from `primary` to `primary_fixed_dim`. 
*   **Weather/Rapid Difficulty Chips:** Use `secondary_container` for high-alert items (Class IV+ rapids) and `tertiary_container` for standard info.

## 6. Do's and Don'ts

### Do:
*   **Overlap Elements:** Allow high-quality imagery of water and rafts to overlap with `headline-lg` text.
*   **Use Generous Padding:** Use the spacing scale to ensure "breathing room" (minimum 2rem padding for sections).
*   **Embrace Asymmetry:** Align text to the left while keeping some images or CTA blocks floated to the right to create a "river-like" flow.

### Don't:
*   **Don't use 1px Dividers:** They make the application look like a spreadsheet. Use tonal shifts.
*   **Don't use Pure Black:** Always use `on_surface` (#191c1d) for text to maintain a premium, ink-like quality.
*   **Don't use Standard Shadows:** Avoid high-opacity, small-blur shadows; they look "cheap" and break the expedition aesthetic.
*   **Don't Crowd the Screen:** If a screen feels busy, increase the background `surface` area.