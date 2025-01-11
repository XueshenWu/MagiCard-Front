<script setup>
import { Checkbox, Modal } from 'ant-design-vue';
import { ref } from 'vue';
import { agreement } from '../../assets/agreement';
import GeneralModal from '../Modal/GeneralModal.vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const checked = defineModel('checkedAgreement')

const open = ref(false)
const showAgreement = () => {
    open.value = true;
    
}

const handleConfirm = () => {
    open.value = false;
    checked.value = true;
}


</script>

<template>


    <Checkbox v-model:checked="checked" class="*:text-[.833333vw]">{{ t('message.agreement.readAndAgree') }}<a href="#" class=" text-blue-500 "
            @click="showAgreement">{{ t('message.agreement.termsAndConditions') }}</a>
    </Checkbox>
    <!-- <GeneralModal v-model:open="open" :title="t('message.agreement.title')" :centered="false">
        <div class="text-xs h-96 overflow-y-scroll">{{ agreement }}</div>
        <template #footer>
            <div class="flex flex-row gap-x-4 justify-end [&>*]:px-8 ">
                <button @click="open = false" class="bg-gray-200 text-black rounded-md px-4 py-2"> {{ t('message.agreement.close') }}</button>
                <button @click="handleConfirm" class="bg-blue-500 text-white rounded-md px-4 py-2">  {{ t('message.agreement.agree') }}</button>
            </div>

        </template>
    </GeneralModal> -->
    <Modal v-model:open="open" width="49.1667vw" centered>
        <template #title>
            <div class="flex flex-col items-center justify-center">
                <p class="title-style">{{ t('message.agreement.title') }}</p>
            </div>
        </template>
        <div class="text-xs h-[50vh] overflow-y-scroll">
            {{ agreement }}
        </div>
        <template #footer>
            <div class="flex flex-row gap-x-4 justify-end [&>*]:px-8 ">
                <button @click="open = false" class="bg-gray-200 text-black rounded-md px-4 py-2"> {{ t('message.agreement.close') }}</button>
                <button @click="handleConfirm" class="bg-blue-500 text-white rounded-md px-4 py-2">  {{ t('message.agreement.agree') }}</button>
            </div>
        </template>
    </Modal>



</template>