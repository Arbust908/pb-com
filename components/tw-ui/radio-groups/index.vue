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
const notificationMethods = [
 { id: "email", title: "Email" },
 { id: "sms", title: "Phone (SMS)" },
 { id: "push", title: "Push notification" },
];
</script>

<script setup>
const notificationMethods = [
  { id: 'email', title: 'Email' },
  { id: 'sms', title: 'Phone (SMS)' },
  { id: 'push', title: 'Push notification' },
]
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
  const plans = [
    { id: 'small', name: 'Small', description: '4 GB RAM / 2 CPUS / 80 GB SSD Storage' },
    { id: 'medium', name: 'Medium', description: '8 GB RAM / 4 CPUS / 160 GB SSD Storage' },
    { id: 'large', name: 'Large', description: '16 GB RAM / 8 CPUS / 320 GB SSD Storage' },
  ]
  </script>

<script setup>
const plans = [
  { id: 'small', name: 'Small', description: '4 GB RAM / 2 CPUS / 80 GB SSD Storage' },
  { id: 'medium', name: 'Medium', description: '8 GB RAM / 4 CPUS / 160 GB SSD Storage' },
  { id: 'large', name: 'Large', description: '16 GB RAM / 8 CPUS / 320 GB SSD Storage' },
]
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
  const accounts = [
    { id: 'checking', name: 'Checking', description: 'CIBC ••••6610' },
    { id: 'savings', name: 'Savings', description: 'Bank of America ••••0149' },
    { id: 'mastercard', name: 'Mastercard', description: 'Capital One ••••7877' },
  ]
  </script>

<script setup>
const sides = [
  { id: null, name: 'None' },
  { id: 1, name: 'Baked beans' },
  { id: 2, name: 'Coleslaw' },
  { id: 3, name: 'French fries' },
  { id: 4, name: 'Garden salad' },
  { id: 5, name: 'Mashed potatoes' },
]
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
  import { ref } from 'vue'
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

  const colors = [
    { name: 'Pink', bgColor: 'bg-pink-500', selectedColor: 'ring-pink-500' },
    { name: 'Purple', bgColor: 'bg-purple-500', selectedColor: 'ring-purple-500' },
    { name: 'Blue', bgColor: 'bg-blue-500', selectedColor: 'ring-blue-500' },
    { name: 'Green', bgColor: 'bg-green-500', selectedColor: 'ring-green-500' },
    { name: 'Yellow', bgColor: 'bg-yellow-500', selectedColor: 'ring-yellow-500' },
  ]

  const selectedColor = ref(colors[1])
  </script>

<script setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'

const mailingLists = [
  { id: 1, title: 'Newsletter', description: 'Last message sent an hour ago', users: '621 users' },
  { id: 2, title: 'Existing Customers', description: 'Last message sent 2 weeks ago', users: '1200 users' },
  { id: 3, title: 'Trial Users', description: 'Last message sent 4 days ago', users: '2740 users' },
]

const selectedMailingLists = ref(mailingLists[0])
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
  <div>
    <label class="text-base text-gray-900 font-semibold">Notifications</label>
    <p class="text-sm text-gray-500">
      How do you prefer to receive notifications?
    </p>
    <fieldset class="mt-4">
      <legend class="sr-only">
        Notification method
      </legend>
      <div class="space-y-4">
        <div v-for="notificationMethod in notificationMethods" :key="notificationMethod.id" class="flex items-center">
          <input :id="notificationMethod.id" name="notification-method" type="radio" :checked="notificationMethod.id === 'email'" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
          <label :for="notificationMethod.id" class="ml-3 block text-sm text-gray-900 font-medium leading-6">{{ notificationMethod.title }}</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

  <template>
  <div>
    <label class="text-base font-semibold text-gray-900">Notifications</label>
    <p class="text-sm text-gray-500">How do you prefer to receive notifications?</p>
    <fieldset class="mt-4">
      <legend class="sr-only">Notification method</legend>
      <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
        <div v-for="notificationMethod in notificationMethods" :key="notificationMethod.id" class="flex items-center">
          <input :id="notificationMethod.id" name="notification-method" type="radio" :checked="notificationMethod.id === 'email'" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          <label :for="notificationMethod.id" class="ml-3 block text-sm font-medium leading-6 text-gray-900">{{ notificationMethod.title }}</label>
        </div>
      </div>
    </fieldset>
  </div>
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
      <legend class="sr-only">Plan</legend>
      <div class="space-y-5">
        <div v-for="plan in plans" :key="plan.id" class="relative flex items-start">
          <div class="flex h-6 items-center">
            <input :id="plan.id" :aria-describedby="`${plan.id}-description`" name="plan" type="radio" :checked="plan.id === 'small'" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          </div>
          <div class="ml-3 text-sm leading-6">
            <label :for="plan.id" class="font-medium text-gray-900">{{ plan.name }}</label>
            <p :id="`${plan.id}-description`" class="text-gray-500">{{ plan.description }}</p>
          </div>
        </div>
      </div>
    </fieldset>
  </template>

