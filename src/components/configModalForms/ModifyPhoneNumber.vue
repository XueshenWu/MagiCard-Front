<script setup>
import { reactive, ref, onMounted, watchEffect, inject } from 'vue';
import { Form, FormItem, Input, Select, SelectOption } from 'ant-design-vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { message } from '../Message.js';
import post from '../../api/post.js';
import URL from '../../api/api-list.js';
import { convertGt } from '../../utils/converGt.js'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const openDowndown = ref(false)
const step = ref(1);

const formRef = ref(null);
const captchaReady = ref(false);
const captchaObj = ref(null);
const open = defineModel('openModifyPhoneNumberModal');
const divInputRef = ref(null);
const userInfo = ref(null);
const switchSelected = inject('switchSelected')
watchEffect(async () => {
    userInfo.value = (await post(URL.user.userInfo, {}, true)).data
})


const cooldown = ref(0);
const cooldownClass = ref('text-gray-500 cursor-not-allowed');
const readyClass = ref('text-blue-500');

const handleSendOtp = () => {
    if (cooldown.value > 0) {

        return;
    }
    if (captchaReady.value) {

        const _phonenumber = step.value === 1 ? userInfo.value.phoneNumber : divInputRef.value.innerText.trim();
        if (step.value !== 1) {
            formState.phoneNumber_new = divInputRef.value.innerText.trim()
        }
        if (!validatePhoneNumber(_phonenumber)) {
            message.error(t('message.modifyPhonenumber.validation.invalidPhone'));
            return;
        } else {
            captchaObj.value.showCaptcha();
        }



    }
};

const formState = reactive({
    otp_old: '',
    phoneNumber_new: '',
    otp_new: '',
    phoneCode_new: '+86',
})

const handleChange = (e) => {
    formState.phoneNumber_new = e.target.value;
}

const finishModify = async () => {
    const body = {
        smsCode: formState.otp_new,
        phoneNumber: formState.phoneNumber_new,
    }

    if (!formState.otp_new) {
        message.error(t('message.modifyPhonenumber.validation.verificationCodeRequired'));
        return;
    }
    if (!formState.phoneNumber_new || !validatePhoneNumber(formState.phoneNumber_new)) {
        message.error(t('message.modifyPhonenumber.validation.invalidPhoneNumber'));
        return;
    }

    const data = await post(URL.user.modifyPhoneNumber, body)

    if (!data.err) {
        message.success(t('message.modifyPhonenumber.notifications.modifySuccess'));
        open.value = false;
        switchSelected('');
    } else {
        message.error(t('message.modifyPhonenumber.notifications.modifyFailed'));
    }
}

const validatePhoneNumber = (phonenumber) => {

    const phoneFormat = formState.phoneCode_new === '+86' ? /^1[3456789]\d{9}$/ : /^5\d{8}$/

    return phoneFormat.test(phonenumber)
}

const toStep2 = async () => {


    if (!formState.otp_old) {
        message.error(t('message.modifyPhonenumber.validation.verificationCodeRequired'));
        return;
    }

    const body = {
        smsCode: formState.otp_old,
        phoneNumber: userInfo.value.phoneNumber,
    }

    const data = await post(URL.user.checkCurrentNumber, body)
    if (!data.err) {
        step.value = 2;
    } else {
        message.error(data.msg);
    }


    step.value = 2;
}




onMounted(async () => {
    await import('../../utils/gt4.js')
    window.initGeetest4({
        captchaId: "7ca96590f151feb5236f2a3227dc99db",
        product: "bind",
    }, function (captcha) {
        captchaObj.value = captcha;

        captcha.onReady(function () {
            captchaReady.value = true;
        });

        captcha.onSuccess(async function () {

            const gtResult = captcha.getValidate();
            const body = {
                phone: step.value === 1 ? userInfo.value.phoneNumber : formState.phoneNumber_new,
                geeTest: convertGt(gtResult),
                action: 'changePhoneNumber'
            };


            const data = await post(URL.user.smsCode, body, true);
            if (!data.err) {
                message.success(t('message.modifyPhonenumber.notifications.codeSendSuccess'));

            } else {
                message.error(t('message.modifyPhonenumber.notifications.codeSendFailed'));
            }
            cooldown.value = 30;

            const timer = setInterval(() => {
                cooldown.value--;
                if (cooldown.value <= 0) {
                    clearInterval(timer);
                    cooldown.value = 0;
                }
            }, 1000)
        });
    });
});

</script>


