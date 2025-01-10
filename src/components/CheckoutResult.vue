<script setup>

import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useClipboard from 'vue-clipboard3'
import { message } from './Message';


const { toClipboard } = useClipboard();

const { t } = useI18n()

const router = useRouter();

const toMyCard = () => {
    router.replace('/cards');
};

const toBuy = () => {
    current.value = 0;
};

const current = defineModel('current')

const props = defineProps(['outOrderId', "paymentType"])

const handleCopy = () => {
    toClipboard(props.outOrderId).then(() => {
        message.success('订单号已复制到您的剪贴板')
    })
}

</script>


<template>
    <a-result status="success" :title="t('message.checkoutResult.success')"
        :sub-title="t(props.paymentType === 'openCard' ? 'message.checkoutResult.subtitle.openCard' : 'message.checkoutResult.subtitle.subscription', { outOrderId: props.outOrderId === undefined ? '' : props.outOrderId })">
        <template #extra>
            <div class="space-y-4">
                <div class="space-y-4">
                    <div class="text-xl font-semibold">
                        请妥善保存您的订单号，以便日后查询
                    </div>
                    <a @click="handleCopy" class=" block cursor-pointer font-bold ">
                        订单号: {{ props.outOrderId }}
                    </a>

                </div>
                <div class="">
                    <a-button key="console" type="primary" @click="toMyCard" style="margin-right: 10px">{{
                        t('message.checkoutResult.buttons.myCards') }}</a-button>
                    <a-button key="buy" @click="toBuy">{{ t('message.checkoutResult.buttons.buyAgain') }}</a-button>
                </div>
            </div>


        </template>
    </a-result>
</template>