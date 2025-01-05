<script setup>
import { Button, Dropdown, Menu } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { provide, ref } from 'vue';

import ModifyEmail from '../configModalForms/ModifyEmail.vue';
import ResetPassword from '../configModalForms/ResetPassword.vue';
import ApplyMonthlyStatement from '../configModalForms/ApplyMonthlyStatement.vue';
import ModifyPhoneNumber from '../configModalForms/ModifyPhoneNumber.vue';
import ResetCheckoutPassword from '../configModalForms/ResetCheckoutPassword.vue';


const openModifyPhoneNumberModal = ref(false);
const openModifyEmailModal = ref(false);
const openResetPasswordModal = ref(false);
const openApplyMonthlyStatementModal = ref(false);
const openResetCheckoutPasswordModal = ref(false);

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

    if(key === '7'){
        localStorage.removeItem('token');
        window.location.reload();
    }

};


</script>

<template>
   
    <Dropdown class="w-[5.36vw] h-[2.24vw] flex items-center justify-center text-[1.06vw]" overlayClassName="">
        <template #overlay>
            <Menu @click='handleMenuClick'>
                <Menu.Item key="1">修改手机号</Menu.Item>
                <Menu.Item key="2">修改邮箱</Menu.Item>
                <Menu.Item key="3">修改支付密码</Menu.Item>
                <Menu.Item key="4">修改登录密码</Menu.Item>
                <Menu.Item key="5">申请月结单</Menu.Item>
                <Menu.Item key="6">投诉建议</Menu.Item>
                <Menu.Item key="7">退出登录</Menu.Item>
            </Menu>
        </template>

        <Button class="flex items-center">
            设置
            <DownOutlined />
        </Button>

    </Dropdown>

    <ModifyPhoneNumber v-if="openModifyPhoneNumberModal" v-model:openModifyPhoneNumberModal="openModifyPhoneNumberModal" />
    <ModifyEmail v-if="openModifyEmailModal" v-model:openModifyEmailModal="openModifyEmailModal" /> 
    <ResetCheckoutPassword v-if="openResetCheckoutPasswordModal" v-model:open="openResetCheckoutPasswordModal" />
    <ResetPassword v-if="openResetPasswordModal" v-model:openResetPasswordModal="openResetPasswordModal" />
    <ApplyMonthlyStatement v-if="openApplyMonthlyStatementModal" v-model:openApplyMonthlyStatementModal="openApplyMonthlyStatementModal" />
    
</template>

<style scoped lang="less">
div /deep/ .ant-btn-default {
    border-color: transparent !important;
    background-color: #eeeeee !important;
}



:v-deep(.ant-dropdown-trigger){
    height: 2.24vw !important;
    width: 5.36vw !important;
    border: 1px solid red !important;
}
</style>