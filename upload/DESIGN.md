---
name: Obsidian Pima
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#C4C7C7'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#006d2f'
  on-secondary: '#ffffff'
  secondary-container: '#5dfd8a'
  on-secondary-container: '#007232'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#66ff8e'
  secondary-fixed-dim: '#3de273'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005322'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#E2E2E2'
  whatsapp-green: '#25D366'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  container-max: 1440px
  section-gap: 120px
  gutter-desktop: 24px
  margin-desktop: 48px
  margin-mobile: 20px
  unit: 4px
---

## Brand & Style
The brand embodies **High-End Minimalism** and **Quiet Luxury**. It is disciplined, architectural, and sophisticated, targeting an audience that values "presence over fashion." The aesthetic is inspired by premium basics retailers like COS and Theory, focusing on textile quality and sharp silhouettes through a "less is more" philosophy.

The UI should evoke feelings of authority, exclusivity, and masculine elegance. This is achieved through a monochrome foundation punctuated by high-contrast accents, generous whitespace, and a cinematic photographic style. The design movement is a blend of **Minimalism** and **High-Contrast Editorial**, utilizing sharp grids and professional typography to create a sense of structural integrity and premium craftsmanship.

## Colors
The palette is dominated by an uncompromising **Pitch Black** (#000000) for primary elements and typography, creating a high-fashion, editorial contrast against a **Soft White** (#F9F9F9) background. This "Deep Mono" approach ensures that the focus remains entirely on the product textures and photography.

A singular functional accent, **WhatsApp Green** (#25D366), is used exclusively for primary Calls to Action and communication touchpoints. This ensures that the conversion path is instantly recognizable without diluting the premium aesthetic. Grayscale tones (Surface Variants) are used sparingly for borders and secondary labels to maintain a clean, airy feel.

## Typography
The system uses **Inter** exclusively to maintain a utilitarian, corporate-chic vibe that doesn't distract from the visual content. 

- **Display levels** use tight letter-spacing and heavy weights to create a "blocky," architectural feel in headlines.
- **Body text** is optimized for readability with standard weights and generous line heights.
- **Labels and Buttons** are frequently transformed to uppercase with increased letter-spacing to evoke luxury branding and clear information hierarchy.
- **Italics** are used for philosophical "Identity" quotes to add a layer of sophistication and editorial flavor.

## Layout & Spacing
The layout follows a **Fixed-Width Grid** model centered on a 1440px container. It utilizes a 12-column structure for desktop with significant breathing room between sections (120px vertical gaps).

- **Desktop:** 48px outer margins with 24px gutters. Product grids typically span 4 columns (3-up).
- **Mobile:** Margins shrink to 20px. Grid columns reflow to a single stack.
- **Rhythm:** Spacing is strictly proportional to a 4px base unit. Section transitions are marked by subtle borders (#C4C7C7 at 30% opacity) or shifts in background hue between white and surface-gray.

## Elevation & Depth
Depth is conveyed primarily through **Tonal Layering** and **Cinematic Overlays** rather than traditional shadows.

- **The Header** uses a high-blur backdrop filter (80% opacity surface) to stay distinct from the scrolling content.
- **Images** utilize subtle black-to-transparent gradients (bottom-up) to provide contrast for hover-state CTAs.
- **Interactive Elements** (like the floating WhatsApp button) use **Ambient Shadows** (extra-diffused, low opacity) to signify a "floating" physical layer.
- **Hover States** for cards involve a slight scale-up (105%) of the background image, creating an "immersion" effect without changing the physical footprint of the card.

## Shapes
The shape language is **Strictly Geometric**. Primary elements—buttons, cards, and section containers—use **Sharp (0px)** corners to reinforce the architectural, "Blackbox" brand identity. 

The only exception is the **WhatsApp Floating Button**, which uses a `full` (pill) radius to align with the globally recognized chat icon and provide a soft, approachable touchpoint against the otherwise rigid grid.

## Components
- **Buttons:** Two distinct styles. 
    1. *Primary Action:* Sharp-edged, solid WhatsApp Green, uppercase text, high padding (20px vertical). 
    2. *Secondary/UI Action:* Solid Black, high padding, appearing only on hover within product cards.
- **Product Cards:** Aspect ratio 3:4. Minimalist footer containing title (Body MD Medium) and price (Label Caps) on a single horizontal line. Hover state triggers an overlay button.
- **Navigation:** Top-tier links are uppercase with a tracking-heavy Label style. Active state is indicated by a 2px bottom border in Primary Black.
- **Badges/Labels:** "Caps" style with 0.1em letter-spacing, used for categories and price points to provide a clean, "catalog" look.
- **Icons:** Material Symbols Outlined, 400 weight, 24px optical size. Thin stroke weights are preferred to match the Inter typography.