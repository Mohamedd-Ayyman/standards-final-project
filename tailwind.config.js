/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rombo: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(45deg) scale(1.2)" },
        },
      },
      animation: {
        rombo: "rombo 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-motion")],
};
