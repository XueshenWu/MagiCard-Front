<script setup>
import { ref, watch, watchEffect } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { Form, FormItem, Select } from 'ant-design-vue';
import CardNumber from '../CardNumber.vue';
import { message } from '../Message';
import get from '../../api/get';
import URL from '../../api/api-list';
import post from '../../api/post';


const cardOptions = ref([])

const userInfo = ref(null);

watchEffect(async () => {
    const res = await post(URL.user.userInfo, {});
    if (!res.err) {
        userInfo.value = res.data;
        if(!res.data.email){
            message.error('请先绑定邮箱');
            open.value = false;
        }
    } else {
        userInfo.value = null;
    }
})


watchEffect(async ()=>{
    const res = await get(URL.card.cardList, null);
    if (!res.err) {
        cardOptions.value = res.data;
    } else {
        cardOptions.value = []
    }
})

const currentCard = ref(null);


const handleCardChange = (value)=>{
    currentCard.value = cardOptions.value.find(card=>card.cardNumber === value);
}

const open = defineModel('openApplyMonthlyStatementModal', { type: Boolean });

const month = ref(1);
const year = ref(2023);


const card = ref(cardOptions[0]);
const handleApply = async () => {

    if(!currentCard.value){
        message.error('请选择卡片');
        return;
    }


    const res = await post(URL.user.requestStatement, {
        cardNumber: card.value,
        year: year.value,
        month: month.value
    })
    if (res.err) {
        message.error('月结单发送失败');
        return;
    }

    message.success('月结单已发送至您的邮箱');
    open.value = false;
}
</script>

<template>
    <GeneralModal v-model:open="open" width="540px" :centered="true" mainTitle="申请月结单">
        <div class="gap-y-8 px-8 pt-8 flex flex-col items-center justify-center w-full">
            <div class="text-center">
                <p>
                    生成的月结单包含选择当月消费的记录。
                </p>
                <p>
                    请选择您申请月结单的月份：
                </p>
            </div>
            <Form>
                <div class="w-96 flex flex-col">
                    <FormItem>

                        <div class="text-left flex flex-col gap-y-4">
                            <div class="text-gray-600">
                                请选择申请帐单的卡片
                            </div>
                            <div class="content_select">
                                <Select v-model:value="card" class="w-full" size="large"
                                    :getPopupContainer="triggerNode => triggerNode.parentNode">
                                    <Select.Option v-for="card in cardOptions" :key="card.cardId" :value="card.cardNumber">
                                        <CardNumber :value="card.cardNumber" />
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>

                    </FormItem>
                </div>
                <div class="flex flex-row w-96 items-center justify-between gap-x-4">
                    <FormItem class="w-full">
                        <div class="content_select">
                            <Select class="w-full" size="large" v-model:value="year"
                                :getPopupContainer="triggerNode => triggerNode.parentNode">
                                <Select.Option value="2023">2023</Select.Option>
                                <Select.Option value="2024">2024</Select.Option>
                                <Select.Option value="2025">2025</Select.Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem class="w-full">
                        <div class="content_select">
                            <Select v-model:value="month" class="w-full" size="large"
                                :getPopupContainer="triggerNode => triggerNode.parentNode">
                                <Select.Option v-for="month in 12" :key="month" :value="month">{{ month }}月
                                </Select.Option>
                            </Select>
                        </div>

                    </FormItem>
                </div>
            </Form>
        </div>
        <div class="text-center text-gray-600">
            月结单将会在1-3个工作日内发送至您的邮箱地址：
            <div class="text-lg font-bold">
                {{ userInfo?.email }}
            </div>
        </div>
        <div class="grid place-content-center">
            <button @click="handleApply"
                class="h-12 w-fit px-10 bg-primary text-xl py-2 text-white rounded-lg mt-8 bg-blue-500 hover:bg-blue-400 duration-75">
                确认发送
            </button>
        </div>
        <template #footer></template>
    </GeneralModal>
</template>

<style lang="less" scoped>
.content_select {
    position: relative;
    width: 100%;

    ::v-deep(.ant-select-single.ant-select-lg) {
        width: 100% !important;
    }

    ::v-deep(.ant-select-dropdown) {
        left: 0px !important;
        top: 45px !important;
        width: 100% !important;

    }
}
</style>