<script setup>

import { watch, watchEffect, ref, computed, nextTick } from 'vue';

import { Skeleton, Table } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

import { typeToColor, typeToString, typeToImg, typeToSign } from '../../utils/txTypeConversion';
import get from '../../api/get';
import URL from '../../api/api-list';

const loading = ref(true)

const PAGE_SIZE = 10


const txRecord = ref()

const current = ref(1)

const { t, locale } = useI18n()



const handleTableChange = (pagination, filters, sorter) => {
    current.value = pagination.current
}

const rotateDegree = ref(0)
const rotate = () => {
    rotateDegree.value += 360
}

const handleRefresh = () => {
    rotate()
}

const pagination = ref({
    total: 0,
    current: 1,
    pageSize: PAGE_SIZE,
})

watch(current, async (val) => {
    loading.value = true

    const res = await get(URL.transaction.all, [['pageNum', val], ['pageSize', PAGE_SIZE]])

    if (res.err) {
        return txRecord.value = {
            rowList: [],
            totalRecords: 0
        }
    }

    pagination.value = {
        total: res.totalRecords,
        current: val,
        pageSize: PAGE_SIZE
    }

    txRecord.value = res
    loading.value = false
}, { immediate: true })



const dataSource = computed(() => {
    if (!txRecord.value) {
        return null
    }
    const res = Array.from(txRecord.value.records).map((item) => {
        return {
            transactionTime: item.transactionTime,
            type: item.transactionType,
            lastFour: item.cardNumber.slice(-4),
            detail: item.transactionDetail,
            orderAmount: item.amount,
            fee: item.fee,
            status: item.status
        }
    })

    return res
})


const columns = ref([
    {
        title: 'message.transactions.columns.time',
        dataIndex: 'transactionTime',
        key: 'orderNo',
        sorter: (a, b) => new Date(a.transactionTime) - new Date(b.transactionTime)
    },
    {
        title: 'message.transactions.columns.type',
        dataIndex: 'type',
        key: 'orderNo'
    },
    {
        title: ('message.transactions.columns.cardNumber'),
        dataIndex: "lastFour",
        key: 'orderNo'
    },
    {
        title: ('message.transactions.columns.details'),
        dataIndex: 'detail',
        key: 'orderNo'
    },
    {
        title: ('message.transactions.columns.amount'),
        dataIndex: 'orderAmount',
        key: 'orderNo'
    },
    {
        title: ('message.transactions.columns.fee'),
        dataIndex: 'fee',
        key: 'orderNo'
    }
])


</script>

<template>

    <div class="w-full flex flex-col  gap-y-6 border-t border-gray-200 pt-10 mt-12">
        <div class="flex flex-row justify-between items-center w-full">
            <div class="text-2xl font-semibold">
                {{ t('message.transactions.title') }}
            </div>
            <div @click="handleRefresh" class="flex items-center text-blue-400 gap-x-1 cursor-pointer">

                <img :style="{ transform: `rotate(${rotateDegree}deg)`, transition: 'transform 0.5s ease' }"
                    :class='` w-4 h-4`' src="/invitation/refresh.png" alt="refresh" />
                <span class="text-lg">{{ t('message.transactions.refresh') }}</span>
            </div>
        </div>
        <div>

            <template v-if="txRecord">

                <Table :loading="loading" @change="handleTableChange" :pagination="pagination" :columns="columns"
                    class="w-full" bordered :dataSource="dataSource">


                    <template v-slot:headerCell="{ column }">
                        <div class="text-lg py-2 px-1">
                            {{ t(column.title) }}
                        </div>
                    </template>

                    <template v-slot:bodyCell="{ text, record, index, column }">
                        <div class="text-lg py-2 px-1">
                            <span class="font-semibold" v-if="column.dataIndex === 'transactionTime'">
                                {{ new Date(record.transactionTime).toLocaleString('zh-CN', {
                                    year: 'numeric', month:
                                        '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
                                }) }}
                            </span>
                            <span class="flex flex-row items-center justify-between"
                                v-else-if="column.dataIndex === 'type'">
                                <div>{{ typeToString(record.type) }}</div>
                                <div :class="`
                            `" :style="{
                                color: record.status === 'Closed' ? 'rgb(17, 173, 166)' : '#000000'
                            }">
                                    {{ record.status === 'Closed' ? t('message.transactions.status.success') :
                                        t('message.transactions.status.failed') }}
                                </div>
                            </span>
                            <span class="font-semibold" v-else-if="column.dataIndex === 'lastFour'">
                                {{ record.lastFour }}

                            </span>
                            <span class="font-semibold grid place-content-center"
                                :style="{ color: typeToColor(record.type) }"
                                v-else-if="column.dataIndex === 'orderAmount'">

                                {{ typeToSign(record.type) }}${{ Number(record.orderAmount).toFixed(2) }}

                            </span>
                            <span class="font-semibold grid place-content-center"
                                v-else-if="column.dataIndex === 'fee'">
                                {{ record.fee > 0 ? `${Number(record.fee).toFixed(2)}` : '-' }}
                            </span>
                            <span v-else>
                                {{ record[column.dataIndex] }}
                            </span>
                        </div>
                    </template>

                </Table>

            </template>
            <template v-else>
                <Skeleton :active="true" :paragraph="{ rows: PAGE_SIZE }" />
            </template>

        </div>


    </div>


</template>
<style scoped>
img {
    will-change: transform;
}

::v-deep(.ant-table-wrapper .ant-table-thead > tr > th) {
    background-color: white;
    font-size: large;
}
</style>