<template>
  <fieldset>
    <legend class="sr-only">Plan</legend>
    <div class="space-y-5">
      <div v-for="plan in plans" :key="plan.id" class="relative flex items-start">
        <div class="flex h-6 items-center">
          <input :id="plan.id" :aria-describedby="`${plan.id}-description`" name="plan" type="radio" :checked="plan.id === 'small'" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        </div>
        <div class="ml-3 text-sm leading-6">
          <label :for="plan.id" class="font-medium text-gray-900">{{ plan.name }}</label>
          {{ ' ' }}
          <span :id="`${plan.id}-description`" class="text-gray-500">{{ plan.description }}</span>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<template>
    <div>
      <h2 class="text-base font-semibold text-gray-900">Transfer funds</h2>
      <p class="mt-1 text-sm text-gray-500">Transfer your balance to your bank account.</p>
      <fieldset class="mt-2">
        <legend class="sr-only">Bank account</legend>
        <div class="divide-y divide-gray-200">
          <div v-for="(account, accountIdx) in accounts" :key="accountIdx" class="relative flex items-start pb-4 pt-3.5">
            <div class="min-w-0 flex-1 text-sm leading-6">
              <label :for="`account-${account.id}`" class="font-medium text-gray-900">{{ account.name }}</label>
              <p :id="`account-${account.id}-description`" class="text-gray-500">{{ account.description }}</p>
            </div>
            <div class="ml-3 flex h-6 items-center">
              <input :id="`account-${account.id}`" :aria-describedby="`account-${account.id}-description`" name="account" type="radio" :checked="account.id === 'checking'" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </template>

  <template>
  <fieldset>
    <legend class="text-base font-semibold text-gray-900">Select a side</legend>
    <div class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
      <div v-for="(side, sideIdx) in sides" :key="sideIdx" class="relative flex items-start py-4">
        <div class="min-w-0 flex-1 text-sm leading-6">
          <label :for="`side-${side.id}`" class="select-none font-medium text-gray-900">{{ side.name }}</label>
        </div>
        <div class="ml-3 flex h-6 items-center">
          <input :id="`side-${side.id}`" name="plan" type="radio" :checked="side.id === null" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        </div>
      </div>
    </div>
  </fieldset>
</template>

  <template>
    <RadioGroup v-model="selectedColor">
      <RadioGroupLabel class="block text-sm font-medium leading-6 text-gray-900">Choose a label color</RadioGroupLabel>
      <div class="mt-4 flex items-center space-x-3">
        <RadioGroupOption as="template" v-for="color in colors" :key="color.name" :value="color" v-slot="{ active, checked }">
          <div :class="[color.selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
            <RadioGroupLabel as="span" class="sr-only">{{ color.name }}</RadioGroupLabel>
            <span aria-hidden="true" :class="[color.bgColor, 'h-8 w-8 rounded-full border border-black border-opacity-10']" />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </template>

