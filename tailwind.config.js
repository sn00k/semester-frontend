/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
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
