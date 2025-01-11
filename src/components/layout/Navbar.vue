<script setup>
import { computed, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { modalStore } from "../../states/modalStore";
import { yetAnotherStore } from "../../states/yastore";

const { t } = useI18n();

const route = useRoute();
const path = computed(() => route.path);

const navEntries = [
    { to: "/subscriptions", text: 'message.productPayment', src: 'product-icon.png' },
    { to: "/cards", text: 'message.myCards', src: '/card-icon.png' },
    { to: "/record", text: 'message.consumptionRecord', src: "/record-icon.png" },
    { to: "/invite-record", text: 'message.myInvitations', src: "/invite-icon.png" }
];

const loggedIn = computed(() => !!localStorage.getItem('token'));


</script>

<template>

    <div id="navbar" class="flex flex-col items-start justify-start gap-y-4">

        <div class="text-xs text-gray-400 pl-3">
            {{ t('message.paymentService') }}
        </div>
        <div id="navitems" class="flex flex-col items-start justify-start gap-y-1 w-56 h-full">
            <RouterLink v-for="(entry, index) in navEntries" :to="entry.to"
                :class="` flex flex-row items-center gap-x-2 px-3 py-3 w-full rounded-md  duration-100  ${(path === entry.to || (path === '/' && index === 0)) && 'bg-sky-200'}`">
                <img :src="entry.src" class="w-4 h-4" /> {{ t(entry.text) }}
            </RouterLink>
        </div>
    </div>
</template>
<!-- <template v-else>
        <div id="navbar" class="flex flex-col items-start justify-start gap-y-4">

            <div class="text-xs text-gray-400 pl-3">
                {{ t('message.paymentService') }}
            </div>
            <div id="navitems" class="flex flex-col items-start justify-start gap-y-1 w-56 h-full">
                <a v-for="(entry, index) in navEntries"
                @click="modalStore.loginModalOpen = true"
                    :class="`cursor-pointer flex flex-row items-center gap-x-2 px-3 py-3 w-full rounded-md  duration-100  ${(path === entry.to || (path === '/' && index === 0)) && 'bg-sky-200'}`">
                    <img :src="entry.src" class="w-4 h-4" /> {{ t(entry.text) }}
            </a>
            </div>
        </div>
    </template> -->
