
<script setup>
const {title, feature, paragraphs, src} = defineProps(['title', 'feature', 'paragraphs', 'src'])


</script>

<template>
<div class="bg-white border-sky-300 border  rounded-xl flex flex-col relative py-4 px-2">
    <img :src="src" alt="feature" class="absolute h-[360px] aspect-auto  " />

    <div class=" text-lg font-bold z-10">
        {{ title }}
    </div>
 
    <div class="z-10 mt-36 font-bold ">
        {{ feature }}
    </div>
    <div class="z-10 mt-4 gap-y-1 text-xs">
        <p v-for="p in paragraphs">{{p}}</p>
    </div>
</div>

</template>