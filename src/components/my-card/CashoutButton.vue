<script setup>
import { reactive, ref, inject, computed, nextTick } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { message } from '../Message';
import URL from '../../api/api-list';



import { Input, Form, FormItem, Spin } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import post from '../../api/post';
const { t } = useI18n();

// const switchSelected = inject('switchSelected')
// debugger

const updateCardData = inject('updateCardData');
const openWithdrawlModal = ref(false);
const openResetCheckoutPasswordModal = ref(false);

const isCheckoutCodeValid = computed(() => {
    return checkoutCode.value.length === 6;
});




const open = ref(false);
const { cardId, availableBalance, className, disabled } = defineProps(['cardId', 'availableBalance', 'className', 'disabled']);


const handleClick = async () => {
    if (disabled) {
        return;
    }
  
    const res = await post(URL.user.userInfo, {}, true);
    if(res.err){
        message.error(t('message.withdrawal.messages.error'));
        return;
    }else{
        const paymentPassword = res.data.paymentPassword;
        if(!paymentPassword){
           

            openResetCheckoutPasswordModal.value = true;
            await nextTick();
            message.info(t('message.withdrawal.messages.noPaymentPassword'));
            return;
        }
    }
  

    open.value = true;
    checkoutCode.value = '';
}

const formState = reactive({
    alipay_account: '',
    alipay_name: '',
});


const rules = ref({
    alipay_account: [
        {
            required: true,
            message: t('message.withdrawal.validation.accountRequired'),
            trigger: 'blur'
        },
        {
            min: 4,
            message: t('message.withdrawal.validation.accountLength'),
            trigger: 'blur'
        }
    ],
    alipay_name: [
        {
            required: true,
            message: t('message.withdrawal.validation.nameRequired'),
            trigger: 'blur'
        },
        {
            min: 2,
            message: t('message.withdrawal.validation.nameLength'),
            trigger: 'blur'
        }
    ]
});

const handleOpenWithdrawlModal = () => {
    if (availableBalance <= 0) {
        return;
    }
    // openWithdrawlModal.value = true;
    openCheckoutCodeModal.value = true;
    open.value = false;
}

const formRef = ref(null);

const checkoutCode = ref('');

const reqPending = ref(false);

const openCheckoutCodeModal = ref(false);

const verifyCheckoutCode = async () =>{
  
    const res = await post(URL.card.verifyPaymentPassword, {
        paymentPassword: checkoutCode.value
    })

    if(!res.err){
        openWithdrawlModal.value = true;
        openCheckoutCodeModal.value = false;
    }else{
        message.error(t('message.withdrawal.messages.error'));
    }
}

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
        message.error(t('message.withdrawal.messages.error'));
    } else {
        message.success(t('message.withdrawal.messages.success'));
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

    <GeneralModal v-model:open="openCheckoutCodeModal" width="29.1667vw" :centered="true">

        <div class="flex items-center flex-col justify-center p-8 gap-y-8">
            <div class="text-[1.458333vw]">
                {{ t('message.modal.enterPaymentPassword') }}
            </div>
            <div class="flex flex-col items-center justify-center gap-y-2">
                <div class="w-full text-center text-[0.8vw] mb-8">
                    {{ t('message.modal.passwordProtection') }}
                </div>
                <NumberBoxInput v-model:value="checkoutCode" />
            </div>
            <button @click="verifyCheckoutCode" :disabled="!isCheckoutCodeValid"
                :class="{ 'bg-[#3189ef] hover:bg-blue-400 cursor-pointer': isCheckoutCodeValid, 'bg-gray-400 cursor-not-allowed': !isCheckoutCodeValid }"
                class="text-white font-normal text-[1.04167vw] w-[14.0625vw] h-[2.70833vw] px-14 rounded-xl duration-100">
                {{ t('message.modal.confirmPassword') }}
            </button>
        </div>

        <template #footer></template>
    </GeneralModal>

    <GeneralModal v-model:open="openWithdrawlModal" width="29.1667vw" :mainTitle="''" :centered="true">
        <div class="flex flex-col items-center justify-center gap-y-6 px-8 py-8">

            <Form ref="formRef" :model="formState" :rules="rules" name="checkout_password_form" @finish="onFinish"
                class="w-full space-y-[1vw]">
                <div class="flex px-[3vw] flex-col items-start justify-start gap-y-4 w-full">
                    <div class="text-[0.8333vw] text-gray-500">
                        {{ t('message.withdrawal.form.alipayAccount.label') }}
                    </div>
                    <FormItem class="w-full " name="alipay_account">
                        <Input :placeholder="t('message.withdrawal.form.alipayAccount.placeholder')"
                            class="input-style w-full" v-model:value="formState.alipay_account" />
                    </FormItem>
                </div>

                <div class="flex flex-col px-[3vw] items-start justify-start gap-y-4 w-full">
                    <div class="text-[0.8333vw] text-gray-500">
                        {{ t('message.withdrawal.form.alipayName.label') }}
                    </div>
                    <FormItem class="w-full " name="alipay_name">
                        <Input :placeholder="t('message.withdrawal.form.alipayName.placeholder')" class="input-style"
                            v-model:value="formState.alipay_name" />
                    </FormItem>
                </div>


                <FormItem>
                    <div class="w-full flex items-center justify-center mt-[2.08333vw]">
                        <Spin :spinning="reqPending" wrapperClassName="w-full gird place-items-center">
                            <button type="submit" html-type="submit"
                                class="w-full bg-blue-500 text-white rounded-xl text-xl button-style hover:bg-blue-400 duration-100">
                                {{ t('message.withdrawal.submitButton') }}
                            </button>
                        </Spin>
                    </div>
                </FormItem>
            </Form>

        </div>
        <template #footer></template>
    </GeneralModal>
    <ResetCheckoutPassword v-if="openResetCheckoutPasswordModal" v-model:open="openResetCheckoutPasswordModal" />



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