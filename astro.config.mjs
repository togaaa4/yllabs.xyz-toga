import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Site metadata
  site: 'https://toga.yllabs.xyz', // your full custom subdomain

  // Base URL if hosted in a subfolder (leave as '/' for root)
  base: '/',

  // Adapter for Netlify
  adapter: netlify(),

  // Output type: static site (fast, free hosting)
  output: 'static',

  // Integrations
  integrations: [tailwind()],

  // Optional: configure markdown, image optimization, etc.
  markdown: {
    syntaxHighlight: 'prism',
  },

  // Optional: build options
  vite: {
    server: {
      fs: {
        strict: false, // allow imports outside root if needed
      },
    },
  },
});
