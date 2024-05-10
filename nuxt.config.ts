// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.dev ? process.env.API_URL_DEV : process.env.API_URL,
    },
  },
  devtools: { enabled: true },
  plugins: ['~/plugins/pinia.ts'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
