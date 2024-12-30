<script setup>
import { watch, ref, watchEffect } from 'vue';
import { cardListResp } from '../mock/cardList';
import { defaultCardResp } from '../mock/defaultCard';
import { Divider, TabPane, Tabs } from 'ant-design-vue';
import { CreditCardOutlined } from '@ant-design/icons-vue';
import CardDetail from '../components/my-card/CardDetail.vue';
import InviteBanner from '../components/my-card/InviteBanner.vue';
import CardHistory from '../components/my-card/CardHistory.vue';



// TODO: vue3 节流防抖






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

async function getUserInfo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                limit: 60,
                expiration: '2023-12-31',
            });
        }, 50);
    });
}

const cardList = ref();
const currentCard = ref(null);
const userInfo = ref(null);


const activeKey = ref(0);

watchEffect(async () => {
    cardList.value = await getCardList();
    currentCard.value = await getDefaultCard();
    userInfo.value = await getUserInfo();
}, { immediate: true });

</script>


<template>

    <div class="flex px-10 py-4 flex-col items-start justify-start gap-y-6  h-full">

        <div id="tabs" class="w-full flex flex-row justify-between items-center">
            <Tabs class="grow flex-grow " v-model:activeKey="activeKey" tabBarStyle=" ">
                <TabPane class="h-full" v-for="(card, idx) in cardList" :key="idx">
                    <template #tab>
                        <div class="h-full text-3xl font-semibold flex items-end">
                            <CreditCardOutlined />
                           <div> {{ String(card['cardNo']).slice(-4) }}</div>
                        </div>
                    </template>

                </TabPane>


            </Tabs>

            <div v-if="userInfo" class="flex flex-row items-center  gap-x-2 text-md">
                <div>
                    <span class=" text-gray-400">
                        会员有效期至
                    </span>
                    <span class="font-semibold">
                        {{
                            `${userInfo.expiration.split('-')[0]}年${userInfo.expiration.split('-')[1]}月${userInfo.expiration.split('-')[2]}日`
                        }}
                    </span>

                </div>
                <div>
                    <span class=" text-gray-400">
                        本月充值限额
                    </span>
                    <span class="font-semibold">
                        ${{ userInfo.limit }}
                    </span>
                </div>
                <a class="text-blue-500" href="#">
                    提升额度
                </a>
            </div>
            <div v-else>
                加载中...
            </div>
        </div>

        <CardDetail :cardData="currentCard" />

        <div id="invite" class="mt-6 w-full">
            <InviteBanner />
        </div>
  
        <div id="history" class="w-full">
            <CardHistory />
        </div>

    </div>
</template>