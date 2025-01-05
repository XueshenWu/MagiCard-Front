<script setup>
import { Input } from 'ant-design-vue';
import { ref, computed,inject } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import post from '../../api/post';
import URL from '../../api/api-list';
import { watchEffect } from 'vue';
import { message } from '../Message';

const switchSelected = inject('switchSelected')
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

        const res = await post(URL.user.modifyEmail, body)
        if (!res.err) {
            console.log('Email modified successfully');
            message.success('邮箱修改成功');
            open.value = false;
            switchSelected('');
        } else {
            console.log('Email modification failed');
            open.value = false;
            switchSelected('');
        }

    }
};

const handleCancel = () => {
    email.value = '';
    emailError.value = '';
    open.value = false;
    switchSelected('');
};
</script>
<template>
    <template v-if="!userInfo">
        <div>Loading...</div>

    </template>
    <template v-else>
        <GeneralModal v-model:open="open" width="29.1667vw" :centered="true" :mainTitle="userInfo.email ? '修改邮箱地址' : '设置邮箱地址'">
            <div class="flex flex-col items-center justify-center gap-y-6 p-8">
                <div class="flex flex-col items-start justify-start w-full">
                    <Input v-model:value="email" placeholder="请输入邮箱地址" class="w-full input-style " size="large"
                        :error="emailError" @change="validateEmail" />
                    <div class="text-red-500 text-xs">{{ emailError }}</div>
                </div>
                <div class="flex justify-between gap-x-4 w-full *:py-3 ">
                    <button style="background-color: rgb(238, 238, 238);" class=" w-full rounded-xl button-style"
                        @click="handleCancel">取消</button>
                    <button
                        :class="['button-style w-full rounded-xl ', isValidEmail ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed']"
                        type="primary" @click="handleSubmit">
                        {{ userInfo.email ? '修改邮箱' : '设置邮箱' }}
                    </button>
                </div>
            </div>
            <template #footer></template>
        </GeneralModal>
    </template>
</template>
<style scoped>
.button-style {
    font-size: 1.041667vw;
    height: auto;
    line-height: 1.458333vw;
    padding: .625vw;
    width: 100%;
}

.input-style {
    padding: .989583vw 2.03125vw;
    border-radius: .625vw;
}

</style>
