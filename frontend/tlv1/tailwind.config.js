/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'primary' : '#4318FF',
        'gradient-red' : '#DFBCBE',
        'gradient-red-2' : '#D10019',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
  })
  ],
}