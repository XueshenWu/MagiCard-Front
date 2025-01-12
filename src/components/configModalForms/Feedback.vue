<script setup>

import { inject, onMounted, onUnmounted } from 'vue';

import { useI18n } from 'vue-i18n';
const openHelpModal = defineModel('openFeedbackModal')

const { t } = useI18n();

const { lock, unlock } = inject('lightLock');

const {
    turnOnLight,
    turnOffLight
} = inject('lightSwitch');

onMounted(() => {
    turnOffLight();
    lock();
});


onUnmounted(() => {
    unlock();
    turnOnLight();
});


</script>

<template>

    <GeneralModal v-if="openHelpModal" v-model:open="openHelpModal" width="29.1667vw"
        :mainTitle="t('message.feedback.title')" :subTitle="t('message.feedback.subtitle')" :centered="true">
        <template #footer>
            <div class="flex justify-center">
            </div>
        </template>
        <div class="flex flex-col items-center justify-center">
            <img src="/feedback_2.png" alt="wechat" class="" />
        </div>
    </GeneralModal>
</template>
