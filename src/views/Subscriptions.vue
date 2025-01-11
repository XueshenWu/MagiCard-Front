<script setup>
import { computed, nextTick, ref, watch, watchEffect } from 'vue';
import SelectionBoard from '../components/subscription/SelectionBoard.vue';
import CardRechargeBoard from '../components/subscription/CardRechargeBoard.vue';
import GeneralModal from '../components/Modal/GeneralModal.vue';
import CheckoutResult from '../components/CheckoutResult.vue';
import post from '../api/post';
import get from '../api/get';
import URL from '../api/api-list';
import { message } from '../components/Message';
import { QRCode, Spin } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const price = ref(0);
const valid = ref(true);

const cardId = ref("");

const openCheckoutConfirm = ref(false);

const openCheckoutCodeModal = ref(false);

const paymentInfo = ref(null)


const openPaymentInfoConfirmModal = ref(false)


const feeRate = ref(null)

watch(openCheckoutConfirm, async (newVal) => {
    if (newVal) {
        const res = await get(URL.card.rechargeFee, null, true)
        if (res) {
            feeRate.value = res.data
        }
    }
}, { immediate: true })


const isPolling = ref(false)

const pollPaymentStatus = () => {

    openPaymentInfoConfirmModal.value = true

    if (paymentInfo.value === null || isPolling.value) {
        return
    } else {
        isPolling.value = true;


        (new Promise((resolve, reject) => {
            const timeoutJob = async () => {

                if (!current.value === 1) {
                    reject()
                    return
                }

                const res = await post(URL.payment.checkOrderStatus, { data: paymentInfo.value.outOrderId }, true)


                if (res.err) {

                    isPolling.value = false
                    reject()
                    return
                }

                const fulfilled = res.data === 2


                if (fulfilled) {

                    const res = await post(URL.card.recharge, {
                        cardId: cardId.value,
                        outOrderId: paymentInfo.value.outOrderId
                    })


                    try {
                        if (res.err) {

                            reject()
                            return
                        } else {
                            resolve(res.data)
                            return
                        }
                    } catch (e) {
                    }
                } else {
                    setTimeout(timeoutJob, 3000)
                }
            }

            timeoutJob()
        }))
            .then((data) => {
                console.log('Success:', data)
                current.value = 2

            })
            .catch((error) => {
                console.log('Error:', error)
            })
            .finally(() => {
                isPolling.value = false
                openCheckoutCodeModal.value = false
                openPaymentInfoConfirmModal.value = false
            })


    }
}


const current = ref(0);
const next = () => {
    current.value++;
};
const prev = () => {
    current.value--;
};
const steps = ref([
    {
        title: 'message.subscription.steps.selectProduct',

    },
    {
        title: 'message.subscription.steps.payment',

    },
    {
        title: 'message.subscription.steps.result',

    },
]);
// const items = steps.map(item => ({
//     key: item.title,
//     title: t(item.title),
// }));

const items = computed(() => steps.value.map(item => ({
    key: item.title,
    title: t(item.title),
})));

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

            paymentInfo.value = {
                orderId: res.data.orderId,
                outOrderId: res.data.outOrderId,
                payUrl: res.data.payUrl
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
            <CheckoutResult :paymentType="'subscription'" :outOrderId="paymentInfo?.outOrderId ?? ''"
                v-if="current === 2" v-model:current="current" />
        </div>
        <a-steps :current="current" :items="items" />
        <div class="steps-action flex justify-end items-center gap-x-4 *:w-32 *:text-xl *:py-3 *:h-14 *:px-6 ">
            <a-button class="bg-gray-100 border-none" v-if="current > 0 && current != 2" style="margin-left: 8px"
                @click="prev">{{ t('message.subscription.buttons.previous') }}</a-button>
            <a-button v-show="current === 1" type="primary" @click="handleCheckout">{{
                t('message.subscription.buttons.pay') }}</a-button>
            <a-button v-show="current === 0" type="primary" @click="next">{{ t('message.subscription.buttons.next')
                }}</a-button>


        </div>
        <GeneralModal :centered="true" v-model:open="openCheckoutConfirm" width="29vw">
            <div class="px-12 py-8 flex flex-col items-center justify-center gap-y-4 text-gray-500">

                <p class="text-3xl text-black">{{ t('message.subscription.recharge.title') }}</p>
                <div class="flex flex-col gap-y-2 w-full">
                    <div class="flex flex-row items-center justify-between text-lg ">
                        <p class="">{{ t('message.subscription.recharge.amount') }}</p>
                        <p class=" ">${{ parseFloat(price).toFixed(2) }}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between text-lg">
                        <p class="">{{ t('message.subscription.recharge.fee') }}({{ (feeRate * 100).toFixed(1) }}%)</p>
                        <p class="">${{ parseFloat(price * feeRate).toFixed(2) }}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between text-lg">
                        <p class="">{{ t('message.subscription.recharge.totalUsd') }}</p>
                        <p class="font-semibold text-black">${{ parseFloat(price * (1 + feeRate)).toFixed(2) }}</p>
                    </div>

                </div>
            </div>
            <template #footer>
                <div class="grid place-content-center my-4">
                    <button class="px-28 py-3  text-white text-lg rounded-lg bg-blue-500 hover:bg-blue-400 duration-100"
                        @click="handleCheckoutModalConfirm">
                        {{ t('message.subscription.buttons.goToPay') }}
                    </button>
                </div>
            </template>
        </GeneralModal>
        <GeneralModal v-model:open="openCheckoutCodeModal" :maskClosable="false" width="29.1667vw"
            :mainTitle="t('message.qrCode.title')" :subTitle="t('message.qrCode.subtitle')">
            <div class="flex flex-col items-center justify-center payment-style space-y-[1.320833vw] ">
                <QRCode class="w-[8.85416667vw] h-[8.85416667vw]" :value="paymentInfo.payUrl" />
                <!-- <Spin :spinning="isPolling" wrapperClassName="w-full"> -->
                <button @click="pollPaymentStatus"
                    class="w-full py-[.520833vw] px-[1.7625vw]  text-white bg-[#3189ef] rounded-[0.625vw]">
                    {{ t('message.qrCode.complete') }}
                </button>
                <!-- </Spin> -->
            </div>
        </GeneralModal>
        <Modal :zIndex="1500" :centered="true" v-model:open="openPaymentInfoConfirmModal" :maskClosable="false" width="29.1667vw">
            <div class="flex flex-col items-center justify-center space-y-[1.320833vw]">
                <div class="text-[1.458333vw]">
                    {{ t('message.tip') }}
                </div>
                <div class="text-[.833333vw]">
                    {{ t('message.checking') }}
                </div>
            </div>
            <template #footer>
                <div class="grid place-content-center">
                    <button @click="openPaymentInfoConfirmModal = false" class="
                px-[1.041667vw]
                bg-[#eee] border border-[#eee] rounded-[0.625vw] text-[.833333vw]  h-[2.708333vw]">
                        {{ t('message.retry') }}
                    </button>
                </div>

            </template>
        </Modal>

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
