import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
// @ts-ignore
import animatePlugin from "tailwindcss-animate";
import { twPlugin } from "./plugin";

export const twPreset = {
  content: [],
  darkMode: ["class"],
  plugins: [animatePlugin, typographyPlugin, twPlugin],
} satisfies Config;
