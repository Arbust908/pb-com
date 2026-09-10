import { appDescription } from './constants/index'

const jsonld = {
  'nuxt-jsonld': {
    disableOptionsAPI: true,
  },
}

export default defineNuxtConfig({
  ...jsonld,
  runtimeConfig: {
    public: {
      phKey: '',
    },
  },

  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-jsonld',
  ],

  routeRules: {
    // Homepage and CV can be edited via admin - use ISR instead of prerender
    '/': { isr: 3600 }, // Revalidate every hour
    '/cv': { isr: 3600 }, // Revalidate every hour

    // File-based case studies are rebuilt from Markdown and cached at the edge
    '/work': { isr: 3600 },
    '/work/**': { isr: 3600 },

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
  ],

  vite: {
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 500,
    },
  },

  nitro: {
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
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      script: [
        {
          innerHTML: `
            (() => {
              const saved = localStorage.getItem('vueuse-color-scheme')
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
              const dark = saved === 'dark' || (saved !== 'light' && systemDark)

              document.documentElement.classList.toggle('dark', dark)
            })()
          `,
        },
      ],
      link: [
        /* { rel: 'icon', href: '/favicon.ico', sizes: 'any' }, */
        /* { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }, */
        /*  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, */
      ],
      meta: [
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