<template>
  <RadioGroup v-model="selectedMailingLists">
    <RadioGroupLabel class="text-base font-semibold leading-6 text-gray-900">Select a mailing list</RadioGroupLabel>

    <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
      <RadioGroupOption as="template" v-for="mailingList in mailingLists" :key="mailingList.id" :value="mailingList" v-slot="{ active, checked }">
        <div :class="[active ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
          <span class="flex flex-1">
            <span class="flex flex-col">
              <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{ mailingList.title }}</RadioGroupLabel>
              <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">{{ mailingList.description }}</RadioGroupDescription>
              <RadioGroupDescription as="span" class="mt-6 text-sm font-medium text-gray-900">{{ mailingList.users }}</RadioGroupDescription>
            </span>
          </span>
          <CheckCircleIcon :class="[!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600']" aria-hidden="true" />
          <span :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-600' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<template>
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium leading-6 text-gray-900">RAM</h2>
        <a href="#" class="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500">See performance specs</a>
      </div>

      <RadioGroup v-model="mem" class="mt-2">
        <RadioGroupLabel class="sr-only">Choose a memory option</RadioGroupLabel>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
          <RadioGroupOption as="template" v-for="option in memoryOptions" :key="option.name" :value="option" :disabled="!option.inStock" v-slot="{ active, checked }">
            <div :class="[option.inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25', active ? 'ring-2 ring-indigo-600 ring-offset-2' : '', checked ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50', 'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1']">
              <RadioGroupLabel as="span">{{ option.name }}</RadioGroupLabel>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

  const memoryOptions = [
    { name: '4 GB', inStock: true },
    { name: '8 GB', inStock: true },
    { name: '16 GB', inStock: true },
    { name: '32 GB', inStock: true },
    { name: '64 GB', inStock: true },
    { name: '128 GB', inStock: false },
  ]

  const mem = ref(memoryOptions[2])
  </script>

  <template>
  <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
    <div class="space-y-4">
      <RadioGroupOption as="template" v-for="plan in plans" :key="plan.name" :value="plan" v-slot="{ active, checked }">
        <div :class="[active ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300', 'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between']">
          <span class="flex items-center">
            <span class="flex flex-col text-sm">
              <RadioGroupLabel as="span" class="font-medium text-gray-900">{{ plan.name }}</RadioGroupLabel>
              <RadioGroupDescription as="span" class="text-gray-500">
                <span class="block sm:inline">{{ plan.ram }} / {{ plan.cpus }}</span>
                {{ ' ' }}
                <span class="hidden sm:mx-1 sm:inline" aria-hidden="true">&middot;</span>
                {{ ' ' }}
                <span class="block sm:inline">{{ plan.disk }}</span>
              </RadioGroupDescription>
            </span>
          </span>
          <RadioGroupDescription as="span" class="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
            <span class="font-medium text-gray-900">{{ plan.price }}</span>
            <span class="ml-1 text-gray-500 sm:ml-0">/mo</span>
          </RadioGroupDescription>
          <span :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-600' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const plans = [
  { name: 'Hobby', ram: '8GB', cpus: '4 CPUs', disk: '160 GB SSD disk', price: '$40' },
  { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256 GB SSD disk', price: '$80' },
  { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512 GB SSD disk', price: '$160' },
  { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1024 GB SSD disk', price: '$240' },
]

const selected = ref(plans[0])
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
    <RadioGroup v-model="selected">
      <RadioGroupLabel class="sr-only">Pricing plans</RadioGroupLabel>
      <div class="relative -space-y-px rounded-md bg-white">
        <RadioGroupOption as="template" v-for="(plan, planIdx) in plans" :key="plan.name" :value="plan" v-slot="{ checked, active }">
          <div :class="[planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200', 'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6']">
            <span class="flex items-center text-sm">
              <span :class="[checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-indigo-600' : '', 'h-4 w-4 rounded-full border flex items-center justify-center']" aria-hidden="true">
                <span class="rounded-full bg-white w-1.5 h-1.5" />
              </span>
              <RadioGroupLabel as="span" :class="[checked ? 'text-indigo-900' : 'text-gray-900', 'ml-3 font-medium']">{{ plan.name }}</RadioGroupLabel>
            </span>
            <RadioGroupDescription as="span" class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
              <span :class="[checked ? 'text-indigo-900' : 'text-gray-900', 'font-medium']">${{ plan.priceMonthly }} / mo</span>
              {{ ' ' }}
              <span :class="checked ? 'text-indigo-700' : 'text-gray-500'">(${{ plan.priceYearly }} / yr)</span>
            </RadioGroupDescription>
            <RadioGroupDescription as="span" :class="[checked ? 'text-indigo-700' : 'text-gray-500', 'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right']">{{ plan.limit }}</RadioGroupDescription>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

  const plans = [
    { name: 'Startup', priceMonthly: 29, priceYearly: 290, limit: 'Up to 5 active job postings' },
    { name: 'Business', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
    { name: 'Enterprise', priceMonthly: 249, priceYearly: 2490, limit: 'Unlimited active job postings' },
  ]

  const selected = ref(plans[0])
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
  <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">Privacy setting</RadioGroupLabel>
    <div class="-space-y-px rounded-md bg-white">
      <RadioGroupOption as="template" v-for="(setting, settingIdx) in settings" :key="setting.name" :value="setting" v-slot="{ checked, active }">
        <div :class="[settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200', 'relative flex cursor-pointer border p-4 focus:outline-none']">
          <span :class="[checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-indigo-600' : '', 'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center']" aria-hidden="true">
            <span class="rounded-full bg-white w-1.5 h-1.5" />
          </span>
          <span class="ml-3 flex flex-col">
            <RadioGroupLabel as="span" :class="[checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium']">{{ setting.name }}</RadioGroupLabel>
            <RadioGroupDescription as="span" :class="[checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm']">{{ setting.description }}</RadioGroupDescription>
          </span>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const settings = [
  { name: 'Public access', description: 'This project would be available to anyone who has the link' },
  { name: 'Private to Project Members', description: 'Only members of this project would be able to access' },
  { name: 'Private to you', description: 'You are the only one able to access this project' },
]

const selected = ref(settings[0])
</script>
