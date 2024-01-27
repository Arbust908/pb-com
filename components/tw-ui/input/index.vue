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
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
      <div class="mt-2">
        <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
      </div>
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
  <div>
    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
    <div class="mt-2">
      <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" aria-describedby="email-description" />
    </div>
    <p class="mt-2 text-sm text-gray-500" id="email-description">We'll only use this for spam.</p>
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
    <div>
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" placeholder="you@example.com" value="adamwathan" aria-invalid="true" aria-describedby="email-error" />
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      </div>
      <p class="mt-2 text-sm text-red-600" id="email-error">Not a valid email address.</p>
    </div>
  </template>
  
  <script setup>
  import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
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
    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
    <div class="mt-2">
      <input type="email" name="email" id="email" value="you@example.com" disabled="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6" placeholder="you@example.com" />
    </div>
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
    <div>
      <label for="email" class="sr-only">Email</label>
      <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
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
  <div>
    <div class="flex justify-between">
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
      <span class="text-sm leading-6 text-gray-500" id="email-optional">Optional</span>
    </div>
    <div class="mt-2">
      <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" aria-describedby="email-optional" />
    </div>
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
    <div>
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { EnvelopeIcon } from '@heroicons/vue/20/solid'
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
    <label for="account-number" class="block text-sm font-medium leading-6 text-gray-900">Account number</label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <input type="text" name="account-number" id="account-number" class="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="000-00-0000" />
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <QuestionMarkCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'
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
      <label for="company-website" class="block text-sm font-medium leading-6 text-gray-900">Company Website</label>
      <div class="mt-2 flex rounded-md shadow-sm">
        <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">http://</span>
        <input type="text" name="company-website" id="company-website" class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="www.example.com" />
      </div>
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
  <div>
    <label for="company-website" class="block text-sm font-medium leading-6 text-gray-900">Company Website</label>
    <div class="mt-2">
      <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
        <input type="text" name="company-website" id="company-website" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="www.example.com" />
      </div>
    </div>
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
    <div>
      <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span class="text-gray-500 sm:text-sm">$</span>
        </div>
        <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" aria-describedby="price-currency" />
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span class="text-gray-500 sm:text-sm" id="price-currency">USD</span>
        </div>
      </div>
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
  <div>
    <label for="phone-number" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 flex items-center">
        <label for="country" class="sr-only">Country</label>
        <select id="country" name="country" autocomplete="country" class="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
          <option>US</option>
          <option>CA</option>
          <option>EU</option>
        </select>
      </div>
      <input type="text" name="phone-number" id="phone-number" class="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="+1 (555) 987-6543" />
    </div>
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
    <div>
      <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span class="text-gray-500 sm:text-sm">$</span>
        </div>
        <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
        <div class="absolute inset-y-0 right-0 flex items-center">
          <label for="currency" class="sr-only">Currency</label>
          <select id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>
        </div>
      </div>
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
  <div>
    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Search candidates</label>
    <div class="mt-2 flex rounded-md shadow-sm">
      <div class="relative flex flex-grow items-stretch focus-within:z-10">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <UsersIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input type="email" name="email" id="email" class="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="John Smith" />
      </div>
      <button type="button" class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <BarsArrowUpIcon class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
        Sort
      </button>
    </div>
  </div>
</template>

<script setup>
import { BarsArrowUpIcon, UsersIcon } from '@heroicons/vue/20/solid'
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
      <fieldset>
        <legend class="block text-sm font-medium leading-6 text-gray-900">Card Details</legend>
        <div class="mt-2 -space-y-px rounded-md bg-white shadow-sm">
          <div>
            <label for="card-number" class="sr-only">Card number</label>
            <input type="text" name="card-number" id="card-number" class="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Card number" />
          </div>
          <div class="flex -space-x-px">
            <div class="w-1/2 min-w-0 flex-1">
              <label for="card-expiration-date" class="sr-only">Expiration date</label>
              <input type="text" name="card-expiration-date" id="card-expiration-date" class="relative block w-full rounded-none rounded-bl-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="MM / YY" />
            </div>
            <div class="min-w-0 flex-1">
              <label for="card-cvc" class="sr-only">CVC</label>
              <input type="text" name="card-cvc" id="card-cvc" class="relative block w-full rounded-none rounded-br-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="CVC" />
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset class="mt-6 bg-white">
        <legend class="block text-sm font-medium leading-6 text-gray-900">Billing address</legend>
        <div class="mt-2 -space-y-px rounded-md shadow-sm">
          <div>
            <label for="country" class="sr-only">Country</label>
            <select id="country" name="country" autocomplete="country-name" class="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
          <div>
            <label for="postal-code" class="sr-only">ZIP / Postal code</label>
            <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="relative block w-full rounded-none rounded-b-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="ZIP / Postal code" />
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
  <div class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
    <label for="name" class="block text-xs font-medium text-gray-900">Name</label>
    <input type="text" name="name" id="name" class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Jane Smith" />
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
    <div class="isolate -space-y-px rounded-md shadow-sm">
      <div class="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
        <label for="name" class="block text-xs font-medium text-gray-900">Name</label>
        <input type="text" name="name" id="name" class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Jane Smith" />
      </div>
      <div class="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
        <label for="job-title" class="block text-xs font-medium text-gray-900">Job Title</label>
        <input type="text" name="job-title" id="job-title" class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Head of Tomfoolery" />
      </div>
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
  <div class="relative">
    <label for="name" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Name</label>
    <input type="text" name="name" id="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Jane Smith" />
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
    <div>
      <label for="name" class="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900">Name</label>
      <div class="mt-2">
        <input type="text" name="name" id="name" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Jane Smith" />
      </div>
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
  <div>
    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
    <div class="relative mt-2">
      <input type="text" name="name" id="name" class="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Jane Smith" />
      <div class="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600" aria-hidden="true" />
    </div>
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
    <div>
      <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Quick search</label>
      <div class="relative mt-2 flex items-center">
        <input type="text" name="search" id="search" class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
        </div>
      </div>
    </div>
  </template>
  
