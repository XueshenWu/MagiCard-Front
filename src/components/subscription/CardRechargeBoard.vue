<script setup>
import { ref, watch, watchEffect } from 'vue';
import { Divider, InputNumber, Select } from 'ant-design-vue';
import CardNumber from '../CardNumber.vue';


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

        <div class="flex flex-row justify-between items-start px-20 py-12 h-full ">
            <div class="flex flex-col gap-y-8">
                <div id="amountSelection" class="flex flex-col gap-y-2">
                    <div class="gap-x-2 flex flex-row items-center justify-start text-sm">
                        <span class="text-gray-400 ">支付金额</span>
                        <span class=" text-green-600">(失败会退回)</span>
                    </div>
                    <div id="quickSelection" class="font-bold flex flex-row gap-x-4 *:rounded-lg">
                        <div :class="` cursor-pointer px-6 py-2 border  ${rechargeAmount === Number(20).toFixed(2) ? ' border-blue-400' : ''} cursor-pointer rounded-lg duration-100`"
                            @click="rechargeAmount = 20">
                            $20
                        </div>

                        <div :class="` cursor-pointer px-6 py-2 border ${rechargeAmount === Number(40).toFixed(2) ? ' border-blue-400' : ''} cursor-pointer rounded-lg duration-100`"
                            @click="rechargeAmount = 40">
                            $40
                        </div>
                        <div :class="` cursor-pointer px-6 py-2 border ${rechargeAmount === Number(60).toFixed(2) ? ' border-blue-400' : ''} cursor-pointer rounded-lg duration-100`"
                            @click="rechargeAmount = 60">
                            $60
                        </div>
                    </div>
                    <div class="flex flex-col ">
                        <InputNumber :status="valid ? '' : 'error'" size="large" class="w-full "
                            v-model:value="rechargeAmount">
                            <template #prefix><span class="text-gray-400">$</span>
                            </template>
                        </InputNumber>
                        <div class="text-red-500 text-xs" v-show="!valid">
                            自定义金额必须在$5到$60之间
                        </div>
                    </div>

                </div>
                <div id="cardSelection" class="flex flex-col gap-y-2">
                    <div class="flex flex-row justify-between items-center text-gray-400 text-sm tracking-wide">
                        <span>支付卡号</span>
                        <span>可用余额: ${{ availableCards[currentCard].balance.toFixed(2) }}</span>
                    </div>
                    <Select size="large" v-model:value="currentCard" style="width: 100%">
                        <Select.Option v-for="(card, idx) in availableCards" :key="idx" :value="idx">
                            <CardNumber :value="card.accountNumber" />
                        </Select.Option>
                    </Select>

                </div>
            </div>
            <div id="checkout" class="flex flex-col h-full min-w-36 justify-between gap-y-16">
                <div class="flex flex-col items-start w-full justify-between gap-y-4">
                    <div class="text-lg">
                        账单
                    </div>
                    <div class="flex justify-between items-center text-xs w-full">
                        <span>产品订阅费</span>
                        <span class="font-bold">${{ rechargeAmount.toFixed(2) }}</span>
                    </div>
                </div>
                <div class="flex flex-col items-start w-full">
                    <Divider />
                    <div class="text-lg flex flex-row items-center gap-x-4 w-full">
                        <span>总价</span>
                        <span class="font-bold">${{ rechargeAmount.toFixed(2) }}</span>
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