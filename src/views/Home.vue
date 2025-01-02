<script setup>

import FeatureBoard from '../components/layout/FeatureBoard.vue';
import FeatureBoardX from '../components/layout/FeatureBoardX.vue';
import SubscribeButton from '../components/layout/SubscribeButton.vue';
import { useRoute } from 'vue-router';
import { modalStore } from '../states/modalStore';

const route = useRoute();

const refId = route.query.refId;

if(refId!==undefined){
    modalStore.loginModalOpen = true;
}else{
    modalStore.registerRefId = refId;
}




const features = [
    {
        title: "会员权益",
        feature: "贴心客服服务",
        paragraphs: ['赠送Card支付卡1张'],
        src: "/main-no-product-bg2.png"
    },
    {
        title: "服务承诺",
        feature: 'ChatGPT订阅不成功全额退款',
        paragraphs: ['支持全自动订阅ChatGPTPlus', '可同时订阅4个ChatGPTPlus'],
        src: "/main-no-product-bg3.png"
    },
    {
        title: "注意事项",
        feature: '余额为0无法消费',
        paragraphs: ['消费失败累计 5 次或 1 小时内消费失败 3 次将冻结卡片，支付 1 美金方能解冻注销不会退回年费'],
        src: "/main-no-product-bg4.png"
    }
]
</script>

<template>
    <div class=" flex flex-col items-center justify-start flex-grow h-full w-full gap-y-6 pt-12 pr-16 ">
        <div class="text-3xl font-semibold">
            欢迎开通 Card 支付会员
        </div>
        <img src="/my-card-member.png" alt="my-card-member" class="w-[240px] h-[40px]" />
        <div class="grid grid-cols-4 gap-x-6 mt-6">
            <FeatureBoardX />
            <FeatureBoard v-for="feature in features" :title="feature.title" :feature="feature.feature"
                :paragraphs="feature.paragraphs" :src="feature.src" />
        </div>
        <SubscribeButton/>
    </div>
</template>