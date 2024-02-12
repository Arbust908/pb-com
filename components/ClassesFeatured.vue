<template>
  <div
    class="mx-auto px-4 py-12 md:max-w-full sm:max-w-xl lg:max-w-screen-xl lg:px-8 lg:py-16 md:px-24"
  >
    <div
      class="max-w-screen-lg flex flex-col overflow-hidden border rounded-lg bg-white shadow-xl sm:mx-auto lg:flex-row"
    >
      <div class="relative lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80"
          alt="Persons talking in a work setting."
          class="h-80 w-full object-cover lg:absolute lg:h-full"
        >
        <svg
          class="absolute right-0 top-0 hidden h-full text-white lg:inline-block"
          viewBox="0 0 20 104"
          fill="currentColor"
        >
          <polygon
            points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104"
          />
        </svg>
      </div>
      <div
        class="flex flex-col justify-center bg-white p-8 lg:w-1/2 lg:p-16 lg:pl-10"
      >
        <div>
          <p
            class="mb-4 inline-block rounded-full bg-purple-200 px-3 py-1 text-xs text-purple-600 font-medium tracking-wider uppercase"
          >
            Craft and build
          </p>
        </div>
        <h5 class="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
          Your Next Great Idea
        </h5>
        <p class="mb-5 py-5 text-gray-800">
          <span class="font-bold">Our Platform</span> will help you craft and
          build your next idea. Utilize our drag and drop components to build
          the application of your dreams.
        </p>
        <div class="flex items-center">
          <button
            type="submit"
            class="focus:shadow-outline mr-6 h-12 inline-flex items-center justify-center rounded-lg bg-purple-500 px-6 text-white font-medium tracking-wide transition duration-200 hover:bg-purple-700 focus:outline-none"
          >
            Get started
          </button>
          <a
            href="/"
            aria-label=""
            class="text-deep-purple-accent-400 hover:text-deep-purple-800 inline-flex items-center text-lg underline transition-colors duration-200"
          >
            Learn More
            <svg
              class="ml-2 inline-block w-2"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path
                d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
