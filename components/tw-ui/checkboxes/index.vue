<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <fieldset>
      <legend class="sr-only">Notifications</legend>
      <div class="space-y-5">
        <div class="relative flex items-start">
          <div class="flex h-6 items-center">
            <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          </div>
          <div class="ml-3 text-sm leading-6">
            <label for="comments" class="font-medium text-gray-900">Comments</label>
            <p id="comments-description" class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
          </div>
        </div>
        <div class="relative flex items-start">
          <div class="flex h-6 items-center">
            <input id="candidates" aria-describedby="candidates-description" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          </div>
          <div class="ml-3 text-sm leading-6">
            <label for="candidates" class="font-medium text-gray-900">Candidates</label>
            <p id="candidates-description" class="text-gray-500">Get notified when a candidate applies for a job.</p>
          </div>
        </div>
        <div class="relative flex items-start">
          <div class="flex h-6 items-center">
            <input id="offers" aria-describedby="offers-description" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          </div>
          <div class="ml-3 text-sm leading-6">
            <label for="offers" class="font-medium text-gray-900">Offers</label>
            <p id="offers-description" class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
          </div>
        </div>
      </div>
    </fieldset>
  </template>


<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <fieldset>
    <legend class="sr-only">Notifications</legend>
    <div class="space-y-5">
      <div class="relative flex items-start">
        <div class="flex h-6 items-center">
          <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        </div>
        <div class="ml-3 text-sm leading-6">
          <label for="comments" class="font-medium text-gray-900">New comments</label>
          {{ ' ' }}
          <span id="comments-description" class="text-gray-500"><span class="sr-only">New comments </span>so you always know what's happening.</span>
        </div>
      </div>
      <div class="relative flex items-start">
        <div class="flex h-6 items-center">
          <input id="candidates" aria-describedby="candidates-description" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        </div>
        <div class="ml-3 text-sm leading-6">
          <label for="candidates" class="font-medium text-gray-900">New candidates</label>
          {{ ' ' }}
          <span id="candidates-description" class="text-gray-500"><span class="sr-only">New candidates </span>who apply for any open postings.</span>
        </div>
      </div>
      <div class="relative flex items-start">
        <div class="flex h-6 items-center">
          <input id="offers" aria-describedby="offers-description" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        </div>
        <div class="ml-3 text-sm leading-6">
          <label for="offers" class="font-medium text-gray-900">Offers</label>
          {{ ' ' }}
          <span id="offers-description" class="text-gray-500"><span class="sr-only">Offers </span>when they are accepted or rejected by candidates.</span>
        </div>
      </div>
    </div>
  </fieldset>
</template>


<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <fieldset class="border-b border-t border-gray-200">
      <legend class="sr-only">Notifications</legend>
      <div class="divide-y divide-gray-200">
        <div class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label for="comments" class="font-medium text-gray-900">Comments</label>
            <p id="comments-description" class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          </div>
        </div>
        <div class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label for="candidates" class="font-medium text-gray-900">Candidates</label>
            <p id="candidates-description" class="text-gray-500">Get notified when a candidate applies for a job.</p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input id="candidates" aria-describedby="candidates-description" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          </div>
        </div>
        <div class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label for="offers" class="font-medium text-gray-900">Offers</label>
            <p id="offers-description" class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input id="offers" aria-describedby="offers-description" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          </div>
        </div>
      </div>
    </fieldset>
  </template>


<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <fieldset>
    <legend class="text-base font-semibold leading-6 text-gray-900">Members</legend>
    <div class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
      <div v-for="(person, personIdx) in people" :key="personIdx" class="relative flex items-start py-4">
        <div class="min-w-0 flex-1 text-sm leading-6">
          <label :for="`person-${person.id}`" class="select-none font-medium text-gray-900">{{ person.name }}</label>
        </div>
        <div class="ml-3 flex h-6 items-center">
          <input :id="`person-${person.id}`" :name="`person-${person.id}`" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
const people = [
  { id: 1, name: 'Annette Black' },
  { id: 2, name: 'Cody Fisher' },
  { id: 3, name: 'Courtney Henry' },
  { id: 4, name: 'Kathryn Murphy' },
  { id: 5, name: 'Theresa Webb' },
]
</script>

