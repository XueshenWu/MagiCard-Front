<script setup>
import { Input } from 'ant-design-vue';

const phoneNumber = defineModel('phoneNumber')


</script>


<template>
    <div class="flex items-center justify-start gap-x-2 h-12 w-full">
        <Input v-model:value="phoneNumber" placeholder="请输入手机号码" class="input-style border-radius-custom before:placeholder:[+86]">
        <template #prefix>
            <span class="font-bold text-[1.041667vw]">+86</span>
        </template>
        </Input>
    </div>
</template>


<style scoped>


.input-style {
    padding: .989583vw 2.03125vw;
    height: 3.39vw;
    width: 24.17vw;
    font-size: .9375vw;
 
}
.border-radius-custom {
    border-radius: .625vw;
}

</style>
