<script setup lang="ts">
type Props = {} & ({
  message: string
  role: 'user'
} | {
  message?: string
  role: 'model'
  isResponding?: boolean
})
const props = defineProps<Props>()

const isUser = computed(() => props.role === 'user')
const avatar = computed(() => `https://dummyimage.com/128x128/363536/ffffff&text=${props.role[0].toUpperCase()}`)
</script>

<template>
  <article class="flex items-start" :class="isUser && 'flex-row-reverse'">
    <img
      class="mr-2 h-8 w-8 rounded-full"
      :src="avatar"
    >
    <div
      class="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 md:max-w-2xl sm:max-w-md dark:bg-slate-800"
    >
      <i v-if="!isUser && isResponding" class="i-svg-spinners:3-dots-fade mx-4 size-5" />
      <p v-else>
        {{ message }}
      </p>
    </div>
    <div v-if="!isUser" class="mr-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row">
      <button class="hover:text-blue-600" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
          />
          <path
            d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
          />
        </svg>
      </button>
      <button class="hover:text-blue-600" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"
          />
        </svg>
      </button>
      <button class="hover:text-blue-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"
          />
        </svg>
      </button>
    </div>
  </article>
</template>
