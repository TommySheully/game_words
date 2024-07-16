/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#2B344B',
        gray: '#F2F2F2',
        back: '#3E4A68',
        white: '#FFFFFF',
        green: '#65BD65',
        pink: '#E96FA4'
      },
    },
  },
  plugins: [],
}
