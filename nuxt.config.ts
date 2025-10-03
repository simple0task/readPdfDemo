// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  ssr: true,
  nitro: {
    preset: 'node-server',
    output: {
      dir: '.output',
    },
  },

  app: {
    head: {
      title: 'PDF読み取りのデモ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/icon.png' },
      ],
    },
  },

  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],

  modules: [
    'dayjs-nuxt',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      'M+PLUS+1': true,
    },
  },
  dayjs: {
    locales: ['ja'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ja',
    defaultTimezone: 'Asia/Tokyo',
  },

  build: {
    transpile: ['vuetify'],
  },

  sourcemap: { server: false, client: false },

  routeRules: {
    '/**': { ssr: false },
  },

  srcDir: 'src/',
  compatibilityDate: '2025-09-20',
}
