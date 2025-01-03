<script setup>


const {success, content} = defineProps(['content', 'success'])


</script>

<template>
    <div class="flex flex-row items-center justify-center text-[1vw] gap-x-4">
        <img v-if="success" src="/service-compatibility/support.png" alt="message icon" class="w-[1vw] h-[1vw]" />
        <img v-else src="/service-compatibility/not-support.png" alt="message icon" class="w-[1vw] h-[1vw]" />
        <div>
            {{ content }}

        </div>

    </div>
</template>