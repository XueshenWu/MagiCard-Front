<script setup>
import { ref } from 'vue';
import SelectionBoard from '../components/SelectionBoard.vue';
import CardRechargeBoard from '../components/CardRechargeBoard.vue';
import { Modal } from 'ant-design-vue';



const price = ref(0);
const valid = ref(true);

const openCheckoutConfirm = ref(false);

const handleCheckout = () => {
    if (isNaN(price.value) || (price.value) <= 0 || (price.value) > 60) {
        valid.value = false
    } else {
        openCheckoutConfirm.value = true
        valid.value = true
    }
};


const current = ref(0);
const next = () => {
    current.value++;
};
const prev = () => {
    current.value--;
};
const steps = [
    {
        title: '选择你要支付的产品',

    },
    {
        title: '支付结算页',

    },
    {
        title: '充值结果',

    },
];
const items = steps.map(item => ({
    key: item.title,
    title: item.title,
}));
</script>


<template>
    <div class="flex flex-col gap-y-8 p-12 py-4">


        <div class="steps-content h-[300px]">
            <SelectionBoard v-if="current === 0" />
            <CardRechargeBoard v-if="current === 1" v-model:price="price" v-model:valid="valid" />
        </div>




        <a-steps :current="current" :items="items" />
        <div class="steps-action flex justify-end items-center gap-x-4 *:w-28">
            <a-button class="bg-gray-100 border-none" v-if="current > 0" style="margin-left: 8px"
                @click="prev">上一步</a-button>
            <a-button v-show="current === 1" type="primary" @click="handleCheckout">支付</a-button>
            <a-button v-show="current === 0" type="primary" @click="next">下一步</a-button>
            <a-button v-if="current == steps.length - 1" type="primary"
                @click="message.success('Processing complete!')">
                Done
            </a-button>

        </div>
        <Modal id="checkoutConfirm" v-model:open="openCheckoutConfirm" width="360px">
            <div class="flex flex-col items-center justify-center gap-y-4 text-gray-500">

                <p class="text-xl text-black">充值</p>
                <div class="flex flex-col gap-y-2 w-full">
                    <div class="flex flex-row items-center justify-between text-xs">
                        <p class="">充值到账金额</p>
                        <p class=" ">${{ parseFloat(price).toFixed(2) }}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between text-xs">
                        <p class="text-xs">手续费(3.5%)</p>
                        <p class="">${{ parseFloat(price * 0.035).toFixed(2) }}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between text-xs">
                        <p class="text-xs">美元总额</p>
                        <p class="font-semibold text-black">${{ parseFloat(price * 1.035).toFixed(2) }}</p>
                    </div>

                </div>
            </div>
            <template #footer>
                <div class="grid place-content-center mt-4">
                    <button class="px-10 py-2 w-40 text-white  rounded-lg bg-blue-500 hover:bg-blue-400 duration-100"
                    @click="openCheckoutConfirm = false">
                    去支付
                </button>
                </div>
            </template>
        </Modal>
    </div>
</template>
