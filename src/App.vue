<script setup>

import { RouterLink, RouterView, useRoute } from 'vue-router';
import { Button } from 'ant-design-vue';
import Navbar from './components/Navbar.vue';
import { computed, onMounted, onUnmounted } from 'vue';
import Header from './components/Header.vue';

const route = useRoute();
const path = computed(() => route.path);



// onMounted(() => {
//     window.windowHeight = document.documentElement.clientHeight
//     window.windowWidth = document.documentElement.clientWidth
//     let heightScale = window.windowHeight / 1080
//     let widthScale = window.windowWidth / 1920
//     document.body.style.transform = `scale(${widthScale},${heightScale})`;
//     document.body.style.msTransform = `scale(${widthScale},${heightScale})`;
//     document.body.style.webkitTransform = `scale(${widthScale},${heightScale})`;
//     window.onresize = () => { 
//         window.windowHeight = document.documentElement.clientHeight
//         window.windowWidth = document.documentElement.clientWidth
//         let heightScale = window.windowHeight / 1080
//         let widthScale = window.windowWidth / 1920
//         document.body.style.transform = `scale(${widthScale},${heightScale})`;
//         document.body.style.msTransform = `scale(${widthScale},${heightScale})`;
//         document.body.style.webkitTransform = `scale(${widthScale},${heightScale})`;
//     }
// })

onMounted(() => {
    const updateScale = () => {
        const viewport = {
            width: window.innerWidth || document.documentElement.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight
        };
        
        const baseSize = {
            width: 1920,
            height: 1080
        };
        
        const widthScale = viewport.width / baseSize.width;
        
        // Changed position to absolute to allow scrolling
        document.body.style.position = 'absolute';
        document.body.style.transformOrigin = '0 0';
        document.body.style.transform = `scale(${widthScale})`;
        document.body.style.width = `${baseSize.width}px`;
        document.body.style.height = `${baseSize.height}px`;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
    };
    
    updateScale();
    
    let resizeTimeout;
    window.onresize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateScale, 100);
    };
});

</script>

<template>
    <div id="app" class="flex flex-col items-center justify-center w-full ">

        <Header />

        <div id="body" style="background: linear-gradient(180deg, rgba(228,246,255,1) 0%, rgba(255,255,255,1) 100%);"
            class="
        w-full h-full flex flex-row items-start  px-36 py-12 gap-x-6 ">
            <Navbar />
            <div v-if="path !== '/'" id="view" class="bg-white rounded-lg shadow-sm w-full h-full ">
                <RouterView />
            </div>
            <div v-else class="w-full h-full">
                <RouterView />
            </div>

        </div>


    </div>

</template>

// NOTE: changed padding and applied rezise with respect to the screen resolution