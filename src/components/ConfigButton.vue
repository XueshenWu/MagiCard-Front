<script setup>
import { Button, Dropdown, Menu } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';
</script>

<template>
    <Dropdown>
        <template #overlay>
            <Menu>
                <Menu.Item key="1">修改手机号</Menu.Item>
                <Menu.Item key="2">修改邮箱</Menu.Item>
                <Menu.Item key="3">修改支付密码</Menu.Item>
                <Menu.Item key="4">修改登录密码</Menu.Item>
                <Menu.Item key="5">申请月结单</Menu.Item>
                <Menu.Item key="6">投诉建议</Menu.Item>
                <Menu.Item key="7">退出登录</Menu.Item>
            </Menu>
        </template>
        <Button>
            设置
            <DownOutlined />
        </Button>
    </Dropdown>
</template>