<script setup>
const isWebAuthNCompatible = ref(false)
const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)

definePageMeta({
  middleware: ['auth'],
})

onMounted(() => {
  console.warn(userStore.currentUser)
  if (window.PublicKeyCredential)
    isWebAuthNCompatible.value = true
})
</script>

<template>
  <div v-if="currentUser" class="mx-auto container">
    <h1 class="mb-4 text-2xl font-bold">
      Profile Page
    </h1>
    <p class="mb-4">
      Welcome to your profile page {{ currentUser.username }}!
    </p>
    <p class="mb-4">
      {{ currentUser.email }}!
    </p>

    <button v-if="isWebAuthNCompatible" class="rounded bg-blue-500 px-4 py-2 text-white font-bold hover:bg-blue-700">
      Register PassKey
    </button>
  </div>
</template>
