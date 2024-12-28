<script setup>
import { watch, ref, watchEffect } from 'vue';
import { cardListResp } from '../mock/cardList';
import { defaultCardResp } from '../mock/defaultCard';
import { TabPane, Tabs } from 'ant-design-vue';
import { CreditCardOutlined } from '@ant-design/icons-vue';
import CardDetail from '../components/CardDetail.vue';
import InviteBanner from '../components/InviteBanner.vue';

async function getCardList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(cardListResp.data);
        }, 50);
    });
}

async function getDefaultCard() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(defaultCardResp.data);
        }, 50);
    });
}

const cardList = ref();
const currentCard = ref(null);

const activeKey = ref(0);

watchEffect(async () => {
    cardList.value = await getCardList();
    currentCard.value = await getDefaultCard();
}, { immediate: true });

</script>


<template>
    <div class="flex flex-col items-start justify-start gap-y-6 w-full h-full">

        <div id="tabs" class="w-full">
            <Tabs v-model:activeKey="activeKey">
                <TabPane v-for="(card, idx) in cardList" :key="idx">

                    <template #tab>
                        <span>
                            <CreditCardOutlined />
                            {{ String(card['cardNo']).slice(-4) }}
                        </span>
                    </template>

                </TabPane>


            </Tabs>
        </div>

        <CardDetail :cardData="currentCard" />

        <div id="invite" class="mt-6 w-full">
            <InviteBanner />
        </div>
        <div id="history">

        </div>

    </div>
</template>