<script setup>
import { InputPassword } from 'ant-design-vue';


const password = defineModel('password')
</script>


<template>
    
    <InputPassword v-model:value="password" placeholder="请输入密码" class="h-10" />

</template>