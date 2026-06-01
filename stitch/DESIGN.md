---
name: Hyper-Speed Orbital Arcade
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363940'
  surface-container-lowest: '#0b0e14'
  surface-container-low: '#191c22'
  surface-container: '#1d2026'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2eb'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e1e2eb'
  inverse-on-surface: '#2e3037'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#ecb2ff'
  on-secondary: '#520071'
  secondary-container: '#cf5cff'
  on-secondary-container: '#480063'
  tertiary: '#fff6e9'
  on-tertiary: '#3e2e00'
  tertiary-container: '#ffd66e'
  on-tertiary-container: '#775c00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ecb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#74009f'
  tertiary-fixed: '#ffdf94'
  tertiary-fixed-dim: '#f5bf00'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#10131a'
  on-background: '#e1e2eb'
  surface-variant: '#32353c'
typography:
  score-display:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  container-margin: 2rem
  gutter: 1rem
  hud-padding: 1.5rem
  component-gap: 0.75rem
---

## Brand & Style

This design system centers on hyper-velocity and precision. It is built for an arcade experience that demands immediate focus and high-energy interaction. The aesthetic merges **Cyber-Futurism** with **Glassmorphism**, creating a high-contrast environment where UI elements appear as projected light interfaces floating in deep space.

The emotional response should be one of "controlled chaos"—urgent but legible. Visuals rely on high-saturation neon accents against a void-like background to eliminate peripheral distractions, ensuring the player's eye remains locked on the central orbital mechanics.

## Colors

The palette is built on a "Void and Neon" logic.
- **Deep Space Navy (#0B0E14):** Used for the primary canvas to provide maximum contrast for neon elements.
- **Neon Cyan (#00F2FF):** Represents the player, safe zones, and active progress. It should always feel "electric."
- **Electric Purple (#BD00FF):** Reserved for hazards, obstacles, and tension-filled UI moments.
- **Bright Amber (#FFC700):** Used exclusively for rewards, sparks, and high-value notifications.

All accent colors must be implemented with a "bloom" effect (box-shadow or drop-shadow) to simulate glowing gas or light projection.

## Typography

Typography functions as a data-delivery system. **Space Grotesk** provides a technical, geometric edge for scores and headers, emphasizing the futuristic theme. **Inter** is used for secondary body text to maintain absolute legibility during fast-paced movement.

- **Score Display:** The largest hierarchy, used for real-time points. It should use tabular figures to prevent layout jitter during rapid score increases.
- **Label Caps:** Used for HUD metadata (e.g., "COMBO x5").
- **Contrast:** Text on dark surfaces should always be pure white or a high-tint version of the primary cyan to ensure it cuts through background blurs.

## Layout & Spacing

The layout utilizes a **Fixed Content Area** centered on the screen to represent the "Orbital Zone." 

- **HUD Layers:** UI panels are pinned to the corners of the viewport with a safe-area margin of `2rem`.
- **Dynamic Padding:** Inside HUD panels, a consistent `1.5rem` padding is used to ensure text doesn't feel cramped against the glowing borders.
- **Responsive Behavior:** On mobile, the "Orbital Zone" scales to fill the width (minus margins), while HUD elements stack vertically at the top and bottom to clear the thumb-interaction zones in the center.

## Elevation & Depth

This design system eschews traditional shadows for **Luminous Layering**:

1.  **Level 0 (The Void):** Pure Navy (#0B0E14) background.
2.  **Level 1 (The Grid):** Faint, low-opacity (5%) cyan grid lines to provide a sense of scale.
3.  **Level 2 (HUD Panels):** Glassmorphism surfaces using `backdrop-filter: blur(12px)` and a `1px` semi-transparent cyan border.
4.  **Level 3 (Interactive Elements):** Buttons and active hazards with heavy neon glows (`box-shadow`) that appear to cast light onto the levels below.
5.  **Level 4 (Overlay/Modals):** High-intensity blurs with a primary color tint to wash out the game world behind the menu.

## Shapes

The shape language is strictly **Pill-shaped and Circular**. 

- **Buttons & Chips:** Must use the maximum border-radius (pill) to contrast with the sharp, geometric typography.
- **Orbital Paths:** Perfect circles with 1px-2px strokes.
- **Interactive Hazards:** Sharp-edged shapes (triangles/hexagons) can be used within the hazard system to denote danger, but all UI containers must remain rounded to feel like sophisticated, "friendly" tech.

## Components

### Buttons
Primary action buttons are pill-shaped with a solid Neon Cyan fill and black text. On hover or active state, they emit a cyan outer glow. Secondary buttons use a "ghost" style: 1px Cyan border with no fill, becoming semi-transparent on press.

### HUD Panels (Glassmorphism)
Containers for scores or health bars are styled as frosted glass.
- **Background:** `rgba(255, 255, 255, 0.03)`
- **Border:** `1px solid rgba(0, 242, 255, 0.3)`
- **Blur:** `20px` backdrop-blur.

### Orbital Rings
The core gameplay element. Rings use a `2px` stroke weight. The player’s current ring is Neon Cyan with an inner glow, while upcoming or inactive rings are Deep Purple at 30% opacity.

### Collectibles (Sparks)
Small circular elements with an Amber (#FFC700) fill. They must utilize a multi-layered shadow to create a "pulsing light" effect, making them pop against the dark void.

### Progress Bars
Thin, horizontal lines. The "track" is a dark navy-grey; the "fill" is a solid Neon Cyan gradient that ends in a bright white "lead" point to simulate a traveling spark of energy.