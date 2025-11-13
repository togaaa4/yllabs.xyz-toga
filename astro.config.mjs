import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: "static",
  adapter: netlify(),
  site: "https://toga.yllabs.xyz",
  base: "/",
  integrations: [],
  vite: {
    optimizeDeps: {
      include: []
    }
  }
});
