import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customYellow: "#FDCC01",
        customShinyGold: "#AE9F64",
        customGray: "#636363",
        customRed: "#AE0404",
        customWhite: "#F6F6F6",
      },
      screens: {
        'smartphone': '640px',
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1440px',
        'widescreen': '1920px',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'bebas': ['Bebas Neue', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
