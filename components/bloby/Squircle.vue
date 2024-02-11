<script setup lang='ts'>

</script>

<template>
    <span class="squircle">
        <span>I'm a squircle!</span>
    </span>
</template>

<style scoped>
.squircle {
    width: 52.1em;
    height: 52.1em;
    position: relative;
    display: inline-block;
    margin: 1em auto;
    vertical-align: middle;
    -webkit-transform: scale(0.5);
    -webkit-transform-origin: 50% 0;

    &>* {
        position: absolute;
        width: 100%;
        display: inline-block;
        height: 100%;
        background: 50% 0% no-repeat;
        z-index: 5;
    }

    &:before,
    &:after,
    >*:before,
    >*:after {
        position: absolute;
        background: #00aeef;
    }

    &:before {
        top: 0;
        left: 4em;
        border-top-left-radius: 20em 10em;
        width: 50%;
        bottom: 0;
        border-bottom-left-radius: 20em 10em;
        content: "";
    }

    &:before {
        top: 0;
        left: 4em;
        border-top-left-radius: 80% 10em;
        width: 50%;
        bottom: 0;
        border-bottom-left-radius: 80% 10em;
        content: "";
    }

    &:after {
        top: 0;
        bottom: 0;
        right: 4em;
        border-top-right-radius: 80% 20%;
        border-bottom-right-radius: 80% 20%;
        width: 25em;
        content: "";
    }

    >*:before {
        top: 4em;
        bottom: 4em;
        border-top-left-radius: 100% 50%;
        border-bottom-left-radius: 100% 50%;
        width: 10em;
        content: "";
    }

    >*:after {
        top: 4em;
        bottom: 4em;
        right: 0;
        border-top-right-radius: 100% 50%;
        border-bottom-right-radius: 100% 50%;
        width: 10em;
        content: "";
        z-index: 4;
    }
}

/* //background */
body {
    background: #1F1A1D;
}

/* //reset, center n shiz */
body {
    &::before {
        height: 100%;
        content: '';
        width: 0;
        background: red;
        vertical-align: middle;
        display: inline-block;
    }
}</style>
