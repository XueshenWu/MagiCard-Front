<script setup>
import { nextTick, ref, watchEffect } from 'vue';

import CashAmountSelector from '../CashAmountSelectorScaled.vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import get from '../../api/get';
import URL from '../../api/api-list';
import post from '../../api/post';
import { message } from '../Message';
import { QRCode } from 'ant-design-vue';

const props = defineProps(['cardId']);
const openRechargeModal = ref(false);
const current = ref(0);
const rechargeAmount = ref(0);
const quickSelect = [5, 10, 20, 25, 40, 60]

const openConfirmRechargeModal = ref(false)
const paymentInfo = ref(null)

const handleConfirmRecharge = async () => {

    const res = await post(URL.payment.rechargePayment, {
        amount: rechargeAmount.value,
        cardId: props.cardId
    })
    if (!res.err) {

        paymentInfo.value = {
            orderNumber: res.data.orderNumber,
            outOrderNumber: res.data.outOrderNumber,
            payUrl: res.data.payUrl
        }
        await nextTick()

        openRechargeModal.value = false
        openConfirmRechargeModal.value = true
    } else {
        message.error(res.err)
    }
}



const imgList = new Array(18).fill(0).map((_, idx) => `/subscriptionIcons/download (${idx}).png`)

const feeRate = ref(null)


watchEffect(async () => {
    if (!feeRate.value) {
        const res = await get(URL.card.rechargeFee, null, true)
        if (res) {
            feeRate.value = res.data
        }
    }
})

</script>

<template>
    <button @click="openRechargeModal = true"
        class="bg-blue-500 text-white px-8 py-3 rounded-xl hover:bg-blue-400 duration-100">
        充值
    </button>
    <GeneralModal v-if="feeRate !== null" v-model:open="openRechargeModal" width="57.2917vw" :centered="true">
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
            <span>支付总额</span><span class="text-black font-bold">${{ (rechargeAmount * (1 + feeRate)).toFixed(2)
                }}</span><span>=
                到账金额</span><span class="text-black font-bold">${{
                    rechargeAmount.toFixed(2) }}</span>
            <span> + 手续费</span><span class="text-black font-bold">${{ (rechargeAmount * (1 + feeRate)).toFixed(2)
                }}</span>({{ (feeRate * 100).toFixed(1) }}%)
        </div>
        <template #footer>
            <div class="flex flex-row justify-center items-center text-xl mt-6 mb-[2vw]">
                <button @click="handleConfirmRecharge"
                    class="text-white  w-[14.0625vw] h-[2.70833vw]  text-[1.04167vw] hover:bg-blue-400 duration-100 bg-blue-500 rounded-xl">
                    去支付
                </button>
            </div>
        </template>
    </GeneralModal>

    <GeneralModal v-model:open="openConfirmRechargeModal" :maskClosable="false">
        <div class="flex flex-col items-center justify-center">
            <div class="text-[1.458333vw]">
                扫码缴费
            </div>
            <div class="text-[.833333vw] text-[#262626]">
                请使用微信或支付宝扫描二维码完成支付
            </div>

            <QRCode class="w-[8.85416667vw] h-[8.85416667vw]" :value="paymentInfo.payUrl" />
            <button class="py-[.520833vw] px-[1.5625vw] text-white bg-[#3189ef] rounded-[0.625vw]">
                我已支付完成
            </button>
        </div>

    </GeneralModal>
</template>

<style scoped>
.title {
    color: #000;
    font-size: 1.197917vw;
    font-style: normal;
    font-weight: 500;
    line-height: 2.0869565217;
    margin-bottom: .833333vw;
}
</style>