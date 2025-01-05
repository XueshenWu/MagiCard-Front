<script setup>
import { ref } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
const open = ref(false);
const { availableBalance, className } = defineProps(['availableBalance', 'className']);
</script>
<template>
    <button @click="open = true"
        :class="className ?? ` bg-slate-200 px-8 py-3 rounded-xl hover:bg-slate-300 duration-100`">
        提现
    </button>
    <GeneralModal v-model:open='open' width="29.1667vw" :centered="true" mainTitle="提现" subTitle="您可提现的金额为">
        <div class="flex flex-col items-center justify-center gap-y-12">
            <p class="font-bold text-[2.08333vw] ">${{ Number(availableBalance).toFixed(2) }}</p>
        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4 mt-12 px-8 pb-8 ">
                <button :class='`button-style w-[14.0625vw] h-[2.70833vw]  text-[1.04167vw] rounded-lg   ${availableBalance === 0 ? "disabled cursor-not-allowed bg-gray-100 text-gray-400" : " duration-100 bg-blue-500 hover:bg-blue-400 text-white"}`'>全部提现</button>
            </div>
        </template>

    </GeneralModal>
</template>
<style scoped>
.button-style {
    border-radius: .625vw;
}
</style>