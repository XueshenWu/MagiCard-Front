<script setup>
import { Form, FormItem } from 'ant-design-vue';
import NumberBoxInput from '../NumberBoxInput.vue';
import { ref, onMounted, reactive, watchEffect, inject } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import post from '../../api/post.js';
import URL from '../../api/api-list.js';
import { Input } from 'ant-design-vue';
import { convertGt } from '../../utils/converGt.js';
import { message } from '../Message.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const switchSelected = inject('switchSelected')

const cooldown = ref(0);
const cooldownClass = ref('text-gray-500 cursor-not-allowed');
const readyClass = ref('text-blue-500');


const formRef = ref(null);
const captchaReady = ref(false);
const captchaObj = ref(null);
const formState = reactive({
    checkoutpwd_new: '',
    checkoutpwd_confirm: '',
    otp: "",
});

const userInfo = ref(null);

watchEffect(async () => {
    userInfo.value = (await post(URL.user.userInfo, {}, true)).data
})




onMounted(async () => {
    await import('../../utils/gt4.js');
    window.initGeetest4({
        captchaId: "3f236c8add769bd4a2b93f2fc6f74b35",
        product: "bind",
    }, function (captcha) {
        captchaObj.value = captcha;

        captcha.onReady(function () {
            captchaReady.value = true;
        });

        captcha.onSuccess(async function () {

            const body = {
                action: "login",
                phone: userInfo.value.phoneNumber,
                geeTest: convertGt(captcha.getValidate()),
            }

            const data = await post(URL.user.smsCode, body)
            if (!data.err) {
                message.success(t('message.paymentPassword.messages.otpSuccess'));

            } else {
                message.error(t('message.paymentPassword.messages.otpFailed'));
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



const handleSendOtp = () => {

    if (cooldown.value > 0) {
        return;
    }

    if (captchaReady.value) {

        captchaObj.value.showCaptcha();

    }
};



const onFinish = async () => {
    const body = {
        smsCode: formState.otp,
        newPassword: formState.checkoutpwd_new,
    }
    const data = await post(URL.user.resetPaymentPassword, body)
    if (!data.err) {
        message.success(t('message.paymentPassword.messages.modifySuccess'));
        switchSelected("")
    } else {
        message.error(t('message.paymentPassword.messages.modifyFailed'));
    }
};

const open = defineModel('openModifyCheckoutPasswordModal');

const validateConfirmPassword = async (rule, value) => {
    if (value !== formState.checkoutpwd_new) {
        throw new Error('两次输入的密码不一致');
    } else if (value === formState.checkoutpwd_old) {
        throw new Error('新密码不能与原密码相同');
    }
    return true;
};

const rules = {

    checkoutpwd_new: [
        { required: true, message: t('message.paymentPassword.validation.required'), trigger: 'blur' },
        { len: 6, message: t('message.paymentPassword.validation.length'), trigger: 'blur' }
    ],
    checkoutpwd_confirm: [
        { required: true, message:  t('message.paymentPassword.validation.length'), trigger: 'blur' },
        { len: 6, message: t('message.paymentPassword.validation.length'), trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
    ],
    otp: [
        { required: true, message: t('message.paymentPassword.validation.otpRequired'), trigger: 'blur' },
        { len: 6, message: t('message.paymentPassword.validation.otpLength'), trigger: 'blur' }
    ]
};
</script>
<template>
    <template v-if="!userInfo">
      123123
    </template>

    <template v-else>
     
        <GeneralModal  :open="true" width="29.1667vw" :mainTitle="userInfo.paymentPassword ? t('message.paymentPassword.titles.modify') : t('message.paymentPassword.titles.set')"
            :centered="true">
            <div class="flex flex-col items-center justify-center gap-y-6 px-8 py-8">

                <Form ref="formRef" :model="formState" :rules="rules" name="checkout_password_form" @finish="onFinish"
                    class="w-full">
                    <div class="flex flex-col items-center justify-start gap-y-4 w-full">
                        <div class="text-lg text-gray-500">
                            {{ t('message.paymentPassword.input.new') }}
                        </div>
                        <FormItem name="checkoutpwd_new">
                            <NumberBoxInput v-model:value="formState.checkoutpwd_new" />
                        </FormItem>
                    </div>

                    <div class="flex flex-col items-center justify-start gap-y-4 w-full">
                        <div class="text-lg text-gray-500">
                            {{ t('message.paymentPassword.input.confirm') }}
                        </div>
                        <FormItem name="checkoutpwd_confirm">
                            <NumberBoxInput v-model:value="formState.checkoutpwd_confirm" />
                        </FormItem>
                    </div>
                    <div class="flex flex-col items-center justify-start gap-y-4 w-full">
                        <FormItem>
                            <div class="flex flex-row items-center justify-between w-full gap-x-6">
                                <Input v-model:value="formState.otp" placeholder="请输入验证码" size="large"
                                    class="input-style border-radius-custom">
                                <template #suffix>
                                    <a @click="handleSendOtp" :class="`${cooldown>0? cooldownClass:readyClass } text-[.9375vw]`">
                                        {{ cooldown > 0 ? `${cooldown}s` : t('message.paymentPassword.buttons.sendOtp') }}
                                    </a>
                                </template>
                                </Input>

                            </div>
                            <div class=" text-gray-500 text-lg text-center mt-4">
                                {{ t('message.paymentPassword.input.sendTo', { phone: userInfo.phoneNumber, phoneCode:userInfo.phoneCode }) }}
                            </div>
                        </FormItem>
                    </div>

                    <FormItem>
                        <div class="w-full flex items-center justify-center">
                            <button type="submit" html-type="submit"
                                class="w-full bg-blue-500 text-white rounded-xl text-xl button-style hover:bg-blue-400 duration-100">
                                {{ userInfo.paymentPassword ? t('message.paymentPassword.buttons.modify') : t('message.paymentPassword.buttons.set') }}
                            </button>
                        </div>
                    </FormItem>
                </Form>

            </div>
            <template #footer></template>
        </GeneralModal>
    </template>
</template>
<style scoped>
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
}

.border-radius-custom {
    border-radius: .625vw;
}
</style>
