// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Ensure it includes Vue files
  ],
  theme: {
    extend: {
      colors: {
        darkmint: "#2ecc71",
        yellowTheme: "#f1c40f",
        blueTheme: "#3498db",
        pink: "#e91e63",
      },
    },
  },
  plugins: [],
};
