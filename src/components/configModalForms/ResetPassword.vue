<script setup>
import GeneralModal from '../Modal/GeneralModal.vue';
import { Form, FormItem } from 'ant-design-vue';
import { InputPassword, Input } from 'ant-design-vue';
import { ref, onMounted, reactive, watchEffect, inject } from 'vue';
import { message } from "../Message.js"
import post from '../../api/post.js';
import URL from '../../api/api-list.js';
import { convertGt } from '../../utils/converGt.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


const cooldown = ref(0);
const cooldownClass = ref('text-gray-500 cursor-not-allowed');
const readyClass = ref('text-blue-500');

const switchSelected = inject('switchSelected')

const userInfo = ref(null);

watchEffect(async () => {
    userInfo.value = (await post(URL.user.userInfo, {}, true)).data
})


const open = defineModel('openResetPasswordModal');

const formRef = ref(null);
const captchaReady = ref(false);
const captchaObj = ref(null);
const formState = reactive({
    password_new: '',
    password_confirm: '',
    otp: '',
});

const validateConfirmPassword = async (rule, value) => {
    if (value !== formState.password_new) {
        throw new Error(t('message.validation.passwordMismatch'));
    }
};

const rules = ref({
    password_new: [
        { required: true, message: t('message.validation.passwordRequired'), trigger: 'blur' },
        { min: 8, message: t('message.validation.passwordLength'), trigger: 'blur' },
        { pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/, message: t('message.validation.passwordFormat'), trigger: 'blur' }
    ],
    password_confirm: [
        { required: true, message: t('message.validation.confirmPasswordRequired'), trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
    ],
    otp: [
        { required: true, message: t('message.validation.otpRequired'), trigger: 'blur' },
        { len: 6, message: t('message.validation.otpLength'), trigger: 'blur' },
        { pattern: /^\d+$/, message: t('message.validation.otpFormat'), trigger: 'blur' }
    ],
});

const handleSendOtp = () => {


    if (cooldown.value > 0) {
        return;
    }

    if (captchaReady.value) {
        captchaObj.value.showCaptcha();
    }
};

const onFinish = async () => {
    const formState_validated = await formRef.value.validateFields()

    const body = {
        smsCode: formState_validated.otp,
        newPassword: formState_validated.password_new,
    }

    const data = await post(URL.user.resetLoginPassword, body, true);
    if (!data.err) {
        message.success(t('message.notifications.resetSuccess'));
        open.value = false;
        switchSelected('');
    } else {
        message.error(t('message.notifications.resetFailed'));
    }

};

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
                phone: userInfo.value.phoneNumber,
                geeTest: convertGt(gtResult),
                action: 'login',
                phoneCode: userInfo.value.phoneCode,
            };
            const data = await post(URL.user.smsCode, body, true);
            if (!data.err) {
                message.success(t('message.notifications.codeSendSuccess'));
            } else {
                message.error(t('message.notifications.codeSendFailed'));
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
    <template v-if="!userInfo">
        <div>
          
        </div>
    </template>
    <template v-else>
        <GeneralModal v-model:open="open" width="29.1667vw" :mainTitle="userInfo.loginPassword ? '重置密码' : '设置密码'"
            :centered="true">
            <div class="flex flex-col items-center justify-center gap-y-6 w-full px-8 pt-6">
                <Form class="w-full" ref="formRef" :model="formState" :rules="rules" autocomplete="on"
                    @finish="onFinish" name="password_reset_form">
                    <div class="flex flex-col items-center justify-center w-full gap-y-2">
                        <div class="flex flex-col items-center justify-center w-full gap-y-2">
                            <div class="text-[#595a61] py-3 text-[0.833333vw]">
                                {{ t('message.passwordReset.enterNewPassword') }}
                            </div>
                            <FormItem name="password_new">
                                <InputPassword class="input-style w-full" v-model:value="formState.password_new"
                                    size="large" />
                            </FormItem>
                        </div>
                        <div class="flex flex-col items-center justify-start w-full gap-y-2">
                            <div class="text-[#595a61] py-3 text-[.833333vw]">
                                {{ t('message.passwordReset.confirmNewPassword') }}
                            </div>
                            <FormItem name="password_confirm">
                                <InputPassword class="input-style" v-model:value="formState.password_confirm"
                                    size="large" />
                            </FormItem>
                        </div>
                        <div class="flex flex-col items-center justify-center w-full gap-y-2">
                            <div class="flex items-center gap-x-4 text-[#595a61] py-3 text-[.833333vw]">
                                <span>{{ t('message.passwordReset.enterVerificationCode') }}</span>
                                <span class="text-gray-400 ">
                                    {{ t('message.passwordReset.sendTo') }} {{ userInfo.phoneCode }} {{ userInfo.phoneNumber }}
                                </span>
                            </div>
                            <FormItem name="otp">
                                <div class="flex items-center justify-between gap-x-6 w-full">
                                    <Input v-model:value="formState.otp" :placeholder="t('message.passwordReset.verificationCodePlaceholder')" size="large"
                                        class="input-style border-radius-custom">
                                    <template #suffix>
                                        <a @click="handleSendOtp"
                                            :class="`${cooldown > 0 ? cooldownClass : readyClass} text-[.9375vw]`">
                                            {{ cooldown>0? `${cooldown}s` : t('message.passwordReset.sendVerificationCode') }}
                                        </a>
                                    </template>
                                    </Input>
                                </div>
                            </FormItem>
                            <FormItem>
                                <button type="submit" html-type="submit"
                                    class="button-style hover:bg-blue-400 duration-100 rounded-3xl bg-blue-500 text-white">
                                    {{ t('message.passwordReset.confirm') }}
                                </button>
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </div>
            <template #footer></template>
        </GeneralModal>
    </template>
</template>
<style scoped>
::v-deep(.ant-input-affix-wrapper-lg) {
    padding: 12px 30px !important;
}

::v-deep(.ant-input-affix-wrapper .ant-input-password) {}

.button-style {
    font-size: 1.041667vw;
    height: auto;
    line-height: 1.458333vw;
    padding: .625vw;
    width: 11.666667vw;
    ;
    border-radius: .625vw;
}

.input-style {
    padding: .989583vw 2.03125vw;
    width: 24.14vw;
    height: 3.67vw;
    border-radius: .625vw;
}

.border-radius-custom {
    border-radius: .625vw;
}
</style>