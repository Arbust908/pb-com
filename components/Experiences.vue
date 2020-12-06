<template>
  <section>
    <h2 class="text-3xl mb-2 ml-4">Experiencia</h2>
    <article
      v-for="job in $t('exp')"
      :key="job.rol + job.company"
      :class="
        job.end === null ? 'border-violet-700 dark:border-violet-300' : null
      "
      class="mb-4 p-4 shadow border rounded dark:border-blueGray-700"
    >
      <h3 class="font-bold flex flex-col sm:flex-row mb-2">
        <span>{{ job.rol }}</span>
        <span class="hidden sm:inline">/</span>
        <span> {{ job.company }} </span>
      </h3>
      <div class="text-sm mb-2">
        <span>{{ formatDate(job.start) }}</span> -
        <span
          v-if="job.end === null"
          class="px-2 rounded bg-emerald-400 text-emerald-700 font-bold"
          >Actual</span
        >
        <span v-else>{{ formatDate(job.end) }}</span>
      </div>
      <p class="font-light">
        {{ job.description }}
      </p>
    </article>
  </section>
</template>
<script>
export default {
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: '2-digit' }
      return new Date(date).toLocaleDateString(this.$i18n.locale, options)
    },
  },
}
</script>
