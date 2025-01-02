<script setup>
import { InputPassword } from 'ant-design-vue';


const password = defineModel('password')
</script>


<template>
    
    <InputPassword   v-model:value="password" placeholder="请输入密码" class="h-14" />

</template>

<style scoped>
::v-deep(.ant-input-affix-wrapper-lg){
    padding: 12px 30px  !important;
}
</style>