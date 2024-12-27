<script setup>

import { RouterLink, RouterView, useRoute } from 'vue-router';
import { Button } from 'ant-design-vue';
import Navbar from './components/Navbar.vue';
import { computed } from 'vue';
import Header from './components/Header.vue';

const route = useRoute();
const path = computed(() => route.path);


</script>

<template>
    <div id="app" class="flex flex-col items-center justify-center w-full">

        <Header />

        <div id="body" 
        
        style="background: linear-gradient(180deg, rgba(228,246,255,1) 0%, rgba(255,255,255,1) 100%);background: rgb(228,246,255);"
        class="
        w-full h-full flex flex-row items-start  pl-32 pr-3 py-12 gap-x-12">
            <Navbar />
            <div v-if="path !== '/'" id="view" class="bg-white rounded-lg shadow-sm w-full h-full p-12">
                <RouterView />
            </div>
            <div v-else class="w-full h-full">
                <RouterView />
            </div>

        </div>


    </div>

</template>
