---
name: Khoa Portfolio
description: Swiss-cinematic personal brand. Dark authority phase into confident archival light. Restrained signal red. Bold typographic scale. Full-bleed editorial layout with generous spatial rhythm.
colors:
  night-base: "oklch(0.1 0.012 253)"
  night-deep: "oklch(0.06 0.01 253)"
  night-overlay: "oklch(0.112 0.012 255 / 0.55)"
  mist-line: "oklch(0.94 0.01 255)"
  day-surface: "oklch(0.93 0.005 255)"
  day-surface-warm: "oklch(0.96 0.003 255)"
  day-ink: "oklch(0.12 0.01 255)"
  day-secondary: "oklch(0.22 0.01 255)"
  day-muted: "oklch(0.34 0.01 255)"
  day-faint: "oklch(0.50 0.01 255)"
  signal-red: "oklch(0.637 0.237 25.3)"
  signal-red-deep: "oklch(0.577 0.245 27.3)"
  frost-text: "oklch(0.97 0.005 255)"
  frost-dim: "oklch(0.97 0.005 255 / 0.55)"
  border-frost-soft: "oklch(1 0 0 / 0.10)"
  border-frost-mid: "oklch(1 0 0 / 0.30)"
  border-day: "oklch(0.82 0.01 255)"
  border-day-faint: "oklch(0.88 0.005 255)"
typography:
  display:
    fontFamily: "General Sans, sans-serif"
    fontSize: "clamp(3.5rem, 14vw, 12rem)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "General Sans, sans-serif"
    fontSize: "clamp(2.75rem, 8vw, 8rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  section:
    fontFamily: "General Sans, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  title:
    fontFamily: "General Sans, sans-serif"
    fontSize: "clamp(1.34rem, 1.62vw, 1.92rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "General Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 1.1vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.004em"
  quote:
    fontFamily: "General Sans, sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.004em"
  label:
    fontFamily: "General Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.5625rem, 0.9vw, 0.8125rem)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "0.2em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  hairline-round: "999px"
layout:
  approach: "editorial-full-bleed"
  padding: "clamp(1.25rem, 6vw, 8vw)"
  description: "No container wrappers. All sections are 100vw. Text width is controlled via clamp()/vw font-size and percentage inline padding. Content self-scales with the viewport."
  sectionSpacing: "Varied per narrative phase. Dark sections use tighter vertical rhythm; light sections breathe more."
  maxLineLength: "65-75ch for body text, enforced by font-size scaling, not max-width containers."
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section-gap: "clamp(4rem, 9vw, 9rem)"
components:
  nav-link-default:
    backgroundColor: "transparent"
    textColor: "{colors.frost-text}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0"
  nav-link-hover:
    backgroundColor: "transparent"
    textColor: "{colors.signal-red}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0"
  hero-cta-default:
    backgroundColor: "oklch(1 0 0 / 0.10)"
    textColor: "{colors.frost-text}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  hero-cta-hover:
    backgroundColor: "oklch(1 0 0 / 0.10)"
    textColor: "{colors.signal-red}"
    borderColor: "{colors.signal-red}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  status-dot-active:
    backgroundColor: "oklch(1 0 0 / 0.9)"
    rounded: "{rounded.hairline-round}"
    width: "10px"
    height: "10px"
---

# Design System: Khoa Portfolio

## Overview

**Creative North Star: "Swiss Precision, Cinematic Pacing"**

Reference anchor: sirnik.co. The target is a premium, studio-grade portfolio that communicates through bold typographic hierarchy, generous spatial rhythm, and disciplined restraint. Not a creative-developer showcase; an operator's dossier rendered with design-literate confidence.

The system moves through a controlled narrative arc: a commanding dark hero phase where identity is asserted with full-viewport photography and compressed display type, then a measured transition into a confident light surface where work evidence is read at recruiter speed. Every section is full-bleed (100vw). There are no container wrappers. Content width is governed by inline padding (`clamp(1.25rem, 6vw, 8vw)`) and viewport-relative font sizing.

