<script setup>
import PasswordInput from './PasswordInput.vue';
import PhoneNumberInput from './PhoneNumberInput.vue';
import { ref } from 'vue';
import OtpInput from './OtpInput.vue';
import Agreement from './Agreement.vue';

const loginType = ref('password')
const phoneNumber = ref('')
const credential = ref('')
const phoneNumberValidated = ref(false)
const checkedAgreement = ref(false)

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
                <button class="w-full bg-blue-500 hover:bg-blue-400 duration-100 text-white rounded-md py-2">
                    登录
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