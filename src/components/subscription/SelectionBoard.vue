<script setup>
import { ref } from 'vue';

const imgList = new Array(18).fill(0).map((_, idx) => `/subscriptionIcons/download (${idx}).png`)

const current = ref(0);

</script>

<template>
    <div class="flex flex-col items-center gap-y-20 pt-32">
        <div class="text-4xl">
            选择你要支付的产品
        </div>
        <div class="grid grid-cols-9 gap-5">
            <img  v-for="(img, idx) in imgList" :src="img" alt="img" :key="idx"  @click="current=idx"  :class="` ${current===idx?'border border-blue-400':''}  cursor-pointer rounded-lg  duration-100` " />
        </div>

    </div>

</template>