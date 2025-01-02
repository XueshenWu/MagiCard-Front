<script setup>
import { Button } from 'ant-design-vue';
import { ref, provide, nextTick } from 'vue';
import CardContainer from './CardContainer.vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import {modalStore} from '../../states/modalStore';



const closeModal = () => {
  setLoginModalOpen(false);
}




provide('closeLoginRegisterModal', closeModal);



const handleClick =  () => {
   modalStore.loginModalOpen = true;
}

const handleOk = () => {
  
}

</script>

<template>
   <div ref="replayModal">
      <button @click="handleClick"
         class="bg-black text-white text-xs px-4  h-7 rounded-xl hover:bg-slate-800 duration-150">
         登录/注册
      </button>
      <GeneralModal v-model:open="modalStore.loginModalOpen" width="400px" :centered="false" >
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
