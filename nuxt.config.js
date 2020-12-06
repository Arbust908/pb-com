export default {
  // -
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  // -
  // modern: true,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Pancho Blanco',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `Pancho Blanco :: Desarrollador Creativo`,
      },
      {
        hid: `og:title`,
        property: 'og:title',
        content: `Quiero Invitar`,
      },
      {
        hid: `og:description`,
        property: 'og:description',
        content: `Pancho Blanco :: Desarrollador Creativo`,
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: `/pm-meta.jpg`,
      },
      {
        hid: `og:site_name`,
        property: 'og:site_name',
        content: `Pancho Blanco`,
      },
      // {
      //     hid: `og:url`,
      //     property: 'og:url',
      //     content: this.baseUrl + this.$route.fullPath
      // },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: `Pancho Blanco`,
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: `Pancho Blanco :: Desarrollador Creativo`,
      },
      {
        hid: 'twitter:image:src',
        property: 'twitter:image:src',
        content: `/pm-meta.jpg`,
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: `summary_large_image`,
      },
      {
        hid: 'twitter:creator',
        property: 'twitter:creator',
        content: `@BlancoPancho`,
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: `@BlancoPancho`,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-16.png',
        sizes: '16x16',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-32.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-48.png',
        sizes: '48x48',
      },
      { rel: 'apple-touch-icon', href: '/favicon-57.png', sizes: '57x57' },
      { rel: 'apple-touch-icon', href: '/favicon-120.png', sizes: '120x120' },
      { rel: 'apple-touch-icon', href: '/favicon-152.png', sizes: '152x152' },
      { rel: 'apple-touch-icon', href: '/favicon-167.png', sizes: '167x167' },
      { rel: 'apple-touch-icon', href: '/favicon-180.png', sizes: '180x180' },
      { rel: 'icon', href: '/favicon-96.png', sizes: '96x96' },
      { rel: 'icon', href: '/favicon-192.png', sizes: '192x192' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
      },
    ],
  },

  // Customize the progress-bar color
  loading: { color: '#E11D48' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/Developmint/nuxt-svg-loader
    'nuxt-svg-loader',
    // -
    'nuxt-i18n',
  ],
  // https://color-mode.nuxtjs.org/
  colorMode: {
    classSuffix: '',
  },
  /**
   * La Internacionalizacion
   */
  i18n: {
    vueI18nLoader: true,
    locales: [
      { name: 'Español', code: 'es', iso: 'es', file: 'es.js' },
      { name: 'English', code: 'en', iso: 'en', file: 'en.js' },
    ],
    defaultLocale: process.env.APP_LANG || 'es',
    lazy: true,
    // langDir: 'lang/',
    // strategy: 'no_prefix',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: false,
    baseUrl: 'https://panchoblanco.com',
    vueI18n: {
      fallbackLocale: 'es',
      messages: require('./lang'),
    },
  },

  // -
  pwa: {
    manifest: {
      name: 'Quiero Invitar',
      lang: 'es',
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-shades-of-purple.css',
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
