<script setup>
import { watch, ref, watchEffect } from 'vue';
import { cardListResp } from '../mock/cardList';
import { defaultCardResp } from '../mock/defaultCard';
import { Divider, TabPane, Tabs } from 'ant-design-vue';
import { CreditCardOutlined } from '@ant-design/icons-vue';
import CardDetail from '../components/my-card/CardDetail.vue';
import InviteBanner from '../components/my-card/InviteBanner.vue';
import CardHistory from '../components/my-card/CardHistory.vue';
import GeneralModal from '../components/Modal/GeneralModal.vue';
import get from '../api/get';
import URL from '../api/api-list';


// TODO: vue3 节流防抖



const parseDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

const openHelpModal = ref(false);

const cardData = ref(null);

async function getCardList() {
    const res = await get(URL.card.cardList, null);
    if (!res.err) {
        return res.data;
    } else {
        return []
    }
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
const userInfo = ref(null);


const activeKey = ref();

watchEffect(async () => {
    const _cardList = await getCardList();
    cardList.value = _cardList;
    activeKey.value = _cardList[0].cardId;
    userInfo.value = await getUserInfo();
}, { immediate: true, once: true });


watch(activeKey, async (newVal) => {
    if (!newVal) {
        return;
    }

    const res = await get(URL.card.cardInfo, [['cardId', newVal]]);

    if (res?.err) {
        return;
    }

    cardData.value = res.data;
}, { immediate: true });

</script>


<template>

    <div class="flex px-10 py-4 flex-col items-start justify-start gap-y-6  h-full">

        <div id="tabs" class="w-full flex flex-row justify-between items-center">
            <Tabs class="grow flex-grow " v-model:activeKey="activeKey" tabBarStyle=" ">
                <TabPane class="h-full" v-for="(card, idx) in cardList" :key="card.carId">
                    <template #tab>
                        <div class="h-full text-2xl font-semibold flex items-end">
                            <CreditCardOutlined />
                            <div> {{ String(card.cardNumber.slice(-4)) }}</div>
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
                            parseDate(cardData.membershipEndDate)
                        }}
                    </span>




                </div>
                <div>
                    <span class=" text-gray-400">
                        本月充值限额
                    </span>
                    <span class="font-semibold">
                        ${{ cardData.rechargeLimit }}
                    </span>
                </div>
                <a @click="openHelpModal = true" class="text-blue-500" href="#">
                    提升额度
                </a>
                <GeneralModal v-model:open="openHelpModal" width="600px" :centered="false">
                    <template #footer>
                        <div class="flex justify-center">

                        </div>
                    </template>
                    <div class="flex flex-col items-center justify-center">
                        <div class="text-3xl font-semibold">
                            请扫描下方二维码联系客服
                        </div>
                        <img src="/QR_Wechat.webp" alt="wechat" class="" />

                    </div>
                </GeneralModal>
            </div>
            <div v-else>
                加载中...
            </div>
        </div>

        <CardDetail :cardData="cardData" :cardId="activeKey" />

        <div id="invite" class="mt-6 w-full">
            <InviteBanner />
        </div>

        <div id="history" class="w-full">
            <CardHistory v-if="activeKey" :cardId="activeKey" />
        </div>

    </div>
</template>