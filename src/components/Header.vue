<script setup>
import { tokenStore } from '../states/tokenStore';
import { Button } from 'ant-design-vue';
import { RouterLink } from 'vue-router';

</script>

<template>
    <div
        class="sticky top-0 shadow-md z-50 w-full h-[72px] flex flex-row items-center justify-between px-24 py-2 bg-white">
        <div id="logo" class="text-3xl font-semibold  text-center font-sans">

            <RouterLink to="/">Card</RouterLink>
        </div>
        <div>
            <Button v-if="tokenStore.token !== null" type="default">设置</Button>
            <button v-else
                class="bg-black text-white text-sm px-4 py-3 rounded-md hover:bg-slate-800 duration-150">登录/注册</Button>
        </div>
    </div>
</template>