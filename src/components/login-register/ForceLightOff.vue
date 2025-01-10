<script setup>
import { onMounted, inject } from 'vue';

const {
    turnOnLight,
    turnOffLight
} = inject('lightSwitch');

onMounted(() => {
    turnOffLight();
});

</script>


<template>

</template>