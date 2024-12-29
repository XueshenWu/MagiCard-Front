<script setup>
import { Input } from 'ant-design-vue';
import { computed, ref, watch} from 'vue';



const phoneNumber = defineModel('phoneNumber')


const phoneNumberValidated = defineModel("phoneNumberValidated")

// const validated = computed(() => {

//     // ^1[3-9]d{9}$
//     const reg = /^1[3-9]\d{9}$/

//     return reg.test(phoneNumber.value)
// })

watch(phoneNumber, (newVal, oldval) => {
    // ^1[3-9]d{9}$
    const reg = /^1[3-9]\d{9}$/
    const res = reg.test(newVal)
    phoneNumberValidated.value = res
    
    if(res){
        console.log('手机号码验证通过')
    }
    else{
        console.log('手机号码验证未通过')
    }
}, { immediate: true })



</script>


<template>
    <div class="flex items-center justify-start gap-x-2 h-12">

        <Input :status="phoneNumberValidated || phoneNumber.length === 0 ? '' : 'warning'" v-model:value="phoneNumber"
            placeholder="请输入手机号码" class="h-10 before:placeholder:[+86]">
        <template #prefix>
            <span class="font-bold">+86</span>
        </template>
        </Input>
    </div>




</template>