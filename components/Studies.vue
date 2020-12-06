<template>
  <section>
    <h2 class="text-3xl mb-2 ml-4">Estudios</h2>
    <article
      v-for="teach in $t('study')"
      :key="teach.place + teach.date"
      class="mb-4 p-4 text-blueGray-700 dark:text-blueGray-300"
    >
      <h3 class="font-bold flex flex-col sm:flex-row mb-2">
        <span>{{ teach.place }}</span>
      </h3>
      <div class="text-sm mb-2">
        <span>{{ teach.date }}</span>
      </div>
      <p class="font-light">
        {{ teach.description }}
      </p>
    </article>
  </section>
</template>
