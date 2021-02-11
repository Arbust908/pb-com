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
      <h3
        class="font-bold flex flex-col sm:flex-row md:flex-col lg:flex-row mb-2"
      >
        <span>{{ job.rol }}</span>
        <span class="hidden sm:inline md:hidden lg:inline px-2"> / </span>
        <span> {{ job.company }} </span>
      </h3>
      <div class="text-sm mb-2">
        <span>{{ formatDate(job.start) }}</span> -
        <span
          v-if="job.end === null"
          class="px-2 rounded font-bold bg-emerald-300 text-emerald-800"
          >Actual</span
        >
        <span v-else>{{ formatDate(job.end) }}</span>
      </div>
      <p class="font-light">
        <span
          v-if="detailShown.includes(job.rol + job.company)"
          :key="`${job.company}-detail`"
          v-html="job.more || ''"
        />
        <span v-else :key="`${job.company}-description`">
          {{ job.description }}
        </span>
      </p>
      <aside class="mt-2 flex justify-end">
        <button
          v-if="job.more"
          class="text-sm px-2 py-1 rounded transition duration-150 ease-out transform hover:bg-emerald-400 hover:text-emerald-700 hover:-translate-y-1"
          @click="addDetail(job.rol + job.company)"
        >
          {{
            detailShown.includes(job.rol + job.company)
              ? $t('see_less')
              : $t('see_more')
          }}
        </button>
      </aside>
    </article>
  </section>
</template>
<script>
export default {
  data() {
    return {
      detailShown: [],
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: '2-digit' }
      return new Date(date).toLocaleDateString(this.$i18n.locale, options)
    },
    addDetail(job) {
      console.log(job)
      const isInDetails = this.detailShown.includes(job)
      console.log(isInDetails)
      if (isInDetails) {
        this.detailShown = this.detailShown.filter((title) => title !== job)
      } else {
        this.detailShown.push(job)
      }
    },
  },
}
</script>
