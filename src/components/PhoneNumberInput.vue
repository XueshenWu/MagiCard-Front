<script setup>
import { Input } from 'ant-design-vue';

const phoneNumber = defineModel('phoneNumber')


</script>


<template>
    <div class="flex items-center justify-start gap-x-2 h-12 w-full">

        <Input v-model:value="phoneNumber" placeholder="请输入手机号码" class="h-14 before:placeholder:[+86]">
        <template #prefix>
            <span class="font-bold">+86</span>
        </template>
        </Input>
    </div>
</template>