<script setup>
import { Button, Dropdown, Menu, message } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { provide, ref } from 'vue';

import ModifyEmail from '../configModalForms/ModifyEmail.vue';
import ResetPassword from '../configModalForms/ResetPassword.vue';
import ApplyMonthlyStatement from '../configModalForms/ApplyMonthlyStatement.vue';
import ModifyPhoneNumber from '../configModalForms/ModifyPhoneNumber.vue';
import ResetCheckoutPassword from '../configModalForms/ResetCheckoutPassword.vue';
import Feedback from '../configModalForms/Feedback.vue';
import { useI18n } from 'vue-i18n';
import { Crisp } from 'crisp-sdk-web';

const openModifyPhoneNumberModal = ref(false);
const openModifyEmailModal = ref(false);
const openResetPasswordModal = ref(false);
const openApplyMonthlyStatementModal = ref(false);
const openResetCheckoutPasswordModal = ref(false);
const openFeedbackModal = ref(false);

const { t } = useI18n();

const switchSelected = (i)=>{
    handleMenuClick({key: i});
}

provide('switchSelected', switchSelected);



const handleMenuClick = ({ key }) => {
    openModifyPhoneNumberModal.value = key === '1';
    openModifyEmailModal.value = key === '2';
    openResetCheckoutPasswordModal.value = key === '3';
    openResetPasswordModal.value = key === '4';
    openApplyMonthlyStatementModal.value = key === '5';
    openFeedbackModal.value = key === '6';

    if(key === '7'){
        localStorage.removeItem('token');

        Crisp.setTokenId();
        Crisp.session.reset();

        window.location.reload();
    }

};


</script>

<template>
   
    <Dropdown class="w-[5.36vw] h-[2.24vw] flex items-center justify-center text-[1.06vw]" overlayClassName="">
        <template #overlay>
            <Menu @click='handleMenuClick'>
                <Menu.Item key="1">{{ t('message.modifyPhone') }}</Menu.Item>
                <Menu.Item key="2">{{ t('message.modifyEmail') }}</Menu.Item>
                <Menu.Item key="3">{{ t('message.modifyPaymentPassword') }}</Menu.Item>
                <Menu.Item key="4">{{ t('message.modifyLoginPassword') }}</Menu.Item>
                <Menu.Item key="5">{{ t('message.applyMonthlyStatement') }}</Menu.Item>
                <Menu.Item key="6">{{ t('message.feedbackForm') }}</Menu.Item>
                <Menu.Item key="7">{{ t('message.logout') }}</Menu.Item>
            </Menu>
        </template>

        <Button class="flex items-center ">
            {{ t('message.settings') }}
            <DownOutlined />
        </Button>

    </Dropdown>

    <ModifyPhoneNumber v-if="openModifyPhoneNumberModal" v-model:openModifyPhoneNumberModal="openModifyPhoneNumberModal" />
    <ModifyEmail v-if="openModifyEmailModal" v-model:openModifyEmailModal="openModifyEmailModal" /> 
    <ResetCheckoutPassword v-if="openResetCheckoutPasswordModal" v-model:open="openResetCheckoutPasswordModal" />
    <ResetPassword v-if="openResetPasswordModal" v-model:openResetPasswordModal="openResetPasswordModal" />
    <ApplyMonthlyStatement v-if="openApplyMonthlyStatementModal" v-model:openApplyMonthlyStatementModal="openApplyMonthlyStatementModal" />
    <Feedback v-if="openFeedbackModal" v-model:openFeedbackModal="openFeedbackModal" />
</template>

<style scoped lang="less">
::v-deep(.ant-btn-default) {
    border-color: transparent !important;
    background-color: #eeeeee !important;
    padding: .364583vw 1.041667vw !important;
}



:v-deep(.ant-dropdown-trigger){
    height: 2.24vw !important;
    width: 5.36vw !important;
    border: 1px solid red !important;
}
</style>