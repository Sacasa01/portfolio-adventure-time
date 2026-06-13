# Santiago Castro Salt — Developer Portfolio

Awwwards-style personal portfolio built with **Astro**, **Tailwind CSS v4** and **GSAP (ScrollTrigger)**.
Dark/light theming via CSS custom properties, JSON-based EN/ES i18n, firefly particle hero,
interactive skill constellation, Lighthouse-95+ performance budget.

## Stack

- Astro (static output, View Transitions)
- Tailwind CSS v4 via `@tailwindcss/vite`
- GSAP + ScrollTrigger
- Inter Variable + Space Grotesk Variable (self-hosted, `font-display: swap`)
- pnpm · GitHub Pages via GitHub Actions

## Development

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # output in dist/
pnpm preview
```

Commit `pnpm-lock.yaml` after the first local install.

## Required assets (not in repo)

| Path | Description |
|---|---|
| `public/images/hero-bg-640.webp` | Hero illustration, 640w |
| `public/images/hero-bg-1024.webp` | Hero illustration, 1024w |
| `public/images/hero-bg-1920.webp` | Hero illustration, 1920w (also OG image) |
| `public/images/hero-bg-2560.webp` | Hero illustration, 2560w |
| `public/images/portrait.webp` | About-section portrait (480x600) |
| `public/cv/santiago-castro-salt-cv.pdf` | Downloadable CV |

Hero art direction: dark night sky, full moon, stars, green meadow, geodesic domes with warm
amber lighting, treehouse, fireflies — Studio Ghibli aesthetic.

## Configuration

1. **Contact form**: replace `web3formsKey` in `src/data/site.ts` with your free key from
   [web3forms.com](https://web3forms.com). This is the only secret-like value in the project.
2. **Deploy target**: `astro.config.mjs` assumes a GitHub *user* page
   (`santiagocastrosalt.github.io`). For a project page set `base` and prefix absolute asset URLs.
3. The `.github/workflows/deploy.yml` workflow runs when this repo is pushed/mirrored to GitHub
   (Settings → Pages → Source: GitHub Actions).
