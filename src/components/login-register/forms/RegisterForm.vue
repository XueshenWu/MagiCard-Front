<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import PhoneNumberInput from '../../PhoneNumberInput.vue'
import Agreement from '../Agreement.vue'
import { Form, FormItem, Input } from 'ant-design-vue'
import { message } from '../../Message.js'
import { convertGt } from '../../../utils/converGt.js'
import post from '../../../api/post.js'
import URL from '../../../api/api-list.js'
import { modalStore } from '../../../states/modalStore.js'
import { useRoute } from 'vue-router'
import { getClientToken } from '../../../utils/clientToken.js'
import { yetAnotherStore } from '../../../states/yastore.js'

import { useI18n } from 'vue-i18n'
import { Crisp } from 'crisp-sdk-web'
// import { Crisp } from '../../../cws'

const cooldown = ref(0);
const cooldownClass = ref('text-gray-500 cursor-not-allowed');
const readyClass = ref('text-blue-500');

const { t } = useI18n()
const loginState = inject('loginState')

const {
    turnOnLight,
    turnOffLight
} = inject('lightSwitch');

const formRef = ref(null)
const router = useRouter()
const captchaReady = ref(false)
const captchaObj = ref(null)
const route = useRoute()




const closeModal = inject('closeLoginRegisterModal');

const formState = reactive({
    phoneNumber: '',
    otp: '',
    checkedAgreement: false
})

const validatePhoneNumberSync = (value) => {
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(value)
}

const validatePhoneNumber = async (_rule, value) => {
    if (!value) {
        return Promise.resolve()
    }
    const res = validatePhoneNumberSync(value)
    if (!res) {
        return Promise.reject(t('message.registerForm.validationRegister.invalidPhone'))
    }
    return Promise.resolve()
}

const validateOtp = async (_rule, value) => {
    if (!value) {
        return Promise.resolve()
    }
    if (value.length !== 6) {
        return Promise.reject(t('message.registerForm.validationRegister.invalidCode'))
    }
    return Promise.resolve()
}

const validateAgreement = async (_rule, value) => {
    if (!value) {
        return Promise.reject(t('message.registerForm.validationRegister.agreementRequired'))
    }
    return Promise.resolve()
}

const rules = {
    phoneNumber: [
        { required: true, message: t('message.registerForm.validationRegister.phoneRequired'), trigger: ['change', 'blur'] },
        { validator: validatePhoneNumber, trigger: ['change', 'blur'] }
    ],
    otp: [
        { required: true, message: t('message.registerForm.validationRegister.codeRequired'), trigger: ['change', 'blur'] },
        { validator: validateOtp, trigger: ['change', 'blur'] }
    ],
    checkedAgreement: [
        { required: true, message: t('message.registerForm.validationRegister.agreementRequired'), trigger: ['change'] },
        { validator: validateAgreement, trigger: ['change'] }
    ]
}

const onFinish = () => {
    formRef.value
        .validate()
        .then(() => {
            register()
        })
        .catch(() => {
            console.log('error')
        })
}

const onFinishFailed = () => {
    console.log('failed')
}

const register = async () => {
    // console.log(`formState ${JSON.stringify(formState)}`)


    const body = {
        phone: formState.phoneNumber,
        code: formState.otp,
        inviteCode: route.query.refId ?? ""
    }


    const res = await post(URL.user.register, body, false)
    cooldown.value = 30;
    const timer = setInterval(() => {
        cooldown.value--;
        if (cooldown.value <= 0) {
            clearInterval(timer);
            cooldown.value = 0;
        }
    }, 1000)
    if (!res.err) {
        router.replace('/')

        localStorage.setItem('token', res.data.token);
       
       const userCard = res.data.userCard;
       const clientToken = getClientToken(userCard.userId);

       Crisp.setTokenId(clientToken);

       Crisp.load();

    //    window.location.reload();
        message.registerForm.success(t('message.notifications.registerSuccess'))


        yetAnotherStore.isLoggedIn = true;

        const res_userinfo = await post(URL.user.userInfo, {}, true)
        if (!res.err) {
            const userInfo = res_userinfo.data;
            if (!userInfo.loginPassword) {
                yetAnotherStore.shouldShowResetPassword = true;
            }
        }



    }

    formRef.value.resetFields()
    turnOnLight()
    loginState.value = false
    closeModal()

}

