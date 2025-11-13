import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "static", // static site for Netlify
  adapter: netlify(),
  vite: {
    optimizeDeps: {
      include: []
    }
  }
});
