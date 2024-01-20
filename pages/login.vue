<script setup lang="ts">
import type { User } from '~/types';

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)


const fullActions = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
} as const;
type ActionTypes = keyof typeof fullActions;

const action = ref<ActionTypes>('LOGIN');

const changeType = () => {
  action.value = action.value === 'LOGIN' ? 'REGISTER' : 'LOGIN';
};

async function onSubmit(event: Event) {
  console.log(`onSubmit::${action.value}`)
  event.preventDefault()

  console.log(currentUser.value)
  const actionUrl = fullActions[action.value];

  const result = await $fetch(actionUrl, {
    method: 'POST',
    body: JSON.stringify(currentUser.value),
  }) as { success: boolean, user: User }
  console.log(result)
  if (result.success) {
    userStore.currentUser = result.user
    userStore.isLoggedIn = true
    await navigateTo('/profile')
  }
}
</script>

<template>
  <div class="flex items-start justify-center py-20">
    <article class="rounded-lg bg-slate-100 dark:bg-slate-800 p-6 shadow-lg relative">
      <h1 class="mb-4 text-2xl font-bold text-center capitalize">
        {{ action.toLowerCase() }}
      </h1>
      <form @submit="onSubmit" class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 items-baseline text-slate-700 dark:text-slate-200">
          <label for="username">Username</label>
          <input id="username" v-model="currentUser.username" type="text" class="rounded-lg px-3 py-2 bg-slate-200 dark:bg-slate-700">
          <label for="password">Password</label>
          <input id="password" v-model="currentUser.password" type="password" class="rounded-lg px-3 py-2 bg-slate-200 dark:bg-slate-700">
        <button type="submit" class="capitalize rounded-lg bg-purple-700 px-4 py-2 text-slate-100 col-start-2">
          {{ action.toLowerCase() }}
        </button>
      </form>
      <p class="mt-4">
        Don't have an account? <NuxtLink href="/register" class="text-purple-500">
          Register
        </NuxtLink>
      </p>
        <!-- <NuxtLink href="https://twitter.com/MasteringNuxt/status/1743321801755627994" class="text-purple-500" external>
          External
        </NuxtLink> -->
        <button class="p-4 absolute bottom-1 right-1" @click="changeType">
          <p class="bg-slate-500 rounded-full h-1 w-1"/>
        </button>
    </article>
  </div>
</template>

<style scoped>
label:has(input[type='checkbox']) {
  grid-column: 2;
}
/*
form {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  justify-items: start;
}

Jus' throw a load of label + input in 🙏

:has() for the little visual niceties ✨
 */
</style>
