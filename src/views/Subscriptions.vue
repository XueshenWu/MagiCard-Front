<script setup>
import { ref } from 'vue';
import SelectionBoard from '../components/SelectionBoard.vue';


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
    <div class="flex flex-col gap-y-4">
        <a-steps :current="current" :items="items" />

        <div class="steps-content">
            <SelectionBoard v-if="current === 0" />
        </div>



        <div class="steps-action">
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
            <a-button v-if="current == steps.length - 1" type="primary"
                @click="message.success('Processing complete!')">
                Done
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
        </div>
    </div>
</template>
