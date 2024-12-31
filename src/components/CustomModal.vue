# BaseModal.vue
<template>
  <a-modal v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, name) in $slots" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-modal>
</template>

<script setup>
import { Modal } from 'ant-design-vue'

defineOptions({
  name: 'BaseModal',
  inheritAttrs: false
})
</script>

<style lang="less">
.ant-modal .ant-modal-content {
    border-radius: 25px !important;
}
</style>