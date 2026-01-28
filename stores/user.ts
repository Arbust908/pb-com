import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const currentUser = reactive<User>({
    username: '',
    email: '',
    password: '',
  })

  const userName = computed(() => currentUser.username)
  const userEmail = computed(() => currentUser.email)

  const isLoggedIn = ref(false)

  // Simple login for testing - accepts any username/password
  const login = (username: string, password: string): boolean => {
    if (username && password) {
      currentUser.username = username
      currentUser.email = username // just use username as email for simplicity
      isLoggedIn.value = true
      return true
    }
    return false
  }

  const logout = () => {
    currentUser.username = ''
    currentUser.email = ''
    isLoggedIn.value = false
  }

  return {
    currentUser,
    userName,
    userEmail,
    isLoggedIn,
    login,
    logout,
  }
})
