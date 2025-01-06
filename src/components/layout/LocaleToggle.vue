<script setup>

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })

const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'cn' : 'en'
}



</script>


<template>
   <img 
   class="w-[1.5625vw] h-[1.5625vw] cursor-pointer"
   src="/translation-icon.png" @click="toggleLocale" />
</template>