<template>
  <main class="p-6">
    <h1 class="text-4xl font-extrabold text-center">Clases</h1>
    <p class="opacity-75 text-center">
      Follow these steps to complete the challenge.
    </p>
    <!-- <ClassesFeatured /> -->
    <section>
      <div
        class="content-center lg:flex lg:justify-center lg:items-center lg:flex-wrap"
      >
        <ClassesCard
          v-for="lecture in classes"
          :key="lecture.title + '//' + lecture.slug"
          v-bind="lecture"
        />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      classes: [
        {
          title: 'Title',
          slug: 'title',
          description:
            'Analyse the problem sets to find a better solution to the issue.',
          color: 'bg-red-600',
          iconColor: 'text-red-600',
          icon: 'variable',
          weight: 'solid',
        },
        {
          title: 'HTML',
          slug: 'html',
          description: 'Empezamos a ver los LEGOs de la web.',
          color: 'bg-orange-600',
          iconColor: 'text-orange-600',
          icon: 'html5',
          weight: 'brand',
        },
        {
          title: 'CSS',
          slug: 'css',
          description: 'El maquillage basico del HTML. Selectores y Atributos',
          color: 'bg-blue-600',
          iconColor: 'text-blue-600',
          icon: 'css3',
          weight: 'brand',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
