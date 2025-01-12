<script setup>
import LoginCard from './LoginCard.vue';
import RegisterForm from './forms/RegisterForm.vue';
import { ref } from 'vue';
import { inject } from 'vue';

import { useI18n } from 'vue-i18n';


const { t } = useI18n();

const {
    turnOnLight,
    turnOffLight
} = inject('lightSwitch');

const viewType = ref('register')


</script>


<template>
    <div 
    
    @click="()=>turnOffLight()"
    class="py-6 flex flex-col items-center justify-center gap-y-8 w-full">
        <LoginCard v-if="viewType === 'login'" />
        <RegisterForm v-else />
        <div class="flex flex-row w-full items-center justify-center text-[1.197917vw] ">
            <template v-if="viewType === 'login'">
                {{ t('message.loginRegisterSwitch.noAccount') }}
                <a href="#" class="text-blue-500" @click="viewType='register'">{{ t('message.loginRegisterSwitch.goRegister') }}</a>
            </template>
            <template v-else>
                {{ t('message.loginRegisterSwitch.hasAccount') }}<a href="#" class="text-blue-500" @click="viewType='login'">{{ t('message.loginRegisterSwitch.goLogin') }}</a>
            </template>
        </div>

    </div>



</template>