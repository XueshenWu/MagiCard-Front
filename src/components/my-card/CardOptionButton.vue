<script setup>
import { Dropdown, Menu, MenuItem, MenuDivider, Modal, Spin } from 'ant-design-vue';
import { inject, ref } from 'vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { message } from '../Message';
import { useI18n } from 'vue-i18n';
import URL from '../../api/api-list';
import get from '../../api/get';
import post from '../../api/post';


const reqPending = ref(false);

const { t } = useI18n();
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

const updateCardData = inject('updateCardData');


const openFreezeModal = ref(false);
const openDeleteModal = ref(false);
const openRecoverModal = ref(false);

const handleDeleteCard = () => {
    if (parseFloat(balance) > 0) {
        message.error(t('message.cardOptions.deleteCard.error'))
        return
    }
    openDeleteModal.value = true
}


const finishFreezeCard = async () => {

    reqPending.value = true;

    const res = await post(URL.card.freeze, { cardId: cardId }, true)
    reqPending.value = false;
    if (!res.err) {
        message.success(t('message.cardOptions.freezeCard.success'))

        updateCardData()
    } else {
        message.error(t('message.cardOptions.freezeCard.failed'))
    }
    openFreezeModal.value = false
}

</script>

<template>
    <Dropdown :triggger="['click']">
        <button class="bg-slate-200 px-5 py-3 rounded-lg hover:bg-slate-300 duration-100">
            <EllipsisOutlined />
        </button>
        <template #overlay>
            <Menu>
                <MenuItem v-if="cardStatus === 'Active'" @click="openFreezeModal = true">
                {{ t('message.cardOptions.freeze') }}
                </MenuItem>
                <MenuItem v-else @click="openRecoverModal = true">
                {{ t('message.cardOptions.recover') }}
                </MenuItem>
                <MenuItem @click="handleDeleteCard">
                {{ t('message.cardOptions.delete') }}
                </MenuItem>
            </Menu>
        </template>
    </Dropdown>
    <GeneralModal :maskClosable="false" v-model:open='openFreezeModal' width="29.166667vw" :centered="true"
        :mainTitle="t('message.cardOptions.cautionTitle')">
        <div class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>{{ t('message.cardOptions.freezeCard.warning1') }}</p>
            <p>{{ t('message.cardOptions.freezeCard.warning2') }}</p>
        </div>
        <template #footer>

            <div class="flex flex-row items-center justify-center gap-x-4 w-full">
                
                <button @click="openFreezeModal = false"
                    :class='`content-style px-10 h-[2.708333vw] w-[50%] ${reqPending ? " bg-slate-50 cursor-wait" : "bg-slate-200 hover:bg-slate-300"}  duration-100`'>{{
                        t('message.cardOptions.cancel') }}</button>
            
                <Spin :spinning="reqPending" wrapperClassName="h-[2.708333vw] w-[50%]">
                    <button @click="finishFreezeCard"
                        class="content-style h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">{{
                            t('message.cardOptions.freezeCard.confirm') }}</button>
                </Spin>

            </div>

        </template>

    </GeneralModal>

    <GeneralModal :maskClosable="false" v-model:open="openRecoverModal" width="29.166667vw" :centered="true"
        :mainTitle="t('message.cardOptions.cautionTitle')">
        <div class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>{{ t('message.cardOptions.recoverCard.warning1') }}</p>
            <p>{{ t('message.cardOptions.recoverCard.warning2') }}</p>
        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4">
                <Spin :spinning="reqPending">
                    <button @click="openRecoverModal = false"
                        class="content-style px-10 h-[2.708333vw] w-[100%] bg-slate-200 hover:bg-slate-300 duration-100">{{
                            t('message.cardOptions.cancel') }}</button>
                </Spin>
                <Spin :spinning="reqPending">
                    <button @click="openRecoverModal = false"
                        class="content-style px-10 h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">{{
                            t('message.cardOptions.recoverCard.confirm') }}</button>
                </Spin>

            </div>
        </template>
    </GeneralModal>



    <GeneralModal :maskClosable="false" v-model:open='openDeleteModal' width="29.166667vw" :centered="true"
        :mainTitle="t('message.cardOptions.cautionTitle')">
        <div class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>{{ t('message.cardOptions.deleteCard.warning1') }}</p>
            <p>{{ t('message.cardOptions.deleteCard.warning2') }}</p>
        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4">
                <Spin :spinning="reqPending">
                    <button @click="openFreezeModal = false"
                        class="content-style px-10 h-[2.708333vw] w-[100%] bg-slate-200 hover:bg-slate-300 duration-100">{{
                            t('message.cardOptions.cancel') }}</button>
                </Spin>
                <Spin :spinning="reqPending">
                    <button @click="handleDeleteCard"
                        class="content-style px-10 h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">{{
                            t('message.cardOptions.deleteCard.confirm') }}</button>
                </Spin>
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