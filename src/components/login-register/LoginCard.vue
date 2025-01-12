<script setup>

import { ref } from 'vue';
import PasswordLoginForm from './forms/PasswordLoginForm.vue';
import OtpLoginForm from './forms/OtpLoginForm.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const loginType = ref('password')


const handleLoginTypeChange = () => {
    loginType.value = loginType.value === 'password' ? 'phone' : 'password'
}

</script>


<template>
    <div class="py-6 flex flex-col items-center justify-center h-full gap-y-8 w-full">
        <div class=" ">
            <div v-if="loginType === 'password'" class="text-[1.458333vw]">
                {{ t('message.loginModal.passwordTitle') }}
            </div>
            <div v-else class="text-[1.458333vw]">
                  {{ t('message.loginModal.otpTitle') }}
            </div>
        </div>
        <div class="flex flex-col items-center justify-start  w-full  gap-y-10">
            <PasswordLoginForm v-if="loginType === 'password'" class="px-16 ">
                <button @click="handleLoginTypeChange"
                    class="button-style border border-gray-200  hover:bg-slate-200 duration-50">
                    <div v-if="loginType === 'password'">
                        {{ t('message.loginModal.switchToOtp') }}
                    </div>
                    <div v-else>
                        {{ t('message.loginModal.switchToPassword') }}
                    </div>
                </button>
            </PasswordLoginForm>
            <OtpLoginForm v-else>
                <button @click="handleLoginTypeChange"
                    class="button-style border border-gray-200  hover:bg-slate-200 duration-50">
                    <div v-if="loginType === 'password'">
                        {{ t('message.loginModal.switchToOtp') }}
                    </div>
                    <div v-else>
                        {{ t('message.loginModal.switchToPassword') }}
                    </div>
                </button>
            </OtpLoginForm>
        </div>
    </div>
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

</style>