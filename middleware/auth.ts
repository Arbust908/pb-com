export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  console.log('auth::', userStore.isLoggedIn, `${from.path} => ${to.path}`)
  if (!userStore.isLoggedIn) {
    console.info('User not logged in going to login page')
    return navigateTo('/login')
  }
  else if (to.path === '/login' || to.path === '/register') {
    console.info('User logged in going to home page')
    return navigateTo('/')
  }
})
