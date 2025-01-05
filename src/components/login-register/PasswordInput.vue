<script setup>
import { InputPassword } from 'ant-design-vue';


const password = defineModel('password')
</script>


<template>
    <div class="w-full">
        <InputPassword  v-model:value="password" placeholder="请输入密码" class="input-style" />
    </div>
</template>

<style scoped>
::v-deep(.ant-input-affix-wrapper-lg){
    padding: 12px 30px  !important;
}

.input-style {
    padding: .989583vw 2.03125vw;
    height: 3.39vw;
    font-size: .9375vw;
    width: 100%;
    border-radius: .625vw;
}

</style>