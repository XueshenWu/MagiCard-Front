<script setup>
import LoginCard from './LoginCard.vue';
import RegisterForm from './RegisterForm.vue';
import { ref } from 'vue';


const viewType = ref('register')


</script>


<template>
    <div class="py-6 flex flex-col items-center justify-center gap-y-8">
        <LoginCard v-if="viewType === 'login'" />
        <RegisterForm v-else />
        <div class="flex flex-row w-full items-center justify-end ">
            <template v-if="viewType === 'login'">
                没有账号？<a href="#" class="text-blue-500" @click="viewType='register'">立即注册</a>
            </template>
            <template v-else>
                已有账号？<a href="#" class="text-blue-500" @click="viewType='login'">立即登录</a>
            </template>
        </div>

    </div>



</template>