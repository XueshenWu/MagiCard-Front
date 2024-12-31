<script setup>

import { watch, watchEffect, ref, computed } from 'vue';
import { txRecordResp, txRecordResp2 } from '../../mock/txrRecord';
import { Table } from 'ant-design-vue';

import { typeToColor, typeToString, typeToImg, typeToSign } from '../../utils/txTypeConversion';



async function getTxRecord(page) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {

            if (page.value === 1) {
                resolve(txRecordResp)
            } else {
                resolve(txRecordResp2)
            }
        }, 200)
    })
}


const current = ref(1)

const pagination = computed(() => {
    return {
        total: txRecordResp.data.totalRecord,
        current: current.value,
        pageSize: 10,
    }
})

const handleTableChange = (pagination, filters, sorter) => {
    current.value = pagination.current
}

const txRecord = ref()

const rotateDegree = ref(0)
const rotate = () => {
    rotateDegree.value += 360
}

const handleRefresh = () => {
    rotate()
}


watch(current, async () => {
    txRecord.value = (await getTxRecord(current)).data
}, { immediate: true })

const dataSource = computed(() => {
    if (!txRecord.value) {
        return null
    }
    const res = Array.from(txRecord.value.rowList).map((item) => {
        return {
            transactionTime: item.transactionTime,
            type: item.type,
            lastFour: item.lastFour,
            detail: item.detail,
            orderAmount: item.orderAmount,
            fee: item.fee,
            status: item.status
        }
    })

    return res
})


const columns = [
    {
        title: '交易时间',
        dataIndex: 'transactionTime',
        key: 'orderNo',
        sorter: (a, b) => new Date(a.transactionTime) - new Date(b.transactionTime)
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'orderNo'
    },
    {
        title: '卡号后四位',
        dataIndex: "lastFour",
        key: 'orderNo'
    },
    {
        title: '详情',
        dataIndex: 'detail',
        key: 'orderNo'
    },
    {
        title: '交易金额',
        dataIndex: 'orderAmount',
        key: 'orderNo'
    },
    {
        title: '手续费',
        dataIndex: 'fee',
        key: 'orderNo'
    }
]


</script>

<template>

    <div class="w-full flex flex-col  gap-y-6 border-t border-gray-200 pt-10 mt-12">
        <div class="flex flex-row justify-between items-center w-full">
            <div class="text-2xl font-semibold">
                消费记录
            </div>
            <div @click="handleRefresh" class="flex items-center text-blue-400 gap-x-1 cursor-pointer">

                <img :style="{ transform: `rotate(${rotateDegree}deg)`, transition: 'transform 0.5s ease' }"
                    :class='` w-4 h-4`' src="/invitation/refresh.png" alt="refresh" />
                <span class="text-lg">刷新</span>
            </div>
        </div>
        <div>

            <template v-if="dataSource">

                <Table @change="handleTableChange" :pagination="pagination" :columns="columns" class="w-full" bordered
                    :dataSource="dataSource">
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
                                color: record.status === 2 ? 'rgb(17, 173, 166)' : '#000000'
                            }">
                                    {{ record.status === 2 ? '成功' : '失败' }}
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
                加载中...
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
}
</style>