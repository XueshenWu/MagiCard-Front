<template>
    <div class="inline-flex items-center gap-x-2">
        <span>
            <span>{{ month }}</span>
            <span class="text-[#ACACAC] font-normal">月</span>
            <span class="text-[#ACACAC] font-normal">/</span>
            <span>{{ year.substring(2) }}</span>
            <span class="text-[#ACACAC] font-normal">年</span>
        </span>

        <span>
            <span class="ml-1">
                <span class="text-[#ACACAC] font-normal">(</span>
                <span class="text-[#ACACAC] font-normal">或</span>
                <span>{{ month }}</span>
                <span class="text-[#ACACAC] font-normal">月</span>
                <span class="text-[#ACACAC] font-normal">/</span>
                <span>{{ year }}</span>
                <span class="text-[#ACACAC] font-normal">年</span>
                <span class="text-[#ACACAC] font-normal">)</span>
            </span>
        </span>

  

    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    dateStr: {
        type: String,
        required: true
    }
})

const year = computed(() => props.dateStr.split('-')[0])
const month = computed(() => props.dateStr.split('-')[1])
</script>