**Key Characteristics:**
- Two-phase palette: night authority into day confidence, bridged by a scroll-driven transition
- Swiss-modernist typographic hierarchy: bold display, regular body, high-tracking uppercase labels
- Full-bleed editorial layout with no fixed-width containers
- Photography as primary content, not decoration
- Motion as structural sequencing: scroll-triggered reveals, compositor-safe transforms only
- Generous, varied spacing that creates rhythm through alternating density and breathing room

## Colors

The palette is phase-based and uses OKLCH for perceptual uniformity. Deep blue-tinted night tones carry authority; low-chroma warm neutrals provide scannable day surfaces. Red is directional signal only.

### Color Strategy: Restrained
Tinted neutrals dominate both phases. Signal red is the single accent, held below 10% surface coverage. The restraint IS the voice; scarcity creates impact when red appears.

### Night Phase (Hero, About, SignOff)
- **Night Base** (`oklch(0.1 0.012 253)`): Primary dark foundation. Not pure black; blue-tinted for depth.
- **Night Deep** (`oklch(0.06 0.01 253)`): Deepest tone for vignettes and gradients within dark sections.
- **Night Overlay** (`oklch(0.112 0.012 255 / 0.55)`): Atmospheric layer. Preserves depth without card stacking.
- **Frost Text** (`oklch(0.97 0.005 255)`): High-contrast foreground on dark surfaces. Blue-tinted, never pure white.
- **Frost Dim** (`oklch(0.97 0.005 255 / 0.55)`): Secondary text, timestamps, muted metadata on dark.

### Day Phase (Work Experience, Credentials, Gallery)
- **Day Surface** (`oklch(0.93 0.005 255)`): Primary light background. Warm enough to feel confident, not washed out.
- **Day Surface Warm** (`oklch(0.96 0.003 255)`): Lighter variant for featured content framing (credential images, gallery).
- **Day Ink** (`oklch(0.12 0.01 255)`): Primary text. Nearly black, blue-tinted.
- **Day Secondary** (`oklch(0.22 0.01 255)`): Body copy and supporting text.
- **Day Muted** (`oklch(0.34 0.01 255)`): Metadata, timestamps, operational language.
- **Day Faint** (`oklch(0.50 0.01 255)`): Tertiary labels, bracket signals, chapter numbers.

### Signal
- **Signal Red** (`oklch(0.637 0.237 25.3)`): Hover states, directional nudges, bracket markers. The ONLY saturated color.
- **Signal Red Deep** (`oklch(0.577 0.245 27.3)`): Pressed/active states.

### Borders
- **Border Frost Soft** (`oklch(1 0 0 / 0.10)`): Subtle dividers on dark surfaces.
- **Border Frost Mid** (`oklch(1 0 0 / 0.30)`): Stronger separators on dark surfaces.
- **Border Day** (`oklch(0.82 0.01 255)`): Primary dividers on light surfaces.
- **Border Day Faint** (`oklch(0.88 0.005 255)`): Subtle image framing and table lines.

**The Signal Scarcity Rule.** Red stays sparse and directional. If red appears as a background fill, section accent, or dominant element, the hierarchy has collapsed. Red is a cursor, not a surface.

## Typography

**Single Typeface:** General Sans (variable, Fontshare)
**Available Weights:** 200 (Extralight), 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
**Styles:** Normal + Italic

General Sans is a geometric sans-serif that carries the full typographic range. The system relies on extreme scale contrast (display at 12rem vs. label at 0.56rem) and weight contrast (700 vs. 400) to create hierarchy without needing a second typeface. This is a Swiss-modernist choice: one family, committed weight range, no decorative faces.

### Hierarchy (forward-looking target)
| Role | Weight | Size | Line-height | Tracking | Usage |
|---|---|---|---|---|---|
| **Display** | 700 | `clamp(3.5rem, 14vw, 12rem)` | 0.82 | -0.02em | Hero name, identity statements |
| **Headline** | 700 | `clamp(2.75rem, 8vw, 8rem)` | 0.88 | -0.04em | Section headings (Work, Gallery) |
| **Section** | 700 | `clamp(1.75rem, 4vw, 3.5rem)` | 0.88 | -0.04em | Sub-section heads (Credentials) |
| **Title** | 500 | `clamp(1.34rem, 1.62vw, 1.92rem)` | 1.1 | -0.02em | Role titles, credential names |
| **Body** | 400 | `clamp(0.875rem, 1.1vw, 1rem)` | 1.45 | 0.004em | Supporting copy, narrative |
| **Quote** | 400 | `clamp(1.125rem, 2vw, 1.75rem)` | 1.35 | -0.004em | About narrative, editorial passages |
| **Label** | 300 | `clamp(0.5625rem, 0.9vw, 0.8125rem)` | 1.2 | 0.2em, uppercase | Nav, timestamps, metadata, signals |

