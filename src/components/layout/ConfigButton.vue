<script setup>
import { Button, Dropdown, Menu } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

import ModifyEmail from '../configModalForms/ModifyEmail.vue';
import ModifyCheckoutPassword from '../configModalForms/ModifyCheckoutPassword.vue';
import ResetPassword from '../configModalForms/ResetPassword.vue';


const openModifyEmailModal = ref(false);
const openModifyCheckoutPasswordModal = ref(false);
const openResetPasswordModal = ref(false);

const handleMenuClick = ({ key }) => {
    switch (key) {
        case '1':
            console.log('修改手机号');
            break;
        case '2':
            console.log('修改邮箱');
            openModifyEmailModal.value = true;
            break;
        case '3':
            console.log('修改支付密码');
            openModifyCheckoutPasswordModal.value = true;
            break;
        case '4':
            console.log('修改登录密码');
            openResetPasswordModal.value = true;
            break;
        case '5':
            console.log('申请月结单');
            break;
        case '6':
            console.log('投诉建议');
            break;
        case '7':
            console.log('退出登录');
            break;
        default:
            break;
    }
};


</script>

<template>
    <Dropdown>
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


    <ModifyEmail v-model:openModifyEmailModal="openModifyEmailModal" />

    <ModifyCheckoutPassword v-model:openModifyCheckoutPasswordModal="openModifyCheckoutPasswordModal" />
    <ResetPassword v-model:openResetPasswordModal="openResetPasswordModal" />

</template>

<style scoped lang="less">
div /deep/ .ant-btn-default {
    border-color: transparent !important;
    background-color: #eeeeee !important;
}
</style>