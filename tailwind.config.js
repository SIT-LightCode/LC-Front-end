/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily: {
      'kanit': ['Kanit', 'sans-serif'],
      'montserrat': ['Montserrat', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif']
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')],
}

