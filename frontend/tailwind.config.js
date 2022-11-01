/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
    colors: {
      default: '#2A303C',
      pink: colors.pink,
      fuchsia: colors.fuchsia,
    },
  },
  plugins: [require('daisyui')],
};
