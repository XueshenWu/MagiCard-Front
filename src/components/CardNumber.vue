<script setup>

const {value, className} = defineProps(['value', 'className'])

</script>

<template>
    <div :class="className">
    {{ String(value).slice(0, 4) + ' ' + String(value).slice(4, 8) + ' ' + String(value).slice(8, 12) + ' ' + String(value).slice(12, 16) }}
    </div>

</template>