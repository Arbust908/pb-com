<script setup lang='ts'>
// https://twitter.com/imRazvanBadea/status/1751573734677258480
</script>

<template>
  <button>
    <span>
      <i class="i-solar:pen-2-bold-duotone" />
      <span>Edit</span>
    </span>
  </button>
</template>

<style scoped>
button {
  font-family: 'Inter', sans-serif;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  padding: 2px;
  background-image: linear-gradient(to bottom, #a089ff, #8c70ff);
  box-shadow:
    0 0 0 2px #6350e0,
    0 4px 4px rgba(0, 0, 0, 20%);
  transition: all 0.4s;
  & > span {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    border: none;
    border-radius: 8px;
    color: white;
    width: 100%;
    height: 100%;
    pointer-events: none;
    text-shadow: 0 2px 4px rgba(#6350e0, 20%);
    background-image: linear-gradient(to bottom, #7f5eff, #997fff);
    transition: all 0.4s;
  }

  &:hover {
    background-image: linear-gradient(to top, #a089ff, #8c70ff);
    box-shadow:
      0 0 0 2px #6350e0,
      0 1px 1px rgba(0, 0, 0, 20%);
    & > span {
      background-image: linear-gradient(to top, #7f5eff, #997fff);
    }
  }
}
</style>
