import * as dotenv from "dotenv";
import { pwa } from "./config/pwa";
import { appDescription } from "./constants/index";

// https://twitter.com/iamandrewluca/status/1646464434963881985
dotenv.config();

export default defineNuxtConfig({
 runtimeConfig: {
  public: {
   appName: "",
  },
  openRouterKey: "",
 },
 modules: [
  "@vueuse/nuxt",
  "@unocss/nuxt",
  "@pinia/nuxt",
  "@vite-pwa/nuxt",
  "nuxt-scheduler",
  "@nuxtjs/i18n",
  "@nuxtjs/supabase",
  "@sidebase/nuxt-pdf", // https://sidebase.io/nuxt-pdf/getting-started
 ],

 experimental: {
  payloadExtraction: false,
  renderJsonPayloads: true,
  typedPages: true,
  componentIslands: true,
  viewTransition: true,
 },

 css: ["@unocss/reset/tailwind.css", "@/assets/index.css"],

 nitro: {
  esbuild: {
   options: {
    target: "esnext",
   },
  },
  /* prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    }, */
 },

 app: {
  head: {
   viewport: "width=device-width,initial-scale=1",
   link: [
    /* { rel: 'icon', href: '/favicon.ico', sizes: 'any' }, */
    /* { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }, */
    /*  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, */
   ],
   meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: appDescription },
    {
     name: "apple-mobile-web-app-status-bar-style",
     content: "black-translucent",
    },
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
  vueI18n: "./locales/i18n.config.ts",
 },
 supabase: {
  redirect: false,
 },
});
