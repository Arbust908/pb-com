<script setup>
const userStore = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')

async function onSubmit(event) {
  console.log('onSubmit')
  event.preventDefault()
  const data = {
    username: username.value,
    email: email.value,
    password: (password.value),
  }
  console.log(data)
  const result = await $fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  console.log(result)
  if (result.success) {
    userStore.currentUser = (result.user)
    await navigateTo('/profile')
  }
}
</script>

<template>
  <div class="flex items-center justify-center text-slate-800 dark:text-slate-100">
    <form class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md" @submit="onSubmit">
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold" for="username">
          Username
        </label>
        <input id="username" v-model="username" class="focus:shadow-outline w-full appearance-none border rounded px-3 py-2 leading-tight shadow focus:outline-none" type="text" placeholder="Enter your username">
      </div>
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold" for="email">
          Email
        </label>
        <input id="email" v-model="email" class="focus:shadow-outline w-full appearance-none border rounded px-3 py-2 leading-tight shadow focus:outline-none" type="email" placeholder="Enter your email">
      </div>
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold" for="password">
          Password
        </label>
        <input id="password" v-model="password" class="focus:shadow-outline w-full appearance-none border rounded px-3 py-2 leading-tight shadow focus:outline-none" type="password" placeholder="Enter your password">
      </div>
      <div class="flex items-center justify-between">
        <button class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 text-white font-bold hover:bg-blue-700 focus:outline-none" type="submit">
          Register
        </button>
      </div>
    </form>
  </div>
</template>
