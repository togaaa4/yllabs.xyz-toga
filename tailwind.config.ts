import defaultTheme from "tailwindcss/defaultTheme";
import svgToDataUri from "mini-svg-data-uri";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          foreground: {
            secondary: "rgba(255, 255, 255, 0.4)" // matches your '/ 40%' opacity usage
          }
        }
      },
      backgroundImage: {
        pattern: svgToDataUri('<svg><!-- your svg --></svg>')
      }
    }
  },
  plugins: [],
};
