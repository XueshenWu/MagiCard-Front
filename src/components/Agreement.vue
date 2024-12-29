<script setup>
import { Checkbox, Modal } from 'ant-design-vue';
import { ref } from 'vue';
import { agreement } from '../assets/agreement';

const checked = defineModel('checkedAgreement')

const open = ref(false)
const showAgreement = () => {
    open.value = true
}

const handleConfirm = () => {
    open.value = false;
    checked.value = true;
}


</script>

<template>


    <Checkbox v-model:checked="checked" class="text-xs">我已阅读并同意<a href="#" class=" text-blue-500 "
            @click="showAgreement">《用户协议与服务条款》</a>
    </Checkbox>
    <Modal v-model:open="open" title="用户协议与服务条款" :centered="true">
        <div class="text-xs h-96 overflow-y-scroll">{{ agreement }}</div>
        <template #footer>
            <div class="flex flex-row gap-x-4 justify-end [&>*]:px-8 ">
                <button @click="open = false" class="bg-gray-200 text-black rounded-md px-4 py-2">关闭</button>
                <button @click="handleConfirm" class="bg-blue-500 text-white rounded-md px-4 py-2">同意</button>
            </div>

        </template>
    </Modal>



</template>