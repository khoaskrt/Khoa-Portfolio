---
name: Sales School Landing Page
description: Cinematic personal-brand narrative shifting from command-black to archival-light with restrained signal red.
colors:
  night-base: "oklch(0.1 0.012 253)"
  night-overlay: "oklch(0.112 0.012 255 / 0.55)"
  mist-line: "oklch(0.94 0.01 255)"
  day-surface: "oklch(0.93 0.005 255)"
  day-ink: "oklch(0.12 0.01 255)"
  day-muted: "oklch(0.34 0.01 255)"
  signal-red: "#ef4444"
  signal-red-deep: "#dc2626"
  frost-text: "#f5f8fc"
  border-frost-soft: "#ffffff1a"
  border-frost-mid: "#ffffff4d"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3.5rem, 15vw, 12rem)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 1.1vw, 1rem)"
    fontWeight: 300
    lineHeight: 1.45
    letterSpacing: "0.08em"
  label:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.625rem, 0.9vw, 0.8125rem)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "0.2em"
rounded:
  none: "0px"
  hairline-round: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
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
    backgroundColor: "#ffffff1a"
    textColor: "{colors.frost-text}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  hero-cta-hover:
    backgroundColor: "#ffffff1a"
    textColor: "#fca5a5"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  status-dot-active:
    backgroundColor: "#ffffffe6"
    rounded: "{rounded.hairline-round}"
    width: "10px"
    height: "10px"
---

# Design System: Sales School Landing Page

## Overview

**Creative North Star: "The Decision Room to Debrief Archive"**

This system moves through a controlled narrative arc: a command-like dark hero where identity is asserted, then a measured transition into a light work-history surface where evidence is read. The aesthetic is cinematic but disciplined, with oversized display typography, sparse accent signaling, and motion that reveals sequence rather than spectacle.

The experience is built for recruiter-speed scanning and leadership signaling, not feature marketing. Visual density is concentrated where decisions matter, then relaxed for factual sections. This system explicitly rejects PRODUCT.md anti-references: generic SaaS styling, conversion-heavy template blocks, and product-feature storytelling.

**Key Characteristics:**
- Two-phase palette, night-to-day progression tied to narrative flow
- Display-led hierarchy with compressed hero lines and breathable body passages
- Uppercase metadata language for tactical clarity
- Motion as structural timing, not decorative flourish

## Colors

The palette is phase-based: deep neutral night tones for authority, then low-chroma day neutrals for readability, with red reserved for directional signal moments.

### Primary
- **Decision Red** (`#ef4444`): Bracket markers, hover emphasis, and directional nudges in navigation and footer language.

### Secondary
- **Signal Core Red** (`#dc2626`): Deeper state signal for compact indicator moments.

### Neutral
- **Night Base** (`oklch(0.1 0.012 253)`): Hero-stage foundation and transition band start.
- **Night Overlay** (`oklch(0.112 0.012 255 / 0.55)`): Atmospheric layer in About to preserve depth without card stacks.
- **Day Surface** (`oklch(0.93 0.005 255)`): Work-experience background for long-form scan comfort.
- **Day Ink** (`oklch(0.12 0.01 255)`): Primary text tone on light surfaces.
- **Day Muted** (`oklch(0.34 0.01 255)`): Metadata and timestamp language.
- **Frost Text** (`#f5f8fc`): High-contrast hero foreground and overlay copy.
- **Mist Line** (`oklch(0.94 0.01 255)`): Transition divider cue anchoring the palette shift.

**The Signal Scarcity Rule.** Red stays sparse and directional. If red becomes a dominant background treatment, the narrative hierarchy collapses.

## Typography

**Display Font:** Space Grotesk (fallback: sans-serif)
**Body Font:** Outfit (fallback: ui-sans-serif, system-ui, sans-serif)
**Label/Mono Font:** Outfit (same family, high tracking for UI metadata)

**Character:** Space Grotesk carries decisive, strategic voice in large statements; Outfit softens supporting copy for recruiter-speed comprehension.

### Hierarchy
- **Display** (700, `clamp(3rem,14vw,10rem)`, 0.82): Hero and section wall statements that anchor page identity.
- **Headline** (600, `clamp(3.5rem,9.2vw,8.3rem)`, 0.9): Work-experience heading with high scan impact.
- **Title** (600, `clamp(1.34rem,1.62vw,1.92rem)`, 1.1): Role titles and key attribution in list content.
- **Body** (300, `clamp(0.875rem,1.1vw,1rem)`, 1.45): Utility narrative labels and supporting copy, capped to short readable measures.
- **Label** (300, `clamp(0.625rem,0.9vw,0.8125rem)`, 0.2em tracking, uppercase): Nav rails, timestamps, and control language.

**The Compression Rule.** Hero display lines remain tightly set so statements feel like one decisive block, not stacked banners.

## Elevation

Depth comes from overlays, image tuning, and tonal gradients rather than repeated card containers. The hero and About zones are mostly flat surfaces with atmospheric layering, while selective shadows only appear around image framing and active progress markers.

### Shadow Vocabulary
- **Signal Halo** (`0 0 10px rgb(255 255 255 / 0.3)`): Active rail-dot emphasis in About progression.
- **Frame Depth** (`0 16px 42px rgb(0 0 0 / 0.42)`): About image figure grounding against the dark field.
- **Orb Ambient** (`0 16px 80px rgb(0 0 0 / 0.38)`): Large background-orb separation without introducing card hierarchy.

**The Flat Surface Rule.** Most surfaces stay flat at rest. Elevation appears only to indicate progression or anchor key imagery.

## Components

### Navigation
- **Shape:** Edge-aligned text system (`0px` radius)
- **Default:** Uppercase, high-tracking labels in frost tones for quick scan
- **Hover / Focus:** Shift to red accents (`#ef4444` / light red variants) with quick color transitions
- **Structure:** Footer and section rails use thin neutral borders rather than boxed containers

### Hero Wordmark Block
- **Shape:** Open composition, no container shell
- **Primary Line:** Bold display with compressed line-height and subtle cement glow treatment
- **Secondary Line:** Thin uppercase contrast line at matched scale
- **Support Line:** Metadata row mixing uppercase system copy and lighter byline

### About Narrative Rail
- **Style:** Vertical progress line with three dots, active state brightens and slightly scales
- **State:** Scroll-linked scale and opacity changes, reduced-motion fallback to static states
- **Constraint:** Rail remains peripheral, never competing with quote content

### Figure Frame
- **Style:** Single framed image with restrained border, thin inset rule, and one structural shadow
- **Role:** Human credibility anchor between hero positioning and narrative quote section

## Do's and Don'ts

### Do:
- **Do** preserve the dark-to-light narrative progression when adding new sections.
- **Do** keep red usage sparse and intentional, mostly for directional or state cues.
- **Do** maintain recruiter-speed hierarchy with very large display lines and concise metadata.
- **Do** honor reduced-motion behavior for all scroll-linked animation systems.

### Don't:
- **Don't** revert this into a generic SaaS landing pattern or feature grid architecture.
- **Don't** add decorative gradient text, side-stripe accents, or nested card stacks.
- **Don't** flood neutral surfaces with high-chroma accent color.
- **Don't** replace narrative sequencing with conversion-led UI blocks.
