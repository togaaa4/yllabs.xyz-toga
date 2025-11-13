import { defineConfig } from 'astro/config';
import netlifyEdge from '@astrojs/netlify-edge';

export default defineConfig({
  output: 'server', // edge server build
  adapter: netlifyEdge(),
});
