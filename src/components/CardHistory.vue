<script setup>

// TODO: Group records by date

import { watchEffect } from 'vue';
import { cardHistoryResp1, cardHistoryResp2 } from '../mock/cardHistory';

async function getCardHistory(page) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (page === 1 || page === undefined) {
                resolve(cardHistoryResp1);
            } else {
                resolve(cardHistoryResp2);
            }
        }, 1000);
    });
}

const cardHistory = ref();

watchEffect(async () => {
    cardHistory.value = (await getCardHistory()).data
});

</script>


<template>
<div>
    <div>
        消费记录
    </div>

</div>


</template>