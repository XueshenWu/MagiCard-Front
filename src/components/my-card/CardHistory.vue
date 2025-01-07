<script setup>


import { useI18n } from 'vue-i18n';
import { ref, computed, watch, nextTick } from 'vue';
import _, { cloneWith } from 'lodash';
import { Divider, Pagination, Skeleton, Spin, Tag } from 'ant-design-vue';
import get from '../../api/get';
import URL from '../../api/api-list';


const current = ref(1);


const loading = ref(false);

const { t } = useI18n();



const cardHistory = ref({
    data: [],
    totalRecord: 0,
    pageSize: LIMIT
});
const transactionMap = ref([]);

const LIMIT = 5;

const props = defineProps({
    cardId: {
        type: String,
        required: true
    }
});



watch([current, () => props.cardId], async ([currentValue, cardIdValue]) => {


    loading.value = true;

    const res = await get(URL.transaction.card, [['cardId', cardIdValue], ['page', currentValue - 1], ['limit', LIMIT]]);
    console.log('res', res)
    if (res.err) {
        return null
    }
    const data = res.data

    cardHistory.value = data

    await nextTick();

    const map =
        _(data.data)
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
    await nextTick();
    loading.value = false;
}, { immediate: true });


const typeToImg = (txType) => {

    switch (txType) {
        case 'TransferIn':
            return 'transaction/move-in.svg';
        case 'TransferOut':
            return 'transaction/move-out.svg';
        case 'Consumption':
            return 'transaction/consume.svg';
        default:
            return '';
    }
}

const typeToString = (txType) => {
    const types = {
        'TransferIn': t('message.transactionHistory.types.transferIn'),
        'TransferOut': t('message.transactionHistory.types.transferOut'),
        'Consumption': t('message.transactionHistory.types.consumption')
    };
    return types[txType] || '';
}

const typeToSign = (txType) => {
    switch (txType) {
        case 'TransferIn':
            return '+';
        case 'TransferOut':
            return '-';
        case 'Consumption':
            return '-';
        default:
            return '';
    }

}

const typeToColor = (txType) => {
    switch (txType) {
        case 'TransferIn':
            return '#5daca1';
        default:
            return '#000000'
    }
}

</script>


<template>
    <template v-if="transactionMap">
        <div class="w-full flex flex-col items-start gap-y-6 border-t border-gray-300 pt-12 mt-6">
            <div class="text-2xl">{{ t('message.transactionHistory.title') }}</div>
            <Spin wrapperClassName="w-full" :spinning="loading">
                <div class="w-full flex flex-col items-center gap-y-4">
                    <div class="w-full" v-for="([date, transactions]) in transactionMap" :key="date">
                        <div class=" text-gray-500">{{ date }}</div>
                        <div class="py-2 mt-1 border-gray-200 flex flex-row items-center justify-between gap-x-4 border-t"
                            v-for="transaction in transactions" :key="transaction.id">
                            <div class="flex flex-row items-center gap-x-6">
                                <img class="w-12 h-12" :src="typeToImg(transaction.type)" />
                                <div class="flex flex-col gap-y-1 items-start text-lg">

                                    <div class="flex flex-row items-center gap-x-2">
                                        <div>{{ typeToString(transaction.type) }}</div>
                                        <div>{{ transaction.detail }}</div>
                                    </div>
                                    <div class="text-gray-500">{{ transaction.formattedDateTime }}</div>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-y-1">
                                <div class="text-lg font-semibold tracking-wide"
                                    :style="{ color: typeToColor(transaction.type) }">{{
                                        typeToSign(transaction.type) }}${{
                                        Number(transaction.amount).toFixed(2) }}
                                    <span class="text-black font-normal ">{{ transaction.type === 'TransferIn' ?
                                        `(-$${Number(transaction.fee).toFixed(2)})` : '' }}</span>
                                </div>
                                <div class="text-md font-semibold text-center rounded-md py-1 px-1  "
                                    v-if="transaction.status === 'Closed'"
                                    :style="`${transaction.status === 'Closed' ? 'color: #5daca1;' : ''} background-color:#e8f6f0;`">
                                    {{ transaction.status === 'Closed' ? t('message.transactionHistory.status.success') : t('message.transactionHistory.status.fail') }}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </Spin>
            <Pagination v-model:current="current" :total="cardHistory.total" v-model:pageSize="LIMIT" />

        </div>
    </template>



</template>