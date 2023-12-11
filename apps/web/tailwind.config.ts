import type { Config } from "tailwindcss";
import baseConfig from "@repo/tailwind-config";
import { twPreset } from "@repo/tailwind-config/lib/preset";

const config: Config = {
  ...baseConfig,
  content: ["./**/*.{ts,tsx}"],
  presets: [twPreset],
};

export default config;
