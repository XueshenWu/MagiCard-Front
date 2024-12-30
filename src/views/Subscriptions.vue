<script setup>
import { ref } from 'vue';
import SelectionBoard from '../components/subscription/SelectionBoard.vue';
import CardRechargeBoard from '../components/subscription/CardRechargeBoard.vue';
import { Modal } from 'ant-design-vue';
import CheckoutResult from '../components/CheckoutResult.vue';



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


const handleCheckoutModalConfirm = () => {
    openCheckoutConfirm.value = false
    current.value++
}

</script>


<template>
    <div class="flex flex-col justify-around gap-y-20 p-12 py-4 h-[830px]" ref="replayModal">
        <div class="steps-content">
            <SelectionBoard v-if="current === 0" />
            <CardRechargeBoard v-if="current === 1" v-model:price="price" v-model:valid="valid" />
            <CheckoutResult v-if="current === 2" v-model:current="current" />
        </div>
        <a-steps :current="current" :items="items"  />
        <div class="steps-action flex justify-end items-center gap-x-4 *:w-32 *:text-xl *:py-3 *:h-14 *:px-6 ">
            <a-button class="bg-gray-100 border-none" v-if="current > 0" style="margin-left: 8px"
                @click="prev">上一步</a-button>
            <a-button v-show="current === 1" type="primary" @click="handleCheckout">支付</a-button>
            <a-button v-show="current === 0" type="primary" @click="next">下一步</a-button>
            <a-button v-if="current == steps.length - 1" type="primary"
                @click="message.success('Processing complete!')">
                Done
            </a-button>

        </div>
        <Modal :get-container="()=>$refs.replayModal" id="checkoutConfirm" v-model:open="openCheckoutConfirm" width="580px" :centered="true">
            <div class="px-12 py-8 flex flex-col items-center justify-center gap-y-4 text-gray-500">

                <p class="text-3xl text-black">充值</p>
                <div class="flex flex-col gap-y-2 w-full">
                    <div class="flex flex-row items-center justify-between text-lg ">
                        <p class="">充值到账金额</p>
                        <p class=" ">${{ parseFloat(price).toFixed(2) }}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between text-lg">
                        <p class="">手续费(3.5%)</p>
                        <p class="">${{ parseFloat(price * 0.035).toFixed(2) }}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between text-lg">
                        <p class="">美元总额</p>
                        <p class="font-semibold text-black">${{ parseFloat(price * 1.035).toFixed(2) }}</p>
                    </div>

                </div>
            </div>
            <template #footer>
                <div class="grid place-content-center my-4">
                    <button class="px-28 py-3  text-white text-lg rounded-lg bg-blue-500 hover:bg-blue-400 duration-100"
                        @click="handleCheckoutModalConfirm">
                        去支付
                    </button>
                </div>
            </template>
        </Modal>
    </div>
</template>


<style scoped lang="less">
:deep(.ant-steps-item-title) {
    font-size: x-large !important; 
}
:deep(.ant-modal .ant-modal-content) {
   border-radius: 25px !important;
}
</style>

