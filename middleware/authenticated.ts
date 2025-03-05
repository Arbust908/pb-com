import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip during SSR
  if (process.server) return

  const userStore = useUserStore()
  
  // If user is not logged in, redirect to auth page
  if (!userStore.isLoggedIn) {
    return navigateTo('/auth')
  }
})