**All sizes use `clamp()` with vw middle values.** No breakpoint-based font-size overrides. Type self-scales.

**The Compression Rule.** Display and headline lines use tight line-heights (0.82, 0.88) so multi-line statements read as one decisive block, not stacked banners. Body and quote use open line-heights for scanning comfort.

**Light-on-dark adjustment.** Add +0.05 to line-height for body/quote text rendered on night surfaces. Light text reads thinner and needs more vertical breathing room.

## Layout

### Editorial Full-Bleed System
Every section spans 100vw. No `max-width` container wraps content. Text width is controlled by:
1. **Inline padding** (`--layout-padding: clamp(1.25rem, 6vw, 8vw)`) applied to each section
2. **Font-size scaling** via `clamp()` with vw middle values
3. **Natural line-length** capping at 65-75ch through the above two mechanisms

### Responsive Approach
- **Font sizes:** vw-based `clamp()` values self-scale. No breakpoint font overrides.
- **Spacing:** `clamp()` for all padding, margins, and gaps. Fluid, not stepped.
- **Images:** `object-fit: cover` on fixed-ratio containers (`aspect-ratio: 16/11`, `1/1`).
- **Structural breakpoints:** Kept to the minimum needed for content stacking (mobile column collapse for work cards, gallery frames, signoff cluster). No sizing-only breakpoints.

### Spatial Rhythm (forward-looking target)
The sirnik.co reference uses dramatically varied spacing. Sections should NOT have uniform padding. Target rhythm:
- **Hero:** Full-viewport, no top/bottom padding visible. Content pushed to edges.
- **About:** Generous vertical space (clamp 3rem-5rem top, clamp 9rem-16rem bottom). The scroll distance IS the narrative pacing.
- **Transition:** Variable height, scroll-driven. Not a section; a bridge.
- **Work/Credentials/Gallery:** Moderate, consistent padding. The content density provides rhythm; spacing stays calm.
- **SignOff:** Compressed top, generous internal spacing. The wordmark IS the spatial statement.

### Grid Within Full-Bleed
Individual sections use CSS grid or flexbox for internal layout. No global grid columns. Each section owns its own internal structure:
- **About:** 2-column (1.25fr / 0.95fr) for wall-title + image
- **Work chapters:** Full-width cards with flex-wrap body (label | operative | keypoints)
- **Credentials:** Featured credential as 2-column, compact rows as single-column
- **Gallery:** 2-column frames (media | content), stacking to 1-column on mobile
- **SignOff:** 2-column (wordmark | cluster grid)

## Elevation

Depth through overlays and tonal gradients, not card stacking. Most surfaces are flat at rest.

### Shadow Vocabulary
- **Signal Halo** (`0 0 10px rgb(255 255 255 / 0.3)`): Active rail-dot emphasis.
- **Frame Depth** (`0 16px 42px rgb(0 0 0 / 0.42)`): Image grounding on dark surfaces.
- **Orb Ambient** (`0 16px 80px rgb(0 0 0 / 0.38)`): Background-orb separation.
- **Light Frame** (`0 4px 28px oklch(0.12 0.01 255 / 0.07)`): Credential/gallery image framing on day surfaces.

**The Flat Surface Rule.** Elevation appears only to anchor key imagery or indicate active state. Never decorative.

## Motion

