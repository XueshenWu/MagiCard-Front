<script setup>
import GeneralModal from '../Modal/GeneralModal.vue';
import { Form, FormItem } from 'ant-design-vue';
import { InputPassword, Input } from 'ant-design-vue';
import { ref, onMounted, reactive, watchEffect } from 'vue';
import { message } from "../Message.js"
import post from '../../api/post.js';
import URL from '../../api/api-list.js';
import { convertGt } from '../../utils/converGt.js'






const userInfo = ref(null);

watchEffect(async () => {
    userInfo.value = (await post(URL.user.userInfo, {}, true)).data
})


const open = defineModel('openResetPasswordModal');

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

const onFinish = async () => {
    const formState_validated = await formRef.value.validateFields()

    const body = {
        smsCode: formState_validated.otp,
        newPassword: formState_validated.password_new,
    }

    const data = await post(URL.user.resetLoginPassword, body, true);
    if (!data.err) {
        message.success('密码重置成功');
        open.value = false;
    } else {
        message.error('密码重置失败');
    }

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

        captcha.onSuccess(async function () {

            const gtResult = captcha.getValidate();



            const body = {
                phone: userInfo.value.phoneNumber,
                geeTest: convertGt(gtResult),
                action: 'login'
            };
            const data = post(URL.user.smsCode, body, true);
            if (!data.err) {
                // message.success('验证码发送成功');
            } else {
                message.error('验证码发送失败');
            }

            //TODO:action type tbd
        });
    });
});
</script>

<template>
    <template v-if="!userInfo">
        <div>
            Loading...
        </div>
    </template>
    <template v-else>
        <GeneralModal v-model:open="open" width="29.1667vw" :mainTitle="userInfo.loginPassword ? '重置密码' : '设置密码'"
            :centered="true">
            <div class="flex flex-col items-center justify-center gap-y-6 w-full px-8 pt-6">
                <Form class="w-full" ref="formRef" :model="formState" :rules="rules" autocomplete="on" @finish="onFinish"
                    name="password_reset_form">
                    <div class="flex flex-col items-center justify-center w-full gap-y-2">
                        <div class="flex flex-col items-center justify-center w-full gap-y-2">
                            <div class="text-[#595a61] py-3 text-xl">
                                请输入您的新登陆密码
                            </div>
                            <FormItem name="password_new">
                                <InputPassword class="input-style" v-model:value="formState.password_new" size="large" />
                            </FormItem>
                        </div>
                        <div class="flex flex-col items-center justify-start w-full gap-y-2">
                            <div class="text-[#595a61] py-3 text-xl">
                                请再次输入您的新登陆密码
                            </div>
                            <FormItem name="password_confirm">
                                <InputPassword class="input-style" v-model:value="formState.password_confirm" size="large" />
                            </FormItem>
                        </div>
                        <div class="flex flex-col items-start justify-start w-full gap-y-2">
                            <div class="flex items-center gap-x-4 text-[#595a61] py-3 text-xl">
                                <span>请输入验证码</span>
                                <span class="text-gray-400 text-xs">
                                    将发送至 +86 {{ userInfo.phoneNumber }}
                                </span>
                            </div>
                            <FormItem name="otp">
                                <div class="flex items-center justify-between gap-x-6 w-full">
                                    <Input v-model:value="formState.otp" placeholder="请输入验证码" size="large"
                                        class="input-style border-radius-custom">
                                        <template #suffix>
                                            <a @click="handleSendOtp" class="text-blue-500 text-[.9375vw]">
                                                获取验证码
                                            </a>
                                        </template>
                                    </Input>
                                </div>
                            </FormItem>
                            <FormItem>
                                <button type="submit" html-type="submit"
                                    class="button-style hover:bg-blue-400 duration-100 rounded-3xl bg-blue-500 text-white">
                                    确认
                                </button>
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </div>
            <template #footer></template>
        </GeneralModal>
    </template>
</template>
<style scoped>
::v-deep(.ant-input-affix-wrapper-lg) {
    padding: 12px 30px !important;
}

.button-style {
    font-size: 1.041667vw;
    height: auto;
    line-height: 1.458333vw;
    padding: .625vw;
    width: 11.666667vw;
    ;
}

.input-style {
    padding: .989583vw 2.03125vw;
}

.border-radius-custom {
    border-radius: .625vw;
}
</style>