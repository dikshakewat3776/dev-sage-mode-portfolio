# Diksha Kewat — Engineering Portfolio

Premium, responsive single-page portfolio (React, Vite, TypeScript) optimized for GitHub Pages.

## Local setup

```bash
npm install
npm run dev
```

## Edit content

Typed data lives in `src/data/`:

| File | Purpose |
|------|---------|
| `profile.ts` | Name, intro, about, social links, resume & photo URLs |
| `experience.ts` | Career timeline (update employment dates) |
| `projects.ts` | Featured work cards & categories |
| `skills.ts` | Technical expertise groups |
| `philosophy.ts` | Leadership principles |
| `study.ts` | Optional study vault (`/#/study`) |

Shared types: `src/types/content.ts`.

### Assets to add

1. **Resume** — place `public/resume.pdf`, then uncomment `resumeUrl` in `profile.ts`.
2. **Photo** — place `public/profile.jpg`, then uncomment `photoUrl` in `profile.ts`.
3. **Work projects** — replace `[Add …]` placeholders in `projects.ts` and `experience.ts` with your specifics (no fabricated metrics).

## Build & preview

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

Production base path: `/dev-sage-mode-portfolio/` in `vite.config.ts`.

```bash
npm run deploy
```

## Stack

- React 18, TypeScript, Vite
- React Router (HashRouter for GitHub Pages)
- Framer Motion (subtle section & headline motion)
- react-icons