<script setup>
</script>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid'
</script>

<script setup>
  import { ChatBubbleBottomCenterTextIcon, PaperClipIcon, PencilIcon, TrashIcon } from '@heroicons/vue/20/solid'
  </script>

<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300" />
    </div>
    <div class="relative flex justify-center">
      <span class="bg-white px-2 text-sm text-gray-500">Continue</span>
    </div>
  </div>
</template>

  <template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300" />
    </div>
    <div class="relative flex justify-center">
      <span class="bg-white px-2 text-gray-500">
        <PlusIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
      </span>
    </div>
  </div>
</template>

<template>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-start">
        <span class="bg-white pr-2 text-sm text-gray-500">Continue</span>
      </div>
    </div>
  </template>

  <template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300" />
    </div>
    <div class="relative flex justify-center">
      <span class="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Projects</span>
    </div>
  </div>
</template>

<template>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-start">
        <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">Projects</span>
      </div>
    </div>
  </template>

<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300" />
    </div>
    <div class="relative flex justify-center">
      <button type="button" class="inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <PlusIcon class="-ml-1 -mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
        Button text
      </button>
    </div>
  </div>
</template>

  <template>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center">
        <span class="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <button type="button" class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
            <span class="sr-only">Edit</span>
            <PencilIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" class="relative inline-flex items-center bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
            <span class="sr-only">Attachment</span>
            <PaperClipIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" class="relative inline-flex items-center bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
            <span class="sr-only">Annotate</span>
            <ChatBubbleBottomCenterTextIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" class="relative inline-flex items-center rounded-r-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
            <span class="sr-only">Delete</span>
            <TrashIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </span>
      </div>
    </div>
  </template>
