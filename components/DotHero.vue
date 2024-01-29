<template>
    <canvas ref="canvas" width="800" height="600"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
/* 
1. draw a canvas with all your dots (dots, should be 2px by 2px and a ref variable so it can be changed and should be separated by 8px on both axis)
2. generate a perlin noise (i used http://kitfox.com/projects/perlinNoiseMaker/)
3. add `mask-image: url('/perlin-noise.webp');` to the canvas
4. add keyframes to translate the position of the perlin noise (`-webkit-mask-position: 0px 0px`)
Remember to to use Vue3, Script Setup Syntax and lang='ts'
*/
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
