<script setup>
import { reactive, ref, inject } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { message } from '../Message';
import URL from '../../api/api-list';

import get from '../../api/get';


import { Input, Form, FormItem, Spin } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import post from '../../api/post';
const { t } = useI18n();

const updateCardData = inject('updateCardData');
const openWithdrawlModal = ref(false);

const open = ref(false);
const { cardId, availableBalance, className, disabled } = defineProps(['cardId', 'availableBalance', 'className', 'disabled']);


const handleClick = () => {
    if (disabled) {
        return;
    }
    open.value = true;
}

const formState = reactive({
    alipay_account: '',
    alipay_name: '',
});


const rules = ref({
    alipay_account: [
        {
            required: true,
            message: t('message.withdrawl.validation.accountRequired'),
            trigger: 'blur'
        },
        {
            min: 4,
            message: t('message.withdrawl.validation.accountLength'),
            trigger: 'blur'
        }
    ],
    alipay_name: [
        {
            required: true,
            message: t('message.withdrawl.validation.nameRequired'),
            trigger: 'blur'
        },
        {
            min: 2,
            message: t('message.withdrawl.validation.nameLength'),
            trigger: 'blur'
        }
    ]
});

const handleOpenWithdrawlModal = () => {
    if (availableBalance <= 0) {
        return;
    }
    openWithdrawlModal.value = true;
    open.value = false;
}

const formRef = ref(null);

const reqPending = ref(false);

const onFinish = async () => {

    if (reqPending.value) {
        return;
    }

    reqPending.value = true;

    const data = await formRef.value.validateFields();

    const res = await post(URL.card.withdrawl, {
        cardId: cardId,
        alipayAccount: data.alipay_account,
        alipayName: data.alipay_name
    });

    reqPending.value = false;

    updateCardData();
    if (res.err) {
        message.error(t('message.withdrawl.messages.error'));
    } else {
        message.success(t('message.withdrawl.messages.success'));
        openWithdrawlModal.value = false;
    }

    openWithdrawlModal.value = false;
}


</script>
<template>
    <button @click="handleClick"
        :class="className ?? ` ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-slate-300 bg-slate-200 '} px-8 py-3 rounded-xl  duration-100`">
        {{ t('message.withdrawal.button') }}
    </button>
    <GeneralModal v-model:open='open' width="29.1667vw" :centered="true" :mainTitle="t('message.withdrawal.title')"
        :subTitle="t('message.withdrawal.subtitle')">
        <div class="flex flex-col items-center justify-center gap-y-12">
            <p class="font-bold text-[2.08333vw] ">${{ Number(availableBalance).toFixed(2) }}</p>
        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4 mt-12 px-8 pb-8 ">
                <button @click="handleOpenWithdrawlModal"
                    :class='`button-style w-[14.0625vw] h-[2.70833vw]  text-[1.04167vw] rounded-lg   ${availableBalance <= 0 ? "disabled cursor-not-allowed bg-gray-100 text-gray-400" : " duration-100 bg-blue-500 hover:bg-blue-400 text-white"}`'>{{
                        t('message.withdrawal.withdrawAll') }}</button>
            </div>
        </template>

    </GeneralModal>

    <GeneralModal v-model:open="openWithdrawlModal" width="29.1667vw" :mainTitle="'邀请奖励余额'" :centered="true">
        <div class="flex flex-col items-center justify-center gap-y-6 px-8 py-8">

            <Form ref="formRef" :model="formState" :rules="rules" name="checkout_password_form" @finish="onFinish"
                class="w-full space-y-[1vw]">
                <div class="flex px-[3vw] flex-col items-start justify-start gap-y-4 w-full">
                    <div class="text-[0.8333vw] text-gray-500">
                        {{ t('message.withdrawl.alipayAccount.label') }}
                    </div>
                    <FormItem class="w-full " name="alipay_account">
                        <Input :placeholder="t('message.withdrawl.alipayAccount.placeholder')" class="input-style w-full"
                            v-model:value="formState.alipay_account" />
                    </FormItem>
                </div>

                <div class="flex flex-col px-[3vw] items-start justify-start gap-y-4 w-full">
                    <div class="text-[0.8333vw] text-gray-500">
                        {{ t('message.withdrawl.alipayName.label') }}
                    </div>
                    <FormItem class="w-full " name="alipay_name">
                        <Input :placeholder="t('message.withdrawl.alipayName.placeholder')" class="input-style" v-model:value="formState.alipay_name" />
                    </FormItem>
                </div>


                <FormItem>
                    <div class="w-full flex items-center justify-center mt-[2.08333vw]">
                        <Spin :spinning="reqPending" wrapperClassName="w-full gird place-items-center"> 
                            <button type="submit" html-type="submit"
                                class="w-full bg-blue-500 text-white rounded-xl text-xl button-style hover:bg-blue-400 duration-100">
                                {{ t('message.withdrawl.submitButton') }}
                            </button>
                        </Spin>
                    </div>
                </FormItem>
            </Form>

        </div>
        <template #footer></template>
    </GeneralModal>


</template>
<style scoped>
.button-style {
    border-radius: .625vw;
}


.button-style {
    font-size: 1.041667vw;
    height: auto;
    line-height: 1.458333vw;
    padding: .625vw;
    width: 11.666667vw;
    ;
}

.input-style {
    padding: .989583vw 2.03125vw;
    width: 100% !important;
}
</style>