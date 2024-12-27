<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";


// TODO: set a gateway to dashboard filtering users not logged in



const route = useRoute();
const path = computed(() => route.path);

const navEntries = [
    { to: "/cards", text: "我的卡片", src:'/card-icon.png' },
    { to: "/subscriptions", text: "按产品支付", src:'product-icon.png' },
]

</script>

<template>
    <div id="navbar" class="flex flex-col items-start justify-start gap-y-4">

        <div class="text-xs text-gray-400">
            支付服务
        </div>
        <div id="navitems" class="flex flex-col items-start justify-start gap-y-2 w-48 h-full">
            <RouterLink v-for="(entry, index) in navEntries" :to="entry.to"
                :class="` flex flex-row items-center gap-x-2 px-3 py-3 w-full rounded-md text-xs duration-100  ${(path === entry.to || (path === '/' && index === 0)) && 'bg-sky-200'}`">
               <img :src="entry.src" class="w-4 h-4" /> {{ entry.text }}</RouterLink>
        </div>
    </div>
</template>