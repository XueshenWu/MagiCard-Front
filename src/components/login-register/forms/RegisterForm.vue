<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import PhoneNumberInput from '../../PhoneNumberInput.vue'
import Agreement from '../Agreement.vue'
import { Form, FormItem, Input} from 'ant-design-vue'
import { message } from '../../Message.js'

const formRef = ref(null)
const router = useRouter()
const captchaReady = ref(false)
const captchaObj = ref(null)


const closeModal = inject('closeLoginRegisterModal');

const formState = reactive({
    phoneNumber: '',
    otp: '',
    checkedAgreement: false
})

const validatePhoneNumberSync = (value) => {
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(value)
}

const validatePhoneNumber = async (_rule, value) => {
    if (!value) {
        return Promise.resolve()
    }
    const res = validatePhoneNumberSync(value)
    if (!res) {
        return Promise.reject('请输入有效的手机号码')
    }
    return Promise.resolve()
}

const validateOtp = async (_rule, value) => {
    if (!value) {
        return Promise.resolve()
    }
    if (value.length !== 6) {
        return Promise.reject('请输入6位验证码')
    }
    return Promise.resolve()
}

const validateAgreement = async (_rule, value) => {
    if (!value) {
        return Promise.reject('请阅读并同意协议')
    }
    return Promise.resolve()
}

const rules = {
    phoneNumber: [
        { required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
        { validator: validatePhoneNumber, trigger: ['change', 'blur'] }
    ],
    otp: [
        { required: true, message: '请输入短信验证码', trigger: ['change', 'blur'] },
        { validator: validateOtp, trigger: ['change', 'blur'] }
    ],
    checkedAgreement: [
        { required: true, message: '请阅读并同意协议', trigger: ['change'] },
        { validator: validateAgreement, trigger: ['change'] }
    ]
}

const onFinish = () => {
    formRef.value
        .validate()
        .then(() => {
            register()
        })
        .catch(() => {
            console.log('error')
        })
}

const onFinishFailed = () => {
    console.log('failed')
}

const register = async () => {
    console.log(`formState ${JSON.stringify(formState)}`)
    router.replace('/cards')
    formRef.value.resetFields()
    closeModal()


}

const handleSendOtp = () => {
    const res = validatePhoneNumberSync(formState.phoneNumber)
    if (!res) {
        message.error('请输入有效的手机号码')
        return
    } else {
        captchaObj.value?.showCaptcha()
    }
}

// Initialize CAPTCHA
onMounted(async () => {
    await import('../../../utils/gt4.js')
    window.initGeetest4({
        captchaId: "7ca96590f151feb5236f2a3227dc99db",
        product: "bind",
    }, function (captcha) {
        captchaObj.value = captcha

        captcha.onReady(function () {
            captchaReady.value = true
        })

        captcha.onSuccess(function () {

            fetch('http://192.168.193.75:8085/v1/user/smsCode',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    phone:formState.phoneNumber,
                    geeTest: captcha.getValidate(),
                    action: 'register'

                })
            }).then(res=>{
                return res.json()
               
            }).then(data=>{
                console.log(data)
            })

            console.log('send otp')
            message.success('验证码发送成功')
        })
    })
})
</script>


<template>
    <div class="flex flex-col items-center justify-center h-full gap-y-8 w-full px-12 py-6">
        <div class="text-3xl font-light">
            输入手机号及验证码
        </div>

        <Form ref="formRef" @finish="onFinish" @finishFailed="onFinishFailed" :model="formState" :rules="rules"
            autocomplete="on" class="flex flex-col items-center  w-full">
            <div class="space-y-12 w-full">
                <FormItem name="phoneNumber" class="w-full">
                    <PhoneNumberInput v-model:phoneNumber="formState.phoneNumber" />
                </FormItem>

                <FormItem name="otp" class="w-full">
                    <div class="flex items-center justify-between gap-x-2  h-12 w-full">
                        <Input placeholder="请输入短信验证码" class="h-14 w-60" v-model:value="formState.otp" />
                        <a class="text-blue-500 text-lg" @click="handleSendOtp">
                            获取验证码

                        </a>
                    </div>

                </FormItem>

                <FormItem class="w-full">
                    <button @click="onFinish"
                        class="w-full text-xl bg-blue-500 hover:bg-blue-400 duration-100 text-white rounded-xl py-3">
                        提交注册
                    </button>
                </FormItem>

                <FormItem name="checkedAgreement" class="w-full">
                    <Agreement v-model:checkedAgreement="formState.checkedAgreement" />
                </FormItem>
            </div>
        </Form>

        <div class="text-md font-light [&>*:nth-child(odd)]:text-blue-500 items-start flex flex-col gap-y-1">
            <p>
                我的个人信息是如何被处理的？
            </p>
            <p>
                您的所有数据都是加密存储的，我们不会出售您的信息。
            </p>
            <p>
                我的联系信息会被用于广告吗？
            </p>
            <p>
                我们只会通过您的联系方式向您告知交易相关的信息。
            </p>
        </div>
    </div>
</template>
