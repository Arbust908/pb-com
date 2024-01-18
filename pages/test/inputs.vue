<script setup lang='ts'>
// https://twitter.com/joshnuss/status/1747434461904376129
</script>

<template>
  <form>
    <label for="email">Email</label>
    <input id="email" type="email">

    <label for="password">Password</label>
    <input type="password" name="password">

    <label for="remember">
      <input id="remember" type="checkbox">
      <span>Remember me</span>
    </label>
  </form>
</template>

<style scoped lang='postcss'>
    form {
  display: grid;
  grid-template-columns: min-content 1fr;
}
label:has(input[type='checkbox']) {
  grid-column: 2;
}
/*
form {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  justify-items: start;
}

Jus' throw a load of label + input in 🙏

:has() for the little visual niceties ✨
 */
</style>
