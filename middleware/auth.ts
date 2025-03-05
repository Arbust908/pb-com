import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip during SSR
  if (process.server) return

  const userStore = useUserStore()

  console.log('auth::', userStore.isLoggedIn, `${from.path} => ${to.path}`)
  if (!userStore.isLoggedIn) {
    console.info('User not logged in going to auth page')
    return navigateTo('/auth')
  }
  else if (to.path === '/login' || to.path === '/register' || to.path === '/auth') {
    console.info('User logged in going to home page')
    return navigateTo('/')
  }
})
