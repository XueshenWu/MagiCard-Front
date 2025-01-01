<script setup>
import { ref } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { Dropdown, Form, FormItem, Select, message } from 'ant-design-vue';
import CardNumber from '../CardNumber.vue';


const open = defineModel('openApplyMonthlyStatementModal', { type: Boolean });
const month = ref(1);
const year = ref(2023);
const email = ref('example@mail.com')



const cardOptions = [
    '4568124210930294',
    '2058193058201023',
    '1234567890123456'
]

const card = ref(cardOptions[0]);
const handleApply = () => {
    message.success('月结单已发送至您的邮箱');
    open.value = false;
}

</script>


<template>

    <GeneralModal v-model:open="open" width="540px">

        <div class="gap-y-12 p-8 flex flex-col items-center justify-center w-full">
            <div class="text-3xl">
                申请月结单
            </div>
            <div class="text-center">
                <p>
                    生成的月结单包含选择当月消费的记录。
                </p>
                <p>
                    请选择您申请月结单的月份：
                </p>


            </div>
            <Form>
                <div class="w-96 flex flex-col">
                    <FormItem>

                        <div class="text-left flex flex-col gap-y-4">
                            <div class="text-gray-600">
                                请选择申请帐单的卡片
                            </div>
                            <Select v-model:value="card" class="w-full" size="large">
                                <Select.Option v-for="card in cardOptions" :key="card" :value="card">
                                    <CardNumber :value="card" />
                                </Select.Option>
                            </Select>
                        </div>

                    </FormItem>
                </div>
                <div class="flex flex-row w-96 items-center justify-between gap-x-4">
                    <FormItem class="w-full">
                        <Select class="w-full" size="large" v-model:value="year">
                            <Select.Option value="2023">2023</Select.Option>
                            <Select.Option value="2024">2024</Select.Option>
                            <Select.Option value="2025">2025</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem class="w-full">
                        <Select v-model:value="month" class="w-full" size="large">
                            <Select.Option v-for="month in 12" :key="month" :value="month">{{ month }}月</Select.Option>
                        </Select>
                    </FormItem>
                </div>
            </Form>
        </div>
        <div class="text-center text-gray-600">
            月结单将会在1-3个工作日内发送至您的邮箱地址：
            <div class="text-lg font-bold">
                {{ email }}
            </div>


        </div>
        <div class="grid place-content-center">
            <button
            
            @click="handleApply"
            class="w-96 h-12 bg-primary text-xl py-2 text-white rounded-lg mt-8 bg-blue-500 hover:bg-blue-400 duration-75">
                确认发送
            </button>
        </div>
        <template #footer></template>
    </GeneralModal>




</template>