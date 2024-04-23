import posthog from 'posthog-js'
export default defineNuxtRouteMiddleware((to, from) => {
  const isDev = import.meta.dev
  if (!isDev) {
    const eventName = `page change: ${from.path} -> ${to.path}`
    const eventCtx = { from, to }
    posthog.capture(eventName, eventCtx)
    //
    posthog.capture(`Page::${to.name} || ${to.path}`)
  }
  })