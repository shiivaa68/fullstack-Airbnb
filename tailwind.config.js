/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // App Router folder
    "./pages/**/*.{js,ts,jsx,tsx}",     // Pages folder (if you have it)
    "./components/**/*.{js,ts,jsx,tsx}", // Components folder
  ],
  theme: {
    extend: {},  // Add custom colors, fonts, spacing here if needed
  },
  plugins: [],  // Add Tailwind plugins here if needed
};
