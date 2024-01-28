<script setup lang='ts'>
  
</script>

<template>
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>  
        <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="50%" y2="100%" > 
            
            <stop offset="0%" stop-color="#7A5FFF">
                <animate attributeName="stop-color" values="#7A5FFF; #01FF89; #7A5FFF" dur="4s" repeatCount="indefinite"></animate>
            </stop>

            <stop offset="100%" stop-color="#01FF89">
                <animate attributeName="stop-color" values="#01FF89; #7A5FFF; #01FF89" dur="4s" repeatCount="indefinite"></animate>
            </stop>

        </linearGradient> 

    </defs>
  <path fill="url('#logo-gradient')" d="M46.8,-15.4C55.8,12.5,55,43.5,37,58.2C19.1,73,-15.9,71.5,-38.6,54.6C-61.3,37.8,-71.8,5.5,-63.3,-21.7C-54.9,-49,-27.4,-71.2,-4.3,-69.8C18.9,-68.4,37.8,-43.4,46.8,-15.4Z" transform="translate(100 100)" />
</svg>
</template>

<style scoped>
    
</style>
