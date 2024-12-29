<script setup>
import { Divider } from 'ant-design-vue';
import RecordMetaDisplay from '../components/RecordMetaDisplay.vue';
import RecordDataDisplay from '../components/RecordDataDisplay.vue';
</script>


<template>
    <div class="flex flex-col items-start w-full py-6 px-12">
        <RecordMetaDisplay />
        <Divider />
        <RecordDataDisplay />
    </div>


</template>