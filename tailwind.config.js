/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#8b5cf6',
          600: '#3b82f6',
        },
        background: '#0f172a',
        surface: '#1e293b',
      }
    },
  },
  plugins: [],
}
