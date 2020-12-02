<template>
  <main class="p-6">
    <h1>Referencias</h1>
    <section class="grid grid-cols-5 gap-2 mb-6">
      <h2 class="col-span-5">Gris Azul</h2>
      <ColorBox class="bg-blueGray-50" />
      <ColorBox class="bg-blueGray-100" />
      <ColorBox class="bg-blueGray-200" />
      <ColorBox class="bg-blueGray-300" />
      <ColorBox class="bg-blueGray-400" />
      <ColorBox class="bg-blueGray-500" />
      <ColorBox class="bg-blueGray-600" />
      <ColorBox class="bg-blueGray-700" />
      <ColorBox class="bg-blueGray-800" />
      <ColorBox class="bg-blueGray-900" />
    </section>
    <section class="grid grid-cols-5 gap-4 mb-6">
      <h2 class="col-span-5">Gris Verdadero</h2>
      <ColorBox class="bg-trueGray-50" />
      <ColorBox class="bg-trueGray-100" />
      <ColorBox class="bg-trueGray-200" />
      <ColorBox class="bg-trueGray-300" />
      <ColorBox class="bg-trueGray-400" />
      <ColorBox class="bg-trueGray-500" />
      <ColorBox class="bg-trueGray-600" />
      <ColorBox class="bg-trueGray-700" />
      <ColorBox class="bg-trueGray-800" />
      <ColorBox class="bg-trueGray-900" />
    </section>
    <section class="grid grid-cols-5 gap-4 mb-6">
      <h2 class="col-span-5">Esmeralda</h2>
      <ColorBox class="bg-emerald-50" />
      <ColorBox class="bg-emerald-100" />
      <ColorBox class="bg-emerald-200" />
      <ColorBox class="bg-emerald-300" />
      <ColorBox class="bg-emerald-400" />
      <ColorBox class="bg-emerald-500" />
      <ColorBox class="bg-emerald-600" />
      <ColorBox class="bg-emerald-700" />
      <ColorBox class="bg-emerald-800" />
      <ColorBox class="bg-emerald-900" />
    </section>
    <section class="grid grid-cols-5 gap-4 mb-6">
      <h2 class="col-span-5">Cyan</h2>
      <ColorBox class="bg-cyan-50" />
      <ColorBox class="bg-cyan-100" />
      <ColorBox class="bg-cyan-200" />
      <ColorBox class="bg-cyan-300" />
      <ColorBox class="bg-cyan-400" />
      <ColorBox class="bg-cyan-500" />
      <ColorBox class="bg-cyan-600" />
      <ColorBox class="bg-cyan-700" />
      <ColorBox class="bg-cyan-800" />
      <ColorBox class="bg-cyan-900" />
    </section>
    <section class="grid grid-cols-5 gap-4 mb-6">
      <h2 class="col-span-5">Violeta</h2>
      <ColorBox class="bg-violet-50" />
      <ColorBox class="bg-violet-100" />
      <ColorBox class="bg-violet-200" />
      <ColorBox class="bg-violet-300" />
      <ColorBox class="bg-violet-400" />
      <ColorBox class="bg-violet-500" />
      <ColorBox class="bg-violet-600" />
      <ColorBox class="bg-violet-700" />
      <ColorBox class="bg-violet-800" />
      <ColorBox class="bg-violet-900" />
    </section>
    <section class="grid grid-cols-5 gap-4 mb-6">
      <h2 class="col-span-5">Rosee</h2>
      <ColorBox class="bg-rose-50" />
      <ColorBox class="bg-rose-100" />
      <ColorBox class="bg-rose-200" />
      <ColorBox class="bg-rose-300" />
      <ColorBox class="bg-rose-400" />
      <ColorBox class="bg-rose-500" />
      <ColorBox class="bg-rose-600" />
      <ColorBox class="bg-rose-700" />
      <ColorBox class="bg-rose-800" />
      <ColorBox class="bg-rose-900" />
    </section>
    <section class="grid grid-cols-5 gap-4 mb-6">
      <h2 class="col-span-5">Gradientes</h2>
      <ColorBox class="bg-gradient-to-br from-emerald-500 to-cyan-600" />
      <ColorBox class="bg-gradient-to-br from-rose-500 to-violet-600" />
      <ColorBox class="bg-gradient-to-br from-rose-200 to-violet-700" />
      <ColorBox class="bg-gradient-to-br from-blueGray-200 to-blueGray-700" />
      <ColorBox class="bg-gradient-to-br from-trueGray-200 to-trueGray-700" />
    </section>

    <div class="text-blueGray-600 dark:text-blueGray-100">
      <h1>Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
      </select>
    </div>
  </main>
</template>

<script>
export default {}
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
