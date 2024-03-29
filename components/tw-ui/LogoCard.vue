<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}
const clients = [
  {
    id: 1,
    name: 'Tuple',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
    lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
  },
  {
    id: 2,
    name: 'SavvyCal',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
    lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
  },
  {
    id: 3,
    name: 'Reform',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  },
]
</script>

<template>
  <ul role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
    <li v-for="client in clients" :key="client.id" class="overflow-hidden border border-gray-200 rounded-xl">
      <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <img :src="client.imageUrl" :alt="client.name" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10">
        <div class="text-sm text-gray-900 font-medium leading-6">
          {{ client.name }}
        </div>
        <Menu as="div" class="relative ml-auto">
          <MenuButton class="block p-2.5 text-gray-400 -m-2.5 hover:text-gray-500">
            <span class="sr-only">Open options</span>
            <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
          </MenuButton>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem v-slot="{ active }">
                <a href="#" class="block px-3 py-1 text-sm text-gray-900 leading-6" :class="[active ? 'bg-gray-50' : '']">View<span class="sr-only">, {{ client.name }}</span></a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" class="block px-3 py-1 text-sm text-gray-900 leading-6" :class="[active ? 'bg-gray-50' : '']">Edit<span class="sr-only">, {{ client.name }}</span></a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <dl class="px-6 py-4 text-sm leading-6 -my-3 divide-y divide-gray-100">
        <div class="flex justify-between gap-x-4 py-3">
          <dt class="text-gray-500">
            Last invoice
          </dt>
          <dd class="text-gray-700">
            <time :datetime="client.lastInvoice.dateTime">{{ client.lastInvoice.date }}</time>
          </dd>
        </div>
        <div class="flex justify-between gap-x-4 py-3">
          <dt class="text-gray-500">
            Amount
          </dt>
          <dd class="flex items-start gap-x-2">
            <div class="text-gray-900 font-medium">
              {{ client.lastInvoice.amount }}
            </div>
            <div class="rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset" :class="[statuses[client.lastInvoice.status]]">
              {{ client.lastInvoice.status }}
            </div>
          </dd>
        </div>
      </dl>
    </li>
  </ul>
</template>
