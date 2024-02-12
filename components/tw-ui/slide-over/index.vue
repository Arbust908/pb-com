<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const open = ref(true)
</script>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const open = ref(true)
</script>

<script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'

  const open = ref(true)
  </script>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const open = ref(true)
</script>

<script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'

  const open = ref(true)
  </script>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const open = ref(true)
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 max-w-full flex pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto max-w-md w-screen">
                <div class="h-full flex flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base text-gray-900 font-semibold leading-6">
                        Panel title
                      </DialogTitle>
                      <div class="ml-3 h-7 flex items-center">
                        <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="open = false">
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Your content -->
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Panel title</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="open = false">
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Your content -->
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-md">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Panel title</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="open = false">
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <!-- Your content -->
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>

  <template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                    <button type="button" class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                      <span class="absolute -inset-2.5" />
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Panel title</DialogTitle>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Your content -->
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

  <template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <div class="fixed inset-0" />

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-md">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="bg-indigo-700 px-4 py-6 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-base font-semibold leading-6 text-white">Panel title</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-1">
                        <p class="text-sm text-indigo-300">Lorem, ipsum dolor sit amet consectetur adipisicing elit aliquam ad hic recusandae soluta.</p>
                      </div>
                    </div>
                    <div class="relative flex-1 px-4 py-6 sm:px-6">
                      <!-- Your content -->
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Panel title</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" @click="open = false">
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <!-- Your content -->
                    </div>
                  </div>
                  <div class="flex flex-shrink-0 justify-end px-4 py-4">
                    <button type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400" @click="open = false">Cancel</button>
                    <button type="submit" class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
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
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <div class="fixed inset-0" />

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-md">
                  <form class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div class="h-0 flex-1 overflow-y-auto">
                      <div class="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div class="flex items-center justify-between">
                          <DialogTitle class="text-base font-semibold leading-6 text-white">New Project</DialogTitle>
                          <div class="ml-3 flex h-7 items-center">
                            <button type="button" class="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                              <span class="absolute -inset-2.5" />
                              <span class="sr-only">Close panel</span>
                              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div class="mt-1">
                          <p class="text-sm text-indigo-300">Get started by filling in the information below to create your new project.</p>
                        </div>
                      </div>
                      <div class="flex flex-1 flex-col justify-between">
                        <div class="divide-y divide-gray-200 px-4 sm:px-6">
                          <div class="space-y-6 pb-5 pt-6">
                            <div>
                              <label for="project-name" class="block text-sm font-medium leading-6 text-gray-900">Project name</label>
                              <div class="mt-2">
                                <input type="text" name="project-name" id="project-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                              </div>
                            </div>
                            <div>
                              <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                              <div class="mt-2">
                                <textarea id="description" name="description" rows="4" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                              </div>
                            </div>
                            <div>
                              <h3 class="text-sm font-medium leading-6 text-gray-900">Team Members</h3>
                              <div class="mt-2">
                                <div class="flex space-x-2">
                                  <a v-for="person in team" :key="person.email" :href="person.href" class="relative rounded-full hover:opacity-75">
                                    <img class="inline-block h-8 w-8 rounded-full" :src="person.imageUrl" :alt="person.name" />
                                  </a>
                                  <button type="button" class="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span class="absolute -inset-2" />
                                    <span class="sr-only">Add team member</span>
                                    <PlusIcon class="h-5 w-5" aria-hidden="true" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <fieldset>
                              <legend class="text-sm font-medium leading-6 text-gray-900">Privacy</legend>
                              <div class="mt-2 space-y-4">
                                <div class="relative flex items-start">
                                  <div class="absolute flex h-6 items-center">
                                    <input id="privacy-public" name="privacy" aria-describedby="privacy-public-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" checked="" />
                                  </div>
                                  <div class="pl-7 text-sm leading-6">
                                    <label for="privacy-public" class="font-medium text-gray-900">Public access</label>
                                    <p id="privacy-public-description" class="text-gray-500">Everyone with the link will see this project.</p>
                                  </div>
                                </div>
                                <div>
                                  <div class="relative flex items-start">
                                    <div class="absolute flex h-6 items-center">
                                      <input id="privacy-private-to-project" name="privacy" aria-describedby="privacy-private-to-project-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                    </div>
                                    <div class="pl-7 text-sm leading-6">
                                      <label for="privacy-private-to-project" class="font-medium text-gray-900">Private to project members</label>
                                      <p id="privacy-private-to-project-description" class="text-gray-500">Only members of this project would be able to access.</p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div class="relative flex items-start">
                                    <div class="absolute flex h-6 items-center">
                                      <input id="privacy-private" name="privacy" aria-describedby="privacy-private-to-project-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                    </div>
                                    <div class="pl-7 text-sm leading-6">
                                      <label for="privacy-private" class="font-medium text-gray-900">Private to you</label>
                                      <p id="privacy-private-description" class="text-gray-500">You are the only one able to access this project.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                          <div class="pb-6 pt-4">
                            <div class="flex text-sm">
                              <a href="#" class="group inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900">
                                <LinkIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-900" aria-hidden="true" />
                                <span class="ml-2">Copy link</span>
                              </a>
                            </div>
                            <div class="mt-4 flex text-sm">
                              <a href="#" class="group inline-flex items-center text-gray-500 hover:text-gray-900">
                                <QuestionMarkCircleIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                <span class="ml-2">Learn more about sharing</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-shrink-0 justify-end px-4 py-4">
                      <button type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" @click="open = false">Cancel</button>
                      <button type="submit" class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'

  const team = [
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Whitney Francis',
      email: 'whitney.francis@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Leonard Krasner',
      email: 'leonard.krasner@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Floyd Miles',
      email: 'floyd.miles@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Emily Selman',
      email: 'emily.selman@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]

  const open = ref(true)
  </script>

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
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                <form class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1">
                    <!-- Header -->
                    <div class="bg-gray-50 px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between space-x-3">
                        <div class="space-y-1">
                          <DialogTitle class="text-base font-semibold leading-6 text-gray-900">New project</DialogTitle>
                          <p class="text-sm text-gray-500">Get started by filling in the information below to create your new project.</p>
                        </div>
                        <div class="flex h-7 items-center">
                          <button type="button" class="relative text-gray-400 hover:text-gray-500" @click="open = false">
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Divider container -->
                    <div class="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                      <!-- Project name -->
                      <div class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                          <label for="project-name" class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">Project name</label>
                        </div>
                        <div class="sm:col-span-2">
                          <input type="text" name="project-name" id="project-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <!-- Project description -->
                      <div class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                          <label for="project-description" class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">Description</label>
                        </div>
                        <div class="sm:col-span-2">
                          <textarea id="project-description" name="project-description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <!-- Team members -->
                      <div class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                          <h3 class="text-sm font-medium leading-6 text-gray-900">Team Members</h3>
                        </div>
                        <div class="sm:col-span-2">
                          <div class="flex space-x-2">
                            <a v-for="person in team" :key="person.email" :href="person.href" class="flex-shrink-0 rounded-full hover:opacity-75">
                              <img class="inline-block h-8 w-8 rounded-full" :src="person.imageUrl" :alt="person.name" />
                            </a>

                            <button type="button" class="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              <span class="absolute -inset-2" />
                              <span class="sr-only">Add team member</span>
                              <PlusIcon class="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Privacy -->
                      <fieldset class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <legend class="sr-only">Privacy</legend>
                        <div class="text-sm font-medium leading-6 text-gray-900" aria-hidden="true">Privacy</div>
                        <div class="space-y-5 sm:col-span-2">
                          <div class="space-y-5 sm:mt-0">
                            <div class="relative flex items-start">
                              <div class="absolute flex h-6 items-center">
                                <input id="public-access" name="privacy" aria-describedby="public-access-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" checked="" />
                              </div>
                              <div class="pl-7 text-sm leading-6">
                                <label for="public-access" class="font-medium text-gray-900">Public access</label>
                                <p id="public-access-description" class="text-gray-500">Everyone with the link will see this project</p>
                              </div>
                            </div>
                            <div class="relative flex items-start">
                              <div class="absolute flex h-6 items-center">
                                <input id="restricted-access" name="privacy" aria-describedby="restricted-access-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                              </div>
                              <div class="pl-7 text-sm leading-6">
                                <label for="restricted-access" class="font-medium text-gray-900">Private to Project Members</label>
                                <p id="restricted-access-description" class="text-gray-500">Only members of this project would be able to access</p>
                              </div>
                            </div>
                            <div class="relative flex items-start">
                              <div class="absolute flex h-6 items-center">
                                <input id="private-access" name="privacy" aria-describedby="private-access-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                              </div>
                              <div class="pl-7 text-sm leading-6">
                                <label for="private-access" class="font-medium text-gray-900">Private to you</label>
                                <p id="private-access-description" class="text-gray-500">You are the only one able to access this project</p>
                              </div>
                            </div>
                          </div>
                          <hr class="border-gray-200" />
                          <div class="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            <div>
                              <a href="#" class="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                <LinkIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-900" aria-hidden="true" />
                                <span>Copy link</span>
                              </a>
                            </div>
                            <div>
                              <a href="#" class="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900">
                                <QuestionMarkCircleIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                <span>Learn more about sharing</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <!-- Action buttons -->
                  <div class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div class="flex justify-end space-x-3">
                      <button type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" @click="open = false">Cancel</button>
                      <button type="submit" class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'

const team = [
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

const open = ref(true)
</script>

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
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <div class="fixed inset-0" />

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                  <form class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="flex-1">
                      <!-- Header -->
                      <div class="bg-gray-50 px-4 py-6 sm:px-6">
                        <div class="flex items-start justify-between space-x-3">
                          <div class="space-y-1">
                            <DialogTitle class="text-base font-semibold leading-6 text-gray-900">New project</DialogTitle>
                            <p class="text-sm text-gray-500">Get started by filling in the information below to create your new project.</p>
                          </div>
                          <div class="flex h-7 items-center">
                            <button type="button" class="relative text-gray-400 hover:text-gray-500" @click="open = false">
                              <span class="absolute -inset-2.5" />
                              <span class="sr-only">Close panel</span>
                              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Divider container -->
                      <div class="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        <!-- Project name -->
                        <div class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label for="project-name" class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">Project name</label>
                          </div>
                          <div class="sm:col-span-2">
                            <input type="text" name="project-name" id="project-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <!-- Project description -->
                        <div class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label for="project-description" class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">Description</label>
                          </div>
                          <div class="sm:col-span-2">
                            <textarea id="project-description" name="project-description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <!-- Team members -->
                        <div class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <h3 class="text-sm font-medium leading-6 text-gray-900">Team Members</h3>
                          </div>
                          <div class="sm:col-span-2">
                            <div class="flex space-x-2">
                              <a v-for="person in team" :key="person.email" :href="person.href" class="flex-shrink-0 rounded-full hover:opacity-75">
                                <img class="inline-block h-8 w-8 rounded-full" :src="person.imageUrl" :alt="person.name" />
                              </a>

                              <button type="button" class="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span class="absolute -inset-2" />
                                <span class="sr-only">Add team member</span>
                                <PlusIcon class="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <!-- Privacy -->
                        <fieldset class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <legend class="sr-only">Privacy</legend>
                          <div class="text-sm font-medium leading-6 text-gray-900" aria-hidden="true">Privacy</div>
                          <div class="space-y-5 sm:col-span-2">
                            <div class="space-y-5 sm:mt-0">
                              <div class="relative flex items-start">
                                <div class="absolute flex h-6 items-center">
                                  <input id="public-access" name="privacy" aria-describedby="public-access-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" checked="" />
                                </div>
                                <div class="pl-7 text-sm leading-6">
                                  <label for="public-access" class="font-medium text-gray-900">Public access</label>
                                  <p id="public-access-description" class="text-gray-500">Everyone with the link will see this project</p>
                                </div>
                              </div>
                              <div class="relative flex items-start">
                                <div class="absolute flex h-6 items-center">
                                  <input id="restricted-access" name="privacy" aria-describedby="restricted-access-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div class="pl-7 text-sm leading-6">
                                  <label for="restricted-access" class="font-medium text-gray-900">Private to Project Members</label>
                                  <p id="restricted-access-description" class="text-gray-500">Only members of this project would be able to access</p>
                                </div>
                              </div>
                              <div class="relative flex items-start">
                                <div class="absolute flex h-6 items-center">
                                  <input id="private-access" name="privacy" aria-describedby="private-access-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div class="pl-7 text-sm leading-6">
                                  <label for="private-access" class="font-medium text-gray-900">Private to you</label>
                                  <p id="private-access-description" class="text-gray-500">You are the only one able to access this project</p>
                                </div>
                              </div>
                            </div>
                            <hr class="border-gray-200" />
                            <div class="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                              <div>
                                <a href="#" class="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                  <LinkIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-900" aria-hidden="true" />
                                  <span>Copy link</span>
                                </a>
                              </div>
                              <div>
                                <a href="#" class="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900">
                                  <QuestionMarkCircleIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                  <span>Learn more about sharing</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div class="flex justify-end space-x-3">
                        <button type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" @click="open = false">Cancel</button>
                        <button type="submit" class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                      </div>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'

  const team = [
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Whitney Francis',
      email: 'whitney.francis@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Leonard Krasner',
      email: 'leonard.krasner@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Floyd Miles',
      email: 'floyd.miles@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Emily Selman',
      email: 'emily.selman@example.com',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]

  const open = ref(true)
  </script>

  <template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2 id="slide-over-heading" class="text-base font-semibold leading-6 text-gray-900">Profile</h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500" @click="open = false">
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Main -->
                  <div>
                    <div class="pb-1 sm:pb-6">
                      <div>
                        <div class="relative h-40 sm:h-56">
                          <img class="absolute h-full w-full object-cover" src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80" alt="" />
                        </div>
                        <div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                          <div class="sm:flex-1">
                            <div>
                              <div class="flex items-center">
                                <h3 class="text-xl font-bold text-gray-900 sm:text-2xl">Ashley Porter</h3>
                                <span class="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                  <span class="sr-only">Online</span>
                                </span>
                              </div>
                              <p class="text-sm text-gray-500">@ashleyporter</p>
                            </div>
                            <div class="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                              <button type="button" class="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1">Message</button>
                              <button type="button" class="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Call</button>
                              <div class="ml-3 inline-flex sm:ml-0">
                                <Menu as="div" class="relative inline-block text-left">
                                  <MenuButton class="relative inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <span class="absolute -inset-1" />
                                    <span class="sr-only">Open options menu</span>
                                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                                  </MenuButton>
                                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      <div class="py-1">
                                        <MenuItem v-slot="{ active }">
                                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Copy profile link</a>
                                        </MenuItem>
                                      </div>
                                    </MenuItems>
                                  </transition>
                                </Menu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                      <dl class="space-y-8 px-4 sm:space-y-6 sm:px-6">
                        <div>
                          <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Bio</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <p>Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. Gravida in tempus feugiat netus enim aliquet a, quam scelerisque. Dictumst in convallis nec in bibendum aenean arcu.</p>
                          </dd>
                        </div>
                        <div>
                          <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Location</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">New York, NY, USA</dd>
                        </div>
                        <div>
                          <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Website</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">ashleyporter.com</dd>
                        </div>
                        <div>
                          <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Birthday</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <time datetime="1988-06-23">June 23, 1988</time>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

const open = ref(true)
</script>

<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <div class="fixed inset-0" />

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Profile</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500" @click="open = false">
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- Main -->
                    <div class="divide-y divide-gray-200">
                      <div class="pb-6">
                        <div class="h-24 bg-indigo-700 sm:h-20 lg:h-28" />
                        <div class="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-16">
                          <div>
                            <div class="-m-1 flex">
                              <div class="inline-flex overflow-hidden rounded-lg border-4 border-white">
                                <img class="h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48" src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80" alt="" />
                              </div>
                            </div>
                          </div>
                          <div class="mt-6 sm:ml-6 sm:flex-1">
                            <div>
                              <div class="flex items-center">
                                <h3 class="text-xl font-bold text-gray-900 sm:text-2xl">Ashley Porter</h3>
                                <span class="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                  <span class="sr-only">Online</span>
                                </span>
                              </div>
                              <p class="text-sm text-gray-500">@ashleyporter</p>
                            </div>
                            <div class="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                              <button type="button" class="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1">Message</button>
                              <button type="button" class="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Call</button>
                              <div class="ml-3 inline-flex sm:ml-0">
                                <Menu as="div" class="relative inline-block text-left">
                                  <MenuButton class="relative inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <span class="absolute -inset-1" />
                                    <span class="sr-only">Open options menu</span>
                                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                                  </MenuButton>
                                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      <div class="py-1">
                                        <MenuItem v-slot="{ active }">
                                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Copy profile link</a>
                                        </MenuItem>
                                      </div>
                                    </MenuItems>
                                  </transition>
                                </Menu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="px-4 py-5 sm:px-0 sm:py-0">
                        <dl class="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                          <div class="sm:flex sm:px-6 sm:py-5">
                            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">Bio</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                              <p>Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. Gravida in tempus feugiat netus enim aliquet a, quam scelerisque. Dictumst in convallis nec in bibendum aenean arcu.</p>
                            </dd>
                          </div>
                          <div class="sm:flex sm:px-6 sm:py-5">
                            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">Location</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">New York, NY, USA</dd>
                          </div>
                          <div class="sm:flex sm:px-6 sm:py-5">
                            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">Website</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">ashleyporter.com</dd>
                          </div>
                          <div class="sm:flex sm:px-6 sm:py-5">
                            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">Birthday</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                              <time datetime="1982-06-23">June 23, 1982</time>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>

  <script setup>
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

  const open = ref(true)
  </script>

  <template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="p-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Team</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500" @click="open = false">
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="border-b border-gray-200">
                    <div class="px-6">
                      <nav class="-mb-px flex space-x-6">
                        <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium']">{{ tab.name }}</a>
                      </nav>
                    </div>
                  </div>
                  <ul role="list" class="flex-1 divide-y divide-gray-200 overflow-y-auto">
                    <li v-for="person in team" :key="person.handle">
                      <div class="group relative flex items-center px-5 py-6">
                        <a :href="person.href" class="-m-1 block flex-1 p-1">
                          <div class="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
                          <div class="relative flex min-w-0 flex-1 items-center">
                            <span class="relative inline-block flex-shrink-0">
                              <img class="h-10 w-10 rounded-full" :src="person.imageUrl" alt="" />
                              <span :class="[person.status === 'online' ? 'bg-green-400' : 'bg-gray-300', 'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white']" aria-hidden="true" />
                            </span>
                            <div class="ml-4 truncate">
                              <p class="truncate text-sm font-medium text-gray-900">{{ person.name }}</p>
                              <p class="truncate text-sm text-gray-500">{{ `@${person.handle}` }}</p>
                            </div>
                          </div>
                        </a>
                        <Menu as="div" class="relative ml-2 inline-block flex-shrink-0 text-left">
                          <MenuButton class="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span class="absolute -inset-1.5" />
                            <span class="sr-only">Open options menu</span>
                            <span class="flex h-full w-full items-center justify-center rounded-full">
                              <EllipsisVerticalIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                            </span>
                          </MenuButton>
                          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="absolute right-9 top-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Send message</a>
                                </MenuItem>
                              </div>
                            </MenuItems>
                          </transition>
                        </Menu>
                      </div>
                    </li>
                  </ul>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

const tabs = [
  { name: 'All', href: '#', current: true },
  { name: 'Online', href: '#', current: false },
  { name: 'Offline', href: '#', current: false },
]
const team = [
  {
    name: 'Leslie Alexander',
    handle: 'lesliealexander',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'online',
  },
  // More people...
]

const open = ref(true)
</script>

<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto relative w-96">
                  <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button type="button" class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                        <span class="absolute -inset-2.5" />
                        <span class="sr-only">Close panel</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </TransitionChild>
                  <div class="h-full overflow-y-auto bg-white p-8">
                    <div class="space-y-6 pb-16">
                      <div>
                        <div class="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                          <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80" alt="" class="object-cover" />
                        </div>
                        <div class="mt-4 flex items-start justify-between">
                          <div>
                            <h2 class="text-base font-semibold leading-6 text-gray-900"><span class="sr-only">Details for </span>IMG_4985.HEIC</h2>
                            <p class="text-sm font-medium text-gray-500">3.9 MB</p>
                          </div>
                          <button type="button" class="relative ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <span class="absolute -inset-1.5" />
                            <HeartIcon class="h-6 w-6" aria-hidden="true" />
                            <span class="sr-only">Favorite</span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <h3 class="font-medium text-gray-900">Information</h3>
                        <dl class="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                          <div class="flex justify-between py-3 text-sm font-medium">
                            <dt class="text-gray-500">Uploaded by</dt>
                            <dd class="text-gray-900">Marie Culver</dd>
                          </div>
                          <div class="flex justify-between py-3 text-sm font-medium">
                            <dt class="text-gray-500">Created</dt>
                            <dd class="text-gray-900">June 8, 2020</dd>
                          </div>
                          <div class="flex justify-between py-3 text-sm font-medium">
                            <dt class="text-gray-500">Last modified</dt>
                            <dd class="text-gray-900">June 8, 2020</dd>
                          </div>
                          <div class="flex justify-between py-3 text-sm font-medium">
                            <dt class="text-gray-500">Dimensions</dt>
                            <dd class="text-gray-900">4032 x 3024</dd>
                          </div>
                          <div class="flex justify-between py-3 text-sm font-medium">
                            <dt class="text-gray-500">Resolution</dt>
                            <dd class="text-gray-900">72 x 72</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 class="font-medium text-gray-900">Description</h3>
                        <div class="mt-2 flex items-center justify-between">
                          <p class="text-sm italic text-gray-500">Add a description to this image.</p>
                          <button type="button" class="relative -mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <span class="absolute -inset-1.5" />
                            <PencilIcon class="h-5 w-5" aria-hidden="true" />
                            <span class="sr-only">Add description</span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <h3 class="font-medium text-gray-900">Shared with</h3>
                        <ul role="list" class="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                          <li class="flex items-center justify-between py-3">
                            <div class="flex items-center">
                              <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80" alt="" class="h-8 w-8 rounded-full" />
                              <p class="ml-4 text-sm font-medium text-gray-900">Aimee Douglas</p>
                            </div>
                            <button type="button" class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Remove<span class="sr-only"> Aimee Douglas</span></button>
                          </li>
                          <li class="flex items-center justify-between py-3">
                            <div class="flex items-center">
                              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-8 w-8 rounded-full" />
                              <p class="ml-4 text-sm font-medium text-gray-900">Andrea McMillan</p>
                            </div>
                            <button type="button" class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Remove<span class="sr-only"> Andrea McMillan</span></button>
                          </li>
                          <li class="flex items-center justify-between py-2">
                            <button type="button" class="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                              <span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                                <PlusIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                              <span class="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">Share</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div class="flex">
                        <button type="button" class="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Download</button>
                        <button type="button" class="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Delete</button>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { HeartIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { PencilIcon, PlusIcon } from '@heroicons/vue/20/solid'

  const open = ref(true)
  </script>
