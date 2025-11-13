import { defineConfig } from 'astro/config';
import netlifyEdge from '@astrojs/netlify-edge';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',       // edge server build
  adapter: netlifyEdge(), // Netlify Edge adapter
  integrations: [tailwind()],
});
