/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nearBlack: "#111111",
        nearWhite: "#f5f5f5",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [import("@tailwindcss/typography"), import("@tailwindcss/forms")],
};
