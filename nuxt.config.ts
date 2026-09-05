export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      Archivo: [500, 600, 700, 800, 900],
      Inter: [400, 500, 600, 700],
    },
    display: 'swap',
    preconnect: true,
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'tr',
    locales: [
      { code: 'tr', name: 'Türkçe', file: 'tr.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: false,
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'GÖKTÜRK LOJİSTİK — Türkiye\'den Dünyaya',
      meta: [
        { name: 'description', content: 'GÖKTÜRK LOJİSTİK — Türkiye, Avrupa, Kafkasya ve Orta Asya arasında uluslararası karayolu taşımacılığı, express taşımacılık, soğuk zincir ve depolama hizmetleri.' },
        { name: 'theme-color', content: '#0b0b0c' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${(process.env.NUXT_APP_BASE_URL || '/').replace(/\/$/, '')}/favicon.ico` },
      ],
    },
  },

  typescript: {
    strict: true,
  },
})
