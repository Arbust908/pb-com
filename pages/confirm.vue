<script setup lang="ts">
const userStore = useUserStore()
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    userStore.currentUser = user.value
    userStore.isLoggedIn = true
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div class="flex-middle text-2xl">
    Waiting for login...
  </div>
</template>
