/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#242424",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        "custom-black": "5px 5px 0px 0px black",
        "custom-blacks": "0 4px 8px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
