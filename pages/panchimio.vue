<template>
    <h1 class="text-6xl text-center uppercase pt-24">Panchimio</h1>
    <section>
      <form>
        <input type="text" placeholder="Search"
          class="bg-transparent border-slate-6 rounded-full my-8 w-full p-5 text-xl shadow" />
      </form>
    </section>
    <section class="overflow-clip w-full">
      <h2>Search results</h2>
      <ul class="flex gap-6">
        <li v-for="item in trending" :key="item.id" class="w-25 shrink-0">
          <img :src="`https://image.tmdb.org/t/p/w400/${item.poster_path}`"
            class="rounded border-slate-6 border border-l-slate-5" />
          <h3>{{ item.title || item.name }}</h3>
        </li>
      </ul>
    </section>
    <section>
      <h2>Trending</h2>
      <ul>
        <!-- <li v-for="item in items" :key="item.id">
          <a :href="item.url">{{ item.title }}</a>
        </li> -->
      </ul>
    </section>
</template>

<script lang="ts" setup>

const { data } = await useAsyncData('trending', () => $fetch('/api/movies/trending?timeWindow=week'));
const trending = computed(() => data?.value?.results || []);
</script>

<style></style>