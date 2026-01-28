<script setup lang="ts">
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = 'Both username and password are required'
    return
  }

  loading.value = true
  error.value = ''

  // Simple login - any non-empty credentials work for testing
  const success = userStore.login(username.value, password.value)

  if (success) {
    await navigateTo('/admin/cv')
  } else {
    error.value = 'Login failed. Please try again.'
  }

  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
    <div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white">
          Admin Login
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Enter any username and password to access the admin panel
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-500 text-slate-900 dark:text-white dark:bg-slate-700 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-500 text-slate-900 dark:text-white dark:bg-slate-700 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            >
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Logging in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <div class="text-center">
          <a
            href="/"
            class="text-sm text-violet-600 hover:text-violet-500"
          >
            ← Back to home
          </a>
        </div>
      </form>
    </div>
  </div>
</template>