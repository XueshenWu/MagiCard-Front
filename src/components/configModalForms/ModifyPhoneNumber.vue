<script setup>
import { reactive, ref, onMounted, watchEffect,inject } from 'vue';
import { Form, FormItem, Input } from 'ant-design-vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { message } from '../Message.js';
import post from '../../api/post.js';
import URL from '../../api/api-list.js';
import { convertGt } from '../../utils/converGt.js'


const step = ref(2);

const formRef = ref(null);
const captchaReady = ref(false);
const captchaObj = ref(null);
const open = defineModel('openModifyPhoneNumberModal');
const divInputRef = ref(null);
const userInfo = ref(null);
const switchSelected = inject('switchSelected')
watchEffect(async () => {
    userInfo.value = (await post(URL.user.userInfo, {}, true)).data
})




const handleSendOtp = () => {
    if (captchaReady.value) {

        const _phonenumber = step.value === 1 ? userInfo.value.phoneNumber : divInputRef.value.innerText.trim();
        if (step.value !== 1) {
            formState.phoneNumber_new = divInputRef.value.innerText.trim()
        }
        if (!validatePhoneNumber(_phonenumber)) {
            message.error('请输入正确的手机号');
            return;
        } else {
            captchaObj.value.showCaptcha();
        }

    }
};

const formState = reactive({
    otp_old: '',
    phoneNumber_new: '',
    otp_new: '',
})

const handleChange = (e) => {
    formState.phoneNumber_new = e.target.value;
}

const finishModify = async () => {
    const body = {
        smsCode: formState.otp_new,
        phoneNumber: formState.phoneNumber_new,
    }

    if(!formState.otp_new){
        message.error('请输入验证码');
        return;
    }
    if(!formState.phoneNumber_new || !validatePhoneNumber(formState.phoneNumber_new)){
        message.error('请输入正确的手机号码');
        return;
    }

    const data = await post(URL.user.modifyPhoneNumber, body)
  
    if (!data.err) {
        message.success('修改成功');
        open.value = false;
        switchSelected('');
    } else {
        message.error('修改失败');
    }
}

const validatePhoneNumber = (phonenumber) => {
    return /^1[3456789]\d{9}$/.test(phonenumber)
}

const toStep2 = async () => {


    if(!formState.otp_old){
        message.error('请输入验证码');
        return;
    }

    const body = {
        smsCode: formState.otp_old,
        phoneNumber: userInfo.value.phoneNumber,
    }

    const data = await post(URL.user.checkCurrentNumber, body)
    if (!data.err) {
        step.value = 2;
    } else {
        message.error(data.msg);
    }


    step.value = 2;
}




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
                phone: step.value === 1 ? userInfo.value.phoneNumber : formState.phoneNumber_new,
                geeTest: convertGt(gtResult),
                action: 'changePhoneNumber'
            };


            const data = await post(URL.user.smsCode, body, true);
            if (!data.err) {
                message.success('验证码发送成功');
            } else {
                message.error('验证码发送失败');
            }
        });
    });
});

</script>


<template>
    <GeneralModal v-if="userInfo" v-model:open="open" width="29.1667vw" mainTitle="修改手机号"
        :subTitle="step === 1 ? '请先验证当前登录手机号' : '请验证新手机号'" :centered="true">
        <div class="p-8 gap-y-12  flex flex-col items-center justify-center">
            <Form class="w-full">
                <div class="w-full space-y-8">
                    <template v-if="step === 1">
                        <div class="flex flex-col items-start w-full gap-y-4">
                            <div class="text-gray-500">
                                手机号
                            </div>
                            <div
                                class="input-style cursor-not-allowed py-4 w-full flex flex-row justify-between border-radius-custom border text-xl border-gray-300 ">
                                <div class="text-gray-300 font-bold text-center pr-6 border-r border-gray-400">
                                    +86
                                </div>
                                <div class="w-full px-8 font-semibold ">
                                    {{ userInfo.phoneNumber }}
                                </div>
                            </div>
                        </div>
                        <FormItem>
                            <div class="text-gray-500 mb-4">
                                验证码
                            </div>
                            <div class="flex flex-row items-center justify-between w-full gap-x-4">
                                <Input v-model:value="formState.otp_old" placeholder="请输入验证码" size="large"
                                    class="input-style border-radius-custom">
                                    <template #suffix>
                                        <a @click="handleSendOtp" class="text-blue-500 text-[.9375vw]">
                                            获取验证码
                                        </a>
                                    </template>
                                </Input>
                            </div>
                        </FormItem>
                    </template>

                    <template v-if="step === 2">
                        <FormItem>
                            <div class="flex flex-col items-start justify-center w-full gap-y-4 ">
                                <div class="text-gray-500">
                                    手机号
                                </div>
                                <div
                                    class=" input-style border-radius-custom py-4 w-full flex flex-row items-center justify-between border-radius-custom border text-xl border-gray-300 ">
                                    <div class="text-gray-300 font-bold text-left pr-8 border-r border-gray-400">
                                        +86
                                    </div>
                                    <div ref="divInputRef" @change="handleChange"
                                        class=" font-semibold p-3 px-8 rounded outline-none w-full focus:outline-none focus:ring-0 "
                                        contenteditable>
                                        {{ formState.phoneNumber_new }}
                                    </div>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem>
                            <div class="text-gray-500 mb-4">
                                验证码
                            </div>
                            <div class="flex flex-row items-center justify-between w-full gap-x-4">
                                <Input v-model:value="formState.otp_new" placeholder="请输入验证码" size="large"
                                    class="input-style border-radius-custom">
                                    <template #suffix>
                                        <a @click="handleSendOtp" class="text-blue-500 text-[.9375vw]">
                                            获取验证码
                                        </a>
                                    </template>
                                </Input>
                            </div>
                        </FormItem>
                    </template>

                    <div class="flex flex-row justify-between w-full text-xl gap-x-4 ">
                        <button v-show="step === 1" @click="open = false"
                            class="button-style bg-gray-200 rounded-xl">取消</button>
                        <button @click="toStep2" v-show="step === 1"
                            class="button-style text-white bg-blue-500 rounded-xl">
                            下一步
                        </button>
                        <button v-show="step === 2" @click="step = 1"
                            class="text-white bg-blue-500 rounded-xl button-style">
                            上一步
                        </button>
                        <button @click="finishModify" v-show="step === 2"
                            class="text-white bg-blue-500 rounded-xl button-style">
                            完成
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    </GeneralModal>
    <div v-else>
        加载中...
    </div>
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
    height: 3.39vw;

    font-size: .9375vw;

}

.border-radius-custom{
    border-radius: .625vw;
}
</style>
