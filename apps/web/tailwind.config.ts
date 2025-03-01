// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "presets" | "content" | "theme"> = {
  content: ["./app/**/*.tsx"],
  presets: [sharedConfig],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Source Serif 4", "serif"],
      },
      colors: {
        btnHover: "#484848",
        dark: "#1F1F1F",
        strokeColor: "#494949",
        chipBg: "#111111",
        hrColor: "#383838"
      }
    }
  }
};

export default config;