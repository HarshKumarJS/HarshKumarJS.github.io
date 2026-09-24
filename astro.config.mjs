import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL || 'https://harshkumar.de';
export default defineConfig({
  output: 'static',
  site: site || undefined,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [react(), ...(site ? [sitemap()] : [])],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
