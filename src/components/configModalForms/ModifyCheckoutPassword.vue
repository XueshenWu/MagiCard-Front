<script setup>
import { Form, FormItem } from 'ant-design-vue';
import NumberBoxInput from '../NumberBoxInput.vue';
import { ref, onMounted, reactive } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';

const formRef = ref(null);
const captchaReady = ref(false);
const captchaObj = ref(null);
const formState = reactive({
    checkoutpwd_old: '',
    checkoutpwd_new: '',
    checkoutpwd_confirm: '',
});

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

        captcha.onSuccess(function () {
            formRef.value.validateFields().then(() => {
                const captchaResult = captcha.getValidate();
                console.log('Form values:', formState);
       
                formRef.value.resetFields();
            });
        });
    });
});

const onFinish = () => {
    if (captchaReady.value) {
        captchaObj.value.showCaptcha();
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
    checkoutpwd_old: [
        { required: true, message: '请输入原支付密码', trigger: 'blur' },
        { len: 6, message: '支付密码必须是6位数字', trigger: 'blur' }
    ],
    checkoutpwd_new: [
        { required: true, message: '请输入新支付密码', trigger: 'blur' },
        { len: 6, message: '支付密码必须是6位数字', trigger: 'blur' }
    ],
    checkoutpwd_confirm: [
        { required: true, message: '请再次输入新支付密码', trigger: 'blur' },
        { len: 6, message: '支付密码必须是6位数字', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
    ],
};
</script>

<template>
    <GeneralModal v-model:open="open" width="600px">
        <div class="flex flex-col items-center justify-center gap-y-6 px-8 py-8">
            <div>
                <div class="text-3xl">
                    修改支付密码
                </div>
            </div>
            <Form 
                ref="formRef" 
                :model="formState" 
                :rules="rules" 
                name="checkout_password_form"
                @finish="onFinish"
            >
                <div class="flex flex-col items-center justify-start gap-y-4 w-full">
                    <div class="text-lg text-gray-500">
                        输入您的原支付密码
                    </div>
                    <FormItem name="checkoutpwd_old">
                        <NumberBoxInput class="" v-model:value="formState.checkoutpwd_old" />
                    </FormItem>
                </div>

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

                <FormItem>
                    <button 
                        type="submit"
                        html-type="submit"
                        class="w-full bg-blue-500 text-white rounded-xl text-xl py-2 h-14 hover:bg-blue-400 duration-100"
                    >
                        确认修改
                    </button>
                </FormItem>
            </Form>
            <a class="text-blue-500 cursor-pointer">
                忘记支付密码
            </a>
        </div>
        <template #footer></template>
    </GeneralModal>
</template>