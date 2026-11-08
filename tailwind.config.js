/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oled: "#000000",
        surface: {
          DEFAULT: "#111111",
          elevated: "#171717",
          subtle: "#0A0A0A",
        },
        hairline: {
          DEFAULT: "#1F1F1F",
          subtle: "#171717",
          bright: "#2E2E2E",
        },
        studio: {
          crimson: "#991B1B",
          brick: "#6B1414",
          olive: "#A3E635",
          amber: "#D97706",
          ceramic: "#E5E5E5",
          silver: "#A3A3A3",
          gunmetal: "#262626",
        }
      },
      fontFamily: {
        scoreboard: ["var(--font-antonio)", "sans-serif"],
        editorial: ["var(--font-space-mono)", "monospace"],
        stamp: ["var(--font-syne)", "sans-serif"],
      },
      boxShadow: {
        'pill-3d': 'inset 0 2px 5px rgba(255,255,255,0.65), inset 0 -6px 10px rgba(0,0,0,0.85), 0 12px 24px rgba(0,0,0,0.75)',
        'pill-3d-hover': 'inset 0 3px 7px rgba(255,255,255,0.85), inset 0 -6px 12px rgba(0,0,0,0.95), 0 16px 32px rgba(0,0,0,0.85)',
        'pill-3d-dark': 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -6px 10px rgba(0,0,0,0.9), 0 12px 24px rgba(0,0,0,0.8)',
      }
    },
  },
  plugins: [],
}

