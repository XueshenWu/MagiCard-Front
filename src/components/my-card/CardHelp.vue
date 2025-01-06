<script setup>
import { ref } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { useI18n } from 'vue-i18n';

const openHelpModal = ref(false);

const { t } = useI18n();
</script>


<template>
<a @click="openHelpModal = true" class="text-[#3189ef] text-lg tracking-widest">{{ t('message.help.howToUse') }}</a>
<GeneralModal v-model:open='openHelpModal' width="970px" :centered="false">
    <div class="flex flex-col items-center justify-start">
        <div class="text-xl">
            {{ t('message.help.helpTitle') }}
        </div>
        <div>
            <div class="tracking-wider">
                <span class="text-lg">&#8226;</span> <span class="font-semibold mr-1">{{ t('message.help.chatGPT.title') }}</span> {{ t('message.help.chatGPT.binding') }}
            </div>
            <div class="text-xs pl-4 mt-2">
                {{ t('message.help.chatGPT.instruction') }}
            </div>
            <img src="/help/help-gpt.webp" :alt="t('message.help.chatGPT.title') + t('message.help.chatGPT.binding')">
        </div>
        <div>
            <div class="tracking-wider">
                <span class="text-lg">&#8226;</span> <span class="font-semibold mr-1">{{ t('message.help.openAI.title') }}</span> {{ t('message.help.openAI.binding') }}
            </div>
            <div class="text-xs pl-4 mt-2">
                {{ t('message.help.openAI.instruction') }}
            </div>
            <img src="/help/help-openai.webp" :alt="t('message.help.openAI.title') + t('message.help.openAI.binding')">
        </div>
    </div>
</GeneralModal>

</template>