import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://maplespire.ca',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  vite: {
    build: {
      assetsInlineLimit: 2048,
    },
  },
});
