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
    <GeneralModal v-model:open='openFreezeModal' width="29.166667vw" :centered="true" mainTitle="谨慎操作"
        >
        <div class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>
                冻结后该卡片将无法使用，且所有关联的服务将暂时停止。
            </p>
            <p>
                冻结30天后银行会自动销卡，请谨慎操作。
            </p>
        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4">
                <button @click="openFreezeModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[100%] bg-slate-200 hover:bg-slate-300 duration-100">取消</button>
                <button @click="openFreezeModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">确认冻结</button>

            </div>
        </template>

    </GeneralModal>

    <GeneralModal v-model:open='openDeleteModal' width="29.166667vw" :centered="true" mainTitle="谨慎操作">
        <div class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>
                删除后该卡片将永久移除，无法恢复！请确保您已备份所需信息。
            </p>
            <p>
                删卡不退卡费，开新卡需要重新支付费用，请确认后再操作。
            </p>
        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4">
                <button @click="openDeleteModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[100%] bg-slate-200 hover:bg-slate-300 duration-100">取消</button>
                <button @click="openDeleteModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">确认删除</button>

            </div>
        </template>

    </GeneralModal>

</template>
<style scoped>
.content-style {
    font-size: 1.09375vw;
    line-height: 1.5238095238;
    border-radius: .625vw;
}
</style>