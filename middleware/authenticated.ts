import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(() => {
  // Skip during SSR
  if (import.meta.env.SSR)
    return

  const userStore = useUserStore()

  // If user is not logged in, redirect to auth page
  if (!userStore.isLoggedIn) {
    return navigateTo('/auth')
  }
})
