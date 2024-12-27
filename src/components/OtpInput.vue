<script setup>
import { Input, message } from 'ant-design-vue';




const otp = defineModel()

const [messageApi, contextHolder] = message.useMessage();

const {phoneNumberValidated}  = defineProps(['phoneNumberValidated'])

 

const handleClick = () => {

    if (!phoneNumberValidated) {
        messageApi.error('请输入正确的手机号码')
        console.log('请输入正确的手机号码')
       
        return
    }
    console.log('获取验证码')
    messageApi.success('验证码已发送')
}


</script>

<template>
   
    <div class="flex items-center justify-between gap-x-2 h-12">
        <contextHolder />
        <Input placeholder="请输入短信验证码" class="h-10 w-48" v-model:value="otp" />
        <a href="#" class="text-blue-500 text-xs" @click="handleClick">获取验证码</a>
    </div>

</template>