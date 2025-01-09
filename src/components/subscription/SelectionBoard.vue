<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


const {t} = useI18n();
const imgList = new Array(18).fill(0).map((_, idx) => `/subscriptionIcons/download (${idx}).png`)

const current = ref(0);

</script>

<template>
    <div class="flex flex-col items-center gap-y-20 pt-32">
        <div class="text-3xl">
            {{ t('message.selectionBoard.select') }}
        </div>
        <div class="grid grid-cols-9 gap-5">
            <img  v-for="(img, idx) in imgList" :src="img" alt="img" :key="idx"  @click="current=idx"  :class="` ${current===idx?'border border-blue-400':''}  cursor-pointer rounded-lg  duration-100` " />
        </div>
    </div>
</template>