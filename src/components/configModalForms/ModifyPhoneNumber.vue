<script setup>
import { reactive, ref, onMounted } from 'vue';
import { Form, FormItem, Input } from 'ant-design-vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { message } from '../Message.js';


const step = ref(1);

const formRef = ref(null);
const captchaReady = ref(false);
const captchaObj = ref(null);
const open = defineModel('openModifyPhoneNumberModal');

const phoneNumber = ref('13800000000');

const handleSendOtp = () => {
    if (captchaReady.value) {
        captchaObj.value.showCaptcha();
    }
};

const formState = reactive({
    otp_old: '',
    phoneNumber_new: '',
    otp_new: '',
})

const toStep2 = () => {
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

        captcha.onSuccess(function () {
            console.log('send otp');
            message.success('验证码发送成功');
        });
    });
});

</script>


<template>
    <GeneralModal v-model:open="open" width="610px">
        <div class="p-8 gap-y-12  flex flex-col items-center justify-center">

            <div class="text-center flex flex-col gap-y-4">
                <div class="text-3xl">
                    修改手机号
                </div>
                <div class="text-lg text-gray-500">
                    {{ step === 1 ? '请先验证当前登录手机号' : '请验证新手机号' }}
                </div>

            </div>
            <Form>

                <div class="w-[438px] space-y-8">


                    <template v-if="step === 1">
                        <div class="flex flex-col items-start w-full gap-y-4">
                            <div class="text-gray-500">
                                手机号
                            </div>
                            <div
                                class=" h-16 cursor-not-allowed py-4 w-full flex flex-row justify-between rounded-xl border text-xl border-gray-300 ">
                                <div class="text-gray-300 font-bold text-center px-6 border-r border-gray-400">
                                    +86
                                </div>
                                <div class="w-full px-8 font-semibold ">
                                    {{ phoneNumber }}
                                </div>
                            </div>
                        </div>

                        <FormItem>
                            <div class="text-gray-500 mb-4">

                                验证码
                            </div>
                            <div class="flex flex-row items-center justify-between w-full gap-x-4">
                                <Input v-model:value="formState.otp_old" placeholder="请输入验证码" size="large"
                                    class="w-60 h-14" />
                                <a @click="handleSendOtp" class="text-blue-500 text-lg">
                                    获取验证码
                                </a>
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
                                    class=" h-16 py-4 w-full flex flex-row items-center justify-between rounded-xl border text-xl border-gray-300 ">
                                    <div class="text-gray-300 font-bold text-center px-6 border-r border-gray-400">
                                        +86
                                    </div>
                                    <div class=" font-semibold p-3 px-8 rounded outline-none w-full focus:outline-none focus:ring-0 "
                                        contenteditable>
                                        {{ phoneNumber }}
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
                                    class="w-60 h-14" />
                                <a @click="handleSendOtp" class="text-blue-500 text-lg">
                                    获取验证码
                                </a>
                            </div>
                        </FormItem>
                    </template>

                    <div class="flex flex-row justify-between w-full text-xl gap-x-4 ">
                        <button v-show="step === 1" @click="open = false"
                            class=" py-4 w-full bg-gray-200 rounded-xl">取消</button>
                        <button @click="toStep2" v-show="step === 1"
                            class=" py-4 w-full text-white bg-blue-500 rounded-xl">
                            下一步
                        </button>
                        <button v-show="step === 2" @click="step = 1"
                            class="text-white py-4 w-full bg-blue-500 rounded-xl">
                            上一步
                        </button>
                        <button @click="open = false" v-show="step === 2"
                            class="text-white py-4 w-full bg-blue-500 rounded-xl">
                            完成
                        </button>
                    </div>
                </div>
            </Form>


        </div>



    </GeneralModal>


</template>
