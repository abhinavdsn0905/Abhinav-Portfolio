/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#f5f5f5",
        muted: "#737373",
        accent: {
          DEFAULT: "#6d28d9", // Muted violet
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "rgba(23, 23, 23, 0.7)",
          border: "rgba(64, 64, 64, 0.4)",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
  },
  plugins: [],
}
