export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['usebootstrap'],
  app: {
    head: {
      title: 'لست‌سکند',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/favicon.png',
        }
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    }
  },
  css: ['~/assets/css/style.css'],
})