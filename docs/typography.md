# Typography Rules — Khoa Portfolio

## Typeface

**General Sans** is the sole typeface for this project. No other font families are permitted.

- **Source:** [Fontshare](https://www.fontshare.com/fonts/general-sans)
- **CDN:** `https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap`
- **Available weights:** 200, 300, 400, 500, 600, 700
- **Styles:** Normal + Italic

## CSS Variables

All font variables resolve to General Sans. Use variables, not raw font names.

| Variable | Purpose | Value |
|---|---|---|
| `--font-sans` | Body text, labels, metadata | `'General Sans', ui-sans-serif, system-ui, sans-serif` |
| `--font-display` | Hero headings, section titles | `'General Sans', sans-serif` |
| `--font-serif` | Editorial passages, narrative text | `'General Sans', Georgia, serif` |
| `--font-quote` | Quotes, pull-quotes | `'General Sans', serif` |

## Hierarchy

Differentiate levels through **weight + size + tracking**, not font family.

| Level | Weight | Size | Line Height | Tracking | Use |
|---|---|---|---|---|---|
| **Display** | 700 (Bold) | `clamp(3rem, 14vw, 10rem)` | 0.82 | `-0.02em` | Hero headlines, wall statements |
| **Headline** | 700 (Bold) | `clamp(3.5rem, 9.2vw, 8.3rem)` | 0.90 | `-0.04em` | Section headings, work-experience titles |
| **Title** | 500 (Medium) | `clamp(1.34rem, 1.62vw, 1.92rem)` | 1.10 | `-0.01em` | Role titles, card headings |
| **Body** | 400 (Regular) | `clamp(0.875rem, 1.1vw, 1rem)` | 1.45 | `0.02em` | Supporting copy, paragraphs |
| **Label** | 300 (Light) | `clamp(0.625rem, 0.9vw, 0.8125rem)` | 1.20 | `0.2em` uppercase | Navigation, timestamps, metadata |
| **Quote** | 500 (Medium) italic | `clamp(18px, 2vw, 28px)` | 1.35 | `0.004em` | Pull-quotes, editorial passages |

## Rules

1. **One family only.** Never introduce a second typeface. If you need contrast, change weight or tracking.
2. **Weight gap >= 2 steps for hierarchy.** Display (700) vs Body (400) gives clear separation. Adjacent levels should differ by at least one weight step (100).
3. **Tight display, open body.** Display text uses negative tracking (`-0.02em` to `-0.055em`). Body and labels use positive tracking (`0.02em` to `0.26em`).
4. **Line height compresses at scale.** Display: 0.82-0.90. Body: 1.45. Never use 1.0 line-height for multi-line body text.
5. **Cap body line length at 65-75ch.** Use `max-width` on text containers, not on the grid itself.
6. **Uppercase is reserved for labels and metadata.** Body and quote text stay sentence case.
7. **Italic is reserved for quotes and editorial emphasis.** Do not use italic for labels or headings.
8. **Use CSS custom properties.** Always reference `var(--font-sans)`, `var(--font-display)`, etc. Never hardcode `'General Sans'` in component styles.
9. **Fluid sizing with clamp().** All font sizes use `clamp(min, preferred, max)` for responsive scaling. No fixed breakpoint overrides for font size unless layout demands it.
10. **Anti-aliased rendering.** Both `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` are set globally on `body`.
