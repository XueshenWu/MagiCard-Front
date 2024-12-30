<script setup>
import { Button } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { ref, provide } from 'vue';
import CardContainer from './CardContainer.vue';

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
         class="bg-black text-white text-xs px-4 py-2 h-10 rounded-md hover:bg-slate-800 duration-150">
         登录/注册
      </button>
      <Modal v-model:open="openModal" width="400px" :centered="true" :get-container="()=>$refs.replayModal">
         <template #footer>


         </template>
         <template #title>

         </template>

         <CardContainer />
      </Modal>
   </div>

</template>
<style lang="less" scoped>
div /deep/ .ant-modal .ant-modal-content {
   border-radius: 25px !important;

}
</style>