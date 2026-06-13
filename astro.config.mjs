import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// For a GitHub *user* page the repo must be named <username>.github.io.
// For a *project* page, set `base: '/portfolio-adventure-time'` and prefix
// absolute asset URLs (/images/..., /cv/...) accordingly.
export default defineConfig({
  site: 'https://santiagocastrosalt.github.io',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
