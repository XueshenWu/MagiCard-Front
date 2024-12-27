<script setup>
import { tokenStore } from '../states/tokenStore';
import { Button } from 'ant-design-vue';
import { RouterLink } from 'vue-router';
import ConfigButton from './ConfigButton.vue';
import LoginButton from './LoginButton.vue';

</script>

<template>
    <div
        class="sticky top-0 shadow-md z-50 w-full h-14 flex flex-row items-center justify-between px-16 py-2 bg-white">
        <div id="logo" class="text-3xl font-semibold  text-center font-sans">

            <RouterLink class="flex flex-row items-center gap-x-4" to="/">
                
                <img src="/logo.png" alt="logo" class="w-8 h-6" />
                <div class="text-lg tracking-wide ">
                    WildCard
                </div>
            </RouterLink>
        </div>
        <div>
            <ConfigButton v-if="tokenStore.token !== null"/>
            <LoginButton v-else/>
        </div>
    </div>
</template>