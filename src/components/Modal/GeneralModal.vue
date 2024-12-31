<template>
    <Modal v-model:open="innerOpen" :width="width" :centered="centered" :class="modalClass" @cancel="handleClose"
        @close="handleClose" :title="title">
        <slot>
            <div class="p-4 text-center"></div>
        </slot>
        <template #footer>
            <slot name="footer">
                
            </slot>
        </template>
    </Modal>

</template>

<script setup>
import { Modal } from 'ant-design-vue';
import { watch, ref } from 'vue'
const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '400px'
    },
    centered: {
        type: Boolean,
        default: true
    },
    modalClass: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:open'])


const innerOpen = ref(props.open)

watch(
    () => props.open,
    (newVal) => {
        innerOpen.value = newVal
    }
)

function handleClose() {
    innerOpen.value = false
    emit('update:open', false)
    emit('close'); 
}
</script>

<style lang="less" scoped>
:deep(.ant-modal .ant-modal-content) {
    border-radius: 25px !important;
}
</style>