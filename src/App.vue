<!-- <script setup>

import { RouterLink, RouterView, useRoute } from 'vue-router';
import { Button } from 'ant-design-vue';
import Navbar from './components/layout/Navbar.vue';
import { computed, onMounted, onUnmounted } from 'vue';
import Header from './components/layout/Header.vue';

const route = useRoute();
const path = computed(() => route.path);





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
        w-full h-full flex flex-row items-start  px-48 py-16 gap-x-6 ">
            <Navbar />
            <div v-if="path !== '/'" id="view" class="bg-white border border-gray-200 rounded-xl shadow-sm w-full h-full ml-6">
                <RouterView />
            </div>
            <div v-else class="w-full h-full">
                <RouterView />
            </div>

        </div>


    </div>

</template>

// NOTE: changed padding and applied rezise with respect to the screen resolution -->

<!-- App.vue -->
<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import Navbar from './components/layout/Navbar.vue';
import { computed, onMounted, onUnmounted, ref, provide } from 'vue';
import Header from './components/layout/Header.vue';

const route = useRoute();
const path = computed(() => route.path);
const headerHeight = ref(0); // 16 * 4 = 64px (h-16)
const lightOff = ref(false);

provide('lightSwitch', {
    turnOnLight: () => lightOff.value = false,
    turnOffLight: () => lightOff.value = true
});


onMounted(() => {


    // message.config({
    //     getContainer: () => document.getElementById('scale-container'),
    //     maxCount: 4
    // })

 



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

        const scaleContainer = document.getElementById('scale-container');
        if (scaleContainer) {
            scaleContainer.style.transform = `scale(${widthScale})`;
            scaleContainer.style.width = `${baseSize.width}px`;
            scaleContainer.style.height = `${baseSize.height}px`;

            // Update the wrapper height
            const scaledHeight = baseSize.height * widthScale;
            document.getElementById('content-wrapper').style.height = `${scaledHeight}px`;
        }
    };

    updateScale();

    window.addEventListener('resize', () => {
        requestAnimationFrame(updateScale);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateScale);
    });
});
</script>

<template>

    <div  class="scrollbar-hide ">
        <Header :class="`fixed top-0 left-0 w-full z-50  ${lightOff ? 'brightness-50' : 'brightness-100'}`" />


        <div id="content-wrapper" class="scrollbar-hide w-full h-fit overflow-x-hidden " :style="{ paddingTop: headerHeight + 'px' }">
            <div id="scale-container" :class="`origin-top-left absolute left-0 `">
                <div id="app" :class="`flex flex-col min-h-[1080px]  ${lightOff ? 'brightness-50' : 'brightness-100'}`">
                    <div id="body"
                        style="background: linear-gradient(180deg, rgba(228,246,255,1) 0%, rgba(255,255,255,1) 100%);"
                        class="w-full flex-1 flex flex-row items-start px-48 py-16 gap-x-6 overflow-y-hidden">
                        <Navbar />
                        <div v-if="path !== '/'" id="view"
                            class="bg-white border border-gray-200 rounded-xl shadow-sm w-full h-full ml-6">
                            <RouterView />
                        </div>
                        <div v-else class="w-full h-full">
                            <RouterView />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
html,
body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
}

#content-wrapper {
    position: relative;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>


<style>




</style>
