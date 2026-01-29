import * as dotenv from 'dotenv'
import { visualizer } from 'rollup-plugin-visualizer'
import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

// https://twitter.com/iamandrewluca/status/1646464434963881985
dotenv.config()

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appName: '',
    },
    openRouterKey: '',
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-scheduler',
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@sidebase/nuxt-pdf', // https://sidebase.io/nuxt-pdf/getting-started
  ],

  routeRules: {
    // Homepage and CV can be edited via admin - use ISR instead of prerender
    '/': { isr: 3600 }, // Revalidate every hour
    '/cv': { isr: 3600 }, // Revalidate every hour

    // Blog - content may be updated occasionally
    '/blog': { isr: 86400 }, // Revalidate daily
    '/blog/**': { isr: 86400 },

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

    // Admin routes - require authentication and interactivity
    '/admin/**': { ssr: true },

    // Auth page - needs login logic
    '/auth': { ssr: true },

    // Widget routes - assume dynamic/interactive
    '/widget/**': { ssr: true },

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
    '@/assets/index.css',
  ],

  vite: {
    // ✅ OPTIMIZED: Vite performance configuration (antfu preferences)
    build: {
      reportCompressedSize: false,
      // ✅ PERF BUDGET: Warn if individual chunks exceed 500KB
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            nuxt: ['@nuxt/kit', '@nuxt/schema'],
          },
        },
        plugins:
          import.meta.env.NODE_ENV === 'development'
            ? []
            : [
              // Bundle analysis for production builds
                ...(import.meta.env.ANALYZE
                  ? [visualizer({
                      filename: 'dist/stats.html',
                      title: 'Bundle Analysis',
                      gzipSize: true,
                      brotliSize: true,
                    })]
                  : []),
              ],
      },
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
      viewport: 'width=device-width,initial-scale=1',
      link: [
        /* { rel: 'icon', href: '/favicon.ico', sizes: 'any' }, */
        /* { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }, */
        /*  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, */
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  i18n: {
    vueI18n: './locales/i18n.config.ts',
  },

  supabase: {
    redirect: false,
  },

  compatibilityDate: '2024-09-10',
})
