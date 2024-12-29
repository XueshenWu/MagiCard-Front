<script setup>
import { Button } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { ref } from 'vue';
import CardContainer from './CardContainer.vue';

const openModal = ref(false);


const handleClick = () => {
   openModal.value = true;
}

const handleOk = () => {
   openModal.value = false;
}

</script>

<template>
   <button @click="handleClick"
      class="bg-black text-white text-xs px-4 py-2 h-10 rounded-md hover:bg-slate-800 duration-150">
      登录/注册
   </button>
   <Modal v-model:open="openModal" width="400px" :centered="true" >
      <template #footer>
        
  
      </template>
      <template #title>

      </template>

      <CardContainer />
   </Modal>

</template>