<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { title, features, paragraphs, src } = {
   title: 'message.pricingStandard',
   features: [
       'message.yearlyFee',
       'message.monthlyFee'
   ],
   paragraphs: [
       'message.rechargeFee',
       'message.withdrawalFee', 
       'message.consumptionFee',
       'message.nonUsFee',
       'message.preAuthCancelFee',
       'message.refundFee'
   ],
   src: "/main-no-product-bg1.png"
}


</script>

<template>
    <div class="bg-white text-sm border-sky-300 border rounded-xl flex flex-col relative py-8 px-6">
        <img :src="src" alt="feature" class="absolute h-[360px] aspect-auto  " />

        <div class=" text-lg font-bold">
            {{ t(title) }}
        </div>

        <div class="grid grid-cols-2 gap-y-2 mt-36 font-bold z-10 text-[#585858]">
            <p v-for="f in features">{{ t(f) }}</p>
        </div>
        <div class="grid grid-cols-2 gap-y-1 gap-x-2 mt-4 text-xs text-[#585858]">
            <p v-for="p in paragraphs">{{ t(p) }}</p>
        </div>
    </div>

</template>