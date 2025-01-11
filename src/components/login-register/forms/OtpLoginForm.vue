<script setup>

import PhoneNumberInput from '../../PhoneNumberInput.vue';
import { ref, onMounted, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import Agreement from '../Agreement.vue';
import { Form, FormItem, Input, Modal } from 'ant-design-vue';
import { message } from '../../Message.js'
import { convertGt } from '../../../utils/converGt.js';

import URL from '../../../api/api-list.js';
import post from '../../../api/post.js';
import { Crisp } from 'crisp-sdk-web'
// import { Crisp } from '../../cws'

import { getClientToken } from '../../../utils/clientToken.js';


const captchaReady = ref(false)
const captchaObj = ref(null)
const formRef = ref(null)
const router = useRouter()

const cooldown = ref(0);
const cooldownClass = ref('text-gray-500 cursor-not-allowed');
const readyClass = ref('text-blue-500');


const loginState = inject('loginState')

const closeModal = inject('closeLoginRegisterModal');
const formState = reactive({
    phoneNumber: '',
    otp: '',
    checkedAgreement: false
})

const login = async () => {

    console.log(`formState ${JSON.stringify(formState)}\n`)


    const body = {
        phone: formState.phoneNumber,
        code: formState.otp
    }
    const res = await post(URL.user.smsLogin, body, false)
    cooldown.value = 30;
            const timer = setInterval(() => {
                cooldown.value--;
                if (cooldown.value <= 0) {
                    clearInterval(timer);
                    cooldown.value = 0;
                }
            }, 1000)
    if (!res.err) {




        localStorage.setItem('token', res.data.token);
       
        const userCard = res.data.userCard;
        const clientToken = getClientToken(userCard.userId);

        Crisp.setTokenId(clientToken);

        Crisp.load();

        window.location.reload();
        loginState.value = false
        message.success('登录成功')
        closeModal()
        router.replace('/cards')
    } else {
        message.error('登录失败')
    }





}

onMounted(async () => {
    await import('../../../utils/gt4.js')
    window.initGeetest4({
        captchaId: "3f236c8add769bd4a2b93f2fc6f74b35",
        product: "bind",
    }, function (captcha) {

        captchaObj.value = captcha

        captcha.onReady(function () {
            captchaReady.value = true
        })

        captcha.onSuccess(async function () {

            const captchaResult = captcha.getValidate()
            const body = {
                phone: formState.phoneNumber,
                action: "login",
                geeTest: convertGt(captchaResult)
            }

            const data = await post(URL.user.smsCode, body, false)
            if (!data.err) {
                message.success('验证码发送成功')

            } else {
                message.error('验证码发送失败')
            }

            cooldown.value = 30;
            const timer = setInterval(() => {
                cooldown.value--;
                if (cooldown.value <= 0) {
                    clearInterval(timer);
                    cooldown.value = 0;
                }
            }, 1000)


        })
    })
})


const validatePhoneNumberSync = (value) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(value)
};

const validatePhoneNumber = async (_rule, value) => {
    if (!value) {
        return Promise.resolve();
    }
    const res = validatePhoneNumberSync(value)
    if (!res) {
        return Promise.reject('请输入有效的手机号码');
    }
    return Promise.resolve();
};

const validateOtp = async (_rule, value) => {
    if (!value) {
        return Promise.resolve();
    }
    if (value.length !== 6) {
        return Promise.reject('请输入6位验证码');
    }

    return Promise.resolve();
};

const validateAgreement = async (_rule, value) => {
    if (!value) {
        return Promise.reject('请阅读并同意协议');
    }
    return Promise.resolve();
};

const rules = {
    phoneNumber: [
        { required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
        { validator: validatePhoneNumber, trigger: ['change', 'blur'] }
    ],
    otp: [
        { required: true, message: '请输入短信验证码', trigger: ['change', 'blur'] },
        { validator: validateOtp, trigger: ['change', 'blur'] }
    ],
    checkedAgreement: [
        { required: true, message: '请阅读并同意协议', trigger: ['change'] },
        { validator: validateAgreement, trigger: ['change'] }
    ]
};

const onFinish = () => {
    formRef.value
        .validate()
        .then(() => {
            login()
        })
        .catch(() => {
            console.log('error')
        })

}

const onFinishFailed = () => {
    console.log('failed')
}

const handleSendOtp = () => {

    if (cooldown.value > 0) {
        return;
    }

    const res = validatePhoneNumberSync(formState.phoneNumber)
    if (!res) {
        message.error('请输入有效的手机号码')
        return
    } else {
        captchaObj.value.showCaptcha()
    }

}

</script>

<template>
    <Form class="w-full" ref="formRef" @finish="onFinish" @finishFailed="onFinishFailed" :model="formState"
        :rules="rules" autocomplete="on">
        <div class="w-full px-12">
            <FormItem name="phoneNumber" class="w-full">
                <PhoneNumberInput v-model:phoneNumber="formState.phoneNumber" />
            </FormItem>
            <FormItem name="otp">
                <div class="flex items-center justify-between gap-x-2">
                    <Input v-model:value="formState.otp" placeholder="请输入验证码" size="large"
                        class="input-style border-radius-custom">
                    <template #suffix>
                        <a @click="handleSendOtp" :class="`${cooldown>0?cooldownClass:readyClass} text-[.9375vw]`">
                           {{ cooldown > 0 ? `${cooldown}s` : '发送验证码' }}
                        </a>
                    </template>
                    </Input>
                </div>
            </FormItem>
            <FormItem>
                <div class="flex flex-col gap-y-2">
                    <a-button class="button-style w-full " type="primary"
                        html-type="submit">登录</a-button>
                    <slot />
                </div>
            </FormItem>
            <FormItem name="checkedAgreement">
                <div class="flex items-center justify-center w-full">
                    <Agreement v-model:checkedAgreement="formState.checkedAgreement" />
                </div>
            </FormItem>
        </div>
    </Form>
</template>

<style scoped>
.button-style {
    font-size: 1.041667vw;
    height: 3.13vw;
    line-height: 1.458333vw;
    padding: .625vw;
    width: 100%;
    border-radius: 0.625vw;
}

.input-style {
    padding: .989583vw 2.03125vw;
    height: 3.39vw;
    width: 24.17vw;
    font-size: .9375vw;

}

::v-deep(.ant-form-item) {
    margin-bottom: 1.875vw !important;
}


.border-radius-custom {
    border-radius: .625vw;
}
</style>
