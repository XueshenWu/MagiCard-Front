<script setup>
import { Form, FormItem } from 'ant-design-vue';
import NumberBoxInput from '../NumberBoxInput.vue';
import { ref, onMounted, reactive, watchEffect, inject } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import post from '../../api/post.js';
import URL from '../../api/api-list.js';
import { Input } from 'ant-design-vue';
import { convertGt } from '../../utils/converGt.js';
import { message } from '../Message.js';
const switchSelected = inject('switchSelected')


const formRef = ref(null);
const captchaReady = ref(false);
const captchaObj = ref(null);
const formState = reactive({
    checkoutpwd_new: '',
    checkoutpwd_confirm: '',
    otp: "",
});

const userInfo = ref(null);

watchEffect(async () => {
    userInfo.value = (await post(URL.user.userInfo, {}, true)).data
})




onMounted(async () => {
    await import('../../utils/gt4.js');
    window.initGeetest4({
        captchaId: "3f236c8add769bd4a2b93f2fc6f74b35",
        product: "bind",
    }, function (captcha) {
        captchaObj.value = captcha;

        captcha.onReady(function () {
            captchaReady.value = true;
        });

        captcha.onSuccess(async function () {

            const body = {
                action:"login",
                phone: userInfo.value.phoneNumber,
                geeTest: convertGt(captcha.getValidate()),
            }

            const data = await post(URL.user.smsCode, body)
            if (!data.err) {
                message.success('验证码发送成功');
       
            } else {
                message.error('验证码发送失败');
            }
        });
    });
});



const handleSendOtp = () => {
    if (captchaReady.value) {

        captchaObj.value.showCaptcha();

    }
};



const onFinish = async () => {
    const body = {
        smsCode: formState.otp,
        newPassword: formState.checkoutpwd_new,
    }
    const data = await post(URL.user.resetPaymentPassword, body)
    if (!data.err) {
        message.success('修改成功');
        switchSelected("")
    } else {
        message.error('修改失败');
    }
};

const open = defineModel('openModifyCheckoutPasswordModal');

const validateConfirmPassword = async (rule, value) => {
    if (value !== formState.checkoutpwd_new) {
        throw new Error('两次输入的密码不一致');
    } else if (value === formState.checkoutpwd_old) {
        throw new Error('新密码不能与原密码相同');
    }
    return true;
};

const rules = {

    checkoutpwd_new: [
        { required: true, message: '请输入新支付密码', trigger: 'blur' },
        { len: 6, message: '支付密码必须是6位数字', trigger: 'blur' }
    ],
    checkoutpwd_confirm: [
        { required: true, message: '请再次输入新支付密码', trigger: 'blur' },
        { len: 6, message: '支付密码必须是6位数字', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
    ],
    otp: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { len: 6, message: '验证码必须是6位数字', trigger: 'blur' }
    ]
};
</script>
<template>
    <template v-if="!userInfo">
        <div>
            加载中...
        </div>
    </template>

    <template v-else>
        <GeneralModal v-model:open="open" width="600px">
            <div class="flex flex-col items-center justify-center gap-y-6 px-8 py-8">
                <div>
                    <div class="text-3xl">
                        {{ userInfo.paymentPassword? '修改' : '设置' }}支付密码
                    </div>
                </div>
                <Form ref="formRef" :model="formState" :rules="rules" name="checkout_password_form" @finish="onFinish">


                    <div class="flex flex-col items-center justify-start gap-y-4 w-full">
                        <div class="text-lg text-gray-500">
                            输入新支付密码
                        </div>
                        <FormItem name="checkoutpwd_new">
                            <NumberBoxInput v-model:value="formState.checkoutpwd_new" />
                        </FormItem>
                    </div>

                    <div class="flex flex-col items-center justify-start gap-y-4 w-full">
                        <div class="text-lg text-gray-500">
                            确认新支付密码
                        </div>
                        <FormItem name="checkoutpwd_confirm">
                            <NumberBoxInput v-model:value="formState.checkoutpwd_confirm" />
                        </FormItem>
                    </div>
                    <div class="flex flex-col items-center justify-start gap-y-4 w-full">
                        <FormItem>

                            <div class="flex flex-row items-center justify-between w-full gap-x-6">
                                <Input v-model:value="formState.otp" placeholder="请输入验证码" size="large"
                                    class="ml-6 w-48 h-14" />
                                <a @click="handleSendOtp" class="text-blue-500 text-lg">
                                    获取验证码
                                </a>

                            </div>
                            <div class="mt-4 ml-20 text-gray-500">
                                发送至 +86 {{ userInfo.phoneNumber }}
                            </div>
                        </FormItem>
                    </div>

                    <FormItem>
                        <button type="submit" html-type="submit"
                            class="w-full bg-blue-500 text-white rounded-xl text-xl py-2 h-14 hover:bg-blue-400 duration-100">
                            {{ userInfo.paymentPassword? '修改' : '设置' }}支付密码
                        </button>
                    </FormItem>
                </Form>

            </div>
            <template #footer></template>
        </GeneralModal>
    </template>
</template>