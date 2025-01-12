<script setup>

import { useI18n } from 'vue-i18n'

import { onMounted } from 'vue';


const { t, locale } = useI18n({ useScope: 'global' })


onMounted(() => {
    locale.value = localStorage.getItem('locale') || 'cn'
})


const toggleLocale = () => {
    
    const prev = locale.value

    locale.value = prev === 'en' ? 'cn' : 'en'
    localStorage.setItem('locale', locale.value)
}



</script>


<template>
   <img 
   class="w-[1.5625vw] h-[1.5625vw] cursor-pointer"
   src="/translation-icon.png" @click="toggleLocale" />
</template>