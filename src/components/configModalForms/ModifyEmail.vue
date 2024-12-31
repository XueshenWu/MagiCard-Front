<script setup>
import { Input } from 'ant-design-vue';
import { ref, computed } from 'vue';
import CustomModal from '../CustomModal.vue';

const email = ref('');
const emailError = ref('');

const open = defineModel('openModifyEmailModal')

const isValidEmail = computed(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
});

const validateEmail = () => {
    if (!email.value) {
        emailError.value = '请输入邮箱地址';
        return false;
    }
    if (!isValidEmail.value) {
        emailError.value = '请输入正确的邮箱格式';
        return false;
    }
    emailError.value = '';
    return true;
};

const handleSubmit = () => {
    if (validateEmail()) {
        // Submit logic here
        console.log('Email is valid:', email.value);
    }
};

const handleCancel = () => {
    email.value = '';
    emailError.value = '';
    open.value = false;
};
</script>

<template>
    <CustomModal v-model:open="open" width="420px">


        <div class="flex flex-col items-center justify-center gap-y-6  px-8">
            <div class="text-xl">
                修改邮箱
            </div>

            <div class="flex flex-col items-start justify-start w-full">
                <Input v-model:value="email" placeholder="请输入邮箱地址" class="w-full" size="large" :error="emailError"
                    @change="validateEmail" />


                <div class="text-red-500 text-xs">{{ emailError }}</div>
            </div>
            <div class="flex justify-between gap-x-4 w-full">
                <button  
                style="background-color: rgb(238, 238, 238);"
                class=" w-full   py-2 rounded-md" @click="handleCancel">取消</button>
                <button
                    :class="['w-full py-2 rounded-md ', isValidEmail ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed']"
                    type="primary" @click="handleSubmit">确认修改</button>
            </div>
        </div>
        <template #footer></template>
    </CustomModal>
</template>
