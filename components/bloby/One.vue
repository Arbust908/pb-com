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
  <path fill="url('#logo-gradient')" d="M66.2,-23.3C72.1,-3.4,53.7,22.6,31.1,37.9C8.5,53.1,-18.3,57.6,-34.1,46.3C-49.9,34.9,-54.8,7.8,-47.3,-14.4C-39.7,-36.5,-19.9,-53.7,5.1,-55.4C30.2,-57.1,60.3,-43.2,66.2,-23.3Z" transform="translate(100 100)" />
</svg>
</template>

<style scoped>
    
</style>
