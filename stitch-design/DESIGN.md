# Design System Strategy: Editorial Heritage

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Estate."** 

We are moving away from the "app-like" rigidity of modern fintech and toward a high-end editorial experience that feels as permanent and trustworthy as the Buzău hills. This system rejects the "template" look by using intentional asymmetry, overlapping elements, and extreme typographic contrast. 

Instead of a standard grid, we view the screen as a series of **Terraced Surfaces**. Much like the rolling landscapes of the region, elements should feel organic and layered. We achieve "Traditional yet Modern" by pairing the authoritative weight of classic serif typography with the sophisticated lightness of modern glassmorphism and tonal depth. This is a space built for stability, designed to feel welcoming to seniors while commanding the respect of a premium institution.

---

## 2. Colors: The Natural Palette
Our palette is rooted in the earth, not the screen. We avoid "digital" vibrancy in favor of pigments found in nature.

*   **Primary (#154212 / #2D5A27):** A deep, commanding forest green that represents growth and rootedness.
*   **Secondary (#775839):** A soft clay tone that provides warmth and a "human" touch to the interface.
*   **Tertiary (#735C00):** Golden harvest accents used sparingly for moments of prosperity and success (e.g., "Goal Reached" states).

### The "No-Line" Rule
Standard UI relies on lines to separate ideas; this design system relies on **Tones**. Designers are strictly prohibited from using 1px solid borders to section off content. Boundaries must be defined by:
1.  **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
2.  **Organic Overlaps:** A card `surface-container-lowest` partially overlapping a `primary-container` hero section.

### Signature Textures
To add "soul," use subtle radial gradients on hero backgrounds. Transition from `primary` (#154212) at the edges to `primary-container` (#2D5A27) in the center. This mimics natural light hitting a forest canopy, providing a professional polish that flat color cannot match.

---

## 3. Typography: Authority Meets Clarity
The typographic scale is designed for maximum legibility, honoring our senior community members while maintaining an elite editorial feel.

*   **Display & Headlines (Noto Serif):** These are our "Classic Trust" anchors. Use `display-lg` (3.5rem) for high-impact hero statements. The serif should feel tall, sturdy, and academic.
*   **Body & Labels (Plus Jakarta Sans):** A clean, modern sans-serif chosen for its high x-height and open apertures, ensuring readability on all screen sizes.
*   **The Hierarchy Rule:** Always pair a large Serif headline with a significantly smaller Sans-Serif sub-headline. This contrast is the hallmark of high-end editorial design.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to create "pop"; we use layers to create "presence."

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers.
    *   **Level 0:** `surface` (The base ground).
    *   **Level 1:** `surface-container-low` (Subtle recessed areas).
    *   **Level 2:** `surface-container-lowest` (Elevated cards or interaction points).
*   **Ambient Shadows:** If a floating element (like a modal) is required, use an extra-diffused shadow: `blur: 40px`, `spread: 0`, `opacity: 6%`. The shadow color must be a tinted version of `on-surface` (#1C1C19) to mimic natural ambient light.
*   **Glassmorphism:** For top navigation or floating action panels, use `surface` at 80% opacity with a `20px backdrop-blur`. This allows the "landscape" of the content to bleed through, softening the interface.
*   **The Ghost Border:** If accessibility requires a stroke, use `outline-variant` at 15% opacity. Never use a 100% opaque border.

---

## 5. Components: Organic Architecture

### Buttons: The Weighted Pebble
*   **Primary:** Filled with `primary`, using `on-primary` text. The corners use the `md` (0.75rem) roundness.
*   **Secondary:** A "Glass" button using `surface-variant` with a soft blur. No border.
*   **Tertiary:** Pure typography (`label-md`) in `primary` color with a subtle `secondary-fixed-dim` underline.

### Input Fields: Soft Foundations
*   **Style:** Inputs should not look like "boxes." Use a `surface-container-high` background with a `sm` (0.25rem) bottom radius. 
*   **States:** On focus, the background transitions to `surface-container-highest` with a 2px `primary` bottom-only indicator.

### Cards: The Nested Sheet
*   **Rule:** Forbid divider lines.
*   **Structure:** A `surface-container-lowest` card sitting on a `surface-container-low` background. Use vertical white space (32px+) to separate the card header from the body text.

### High-End Components for CAR Romcarbon
*   **The Prosperity Tracker:** A custom progress bar using a gradient from `secondary` to `tertiary`. It should feel like a "filling vessel" rather than a loading bar.
*   **The Heritage Hero:** A layout component where a Serif headline overlaps a soft-focus image of the Buzău landscape, utilizing a `surface` glassmorphism card for the CTA.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use extreme white space. Let the layout breathe like the open countryside.
*   **Do** use "Optical Centering." Serifs often need slight manual adjustment to look centered.
*   **Do** use the `xl` (1.5rem) roundness for large containers to mimic the soft curves of hills.

### Don't:
*   **Don't** use pure black (#000000). Use `on-surface` (#1C1C19) for a softer, premium feel.
*   **Don't** use "Neon" or "Action" colors for success states. Stick to the `primary` and `tertiary` tokens.
*   **Don't** use sharp 90-degree corners. Everything in nature has a radius.
*   **Don't** use dividers or "rules." Let the background color shifts do the work.