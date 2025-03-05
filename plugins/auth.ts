import { useUserStore } from '~/stores/user'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip during SSR
  if (process.server) return

  const client = useSupabaseClient()
  const userStore = useUserStore()

  // Check if user is already logged in
  const { data } = await client.auth.getSession()
  if (data.session && data.session.user.email) {
    userStore.isLoggedIn = true
    userStore.currentUser.email = data.session.user.email
  }

  // Listen for auth state changes
  client.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user.email) {
      userStore.isLoggedIn = true
      userStore.currentUser.email = session.user.email
    } else if (event === 'SIGNED_OUT') {
      userStore.isLoggedIn = false
      userStore.currentUser.email = ''
      userStore.currentUser.username = ''
    }
  })
})
