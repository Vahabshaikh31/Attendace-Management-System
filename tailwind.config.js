// tailwind.config.js
import { heroui } from "@heroui/theme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Matches src files
    "./node_modules/@heroui/theme/dist/components/**/*.{js,jsx,ts,tsx}", // ✅ HeroUI support
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};
