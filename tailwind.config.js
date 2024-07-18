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
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
