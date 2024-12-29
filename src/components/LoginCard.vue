<script setup>
import PasswordInput from './PasswordInput.vue';
import PhoneNumberInput from './PhoneNumberInput.vue';
import { ref, onMounted } from 'vue';
import OtpInput from './OtpInput.vue';
import Agreement from './Agreement.vue';



const captchaReady = ref(false)
const captchaObj = ref(null)

async function login() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 100)
    })
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
            login().then(() => {
                alert('success')
            })
        })

        captcha.onClose(function () {
            
        })

        captcha.onFail(function () {
         
        })


    })
})

const loginType = ref('password')
const phoneNumber = ref('')
const credential = ref('')
const phoneNumberValidated = ref(false)
const checkedAgreement = ref(false)
const handleLogin = () => {

    if (!captchaReady) {
        return
    } else {
        captchaObj.value.showCaptcha()
    }
}

const handleLoginTypeChange = () => {
    loginType.value = loginType.value === 'password' ? 'phone' : 'password'
}

</script>


<template>
    <div class="flex flex-col items-center justify-center h-full gap-y-8">
        <div class="text-xl font-light ">
            <div v-if="loginType === 'password'">
                密码登录
            </div>
            <div v-else>
                手机验证码登录
            </div>

        </div>
        <div class="flex flex-col items-center justify-start   gap-y-10">

            <div class="flex flex-col items-center justify-self-start gap-y-4 [&>*]:w-72">
                <PhoneNumberInput v-model:phoneNumber="phoneNumber"
                    v-model:phoneNumberValidated="phoneNumberValidated" />

                <PasswordInput v-model:password="credential" v-if="loginType === 'password'" />
                <OtpInput :phoneNumberValidated v-model:otp="credential" v-else />


            </div>

            <div class="[&>*]:w-72 flex flex-col items-center justify-center gap-y-4">
                <button @click="handleLogin"
                    :class="`w-full ${captchaReady?' bg-blue-500 hover:bg-blue-400  text-white':'bg-gray-100 text-gray-400 cursor-wait'} duration-100 rounded-md py-2`">
                    {{ captchaReady ? '登录' : '加载中' }}
                </button>

                <button @click="handleLoginTypeChange"
                    class="border border-gray-200 rounded-md py-2 w-full hover:bg-slate-200 duration-50">

                    <div v-if="loginType === 'password'">
                        使用手机验证码登录
                    </div>

                    <div v-else>
                        使用密码登录
                    </div>

                </button>

            </div>

            <Agreement v-model:checkedAgreement="checkedAgreement" />

        </div>

    </div>




</template>