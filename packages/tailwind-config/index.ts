import type { Config } from "tailwindcss";

const baseConfig = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "../../packages/ui-kit/components/**/*.{ts,tsx}",
    "../../packages/ui-kit/**/*{.js,.ts,.jsx,.tsx}",
  ],
} satisfies Config;

export default baseConfig;
