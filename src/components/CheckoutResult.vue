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


</script>


<template>
    <a-result status="success" :title="t('message.checkoutResult.success')"
        :sub-title="t(props.paymentType === 'openCard' ? 'message.checkoutResult.subtitle.openCard' : 'message.checkoutResult.subtitle.subscription')">
        <template #extra>
            <div class="space-y-4">
              
                <div class="">
                    <a-button key="console" type="primary" @click="toMyCard" style="margin-right: 10px">{{
                        t('message.checkoutResult.buttons.myCards') }}</a-button>
                    <a-button key="buy" @click="toBuy">{{ t('message.checkoutResult.buttons.buyAgain') }}</a-button>
                </div>
            </div>


        </template>
    </a-result>
</template>