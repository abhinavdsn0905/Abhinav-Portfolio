import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
      },
      colors: {
        bg: "#080808",
        surface: "#101010",
        border: "#1a1a1a",
        accent: "#00e5ff",
        "accent-dim": "#00b4cc",
        muted: "#6b7280",
        "text-primary": "#f0f0f0",
        "text-secondary": "#a0a0a0",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "slide-up": "slideUp 0.8s ease forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
