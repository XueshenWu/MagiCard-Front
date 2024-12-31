<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

const toMyCard = () => {
    router.replace('/cards');
};

const toBuy = () => {
    current.value = 0;
};

const current = defineModel('current')

</script>


<template>
    <a-result status="success" title="支付成功！" sub-title="订单号: 2017182818828182881 充值到账预计在 1-5 分钟, 请耐心等待。">
        <template #extra>
            <div class="">
                <a-button key="console" type="primary" @click="toMyCard" style="margin-right: 10px">我的卡片</a-button>
                <a-button key="buy" @click="toBuy">再次购买</a-button>
            </div>

        </template>
    </a-result>
</template>