<script setup>

import { Button } from 'ant-design-vue';
import { RouterLink } from 'vue-router';
import ConfigButton from './ConfigButton.vue';
import LoginButton from '../login-register/LoginButton.vue';
import { provide, ref, watchEffect } from 'vue';


const login = ref();

watchEffect(() => {
    login.value = localStorage.getItem('token') ? false:true
})


provide('loginState', login)





</script>

<template>
    <div
    class="sticky top-0 shadow-md z-50 w-full h-[4vw] flex flex-row items-center justify-between pl-[3vw] pr-[5vw] py-[0.5vw] bg-white">
    <div id="logo" class="text-3xl font-semibold text-center font-sans">
        <RouterLink class="flex flex-row items-center gap-x-[1vw]" to="/">
            <img src="/logo.png" alt="logo" class="w-[1.75vw] h-[1.25vw]" />
            <div class="text-[1.375vw] tracking-wide">
                WildCard
            </div>
        </RouterLink>
    </div>
    <div class="w-[5.36vw] h-[2.24vw]">
        <ConfigButton v-if="!login" />
        <LoginButton v-else />
    </div>
</div>
</template>