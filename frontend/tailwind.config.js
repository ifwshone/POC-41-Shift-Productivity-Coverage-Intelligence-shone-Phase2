// frontend/tailwind.config.js
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
          obsidian: "#030712", // Background - MANDATORY[cite: 1]
          navy: "#0B1117",     // Surface/Cards[cite: 1]
          cyan: "#38BDF8",     // Accent Primary[cite: 1]
          indigo: "#818CF8",   // Accent Secondary[cite: 1]
          slate: "#1F2937",    // Borders[cite: 1]
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'], // Typography constraint[cite: 1]
        }
      },
    },
    plugins: [],
  }