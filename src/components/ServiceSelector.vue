<script setup>
import { ref } from 'vue';



const generallySupported = ['Chatgpt', 'Claude', 'Github', 'Poe', 'Apple Store', 'Windsurf', 'AWS', 'MidJourney', 'Google Play', 'CloudFlare', 'OpenRouter', 'X', 'Cursor', 'Suno', 'Perplexity', 'Overleaf']

const multiMedia = {
    exclusive: ['Netflix', 'Disney', 'Spotify'],
    incompatible: ['OnlyFans', 'Patreon', 'Pixiv', 'Wise', 'Google Cloud', 'Oracle Cloud', 'Temu']
}

const creativity = {
    exclusive: ['OnlyFans', 'Patreon', 'Pixiv'],
    incompatible: ['Netflix', 'Disney', 'Spotify', 'Wise', 'Google Cloud', 'Oracle Cloud', 'Temu']
}

const service = ref('multi-media')

</script>

<template>
    <div class=" p-12 py-8  gap-y-12 w-full flex flex-col items-center justify-start">
        <div class="text-xl">
            请选择你需要的服务场景
        </div>
        <div class="flex flex-row gap-x-8 w-full justify-between ">
            <div @click="service = 'multi-media'" id="multi-media"
                :class="`w-full flex flex-col items-start justify-start gap-y-2 py-4 px-6 border cursor-pointer rounded-xl  ${service === 'multi-media' ? 'border-blue-500' : 'border-gray-300 hover:border-blue-300'} `">
                <div>
                    <span class="font-semibold">AI Saas +</span> 多媒体
                </div>
                <div class="flex flex-col items-start justify-start gap-y-2 w-full">
                    <div class="text-xs text-gray-500">
                        支持
                    </div>
                    <div class="grid grid-cols-4   text-[8px] w-full border rounded-lg overflow-hidden">
                        <div class=" px-1 py-1  flex flex-row items-center justify-between border border-gray-200"
                            v-for="item in generallySupported" :key="item">
                            <div class="flex flex-row items-center gap-x-1 w-full">
                                <img class="w-4 h-4" :src="'/service-compatibility/' + item + '.png'" :alt="item" />
                                <span>{{ item }}</span>
                            </div>
                            <img class="w-2 h-2" src="/service-compatibility/support.png" alt="supported" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-start justify-start gap-y-2 w-full">
                    <div class="text-xs text-gray-500">
                        独家支持
                    </div>
                    <div class="grid grid-cols-4   text-[8px] w-full border rounded-lg overflow-hidden ">
                        <div class=" px-1 py-1  flex flex-row items-center justify-between border border-gray-200"
                            v-for="item in multiMedia.exclusive" :key="item">
                            <div class="flex flex-row items-center gap-x-1 w-full">
                                <img class="w-4 h-4" :src="'/service-compatibility/' + item + '.png'" :alt="item" />
                                <span>{{ item }}</span>
                            </div>
                            <img class="w-2 h-2" src="/service-compatibility/support.png" alt="supported" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-start justify-start gap-y-2 w-full">
                    <div class="text-xs text-gray-500">
                        不支持
                    </div>
                    <div class="grid grid-cols-4   text-[8px] w-full border rounded-lg overflow-hidden">
                        <div class=" px-1 py-1  flex flex-row items-center justify-between border border-gray-200"
                            v-for="item in multiMedia.incompatible" :key="item">
                            <div class="flex flex-row items-center gap-x-1 w-full">
                                <img class="w-4 h-4" :src="'/service-compatibility/' + item + '.png'" :alt="item" />
                                <span>{{ item }}</span>
                            </div>
                            <img class="w-2 h-2" src="/service-compatibility/not-support.png" alt="supported" />
                        </div>
                    </div>
                </div>
            </div>

            <div @click="service = 'creativity'" id="creativity"
                :class="`w-full flex flex-col items-start justify-start gap-y-2 py-4 px-6 border cursor-pointer rounded-xl  ${service === 'creativity' ? 'border-blue-500' : 'border-gray-300  hover:border-blue-300'} `">
                <div>
                    <span class="font-semibold">AI Saas +</span> 内容创造
                </div>
                <div class="flex flex-col items-start justify-start gap-y-2 w-full">
                    <div class="text-xs text-gray-500">
                        支持
                    </div>
                    <div class="grid grid-cols-4   text-[8px] w-full border rounded-lg overflow-hidden">
                        <div class=" px-1 py-1  flex flex-row items-center justify-between border border-gray-200"
                            v-for="item in generallySupported" :key="item">
                            <div class="flex flex-row items-center gap-x-1 w-full">
                                <img class="w-4 h-4" :src="'/service-compatibility/' + item + '.png'" :alt="item" />
                                <span>{{ item }}</span>
                            </div>
                            <img class="w-2 h-2" src="/service-compatibility/support.png" alt="supported" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-start justify-start gap-y-2 w-full">
                    <div class="text-xs text-gray-500">
                        独家支持
                    </div>
                    <div class="grid grid-cols-4   text-[8px] w-full border rounded-lg overflow-hidden ">
                        <div class=" px-1 py-1  flex flex-row items-center justify-between border border-gray-200"
                            v-for="item in creativity.exclusive" :key="item">
                            <div class="flex flex-row items-center gap-x-1 w-full">
                                <img class="w-4 h-4" :src="'/service-compatibility/' + item + '.png'" :alt="item" />
                                <span>{{ item }}</span>
                            </div>
                            <img class="w-2 h-2" src="/service-compatibility/support.png" alt="supported" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-start justify-start gap-y-2 w-full">
                    <div class="text-xs text-gray-500">
                        不支持
                    </div>
                    <div class="grid grid-cols-4   text-[8px] w-full border rounded-lg overflow-hidden">
                        <div class=" px-1 py-1  flex flex-row items-center justify-between border border-gray-200"
                            v-for="item in creativity.incompatible" :key="item">
                            <div class="flex flex-row items-center gap-x-1 w-full">
                                <img class="w-4 h-4" :src="'/service-compatibility/' + item + '.png'" :alt="item" />
                                <span>{{ item }}</span>
                            </div>
                            <img class="w-2 h-2" src="/service-compatibility/not-support.png" alt="supported" />
                        </div>
                    </div>
                </div>

            </div>
        </div>



    </div>

</template>
