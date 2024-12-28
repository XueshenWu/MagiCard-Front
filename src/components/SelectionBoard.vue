<script setup>

const imgList = new Array(18).fill(0).map((_, idx) => `/public/subscriptionIcons/download (${idx}).png`)


</script>

<template>
    <div class="flex flex-col items-start gap-y-6">
        <div>
            选择你要支付的产品
        </div>
        <div class="grid grid-cols-9 gap-3">
            <img v-for="(img, idx) in imgList" :src="img" alt="img" :key="idx" class="cursor-pointer rounded-lg hover:ring hover:ring-sky-100 duration-100 " />
        </div>

    </div>

</template>