<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const people = [
  { name: 'Wade Cooper', username: '@wadecooper' },
  { name: 'Arlene Mccoy', username: '@arlenemccoy' },
  { name: 'Devon Webb', username: '@devonwebb' },
  { name: 'Tom Cook', username: '@tomcook' },
  { name: 'Tanya Fox', username: '@tanyafox' },
  { name: 'Hellen Schmidt', username: '@hellenschmidt' },
  { name: 'Caroline Schultz', username: '@carolineschultz' },
  { name: 'Mason Heaney', username: '@masonheaney' },
  { name: 'Claudie Smitham', username: '@claudiesmitham' },
  { name: 'Emil Schaefer', username: '@emilschaefer' },
]

const selected = ref(people[3])
</script>

<template>
  <Listbox v-model="selected" as="div">
    <ListboxLabel class="block text-sm text-gray-900 font-medium leading-6">
      Assigned to
    </ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset sm:text-sm sm:leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <span class="w-full inline-flex truncate">
          <span class="truncate">{{ selected.name }}</span>
          <span class="ml-2 truncate text-gray-500">{{ selected.username }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm focus:outline-none">
          <ListboxOption v-for="person in people" :key="person.username" v-slot="{ active, selected }" as="template" :value="person">
            <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
              <div class="flex">
                <span class="truncate" :class="[selected ? 'font-semibold' : 'font-normal']">{{ person.name }}</span>
                <span class="ml-2 truncate" :class="[active ? 'text-indigo-200' : 'text-gray-500']">{{ person.username }}</span>
              </div>

              <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4" :class="[active ? 'text-white' : 'text-indigo-600']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
