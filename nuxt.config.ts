// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl:
        process.env.NODE_ENV === 'development'
          ? process.env.API_URL_DEV
          : process.env.API_URL,
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
