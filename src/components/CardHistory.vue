<script setup>

// TODO: Group records by date

import { ref, computed, watch } from 'vue';
import _, { cloneWith } from 'lodash';


const current = ref(1);


import { cardHistoryResp1, cardHistoryResp2 } from '../mock/cardHistory';
import { Divider, Pagination, Tag } from 'ant-design-vue';

const cardHistory = ref();
const transactionMap = ref();



async function getCardHistory(page) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (page.value === 1 || page === undefined) {
                resolve(cardHistoryResp1);
            } else {
                resolve(cardHistoryResp2);
            }
        }, 50);
    });
}


watch(current, async () => {

    const data = (await getCardHistory(current)).data
    cardHistory.value = data;
    const map =
        _(data['rowList'])
            .groupBy(item => new Date(item.transactionTime).toISOString().split('T')[0])
            .mapValues(group =>
                _.orderBy(group, ['transactionTime'], ['desc'])
                    .map(item => ({
                        ...item,
                        formattedDateTime: new Date(item.transactionTime).toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
                    }))
            )
            .toPairs()
            .orderBy([pair => new Date(pair[0])], ['desc'])
            .value()


    transactionMap.value = map;
}, { immediate: true });


const typeToImg = (txType) => {
    switch (txType) {
        case 1:
            return '/transaction/move-in.svg';
        case 8:
            return '/transaction/move-out.svg';
        case 3:
            return '/transaction/consume.svg';
        default:
            return '';
    }
}

const typeToString = (txType) => {
    switch (txType) {
        case 1:
            return '充值';
        case 8:
            return '提现';
        case 3:
            return '消费';
        default:
            return '';
    }
}

const typeToSign = (txType) => {
    switch (txType) {
        case 1:
            return '+';
        case 8:
            return '-';
        case 3:
            return '-';
        default:
            return '';
    }

}

const typeToColor = (txType) => {
    switch (txType) {
        case 1:
            return '#5daca1';
        default:
            return '#000000'
    }
}

</script>


<template>

    <template v-if="transactionMap">
        <div class="w-full flex flex-col items-start gap-y-6">
            <div class="text-lg">
                消费记录
            </div>
            <div class="w-full flex flex-col items-center gap-y-4">
                <div class="w-full" v-for="([date, transactions]) in transactionMap" :key="date">
                    <div class="text-xs text-gray-500">{{ date }}</div>
                    <div class="py-2 mt-1 border-gray-200 flex flex-row items-center justify-between gap-x-4 border-t"
                        v-for="transaction in transactions" :key="transaction.id">
                        <div class="flex flex-row items-center gap-x-4">
                            <img class="w-8 h-8" :src="typeToImg(transaction.type)" />
                            <div class="flex flex-col gap-y-1 items-start text-xs">

                                <div class="flex flex-row items-center gap-x-2">
                                    <div>{{ typeToString(transaction.type) }}</div>
                                    <div>{{ transaction.detail }}</div>
                                </div>
                                <div class="text-gray-500">{{ transaction.formattedDateTime }}</div>
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-y-1">
                            <div class="text-xs font-semibold tracking-wide" :style="{ color: typeToColor(transaction.type) }">{{
                                typeToSign(transaction.type) }}${{
                                    Number(transaction.orderAmount).toFixed(2) }}
                                    <span class="text-black font-light">{{transaction.fee > 0 ? `(-$${Number(transaction.fee).toFixed(2)})`:'' }}</span></div>
                            <div class="text-[11px] text-center rounded-md px-1  " v-if="transaction.status === 2"
                                :style="`${transaction.status === 2 ? 'color: #5daca1;' : ''} background-color:#e8f6f0;`">
                                {{ transaction.status === 2 ? '成功' : '失败' }}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <Pagination v-model:current="current" :total="cardHistory['totalRecord']"
                v-model:pageSize="cardHistory['pageSize']" />

        </div>
    </template>

    <template v-else>
        加载中...
    </template>


</template>