<script setup>
import OtpInput from './OtpInput.vue';
import PhoneNumberInput from './PhoneNumberInput.vue';
import { ref } from 'vue'
import Agreement from './Agreement.vue';

const phoneNumber = ref('')
const phoneNumberValidated = ref(false)
const otp = ref('')
const checkedAgreement = ref(false)

</script>



<template>
    <div class="flex flex-col items-center justify-center h-full gap-y-8">

        <div class="text-xl font-light ">
            输入手机号及验证码
        </div>
        <div class="flex flex-col items-center justify-self-start gap-y-4 [&>*]:w-72">

            <PhoneNumberInput v-model:phoneNumber="phoneNumber" v-model:phoneNumberValidated="phoneNumberValidated" />


            <OtpInput :phoneNumberValidated v-model:otp="otp" />
        </div>

        <div class="[&>*]:w-72 flex flex-col items-center justify-center gap-y-4">
            <button class="w-full bg-blue-500 hover:bg-blue-400 duration-100 text-white rounded-md py-2">
                提交注册
            </button>
            <Agreement v-model:checkedAgreement="checkedAgreement" />
        </div>

        <div class="text-[9px] font-light [&>*:nth-child(odd)]:text-blue-500 items-start flex flex-col gap-y-1">

            <p>
                我的个人信息是如何被处理的？
            </p>
            <p >
                您的所有数据都是加密存储的，我们不会出售您的信息。
            </p>
            <p>
                我的联系信息会被用于广告吗？
            </p>
            <p>
                我们只会通过您的联系方式向您告知交易相关的信息。
            </p>
        </div>



    </div>



</template>