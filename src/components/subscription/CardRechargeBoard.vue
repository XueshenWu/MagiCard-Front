<script setup>
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { Divider, InputNumber, Select, Spin } from 'ant-design-vue';
import CardNumber from '../CardNumber.vue';
import NumberInput from '../NumberInput.vue';
import get from '../../api/get';
import URL from '../../api/api-list';
import { useI18n } from 'vue-i18n';
import { message } from '../Message';


const {t} = useI18n()


const rechargeAmount = ref(5);

const currentCard = ref(0);

const availableCards = ref([]);

const loading = ref(true)


const valid = defineModel('valid')
const price = defineModel('price')
const cardId = defineModel('cardId')

const lock = defineModel('lock')


onMounted(()=>{
    lock.value = true
})

watchEffect(() => {

    if (availableCards.value.length > 0) {
        cardId.value = availableCards.value[currentCard.value].cardId
        loading.value = false
    } else {
        cardId.value = ""
    }

})





watch(rechargeAmount, (val) => {
    const amount = parseFloat(val)
    if(isNaN(amount)){
        rechargeAmount.value = 0
        valid.value = false
        price.value = getPrice(0)
    }
    else if ( amount < 5 || amount > 60) {
        rechargeAmount.value = val
        valid.value = false
        price.value = getPrice(val)
    
    } else {
        rechargeAmount.value = amount;
        valid.value = true
        price.value = getPrice(amount);
    }
   

}, { immediate: true })


function getPrice(amount) {
    return amount
}


async function getAvailableCards() {
    const res = await get(URL.card.cardList, null, true)

    if (!res.err) {
        const cards = res.data

        const cardsDetail = (await Promise.all(cards.map(card => {
            return new Promise(async (resolve, reject) => {

                const res = await get(URL.card.cardInfo, [['cardId', card.cardId]], true)
                if (!res.err) {
                    resolve({
                        ...card,
                        ...res.data
                    })
                } else {
                    resolve(null)
                }
            })
        })))
            .filter(data => !!data)
            .map(res => ({
                cardNumber: res.cardNumber,
                balance: parseFloat(res.balance),
                cardId: res.cardId
            }))
        return cardsDetail

    } else {
        return []
    }
}

watchEffect(async () => {
    availableCards.value = await getAvailableCards();
    lock.value = false
}, { immediate: true })


onUnmounted(() => {
    lock.value = false
})

</script>





<template>

    <div class="flex flex-row justify-between items-start px-36  pt-24 gap-x-12 h-full ">
        <div class="flex flex-col gap-y-8">
            <div id="amountSelection" class="flex flex-col gap-y-6">
                <div class="gap-x-2 flex flex-row items-center justify-start text-xl tracking-wider">
                    <span class="text-gray-400 ">{{ t('message.rechargeBoard.recharge.paymentAmount') }}</span>
                    <span class=" text-green-600">{{ t('message.rechargeBoard.recharge.refundNotice') }}</span>
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

                    <NumberInput 
                    
                    :className="`h-14 text-xl ` " maxLength="4" :placeholder=" t('message.rechargeBoard.recharge.customAmount') "
                        :status="valid ? '' : 'error'" v-model="rechargeAmount">
                        <template #prefix>
                            <div class="text-gray-400  h-11">$</div>
                        </template>
                    </NumberInput>
                    <div class="text-red-500 " v-show="!valid">
                        {{ t('message.rechargeBoard.recharge.amountError') }}
                    </div>
                </div>

            </div>

            <Spin v-if="loading" :spining="loading" wrapperClassName="w-full">
         
                <div   id="cardSelection" class="flex flex-col gap-y-2" ref="options">
                    <div class="flex flex-row justify-between items-center text-gray-400 text-xl tracking-wide">
                        <span>{{ t('message.rechargeBoard.card.number') }}</span>
                        <span>{{ t('message.rechargeBoard.card.balance') }}: $ *****</span>
                    </div>

                    <div class="content_select">
                        <Select size="large" v-model:value="currentCard"
                            :getPopupContainer="triggerNode => triggerNode.parentNode">
                            
                        </Select>
                    </div>
                </div>
            </Spin>
            <div  v-else id="cardSelection" class="flex flex-col gap-y-2" ref="options">
                    <div class="flex flex-row justify-between items-center text-gray-400 text-xl tracking-wide">
                        <span>{{ t('message.rechargeBoard.card.number') }}</span>
                        <span>{{ t('message.rechargeBoard.card.balance') }}: ${{ availableCards[currentCard].balance.toFixed(2) }}</span>
                    </div>

                    <div class="content_select">
                        <Select size="large" v-model:value="currentCard"
                            :getPopupContainer="triggerNode => triggerNode.parentNode">
                            <Select.Option v-for="(card, idx) in availableCards" :key="idx" :value="idx">
                                <CardNumber :value="card.cardNumber" />
                            </Select.Option>
                        </Select>
                    </div>
                </div>

            <div class="w-full rounded-xl  px-6 py-4" style="background-color: rgb(229, 250, 235);
                        color: rgb(58, 173, 159);
                        border: 1px solid rgb(203, 239, 212);
                    ">
            {{ t('message.rechargeBoard.card.autoDebitNotice') }}
                <a class="text-blue-500  underline underline-offset-4" href="#">{{ t('message.rechargeBoard.card.cancelSubscription') }}</a>
            </div>
        </div>
        <div id="checkout"
            class=" border-l border-gray-200 pt-12 pl-16 ml-16 w-full flex flex-col h-full min-w-36 justify-between gap-y-16">
            <div class="flex flex-col items-start w-full justify-center gap-y-4">
                <div class="text-3xl">
                    {{ t('message.rechargeBoard.bill.title') }}
                </div>
                <div class="flex justify-between items-center text-xl w-full">
                    <span>{{ t('message.rechargeBoard.bill.subscriptionFee') }}</span>
                    <span class="font-bold">${{ rechargeAmount.toFixed(2) }}</span>
                </div>
            </div>
            <div class="flex flex-col items-start w-full">

                <div
                    class="text-3xl border-t border-dashed w-full border-gray-200 pt-4  flex flex-row items-center gap-x-4 w-full">
                    <span class="">{{ t('message.rechargeBoard.bill.total') }}</span>
                    <span class="font-semibold">${{ rechargeAmount.toFixed(2) }}</span>
                </div>
            </div>

        </div>
    </div>


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

    ::v-deep(.ant-select-single.ant-select-lg) {
        width: 100% !important;
    }

    ::v-deep(.ant-select-dropdown) {
        left: 0px !important;
        top: 63px !important;
        width: 100% !important;

    }
}
</style>
