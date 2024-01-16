<script setup>
const username = ref('')
const password = ref('')

const userStore = useUserStore()

async function submitLogin(event) {
  event.preventDefault()
  const data = {
    username: username.value,
    password: password.value,
  }
  const result = await $fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (result.success) {
    console.log('result', result)
    userStore.currentUser = result.user
    userStore.isLoggedIn = true
    await navigateTo('/profile')
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="rounded-lg bg-white p-6 shadow-lg">
      <h1 class="mb-4 text-2xl font-bold">
        Login
      </h1>
      <form @submit="submitLogin">
        <div class="mb-4">
          <label for="username" class="block text-gray-700">username</label>
          <input id="username" v-model="username" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input id="password" v-model="password" type="password" class="w-full border border-gray-300 rounded-lg px-3 py-2">
        </div>
        <button type="submit" class="rounded-lg bg-blue-500 px-4 py-2 text-white">
          Login
        </button>
      </form>
      <p class="mt-4">
        Don't have an account? <NuxtLink href="/register" class="text-blue-500">
          Register
        </NuxtLink>
        <NuxtLink href="https://twitter.com/MasteringNuxt/status/1743321801755627994" class="text-blue-500" external>
          Register
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<style>
/* Add your custom styles here */
</style>
