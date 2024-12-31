<script setup>
import CustomModal from '../CustomModal.vue';
import { Form, FormItem } from 'ant-design-vue';
import { InputPassword, Input } from 'ant-design-vue';
import { ref, onMounted, reactive } from 'vue';
import { message } from 'ant-design-vue';

const open = defineModel('openResetPasswordModal');
const phoneNumber = ref('13800000000');
const formRef = ref(null);
const captchaReady = ref(false);
const captchaObj = ref(null);
const formState = reactive({
    password_new: '',
    password_confirm: '',
    otp: '',
});

const validateConfirmPassword = async (rule, value) => {
    if (value !== formState.password_new) {
        throw new Error('两次输入的密码不一致');
    }
};

const rules = {
    password_new: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能小于8位', trigger: 'blur' },
        { pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/, message: '密码必须包含字母和数字', trigger: 'blur' }
    ],
    password_confirm: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
    ],
    otp: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { len: 6, message: '验证码必须是6位数字', trigger: 'blur' },
        { pattern: /^\d+$/, message: '验证码必须是数字', trigger: 'blur' }
    ],
};

const handleSendOtp = () => {
    if (captchaReady.value) {
        captchaObj.value.showCaptcha();
    }
};

const onFinish = () => {
    formRef.value.validateFields().then(() => {
        console.log('Form values:', formState);
        // Add your API call here
        // const submitData = {
        //     newPassword: formState.password_new,
        //     otp: formState.otp,
        //     phoneNumber: phoneNumber.value,
        //     captchaResult: captchaObj.value?.getValidate()
        // };
        message.success('密码重置成功');
        open.value = false;
    });
};

onMounted(async () => {
    await import('../../utils/gt4.js')
    window.initGeetest4({
        captchaId: "7ca96590f151feb5236f2a3227dc99db",
        product: "bind",
    }, function (captcha) {
        captchaObj.value = captcha;

        captcha.onReady(function () {
            captchaReady.value = true;
        });

        captcha.onSuccess(function () {
            console.log('send otp');
            message.success('验证码发送成功');
        });
    });
});
</script>

<template>
    <CustomModal v-model:open="open" width="480px">
        <div class="flex flex-col items-center justify-center gap-y-6 w-full px-8">
            <div class="text-xl">
                重置登陆密码
            </div>
            <Form 
                ref="formRef" 
                :model="formState" 
                :rules="rules" 
                autocomplete="on"
                @finish="onFinish"
                name="password_reset_form"
            >
                <div class="flex flex-col items-center justify-center w-full gap-y-2">
                    <div class="flex flex-col items-start justify-center w-full gap-y-2">
                        <div>
                            请输入您的新登陆密码
                        </div>
                        <FormItem name="password_new">
                            <InputPassword class="w-72" v-model:value="formState.password_new" size="large" />
                        </FormItem>
                    </div>
                    <div class="flex flex-col items-start justify-start w-full gap-y-2">
                        <div>
                            请再次输入您的新登陆密码
                        </div>
                        <FormItem name="password_confirm">
                            <InputPassword class="w-72" v-model:value="formState.password_confirm" size="large" />
                        </FormItem>
                    </div>
                    <div class="flex flex-col items-start justify-start w-full gap-y-2">
                        <div class="flex items-center gap-x-4">
                            <span>请输入验证码</span>
                            <span class="text-gray-400 text-xs">
                                将发送至 +86 {{ phoneNumber }}
                            </span>
                        </div>
                        <FormItem name="otp">
                            <div class="flex items-center justify-between gap-x-6 h-12 w-full">
                                <Input class="w-48" v-model:value="formState.otp" size="large" />
                                <a class="text-blue-500 text-xs" @click="handleSendOtp" v-if="captchaReady">
                                    获取验证码
                                </a>
                                <span v-else class="text-gray-500 text-xs">
                                    请稍候
                                </span>
                            </div>
                        </FormItem>
                        <FormItem>
                            <button 
                                type="submit"
                                html-type="submit"
                                class="w-72 py-2 hover:bg-blue-400 duration-100 rounded-md bg-blue-500 text-white"
                            >
                                确认
                            </button>
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
        <template #footer></template>
    </CustomModal>
</template>