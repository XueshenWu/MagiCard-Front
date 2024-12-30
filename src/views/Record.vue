<script setup>
import { Divider } from 'ant-design-vue';
import RecordMetaDisplay from '../components/transaction-record/RecordMetaDisplay.vue';
import RecordDataDisplay from '../components/transaction-record/RecordDataDisplay.vue';
</script>


<template>
    <div class="flex flex-col items-start w-full py-12 px-16">
        <RecordMetaDisplay />

        <RecordDataDisplay />
    </div>


</template>