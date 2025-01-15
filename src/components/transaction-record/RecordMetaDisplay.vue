<script setup>

import { watchEffect, ref } from 'vue';
import get from '../../api/get'
import URL from '../../api/api-list'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()


async function getTransactionMeta() {
    const res = await get(URL.transaction.summary, null)
    if(!res.err){
        return res.data
    }else{
        return null
    }
}



const transactionMeta = ref()



watchEffect(async () => {
    transactionMeta.value = await getTransactionMeta()
})


</script>




<template >

    <div v-if="transactionMeta" class="flex flex-col justify-start items-start gap-y-6">
        <div class="text-xl font-bold">
            {{ t('message.transaction.title') }}
        </div>
        <div class="flex flex-row items-center justify-start gap-x-48">
            <div class="flex flex-col items-start gap-y-2">
                <div class="font-bold flex flex-row items-center gap-x-1">
                    <span class="text-3xl">$</span> <span class="text-5xl">{{ transactionMeta.totalRechargeAmount.toFixed(2) }}</span>
                </div>
                <div class="text-xl text-gray-500">
                    {{ t('message.transaction.totalRecharge') }}
                </div>
            </div>
            <div class="flex flex-col items-start gap-y-2">
                <div class="font-bold flex flex-row items-center gap-x-1">
                    <span class="text-3xl">$</span> <span class="text-5xl">{{ transactionMeta.totalWithdrawAmount.toFixed(2) }}</span>
                </div>
                <div class="text-xl text-gray-500">
                    {{ t('message.transaction.totalWithdrawn') }}
                </div>
            </div>
            <div class="flex flex-col items-start gap-y-2">
                <div class="font-bold flex flex-row items-center gap-x-1">
                    <span class="text-3xl">$</span> <span class="text-5xl">{{ transactionMeta.totalConsumptionAmount.toFixed(2) }}</span>
                </div>
                <div class="text-xl text-gray-500">
                    {{ t('message.transaction.totalConsumption') }}
                </div>
            </div>


        </div>
    </div>
</template>