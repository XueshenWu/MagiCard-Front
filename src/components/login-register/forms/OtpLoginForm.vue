<script setup>

import PhoneNumberInput from '../../PhoneNumberInput.vue';
import { ref, onMounted, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import Agreement from '../Agreement.vue';
import { Form, FormItem, Input, message, Modal } from 'ant-design-vue';



const captchaReady = ref(false)
const captchaObj = ref(null)
const formRef = ref(null)
const router = useRouter()



const closeModal = inject('closeLoginRegisterModal');
const formState = reactive({
    phoneNumber: '',
    otp: '',
    checkedAgreement: false
})

const login = async () => {

    console.log(`formState ${JSON.stringify(formState)}\n`)
    router.replace('/cards')
    closeModal()


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

        captcha.onSuccess(function () {
            console.log('send otp')
            message.success('验证码发送成功')

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
        <div class="w-full space-y-8 px-12">
            <FormItem name="phoneNumber" class="w-full">
                <PhoneNumberInput v-model:phoneNumber="formState.phoneNumber" />
            </FormItem>
            <FormItem name="otp">
                <div class="flex items-center justify-between gap-x-2 h-12">
                    <Input placeholder="请输入短信验证码" class="h-14 w-60" v-model:value="formState.otp" />
                    <a class="text-blue-500 text-lg" @click="handleSendOtp">
                        获取验证码

                    </a>
                </div>


            </FormItem>
            <FormItem>
                <div class="flex flex-col gap-y-2">
                    <a-button class="w-full *:text-xl " size="large" type="primary" html-type="submit">登录</a-button>
                    <slot />
                </div>
            </FormItem>

            <FormItem name="checkedAgreement">
                <Agreement v-model:checkedAgreement="formState.checkedAgreement" />
            </FormItem>
        </div>
    </Form>
</template>