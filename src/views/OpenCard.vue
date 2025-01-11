<script setup>

import { ref, provide, nextTick, watch, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import CardDurationSelector from '../components/open-card/CardDurationSelector.vue';
import ServiceSelector from '../components/open-card/ServiceSelector.vue';
import CheckoutResult from '../components/CheckoutResult.vue';
import post from '../api/post'
import URL from '../api/api-list';
import { QRCode, Spin, Modal } from 'ant-design-vue';
import GeneralModal from '../components/Modal/GeneralModal.vue';
import UserInfoInput from '../components/open-card/UserInfoInput.vue';
import { message } from '../components/Message';
import { useI18n } from 'vue-i18n';
import get from '../api/get';


const { t } = useI18n();

const openPayUrlModal = ref(false);

const reqPending = ref(false);

const firstName = ref('');
const lastName = ref('');

const firstTimeAndReferred = ref(false);
const parentInviteCode = ref(null)


const updateParentInviteCode = async () => {
    const referred_res = await post(URL.card.parentInviteCode, null, true)
    if (referred_res.err) {
        return
    }

    parentInviteCode.value = referred_res.data
}

provide("updateParentInviteCode", updateParentInviteCode)

const debug = true

onMounted(async () => {

    if(debug){
        firstTimeAndReferred.value = true
        parentInviteCode.value = 'TESTAA'
        return
    }

    const cardList_res = await get(URL.card.cardList, null, true)
    if (cardList_res.err) {
        return
    }

    const cardList = cardList_res.data
    if (cardList.length > 0) {
        return
    }

    const referred_res = await post(URL.card.parentInviteCode, null, true)
    if (referred_res.err) {
        return
    }
    firstTimeAndReferred.value = referred_res.data !== null
    parentInviteCode.value = referred_res.data

})


const router = useRouter();
const cardType = ref('multi-media');
provide('cardType', cardType);

const yearTerm = ref(2);
provide('yearTerm', yearTerm);


const validateName = (name) => {
    const regex = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    return regex.test(name);
}


const isPolling = ref(false)

const openPaymentInfoConfirmModal = ref(false)

const pollPaymentStatus = () => {

    openPaymentInfoConfirmModal.value = true

    if (paymentInfo.value === null || isPolling.value) {
        return
    } else {
        isPolling.value = true;


        (new Promise((resolve, reject) => {
            const timeoutJob = async () => {
                if (!current.value === 2 || !openPayUrlModal.value) {
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

                    resolve()
                } else {
                    setTimeout(timeoutJob, 3000)
                }
            }

            timeoutJob()
        }))
            .then((data) => {
                message.success("支付成功, 请填写姓名信息")

                current.value = 3

            })
            .catch((error) => {
                console.log('Error:', error)
                message.error('支付失败')
                current.value = 1

            })
            .finally(() => {
                isPolling.value = false
                openPayUrlModal.value = false
                openPaymentInfoConfirmModal.value = false
            })


    }
}

const finishOpenCard = async () => {
    if (reqPending.value) {
        return;
    }
    if (!validateName(firstName.value) || !validateName(lastName.value)) {
        message.error('请填写姓名信息')
        return;
    }
    if (!paymentInfo.value.outOrderId) {
        message.error('订单号不能为空')
        return;
    }
    reqPending.value = true;
    await nextTick();

    const res = await post(URL.card.create, {
        firstName: firstName.value,
        lastName: lastName.value,
        outOrderId: paymentInfo.value.outOrderId
    })
    reqPending.value = false;
    if (!res.err) {
        message.success('开卡成功')
        current.value++;
    } else {
        message.error('开卡失败')
    }
}


const current = ref(0);
const next = () => {

    if (current.value === 1) {
        current.value = 4
    } else {
        current.value++;
    }

};

const prev = () => {
    current.value--;
    if (current.value < 0) {
        router.replace('cards')
    }
};

const steps = [
    {
        title: '选择服务年限',

    },
    {
        title: '选择你需要的服务场景',

    },
    {
        title: '支付费用',

    },
    {
        title: '填写姓名',
    },
    {
        title: '开卡结果'
    }
];
const items = steps.map(item => ({
    key: item.title,
    title: item.title,
}));

const paymentInfo = ref(null)

const handlePurchaseOnline = async () => {

    const res = await post(URL.payment.openCardPayment, {
        cardType: cardType.value === 'multi-media' ? 1 : cardType.value === 'creativity' ? 2 : -1,
        yearTerm: yearTerm.value
    })
    if (!res.err) {
        paymentInfo.value = {
            orderId: res.data.orderId,
            outOrderId: res.data.outOrderId,
            payUrl: res.data.payUrl
        }
        await nextTick()
        openPayUrlModal.value = true;
        current.value = 2;


    } else {
        message.error('支付失败')
    }
}


</script>


<template>
    <div class="flex flex-col gap-y-8 items-center justify-start">


        <div class="steps-content h-[440px] w-full">
            <CardDurationSelector :parentInviteCode="parentInviteCode" :promo="firstTimeAndReferred" v-if="current === 0" />
            <ServiceSelector v-else-if="current === 1" />
            <UserInfoInput v-model:firstName="firstName" v-model:lastName="lastName" v-else-if="current === 3" />
            <CheckoutResult :paymentType="'openCard'" :outOrderId="paymentInfo.outOrderId" v-else-if="current === 4"
                v-model:current="current" />
            <div v-else-if="current === 2">

            </div>
        </div>

        <a-steps progress-dot size="large" class="" :current="current" :items="items" />
        <div class="steps-action flex justify-end items-center gap-x-4 *:w-64 *:text-xl *:h-12 w-full py-4 pr-12">
            <a-button class="bg-gray-100 border-none" v-if="current in [0, 1]" style="margin-left: 8px"
                @click="prev">上一步</a-button>

            <a-button v-show="current === 0" type="primary" @click="next">下一步</a-button>
            <a-button v-show="current === 1" type="primary" @click="handlePurchaseOnline">线上购买</a-button>

            <Spin :spinning="reqPending" wrapperClassName="w-64 h-12 text-xl">
                <a-button class="w-64 h-12 text-xl" v-show="current === 3" type="primary"
                    @click="finishOpenCard">完成开卡</a-button>
            </Spin>
        </div>
        <GeneralModal :onClose="() => { openPayUrlModal = false; current = 1 }" v-model:open="openPayUrlModal"
            :maskClosable="false" width="29.1667vw" :mainTitle="t('message.qrCode.title')"
            :subTitle="t('message.qrCode.subtitle')">
            <div class="flex flex-col items-center justify-center payment-style space-y-[1.320833vw] ">
                <QRCode class="w-[8.85416667vw] h-[8.85416667vw]" :value="paymentInfo.payUrl" />

                <!-- <Spin :spinning="isPolling" wrapperClassName="w-full grid place-content-center"> -->
                <button @click="pollPaymentStatus"
                    class="py-[.520833vw] px-[1.7625vw]  text-white bg-[#3189ef] rounded-[0.625vw]">
                    {{ t('message.qrCode.complete') }}
                </button>
                <!-- </Spin> -->
            </div>
        </GeneralModal>
        <Modal :zIndex="1500" :centered="true" v-model:open="openPaymentInfoConfirmModal" :maskClosable="false"
            width="29.1667vw">
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