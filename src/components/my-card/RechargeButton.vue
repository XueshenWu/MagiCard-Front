<script setup>
import { nextTick, ref, watchEffect,inject } from 'vue';
import { useI18n } from 'vue-i18n';

import CashAmountSelector from '../CashAmountSelectorScaled.vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import get from '../../api/get';
import URL from '../../api/api-list';
import post from '../../api/post';
import { message } from '../Message';
import { QRCode, Spin } from 'ant-design-vue';

const props = defineProps(['cardId', 'disabled']);
const openRechargeModal = ref(false);
const current = ref(0);
const rechargeAmount = ref(0);
const quickSelect = [5, 10, 20, 25, 40, 60]
const { t } = useI18n()

const updateCardData = inject('updateCardData');

const openConfirmRechargeModal = ref(false)
const paymentInfo = ref(null)

const handleConfirmRecharge = async () => {

    const res = await post(URL.payment.rechargePayment, {
        amount: rechargeAmount.value,
        cardId: props.cardId
    })
    if (!res.err) {

        paymentInfo.value = {
            orderId: res.data.orderId,
            outOrderId: res.data.outOrderId,
            payUrl: res.data.payUrl
        }
        await nextTick()

        openRechargeModal.value = false
        openConfirmRechargeModal.value = true
    } else {
        message.error(res.err)
    }
}



const isPolling = ref(false)

const pollPaymentStatus = () => {

    if (paymentInfo.value === null) {
        return
    } else {
        isPolling.value = true;


        (new Promise((resolve, reject) => {
            const timeoutJob = async () => {
                if(openConfirmRechargeModal.value === false){
                    reject()
                    return
                }
             
                const res = await post(URL.payment.checkOrderStatus, { data: paymentInfo.value.outOrderId }, true)


                if (res.err) {

                    isPolling.value = false
                    reject()
                }

                const fulfilled = res.data === 2


                if (fulfilled) {

                    const res = await post(URL.card.recharge, {
                        cardId: props.cardId,
                        outOrderId: paymentInfo.value.outOrderId
                    })


                    try {
                        if (res.err) {

                            reject()
                        } else {
                            resolve(res.data)
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
                message.success(t('message.rechargeSuccess'))
            })
            .catch((error) => {
                console.log('Error:', error)
                message.error(t('message.rechargeFailed'))
            })
            .finally(() => {
                isPolling.value = false
                openConfirmRechargeModal.value = false
                updateCardData()
            })


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

const handleOpenRechargeModal = () => {
    if (props.disabled) {
        return
    }
    openRechargeModal.value = true
}


</script>

<template>
    <button @click="handleOpenRechargeModal"
        :class="`${props.disabled ? 'bg-gray-100 cursor-not-allowed text-black' : 'bg-blue-500 hover:bg-blue-400 text-white'}   px-8 py-3 rounded-xl  duration-100`">
        {{ t('message.recharge') }}
    </button>
    <GeneralModal v-if="feeRate !== null" v-model:open="openRechargeModal" width="57.2917vw" :centered="true">
        <div class="flex flex-col px-[3.90625vw]">
            <div class="title">
                {{ t('message.selectProduct') }}
            </div>
            <div class="grid grid-cols-9 gap-2 mb-[2.083333vw]">
                <img v-for="(img, idx) in imgList" :src="img" alt="img" :key="idx" @click="current = idx"
                    :class="` ${current === idx ? 'border border-blue-400' : ''}  cursor-pointer rounded-lg  duration-100`" />
            </div>
            <div class="title">
                {{ t('message.selectAmount') }}
            </div>
            <CashAmountSelector :quickSelect v-model:rechargeAmount="rechargeAmount" />
        </div>
        <div class="text-gray-400 text-[1.041667vw] flex flex-row items-center gap-x-1 w-full justify-center mt-6">
            <span>{{ t('message.payment.total') }}</span><span class="text-black font-bold">${{ (rechargeAmount * (1 +
                feeRate)).toFixed(2)
                }}</span><span>=
                {{ t('message.payment.received') }}</span><span class="text-black font-bold">${{
                    rechargeAmount.toFixed(2) }}</span>
            <span> + {{ t('message.payment.fee') }}</span><span class="text-black font-bold">${{ (rechargeAmount *
                (feeRate)).toFixed(2)
                }}</span>({{ (feeRate * 100).toFixed(1) }}%)
        </div>
        <template #footer>
            <div class="flex flex-row justify-center items-center text-xl mt-6 mb-[2vw]">
                <button @click="handleConfirmRecharge"
                    class="text-white  w-[14.0625vw] h-[2.70833vw]  text-[1.04167vw] hover:bg-blue-400 duration-100 bg-blue-500 rounded-xl">
                    {{ t('message.payButton') }}
                </button>
            </div>
        </template>
    </GeneralModal>

    <GeneralModal v-model:open="openConfirmRechargeModal" :maskClosable="false" width="29.1667vw"
        :mainTitle="t('message.qrCode.title')" :subTitle="t('message.qrCode.subtitle')">
        <div class="flex flex-col items-center justify-center payment-style space-y-[1.320833vw] ">
            <QRCode class="w-[8.85416667vw] h-[8.85416667vw]" :value="paymentInfo.payUrl" />
            <Spin :spinning="isPolling" wrapperClassName="w-full grid place-content-center">
                <button @click="pollPaymentStatus"
                    class="py-[.520833vw] px-[1.7625vw]  text-white bg-[#3189ef] rounded-[0.625vw]">
                    {{ t('message.qrCode.complete') }}
                </button>
            </Spin>
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

.payment-style {
    padding: 2.5vw 0;
}
</style>