<template>
  <section class="flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl font-bold sr-only">
      Auth
    </h1>
    <article class="bg-rose-5 rounded-lg border-3 border-black p4 text-white w-sm shadow-harsh w-10/12 mx-auto">
      <h2 class="text-2xl font-bold mb-4">
        Login
      </h2>
      <form class="grid gap-y-3 items-start " @submit.prevent="login">
        <FloatingLabelInput
          id="email"
          label="Email"
          v-model="email"
          type="email"
        />
        <FloatingLabelInput
          id="password"
          label="Password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
        >
          <button @click="showPassword = !showPassword" type="button" class="absolute flex-middle px-2 inset-y-0 text-black right-0">
            <i :class="showPassword ? 'i-ph-eye-closed-bold' : 'i-ph-eye-bold'" />
          </button>
        </FloatingLabelInput>
        <p class="bg-rose-1 mt-2 shadow-inner-harsh rounded text-rose-8 flex-middle px-2 pb-2 pt-3 border border-black gap-x-2 interpolate-size transition-all duration-300 ease-in-out"
          :class="errorMessage ? 'h-auto' : 'h-0 opacity-0'"
        >
          <span class="i-ph-warning-bold">
          </span>
          <span>
            {{ errorMessage }}
          </span>
        </p>
        <button 
          type="submit"
          class="bg-white text-rose-6 px-3 py-1 rounded-lg mt-4 ml-auto shadow-flat hover:shadow-harsh hover:-translate-x-1 hover:-translate-y-1 border-2 border-black focus:outline-none focus:shadow-harsh focus:-translate-x-1 focus:-translate-y-1"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import FloatingLabelInput from '~/components/ui/FloatingLabelInput.vue'

/* CSS input psudo selectors
// https://x.com/argyleink/status/1844408871542194294
:enabled :disabled
:valid :invalid
:user-valid :user-invalid
:required :optional
:read-write :read-only
:out-of-range :in-range
:placeholder-shown
:autofill
*/
/* 
// https://x.com/anatudor/status/1849012879170670616
:is(a, button, input):is(:hover, :focus) {
  --hov: 1;
}
*/

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const client = useSupabaseClient()
const userStore = useUserStore()
const router = useRouter()

async function login() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Email and password are required'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    
    if (error) {
      errorMessage.value = error.message
      return
    }
    
    // Update user store
    userStore.currentUser.email = email.value
    userStore.isLoggedIn = true
    
    // Redirect to home page
    router.push('/')
  } catch (err) {
    errorMessage.value = 'An error occurred during login'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// Check if user is already logged in on page load
onMounted(() => {
  if (userStore.isLoggedIn) {
    router.push('/')
  }
})

definePageMeta({
  layout: "auth",
});
</script>
