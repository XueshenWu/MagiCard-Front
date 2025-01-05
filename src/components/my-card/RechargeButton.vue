<script setup>
import { ref } from 'vue';

import CashAmountSelector from '../CashAmountSelectorScaled.vue';
import GeneralModal from '../Modal/GeneralModal.vue';

const { cardInfo } = defineProps(['cardInfo']);
const openRechargeModal = ref(false);
const current = ref(0);
const rechargeAmount = ref(0);
const quickSelect = [5, 10, 20, 25, 40, 60]

const imgList = new Array(18).fill(0).map((_, idx) => `/subscriptionIcons/download (${idx}).png`)


</script>

<template>
    <button @click="openRechargeModal = true"
        class="bg-blue-500 text-white px-8 py-3 rounded-xl hover:bg-blue-400 duration-100">
        充值
    </button>
    <GeneralModal v-model:open="openRechargeModal" width="57.2917vw" :centered="true">
        <div class="flex flex-col px-[3.90625vw]">
            <div class="title">
                选择充值后去消费的产品
            </div>
            <div class="grid grid-cols-9 gap-2 mb-[2.083333vw]">
                <img v-for="(img, idx) in imgList" :src="img" alt="img" :key="idx" @click="current = idx"
                    :class="` ${current === idx ? 'border border-blue-400' : ''}  cursor-pointer rounded-lg  duration-100`" />
            </div>
            <div class="title">
                选择充值金额
            </div>
            <CashAmountSelector :quickSelect v-model:rechargeAmount="rechargeAmount" />
        </div>
        <div class="text-gray-400 text-[1.041667vw] flex flex-row items-center gap-x-1 w-full justify-center mt-6">
            <span>支付总额</span><span class="text-black font-bold">${{ (rechargeAmount * 1.035).toFixed(2) }}</span><span>=
                到账金额</span><span class="text-black font-bold">${{
                    rechargeAmount.toFixed(2) }}</span>
            <span> + 手续费</span><span class="text-black font-bold">${{ (rechargeAmount * 0.035).toFixed(2)
                }}</span>(3.5%)

        </div>

        <template #footer>
            <div class="flex flex-row justify-center items-center text-xl mt-6 mb-[2vw]">
                <button  @click="openRechargeModal = false"
                class="text-white  w-[14.0625vw] h-[2.70833vw]  text-[1.04167vw] hover:bg-blue-400 duration-100 bg-blue-500 px-6 py-3 rounded-xl">
                去支付
            </button>
            </div>
        </template>
    </GeneralModal>
</template>

<style scoped>
.title{
    color: #000;
    font-size: 1.197917vw;
    font-style: normal;
    font-weight: 500;
    line-height: 2.0869565217;
    margin-bottom: .833333vw;
}
</style>