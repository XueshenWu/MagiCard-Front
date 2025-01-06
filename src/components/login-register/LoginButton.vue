<script setup>
import { Button } from 'ant-design-vue';
import { ref, provide, nextTick, inject } from 'vue';
import CardContainer from './CardContainer.vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { modalStore } from '../../states/modalStore';
import { useI18n } from 'vue-i18n';

const {
    turnOnLight,
    turnOffLight
} = inject('lightSwitch');

const { t } = useI18n();


const closeModal = () => {
   modalStore.loginModalOpen = false;
   turnOnLight();
}




provide('closeLoginRegisterModal', closeModal);



const handleClick = () => {
   modalStore.loginModalOpen = true;
}

const handleOk = () => {

}

</script>

<template>
   <div ref="replayModal">
      <button @click="handleClick"
         class="bg-black text-white text-[0.75vw] px-[1vw] h-[1.75vw] rounded-xl hover:bg-slate-800 duration-150">
         {{ t('message.login') }}
      </button>
      <GeneralModal v-model:open="modalStore.loginModalOpen" width="29.17vw" :centered="true">
         <template #footer>


         </template>
         <template #title>

         </template>

         <CardContainer />
      </GeneralModal>
   </div>

</template>
<style lang="less" scoped>
:deep(.ant-modal .ant-modal-content) {
   border-radius: 25px !important;
}
</style>
