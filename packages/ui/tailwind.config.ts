import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "presets" | "content" | "theme"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig], // Keep shared config
  theme: {
    extend: {
      backgroundImage: {
        'text-gradient': 'linear-gradient(to right, #FFFFFF 0%, #999999 100%)',
      },
      fontFamily: {
        serif: ["Source Serif 4", "serif"],
      },
      colors: {
        btnHover: "#484848",
        dark: "#1F1F1F",
        strokeColor: "#494949",
        chipBg: "#111111",
        hrColor: "#383838",
        navBorder: "#2D2D2D"
      }
    }
  }
};

export default config;

