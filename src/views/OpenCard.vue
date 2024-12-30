<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CardDurationSelector from '../components/open-card/CardDurationSelector.vue';
import ServiceSelector from '../components/open-card/ServiceSelector.vue';
import CheckoutResult from '../components/CheckoutResult.vue';


const router = useRouter();

const current = ref(0);
const next = () => {

    if(current.value === 1){
        current.value = 4
    }else{
               current.value++; 
    }

};
const prev = () => {
    current.value--;
    if (current.value < 0) {
        router.replace('cards')
    }
};
const steps = [
    {
        title: '选择服务年限',

    },
    {
        title: '选择你需要的服务场景',

    },
    {
        title: '支付费用',

    },
    {
        title: '填写姓名',
    },
    {
        title: '开卡结果'
    }
];
const items = steps.map(item => ({
    key: item.title,
    title: item.title,
}));
</script>


<template>
    <div class="flex flex-col gap-y-8 items-center justify-start">


        <div class="steps-content h-[440px] w-full">
            <CardDurationSelector v-if="current === 0" />
            <ServiceSelector v-else-if="current === 1" />
            <CheckoutResult v-else-if="current === 4" v-model:current="current" />
            <div v-else>
                <div>其他步骤</div>
            </div>
        </div>

        <a-steps progress-dot size="small" :current="current" :items="items" />
        <div class="steps-action flex justify-end items-center gap-x-4 *:w-28 w-full py-4 pr-12">
            <a-button class="bg-gray-100 border-none" v-if="current >= 0" style="margin-left: 8px"
                @click="prev">上一步</a-button>

            <a-button v-show="current === 0" type="primary" @click="next">下一步</a-button>
            <a-button v-show="current === 1" type="primary" @click="next">线上购买</a-button>


        </div>

    </div>
</template>