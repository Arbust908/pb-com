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

  return {
    currentUser,
    userName,
    userEmail,
    isLoggedIn,
  }
})
