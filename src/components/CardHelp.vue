<script setup>
import { ref } from 'vue';
import { Modal } from 'ant-design-vue';

const openHelpModal = ref(false);

</script>


<template>
    <a @click="openHelpModal = true" class="text-sky-500">如何使用</a>
    <Modal v-model:open='openHelpModal' width="970px" :centered="true">
        <div class=" flex flex-col items-center justify-start">
            <div class="text-xl ">
                使用帮助
            </div>
            <div>
                <div class=" tracking-wider">
                    <span class="text-lg">&#8226;</span> <span class="font-semibold mr-1">ChatGPT Plus</span> 如何绑卡
                </div>
                <div class="text-xs pl-4 mt-2">
                    根据箭头所连接的对应项目，将信息依次复制到对应输入框内，点击订阅即可完成ChatGPT Plus的绑卡
                </div>
                <img src="/help/help-gpt.webp" alt="ChatGPT Plus如何绑卡">
            </div>
            <div>
                <div class=" tracking-wider">
                    <span class="text-lg">&#8226;</span> <span class="font-semibold mr-1">OpenAI API</span> 如何绑卡
                </div>
                <div class="text-xs pl-4 mt-2">
                    根据箭头所连接的对应项目，将信息依次复制到对应输入框内，点击订阅即可完成 OpenAI API 的绑卡
                </div>
                <img src="/help/help-openai.webp" alt="OpenAI API如何绑卡">
            </div>
        </div>
        <template #footer>
        </template>
    </Modal>

</template>