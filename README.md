# Khoa — '26 Portfolio

A personal portfolio website showcasing work experience, projects, credentials, and professional milestones.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool & dev server
- **Tailwind CSS v4** — utility-first styling
- **GSAP** + **Motion** (Framer Motion) — scroll-driven animations
- **Lenis** — smooth scrolling
- **Vercel** — deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run lint
```

## Project Structure

```
src/
├── app/                  # App shell + shared hooks
├── components/           # Shared UI (Header, PreLoader, Cursor)
├── motion/               # Shared easing/duration constants
├── styles/               # Design tokens + section CSS
├── types/                # TypeScript declarations
└── sections/             # Each section = isolated module
    ├── hero/
    ├── about/
    ├── transition/
    ├── work-experience/
    ├── selected-projects/
    ├── moment-recap/
    ├── credentials/
    └── signoff/
```

## Design System

See [docs/DESIGN.md](docs/DESIGN.md) for the full design system documentation including colors, typography, layout, motion, and component specifications.
