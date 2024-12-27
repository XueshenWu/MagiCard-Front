<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";


const route = useRoute();
const path = computed(() => route.path);

const navEntries = [
    { to: "/cards", text: "我的卡片" },
    { to: "/subscriptions", text: "按产品支付" },
]

</script>

<template>
    <div id="navbar" class="flex flex-col items-start justify-start gap-y-4">

        <div class="text-xs text-gray-400">
            支付服务
        </div>
        <div id="navitems" class="flex flex-col items-start justify-start gap-y-2 w-48 h-full">
            <RouterLink v-for="(entry, index) in navEntries" :to="entry.to"
                :class="`px-3 py-3 w-full rounded-md text-xs duration-100  ${(path === entry.to || (path === '/' && index === 0)) && 'bg-sky-200'}`">
                {{ entry.text }}</RouterLink>
        </div>
    </div>
</template>