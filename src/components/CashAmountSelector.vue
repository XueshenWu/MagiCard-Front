<script setup>
import { InputNumber } from 'ant-design-vue';
import { watch, ref } from 'vue';


const { quickSelect } = defineProps([
    'quickSelect',
]);

const rechargeAmount = defineModel('rechargeAmount');

const valid = ref(true);

watch(rechargeAmount, (val) => {
    const amount = Number(val)
    if (isNaN(amount) || amount < 5) {
        rechargeAmount.value = 5;
        valid.value = false
    } else if (amount > 60) {
        rechargeAmount.value = 60;
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
    <div class="flex flex-col gap-y-4 items-start">
        <div class="flex flex-row items-center justify-between gap-x-4">
            <div v-for="(item, idx) in quickSelect" :key="idx"
                :class="`w-24 text-lg font-semibold text-center cursor-pointer px-6 py-2 border  ${rechargeAmount === Number(item) ? ' border-blue-400' : ''} cursor-pointer rounded-lg duration-100`"
                @click="rechargeAmount = item">
                ${{ item }}
            </div>
        </div>
        <div>
            <InputNumber placeholder="输入在$5到$60之间的金额" :status="valid ? '' : 'error'" v-model:value="rechargeAmount" size="large" :class='`w-64 `'>
                <template #prefix>
                    <span class="text-gray-400 text-lg font-semibold">$</span>
                </template>
            </InputNumber>
            <div v-show="!valid" class="text-red-500 text-xs">
                自定义金额必须在$5到$60之间
            </div>
        </div>


    </div>

</template>