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
        <ul class="flex space-x-3 items-center mr-4">
          <li class="flex w-8 h-8 items-center justify-center">
            <LightMode
              v-if="$colorMode.value === 'light'"
              class="w-5 h-5 fill-current cursor-pointer hover:text-violet-500"
              @click="$colorMode.preference = 'dark'"
            />
            <DarkMode
              v-if="$colorMode.value === 'dark'"
              class="w-5 h-5 fill-current cursor-pointer hover:text-violet-500"
              @click="$colorMode.preference = 'light'"
            />
          </li>
          <li>
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
          </li>
          <li>
            <nuxt-link
              class="px-2 py-1 rounded-lg bg-violet-400 text-blueGray-100 hover:text-violet-600 hover:shadow"
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
      class="px-6 bg-blueGray-200 dark:bg-blueGray-800 flex items-center justify-between"
    >
      <a href="https://www.panchoblanco.com" class="px-2">by Pancho Blanco</a>
      <a href="https://www.panchoblanco.com" class="px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-4 h-4 inline"
        >
          <path
            fill-rule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          />
        </svg>
        Banca el efuerzo independiente
      </a>
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
.grid-layout {
  padding-top: 88px;
  grid-template-rows: 1fr 64px;
}
@media screen and (min-width: 768px) {
  .grid-layout {
    padding-top: 56px;
    grid-template-rows: 1fr 40px;
  }
}
</style>
