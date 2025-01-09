<script setup>

import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';


const {t} = useI18n()

const router = useRouter();

const toMyCard = () => {
    router.replace('/cards');
};

const toBuy = () => {
    current.value = 0;
};

const current = defineModel('current')

const props = defineProps(['outOrderId'])

</script>


<template>
 <a-result 
    status="success" 
    :title="t('message.checkoutResult.success')"
    :sub-title="t('message.checkoutResult.subtitle', { orderId: props.outOrderId===undefined?'':props.outOrderId })"
>
        <template #extra>
            <div class="">
                <a-button key="console" type="primary" @click="toMyCard" style="margin-right: 10px">{{ t('message.checkoutResult.buttons.myCards') }}</a-button>
                <a-button key="buy" @click="toBuy">{{ t('message.checkoutResult.buttons.buyAgain') }}</a-button>
            </div>

        </template>
    </a-result>
</template>