<script setup>
import { Input } from 'ant-design-vue';

import { useI18n } from 'vue-i18n';



const { t } = useI18n()
const phoneNumber = defineModel('phoneNumber')


</script>


<template>
    <div class="flex items-center justify-start gap-x-2 w-full">
        <Input v-model:value="phoneNumber" :placeholder="t('message.phoneNumberInput.placeHolder')"
            class="input-style border-radius-custom ">

        </Input>
    </div>
</template>


<style scoped>
.input-style {
    padding: .989583vw 2.03125vw;
    height: 3.39vw;
    width: 100%;
    font-size: .9375vw;

}

.border-radius-custom {
    border-radius: .625vw;
}
</style>
