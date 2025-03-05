<script setup lang="ts">
definePageMeta({
  // middleware: ['auth'],
  layout: "auth",
  title: 'Blog Posts :: Pancho Blanco',
})

const loading = ref(true)
const posts = ref([])

function editPost(postId: number) {
  // TODO: Implement edit post logic
}
function deletePost(postId: number) {
  // TODO: Implement delete post logic
}
</script>

<template>
  <div class="mx-auto container">
    <h1 class="mb-4 text-2xl font-bold">
      Blog Posts
    </h1>
    <div v-if="loading" class="text-center">
      Loading...
    </div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="mb-4 border rounded p-4">
        <h2 class="text-lg font-bold">
          {{ post.title }}
        </h2>
        <p class="text-gray-600">
          {{ post.content }}
        </p>
        <div class="mt-2">
          <button class="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" @click="editPost(post.id)">
            Edit
          </button>
          <button class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" @click="deletePost(post.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
