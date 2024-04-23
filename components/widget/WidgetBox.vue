<script setup lang='ts'>
const route = useRoute();
const isLong = computed(() => {
 const query = route.query;
 const longMode = query.long_mode;
 return longMode;
});
</script>

<template>
     <div class="border-4 border-black rounded w-360px" :class="isLong ? 'aspect-ratio-2/1' : 'aspect-ratio-square'">
        <slot :is-long="isLong"></slot>
     </div>
</template>
