<script setup lang="ts">
const title = ref('')
const content = ref('')
const category = ref('technology')

function submitForm() {
  // Handle form submission logic here
}
</script>

<template>
  <div class="mx-auto container">
    <h1 class="mb-4 text-2xl font-bold">
      Create Post
    </h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="title" class="mb-2 block text-gray-700 font-bold">Title</label>
        <input id="title" v-model="title" type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-indigo-500 focus:outline-none">
      </div>
      <div class="mb-4">
        <label for="content" class="mb-2 block text-gray-700 font-bold">Content</label>
        <textarea id="content" v-model="content" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-indigo-500 focus:outline-none" />
      </div>
      <div class="mb-4">
        <label for="category" class="mb-2 block text-gray-700 font-bold">Category</label>
        <select id="category" v-model="category" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-indigo-500 focus:outline-none">
          <option value="technology">
            Technology
          </option>
          <option value="lifestyle">
            Lifestyle
          </option>
          <option value="travel">
            Travel
          </option>
        </select>
      </div>
      <button type="submit" class="rounded-md bg-indigo-500 px-4 py-2 text-white">
        Create
      </button>
    </form>
  </div>
</template>
