<script setup>
import { Modal } from 'ant-design-vue';
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
    <GeneralModal v-model:open="openRechargeModal" width="1060px" :centered="true">
        <div class="flex flex-col gap-y-8 p-4">
            <div class="text-xl">
                选择充值后去消费的产品
            </div>
            <div class="grid grid-cols-9 gap-2">
                <img v-for="(img, idx) in imgList" :src="img" alt="img" :key="idx" @click="current = idx"
                    :class="` ${current === idx ? 'border border-blue-400' : ''}  cursor-pointer rounded-lg  duration-100`" />
            </div>
            <div class="text-xl">
                选择充值金额
            </div>
            <CashAmountSelector :quickSelect v-model:rechargeAmount="rechargeAmount" />
        </div>
        <div class="text-gray-400 text-xl flex flex-row items-center gap-x-1 w-full justify-center mt-3">
            <span>支付总额</span><span class="text-black font-bold">${{ (rechargeAmount * 1.035).toFixed(2) }}</span><span>=
                到账金额</span><span class="text-black font-bold">${{
                    rechargeAmount.toFixed(2) }}</span>
            <span> + 手续费</span><span class="text-black font-bold">${{ (rechargeAmount * 0.035).toFixed(2)
                }}</span>(3.5%)

        </div>

        <template #footer>
            <div class="flex flex-row justify-center items-center text-xl mt-6">
                <button  @click="openRechargeModal = false"
                class="text-white w-72 hover:bg-blue-400 duration-100 bg-blue-500 px-6 py-3 rounded-xl">
                去支付
            </button>
            </div>
        </template>
    </GeneralModal>
</template>

