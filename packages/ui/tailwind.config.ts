import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "presets" | "content" | "theme"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig], // Keep shared config
  theme: {
    extend: {
      colors: {
        dark: "#1F1F1F",
        strokeColor: "#494949"
      }
    }
  }
};

export default config;

