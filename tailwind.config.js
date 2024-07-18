/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './error.vue',
    './node_modules/vue-tailwind-datepicker/**/*.js',
  ],
  theme: {
    extend: {
      appearance: ['responsive'],
      colors: {
        primary: {
          dark: colors.zinc[950],
          light: colors.zinc[100],
        },
        card: '#0F172A',
        accent: {
          dark: colors.amber[300],
          light: colors.blue[500],
        },
      'vtd-primary': colors.sky, // Light mode Datepicker color
      'vtd-secondary': colors.gray, // Dark mode Datepicker color
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
