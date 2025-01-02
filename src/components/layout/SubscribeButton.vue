<script setup>
import { inject } from 'vue';
import { modalStore } from '../../states/modalStore';

const openModal = () => {
    modalStore.loginModalOpen = true;
}

</script>


<template>
    <button @click="openModal" class="bg-[#3189ef] text-white font-normal text-2xl py-4 px-14 rounded-xl duration-100 mt-10">
        开通会员
    </button>
</template>