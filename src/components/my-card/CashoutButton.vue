<script setup>
import { ref } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';


const open = ref(false);
const { availableBalance, className } = defineProps(['availableBalance', 'className']);

// const availableBalance = 100

</script>


<template>



    <button @click="open = true" :class="className??` bg-slate-200 px-8 py-3 rounded-xl hover:bg-slate-300 duration-100`">
        提现
    </button>
    <GeneralModal v-model:open='open' width="560px" :centered="true">
        <div class="flex flex-col items-center justify-center gap-y-12">

            <p class="text-3xl">提现</p>
            <p class="text-[16px]">您可提现的金额为</p>
            <p class="font-bold text-4xl">${{ Number(availableBalance).toFixed(2) }}</p>
            <button :class='`w-80 mt-4   py-4 text-xl rounded-lg   ${availableBalance === 0 ? "disabled cursor-not-allowed bg-gray-100 text-gray-400" : " duration-100 bg-blue-500 hover:bg-blue-400 text-white"}`'>全部提现</button>

        </div>
        <template #footer>
            
        </template>

    </GeneralModal>
</template>