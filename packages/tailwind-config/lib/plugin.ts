import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

export const twPlugin = plugin(
  // 1. Add CSS variable definitions to the base layer
  function ({ addBase }) {
    addBase({
      ":root": {},
      ".dark": {},
    });

    addBase({});
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {},
      },
      extend: {
        colors: {},
        borderRadius: {},
        fontFamily: {
          sans: ["var(--font-sans)", ...fontFamily.sans],
          heading: ["var(--font-heading)", ...fontFamily.sans],
        },
        keyframes: {},
        animation: {},
      },
    },
  }
);
