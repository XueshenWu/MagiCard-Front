<script setup>
import { Input } from 'ant-design-vue';
import { ref, computed } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import post from '../../api/post';
import URL from '../../api/api-list';
import { watchEffect } from 'vue';


const userInfo = ref(null);

watchEffect(async () => {
    userInfo.value = (await post(URL.user.userInfo, {}, true)).data
});


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

const handleSubmit = async () => {
    if (validateEmail()) {

        console.log('Email is valid:', email.value);

        const body = {
            newEmailAddress: email.value
        };

        const res = post(URL.user.modifyEmail, body)
        if (!res.err) {
            console.log('Email modified successfully');
            open.value = false;
        } else {
            console.log('Email modification failed');
            open.value = false;
        }

    }
};

const handleCancel = () => {
    email.value = '';
    emailError.value = '';
    open.value = false;
};
</script>
<template>
    <template v-if="!userInfo">
        <div>Loading...</div>

    </template>
    <template v-else>
        <GeneralModal v-model:open="open" width="520px">


            <div class="flex flex-col items-center justify-center gap-y-6 p-8">
                <div class="text-3xl">
                    {{ userInfo.email ? '修改邮箱地址' : '设置邮箱地址' }}
                </div>

                <div class="flex flex-col items-start justify-start w-full">
                    <Input v-model:value="email" placeholder="请输入邮箱地址" class="w-full h-14 " size="large"
                        :error="emailError" @change="validateEmail" />


                    <div class="text-red-500 text-xs">{{ emailError }}</div>
                </div>
                <div class="flex justify-between gap-x-4 w-full text-xl *:py-3 ">
                    <button style="background-color: rgb(238, 238, 238);" class=" w-full   py-2 rounded-xl"
                        @click="handleCancel">取消</button>
                    <button
                        :class="['w-full py-2 rounded-xl ', isValidEmail ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed']"
                        type="primary" @click="handleSubmit">
                        {{ userInfo.email ? '修改邮箱' : '设置邮箱' }}
                    </button>
                </div>
            </div>
            <template #footer></template>
        </GeneralModal>
    </template>
</template>
