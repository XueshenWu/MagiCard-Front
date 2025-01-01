<script setup>
import { Dropdown, Menu, MenuItem, MenuDivider, Modal } from 'ant-design-vue';
import { ref } from 'vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import GeneralModal from '../Modal/GeneralModal.vue';


const openFreezeModal = ref(false);
const openDeleteModal = ref(false);


</script>

<template>
    <Dropdown :triggger="['click']">
        <button class="bg-slate-200 px-5 py-3 rounded-lg hover:bg-slate-300 duration-100">
            <EllipsisOutlined />
        </button>
        <template #overlay>
            <Menu>
                <MenuItem @click="openFreezeModal = true">
                冻结卡片
                </MenuItem>
                <MenuDivider />
                <MenuItem @click="openDeleteModal = true">
                删除卡片
                </MenuItem>
            </Menu>
        </template>
    </Dropdown>
   <GeneralModal v-model:open='openFreezeModal' width="640px" :centered="false">
        <div class="flex flex-col items-center justify-center gap-y-12 p-6">

            <p class="text-3xl">谨慎操作</p>
            <div class=" tracking-wider text-center  px-4 flex flex-col items-center text-xl gap-y-4 justify-start">
                <p class="">
                    冻结后该卡片将无法使用，且所有关联的服务将暂时停止。
                </p>
                <p>
                    冻结30天后银行会自动销卡，请谨慎操作。
                </p>
            </div>


        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4 mt-8 mb-6 p-2">
                <button @click="openFreezeModal = false"
                    class=" text-2xl px-10 py-3 w-56  rounded-lg bg-slate-200 hover:bg-slate-300 duration-100">取消</button>
                <button @click="openFreezeModal = false"
                    class="text-2xl px-10 py-3 w-56  rounded-lg bg-red-500 hover:bg-red-400 duration-100 text-white">确认冻结</button>

            </div>
        </template>

   </GeneralModal>

    <GeneralModal v-model:open='openDeleteModal' width="640px" :centered="false">
        <div class="flex flex-col items-center justify-center gap-y-8 p-8">

            <p class="text-3xl">谨慎操作</p>
            <div class=" tracking-wider text-center  px-4 flex flex-col items-center text-xl gap-y-4 justify-start">
                <p class="">
                    删除后该卡片将永久移除，无法恢复！请确保您已备份所需信息。
                </p>
                <p>
                    删卡不退卡费，开新卡需要重新支付费用，请确认后再操作。
                </p>
            </div>


        </div>
        <template #footer>
            <div class="text-lg flex flex-row items-center justify-center gap-x-4 mt-8">
                <button @click="openDeleteModal = false"
                    class="px-10 py-4 w-56  rounded-2xl bg-slate-200 hover:bg-slate-300 duration-100">取消</button>
                <button @click="openDeleteModal = false"
                    class="px-10 py-4 w-56  rounded-2xl bg-red-500 hover:bg-red-400 duration-100 text-white">确认删除</button>

            </div>
        </template>

    </GeneralModal>

</template>