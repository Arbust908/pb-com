<template>
  <div
    class="font-main bg-blueGray-100 dark:bg-blueGray-900 text-blueGray-900 dark:text-blueGray-100 grid grid-layout min-h-screen"
  >
    <header
      class="flex flex-col md:flex-row md:justify-between items-center p-2 fixed top-0 w-full bg-blueGray-200 dark:bg-blueGray-800 z-50"
    >
      <nuxt-link to="/" class="rounded-lg px-2 py-1 hover:text-violet-500">
        <h1 class="text-lg font-bold flex items-center">
          <Logo class="w-8 h-8 fill-current" />
          Pancho Blanco
        </h1>
      </nuxt-link>
      <nav>
        <ul class="flex space-x-3 items-center justify-between mr-4">
          <li class="flex w-8 h-8 items-center justify-center">
            <LightMode
              v-if="$colorMode.value === 'light'"
              class="w-5 h-5 fill-current transition duration-150 ease-out cursor-pointer hover:text-violet-500"
              @click="$colorMode.preference = 'dark'"
            />
            <DarkMode
              v-if="$colorMode.value === 'dark'"
              class="w-5 h-5 fill-current transition duration-150 ease-out cursor-pointer hover:text-violet-500"
              @click="$colorMode.preference = 'light'"
            />
          </li>
          <li>
            <nuxt-link
              class="px-2 py-1 rounded-lg transition duration-150 ease-out hover:text-violet-500 hover:underline"
              to="/cv"
            >
              Curriculum Vitae
            </nuxt-link>
          </li>
          <!-- <li>
            <nuxt-link
              class="px-2 py-1 rounded-lg hover:text-violet-500 hover:shadow"
              to="/reference"
            >
              Referencias
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="px-2 py-1 rounded-lg hover:text-violet-500 hover:shadow"
              to="/clases"
            >
              Clases
            </nuxt-link>
          </li> -->
          <li>
            <nuxt-link
              class="px-4 py-1 rounded-lg bg-violet-400 text-blueGray-900 transition duration-150 ease-out dark:bg-violet-600 dark:text-blueGray-100 hover:text-violet-500 hover:shadow dark:hover:bg-violet-800"
              to="/blog"
            >
              Blog
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </header>
    <Nuxt class="z-20" />
    <footer
      class="px-6 bg-blueGray-200 dark:bg-blueGray-800 flex items-center justify-between text-sm"
    >
      <a
        href="https://www.panchoblanco.com"
        class="p-3 md:py-0 inline-flex items-center"
      >
        <Icon
          icon="cube-transparent"
          weight="solid"
          class="w-5 h-5 inline mr-2"
        />
        <span>
          {{ $i18n.locale === 'es' ? 'En progreso' : 'Work in progress' }}
        </span>
      </a>
      <div>
        <a
          href="https://github.com/Arbust908"
          class="p-3 md:py-0 inline-flex items-center"
          title="Github profile"
        >
          <Icon icon="github" weight="brand" class="w-6 h-6 inline" />
        </a>
      </div>
      <!-- <a
        href="https://www.panchoblanco.com"
        class="px-2 inline-flex items-center"
      >
        <Icon
          icon="currency-dollar"
          weight="solid"
          class="w-5 h-5 inline mr-2"
        />
        <span> Banca el efuerzo independiente </span>
      </a> -->
    </footer>
  </div>
</template>

<script>
import LightMode from '@/assets/icons/sun.svg'
import DarkMode from '@/assets/icons/moon.svg'
import Logo from '@/assets/icons/logo.svg'
export default {
  components: {
    LightMode,
    DarkMode,
    Logo,
  },
}
</script>

<style>
div.min-h-screen {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}
@media screen and (min-width: 640px) {
  div.min-h-screen {
    min-height: 100vh;
  }
}
.grid-layout {
  padding-top: 88px;
  grid-template-rows: 1fr 64px;
}
@media screen and (min-width: 768px) {
  .grid-layout {
    padding-top: 56px;
    grid-template-rows: 1fr 40px;
  }
  /* width */
  ::-webkit-scrollbar {
    @apply w-2;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    @apply bg-blueGray-200;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    @apply bg-blueGray-400 rounded-xl;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gradient-to-tr from-cyan-400 to-violet-600;
  }
  .dark ::-webkit-scrollbar-track {
    @apply bg-blueGray-800;
  }

  /* Handle */
  .dark ::-webkit-scrollbar-thumb {
    @apply bg-blueGray-600 rounded-xl;
  }

  /* Handle on hover */
  .dark ::-webkit-scrollbar-thumb:hover {
    @apply bg-gradient-to-tr from-amber-400 to-rose-600;
  }
}
</style>
