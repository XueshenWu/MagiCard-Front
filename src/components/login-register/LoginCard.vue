<script setup>

import { ref } from 'vue';
import PasswordLoginForm from './forms/PasswordLoginForm.vue';
import OtpLoginForm from './forms/OtpLoginForm.vue';


const loginType = ref('password')


const handleLoginTypeChange = () => {
    loginType.value = loginType.value === 'password' ? 'phone' : 'password'
}

</script>


<template>
    <div class="py-6 flex flex-col items-center justify-center h-full gap-y-8 w-full">
        <div class=" ">
            <div v-if="loginType === 'password'" class="text-[1.458333vw]">
                密码登录
            </div>
            <div v-else class="text-[1.458333vw]">
                手机验证码登录
            </div>
        </div>
        <div class="flex flex-col items-center justify-start  w-full  gap-y-10">


            <PasswordLoginForm v-if="loginType === 'password'" class="px-16 ">
                <button @click="handleLoginTypeChange"
                    class="button-style   border border-gray-200 rounded-md *:text-xl py-2 w-full hover:bg-slate-200 duration-50">

                    <div v-if="loginType === 'password'">
                        使用手机验证码登录
                    </div>

                    <div v-else>
                        使用密码登录
                    </div>

                </button>
            </PasswordLoginForm>
            <OtpLoginForm v-else>
                <button @click="handleLoginTypeChange"
                    class="button-style border border-gray-200 rounded-md *:text-xl py-2 w-full hover:bg-slate-200 duration-50">

                    <div v-if="loginType === 'password'">
                        使用手机验证码登录
                    </div>

                    <div v-else>
                        使用密码登录
                    </div>
                </button>
            </OtpLoginForm>





        </div>

    </div>




</template>

<style scoped>

.button-style {
    font-size: 1.041667vw;
    height: auto;
    line-height: 1.458333vw;
    padding: .625vw;
    width: 100%;
    border-radius: 0.625vw;
}
</style>