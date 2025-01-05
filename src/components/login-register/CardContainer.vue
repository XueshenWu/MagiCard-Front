<script setup>
import LoginCard from './LoginCard.vue';
import RegisterForm from './forms/RegisterForm.vue';
import { ref } from 'vue';


const viewType = ref('register')


</script>


<template>
    <div class="py-6 flex flex-col items-center justify-center gap-y-8 w-full">
        <LoginCard v-if="viewType === 'login'" />
        <RegisterForm v-else />
        <div class="flex flex-row w-full items-center justify-center text-[1.197917vw] ">
            <template v-if="viewType === 'login'">
                我还没有账户<a href="#" class="text-blue-500" @click="viewType='register'">去注册</a>
            </template>
            <template v-else>
                我有账户<a href="#" class="text-blue-500" @click="viewType='login'">去登录</a>
            </template>
        </div>

    </div>



</template>