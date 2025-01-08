<script setup>
import { nextTick, ref, watch, watchEffect } from 'vue';
import SelectionBoard from '../components/subscription/SelectionBoard.vue';
import CardRechargeBoard from '../components/subscription/CardRechargeBoard.vue';
import GeneralModal from '../components/Modal/GeneralModal.vue';
import CheckoutResult from '../components/CheckoutResult.vue';
import post from '../api/post';
import get from '../api/get';
import URL from '../api/api-list';
import { message } from '../components/Message';
import { QRCode } from 'ant-design-vue';

const price = ref(0);
const valid = ref(true);

const cardId = ref("");

const openCheckoutConfirm = ref(false);

const openCheckoutCodeModal = ref(false);

const paymentInfo = ref(null)


const feeRate = ref(null)

watch(openCheckoutConfirm, async (newVal) => {
    if (newVal) {
        const res = await get(URL.card.rechargeFee, null, true)
        if (res) {
            feeRate.value = res.data
        }
    }
}, { immediate: true })



const current = ref(0);
const next = () => {
    current.value++;
};
const prev = () => {
    current.value--;
};
const steps = [
    {
        title: '选择你要支付的产品',

    },
    {
        title: '支付结算页',

    },
    {
        title: '充值结果',

    },
];
const items = steps.map(item => ({
    key: item.title,
    title: item.title,
}));

const handleCheckout = () => {
    openCheckoutConfirm.value = true
};


const handleCheckoutModalConfirm = async () => {
    if (isNaN(price.value) || (price.value) <= 0 || (price.value) > 60) {
        valid.value = false
        openCheckoutConfirm.value = false
    } else {
        valid.value = true
        const res = await post(URL.payment.rechargePayment, {
            cardId: cardId.value,
            amount: price.value
        })
        if (!res.err) {
            message.success('支付成功')
            paymentInfo.value = {
                orderId: res.data.orderId,
                outOrderId: res.data.outOrderId,
                payUrl: res.data.paymentUrl
            }
            await nextTick()

            openCheckoutConfirm.value = false
            openCheckoutCodeModal.value = true
        } else {
            openCheckoutConfirm.value = false
        }
    }
};


</script>


<template>
    <div class="flex flex-col justify-around gap-y-20 p-12 py-4">
        <div class="steps-content">
            <SelectionBoard v-if="current === 0" />
            <CardRechargeBoard v-if="current === 1" v-model:cardId="cardId" v-model:price="price"
                v-model:valid="valid" />
            <CheckoutResult v-if="current === 2" v-model:current="current" />
        </div>
        <a-steps :current="current" :items="items" />
        <div class="steps-action flex justify-end items-center gap-x-4 *:w-32 *:text-xl *:py-3 *:h-14 *:px-6 ">
            <a-button class="bg-gray-100 border-none" v-if="current > 0 && current != 2" style="margin-left: 8px"
                @click="prev">上一步</a-button>
            <a-button v-show="current === 1" type="primary" @click="handleCheckout">支付</a-button>
            <a-button v-show="current === 0" type="primary" @click="next">下一步</a-button>


        </div>
        <GeneralModal :centered="true" v-model:open="openCheckoutConfirm" width="29vw">
            <div class="px-12 py-8 flex flex-col items-center justify-center gap-y-4 text-gray-500">

                <p class="text-3xl text-black">充值</p>
                <div class="flex flex-col gap-y-2 w-full">
                    <div class="flex flex-row items-center justify-between text-lg ">
                        <p class="">充值到账金额</p>
                        <p class=" ">${{ parseFloat(price).toFixed(2) }}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between text-lg">
                        <p class="">手续费({{ (feeRate * 100).toFixed(1) }}%)</p>
                        <p class="">${{ parseFloat(price * feeRate).toFixed(2) }}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between text-lg">
                        <p class="">美元总额</p>
                        <p class="font-semibold text-black">${{ parseFloat(price * (1 + feeRate)).toFixed(2) }}</p>
                    </div>

                </div>
            </div>
            <template #footer>
                <div class="grid place-content-center my-4">
                    <button class="px-28 py-3  text-white text-lg rounded-lg bg-blue-500 hover:bg-blue-400 duration-100"
                        @click="handleCheckoutModalConfirm">
                        去支付
                    </button>
                </div>
            </template>
        </GeneralModal>
        <GeneralModal v-model:open="openCheckoutCodeModal" :maskClosable="false" width="29.1667vw" >
            <div class="flex flex-col items-center justify-center payment-style">
                <QRCode class="w-[8.85416667vw] h-[8.85416667vw]" :value="paymentInfo.payUrl" />
                <button class="py-[.520833vw] px-[1.5625vw] text-white bg-[#3189ef] rounded-[0.625vw]">
                    我已支付完成
                </button>
            </div>

        </GeneralModal>
    </div>
</template>


<style scoped lang="less">
:deep(.ant-steps-item-title) {
    font-size: x-large !important;
}

:deep(.ant-modal .ant-modal-content) {
    border-radius: 25px !important;
}

</style>