const handleSendOtp = () => {


    if (cooldown.value > 0) {
        return
    }

    const res = validatePhoneNumberSync(formState.phoneNumber)
    if (!res) {
        message.error(t('message.registerForm.validationRegister.invalidPhone'))
        return
    } else {
        captchaObj.value?.showCaptcha()
    }
}

// Initialize CAPTCHA
onMounted(async () => {
    await import('../../../utils/gt4.js')
    window.initGeetest4({
        captchaId: "7ca96590f151feb5236f2a3227dc99db",
        product: "bind",
    }, function (captcha) {
        captchaObj.value = captcha

        captcha.onReady(function () {
            captchaReady.value = true
        })

        captcha.onSuccess(async function () {




            const gtResult = captcha.getValidate()


            const body = {
                phone: formState.phoneNumber,
                geeTest: convertGt(gtResult),
                action: 'register',
                phoneCode: '+86'
            }

            const data = await post(URL.user.smsCode, body, false)
            if (!data.err) {
                message.success(t('message.registerForm.notifications.codeSent'))

            }
            else {
                message.error(t('message.registerForm.notifications.codeSendFailed'))
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
</script>


<template>
    <div class="flex flex-col items-center justify-center h-full gap-y-8 w-full px-12 py-6">
        <div class="text-[1.458333vw] ">
            {{ t('message.registerForm.enterPhoneAndCode') }}
        </div>

        <Form ref="formRef" @finish="onFinish" @finishFailed="onFinishFailed" :model="formState" :rules="rules"
            autocomplete="on" class="flex flex-col items-center  w-full">
            <div class=" w-full">
                <FormItem name="phoneNumber" class="w-full">
                    <PhoneNumberInput v-model:phoneNumber="formState.phoneNumber" />
                </FormItem>

                <FormItem name="otp" class="w-full">
                    <div class="flex items-center justify-between gap-x-2   w-full">
                        <Input v-model:value="formState.otp" :placeholder="t('message.registerForm.enterCode')" size="large"
                            class="input-style border-radius-custom">
                        <template #suffix>
                            <a @click="handleSendOtp"
                                :class="`${cooldown > 0 ? cooldownClass : readyClass} text-[.9375vw]`">
                                {{ cooldown > 0 ? `${cooldown}s` : t('message.registerForm.getCode') }}
                            </a>
                        </template>
                        </Input>
                    </div>

                </FormItem>

                <FormItem class="w-full">
                    <button htmlType="submit"
                        class="button-style w-full text-xl bg-blue-500 hover:bg-blue-400 duration-100 text-white rounded-xl py-3">
                        {{ t('message.registerForm.submit') }}
                    </button>
                </FormItem>

                <FormItem name="checkedAgreement" class="w-full">
                    <div class="flex items-center justify-center w-full">
                        <Agreement v-model:checkedAgreement="formState.checkedAgreement" />
                    </div>

                </FormItem>
            </div>
        </Form>

        <div class="text-[.625vw] font-light">
            <p>{{ t('message.registerForm.privacy.dataHandling') }}</p>
            <p>{{ t('message.registerForm.privacy.dataAnswer') }}</p>
            <p>{{ t('message.registerForm.privacy.advertising') }}</p>
            <p>{{ t('message.registerForm.privacy.advertisingAnswer') }}</p>
        </div>
    </div>
</template>


<style scoped>
.button-style {
    font-size: 1.041667vw;
    height: 3.13vw;
    line-height: 1.458333vw;
    padding: .625vw;

    ;
}

.input-style {
    padding: .989583vw 2.03125vw;
    height: 3.39vw;

    font-size: .9375vw;

}

::v-deep(.ant-form-item) {
    margin-bottom: 1.875vw !important;
}

.border-radius-custom {
    border-radius: .625vw;
}
</style>
