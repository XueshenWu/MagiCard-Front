<script setup>
import PasswordInput from '../PasswordInput.vue';
import PhoneNumberInput from '../../PhoneNumberInput.vue';
import { ref, onMounted, reactive, inject, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import Agreement from '../Agreement.vue';
import { Form, FormItem, message } from 'ant-design-vue';
import { convertGt } from '../../../utils/converGt.js';
import post from '../../../api/post.js';
import URL from '../../../api/api-list.js';
import { Crisp } from 'crisp-sdk-web';
// import { Crisp } from '../../../cws'
import { getClientToken } from '../../../utils/clientToken.js';
import { yetAnotherStore } from '../../../states/yastore.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();


const captchaReady = ref(false)
const captchaObj = ref(null)
const formRef = ref(null)
const router = useRouter()
const closeModal = inject('closeLoginRegisterModal');

const loginState = inject('loginState')

const gtPromise = ref(null)


const formState = reactive({
    phoneNumber: '',
    password: '',
    checkedAgreement: false
})

const login = async (captchaValidateResult, formState) => {


    const body = {
        phone: formState.phoneNumber,
        password: formState.password,
        geeTest: convertGt(captchaValidateResult)
    }
    const res = await post(URL.user.passwordLogin, body, false)
   console.log('loginRes',res)
    if (!res.err) {
       
        localStorage.setItem('token', res.data.token);
       
        const userCard = res.data.userCard;
        const clientToken = getClientToken(userCard.userId);

        Crisp.setTokenId(clientToken);

        Crisp.load();

        // window.location.reload();
        loginState.value = false
        router.replace('/cards')

        yetAnotherStore.isLoggedIn = true;

        const res_userInfo = await post(URL.user.userInfo, {}, true)

        if (!res.err) {
            const userInfo = res_userInfo.data;

     


            if (userInfo.loginPassword===null) {

                yetAnotherStore.shouldShowResetPassword = true;
            }
        }






    } else {
        message.error(t('message.passwordLoginForm.failure'))
    }
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
            formRef.value.resetFields();
            const captchaResult = captcha.getValidate()
            gtPromise.value.resolve(captchaResult)
        })

        captcha.onFail(function () {
            // gtPromise.value.reject(null)
            console.log('onFail')
        })

        captcha.onClose(function () {
            gtPromise.value.reject(null)
        })

        
    })
})


const validatePhoneNumber = async (_rule, value) => {
    if (!value) {
        return Promise.resolve();
    }
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
        return Promise.reject(t('message.passwordLoginForm.phoneNumber.invalid'))
    }
    return Promise.resolve();
};

const validatePassword = async (_rule, value) => {
    if (!value) {
        return Promise.resolve();
    }
    if (value.length < 8) {
        return Promise.reject(t('message.passwordLoginForm.password.tooShort'))
    }

    return Promise.resolve();
};

const validateAgreement = async (_rule, value) => {
    if (!value) {
        return Promise.reject(t('message.passwordLoginForm.agreement.required'))
    }
    return Promise.resolve();
};

const rules = ref({
    phoneNumber: [
        { required: true, message: t('message.passwordLoginForm.phoneNumber.placeholder'), trigger: ['change', 'blur'] },
        { validator: validatePhoneNumber, trigger: ['change', 'blur'] }
    ],
    password: [
        { required: true, message: t('message.passwordLoginForm.password.placeholder'), trigger: ['change', 'blur'] },
        { validator: validatePassword, trigger: ['change', 'blur'] }
    ],
    checkedAgreement: [
        { required: true, message: t('message.passwordLoginForm.agreement.required'), trigger: ['change'] },
        { validator: validateAgreement, trigger: ['change'] }
    ]
});

const onFinish = async () => {


    const _formState = await formRef.value.validate()


    if(import.meta.env.VITE_E2E){
        await login({}, _formState)
        return
    }

    let gtResult = null

    try{
        gtResult = await new Promise(async (resolve, reject) => {
        gtPromise.value = { resolve, reject }
        await nextTick()
        captchaObj.value.showCaptcha()

    })
    }catch(err){
        console.log('captcha failed')
    
    }
    

    if (gtResult === null) {
        return
    }


    await login(gtResult, _formState)
    gtResult.value = null
    gtPromise.value = null
    await nextTick()


}

const onFinishFailed = () => {
    console.log('failed')
}


</script>

<template>
    <Form class="text-lg w-full" ref="formRef" @finish="onFinish" @finishFailed="onFinishFailed"
        :model="formState" :rules="rules" autocomplete="on">
        <FormItem name="phoneNumber">
            <PhoneNumberInput  v-model:phoneNumber="formState.phoneNumber" />
        </FormItem>
        <FormItem name="password">
            <PasswordInput v-model:password="formState.password" />
        </FormItem>
        <FormItem>
            <div class="flex flex-col gap-y-2">
                <a-button class="w-full button-style" size="large" type="primary" html-type="submit">{{ t('message.passwordLoginForm.button') }}</a-button>
                <slot />
            </div>
        </FormItem>
        <FormItem name="checkedAgreement">
            <div class="flex items-center justify-center w-full">
                <Agreement v-model:checkedAgreement="formState.checkedAgreement" />
            </div>
        </FormItem>
    </Form>
</template>

<style scoped>
.button-style {
    font-size: 1.041667vw;
    height: 3.13vw;
    line-height: 1.458333vw;
    padding: .625vw;
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