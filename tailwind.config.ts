import defaultTheme from "tailwindcss/defaultTheme";
import svgToDataUri from "mini-svg-data-uri";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pattern': svgToDataUri('<svg><!-- your svg --></svg>')
      }
    }
  },
  plugins: [],
};
