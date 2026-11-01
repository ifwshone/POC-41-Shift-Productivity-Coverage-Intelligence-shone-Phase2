// frontend/tailwind.config.js
// NOTE: Tailwind v4 generates utilities from the @theme block in app/globals.css.
// This file mirrors the same palette so the brand tokens live in one obvious place.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}"
    ],
  theme: {
    extend: {
      colors: {
        deep: "#04100b",      // Custom Deep DNA background (replaces #030712), luminance ~0.4%
        surface: "#0a1812",   // Surface / panels
        "surface-2": "#0f2119",
        accent: "#b8f23f",    // Accent Primary: "Vital Lime" (Human Utilization)
        sky: "#6ec8ff",       // Accent Secondary
        warn: "#ffb02e",
        crit: "#ff4d6a",
        mist: "#d9ead6",      // Text (soft sage, not pure white)
        moss: "#7e9686",      // Muted text
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}