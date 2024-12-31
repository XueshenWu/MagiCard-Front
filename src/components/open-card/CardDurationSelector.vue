<script setup>
import { ref } from 'vue';

const currentPlan = ref(0);

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

</script>

<template>
    <div class="flex flex-row w-full items-center justify-between h-full ">

        <div class="flex flex-col items-start justify-start w-[45%] gap-y-4 px-12">
            <div class="text-2xl font-bold">
                选择卡片年限
            </div>
            <!-- <div>
                <div @click="duration = 2"
                    :class="`cursor-pointer tracking-wide text-sm flex border w-64 rounded-lg px-8 h-16 justify-between duration-75 items-center ${duration === 2 ? 'border-blue-500' : 'border-gray-100'}`">
                    <span class=" first-letter:font-semibold">2年</span>
                    <span class="font-semibold ">$14.99</span>
                </div>
            </div>
            <div>
                <div @click="duration = 1"
                    :class="`cursor-pointer tracking-wide text-sm flex border w-64 rounded-lg px-8 h-16 justify-between duration-75 items-center ${duration === 1 ? 'border-blue-500' : 'border-gray-100'}`">
                    <span class=" first-letter:font-semibold">1年</span>
                    <span class="font-semibold ">$9.99</span>
                </div>
            </div> -->
            <div v-for="(item, idx) in rate" :key="idx" class="w-full">
                <div @click="currentPlan = idx"
                    :class="`cursor-pointer tracking-wide text-lg flex border w-full rounded-lg px-12 h-24 justify-between duration-75 items-center ${rate[currentPlan].duration === item.duration ? 'border-blue-500' : 'border-gray-100'}`">
                    <span class="first-letter:font-semibold">{{ item.duration }}年</span>
                    <span class="font-semibold ">{{ item.price }}</span>
                </div>
            </div>


        </div>
        <div class="w-[45%] h-full flex flex-col items-center justify-start p-12 py-4 rounded-r-lg"
            style="background: linear-gradient(180deg, rgba(193,236,255,1) 0%, rgba(255,255,255,1) 100%);">
            <img src="/card-wildcard.webp" alt="card-wildcard" class="w-2/3" />
            <div class="flex flex-col items-center justify-center gap-y-2">
                <div class="font-semibold text-sm">
                    开卡费用
                </div>
                <div >
                    <span class="font-bold text-2xl">$</span>
                    <span class="font-bold text-3xl">{{ rate[currentPlan].price }}</span>
                </div>
            </div>

        </div>
    </div>

</template>