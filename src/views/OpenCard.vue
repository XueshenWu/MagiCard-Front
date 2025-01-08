<script setup>

import { ref, provide, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import CardDurationSelector from '../components/open-card/CardDurationSelector.vue';
import ServiceSelector from '../components/open-card/ServiceSelector.vue';
import CheckoutResult from '../components/CheckoutResult.vue';
import post from '../api/post'
import URL from '../api/api-list';
import { message, QRCode } from 'ant-design-vue';
import GeneralModal from '../components/Modal/GeneralModal.vue';
import UserInfoInput from '../components/open-card/UserInfoInput.vue';



const openPayUrlModal = ref(false);

const firstName = ref('');
const lastName = ref('');


const router = useRouter();
const cardType = ref(0);
provide('cardType', cardType);

const yearTerm = ref(0);
provide('yearTerm', yearTerm);

const current = ref(3);
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

const paymentInfo = ref({
    orderId: '',
    outOrderId: '',
    payUrl: ''
})

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

    } else {
        message.error('支付失败')
    }
}


</script>


<template>
    <div class="flex flex-col gap-y-8 items-center justify-start">


        <div class="steps-content h-[440px] w-full">
            <CardDurationSelector v-model="cardType" v-if="current === 0" />
            <ServiceSelector v-model="yearTerm" v-else-if="current === 1" />
            <UserInfoInput v-model:firstName="firstName" v-model:lastName="lastName" v-else-if="current === 3" />
            <CheckoutResult v-else-if="current === 4" v-model:current="current" />
            <div v-else>
                <div>其他步骤</div>
            </div>
        </div>

        <a-steps progress-dot size="large" class="" :current="current" :items="items" />
        <div class="steps-action flex justify-end items-center gap-x-4 *:w-64 *:text-xl *:h-12 w-full py-4 pr-12">
            <a-button class="bg-gray-100 border-none" v-if="current >= 0" style="margin-left: 8px"
                @click="prev">上一步</a-button>

            <a-button v-show="current === 0" type="primary" @click="next">下一步</a-button>
            <a-button v-show="current === 1" type="primary" @click="handlePurchaseOnline">线上购买</a-button>


        </div>
        <GeneralModal :maskClosable="false" v-model:open="openPayUrlModal">
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

    </div>
</template>