### Principles
- **Compositor-safe only.** Animate `transform` and `opacity`. Never animate layout properties (`width`, `height`, `top`, `left`, `padding`, `margin`).
- **Ease out with exponential curves.** `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) is the primary. `cubic-bezier(0.25, 1, 0.5, 1)` (quart-out) for faster interactions.
- **No bounce, no elastic, no spring.** This is an operator's portfolio, not a playground.
- **Reduced-motion:** All non-essential animation respects `prefers-reduced-motion`. Fallback to static states, not faster versions.

### Motion Vocabulary
| Pattern | Properties | Duration | Easing | Usage |
|---|---|---|---|---|
| **Section reveal** | opacity, translateY | 900-1200ms | expo-out | Work cards, gallery frames, credentials |
| **Hero entrance** | opacity, translateY, blur | 1500ms | expo-out | h1/h2 staggered reveal after preloader |
| **Hover shift** | color, border-color, letter-spacing | 200-450ms | quart-out | Nav links, CTAs, interactive elements |
| **Scroll-linked** | scaleY, scaleX, opacity | continuous | transform-driven | Transition band, about rail progress |
| **Wordmark reveal** | translateY, scale | 750ms | expo-out | SignOff wordmark on viewport entry |

### Stagger Rule
Elements within a section stagger by 60-140ms per item. Never more than 5 staggered items; beyond that, reveal as a group.

## Components

### Navigation
- **Shape:** Edge-aligned text system. No background, no rounded corners.
- **Default:** Uppercase, high-tracking labels in frost tones.
- **Hover/Focus:** Color shift to signal red. Underline grows from left on hover.
- **Mobile:** Hamburger triggers full-screen overlay with staggered link reveals.
- **Theme-aware:** Switches to day-ink text when scrolled onto light sections.

### Hero CTA
- **Shape:** Hard edge (0px radius). Ghost surface.
- **Default:** Frost-tinted background (`oklch(1 0 0 / 0.10)`), uppercase compact type.
- **Hover:** Border and text shift to signal red. Letter-spacing breathes wider.
- **Touch:** Min-height 44px retained.

### Image Frames
- **Treatment:** 1px border, subtle inner highlight line at top edge. No rounded corners.
- **Filter:** Light desaturation (`grayscale 3-8%`), micro contrast boost (`contrast 1.02-1.06`).
- **Aspect:** Fixed ratios (`16/11` for portraits/certs, `1/1` for gallery).
- **Behavior:** `object-fit: cover`. No cropping breakpoint logic.

### Section Headers
- **Pattern:** Eyebrow label left, secondary info right, separated by full-width 1px rule below.
- **Type:** Label style (300 weight, high tracking, uppercase).
- **Color:** Day-muted on light, frost-dim on dark.

### Dividers
- **Light surfaces:** 1px solid `border-day`.
- **Dark surfaces:** 1px solid `border-frost-soft`.
- **Never decorative.** Dividers separate content sections, not embellish them.

## Photography Direction (forward-looking)

Images are evidence, not atmosphere. Every image should answer "what does this person actually look like / where do they actually work / what did they actually earn."

- **Portraits:** Direct eye contact, neutral expression, B&W or desaturated. No lifestyle staging.
- **Workspace:** Documentary-style, ambient light. The desk, the setup, the actual environment.
- **Certificates:** Clean scan or screenshot. Treated as documents filed in the record.
- **Future frames:** Reserved for real milestones. Empty frames display "pending" treatment, not placeholder stock.

## Do's and Don'ts

### Do:
- **Do** preserve the dark-to-light narrative progression when adding sections.
- **Do** keep red sparse and directional. It's a signal, not a color.
- **Do** use dramatically varied spacing between sections for narrative rhythm.
- **Do** make display type bold and compressed. Headline scale should feel oversized, deliberate.
- **Do** honor reduced-motion and compositor-safe animation constraints.
- **Do** use photography as primary content with documentary treatment.

### Don't:
- **Don't** wrap sections in container divs with max-width.
- **Don't** add breakpoint-based font-size overrides. All type scales via vw clamp.
- **Don't** use cards, card grids, or nested containers.
- **Don't** introduce a second typeface. One family, full weight range.
- **Don't** add decorative motion (bounce, spring, elastic, parallax-for-its-own-sake).
- **Don't** use gradient text, side-stripe borders, or glassmorphism.
- **Don't** treat images as decorative backgrounds. They're documents.
