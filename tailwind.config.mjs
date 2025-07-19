/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // point to src directory
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00B56A',
        dark: '#0A0A0A',
        light: '#F6F6F6',
        accent: '#1E1E1E',
      },
    },
  },
  plugins: [],
}
