import { appDescription } from './constants/index'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appName: '',
    },
    openRouterKey: '',
    devUser: '',
    devPass: '',
    phKey: '',
  },

  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  routeRules: {
    '/portfolio': { redirect: '/work' },
    '/es/portfolio': { redirect: '/es/work' },

    // Homepage and CV can be edited via admin - use ISR instead of prerender
    '/': { isr: 3600 }, // Revalidate every hour
    '/cv': { isr: 3600 }, // Revalidate every hour

    // File-based case studies are rebuilt from Markdown and cached at the edge
    '/work': { isr: 3600 },
    '/work/**': { isr: 3600 },

    // Blog - content may be updated occasionally
    // '/blog': { isr: 86400 }, // Revalidate daily
    // '/blog/**': { isr: 86400 },

    // ✅ OPTIMIZED: API routes with proper caching & security headers
    '/api/**': {
      headers: {
        'cache-control': 'private,max-age=300', // 5 min cache for API responses
      },
    },

    // ✅ OPTIMIZED: Static assets caching
    '/_nuxt/**': {
      headers: {
        'cache-control': 'public,max-age=31536000,s-maxage=31536000', // 1 year cache
      },
    },

    // Catch-all - fallback to SSR
    '/[...all]': { ssr: true },
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
    componentIslands: true,
    viewTransition: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '@fontsource/bitter/latin-800.css',
  ],

  vite: {
    // ✅ OPTIMIZED: Vite performance configuration (antfu preferences)
    build: {
      reportCompressedSize: false,
      // ✅ PERF BUDGET: Warn if individual chunks exceed 500KB
      chunkSizeWarningLimit: 500,
      sourcemap: import.meta.env.NODE_ENV === 'development',
    },
  },

  nitro: {
    // ✅ OPTIMIZED: Enable compression and minification for production
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    minify: true,

    esbuild: {
      options: {
        target: 'esnext',
      },
    },

    // ✅ OPTIMIZED: Better performance for large apps
    experimental: {
      wasm: true,
    },

    /* prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    }, */
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      link: [
        /* { rel: 'icon', href: '/favicon.ico', sizes: 'any' }, */
        /* { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }, */
        /*  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, */
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    vueI18n: 'locales/i18n.config.ts',
  },

  compatibilityDate: '2024-09-10',
})
