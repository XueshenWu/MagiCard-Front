<script setup>
import PasswordInput from './PasswordInput.vue';
import PhoneNumberInput from './PhoneNumberInput.vue';
import { ref, onMounted, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import Agreement from './Agreement.vue';
import { Form, FormItem } from 'ant-design-vue';


const captchaReady = ref(false)
const captchaObj = ref(null)
const formRef = ref(null)
const router = useRouter()
const closeModal = inject('closeLoginRegisterModal');

const formState = reactive({
    phoneNumber: '',
    password: '',
    checkedAgreement: false
})

const login = async (captchaValidateResult) => {
    console.log(`formState ${formState}\n captchaValidateResult ${captchaValidateResult}`)
    console.log(`formState ${JSON.stringify(formState)}\n captchaValidateResult ${JSON.stringify(captchaValidateResult)}`)
    router.replace('/cards')
    closeModal()
   

}

onMounted(async () => {
    await import('../utils/gt4.js')
    window.initGeetest4({
        captchaId: "3f236c8add769bd4a2b93f2fc6f74b35",
        product: "bind",
    }, function (captcha) {

        captchaObj.value = captcha

        captcha.onReady(function () {
            captchaReady.value = true
        })

        captcha.onSuccess(function () {
            formRef.value.resetFields();
            const captchaResult = captcha.getValidate()
            login(captchaResult)


        })
    })
})


const validatePhoneNumber = async (_rule, value) => {
    if (!value) {
        return Promise.resolve();
    }
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
        return Promise.reject('请输入有效的手机号码');
    }
    return Promise.resolve();
};

const validatePassword = async (_rule, value) => {
    if (!value) {
        return Promise.resolve();
    }
    if (value.length < 8) {
        return Promise.reject('密码长度至少为8位');
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
    password: [
        { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
        { validator: validatePassword, trigger: ['change', 'blur'] }
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
            captchaObj.value.showCaptcha()
        })
        .catch(() => {
            console.log('error')
        })

}

const onFinishFailed = () => {
    console.log('failed')
}


</script>

<template>
    <Form ref="formRef" @finish="onFinish" @finishFailed="onFinishFailed" :model="formState" :rules="rules"
        autocomplete="on">
        <FormItem name="phoneNumber">
            <PhoneNumberInput v-model:phoneNumber="formState.phoneNumber" />
        </FormItem>
        <FormItem name="password">
            <PasswordInput v-model:password="formState.password" />
        </FormItem>
        <FormItem>
            <div class="flex flex-col gap-y-2">
                <a-button class="w-full" size="large" type="primary" html-type="submit">登录</a-button>
                <slot />
            </div>
        </FormItem>

        <FormItem name="checkedAgreement">
            <Agreement v-model:checkedAgreement="formState.checkedAgreement" />
        </FormItem>
    </Form>
</template>