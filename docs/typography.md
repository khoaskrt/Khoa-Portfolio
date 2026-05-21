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

| Level | Weight | Size (token) | Line Height | Tracking | Use |
|---|---|---|---|---|---|
| **Hero** | 200 (Thin) / 700 (Bold) | `--text-hero` · `clamp(3.25rem, calc(0.64rem + 6.96vw), 9.75rem)` | 0.82 | `-0.012em` | Hero headlines |
| **Display** | 700 (Bold) | `--text-display` · `clamp(2.5rem, calc(0.39rem + 4.46vw), 6.25rem)` | 0.82 | `-0.02em` | Wall statements |
| **Headline** | 700 (Bold) | `--text-headline` · `clamp(2.75rem, calc(0.82rem + 5.14vw), 8rem)` | 0.88 | `-0.04em` | Section headings, work-experience titles |
| **Section** | 700 (Bold) | `--text-section` · `clamp(1.75rem, calc(0.87rem + 2.35vw), 3.5rem)` | 0.88 | `-0.04em` | Sub-section headings |
| **Quote** | 400 (Regular) italic | `--text-quote` · `clamp(1.125rem, calc(0.89rem + 0.63vw), 1.75rem)` | 1.35 | `-0.004em` | Pull-quotes, editorial passages |
| **Body** | 400 (Regular) | `--text-body` · `clamp(0.9375rem, calc(0.87rem + 0.18vw), 1.125rem)` | 1.45 | `0.004em` | Supporting copy, paragraphs |
| **Small** | 300-400 | `--text-small` · `clamp(0.8125rem, calc(0.75rem + 0.16vw), 1rem)` | 1.45 | `0.02em` | Credits, key points |
| **Meta** | 300 (Light) | `--text-meta` · `clamp(0.6875rem, calc(0.64rem + 0.13vw), 0.8125rem)` | 1.20 | `0.2em` uppercase | Navigation, timestamps |
| **Label** | 300 (Light) | `--text-label` · `clamp(0.5625rem, calc(0.52rem + 0.11vw), 0.6875rem)` | 1.20 | `0.2em` uppercase | Stamps, badges, metadata |

## Rules

1. **One family only.** Never introduce a second typeface. If you need contrast, change weight or tracking.
2. **Weight gap >= 2 steps for hierarchy.** Display (700) vs Body (400) gives clear separation. Adjacent levels should differ by at least one weight step (100).
3. **Tight display, open body.** Display text uses negative tracking (`-0.02em` to `-0.055em`). Body and labels use positive tracking (`0.02em` to `0.26em`).
4. **Line height compresses at scale.** Display: 0.82-0.90. Body: 1.45. Never use 1.0 line-height for multi-line body text.
5. **Cap body line length at 65-75ch.** Use `max-width` on text containers, not on the grid itself.
6. **Uppercase is reserved for labels and metadata.** Body and quote text stay sentence case.
7. **Italic is reserved for quotes and editorial emphasis.** Do not use italic for labels or headings.
8. **Use CSS custom properties.** Always reference `var(--font-sans)`, `var(--font-display)`, etc. Never hardcode `'General Sans'` in component styles.
9. **Fluid sizing with Utopia formula.** All font sizes use `clamp(min, calc(A·rem + B·vw), max)` with a 375→1440px reference range. The rem component provides baseline stability; the vw component provides proportional scaling. All levels scale at a consistent rate so ratios stay stable across viewports. Breakpoint guards at ≤320px and ≥2560px pin values to their min/max.
10. **Anti-aliased rendering.** Both `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` are set globally on `body`.
