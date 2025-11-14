import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react"; // React integration

export default defineConfig({
  output: "static",
  adapter: netlify(),
  site: "https://toga.yllabs.xyz",
  base: "/",
  integrations: [react()], // Call the function
  vite: {
    optimizeDeps: {
      include: []
    }
  }
});