<template>
    <GeneralModal v-if="userInfo" v-model:open="open" width="29.1667vw"
        :mainTitle="t('message.modifyPhonenumber.modal.title')"
        :subTitle="step === 1 ? t('message.modifyPhonenumber.modal.verifyCurrentPhone') : t('message.modifyPhonenumber.modal.verifyNewPhone')"
        :centered="true">
        <div class="p-8 gap-y-12  flex flex-col items-center justify-center">
            <Form class="w-full">
                <div class="w-full space-y-8">
                    <template v-if="step === 1">

                        <div class="flex flex-col items-start justify-center w-full gap-y-4 ">
                            <div class="text-gray-500">
                                {{ t('message.modifyPhonenumber.form.phoneNumberLabel') }}
                            </div>
                            <div
                                class=" input-style border-radius-custom  w-full flex flex-row items-center justify-between border-radius-custom border  border-gray-300 ">
                                <div class="text-gray-300 font-bold text-left pr-8 border-r border-gray-400">
                                    {{ userInfo.phoneCode }}
                                </div>
                                <div
                                    class=" font-semibold  px-8 rounded outline-none w-full focus:outline-none focus:ring-0 ">
                                    {{ userInfo.phoneNumber }}
                                </div>
                            </div>
                        </div>
                        <FormItem>
                            <div class="text-gray-500 mb-4">
                                {{ t('message.modifyPhonenumber.form.verificationCodeLabel') }}
                            </div>
                            <div class="flex flex-row items-center justify-between w-full gap-x-4">
                                <Input v-model:value="formState.otp_old"
                                    :placeholder="t('message.modifyPhonenumber.form.verificationCodePlaceholder')"
                                    size="large" class="input-style border-radius-custom">
                                <template #suffix>
                                    <a @click="handleSendOtp"
                                        :class="`text-[.9375vw] ${cooldown > 0 ? cooldownClass : readyClass}`">
                                        {{ cooldown <= 0 ? t('message.modifyPhonenumber.form.getVerificationCode') :
                                            cooldown + 's' }} </a>
                                </template>
                                </Input>
                            </div>
                        </FormItem>
                    </template>

                    <template v-if="step === 2">

                        <div class="flex flex-col items-start justify-center w-full gap-y-4 ">
                            <div class="text-gray-500">
                                {{ t('message.modifyPhonenumber.form.phoneNumberLabel') }}
                            </div>
                            <div
                                class="   w-full flex flex-row items-center justify-between gap-x-[1vw]   ">
                                <Select @click="openDowndown = !openDowndown" :open="openDowndown" size="large"
                                    v-model:value=formState.phoneCode_new
                                    :getPopupContainer="triggerNode => triggerNode.parentNode">
                                    <SelectOption value="+86">+86</SelectOption>
                                    <SelectOption value="+852">+852</SelectOption>

                                    <template #dropdownRender="{ menuNode, props }">
                                        <div v-for="item in ['+86', '+852']"
                                            class="text-[.9375vw] py-[1vw] grid place-content-center">
                                            <div
                                                @click.stop="() => { formState.phoneCode_new = item; openDowndown = false }">
                                                {{ item }}</div>
                                        </div>
                                    </template>
                                </Select>

                                <div ref="divInputRef" @change="handleChange"
                                    class="border border-gray-200 input-style rounded-[0.625vw] w-full font-semibold  px-8  outline-none  focus:outline-none focus:ring-0 "
                                    contenteditable>
                                    {{ formState.phoneNumber_new }}
                                </div>

                            </div>
                        </div>

                        <FormItem>
                            <div class="text-gray-500 mb-4">
                                {{ t('message.modifyPhonenumber.form.verificationCodeLabel') }}
                            </div>
                            <div class="flex flex-row items-center justify-between w-full gap-x-4">
                                <Input v-model:value="formState.otp_new"
                                    :placeholder="t('message.modifyPhonenumber.form.verificationCodePlaceholder')"
                                    size="large" class="input-style border-radius-custom">
                                <template #suffix>


                                    <a @click="handleSendOtp"
                                        :class="`text-[.9375vw] ${cooldown > 0 ? cooldownClass : readyClass}`">
                                        {{ cooldown <= 0 ? t('message.modifyPhonenumber.form.getVerificationCode') :
                                            cooldown + 's' }} </a>
                                </template>
                                </Input>
                            </div>
                        </FormItem>
                    </template>

                    <div class="flex flex-row justify-between w-full text-xl gap-x-4 ">
                        <button v-show="step === 1" @click="open = false" class="button-style bg-gray-200 rounded-xl">{{
                            t('message.modifyPhonenumber.buttons.cancel') }}</button>
                        <button @click="toStep2" v-show="step === 1"
                            class="button-style text-white bg-blue-500 rounded-xl">
                            {{ t('message.modifyPhonenumber.buttons.next') }}
                        </button>
                        <button v-show="step === 2" @click="step = 1"
                            class="text-white bg-blue-500 rounded-xl button-style">
                            {{ t('message.modifyPhonenumber.buttons.previous') }}
                        </button>
                        <button @click="finishModify" v-show="step === 2"
                            class="text-white bg-blue-500 rounded-xl button-style">
                            {{ t('message.modifyPhonenumber.buttons.finish') }}
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    </GeneralModal>
    <div v-else>

    </div>
</template>
<style scoped>
.button-style {
    font-size: 1.041667vw;
    height: auto;
    line-height: 1.458333vw;
    padding: .625vw;
    width: 100%;
}

.input-style {
    padding: .989583vw 2.03125vw;
    height: 3.39vw;

    font-size: .9375vw;

}

.border-radius-custom {
    border-radius: .625vw;
}


::v-deep(.ant-select-selector) {
    height: 3.29vw !important;
    line-height: 3.19vw;
    font-size: 1.1vw !important;
    border:0;
    display: flex !important;
    align-items: center !important;
    border-radius: 0.625vw !important;
    margin-right: 1vw !important;

}

::v-deep(.ant-select-arrow) {
    display: none !important;
}
</style>
