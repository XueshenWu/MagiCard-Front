<script setup>
import { ref, watch, watchEffect } from 'vue';
import { Divider, InputNumber, Select } from 'ant-design-vue';
import CardNumber from '../CardNumber.vue';
import NumberInput from '../NumberInput.vue';


const rechargeAmount = ref(0);

const currentCard = ref(0);

const availableCards = ref();

const valid = defineModel('valid')
const price = defineModel('price')


watch(rechargeAmount, (val) => {
    const amount = Number(val)
    if (isNaN(amount) || amount <= 0 || amount > 999) {
        rechargeAmount.value = 0;
    } else {
        rechargeAmount.value = amount;
        valid.value = true
    }
    price.value = getPrice(amount);

})


function getPrice(amount) {
    return amount
}


async function getAvailableCards() {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    accountNumber: '1234654128654832',
                    balance: 100,
                },
                {
                    accountNumber: '4128654832123465',
                    balance: 22,
                },
                {
                    accountNumber: '5215316546521478',
                    balance: 0,
                }
            ])
        })
    }, 50)
}

watchEffect(async () => {
    availableCards.value = await getAvailableCards();
}, { immediate: true })

</script>


<template>



    <template v-if="availableCards">

        <div class="flex flex-row justify-between items-start px-36  pt-24 gap-x-12 h-full ">
            <div class="flex flex-col gap-y-8">
                <div id="amountSelection" class="flex flex-col gap-y-6">
                    <div class="gap-x-2 flex flex-row items-center justify-start text-xl tracking-wider">
                        <span class="text-gray-400 ">支付金额</span>
                        <span class=" text-green-600">(失败会退回)</span>
                    </div>
                    <div id="quickSelection" class="font-bold text-xl flex flex-row gap-x-4 *:rounded-lg ">
                        <div :class="` cursor-pointer px-12 py-4 border  ${rechargeAmount === Number(20) ? ' border-blue-400' : ''} cursor-pointer rounded-lg duration-100`"
                            @click="rechargeAmount = 20">
                            $20
                        </div>

                        <div :class="` cursor-pointer px-12 py-4 border ${rechargeAmount === Number(40) ? ' border-blue-400' : ''} cursor-pointer rounded-lg duration-100`"
                            @click="rechargeAmount = 40">
                            $40
                        </div>
                        <div :class="` cursor-pointer px-12 py-4 border ${rechargeAmount === Number(60) ? ' border-blue-400' : ''} cursor-pointer rounded-lg duration-100`"
                            @click="rechargeAmount = 60">
                            $60
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <!-- <InputNumber  :status="valid ? '' : 'error'"  class=" w-full "
                            v-model:value="rechargeAmount">
                            <template #prefix><span class="text-gray-400">$</span>
                            </template>
</InputNumber> -->
                        <NumberInput className="h-14 text-xl" maxLength="4" placeholder="自定义金额"
                            :status="valid ? '' : 'error'" v-model="rechargeAmount">
                            <template #prefix>
                                <span class="text-gray-400">$</span>
                            </template>
                        </NumberInput>
                        <div class="text-red-500 " v-show="!valid">
                            自定义金额必须在$5到$60之间
                        </div>
                    </div>

                </div>
                <div id="cardSelection" class="flex flex-col gap-y-2" ref="options">
                    <div class="flex flex-row justify-between items-center text-gray-400 text-xl tracking-wide">
                        <span>支付卡号</span>
                        <span>可用余额: ${{ availableCards[currentCard].balance.toFixed(2) }}</span>
                    </div>

                    <div class="content_select">
                        <Select size="large" v-model:value="currentCard" :getPopupContainer="triggerNode => triggerNode.parentNode" >
                            <Select.Option v-for="(card, idx) in availableCards" :key="idx" :value="idx">
                                <CardNumber :value="card.accountNumber" />
                            </Select.Option>
                        </Select>
                    </div>

                </div>
                <div class="w-full rounded-xl  px-6 py-4" style="background-color: rgb(229, 250, 235);
                        color: rgb(58, 173, 159);
                        border: 1px solid rgb(203, 239, 212);
                    ">
                    绑卡支付成功后，每个月都会自动进行扣费，如想取消下个月的自动扣费，请前往：
                    <a class="text-blue-500  underline underline-offset-4" href="#">取消订阅服务教程</a>
                </div>
            </div>
            <div id="checkout"
                class=" border-l border-gray-200 pt-12 pl-16 ml-16 w-full flex flex-col h-full min-w-36 justify-between gap-y-16">
                <div class="flex flex-col items-start w-full justify-center gap-y-4">
                    <div class="text-3xl">
                        账单
                    </div>
                    <div class="flex justify-between items-center text-xl w-full">
                        <span>产品订阅费</span>
                        <span class="font-bold">${{ rechargeAmount.toFixed(2) }}</span>
                    </div>
                </div>
                <div class="flex flex-col items-start w-full">

                    <div
                        class="text-3xl border-t border-dashed w-full border-gray-200 pt-4  flex flex-row items-center gap-x-4 w-full">
                        <span class="">总价</span>
                        <span class="font-semibold">${{ rechargeAmount.toFixed(2) }}</span>
                    </div>
                </div>

            </div>
        </div>


    </template>
    <template v-else>
        <div>
            加载中...
        </div>
    </template>

</template>


<style lang="less" scoped>
:deep(.ant-select-selector) {
    height: 60px !important;
    line-height: 60px !important;
    padding: 0 11px !important;
}

:deep(.ant-select-selection-search) {
    height: 60px !important;
    line-height: 60px !important;
}

:deep(.ant-select-selection-search-input) {
    height: 60px !important;
    line-height: 60px !important;
}

:deep(.ant-select-selection-item) {
    line-height: 58px !important;
    /* height - 2px for borders */
    height: 58px !important;
    display: flex !important;
    align-items: center !important;
}


.content_select {
    position: relative;
    width: 100%;

    ::v-deep(.ant-select-single.ant-select-lg){
        width: 100% !important;
    }
    ::v-deep(.ant-select-dropdown) {
        left: 0px !important;
        top: 63px !important;
        width: 100% !important;

    }
}
</style>
