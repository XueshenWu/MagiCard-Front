<script setup>
import { Button } from 'ant-design-vue';
import { ref, provide } from 'vue';
import CardContainer from './CardContainer.vue';
import GeneralModal from '../Modal/GeneralModal.vue';

const openModal = ref(false);

const closeModal = () => {
   openModal.value = false;
}

provide('closeLoginRegisterModal', closeModal);

const handleClick = () => {
   openModal.value = true;
}

const handleOk = () => {
   openModal.value = false;
}

</script>

<template>
   <div ref="replayModal">
      <button @click="handleClick"
         class="bg-black text-white text-xs px-4  h-7 rounded-xl hover:bg-slate-800 duration-150">
         登录/注册
      </button>
      <GeneralModal v-model:open="openModal" width="400px" :centered="false" :get-container="()=>$refs.replayModal">
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
