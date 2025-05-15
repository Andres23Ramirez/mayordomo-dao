import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist Sans", "Arial", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      colors: {
        background: "#FFFBF2",
        foreground: "#2C2A29",
        "colombia-yellow": "#FCD116",
        "colombia-blue": "#003893",
        "colombia-red": "#CE1126",
        "colombia-green": "#009B3A",
        tierra: "#8B4513",
        cafe: "#6F4E37",
        primary: "#3B5249",
        secondary: "#6B8E4E",
        accent: "#E67E22",
        muted: "#E8E4DD",
        whatsapp: {
          DEFAULT: "#25D366",
          hover: "#20BA56",
        },
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        ruana: "url('/patterns/ruana.svg')",
        wave: "url('/patterns/wave.svg')",
        wayuu: "url('/patterns/wayuu.svg')",
        subtle: "url('/patterns/subtle.svg')",
      },
      opacity: {
        "15": "0.15",
        "2": "0.02",
      },
    },
  },
  plugins: [],
};

export default config;
