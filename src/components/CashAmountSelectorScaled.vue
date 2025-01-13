<script setup>

import { watch, ref } from 'vue';
import NumberInput from './NumberInput.vue';

const { quickSelect, className } = defineProps([
    'quickSelect', 'className'
]);

const rechargeAmount = defineModel('rechargeAmount');


const valid = defineModel('valid')

watch(rechargeAmount, (val) => {
    const amount = parseFloat(val)
    if (isNaN(amount)) {
        rechargeAmount.value = 0
        valid.value = false
    }
    else if (amount < 5 || amount > 60) {
        rechargeAmount.value = amount;
        valid.value = false
    } else {
        rechargeAmount.value = amount;
        valid.value = true
    }
})

</script>


<!-- <div :class="` cursor-pointer px-6 py-2 border  ${rechargeAmount === Number(20).toFixed(2) ? ' border-blue-400' : ''} cursor-pointer rounded-lg duration-100`"
    @click="rechargeAmount = 20">
                            $20
                        </div> -->

<template>
    <div class="flex flex-col gap-y-4 items-start ">
        <div :class="`flex flex-row items-center justify-between gap-x-[0.625vw] w-full cash-amount-entry-container`">
            <div v-for="(item, idx) in quickSelect" :key="idx"
                :class="` w-[7.3859375vw]  text-[1.15vw] font-bold text-center cursor-pointer px-2 py-2 border  ${rechargeAmount === Number(item) ? ' border-blue-400' : ''} cursor-pointer rounded-lg duration-100`"
                @click="rechargeAmount = item">
                ${{ item }}
            </div>
        </div>
        <div>
            <NumberInput placeholder="输入在$5到$60之间的金额" :status="valid ? '' : 'error'" v-model:modelValue="rechargeAmount"
                size="large" :class='`w-[24.375vw] *:h-14 text-lg`'>

            </NumberInput>
            <div v-show="!valid" class="text-red-500 text-xs">
                自定义金额必须在$5到$60之间
            </div>
        </div>


    </div>

</template>