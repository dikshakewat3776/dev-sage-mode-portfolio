# Hidden Jutsu Portfolio 

Frontend-only portfolio built with React, Vite, and TypeScript, optimized for GitHub Pages (`github.io`) 

## Local Setup

```bash
npm install
npm run dev
```

## Where To Edit Portfolio Content

All editable content is local typed data in `src/data`:

- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/study.ts`
- `src/data/bookshelf.ts`
- `src/data/skills.ts`

Shared types live in `src/types/content.ts`.

## Build + Preview

```bash
npm run build
npm run preview
```

## GitHub Pages Deploy (Repo Subpath)

This app uses:
- `HashRouter` for SPA route compatibility on GitHub Pages
- Vite `base` set to `'/dev-sage-mode-portfolio/'` in production
- `gh-pages` deploy script

### Steps

1. Push this folder as its own GitHub repo (recommended name: `dev-sage-mode-portfolio`).
2. Ensure `vite.config.ts` base matches your repo name:
   - `'/<repo-name>/'`
3. Deploy:

```bash
npm run deploy
```

4. In GitHub repo settings:
   - **Pages** -> **Build and deployment**
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / root
5. App URL will be:
   - `https://<username>.github.io/<repo-name>/`

## Troubleshooting

- Blank page after deploy:
  - Verify `vite.config.ts` production `base` matches repository name exactly.
- Routes failing on refresh:
  - Keep `HashRouter` (already configured) for GitHub Pages.
- Static assets not loading:
  - Rebuild and redeploy after correcting base path.

