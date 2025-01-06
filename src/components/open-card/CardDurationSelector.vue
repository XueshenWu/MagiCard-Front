<script setup>
import { inject, ref, watch } from 'vue';

const currentPlan = ref(0);

const yearTerm = inject('yearTerm');

const rate = [
    {
        duration: 2,
        price: 14.99
    },
    {
        duration: 1,
        price: 9.99
    }
]


const handleClick = (idx) => {
    currentPlan.value = idx;
    yearTerm.value = rate[idx].duration;
}

</script>

<template>
    <div class="flex flex-row w-full items-center justify-between h-full ">

        <div class="flex flex-col items-start justify-start w-[45%] gap-y-4 px-12">
            <div class="text-2xl font-bold">
                选择卡片年限
            </div>
        
            <div v-for="(item, idx) in rate" :key="idx" class="w-full">
                <div @click="()=>handleClick(idx)"
                    :class="`cursor-pointer tracking-wide text-2xl flex border w-full rounded-lg px-12 h-24 justify-between duration-75 items-center ${rate[currentPlan].duration === item.duration ? 'border-blue-500' : 'border-gray-100'}`">
                    <span class="first-letter:font-semibold">{{ item.duration }}年</span>
                    <span class="font-semibold ">{{ item.price }}</span>
                </div>
            </div>


        </div>
        <div class="w-[45%] h-full flex flex-col items-center justify-start p-12 py-4 rounded-r-lg"
            style="background: linear-gradient(180deg, rgba(193,236,255,1) 0%, rgba(255,255,255,1) 100%);">
            <img src="/card-wildcard.webp" alt="card-wildcard" class="w-2/3" />
            <div class="flex flex-col items-center justify-center gap-y-2">
                <div class="font-semibold text-normal">
                    开卡费用
                </div>
                <div >
                    <span class="font-bold text-3xl">$</span>
                    <span class="font-bold text-4xl">{{ rate[currentPlan].price }}</span>
                </div>
            </div>

        </div>
    </div>

</template>