<script setup>


const openHelpModal = defineModel('openFeedbackModal')


</script>

<template>

    <GeneralModal v-model:open="openHelpModal" width="29.1667vw" mainTitle="请联系客服" subTitle="请扫描下方二维码联系客服"
        :centered="true">

        <template #footer>
            <div class="flex justify-center">

            </div>
        </template>
        <div class="flex flex-col items-center justify-center">

            <img src="/QR_Wechat.webp" alt="wechat" class="" />

        </div>
    </GeneralModal>
</template>
