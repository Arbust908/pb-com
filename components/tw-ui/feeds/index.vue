<script setup>
import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/vue/20/solid'

const timeline = [
  {
    id: 1,
    content: 'Applied to',
    target: 'Front End Developer',
    href: '#',
    date: 'Sep 20',
    datetime: '2020-09-20',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 22',
    datetime: '2020-09-22',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    href: '#',
    date: 'Sep 28',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 30',
    datetime: '2020-09-30',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    href: '#',
    date: 'Oct 4',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
]
</script>

<script setup>
import { ref } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'

const activity = [
  { id: 1, type: 'created', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
  { id: 2, type: 'edited', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
  { id: 3, type: 'sent', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
  { id: 6, type: 'paid', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]
const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

const selected = ref(moods[5])
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
<script setup>
  import { ChatBubbleLeftEllipsisIcon, TagIcon, UserCircleIcon } from '@heroicons/vue/20/solid'

  const activity = [
    {
      id: 1,
      type: 'comment',
      person: { name: 'Eduardo Benz', href: '#' },
      imageUrl:
        'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
      date: '6d ago',
    },
    {
      id: 2,
      type: 'assignment',
      person: { name: 'Hilary Mahy', href: '#' },
      assigned: { name: 'Kristin Watson', href: '#' },
      date: '2d ago',
    },
    {
      id: 3,
      type: 'tags',
      person: { name: 'Hilary Mahy', href: '#' },
      tags: [
        { name: 'Bug', href: '#', color: 'fill-red-500' },
        { name: 'Accessibility', href: '#', color: 'fill-indigo-500' },
      ],
      date: '6h ago',
    },
    {
      id: 4,
      type: 'comment',
      person: { name: 'Jason Meyers', href: '#' },
      imageUrl:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
      date: '2h ago',
    },
  ]
  </script>

<template>
  <div class="flow-root">
    <ul role="list" class="-mb-8">
      <li v-for="(event, eventIdx) in timeline" :key="event.id">
        <div class="relative pb-8">
          <span v-if="eventIdx !== timeline.length - 1" class="absolute left-4 top-4 h-full w-0.5 bg-gray-200 -ml-px" aria-hidden="true" />
          <div class="relative flex space-x-3">
            <div>
              <span class="h-8 w-8 flex items-center justify-center rounded-full ring-8 ring-white" :class="[event.iconBackground]">
                <component :is="event.icon" class="h-5 w-5 text-white" aria-hidden="true" />
              </span>
            </div>
            <div class="min-w-0 flex flex-1 justify-between pt-1.5 space-x-4">
              <div>
                <p class="text-sm text-gray-500">
                  {{ event.content }} <a :href="event.href" class="text-gray-900 font-medium">{{ event.target }}</a>
                </p>
              </div>
              <div class="whitespace-nowrap text-right text-sm text-gray-500">
                <time :datetime="event.datetime">{{ event.date }}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<template>
  <ul role="list" class="space-y-6">
    <li v-for="(activityItem, activityItemIdx) in activity" :key="activityItem.id" class="relative flex gap-x-4">
      <div :class="[activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
        <div class="w-px bg-gray-200" />
      </div>
      <template v-if="activityItem.type === 'commented'">
        <img :src="activityItem.person.imageUrl" alt="" class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50" />
        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
          <div class="flex justify-between gap-x-4">
            <div class="py-0.5 text-xs leading-5 text-gray-500">
              <span class="font-medium text-gray-900">{{ activityItem.person.name }}</span> commented
            </div>
            <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs leading-5 text-gray-500">{{ activityItem.date }}</time>
          </div>
          <p class="text-sm leading-6 text-gray-500">{{ activityItem.comment }}</p>
        </div>
      </template>
      <template v-else>
        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
          <CheckCircleIcon v-if="activityItem.type === 'paid'" class="h-6 w-6 text-indigo-600" aria-hidden="true" />
          <div v-else class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
        </div>
        <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
          <span class="font-medium text-gray-900">{{ activityItem.person.name }}</span> {{ activityItem.type }} the invoice.
        </p>
        <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs leading-5 text-gray-500">{{ activityItem.date }}</time>
      </template>
    </li>
  </ul>

  <!-- New comment form -->
  <div class="mt-6 flex gap-x-3">
    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-none rounded-full bg-gray-50" />
    <form action="#" class="relative flex-auto">
      <div class="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <label for="comment" class="sr-only">Add your comment</label>
        <textarea rows="2" name="comment" id="comment" class="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Add your comment..." />
      </div>

      <div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
        <div class="flex items-center space-x-5">
          <div class="flex items-center">
            <button type="button" class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
              <PaperClipIcon class="h-5 w-5" aria-hidden="true" />
              <span class="sr-only">Attach a file</span>
            </button>
          </div>
          <div class="flex items-center">
            <Listbox as="div" v-model="selected">
              <ListboxLabel class="sr-only">Your mood</ListboxLabel>
              <div class="relative">
                <ListboxButton class="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                  <span class="flex items-center justify-center">
                    <span v-if="selected.value === null">
                      <FaceSmileIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <span class="sr-only">Add your mood</span>
                    </span>
                    <span v-if="!(selected.value === null)">
                      <span :class="[selected.bgColor, 'flex h-8 w-8 items-center justify-center rounded-full']">
                        <component :is="selected.icon" class="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                      </span>
                      <span class="sr-only">{{ selected.name }}</span>
                    </span>
                  </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                  <ListboxOptions class="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                    <ListboxOption as="template" v-for="mood in moods" :key="mood.value" :value="mood" v-slot="{ active }">
                      <li :class="[active ? 'bg-gray-100' : 'bg-white', 'relative cursor-default select-none px-3 py-2']">
                        <div class="flex items-center">
                          <div :class="[mood.bgColor, 'flex h-8 w-8 items-center justify-center rounded-full']">
                            <component :is="mood.icon" :class="[mood.iconColor, 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                          </div>
                          <span class="ml-3 block truncate font-medium">{{ mood.name }}</span>
                        </div>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
        </div>
        <button type="submit" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Comment</button>
      </div>
    </form>
  </div>
</template>

  <template>
    <div class="flow-root">
      <ul role="list" class="-mb-8">
        <li v-for="(activityItem, activityItemIdx) in activity" :key="activityItem.id">
          <div class="relative pb-8">
            <span v-if="activityItemIdx !== activity.length - 1" class="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
            <div class="relative flex items-start space-x-3">
              <template v-if="activityItem.type === 'comment'">
                <div class="relative">
                  <img class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white" :src="activityItem.imageUrl" alt="" />

                  <span class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                    <ChatBubbleLeftEllipsisIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <div>
                    <div class="text-sm">
                      <a :href="activityItem.person.href" class="font-medium text-gray-900">{{ activityItem.person.name }}</a>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Commented {{ activityItem.date }}</p>
                  </div>
                  <div class="mt-2 text-sm text-gray-700">
                    <p>{{ activityItem.comment }}</p>
                  </div>
                </div>
              </template>
              <template v-else-if="activityItem.type === 'assignment'">
                <div>
                  <div class="relative px-1">
                    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                      <UserCircleIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div class="min-w-0 flex-1 py-1.5">
                  <div class="text-sm text-gray-500">
                    <a :href="activityItem.person.href" class="font-medium text-gray-900">{{ activityItem.person.name }}</a>
                    {{ ' ' }}
                    assigned
                    {{ ' ' }}
                    <a :href="activityItem.assigned.href" class="font-medium text-gray-900">{{ activityItem.assigned.name }}</a>
                    {{ ' ' }}
                    <span class="whitespace-nowrap">{{ activityItem.date }}</span>
                  </div>
                </div>
              </template>
              <template v-else-if="activityItem.type === 'tags'">
                <div>
                  <div class="relative px-1">
                    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                      <TagIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div class="min-w-0 flex-1 py-0">
                  <div class="text-sm leading-8 text-gray-500">
                    <span class="mr-0.5">
                      <a :href="activityItem.person.href" class="font-medium text-gray-900">{{ activityItem.person.name }}</a>
                      {{ ' ' }}
                      added tags
                    </span>
                    {{ ' ' }}
                    <span class="mr-0.5">
                      <template v-for="tag in activityItem.tags" :key="tag.name">
                        <a :href="tag.href" class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                          <svg :class="[tag.color, 'h-1.5 w-1.5']" viewBox="0 0 6 6" aria-hidden="true">
                            <circle cx="3" cy="3" r="3" />
                          </svg>
                          {{ tag.name }}
                        </a>
                        {{ ' ' }}
                      </template>
                    </span>
                    <span class="whitespace-nowrap">{{ activityItem.date }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
