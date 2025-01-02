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
        <div class="text-3xl font-light ">
            <div v-if="loginType === 'password'">
                密码登录
            </div>
            <div v-else>
                手机验证码登录
            </div>
        </div>
        <div class="flex flex-col items-center justify-start  w-full  gap-y-10">


            <PasswordLoginForm v-if="loginType === 'password'" class="px-16 ">
                <button @click="handleLoginTypeChange"
                    class="border border-gray-200 rounded-md *:text-xl py-2 w-full hover:bg-slate-200 duration-50">

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
                    class="border border-gray-200 rounded-md *:text-xl py-2 w-full hover:bg-slate-200 duration-50">

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