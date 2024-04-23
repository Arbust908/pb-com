<script setup>
import { BookmarkIcon } from "@heroicons/vue/20/solid";
</script>

<template>
  <span class="isolate inline-flex rounded-md shadow-sm">
    <button type="button" class="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm text-gray-900 font-semibold ring-1 ring-gray-300 ring-inset focus:z-10 hover:bg-gray-50">
      <BookmarkIcon class="h-5 w-5 text-gray-400 -ml-0.5" aria-hidden="true" />
      Bookmark
    </button>
    <button type="button" class="relative inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm text-gray-900 font-semibold ring-1 ring-gray-300 ring-inset focus:z-10 -ml-px hover:bg-gray-50">12k</button>
  </span>
</template>
