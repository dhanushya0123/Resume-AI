/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink:   "#0D0E12",
        slate: "#1A1C23",
        card:  "#21232C",
        border:"#2E3140",
        muted: "#6B7280",
        accent:"#6EE7B7",        // emerald-300
        warn:  "#FCA5A5",        // red-300
        gold:  "#FCD34D",        // amber-300
        sky:   "#93C5FD",        // blue-300
      },
      animation: {
        "fade-up":   "fadeUp 0.5s ease forwards",
        "spin-slow": "spin 2s linear infinite",
        pulse:       "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)"    },
        },
      },
    },
  },
  plugins: [],
};
