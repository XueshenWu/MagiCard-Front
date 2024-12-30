<script setup>

import { watchEffect, ref } from 'vue';

async function getTransactionMeta() {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                totalRechargeAmount: 45.2,
                totalConsumptionAmount: 40.2,
                totalWithdrawAmount: 5
            })
        })
    }, 50)
}



const transactionMeta = ref()



watchEffect(async () => {
    transactionMeta.value = await getTransactionMeta()
})


</script>




<template >

    <div v-if="transactionMeta" class="flex flex-col justify-start items-start gap-y-3">
        <div class="text-sm font-bold">
            消费统计
        </div>
        <div class="flex flex-row items-center justify-start gap-x-32">
            <div class="flex flex-col items-start gap-y-1">
                <div class="font-bold flex flex-row items-center gap-x-1">
                    <span class="">$</span> <span class="text-2xl">{{ transactionMeta.totalRechargeAmount.toFixed(2) }}</span>
                </div>
                <div class="text-xs text-gray-500">
                    总充值金额
                </div>
            </div>
            <div>
                <div class="font-bold flex flex-row items-center gap-x-1">
                    <span class="">$</span> <span class="text-2xl">{{ transactionMeta.totalConsumptionAmount.toFixed(2) }}</span>
                </div>
                <div class="text-xs text-gray-500">
                    已提现金额
                </div>
            </div>
            <div>
                <div class="font-bold flex flex-row items-center gap-x-1">
                    <span class="">$</span> <span class="text-2xl">{{ transactionMeta.totalWithdrawAmount.toFixed(2) }}</span>
                </div>
                <div class="text-xs text-gray-500">
                    总消费金额
                </div>
            </div>


        </div>
    </div>
</template>