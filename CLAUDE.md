# Khoa Portfolio — Agent Workspace Rules

## Project structure

```
src/
├── app/
│   ├── App.tsx                        # Section composer — minimal logic
│   └── hooks/useTransitionState.ts    # Shared transition state hook
├── components/                        # Shared UI (PortfolioHeader, PreLoader, CustomCursor)
│   ├── CustomCursor.tsx
│   ├── PortfolioHeader.tsx
│   ├── header-content.ts
│   └── PreLoader.tsx
├── motion/easing.ts                   # Shared easing curves
├── styles/
│   ├── tokens.css                     # Design tokens (colors, type scale, z-index)
│   └── utilities.css                  # Shared utility classes
├── types/
├── assets/
└── sections/                          # Each section = isolated mini-app
    ├── hero/
    ├── about/
    ├── transition/
    ├── work-experience/
    ├── moment-recap/
    ├── credentials/
    └── signoff/
docs/                                  # PRODUCT.md, DESIGN.md, DESIGN.json, typography.md
```

## Section convention

Each section folder follows this pattern:

```
sections/<name>/
├── <Name>Section.tsx    # Entry component (single export)
├── content.ts           # Static data, copy, labels
├── motion.ts            # Section-specific animation config (optional)
├── components/          # Sub-components used ONLY in this section (optional)
└── styles.css           # Section-scoped styles (optional)
```

## Multi-agent concurrency rules

When multiple agents work on the same codebase in parallel chat sessions, follow these rules to prevent conflicts.

### Zone ownership

| Zone | Files | Access rule |
|---|---|---|
| **Section zone** | `src/sections/<name>/*` | **Exclusive** — only the agent assigned to that section may edit files in it. Other agents must not read-then-write these files. |
| **Shared read-only zone** | `src/styles/tokens.css`, `src/styles/utilities.css`, `src/motion/easing.ts` | **Read only** — consume CSS variables and easing values, never add/modify/delete entries. |
| **Shared components zone** | `src/components/*` | **Add only** — agents may create NEW files here, but must NOT modify existing files (`CustomCursor.tsx`, `PortfolioHeader.tsx`, `PreLoader.tsx`, `header-content.ts`). |
| **App composer zone** | `src/app/App.tsx`, `src/app/hooks/*` | **Restricted** — only touch when adding/removing a section. Changes must be limited to import + JSX line. Never add logic or state here. |
| **Design system zone** | `docs/DESIGN.md`, `docs/DESIGN.json`, `src/styles/tokens.css` | **Locked** — only a dedicated design-system task may modify these. Section agents must not edit. |

### Rules for agents

1. **Declare your scope first.** Before editing any file, state which section(s) you own for this task. Example: "I own `sections/hero/` for this task."

2. **Stay in your lane.** Only edit files within your declared section folder. If you need something from another section, import it — don't copy or inline it.

3. **Never modify shared files without explicit user approval.** If your task requires changing `tokens.css`, `utilities.css`, `App.tsx`, or any file in `components/`, ask the user first and state exactly what you need to change.

4. **New shared components get new files.** If you need a reusable component, create a new file in `src/components/`. Never modify an existing shared component to add section-specific behavior.

5. **Content stays local.** Each section's text, labels, and data live in its own `content.ts`. Never import one section's content from another section.

6. **No cross-section imports.** `sections/hero/` must never import from `sections/about/` or vice versa. Shared logic goes in `src/components/`, `src/motion/`, or `src/app/hooks/`.

7. **Avoid index.html and root CSS edits.** `index.html` and `src/index.css` are global — changes here affect every section. Only modify with explicit user instruction.

8. **Commit atomically per section.** When committing, only include files from your owned section. Don't stage files from other zones unless the user asked for a combined commit.

### Conflict resolution

If two agents need to modify the same file (e.g., both need a new CSS variable in `tokens.css`):
- The first agent to identify the need should ask the user to create the token.
- The second agent should check if the token already exists before requesting.
- If a merge conflict occurs, the user resolves it — agents should not force-push or overwrite.

### Adding a new section

1. Create `src/sections/<name>/` with at minimum `<Name>Section.tsx` and `content.ts`
2. Add import + JSX line in `src/app/App.tsx` (append to the section list)
3. If the section needs transition state, consume it via props from `useTransitionState` hook

## Design context

Context files (PRODUCT.md, DESIGN.md) live in `docs/`. The impeccable skill loader auto-discovers them there. Run context loader:

```bash
node .agents/skills/impeccable/scripts/load-context.mjs
```

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4 (with `@theme` directive in tokens.css)
- Motion (framer-motion) for animations
- Deployed on Vercel
