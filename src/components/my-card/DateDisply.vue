<template>
    <div class="inline-flex items-center gap-x-2">
        <span>
            <span>{{ month }}</span>
            <span class="text-gray-400 font-light">月</span>
            <span class="text-gray-400 font-light">/</span>
            <span>{{ year.substring(2) }}</span>
            <span class="text-gray-400 font-light">年</span>
        </span>

        <span>
            <span class="ml-1">
                <span class="text-gray-400 font-light">(</span>
                <span class="text-gray-400 font-light">或</span>
                <span>{{ month }}</span>
                <span class="text-gray-400 font-light">月</span>
                <span class="text-gray-400 font-light">/</span>
                <span>{{ year }}</span>
                <span class="text-gray-400 font-light">年</span>
                <span class="text-gray-400 font-light">)</span>
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