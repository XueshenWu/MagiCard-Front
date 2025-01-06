<script setup>
import { Dropdown, Menu, MenuItem, MenuDivider, Modal } from 'ant-design-vue';
import { ref } from 'vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { message } from '../Message';
import { useI18n } from 'vue-i18n';


const {t} = useI18n();
const { cardId, balance, cardStatus } = defineProps({
    cardId: {
        type: String,
        required: true
    },
    balance: {
        type: String,
        required: true
    },
    cardStatus: {
        type: String,
        required: true
    }
})


const openFreezeModal = ref(false);
const openDeleteModal = ref(false);

const handleDeleteCard = () => {
    if (parseFloat(balance) > 0) {
        message.error(t('message.cardOptions.deleteCard.error'))
        return
    }
    openDeleteModal.value = true
}


</script>

<template>
    <Dropdown :triggger="['click']">
        <button class="bg-slate-200 px-5 py-3 rounded-lg hover:bg-slate-300 duration-100">
            <EllipsisOutlined />
        </button>
        <template #overlay>
            <Menu>
                <MenuItem @click="openFreezeModal = true">
                {{ t('message.cardOptions.freeze') }}
                </MenuItem>
                <MenuItem @click="handleDeleteCard">
                {{ t('message.cardOptions.delete') }}
                </MenuItem>
            </Menu>
        </template>
    </Dropdown>
    <GeneralModal v-model:open='openFreezeModal' width="29.166667vw" :centered="true" :mainTitle="t('message.cardOptions.cautionTitle') ">
        <div class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>{{ t('message.cardOptions.freezeCard.warning1') }}</p>
            <p>{{ t('message.cardOptions.freezeCard.warning2') }}</p>
        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4">
                <button @click="openFreezeModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[100%] bg-slate-200 hover:bg-slate-300 duration-100">{{ t('message.cardOptions.cancel') }}</button>
                <button @click="openFreezeModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">{{ t('message.cardOptions.freezeCard.confirm') }}</button>

            </div>
        </template>

    </GeneralModal>

    <GeneralModal v-model:open='openDeleteModal' width="29.166667vw" :centered="true" :mainTitle=" t('message.cardOptions.cautionTitle') ">
        <div class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>{{ t('message.cardOptions.deleteCard.warning1') }}</p>
            <p>{{ t('message.cardOptions.deleteCard.warning2') }}</p>
        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4">
                <button @click="openDeleteModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[100%] bg-slate-200 hover:bg-slate-300 duration-100">{{ t('message.cardOptions.cancel') }}</button>
                <button @click="openDeleteModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">{{ t('message.cardOptions.deleteCard.confirm') }}</button>

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