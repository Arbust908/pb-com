<template>
    <canvas ref="canvas" width="800" height="600"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (canvas.value) {
        const ctx = canvas.value.getContext('2d');
        if (ctx) {
            // Draw dots
            ctx.fillStyle = 'black';
            for (let x = 0; x < canvas.value.width; x += 10) {
                for (let y = 0; y < canvas.value.height; y += 10) {
                    ctx.fillRect(x, y, 2, 2);
                }
            }

            // Apply mask image
            canvas.value.style.maskImage = "url('/perlin-noise.webp')";

            // Apply keyframes
            canvas.value.style.webkitMaskPosition = '0px 0px';
        }
    }
});
</script>
