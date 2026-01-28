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

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/simpleAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: username, password }),
      })

      const data = await response.json()

      if (data.success && data.user) {
        currentUser.username = username
        currentUser.email = username
        isLoggedIn.value = true
        return true
      } else {
        console.error('Login failed:', data.error)
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
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
