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



const year = computed(() => {
    try {
        return props.dateStr.split('-')[0]
    } catch (e) {
        return '2022'
    }
})

const month = computed(() => {
    try {
        return props.dateStr.split('-')[1]
    } catch (e) {
        return '12'
    }
})

// let year, month;
// year = computed(() => '2022')
// month = computed(() => '12')
// FIXME: 此处完成 year 和 month 的计算

// try {
//     year = computed(() => props.dateStr.split('-')[0])
//     month = computed(() => props.dateStr.split('-')[1])
// } catch (e) {
//     year = computed(() => '2022')
//     month = computed(() => '12')
// }

</script>