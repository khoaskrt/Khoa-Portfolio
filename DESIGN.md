---
name: Sales School Landing Page
description: Cinematic personal-brand hero with monochrome contrast and decisive red accents.
colors:
  base-black: "#000000"
  base-white: "#ffffff"
  signal-red: "#ef4444"
  signal-red-deep: "#dc2626"
  vignette-black: "#00000066"
  border-white-soft: "#ffffff1a"
  border-white-mid: "#ffffff4d"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3.5rem, 15vw, 12rem)"
    fontWeight: 700
    lineHeight: 0.8
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
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  nav-link-default:
    backgroundColor: "transparent"
    textColor: "{colors.base-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0"
  nav-link-hover:
    backgroundColor: "transparent"
    textColor: "{colors.signal-red}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0"
  status-dot:
    backgroundColor: "{colors.signal-red-deep}"
    rounded: "{rounded.none}"
    width: "8px"
    height: "8px"
---

# Design System: Sales School Landing Page

## Overview

**Creative North Star: "The Decision Room"**

This system stages a single cinematic moment, a high-contrast portrait where typography carries authority and pacing does the persuasion. The aesthetic is intentionally sparse, but not passive. Visual weight is concentrated in oversized wordmarks, disciplined uppercase micro-labels, and one load-bearing accent that signals intent.

The experience is built for recruiter-speed scanning and leadership signaling, not feature marketing. Content appears in a calm sequence, then resolves into a clear directional statement. The overall voice is confident, strategic, and operations-minded, with no decorative detours.

The system explicitly rejects the anti-references in PRODUCT.md: generic SaaS product styling, corporate-template feature blocks, and conversion-led marketing patterns that bury personal narrative.

**Key Characteristics:**
- Cinematic monochrome field with sparse red signaling
- Display-led hierarchy with compressed vertical rhythm
- Uppercase metadata language for tactical clarity
- Motion used for reveal and emphasis, never flourish

## Colors

The palette is monochrome-first, with red reserved for directional moments and status emphasis.

### Primary
- **Decision Red** (`#ef4444`): Bracket markers and hover-state emphasis that guide scanning toward key statements.

### Secondary
- **Signal Core Red** (`#dc2626`): Compact status marker used for operational presence and timestamp anchoring.

### Neutral
- **Black Field** (`#000000`): Full-page base tone that frames imagery and typography as the primary communication layer.
- **White Voice** (`#ffffff`): Primary content color across headline, body metadata, and navigation labels.
- **Soft Divider White** (`#ffffff1a`): Subtle structural rule for footer separation.
- **Mid Divider White** (`#ffffff4d`): Medium-contrast underline cue for byline emphasis.
- **Vignette Black** (`#00000066`): Edge darkening overlay that deepens focus on the portrait center.

**The Signal Scarcity Rule.** Red remains rare and intentional. If red becomes background fill or broad decorative wash, hierarchy collapses.

## Typography

**Display Font:** Space Grotesk (fallback: sans-serif)
**Body Font:** Outfit (fallback: ui-sans-serif, system-ui, sans-serif)
**Label/Mono Font:** Outfit (same family, high tracking in labels)

**Character:** Space Grotesk delivers decisive geometric force for hero language, while Outfit keeps supporting copy soft, legible, and recruiter-fast.

### Hierarchy
- **Display** (700, `clamp(3.5rem, 15vw, 12rem)`, 0.8): Hero statement words that define the page identity in one glance.
- **Headline** (300, `clamp(3.5rem, 15vw, 12rem)`, 0.8): Secondary hero line that contrasts weight while preserving scale parity.
- **Title** (500, `clamp(0.875rem, 1.1vw, 1rem)`, 1.45): Byline emphasis and key attribution moments.
- **Body** (300, `clamp(0.875rem, 1.1vw, 1rem)`, 1.45): Utility-level narrative labels and contextual descriptors.
- **Label** (300, `clamp(0.625rem, 0.9vw, 0.8125rem)`, 0.2em tracking, uppercase): Navigation metadata, top-bar system labeling, and footer command language.

**The Compression Rule.** Hero line-height stays compressed at 0.8 so language feels cut from one block, not stacked as separate banners.

## Elevation

Depth is driven by imagery, blend mode, and tonal layering rather than card stacks. The page stays flat in structure while contrast overlays and vignette treatment create atmospheric separation.

### Shadow Vocabulary
- **Signal Halo** (`0 0 10px rgba(220,38,38,0.5)`): Used only around the red status dot to indicate active presence.

**The Flat Surface Rule.** Surfaces remain visually flat at rest. Depth cues appear through overlays and controlled contrast, not container elevation.

## Components

### Navigation
- **Shape:** Edge-aligned text system (0px radius)
- **Default:** Uppercase high-tracking labels in white for calm scanning
- **Hover / Focus:** Shift to Decision Red with fast color transition
- **Structure:** Footer rail separated by soft top rule for positional grounding

### Hero Wordmark Block
- **Shape:** Open composition, no container box
- **Primary Line:** Bold display in Space Grotesk, tightly tracked and compressed
- **Secondary Line:** Thin sans contrast line with matched scale and compressed offset
- **Support Line:** Split metadata row with byline underline to establish authorship

### Status Marker
- **Style:** 8px square red indicator with soft halo
- **Role:** Signals live presence adjacent to year stamp
- **Constraint:** Never scales above label density

### Image Stage
- **Background:** Full-bleed portrait, grayscale with brightness and contrast tuning
- **Overlay:** Radial vignette for center focus
- **Blend Strategy:** Foreground content uses difference blending to stay legible over image variance

## Do's and Don'ts

### Do:
- **Do** keep red as a sparse directional signal (`#ef4444` / `#dc2626`), not a broad surface fill.
- **Do** preserve the recruiter-speed hierarchy with oversized hero language and tracked micro-labels.
- **Do** maintain strong narrative ordering: identity first, context second, directional statement last.
- **Do** respect reduced-motion preferences when extending animations beyond current reveal choreography.

### Don't:
- **Don't** design this like a generic SaaS product or app landing page.
- **Don't** use feature-marketing patterns that feel corporate-template heavy.
- **Don't** replace personal storytelling with product-style conversion blocks.
- **Don't** introduce side-stripe accents, gradient text, or interchangeable icon-card grids that dilute the current voice.
