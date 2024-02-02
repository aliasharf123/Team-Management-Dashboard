import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx,mdx}", // problem here in node_modules
  ],
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "Enerie-Black": "#1B1C1E",
        "Blue-NCS": "#0E8BD1",
        SeaSalt: "#F9F9FB",
        "Secondary-text-silver": "#BDBDBD",
      },
    },
  },

  plugins: [nextui(), require("@tailwindcss/typography")],
  darkMode: "class",
};
export default config;
